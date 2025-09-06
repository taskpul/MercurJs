(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__d50270._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/middleware.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
;
const BACKEND_URL = process.env.MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = ("TURBOPACK compile-time value", "pk_076f91b158c4c7a37077ecd0017fc8697ed6bdc8315f70d7fd7e921a08ceb3b8");
const DEFAULT_REGION = ("TURBOPACK compile-time value", "pl") || "us";
const regionMapCache = {
    regionMap: new Map(),
    regionMapUpdated: Date.now()
};
async function getRegionMap(cacheId) {
    const { regionMap, regionMapUpdated } = regionMapCache;
    if (!BACKEND_URL) {
        throw new Error("Middleware.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL.");
    }
    if (!regionMap.keys().next().value || regionMapUpdated < Date.now() - 3600 * 1000) {
        // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
        const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
            headers: {
                "x-publishable-api-key": PUBLISHABLE_API_KEY
            },
            next: {
                revalidate: 3600,
                tags: [
                    `regions-${cacheId}`
                ]
            },
            cache: "force-cache"
        }).then(async (response)=>{
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            return json;
        });
        if (!regions?.length) {
            throw new Error("No regions found. Please set up regions in your Medusa Admin.");
        }
        // Create a map of country codes to regions.
        regions.forEach((region)=>{
            region.countries?.forEach((c)=>{
                regionMapCache.regionMap.set(c.iso_2 ?? "", region);
            });
        });
        regionMapCache.regionMapUpdated = Date.now();
    }
    return regionMapCache.regionMap;
}
async function getCountryCode(request, regionMap) {
    try {
        let countryCode;
        const vercelCountryCode = request.headers.get("x-vercel-ip-country")?.toLowerCase();
        const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase();
        if (urlCountryCode && regionMap.has(urlCountryCode)) {
            countryCode = urlCountryCode;
        } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
            countryCode = vercelCountryCode;
        } else if (regionMap.has(DEFAULT_REGION)) {
            countryCode = DEFAULT_REGION;
        } else if (regionMap.keys().next().value) {
            countryCode = regionMap.keys().next().value;
        }
        return countryCode;
    } catch (error) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.error("Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL.");
        }
    }
}
async function middleware(request) {
    // Short-circuit static assets
    if (request.nextUrl.pathname.includes(".")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const cacheIdCookie = request.cookies.get("_medusa_cache_id");
    const urlSegment = request.nextUrl.pathname.split("/")[1];
    const looksLikeLocale = /^[a-z]{2}$/i.test(urlSegment || "");
    // Fast path: URL already has a locale segment and cache cookie exists
    if (looksLikeLocale && cacheIdCookie) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Ensure cache id cookie exists (set without redirect)
    const cacheId = cacheIdCookie?.value || crypto.randomUUID();
    if (!cacheIdCookie) {
        response.cookies.set("_medusa_cache_id", cacheId, {
            maxAge: 60 * 60 * 24
        });
    }
    const regionMap = await getRegionMap(cacheId);
    const countryCode = regionMap && await getCountryCode(request, regionMap);
    const urlHasCountryCode = countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode);
    // If no country code in URL but we can resolve one, redirect to locale-prefixed path
    if (!urlHasCountryCode && countryCode) {
        const redirectPath = request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname;
        const queryString = request.nextUrl.search ? request.nextUrl.search : "";
        const redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl, 307);
    }
    return response;
}
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__d50270._.js.map