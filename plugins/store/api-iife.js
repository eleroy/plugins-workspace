if("__TAURI__"in window){var __TAURI_PLUGIN_STORE__=function(t){"use strict";var e,a;function r(t,e=!1){return window.__TAURI_INTERNALS__.transformCallback(t,e)}async function s(t,e={},a){return window.__TAURI_INTERNALS__.invoke(t,e,a)}"function"==typeof SuppressedError&&SuppressedError;class i{get rid(){return function(t,e,a,r){if("function"==typeof e||!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===a?r:"a"===a?r.call(t):r?r.value:e.get(t)}(this,e,"f")}constructor(t){e.set(this,void 0),function(t,e,a){if("function"==typeof e||!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");e.set(t,a)}(this,e,t)}async close(){return s("plugin:resources|close",{rid:this.rid})}}async function n(t,e,a){const i={kind:"Any"};return s("plugin:event|listen",{event:t,target:i,handler:r(e)}).then((e=>async()=>async function(t,e){await s("plugin:event|unlisten",{event:t,eventId:e})}(t,e)))}async function o(t,e){return await u.load(t,e)}e=new WeakMap,function(t){t.WINDOW_RESIZED="tauri://resize",t.WINDOW_MOVED="tauri://move",t.WINDOW_CLOSE_REQUESTED="tauri://close-requested",t.WINDOW_DESTROYED="tauri://destroyed",t.WINDOW_FOCUS="tauri://focus",t.WINDOW_BLUR="tauri://blur",t.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",t.WINDOW_THEME_CHANGED="tauri://theme-changed",t.WINDOW_CREATED="tauri://window-created",t.WEBVIEW_CREATED="tauri://webview-created",t.DRAG_ENTER="tauri://drag-enter",t.DRAG_OVER="tauri://drag-over",t.DRAG_DROP="tauri://drag-drop",t.DRAG_LEAVE="tauri://drag-leave"}(a||(a={}));class u extends i{constructor(t){super(t)}static async load(t,e){const a=await s("plugin:store|load",{path:t,...e});return new u(a)}static async get(t){return await s("plugin:store|get_store",{path:t}).then((t=>t?new u(t):null))}async set(t,e){await s("plugin:store|set",{rid:this.rid,key:t,value:e})}async get(t){const[e,a]=await s("plugin:store|get",{rid:this.rid,key:t});return a?e:void 0}async has(t){return await s("plugin:store|has",{rid:this.rid,key:t})}async delete(t){return await s("plugin:store|delete",{rid:this.rid,key:t})}async clear(){await s("plugin:store|clear",{rid:this.rid})}async reset(){await s("plugin:store|reset",{rid:this.rid})}async keys(){return await s("plugin:store|keys",{rid:this.rid})}async values(){return await s("plugin:store|values",{rid:this.rid})}async entries(){return await s("plugin:store|entries",{rid:this.rid})}async length(){return await s("plugin:store|length",{rid:this.rid})}async reload(){await s("plugin:store|reload",{rid:this.rid})}async save(){await s("plugin:store|save",{rid:this.rid})}async onKeyChange(t,e){return await n("store://change",(a=>{a.payload.resourceId===this.rid&&a.payload.key===t&&e(a.payload.exists?a.payload.value:void 0)}))}async onChange(t){return await n("store://change",(e=>{e.payload.resourceId===this.rid&&t(e.payload.key,e.payload.exists?e.payload.value:void 0)}))}}return t.LazyStore=class{get store(){return this._store||(this._store=o(this.path,this.options)),this._store}constructor(t,e){this.path=t,this.options=e}async init(){await this.store}async set(t,e){return(await this.store).set(t,e)}async get(t){return(await this.store).get(t)}async has(t){return(await this.store).has(t)}async delete(t){return(await this.store).delete(t)}async clear(){await(await this.store).clear()}async reset(){await(await this.store).reset()}async keys(){return(await this.store).keys()}async values(){return(await this.store).values()}async entries(){return(await this.store).entries()}async length(){return(await this.store).length()}async reload(){await(await this.store).reload()}async save(){await(await this.store).save()}async onKeyChange(t,e){return(await this.store).onKeyChange(t,e)}async onChange(t){return(await this.store).onChange(t)}async close(){this._store&&await(await this._store).close()}},t.Store=u,t.getStore=async function(t){return await u.get(t)},t.load=o,t}({});Object.defineProperty(window.__TAURI__,"store",{value:__TAURI_PLUGIN_STORE__})}
