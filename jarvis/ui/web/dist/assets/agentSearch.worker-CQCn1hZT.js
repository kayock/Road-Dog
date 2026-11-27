(function() {
	/*!
	* ONNX Runtime Web v1.31.0-dev.20260914-8d85527a0
	* Copyright (c) Microsoft Corporation. All rights reserved.
	* Licensed under the MIT License.
	*/
	var qt = Object.defineProperty;
	var Qa = Object.getOwnPropertyDescriptor;
	var Ka = Object.getOwnPropertyNames;
	var es = Object.prototype.hasOwnProperty;
	var Jt = ((n) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(n, { get: (t, a) => (typeof require < "u" ? require : t)[a] }) : n)(function(n) {
		if (typeof require < "u") return require.apply(this, arguments);
		throw Error("Dynamic require of \"" + n + "\" is not supported");
	});
	var N = (n, t, a) => () => {
		if (a) throw a[0];
		try {
			return n && (t = n(n = 0)), t;
		} catch (u) {
			throw a = [u], u;
		}
	};
	var ut = (n, t) => {
		for (var a in t) qt(n, a, {
			get: t[a],
			enumerable: !0
		});
	}, ts = (n, t, a, u) => {
		if (t && typeof t == "object" || typeof t == "function") for (let o of Ka(t)) !es.call(n, o) && o !== a && qt(n, o, {
			get: () => t[o],
			enumerable: !(u = Qa(t, o)) || u.enumerable
		});
		return n;
	};
	var Xt = (n) => ts(qt({}, "__esModule", { value: !0 }), n);
	var ft, Be, Je, ns, pr, Zt = N(() => {
		"use strict";
		ft = /* @__PURE__ */ new Map(), Be = [], Je = (n, t, a) => {
			if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
				let u = ft.get(n);
				if (u === void 0) ft.set(n, {
					backend: t,
					priority: a
				});
				else {
					if (u.priority > a) return;
					if (u.priority === a && u.backend !== t) throw new Error(`cannot register backend "${n}" using priority ${a}`);
				}
				if (a >= 0) {
					let o = Be.indexOf(n);
					o !== -1 && Be.splice(o, 1);
					for (let d = 0; d < Be.length; d++) if (ft.get(Be[d]).priority <= a) {
						Be.splice(d, 0, n);
						return;
					}
					Be.push(n);
				}
				return;
			}
			throw new TypeError("not a valid backend");
		}, ns = async (n) => {
			let t = ft.get(n);
			if (!t) return "backend not found.";
			if (t.initialized) return t.backend;
			if (t.aborted) return t.error;
			{
				let a = !!t.initPromise;
				try {
					return a || (t.initPromise = t.backend.init(n)), await t.initPromise, t.initialized = !0, t.backend;
				} catch (u) {
					return a || (t.error = `${u}`, t.aborted = !0), t.error;
				} finally {
					delete t.initPromise;
				}
			}
		}, pr = async (n) => {
			let t = n.executionProviders || [], a = t.map((m) => typeof m == "string" ? m : m.name), u = a.length === 0 ? Be : a, o, d = [], c = /* @__PURE__ */ new Set();
			for (let m of u) {
				let h = await ns(m);
				typeof h == "string" ? d.push({
					name: m,
					err: h
				}) : (o || (o = h), o === h && c.add(m));
			}
			if (!o) throw new Error(`no available backend found. ERR: ${d.map((m) => `[${m.name}] ${m.err}`).join(", ")}`);
			for (let { name: m, err: h } of d) a.includes(m) && console.warn(`removing requested execution provider "${m}" from session options because it is not available: ${h}`);
			let l = t.filter((m) => c.has(typeof m == "string" ? m : m.name));
			return [o, new Proxy(n, { get: (m, h) => h === "executionProviders" ? l : Reflect.get(m, h) })];
		};
	});
	var mr = N(() => {
		"use strict";
		Zt();
	});
	var hr, wr = N(() => {
		"use strict";
		hr = "1.31.0-dev.20260911-2a43ec07e";
	});
	var br, q, Qt = N(() => {
		"use strict";
		wr();
		br = "warning", q = {
			wasm: {},
			webgl: {},
			webgpu: {},
			versions: { common: hr },
			set logLevel(n) {
				if (n !== void 0) {
					if (typeof n != "string" || [
						"verbose",
						"info",
						"warning",
						"error",
						"fatal"
					].indexOf(n) === -1) throw new Error(`Unsupported logging level: ${n}`);
					br = n;
				}
			},
			get logLevel() {
				return br;
			}
		};
		Object.defineProperty(q, "logLevel", { enumerable: !0 });
	});
	var Y, yr = N(() => {
		"use strict";
		Qt();
		Y = q;
	});
	var gr, Er, Tr = N(() => {
		"use strict";
		gr = (n, t) => {
			let a = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
			a.width = n.dims[3], a.height = n.dims[2];
			let u = a.getContext("2d");
			if (u != null) {
				let o, d;
				t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (o = n.dims[2], d = n.dims[3]) : (o = n.dims[3], d = n.dims[2]);
				let c = t?.format !== void 0 ? t.format : "RGB", l = t?.norm, m, h;
				l === void 0 || l.mean === void 0 ? m = [
					255,
					255,
					255,
					255
				] : typeof l.mean == "number" ? m = [
					l.mean,
					l.mean,
					l.mean,
					l.mean
				] : (m = [
					l.mean[0],
					l.mean[1],
					l.mean[2],
					0
				], l.mean[3] !== void 0 && (m[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? h = [
					0,
					0,
					0,
					0
				] : typeof l.bias == "number" ? h = [
					l.bias,
					l.bias,
					l.bias,
					l.bias
				] : (h = [
					l.bias[0],
					l.bias[1],
					l.bias[2],
					0
				], l.bias[3] !== void 0 && (h[3] = l.bias[3]));
				let g = d * o, b = 0, y = g, T = g * 2, I = -1;
				c === "RGBA" ? (b = 0, y = g, T = g * 2, I = g * 3) : c === "RGB" ? (b = 0, y = g, T = g * 2) : c === "RBG" && (b = 0, T = g, y = g * 2);
				for (let D = 0; D < d; D++) for (let $ = 0; $ < o; $++) {
					let v = (n.data[b++] - h[0]) * m[0], A = (n.data[y++] - h[1]) * m[1], F = (n.data[T++] - h[2]) * m[2], P = I === -1 ? 255 : (n.data[I++] - h[3]) * m[3];
					u.fillStyle = "rgba(" + v + "," + A + "," + F + "," + P + ")", u.fillRect($, D, 1, 1);
				}
				if ("toDataURL" in a) return a.toDataURL();
				throw new Error("toDataURL is not supported");
			} else throw new Error("Can not access image data");
		}, Er = (n, t) => {
			let a = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), u;
			if (a != null) {
				let o, d, c;
				t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (o = n.dims[2], d = n.dims[1], c = n.dims[3]) : (o = n.dims[3], d = n.dims[2], c = n.dims[1]);
				let l = t !== void 0 && t.format !== void 0 ? t.format : "RGB", m = t?.norm, h, g;
				m === void 0 || m.mean === void 0 ? h = [
					255,
					255,
					255,
					255
				] : typeof m.mean == "number" ? h = [
					m.mean,
					m.mean,
					m.mean,
					m.mean
				] : (h = [
					m.mean[0],
					m.mean[1],
					m.mean[2],
					255
				], m.mean[3] !== void 0 && (h[3] = m.mean[3])), m === void 0 || m.bias === void 0 ? g = [
					0,
					0,
					0,
					0
				] : typeof m.bias == "number" ? g = [
					m.bias,
					m.bias,
					m.bias,
					m.bias
				] : (g = [
					m.bias[0],
					m.bias[1],
					m.bias[2],
					0
				], m.bias[3] !== void 0 && (g[3] = m.bias[3]));
				let b = d * o;
				if (t !== void 0 && (t.format !== void 0 && c === 4 && t.format !== "RGBA" || c === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
				let y = 4, T = 0, I = 1, D = 2, $ = 3, v = 0, A = b, F = b * 2, P = -1;
				l === "RGBA" ? (v = 0, A = b, F = b * 2, P = b * 3) : l === "RGB" ? (v = 0, A = b, F = b * 2) : l === "RBG" && (v = 0, F = b, A = b * 2), u = a.createImageData(o, d);
				for (let k = 0; k < d * o; T += y, I += y, D += y, $ += y, k++) u.data[T] = (n.data[v++] - g[0]) * h[0], u.data[I] = (n.data[A++] - g[1]) * h[1], u.data[D] = (n.data[F++] - g[2]) * h[2], u.data[$] = P === -1 ? 255 : (n.data[P++] - g[3]) * h[3];
			} else throw new Error("Can not access image data");
			return u;
		};
	});
	var Kt, Sr, vr, Ar, Or, Ir, Br = N(() => {
		"use strict";
		ct();
		Kt = (n, t) => {
			if (n === void 0) throw new Error("Image buffer must be defined");
			if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
			if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
			let { height: a, width: u } = t, o = t.norm ?? {
				mean: 255,
				bias: 0
			}, d, c;
			typeof o.mean == "number" ? d = [
				o.mean,
				o.mean,
				o.mean,
				o.mean
			] : d = [
				o.mean[0],
				o.mean[1],
				o.mean[2],
				o.mean[3] ?? 255
			], typeof o.bias == "number" ? c = [
				o.bias,
				o.bias,
				o.bias,
				o.bias
			] : c = [
				o.bias[0],
				o.bias[1],
				o.bias[2],
				o.bias[3] ?? 0
			];
			let l = t.format !== void 0 ? t.format : "RGBA", m = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", h = a * u, g = m === "RGBA" ? new Float32Array(h * 4) : new Float32Array(h * 3), b = 4, y = 0, T = 1, I = 2, D = 3, $ = 0, v = h, A = h * 2, F = -1;
			l === "RGB" && (b = 3, y = 0, T = 1, I = 2, D = -1), m === "RGBA" ? F = h * 3 : m === "RBG" ? ($ = 0, A = h, v = h * 2) : m === "BGR" && (A = 0, v = h, $ = h * 2);
			for (let k = 0; k < h; k++, y += b, I += b, T += b, D += b) g[$++] = (n[y] + c[0]) / d[0], g[v++] = (n[T] + c[1]) / d[1], g[A++] = (n[I] + c[2]) / d[2], F !== -1 && D !== -1 && (g[F++] = (n[D] + c[3]) / d[3]);
			return m === "RGBA" ? new Z("float32", g, [
				1,
				4,
				a,
				u
			]) : new Z("float32", g, [
				1,
				3,
				a,
				u
			]);
		}, Sr = async (n, t) => {
			let a = typeof HTMLImageElement < "u" && n instanceof HTMLImageElement, u = typeof ImageData < "u" && n instanceof ImageData, o = typeof ImageBitmap < "u" && n instanceof ImageBitmap, d = typeof n == "string", c, l = t ?? {}, m = () => {
				if (typeof document < "u") return document.createElement("canvas");
				if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
				throw new Error("Canvas is not supported");
			}, h = (g) => typeof HTMLCanvasElement < "u" && g instanceof HTMLCanvasElement || g instanceof OffscreenCanvas ? g.getContext("2d") : null;
			if (a) {
				let g = m();
				g.width = n.width, g.height = n.height;
				let b = h(g);
				if (b != null) {
					let y = n.height, T = n.width;
					if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (y = t.resizedHeight, T = t.resizedWidth), t !== void 0) {
						if (l = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
						l.tensorFormat = "RGBA", l.height = y, l.width = T;
					} else l.tensorFormat = "RGBA", l.height = y, l.width = T;
					b.drawImage(n, 0, 0), c = b.getImageData(0, 0, T, y).data;
				} else throw new Error("Can not access image data");
			} else if (u) {
				let g, b;
				if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (g = t.resizedHeight, b = t.resizedWidth) : (g = n.height, b = n.width), t !== void 0 && (l = t), l.format = "RGBA", l.height = g, l.width = b, t !== void 0) {
					let y = m();
					y.width = b, y.height = g;
					let T = h(y);
					if (T != null) T.putImageData(n, 0, 0), c = T.getImageData(0, 0, b, g).data;
					else throw new Error("Can not access image data");
				} else c = n.data;
			} else if (o) {
				if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
				let g = m();
				g.width = n.width, g.height = n.height;
				let b = h(g);
				if (b != null) {
					let y = n.height, T = n.width;
					return b.drawImage(n, 0, 0, T, y), c = b.getImageData(0, 0, T, y).data, l.height = y, l.width = T, Kt(c, l);
				} else throw new Error("Can not access image data");
			} else {
				if (d) return new Promise((g, b) => {
					let y = m(), T = h(y);
					if (!n || !T) return b();
					let I = new Image();
					I.crossOrigin = "Anonymous", I.src = n, I.onload = () => {
						y.width = I.width, y.height = I.height, T.drawImage(I, 0, 0, y.width, y.height);
						let D = T.getImageData(0, 0, y.width, y.height);
						l.height = y.height, l.width = y.width, g(Kt(D.data, l));
					};
				});
				throw new Error("Input data provided is not supported - aborted tensor creation");
			}
			if (c !== void 0) return Kt(c, l);
			throw new Error("Input data provided is not supported - aborted tensor creation");
		}, vr = (n, t) => {
			let { width: a, height: u, download: o, dispose: d } = t;
			return new Z({
				location: "texture",
				type: "float32",
				texture: n,
				dims: [
					1,
					u,
					a,
					4
				],
				download: o,
				dispose: d
			});
		}, Ar = (n, t) => {
			let { dataType: a, dims: u, download: o, dispose: d } = t;
			return new Z({
				location: "gpu-buffer",
				type: a ?? "float32",
				gpuBuffer: n,
				dims: u,
				download: o,
				dispose: d
			});
		}, Or = (n, t) => {
			let { dataType: a, dims: u, download: o, dispose: d } = t;
			return new Z({
				location: "ml-tensor",
				type: a ?? "float32",
				mlTensor: n,
				dims: u,
				download: o,
				dispose: d
			});
		}, Ir = (n, t, a) => new Z({
			location: "cpu-pinned",
			type: n,
			data: t,
			dims: a ?? [t.length]
		});
	});
	var Le, Xe, Lr, _r, Dr = N(() => {
		"use strict";
		Le = new Map([
			["float32", Float32Array],
			["uint8", Uint8Array],
			["int8", Int8Array],
			["uint16", Uint16Array],
			["int16", Int16Array],
			["int32", Int32Array],
			["bool", Uint8Array],
			["float64", Float64Array],
			["uint32", Uint32Array],
			["int4", Uint8Array],
			["uint4", Uint8Array]
		]), Xe = new Map([
			[Float32Array, "float32"],
			[Uint8Array, "uint8"],
			[Int8Array, "int8"],
			[Uint16Array, "uint16"],
			[Int16Array, "int16"],
			[Int32Array, "int32"],
			[Float64Array, "float64"],
			[Uint32Array, "uint32"]
		]), Lr = !1, _r = () => {
			if (!Lr) {
				Lr = !0;
				let n = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, a = globalThis.Float16Array, u = typeof a < "u" && a.from;
				n && (Le.set("int64", BigInt64Array), Xe.set(BigInt64Array, "int64")), t && (Le.set("uint64", BigUint64Array), Xe.set(BigUint64Array, "uint64")), u ? (Le.set("float16", a), Xe.set(a, "float16")) : Le.set("float16", Uint16Array);
			}
		};
	});
	var Pr, Ur, xr = N(() => {
		"use strict";
		ct();
		Pr = (n) => {
			let t = 1;
			for (let a = 0; a < n.length; a++) {
				let u = n[a];
				if (typeof u != "number" || !Number.isSafeInteger(u)) throw new TypeError(`dims[${a}] must be an integer, got: ${u}`);
				if (u < 0) throw new RangeError(`dims[${a}] must be a non-negative integer, got: ${u}`);
				t *= u;
			}
			return t;
		}, Ur = (n, t) => {
			switch (n.location) {
				case "cpu": return new Z(n.type, n.data, t);
				case "cpu-pinned": return new Z({
					location: "cpu-pinned",
					data: n.data,
					type: n.type,
					dims: t
				});
				case "texture": return new Z({
					location: "texture",
					texture: n.texture,
					type: n.type,
					dims: t
				});
				case "gpu-buffer": return new Z({
					location: "gpu-buffer",
					gpuBuffer: n.gpuBuffer,
					type: n.type,
					dims: t
				});
				case "ml-tensor": return new Z({
					location: "ml-tensor",
					mlTensor: n.mlTensor,
					type: n.type,
					dims: t
				});
				default: throw new Error(`tensorReshape: tensor location ${n.location} is not supported`);
			}
		};
	});
	var Z, ct = N(() => {
		"use strict";
		Tr();
		Br();
		Dr();
		xr();
		Z = class {
			constructor(t, a, u) {
				_r();
				let o, d;
				if (typeof t == "object" && "location" in t) switch (this.dataLocation = t.location, o = t.type, d = t.dims, t.location) {
					case "cpu-pinned": {
						let l = Le.get(o);
						if (!l) throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);
						if (!(t.data instanceof l)) throw new TypeError(`buffer should be of type ${l.name}`);
						this.cpuData = t.data;
						break;
					}
					case "texture":
						if (o !== "float32") throw new TypeError(`unsupported type "${o}" to create tensor from texture`);
						this.gpuTextureData = t.texture, this.downloader = t.download, this.disposer = t.dispose;
						break;
					case "gpu-buffer":
						if (o !== "float32" && o !== "float16" && o !== "int32" && o !== "int64" && o !== "uint32" && o !== "uint8" && o !== "bool" && o !== "uint4" && o !== "int4") throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);
						this.gpuBufferData = t.gpuBuffer, this.downloader = t.download, this.disposer = t.dispose;
						break;
					case "ml-tensor":
						if (o !== "float32" && o !== "float16" && o !== "int32" && o !== "int64" && o !== "uint32" && o !== "uint64" && o !== "int8" && o !== "uint8" && o !== "bool" && o !== "uint4" && o !== "int4") throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);
						this.mlTensorData = t.mlTensor, this.downloader = t.download, this.disposer = t.dispose;
						break;
					default: throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
				}
				else {
					let l, m;
					if (typeof t == "string") if (o = t, m = u, t === "string") {
						if (!Array.isArray(a)) throw new TypeError("A string tensor's data must be a string array.");
						l = a;
					} else {
						let h = Le.get(t);
						if (h === void 0) throw new TypeError(`Unsupported tensor type: ${t}.`);
						if (Array.isArray(a)) {
							if (t === "float16" && h === Uint16Array || t === "uint4" || t === "int4") throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${h.name} as data.`);
							t === "uint64" || t === "int64" ? l = h.from(a, BigInt) : l = h.from(a);
						} else if (a instanceof h) l = a;
						else if (a instanceof Uint8ClampedArray) if (t === "uint8") l = Uint8Array.from(a);
						else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
						else if (t === "float16" && a instanceof Uint16Array && h !== Uint16Array) l = new globalThis.Float16Array(a.buffer, a.byteOffset, a.length);
						else throw new TypeError(`A ${o} tensor's data must be type of ${h}`);
					}
					else if (m = a, Array.isArray(t)) {
						if (t.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
						let h = typeof t[0];
						if (h === "string") o = "string", l = t;
						else if (h === "boolean") o = "bool", l = Uint8Array.from(t);
						else throw new TypeError(`Invalid element type of data array: ${h}.`);
					} else if (t instanceof Uint8ClampedArray) o = "uint8", l = Uint8Array.from(t);
					else {
						let h = Xe.get(t.constructor);
						if (h === void 0) throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);
						o = h, l = t;
					}
					if (m === void 0) m = [l.length];
					else if (!Array.isArray(m)) throw new TypeError("A tensor's dims must be a number array");
					d = m, this.cpuData = l, this.dataLocation = "cpu";
				}
				let c = Pr(d);
				if (this.cpuData && c !== this.cpuData.length && !((o === "uint4" || o === "int4") && Math.ceil(c / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${c}) does not match data length(${this.cpuData.length}).`);
				this.type = o, this.dims = d, this.size = c;
			}
			static async fromImage(t, a) {
				return Sr(t, a);
			}
			static fromTexture(t, a) {
				return vr(t, a);
			}
			static fromGpuBuffer(t, a) {
				return Ar(t, a);
			}
			static fromMLTensor(t, a) {
				return Or(t, a);
			}
			static fromPinnedBuffer(t, a, u) {
				return Ir(t, a, u);
			}
			toDataURL(t) {
				return gr(this, t);
			}
			toImageData(t) {
				return Er(this, t);
			}
			get data() {
				if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
				return this.cpuData;
			}
			get location() {
				return this.dataLocation;
			}
			get texture() {
				if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
				return this.gpuTextureData;
			}
			get gpuBuffer() {
				if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
				return this.gpuBufferData;
			}
			get mlTensor() {
				if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
				return this.mlTensorData;
			}
			async getData(t) {
				switch (this.ensureValid(), this.dataLocation) {
					case "cpu":
					case "cpu-pinned": return this.data;
					case "texture":
					case "gpu-buffer":
					case "ml-tensor":
						if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
						if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
						try {
							this.isDownloading = !0;
							let a = await this.downloader();
							return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = a, t && this.disposer && (this.disposer(), this.disposer = void 0), a;
						} finally {
							this.isDownloading = !1;
						}
					default: throw new Error(`cannot get data from location: ${this.dataLocation}`);
				}
			}
			dispose() {
				if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
				this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
			}
			ensureValid() {
				if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
			}
			reshape(t) {
				if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
				return Ur(this, t);
			}
		};
	});
	var de, en = N(() => {
		"use strict";
		ct();
		de = Z;
	});
	var Cr, Mr, _e, De, Pe, Ue, tn = N(() => {
		"use strict";
		Qt();
		Cr = (n, t) => {
			(typeof q.trace > "u" ? !q.wasm.trace : !q.trace) || console.timeStamp(`${n}::ORT::${t}`);
		}, Mr = (n, t) => {
			let a = (/* @__PURE__ */ new Error()).stack?.split(/\r\n|\r|\n/g) || [], u = !1;
			for (let o = 0; o < a.length; o++) {
				if (u && !a[o].includes("TRACE_FUNC")) {
					let d = `FUNC_${n}::${a[o].trim().split(" ")[1]}`;
					t && (d += `::${t}`), Cr("CPU", d);
					return;
				}
				a[o].includes("TRACE_FUNC") && (u = !0);
			}
		}, _e = (n) => {
			(typeof q.trace > "u" ? !q.wasm.trace : !q.trace) || Mr("BEGIN", n);
		}, De = (n) => {
			(typeof q.trace > "u" ? !q.wasm.trace : !q.trace) || Mr("END", n);
		}, Pe = (n) => {
			(typeof q.trace > "u" ? !q.wasm.trace : !q.trace) || console.time(`ORT::${n}`);
		}, Ue = (n) => {
			(typeof q.trace > "u" ? !q.wasm.trace : !q.trace) || console.timeEnd(`ORT::${n}`);
		};
	});
	var lt, Rr = N(() => {
		"use strict";
		Zt();
		en();
		tn();
		lt = class n {
			constructor(t) {
				this.handler = t;
			}
			async run(t, a, u) {
				_e(), Pe("InferenceSession.run");
				let o = {}, d = {};
				if (typeof t != "object" || t === null || t instanceof de || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
				let c = !0;
				if (typeof a == "object") {
					if (a === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
					if (a instanceof de) throw new TypeError("'fetches' cannot be a Tensor");
					if (Array.isArray(a)) {
						if (a.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
						c = !1;
						for (let h of a) {
							if (typeof h != "string") throw new TypeError("'fetches' must be a string array or an object.");
							if (this.outputNames.indexOf(h) === -1) throw new RangeError(`'fetches' contains invalid output name: ${h}.`);
							o[h] = null;
						}
						if (typeof u == "object" && u !== null) d = u;
						else if (typeof u < "u") throw new TypeError("'options' must be an object.");
					} else {
						let h = !1, g = Object.getOwnPropertyNames(a);
						for (let b of this.outputNames) if (g.indexOf(b) !== -1) {
							let y = a[b];
							(y === null || y instanceof de) && (h = !0, c = !1, o[b] = y);
						}
						if (h) {
							if (typeof u == "object" && u !== null) d = u;
							else if (typeof u < "u") throw new TypeError("'options' must be an object.");
						} else d = a;
					}
				} else if (typeof a < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
				for (let h of this.inputNames) if (typeof t[h] > "u") throw new Error(`input '${h}' is missing in 'feeds'.`);
				if (c) for (let h of this.outputNames) o[h] = null;
				let l = await this.handler.run(t, o, d), m = {};
				for (let h in l) if (Object.hasOwnProperty.call(l, h)) {
					let g = l[h];
					g instanceof de ? m[h] = g : m[h] = new de(g.type, g.data, g.dims);
				}
				return Ue("InferenceSession.run"), De(), m;
			}
			async release() {
				return this.handler.dispose();
			}
			static async create(t, a, u, o) {
				_e(), Pe("InferenceSession.create");
				let d, c = {};
				if (typeof t == "string") {
					if (d = t, typeof a == "object" && a !== null) c = a;
					else if (typeof a < "u") throw new TypeError("'options' must be an object.");
				} else if (t instanceof Uint8Array) {
					if (d = t, typeof a == "object" && a !== null) c = a;
					else if (typeof a < "u") throw new TypeError("'options' must be an object.");
				} else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
					let g = t, b = 0, y = t.byteLength;
					if (typeof a == "object" && a !== null) c = a;
					else if (typeof a == "number") {
						if (b = a, !Number.isSafeInteger(b)) throw new RangeError("'byteOffset' must be an integer.");
						if (b < 0 || b >= g.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${g.byteLength}).`);
						if (y = t.byteLength - b, typeof u == "number") {
							if (y = u, !Number.isSafeInteger(y)) throw new RangeError("'byteLength' must be an integer.");
							if (y <= 0 || b + y > g.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${g.byteLength - b}].`);
							if (typeof o == "object" && o !== null) c = o;
							else if (typeof o < "u") throw new TypeError("'options' must be an object.");
						} else if (typeof u < "u") throw new TypeError("'byteLength' must be a number.");
					} else if (typeof a < "u") throw new TypeError("'options' must be an object.");
					d = new Uint8Array(g, b, y);
				} else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
				let [l, m] = await pr(c), h = await l.createInferenceSessionHandler(d, m);
				return Ue("InferenceSession.create"), De(), new n(h);
			}
			startProfiling() {
				this.handler.startProfiling();
			}
			endProfiling() {
				this.handler.endProfiling();
			}
			get inputNames() {
				return this.handler.inputNames;
			}
			get outputNames() {
				return this.handler.outputNames;
			}
			get inputMetadata() {
				return this.handler.inputMetadata;
			}
			get outputMetadata() {
				return this.handler.outputMetadata;
			}
		};
	});
	var rs, Fr = N(() => {
		"use strict";
		Rr();
		rs = lt;
	});
	var Nr = N(() => {
		"use strict";
	});
	var kr = N(() => {
		"use strict";
	});
	var Wr = N(() => {
		"use strict";
	});
	var Gr = N(() => {
		"use strict";
	});
	ut({}, {
		InferenceSession: () => rs,
		TRACE: () => Cr,
		TRACE_EVENT_BEGIN: () => Pe,
		TRACE_EVENT_END: () => Ue,
		TRACE_FUNC_BEGIN: () => _e,
		TRACE_FUNC_END: () => De,
		Tensor: () => de,
		env: () => Y,
		registerBackend: () => Je
	});
	var Te = N(() => {
		"use strict";
		mr();
		yr();
		Fr();
		en();
		Nr();
		kr();
		tn();
		Wr();
		Gr();
	});
	var dt = N(() => {
		"use strict";
	});
	var jr = {};
	ut(jr, { default: () => os });
	var zr, Hr, os, Vr = N(() => {
		"use strict";
		rn();
		xe();
		pt();
		zr = "ort-wasm-proxy-worker", Hr = globalThis.self?.name === zr;
		Hr && (self.onmessage = (n) => {
			let { type: t, in: a } = n.data;
			try {
				switch (t) {
					case "init-wasm":
						mt(a.wasm).then(() => {
							ht(a).then(() => {
								postMessage({ type: t });
							}, (u) => {
								postMessage({
									type: t,
									err: u
								});
							});
						}, (u) => {
							postMessage({
								type: t,
								err: u
							});
						});
						break;
					case "init-ep": {
						let { epName: u, env: o } = a;
						wt(o, u).then(() => {
							postMessage({ type: t });
						}, (d) => {
							postMessage({
								type: t,
								err: d
							});
						});
						break;
					}
					case "copy-from": {
						let { buffer: u } = a, o = Ze(u);
						postMessage({
							type: t,
							out: o
						});
						break;
					}
					case "create": {
						let { model: u, options: o } = a;
						bt(u, o).then((d) => {
							postMessage({
								type: t,
								out: d
							});
						}, (d) => {
							postMessage({
								type: t,
								err: d
							});
						});
						break;
					}
					case "release":
						yt(a), postMessage({ type: t });
						break;
					case "run": {
						let { sessionId: u, inputIndices: o, inputs: d, outputIndices: c, options: l } = a;
						gt(u, o, d, c, new Array(c.length).fill(null), l).then((m) => {
							m.some((h) => h[3] !== "cpu") ? postMessage({
								type: t,
								err: "Proxy does not support non-cpu tensor location."
							}) : postMessage({
								type: t,
								out: m
							}, Tt([...d, ...m]));
						}, (m) => {
							postMessage({
								type: t,
								err: m
							});
						});
						break;
					}
					case "end-profiling":
						Et(a), postMessage({ type: t });
						break;
					default:
				}
			} catch (u) {
				postMessage({
					type: t,
					err: u
				});
			}
		});
		os = Hr ? null : (n) => new Worker(n ?? oe, {
			type: "module",
			name: zr
		});
	});
	var qr = {};
	ut(qr, { default: () => as });
	async function Yr(n = {}) {
		var t = n, a = !!globalThis.window, u = !!globalThis.WorkerGlobalScope, o = u && self.name?.startsWith("em-pthread");
		t.mountExternalData = (e, r) => {
			e.startsWith("./") && (e = e.substring(2)), (t.Tb || (t.Tb = /* @__PURE__ */ new Map())).set(e, r);
		}, t.unmountExternalData = () => {
			delete t.Tb, delete t.mc, delete t.lc, delete t.nc;
		}, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({
			initial: 0,
			maximum: 0,
			shared: !0
		}).buffer.constructor;
		var d, c, l = (e, r) => {
			throw r;
		}, m = self.location.href, h = "";
		if (a || u) {
			try {
				h = new URL(".", m).href;
			} catch {}
			u && (c = (e) => {
				var r = new XMLHttpRequest();
				return r.open("GET", e, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
			}), d = async (e) => {
				if (k(e)) return new Promise((i, s) => {
					var f = new XMLHttpRequest();
					f.open("GET", e, !0), f.responseType = "arraybuffer", f.onload = () => {
						f.status == 200 || f.status == 0 && f.response ? i(f.response) : s(f.status);
					}, f.onerror = s, f.send(null);
				});
				var r = await fetch(e, { credentials: "same-origin" });
				if (r.ok) return r.arrayBuffer();
				throw Error(r.status + " : " + r.url);
			};
		}
		var g, b, y, T, I, D, $ = console.log.bind(console), v = console.error.bind(console), A = $, F = v, P = !1, k = (e) => e.startsWith("file://");
		function w() {
			ge.buffer != H.buffer && ee();
		}
		if (o) {
			let e = function(r) {
				try {
					var i = r.data, s = i.Rb;
					if (s === "load") {
						let f = [];
						self.onmessage = (p) => f.push(p), D = () => {
							postMessage({ Rb: "loaded" });
							for (let p of f) e(p);
							self.onmessage = e;
						};
						for (let p of i.ac) t[p] && !t[p].proxy || (t[p] = (...E) => {
							postMessage({
								Rb: "callHandler",
								$b: p,
								args: E
							});
						}, p == "print" && (A = t[p]), p == "printErr" && (F = t[p]));
						ge = i.fc, ee(), b = i.hc, Ut(), it();
					} else if (s === "run") {
						(function(f) {
							var p = (w(), W)[f + 52 >>> 2 >>> 0];
							f = (w(), W)[f + 56 >>> 2 >>> 0], ir(p, p - f), _(p);
						})(i.Qb), zt(i.Qb, 0, 0, 1, 0, 0), wn(), Ft(i.Qb), Q ||= !0;
						try {
							Io(i.dc, i.Vb);
						} catch (f) {
							if (f != "unwind") throw f;
						}
					} else i.target !== "setimmediate" && (s === "checkMailbox" ? Q && rt() : s && (F(`worker: received unknown command ${s}`), F(i)));
				} catch (f) {
					throw nr(), f;
				}
			};
			var Q = !1;
			self.onunhandledrejection = (r) => {
				throw r.reason || r;
			}, self.onmessage = e;
		}
		var H, ne, pe, B, W, re, me, O, K, je = !1;
		function ee() {
			var e = ge.buffer;
			t.HEAP8 = H = new Int8Array(e), pe = new Int16Array(e), t.HEAPU8 = ne = new Uint8Array(e), new Uint16Array(e), t.HEAP32 = B = new Int32Array(e), t.HEAPU32 = W = new Uint32Array(e), re = new Float32Array(e), me = new Float64Array(e), O = new BigInt64Array(e), new BigUint64Array(e);
		}
		function he() {
			je = !0, o ? D() : Ee.Va();
		}
		function j(e) {
			throw F(e = "Aborted(" + e + ")"), P = !0, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), I?.(e), e;
		}
		function J() {
			return { a: {
				T: ca,
				f: Bo,
				w: Lo,
				e: _o,
				k: Do,
				h: Po,
				L: Uo,
				b: xo,
				G: Co,
				ua: vn,
				j: Mo,
				M: In,
				La: Bn,
				qa: Ln,
				sa: _n,
				Ma: Dn,
				Ja: Pn,
				Ca: Un,
				Ia: xn,
				Z: Cn,
				ra: Mn,
				oa: Rn,
				Ka: Fn,
				pa: Nn,
				Ra: Ro,
				Fa: Fo,
				ma: ko,
				va: Wo,
				ja: Go,
				U: $o,
				Ea: Ft,
				Oa: zo,
				za: Ho,
				Aa: jo,
				Ba: Vo,
				xa: $n,
				ya: zn,
				ka: Hn,
				Ta: qo,
				Qa: Zo,
				W: Qo,
				V: Ko,
				Pa: Jo,
				F: ea,
				Na: ta,
				na,
				u: Yo,
				H: ra,
				S: at,
				la: aa,
				ba: oa,
				Ua: sa,
				Ga: Yn,
				Ha: qn,
				ta: ye,
				I: Jn,
				wa: Xn,
				Y: Zn,
				Da: Qn,
				X: Kn,
				$: Ya,
				N: $a,
				aa: Va,
				O: Ga,
				v: Da,
				d: ma,
				m: da,
				n: la,
				r: Aa,
				ca: Na,
				E: Fa,
				o: ba,
				P: ka,
				C: za,
				J: Ra,
				da: Ma,
				ea: Ca,
				z: Oa,
				fa: Ua,
				Q: xa,
				ga: Pa,
				y: La,
				D: Wa,
				c: pa,
				q: wa,
				i: ha,
				_: qa,
				l: ga,
				p: Ea,
				s: ya,
				t: Ta,
				x: Ia,
				R: _a,
				A: Ha,
				K: Ba,
				B: ja,
				ha: va,
				ia: Sa,
				g: ua,
				a: ge,
				Sa: V
			} };
		}
		async function Ut() {
			function e(s, f) {
				return Ee = s.exports, Ee = (function() {
					var p = Ee, E = (C) => () => C() >>> 0, S = (C) => (R) => C(R) >>> 0;
					return (p = Object.assign({}, p)).ub = E(p.ub), p.wb = S(p.wb), p.Kb = S(p.Kb), p.Lb = E(p.Lb), p.Pb = S(p.Pb), p;
				})(), mn.push(Ee.xb), s = Ee, t._OrtInit = s.Wa, t._OrtGetLastError = s.Xa, t._OrtCreateSessionOptions = s.Ya, t._OrtAppendExecutionProvider = s.Za, t._OrtAddFreeDimensionOverride = s._a, t._OrtAddSessionConfigEntry = s.$a, t._OrtReleaseSessionOptions = s.ab, t._OrtCreateSession = s.bb, t._OrtReleaseSession = s.cb, t._OrtGetInputOutputCount = s.db, t._OrtGetInputOutputMetadata = s.eb, t._OrtFree = s.fb, t._OrtCreateTensor = s.gb, t._OrtGetTensorData = s.hb, t._OrtReleaseTensor = s.ib, t._OrtCreateRunOptions = s.jb, t._OrtAddRunConfigEntry = s.kb, t._OrtReleaseRunOptions = s.lb, t._OrtCreateBinding = s.mb, t._OrtBindInput = s.nb, t._OrtBindOutput = s.ob, t._OrtClearBoundOutputs = s.pb, t._OrtReleaseBinding = s.qb, t._OrtRunWithBinding = s.rb, t._OrtRun = s.sb, t._OrtEndProfiling = s.tb, st = s.ub, er = t._free = s.vb, tr = t._malloc = s.wb, zt = s.zb, nr = s.Ab, rr = s.Bb, or = s.Cb, Ht = s.Db, ar = s.Eb, sr = s.Fb, x = s.Gb, qe = s.Hb, ir = s.Ib, _ = s.Jb, jt = s.Kb, U = s.Lb, ur = s.Mb, Vt = s.Nb, fr = s.Ob, cr = s.Pb, lr = s.yb, b = f, Ee;
			}
			var r, i = J();
			return t.instantiateWasm ? new Promise((s) => {
				t.instantiateWasm(i, (f, p) => {
					s(e(f, p));
				});
			}) : o ? e(new WebAssembly.Instance(b, J()), b) : (K ??= t.locateFile ? t.locateFile ? t.locateFile("ort-wasm-simd-threaded.wasm", h) : h + "ort-wasm-simd-threaded.wasm" : new URL("/assets/ort-wasm-simd-threaded-4byDm7i3.wasm", "" + self.location.href).href, r = await (async function(s) {
				var f = K;
				if (!g && !k(f)) try {
					var p = fetch(f, { credentials: "same-origin" });
					return await WebAssembly.instantiateStreaming(p, s);
				} catch (E) {
					F(`wasm streaming compile failed: ${E}`), F("falling back to ArrayBuffer instantiation");
				}
				return (async function(E, S) {
					try {
						var C = await (async function(R) {
							if (!g) try {
								var X = await d(R);
								return new Uint8Array(X);
							} catch {}
							if (R == K && g) R = new Uint8Array(g);
							else {
								if (!c) throw "both async and sync fetching of the wasm failed";
								R = c(R);
							}
							return R;
						})(E);
						return await WebAssembly.instantiate(C, S);
					} catch (R) {
						F(`failed to asynchronously prepare wasm: ${R}`), j(R);
					}
				})(f, s);
			})(i), e(r.instance, r.module));
		}
		class Se {
			name = "ExitStatus";
			constructor(r) {
				this.message = `Program terminated with exit(${r})`, this.status = r;
			}
		}
		var ve = (e) => {
			e.terminate(), e.onmessage = () => {};
		}, Ve = [], Re = 0, te = null, ue = (e) => {
			ce.length == 0 && (yn(), bn(ce[0]));
			var r = ce.pop();
			if (!r) return 6;
			Fe.push(r), Ae[e.Qb] = r, r.Qb = e.Qb;
			var i = {
				Rb: "run",
				dc: e.cc,
				Vb: e.Vb,
				Qb: e.Qb
			};
			return r.postMessage(i, e.Zb), 0;
		}, se = 0, L = (e, r, ...i) => {
			var s, f = 16 * i.length, p = U(), E = jt(f), S = E >>> 3;
			for (s of i) typeof s == "bigint" ? ((w(), O)[S++ >>> 0] = 1n, (w(), O)[S++ >>> 0] = s) : ((w(), O)[S++ >>> 0] = 0n, (w(), me)[S++ >>> 0] = s);
			return e = rr(e, 0, f, E, r), _(p), e;
		};
		function V(e) {
			if (o) return L(0, 1, e);
			if (y = e, !(0 < se)) {
				for (var r of Fe) ve(r);
				for (r of ce) ve(r);
				ce = [], Fe = [], Ae = {}, P = !0;
			}
			l(0, new Se(e));
		}
		function fe(e) {
			if (o) return L(1, 0, e);
			ye(e);
		}
		var ye = (e) => {
			if (y = e, o) throw fe(e), "unwind";
			V(e);
		}, ce = [], Fe = [], mn = [], Ae = {}, hn = (e) => {
			var r = e.Qb;
			delete Ae[r], ce.push(e), Fe.splice(Fe.indexOf(e), 1), e.Qb = 0, or(r);
		};
		function wn() {
			mn.forEach((e) => e());
		}
		var bn = (e) => new Promise((r) => {
			e.onmessage = (f) => {
				var p = f.data;
				if (f = p.Rb, p.Ub && p.Ub != st()) {
					var E = Ae[p.Ub];
					E ? E.postMessage(p, p.Zb) : F(`Internal error! Worker sent a message "${f}" to target pthread ${p.Ub}, but that thread no longer exists!`);
				} else f === "checkMailbox" ? rt() : f === "spawnThread" ? ue(p) : f === "cleanupThread" ? Rt(() => {
					hn(Ae[p.ec]);
				}) : f === "loaded" ? (e.loaded = !0, r(e)) : p.target === "setimmediate" ? e.postMessage(p) : f === "uncaughtException" ? e.onerror(p.error) : f === "callHandler" ? t[p.$b](...p.args) : f && F(`worker sent an unknown command ${f}`);
			}, e.onerror = (f) => {
				throw F(`worker sent an error! ${f.filename}:${f.lineno}: ${f.message}`), f;
			};
			var i, s = [];
			for (i of []) t.propertyIsEnumerable(i) && s.push(i);
			e.postMessage({
				Rb: "load",
				ac: s,
				fc: ge,
				hc: b
			});
		});
		function yn() {
			var e = new Worker((() => {
				let r = URL;
				return self.location.href > "file:" && self.location.href < "file;" ? new r("ort.wasm.bundle.min.mjs", self.location.href) : new URL(self.location.href);
			})(), {
				type: "module",
				workerData: "em-pthread",
				name: "em-pthread"
			});
			ce.push(e);
		}
		var ge, gn = [], M = (e) => {
			var r = gn[e];
			return r || (gn[e] = r = lr.get(e)), r;
		}, Io = (e, r) => {
			se = 0, e = M(e)(r), 0 < se ? y = e : Ht(e);
		}, tt = [], nt = 0;
		function Bo(e) {
			var r = new xt(e >>>= 0);
			return (w(), H)[r.Sb + 12 >>> 0] == 0 && (En(r, !0), nt--), Tn(r, !1), tt.push(r), cr(e);
		}
		var Ne = 0, Lo = () => {
			x(0, 0);
			var e = tt.pop();
			ur(e.Wb), Ne = 0;
		};
		function En(e, r) {
			r = r ? 1 : 0, (w(), H)[e.Sb + 12 >>> 0] = r;
		}
		function Tn(e, r) {
			r = r ? 1 : 0, (w(), H)[e.Sb + 13 >>> 0] = r;
		}
		class xt {
			constructor(r) {
				this.Wb = r, this.Sb = r - 24;
			}
		}
		var Ct = (e) => {
			var r = Ne;
			if (!r) return qe(0), 0;
			var i = new xt(r);
			(w(), W)[i.Sb + 16 >>> 2 >>> 0] = r;
			var s = (w(), W)[i.Sb + 4 >>> 2 >>> 0];
			if (!s) return qe(0), r;
			for (var f of e) {
				if (f === 0 || f === s) break;
				if (fr(f, s, i.Sb + 16)) return qe(f), r;
			}
			return qe(s), r;
		};
		function _o() {
			return Ct([]);
		}
		function Do(e) {
			return Ct([e >>> 0]);
		}
		function Po(e, r, i, s) {
			return Ct([
				e >>> 0,
				r >>> 0,
				i >>> 0,
				s >>> 0
			]);
		}
		var Uo = () => {
			var e = tt.pop();
			e || j("no exception to throw");
			var r = e.Wb;
			throw (w(), H)[e.Sb + 13 >>> 0] == 0 && (tt.push(e), Tn(e, !0), En(e, !1), nt++), Vt(r), Ne = r;
		};
		function xo(e, r, i) {
			var s = new xt(e >>>= 0);
			throw r >>>= 0, i >>>= 0, (w(), W)[s.Sb + 16 >>> 2 >>> 0] = 0, (w(), W)[s.Sb + 4 >>> 2 >>> 0] = r, (w(), W)[s.Sb + 8 >>> 2 >>> 0] = i, Vt(e), nt++, Ne = e;
		}
		var Co = () => nt;
		function Sn(e, r, i, s) {
			return o ? L(2, 1, e, r, i, s) : vn(e, r, i, s);
		}
		function vn(e, r, i, s) {
			if (e >>>= 0, r >>>= 0, i >>>= 0, s >>>= 0, !globalThis.SharedArrayBuffer) return 6;
			var f = [];
			return o && f.length === 0 ? Sn(e, r, i, s) : (e = {
				cc: i,
				Qb: e,
				Vb: s,
				Zb: f
			}, o ? (e.Rb = "spawnThread", postMessage(e, f), 0) : ue(e));
		}
		function Mo(e) {
			throw Ne ||= e >>> 0, Ne;
		}
		var An = globalThis.TextDecoder && new TextDecoder(), On = (e, r = 0, i, s) => {
			var f = r >>>= 0;
			if (i = f + i, s) s = i;
			else {
				for (; e[f] && !(f >= i);) ++f;
				s = f;
			}
			if (16 < s - r && e.buffer && An) return An.decode(e.buffer instanceof ArrayBuffer ? e.subarray(r, s) : e.slice(r, s));
			for (f = ""; r < s;) if (128 & (i = e[r++])) {
				var p = 63 & e[r++];
				if ((224 & i) == 192) f += String.fromCharCode((31 & i) << 6 | p);
				else {
					var E = 63 & e[r++];
					65536 > (i = (240 & i) == 224 ? (15 & i) << 12 | p << 6 | E : (7 & i) << 18 | p << 12 | E << 6 | 63 & e[r++]) ? f += String.fromCharCode(i) : (i -= 65536, f += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i));
				}
			} else f += String.fromCharCode(i);
			return f;
		}, Mt = (e, r, i) => (e >>>= 0) ? On((w(), ne), e, r, i) : "";
		function In(e, r, i) {
			return o ? L(3, 1, e, r, i) : 0;
		}
		function Bn(e, r) {
			if (o) return L(4, 1, e, r);
		}
		function Ln(e, r) {
			if (o) return L(5, 1, e, r);
		}
		function _n(e, r, i) {
			if (o) return L(6, 1, e, r, i);
		}
		function Dn(e, r, i) {
			return o ? L(7, 1, e, r, i) : 0;
		}
		function Pn(e, r) {
			if (o) return L(8, 1, e, r);
		}
		function Un(e, r, i) {
			if (o) return L(9, 1, e, r, i);
		}
		function xn(e, r, i, s) {
			if (o) return L(10, 1, e, r, i, s);
		}
		function Cn(e, r, i, s) {
			if (o) return L(11, 1, e, r, i, s);
		}
		function Mn(e, r, i, s) {
			if (o) return L(12, 1, e, r, i, s);
		}
		function Rn(e) {
			if (o) return L(13, 1, e);
		}
		function Fn(e, r) {
			if (o) return L(14, 1, e, r);
		}
		function Nn(e, r, i) {
			if (o) return L(15, 1, e, r, i);
		}
		var Ro = () => j("");
		function Fo(e) {
			zt(e >>> 0, !u, 1, !a, 131072, !1), wn();
		}
		var Rt = (e) => {
			if (!P) try {
				if (e(), !(0 < se)) try {
					o ? st() && Ht(y) : ye(y);
				} catch (r) {
					r instanceof Se || r == "unwind" || l(0, r);
				}
			} catch (r) {
				r instanceof Se || r == "unwind" || l(0, r);
			}
		}, No = !Atomics.waitAsync || globalThis.navigator?.userAgent && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]);
		function Ft(e) {
			e >>>= 0, No || (Atomics.waitAsync((w(), B), e >>> 2, e).value.then(rt), e += 128, Atomics.store((w(), B), e >>> 2, 1));
		}
		var rt = () => Rt(() => {
			var e = st();
			e && (Ft(e), sr());
		});
		function ko(e, r) {
			(e >>>= 0) == r >>> 0 ? setTimeout(rt) : o ? postMessage({
				Ub: e,
				Rb: "checkMailbox"
			}) : (e = Ae[e]) && e.postMessage({ Rb: "checkMailbox" });
		}
		var Nt = [];
		function Wo(e, r, i, s, f) {
			for (r >>>= 0, f >>>= 0, Nt.length = 0, i = f >>> 3, s = f + s >>> 3; i < s;) {
				var p = (w(), O)[i++ >>> 0] ? (w(), O)[i++ >>> 0] : (w(), me)[i++ >>> 0];
				Nt.push(p);
			}
			return (r ? dr[r] : fa[e])(...Nt);
		}
		var Go = () => {
			se = 0;
		};
		function $o(e) {
			e >>>= 0, o ? postMessage({
				Rb: "cleanupThread",
				ec: e
			}) : hn(Ae[e]);
		}
		function zo(e) {}
		function Ho(e, r) {
			e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), r >>>= 0, e = /* @__PURE__ */ new Date(1e3 * e), (w(), B)[r >>> 2 >>> 0] = e.getUTCSeconds(), (w(), B)[r + 4 >>> 2 >>> 0] = e.getUTCMinutes(), (w(), B)[r + 8 >>> 2 >>> 0] = e.getUTCHours(), (w(), B)[r + 12 >>> 2 >>> 0] = e.getUTCDate(), (w(), B)[r + 16 >>> 2 >>> 0] = e.getUTCMonth(), (w(), B)[r + 20 >>> 2 >>> 0] = e.getUTCFullYear() - 1900, (w(), B)[r + 24 >>> 2 >>> 0] = e.getUTCDay(), e = (e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (w(), B)[r + 28 >>> 2 >>> 0] = e;
		}
		var kn = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0), Wn = [
			0,
			31,
			60,
			91,
			121,
			152,
			182,
			213,
			244,
			274,
			305,
			335
		], Gn = [
			0,
			31,
			59,
			90,
			120,
			151,
			181,
			212,
			243,
			273,
			304,
			334
		];
		function jo(e, r) {
			e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), r >>>= 0, e = /* @__PURE__ */ new Date(1e3 * e), (w(), B)[r >>> 2 >>> 0] = e.getSeconds(), (w(), B)[r + 4 >>> 2 >>> 0] = e.getMinutes(), (w(), B)[r + 8 >>> 2 >>> 0] = e.getHours(), (w(), B)[r + 12 >>> 2 >>> 0] = e.getDate(), (w(), B)[r + 16 >>> 2 >>> 0] = e.getMonth(), (w(), B)[r + 20 >>> 2 >>> 0] = e.getFullYear() - 1900, (w(), B)[r + 24 >>> 2 >>> 0] = e.getDay();
			var i = (kn(e.getFullYear()) ? Wn : Gn)[e.getMonth()] + e.getDate() - 1 | 0;
			(w(), B)[r + 28 >>> 2 >>> 0] = i, (w(), B)[r + 36 >>> 2 >>> 0] = -60 * e.getTimezoneOffset(), i = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
			var s = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
			e = 0 | (i != s && e.getTimezoneOffset() == Math.min(s, i)), (w(), B)[r + 32 >>> 2 >>> 0] = e;
		}
		function Vo(e) {
			e >>>= 0;
			var r = new Date((w(), B)[e + 20 >>> 2 >>> 0] + 1900, (w(), B)[e + 16 >>> 2 >>> 0], (w(), B)[e + 12 >>> 2 >>> 0], (w(), B)[e + 8 >>> 2 >>> 0], (w(), B)[e + 4 >>> 2 >>> 0], (w(), B)[e >>> 2 >>> 0], 0), i = (w(), B)[e + 32 >>> 2 >>> 0], s = r.getTimezoneOffset(), f = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(), p = new Date(r.getFullYear(), 0, 1).getTimezoneOffset(), E = Math.min(p, f);
			return 0 > i ? (w(), B)[e + 32 >>> 2 >>> 0] = +(f != p && E == s) : 0 < i != (E == s) && (f = Math.max(p, f), r.setTime(r.getTime() + 6e4 * ((0 < i ? E : f) - s))), (w(), B)[e + 24 >>> 2 >>> 0] = r.getDay(), i = (kn(r.getFullYear()) ? Wn : Gn)[r.getMonth()] + r.getDate() - 1 | 0, (w(), B)[e + 28 >>> 2 >>> 0] = i, (w(), B)[e >>> 2 >>> 0] = r.getSeconds(), (w(), B)[e + 4 >>> 2 >>> 0] = r.getMinutes(), (w(), B)[e + 8 >>> 2 >>> 0] = r.getHours(), (w(), B)[e + 12 >>> 2 >>> 0] = r.getDate(), (w(), B)[e + 16 >>> 2 >>> 0] = r.getMonth(), (w(), B)[e + 20 >>> 2 >>> 0] = r.getYear(), e = r.getTime(), BigInt(isNaN(e) ? -1 : e / 1e3);
		}
		function $n(e, r, i, s, f, p, E) {
			return o ? L(16, 1, e, r, i, s, f, p, E) : -52;
		}
		function zn(e, r, i, s, f, p) {
			if (o) return L(17, 1, e, r, i, s, f, p);
		}
		var Ye = {}, Yo = () => performance.timeOrigin + performance.now();
		function Hn(e, r) {
			if (o) return L(18, 1, e, r);
			if (Ye[e] && (clearTimeout(Ye[e].id), delete Ye[e]), !r) return 0;
			return Ye[e] = {
				id: setTimeout(() => {
					delete Ye[e], Rt(() => ar(e, performance.timeOrigin + performance.now()));
				}, r),
				oc: r
			}, 0;
		}
		var Oe = (e, r, i) => {
			var s = (w(), ne);
			if (r >>>= 0, 0 < i) {
				var f = r;
				i = r + i - 1;
				for (var p = 0; p < e.length; ++p) {
					var E = e.codePointAt(p);
					if (127 >= E) {
						if (r >= i) break;
						s[r++ >>> 0] = E;
					} else if (2047 >= E) {
						if (r + 1 >= i) break;
						s[r++ >>> 0] = 192 | E >> 6, s[r++ >>> 0] = 128 | 63 & E;
					} else if (65535 >= E) {
						if (r + 2 >= i) break;
						s[r++ >>> 0] = 224 | E >> 12, s[r++ >>> 0] = 128 | E >> 6 & 63, s[r++ >>> 0] = 128 | 63 & E;
					} else {
						if (r + 3 >= i) break;
						s[r++ >>> 0] = 240 | E >> 18, s[r++ >>> 0] = 128 | E >> 12 & 63, s[r++ >>> 0] = 128 | E >> 6 & 63, s[r++ >>> 0] = 128 | 63 & E, p++;
					}
				}
				s[r >>> 0] = 0, e = r - f;
			} else e = 0;
			return e;
		};
		function qo(e, r, i, s) {
			e >>>= 0, r >>>= 0, i >>>= 0, s >>>= 0;
			var f = (/* @__PURE__ */ new Date()).getFullYear(), p = new Date(f, 0, 1).getTimezoneOffset();
			f = new Date(f, 6, 1).getTimezoneOffset();
			var E = Math.max(p, f);
			(w(), W)[e >>> 2 >>> 0] = 60 * E, (w(), B)[r >>> 2 >>> 0] = +(p != f), e = (r = (S) => {
				var C = Math.abs(S);
				return `UTC${0 <= S ? "-" : "+"}${String(Math.floor(C / 60)).padStart(2, "0")}${String(C % 60).padStart(2, "0")}`;
			})(p), r = r(f), f < p ? (Oe(e, i, 17), Oe(r, s, 17)) : (Oe(e, s, 17), Oe(r, i, 17));
		}
		var Jo = () => Date.now(), Xo = 1;
		function Zo(e, r, i) {
			if (i >>>= 0, !(0 <= e && 3 >= e)) return 28;
			if (e === 0) e = Date.now();
			else {
				if (!Xo) return 52;
				e = performance.timeOrigin + performance.now();
			}
			return e = Math.round(1e6 * e), (w(), O)[i >>> 3 >>> 0] = BigInt(e), 0;
		}
		var kt = [];
		function Qo(e, r, i) {
			e >>>= 0, r >>>= 0, i >>>= 0, kt.length = 0;
			for (var s; s = (w(), ne)[r++ >>> 0];) {
				var f = s != 105;
				i += (f &= s != 112) && i % 8 ? 4 : 0, kt.push(s == 112 ? (w(), W)[i >>> 2 >>> 0] : s == 106 ? (w(), O)[i >>> 3 >>> 0] : s == 105 ? (w(), B)[i >>> 2 >>> 0] : (w(), me)[i >>> 3 >>> 0]), i += f ? 8 : 4;
			}
			return dr[e](...kt);
		}
		var Ko = () => {};
		function ea(e, r) {
			return F(Mt(e >>> 0, r >>> 0));
		}
		var ta = () => {
			throw se += 1, "unwind";
		};
		function na() {
			return 4294901760;
		}
		var ra = () => navigator.hardwareConcurrency, Ie = {}, Wt = (e) => {
			for (var r = 0, i = 0; i < e.length; ++i) {
				var s = e.charCodeAt(i);
				127 >= s ? r++ : 2047 >= s ? r += 2 : 55296 <= s && 57343 >= s ? (r += 4, ++i) : r += 3;
			}
			return r;
		}, ot = (e) => {
			var r;
			return (r = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e)) ? +r[1] : (r = /:(\d+):\d+(?:\)|$)/.exec(e)) ? 2147483648 | +r[1] : 0;
		}, jn = (e) => {
			for (var r of e) (e = ot(r)) && (Ie[e] = r);
		};
		function oa() {
			var e = Error().stack.toString().split(`
`);
			return e[0] == "Error" && e.shift(), jn(e), Ie.Xb = ot(e[3]), Ie.bc = e, Ie.Xb;
		}
		function at(e) {
			if (!(e = Ie[e >>> 0])) return 0;
			var r;
			if (r = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e)) e = r[1];
			else if (r = /^\s+at (.*) \(.*\)$/.exec(e)) e = r[1];
			else {
				if (!(r = /^(.+?)@/.exec(e))) return 0;
				e = r[1];
			}
			er(at.Yb ?? 0), r = Wt(e) + 1;
			var i = tr(r);
			return i && Oe(e, i, r), at.Yb = i, at.Yb;
		}
		function aa(e) {
			e >>>= 0;
			var r = (w(), ne).length;
			if (e <= r || 4294901760 < e) return !1;
			for (var i = 1; 4 >= i; i *= 2) {
				var s = r * (1 + .2 / i);
				s = Math.min(s, e + 100663296);
				e: {
					s = (Math.min(4294901760, 65536 * Math.ceil(Math.max(e, s) / 65536)) - ge.buffer.byteLength + 65535) / 65536 | 0;
					try {
						ge.grow(s), ee();
						var f = 1;
						break e;
					} catch {}
					f = void 0;
				}
				if (f) return !0;
			}
			return !1;
		}
		function sa(e, r, i) {
			if (e >>>= 0, r >>>= 0, Ie.Xb == e) var s = Ie.bc;
			else (s = Error().stack.toString().split(`
`))[0] == "Error" && s.shift(), jn(s);
			for (var f = 3; s[f] && ot(s[f]) != e;) ++f;
			for (e = 0; e < i && s[e + f]; ++e) (w(), B)[r + 4 * e >>> 2 >>> 0] = ot(s[e + f]);
			return e;
		}
		var Gt, $t = {}, Vn = () => {
			if (!Gt) {
				var e, r = {
					USER: "web_user",
					LOGNAME: "web_user",
					PATH: "/",
					PWD: "/",
					HOME: "/home/web_user",
					LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
					_: "./this.program"
				};
				for (e in $t) $t[e] === void 0 ? delete r[e] : r[e] = $t[e];
				var i = [];
				for (e in r) i.push(`${e}=${r[e]}`);
				Gt = i;
			}
			return Gt;
		};
		function Yn(e, r) {
			if (o) return L(19, 1, e, r);
			e >>>= 0, r >>>= 0;
			var i, s = 0, f = 0;
			for (i of Vn()) {
				var p = r + s;
				(w(), W)[e + f >>> 2 >>> 0] = p, s += Oe(i, p, Infinity) + 1, f += 4;
			}
			return 0;
		}
		function qn(e, r) {
			if (o) return L(20, 1, e, r);
			e >>>= 0, r >>>= 0;
			var i = Vn();
			for (var s of ((w(), W)[e >>> 2 >>> 0] = i.length, e = 0, i)) e += Wt(s) + 1;
			return (w(), W)[r >>> 2 >>> 0] = e, 0;
		}
		function Jn(e) {
			return o ? L(21, 1, e) : 52;
		}
		function Xn(e, r, i, s, f) {
			return o ? L(22, 1, e, r, i, s, f) : 52;
		}
		function Zn(e, r, i, s) {
			return o ? L(23, 1, e, r, i, s) : 52;
		}
		function Qn(e, r, i, s) {
			return o ? L(24, 1, e, r, i, s) : 70;
		}
		var ia = [
			null,
			[],
			[]
		];
		function Kn(e, r, i, s) {
			if (o) return L(25, 1, e, r, i, s);
			r >>>= 0, i >>>= 0, s >>>= 0;
			for (var f = 0, p = 0; p < i; p++) {
				var E = (w(), W)[r >>> 2 >>> 0], S = (w(), W)[r + 4 >>> 2 >>> 0];
				r += 8;
				for (var C = 0; C < S; C++) {
					var R = e, X = (w(), ne)[E + C >>> 0], le = ia[R];
					X === 0 || X === 10 ? ((R === 1 ? A : F)(On(le)), le.length = 0) : le.push(X);
				}
				f += S;
			}
			return (w(), W)[s >>> 2 >>> 0] = f, 0;
		}
		function ua(e) {
			return e >>> 0;
		}
		o || (function() {
			for (var e = t.numThreads - 1; e--;) yn();
			Ve.push(async () => {
				var r = (async function() {
					if (!o) return Promise.all(ce.map(bn));
				})();
				Re++, await r, --Re == 0 && te && (r = te, te = null, r());
			});
		})(), o || (ge = new WebAssembly.Memory({
			initial: 256,
			maximum: 65536,
			shared: !0
		}), ee()), t.wasmBinary && (g = t.wasmBinary), t.stackSave = () => U(), t.stackRestore = (e) => _(e), t.stackAlloc = (e) => jt(e), t.setValue = function(e, r, i = "i8") {
			switch (i.endsWith("*") && (i = "*"), i) {
				case "i1":
				case "i8":
					(w(), H)[e >>> 0] = r;
					break;
				case "i16":
					(w(), pe)[e >>> 1 >>> 0] = r;
					break;
				case "i32":
					(w(), B)[e >>> 2 >>> 0] = r;
					break;
				case "i64":
					(w(), O)[e >>> 3 >>> 0] = BigInt(r);
					break;
				case "float":
					(w(), re)[e >>> 2 >>> 0] = r;
					break;
				case "double":
					(w(), me)[e >>> 3 >>> 0] = r;
					break;
				case "*":
					(w(), W)[e >>> 2 >>> 0] = r;
					break;
				default: j(`invalid type for setValue: ${i}`);
			}
		}, t.getValue = function(e, r = "i8") {
			switch (r.endsWith("*") && (r = "*"), r) {
				case "i1":
				case "i8": return (w(), H)[e >>> 0];
				case "i16": return (w(), pe)[e >>> 1 >>> 0];
				case "i32": return (w(), B)[e >>> 2 >>> 0];
				case "i64": return (w(), O)[e >>> 3 >>> 0];
				case "float": return (w(), re)[e >>> 2 >>> 0];
				case "double": return (w(), me)[e >>> 3 >>> 0];
				case "*": return (w(), W)[e >>> 2 >>> 0];
				default: j(`invalid type for getValue: ${r}`);
			}
		}, t.UTF8ToString = Mt, t.stringToUTF8 = Oe, t.lengthBytesUTF8 = Wt;
		var st, er, tr, zt, nr, rr, or, Ht, ar, sr, x, qe, ir, _, jt, U, ur, Vt, fr, cr, lr, Ee, fa = [
			V,
			fe,
			Sn,
			In,
			Bn,
			Ln,
			_n,
			Dn,
			Pn,
			Un,
			xn,
			Cn,
			Mn,
			Rn,
			Fn,
			Nn,
			$n,
			zn,
			Hn,
			Yn,
			qn,
			Jn,
			Xn,
			Zn,
			Qn,
			Kn
		], dr = {
			1043436: (e, r, i, s, f) => {
				if (t === void 0 || !t.Tb) return 1;
				if ((e = Mt(Number(e >>> 0))).startsWith("./") && (e = e.substring(2)), !(e = t.Tb.get(e))) return 2;
				if (r = Number(r >>> 0), i = Number(i >>> 0), s = Number(s >>> 0), r + i > e.byteLength) return 3;
				try {
					let p = e.subarray(r, r + i);
					switch (f) {
						case 0:
							(w(), ne).set(p, s >>> 0);
							break;
						case 1:
							t.ic ? t.ic(s, p) : t.kc(s, p);
							break;
						default: return 4;
					}
					return 0;
				} catch {
					return 4;
				}
			},
			1044260: () => typeof wasmOffsetConverter < "u"
		};
		function ca() {
			return typeof wasmOffsetConverter < "u";
		}
		function la(e, r, i, s) {
			var f = U();
			try {
				return M(e)(r, i, s);
			} catch (p) {
				if (_(f), p !== p + 0) throw p;
				x(1, 0);
			}
		}
		function da(e, r, i) {
			var s = U();
			try {
				return M(e)(r, i);
			} catch (f) {
				if (_(s), f !== f + 0) throw f;
				x(1, 0);
			}
		}
		function pa(e) {
			var r = U();
			try {
				M(e)();
			} catch (i) {
				if (_(r), i !== i + 0) throw i;
				x(1, 0);
			}
		}
		function ma(e, r) {
			var i = U();
			try {
				return M(e)(r);
			} catch (s) {
				if (_(i), s !== s + 0) throw s;
				x(1, 0);
			}
		}
		function ha(e, r, i) {
			var s = U();
			try {
				M(e)(r, i);
			} catch (f) {
				if (_(s), f !== f + 0) throw f;
				x(1, 0);
			}
		}
		function wa(e, r) {
			var i = U();
			try {
				M(e)(r);
			} catch (s) {
				if (_(i), s !== s + 0) throw s;
				x(1, 0);
			}
		}
		function ba(e, r, i, s, f, p, E) {
			var S = U();
			try {
				return M(e)(r, i, s, f, p, E);
			} catch (C) {
				if (_(S), C !== C + 0) throw C;
				x(1, 0);
			}
		}
		function ya(e, r, i, s, f, p) {
			var E = U();
			try {
				M(e)(r, i, s, f, p);
			} catch (S) {
				if (_(E), S !== S + 0) throw S;
				x(1, 0);
			}
		}
		function ga(e, r, i, s) {
			var f = U();
			try {
				M(e)(r, i, s);
			} catch (p) {
				if (_(f), p !== p + 0) throw p;
				x(1, 0);
			}
		}
		function Ea(e, r, i, s, f) {
			var p = U();
			try {
				M(e)(r, i, s, f);
			} catch (E) {
				if (_(p), E !== E + 0) throw E;
				x(1, 0);
			}
		}
		function Ta(e, r, i, s, f, p, E) {
			var S = U();
			try {
				M(e)(r, i, s, f, p, E);
			} catch (C) {
				if (_(S), C !== C + 0) throw C;
				x(1, 0);
			}
		}
		function Sa(e, r, i, s, f, p, E) {
			var S = U();
			try {
				M(e)(r, i, s, f, p, E);
			} catch (C) {
				if (_(S), C !== C + 0) throw C;
				x(1, 0);
			}
		}
		function va(e, r, i, s, f, p, E, S) {
			var C = U();
			try {
				M(e)(r, i, s, f, p, E, S);
			} catch (R) {
				if (_(C), R !== R + 0) throw R;
				x(1, 0);
			}
		}
		function Aa(e, r, i, s, f) {
			var p = U();
			try {
				return M(e)(r, i, s, f);
			} catch (E) {
				if (_(p), E !== E + 0) throw E;
				x(1, 0);
			}
		}
		function Oa(e, r, i) {
			var s = U();
			try {
				return M(e)(r, i);
			} catch (f) {
				if (_(s), f !== f + 0) throw f;
				x(1, 0);
			}
		}
		function Ia(e, r, i, s, f, p, E, S) {
			var C = U();
			try {
				M(e)(r, i, s, f, p, E, S);
			} catch (R) {
				if (_(C), R !== R + 0) throw R;
				x(1, 0);
			}
		}
		function Ba(e, r, i, s, f, p, E, S, C, R, X, le) {
			var we = U();
			try {
				M(e)(r, i, s, f, p, E, S, C, R, X, le);
			} catch (be) {
				if (_(we), be !== be + 0) throw be;
				x(1, 0);
			}
		}
		function La(e, r, i) {
			var s = U();
			try {
				return M(e)(r, i);
			} catch (f) {
				if (_(s), f !== f + 0) throw f;
				return x(1, 0), 0n;
			}
		}
		function _a(e, r, i, s, f, p, E, S, C) {
			var R = U();
			try {
				M(e)(r, i, s, f, p, E, S, C);
			} catch (X) {
				if (_(R), X !== X + 0) throw X;
				x(1, 0);
			}
		}
		function Da(e) {
			var r = U();
			try {
				return M(e)();
			} catch (i) {
				if (_(r), i !== i + 0) throw i;
				x(1, 0);
			}
		}
		function Pa(e, r) {
			var i = U();
			try {
				return M(e)(r);
			} catch (s) {
				if (_(i), s !== s + 0) throw s;
				return x(1, 0), 0n;
			}
		}
		function Ua(e, r, i, s) {
			var f = U();
			try {
				return M(e)(r, i, s);
			} catch (p) {
				if (_(f), p !== p + 0) throw p;
				x(1, 0);
			}
		}
		function xa(e) {
			var r = U();
			try {
				return M(e)();
			} catch (i) {
				if (_(r), i !== i + 0) throw i;
				return x(1, 0), 0n;
			}
		}
		function Ca(e, r, i, s) {
			var f = U();
			try {
				return M(e)(r, i, s);
			} catch (p) {
				if (_(f), p !== p + 0) throw p;
				x(1, 0);
			}
		}
		function Ma(e, r, i, s, f) {
			var p = U();
			try {
				return M(e)(r, i, s, f);
			} catch (E) {
				if (_(p), E !== E + 0) throw E;
				x(1, 0);
			}
		}
		function Ra(e, r, i, s, f, p) {
			var E = U();
			try {
				return M(e)(r, i, s, f, p);
			} catch (S) {
				if (_(E), S !== S + 0) throw S;
				x(1, 0);
			}
		}
		function Fa(e, r, i, s, f, p) {
			var E = U();
			try {
				return M(e)(r, i, s, f, p);
			} catch (S) {
				if (_(E), S !== S + 0) throw S;
				x(1, 0);
			}
		}
		function Na(e, r, i, s, f, p) {
			var E = U();
			try {
				return M(e)(r, i, s, f, p);
			} catch (S) {
				if (_(E), S !== S + 0) throw S;
				x(1, 0);
			}
		}
		function ka(e, r, i, s, f, p, E, S) {
			var C = U();
			try {
				return M(e)(r, i, s, f, p, E, S);
			} catch (R) {
				if (_(C), R !== R + 0) throw R;
				x(1, 0);
			}
		}
		function Wa(e, r, i, s, f) {
			var p = U();
			try {
				return M(e)(r, i, s, f);
			} catch (E) {
				if (_(p), E !== E + 0) throw E;
				return x(1, 0), 0n;
			}
		}
		function Ga(e, r, i, s) {
			var f = U();
			try {
				return M(e)(r, i, s);
			} catch (p) {
				if (_(f), p !== p + 0) throw p;
				x(1, 0);
			}
		}
		function $a(e, r, i, s) {
			var f = U();
			try {
				return M(e)(r, i, s);
			} catch (p) {
				if (_(f), p !== p + 0) throw p;
				x(1, 0);
			}
		}
		function za(e, r, i, s, f, p, E, S, C, R, X, le) {
			var we = U();
			try {
				return M(e)(r, i, s, f, p, E, S, C, R, X, le);
			} catch (be) {
				if (_(we), be !== be + 0) throw be;
				x(1, 0);
			}
		}
		function Ha(e, r, i, s, f, p, E, S, C, R, X) {
			var le = U();
			try {
				M(e)(r, i, s, f, p, E, S, C, R, X);
			} catch (we) {
				if (_(le), we !== we + 0) throw we;
				x(1, 0);
			}
		}
		function ja(e, r, i, s, f, p, E, S, C, R, X, le, we, be, Ja, Xa) {
			var Za = U();
			try {
				M(e)(r, i, s, f, p, E, S, C, R, X, le, we, be, Ja, Xa);
			} catch (Yt) {
				if (_(Za), Yt !== Yt + 0) throw Yt;
				x(1, 0);
			}
		}
		function Va(e, r, i) {
			var s = U();
			try {
				return M(e)(r, i);
			} catch (f) {
				if (_(s), f !== f + 0) throw f;
				x(1, 0);
			}
		}
		function Ya(e, r, i) {
			var s = U();
			try {
				return M(e)(r, i);
			} catch (f) {
				if (_(s), f !== f + 0) throw f;
				x(1, 0);
			}
		}
		function qa(e, r, i, s) {
			var f = U();
			try {
				M(e)(r, i, s);
			} catch (p) {
				if (_(f), p !== p + 0) throw p;
				x(1, 0);
			}
		}
		function it() {
			if (0 < Re) te = it;
			else if (o) T?.(t), he();
			else {
				for (var e = Ve; 0 < e.length;) e.shift()(t);
				0 < Re ? te = it : (t.calledRun = !0, P || (he(), T?.(t)));
			}
		}
		return o || (Ee = await Ut(), it()), t.PTR_SIZE = 4, je ? t : new Promise((e, r) => {
			T = e, I = r;
		});
	}
	var as, ss, Jr = N(() => {
		"use strict";
		as = Yr, ss = globalThis.self?.name?.startsWith("em-pthread");
		ss && Yr();
	});
	var Qr, an, is, oe, Kr, on, us, fs, eo, cs, Xr, to, Zr, no, pt = N(() => {
		"use strict";
		dt();
		Qr = typeof location > "u" ? void 0 : location.origin, an = self.location.href > "file:" && self.location.href < "file;", is = () => {
			if (an) {
				let n = URL;
				return new URL(new n("ort.wasm.bundle.min.mjs", self.location.href).href, Qr).href;
			}
			return self.location.href;
		}, oe = is(), Kr = () => {
			if (oe && !oe.startsWith("blob:")) return oe.substring(0, oe.lastIndexOf("/") + 1);
		}, on = (n, t) => {
			try {
				let a = t ?? oe;
				return (a ? new URL(n, a) : new URL(n)).origin === Qr;
			} catch {
				return !1;
			}
		}, us = (n, t) => {
			let a = t ?? oe;
			try {
				return (a ? new URL(n, a) : new URL(n)).href;
			} catch {
				return;
			}
		}, fs = (n, t) => `${t ?? "./"}${n}`, eo = async (n) => {
			let a = await (await fetch(n, { credentials: "same-origin" })).blob();
			return URL.createObjectURL(a);
		}, cs = async (n) => (await import(
			/*webpackIgnore:true*/
			/*@vite-ignore*/
			n
)).default, Xr = (Vr(), Xt(jr)).default, to = async () => {
			if (!oe) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
			if (on(oe)) return [void 0, Xr()];
			let n = await eo(oe);
			return [n, Xr(n)];
		}, Zr = (Jr(), Xt(qr)).default, no = async (n, t, a, u) => {
			let o = Zr && !(n || t);
			if (o) if (oe) o = on(oe) || u && !a;
			else if (u && !a) o = !0;
			else throw new Error("cannot determine the script source URL.");
			if (o) return [void 0, Zr];
			{
				let d = "ort-wasm-simd-threaded.mjs", c = n ?? us(d, t), l = a && c && !on(c, t), m = l ? await eo(c) : c ?? fs(d, t);
				return [l ? m : void 0, await cs(m)];
			}
		};
	});
	var sn, un, St, ro, ls, ds, ps, mt, z, xe = N(() => {
		"use strict";
		pt();
		un = !1, St = !1, ro = !1, ls = () => {
			if (typeof SharedArrayBuffer > "u") return !1;
			try {
				return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([
					0,
					97,
					115,
					109,
					1,
					0,
					0,
					0,
					1,
					4,
					1,
					96,
					0,
					0,
					3,
					2,
					1,
					0,
					5,
					4,
					1,
					3,
					1,
					1,
					10,
					11,
					1,
					9,
					0,
					65,
					0,
					254,
					16,
					2,
					0,
					26,
					11
				]));
			} catch {
				return !1;
			}
		}, ds = () => {
			try {
				return WebAssembly.validate(new Uint8Array([
					0,
					97,
					115,
					109,
					1,
					0,
					0,
					0,
					1,
					4,
					1,
					96,
					0,
					0,
					3,
					2,
					1,
					0,
					10,
					30,
					1,
					28,
					0,
					65,
					0,
					253,
					15,
					253,
					12,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					253,
					186,
					1,
					26,
					11
				]));
			} catch {
				return !1;
			}
		}, ps = () => {
			try {
				return WebAssembly.validate(new Uint8Array([
					0,
					97,
					115,
					109,
					1,
					0,
					0,
					0,
					1,
					5,
					1,
					96,
					0,
					1,
					123,
					3,
					2,
					1,
					0,
					10,
					19,
					1,
					17,
					0,
					65,
					1,
					253,
					15,
					65,
					2,
					253,
					15,
					65,
					3,
					253,
					15,
					253,
					147,
					2,
					11
				]));
			} catch {
				return !1;
			}
		}, mt = async (n) => {
			if (un) return Promise.resolve();
			if (St) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
			if (ro) throw new Error("previous call to 'initializeWebAssembly()' failed.");
			St = !0;
			let t = n.initTimeout, a = n.numThreads;
			if (n.simd !== !1) {
				if (n.simd === "relaxed") {
					if (!ps()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
				} else if (!ds()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
			}
			let u = ls();
			a > 1 && !u && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + a + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), n.numThreads = a = 1);
			let o = n.wasmPaths, d = typeof o == "string" ? o : void 0, c = o?.mjs, l = c?.href ?? c, m = o?.wasm, h = m?.href ?? m, g = n.wasmBinary, [b, y] = await no(l, d, a > 1, !!g || !!h), T = !1, I = [];
			if (t > 0 && I.push(new Promise((D) => {
				setTimeout(() => {
					T = !0, D();
				}, t);
			})), I.push(new Promise((D, $) => {
				let v = { numThreads: a };
				if (g) v.wasmBinary = g, v.locateFile = (A) => A;
				else if (h || d) v.locateFile = (A) => h ?? d + A;
				else if (l && l.indexOf("blob:") !== 0) v.locateFile = (A) => new URL(A, l).href;
				else if (b) {
					let A = Kr();
					A && (v.locateFile = (F) => A + F);
				}
				y(v).then((A) => {
					St = !1, un = !0, sn = A, D(), b && URL.revokeObjectURL(b);
				}, (A) => {
					St = !1, ro = !0, $(A);
				});
			})), await Promise.race(I), T) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
		}, z = () => {
			if (un && sn) return sn;
			throw new Error("WebAssembly is not initialized yet.");
		};
	});
	var ae, Qe, G, vt = N(() => {
		"use strict";
		xe();
		ae = (n, t) => {
			let a = z(), u = a.lengthBytesUTF8(n) + 1, o = a._malloc(u);
			return a.stringToUTF8(n, o, u), t.push(o), o;
		}, Qe = (n, t, a, u) => {
			if (typeof n == "object" && n !== null) {
				if (a.has(n)) throw new Error("Circular reference in options");
				a.add(n);
			}
			Object.entries(n).forEach(([o, d]) => {
				let c = t ? t + o : o;
				if (typeof d == "object") Qe(d, c + ".", a, u);
				else if (typeof d == "string" || typeof d == "number") u(c, d.toString());
				else if (typeof d == "boolean") u(c, d ? "1" : "0");
				else throw new Error(`Can't handle extra config type: ${typeof d}`);
			});
		}, G = (n) => {
			let t = z(), a = t.stackSave();
			try {
				let u = t.PTR_SIZE, o = t.stackAlloc(2 * u);
				t._OrtGetLastError(o, o + u);
				let d = Number(t.getValue(o, u === 4 ? "i32" : "i64")), c = t.getValue(o + u, "*"), l = c ? t.UTF8ToString(c) : "";
				throw new Error(`${n} ERROR_CODE: ${d}, ERROR_MESSAGE: ${l}`);
			} finally {
				t.stackRestore(a);
			}
		};
	});
	var oo, ao = N(() => {
		"use strict";
		xe();
		vt();
		oo = (n) => {
			let t = z(), a = 0, u = [], o = n || {};
			try {
				if (n?.logSeverityLevel === void 0) o.logSeverityLevel = 2;
				else if (typeof n.logSeverityLevel != "number" || !Number.isInteger(n.logSeverityLevel) || n.logSeverityLevel < 0 || n.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${n.logSeverityLevel}`);
				if (n?.logVerbosityLevel === void 0) o.logVerbosityLevel = 0;
				else if (typeof n.logVerbosityLevel != "number" || !Number.isInteger(n.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);
				n?.terminate === void 0 && (o.terminate = !1);
				let d = 0;
				return n?.tag !== void 0 && (d = ae(n.tag, u)), a = t._OrtCreateRunOptions(o.logSeverityLevel, o.logVerbosityLevel, !!o.terminate, d), a === 0 && G("Can't create run options."), n?.extra !== void 0 && Qe(n.extra, "", /* @__PURE__ */ new WeakSet(), (c, l) => {
					let m = ae(c, u), h = ae(l, u);
					t._OrtAddRunConfigEntry(a, m, h) !== 0 && G(`Can't set a run config entry: ${c} - ${l}.`);
				}), [a, u];
			} catch (d) {
				throw a !== 0 && t._OrtReleaseRunOptions(a), u.forEach((c) => t._free(c)), d;
			}
		};
	});
	var ms, hs, ws, ke, bs, so, io = N(() => {
		"use strict";
		xe();
		vt();
		ms = (n) => {
			switch (n) {
				case "disabled": return 0;
				case "basic": return 1;
				case "extended": return 2;
				case "layout": return 3;
				case "all": return 99;
				default: throw new Error(`unsupported graph optimization level: ${n}`);
			}
		}, hs = (n) => {
			switch (n) {
				case "sequential": return 0;
				case "parallel": return 1;
				default: throw new Error(`unsupported execution mode: ${n}`);
			}
		}, ws = (n) => {
			n.extra || (n.extra = {}), n.extra.session || (n.extra.session = {});
			let t = n.extra.session;
			t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), n.executionProviders && n.executionProviders.some((a) => (typeof a == "string" ? a : a.name) === "webgpu") && (n.enableMemPattern = !1);
		}, ke = (n, t, a, u) => {
			let o = ae(t, u), d = ae(a, u);
			z()._OrtAddSessionConfigEntry(n, o, d) !== 0 && G(`Can't set a session config entry: ${t} - ${a}.`);
		}, bs = async (n, t, a) => {
			let u = t.executionProviders;
			for (let o of u) {
				let d = typeof o == "string" ? o : o.name, c = [];
				switch (d) {
					case "webnn":
						if (d = "WEBNN", ke(n, "session.disable_quant_qdq", "1", a), ke(n, "session.disable_qdq_constant_folding", "1", a), typeof o != "string") {
							let y = o?.deviceType;
							y && ke(n, "deviceType", y, a);
						}
						break;
					case "webgpu":
						if (d = "JS", typeof o != "string") {
							let b = o;
							if (b?.preferredLayout) {
								if (b.preferredLayout !== "NCHW" && b.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${b.preferredLayout}`);
								ke(n, "preferredLayout", b.preferredLayout, a);
							}
						}
						break;
					case "wasm":
					case "cpu": continue;
					default: throw new Error(`not supported execution provider: ${d}`);
				}
				let l = ae(d, a), m = c.length, h = 0, g = 0;
				if (m > 0) {
					h = z()._malloc(m * z().PTR_SIZE), a.push(h), g = z()._malloc(m * z().PTR_SIZE), a.push(g);
					for (let b = 0; b < m; b++) z().setValue(h + b * z().PTR_SIZE, c[b][0], "*"), z().setValue(g + b * z().PTR_SIZE, c[b][1], "*");
				}
				await z()._OrtAppendExecutionProvider(n, l, h, g, m) !== 0 && G(`Can't append execution provider: ${d}.`);
			}
		}, so = async (n) => {
			let t = z(), a = 0, u = [], o = n || {};
			ws(o);
			try {
				let d = ms(o.graphOptimizationLevel ?? "all"), c = hs(o.executionMode ?? "sequential"), l = typeof o.logId == "string" ? ae(o.logId, u) : 0, m = o.logSeverityLevel ?? 2;
				if (!Number.isInteger(m) || m < 0 || m > 4) throw new Error(`log severity level is not valid: ${m}`);
				let h = o.logVerbosityLevel ?? 0;
				if (!Number.isInteger(h) || h < 0 || h > 4) throw new Error(`log verbosity level is not valid: ${h}`);
				let g = typeof o.optimizedModelFilePath == "string" ? ae(o.optimizedModelFilePath, u) : 0;
				if (a = t._OrtCreateSessionOptions(d, !!o.enableCpuMemArena, !!o.enableMemPattern, c, !!o.enableProfiling, 0, l, m, h, g), a === 0 && G("Can't create session options."), o.executionProviders && await bs(a, o, u), o.enableGraphCapture !== void 0) {
					if (typeof o.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);
					ke(a, "enableGraphCapture", o.enableGraphCapture.toString(), u);
				}
				if (o.freeDimensionOverrides) for (let [b, y] of Object.entries(o.freeDimensionOverrides)) {
					if (typeof b != "string") throw new Error(`free dimension override name must be a string: ${b}`);
					if (typeof y != "number" || !Number.isInteger(y) || y < 0) throw new Error(`free dimension override value must be a non-negative integer: ${y}`);
					let T = ae(b, u);
					t._OrtAddFreeDimensionOverride(a, T, y) !== 0 && G(`Can't set a free dimension override: ${b} - ${y}.`);
				}
				return o.extra !== void 0 && Qe(o.extra, "", /* @__PURE__ */ new WeakSet(), (b, y) => {
					ke(a, b, y, u);
				}), [a, u];
			} catch (d) {
				throw a !== 0 && t._OrtReleaseSessionOptions(a) !== 0 && G("Can't release session options."), u.forEach((c) => t._free(c)), d;
			}
		};
	});
	var We, At, Ge, uo, fo, Ot, It, co, fn = N(() => {
		"use strict";
		We = (n) => {
			switch (n) {
				case "int8": return 3;
				case "uint8": return 2;
				case "bool": return 9;
				case "int16": return 5;
				case "uint16": return 4;
				case "int32": return 6;
				case "uint32": return 12;
				case "float16": return 10;
				case "float32": return 1;
				case "float64": return 11;
				case "string": return 8;
				case "int64": return 7;
				case "uint64": return 13;
				case "int4": return 22;
				case "uint4": return 21;
				default: throw new Error(`unsupported data type: ${n}`);
			}
		}, At = (n) => {
			switch (n) {
				case 3: return "int8";
				case 2: return "uint8";
				case 9: return "bool";
				case 5: return "int16";
				case 4: return "uint16";
				case 6: return "int32";
				case 12: return "uint32";
				case 10: return "float16";
				case 1: return "float32";
				case 11: return "float64";
				case 8: return "string";
				case 7: return "int64";
				case 13: return "uint64";
				case 22: return "int4";
				case 21: return "uint4";
				default: throw new Error(`unsupported data type: ${n}`);
			}
		}, Ge = (n, t) => {
			let a = [
				-1,
				4,
				1,
				1,
				2,
				2,
				4,
				8,
				-1,
				1,
				2,
				8,
				4,
				8,
				-1,
				-1,
				-1,
				-1,
				-1,
				-1,
				-1,
				.5,
				.5
			][n], u = typeof t == "number" ? t : t.reduce((o, d) => o * d, 1);
			return a > 0 ? Math.ceil(u * a) : void 0;
		}, uo = (n) => {
			switch (n) {
				case "float16": return typeof Float16Array < "u" ? Float16Array : Uint16Array;
				case "float32": return Float32Array;
				case "uint8": return Uint8Array;
				case "int8": return Int8Array;
				case "uint16": return Uint16Array;
				case "int16": return Int16Array;
				case "int32": return Int32Array;
				case "bool": return Uint8Array;
				case "float64": return Float64Array;
				case "uint32": return Uint32Array;
				case "int64": return BigInt64Array;
				case "uint64": return BigUint64Array;
				default: throw new Error(`unsupported type: ${n}`);
			}
		}, fo = (n) => {
			switch (n) {
				case "verbose": return 0;
				case "info": return 1;
				case "warning": return 2;
				case "error": return 3;
				case "fatal": return 4;
				default: throw new Error(`unsupported logging level: ${n}`);
			}
		}, Ot = (n) => n === "float32" || n === "float16" || n === "int32" || n === "int64" || n === "uint32" || n === "uint8" || n === "bool" || n === "uint4" || n === "int4", It = (n) => n === "float32" || n === "float16" || n === "int32" || n === "int64" || n === "uint32" || n === "uint64" || n === "int8" || n === "uint8" || n === "bool" || n === "uint4" || n === "int4", co = (n) => {
			switch (n) {
				case "none": return 0;
				case "cpu": return 1;
				case "cpu-pinned": return 2;
				case "texture": return 3;
				case "gpu-buffer": return 4;
				case "ml-tensor": return 5;
				default: throw new Error(`unsupported data location: ${n}`);
			}
		};
	});
	var Ke, cn = N(() => {
		"use strict";
		dt();
		Ke = async (n) => {
			if (typeof n == "string") {
				let t = await fetch(n);
				if (!t.ok) throw new Error(`failed to load external data file: ${n}`);
				let a = t.headers.get("Content-Length"), u = a ? parseInt(a, 10) : 0;
				if (u < 1073741824) return new Uint8Array(await t.arrayBuffer());
				{
					if (!t.body) throw new Error(`failed to load external data file: ${n}, no response body.`);
					let o = t.body.getReader(), d;
					try {
						d = new ArrayBuffer(u);
					} catch (l) {
						if (l instanceof RangeError) {
							let m = Math.ceil(u / 65536);
							d = new WebAssembly.Memory({
								initial: m,
								maximum: m
							}).buffer;
						} else throw l;
					}
					let c = 0;
					for (;;) {
						let { done: l, value: m } = await o.read();
						if (l) break;
						let h = m.byteLength;
						new Uint8Array(d, c, h).set(m), c += h;
					}
					return new Uint8Array(d, 0, u);
				}
			} else return n instanceof Blob ? new Uint8Array(await n.arrayBuffer()) : n instanceof Uint8Array ? n : new Uint8Array(n);
		};
	});
	var ys, ht, wt, $e, gs, lo, Ze, bt, yt, po, gt, Et, Tt, rn = N(() => {
		"use strict";
		Te();
		ao();
		io();
		fn();
		xe();
		vt();
		cn();
		ys = (n, t) => {
			z()._OrtInit(n, t) !== 0 && G("Can't initialize onnxruntime.");
		}, ht = async (n) => {
			ys(n.wasm.numThreads, fo(n.logLevel));
		}, wt = async (n, t) => {
			z().asyncInit?.();
			let a = n.webgpu.adapter;
			if (t === "webgpu") {
				if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
				if (a) {
					if (typeof a.limits != "object" || typeof a.features != "object" || typeof a.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
				} else {
					let u = n.webgpu.powerPreference;
					if (u !== void 0 && u !== "low-power" && u !== "high-performance") throw new Error(`Invalid powerPreference setting: "${u}"`);
					let o = n.webgpu.forceFallbackAdapter;
					if (o !== void 0 && typeof o != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);
					if (a = await navigator.gpu.requestAdapter({
						powerPreference: u,
						forceFallbackAdapter: o
					}), !a) throw new Error("Failed to get GPU adapter. You may need to enable flag \"--enable-unsafe-webgpu\" if you are using Chrome.");
				}
			}
			if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
		}, $e = /* @__PURE__ */ new Map(), gs = (n) => {
			let t = z(), a = t.stackSave();
			try {
				let u = t.PTR_SIZE, o = t.stackAlloc(2 * u);
				t._OrtGetInputOutputCount(n, o, o + u) !== 0 && G("Can't get session input/output count.");
				let c = u === 4 ? "i32" : "i64";
				return [Number(t.getValue(o, c)), Number(t.getValue(o + u, c))];
			} finally {
				t.stackRestore(a);
			}
		}, lo = (n, t) => {
			let a = z(), u = a.stackSave(), o = 0;
			try {
				let d = a.PTR_SIZE, c = a.stackAlloc(2 * d);
				a._OrtGetInputOutputMetadata(n, t, c, c + d) !== 0 && G("Can't get session input/output metadata.");
				let m = Number(a.getValue(c, "*"));
				o = Number(a.getValue(c + d, "*"));
				let h = a.HEAP32[o / 4];
				if (h === 0) return [m, 0];
				let g = a.HEAPU32[o / 4 + 1], b = [];
				for (let y = 0; y < g; y++) {
					let T = Number(a.getValue(o + 8 + y * d, "*"));
					b.push(T !== 0 ? a.UTF8ToString(T) : Number(a.getValue(o + 8 + (y + g) * d, "*")));
				}
				return [
					m,
					h,
					b
				];
			} finally {
				a.stackRestore(u), o !== 0 && a._OrtFree(o);
			}
		}, Ze = (n) => {
			let t = z(), a = t._malloc(n.byteLength);
			if (a === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);
			return t.HEAPU8.set(n, a), [a, n.byteLength];
		}, bt = async (n, t) => {
			let a, u, o = z();
			Array.isArray(n) ? [a, u] = n : n.buffer === o.HEAPU8.buffer ? [a, u] = [n.byteOffset, n.byteLength] : [a, u] = Ze(n);
			let d = 0, c = 0, l = 0, m = [], h = [], g = [];
			try {
				if ([c, m] = await so(t), t?.externalData && o.mountExternalData) {
					let P = [];
					for (let k of t.externalData) {
						let w = typeof k == "string" ? k : k.path, Q = typeof k == "string" ? k : k.data;
						P.push(Ke(Q).then((H) => {
							o.mountExternalData(w, H);
						}));
					}
					await Promise.all(P);
				}
				for (let P of t?.executionProviders ?? []) if ((typeof P == "string" ? P : P.name) === "webnn") {
					if (o.shouldTransferToMLTensor = !1, typeof P != "string") {
						let w = P, Q = w?.context, H = w?.gpuDevice, ne = w?.deviceType, pe = w?.powerPreference;
						Q ? o.currentContext = Q : H ? o.currentContext = await o.webnnCreateMLContext(H) : o.currentContext = await o.webnnCreateMLContext({
							deviceType: ne,
							powerPreference: pe
						});
					} else o.currentContext = await o.webnnCreateMLContext();
					break;
				}
				d = await o._OrtCreateSession(a, u, c), o.webgpuOnCreateSession?.(d), d === 0 && G("Can't create a session."), o.jsepOnCreateSession?.(), o.currentContext && (o.webnnRegisterMLContext(d, o.currentContext), o.currentContext = void 0, o.shouldTransferToMLTensor = !0);
				let [b, y] = gs(d), T = !!t?.enableGraphCapture, I = [], D = [], $ = [], v = [];
				for (let P = 0; P < b; P++) {
					let [k, w, Q] = lo(d, P);
					k === 0 && G("Can't get an input name."), h.push(k);
					let H = o.UTF8ToString(k);
					I.push(H), $.push(w === 0 ? {
						name: H,
						isTensor: !1
					} : {
						name: H,
						isTensor: !0,
						type: At(w),
						shape: Q
					});
				}
				for (let P = 0; P < y; P++) {
					let [k, w, Q] = lo(d, P + b);
					k === 0 && G("Can't get an output name."), g.push(k);
					let H = o.UTF8ToString(k);
					D.push(H), v.push(w === 0 ? {
						name: H,
						isTensor: !1
					} : {
						name: H,
						isTensor: !0,
						type: At(w),
						shape: Q
					});
				}
				return $e.set(d, [
					d,
					h,
					g,
					null,
					T,
					!1
				]), [
					d,
					I,
					D,
					$,
					v
				];
			} catch (b) {
				throw h.forEach((y) => o._OrtFree(y)), g.forEach((y) => o._OrtFree(y)), l !== 0 && o._OrtReleaseBinding(l) !== 0 && G("Can't release IO binding."), d !== 0 && o._OrtReleaseSession(d) !== 0 && G("Can't release session."), b;
			} finally {
				o._free(a), c !== 0 && o._OrtReleaseSessionOptions(c) !== 0 && G("Can't release session options."), m.forEach((b) => o._free(b)), o.unmountExternalData?.();
			}
		}, yt = (n) => {
			let t = z(), a = $e.get(n);
			if (!a) throw new Error(`cannot release session. invalid session id: ${n}`);
			let [u, o, d, c, l] = a;
			c && (l && t._OrtClearBoundOutputs(c.handle) !== 0 && G("Can't clear bound outputs."), t._OrtReleaseBinding(c.handle) !== 0 && G("Can't release IO binding.")), t.jsepOnReleaseSession?.(n), t.webnnOnReleaseSession?.(n), t.webgpuOnReleaseSession?.(n), o.forEach((m) => t._OrtFree(m)), d.forEach((m) => t._OrtFree(m)), t._OrtReleaseSession(u) !== 0 && G("Can't release session."), $e.delete(n);
		}, po = async (n, t, a, u, o, d, c = !1) => {
			if (!n) {
				t.push(0);
				return;
			}
			let l = z(), m = l.PTR_SIZE, h = n[0], g = n[1], b = n[3], y = b, T, I;
			if (h === "string" && (b === "gpu-buffer" || b === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
			if (c && b !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${d} when enableGraphCapture is true.`);
			if (b === "gpu-buffer") {
				let v = n[2].gpuBuffer;
				I = Ge(We(h), g);
				{
					let A = l.jsepRegisterBuffer;
					if (!A) throw new Error("Tensor location \"gpu-buffer\" is not supported without using WebGPU.");
					T = A(u, d, v, I);
				}
			} else if (b === "ml-tensor") {
				let v = n[2].mlTensor;
				I = Ge(We(h), g);
				let A = l.webnnRegisterMLTensor;
				if (!A) throw new Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
				T = A(u, v, We(h), g);
			} else {
				let v = n[2];
				if (Array.isArray(v)) {
					I = m * v.length, T = l._malloc(I), a.push(T);
					for (let A = 0; A < v.length; A++) {
						if (typeof v[A] != "string") throw new TypeError(`tensor data at index ${A} is not a string`);
						l.setValue(T + A * m, ae(v[A], a), "*");
					}
				} else {
					let A = l.webnnIsGraphInput, F = l.webnnIsGraphOutput;
					if (h !== "string" && A && F) {
						let P = l.UTF8ToString(o);
						if (A(u, P) || F(u, P)) {
							let k = We(h);
							I = Ge(k, g), y = "ml-tensor";
							let w = l.webnnCreateTemporaryTensor, Q = l.webnnUploadTensor;
							if (!w || !Q) throw new Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
							let H = await w(u, k, g);
							Q(H, new Uint8Array(v.buffer, v.byteOffset, v.byteLength)), T = H;
						} else I = v.byteLength, T = l._malloc(I), a.push(T), l.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, I), T);
					} else I = v.byteLength, T = l._malloc(I), a.push(T), l.HEAPU8.set(new Uint8Array(v.buffer, v.byteOffset, I), T);
				}
			}
			let D = l.stackSave(), $ = l.stackAlloc(4 * g.length);
			try {
				g.forEach((A, F) => l.setValue($ + F * m, A, m === 4 ? "i32" : "i64"));
				let v = l._OrtCreateTensor(We(h), T, I, $, g.length, co(y));
				v === 0 && G(`Can't create tensor for input/output. session=${u}, index=${d}.`), t.push(v);
			} finally {
				l.stackRestore(D);
			}
		}, gt = async (n, t, a, u, o, d) => {
			let c = z(), l = c.PTR_SIZE, m = $e.get(n);
			if (!m) throw new Error(`cannot run inference. invalid session id: ${n}`);
			let h = m[0], g = m[1], b = m[2], y = m[3], T = m[4];
			m[5];
			let D = t.length, $ = u.length, v = 0, A = [], F = [], P = [], k = [], w = [], Q = c.stackSave(), H = c.stackAlloc(D * l), ne = c.stackAlloc(D * l), pe = c.stackAlloc($ * l), B = c.stackAlloc($ * l);
			try {
				[v, A] = oo(d), Pe("wasm prepareInputOutputTensor");
				for (let O = 0; O < D; O++) await po(a[O], F, k, n, g[t[O]], t[O], T);
				for (let O = 0; O < $; O++) await po(o[O], P, k, n, b[u[O]], D + u[O], T);
				Ue("wasm prepareInputOutputTensor");
				for (let O = 0; O < D; O++) c.setValue(H + O * l, F[O], "*"), c.setValue(ne + O * l, g[t[O]], "*");
				for (let O = 0; O < $; O++) c.setValue(pe + O * l, P[O], "*"), c.setValue(B + O * l, b[u[O]], "*");
				c.jsepOnRunStart?.(h), c.webnnOnRunStart?.(h);
				let W;
				W = await c._OrtRun(h, ne, H, D, B, $, pe, v), W !== 0 && G("failed to call OrtRun().");
				let re = [], me = [];
				Pe("wasm ProcessOutputTensor");
				for (let O = 0; O < $; O++) {
					let K = Number(c.getValue(pe + O * l, "*"));
					if (K === P[O] || w.includes(P[O])) {
						re.push(o[O]), K !== P[O] && c._OrtReleaseTensor(K) !== 0 && G("Can't release tensor.");
						continue;
					}
					let je = c.stackSave(), ee = c.stackAlloc(4 * l), he = !1, j, J = 0;
					try {
						c._OrtGetTensorData(K, ee, ee + l, ee + 2 * l, ee + 3 * l) !== 0 && G(`Can't access output tensor data on index ${O}.`);
						let Se = l === 4 ? "i32" : "i64", ve = Number(c.getValue(ee, Se));
						J = c.getValue(ee + l, "*");
						let Ve = c.getValue(ee + l * 2, "*"), Re = Number(c.getValue(ee + l * 3, Se)), te = [];
						for (let L = 0; L < Re; L++) te.push(Number(c.getValue(Ve + L * l, Se)));
						c._OrtFree(Ve) !== 0 && G("Can't free memory for tensor dims.");
						let ue = te.reduce((L, V) => L * V, 1);
						j = At(ve);
						let se = y?.outputPreferredLocations[u[O]];
						if (j === "string") {
							if (se === "gpu-buffer" || se === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
							let L = [];
							for (let V = 0; V < ue; V++) {
								let fe = c.getValue(J + V * l, "*"), ye = c.getValue(J + (V + 1) * l, "*"), ce = V === ue - 1 ? void 0 : ye - fe;
								L.push(c.UTF8ToString(fe, ce));
							}
							re.push([
								j,
								te,
								L,
								"cpu"
							]);
						} else if (se === "gpu-buffer" && ue > 0) {
							let L = c.jsepGetBuffer;
							if (!L) throw new Error("preferredLocation \"gpu-buffer\" is not supported without using WebGPU.");
							let V = L(J), fe = Ge(ve, ue);
							if (fe === void 0 || !Ot(j)) throw new Error(`Unsupported data type: ${j}`);
							he = !0, re.push([
								j,
								te,
								{
									gpuBuffer: V,
									download: c.jsepCreateDownloader(V, fe, j),
									dispose: () => {
										c._OrtReleaseTensor(K) !== 0 && G("Can't release tensor.");
									}
								},
								"gpu-buffer"
							]);
						} else if (se === "ml-tensor" && ue > 0) {
							let L = c.webnnEnsureTensor, V = c.webnnIsGraphInputOutputTypeSupported;
							if (!L || !V) throw new Error("preferredLocation \"ml-tensor\" is not supported without using WebNN.");
							if (Ge(ve, ue) === void 0 || !It(j)) throw new Error(`Unsupported data type: ${j}`);
							if (!V(n, j, !1)) throw new Error(`preferredLocation "ml-tensor" for ${j} output is not supported by current WebNN Context.`);
							let ye = await L(n, J, ve, te, !1);
							he = !0, re.push([
								j,
								te,
								{
									mlTensor: ye,
									download: c.webnnCreateMLTensorDownloader(J, j),
									dispose: () => {
										c.webnnReleaseTensorId(J), c._OrtReleaseTensor(K);
									}
								},
								"ml-tensor"
							]);
						} else if (se === "ml-tensor-cpu-output" && ue > 0) {
							let L = c.webnnCreateMLTensorDownloader(J, j)(), V = re.length;
							he = !0, me.push((async () => {
								let fe = [V, await L];
								return c.webnnReleaseTensorId(J), c._OrtReleaseTensor(K), fe;
							})()), re.push([
								j,
								te,
								[],
								"cpu"
							]);
						} else {
							let V = new (uo(j))(ue);
							new Uint8Array(V.buffer, V.byteOffset, V.byteLength).set(c.HEAPU8.subarray(J, J + V.byteLength)), re.push([
								j,
								te,
								V,
								"cpu"
							]);
						}
					} finally {
						c.stackRestore(je), j === "string" && J && c._free(J), he || c._OrtReleaseTensor(K);
					}
				}
				y && !T && (c._OrtClearBoundOutputs(y.handle) !== 0 && G("Can't clear bound outputs."), $e.set(n, [
					h,
					g,
					b,
					y,
					T,
					!1
				]));
				for (let [O, K] of await Promise.all(me)) re[O][2] = K;
				return Ue("wasm ProcessOutputTensor"), re;
			} finally {
				c.webnnOnRunEnd?.(h), c.stackRestore(Q), F.forEach((W) => c._OrtReleaseTensor(W)), P.forEach((W) => c._OrtReleaseTensor(W)), k.forEach((W) => c._free(W)), v !== 0 && c._OrtReleaseRunOptions(v), A.forEach((W) => c._free(W));
			}
		}, Et = (n) => {
			let t = z(), a = $e.get(n);
			if (!a) throw new Error("invalid session id");
			let u = a[0], o = t._OrtEndProfiling(u);
			o === 0 && G("Can't get an profile file name."), t._OrtFree(o);
		}, Tt = (n) => {
			let t = [];
			for (let a of n) {
				let u = a[2];
				!Array.isArray(u) && "buffer" in u && t.push(u.buffer);
			}
			return t;
		};
	});
	var Me, ie, et, Lt, _t, Bt, ln, dn, ze, He, Ts, mo, ho, wo, bo, yo, go, Eo, pn = N(() => {
		"use strict";
		Te();
		rn();
		xe();
		pt();
		Me = () => !!Y.wasm.proxy && typeof document < "u", et = !1, Lt = !1, _t = !1, dn = /* @__PURE__ */ new Map(), ze = (n, t) => {
			let a = dn.get(n);
			a ? a.push(t) : dn.set(n, [t]);
		}, He = () => {
			if (et || !Lt || _t || !ie) throw new Error("worker not ready");
		}, Ts = (n) => {
			switch (n.data.type) {
				case "init-wasm":
					et = !1, n.data.err ? (_t = !0, ln[1](n.data.err)) : (Lt = !0, ln[0]()), Bt && (URL.revokeObjectURL(Bt), Bt = void 0);
					break;
				case "init-ep":
				case "copy-from":
				case "create":
				case "release":
				case "run":
				case "end-profiling": {
					let t = dn.get(n.data.type);
					n.data.err ? t.shift()[1](n.data.err) : t.shift()[0](n.data.out);
					break;
				}
				default:
			}
		}, mo = async () => {
			if (!Lt) {
				if (et) throw new Error("multiple calls to 'initWasm()' detected.");
				if (_t) throw new Error("previous call to 'initWasm()' failed.");
				if (et = !0, Me()) return new Promise((n, t) => {
					ie?.terminate(), to().then(([a, u]) => {
						try {
							ie = u, ie.onerror = (d) => t(d), ie.onmessage = Ts, ln = [n, t];
							let o = {
								type: "init-wasm",
								in: Y
							};
							!o.in.wasm.wasmPaths && (a || an) && (o.in.wasm.wasmPaths = { wasm: new URL("/assets/ort-wasm-simd-threaded-4byDm7i3.wasm", "" + self.location.href).href }), ie.postMessage(o), Bt = a;
						} catch (o) {
							t(o);
						}
					}, t);
				});
				try {
					await mt(Y.wasm), await ht(Y), Lt = !0;
				} catch (n) {
					throw _t = !0, n;
				} finally {
					et = !1;
				}
			}
		}, ho = async (n) => {
			if (Me()) return He(), new Promise((t, a) => {
				ze("init-ep", [t, a]);
				let u = {
					type: "init-ep",
					in: {
						epName: n,
						env: Y
					}
				};
				ie.postMessage(u);
			});
			await wt(Y, n);
		}, wo = async (n) => Me() ? (He(), new Promise((t, a) => {
			ze("copy-from", [t, a]);
			let u = {
				type: "copy-from",
				in: { buffer: n }
			};
			ie.postMessage(u, [n.buffer]);
		})) : Ze(n), bo = async (n, t) => {
			if (Me()) {
				if (t?.preferredOutputLocation) throw new Error("session option \"preferredOutputLocation\" is not supported for proxy.");
				return He(), new Promise((a, u) => {
					ze("create", [a, u]);
					let o = {
						type: "create",
						in: {
							model: n,
							options: { ...t }
						}
					}, d = [];
					n instanceof Uint8Array && d.push(n.buffer), ie.postMessage(o, d);
				});
			} else return bt(n, t);
		}, yo = async (n) => {
			if (Me()) return He(), new Promise((t, a) => {
				ze("release", [t, a]);
				let u = {
					type: "release",
					in: n
				};
				ie.postMessage(u);
			});
			yt(n);
		}, go = async (n, t, a, u, o, d) => {
			if (Me()) {
				if (a.some((c) => c[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
				if (o.some((c) => c)) throw new Error("pre-allocated output tensor is not supported for proxy.");
				return He(), new Promise((c, l) => {
					ze("run", [c, l]);
					let m = a, h = {
						type: "run",
						in: {
							sessionId: n,
							inputIndices: t,
							inputs: m,
							outputIndices: u,
							options: d
						}
					};
					ie.postMessage(h, Tt(m));
				});
			} else return gt(n, t, a, u, o, d);
		}, Eo = async (n) => {
			if (Me()) return He(), new Promise((t, a) => {
				ze("end-profiling", [t, a]);
				let u = {
					type: "end-profiling",
					in: n
				};
				ie.postMessage(u);
			});
			Et(n);
		};
	});
	var To, Ss, Dt, So = N(() => {
		"use strict";
		Te();
		pn();
		fn();
		dt();
		cn();
		To = (n, t) => {
			switch (n.location) {
				case "cpu": return [
					n.type,
					n.dims,
					n.data,
					"cpu"
				];
				case "gpu-buffer": return [
					n.type,
					n.dims,
					{ gpuBuffer: n.gpuBuffer },
					"gpu-buffer"
				];
				case "ml-tensor": return [
					n.type,
					n.dims,
					{ mlTensor: n.mlTensor },
					"ml-tensor"
				];
				default: throw new Error(`invalid data location: ${n.location} for ${t()}`);
			}
		}, Ss = (n) => {
			switch (n[3]) {
				case "cpu": return new de(n[0], n[2], n[1]);
				case "gpu-buffer": {
					let t = n[0];
					if (!Ot(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
					let { gpuBuffer: a, download: u, dispose: o } = n[2];
					return de.fromGpuBuffer(a, {
						dataType: t,
						dims: n[1],
						download: u,
						dispose: o
					});
				}
				case "ml-tensor": {
					let t = n[0];
					if (!It(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
					let { mlTensor: a, download: u, dispose: o } = n[2];
					return de.fromMLTensor(a, {
						dataType: t,
						dims: n[1],
						download: u,
						dispose: o
					});
				}
				default: throw new Error(`invalid data location: ${n[3]}`);
			}
		}, Dt = class {
			async fetchModelAndCopyToWasmMemory(t) {
				return wo(await Ke(t));
			}
			async loadModel(t, a) {
				_e();
				let u;
				typeof t == "string" ? u = await this.fetchModelAndCopyToWasmMemory(t) : u = t, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await bo(u, a), De();
			}
			async dispose() {
				return yo(this.sessionId);
			}
			async run(t, a, u) {
				_e();
				let o = [], d = [];
				Object.entries(t).forEach((y) => {
					let T = y[0], I = y[1], D = this.inputNames.indexOf(T);
					if (D === -1) throw new Error(`invalid input '${T}'`);
					o.push(I), d.push(D);
				});
				let c = [], l = [];
				Object.entries(a).forEach((y) => {
					let T = y[0], I = y[1], D = this.outputNames.indexOf(T);
					if (D === -1) throw new Error(`invalid output '${T}'`);
					c.push(I), l.push(D);
				});
				let m = o.map((y, T) => To(y, () => `input "${this.inputNames[d[T]]}"`)), h = c.map((y, T) => y ? To(y, () => `output "${this.outputNames[l[T]]}"`) : null), g = await go(this.sessionId, d, m, l, h, u), b = {};
				for (let y = 0; y < g.length; y++) b[this.outputNames[l[y]]] = c[y] ?? Ss(g[y]);
				return De(), b;
			}
			startProfiling() {}
			endProfiling() {
				Eo(this.sessionId);
			}
		};
	});
	var Ao = {};
	ut(Ao, {
		OnnxruntimeWebAssemblyBackend: () => Pt,
		initializeFlags: () => vo,
		wasmBackend: () => vs
	});
	var vo, Pt, vs, Oo = N(() => {
		"use strict";
		Te();
		pn();
		So();
		vo = () => {
			(typeof Y.wasm.initTimeout != "number" || Y.wasm.initTimeout < 0) && (Y.wasm.initTimeout = 0);
			let n = Y.wasm.simd;
			if (typeof n != "boolean" && n !== void 0 && n !== "fixed" && n !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${n}". Reset it to \`false\` and ignore SIMD feature checking.`), Y.wasm.simd = !1), typeof Y.wasm.proxy != "boolean" && (Y.wasm.proxy = !1), typeof Y.wasm.trace != "boolean" && (Y.wasm.trace = !1), typeof Y.wasm.numThreads != "number" || !Number.isInteger(Y.wasm.numThreads) || Y.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) Y.wasm.numThreads = 1;
			else {
				let t = typeof navigator > "u" ? Jt("node:os").cpus().length : navigator.hardwareConcurrency;
				Y.wasm.numThreads = Math.min(4, Math.ceil((t || 1) / 2));
			}
		}, Pt = class {
			async init(t) {
				vo(), await mo(), await ho(t);
			}
			async createInferenceSessionHandler(t, a) {
				let u = new Dt();
				return await u.loadModel(t, a), u;
			}
		}, vs = new Pt();
	});
	Te();
	Te();
	Te();
	var $r = "1.31.0-dev.20260914-8d85527a0";
	{
		let n = (Oo(), Xt(Ao)).wasmBackend;
		Je("cpu", n, 10), Je("wasm", n, 10);
	}
	Object.defineProperty(Y.versions, "web", {
		value: $r,
		enumerable: !0
	});
	var ort_wasm_simd_threaded_default = "/assets/ort-wasm-simd-threaded-4byDm7i3.wasm";
	var ort_wasm_simd_threaded_default$1 = "/assets/ort-wasm-simd-threaded-BQJNh0bu.mjs";
	var _vite_importMeta = { url: self.location.href };
	var DictionarySplitter = class {
		constructor(dictionary) {
			this.trie = this._build_trie(dictionary);
		}
		_build_trie(dictionary) {
			const trie = /* @__PURE__ */ Object.create(null);
			for (const word of dictionary) {
				let node = trie;
				for (let i = 0; i < word.length; ++i) {
					const char = word[i];
					node = node[char] ??= /* @__PURE__ */ Object.create(null);
				}
				node.end = word;
			}
			return trie;
		}
		split(text) {
			const result = [];
			const n = text.length;
			let start = 0;
			let i = 0;
			while (i < n) {
				let node = this.trie;
				let match = null;
				let j = i;
				while (j < n && (node = node[text[j]])) {
					if (node.end) match = node.end;
					++j;
				}
				if (match) {
					if (i > start) result.push(text.slice(start, i));
					result.push(match);
					i += match.length;
					start = i;
				} else ++i;
			}
			if (start < n) result.push(text.slice(start));
			return result;
		}
	};
	var DictionarySplitter_default = DictionarySplitter;
	var AddedToken = class {
		constructor(config) {
			this.content = config.content;
			this.id = config.id;
			this.single_word = config.single_word ?? false;
			this.lstrip = config.lstrip ?? false;
			this.rstrip = config.rstrip ?? false;
			this.special = config.special ?? false;
			this.normalized = config.normalized ?? !this.special;
		}
	};
	var AddedToken_default = AddedToken;
	var compile_unicode_regexp = (source, flags) => {
		try {
			return new RegExp(source, flags);
		} catch (error) {
			if (!(error instanceof SyntaxError)) throw error;
			const property_names = /* @__PURE__ */ new Map();
			const rewritten = source.replace(/(\\[pP])\{([^}=]+)\}/g, (text, p, n, offset) => {
				let preceding_backslashes = 0;
				for (let i = offset - 1; i >= 0 && source[i] === "\\"; --i) ++preceding_backslashes;
				if (preceding_backslashes % 2 === 1) return text;
				let property_name = property_names.get(n);
				if (property_name === void 0) {
					try {
						new RegExp(`\\p{${n}}`, "u");
						property_name = n;
					} catch {
						property_name = `Script=${n}`;
					}
					property_names.set(n, property_name);
				}
				return `${p}{${property_name}}`;
			});
			if (rewritten === source) throw error;
			try {
				return new RegExp(rewritten, flags);
			} catch {
				throw error;
			}
		}
	};
	var clean_up_tokenization = (text) => text.replace(/ \./g, ".").replace(/ \?/g, "?").replace(/ \!/g, "!").replace(/ ,/g, ",").replace(/ \' /g, "'").replace(/ n't/g, "n't").replace(/ 'm/g, "'m").replace(/ 's/g, "'s").replace(/ 've/g, "'ve").replace(/ 're/g, "'re");
	var create_pattern = (pattern, invert = true) => {
		if (pattern.Regex !== void 0) return compile_unicode_regexp(rewrite_oniguruma_to_js(normalize_bloom_split_char_class(pattern.Regex)), "gu");
		else if (pattern.String !== void 0) {
			const escaped = escape_reg_exp(pattern.String);
			return new RegExp(invert ? escaped : `(${escaped})`, "gu");
		} else {
			console.warn("Unknown pattern type:", pattern);
			return null;
		}
	};
	var UNICODE_WORD_CHARS_IN_CLASS = "\\p{Alphabetic}\\p{M}\\p{Nd}\\p{Pc}";
	var UNICODE_WORD_CHARS = `${UNICODE_WORD_CHARS_IN_CLASS}\\u00B2\\u00B3\\u00B9\\u00BC-\\u00BE`;
	var UNICODE_WORD_CLASS = `[${UNICODE_WORD_CHARS}]`;
	var UNICODE_NON_WORD_CLASS = `[^${UNICODE_WORD_CHARS}]`;
	var UNICODE_WORD_BOUNDARY = `(?:(?<!${UNICODE_WORD_CLASS})(?=${UNICODE_WORD_CLASS})|(?<=${UNICODE_WORD_CLASS})(?!${UNICODE_WORD_CLASS}))`;
	var UNICODE_NON_WORD_BOUNDARY = `(?:(?<!${UNICODE_WORD_CLASS})(?!${UNICODE_WORD_CLASS})|(?<=${UNICODE_WORD_CLASS})(?=${UNICODE_WORD_CLASS}))`;
	var LINE_START_ANCHOR = "(?:(?<![\\s\\S])|(?<=\\n))";
	var LINE_END_ANCHOR = "(?:(?=\\n)|(?![\\s\\S]))";
	var HEX_DIGIT_CHARS = "0-9A-Fa-f";
	var ESCAPE_REWRITES = /* @__PURE__ */ new Map([
		["A", "(?<![\\s\\S])"],
		["z", "(?![\\s\\S])"],
		["Z", "(?=\\n?(?![\\s\\S]))"],
		["h", `[${HEX_DIGIT_CHARS}]`],
		["H", `[^${HEX_DIGIT_CHARS}]`],
		["w", UNICODE_WORD_CLASS],
		["W", UNICODE_NON_WORD_CLASS],
		["d", "\\p{Nd}"],
		["D", "\\P{Nd}"],
		["s", "\\p{White_Space}"],
		["S", "\\P{White_Space}"],
		["b", UNICODE_WORD_BOUNDARY],
		["B", UNICODE_NON_WORD_BOUNDARY],
		["a", "\\x07"],
		["e", "\\x1B"]
	]);
	var CLASS_ESCAPE_REWRITES = /* @__PURE__ */ new Map([
		["h", HEX_DIGIT_CHARS],
		["w", UNICODE_WORD_CHARS_IN_CLASS],
		["d", "\\p{Nd}"],
		["D", "\\P{Nd}"],
		["s", "\\p{White_Space}"],
		["S", "\\P{White_Space}"],
		["a", "\\x07"],
		["e", "\\x1B"]
	]);
	var CLASS_COMPLEMENT_ALTERNATIVES = /* @__PURE__ */ new Map([["W", `[^${UNICODE_WORD_CHARS_IN_CLASS}]`], ["H", `[^${HEX_DIGIT_CHARS}]`]]);
	var RAW_WHITESPACE_ESCAPES = /* @__PURE__ */ new Map([
		["\n", "\\n"],
		["\r", "\\r"],
		["	", "\\t"],
		["\f", "\\f"],
		["\v", "\\v"]
	]);
	var POSIX_CLASS_FRAGMENTS = /* @__PURE__ */ new Map([
		["alpha", "\\p{Alphabetic}"],
		["alnum", "\\p{Alphabetic}\\p{Nd}"],
		["digit", "\\p{Nd}"],
		["lower", "\\p{Lowercase}"],
		["upper", "\\p{Uppercase}"],
		["space", "\\p{White_Space}"],
		["blank", "\\t\\p{Zs}"],
		["punct", "\\p{P}\\p{S}"],
		["cntrl", "\\p{Cc}"],
		["word", UNICODE_WORD_CHARS_IN_CLASS],
		["xdigit", HEX_DIGIT_CHARS]
	]);
	var JS_SYNTAX_CHARS = "^$\\.*+?()[]{}|/";
	var GROUP_PREFIX_RE = /^\(\?(?:<[=!]|<[A-Za-z_][A-Za-z0-9_]*>|[:=!>])/;
	var BRACED_ESCAPE_RE = /^\\([pPxu])\{([^}]*)\}/;
	var QUANTIFIER_BRACE_RE = /^\{(\d+(?:,\d*)?|,\d+)\}/;
	var POSIX_BRACKET_RE = /^\[:(\^?)(\p{Alphabetic}+):\]/u;
	var EMPTY_NEGATED_POSIX_BRACKET_RE = /^\[:\^:\]/;
	var UNSUPPORTED_POSIX_BRACKET_RE = /^\[(?:\.[^\]]*\.\]|=[^\]]*=\])/;
	var FIXED_WIDTH_ESCAPE_RE = /^(?:\\x[0-9A-Fa-f]{2}|\\u[0-9A-Fa-f]{4}|\\c[A-Za-z])/;
	var is_ascii_letter = (char) => char >= "A" && char <= "Z" || char >= "a" && char <= "z";
	var character_at = (text, index) => String.fromCodePoint(text.codePointAt(index));
	var get_ascii_folded_hex_atom = (hex) => {
		if (!/^[0-9A-Fa-f]{1,8}$/.test(hex)) return null;
		const code_point = Number.parseInt(hex, 16);
		if (code_point > 127) return null;
		const letter = String.fromCharCode(code_point);
		return is_ascii_letter(letter) ? `[${letter.toLowerCase()}${letter.toUpperCase()}]` : null;
	};
	var normalize_bloom_split_char_class = (regex) => regex.replace(/\[\^\(\\s\|\[([^\]]+)\]\)\]/g, "[^()|\\s$1]");
	var ANY_CODE_POINT = "[\\s\\S]";
	var MAX_CHARACTER_CLASS_NESTING_DEPTH = 256;
	var create_character_class_operand = () => ({
		fragment: "",
		alternatives: [],
		tail: null,
		contains_complex_set: false
	});
	var throw_character_class_range_error = (index) => {
		throw new SyntaxError(`Unsupported range with a set-valued character-class operand at index ${index}`);
	};
	var add_character_class_atom = (operand, atom, index, contains_complex_set = true) => {
		if (operand.tail === "range") throw_character_class_range_error(index);
		operand.alternatives.push(atom);
		operand.tail = "set";
		operand.contains_complex_set = operand.contains_complex_set || contains_complex_set;
	};
	var append_character_class_fragment = (operand, fragment, set_valued = false, index = -1) => {
		if (set_valued && operand.tail === "range") throw_character_class_range_error(index);
		if (operand.tail === "range") {
			operand.fragment += fragment;
			operand.tail = "complete_range";
			return;
		}
		operand.fragment += fragment;
		operand.tail = set_valued ? "set" : "scalar";
		operand.contains_complex_set = operand.contains_complex_set || set_valued;
	};
	var rewrite_character_class_escape = (regex, index, operand) => {
		const braced = BRACED_ESCAPE_RE.exec(regex.slice(index));
		if (braced) {
			const [text, kind, body] = braced;
			if (kind === "P" && body === "Word") add_character_class_atom(operand, `[^${UNICODE_WORD_CHARS_IN_CLASS}]`, index);
			else append_character_class_fragment(operand, kind === "x" ? `\\u{${body}}` : kind === "p" && body === "Word" ? UNICODE_WORD_CHARS_IN_CLASS : text, kind === "p" || kind === "P", index);
			return index + text.length;
		}
		const fixed_width = FIXED_WIDTH_ESCAPE_RE.exec(regex.slice(index));
		if (fixed_width) {
			append_character_class_fragment(operand, fixed_width[0]);
			return index + fixed_width[0].length;
		}
		if (index + 1 >= regex.length) throw new SyntaxError(`Unterminated escape in character class at index ${index}`);
		const next = character_at(regex, index + 1);
		const next_end = index + 1 + next.length;
		const raw_whitespace = RAW_WHITESPACE_ESCAPES.get(next);
		if (raw_whitespace !== void 0) {
			append_character_class_fragment(operand, raw_whitespace);
			return next_end;
		}
		const complement = CLASS_COMPLEMENT_ALTERNATIVES.get(next);
		if (complement !== void 0) {
			add_character_class_atom(operand, complement, index);
			return next_end;
		}
		const rewrite = CLASS_ESCAPE_REWRITES.get(next);
		let replacement;
		let set_valued = false;
		if (rewrite !== void 0) {
			replacement = rewrite;
			set_valued = next !== "a" && next !== "e";
		} else if (/[A-Za-z0-9]/.test(next)) replacement = `\\${next}`;
		else if (JS_SYNTAX_CHARS.includes(next) || next === "-") replacement = `\\${next}`;
		else replacement = next;
		append_character_class_fragment(operand, replacement, set_valued, index);
		return next_end;
	};
	var compile_character_set_union = (pieces) => {
		if (pieces.length === 1) return pieces[0];
		return `(?:(?=(?:${pieces.join("|")}))${ANY_CODE_POINT})`;
	};
	var compile_character_class_operand = (operand) => {
		return compile_character_set_union(operand.fragment.length === 0 ? operand.alternatives : [`[${operand.fragment}]`, ...operand.alternatives]);
	};
	var get_ascii_fold_additions = (positive_atom) => {
		const membership = compile_unicode_regexp(`^(?:${positive_atom})$`, "u");
		let additions = "";
		for (let offset = 0; offset < 26; ++offset) {
			const upper = String.fromCharCode(65 + offset);
			const lower = String.fromCharCode(97 + offset);
			const has_upper = membership.test(upper);
			if (has_upper !== membership.test(lower)) additions += has_upper ? lower : upper;
		}
		return additions;
	};
	var parse_character_class = (regex, start, ascii_fold, apply_ascii_fold = true, nesting_depth = 1) => {
		if (nesting_depth > MAX_CHARACTER_CLASS_NESTING_DEPTH) throw new SyntaxError(`Maximum character-class nesting depth of ${MAX_CHARACTER_CLASS_NESTING_DEPTH} exceeded at index ${start}`);
		let i = start + 1;
		const negated = regex[i] === "^";
		if (negated) ++i;
		const first_content_index = i;
		const operands = [create_character_class_operand()];
		let operand = operands[0];
		let contains_nested_negated_complex_set = false;
		while (i < regex.length) {
			const char = character_at(regex, i);
			if (char === "\\") {
				i = rewrite_character_class_escape(regex, i, operand);
				continue;
			}
			if (char === "]") {
				if (i === first_content_index) {
					append_character_class_fragment(operand, "\\]");
					++i;
					continue;
				}
				if (operand.tail === null) {
					if (operands.length > 1) throw new SyntaxError(`Malformed character-class intersection with an empty operand at index ${i}`);
					throw new SyntaxError(`Empty character class at index ${start}`);
				}
				const contains_complex_set = operands.some((candidate) => candidate.contains_complex_set);
				if (negated && operands.length > 1 && contains_nested_negated_complex_set) throw new SyntaxError(`Unsupported outer-negated character-class intersection with a nested negated class containing a Unicode property, POSIX class, or shorthand at index ${start}`);
				const first_atom = compile_character_class_operand(operands[0]);
				let positive_atom = first_atom;
				if (operands.length > 1) {
					let lookaheads = "";
					for (let j = 1; j < operands.length; ++j) lookaheads += `(?=${compile_character_class_operand(operands[j])})`;
					positive_atom = `(?:${lookaheads}${first_atom})`;
				}
				const is_direct_class = operands.length === 1 && operand.alternatives.length === 0;
				let direct_fragment = operand.fragment;
				if (ascii_fold && apply_ascii_fold) {
					const additions = get_ascii_fold_additions(positive_atom);
					if (additions.length > 0) if (is_direct_class) {
						direct_fragment += additions;
						positive_atom = `[${direct_fragment}]`;
					} else positive_atom = compile_character_set_union([positive_atom, `[${additions}]`]);
				}
				return {
					atom: negated ? is_direct_class ? `[^${direct_fragment}]` : `(?:(?!${positive_atom})${ANY_CODE_POINT})` : positive_atom,
					end: i + 1,
					negated,
					contains_complex_set,
					contains_nested_negated_complex_set
				};
			}
			if (regex.startsWith("&&", i)) {
				if (operand.tail === null) throw new SyntaxError(`Malformed character-class intersection with an empty operand at index ${i}`);
				operand = create_character_class_operand();
				operands.push(operand);
				i += 2;
				continue;
			}
			if (char === "[") {
				const suffix = regex.slice(i);
				if (EMPTY_NEGATED_POSIX_BRACKET_RE.test(suffix)) throw new SyntaxError(`Malformed empty negated POSIX character class at index ${i}`);
				const posix = POSIX_BRACKET_RE.exec(suffix);
				if (posix) {
					const [, posix_negated, name] = posix;
					const fragment = POSIX_CLASS_FRAGMENTS.get(name);
					if (fragment === void 0) throw new SyntaxError(`Unsupported POSIX character class "${name}" at index ${i}`);
					if (ascii_fold && posix_negated && (name === "lower" || name === "upper")) throw new SyntaxError(`Unsupported negated POSIX ${name} class inside an inline case-insensitive group`);
					if (posix_negated) add_character_class_atom(operand, `[^${fragment}]`, i);
					else append_character_class_fragment(operand, fragment, true, i);
					i += posix[0].length;
					continue;
				}
				if (UNSUPPORTED_POSIX_BRACKET_RE.test(suffix)) throw new SyntaxError(`Unsupported POSIX collating or equivalence bracket expression at index ${i}`);
				const nested = parse_character_class(regex, i, ascii_fold, false, nesting_depth + 1);
				add_character_class_atom(operand, nested.atom, i, nested.contains_complex_set);
				contains_nested_negated_complex_set ||= nested.contains_nested_negated_complex_set || nested.negated && nested.contains_complex_set;
				i = nested.end;
				continue;
			}
			if (char === "-") {
				const is_terminal_literal = regex[i + 1] === "]" || regex.startsWith("&&", i + 1);
				if (operand.tail === "set" && !is_terminal_literal) throw_character_class_range_error(i);
				if (operand.tail === null || operand.tail === "range" || operand.tail === "complete_range" || is_terminal_literal) append_character_class_fragment(operand, "\\-");
				else {
					operand.fragment += "-";
					operand.tail = "range";
				}
				++i;
				continue;
			}
			append_character_class_fragment(operand, char === "^" && operand.fragment.length === 0 ? "\\^" : char);
			i += char.length;
		}
		throw new SyntaxError(`${operands.length > 1 ? "Unterminated character-class intersection" : "Unterminated character class"} at index ${start}`);
	};
	var rewrite_oniguruma_to_js = (regex) => {
		let out = "";
		let atom_start = -1;
		let last_was_quantifier = false;
		let ascii_fold = false;
		const group_states = [];
		const emit_atom = (text) => {
			atom_start = out.length;
			out += text;
			last_was_quantifier = false;
		};
		for (let i = 0; i < regex.length;) {
			const char = character_at(regex, i);
			if (char === "\\") {
				const braced = BRACED_ESCAPE_RE.exec(regex.slice(i));
				if (braced) {
					const [text, kind, body] = braced;
					let replacement2 = text;
					if (kind === "x") {
						const code_point_escape = `\\u{${body}}`;
						replacement2 = ascii_fold ? get_ascii_folded_hex_atom(body) ?? code_point_escape : code_point_escape;
					} else if (body === "Word") replacement2 = kind === "p" ? UNICODE_WORD_CLASS : UNICODE_NON_WORD_CLASS;
					emit_atom(replacement2);
					i += text.length;
					continue;
				}
				const fixed_width = FIXED_WIDTH_ESCAPE_RE.exec(regex.slice(i));
				if (fixed_width) {
					const text = fixed_width[0];
					emit_atom(ascii_fold && text[1] !== "c" ? get_ascii_folded_hex_atom(text.slice(2)) ?? text : text);
					i += text.length;
					continue;
				}
				if (i + 1 >= regex.length) {
					out += char;
					break;
				}
				const next = character_at(regex, i + 1);
				i += 1 + next.length;
				if (next === "G") continue;
				const raw_whitespace = RAW_WHITESPACE_ESCAPES.get(next);
				if (raw_whitespace !== void 0) {
					emit_atom(raw_whitespace);
					continue;
				}
				const rewrite = ESCAPE_REWRITES.get(next);
				let replacement;
				if (rewrite !== void 0) replacement = rewrite;
				else if (/[A-Za-z0-9]/.test(next)) replacement = `\\${next}`;
				else if (JS_SYNTAX_CHARS.includes(next)) replacement = `\\${next}`;
				else replacement = next;
				emit_atom(replacement);
				continue;
			}
			switch (char) {
				case "[": {
					const parsed = parse_character_class(regex, i, ascii_fold);
					emit_atom(parsed.atom);
					i = parsed.end;
					continue;
				}
				case "]":
					emit_atom("\\]");
					++i;
					continue;
				case ".":
					emit_atom("[^\\n]");
					++i;
					continue;
				case "^":
					emit_atom(LINE_START_ANCHOR);
					++i;
					continue;
				case "$":
					emit_atom(LINE_END_ANCHOR);
					++i;
					continue;
				case "(": {
					const inline_case_insensitive = regex.startsWith("(?i:", i);
					const source_prefix = inline_case_insensitive ? "(?i:" : GROUP_PREFIX_RE.exec(regex.slice(i))?.[0] ?? "(";
					const output_prefix = inline_case_insensitive ? "(?:" : source_prefix === "(?>" ? "(?:" : source_prefix;
					group_states.push([out.length, ascii_fold]);
					if (inline_case_insensitive) ascii_fold = true;
					out += output_prefix;
					last_was_quantifier = false;
					i += source_prefix.length;
					continue;
				}
				case ")":
					out += char;
					[atom_start, ascii_fold] = group_states.pop() ?? [-1, false];
					last_was_quantifier = false;
					++i;
					continue;
				case "|":
					out += char;
					atom_start = -1;
					last_was_quantifier = false;
					++i;
					continue;
				case "{": {
					const quant = QUANTIFIER_BRACE_RE.exec(regex.slice(i));
					if (!quant || atom_start < 0) {
						emit_atom("\\{");
						++i;
						continue;
					}
					const body = quant[1].startsWith(",") ? `0${quant[1]}` : quant[1];
					i += quant[0].length;
					const following = regex[i];
					if (following === "+" || following === "*") {
						out = `${out.slice(0, atom_start)}(?:${out.slice(atom_start)}{${body}})${following}`;
						++i;
					} else out += `{${body}}`;
					last_was_quantifier = true;
					continue;
				}
				case "}":
					emit_atom("\\}");
					++i;
					continue;
				case "+":
					if (last_was_quantifier) {
						++i;
						continue;
					}
					out += char;
					last_was_quantifier = true;
					++i;
					continue;
				case "*":
				case "?":
					out += char;
					last_was_quantifier = true;
					++i;
					continue;
				default:
					emit_atom(ascii_fold && is_ascii_letter(char) ? `[${char.toLowerCase()}${char.toUpperCase()}]` : char);
					i += char.length;
					continue;
			}
		}
		return out;
	};
	var escape_reg_exp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	var fuse_unk = (arr, tokens_to_ids, unk_token_id) => {
		const fused = [];
		let i = 0;
		while (i < arr.length) {
			fused.push(arr[i]);
			if ((tokens_to_ids.get(arr[i]) ?? unk_token_id) !== unk_token_id) {
				++i;
				continue;
			}
			while (++i < arr.length && (tokens_to_ids.get(arr[i]) ?? unk_token_id) === unk_token_id) if (tokens_to_ids.get(fused.at(-1)) !== unk_token_id) fused[fused.length - 1] += arr[i];
		}
		return fused;
	};
	var is_chinese_char = (cp) => cp >= 19968 && cp <= 40959 || cp >= 13312 && cp <= 19903 || cp >= 131072 && cp <= 173791 || cp >= 173824 && cp <= 177983 || cp >= 177984 && cp <= 178207 || cp >= 178208 && cp <= 183983 || cp >= 63744 && cp <= 64255 || cp >= 194560 && cp <= 195103;
	var is_integral_number = (x) => Number.isInteger(x) || typeof x === "bigint";
	var len = (s) => {
		let length = 0;
		for (const c of s) ++length;
		return length;
	};
	var lowercase_and_remove_accents = (text) => remove_accents(text.toLowerCase());
	var merge_arrays = (...arrs) => Array.prototype.concat.apply([], arrs);
	var object_to_map = (obj) => new Map(Object.entries(obj));
	var regex_split = (text, regex) => {
		const result = [];
		let prev = 0;
		for (const match of text.matchAll(regex)) {
			const full_match = match[0];
			if (prev < match.index) result.push(text.slice(prev, match.index));
			if (full_match.length > 0) result.push(full_match);
			prev = match.index + full_match.length;
		}
		if (prev < text.length) result.push(text.slice(prev));
		return result;
	};
	var remove_accents = (text) => text.replace(/\p{M}/gu, "");
	var validate_object = (obj, name, required_keys = []) => {
		if (!obj || Array.isArray(obj) || typeof obj !== "object") return `${name} must be a valid object`;
		for (const key of required_keys) if (!(key in obj)) return `${name} must contain a "${key}" property`;
		return null;
	};
	var whitespace_split = (text) => text.match(/\S+/g) || [];
	var Callable = class {
		constructor() {
			const closure = function(...args) {
				return closure._call(...args);
			};
			return Object.setPrototypeOf(closure, _vite_importMeta.prototype);
		}
	};
	var Callable_default = Callable;
	var Normalizer = class extends Callable_default {
		constructor(config) {
			super();
			this.config = config;
		}
		_call(text) {
			return this.normalize(text);
		}
	};
	var Normalizer_default = Normalizer;
	var BertNormalizer = class extends Normalizer_default {
		tokenize_chinese_chars(text) {
			const output = [];
			for (let i = 0; i < text.length; ++i) {
				const char = text[i];
				if (is_chinese_char(char.charCodeAt(0))) {
					output.push(" ");
					output.push(char);
					output.push(" ");
				} else output.push(char);
			}
			return output.join("");
		}
		strip_accents(text) {
			return text.normalize("NFD").replace(/\p{Mn}/gu, "");
		}
		is_control(char) {
			switch (char) {
				case "	":
				case "\n":
				case "\r": return false;
				default: return /^\p{Cc}|\p{Cf}|\p{Co}|\p{Cs}$/u.test(char);
			}
		}
		clean_text(text) {
			const output = [];
			for (const char of text) {
				const cp = char.charCodeAt(0);
				if (cp === 0 || cp === 65533 || this.is_control(char)) continue;
				if (/^\s$/.test(char)) output.push(" ");
				else output.push(char);
			}
			return output.join("");
		}
		normalize(text) {
			if (this.config.clean_text) text = this.clean_text(text);
			if (this.config.handle_chinese_chars) text = this.tokenize_chinese_chars(text);
			if (this.config.lowercase) {
				text = text.toLowerCase();
				if (this.config.strip_accents !== false) text = this.strip_accents(text);
			} else if (this.config.strip_accents) text = this.strip_accents(text);
			return text;
		}
	};
	var BertNormalizer_default = BertNormalizer;
	var Precompiled = class extends Normalizer_default {
		constructor(config) {
			super(config);
			this.charsmap = config.precompiled_charsmap ?? null;
		}
		normalize(text) {
			text = text.replace(/[\u0001-\u0008\u000B\u000E-\u001F\u007F\u008F\u009F]/gm, "");
			text = text.replace(/[\u0009\u000A\u000C\u000D\u00A0\u1680\u2000-\u200F\u2028\u2029\u202F\u205F\u2581\u3000\uFEFF\uFFFD]/gm, " ");
			if (text.includes("～")) text = text.split("～").map((part) => part.normalize("NFKC")).join("～");
			else text = text.normalize("NFKC");
			return text;
		}
	};
	var Precompiled_default = Precompiled;
	var Sequence = class extends Normalizer_default {
		constructor(config) {
			super(config);
			this.normalizers = (config.normalizers ?? []).map((x) => create_normalizer_default(x));
		}
		normalize(text) {
			return this.normalizers.reduce((t, normalizer) => {
				return normalizer ? normalizer.normalize(t) : t;
			}, text);
		}
	};
	var Sequence_default = Sequence;
	var Replace = class extends Normalizer_default {
		constructor(config) {
			super(config);
			this.pattern = create_pattern(this.config.pattern ?? {});
		}
		normalize(text) {
			return this.pattern === null ? text : text.replaceAll(this.pattern, this.config.content ?? "");
		}
	};
	var Replace_default = Replace;
	var UnicodeNormalizer = class extends Normalizer_default {
		constructor() {
			super(...arguments);
			this.form = "NFC";
		}
		normalize(text) {
			text = text.normalize(this.form);
			return text;
		}
	};
	var UnicodeNormalizer_default = UnicodeNormalizer;
	var NFC = class extends UnicodeNormalizer_default {
		constructor() {
			super(...arguments);
			this.form = "NFC";
		}
	};
	var NFC_default = NFC;
	var NFD = class extends UnicodeNormalizer_default {
		constructor() {
			super(...arguments);
			this.form = "NFD";
		}
	};
	var NFD_default = NFD;
	var NFKC = class extends UnicodeNormalizer_default {
		constructor() {
			super(...arguments);
			this.form = "NFKC";
		}
	};
	var NFKC_default = NFKC;
	var NFKD = class extends UnicodeNormalizer_default {
		constructor() {
			super(...arguments);
			this.form = "NFKD";
		}
	};
	var NFKD_default = NFKD;
	var Strip = class extends Normalizer_default {
		normalize(text) {
			if (this.config.strip_left && this.config.strip_right) text = text.trim();
			else {
				if (this.config.strip_left) text = text.trimStart();
				if (this.config.strip_right) text = text.trimEnd();
			}
			return text;
		}
	};
	var Strip_default = Strip;
	var StripAccents = class extends Normalizer_default {
		normalize(text) {
			return remove_accents(text);
		}
	};
	var StripAccents_default = StripAccents;
	var Lowercase = class extends Normalizer_default {
		normalize(text) {
			return text.toLowerCase();
		}
	};
	var Lowercase_default = Lowercase;
	var Prepend = class extends Normalizer_default {
		normalize(text) {
			text = this.config.prepend + text;
			return text;
		}
	};
	var Prepend_default = Prepend;
	function create_normalizer(config) {
		if (config === null) return null;
		switch (config.type) {
			case "BertNormalizer": return new BertNormalizer_default(config);
			case "Precompiled": return new Precompiled_default(config);
			case "Sequence": return new Sequence_default(config);
			case "Replace": return new Replace_default(config);
			case "NFC": return new NFC_default(config);
			case "NFD": return new NFD_default(config);
			case "NFKC": return new NFKC_default(config);
			case "NFKD": return new NFKD_default(config);
			case "Strip": return new Strip_default(config);
			case "StripAccents": return new StripAccents_default(config);
			case "Lowercase": return new Lowercase_default(config);
			case "Prepend": return new Prepend_default(config);
			default: throw new Error(`Unknown Normalizer type: ${config.type}`);
		}
	}
	var create_normalizer_default = create_normalizer;
	var PreTokenizer = class extends Callable_default {
		pre_tokenize(text, options) {
			return (Array.isArray(text) ? text.map((x) => this.pre_tokenize_text(x, options)) : this.pre_tokenize_text(text, options)).flat();
		}
		_call(text, options) {
			return this.pre_tokenize(text, options);
		}
	};
	var PreTokenizer_default = PreTokenizer;
	var BYTES_TO_UNICODE = (() => {
		const bs$1 = [
			...Array.from({ length: "~".charCodeAt(0) - "!".charCodeAt(0) + 1 }, (_, i) => i + "!".charCodeAt(0)),
			...Array.from({ length: "¬".charCodeAt(0) - "¡".charCodeAt(0) + 1 }, (_, i) => i + "¡".charCodeAt(0)),
			...Array.from({ length: "ÿ".charCodeAt(0) - "®".charCodeAt(0) + 1 }, (_, i) => i + "®".charCodeAt(0))
		];
		const cs$1 = bs$1.slice();
		let n = 0;
		for (let b = 0; b < 256; ++b) if (!bs$1.includes(b)) {
			bs$1.push(b);
			cs$1.push(256 + n);
			n += 1;
		}
		const ccs = cs$1.map((n2) => String.fromCharCode(n2));
		return Object.fromEntries(bs$1.map((b, i) => [b, ccs[i]]));
	})();
	var reverse_dictionary = (data) => Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));
	var UNICODE_TO_BYTES = reverse_dictionary(BYTES_TO_UNICODE);
	var PUNCTUATION_REGEX = "\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E";
	var ByteLevel = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.config = config;
			this.add_prefix_space = this.config.add_prefix_space ?? false;
			this.trim_offsets = this.config.trim_offsets ?? false;
			this.use_regex = this.config.use_regex ?? true;
			this.pattern = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
			this.byte_encoder = BYTES_TO_UNICODE;
			this.text_encoder = new TextEncoder();
		}
		pre_tokenize_text(text, options) {
			if (this.add_prefix_space && !text.startsWith(" ")) text = " " + text;
			return (this.use_regex ? text.match(this.pattern) || [] : [text]).map((token) => Array.from(this.text_encoder.encode(token), (byte) => this.byte_encoder[byte]).join(""));
		}
	};
	var ByteLevel_default = ByteLevel;
	var Whitespace = class extends PreTokenizer_default {
		pre_tokenize_text(text, options) {
			return text.match(/\w+|[^\w\s]+/g) || [];
		}
	};
	var Whitespace_default = Whitespace;
	var Metaspace = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.replacement = config.replacement ?? "▁";
			this.str_rep = config.str_rep || this.replacement;
			this.prepend_scheme = config.prepend_scheme ?? "always";
		}
		pre_tokenize_text(text, options) {
			const { section_index = void 0 } = options ?? {};
			let normalized = text.replaceAll(" ", this.str_rep);
			if (!normalized.startsWith(this.replacement) && (this.prepend_scheme === "always" || this.prepend_scheme === "first" && section_index === 0)) normalized = this.str_rep + normalized;
			return [normalized];
		}
	};
	var Metaspace_default = Metaspace;
	var Split = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.config = config;
			this.pattern = create_pattern(this.config.pattern ?? {}, this.config.invert ?? true);
		}
		pre_tokenize_text(text) {
			if (this.pattern === null) return [];
			if (this.config.invert) return (text.match(this.pattern) || []).filter((x) => x);
			else if (this.config.behavior?.toLowerCase() === "removed") return text.split(this.pattern).filter((x) => x);
			else return regex_split(text, this.pattern);
		}
	};
	var Split_default = Split;
	var Punctuation = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.config = config;
			this.pattern = new RegExp(`[^${PUNCTUATION_REGEX}]+|[${PUNCTUATION_REGEX}]+`, "gu");
		}
		pre_tokenize_text(text) {
			return text.match(this.pattern) || [];
		}
	};
	var Punctuation_default = Punctuation;
	var Digits = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.config = config;
			const digit_pattern = `[^\\d]+|\\d${this.config.individual_digits ? "" : "+"}`;
			this.pattern = new RegExp(digit_pattern, "gu");
		}
		pre_tokenize_text(text) {
			return text.match(this.pattern) || [];
		}
	};
	var Digits_default = Digits;
	var BertPreTokenizer = class extends PreTokenizer_default {
		constructor() {
			super();
			this.pattern = new RegExp(`[^\\s${PUNCTUATION_REGEX}]+|[${PUNCTUATION_REGEX}]`, "gu");
		}
		pre_tokenize_text(text, options) {
			return text.trim().match(this.pattern) || [];
		}
	};
	var BertPreTokenizer_default = BertPreTokenizer;
	var Replace2 = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.config = config;
			this.pattern = create_pattern(this.config.pattern ?? {});
			this.content = this.config.content ?? "";
		}
		pre_tokenize_text(text) {
			if (this.pattern === null) return [text];
			return [text.replaceAll(this.pattern, this.config.content ?? "")];
		}
	};
	var Replace_default2 = Replace2;
	var Sequence2 = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.tokenizers = (config.pretokenizers ?? []).map((x) => create_pre_tokenizer_default(x));
		}
		pre_tokenize_text(text, options) {
			return this.tokenizers.reduce((pre_tokenized_text, tokenizer) => {
				return tokenizer ? tokenizer.pre_tokenize(pre_tokenized_text, options) : pre_tokenized_text;
			}, [text]);
		}
	};
	var Sequence_default2 = Sequence2;
	var WhitespaceSplit = class extends PreTokenizer_default {
		pre_tokenize_text(text) {
			return whitespace_split(text);
		}
	};
	var WhitespaceSplit_default = WhitespaceSplit;
	var FixedLength = class extends PreTokenizer_default {
		constructor(config) {
			super();
			this.config = config;
			this._length = config.length;
		}
		pre_tokenize_text(text) {
			const tokens = [];
			for (let i = 0; i < text.length; i += this._length) tokens.push(text.slice(i, i + this._length));
			return tokens;
		}
	};
	var FixedLength_default = FixedLength;
	function create_pre_tokenizer(config) {
		if (config === null) return null;
		switch (config.type) {
			case "BertPreTokenizer": return new BertPreTokenizer_default();
			case "Sequence": return new Sequence_default2(config);
			case "Whitespace": return new Whitespace_default();
			case "WhitespaceSplit": return new WhitespaceSplit_default();
			case "Metaspace": return new Metaspace_default(config);
			case "ByteLevel": return new ByteLevel_default(config);
			case "Split": return new Split_default(config);
			case "Punctuation": return new Punctuation_default(config);
			case "Digits": return new Digits_default(config);
			case "Replace": return new Replace_default2(config);
			case "FixedLength": return new FixedLength_default(config);
			default: throw new Error(`Unknown PreTokenizer type: ${config.type}`);
		}
	}
	var create_pre_tokenizer_default = create_pre_tokenizer;
	var TokenizerModel = class extends Callable_default {
		constructor(config) {
			super();
			this.config = config;
			this.vocab = [];
			this.tokens_to_ids = /* @__PURE__ */ new Map();
			this.unk_token_id = void 0;
			this.unk_token = void 0;
			this.end_of_word_suffix = void 0;
			this.fuse_unk = this.config.fuse_unk ?? false;
		}
		_call(tokens) {
			let result = this.encode(tokens);
			if (this.fuse_unk) result = fuse_unk(result, this.tokens_to_ids, this.unk_token_id);
			return result;
		}
	};
	var TokenizerModel_default = TokenizerModel;
	var WordPieceTokenizer = class extends TokenizerModel_default {
		constructor(config) {
			super(config);
			this.max_input_chars_per_word = 100;
			this.tokens_to_ids = object_to_map(config.vocab);
			this.unk_token_id = this.tokens_to_ids.get(config.unk_token);
			this.unk_token = config.unk_token;
			this.max_input_chars_per_word = config.max_input_chars_per_word ?? 100;
			this.vocab = new Array(this.tokens_to_ids.size);
			for (const [key, value] of this.tokens_to_ids) this.vocab[value] = key;
		}
		encode(tokens) {
			const output_tokens = [];
			for (const token of tokens) {
				const chars = [...token];
				if (chars.length > this.max_input_chars_per_word) {
					output_tokens.push(this.unk_token);
					continue;
				}
				let is_unknown = false;
				let start = 0;
				const sub_tokens = [];
				while (start < chars.length) {
					let end = chars.length;
					let current_substring = null;
					while (start < end) {
						let substr = chars.slice(start, end).join("");
						if (start > 0) substr = this.config.continuing_subword_prefix + substr;
						if (this.tokens_to_ids.has(substr)) {
							current_substring = substr;
							break;
						}
						--end;
					}
					if (current_substring === null) {
						is_unknown = true;
						break;
					}
					sub_tokens.push(current_substring);
					start = end;
				}
				if (is_unknown) output_tokens.push(this.unk_token);
				else output_tokens.push(...sub_tokens);
			}
			return output_tokens;
		}
	};
	var WordPiece_default = WordPieceTokenizer;
	var CharTrieNode = class _CharTrieNode {
		constructor(is_leaf, children) {
			this.is_leaf = is_leaf;
			this.children = children;
		}
		static default() {
			return new _CharTrieNode(false, /* @__PURE__ */ new Map());
		}
	};
	var CharTrie = class {
		constructor() {
			this.root = CharTrieNode.default();
		}
		extend(texts) {
			for (const text of texts) this.push(text);
		}
		push(text) {
			let node = this.root;
			for (const ch of text) {
				let child = node.children.get(ch);
				if (child === void 0) {
					child = CharTrieNode.default();
					node.children.set(ch, child);
				}
				node = child;
			}
			node.is_leaf = true;
		}
		*common_prefix_search(chars, start = 0) {
			let node = this.root;
			if (node === void 0) return;
			let prefix = "";
			for (let i = start; i < chars.length; ++i) {
				const ch = chars[i];
				prefix += ch;
				node = node.children.get(ch);
				if (node === void 0) return;
				if (node.is_leaf) yield prefix;
			}
		}
	};
	var CharTrie_default = CharTrie;
	var TokenLatticeNode = class _TokenLatticeNode {
		constructor(token_id, node_id, pos, length, score) {
			this.token_id = token_id;
			this.node_id = node_id;
			this.pos = pos;
			this.length = length;
			this.score = score;
			this.prev = null;
			this.backtrace_score = 0;
		}
		clone() {
			const n = new _TokenLatticeNode(this.token_id, this.node_id, this.pos, this.length, this.score);
			n.prev = this.prev;
			n.backtrace_score = this.backtrace_score;
			return n;
		}
	};
	var TokenLattice = class {
		constructor(sentence, bos_token_id, eos_token_id) {
			this.chars = Array.from(sentence);
			this.len = this.chars.length;
			this.bos_token_id = bos_token_id;
			this.eos_token_id = eos_token_id;
			this.nodes = [];
			this.begin_nodes = Array.from({ length: this.len + 1 }, () => []);
			this.end_nodes = Array.from({ length: this.len + 1 }, () => []);
			const bos = new TokenLatticeNode(this.bos_token_id ?? 0, 0, 0, 0, 0);
			const eos = new TokenLatticeNode(this.eos_token_id ?? 0, 1, this.len, 0, 0);
			this.nodes.push(bos.clone());
			this.nodes.push(eos.clone());
			this.begin_nodes[this.len].push(eos);
			this.end_nodes[0].push(bos);
		}
		insert(pos, length, score, token_id) {
			const node_id = this.nodes.length;
			const node = new TokenLatticeNode(token_id, node_id, pos, length, score);
			this.begin_nodes[pos].push(node);
			this.end_nodes[pos + length].push(node);
			this.nodes.push(node);
		}
		viterbi() {
			const len2 = this.len;
			let pos = 0;
			while (pos <= len2) {
				if (this.begin_nodes[pos].length == 0) return [];
				for (let rnode of this.begin_nodes[pos]) {
					rnode.prev = null;
					let best_score = 0;
					let best_node = null;
					for (let lnode of this.end_nodes[pos]) {
						const score = lnode.backtrace_score + rnode.score;
						if (best_node === null || score > best_score) {
							best_node = lnode.clone();
							best_score = score;
						}
					}
					if (best_node !== null) {
						rnode.prev = best_node;
						rnode.backtrace_score = best_score;
					} else return [];
				}
				++pos;
			}
			const results = [];
			const prev = this.begin_nodes[len2][0].prev;
			if (prev === null) return [];
			let node = prev.clone();
			while (node.prev !== null) {
				results.push(node.clone());
				node = node.clone().prev.clone();
			}
			results.reverse();
			return results;
		}
		piece(node) {
			return this.chars.slice(node.pos, node.pos + node.length).join("");
		}
		tokens() {
			return this.viterbi().map((x) => this.piece(x));
		}
		token_ids() {
			return this.viterbi().map((x) => x.token_id);
		}
	};
	var TokenLattice_default = TokenLattice;
	function min(arr) {
		if (arr.length === 0) throw new Error("Array must not be empty");
		let min_value = arr[0];
		let index_of_min = 0;
		for (let i = 1; i < arr.length; ++i) if (arr[i] < min_value) {
			min_value = arr[i];
			index_of_min = i;
		}
		return [min_value, index_of_min];
	}
	var Unigram = class extends TokenizerModel_default {
		constructor(config, eos_token) {
			super(config);
			const vocab_size = config.vocab.length;
			this.vocab = new Array(vocab_size);
			this.scores = new Array(vocab_size);
			for (let i = 0; i < vocab_size; ++i) [this.vocab[i], this.scores[i]] = config.vocab[i];
			this.unk_token_id = config.unk_id;
			this.unk_token = this.vocab[config.unk_id];
			this.tokens_to_ids = new Map(this.vocab.map((x, i) => [x, i]));
			this.bos_token = " ";
			this.bos_token_id = this.tokens_to_ids.get(this.bos_token);
			this.eos_token = eos_token;
			this.eos_token_id = this.tokens_to_ids.get(this.eos_token);
			this.unk_token = this.vocab[this.unk_token_id];
			this.min_score = min(this.scores)[0];
			this.unk_score = this.min_score - 10;
			this.scores[this.unk_token_id] = this.unk_score;
			this.trie = new CharTrie_default();
			this.trie.extend(this.vocab);
			this.fuse_unk = true;
		}
		populate_nodes(lattice) {
			const chars = lattice.chars;
			const mblen = 1;
			let begin_pos = 0;
			while (begin_pos < chars.length) {
				let has_single_node = false;
				const prefixed_tokens = this.trie.common_prefix_search(chars, begin_pos);
				for (const token of prefixed_tokens) {
					const token_id = this.tokens_to_ids.get(token);
					const token_score = this.scores[token_id];
					const n = len(token);
					lattice.insert(begin_pos, n, token_score, token_id);
					if (!has_single_node && n === mblen) has_single_node = true;
				}
				if (!has_single_node) lattice.insert(begin_pos, mblen, this.unk_score, this.unk_token_id);
				begin_pos += mblen;
			}
		}
		tokenize(normalized) {
			const lattice = new TokenLattice_default(normalized, this.bos_token_id, this.eos_token_id);
			this.populate_nodes(lattice);
			return lattice.tokens();
		}
		encode(tokens) {
			const to_return = [];
			for (const token of tokens) {
				const tokenized = this.tokenize(token);
				to_return.push(...tokenized);
			}
			return to_return;
		}
	};
	var Unigram_default = Unigram;
	var PriorityQueue = class {
		constructor(comparator = (a, b) => a > b, max_size = Infinity) {
			this._heap = [];
			this._comparator = comparator;
			this._max_size = max_size;
		}
		get size() {
			return this._heap.length;
		}
		is_empty() {
			return this.size === 0;
		}
		peek() {
			return this._heap[0];
		}
		push(...values) {
			return this.extend(values);
		}
		extend(values) {
			for (const value of values) if (this.size < this._max_size) {
				this._heap.push(value);
				this._sift_up();
			} else {
				const smallest = this._smallest();
				if (this._comparator(value, this._heap[smallest])) {
					this._heap[smallest] = value;
					this._sift_up_from(smallest);
				}
			}
			return this.size;
		}
		pop() {
			const popped_value = this.peek();
			const bottom = this.size - 1;
			if (bottom > 0) this._swap(0, bottom);
			this._heap.pop();
			this._sift_down();
			return popped_value;
		}
		replace(value) {
			const replaced_value = this.peek();
			this._heap[0] = value;
			this._sift_down();
			return replaced_value;
		}
		_parent(i) {
			return (i + 1 >>> 1) - 1;
		}
		_left(i) {
			return (i << 1) + 1;
		}
		_right(i) {
			return i + 1 << 1;
		}
		_greater(i, j) {
			return this._comparator(this._heap[i], this._heap[j]);
		}
		_swap(i, j) {
			const temp = this._heap[i];
			this._heap[i] = this._heap[j];
			this._heap[j] = temp;
		}
		_sift_up() {
			this._sift_up_from(this.size - 1);
		}
		_sift_up_from(node) {
			while (node > 0 && this._greater(node, this._parent(node))) {
				this._swap(node, this._parent(node));
				node = this._parent(node);
			}
		}
		_sift_down() {
			let node = 0;
			while (this._left(node) < this.size && this._greater(this._left(node), node) || this._right(node) < this.size && this._greater(this._right(node), node)) {
				const max_child = this._right(node) < this.size && this._greater(this._right(node), this._left(node)) ? this._right(node) : this._left(node);
				this._swap(node, max_child);
				node = max_child;
			}
		}
		_smallest() {
			return 2 ** Math.floor(Math.log2(this.size)) - 1;
		}
	};
	var PriorityQueue_default = PriorityQueue;
	var LRUCache = class {
		constructor(capacity) {
			this.capacity = capacity;
			this.cache = /* @__PURE__ */ new Map();
		}
		get(key) {
			if (!this.cache.has(key)) return void 0;
			const value = this.cache.get(key);
			this.cache.delete(key);
			this.cache.set(key, value);
			return value;
		}
		put(key, value) {
			if (this.cache.has(key)) this.cache.delete(key);
			this.cache.set(key, value);
			if (this.cache.size > this.capacity) this.cache.delete(this.cache.keys().next().value);
		}
		clear() {
			this.cache.clear();
		}
	};
	var LRUCache_default = LRUCache;
	var BPE = class extends TokenizerModel_default {
		constructor(config) {
			super(config);
			this.tokens_to_ids = object_to_map(config.vocab);
			this.unk_token_id = this.tokens_to_ids.get(config.unk_token);
			this.unk_token = config.unk_token;
			this.vocab = new Array(this.tokens_to_ids.size);
			for (const [key, value] of this.tokens_to_ids) this.vocab[value] = key;
			this.merges = Array.isArray(config.merges[0]) ? config.merges : config.merges.map((x) => x.split(" ", 2));
			this.bpe_ranks = new Map(this.merges.map((x, i) => [JSON.stringify(x), i]));
			this.end_of_word_suffix = config.end_of_word_suffix;
			this.continuing_subword_suffix = config.continuing_subword_suffix ?? null;
			this.byte_fallback = this.config.byte_fallback ?? false;
			if (this.byte_fallback) this.text_encoder = new TextEncoder();
			this.ignore_merges = this.config.ignore_merges ?? false;
			this.max_length_to_cache = 256;
			this.cache_capacity = 1e4;
			this.cache = new LRUCache_default(this.cache_capacity);
		}
		clear_cache() {
			this.cache.clear();
		}
		bpe(token) {
			if (token.length === 0) return [];
			const cached = this.cache.get(token);
			if (cached !== void 0) return cached;
			const word = Array.from(token);
			if (this.end_of_word_suffix) word[word.length - 1] += this.end_of_word_suffix;
			let result = [];
			if (word.length > 1) {
				const queue = new PriorityQueue_default((a, b) => a.score < b.score);
				let starting_node = {
					token: word[0],
					bias: 0,
					prev: null,
					next: null
				};
				let previous_node = starting_node;
				for (let i = 1; i < word.length; ++i) {
					const current_node = {
						bias: i / word.length,
						token: word[i],
						prev: previous_node,
						next: null
					};
					previous_node.next = current_node;
					this.add_node(queue, previous_node);
					previous_node = current_node;
				}
				while (!queue.is_empty()) {
					const node = queue.pop();
					if (node.deleted || !node.next || node.next.deleted) continue;
					node.deleted = true;
					node.next.deleted = true;
					if (node.prev) {
						const new_previous_node = { ...node.prev };
						node.prev.deleted = true;
						node.prev = new_previous_node;
						if (new_previous_node.prev) new_previous_node.prev.next = new_previous_node;
						else starting_node = new_previous_node;
					}
					const merged = {
						token: node.token + node.next.token,
						bias: node.bias,
						prev: node.prev,
						next: node.next.next
					};
					if (merged.prev) {
						merged.prev.next = merged;
						this.add_node(queue, merged.prev);
					} else starting_node = merged;
					if (merged.next) {
						merged.next.prev = merged;
						this.add_node(queue, merged);
					}
				}
				for (let current_node = starting_node; current_node !== null; current_node = current_node.next) result.push(current_node.token);
			} else result = word;
			if (this.continuing_subword_suffix) for (let i = 0; i < result.length - 1; ++i) result[i] += this.continuing_subword_suffix;
			if (token.length < this.max_length_to_cache) this.cache.put(token, result);
			return result;
		}
		add_node(queue, node) {
			const rank = this.bpe_ranks.get(JSON.stringify([node.token, node.next.token]));
			if (rank !== void 0) {
				node.score = rank + node.bias;
				queue.push(node);
			}
		}
		encode(tokens) {
			const output_tokens = [];
			for (const token of tokens) {
				if (this.ignore_merges && this.tokens_to_ids.has(token)) {
					output_tokens.push(token);
					continue;
				}
				const bpe_token_list = this.bpe(token);
				for (const t of bpe_token_list) if (this.tokens_to_ids.has(t)) output_tokens.push(t);
				else if (this.byte_fallback) {
					const byte_tokens = Array.from(this.text_encoder.encode(t)).map((x) => `<0x${x.toString(16).toUpperCase().padStart(2, "0")}>`);
					if (byte_tokens.every((x) => this.tokens_to_ids.has(x))) output_tokens.push(...byte_tokens);
					else if (this.unk_token != null) output_tokens.push(this.unk_token);
				} else if (this.unk_token != null) output_tokens.push(this.unk_token);
			}
			return output_tokens;
		}
	};
	var BPE_default = BPE;
	var Legacy = class extends TokenizerModel_default {
		constructor(config, more_config) {
			super(config);
			const vocab = config.vocab;
			this.tokens_to_ids = object_to_map(more_config.target_lang ? vocab[more_config.target_lang] : vocab);
			this.bos_token = more_config.bos_token;
			this.bos_token_id = this.tokens_to_ids.get(this.bos_token);
			this.eos_token = more_config.eos_token;
			this.eos_token_id = this.tokens_to_ids.get(this.eos_token);
			this.pad_token = more_config.pad_token;
			this.pad_token_id = this.tokens_to_ids.get(this.pad_token);
			this.unk_token = more_config.unk_token;
			this.unk_token_id = this.tokens_to_ids.get(this.unk_token);
			this.vocab = new Array(this.tokens_to_ids.size);
			for (const [key, value] of this.tokens_to_ids) this.vocab[value] = key;
		}
		encode(tokens) {
			return tokens;
		}
	};
	var Legacy_default = Legacy;
	function create_tokenizer_model(model_config, config) {
		switch (model_config.type) {
			case "WordPiece": return new WordPiece_default(model_config);
			case "Unigram": return new Unigram_default(model_config, config.eos_token);
			case "BPE": return new BPE_default(model_config);
			default:
				if (model_config.vocab) if (Array.isArray(model_config.vocab)) return new Unigram_default(model_config, config.eos_token);
				else if (Object.hasOwn(model_config, "continuing_subword_prefix") && Object.hasOwn(model_config, "unk_token")) if (Object.hasOwn(model_config, "merges")) return new BPE_default(model_config);
				else return new WordPiece_default(model_config);
				else return new Legacy_default(model_config, {
					target_lang: config.target_lang,
					bos_token: config.bos_token,
					eos_token: config.eos_token,
					pad_token: config.pad_token,
					unk_token: config.unk_token
				});
				throw new Error(`Unknown TokenizerModel type: ${model_config?.type}`);
		}
	}
	var create_tokenizer_model_default = create_tokenizer_model;
	var PostProcessor = class extends Callable_default {
		constructor(config) {
			super();
			this.config = config;
		}
		_call(tokens, ...args) {
			return this.post_process(tokens, ...args);
		}
	};
	var PostProcessor_default = PostProcessor;
	var TemplateProcessing = class extends PostProcessor_default {
		post_process(tokens, tokens_pair = null, add_special_tokens = true) {
			const type = tokens_pair === null ? this.config.single : this.config.pair;
			let processed_tokens = [];
			let types = [];
			for (const item of type) if ("SpecialToken" in item) {
				if (add_special_tokens) {
					processed_tokens.push(item.SpecialToken.id);
					types.push(item.SpecialToken.type_id);
				}
			} else if ("Sequence" in item) {
				if (item.Sequence.id === "A") {
					processed_tokens = merge_arrays(processed_tokens, tokens);
					types = merge_arrays(types, new Array(tokens.length).fill(item.Sequence.type_id));
				} else if (item.Sequence.id === "B") {
					processed_tokens = merge_arrays(processed_tokens, tokens_pair);
					types = merge_arrays(types, new Array(tokens_pair.length).fill(item.Sequence.type_id));
				}
			}
			return {
				tokens: processed_tokens,
				token_type_ids: types
			};
		}
	};
	var TemplateProcessing_default = TemplateProcessing;
	var ByteLevel2 = class extends PostProcessor_default {
		post_process(tokens, tokens_pair = null) {
			return {
				tokens,
				tokens_pair
			};
		}
	};
	var ByteLevel_default2 = ByteLevel2;
	var BertProcessing = class extends PostProcessor_default {
		constructor(config) {
			super(config);
			this.sep = config.sep;
			this.cls = config.cls;
		}
		post_process(tokens, tokens_pair = null, add_special_tokens = true) {
			if (add_special_tokens) tokens = merge_arrays([this.cls[0]], tokens, [this.sep[0]]);
			let token_type_ids = new Array(tokens.length).fill(0);
			if (tokens_pair) {
				const middle = [];
				const after = add_special_tokens ? [this.sep[0]] : [];
				tokens = merge_arrays(tokens, middle, tokens_pair, after);
				token_type_ids = merge_arrays(token_type_ids, new Array(tokens_pair.length + middle.length + after.length).fill(1));
			}
			return {
				tokens,
				token_type_ids
			};
		}
	};
	var BertProcessing_default = BertProcessing;
	var RobertaProcessing = class extends PostProcessor_default {
		constructor(config) {
			super(config);
			this.sep = config.sep;
			this.cls = config.cls;
		}
		post_process(tokens, tokens_pair, add_special_tokens = true) {
			if (add_special_tokens) tokens = merge_arrays([this.cls[0]], tokens, [this.sep[0]]);
			let token_type_ids = new Array(tokens.length).fill(0);
			if (tokens_pair) {
				const middle = add_special_tokens ? [this.sep[0]] : [];
				const after = add_special_tokens ? [this.sep[0]] : [];
				tokens = merge_arrays(tokens, middle, tokens_pair, after);
				token_type_ids = merge_arrays(token_type_ids, new Array(tokens_pair.length + middle.length + after.length).fill(1));
			}
			return {
				tokens,
				token_type_ids
			};
		}
	};
	var RobertaProcessing_default = RobertaProcessing;
	var Sequence3 = class extends PostProcessor_default {
		constructor(config) {
			super(config);
			this.processors = (config.processors ?? []).map((x) => create_post_processor_default(x));
		}
		post_process(tokens, tokens_pair = null, add_special_tokens = true) {
			let processed_tokens = {
				tokens,
				tokens_pair
			};
			for (const processor of this.processors) processed_tokens = processor.post_process(processed_tokens.tokens, processed_tokens.tokens_pair, add_special_tokens);
			return processed_tokens;
		}
	};
	var Sequence_default3 = Sequence3;
	function create_post_processor(config) {
		if (config === null) return null;
		switch (config.type) {
			case "TemplateProcessing": return new TemplateProcessing_default(config);
			case "ByteLevel": return new ByteLevel_default2(config);
			case "BertProcessing": return new BertProcessing_default(config);
			case "RobertaProcessing": return new RobertaProcessing_default(config);
			case "Sequence": return new Sequence_default3(config);
			default: throw new Error(`Unknown PostProcessor type: ${config.type}`);
		}
	}
	var create_post_processor_default = create_post_processor;
	var Decoder = class extends Callable_default {
		constructor(config) {
			super();
			this.config = config;
			this.added_tokens = [];
			this.end_of_word_suffix = null;
			this.trim_offsets = "trim_offsets" in config ? config.trim_offsets : false;
		}
		_call(tokens) {
			return this.decode(tokens);
		}
		decode(tokens) {
			return this.decode_chain(tokens).join("");
		}
	};
	var Decoder_default = Decoder;
	var ByteLevel3 = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.byte_decoder = UNICODE_TO_BYTES;
			this.text_decoder = new TextDecoder("utf-8", {
				fatal: false,
				ignoreBOM: true
			});
			this.end_of_word_suffix = null;
		}
		convert_tokens_to_string(tokens) {
			const text = tokens.join("");
			const byte_array = new Uint8Array([...text].map((c) => this.byte_decoder[c]));
			return this.text_decoder.decode(byte_array);
		}
		decode_chain(tokens) {
			const sub_texts = [];
			let current_sub_text = [];
			for (const token of tokens) if (this.added_tokens.find((x) => x.content === token) !== void 0) {
				if (current_sub_text.length > 0) {
					sub_texts.push(this.convert_tokens_to_string(current_sub_text));
					current_sub_text = [];
				}
				sub_texts.push(token);
			} else current_sub_text.push(token);
			if (current_sub_text.length > 0) sub_texts.push(this.convert_tokens_to_string(current_sub_text));
			return sub_texts;
		}
	};
	var ByteLevel_default3 = ByteLevel3;
	var WordPiece = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.cleanup = config.cleanup;
		}
		decode_chain(tokens) {
			return tokens.map((token, i) => {
				if (i !== 0) {
					const prefix = this.config.prefix;
					if (prefix && token.startsWith(prefix)) token = token.replace(prefix, "");
					else token = " " + token;
				}
				if (this.cleanup) token = clean_up_tokenization(token);
				return token;
			});
		}
	};
	var WordPiece_default2 = WordPiece;
	var Metaspace2 = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.replacement = config.replacement ?? "▁";
		}
		decode_chain(tokens) {
			const result = [];
			for (let i = 0; i < tokens.length; ++i) {
				let normalized = tokens[i].replaceAll(this.replacement, " ");
				if (i == 0 && normalized.startsWith(" ")) normalized = normalized.substring(1);
				result.push(normalized);
			}
			return result;
		}
	};
	var Metaspace_default2 = Metaspace2;
	var BPE2 = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.suffix = config.suffix ?? "";
		}
		decode_chain(tokens) {
			return tokens.map((token, i) => {
				return token.replaceAll(this.suffix, i === tokens.length - 1 ? "" : " ");
			});
		}
	};
	var BPE_default2 = BPE2;
	var CTC = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.pad_token = config.pad_token ?? "";
			this.word_delimiter_token = config.word_delimiter_token ?? "";
			this.cleanup = config.cleanup;
		}
		convert_tokens_to_string(tokens) {
			if (tokens.length === 0) return "";
			const grouped_tokens = [tokens[0]];
			for (let i = 1; i < tokens.length; ++i) if (tokens[i] !== grouped_tokens.at(-1)) grouped_tokens.push(tokens[i]);
			let text = grouped_tokens.filter((token) => token !== this.pad_token).join("");
			if (this.cleanup) text = clean_up_tokenization(text).replaceAll(this.word_delimiter_token, " ").trim();
			return text;
		}
		decode_chain(tokens) {
			return [this.convert_tokens_to_string(tokens)];
		}
	};
	var CTC_default = CTC;
	var Sequence4 = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.decoders = (config.decoders ?? []).map((x) => create_decoder_default(x));
		}
		decode_chain(tokens) {
			return this.decoders.reduce((toks, decoder) => {
				return decoder.decode_chain(toks);
			}, tokens);
		}
	};
	var Sequence_default4 = Sequence4;
	var Replace3 = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.pattern = create_pattern(this.config.pattern);
		}
		decode_chain(tokens) {
			const content = this.config.content ?? "";
			const pattern = this.pattern;
			return pattern === null ? tokens : tokens.map((token) => token.replaceAll(pattern, content));
		}
	};
	var Replace_default3 = Replace3;
	var Fuse = class extends Decoder_default {
		decode_chain(tokens) {
			return [tokens.join("")];
		}
	};
	var Fuse_default = Fuse;
	var Strip2 = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.content = config.content ?? "";
			this.start = config.start ?? 0;
			this.stop = config.stop ?? 0;
		}
		decode_chain(tokens) {
			return tokens.map((token) => {
				let start_cut = 0;
				for (let i = 0; i < this.start; ++i) if (token[i] === this.content) {
					start_cut = i + 1;
					continue;
				} else break;
				let stop_cut = token.length;
				for (let i = 0; i < this.stop; ++i) {
					const index = token.length - i - 1;
					if (token[index] === this.content) {
						stop_cut = index;
						continue;
					} else break;
				}
				return token.slice(start_cut, stop_cut);
			});
		}
	};
	var Strip_default2 = Strip2;
	var ByteFallback = class extends Decoder_default {
		constructor(config) {
			super(config);
			this.text_decoder = new TextDecoder();
		}
		decode_chain(tokens) {
			const new_tokens = [];
			let previous_byte_tokens = [];
			for (const token of tokens) {
				let bytes = null;
				if (token.length === 6 && token.startsWith("<0x") && token.endsWith(">")) {
					const byte = parseInt(token.slice(3, 5), 16);
					if (!isNaN(byte)) bytes = byte;
				}
				if (bytes !== null) previous_byte_tokens.push(bytes);
				else {
					if (previous_byte_tokens.length > 0) {
						const string = this.text_decoder.decode(Uint8Array.from(previous_byte_tokens));
						new_tokens.push(string);
						previous_byte_tokens = [];
					}
					new_tokens.push(token);
				}
			}
			if (previous_byte_tokens.length > 0) {
				const string = this.text_decoder.decode(Uint8Array.from(previous_byte_tokens));
				new_tokens.push(string);
				previous_byte_tokens = [];
			}
			return new_tokens;
		}
	};
	var ByteFallback_default = ByteFallback;
	function create_decoder(config) {
		if (config === null) return null;
		switch (config.type) {
			case "ByteLevel": return new ByteLevel_default3(config);
			case "WordPiece": return new WordPiece_default2(config);
			case "Metaspace": return new Metaspace_default2(config);
			case "BPEDecoder": return new BPE_default2(config);
			case "CTC": return new CTC_default(config);
			case "Sequence": return new Sequence_default4(config);
			case "Replace": return new Replace_default3(config);
			case "Fuse": return new Fuse_default(config);
			case "Strip": return new Strip_default2(config);
			case "ByteFallback": return new ByteFallback_default(config);
			default: throw new Error(`Unknown Decoder type: ${config.type}`);
		}
	}
	var create_decoder_default = create_decoder;
	var Tokenizer = class {
		constructor(tokenizer, config) {
			const tokenizer_error = validate_object(tokenizer, "Tokenizer", [
				"model",
				"decoder",
				"post_processor",
				"pre_tokenizer",
				"normalizer"
			]);
			if (tokenizer_error) throw new Error(tokenizer_error);
			const config_error = validate_object(config, "Config");
			if (config_error) throw new Error(config_error);
			this.tokenizer = tokenizer;
			this.config = config;
			this.normalizer = create_normalizer_default(this.tokenizer.normalizer);
			this.pre_tokenizer = create_pre_tokenizer_default(this.tokenizer.pre_tokenizer);
			this.model = create_tokenizer_model_default(this.tokenizer.model, this.config);
			this.post_processor = create_post_processor_default(this.tokenizer.post_processor);
			this.decoder = create_decoder_default(this.tokenizer.decoder);
			this.special_tokens = [];
			this.all_special_ids = [];
			this.added_tokens = [];
			const unnormalized_contents = [];
			const normalized_contents = [];
			this.added_tokens_map = /* @__PURE__ */ new Map();
			for (const added_token of this.tokenizer.added_tokens) {
				const token = new AddedToken_default(added_token);
				this.added_tokens.push(token);
				this.model.tokens_to_ids.set(token.content, token.id);
				this.model.vocab[token.id] = token.content;
				if (token.special) {
					this.special_tokens.push(token.content);
					this.all_special_ids.push(token.id);
				}
				this.added_tokens_map.set(token.content, token);
				if (token.normalized && this.normalizer !== null) {
					const normalized_content = this.normalizer(token.content);
					normalized_contents.push(normalized_content);
					this.added_tokens_map.set(normalized_content, token);
				} else unnormalized_contents.push(token.content);
			}
			(this.config.additional_special_tokens ?? []).forEach((token) => {
				if (!this.special_tokens.includes(token)) this.special_tokens.push(token);
			});
			if (this.decoder) {
				this.decoder.added_tokens = this.added_tokens;
				this.decoder.end_of_word_suffix = this.model.end_of_word_suffix;
			}
			this.splitter_unnormalized = new DictionarySplitter_default(unnormalized_contents);
			this.splitter_normalized = new DictionarySplitter_default(normalized_contents);
			this.remove_space = this.config.remove_space;
			this.clean_up_tokenization_spaces = this.config.clean_up_tokenization_spaces ?? true;
			this.do_lowercase_and_remove_accent = this.config.do_lowercase_and_remove_accent ?? false;
		}
		encode(text, { text_pair = null, add_special_tokens = true, return_token_type_ids = null } = {}) {
			const { tokens, token_type_ids } = this.tokenize_helper(text, {
				text_pair,
				add_special_tokens
			});
			const input_ids = tokens.map((t) => this.added_tokens_map.get(t)?.id ?? this.model.tokens_to_ids.get(t) ?? this.model.unk_token_id);
			const result = {
				ids: input_ids,
				tokens,
				attention_mask: new Array(input_ids.length).fill(1)
			};
			if (return_token_type_ids && token_type_ids) result.token_type_ids = token_type_ids;
			return result;
		}
		decode(token_ids, options = {}) {
			if (!Array.isArray(token_ids) || token_ids.length === 0 || !is_integral_number(token_ids[0])) throw Error("token_ids must be a non-empty array of integers.");
			let tokens = token_ids.map((i) => this.model.vocab[Number(i)] ?? this.model.unk_token);
			if (options.skip_special_tokens) tokens = tokens.filter((x) => !this.special_tokens.includes(x));
			let decoded = this.decoder ? this.decoder(tokens) : tokens.join(" ");
			if (this.decoder && this.decoder.end_of_word_suffix) {
				decoded = decoded.replaceAll(this.decoder.end_of_word_suffix, " ");
				if (options.skip_special_tokens) decoded = decoded.trim();
			}
			if (options.clean_up_tokenization_spaces ?? this.clean_up_tokenization_spaces) decoded = clean_up_tokenization(decoded);
			return decoded;
		}
		tokenize(text, { text_pair = null, add_special_tokens = false } = {}) {
			return this.tokenize_helper(text, {
				text_pair,
				add_special_tokens
			}).tokens;
		}
		encode_text(text) {
			if (text === null) return null;
			const sections = this.splitter_unnormalized.split(text);
			sections.forEach((section, i) => {
				const added_token = this.added_tokens_map.get(section);
				if (added_token) {
					if (added_token.lstrip && i > 0) sections[i - 1] = sections[i - 1].trimEnd();
					if (added_token.rstrip && i < sections.length - 1) sections[i + 1] = sections[i + 1].trimStart();
				}
			});
			return sections.flatMap((processed_text, section_index) => {
				if (processed_text.length === 0) return [];
				if (this.added_tokens_map.has(processed_text)) return [processed_text];
				if (this.remove_space === true) processed_text = processed_text.trim().split(/\s+/).join(" ");
				if (this.do_lowercase_and_remove_accent) processed_text = lowercase_and_remove_accents(processed_text);
				if (this.normalizer !== null) processed_text = this.normalizer(processed_text);
				if (processed_text.length === 0) return [];
				const subsections = this.splitter_normalized.split(processed_text);
				subsections.forEach((subsection, j) => {
					const added_token = this.added_tokens_map.get(subsection);
					if (added_token) {
						if (added_token.lstrip && j > 0) subsections[j - 1] = subsections[j - 1].trimEnd();
						if (added_token.rstrip && j < subsections.length - 1) subsections[j + 1] = subsections[j + 1].trimStart();
					}
				});
				return subsections.flatMap((subsection) => {
					if (subsection.length === 0) return [];
					if (this.added_tokens_map.has(subsection)) return [subsection];
					const section_tokens = this.pre_tokenizer !== null ? this.pre_tokenizer(subsection, { section_index }) : [subsection];
					return this.model(section_tokens);
				});
			});
		}
		tokenize_helper(text, { text_pair = null, add_special_tokens = true }) {
			const tokens1 = this.encode_text(text);
			const tokens2 = this.encode_text(text_pair || null);
			return this.post_processor ? this.post_processor(tokens1, tokens2, add_special_tokens) : { tokens: merge_arrays(tokens1 ?? [], tokens2 ?? []) };
		}
		token_to_id(token) {
			return this.model.tokens_to_ids.get(token);
		}
		id_to_token(id) {
			return this.model.vocab[id];
		}
		get_added_tokens_decoder() {
			const decoder = /* @__PURE__ */ new Map();
			for (const token of this.added_tokens) decoder.set(token.id, token);
			return decoder;
		}
		get_vocab(with_added_tokens = true) {
			const vocab = /* @__PURE__ */ new Map();
			for (let i = 0; i < this.model.vocab.length; ++i) {
				const token = this.model.vocab[i];
				if (with_added_tokens || !this.added_tokens_map.has(token)) vocab.set(token, i);
			}
			return vocab;
		}
	};
	var Tokenizer_default = Tokenizer;
	function meanPoolTokens(data, tokens, dimensions) {
		if (!tokens || !dimensions || data.length !== tokens * dimensions) throw new Error("Invalid search embedding shape");
		const vector = Array(dimensions).fill(0);
		for (let token = 0; token < tokens; token += 1) for (let dim = 0; dim < dimensions; dim += 1) vector[dim] += data[token * dimensions + dim] / tokens;
		return vector;
	}
	async function createAgentEncoder(loadAsset$1) {
		Y.wasm.numThreads = 1;
		Y.wasm.proxy = false;
		const [tokenizerBytes, configBytes, modelBytes] = await Promise.all([
			loadAsset$1("tokenizer.json"),
			loadAsset$1("tokenizer_config.json"),
			loadAsset$1("onnx/model_quantized.onnx")
		]);
		const decode = (bytes) => JSON.parse(new TextDecoder().decode(bytes));
		const tokenizer = new Tokenizer_default(decode(tokenizerBytes), decode(configBytes));
		const session = await rs.create(modelBytes, { executionProviders: ["wasm"] });
		return {
			async embed(text) {
				const encoded = tokenizer.encode(text, { add_special_tokens: true });
				const ids = encoded.ids.length > 128 ? [...encoded.ids.slice(0, 127), encoded.ids.at(-1)] : encoded.ids;
				const dims = [1, ids.length];
				const feeds = {
					input_ids: new de("int64", BigInt64Array.from(ids, BigInt), dims),
					attention_mask: new de("int64", new BigInt64Array(ids.length).fill(1n), dims)
				};
				if (session.inputNames.includes("token_type_ids")) feeds.token_type_ids = new de("int64", new BigInt64Array(ids.length), dims);
				let output = {};
				try {
					output = await session.run(feeds);
					const hidden = output.last_hidden_state;
					if (!hidden || hidden.type !== "float32" || hidden.dims.length !== 3 || hidden.dims[0] !== 1) throw new Error("Invalid search encoder output");
					return meanPoolTokens(hidden.data, hidden.dims[1], hidden.dims[2]);
				} finally {
					for (const tensor of Object.values(output)) tensor.dispose();
					for (const tensor of Object.values(feeds)) tensor.dispose();
				}
			},
			dispose: () => session.release()
		};
	}
	const MIN_AGENT_SIMILARITY = .29;
	const AGENT_SEARCH_MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";
	const AGENT_SEARCH_REVISION = "2c4055b12046f11709e9df2c122e59ffbdc2f900";
	function cosineSimilarity(left, right) {
		if (!left.length || left.length !== right.length) return 0;
		let dot = 0;
		let leftNorm = 0;
		let rightNorm = 0;
		for (let index = 0; index < left.length; index += 1) {
			dot += left[index] * right[index];
			leftNorm += left[index] ** 2;
			rightNorm += right[index] ** 2;
		}
		return leftNorm && rightNorm ? dot / Math.sqrt(leftNorm * rightNorm) : 0;
	}
	function relevantAgentMatches(matches) {
		const best = Math.max(0, ...matches.map(({ score }) => Number.isFinite(score) ? score : 0));
		const threshold = Math.max(MIN_AGENT_SIMILARITY, best * .75);
		return matches.filter(({ score }) => Number.isFinite(score) && score >= threshold).sort((left, right) => right.score - left.score);
	}
	Y.wasm.wasmPaths = {
		wasm: ort_wasm_simd_threaded_default,
		mjs: ort_wasm_simd_threaded_default$1
	};
	let extractor = null;
	let latestId = 0;
	let pending = null;
	let running = false;
	const vectors = /* @__PURE__ */ new Map();
	const MAX_CACHED_TEXTS = 512;
	function send(message) {
		self.postMessage(message);
	}
	async function embed(text) {
		const cached = vectors.get(text);
		if (cached) return cached;
		const vector = await extractor.embed(text);
		if (vectors.size >= MAX_CACHED_TEXTS) vectors.delete(vectors.keys().next().value);
		vectors.set(text, vector);
		return vector;
	}
	async function loadAsset(file) {
		const url = `https://huggingface.co/${AGENT_SEARCH_MODEL}/resolve/${AGENT_SEARCH_REVISION}/${file}`;
		let cache;
		try {
			cache = await caches.open("jarvis-terminal-search-v1");
			const cached = await cache.match(url);
			if (cached) return new Uint8Array(await cached.arrayBuffer());
		} catch {
			console.warn("Terminal search model cache is unavailable");
		}
		const response = await fetch(url, {
			credentials: "omit",
			referrerPolicy: "no-referrer"
		});
		if (!response.ok) throw new Error("Search model download failed");
		if (cache) try {
			await cache.put(url, response.clone());
		} catch {
			console.warn("Terminal search model could not be cached");
		}
		return new Uint8Array(await response.arrayBuffer());
	}
	async function drain() {
		if (running) return;
		running = true;
		try {
			while (pending) {
				const request = pending;
				pending = null;
				try {
					if (!extractor) {
						send({
							type: "loading",
							id: request.id
						});
						extractor = await createAgentEncoder(loadAsset);
					}
					if (request.id !== latestId) continue;
					send({
						type: "searching",
						id: request.id
					});
					const queryVector = await embed(request.query);
					const matches = [];
					for (const document$1 of request.documents) {
						let score = 0;
						for (const text of document$1.texts) {
							if (request.id !== latestId) break;
							score = Math.max(score, cosineSimilarity(queryVector, await embed(text)));
						}
						if (request.id !== latestId) break;
						matches.push({
							id: document$1.id,
							score
						});
					}
					if (request.id === latestId) send({
						type: "result",
						id: request.id,
						matches: relevantAgentMatches(matches)
					});
				} catch {
					send({
						type: "error",
						id: latestId
					});
					pending = null;
				}
			}
		} finally {
			running = false;
		}
	}
	self.onmessage = (event) => {
		latestId = event.data.id;
		pending = event.data.type === "search" ? event.data : null;
		drain();
	};
})();
