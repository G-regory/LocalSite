[14:05:09.622] Running build in Washington, D.C., USA (East) – iad1
[14:05:09.623] Build machine configuration: 2 cores, 8 GB
[14:05:09.638] Cloning github.com/G-regory/LocalSite (Branch: main, Commit: f52668c)
[14:05:09.936] Cloning completed: 297.000ms
[14:05:13.661] Restored build cache from previous deployment (AfAJkg5AVHG8Rcj96tYryaQJS47M)
[14:05:14.411] Running "vercel build"
[14:05:14.844] Vercel CLI 47.0.5
[14:05:15.221] Installing dependencies...
[14:05:16.607] 
[14:05:16.608] up to date in 1s
[14:05:16.608] 
[14:05:16.608] 165 packages are looking for funding
[14:05:16.608]   run `npm fund` for details
[14:05:16.637] Detected Next.js version: 15.3.3
[14:05:16.642] Running "npm run build"
[14:05:16.751] 
[14:05:16.752] > localsite@0.1.0 build
[14:05:16.752] > next build
[14:05:16.752] 
[14:05:17.673]    ▲ Next.js 15.3.3
[14:05:17.673] 
[14:05:17.710]    Creating an optimized production build ...
[14:05:26.561] Failed to compile.
[14:05:26.561] 
[14:05:26.562] ./components/editor/index.tsx
[14:05:26.562] Error:   [31mx[0m Expression expected
[14:05:26.562]      ,-[[36;1;4m/vercel/path0/components/editor/index.tsx[0m:148:1]
[14:05:26.562]  [2m145[0m |     resizer.current.addEventListener("mousedown", handleMouseDown);
[14:05:26.562]  [2m146[0m |     window.addEventListener("resize", resetLayout);
[14:05:26.562]  [2m147[0m |   });
[14:05:26.562]  [2m148[0m |   useUnmount(() => {.
[14:05:26.562]      : [35;1m                    ^[0m
[14:05:26.562]  [2m149[0m |     document.removeEventListener("mousemove", handleResize);
[14:05:26.562]  [2m150[0m |     document.removeEventListener("mouseup", handleMouseUp);
[14:05:26.562]  [2m151[0m |     if (resizer.current) {
[14:05:26.562]      `----
[14:05:26.562] 
[14:05:26.562] Caused by:
[14:05:26.562]     Syntax Error
[14:05:26.562] 
[14:05:26.562] Import trace for requested module:
[14:05:26.562] ./components/editor/index.tsx
[14:05:26.563] ./app/projects/new/page.tsx
[14:05:26.563] 
[14:05:26.566] 
[14:05:26.566] > Build failed because of webpack errors
[14:05:26.619] Error: Command "npm run build" exited with 1