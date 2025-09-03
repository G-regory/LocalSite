[21:43:58.124] Running build in Washington, D.C., USA (East) – iad1
[21:43:58.130] Build machine configuration: 2 cores, 8 GB
[21:43:58.187] Cloning github.com/G-regory/LocalSite (Branch: main, Commit: 5a1d1b8)
[21:43:58.798] Cloning completed: 610.000ms
[21:44:02.758] Restored build cache from previous deployment (EcE6CLsuxvhP5EkNd2Mbusyy4Whz)
[21:44:03.396] Running "vercel build"
[21:44:03.809] Vercel CLI 46.1.1
[21:44:04.313] Installing dependencies...
[21:44:05.641] 
[21:44:05.642] up to date in 1s
[21:44:05.642] 
[21:44:05.643] 165 packages are looking for funding
[21:44:05.643]   run `npm fund` for details
[21:44:05.671] Detected Next.js version: 15.3.3
[21:44:05.676] Running "npm run build"
[21:44:05.787] 
[21:44:05.788] > localsite@0.1.0 build
[21:44:05.788] > next build
[21:44:05.788] 
[21:44:06.669]    ▲ Next.js 15.3.3
[21:44:06.670] 
[21:44:06.701]    Creating an optimized production build ...
[21:44:23.259] Failed to compile.
[21:44:23.260] 
[21:44:23.260] ./app/api/ask-ai-local/route.ts
[21:44:23.261] Error:   [31mx[0m Expected unicode escape
[21:44:23.261]     ,-[[36;1;4m/vercel/path0/app/api/ask-ai-local/route.ts[0m:43:1]
[21:44:23.261]  [2m40[0m |     const body = await req.json();
[21:44:23.261]  [2m41[0m |     const { prompt, model, html } = body;
[21:44:23.261]  [2m42[0m |     const userContent = html ? `Current HTML:\n\
[21:44:23.262]  [2m43[0m | ```html\
[21:44:23.262]     : [35;1m       ^[0m
[21:44:23.262]  [2m44[0m | ${html}\
[21:44:23.262]  [2m45[0m | ```\
[21:44:23.262]  [2m46[0m | \nUser request: ${prompt}` : prompt;
[21:44:23.263]     `----
[21:44:23.263]   [31mx[0m Expected ':', got '<lexing error: Error { error: (1771..1771, ExpectedUnicodeEscape) }>'
[21:44:23.263]     ,-[[36;1;4m/vercel/path0/app/api/ask-ai-local/route.ts[0m:43:1]
[21:44:23.263]  [2m40[0m |     const body = await req.json();
[21:44:23.263]  [2m41[0m |     const { prompt, model, html } = body;
[21:44:23.263]  [2m42[0m |     const userContent = html ? `Current HTML:\n\
[21:44:23.264]  [2m43[0m | ```html\
[21:44:23.264]     : [35;1m   ^^^^^[0m
[21:44:23.264]  [2m44[0m | ${html}\
[21:44:23.264]  [2m45[0m | ```\
[21:44:23.264]  [2m46[0m | \nUser request: ${prompt}` : prompt;
[21:44:23.264]     `----
[21:44:23.264] 
[21:44:23.265] Caused by:
[21:44:23.265]     Syntax Error
[21:44:23.265] 
[21:44:23.265] Import trace for requested module:
[21:44:23.265] ./app/api/ask-ai-local/route.ts
[21:44:23.265] 
[21:44:23.271] 
[21:44:23.271] > Build failed because of webpack errors
[21:44:23.341] Error: Command "npm run build" exited with 1