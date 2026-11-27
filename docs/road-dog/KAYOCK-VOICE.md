# Kayock Voice Integration Guide (Road Dog v1.3.0)

Road Dog speaks and listens through YOUR existing Kayock Voice services —
nothing is installed, launched, stopped or reconfigured on the speech side,
and there is NO fallback to paid speech services. If Kayock is unreachable,
Sam reports it honestly.

## Your services

| Role | Default address | Contract |
|---|---|---|
| TTS | `http://10.0.0.45:8768` | kayock-openai-speech-adapter: `POST /v1/audio/speech` `{model, input, voice, response_format, speed}` → audio; `GET /v1/voices` (or `/v1/models`) → voice ids; `GET /v1/health` |
| STT | `http://10.0.0.45:8769` | Faster-Whisper service: `POST /v1/audio/transcriptions` (multipart file + model/language) → `{"text": ...}` |

(Contracts verified against the Kayock-Voice repository; the adapter's voice
inventory is discovered LIVE — Kokoro ids like `am_adam`, optional Piper/RVC
specials — never hardcoded.)

## Configure (jarvis.toml)

```toml
[tts]
provider = "kayock"

[tts.kayock]
base_url = "http://10.0.0.45:8768"   # your adapter address
voice = "am_adam"                    # male voice for Sam (discovered ids also work)
model = "kokoro"
response_format = "wav"              # converted server-side; Road Dog needs no ffmpeg

[stt]
provider = "kayock"

[stt.kayock]
base_url = "http://10.0.0.45:8769"   # your Faster-Whisper service
model = "base.en"
language = "en"
```

Or from the Road Dog settings panel (Settings → Road Dog → Kayock Voice
diagnostics shows reachability + discovered voices once configured).

## What you get

- **Male voice for Sam** — default `am_adam`; any discovered Kokoro/Piper/RVC id.
- **Warm-up** — a short synthesis at pipeline start so the first reply is not
  cold (Kokoro lazily loads ONNX weights).
- **Latency management** — sentence-split chunked synthesis
  (`synthesize_sentences`) starts playback after the first sentence.
- **Push-to-talk + wake phrase** — unchanged pipeline machinery
  (`[trigger] push_to_talk_key`, optional wake phrase); Kayock feeds the same
  STT/TTS slots.
- **Microphone/speaker selection** — OS-level device selection stays with the
  audio backend (standard device compatibility, including Bluetooth outputs
  like a Google Mini on Ubuntu).
- **Feedback-loop prevention** — upstream echo guard remains in the chain.
- **Indicators** — listening/thinking/speaking states come from the existing
  pipeline events.
- **Connection diagnostics** — `GET /api/voice/kayock/status` (zero-spend
  probes: TTS health + voices, STT health, last errors).

## Ownership rules (unchanged)

Road Dog NEVER launches, stops, restarts or reconfigures the Kayock services,
never downloads models, never creates credentials (optional Bearer key is
supported if you put one on the local interface), and never routes to a paid
speech provider when Kayock fails.

## Verification performed here

Deterministic HTTP fixtures implement the REAL contracts (adapter + whisper
service) and the tests drive the PRODUCTION factories:
`tests/unit/road_dog/test_kayock_voice.py` — 10 tests: synthesis via
`build_tts_from_config` (voice, format, real HTTP body), voice discovery,
health, warm-up, honest failure without paid fallback, STT via
`build_stt_from_config` (`transcribe_pcm` + streaming `transcribe`),
health-404-means-up, honest unreachable, and the status route.
The user's private LAN services were not reachable from this sandbox — the
fixtures stand in for them 1:1; live playback on real hardware remains the
one step to verify on the target machine.
