[21:54:14.094] Running build in Washington, D.C., USA (East) – iad1
[21:54:14.095] Build machine configuration: 2 cores, 8 GB
[21:54:14.117] Cloning github.com/G-regory/LocalSite (Branch: main, Commit: fbd4767)
[21:54:14.408] Cloning completed: 291.000ms
[21:54:17.562] Restored build cache from previous deployment (EcE6CLsuxvhP5EkNd2Mbusyy4Whz)
[21:54:18.233] Running "vercel build"
[21:54:18.614] Vercel CLI 46.1.1
[21:54:19.086] Installing dependencies...
[21:54:20.444] 
[21:54:20.445] up to date in 1s
[21:54:20.445] 
[21:54:20.446] 165 packages are looking for funding
[21:54:20.446]   run `npm fund` for details
[21:54:20.476] Detected Next.js version: 15.3.3
[21:54:20.481] Running "npm run build"
[21:54:20.589] 
[21:54:20.590] > localsite@0.1.0 build
[21:54:20.590] > next build
[21:54:20.590] 
[21:54:21.506]    ▲ Next.js 15.3.3
[21:54:21.507] 
[21:54:21.541]    Creating an optimized production build ...
[21:54:39.221] Failed to compile.
[21:54:39.223] 
[21:54:39.223] ./app/api/ask-ai-local/route.ts
[21:54:39.223] Error:   [31mx[0m Expected unicode escape
[21:54:39.224]     ,-[[36;1;4m/vercel/path0/app/api/ask-ai-local/route.ts[0m:43:1]
[21:54:39.224]  [2m40[0m |     const body = await req.json();
[21:54:39.224]  [2m41[0m |     const { prompt, model, html } = body;
[21:54:39.224]  [2m42[0m |     const userContent = html ? `Current HTML:\n\
[21:54:39.225]  [2m43[0m | ```html\
[21:54:39.225]     : [35;1m       ^[0m
[21:54:39.225]  [2m44[0m | ${html}\
[21:54:39.226]  [2m45[0m | ```\
[21:54:39.226]  [2m46[0m | \
[21:54:39.226]     `----
[21:54:39.226]   [31mx[0m Expected ':', got '<lexing error: Error { error: (1771..1771, ExpectedUnicodeEscape) }>'
[21:54:39.226]     ,-[[36;1;4m/vercel/path0/app/api/ask-ai-local/route.ts[0m:43:1]
[21:54:39.226]  [2m40[0m |     const body = await req.json();
[21:54:39.226]  [2m41[0m |     const { prompt, model, html } = body;
[21:54:39.226]  [2m42[0m |     const userContent = html ? `Current HTML:\n\
[21:54:39.226]  [2m43[0m | ```html\
[21:54:39.226]     : [35;1m   ^^^^^[0m
[21:54:39.226]  [2m44[0m | ${html}\
[21:54:39.226]  [2m45[0m | ```\
[21:54:39.226]  [2m46[0m | \
[21:54:39.226]     `----
[21:54:39.226] 
[21:54:39.227] Caused by:
[21:54:39.227]     Syntax Error
[21:54:39.227] 
[21:54:39.227] Import trace for requested module:
[21:54:39.227] ./app/api/ask-ai-local/route.ts
[21:54:39.227] 
[21:54:39.227] 
[21:54:39.227] > Build failed because of webpack errors
[21:54:39.297] Error: Command "npm run build" exited with 1