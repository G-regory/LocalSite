en local, j'ai cette erreur: 
"(index):64 cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation
(anonymous) @ (index):64
node_modules_next_dist_compiled_2ce9398a._.js:16384 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
node_modules_next_dist_compiled_2ce9398a._.js:18016  Server   ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
react-stack-bottom-frame @ node_modules_next_dist_compiled_2ce9398a._.js:18016
node_modules_next_dist_client_8f19e6fb._.js:14984 [Fast Refresh] rebuilding
node_modules_next_dist_client_8f19e6fb._.js:14848 [Fast Refresh] done in 8580ms
node_modules_next_dist_client_8f19e6fb._.js:14984 [Fast Refresh] rebuilding
node_modules_next_dist_client_8f19e6fb._.js:14848 [Fast Refresh] done in 2373ms
:3000/api/ask-ai-local:1  Failed to load resource: net::ERR_EMPTY_RESPONSE
node_modules_next_dist_client_8f19e6fb._.js:1226 [callAi] Error: TypeError: Failed to fetch
    at callAi (_d02bf929._.js:2557:36)
    at onKeyDown (_d02bf929._.js:2670:71)
    at executeDispatch (node_modules_next_dist_compiled_2ce9398a._.js:10906:13)
    at runWithFiberInDEV (node_modules_next_dist_compiled_2ce9398a._.js:3073:74)
    at processDispatchQueue (node_modules_next_dist_compiled_2ce9398a._.js:10932:41)
    at node_modules_next_dist_compiled_2ce9398a._.js:11223:13
    at batchedUpdates$1 (node_modules_next_dist_compiled_2ce9398a._.js:4384:44)
    at dispatchEventForPluginEventSystem (node_modules_next_dist_compiled_2ce9398a._.js:11008:9)
    at dispatchEvent (node_modules_next_dist_compiled_2ce9398a._.js:13121:37)
    at dispatchDiscreteEvent (node_modules_next_dist_compiled_2ce9398a._.js:13103:64)
error @ node_modules_next_dist_client_8f19e6fb._.js:1226
geist-latin.woff2:1  Failed to load resource: net::ERR_CONNECTION_REFUSED
:3000/__nextjs_original-stack-frames:1  Failed to load resource: net::ERR_CONNECTION_REFUSED
"

"Console Error


Error: Failed to fetch

Call Stack
10

callAi
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/_d02bf929._.js (2557:36)
onKeyDown
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/_d02bf929._.js (2670:71)
executeDispatch
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (10906:13)
runWithFiberInDEV
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (3073:74)
processDispatchQueue
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (10932:41)
<unknown>
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (11223:13)
batchedUpdates$1
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (4384:44)
dispatchEventForPluginEventSystem
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (11008:9)
dispatchEvent
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (13121:37)
dispatchDiscreteEvent
file:///mnt/c/Users/pro/Documents/automatisation/LocalSite-clone-final/.next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js (13103:64)"


et avec vercel, j'ai cette erreur: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON