"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/create/route";
exports.ids = ["app/api/user/create/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "./action-async-storage.external?8dda":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?3d59":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?16bc":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcreate%2Froute&page=%2Fapi%2Fuser%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcreate%2Froute.ts&appDir=C%3A%5CManagement%5Cflying%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CManagement%5Cflying&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcreate%2Froute&page=%2Fapi%2Fuser%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcreate%2Froute.ts&appDir=C%3A%5CManagement%5Cflying%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CManagement%5Cflying&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Management_flying_src_app_api_user_create_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/user/create/route.ts */ \"(rsc)/./src/app/api/user/create/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/create/route\",\n        pathname: \"/api/user/create\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/create/route\"\n    },\n    resolvedPagePath: \"C:\\\\Management\\\\flying\\\\src\\\\app\\\\api\\\\user\\\\create\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Management_flying_src_app_api_user_create_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/user/create/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGY3JlYXRlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGY3JlYXRlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRmNyZWF0ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDTWFuYWdlbWVudCU1Q2ZseWluZyU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q01hbmFnZW1lbnQlNUNmbHlpbmcmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDYTtBQUMxRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL2RhcmtzZWNyZXQtbmV4dC8/OWY2YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxNYW5hZ2VtZW50XFxcXGZseWluZ1xcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx1c2VyXFxcXGNyZWF0ZVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXNlci9jcmVhdGUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91c2VyL2NyZWF0ZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci9jcmVhdGUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxNYW5hZ2VtZW50XFxcXGZseWluZ1xcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx1c2VyXFxcXGNyZWF0ZVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91c2VyL2NyZWF0ZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcreate%2Froute&page=%2Fapi%2Fuser%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcreate%2Froute.ts&appDir=C%3A%5CManagement%5Cflying%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CManagement%5Cflying&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/user/create/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/user/create/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var _lib_get_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/get-session */ \"(rsc)/./src/lib/get-session.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nasync function POST(req) {\n    try {\n        const session = await (0,_lib_get_session__WEBPACK_IMPORTED_MODULE_2__.getSession)();\n        if (!session.user || session.user.role !== \"admin\") {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"권한이 없습니다.\"\n            }, {\n                status: 403\n            });\n        }\n        const { username, password, nickname, role } = await req.json();\n        const existingUser = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                username\n            }\n        });\n        if (existingUser) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"이미 존재하는 아이디입니다.\"\n            }, {\n                status: 400\n            });\n        }\n        const hashedPassword = bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().hashSync(password, 10);\n        const user = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.user.create({\n            data: {\n                username,\n                password: hashedPassword,\n                nickname,\n                role: role || \"user\"\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            success: true,\n            user: {\n                id: user.id,\n                username: user.username\n            }\n        });\n    } catch (error) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"사용자 생성 중 오류가 발생했습니다.\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91c2VyL2NyZWF0ZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUNhO0FBQ2pCO0FBRXZCLGVBQWVJLEtBQUtDLEdBQVk7SUFDckMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUosNERBQVVBO1FBQ2hDLElBQUksQ0FBQ0ksUUFBUUMsSUFBSSxJQUFJRCxRQUFRQyxJQUFJLENBQUNDLElBQUksS0FBSyxTQUFTO1lBQ2xELE9BQU9SLGtGQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBWSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDakU7UUFFQSxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxRQUFRLEVBQUVOLElBQUksRUFBRSxHQUFHLE1BQU1ILElBQUlJLElBQUk7UUFFN0QsTUFBTU0sZUFBZSxNQUFNZCwyQ0FBTUEsQ0FBQ00sSUFBSSxDQUFDUyxVQUFVLENBQUM7WUFBRUMsT0FBTztnQkFBRUw7WUFBUztRQUFFO1FBQ3hFLElBQUlHLGNBQWM7WUFDaEIsT0FBT2Ysa0ZBQVlBLENBQUNTLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFrQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDdkU7UUFFQSxNQUFNTyxpQkFBaUJmLHdEQUFlLENBQUNVLFVBQVU7UUFDakQsTUFBTU4sT0FBTyxNQUFNTiwyQ0FBTUEsQ0FBQ00sSUFBSSxDQUFDYSxNQUFNLENBQUM7WUFDcENDLE1BQU07Z0JBQ0pUO2dCQUNBQyxVQUFVSztnQkFDVko7Z0JBQ0FOLE1BQU1BLFFBQVE7WUFDaEI7UUFDRjtRQUVBLE9BQU9SLGtGQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRWEsU0FBUztZQUFNZixNQUFNO2dCQUFFZ0IsSUFBSWhCLEtBQUtnQixFQUFFO2dCQUFFWCxVQUFVTCxLQUFLSyxRQUFRO1lBQUM7UUFBRTtJQUMzRixFQUFFLE9BQU9GLE9BQU87UUFDZCxPQUFPVixrRkFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBdUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDNUU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2RhcmtzZWNyZXQtbmV4dC8uL3NyYy9hcHAvYXBpL3VzZXIvY3JlYXRlL3JvdXRlLnRzPzg1NjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvZGInO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gJ0AvbGliL2dldC1zZXNzaW9uJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbigpO1xuICAgIGlmICghc2Vzc2lvbi51c2VyIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ+q2jO2VnOydtCDsl4bsirXri4jri6QuJyB9LCB7IHN0YXR1czogNDAzIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkLCBuaWNrbmFtZSwgcm9sZSB9ID0gYXdhaXQgcmVxLmpzb24oKTtcblxuICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyB1c2VybmFtZSB9IH0pO1xuICAgIGlmIChleGlzdGluZ1VzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn7J2066+4IOyhtOyerO2VmOuKlCDslYTsnbTrlJTsnoXri4jri6QuJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkLCAxMCk7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXG4gICAgICAgIG5pY2tuYW1lLFxuICAgICAgICByb2xlOiByb2xlIHx8ICd1c2VyJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB1c2VyOiB7IGlkOiB1c2VyLmlkLCB1c2VybmFtZTogdXNlci51c2VybmFtZSB9IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn7IKs7Jqp7J6QIOyDneyEsSDspJEg7Jik66WY6rCAIOuwnOyDne2WiOyKteuLiOuLpC4nIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJnZXRTZXNzaW9uIiwiYmNyeXB0IiwiUE9TVCIsInJlcSIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJuaWNrbmFtZSIsImV4aXN0aW5nVXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImhhc2hlZFBhc3N3b3JkIiwiaGFzaFN5bmMiLCJjcmVhdGUiLCJkYXRhIiwic3VjY2VzcyIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/user/create/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUosSUFBSUMsSUFBeUIsRUFBY0osZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFya3NlY3JldC1uZXh0Ly4vc3JjL2xpYi9kYi50cz85ZTRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWwgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBbJ3F1ZXJ5J10sXG4gIH0pXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/get-session.ts":
/*!********************************!*\
  !*** ./src/lib/get-session.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSession: () => (/* binding */ getSession)\n/* harmony export */ });\n/* harmony import */ var iron_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iron-session */ \"(rsc)/./node_modules/iron-session/dist/index.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./session */ \"(rsc)/./src/lib/session.ts\");\n\n\n\nasync function getSession() {\n    const session = await (0,iron_session__WEBPACK_IMPORTED_MODULE_2__.getIronSession)((0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)(), _session__WEBPACK_IMPORTED_MODULE_1__.sessionOptions);\n    return session;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2dldC1zZXNzaW9uLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFDUDtBQUNpQjtBQUVqRCxlQUFlRztJQUNwQixNQUFNQyxVQUFVLE1BQU1KLDREQUFjQSxDQUFjQyxxREFBT0EsSUFBSUMsb0RBQWNBO0lBQzNFLE9BQU9FO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXJrc2VjcmV0LW5leHQvLi9zcmMvbGliL2dldC1zZXNzaW9uLnRzP2RkYjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0SXJvblNlc3Npb24gfSBmcm9tICdpcm9uLXNlc3Npb24nO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XG5pbXBvcnQgeyBzZXNzaW9uT3B0aW9ucywgU2Vzc2lvbkRhdGEgfSBmcm9tICcuL3Nlc3Npb24nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldElyb25TZXNzaW9uPFNlc3Npb25EYXRhPihjb29raWVzKCksIHNlc3Npb25PcHRpb25zKTtcbiAgcmV0dXJuIHNlc3Npb247XG59XG4iXSwibmFtZXMiOlsiZ2V0SXJvblNlc3Npb24iLCJjb29raWVzIiwic2Vzc2lvbk9wdGlvbnMiLCJnZXRTZXNzaW9uIiwic2Vzc2lvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/get-session.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/session.ts":
