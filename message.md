[21:39:56.343] Running build in Washington, D.C., USA (East) – iad1
[21:39:56.343] Build machine configuration: 2 cores, 8 GB
[21:39:56.378] Cloning github.com/G-regory/LocalSite (Branch: main, Commit: 80ddaa5)
[21:39:56.682] Cloning completed: 303.000ms
[21:40:00.185] Restored build cache from previous deployment (EcE6CLsuxvhP5EkNd2Mbusyy4Whz)
[21:40:00.867] Running "vercel build"
[21:40:01.279] Vercel CLI 46.1.1
[21:40:01.605] Installing dependencies...
[21:40:03.238] 
[21:40:03.238] up to date in 1s
[21:40:03.238] 
[21:40:03.239] 165 packages are looking for funding
[21:40:03.239]   run `npm fund` for details
[21:40:03.271] Detected Next.js version: 15.3.3
[21:40:03.275] Running "npm run build"
[21:40:03.387] 
[21:40:03.388] > localsite@0.1.0 build
[21:40:03.388] > next build
[21:40:03.388] 
[21:40:04.327]    ▲ Next.js 15.3.3
[21:40:04.328] 
[21:40:04.363]    Creating an optimized production build ...
[21:40:30.351]  ✓ Compiled successfully in 25.0s
[21:40:30.356]    Linting and checking validity of types ...
[21:40:37.114] 
[21:40:37.114] Failed to compile.
[21:40:37.114] 
[21:40:37.115] ./app/api/ask-ai-local/route.ts
[21:40:37.117] 8:41  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:40:37.117] 41:9  Error: 'rawContent' is never reassigned. Use 'const' instead.  prefer-const
[21:40:37.117] 63:17  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:40:37.117] 
[21:40:37.117] ./components/editor/ask-ai/index.tsx
[21:40:37.117] 2:20  Error: 'useMemo' is defined but never used.  @typescript-eslint/no-unused-vars
[21:40:37.117] 3:8  Error: 'classNames' is defined but never used.  @typescript-eslint/no-unused-vars
[21:40:37.117] 6:19  Error: 'Crosshair' is defined but never used.  @typescript-eslint/no-unused-vars
[21:40:37.117] 9:10  Error: 'MODELS' is defined but never used.  @typescript-eslint/no-unused-vars
[21:40:37.117] 15:66  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:40:37.118] 46:18  Error: 'e' is defined but never used.  @typescript-eslint/no-unused-vars
[21:40:37.118] 61:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:40:37.118] 
[21:40:37.118] ./components/editor/ask-ai/settings.tsx
[21:40:37.118] 37:3  Error: 'onClose' is defined but never used.  @typescript-eslint/no-unused-vars
[21:40:37.118] 
[21:40:37.118] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[21:40:37.222] Error: Command "npm run build" exited with 1