(function() {
	const CAPTURE_PACKET_SECONDS = .02;
	const MAX_PLAYBACK_BUFFER_SECONDS = 10;
	const PLAYBACK_PREBUFFER_SECONDS = .15;
	const PLAYBACK_PREBUFFER_TIMEOUT_SECONDS = .24;
	const PLAYBACK_DECLICK_SECONDS = .001;
	function validatedSampleCount(sampleRate$1, seconds) {
		if (!Number.isFinite(sampleRate$1) || sampleRate$1 <= 0) throw new RangeError("sampleRate must be a positive finite number");
		return Math.max(1, Math.round(sampleRate$1 * seconds));
	}
	function capturePacketSampleCount(sampleRate$1) {
		if (!Number.isFinite(sampleRate$1) || sampleRate$1 <= 0) throw new RangeError("sampleRate must be a positive finite number");
		return Math.max(1, Math.ceil(sampleRate$1 * CAPTURE_PACKET_SECONDS));
	}
	function playbackBufferSampleCount(sampleRate$1) {
		return validatedSampleCount(sampleRate$1, MAX_PLAYBACK_BUFFER_SECONDS);
	}
	function playbackPrebufferSampleCount(sampleRate$1) {
		return validatedSampleCount(sampleRate$1, PLAYBACK_PREBUFFER_SECONDS);
	}
	function floatToPcm16(sample) {
		const clamped = Math.max(-1, Math.min(1, sample));
		return clamped < 0 ? clamped * 32768 : clamped * 32767;
	}
	var Pcm16Packetizer = class {
		packetSamples;
		packet;
		used = 0;
		constructor(sampleRate$1) {
			this.packetSamples = capturePacketSampleCount(sampleRate$1);
			this.packet = new Int16Array(this.packetSamples);
		}
		push(samples, emit) {
			let sourceOffset = 0;
			while (sourceOffset < samples.length) {
				const copyCount = Math.min(this.packetSamples - this.used, samples.length - sourceOffset);
				for (let i = 0; i < copyCount; i++) this.packet[this.used + i] = floatToPcm16(samples[sourceOffset + i]);
				this.used += copyCount;
				sourceOffset += copyCount;
				if (this.used === this.packetSamples) {
					const completed = this.packet;
					this.packet = new Int16Array(this.packetSamples);
					this.used = 0;
					emit(completed.buffer);
				}
			}
		}
	};
	var BoundedPcm16Queue = class {
		samples;
		readIndex = 0;
		writeIndex = 0;
		queued = 0;
		constructor(capacity) {
			this.capacity = capacity;
			if (!Number.isInteger(capacity) || capacity <= 0) throw new RangeError("capacity must be a positive integer");
			this.samples = new Int16Array(capacity);
		}
		get length() {
			return this.queued;
		}
		clear() {
			this.readIndex = 0;
			this.writeIndex = 0;
			this.queued = 0;
		}
		enqueue(input) {
			if (input.length === 0) return 0;
			if (input.length >= this.capacity) {
				const dropped$1 = this.queued + input.length - this.capacity;
				this.samples.set(input.subarray(input.length - this.capacity));
				this.readIndex = 0;
				this.writeIndex = 0;
				this.queued = this.capacity;
				return dropped$1;
			}
			const dropped = Math.max(0, this.queued + input.length - this.capacity);
			if (dropped > 0) {
				this.readIndex = (this.readIndex + dropped) % this.capacity;
				this.queued -= dropped;
			}
			const firstCopy = Math.min(input.length, this.capacity - this.writeIndex);
			this.samples.set(input.subarray(0, firstCopy), this.writeIndex);
			if (firstCopy < input.length) this.samples.set(input.subarray(firstCopy), 0);
			this.writeIndex = (this.writeIndex + input.length) % this.capacity;
			this.queued += input.length;
			return dropped;
		}
		dequeueInto(output) {
			output.fill(0);
			const readCount = Math.min(output.length, this.queued);
			const firstRead = Math.min(readCount, this.capacity - this.readIndex);
			for (let i = 0; i < firstRead; i++) output[i] = this.samples[this.readIndex + i] / 32768;
			const secondRead = readCount - firstRead;
			for (let i = 0; i < secondRead; i++) output[firstRead + i] = this.samples[i] / 32768;
			this.readIndex = (this.readIndex + readCount) % this.capacity;
			this.queued -= readCount;
			return readCount;
		}
	};
	var JitterBufferedPcm16Queue = class {
		queue;
		prebufferSamples;
		prebufferTimeoutSamples;
		declickSamples;
		priming = true;
		primingSamples = 0;
		resuming = false;
		constructor(sampleRate$1) {
			this.queue = new BoundedPcm16Queue(playbackBufferSampleCount(sampleRate$1));
			this.prebufferSamples = playbackPrebufferSampleCount(sampleRate$1);
			this.prebufferTimeoutSamples = validatedSampleCount(sampleRate$1, PLAYBACK_PREBUFFER_TIMEOUT_SECONDS);
			this.declickSamples = validatedSampleCount(sampleRate$1, PLAYBACK_DECLICK_SECONDS);
		}
		get length() {
			return this.queue.length;
		}
		get isPriming() {
			return this.priming;
		}
		clear() {
			this.queue.clear();
			this.priming = true;
			this.primingSamples = 0;
			this.resuming = false;
		}
		enqueue(input) {
			return this.queue.enqueue(input);
		}
		render(output) {
			if (this.priming) {
				if (this.queue.length === 0) {
					this.primingSamples = 0;
					output.fill(0);
					return 0;
				}
				if (this.queue.length < this.prebufferSamples && this.primingSamples < this.prebufferTimeoutSamples) {
					this.primingSamples += output.length;
					output.fill(0);
					return 0;
				}
				this.priming = false;
				this.primingSamples = 0;
				this.resuming = true;
			}
			const rendered = this.queue.dequeueInto(output);
			if (this.resuming) {
				this.resuming = false;
				this.rampIn(output, rendered);
			}
			if (rendered < output.length) {
				this.rampOut(output, rendered);
				this.priming = true;
				this.primingSamples = 0;
			}
			return rendered;
		}
		rampIn(output, rendered) {
			const ramp = Math.min(rendered, this.declickSamples);
			for (let i = 0; i < ramp; i++) output[i] *= (i + 1) / (ramp + 1);
		}
		rampOut(output, rendered) {
			if (rendered === 0) return;
			const last = output[rendered - 1];
			if (last === 0) return;
			const ramp = Math.min(output.length - rendered, this.declickSamples);
			for (let i = 0; i < ramp; i++) output[rendered + i] = last * (1 - (i + 1) / (ramp + 1));
		}
	};
	function validAudioInterval(start, end) {
		return typeof start === "number" && typeof end === "number" && Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end > start;
	}
	var TimedPcmQueue = class {
		audio;
		spans = [];
		constructor(rate) {
			this.rate = rate;
			this.audio = new JitterBufferedPcm16Queue(rate);
		}
		clear() {
			this.audio.clear();
			this.spans = [];
		}
		enqueue(samples, timing) {
			if (!samples.length) return;
			this.spans.push({
				frames: samples.length,
				consumed: 0,
				timing: timing && validAudioInterval(timing.startMs, timing.endMs) ? timing : void 0
			});
			this.consume(this.audio.enqueue(samples));
		}
		render(output, contextStart) {
			const count = this.audio.render(output);
			return this.consume(count, contextStart);
		}
		consume(count, contextStart) {
			const result = [];
			let offset = 0;
			while (count > 0 && this.spans.length) {
				const span = this.spans[0];
				const take = Math.min(count, span.frames - span.consumed);
				if (contextStart !== void 0 && span.timing) {
					const duration = span.timing.endMs - span.timing.startMs;
					result.push({
						startMs: span.timing.startMs + duration * span.consumed / span.frames,
						endMs: span.timing.startMs + duration * (span.consumed + take) / span.frames,
						contextStart: contextStart + offset / this.rate,
						contextEnd: contextStart + (offset + take) / this.rate
					});
				}
				span.consumed += take;
				offset += take;
				count -= take;
				if (span.consumed === span.frames) this.spans.shift();
			}
			return result;
		}
	};
	var StartupAudioQueue = class {
		frames = [];
		head = 0;
		offset = 0;
		samples = 0;
		started = false;
		suspended = false;
		prefix = null;
		catchingUp = false;
		grain;
		analysis;
		grainOffset = 0;
		grainLength = 0;
		constructor(rate) {
			this.rate = rate;
			if (!Number.isFinite(rate) || rate <= 0) throw new Error("Invalid microphone sample rate");
			this.grain = new Float32Array(Math.max(1, Math.round(rate * .02)));
			this.analysis = new Float32Array(this.grain.length + Math.max(1, Math.ceil(rate * .015)));
		}
		get pendingMs() {
			return (this.samples + (this.prefix?.length ?? 0) + this.grainLength - this.grainOffset) / this.rate * 1e3;
		}
		prepend(pcm) {
			if (this.started || this.suspended || this.prefix) throw new Error("Unexpected wake prefix");
			if (pcm.length + this.samples > this.rate * 30) throw new Error("Voice startup buffer exceeded");
			this.prefix = pcm;
		}
		start() {
			if (this.started) return;
			if (this.prefix) {
				this.frames.unshift(this.prefix);
				this.samples += this.prefix.length;
				this.prefix = null;
			}
			this.suspended = false;
			this.started = true;
			this.catchingUp = this.samples > this.rate * .1;
			this.compactLeadingSilence();
		}
		suspend() {
			this.frames = [];
			this.samples = this.offset = this.head = 0;
			this.grainOffset = this.grainLength = 0;
			this.grain.fill(0);
			this.analysis.fill(0);
			this.catchingUp = false;
			this.prefix = null;
			this.started = false;
			this.suspended = true;
		}
		resume() {
			this.suspended = false;
		}
		process(input, output) {
			output.fill(0);
			if (this.suspended) return;
			if (this.samples + (this.prefix?.length ?? 0) + input.length > this.rate * 30) throw new Error("Voice startup buffer exceeded");
			if (input.length) this.frames.push(input.slice());
			this.samples += input.length;
			if (!this.started) return;
			let written = 0;
			while (written < output.length) {
				if (this.grainOffset < this.grainLength) {
					const count$1 = Math.min(output.length - written, this.grainLength - this.grainOffset);
					output.set(this.grain.subarray(this.grainOffset, this.grainOffset + count$1), written);
					this.grainOffset += count$1;
					written += count$1;
					continue;
				}
				if (!this.samples) break;
				const needed = output.length - written;
				const backlog = this.samples - needed;
				if (this.catchingUp && backlog > 0) {
					this.renderCatchup(backlog);
					continue;
				}
				this.catchingUp = false;
				const count = Math.min(needed, this.samples);
				this.peek(output.subarray(written, written + count));
				this.consume(count);
				written += count;
			}
		}
		peek(target) {
			let frameIndex = this.head, offset = this.offset, written = 0;
			while (written < target.length) {
				const frame = this.frames[frameIndex];
				const count = Math.min(frame.length - offset, target.length - written);
				target.set(frame.subarray(offset, offset + count), written);
				written += count;
				offset = 0;
				frameIndex++;
			}
		}
		compactLeadingSilence() {
			let leading = 0;
			opening: for (let frameIndex = this.head; frameIndex < this.frames.length; frameIndex++) {
				const frame = this.frames[frameIndex];
				for (let i = frameIndex === this.head ? this.offset : 0; i < frame.length; i++) {
					if (frame[i] !== 0) break opening;
					leading++;
				}
			}
			const removable = leading - Math.round(this.rate * .1);
			if (removable > 0) this.consume(removable);
		}
		consume(count) {
			this.samples -= count;
			while (count) {
				const available = this.frames[this.head].length - this.offset;
				if (count < available) {
					this.offset += count;
					break;
				}
				count -= available;
				this.head++;
				this.offset = 0;
			}
			if (this.head > 256 || !this.samples) {
				this.frames.splice(0, this.head);
				this.head = 0;
			}
		}
		renderCatchup(backlog) {
			const maximum = Math.min(backlog, Math.floor(this.samples / 2), Math.max(1, Math.round(this.rate * .015)));
			const minimum = Math.min(maximum, Math.max(1, Math.round(this.rate * .005)));
			const desired = Math.min(maximum, Math.max(1, Math.round(this.rate * .01)));
			const length = Math.min(this.grain.length, this.samples - maximum);
			this.peek(this.analysis.subarray(0, length + maximum));
			const stride = Math.max(1, Math.floor(this.rate / 6e3));
			const step = Math.max(1, Math.floor(this.rate / 12e3));
			let chosen = desired, best = Number.NEGATIVE_INFINITY;
			for (let shift = minimum; shift <= maximum; shift += step) {
				let dot = 0, leftEnergy = 0, rightEnergy = 0;
				for (let i = 0; i < length; i += stride) {
					const left = this.analysis[i], right = this.analysis[i + shift];
					dot += left * right;
					leftEnergy += left * left;
					rightEnergy += right * right;
				}
				const energy = Math.sqrt(leftEnergy * rightEnergy);
				const score = (energy > 1e-20 ? dot / energy : 1) - .001 * Math.abs(shift - desired) / Math.max(1, maximum);
				if (score > best) {
					best = score;
					chosen = shift;
				}
			}
			for (let i = 0; i < length; i++) {
				const blend = length > 1 ? i / (length - 1) : .5;
				this.grain[i] = this.analysis[i] * (1 - blend) + this.analysis[i + chosen] * blend;
			}
			this.consume(length + chosen);
			this.grainOffset = 0;
			this.grainLength = length;
		}
	};
	var PcmCapture = class extends AudioWorkletProcessor {
		levelSum = 0;
		levelCount = 0;
		packetizer = new Pcm16Packetizer(sampleRate);
		emitPacket = (packet) => {
			this.port.postMessage(packet, [packet]);
		};
		process(inputs) {
			const ch = inputs[0]?.[0];
			if (ch && ch.length) {
				for (let i = 0; i < ch.length; i++) this.levelSum += ch[i] * ch[i];
				this.levelCount += ch.length;
				if (this.levelCount >= sampleRate / 30) {
					const rms = Math.sqrt(this.levelSum / this.levelCount);
					this.port.postMessage({
						type: "level",
						rms
					});
					this.levelSum = 0;
					this.levelCount = 0;
				}
				this.packetizer.push(ch, this.emitPacket);
			}
			return true;
		}
	};
	var StartupCapture = class extends AudioWorkletProcessor {
		queue = new StartupAudioQueue(sampleRate);
		failed = false;
		started = false;
		reportedStart = false;
		reportedCatchup = false;
		constructor() {
			super();
			this.port.onmessage = (event) => {
				try {
					if (event.data.type === "start") {
						this.queue.start();
						this.started = true;
					} else if (event.data.type === "suspend") {
						this.queue.suspend();
						this.started = false;
					} else if (event.data.type === "resume") this.queue.resume();
					else if (event.data.type === "prefix") this.queue.prepend(event.data.samples);
				} catch (error) {
					this.fail(error);
				}
			};
		}
		fail(error) {
			this.failed = true;
			this.queue.suspend();
			this.port.postMessage({
				type: "error",
				message: String(error)
			});
		}
		process(inputs, outputs) {
			const output = outputs[0]?.[0];
			if (!output) return true;
			if (this.failed) {
				output.fill(0);
				return true;
			}
			try {
				this.queue.process(inputs[0]?.[0] ?? new Float32Array(output.length), output);
				if (this.started && !this.reportedStart) {
					this.reportedStart = true;
					this.port.postMessage({
						type: "input_started",
						pending_ms: this.queue.pendingMs
					});
				}
				if (this.started && !this.reportedCatchup && this.queue.pendingMs <= output.length / sampleRate * 1e3) {
					this.reportedCatchup = true;
					this.port.postMessage({ type: "input_caught_up" });
				}
			} catch (error) {
				this.fail(error);
			}
			return true;
		}
	};
	registerProcessor("pcm-startup", StartupCapture);
	var PcmPlayback = class extends AudioWorkletProcessor {
		queue = new TimedPcmQueue(sampleRate);
		spans = [];
		generation = 0;
		levelSum = 0;
		levelCount = 0;
		muted = true;
		volume = 1;
		constructor() {
			super();
			this.port.onmessage = (e) => {
				const msg = e.data;
				if (msg.type === "output_state") {
					const muted = msg.muted === true;
					if (muted !== this.muted) {
						this.queue.clear();
						this.spans = [];
					}
					if (msg.generation !== void 0) this.generation = msg.generation;
					this.muted = muted;
					this.volume = msg.volume ?? 1;
				} else if (msg.type === "flush") {
					this.queue.clear();
					this.spans = [];
					this.generation = msg.generation ?? this.generation + 1;
				} else if (msg.type === "pcm" && msg.data && !this.muted) this.queue.enqueue(new Int16Array(msg.data), msg.startMs !== void 0 && msg.endMs !== void 0 ? {
					startMs: msg.startMs,
					endMs: msg.endMs
				} : void 0);
			};
		}
		process(_inputs, outputs) {
			const out = outputs[0]?.[0];
			if (!out) return true;
			const rendered = this.queue.render(out, currentTime);
			if (!this.muted && this.volume > 0) this.spans.push(...rendered);
			for (let i = 0; i < out.length; i++) out[i] *= this.muted ? 0 : this.volume;
			for (let i = 0; i < out.length; i++) this.levelSum += out[i] * out[i];
			this.levelCount += out.length;
			if (this.levelCount >= sampleRate / 30) {
				const rms = Math.sqrt(this.levelSum / this.levelCount);
				this.port.postMessage({
					type: "level",
					rms
				});
				this.port.postMessage({
					type: "playback",
					generation: this.generation,
					spans: this.spans
				});
				this.spans = [];
				this.levelSum = 0;
				this.levelCount = 0;
			}
			return true;
		}
	};
	var PcmLevel = class extends AudioWorkletProcessor {
		sum = 0;
		count = 0;
		process(inputs, outputs) {
			const input = inputs[0]?.[0];
			const size = input?.length ?? outputs[0]?.[0]?.length ?? 128;
			if (input) for (const sample of input) this.sum += sample * sample;
			this.count += size;
			if (this.count >= sampleRate / 30) {
				this.port.postMessage({
					type: "level",
					rms: Math.sqrt(this.sum / this.count)
				});
				this.sum = 0;
				this.count = 0;
			}
			return true;
		}
	};
	registerProcessor("pcm-capture", PcmCapture);
	registerProcessor("pcm-playback", PcmPlayback);
	registerProcessor("pcm-level", PcmLevel);
})();