/*!****************************!*\
  !*** ./src/lib/session.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sessionOptions: () => (/* binding */ sessionOptions)\n/* harmony export */ });\nconst sessionOptions = {\n    password: \"complex_password_at_least_32_characters_long\",\n    cookieName: \"darksecret_session\",\n    cookieOptions: {\n        secure: \"development\" === \"production\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3Nlc3Npb24udHMiLCJtYXBwaW5ncyI6Ijs7OztBQVdPLE1BQU1BLGlCQUFpQztJQUM1Q0MsVUFBVTtJQUNWQyxZQUFZO0lBQ1pDLGVBQWU7UUFDYkMsUUFBUUMsa0JBQXlCO0lBQ25DO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2RhcmtzZWNyZXQtbmV4dC8uL3NyYy9saWIvc2Vzc2lvbi50cz84ZGY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlc3Npb25PcHRpb25zIH0gZnJvbSAnaXJvbi1zZXNzaW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uRGF0YSB7XG4gIHVzZXI/OiB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIG5pY2tuYW1lOiBzdHJpbmc7XG4gICAgcm9sZTogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2Vzc2lvbk9wdGlvbnM6IFNlc3Npb25PcHRpb25zID0ge1xuICBwYXNzd29yZDogXCJjb21wbGV4X3Bhc3N3b3JkX2F0X2xlYXN0XzMyX2NoYXJhY3RlcnNfbG9uZ1wiLCAvLyDsi6TsoJwg7Jq07JiBIOyLnCDtmZjqsr3rs4DsiJgg6raM7J6lXG4gIGNvb2tpZU5hbWU6IFwiZGFya3NlY3JldF9zZXNzaW9uXCIsXG4gIGNvb2tpZU9wdGlvbnM6IHtcbiAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgfSxcbn07XG4iXSwibmFtZXMiOlsic2Vzc2lvbk9wdGlvbnMiLCJwYXNzd29yZCIsImNvb2tpZU5hbWUiLCJjb29raWVPcHRpb25zIiwic2VjdXJlIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/session.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/iron-webcrypto","vendor-chunks/iron-session","vendor-chunks/cookie","vendor-chunks/uncrypto","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fcreate%2Froute&page=%2Fapi%2Fuser%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fcreate%2Froute.ts&appDir=C%3A%5CManagement%5Cflying%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CManagement%5Cflying&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();