[22:01:45.483] Running build in Washington, D.C., USA (East) – iad1
[22:01:45.484] Build machine configuration: 2 cores, 8 GB
[22:01:45.500] Cloning github.com/G-regory/LocalSite (Branch: main, Commit: fd9a52d)
[22:01:45.507] Skipping build cache, deployment was triggered without cache.
[22:01:45.836] Cloning completed: 336.000ms
[22:01:46.195] Running "vercel build"
[22:01:46.597] Vercel CLI 46.1.1
[22:01:47.016] Installing dependencies...
[22:02:06.578] 
[22:02:06.584] added 565 packages in 19s
[22:02:06.584] 
[22:02:06.585] 165 packages are looking for funding
[22:02:06.585]   run `npm fund` for details
[22:02:06.837] Detected Next.js version: 15.3.3
[22:02:06.844] Running "npm run build"
[22:02:06.969] 
[22:02:06.970] > localsite@0.1.0 build
[22:02:06.970] > next build
[22:02:06.970] 
[22:02:08.103] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[22:02:08.104] This information is used to shape Next.js' roadmap and prioritize features.
[22:02:08.105] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[22:02:08.105] https://nextjs.org/telemetry
[22:02:08.105] 
[22:02:08.240]    ▲ Next.js 15.3.3
[22:02:08.240] 
[22:02:08.404]    Creating an optimized production build ...
[22:02:25.439] Failed to compile.
[22:02:25.439] 
[22:02:25.439] ./app/api/ask-ai-local/route.ts
[22:02:25.439] Error:   [31mx[0m Expected unicode escape
[22:02:25.439]     ,-[[36;1;4m/vercel/path0/app/api/ask-ai-local/route.ts[0m:43:1]
[22:02:25.439]  [2m40[0m |     const body = await req.json();
[22:02:25.439]  [2m41[0m |     const { prompt, model, html } = body;
[22:02:25.440]  [2m42[0m |     const userContent = html ? `Current HTML:\n\
[22:02:25.440]  [2m43[0m | ```html\
[22:02:25.440]     : [35;1m       ^[0m
[22:02:25.440]  [2m44[0m | ${html}\
[22:02:25.440]  [2m45[0m | ```\
[22:02:25.440]  [2m46[0m | \
[22:02:25.440]     `----
[22:02:25.440]   [31mx[0m Expected ':', got '<lexing error: Error { error: (1771..1771, ExpectedUnicodeEscape) }>'
[22:02:25.440]     ,-[[36;1;4m/vercel/path0/app/api/ask-ai-local/route.ts[0m:43:1]
[22:02:25.440]  [2m40[0m |     const body = await req.json();
[22:02:25.440]  [2m41[0m |     const { prompt, model, html } = body;
[22:02:25.440]  [2m42[0m |     const userContent = html ? `Current HTML:\n\
[22:02:25.440]  [2m43[0m | ```html\
[22:02:25.440]     : [35;1m   ^^^^^[0m
[22:02:25.440]  [2m44[0m | ${html}\
[22:02:25.440]  [2m45[0m | ```\
[22:02:25.440]  [2m46[0m | \
[22:02:25.440]     `----
[22:02:25.440] 
[22:02:25.440] Caused by:
[22:02:25.440]     Syntax Error
[22:02:25.440] 
[22:02:25.441] Import trace for requested module:
[22:02:25.441] ./app/api/ask-ai-local/route.ts
[22:02:25.441] 
[22:02:25.445] 
[22:02:25.445] > Build failed because of webpack errors
[22:02:25.690] Error: Command "npm run build" exited with 1