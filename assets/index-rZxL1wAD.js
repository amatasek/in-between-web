const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./FirebaseAuthPage-c3dWgofj.js","./vendor-ByZL_ylL.js","./useGamepadNavigation-DCsD-Nlu.js","./AuthPage.module-lHBTEcRC.js","./AuthPage-C2jXpIGa.css","./AppHeader-B42I-hCz.js","./AppHeader-Dw3y85lw.css","./audio-Do0jXn0P.js","./socket-CA1CrNgP.js","./FirebaseAuthPage-CxQ-jThw.css","./AuthPage-BZ4qM4xT.js","./AuthPage-C_7D2EWG.css","./Lobby-BNY5KnAi.js","./GamepadInput-CVlYdkMd.js","./GamepadInput-B4hG-7Ng.css","./Lobby-DJOYs0hE.css","./GameRoom-D1RAgz0l.js","./GameRoom-DTN8b981.css","./web-QOWorBVg.js"])))=>i.map(i=>d[i]);
import{r as Dn,a as Nn,g as Mn,b as f,d as Un,N as Sr,e as Fn,R as jn,f as Tr}from"./vendor-ByZL_ylL.js";import{r as $n}from"./audio-Do0jXn0P.js";import{l as Bn}from"./socket-CA1CrNgP.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var at={exports:{}},ve={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $t;function Hn(){if($t)return ve;$t=1;var r=Dn(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function o(c,a,l){var h,d={},g=null,b=null;l!==void 0&&(g=""+l),a.key!==void 0&&(g=""+a.key),a.ref!==void 0&&(b=a.ref);for(h in a)n.call(a,h)&&!i.hasOwnProperty(h)&&(d[h]=a[h]);if(c&&c.defaultProps)for(h in a=c.defaultProps,a)d[h]===void 0&&(d[h]=a[h]);return{$$typeof:e,type:c,key:g,ref:b,props:d,_owner:s.current}}return ve.Fragment=t,ve.jsx=o,ve.jsxs=o,ve}var Bt;function Vn(){return Bt||(Bt=1,at.exports=Hn()),at.exports}var y=Vn(),$e={},Ht;function Wn(){if(Ht)return $e;Ht=1;var r=Nn();return $e.createRoot=r.createRoot,$e.hydrateRoot=r.hydrateRoot,$e}var zn=Wn();const Kn=Mn(zn);var Gn=$n();class qn{constructor(){this.sounds={},this.muted=!1,this.initialized=!1,this.categories=["ui"],this.lastPlayedTime={},this.debounceTime=500,this.audioUnlocked=!1,this.API_URL="https://api.in-between.live",typeof window<"u"&&setTimeout(()=>{this.initialize(),this._setupMobileAudioUnlock()},0)}initialize(){this.initialized||(this.loadCategory("ui"),this.initialized=!0)}loadCategory(e){if(this.sounds[e])return;const t={};e==="ui"&&(t.join=[0,500],t.leave=[500,1e3],t.alert=[1500,1500]),this.sounds[e]=new Gn.Howl({src:[`${this.API_URL}/assets/audio/${e}-sounds.mp3`,`${this.API_URL}/assets/audio/${e}-sounds.webm`],sprite:t,preload:!0,html5:this._isMobileDevice(),format:["mp3","webm"],pool:10})}play(e,t=1){if(this.muted)return;this.initialized||this.initialize();let n,s;if(e.includes(".")?[n,s]=e.split("."):(n="ui",s=e),!this.sounds[n]){this.loadCategory(n);return}const i=`${n}.${s}`,o=Date.now(),c=this.lastPlayedTime[i]||0;if(!(o-c<this.debounceTime))return this.lastPlayedTime[i]=o,this.sounds[n].volume(t),this.sounds[n].play(s)}setMuted(e){this.muted=e,Object.values(this.sounds).forEach(t=>{t&&t.mute&&t.mute(e)})}syncWithPreferences(e){e&&typeof e.muted<"u"&&this.setMuted(e.muted)}_setupMobileAudioUnlock(){if(typeof window>"u"||!this._isMobileDevice())return;const e=()=>{if(this.audioUnlocked)return;const t=new Audio;t.src="data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAQAAAAAAAAAAABSAJAJAQgAAgAAAAiIkfC3/////////////////////",t.load(),t.play().then(()=>{this.audioUnlocked=!0,document.body.removeEventListener("touchstart",e),document.body.removeEventListener("touchend",e),document.body.removeEventListener("click",e)}).catch(n=>{})};document.body.addEventListener("touchstart",e,!1),document.body.addEventListener("touchend",e,!1),document.body.addEventListener("click",e,!1)}_isMobileDevice(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}}const _t=new qn,Jn="modulepreload",Yn=function(r,e){return new URL(r,e).href},Vt={},Pe=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let l=function(h){return Promise.all(h.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),a=c?.nonce||c?.getAttribute("nonce");s=l(t.map(h=>{if(h=Yn(h,n),h in Vt)return;Vt[h]=!0;const d=h.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(n)for(let E=o.length-1;E>=0;E--){const p=o[E];if(p.href===h&&(!d||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${g}`))return;const b=document.createElement("link");if(b.rel=d?"stylesheet":Jn,d||(b.as="script"),b.crossOrigin="",b.href=h,a&&b.setAttribute("nonce",a),document.head.appendChild(b),d)return new Promise((E,p)=>{b.addEventListener("load",E),b.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},Xn="_loadingScreen_16l5s_1",Qn="_loadingContainer_16l5s_10",Zn="_spinner_16l5s_21",es="_message_16l5s_31",Be={loadingScreen:Xn,loadingContainer:Qn,spinner:Zn,message:es},we=({message:r="Loading..."})=>y.jsx("div",{className:Be.loadingScreen,children:y.jsxs("div",{className:Be.loadingContainer,children:[y.jsx("div",{className:Be.spinner}),y.jsx("p",{className:Be.message,children:r})]})}),kr="https://api.in-between.live",ts="https://api.in-between.live",rs={apiKey:"AIzaSyBUm2vU-bPYSpsxIdd7pYerZx81GNgVJgQ",authDomain:"in-between-live.firebaseapp.com",projectId:"in-between-live",storageBucket:"in-between-live.firebasestorage.app",messagingSenderId:"800669475084",appId:"1:800669475084:web:89e0bbd44313d8bd3d2929",measurementId:"G-1PZPC7KWZF"},Cr=f.createContext(),et=()=>f.useContext(Cr),ns=({children:r})=>{const{token:e}=ot(),[t,n]=f.useState(null),[s,i]=f.useState(!1),[o,c]=f.useState(null);f.useEffect(()=>{if(typeof window>"u")return;if(!e){t&&(t.disconnect(),n(null),i(!1),c(null));return}const l=Bn(ts,{auth:{token:e},reconnection:!0,reconnectionAttempts:5,reconnectionDelay:1e3,transports:["websocket","polling"],timeout:1e4});n(l),l.on("connect",()=>{c(null)}),l.on("authenticated",d=>{l.auth={userId:d.userId,username:d.username},i(!0),l.emit("getGameList")}),l.on("connect_error",d=>{c("Failed to connect to game server: "+d.message),i(!1)}),l.on("disconnect",()=>{i(!1)}),l.on("error",d=>{c(d.message||"Unknown socket error")});const h=["connect","authenticated","disconnect","connect_error","error","transport"];return()=>{l&&(h.forEach(d=>l.off(d)),l.disconnect(),n(null),i(!1),c(null))}},[e]);const a={socket:t,isConnected:s,error:o,setError:c};return y.jsx(Cr.Provider,{value:a,children:r})};var Wt={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ss=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],a=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(a>>10)),e[n++]=String.fromCharCode(56320+(a&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Rr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,a=s+2<r.length,l=a?r[s+2]:0,h=i>>2,d=(i&3)<<4|c>>4;let g=(c&15)<<2|l>>6,b=l&63;a||(b=64,o||(g=64)),n.push(t[h],t[d],t[g],t[b])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Pr(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):ss(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const l=s<r.length?t[r.charAt(s)]:64;++s;const d=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||l==null||d==null)throw new is;const g=i<<2|c>>4;if(n.push(g),l!==64){const b=c<<4&240|l>>2;if(n.push(b),d!==64){const E=l<<6&192|d;n.push(E)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class is extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const os=function(r){const e=Pr(r);return Rr.encodeByteArray(e,!0)},Or=function(r){return os(r).replace(/\./g,"")},xr=function(r){try{return Rr.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function as(r,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:r===void 0&&(r={});break;case Array:r=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!cs(t)||(r[t]=as(r[t],e[t]));return r}function cs(r){return r!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ls(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds=()=>ls().__FIREBASE_DEFAULTS__,us=()=>{if(typeof process>"u"||typeof Wt>"u")return;const r=Wt.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},hs=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&xr(r[1]);return e&&JSON.parse(e)},tt=()=>{try{return ds()||us()||hs()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},fs=r=>{var e,t;return(t=(e=tt())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},Lr=()=>{var r;return(r=tt())===null||r===void 0?void 0:r.config},Dr=r=>{var e;return(e=tt())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gs(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(O())}function gl(){var r;const e=(r=tt())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ms(){return typeof window<"u"||Nr()}function Nr(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function bs(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function _s(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function ys(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vs(){const r=O();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function ws(){try{return typeof indexedDB=="object"}catch{return!1}}function Es(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is="FirebaseError";class K extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Is,Object.setPrototypeOf(this,K.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Re.prototype.create)}}class Re{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?As(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new K(s,c,n)}}function As(r,e){return r.replace(Ss,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Ss=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ml(r,e){return Object.prototype.hasOwnProperty.call(r,e)}function Ts(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Ge(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(zt(i)&&zt(o)){if(!Ge(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function zt(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Ee(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Ie(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function ks(r,e){const t=new Cs(r,e);return t.subscribe.bind(t)}class Cs{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Ps(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=ct),s.error===void 0&&(s.error=ct),s.complete===void 0&&(s.complete=ct);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ps(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function ct(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(r){return r&&r._delegate?r._delegate:r}class pe{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new ps;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(xs(e))try{this.getOrInitializeService({instanceIdentifier:oe})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=oe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=oe){return this.instances.has(e)}getOptions(e=oe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){var n;const s=this.normalizeInstanceIdentifier(t),i=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Os(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=oe){return this.component?this.component.multipleInstances?e:oe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Os(r){return r===oe?void 0:r}function xs(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Rs(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt=[];var C;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(C||(C={}));const Ur={debug:C.DEBUG,verbose:C.VERBOSE,info:C.INFO,warn:C.WARN,error:C.ERROR,silent:C.SILENT},Ls=C.INFO,Ds={[C.DEBUG]:"log",[C.VERBOSE]:"log",[C.INFO]:"info",[C.WARN]:"warn",[C.ERROR]:"error"},Ns=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=Ds[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fr{constructor(e){this.name=e,this._logLevel=Ls,this._logHandler=Ns,this._userLogHandler=null,kt.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in C))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ur[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,C.DEBUG,...e),this._logHandler(this,C.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,C.VERBOSE,...e),this._logHandler(this,C.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,C.INFO,...e),this._logHandler(this,C.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,C.WARN,...e),this._logHandler(this,C.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,C.ERROR,...e),this._logHandler(this,C.ERROR,...e)}}function Ms(r){kt.forEach(e=>{e.setLogLevel(r)})}function Us(r,e){for(const t of kt){let n=null;e&&e.level&&(n=Ur[e.level]),r===null?t.userLogHandler=null:t.userLogHandler=(s,i,...o)=>{const c=o.map(a=>{if(a==null)return null;if(typeof a=="string")return a;if(typeof a=="number"||typeof a=="boolean")return a.toString();if(a instanceof Error)return a.message;try{return JSON.stringify(a)}catch{return null}}).filter(a=>a).join(" ");i>=(n??s.logLevel)&&r({level:C[i].toLowerCase(),message:c,args:o,type:s.name})}}}const Fs=(r,e)=>e.some(t=>r instanceof t);let Kt,Gt;function js(){return Kt||(Kt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $s(){return Gt||(Gt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const jr=new WeakMap,yt=new WeakMap,$r=new WeakMap,lt=new WeakMap,Ct=new WeakMap;function Bs(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Z(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&jr.set(t,r)}).catch(()=>{}),Ct.set(e,r),e}function Hs(r){if(yt.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});yt.set(r,e)}let vt={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return yt.get(r);if(e==="objectStoreNames")return r.objectStoreNames||$r.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Z(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Vs(r){vt=r(vt)}function Ws(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(dt(this),e,...t);return $r.set(n,e.sort?e.sort():[e]),Z(n)}:$s().includes(r)?function(...e){return r.apply(dt(this),e),Z(jr.get(this))}:function(...e){return Z(r.apply(dt(this),e))}}function zs(r){return typeof r=="function"?Ws(r):(r instanceof IDBTransaction&&Hs(r),Fs(r,js())?new Proxy(r,vt):r)}function Z(r){if(r instanceof IDBRequest)return Bs(r);if(lt.has(r))return lt.get(r);const e=zs(r);return e!==r&&(lt.set(r,e),Ct.set(e,r)),e}const dt=r=>Ct.get(r);function Ks(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=Z(o);return n&&o.addEventListener("upgradeneeded",a=>{n(Z(o.result),a.oldVersion,a.newVersion,Z(o.transaction),a)}),t&&o.addEventListener("blocked",a=>t(a.oldVersion,a.newVersion,a)),c.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Gs=["get","getKey","getAll","getAllKeys","count"],qs=["put","add","delete","clear"],ut=new Map;function qt(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(ut.get(e))return ut.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=qs.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Gs.includes(t)))return;const i=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return n&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&a.done]))[0]};return ut.set(e,i),i}Vs(r=>({...r,get:(e,t,n)=>qt(e,t)||r.get(e,t,n),has:(e,t)=>!!qt(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ys(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Ys(r){const e=r.getComponent();return e?.type==="VERSION"}const qe="@firebase/app",wt="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W=new Fr("@firebase/app"),Xs="@firebase/app-compat",Qs="@firebase/analytics-compat",Zs="@firebase/analytics",ei="@firebase/app-check-compat",ti="@firebase/app-check",ri="@firebase/auth",ni="@firebase/auth-compat",si="@firebase/database",ii="@firebase/data-connect",oi="@firebase/database-compat",ai="@firebase/functions",ci="@firebase/functions-compat",li="@firebase/installations",di="@firebase/installations-compat",ui="@firebase/messaging",hi="@firebase/messaging-compat",fi="@firebase/performance",pi="@firebase/performance-compat",gi="@firebase/remote-config",mi="@firebase/remote-config-compat",bi="@firebase/storage",_i="@firebase/storage-compat",yi="@firebase/firestore",vi="@firebase/vertexai-preview",wi="@firebase/firestore-compat",Ei="firebase",Ii="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="[DEFAULT]",Ai={[qe]:"fire-core",[Xs]:"fire-core-compat",[Zs]:"fire-analytics",[Qs]:"fire-analytics-compat",[ti]:"fire-app-check",[ei]:"fire-app-check-compat",[ri]:"fire-auth",[ni]:"fire-auth-compat",[si]:"fire-rtdb",[ii]:"fire-data-connect",[oi]:"fire-rtdb-compat",[ai]:"fire-fn",[ci]:"fire-fn-compat",[li]:"fire-iid",[di]:"fire-iid-compat",[ui]:"fire-fcm",[hi]:"fire-fcm-compat",[fi]:"fire-perf",[pi]:"fire-perf-compat",[gi]:"fire-rc",[mi]:"fire-rc-compat",[bi]:"fire-gcs",[_i]:"fire-gcs-compat",[yi]:"fire-fst",[wi]:"fire-fst-compat",[vi]:"fire-vertex","fire-js":"fire-js",[Ei]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re=new Map,ge=new Map,me=new Map;function Et(r,e){try{r.container.addComponent(e)}catch(t){W.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Si(r,e){r.container.addOrOverwriteComponent(e)}function be(r){const e=r.name;if(me.has(e))return W.debug(`There were multiple attempts to register component ${e}.`),!1;me.set(e,r);for(const t of re.values())Et(t,r);for(const t of ge.values())Et(t,r);return!0}function rt(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Ti(r,e,t=Se){rt(r,e).clearInstance(t)}function Br(r){return r.options!==void 0}function U(r){return r.settings!==void 0}function ki(){me.clear()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new Re("app","Firebase",Ci);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi extends Hr{constructor(e,t,n,s){const i=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!1,o={name:n,automaticDataCollectionEnabled:i};if(e.apiKey!==void 0)super(e,o,s);else{const c=e;super(c.options,o,s)}this._serverConfig=Object.assign({automaticDataCollectionEnabled:i},t),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,ee(qe,wt,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){Wr(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw D.create("server-app-deleted")}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye=Ii;function Pt(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:Se,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw D.create("bad-app-name",{appName:String(s)});if(t||(t=Lr()),!t)throw D.create("no-options");const i=re.get(s);if(i){if(Ge(t,i.options)&&Ge(n,i.config))return i;throw D.create("duplicate-app",{appName:s})}const o=new Mr(s);for(const a of me.values())o.addComponent(a);const c=new Hr(t,n,o);return re.set(s,c),c}function Ri(r,e){if(ms()&&!Nr())throw D.create("invalid-server-app-environment");e.automaticDataCollectionEnabled===void 0&&(e.automaticDataCollectionEnabled=!1);let t;Br(r)?t=r.options:t=r;const n=Object.assign(Object.assign({},e),t);n.releaseOnDeref!==void 0&&delete n.releaseOnDeref;const s=l=>[...l].reduce((h,d)=>Math.imul(31,h)+d.charCodeAt(0)|0,0);if(e.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw D.create("finalization-registry-not-supported",{});const i=""+s(JSON.stringify(n)),o=ge.get(i);if(o)return o.incRefCount(e.releaseOnDeref),o;const c=new Mr(i);for(const l of me.values())c.addComponent(l);const a=new Pi(t,e,i,c);return ge.set(i,a),a}function Vr(r=Se){const e=re.get(r);if(!e&&r===Se&&Lr())return Pt();if(!e)throw D.create("no-app",{appName:r});return e}function Oi(){return Array.from(re.values())}async function Wr(r){let e=!1;const t=r.name;re.has(t)?(e=!0,re.delete(t)):ge.has(t)&&r.decRefCount()<=0&&(ge.delete(t),e=!0),e&&(await Promise.all(r.container.getProviders().map(n=>n.delete())),r.isDeleted=!0)}function ee(r,e,t){var n;let s=(n=Ai[r])!==null&&n!==void 0?n:r;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),W.warn(c.join(" "));return}be(new pe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}function xi(r,e){if(r!==null&&typeof r!="function")throw D.create("invalid-log-argument");Us(r,e)}function Li(r){Ms(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Di="firebase-heartbeat-database",Ni=1,Te="firebase-heartbeat-store";let ht=null;function zr(){return ht||(ht=Ks(Di,Ni,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Te)}catch(t){console.warn(t)}}}}).catch(r=>{throw D.create("idb-open",{originalErrorMessage:r.message})})),ht}async function Mi(r){try{const t=(await zr()).transaction(Te),n=await t.objectStore(Te).get(Kr(r));return await t.done,n}catch(e){if(e instanceof K)W.warn(e.message);else{const t=D.create("idb-get",{originalErrorMessage:e?.message});W.warn(t.message)}}}async function Jt(r,e){try{const n=(await zr()).transaction(Te,"readwrite");await n.objectStore(Te).put(e,Kr(r)),await n.done}catch(t){if(t instanceof K)W.warn(t.message);else{const n=D.create("idb-set",{originalErrorMessage:t?.message});W.warn(n.message)}}}function Kr(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=1024,Fi=720*60*60*1e3;class ji{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Bi(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Yt();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=Fi}),this._storage.overwrite(this._heartbeatsCache))}catch(n){W.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Yt(),{heartbeatsToSend:n,unsentEntries:s}=$i(this._heartbeatsCache.heartbeats),i=Or(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return W.warn(t),""}}}function Yt(){return new Date().toISOString().substring(0,10)}function $i(r,e=Ui){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Xt(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Xt(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class Bi{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ws()?Es().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Mi(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Jt(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Jt(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Xt(r){return Or(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(r){be(new pe("platform-logger",e=>new Js(e),"PRIVATE")),be(new pe("heartbeat",e=>new ji(e),"PRIVATE")),ee(qe,wt,r),ee(qe,wt,"esm2017"),ee("fire-js","")}Hi("");const bl=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:K,SDK_VERSION:ye,_DEFAULT_ENTRY_NAME:Se,_addComponent:Et,_addOrOverwriteComponent:Si,_apps:re,_clearComponents:ki,_components:me,_getProvider:rt,_isFirebaseApp:Br,_isFirebaseServerApp:U,_registerComponent:be,_removeServiceInstance:Ti,_serverApps:ge,deleteApp:Wr,getApp:Vr,getApps:Oi,initializeApp:Pt,initializeServerApp:Ri,onLog:xi,registerVersion:ee,setLogLevel:Li},Symbol.toStringTag,{value:"Module"}));var Vi="firebase",Wi="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ee(Vi,Wi,"app");function Rt(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(t[n[s]]=r[n[s]]);return t}function Gr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zi=Gr,qr=new Re("auth","Firebase",Gr());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new Fr("@firebase/auth");function Ki(r,...e){Je.logLevel<=C.WARN&&Je.warn(`Auth (${ye}): ${r}`,...e)}function Ve(r,...e){Je.logLevel<=C.ERROR&&Je.error(`Auth (${ye}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r,...e){throw Ot(r,...e)}function F(r,...e){return Ot(r,...e)}function Jr(r,e,t){const n=Object.assign(Object.assign({},zi()),{[e]:t});return new Re("auth","Firebase",n).create(e,{appName:r.name})}function te(r){return Jr(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ot(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return qr.create(r,...e)}function A(r,e,...t){if(!r)throw Ot(e,...t)}function B(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Ve(e),new Error(e)}function z(r,e){r||B(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function Gi(){return Qt()==="http:"||Qt()==="https:"}function Qt(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qi(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Gi()||_s()||"connection"in navigator)?navigator.onLine:!0}function Ji(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t){this.shortDelay=e,this.longDelay=t,z(t>e,"Short delay should be less than long delay!"),this.isMobile=gs()||ys()}get(){return qi()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(r,e){z(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;B("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;B("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;B("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi=new xe(3e4,6e4);function se(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function ie(r,e,t,n,s={}){return Xr(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=Oe(Object.assign({key:r.config.apiKey},o)).slice(1),a=await r._getAdditionalHeaders();a["Content-Type"]="application/json",r.languageCode&&(a["X-Firebase-Locale"]=r.languageCode);const l=Object.assign({method:e,headers:a},i);return bs()||(l.referrerPolicy="no-referrer"),Yr.fetch()(Qr(r,r.config.apiHost,t,c),l)})}async function Xr(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},Yi),e);try{const s=new Zi(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw He(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[a,l]=c.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw He(r,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw He(r,"email-already-in-use",o);if(a==="USER_DISABLED")throw He(r,"user-disabled",o);const h=n[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Jr(r,h,l);M(r,h)}}catch(s){if(s instanceof K)throw s;M(r,"network-request-failed",{message:String(s)})}}async function Le(r,e,t,n,s={}){const i=await ie(r,e,t,n,s);return"mfaPendingCredential"in i&&M(r,"multi-factor-auth-required",{_serverResponse:i}),i}function Qr(r,e,t,n){const s=`${e}${t}?${n}`;return r.config.emulator?xt(r.config,s):`${r.config.apiScheme}://${s}`}function Qi(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Zi{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(F(this.auth,"network-request-failed")),Xi.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function He(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=F(r,e,n);return s.customData._tokenResponse=t,s}function Zt(r){return r!==void 0&&r.enterprise!==void 0}class eo{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Qi(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function to(r,e){return ie(r,"GET","/v2/recaptchaConfig",se(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ro(r,e){return ie(r,"POST","/v1/accounts:delete",e)}async function Zr(r,e){return ie(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function no(r,e=!1){const t=ne(r),n=await t.getIdToken(e),s=Lt(n);A(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:n,authTime:Ae(ft(s.auth_time)),issuedAtTime:Ae(ft(s.iat)),expirationTime:Ae(ft(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function ft(r){return Number(r)*1e3}function Lt(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Ve("JWT malformed, contained fewer than 3 sections"),null;try{const s=xr(t);return s?JSON.parse(s):(Ve("Failed to decode base64 JWT payload"),null)}catch(s){return Ve("Caught error parsing JWT payload as JSON",s?.toString()),null}}function er(r){const e=Lt(r);return A(e,"internal-error"),A(typeof e.exp<"u","internal-error"),A(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ke(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof K&&so(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function so({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ae(this.lastLoginAt),this.creationTime=Ae(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ye(r){var e;const t=r.auth,n=await r.getIdToken(),s=await ke(r,Zr(t,{idToken:n}));A(s?.users.length,t,"internal-error");const i=s.users[0];r._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?en(i.providerUserInfo):[],c=ao(r.providerData,o),a=r.isAnonymous,l=!(r.email&&i.passwordHash)&&!c?.length,h=a?l:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new At(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(r,d)}async function oo(r){const e=ne(r);await Ye(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ao(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function en(r){return r.map(e=>{var{providerId:t}=e,n=Rt(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function co(r,e){const t=await Xr(r,{},async()=>{const n=Oe({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=Qr(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Yr.fetch()(o,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lo(r,e){return ie(r,"POST","/v2/accounts:revokeToken",se(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){A(e.idToken,"internal-error"),A(typeof e.idToken<"u","internal-error"),A(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):er(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){A(e.length!==0,"internal-error");const t=er(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(A(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await co(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new ue;return n&&(A(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(A(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(A(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ue,this.toJSON())}_performRefresh(){return B("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(r,e){A(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class H{constructor(e){var{uid:t,auth:n,stsTokenManager:s}=e,i=Rt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new io(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new At(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await ke(this,this.stsTokenManager.getToken(this.auth,e));return A(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return no(this,e)}reload(){return oo(this)}_assign(e){this!==e&&(A(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new H(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){A(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Ye(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(U(this.auth.app))return Promise.reject(te(this.auth));const e=await this.getIdToken();return await ke(this,ro(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,s,i,o,c,a,l,h;const d=(n=t.displayName)!==null&&n!==void 0?n:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,b=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,E=(o=t.photoURL)!==null&&o!==void 0?o:void 0,p=(c=t.tenantId)!==null&&c!==void 0?c:void 0,m=(a=t._redirectEventId)!==null&&a!==void 0?a:void 0,u=(l=t.createdAt)!==null&&l!==void 0?l:void 0,v=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:T,emailVerified:R,isAnonymous:_,providerData:I,stsTokenManager:k}=t;A(T&&k,e,"internal-error");const w=ue.fromJSON(this.name,k);A(typeof T=="string",e,"internal-error"),q(d,e.name),q(g,e.name),A(typeof R=="boolean",e,"internal-error"),A(typeof _=="boolean",e,"internal-error"),q(b,e.name),q(E,e.name),q(p,e.name),q(m,e.name),q(u,e.name),q(v,e.name);const S=new H({uid:T,auth:e,email:g,emailVerified:R,displayName:d,isAnonymous:_,photoURL:E,phoneNumber:b,tenantId:p,stsTokenManager:w,createdAt:u,lastLoginAt:v});return I&&Array.isArray(I)&&(S.providerData=I.map(P=>Object.assign({},P))),m&&(S._redirectEventId=m),S}static async _fromIdTokenResponse(e,t,n=!1){const s=new ue;s.updateFromServerResponse(t);const i=new H({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Ye(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];A(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?en(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new ue;c.updateFromIdToken(n);const a=new H({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new At(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(a,l),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=new Map;function V(r){z(r instanceof Function,"Expected a class definition");let e=tr.get(r);return e?(z(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,tr.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}tn.type="NONE";const rr=tn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(r,e,t){return`firebase:${r}:${e}:${t}`}class he{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=We(this.userKey,s.apiKey,i),this.fullPersistenceKey=We("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?H._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new he(V(rr),e,n);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||V(rr);const o=We(n,e.config.apiKey,e.name);let c=null;for(const l of t)try{const h=await l._get(o);if(h){const d=H._fromJSON(e,h);l!==i&&(c=d),i=l;break}}catch{}const a=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!a.length?new he(i,e,n):(i=a[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new he(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nr(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(on(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(rn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(cn(e))return"Blackberry";if(ln(e))return"Webos";if(nn(e))return"Safari";if((e.includes("chrome/")||sn(e))&&!e.includes("edge/"))return"Chrome";if(an(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function rn(r=O()){return/firefox\//i.test(r)}function nn(r=O()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sn(r=O()){return/crios\//i.test(r)}function on(r=O()){return/iemobile/i.test(r)}function an(r=O()){return/android/i.test(r)}function cn(r=O()){return/blackberry/i.test(r)}function ln(r=O()){return/webos/i.test(r)}function Dt(r=O()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function uo(r=O()){var e;return Dt(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ho(){return vs()&&document.documentMode===10}function dn(r=O()){return Dt(r)||an(r)||ln(r)||cn(r)||/windows phone/i.test(r)||on(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(r,e=[]){let t;switch(r){case"Browser":t=nr(O());break;case"Worker":t=`${nr(O())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ye}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const a=e(i);o(a)}catch(a){c(a)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function po(r,e={}){return ie(r,"GET","/v2/passwordPolicy",se(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go=6;class mo{constructor(e){var t,n,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:go,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,s,i,o,c;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=(t=a.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),a.isValid&&(a.isValid=(n=a.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),a.isValid&&(a.isValid=(s=a.containsLowercaseLetter)!==null&&s!==void 0?s:!0),a.isValid&&(a.isValid=(i=a.containsUppercaseLetter)!==null&&i!==void 0?i:!0),a.isValid&&(a.isValid=(o=a.containsNumericCharacter)!==null&&o!==void 0?o:!0),a.isValid&&(a.isValid=(c=a.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),a}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new sr(this),this.idTokenSubscription=new sr(this),this.beforeStateQueue=new fo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=V(t)),this._initializationPromise=this.queue(async()=>{var n,s;if(!this._deleted&&(this.persistenceManager=await he.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Zr(this,{idToken:e}),n=await H._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(U(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===c)&&a?.user&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return A(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ye(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ji()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(U(this.app))return Promise.reject(te(this));const t=e?ne(e):null;return t&&A(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&A(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return U(this.app)?Promise.reject(te(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return U(this.app)?Promise.reject(te(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(V(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await po(this),t=new mo(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Re("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await lo(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&V(e)||this._popupRedirectResolver;A(t,this,"argument-error"),this.redirectPersistenceManager=await he.create(this,[V(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(A(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const a=e.addObserver(t,n,s);return()=>{o=!0,a()}}else{const a=e.addObserver(t);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return A(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=un(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Ki(`Error while retrieving App Check token: ${t.error}`),t?.token}}function De(r){return ne(r)}class sr{constructor(e){this.auth=e,this.observer=null,this.addObserver=ks(t=>this.observer=t)}get next(){return A(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nt={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _o(r){nt=r}function hn(r){return nt.loadJS(r)}function yo(){return nt.recaptchaEnterpriseScript}function vo(){return nt.gapiScript}function wo(r){return`__${r}${Math.floor(Math.random()*1e6)}`}const Eo="recaptcha-enterprise",Io="NO_RECAPTCHA";class Ao{constructor(e){this.type=Eo,this.auth=De(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{to(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(a=>{if(a.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new eo(a);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(a=>{c(a)})})}function s(i,o,c){const a=window.grecaptcha;Zt(a)?a.enterprise.ready(()=>{a.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(Io)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{n(this.auth).then(c=>{if(!t&&Zt(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let a=yo();a.length!==0&&(a+=c),hn(a).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function ir(r,e,t,n=!1){const s=new Ao(r);let i;try{i=await s.verify(t)}catch{i=await s.verify(t,!0)}const o=Object.assign({},e);return n?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function or(r,e,t,n){var s;if(!((s=r._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await ir(r,e,t,t==="getOobCode");return n(r,i)}else return n(r,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await ir(r,e,t,t==="getOobCode");return n(r,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function So(r,e){const t=rt(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Ge(i,e??{}))return s;M(s,"already-initialized")}return t.initialize({options:e})}function To(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(V);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function ko(r,e,t){const n=De(r);A(n._canInitEmulator,n,"emulator-config-failed"),A(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=fn(e),{host:o,port:c}=Co(e),a=c===null?"":`:${c}`;n.config.emulator={url:`${i}//${o}${a}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Po()}function fn(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function Co(r){const e=fn(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:ar(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:ar(o)}}}function ar(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function Po(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return B("not implemented")}_getIdTokenResponse(e){return B("not implemented")}_linkToIdToken(e,t){return B("not implemented")}_getReauthenticationResolver(e){return B("not implemented")}}async function Ro(r,e){return ie(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oo(r,e){return Le(r,"POST","/v1/accounts:signInWithPassword",se(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xo(r,e){return Le(r,"POST","/v1/accounts:signInWithEmailLink",se(r,e))}async function Lo(r,e){return Le(r,"POST","/v1/accounts:signInWithEmailLink",se(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce extends Nt{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ce(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Ce(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return or(e,t,"signInWithPassword",Oo);case"emailLink":return xo(e,{email:this._email,oobCode:this._password});default:M(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return or(e,n,"signUpPassword",Ro);case"emailLink":return Lo(e,{idToken:t,email:this._email,oobCode:this._password});default:M(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fe(r,e){return Le(r,"POST","/v1/accounts:signInWithIdp",se(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="http://localhost";class ae extends Nt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ae(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):M("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s}=t,i=Rt(t,["providerId","signInMethod"]);if(!n||!s)return null;const o=new ae(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return fe(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,fe(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,fe(e,t)}buildRequest(){const e={requestUri:Do,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Oe(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Mo(r){const e=Ee(Ie(r)).link,t=e?Ee(Ie(e)).deep_link_id:null,n=Ee(Ie(r)).deep_link_id;return(n?Ee(Ie(n)).link:null)||n||t||e||r}class Mt{constructor(e){var t,n,s,i,o,c;const a=Ee(Ie(e)),l=(t=a.apiKey)!==null&&t!==void 0?t:null,h=(n=a.oobCode)!==null&&n!==void 0?n:null,d=No((s=a.mode)!==null&&s!==void 0?s:null);A(l&&h&&d,"argument-error"),this.apiKey=l,this.operation=d,this.code=h,this.continueUrl=(i=a.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=a.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=a.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Mo(e);try{return new Mt(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(){this.providerId=Ne.PROVIDER_ID}static credential(e,t){return Ce._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Mt.parseLink(t);return A(n,"argument-error"),Ce._fromEmailAndCode(e,n.code,n.tenantId)}}Ne.PROVIDER_ID="password";Ne.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ne.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me extends pn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J extends Me{constructor(){super("facebook.com")}static credential(e){return ae._fromParams({providerId:J.PROVIDER_ID,signInMethod:J.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return J.credentialFromTaggedObject(e)}static credentialFromError(e){return J.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return J.credential(e.oauthAccessToken)}catch{return null}}}J.FACEBOOK_SIGN_IN_METHOD="facebook.com";J.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y extends Me{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ae._fromParams({providerId:Y.PROVIDER_ID,signInMethod:Y.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Y.credentialFromTaggedObject(e)}static credentialFromError(e){return Y.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Y.credential(t,n)}catch{return null}}}Y.GOOGLE_SIGN_IN_METHOD="google.com";Y.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X extends Me{constructor(){super("github.com")}static credential(e){return ae._fromParams({providerId:X.PROVIDER_ID,signInMethod:X.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return X.credentialFromTaggedObject(e)}static credentialFromError(e){return X.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return X.credential(e.oauthAccessToken)}catch{return null}}}X.GITHUB_SIGN_IN_METHOD="github.com";X.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q extends Me{constructor(){super("twitter.com")}static credential(e,t){return ae._fromParams({providerId:Q.PROVIDER_ID,signInMethod:Q.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Q.credentialFromTaggedObject(e)}static credentialFromError(e){return Q.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Q.credential(t,n)}catch{return null}}}Q.TWITTER_SIGN_IN_METHOD="twitter.com";Q.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await H._fromIdTokenResponse(e,n,s),o=cr(n);return new ce({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=cr(n);return new ce({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function cr(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends K{constructor(e,t,n,s){var i;super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Xe.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Xe(e,t,n,s)}}function gn(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Xe._fromErrorAndOperation(r,i,e,n):i})}async function Uo(r,e,t=!1){const n=await ke(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return ce._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fo(r,e,t=!1){const{auth:n}=r;if(U(n.app))return Promise.reject(te(n));const s="reauthenticate";try{const i=await ke(r,gn(n,s,e,r),t);A(i.idToken,n,"internal-error");const o=Lt(i.idToken);A(o,n,"internal-error");const{sub:c}=o;return A(r.uid===c,n,"user-mismatch"),ce._forOperation(r,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&M(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jo(r,e,t=!1){if(U(r.app))return Promise.reject(te(r));const n="signIn",s=await gn(r,n,e),i=await ce._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $o(r,e){return Le(r,"POST","/v1/accounts:signInWithCustomToken",se(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _l(r,e){if(U(r.app))return Promise.reject(te(r));const t=De(r),n=await $o(t,{token:e,returnSecureToken:!0}),s=await ce._fromIdTokenResponse(t,"signIn",n);return await t._updateCurrentUser(s.user),s}function Bo(r,e,t,n){return ne(r).onIdTokenChanged(e,t,n)}function Ho(r,e,t){return ne(r).beforeAuthStateChanged(e,t)}function Vo(r,e,t,n){return ne(r).onAuthStateChanged(e,t,n)}function Wo(r){return ne(r).signOut()}const Qe="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Qe,"1"),this.storage.removeItem(Qe),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo=1e3,Ko=10;class bn extends mn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=dn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,a)=>{this.notifyListeners(o,a)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);ho()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ko):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},zo)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}bn.type="LOCAL";const Go=bn;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends mn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}_n.type="SESSION";const yn=_n;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new st(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),a=await qo(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:a})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}st.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,a)=>{const l=Ut("",20);s.port1.start();const h=setTimeout(()=>{a(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(d){const g=d;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(h),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(){return window}function Yo(r){j().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(){return typeof j().WorkerGlobalScope<"u"&&typeof j().importScripts=="function"}async function Xo(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Qo(){var r;return((r=navigator?.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function Zo(){return vn()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn="firebaseLocalStorageDb",ea=1,Ze="firebaseLocalStorage",En="fbase_key";class Ue{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function it(r,e){return r.transaction([Ze],e?"readwrite":"readonly").objectStore(Ze)}function ta(){const r=indexedDB.deleteDatabase(wn);return new Ue(r).toPromise()}function St(){const r=indexedDB.open(wn,ea);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Ze,{keyPath:En})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Ze)?e(n):(n.close(),await ta(),e(await St()))})})}async function lr(r,e,t){const n=it(r,!0).put({[En]:e,value:t});return new Ue(n).toPromise()}async function ra(r,e){const t=it(r,!1).get(e),n=await new Ue(t).toPromise();return n===void 0?null:n.value}function dr(r,e){const t=it(r,!0).delete(e);return new Ue(t).toPromise()}const na=800,sa=3;class In{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await St(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>sa)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return vn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=st._getInstance(Zo()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Xo(),!this.activeServiceWorker)return;this.sender=new Jo(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Qo()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await St();return await lr(e,Qe,"1"),await dr(e,Qe),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>lr(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>ra(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>dr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=it(s,!1).getAll();return new Ue(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),na)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}In.type="LOCAL";const ia=In;new xe(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(r,e){return e?V(e):(A(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends Nt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return fe(e,this._buildIdpRequest())}_linkToIdToken(e,t){return fe(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return fe(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function aa(r){return jo(r.auth,new Ft(r),r.bypassAuthState)}function ca(r){const{auth:e,user:t}=r;return A(t,e,"internal-error"),Fo(t,new Ft(r),r.bypassAuthState)}async function la(r){const{auth:e,user:t}=r;return A(t,e,"internal-error"),Uo(t,new Ft(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(a))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return aa;case"linkViaPopup":case"linkViaRedirect":return la;case"reauthViaPopup":case"reauthViaRedirect":return ca;default:M(this.auth,"internal-error")}}resolve(e){z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=new xe(2e3,1e4);class de extends An{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,de.currentPopupAction&&de.currentPopupAction.cancel(),de.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return A(e,this.auth,"internal-error"),e}async onExecution(){z(this.filter.length===1,"Popup operations only handle one event");const e=Ut();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,de.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,da.get())};e()}}de.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua="pendingRedirect",ze=new Map;class ha extends An{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=ze.get(this.auth._key());if(!e){try{const n=await fa(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}ze.set(this.auth._key(),e)}return this.bypassAuthState||ze.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function fa(r,e){const t=ma(e),n=ga(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function pa(r,e){ze.set(r._key(),e)}function ga(r){return V(r._redirectPersistence)}function ma(r){return We(ua,r.config.apiKey,r.name)}async function ba(r,e,t=!1){if(U(r.app))return Promise.reject(te(r));const n=De(r),s=oa(n,e),o=await new ha(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a=600*1e3;class ya{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!va(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Sn(e)){const s=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(F(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_a&&this.cachedEventUids.clear(),this.cachedEventUids.has(ur(e))}saveEventToCache(e){this.cachedEventUids.add(ur(e)),this.lastProcessedEventTime=Date.now()}}function ur(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Sn({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function va(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Sn(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wa(r,e={}){return ie(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ia=/^https?/;async function Aa(r){if(r.config.emulator)return;const{authorizedDomains:e}=await wa(r);for(const t of e)try{if(Sa(t))return}catch{}M(r,"unauthorized-domain")}function Sa(r){const e=It(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!Ia.test(t))return!1;if(Ea.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ta=new xe(3e4,6e4);function hr(){const r=j().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function ka(r){return new Promise((e,t)=>{var n,s,i;function o(){hr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{hr(),t(F(r,"network-request-failed"))},timeout:Ta.get()})}if(!((s=(n=j().gapi)===null||n===void 0?void 0:n.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=j().gapi)===null||i===void 0)&&i.load)o();else{const c=wo("iframefcb");return j()[c]=()=>{gapi.load?o():t(F(r,"network-request-failed"))},hn(`${vo()}?onload=${c}`).catch(a=>t(a))}}).catch(e=>{throw Ke=null,e})}let Ke=null;function Ca(r){return Ke=Ke||ka(r),Ke}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa=new xe(5e3,15e3),Ra="__/auth/iframe",Oa="emulator/auth/iframe",xa={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},La=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Da(r){const e=r.config;A(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?xt(e,Oa):`https://${r.config.authDomain}/${Ra}`,n={apiKey:e.apiKey,appName:r.name,v:ye},s=La.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Oe(n).slice(1)}`}async function Na(r){const e=await Ca(r),t=j().gapi;return A(t,r,"internal-error"),e.open({where:document.body,url:Da(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:xa,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=F(r,"network-request-failed"),c=j().setTimeout(()=>{i(o)},Pa.get());function a(){j().clearTimeout(c),s(n)}n.ping(a).then(a,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ua=500,Fa=600,ja="_blank",$a="http://localhost";class fr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ba(r,e,t,n=Ua,s=Fa){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const a=Object.assign(Object.assign({},Ma),{width:n.toString(),height:s.toString(),top:i,left:o}),l=O().toLowerCase();t&&(c=sn(l)?ja:t),rn(l)&&(e=e||$a,a.scrollbars="yes");const h=Object.entries(a).reduce((g,[b,E])=>`${g}${b}=${E},`,"");if(uo(l)&&c!=="_self")return Ha(e||"",c),new fr(null);const d=window.open(e||"",c,h);A(d,r,"popup-blocked");try{d.focus()}catch{}return new fr(d)}function Ha(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="__/auth/handler",Wa="emulator/auth/handler",za=encodeURIComponent("fac");async function pr(r,e,t,n,s,i){A(r.config.authDomain,r,"auth-domain-config-required"),A(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:ye,eventId:s};if(e instanceof pn){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",Ts(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof Me){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const h of Object.keys(c))c[h]===void 0&&delete c[h];const a=await r._getAppCheckToken(),l=a?`#${za}=${encodeURIComponent(a)}`:"";return`${Ka(r)}?${Oe(c).slice(1)}${l}`}function Ka({config:r}){return r.emulator?xt(r,Wa):`https://${r.authDomain}/${Va}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="webStorageSupport";class Ga{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=yn,this._completeRedirectFn=ba,this._overrideRedirectResult=pa}async _openPopup(e,t,n,s){var i;z((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await pr(e,t,n,It(),s);return Ba(e,o,Ut())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await pr(e,t,n,It(),s);return Yo(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(z(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Na(e),n=new ya(e);return t.register("authEvent",s=>(A(s?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(pt,{type:pt},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[pt];o!==void 0&&t(!!o),M(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Aa(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return dn()||nn()||Dt()}}const qa=Ga;var gr="@firebase/auth",mr="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){A(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Xa(r){be(new pe("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;A(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:un(r)},l=new bo(n,s,i,a);return To(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),be(new pe("auth-internal",e=>{const t=De(e.getProvider("auth").getImmediate());return(n=>new Ja(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ee(gr,mr,Ya(r)),ee(gr,mr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa=300,Za=Dr("authIdTokenMaxAge")||Qa;let br=null;const ec=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Za)return;const s=t?.token;br!==s&&(br=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function tc(r=Vr()){const e=rt(r,"auth");if(e.isInitialized())return e.getImmediate();const t=So(r,{popupRedirectResolver:qa,persistence:[ia,Go,yn]}),n=Dr("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=ec(i.toString());Ho(t,o,()=>o(t.currentUser)),Bo(t,c=>o(c))}}const s=fs("auth");return s&&ko(t,`http://${s}`),t}function rc(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}_o({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=F("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",rc().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Xa("Browser");const nc=Pt(rs),gt=tc(nc),Tn=f.createContext(null),sc=({children:r})=>{const[e,t]=f.useState(null),[n,s]=f.useState(null),[i,o]=f.useState(!1),[c,a]=f.useState(!1),h=et()?.socket;f.useEffect(()=>{if(h&&e)return h.on("balanceUpdated",p=>{if(console.log("[AuthContext] Received balanceUpdated event:",p),p&&typeof p.balance=="number"){console.log(`[AuthContext] Updating user balance from ${e?.balance} to ${p.balance}`);const m={...e,balance:p.balance};t(m)}else console.warn("[AuthContext] Received invalid balance data:",p)}),()=>{h.off("balanceUpdated")}},[h,e]);const d=async p=>{try{if(!p)return null;const m=await fetch(`${kr}/auth/me`,{method:"GET",headers:{Authorization:`Bearer ${p}`,"Content-Type":"application/json"}});if(!m.ok)throw new Error("Failed to fetch user data");return(await m.json()).user}catch(m){return console.error("[Auth] Error fetching user data:",m),null}};f.useEffect(()=>{const p=Vo(gt,async m=>{if(m)try{const u=await m.getIdToken();s(u);const v=await d(u);v?t(v):(console.error("[Auth] Failed to fetch user data for Firebase user"),t(null),s(null))}catch(u){console.error("[Auth] Error getting Firebase token or user data:",u),t(null),s(null)}else t(null),s(null)});return()=>p()},[]);const g=async(p,m)=>{if(!p||!p.username||!p.id||typeof p.balance!="number")throw console.error("[Auth] Invalid user data:",p),new Error("Invalid user data provided");if(!m)throw console.error("[Auth] No token provided"),new Error("No authentication token provided");try{const u={username:p.username,id:p.id,balance:p.balance};t(u),s(m),a(!0);const v=await d(m);v&&t(v)}catch(u){throw console.error("[Auth] Error during login:",u),u}},b=f.useCallback(async()=>{try{await Wo(gt),t(null),s(null),a(!1)}catch(p){console.error("[Auth] Error during logout:",p)}},[]),E=f.useCallback(async()=>{try{const p=gt.currentUser;if(!p){console.error("[Auth] No Firebase user found. Logging out."),b();return}const m=await p.getIdToken(!0);s(m);const u=await d(m);u?t(u):(console.error("[Auth] Failed to refresh user data. Logging out."),b())}catch(p){console.error("[Auth] Error during manual refresh. Logging out.",p),b()}},[b]);return i?null:y.jsx(Tn.Provider,{value:{user:e,token:n,login:g,logout:b,refreshUserData:E,loading:i},children:r})},ot=()=>{const r=f.useContext(Tn);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r},kn=f.createContext(),yl=()=>f.useContext(kn),ic=({children:r})=>{const{socket:e,isConnected:t}=et(),[n,s]=f.useState([]),[i,o]=f.useState(!0),[c,a]=f.useState(null);f.useEffect(()=>{if(!e||!t)return;const h=g=>{s(g),o(!1)},d=g=>{console.error("[LobbyContext] Socket error:",g.message||g),a(g.message||"An error occurred"),o(!1)};return e.on("gameList",h),e.on("error",d),e.emit("getGameList"),()=>{e.off("gameList",h),e.off("error",d)}},[e,t]);const l={gameList:n,loading:i,error:c};return y.jsx(kn.Provider,{value:l,children:r})},oc=f.lazy(()=>Pe(()=>import("./FirebaseAuthPage-c3dWgofj.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]),import.meta.url)),ac=f.lazy(()=>Pe(()=>import("./AuthPage-BZ4qM4xT.js"),__vite__mapDeps([10,1,2,3,4,5,6,7,8,11]),import.meta.url)),cc=f.lazy(()=>Pe(()=>import("./Lobby-BNY5KnAi.js"),__vite__mapDeps([12,1,2,5,6,13,14,7,8,15]),import.meta.url)),lc=f.lazy(()=>Pe(()=>import("./GameRoom-D1RAgz0l.js"),__vite__mapDeps([16,1,13,14,2,7,8,17]),import.meta.url)),_r=({children:r})=>{const{user:e,loading:t}=ot();return t?y.jsx(we,{message:"Checking authentication..."}):e?r:y.jsx(Sr,{to:"/auth",replace:!0})},dc=Un([{path:"/",element:y.jsx(_r,{children:y.jsx(ic,{children:y.jsx(f.Suspense,{fallback:y.jsx(we,{message:"Loading..."}),children:y.jsx(cc,{})})})})},{path:"/auth",element:y.jsx(f.Suspense,{fallback:y.jsx(we,{message:"Loading..."}),children:y.jsx(oc,{})})},{path:"/migrate",element:y.jsx(f.Suspense,{fallback:y.jsx(we,{message:"Loading..."}),children:y.jsx(ac,{})})},{path:"/:gameId",element:y.jsx(_r,{children:y.jsx(f.Suspense,{fallback:y.jsx(we,{message:"Loading..."}),children:y.jsx(lc,{})})})},{path:"*",element:y.jsx(Sr,{to:"/",replace:!0})}]),uc=()=>{const[r,e]=f.useState(!1),[t,n]=f.useState(null),[s,i]=f.useState("text"),[o,c]=f.useState(""),[a,l]=f.useState(!1);f.useEffect(()=>{const p=()=>{const u=document.body.classList.contains("gamepad-navigation-active");l(u)};p();const m=new MutationObserver(p);return m.observe(document.body,{attributes:!0,attributeFilter:["class"]}),()=>m.disconnect()},[]);const h=f.useCallback((p,m="text",u="")=>{p&&(n(p),i(m),c(u),e(!0),p.blur())},[]),d=f.useCallback(()=>{e(!1),n(null),i("text"),c("")},[]),g=f.useCallback(p=>{if(!t)return;Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,p||"");const u=new Event("input",{bubbles:!0});t.dispatchEvent(u);const v=new Event("change",{bubbles:!0});t.dispatchEvent(v),d()},[t,d]),b=f.useCallback((p,m="text",u="")=>{if(!p)return;let v=p;p.querySelector&&p.querySelector("input")&&(v=p.querySelector("input"));const T=R=>{a&&document.body.classList.contains("gamepad-navigation-active")&&(R.preventDefault(),h(v,m,u))};return v.addEventListener("click",T),()=>{v.removeEventListener("click",T)}},[a,h]),E=f.useCallback(()=>t?.value||"",[t]);return{isVisible:r,inputType:s,keyboardTitle:o,currentInput:t,isGamepadActive:a,showKeyboard:h,hideKeyboard:d,handleEnter:g,enhanceInput:b,getCurrentInputValue:E}},hc="_overlay_12fs3_1",fc="_modal_12fs3_17",pc="_header_12fs3_38",gc="_closeButton_12fs3_55",mc="_sectionHeader_12fs3_74",bc="_settingDescription_12fs3_90",_c="_errorMessage_12fs3_112",yc="_content_12fs3_122",vc="_footer_12fs3_151",le={overlay:hc,modal:fc,header:pc,closeButton:gc,sectionHeader:mc,settingDescription:bc,errorMessage:_c,content:yc,footer:vc};let yr=0;function wc({title:r,onClose:e,children:t,footer:n,headerButtons:s,className:i="",overlayStyle:o,...c}){f.useEffect(()=>(++yr===1&&document.body.classList.add("modal-open"),()=>{--yr===0&&document.body.classList.remove("modal-open")}),[]);const a=y.jsx("div",{className:le.overlay,style:o,onClick:e,children:y.jsxs("div",{className:`${le.modal} ${i}`,onClick:l=>l.stopPropagation(),...c,children:[r&&y.jsxs("div",{className:le.header,children:[y.jsx("h2",{children:r}),y.jsxs("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center"},children:[s,y.jsx("button",{className:le.closeButton,onClick:e,"aria-label":"Close",type:"button","data-gamepad-focusable":"true",children:"×"})]})]}),y.jsx("div",{className:le.content,children:t}),n&&y.jsx("div",{className:le.footer,children:n})]})});return Fn.createPortal(a,document.body)}const Ec="_keyboardModal_nsw4g_2",Ic="_inputDisplay_nsw4g_7",Ac="_tempInput_nsw4g_12",Sc="_keyboardGrid_nsw4g_37",Tc="_keyRow_nsw4g_41",kc="_key_nsw4g_2",Cc="_specialKey_nsw4g_87",Pc="_spaceKey_nsw4g_98",Rc="_activeShift_nsw4g_103",$={keyboardModal:Ec,inputDisplay:Ic,tempInput:Ac,keyboardGrid:Sc,keyRow:Tc,key:kc,specialKey:Cc,spaceKey:Pc,activeShift:Rc},Oc=({isVisible:r,onClose:e,onEnter:t,inputType:n="text",initialValue:s=""})=>{const{keyboardTitle:i}=xc(),[o,c]=f.useState("lowercase"),[a,l]=f.useState("");f.useEffect(()=>{l(r?n==="number"?s&&s!=="0"?s:"":s||"":"")},[r,s,n]);const g={lowercase:[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["shift","z","x","c","v","b","n","m","backspace"],["space","enter"]],uppercase:[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["shift","Z","X","C","V","B","N","M","backspace"],["space","enter"]],numbers:[["1","2","3"],["4","5","6"],["7","8","9"],["0","backspace"],["enter"]]}[n==="number"?"numbers":o],b=f.useCallback(m=>{switch(m){case"shift":c(u=>u==="lowercase"?"uppercase":"lowercase");break;case"backspace":l(u=>u.slice(0,-1));break;case"enter":t?.(a);break;case"space":l(u=>u+" ");break;default:l(u=>u+m);break}},[t,a]),E=m=>{switch(m){case"shift":return"⇧";case"backspace":return"⌫";case"space":return"Space";case"enter":return"↵";default:return m}},p=m=>{let u=$.key;return["shift","backspace","space","enter"].includes(m)&&(u+=` ${$.specialKey}`),m==="space"&&(u+=` ${$.spaceKey}`),m==="shift"&&o==="uppercase"&&(u+=` ${$.activeShift}`),u};return f.useEffect(()=>{if(r){const m=u=>{u.key==="Escape"&&(u.preventDefault(),e?.())};return document.addEventListener("keydown",m),()=>{document.removeEventListener("keydown",m)}}},[r,e]),r?y.jsxs(wc,{title:i||(n==="number"?"Number Pad":"Virtual Keyboard"),onClose:e,className:$.keyboardModal,overlayStyle:{zIndex:1300},children:[y.jsx("div",{className:$.inputDisplay,children:y.jsx("input",{type:n==="password"?"password":"text",value:a,className:$.tempInput,readOnly:!0,placeholder:"Type below..."})}),y.jsx("div",{className:$.keyboardGrid,children:g.map((m,u)=>y.jsx("div",{className:$.keyRow,children:m.map((v,T)=>y.jsx("button",{className:p(v),onClick:()=>b(v),"data-gamepad-focusable":"true","aria-label":v==="backspace"?"Backspace":v==="enter"?"Enter":v==="space"?"Space":v==="shift"?"Shift":v,children:E(v)},`${u}-${T}`))},u))})]}):null},Cn=f.createContext(),xc=()=>{const r=f.useContext(Cn);if(!r)throw new Error("useVirtualKeyboardContext must be used within a VirtualKeyboardProvider");return r},Lc=({children:r})=>{const e=uc(),{isVisible:t,inputType:n,hideKeyboard:s,handleEnter:i,getCurrentInputValue:o}=e;return y.jsxs(Cn.Provider,{value:e,children:[r,t&&y.jsx(Oc,{isVisible:t,inputType:n,initialValue:o(),onClose:s,onEnter:i})]})},Dc="_toast_1g2ii_1",Nc="_slideOut_1g2ii_32",Mc="_iconWrapper_1g2ii_47",Uc="_icon_1g2ii_47",Fc="_emojiIcon_1g2ii_62",jc="_content_1g2ii_76",$c="_title_1g2ii_83",Bc="_message_1g2ii_90",Hc="_emojiMessage_1g2ii_98",Vc="_playerName_1g2ii_105",Wc="_reactionText_1g2ii_111",zc="_emojiReaction_1g2ii_117",Kc="_closeButton_1g2ii_135",L={toast:Dc,slideOut:Nc,iconWrapper:Mc,icon:Uc,emojiIcon:Fc,content:jc,title:$c,message:Bc,emojiMessage:Hc,playerName:Vc,reactionText:Wc,emojiReaction:zc,closeButton:Kc},Gc=({title:r,message:e,emoji:t="ℹ",color:n="#3498db",duration:s=4e3,onClose:i,position:o})=>{const[c,a]=f.useState(!0);f.useEffect(()=>{if(s>0){const h=setTimeout(()=>{a(!1),setTimeout(i,300)},s);return()=>clearTimeout(h)}},[s,i]);const l=!r&&t!=="ℹ";return y.jsxs("div",{className:`${L.toast} ${l&&c?L.emojiReaction:""} ${c?"":L.slideOut}`,style:{top:"max(20px, var(--safe-area-inset-top))",zIndex:1e4+o,borderColor:n},children:[y.jsx("div",{className:L.iconWrapper,children:y.jsx("span",{className:`${L.icon} ${l?L.emojiIcon:""}`,style:{color:n,textShadow:l?`0 0 20px ${n}, 0 0 40px ${n}60`:`0 0 8px ${n}80`},children:t})}),y.jsxs("div",{className:L.content,children:[r&&y.jsx("div",{className:L.title,children:r}),y.jsx("div",{className:`${L.message} ${l?L.emojiMessage:""}`,children:l?y.jsxs(y.Fragment,{children:[y.jsx("span",{className:L.playerName,children:e}),y.jsx("span",{className:L.reactionText,children:"reacted!"})]}):e})]}),y.jsx("button",{className:L.closeButton,onClick:i,"aria-label":"Close notification",children:"×"})]})},qc=f.createContext(),Jc=({children:r})=>{const[e,t]=f.useState([]),[n,s]=f.useState([]),[i,o]=f.useState(0),{socket:c}=et(),a=f.useCallback((u,v,T="ℹ",R="#3498db",_=4e3)=>{const I=Date.now()+Math.random(),k={id:I,title:u,message:v,emoji:T,color:R,duration:_},w=Date.now();return w-i>=600?(t(P=>[...P,k]),o(w)):s(P=>[...P,k]),I},[i]),l=f.useCallback(u=>{t(v=>v.filter(T=>T.id!==u))},[]),h=f.useCallback((u,v,T)=>a(u,v,"✓","#27ae60",T),[a]),d=f.useCallback((u,v,T)=>a(u,v,"✕","#e74c3c",T),[a]),g=f.useCallback((u,v,T)=>a(u,v,"⚠","#f39c12",T),[a]),b=f.useCallback((u,v,T)=>a(u,v,"ℹ","#3498db",T),[a]),E=f.useCallback((u,v,T)=>a(u,v,"🎮","#9b59b6",T),[a]),p=f.useCallback((u,v,T)=>a(u,v,"💰","#16a085",T),[a]);f.useEffect(()=>{if(n.length===0)return;const u=setTimeout(()=>{const v=n[0];s(T=>T.slice(1)),t(T=>[...T,v]),o(Date.now())},600);return()=>clearTimeout(u)},[n,e]),f.useEffect(()=>{if(!c)return;const u=v=>{a(v.title||"",v.message,v.emoji||"ℹ",v.color||"#3498db",v.duration)};return c.on("toast",u),()=>{c.off("toast",u)}},[c,a]);const m={addToast:a,removeToast:l,showSuccess:h,showError:d,showWarning:g,showInfo:b,showGameEvent:E,showMoneyEvent:p,toasts:e};return y.jsxs(qc.Provider,{value:m,children:[r,y.jsx("div",{className:"toast-container",style:{position:"fixed",top:0,right:0,zIndex:1e4},children:e.map((u,v)=>y.jsx(Gc,{title:u.title,message:u.message,emoji:u.emoji,color:u.color,duration:u.duration,position:v,onClose:()=>l(u.id)},u.id))})]})};function Yc(){return f.useEffect(()=>{_t.initialize()},[]),y.jsx(Jc,{children:y.jsx(Lc,{children:y.jsx(jn,{router:dc})})})}const vr={default:{"--bg-primary":"#1a2a3a","--bg-secondary":"#2c3e50","--bg-card":"#152534","--bg-card-dark":"#1c2a3a","--bg-panel-start":"#1e2a38","--bg-panel-end":"#2980b9","--bg-loading":"#1a1a2e","--text-primary":"#ecf0f1","--text-secondary":"#bdc3c7","--text-dark":"#2c3e50","--text-light":"#ecf0f1","--text-muted":"#7f8c8d","--text-white":"#ffffff","--text-gray":"#666666","--text-error":"#e74c3c","--text-success":"#2ecc71","--text-warning":"#f1c40f","--text-info":"#3498db","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#3498db","--info-dark":"#2980b9","--info-light":"#5dade2","--success":"#2ecc71","--success-dark":"#27ae60","--success-light":"#58d68d","--btn-primary-start":"#3498db","--btn-primary-end":"#27ae60","--btn-primary-hover-start":"#3fa9e5","--btn-primary-hover-end":"#2ecc71","--btn-secondary-start":"rgba(52, 73, 94, 0.9)","--btn-secondary-end":"rgba(44, 62, 80, 0.9)","--btn-secondary-hover-start":"rgba(52, 73, 94, 1)","--btn-secondary-hover-end":"rgba(44, 62, 80, 1)","--btn-tertiary-start":"#3498db","--btn-tertiary-end":"#2980b9","--btn-tertiary-hover-start":"#5faee3","--btn-tertiary-hover-end":"#3498db","--btn-tertiary-shadow":"rgba(52, 152, 219, 0.3)","--color-focus":"#00ff88","--color-focus-shadow":"rgba(0, 255, 136, 0.3)","--color-divider-start":"rgba(52, 152, 219, 0.2)","--color-divider-middle":"rgba(52, 152, 219, 0.8)","--color-divider-end":"rgba(52, 152, 219, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#3498db","--accent3":"#00ff88","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(10, 25, 47, 0.95)","--input-bg-hover":"rgba(15, 35, 60, 0.98)","--input-bg-focus":"rgba(20, 40, 70, 1)","--input-text-color":"#ecf0f1","--input-border-color":"rgba(51, 65, 85, 0.7)","--color-glass-dark":"rgba(0, 0, 0, 0.3)","--color-glass-light":"rgba(0, 0, 0, 0.1)"},light:{"--bg-primary":"#f8f9fa","--bg-secondary":"#e9ecef","--bg-card":"#ffffff","--bg-card-dark":"#f1f3f5","--bg-panel-start":"#dee2e6","--bg-panel-end":"#ced4da","--bg-loading":"#e9ecef","--text-primary":"#212529","--text-secondary":"#495057","--text-dark":"#212529","--text-light":"#212529","--text-muted":"#6c757d","--text-white":"#ffffff","--text-gray":"#6c757d","--text-error":"#dc3545","--text-success":"#28a745","--text-warning":"#ffc107","--text-info":"#17a2b8","--text-faded":"rgba(33, 37, 41, 0.6)","--text-subtle":"rgba(33, 37, 41, 0.75)","--text-bright":"rgba(33, 37, 41, 0.9)","--info":"#17a2b8","--info-dark":"#138496","--info-light":"#20c997","--color-glass-dark":"rgba(248, 249, 250, 1)","--color-glass-light":"rgba(233, 236, 239, 0.8)","--success":"#28a745","--success-dark":"#218838","--success-light":"#38c757","--btn-primary-start":"#007bff","--btn-primary-end":"#0056b3","--btn-primary-hover-start":"#0069d9","--btn-primary-hover-end":"#004085","--btn-secondary-start":"rgba(108, 117, 125, 0.2)","--btn-secondary-end":"rgba(73, 80, 87, 0.2)","--btn-secondary-hover-start":"rgba(108, 117, 125, 0.3)","--btn-secondary-hover-end":"rgba(73, 80, 87, 0.3)","--btn-tertiary-start":"#6c757d","--btn-tertiary-end":"#545b62","--btn-tertiary-hover-start":"#5a6268","--btn-tertiary-hover-end":"#454d55","--btn-tertiary-shadow":"rgba(108, 117, 125, 0.3)","--color-focus":"#007bff","--color-focus-shadow":"rgba(0, 123, 255, 0.25)","--color-border-light":"rgba(0, 0, 0, 0.175)","--color-border-lighter":"rgba(0, 0, 0, 0.125)","--color-divider-start":"rgba(0, 123, 255, 0.15)","--color-divider-middle":"rgba(0, 123, 255, 0.5)","--color-divider-end":"rgba(0, 123, 255, 0.15)","--accent":"#ffc107","--accent-dark":"#e0a800","--accent2":"#17a2b8","--accent3":"#28a745","--secondary":"#6c757d","--secondary-dark":"#545b62","--input-bg":"#ffffff","--input-bg-hover":"#f8f9fa","--input-bg-focus":"#ffffff","--input-text-color":"#212529","--input-border-color":"rgba(0, 0, 0, 0.15)"},dark:{"--bg-primary":"#0a0a0a","--bg-secondary":"#161616","--bg-card":"#1a1a1a","--bg-card-dark":"#222222","--bg-panel-start":"#1f1f1f","--bg-panel-end":"#2980b9","--bg-loading":"#0d0d0d","--text-primary":"#e8e8e8","--text-secondary":"#a8a8a8","--text-dark":"#ffffff","--text-light":"#e8e8e8","--text-muted":"#888888","--text-white":"#ffffff","--text-gray":"#999999","--text-error":"#ff6b6b","--text-success":"#51cf66","--text-warning":"#ffd43b","--text-info":"#4dabf7","--text-faded":"rgba(255, 255, 255, 0.45)","--text-subtle":"rgba(255, 255, 255, 0.6)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#2980b9","--info-dark":"#2471a3","--info-light":"#3498db","--success":"#27ae60","--success-dark":"#1e8449","--success-light":"#2ecc71","--btn-primary-start":"#2980b9","--btn-primary-end":"#f39c12","--btn-primary-hover-start":"#3498db","--btn-primary-hover-end":"#f1c40f","--btn-secondary-start":"rgba(33, 37, 41, 0.9)","--btn-secondary-end":"rgba(23, 25, 28, 0.9)","--btn-secondary-hover-start":"rgba(52, 58, 64, 1)","--btn-secondary-hover-end":"rgba(33, 37, 41, 1)","--btn-tertiary-start":"#2980b9","--btn-tertiary-end":"#1f618d","--btn-tertiary-hover-start":"#3498db","--btn-tertiary-hover-end":"#2980b9","--btn-tertiary-shadow":"rgba(41, 128, 185, 0.4)","--color-focus":"#00ccff","--color-focus-shadow":"rgba(0, 204, 255, 0.3)","--color-border-light":"rgba(255, 255, 255, 0.12)","--color-border-lighter":"rgba(255, 255, 255, 0.18)","--color-divider-start":"rgba(41, 128, 185, 0.2)","--color-divider-middle":"rgba(41, 128, 185, 0.8)","--color-divider-end":"rgba(41, 128, 185, 0.2)","--accent":"#f39c12","--accent-dark":"#d68910","--accent2":"#00ccff","--accent3":"#ff6b6b","--secondary":"#c0392b","--secondary-dark":"#a93226","--input-bg":"rgba(255, 255, 255, 0.08)","--input-bg-hover":"rgba(255, 255, 255, 0.1)","--input-bg-focus":"rgba(255, 255, 255, 0.12)","--input-text-color":"var(--text-primary)","--input-border-color":"var(--color-border-light)","--color-glass-dark":"rgba(41, 128, 185, 0.08)","--color-glass-light":"rgba(243, 156, 18, 0.08)"},packers:{"--bg-primary":"#0A1713","--bg-secondary":"#154734","--bg-card":"#0D1F1A","--bg-card-dark":"#122A1F","--bg-panel-start":"#154734","--bg-panel-end":"#203731","--bg-loading":"#061109","--text-primary":"#FFFFFF","--text-secondary":"#FFB612","--text-dark":"#FFB612","--text-light":"#FFFFFF","--text-muted":"#C9B896","--text-white":"#FFFFFF","--text-gray":"#B5A482","--text-error":"#FF6B6B","--text-success":"#FFB612","--text-warning":"#FFC42E","--text-info":"#FFB612","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#FFB612","--info-dark":"#FFA300","--info-light":"#FFC42E","--success":"#203731","--success-dark":"#154734","--success-light":"#2F5645","--btn-primary-start":"#203731","--btn-primary-end":"#154734","--btn-primary-hover-start":"#2F5645","--btn-primary-hover-end":"#203731","--btn-secondary-start":"#FFB612","--btn-secondary-end":"#FFA300","--btn-secondary-hover-start":"#FFC42E","--btn-secondary-hover-end":"#FFB612","--btn-tertiary-start":"#FFB612","--btn-tertiary-end":"#FFA300","--btn-tertiary-hover-start":"#FFC42E","--btn-tertiary-hover-end":"#FFB612","--btn-tertiary-shadow":"rgba(255, 182, 18, 0.3)","--color-focus":"#FFB612","--color-focus-shadow":"rgba(255, 182, 18, 0.3)","--color-divider-start":"rgba(32, 55, 49, 0.2)","--color-divider-middle":"rgba(255, 182, 18, 0.8)","--color-divider-end":"rgba(32, 55, 49, 0.2)","--accent":"#FFB612","--accent-dark":"#FFA300","--accent2":"#C9B896","--accent3":"#FFFFFF","--secondary":"#C9B896","--secondary-dark":"#B5A482","--input-bg":"rgba(21, 71, 52, 0.3)","--input-bg-hover":"rgba(21, 71, 52, 0.4)","--input-bg-focus":"rgba(21, 71, 52, 0.5)","--input-text-color":"#FFFFFF","--input-placeholder-color":"rgba(255, 255, 255, 0.5)","--input-border-color":"rgba(255, 182, 18, 0.4)","--input-border-hover":"rgba(255, 182, 18, 0.6)","--input-border-focus":"#FFB612","--input-border-width":"2px","--input-padding":"12px 16px","--input-font-size":"16px","--input-line-height":"1.5","--input-shadow-focus":"0 0 0 3px rgba(255, 182, 18, 0.25)","--color-glass-dark":"rgba(32, 55, 49, 0.08)","--color-glass-light":"rgba(255, 182, 18, 0.05)"},sunset:{"--bg-primary":"#0c1929","--bg-secondary":"#162544","--bg-card":"#0a1520","--bg-card-dark":"#111f35","--bg-panel-start":"#162544","--bg-panel-end":"#ff6b6b","--bg-loading":"#060d17","--text-primary":"#ffd6a5","--text-secondary":"#ffb088","--text-dark":"#8b5a3c","--text-light":"#ffd6a5","--text-muted":"#daa49a","--text-white":"#fff5f0","--text-gray":"#c9a882","--text-error":"#ff6b6b","--text-success":"#ff9a76","--text-warning":"#ffc93c","--text-info":"#ff8e71","--text-faded":"rgba(255, 214, 165, 0.6)","--text-subtle":"rgba(255, 214, 165, 0.7)","--text-bright":"rgba(255, 214, 165, 0.9)","--info":"#ff8e71","--info-dark":"#ff7657","--info-light":"#ffa589","--success":"#ff9a76","--success-dark":"#ff8561","--success-light":"#ffb088","--btn-primary-start":"#c44569","--btn-primary-end":"#f8961e","--btn-primary-hover-start":"#d65577","--btn-primary-hover-end":"#f9a73e","--btn-secondary-start":"rgba(22, 37, 68, 0.9)","--btn-secondary-end":"rgba(12, 25, 41, 0.9)","--btn-secondary-hover-start":"rgba(28, 46, 78, 1)","--btn-secondary-hover-end":"rgba(22, 37, 68, 1)","--btn-tertiary-start":"#ff6b6b","--btn-tertiary-end":"#ee5a52","--btn-tertiary-hover-start":"#ff8080","--btn-tertiary-hover-end":"#ff6b6b","--btn-tertiary-shadow":"rgba(255, 107, 107, 0.3)","--color-focus":"#ff8e71","--color-focus-shadow":"rgba(255, 142, 113, 0.3)","--color-divider-start":"rgba(196, 69, 105, 0.2)","--color-divider-middle":"rgba(248, 150, 30, 0.8)","--color-divider-end":"rgba(196, 69, 105, 0.2)","--accent":"#f8961e","--accent-dark":"#f37121","--accent2":"#ff6b6b","--accent3":"#c44569","--secondary":"#ff6b6b","--secondary-dark":"#ee5a52","--input-bg":"rgba(12, 25, 41, 0.95)","--input-bg-hover":"rgba(18, 35, 51, 0.98)","--input-bg-focus":"rgba(22, 37, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(255, 142, 113, 0.3)","--color-glass-dark":"rgba(196, 69, 105, 0.08)","--color-glass-light":"rgba(248, 150, 30, 0.05)"},"miami-vice":{"--bg-primary":"#1a0f2e","--bg-secondary":"#2d1844","--bg-card":"#160d28","--bg-card-dark":"#231432","--bg-panel-start":"#2d1844","--bg-panel-end":"#ff6b9d","--bg-loading":"#0f0820","--text-primary":"#ffeaa7","--text-secondary":"#fab1a0","--text-dark":"#74526c","--text-light":"#ffeaa7","--text-muted":"#dfe6e9","--text-white":"#fff5f0","--text-gray":"#b2bec3","--text-error":"#ff7675","--text-success":"#fdcb6e","--text-warning":"#ffeb3b","--text-info":"#00d2d3","--text-faded":"rgba(255, 234, 167, 0.6)","--text-subtle":"rgba(255, 234, 167, 0.7)","--text-bright":"rgba(255, 234, 167, 0.9)","--info":"#00d2d3","--info-dark":"#00b8b8","--info-light":"#01e5e5","--success":"#fdcb6e","--success-dark":"#f9b747","--success-light":"#ffeaa7","--btn-primary-start":"#ff6b9d","--btn-primary-end":"#00d2d3","--btn-primary-hover-start":"#ee5a6f","--btn-primary-hover-end":"#01e5e5","--btn-secondary-start":"rgba(45, 24, 68, 0.9)","--btn-secondary-end":"rgba(26, 15, 46, 0.9)","--btn-secondary-hover-start":"rgba(55, 34, 78, 1)","--btn-secondary-hover-end":"rgba(45, 24, 68, 1)","--btn-tertiary-start":"#00d2d3","--btn-tertiary-end":"#00b8b8","--btn-tertiary-hover-start":"#01e5e5","--btn-tertiary-hover-end":"#00d2d3","--btn-tertiary-shadow":"rgba(0, 210, 211, 0.3)","--color-focus":"#00d2d3","--color-focus-shadow":"rgba(0, 210, 211, 0.3)","--color-divider-start":"rgba(255, 107, 157, 0.2)","--color-divider-middle":"rgba(0, 210, 211, 0.8)","--color-divider-end":"rgba(255, 107, 157, 0.2)","--accent":"#feca57","--accent-dark":"#f9b747","--accent2":"#00d2d3","--accent3":"#ff6b9d","--secondary":"#ff7979","--secondary-dark":"#ff6348","--input-bg":"rgba(26, 15, 46, 0.95)","--input-bg-hover":"rgba(35, 20, 56, 0.98)","--input-bg-focus":"rgba(45, 24, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(0, 210, 211, 0.3)","--color-glass-dark":"rgba(255, 107, 157, 0.08)","--color-glass-light":"rgba(0, 210, 211, 0.05)"},purple:{"--bg-primary":"#1a1a2e","--bg-secondary":"#2d2d44","--bg-card":"#16132d","--bg-card-dark":"#1f1b3a","--bg-panel-start":"#1a1a2e","--bg-panel-end":"#8e44ad","--bg-loading":"#0f0f1a","--text-primary":"#f3e5f5","--text-secondary":"#ce93d8","--text-dark":"#4a148c","--text-light":"#f3e5f5","--text-muted":"#ba68c8","--text-white":"#ffffff","--text-gray":"#9c27b0","--text-error":"#f44336","--text-success":"#ab47bc","--text-warning":"#ffc107","--text-info":"#ba68c8","--text-faded":"rgba(243, 229, 245, 0.6)","--text-subtle":"rgba(243, 229, 245, 0.7)","--text-bright":"rgba(243, 229, 245, 0.9)","--info":"#8e44ad","--info-dark":"#7d3c98","--info-light":"#a569bd","--success":"#a569bd","--success-dark":"#8e44ad","--success-light":"#bb8fce","--btn-primary-start":"#8e44ad","--btn-primary-end":"#f1c40f","--btn-primary-hover-start":"#a569bd","--btn-primary-hover-end":"#f39c12","--btn-secondary-start":"rgba(45, 45, 68, 0.9)","--btn-secondary-end":"rgba(26, 26, 46, 0.9)","--btn-secondary-hover-start":"rgba(58, 58, 88, 1)","--btn-secondary-hover-end":"rgba(45, 45, 68, 1)","--btn-tertiary-start":"#8e44ad","--btn-tertiary-end":"#6c3483","--btn-tertiary-hover-start":"#a569bd","--btn-tertiary-hover-end":"#8e44ad","--btn-tertiary-shadow":"rgba(142, 68, 173, 0.3)","--color-focus":"#cc99ff","--color-focus-shadow":"rgba(204, 153, 255, 0.3)","--color-divider-start":"rgba(142, 68, 173, 0.2)","--color-divider-middle":"rgba(142, 68, 173, 0.8)","--color-divider-end":"rgba(142, 68, 173, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#ab47bc","--accent3":"#ba68c8","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(26, 26, 46, 0.95)","--input-bg-hover":"rgba(35, 35, 55, 0.98)","--input-bg-focus":"rgba(45, 45, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(142, 68, 173, 0.3)","--color-glass-dark":"rgba(142, 68, 173, 0.08)","--color-glass-light":"rgba(241, 196, 15, 0.08)"}},Pn=r=>{const e=vr[r]||vr.default,t=document.documentElement;Object.entries(e).forEach(([n,s])=>{t.style.setProperty(n,s)})},Xc=()=>{const r=localStorage.getItem("selectedTheme")||"default";Pn(r)},vl=()=>localStorage.getItem("selectedTheme")||"default",wl=r=>{localStorage.setItem("selectedTheme",r),Pn(r)},Rn=f.createContext(null),On=r=>{if(!r)return null;const e="https://api.in-between.live";if(r.startsWith("http"))return r;if(r.startsWith("/files/"))return`${e}${r}`;if(r.includes("/uploads/")){const t=r.split("/"),n=t.pop(),s=t[t.length-1];return`${e}/files/${s}/${n}`}else return`${e}${r}`},wr=r=>r?{...r,profileImg:On(r.profileImg)}:{},Qc=({children:r})=>{const[e,t]=f.useState({profileImg:null,autoAnte:!1,muted:!1,selectedTitle:null}),[n,s]=f.useState(!0),{user:i,token:o}=ot(),c=Tr.useCallback(async()=>{if(!i){t({autoAnte:!1}),s(!1);return}try{s(!0);const b="https://api.in-between.live";if(!o){console.error("[Preferences] No token available"),s(!1);return}const E=await fetch(`${b}/preferences`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}});if(!E.ok)throw new Error("Failed to load preferences");const p=await E.json(),u=wr(p)||{autoAnte:!1,muted:!1};t(u),typeof u.muted<"u"&&_t.setMuted(u.muted)}catch(b){console.error("[Preferences] Error loading preferences:",b),t({autoAnte:!1})}finally{s(!1)}},[i,o]);f.useEffect(()=>{i&&c()},[i,c]);const a=async(b,E)=>{if(!i)return console.error("[Preferences] Cannot update preferences: User not logged in"),!1;try{const p="https://api.in-between.live";if(!o)return console.error("[Preferences] No token available"),!1;t(T=>({...T,[b]:E})),b==="muted"&&_t.setMuted(E);const m=await fetch(`${p}/preferences/${b}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({value:E})});if(!m.ok)throw new Error(`Failed to update ${b} preference`);const u=await m.json(),v=wr(u);return t(v),!0}catch(p){return console.error(`[Preferences] Error updating ${b}:`,p),await c(),!1}},l=async()=>{const b=!e.autoAnte;return await a("autoAnte",b)},h=async()=>{const b=!e.muted;return await a("muted",b)},d=async b=>await a("selectedTitle",b),g=async b=>{if(!b)return console.error("[Preferences] No file provided for profile image upload"),!1;try{const E=new FormData;E.append("file",b);const p="https://api.in-between.live";if(!o)return console.error("[Preferences] No token available"),!1;const m=await fetch(`${p}/preferences/profileImg`,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:E}),u=await m.text();if(!m.ok)throw new Error(`Failed to upload profile image: ${u}`);const v=u?JSON.parse(u):{},T=On(v.fileUrl);return t(R=>({...R,profileImg:T})),!0}catch(E){return console.error("[Preferences] Error uploading profile image:",E),!1}};return y.jsx(Rn.Provider,{value:{preferences:e,updatePreference:a,toggleAutoAnte:l,toggleMute:h,updateSelectedTitle:d,uploadProfileImg:g,loading:n},children:r})},El=()=>{const r=f.useContext(Rn);if(!r)throw new Error("usePreferences must be used within a PreferencesProvider");return r},xn=f.createContext(null),Zc=({children:r})=>{const{socket:e}=et(),{token:t}=ot(),[n,s]=f.useState(new Map),i=f.useRef(new Set),o=f.useRef(null);f.useEffect(()=>{if(!e)return;const g=({userId:b,data:E})=>{console.log("[UserDataContext] Received user data update:",b,E),s(p=>{const m=new Map(p);return m.set(b,E),m})};return e.on("userDataUpdated",g),()=>{e.off("userDataUpdated",g)}},[e]),f.useEffect(()=>()=>{o.current&&clearTimeout(o.current)},[]);const c=f.useCallback(async g=>{if(!g||g.length===0||!t)return{};try{const b=await fetch(`${kr}/users`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({userIds:g})});if(!b.ok)throw new Error("Failed to fetch users data");const E=await b.json();return s(p=>{const m=new Map(p);return Object.entries(E).forEach(([u,v])=>{m.set(u,v)}),m}),E}catch{return{}}},[t]),a=f.useCallback(()=>{if(i.current.size===0)return;const g=Array.from(i.current);i.current.clear(),c(g)},[c]),l=f.useCallback(g=>{if(!g)return null;const b=n.get(g);return b||(i.current.add(g),o.current&&clearTimeout(o.current),o.current=setTimeout(()=>{a()},10),null)},[n,a]),h=f.useCallback(g=>{const b=g.filter(E=>!n.has(E));b.length>0&&c(b)},[n,c]),d={getUserData:l,prefetchUsers:h};return y.jsx(xn.Provider,{value:d,children:r})},Il=r=>{const e=f.useContext(xn);if(!e)throw new Error("useUserData must be used within UserDataProvider");return e.getUserData(r)};/*! Capacitor: https://capacitorjs.com/ - MIT License */var _e;(function(r){r.Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE"})(_e||(_e={}));class mt extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}}const el=r=>{var e,t;return r?.androidBridge?"android":!((t=(e=r?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},tl=r=>{const e=r.CapacitorCustomPlatform||null,t=r.Capacitor||{},n=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:el(r),i=()=>s()!=="web",o=d=>{const g=l.get(d);return!!(g?.platforms.has(s())||c(d))},c=d=>{var g;return(g=t.PluginHeaders)===null||g===void 0?void 0:g.find(b=>b.name===d)},a=d=>r.console.error(d),l=new Map,h=(d,g={})=>{const b=l.get(d);if(b)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),b.proxy;const E=s(),p=c(d);let m;const u=async()=>(!m&&E in g?m=typeof g[E]=="function"?m=await g[E]():m=g[E]:e!==null&&!m&&"web"in g&&(m=typeof g.web=="function"?m=await g.web():m=g.web),m),v=(w,S)=>{var P,x;if(p){const G=p?.methods.find(N=>S===N.name);if(G)return G.rtype==="promise"?N=>t.nativePromise(d,S.toString(),N):(N,Fe)=>t.nativeCallback(d,S.toString(),N,Fe);if(w)return(P=w[S])===null||P===void 0?void 0:P.bind(w)}else{if(w)return(x=w[S])===null||x===void 0?void 0:x.bind(w);throw new mt(`"${d}" plugin is not implemented on ${E}`,_e.Unimplemented)}},T=w=>{let S;const P=(...x)=>{const G=u().then(N=>{const Fe=v(N,w);if(Fe){const je=Fe(...x);return S=je?.remove,je}else throw new mt(`"${d}.${w}()" is not implemented on ${E}`,_e.Unimplemented)});return w==="addListener"&&(G.remove=async()=>S()),G};return P.toString=()=>`${w.toString()}() { [capacitor code] }`,Object.defineProperty(P,"name",{value:w,writable:!1,configurable:!1}),P},R=T("addListener"),_=T("removeListener"),I=(w,S)=>{const P=R({eventName:w},S),x=async()=>{const N=await P;_({eventName:w,callbackId:N},S)},G=new Promise(N=>P.then(()=>N({remove:x})));return G.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await x()},G},k=new Proxy({},{get(w,S){switch(S){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return p?I:R;case"removeListener":return _;default:return T(S)}}});return n[d]=k,l.set(d,{name:d,proxy:k,platforms:new Set([...Object.keys(g),...p?[E]:[]])}),k};return t.convertFileSrc||(t.convertFileSrc=d=>d),t.getPlatform=s,t.handleError=a,t.isNativePlatform=i,t.isPluginAvailable=o,t.registerPlugin=h,t.Exception=mt,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},rl=r=>r.Capacitor=tl(r),Tt=rl(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),jt=Tt.registerPlugin;class Ln{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),n&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,t);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){const s=this.listeners[e];if(!s){if(n){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:n=>{this.notifyListeners(t,n)}}}unimplemented(e="not implemented"){return new Tt.Exception(e,_e.Unimplemented)}unavailable(e="not available"){return new Tt.Exception(e,_e.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const s=n.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(n=>{this.notifyListeners(e,n)}))}}const Er=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ir=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class nl extends Ln{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(n=>{if(n.length<=0)return;let[s,i]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Ir(s).trim(),i=Ir(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=Er(e.key),n=Er(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${n||""}${s}; path=${i}; ${o};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}jt("CapacitorCookies",{web:()=>new nl});const sl=async r=>new Promise((e,t)=>{const n=new FileReader;n.onload=()=>{const s=n.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},n.onerror=s=>t(s),n.readAsDataURL(r)}),il=(r={})=>{const e=Object.keys(r);return Object.keys(r).map(s=>s.toLocaleLowerCase()).reduce((s,i,o)=>(s[i]=r[e[o]],s),{})},ol=(r,e=!0)=>r?Object.entries(r).reduce((n,s)=>{const[i,o]=s;let c,a;return Array.isArray(o)?(a="",o.forEach(l=>{c=e?encodeURIComponent(l):l,a+=`${i}=${c}&`}),a.slice(0,-1)):(c=e?encodeURIComponent(o):o,a=`${i}=${c}`),`${n}&${a}`},"").substr(1):null,al=(r,e={})=>{const t=Object.assign({method:r.method||"GET",headers:r.headers},e),s=il(r.headers)["content-type"]||"";if(typeof r.data=="string")t.body=r.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,c]of Object.entries(r.data||{}))i.set(o,c);t.body=i.toString()}else if(s.includes("multipart/form-data")||r.data instanceof FormData){const i=new FormData;if(r.data instanceof FormData)r.data.forEach((c,a)=>{i.append(a,c)});else for(const c of Object.keys(r.data))i.append(c,r.data[c]);t.body=i;const o=new Headers(t.headers);o.delete("content-type"),t.headers=o}else(s.includes("application/json")||typeof r.data=="object")&&(t.body=JSON.stringify(r.data));return t};class cl extends Ln{async request(e){const t=al(e,e.webFetchExtra),n=ol(e.params,e.shouldEncodeUrlParams),s=n?`${e.url}?${n}`:e.url,i=await fetch(s,t),o=i.headers.get("content-type")||"";let{responseType:c="text"}=i.ok?e:{};o.includes("application/json")&&(c="json");let a,l;switch(c){case"arraybuffer":case"blob":l=await i.blob(),a=await sl(l);break;case"json":a=await i.json();break;case"document":case"text":default:a=await i.text()}const h={};return i.headers.forEach((d,g)=>{h[g]=d}),{data:a,headers:h,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}jt("CapacitorHttp",{web:()=>new cl});const ll="__capgo_keep_url_path_after_reload",bt="__capgo_history_stack__",Ar=100,dl=typeof window<"u"&&typeof document<"u"&&typeof history<"u";if(dl){const r=window;if(!r.__capgoHistoryPatched){r.__capgoHistoryPatched=!0;const e=()=>{try{if(r.__capgoKeepUrlPathAfterReload)return!0}catch{}try{return window.localStorage.getItem(ll)==="1"}catch{return!1}},t=()=>{try{const _=window.sessionStorage.getItem(bt);if(!_)return{stack:[],index:-1};const I=JSON.parse(_);return!I||!Array.isArray(I.stack)||typeof I.index!="number"?{stack:[],index:-1}:I}catch{return{stack:[],index:-1}}},n=(_,I)=>{try{window.sessionStorage.setItem(bt,JSON.stringify({stack:_,index:I}))}catch{}},s=()=>{try{window.sessionStorage.removeItem(bt)}catch{}},i=_=>{try{const I=_??window.location.href,k=new URL(I instanceof URL?I.toString():I,window.location.href);return`${k.pathname}${k.search}${k.hash}`}catch{return null}},o=(_,I)=>{if(_.length<=Ar)return{stack:_,index:I};const k=_.length-Ar,w=_.slice(k),S=Math.max(0,I-k);return{stack:w,index:S}},c=_=>{document.readyState==="complete"||document.readyState==="interactive"?_():window.addEventListener("DOMContentLoaded",_,{once:!0})};let a=!1,l=!1,h=!1;const d=()=>{if(!a)return;const _=t(),I=i();if(I){if(_.stack.length===0){_.stack.push(I),_.index=0,n(_.stack,_.index);return}(_.index<0||_.index>=_.stack.length)&&(_.index=_.stack.length-1),_.stack[_.index]!==I&&(_.stack[_.index]=I,n(_.stack,_.index))}},g=(_,I)=>{if(!a||l)return;const k=i(_);if(!k)return;let{stack:w,index:S}=t();w.length===0?(w.push(k),S=w.length-1):I?((S<0||S>=w.length)&&(S=w.length-1),w[S]=k):S>=w.length-1?(w.push(k),S=w.length-1):(w=w.slice(0,S+1),w.push(k),S=w.length-1),{stack:w,index:S}=o(w,S),n(w,S)},b=()=>{if(!a||l)return;const _=t();if(_.stack.length===0){d();return}const I=_.index>=0&&_.index<_.stack.length?_.index:_.stack.length-1,k=i();if(_.stack.length===1&&k===_.stack[0])return;const w=_.stack[0];if(!w)return;l=!0;try{history.replaceState(history.state,document.title,w);for(let x=1;x<_.stack.length;x+=1)history.pushState(history.state,document.title,_.stack[x])}catch{l=!1;return}l=!1;const S=_.stack.length-1,P=I-S;P!==0?history.go(P):(history.replaceState(history.state,document.title,_.stack[I]),window.dispatchEvent(new PopStateEvent("popstate")))},E=()=>{!a||h||(h=!0,c(()=>{h=!1,b()}))};let p=null,m=null;const u=()=>{if(!a||l)return;const _=i();if(!_)return;const I=t(),k=I.stack.lastIndexOf(_);k>=0?I.index=k:(I.stack.push(_),I.index=I.stack.length-1);const w=o(I.stack,I.index);n(w.stack,w.index)},v=()=>{p&&m||(p=history.pushState,m=history.replaceState,history.pushState=function(I,k,w){const S=p.call(history,I,k,w);return g(w,!1),S},history.replaceState=function(I,k,w){const S=m.call(history,I,k,w);return g(w,!0),S},window.addEventListener("popstate",u))},T=()=>{p&&(history.pushState=p,p=null),m&&(history.replaceState=m,m=null),window.removeEventListener("popstate",u)},R=_=>{if(a===_){a&&(d(),E());return}a=_,a?(v(),d(),E()):(T(),s())};window.addEventListener("CapacitorUpdaterKeepUrlPathAfterReload",_=>{var I;const k=_,w=(I=k?.detail)===null||I===void 0?void 0:I.enabled;typeof w=="boolean"?(r.__capgoKeepUrlPathAfterReload=w,R(w)):(r.__capgoKeepUrlPathAfterReload=!0,R(!0))}),R(e())}}const ul=jt("CapacitorUpdater",{web:()=>Pe(()=>import("./web-QOWorBVg.js"),__vite__mapDeps([18,1,7,8]),import.meta.url).then(r=>new r.CapacitorUpdaterWeb)});Xc();window.Capacitor?.isNativePlatform()&&(ul.notifyAppReady(),window.Capacitor?.getPlatform()==="android"&&(document.documentElement.style.setProperty("--safe-area-inset-top","48px"),document.documentElement.style.setProperty("--safe-area-inset-bottom","0px"),console.log("✅ Android safe area insets set: top=48px")));Kn.createRoot(document.getElementById("root")).render(y.jsx(Tr.StrictMode,{children:y.jsx(sc,{children:y.jsx(ns,{children:y.jsx(Zc,{children:y.jsx(Qc,{children:y.jsx(Yc,{})})})})})}));export{le as $,Ts as A,bs as B,pe as C,Se as D,Re as E,K as F,gl as G,ws as H,ot as I,gt as J,Ne as K,Fr as L,y as M,xc as N,kr as O,_l as P,et as Q,Il as R,ye as S,wc as T,yl as U,_t as V,Ln as W,El as X,xn as Y,we as Z,be as _,ml as a,vl as a0,wl as a1,Et as b,ks as c,as as d,Wr as e,Si as f,ls as g,Dr as h,Pt as i,gs as j,ys as k,_s as l,bl as m,U as n,xi as o,ne as p,O as q,ee as r,Li as s,Rt as t,C as u,xr as v,Oe as w,Ee as x,Ie as y,vs as z};
