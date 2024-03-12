# ↔️ Convert

This repository implements a simple React frontend that wraps [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm).

The frontend needs to be refined, but the functional parts are there.

## Why?

- I got tired of searching for online convert tools, that I know could just be a FFMPEG command away.
- Privacy, fully browser local
- No hassle, does not require installing a dedicated tool.

## Disclaimer

- Like also stated by ffmpeg.wasm, performance in WASM virtual machines are slower than the native thing.
  Use of this tool is primarily for one-offs or smaller jobs. If you regularly do heavy media conversion
  I recommend finding another way, e.g. installing FFMPEG natively and using its CLI, or a different GUI
  wrapper not using WASM.


## Libraries / Software used

- React
- shadcn/ui
  - Tailwind
- TypeScript
- Vite
- ffmpeg.wasm
