const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-r2fcZvUL.js","./vendor-x77BqUlH.js","./audio-DijUiIHu.js","./socket-CA1CrNgP.js","./ModernAuthPage-C5tdbcp_.js","./useGamepadNavigation-BO_2aW0E.js","./AppHeader-DsZwvtro.js","./AppHeader-Dw3y85lw.css","./version-DQIa-A4Z.js","./ModernAuthPage-VedtiJHp.css","./AuthPage-DEu7scjL.js","./AuthPage-DbcdDhMr.css","./Lobby-B9zoyL7P.js","./GamepadInput-B4AEsoLx.js","./GamepadInput-B4hG-7Ng.css","./Lobby-CHwryrvk.css","./GameRoom-CPJ-qB2P.js","./GameRoom-DTN8b981.css","./web-C-YTKM4M.js"])))=>i.map(i=>d[i]);
import{b as gs,d as ms,g as bs,r as p,e as ys,N as er,f as _s,R as vs,h as tr}from"./vendor-x77BqUlH.js";import{r as ws}from"./audio-DijUiIHu.js";import{l as Is}from"./socket-CA1CrNgP.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var At={exports:{}},Pe={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var an;function Es(){if(an)return Pe;an=1;var n=gs(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function o(a,c,l){var h,u={},d=null,m=null;l!==void 0&&(d=""+l),c.key!==void 0&&(d=""+c.key),c.ref!==void 0&&(m=c.ref);for(h in c)r.call(c,h)&&!i.hasOwnProperty(h)&&(u[h]=c[h]);if(a&&a.defaultProps)for(h in c=a.defaultProps,c)u[h]===void 0&&(u[h]=c[h]);return{$$typeof:e,type:a,key:d,ref:m,props:u,_owner:s.current}}return Pe.Fragment=t,Pe.jsx=o,Pe.jsxs=o,Pe}var cn;function Ts(){return cn||(cn=1,At.exports=Es()),At.exports}var w=Ts(),Ze={},ln;function ks(){if(ln)return Ze;ln=1;var n=ms();return Ze.createRoot=n.createRoot,Ze.hydrateRoot=n.hydrateRoot,Ze}var As=ks();const Ss=bs(As);var Ps=ws();class Cs{constructor(){this.sounds={},this.muted=!1,this.initialized=!1,this.categories=["ui"],this.lastPlayedTime={},this.debounceTime=500,this.audioUnlocked=!1,this.API_URL="https://api.in-between.live",typeof window<"u"&&setTimeout(()=>{this.initialize(),this._setupMobileAudioUnlock()},0)}initialize(){this.initialized||(this.loadCategory("ui"),this.initialized=!0)}loadCategory(e){if(this.sounds[e])return;const t={};e==="ui"&&(t.join=[0,500],t.leave=[500,1e3],t.alert=[1500,1500]),this.sounds[e]=new Ps.Howl({src:[`${this.API_URL}/assets/audio/${e}-sounds.mp3`,`${this.API_URL}/assets/audio/${e}-sounds.webm`],sprite:t,preload:!0,html5:this._isMobileDevice(),format:["mp3","webm"],pool:10})}play(e,t=1){if(this.muted)return;this.initialized||this.initialize();let r,s;if(e.includes(".")?[r,s]=e.split("."):(r="ui",s=e),!this.sounds[r]){this.loadCategory(r);return}const i=`${r}.${s}`,o=Date.now(),a=this.lastPlayedTime[i]||0;if(!(o-a<this.debounceTime))return this.lastPlayedTime[i]=o,this.sounds[r].volume(t),this.sounds[r].play(s)}setMuted(e){this.muted=e,Object.values(this.sounds).forEach(t=>{t&&t.mute&&t.mute(e)})}syncWithPreferences(e){e&&typeof e.muted<"u"&&this.setMuted(e.muted)}_setupMobileAudioUnlock(){if(typeof window>"u"||!this._isMobileDevice())return;const e=()=>{if(this.audioUnlocked)return;const t=new Audio;t.src="data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAQAAAAAAAAAAABSAJAJAQgAAgAAAAiIkfC3/////////////////////",t.load(),t.play().then(()=>{this.audioUnlocked=!0,document.body.removeEventListener("touchstart",e),document.body.removeEventListener("touchend",e),document.body.removeEventListener("click",e)}).catch(r=>{})};document.body.addEventListener("touchstart",e,!1),document.body.addEventListener("touchend",e,!1),document.body.addEventListener("click",e,!1)}_isMobileDevice(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}}const jt=new Cs,Rs="modulepreload",Os=function(n,e){return new URL(n,e).href},dn={},Te=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(t.map(h=>{if(h=Os(h,r),h in dn)return;dn[h]=!0;const u=h.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(r)for(let I=o.length-1;I>=0;I--){const _=o[I];if(_.href===h&&(!u||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${d}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Rs,u||(m.as="script"),m.crossOrigin="",m.href=h,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((I,_)=>{m.addEventListener("load",I),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})},Ls="_loadingScreen_16l5s_1",xs="_loadingContainer_16l5s_10",Ns="_spinner_16l5s_21",Ds="_message_16l5s_31",Qe={loadingScreen:Ls,loadingContainer:xs,spinner:Ns,message:Ds},Re=({message:n="Loading..."})=>w.jsx("div",{className:Qe.loadingScreen,children:w.jsxs("div",{className:Qe.loadingContainer,children:[w.jsx("div",{className:Qe.spinner}),w.jsx("p",{className:Qe.message,children:n})]})}),nr="https://api.in-between.live",Ms="https://api.in-between.live",Us={apiKey:"AIzaSyBUm2vU-bPYSpsxIdd7pYerZx81GNgVJgQ",authDomain:"in-between-live.firebaseapp.com",projectId:"in-between-live",storageBucket:"in-between-live.firebasestorage.app",messagingSenderId:"800669475084",appId:"1:800669475084:web:89e0bbd44313d8bd3d2929",measurementId:"G-1PZPC7KWZF"},rr=p.createContext(),ht=()=>p.useContext(rr),Fs=({children:n})=>{const{token:e}=kt(),[t,r]=p.useState(null),[s,i]=p.useState(!1),[o,a]=p.useState(null);p.useEffect(()=>{if(typeof window>"u")return;if(!e){t&&(t.disconnect(),r(null),i(!1),a(null));return}const l=Is(Ms,{auth:{token:e},reconnection:!0,reconnectionAttempts:5,reconnectionDelay:1e3,transports:["websocket","polling"],timeout:1e4});r(l),l.on("connect",()=>{a(null)}),l.on("authenticated",u=>{l.auth={userId:u.userId,username:u.username},i(!0),l.emit("getGameList")}),l.on("connect_error",u=>{a("Failed to connect to game server: "+u.message),i(!1)}),l.on("disconnect",()=>{i(!1)}),l.on("error",u=>{a(u.message||"Unknown socket error")});const h=["connect","authenticated","disconnect","connect_error","error","transport"];return()=>{l&&(h.forEach(u=>l.off(u)),l.disconnect(),r(null),i(!1),a(null))}},[e]);const c={socket:t,isConnected:s,error:o,setError:a};return w.jsx(rr.Provider,{value:c,children:n})},js="_username_1shc8_1",$s="_discriminator_1shc8_6",un={username:js,discriminator:$s};function sr(n){if(!n)return{base:"",discriminator:null,full:""};const e=n.split("#");return e.length===2&&/^\d{4}$/.test(e[1])?{base:e[0],discriminator:e[1],full:n}:{base:n,discriminator:null,full:n}}function Bs(n,e=!1){const{base:t,discriminator:r}=sr(n);return e&&r?`${t}#${r}`:t}function Vs(n){const{discriminator:e}=sr(n);return e}const Hs=({username:n,showDiscriminator:e=!1,className:t=""})=>{if(!n)return null;const r=Bs(n),s=Vs(n);return w.jsxs("span",{className:`${un.username} ${t}`,children:[r,e&&s&&w.jsxs("span",{className:un.discriminator,children:["#",s]})]})},Ws=()=>{};var hn={};/**
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
 */const ir=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},zs=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},or={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,h=i>>2,u=(i&3)<<4|a>>4;let d=(a&15)<<2|l>>6,m=l&63;c||(m=64,o||(d=64)),r.push(t[h],t[u],t[d],t[m])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ir(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):zs(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||a==null||l==null||u==null)throw new Ks;const d=i<<2|a>>4;if(r.push(d),l!==64){const m=a<<4&240|l>>2;if(r.push(m),u!==64){const I=l<<6&192|u;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ks extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Gs=function(n){const e=ir(n);return or.encodeByteArray(e,!0)},ar=function(n){return Gs(n).replace(/\./g,"")},cr=function(n){try{return or.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function qs(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Js=()=>qs().__FIREBASE_DEFAULTS__,Ys=()=>{if(typeof process>"u"||typeof hn>"u")return;const n=hn.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Xs=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&cr(n[1]);return e&&JSON.parse(e)},Gt=()=>{try{return Ws()||Js()||Ys()||Xs()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Zs=n=>{var e,t;return(t=(e=Gt())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},lr=()=>{var n;return(n=Gt())===null||n===void 0?void 0:n.config},dr=n=>{var e;return(e=Gt())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Qs{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
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
 */function ft(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ei(n){return(await fetch(n,{credentials:"include"})).ok}const Ne={};function ti(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ne))Ne[e]?n.emulator.push(e):n.prod.push(e);return n}function ni(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let fn=!1;function ri(n,e){if(typeof window>"u"||typeof document>"u"||!ft(window.location.host)||Ne[n]===e||Ne[n]||fn)return;Ne[n]=e;function t(d){return`__firebase__banner__${d}`}const r="__firebase__banner",i=ti().prod.length>0;function o(){const d=document.getElementById(r);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function c(d,m){d.setAttribute("width","24"),d.setAttribute("id",m),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function l(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{fn=!0,o()},d}function h(d,m){d.setAttribute("id",m),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function u(){const d=ni(r),m=t("text"),I=document.getElementById(m)||document.createElement("span"),_=t("learnmore"),g=document.getElementById(_)||document.createElement("a"),f=t("preprendIcon"),v=document.getElementById(f)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const k=d.element;a(k),h(g,_);const M=l();c(v,f),k.append(v,I,g,M),document.body.appendChild(k)}i?(I.innerText="Preview backend disconnected.",v.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(v.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,I.innerText="Preview backend running in this workspace."),I.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
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
 */function F(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function si(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(F())}function ii(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function oi(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ai(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ci(){const n=F();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function li(){try{return typeof indexedDB=="object"}catch{return!1}}function di(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const ui="FirebaseError";class le extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ui,Object.setPrototypeOf(this,le.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,We.prototype.create)}}class We{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?hi(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new le(s,a,r)}}function hi(n,e){return n.replace(fi,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const fi=/\{\$([^}]+)}/g;function pi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function we(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(pn(i)&&pn(o)){if(!we(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function pn(n){return n!==null&&typeof n=="object"}/**
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
 */function ke(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Oe(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Le(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function gi(n,e){const t=new mi(n,e);return t.subscribe.bind(t)}class mi{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");bi(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=St),s.error===void 0&&(s.error=St),s.complete===void 0&&(s.complete=St);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bi(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function St(){}/**
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
 */function C(n){return n&&n._delegate?n._delegate:n}class Ie{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const de="[DEFAULT]";/**
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
 */class yi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Qs;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(vi(e))try{this.getOrInitializeService({instanceIdentifier:de})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=de){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=de){return this.instances.has(e)}getOptions(e=de){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:_i(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=de){return this.component?this.component.multipleInstances?e:de:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _i(n){return n===de?void 0:n}function vi(n){return n.instantiationMode==="EAGER"}/**
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
 */class wi{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new yi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var P;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(P||(P={}));const Ii={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},Ei=P.INFO,Ti={[P.DEBUG]:"log",[P.VERBOSE]:"log",[P.INFO]:"info",[P.WARN]:"warn",[P.ERROR]:"error"},ki=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Ti[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ur{constructor(e){this.name=e,this._logLevel=Ei,this._logHandler=ki,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in P))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ii[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,P.DEBUG,...e),this._logHandler(this,P.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,P.VERBOSE,...e),this._logHandler(this,P.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,P.INFO,...e),this._logHandler(this,P.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,P.WARN,...e),this._logHandler(this,P.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,P.ERROR,...e),this._logHandler(this,P.ERROR,...e)}}const Ai=(n,e)=>e.some(t=>n instanceof t);let gn,mn;function Si(){return gn||(gn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pi(){return mn||(mn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hr=new WeakMap,$t=new WeakMap,fr=new WeakMap,Pt=new WeakMap,qt=new WeakMap;function Ci(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(oe(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&hr.set(t,n)}).catch(()=>{}),qt.set(e,n),e}function Ri(n){if($t.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});$t.set(n,e)}let Bt={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return $t.get(n);if(e==="objectStoreNames")return n.objectStoreNames||fr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return oe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Oi(n){Bt=n(Bt)}function Li(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ct(this),e,...t);return fr.set(r,e.sort?e.sort():[e]),oe(r)}:Pi().includes(n)?function(...e){return n.apply(Ct(this),e),oe(hr.get(this))}:function(...e){return oe(n.apply(Ct(this),e))}}function xi(n){return typeof n=="function"?Li(n):(n instanceof IDBTransaction&&Ri(n),Ai(n,Si())?new Proxy(n,Bt):n)}function oe(n){if(n instanceof IDBRequest)return Ci(n);if(Pt.has(n))return Pt.get(n);const e=xi(n);return e!==n&&(Pt.set(n,e),qt.set(e,n)),e}const Ct=n=>qt.get(n);function Ni(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),a=oe(o);return r&&o.addEventListener("upgradeneeded",c=>{r(oe(o.result),c.oldVersion,c.newVersion,oe(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Di=["get","getKey","getAll","getAllKeys","count"],Mi=["put","add","delete","clear"],Rt=new Map;function bn(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Rt.get(e))return Rt.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Mi.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Di.includes(t)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return Rt.set(e,i),i}Oi(n=>({...n,get:(e,t,r)=>bn(e,t)||n.get(e,t,r),has:(e,t)=>!!bn(e,t)||n.has(e,t)}));/**
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
 */class Ui{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Fi(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Fi(n){const e=n.getComponent();return e?.type==="VERSION"}const Vt="@firebase/app",yn="0.13.2";/**
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
 */const J=new ur("@firebase/app"),ji="@firebase/app-compat",$i="@firebase/analytics-compat",Bi="@firebase/analytics",Vi="@firebase/app-check-compat",Hi="@firebase/app-check",Wi="@firebase/auth",zi="@firebase/auth-compat",Ki="@firebase/database",Gi="@firebase/data-connect",qi="@firebase/database-compat",Ji="@firebase/functions",Yi="@firebase/functions-compat",Xi="@firebase/installations",Zi="@firebase/installations-compat",Qi="@firebase/messaging",eo="@firebase/messaging-compat",to="@firebase/performance",no="@firebase/performance-compat",ro="@firebase/remote-config",so="@firebase/remote-config-compat",io="@firebase/storage",oo="@firebase/storage-compat",ao="@firebase/firestore",co="@firebase/ai",lo="@firebase/firestore-compat",uo="firebase",ho="11.10.0";/**
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
 */const Ht="[DEFAULT]",fo={[Vt]:"fire-core",[ji]:"fire-core-compat",[Bi]:"fire-analytics",[$i]:"fire-analytics-compat",[Hi]:"fire-app-check",[Vi]:"fire-app-check-compat",[Wi]:"fire-auth",[zi]:"fire-auth-compat",[Ki]:"fire-rtdb",[Gi]:"fire-data-connect",[qi]:"fire-rtdb-compat",[Ji]:"fire-fn",[Yi]:"fire-fn-compat",[Xi]:"fire-iid",[Zi]:"fire-iid-compat",[Qi]:"fire-fcm",[eo]:"fire-fcm-compat",[to]:"fire-perf",[no]:"fire-perf-compat",[ro]:"fire-rc",[so]:"fire-rc-compat",[io]:"fire-gcs",[oo]:"fire-gcs-compat",[ao]:"fire-fst",[lo]:"fire-fst-compat",[co]:"fire-vertex","fire-js":"fire-js",[uo]:"fire-js-all"};/**
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
 */const ot=new Map,po=new Map,Wt=new Map;function _n(n,e){try{n.container.addComponent(e)}catch(t){J.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function je(n){const e=n.name;if(Wt.has(e))return J.debug(`There were multiple attempts to register component ${e}.`),!1;Wt.set(e,n);for(const t of ot.values())_n(t,n);for(const t of po.values())_n(t,n);return!0}function pr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function N(n){return n==null?!1:n.settings!==void 0}/**
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
 */const go={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ae=new We("app","Firebase",go);/**
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
 */class mo{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ie("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ae.create("app-deleted",{appName:this._name})}}/**
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
 */const ze=ho;function gr(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ht,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw ae.create("bad-app-name",{appName:String(s)});if(t||(t=lr()),!t)throw ae.create("no-options");const i=ot.get(s);if(i){if(we(t,i.options)&&we(r,i.config))return i;throw ae.create("duplicate-app",{appName:s})}const o=new wi(s);for(const c of Wt.values())o.addComponent(c);const a=new mo(t,r,o);return ot.set(s,a),a}function bo(n=Ht){const e=ot.get(n);if(!e&&n===Ht&&lr())return gr();if(!e)throw ae.create("no-app",{appName:n});return e}function ge(n,e,t){var r;let s=(r=fo[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),J.warn(a.join(" "));return}je(new Ie(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const yo="firebase-heartbeat-database",_o=1,$e="firebase-heartbeat-store";let Ot=null;function mr(){return Ot||(Ot=Ni(yo,_o,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore($e)}catch(t){console.warn(t)}}}}).catch(n=>{throw ae.create("idb-open",{originalErrorMessage:n.message})})),Ot}async function vo(n){try{const t=(await mr()).transaction($e),r=await t.objectStore($e).get(br(n));return await t.done,r}catch(e){if(e instanceof le)J.warn(e.message);else{const t=ae.create("idb-get",{originalErrorMessage:e?.message});J.warn(t.message)}}}async function vn(n,e){try{const r=(await mr()).transaction($e,"readwrite");await r.objectStore($e).put(e,br(n)),await r.done}catch(t){if(t instanceof le)J.warn(t.message);else{const r=ae.create("idb-set",{originalErrorMessage:t?.message});J.warn(r.message)}}}function br(n){return`${n.name}!${n.options.appId}`}/**
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
 */const wo=1024,Io=30;class Eo{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ko(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=wn();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Io){const o=Ao(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){J.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=wn(),{heartbeatsToSend:r,unsentEntries:s}=To(this._heartbeatsCache.heartbeats),i=ar(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return J.warn(t),""}}}function wn(){return new Date().toISOString().substring(0,10)}function To(n,e=wo){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),In(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),In(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ko{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return li()?di().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await vo(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return vn(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return vn(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function In(n){return ar(JSON.stringify({version:2,heartbeats:n})).length}function Ao(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function So(n){je(new Ie("platform-logger",e=>new Ui(e),"PRIVATE")),je(new Ie("heartbeat",e=>new Eo(e),"PRIVATE")),ge(Vt,yn,n),ge(Vt,yn,"esm2017"),ge("fire-js","")}So("");var Po="firebase",Co="11.10.0";/**
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
 */ge(Po,Co,"app");function Jt(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function yr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ro=yr,_r=new We("auth","Firebase",yr());/**
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
 */const at=new ur("@firebase/auth");function Oo(n,...e){at.logLevel<=P.WARN&&at.warn(`Auth (${ze}): ${n}`,...e)}function tt(n,...e){at.logLevel<=P.ERROR&&at.error(`Auth (${ze}): ${n}`,...e)}/**
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
 */function V(n,...e){throw Xt(n,...e)}function j(n,...e){return Xt(n,...e)}function Yt(n,e,t){const r=Object.assign(Object.assign({},Ro()),{[e]:t});return new We("auth","Firebase",r).create(e,{appName:n.name})}function U(n){return Yt(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function pt(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&V(n,"argument-error"),Yt(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Xt(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return _r.create(n,...e)}function b(n,e,...t){if(!n)throw Xt(e,...t)}function G(n){const e="INTERNAL ASSERTION FAILED: "+n;throw tt(e),new Error(e)}function Y(n,e){n||G(e)}/**
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
 */function Be(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Zt(){return En()==="http:"||En()==="https:"}function En(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Lo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Zt()||oi()||"connection"in navigator)?navigator.onLine:!0}function xo(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Ke{constructor(e,t){this.shortDelay=e,this.longDelay=t,Y(t>e,"Short delay should be less than long delay!"),this.isMobile=si()||ai()}get(){return Lo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Qt(n,e){Y(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class vr{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;G("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;G("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;G("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const No={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Do=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Mo=new Ke(3e4,6e4);function L(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function x(n,e,t,r,s={}){return wr(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=ke(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l=Object.assign({method:e,headers:c},i);return ii()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&ft(n.emulatorConfig.host)&&(l.credentials="include"),vr.fetch()(await Ir(n,n.config.apiHost,t,a),l)})}async function wr(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},No),e);try{const s=new Fo(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw xe(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw xe(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw xe(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw xe(n,"user-disabled",o);const h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Yt(n,h,l);V(n,h)}}catch(s){if(s instanceof le)throw s;V(n,"network-request-failed",{message:String(s)})}}async function Z(n,e,t,r,s={}){const i=await x(n,e,t,r,s);return"mfaPendingCredential"in i&&V(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Ir(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?Qt(n.config,s):`${n.config.apiScheme}://${s}`;return Do.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function Uo(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Fo{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(j(this.auth,"network-request-failed")),Mo.get())})}}function xe(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=j(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */function Tn(n){return n!==void 0&&n.getResponse!==void 0}function kn(n){return n!==void 0&&n.enterprise!==void 0}class Er{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Uo(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
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
 */async function jo(n){return(await x(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Tr(n,e){return x(n,"GET","/v2/recaptchaConfig",L(n,e))}/**
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
 */async function $o(n,e){return x(n,"POST","/v1/accounts:delete",e)}async function Bo(n,e){return x(n,"POST","/v1/accounts:update",e)}async function ct(n,e){return x(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function De(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Vo(n,e=!1){const t=C(n),r=await t.getIdToken(e),s=gt(r);b(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:De(Lt(s.auth_time)),issuedAtTime:De(Lt(s.iat)),expirationTime:De(Lt(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Lt(n){return Number(n)*1e3}function gt(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return tt("JWT malformed, contained fewer than 3 sections"),null;try{const s=cr(t);return s?JSON.parse(s):(tt("Failed to decode base64 JWT payload"),null)}catch(s){return tt("Caught error parsing JWT payload as JSON",s?.toString()),null}}function An(n){const e=gt(n);return b(e,"internal-error"),b(typeof e.exp<"u","internal-error"),b(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ue(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof le&&Ho(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Ho({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Wo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class zt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=De(this.lastLoginAt),this.creationTime=De(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ve(n){var e;const t=n.auth,r=await n.getIdToken(),s=await ue(n,ct(t,{idToken:r}));b(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?kr(i.providerUserInfo):[],a=Ko(n.providerData,o),c=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!a?.length,h=c?l:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new zt(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(n,u)}async function zo(n){const e=C(n);await Ve(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ko(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function kr(n){return n.map(e=>{var{providerId:t}=e,r=Jt(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Go(n,e){const t=await wr(n,{},async()=>{const r=ke({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Ir(n,s,"/v1/token",`key=${i}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return n.emulatorConfig&&ft(n.emulatorConfig.host)&&(c.credentials="include"),vr.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function qo(n,e){return x(n,"POST","/v2/accounts:revokeToken",L(n,e))}/**
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
 */class me{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b(typeof e.idToken<"u","internal-error"),b(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):An(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){b(e.length!==0,"internal-error");const t=An(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Go(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new me;return r&&(b(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(b(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(b(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new me,this.toJSON())}_performRefresh(){return G("not implemented")}}/**
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
 */function ee(n,e){b(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class W{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Jt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Wo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new zt(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await ue(this,this.stsTokenManager.getToken(this.auth,e));return b(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Vo(this,e)}reload(){return zo(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new W(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ve(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(N(this.auth.app))return Promise.reject(U(this.auth));const e=await this.getIdToken();return await ue(this,$o(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,o,a,c,l,h;const u=(r=t.displayName)!==null&&r!==void 0?r:void 0,d=(s=t.email)!==null&&s!==void 0?s:void 0,m=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,I=(o=t.photoURL)!==null&&o!==void 0?o:void 0,_=(a=t.tenantId)!==null&&a!==void 0?a:void 0,g=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,f=(l=t.createdAt)!==null&&l!==void 0?l:void 0,v=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:k,emailVerified:M,isAnonymous:y,providerData:T,stsTokenManager:S}=t;b(k&&S,e,"internal-error");const E=me.fromJSON(this.name,S);b(typeof k=="string",e,"internal-error"),ee(u,e.name),ee(d,e.name),b(typeof M=="boolean",e,"internal-error"),b(typeof y=="boolean",e,"internal-error"),ee(m,e.name),ee(I,e.name),ee(_,e.name),ee(g,e.name),ee(f,e.name),ee(v,e.name);const A=new W({uid:k,auth:e,email:d,emailVerified:M,displayName:u,isAnonymous:y,photoURL:I,phoneNumber:m,tenantId:_,stsTokenManager:E,createdAt:f,lastLoginAt:v});return T&&Array.isArray(T)&&(A.providerData=T.map(O=>Object.assign({},O))),g&&(A._redirectEventId=g),A}static async _fromIdTokenResponse(e,t,r=!1){const s=new me;s.updateFromServerResponse(t);const i=new W({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ve(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];b(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?kr(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,a=new me;a.updateFromIdToken(r);const c=new W({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new zt(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
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
 */const Sn=new Map;function q(n){Y(n instanceof Function,"Expected a class definition");let e=Sn.get(n);return e?(Y(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Sn.set(n,e),e)}/**
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
 */class Ar{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ar.type="NONE";const Pn=Ar;/**
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
 */function nt(n,e,t){return`firebase:${n}:${e}:${t}`}class be{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=nt(this.userKey,s.apiKey,i),this.fullPersistenceKey=nt("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ct(this.auth,{idToken:e}).catch(()=>{});return t?W._fromGetAccountInfoResponse(this.auth,t,e):null}return W._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new be(q(Pn),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||q(Pn);const o=nt(r,e.config.apiKey,e.name);let a=null;for(const l of t)try{const h=await l._get(o);if(h){let u;if(typeof h=="string"){const d=await ct(e,{idToken:h}).catch(()=>{});if(!d)break;u=await W._fromGetAccountInfoResponse(e,d,h)}else u=W._fromJSON(e,h);l!==i&&(a=u),i=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new be(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new be(i,e,r))}}/**
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
 */function Cn(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Rr(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Sr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Lr(e))return"Blackberry";if(xr(e))return"Webos";if(Pr(e))return"Safari";if((e.includes("chrome/")||Cr(e))&&!e.includes("edge/"))return"Chrome";if(Or(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Sr(n=F()){return/firefox\//i.test(n)}function Pr(n=F()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Cr(n=F()){return/crios\//i.test(n)}function Rr(n=F()){return/iemobile/i.test(n)}function Or(n=F()){return/android/i.test(n)}function Lr(n=F()){return/blackberry/i.test(n)}function xr(n=F()){return/webos/i.test(n)}function en(n=F()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Jo(n=F()){var e;return en(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Yo(){return ci()&&document.documentMode===10}function Nr(n=F()){return en(n)||Or(n)||xr(n)||Lr(n)||/windows phone/i.test(n)||Rr(n)}/**
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
 */function Dr(n,e=[]){let t;switch(n){case"Browser":t=Cn(F());break;case"Worker":t=`${Cn(F())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ze}/${r}`}/**
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
 */class Xo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function Zo(n,e={}){return x(n,"GET","/v2/passwordPolicy",L(n,e))}/**
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
 */const Qo=6;class ea{constructor(e){var t,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Qo,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,o,a;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class ta{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Rn(this),this.idTokenSubscription=new Rn(this),this.beforeStateQueue=new Xo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_r,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=q(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await be.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ct(this,{idToken:e}),r=await W._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(N(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ve(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=xo()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(N(this.app))return Promise.reject(U(this));const t=e?C(e):null;return t&&b(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return N(this.app)?Promise.reject(U(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return N(this.app)?Promise.reject(U(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(q(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Zo(this),t=new ea(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new We("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await qo(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&q(e)||this._popupRedirectResolver;b(t,this,"argument-error"),this.redirectPersistenceManager=await be.create(this,[q(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dr(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(N(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Oo(`Error while retrieving App Check token: ${t.error}`),t?.token}}function D(n){return C(n)}class Rn{constructor(e){this.auth=e,this.observer=null,this.addObserver=gi(t=>this.observer=t)}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ge={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function na(n){Ge=n}function tn(n){return Ge.loadJS(n)}function ra(){return Ge.recaptchaV2Script}function sa(){return Ge.recaptchaEnterpriseScript}function ia(){return Ge.gapiScript}function Mr(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const oa=500,aa=6e4,et=1e12;class ca{constructor(e){this.auth=e,this.counter=et,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new ua(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||et;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||et;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||et;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class la{constructor(){this.enterprise=new da}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class da{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ua{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;b(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=ha(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},aa)},oa))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function ha(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const fa="recaptcha-enterprise",Me="NO_RECAPTCHA";class Ur{constructor(e){this.type=fa,this.auth=D(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{Tr(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new Er(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;kn(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(Me)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new la().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(a=>{if(!t&&kn(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=sa();c.length!==0&&(c+=a),tn(c).then(()=>{s(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function Ce(n,e,t,r=!1,s=!1){const i=new Ur(n);let o;if(s)o=Me;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const a=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ce(n,e,t,r,s){var i,o;if(s==="EMAIL_PASSWORD_PROVIDER")if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Ce(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Ce(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)});else if(s==="PHONE_PROVIDER")if(!((o=n._getRecaptchaConfig())===null||o===void 0)&&o.isProviderEnabled("PHONE_PROVIDER")){const a=await Ce(n,e,t);return r(n,a).catch(async c=>{var l;if(((l=n._getRecaptchaConfig())===null||l===void 0?void 0:l.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(c.code==="auth/missing-recaptcha-token"||c.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const h=await Ce(n,e,t,!1,!0);return r(n,h)}return Promise.reject(c)})}else{const a=await Ce(n,e,t,!1,!0);return r(n,a)}else return Promise.reject(s+" provider is not supported.")}async function pa(n){const e=D(n),t=await Tr(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Er(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Ur(e).verify()}/**
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
 */function ga(n,e){const t=pr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(we(i,e??{}))return s;V(s,"already-initialized")}return t.initialize({options:e})}function ma(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(q);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function ba(n,e,t){const r=D(n);b(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Fr(e),{host:o,port:a}=ya(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){b(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),b(we(l,r.config.emulator)&&we(h,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,ft(o)?(ei(`${i}//${o}${c}`),ri("Auth",!0)):_a()}function Fr(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ya(n){const e=Fr(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:On(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:On(o)}}}function On(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function _a(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class mt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return G("not implemented")}_getIdTokenResponse(e){return G("not implemented")}_linkToIdToken(e,t){return G("not implemented")}_getReauthenticationResolver(e){return G("not implemented")}}/**
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
 */async function va(n,e){return x(n,"POST","/v1/accounts:resetPassword",L(n,e))}async function wa(n,e){return x(n,"POST","/v1/accounts:update",e)}async function Ia(n,e){return x(n,"POST","/v1/accounts:signUp",e)}async function Ea(n,e){return x(n,"POST","/v1/accounts:update",L(n,e))}/**
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
 */async function Ta(n,e){return Z(n,"POST","/v1/accounts:signInWithPassword",L(n,e))}async function bt(n,e){return x(n,"POST","/v1/accounts:sendOobCode",L(n,e))}async function ka(n,e){return bt(n,e)}async function Aa(n,e){return bt(n,e)}async function Sa(n,e){return bt(n,e)}async function Pa(n,e){return bt(n,e)}/**
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
 */async function Ca(n,e){return Z(n,"POST","/v1/accounts:signInWithEmailLink",L(n,e))}async function Ra(n,e){return Z(n,"POST","/v1/accounts:signInWithEmailLink",L(n,e))}/**
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
 */class He extends mt{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new He(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new He(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ce(e,t,"signInWithPassword",Ta,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ca(e,{email:this._email,oobCode:this._password});default:V(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ce(e,r,"signUpPassword",Ia,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ra(e,{idToken:t,email:this._email,oobCode:this._password});default:V(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function ye(n,e){return Z(n,"POST","/v1/accounts:signInWithIdp",L(n,e))}/**
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
 */const Oa="http://localhost";class X extends mt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new X(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):V("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Jt(t,["providerId","signInMethod"]);if(!r||!s)return null;const o=new X(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return ye(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ye(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ye(e,t)}buildRequest(){const e={requestUri:Oa,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ke(t)}return e}}/**
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
 */async function Ln(n,e){return x(n,"POST","/v1/accounts:sendVerificationCode",L(n,e))}async function La(n,e){return Z(n,"POST","/v1/accounts:signInWithPhoneNumber",L(n,e))}async function xa(n,e){const t=await Z(n,"POST","/v1/accounts:signInWithPhoneNumber",L(n,e));if(t.temporaryProof)throw xe(n,"account-exists-with-different-credential",t);return t}const Na={USER_NOT_FOUND:"user-not-found"};async function Da(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Z(n,"POST","/v1/accounts:signInWithPhoneNumber",L(n,t),Na)}/**
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
 */class Ue extends mt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Ue({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Ue({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return La(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return xa(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Da(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new Ue({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
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
 */function Ma(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ua(n){const e=Oe(Le(n)).link,t=e?Oe(Le(e)).deep_link_id:null,r=Oe(Le(n)).deep_link_id;return(r?Oe(Le(r)).link:null)||r||t||e||n}class yt{constructor(e){var t,r,s,i,o,a;const c=Oe(Le(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,h=(r=c.oobCode)!==null&&r!==void 0?r:null,u=Ma((s=c.mode)!==null&&s!==void 0?s:null);b(l&&h&&u,"argument-error"),this.apiKey=l,this.operation=u,this.code=h,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.lang)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=Ua(e);try{return new yt(t)}catch{return null}}}/**
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
 */class he{constructor(){this.providerId=he.PROVIDER_ID}static credential(e,t){return He._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=yt.parseLink(t);return b(r,"argument-error"),He._fromEmailAndCode(e,r.code,r.tenantId)}}he.PROVIDER_ID="password";he.EMAIL_PASSWORD_SIGN_IN_METHOD="password";he.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ae{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Se extends Ae{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class rt extends Se{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return b("providerId"in t&&"signInMethod"in t,"argument-error"),X._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return b(e.idToken||e.accessToken,"argument-error"),X._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return rt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return rt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:o,providerId:a}=e;if(!r&&!s&&!t&&!i||!a)return null;try{return new rt(a)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:i})}catch{return null}}}/**
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
 */class te extends Se{constructor(){super("facebook.com")}static credential(e){return X._fromParams({providerId:te.PROVIDER_ID,signInMethod:te.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return te.credentialFromTaggedObject(e)}static credentialFromError(e){return te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return te.credential(e.oauthAccessToken)}catch{return null}}}te.FACEBOOK_SIGN_IN_METHOD="facebook.com";te.PROVIDER_ID="facebook.com";/**
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
 */class ne extends Se{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return X._fromParams({providerId:ne.PROVIDER_ID,signInMethod:ne.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ne.credentialFromTaggedObject(e)}static credentialFromError(e){return ne.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ne.credential(t,r)}catch{return null}}}ne.GOOGLE_SIGN_IN_METHOD="google.com";ne.PROVIDER_ID="google.com";/**
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
 */class re extends Se{constructor(){super("github.com")}static credential(e){return X._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return re.credential(e.oauthAccessToken)}catch{return null}}}re.GITHUB_SIGN_IN_METHOD="github.com";re.PROVIDER_ID="github.com";/**
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
 */class se extends Se{constructor(){super("twitter.com")}static credential(e,t){return X._fromParams({providerId:se.PROVIDER_ID,signInMethod:se.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return se.credentialFromTaggedObject(e)}static credentialFromError(e){return se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return se.credential(t,r)}catch{return null}}}se.TWITTER_SIGN_IN_METHOD="twitter.com";se.PROVIDER_ID="twitter.com";/**
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
 */async function jr(n,e){return Z(n,"POST","/v1/accounts:signUp",L(n,e))}/**
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
 */class z{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await W._fromIdTokenResponse(e,r,s),o=xn(r);return new z({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=xn(r);return new z({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function xn(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function Sd(n){var e;if(N(n.app))return Promise.reject(U(n));const t=D(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new z({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await jr(t,{returnSecureToken:!0}),s=await z._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
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
 */class lt extends le{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,lt.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new lt(e,t,r,s)}}function $r(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?lt._fromErrorAndOperation(n,i,e,r):i})}/**
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
 */function Br(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function Pd(n,e){const t=C(n);await _t(!0,t,e);const{providerUserInfo:r}=await Bo(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=Br(r||[]);return t.providerData=t.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Vr(n,e,t=!1){const r=await ue(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return z._forOperation(n,"link",r)}async function _t(n,e,t){await Ve(e);const r=Br(e.providerData),s=n===!1?"provider-already-linked":"no-such-provider";b(r.has(t)===n,e.auth,s)}/**
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
 */async function Fa(n,e,t=!1){const{auth:r}=n;if(N(r.app))return Promise.reject(U(r));const s="reauthenticate";try{const i=await ue(n,$r(r,s,e,n),t);b(i.idToken,r,"internal-error");const o=gt(i.idToken);b(o,r,"internal-error");const{sub:a}=o;return b(n.uid===a,r,"user-mismatch"),z._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&V(r,"user-mismatch"),i}}/**
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
 */async function Hr(n,e,t=!1){if(N(n.app))return Promise.reject(U(n));const r="signIn",s=await $r(n,r,e),i=await z._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function nn(n,e){return Hr(D(n),e)}async function ja(n,e){const t=C(n);return await _t(!1,t,e.providerId),Vr(t,e)}/**
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
 */async function $a(n,e){return Z(n,"POST","/v1/accounts:signInWithCustomToken",L(n,e))}/**
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
 */async function Cd(n,e){if(N(n.app))return Promise.reject(U(n));const t=D(n),r=await $a(t,{token:e,returnSecureToken:!0}),s=await z._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(s.user),s}/**
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
 */function vt(n,e,t){var r;b(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),b(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),b(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(b(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(b(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
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
 */async function rn(n){const e=D(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Rd(n,e,t){const r=D(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&vt(r,s,t),await ce(r,s,"getOobCode",Aa,"EMAIL_PASSWORD_PROVIDER")}async function Od(n,e,t){await va(C(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&rn(n),r})}async function Ld(n,e){await Ea(C(n),{oobCode:e})}async function xd(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=D(n),o=await ce(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",jr,"EMAIL_PASSWORD_PROVIDER").catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&rn(n),c}),a=await z._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function Nd(n,e,t){return N(n.app)?Promise.reject(U(n)):nn(C(n),he.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&rn(n),r})}/**
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
 */async function Dd(n,e,t){const r=D(n),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(o,a){b(a.handleCodeInApp,r,"argument-error"),a&&vt(r,o,a)}i(s,t),await ce(r,s,"getOobCode",Sa,"EMAIL_PASSWORD_PROVIDER")}function Md(n,e){const t=yt.parseLink(e);return t?.operation==="EMAIL_SIGNIN"}async function Ud(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=C(n),s=he.credentialWithLink(e,t||Be());return b(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),nn(r,s)}/**
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
 */async function Ba(n,e){return x(n,"POST","/v1/accounts:createAuthUri",L(n,e))}/**
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
 */async function Fd(n,e){const t=Zt()?Be():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:s}=await Ba(C(n),r);return s||[]}async function jd(n,e){const t=C(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&vt(t.auth,s,e);const{email:i}=await ka(t.auth,s);i!==n.email&&await n.reload()}async function $d(n,e,t){const r=C(n),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&vt(r.auth,i,t);const{email:o}=await Pa(r.auth,i);o!==n.email&&await n.reload()}/**
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
 */async function Va(n,e){return x(n,"POST","/v1/accounts:update",e)}/**
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
 */async function Bd(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=C(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await ue(r,Va(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function Vd(n,e){const t=C(n);return N(t.auth.app)?Promise.reject(U(t.auth)):Wr(t,e,null)}function Hd(n,e){return Wr(C(n),null,e)}async function Wr(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(i.email=e),t&&(i.password=t);const o=await ue(n,wa(r,i));await n._updateTokensIfNecessary(o,!0)}/**
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
 */function Ha(n){var e,t;if(!n)return null;const{providerId:r}=n,s=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},i=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&n?.idToken){const o=(t=(e=gt(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new _e(i,a)}}if(!r)return null;switch(r){case"facebook.com":return new Wa(i,s);case"github.com":return new za(i,s);case"google.com":return new Ka(i,s);case"twitter.com":return new Ga(i,s,n.screenName||null);case"custom":case"anonymous":return new _e(i,null);default:return new _e(i,r,s)}}class _e{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class zr extends _e{constructor(e,t,r,s){super(e,t,r),this.username=s}}class Wa extends _e{constructor(e,t){super(e,"facebook.com",t)}}class za extends zr{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class Ka extends _e{constructor(e,t){super(e,"google.com",t)}}class Ga extends zr{constructor(e,t,r){super(e,"twitter.com",t,r)}}function Wd(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:Ha(t)}/**
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
 */function zd(n,e){return C(n).setPersistence(e)}function qa(n,e,t,r){return C(n).onIdTokenChanged(e,t,r)}function Ja(n,e,t){return C(n).beforeAuthStateChanged(e,t)}function Ya(n,e,t,r){return C(n).onAuthStateChanged(e,t,r)}function Xa(n){return C(n).signOut()}function Kd(n,e){return D(n).revokeAccessToken(e)}async function Gd(n){return C(n).delete()}/**
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
 */function Nn(n,e){return x(n,"POST","/v2/accounts/mfaEnrollment:start",L(n,e))}const dt="__sak";/**
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
 */class Kr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(dt,"1"),this.storage.removeItem(dt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Za=1e3,Qa=10;class Gr extends Kr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Nr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Yo()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Qa):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Za)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Gr.type="LOCAL";const ec=Gr;/**
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
 */class qr extends Kr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}qr.type="SESSION";const Jr=qr;/**
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
 */function tc(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class wt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new wt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,i)),c=await tc(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}wt.receivers=[];/**
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
 */function It(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class nc{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=It("",20);s.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(u){const d=u;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(h),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function R(){return window}function rc(n){R().location.href=n}/**
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
 */function sn(){return typeof R().WorkerGlobalScope<"u"&&typeof R().importScripts=="function"}async function sc(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ic(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function oc(){return sn()?self:null}/**
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
 */const Yr="firebaseLocalStorageDb",ac=1,ut="firebaseLocalStorage",Xr="fbase_key";class qe{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Et(n,e){return n.transaction([ut],e?"readwrite":"readonly").objectStore(ut)}function cc(){const n=indexedDB.deleteDatabase(Yr);return new qe(n).toPromise()}function Kt(){const n=indexedDB.open(Yr,ac);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ut,{keyPath:Xr})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ut)?e(r):(r.close(),await cc(),e(await Kt()))})})}async function Dn(n,e,t){const r=Et(n,!0).put({[Xr]:e,value:t});return new qe(r).toPromise()}async function lc(n,e){const t=Et(n,!1).get(e),r=await new qe(t).toPromise();return r===void 0?null:r.value}function Mn(n,e){const t=Et(n,!0).delete(e);return new qe(t).toPromise()}const dc=800,uc=3;class Zr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Kt(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>uc)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return sn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=wt._getInstance(oc()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await sc(),!this.activeServiceWorker)return;this.sender=new nc(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ic()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Kt();return await Dn(e,dt,"1"),await Mn(e,dt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Dn(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>lc(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Mn(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Et(s,!1).getAll();return new qe(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),dc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Zr.type="LOCAL";const hc=Zr;/**
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
 */function Un(n,e){return x(n,"POST","/v2/accounts/mfaSignIn:start",L(n,e))}/**
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
 */const xt=Mr("rcb"),fc=new Ke(3e4,6e4);class pc{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=R().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return b(gc(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Tn(R().grecaptcha)?Promise.resolve(R().grecaptcha):new Promise((r,s)=>{const i=R().setTimeout(()=>{s(j(e,"network-request-failed"))},fc.get());R()[xt]=()=>{R().clearTimeout(i),delete R()[xt];const a=R().grecaptcha;if(!a||!Tn(a)){s(j(e,"internal-error"));return}const c=a.render;a.render=(l,h)=>{const u=c(l,h);return this.counter++,u},this.hostLanguage=t,r(a)};const o=`${ra()}?${ke({onload:xt,render:"explicit",hl:t})}`;tn(o).catch(()=>{clearTimeout(i),s(j(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=R().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function gc(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class mc{async load(e){return new ca(e)}clearedOneInstance(){}}/**
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
 */const Fe="recaptcha",bc={theme:"light",type:"image"};class qd{constructor(e,t,r=Object.assign({},bc)){this.parameters=r,this.type=Fe,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=D(e),this.isInvisible=this.parameters.size==="invisible",b(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;b(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new mc:new pc,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(s=>{const i=o=>{o&&(this.tokenChangeListeners.delete(i),s(o))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){b(!this.parameters.sitekey,this.auth,"argument-error"),b(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),b(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=R()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){b(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){b(Zt()&&!sn(),this.auth,"internal-error"),await yc(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await jo(this.auth);b(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return b(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function yc(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class Qr{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Ue._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Jd(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=D(n),s=await es(r,e,C(t));return new Qr(s,i=>nn(r,i))}async function Yd(n,e,t){const r=C(n);await _t(!1,r,"phone");const s=await es(r.auth,e,C(t));return new Qr(s,i=>ja(r,i))}async function es(n,e,t){var r;if(!n._getRecaptchaConfig())try{await pa(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const i=s.session;if("phoneNumber"in s){b(i.type==="enroll",n,"internal-error");const o={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await ce(n,o,"mfaSmsEnrollment",async(h,u)=>{if(u.phoneEnrollmentInfo.captchaResponse===Me){b(t?.type===Fe,h,"argument-error");const d=await Nt(h,u,t);return Nn(h,d)}return Nn(h,u)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneSessionInfo.sessionInfo}else{b(i.type==="signin",n,"internal-error");const o=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;b(o,n,"missing-multi-factor-info");const a={mfaPendingCredential:i.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await ce(n,a,"mfaSmsSignIn",async(u,d)=>{if(d.phoneSignInInfo.captchaResponse===Me){b(t?.type===Fe,u,"argument-error");const m=await Nt(u,d,t);return Un(u,m)}return Un(u,d)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).phoneResponseInfo.sessionInfo}}else{const i={phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await ce(n,i,"sendVerificationCode",async(l,h)=>{if(h.captchaResponse===Me){b(t?.type===Fe,l,"argument-error");const u=await Nt(l,h,t);return Ln(l,u)}return Ln(l,h)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).sessionInfo}}finally{t?._reset()}}async function Nt(n,e,t){b(t.type===Fe,n,"argument-error");const r=await t.verify();b(typeof r=="string",n,"argument-error");const s=Object.assign({},e);if("phoneEnrollmentInfo"in s){const i=s.phoneEnrollmentInfo.phoneNumber,o=s.phoneEnrollmentInfo.captchaResponse,a=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:o,clientType:a,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){const i=s.phoneSignInInfo.captchaResponse,o=s.phoneSignInInfo.clientType,a=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:o,recaptchaVersion:a}}),s}else return Object.assign(s,{recaptchaToken:r}),s}/**
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
 */function Je(n,e){return e?q(e):(b(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class on extends mt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ye(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ye(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ye(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function _c(n){return Hr(n.auth,new on(n),n.bypassAuthState)}function vc(n){const{auth:e,user:t}=n;return b(t,e,"internal-error"),Fa(t,new on(n),n.bypassAuthState)}async function wc(n){const{auth:e,user:t}=n;return b(t,e,"internal-error"),Vr(t,new on(n),n.bypassAuthState)}/**
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
 */class ts{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _c;case"linkViaPopup":case"linkViaRedirect":return wc;case"reauthViaPopup":case"reauthViaRedirect":return vc;default:V(this.auth,"internal-error")}}resolve(e){Y(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Y(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Ic=new Ke(2e3,1e4);async function Xd(n,e,t){if(N(n.app))return Promise.reject(j(n,"operation-not-supported-in-this-environment"));const r=D(n);pt(n,e,Ae);const s=Je(r,t);return new ie(r,"signInViaPopup",e,s).executeNotNull()}async function Zd(n,e,t){const r=C(n);pt(r.auth,e,Ae);const s=Je(r.auth,t);return new ie(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class ie extends ts{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ie.currentPopupAction&&ie.currentPopupAction.cancel(),ie.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){Y(this.filter.length===1,"Popup operations only handle one event");const e=It();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(j(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(j(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ie.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(j(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ic.get())};e()}}ie.currentPopupAction=null;/**
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
 */const Ec="pendingRedirect",st=new Map;class Tc extends ts{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=st.get(this.auth._key());if(!e){try{const r=await kc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}st.set(this.auth._key(),e)}return this.bypassAuthState||st.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function kc(n,e){const t=ss(e),r=rs(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}async function ns(n,e){return rs(n)._set(ss(e),"true")}function Ac(n,e){st.set(n._key(),e)}function rs(n){return q(n._redirectPersistence)}function ss(n){return nt(Ec,n.config.apiKey,n.name)}/**
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
 */function Qd(n,e,t){return Sc(n,e,t)}async function Sc(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=D(n);pt(n,e,Ae),await r._initializationPromise;const s=Je(r,t);return await ns(s,r),s._openRedirect(r,e,"signInViaRedirect")}function eu(n,e,t){return Pc(n,e,t)}async function Pc(n,e,t){const r=C(n);pt(r.auth,e,Ae),await r.auth._initializationPromise;const s=Je(r.auth,t);await _t(!1,r,e.providerId),await ns(s,r.auth);const i=await Cc(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function tu(n,e){return await D(n)._initializationPromise,is(n,e,!1)}async function is(n,e,t=!1){if(N(n.app))return Promise.reject(U(n));const r=D(n),s=Je(r,e),o=await new Tc(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function Cc(n){const e=It(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
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
 */const Rc=600*1e3;class Oc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Lc(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!os(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(j(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Rc&&this.cachedEventUids.clear(),this.cachedEventUids.has(Fn(e))}saveEventToCache(e){this.cachedEventUids.add(Fn(e)),this.lastProcessedEventTime=Date.now()}}function Fn(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function os({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Lc(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return os(n);default:return!1}}/**
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
 */async function xc(n,e={}){return x(n,"GET","/v1/projects",e)}/**
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
 */const Nc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dc=/^https?/;async function Mc(n){if(n.config.emulator)return;const{authorizedDomains:e}=await xc(n);for(const t of e)try{if(Uc(t))return}catch{}V(n,"unauthorized-domain")}function Uc(n){const e=Be(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Dc.test(t))return!1;if(Nc.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Fc=new Ke(3e4,6e4);function jn(){const n=R().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function jc(n){return new Promise((e,t)=>{var r,s,i;function o(){jn(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jn(),t(j(n,"network-request-failed"))},timeout:Fc.get()})}if(!((s=(r=R().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=R().gapi)===null||i===void 0)&&i.load)o();else{const a=Mr("iframefcb");return R()[a]=()=>{gapi.load?o():t(j(n,"network-request-failed"))},tn(`${ia()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw it=null,e})}let it=null;function $c(n){return it=it||jc(n),it}/**
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
 */const Bc=new Ke(5e3,15e3),Vc="__/auth/iframe",Hc="emulator/auth/iframe",Wc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},zc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Kc(n){const e=n.config;b(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Qt(e,Hc):`https://${n.config.authDomain}/${Vc}`,r={apiKey:e.apiKey,appName:n.name,v:ze},s=zc.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ke(r).slice(1)}`}async function Gc(n){const e=await $c(n),t=R().gapi;return b(t,n,"internal-error"),e.open({where:document.body,url:Kc(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Wc,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=j(n,"network-request-failed"),a=R().setTimeout(()=>{i(o)},Bc.get());function c(){R().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const qc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Jc=500,Yc=600,Xc="_blank",Zc="http://localhost";class $n{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Qc(n,e,t,r=Jc,s=Yc){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},qc),{width:r.toString(),height:s.toString(),top:i,left:o}),l=F().toLowerCase();t&&(a=Cr(l)?Xc:t),Sr(l)&&(e=e||Zc,c.scrollbars="yes");const h=Object.entries(c).reduce((d,[m,I])=>`${d}${m}=${I},`,"");if(Jo(l)&&a!=="_self")return el(e||"",a),new $n(null);const u=window.open(e||"",a,h);b(u,n,"popup-blocked");try{u.focus()}catch{}return new $n(u)}function el(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const tl="__/auth/handler",nl="emulator/auth/handler",rl=encodeURIComponent("fac");async function Bn(n,e,t,r,s,i){b(n.config.authDomain,n,"auth-domain-config-required"),b(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ze,eventId:s};if(e instanceof Ae){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",pi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,u]of Object.entries({}))o[h]=u}if(e instanceof Se){const h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${rl}=${encodeURIComponent(c)}`:"";return`${sl(n)}?${ke(a).slice(1)}${l}`}function sl({config:n}){return n.emulator?Qt(n,nl):`https://${n.authDomain}/${tl}`}/**
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
 */const Dt="webStorageSupport";class il{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jr,this._completeRedirectFn=is,this._overrideRedirectResult=Ac}async _openPopup(e,t,r,s){var i;Y((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Bn(e,t,r,Be(),s);return Qc(e,o,It())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Bn(e,t,r,Be(),s);return rc(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Y(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Gc(e),r=new Oc(e);return t.register("authEvent",s=>(b(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Dt,{type:Dt},s=>{var i;const o=(i=s?.[0])===null||i===void 0?void 0:i[Dt];o!==void 0&&t(!!o),V(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Mc(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Nr()||Pr()||en()}}const ol=il;var Vn="@firebase/auth",Hn="1.10.8";/**
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
 */class al{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function cl(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ll(n){je(new Ie("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;b(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dr(n)},l=new ta(r,s,i,c);return ma(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),je(new Ie("auth-internal",e=>{const t=D(e.getProvider("auth").getImmediate());return(r=>new al(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ge(Vn,Hn,cl(n)),ge(Vn,Hn,"esm2017")}/**
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
 */const dl=300,ul=dr("authIdTokenMaxAge")||dl;let Wn=null;const hl=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>ul)return;const s=t?.token;Wn!==s&&(Wn=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function fl(n=bo()){const e=pr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=ga(n,{popupRedirectResolver:ol,persistence:[hc,ec,Jr]}),r=dr("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=hl(i.toString());Ja(t,o,()=>o(t.currentUser)),qa(t,a=>o(a))}}const s=Zs("auth");return s&&ba(t,`http://${s}`),t}function pl(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}na({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=j("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",pl().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ll("Browser");const gl=gr(Us),Mt=fl(gl);/*! Capacitor: https://capacitorjs.com/ - MIT License */var Ee;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Ee||(Ee={}));class Ut extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const ml=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},bl=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:ml(n),i=()=>s()!=="web",o=u=>{const d=l.get(u);return!!(d?.platforms.has(s())||a(u))},a=u=>{var d;return(d=t.PluginHeaders)===null||d===void 0?void 0:d.find(m=>m.name===u)},c=u=>n.console.error(u),l=new Map,h=(u,d={})=>{const m=l.get(u);if(m)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),m.proxy;const I=s(),_=a(u);let g;const f=async()=>(!g&&I in d?g=typeof d[I]=="function"?g=await d[I]():g=d[I]:e!==null&&!g&&"web"in d&&(g=typeof d.web=="function"?g=await d.web():g=d.web),g),v=(E,A)=>{var O,$;if(_){const Q=_?.methods.find(H=>A===H.name);if(Q)return Q.rtype==="promise"?H=>t.nativePromise(u,A.toString(),H):(H,Ye)=>t.nativeCallback(u,A.toString(),H,Ye);if(E)return(O=E[A])===null||O===void 0?void 0:O.bind(E)}else{if(E)return($=E[A])===null||$===void 0?void 0:$.bind(E);throw new Ut(`"${u}" plugin is not implemented on ${I}`,Ee.Unimplemented)}},k=E=>{let A;const O=(...$)=>{const Q=f().then(H=>{const Ye=v(H,E);if(Ye){const Xe=Ye(...$);return A=Xe?.remove,Xe}else throw new Ut(`"${u}.${E}()" is not implemented on ${I}`,Ee.Unimplemented)});return E==="addListener"&&(Q.remove=async()=>A()),Q};return O.toString=()=>`${E.toString()}() { [capacitor code] }`,Object.defineProperty(O,"name",{value:E,writable:!1,configurable:!1}),O},M=k("addListener"),y=k("removeListener"),T=(E,A)=>{const O=M({eventName:E},A),$=async()=>{const H=await O;y({eventName:E,callbackId:H},A)},Q=new Promise(H=>O.then(()=>H({remove:$})));return Q.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await $()},Q},S=new Proxy({},{get(E,A){switch(A){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return _?T:M;case"removeListener":return y;default:return k(A)}}});return r[u]=S,l.set(u,{name:u,proxy:S,platforms:new Set([...Object.keys(d),..._?[I]:[]])}),S};return t.convertFileSrc||(t.convertFileSrc=u=>u),t.getPlatform=s,t.handleError=c,t.isNativePlatform=i,t.isPluginAvailable=o,t.registerPlugin=h,t.Exception=Ut,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},yl=n=>n.Capacitor=bl(n),ve=yl(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Tt=ve.registerPlugin;class as{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,t);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new ve.Exception(e,Ee.Unimplemented)}unavailable(e="not available"){return new ve.Exception(e,Ee.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const s=r.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const zn=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Kn=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class _l extends as{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Kn(s).trim(),i=Kn(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=zn(e.key),r=zn(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${i}; ${o};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Tt("CapacitorCookies",{web:()=>new _l});const vl=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>t(s),r.readAsDataURL(n)}),wl=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,i,o)=>(s[i]=n[e[o]],s),{})},Il=(n,e=!0)=>n?Object.entries(n).reduce((r,s)=>{const[i,o]=s;let a,c;return Array.isArray(o)?(c="",o.forEach(l=>{a=e?encodeURIComponent(l):l,c+=`${i}=${a}&`}),c.slice(0,-1)):(a=e?encodeURIComponent(o):o,c=`${i}=${a}`),`${r}&${c}`},"").substr(1):null,El=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=wl(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,a]of Object.entries(n.data||{}))i.set(o,a);t.body=i.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const i=new FormData;if(n.data instanceof FormData)n.data.forEach((a,c)=>{i.append(c,a)});else for(const a of Object.keys(n.data))i.append(a,n.data[a]);t.body=i;const o=new Headers(t.headers);o.delete("content-type"),t.headers=o}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class Tl extends as{async request(e){const t=El(e,e.webFetchExtra),r=Il(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,t),o=i.headers.get("content-type")||"";let{responseType:a="text"}=i.ok?e:{};o.includes("application/json")&&(a="json");let c,l;switch(a){case"arraybuffer":case"blob":l=await i.blob(),c=await vl(l);break;case"json":c=await i.json();break;case"document":case"text":default:c=await i.text()}const h={};return i.headers.forEach((u,d)=>{h[d]=u}),{data:c,headers:h,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Tt("CapacitorHttp",{web:()=>new Tl});var Gn;(function(n){n.IndexedDbLocal="INDEXED_DB_LOCAL",n.InMemory="IN_MEMORY",n.BrowserLocal="BROWSER_LOCAL",n.BrowserSession="BROWSER_SESSION"})(Gn||(Gn={}));var qn;(function(n){n.APPLE="apple.com",n.FACEBOOK="facebook.com",n.GAME_CENTER="gc.apple.com",n.GITHUB="github.com",n.GOOGLE="google.com",n.MICROSOFT="microsoft.com",n.PLAY_GAMES="playgames.google.com",n.TWITTER="twitter.com",n.YAHOO="yahoo.com",n.PASSWORD="password",n.PHONE="phone"})(qn||(qn={}));const fe=Tt("FirebaseAuthentication",{web:()=>Te(()=>import("./web-r2fcZvUL.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(n=>new n.FirebaseAuthenticationWeb)}),cs=p.createContext(null),kl=({children:n})=>{const[e,t]=p.useState(null),[r,s]=p.useState(null),[i,o]=p.useState(!0),[a,c]=p.useState(!1),h=ht()?.socket;p.useEffect(()=>{if(h&&e)return h.on("balanceUpdated",_=>{if(console.log("[AuthContext] Received balanceUpdated event:",_),_&&typeof _.balance=="number"){console.log(`[AuthContext] Updating user balance from ${e?.balance} to ${_.balance}`);const g={...e,balance:_.balance};t(g)}else console.warn("[AuthContext] Received invalid balance data:",_)}),()=>{h.off("balanceUpdated")}},[h,e]);const u=async _=>{if(!_)return null;try{const g=await fetch(`${nr}/auth/me`,{headers:{Authorization:`Bearer ${_}`,"Content-Type":"application/json"}});return g.ok?(await g.json()).user:null}catch(g){return console.error("[Auth] Error fetching user data:",g),null}};p.useEffect(()=>{const _=ve.isNativePlatform(),g=async f=>{if(!f){t(null),s(null),o(!1);return}s(f);const v=await u(f);v?t(v):(t(null),s(null)),o(!1)};if(_){const f=fe.addListener("authStateChange",async v=>{if(v.user){const k=await fe.getIdToken();await g(k.token)}else await g(null)});return fe.getCurrentUser().then(async v=>{if(v.user){const k=await fe.getIdToken();await g(k.token)}else o(!1)}),()=>f.remove()}else{const f=Ya(Mt,async v=>{if(v){const k=await v.getIdToken();await g(k)}else await g(null)});return()=>f()}},[]);const d=async(_,g)=>{t(_),s(g),c(!0);const f=await u(g);f&&t(f)},m=p.useCallback(async()=>{await(ve.isNativePlatform()?fe.signOut():Xa(Mt)),t(null),s(null),c(!1)},[]),I=p.useCallback(async()=>{const g=ve.isNativePlatform()?(await fe.getIdToken({forceRefresh:!0})).token:await Mt.currentUser?.getIdToken(!0);if(!g){m();return}s(g);const f=await u(g);f?t(f):m()},[m]);return i?null:w.jsx(cs.Provider,{value:{user:e,token:r,login:d,logout:m,refreshUserData:I,loading:i},children:n})},kt=()=>{const n=p.useContext(cs);if(!n)throw new Error("useAuth must be used within an AuthProvider");return n},ls=p.createContext(),nu=()=>p.useContext(ls),Al=({children:n})=>{const{socket:e,isConnected:t}=ht(),[r,s]=p.useState([]),[i,o]=p.useState(!0),[a,c]=p.useState(null);p.useEffect(()=>{if(!e||!t)return;const h=d=>{s(d),o(!1)},u=d=>{console.error("[LobbyContext] Socket error:",d.message||d),c(d.message||"An error occurred"),o(!1)};return e.on("gameList",h),e.on("error",u),e.emit("getGameList"),()=>{e.off("gameList",h),e.off("error",u)}},[e,t]);const l={gameList:r,loading:i,error:a};return w.jsx(ls.Provider,{value:l,children:n})},Sl=p.lazy(()=>Te(()=>import("./ModernAuthPage-C5tdbcp_.js"),__vite__mapDeps([4,1,5,6,7,8,2,3,9]),import.meta.url)),Pl=p.lazy(()=>Te(()=>import("./AuthPage-DEu7scjL.js"),__vite__mapDeps([10,1,5,6,7,2,3,11]),import.meta.url)),Cl=p.lazy(()=>Te(()=>import("./Lobby-B9zoyL7P.js"),__vite__mapDeps([12,1,5,6,7,13,14,8,2,3,15]),import.meta.url)),Rl=p.lazy(()=>Te(()=>import("./GameRoom-CPJ-qB2P.js"),__vite__mapDeps([16,1,13,14,5,2,3,17]),import.meta.url)),Jn=({children:n})=>{const{user:e,loading:t}=kt();return t?w.jsx(Re,{message:"Checking authentication..."}):e?n:w.jsx(er,{to:"/auth",replace:!0})},Ol=ys([{path:"/",element:w.jsx(Jn,{children:w.jsx(Al,{children:w.jsx(p.Suspense,{fallback:w.jsx(Re,{message:"Loading..."}),children:w.jsx(Cl,{})})})})},{path:"/auth",element:w.jsx(p.Suspense,{fallback:w.jsx(Re,{message:"Loading..."}),children:w.jsx(Sl,{})})},{path:"/migrate",element:w.jsx(p.Suspense,{fallback:w.jsx(Re,{message:"Loading..."}),children:w.jsx(Pl,{})})},{path:"/:gameId",element:w.jsx(Jn,{children:w.jsx(p.Suspense,{fallback:w.jsx(Re,{message:"Loading..."}),children:w.jsx(Rl,{})})})},{path:"*",element:w.jsx(er,{to:"/",replace:!0})}]),Ll=()=>{const[n,e]=p.useState(!1),[t,r]=p.useState(null),[s,i]=p.useState("text"),[o,a]=p.useState(""),[c,l]=p.useState(!1);p.useEffect(()=>{const _=()=>{const f=document.body.classList.contains("gamepad-navigation-active");l(f)};_();const g=new MutationObserver(_);return g.observe(document.body,{attributes:!0,attributeFilter:["class"]}),()=>g.disconnect()},[]);const h=p.useCallback((_,g="text",f="")=>{_&&(r(_),i(g),a(f),e(!0),_.blur())},[]),u=p.useCallback(()=>{e(!1),r(null),i("text"),a("")},[]),d=p.useCallback(_=>{if(!t)return;Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,_||"");const f=new Event("input",{bubbles:!0});t.dispatchEvent(f);const v=new Event("change",{bubbles:!0});t.dispatchEvent(v),u()},[t,u]),m=p.useCallback((_,g="text",f="")=>{if(!_)return;let v=_;_.querySelector&&_.querySelector("input")&&(v=_.querySelector("input"));const k=M=>{c&&document.body.classList.contains("gamepad-navigation-active")&&(M.preventDefault(),h(v,g,f))};return v.addEventListener("click",k),()=>{v.removeEventListener("click",k)}},[c,h]),I=p.useCallback(()=>t?.value||"",[t]);return{isVisible:n,inputType:s,keyboardTitle:o,currentInput:t,isGamepadActive:c,showKeyboard:h,hideKeyboard:u,handleEnter:d,enhanceInput:m,getCurrentInputValue:I}},xl="_overlay_12fs3_1",Nl="_modal_12fs3_17",Dl="_header_12fs3_38",Ml="_closeButton_12fs3_55",Ul="_sectionHeader_12fs3_74",Fl="_settingDescription_12fs3_90",jl="_errorMessage_12fs3_112",$l="_content_12fs3_122",Bl="_footer_12fs3_151",pe={overlay:xl,modal:Nl,header:Dl,closeButton:Ml,sectionHeader:Ul,settingDescription:Fl,errorMessage:jl,content:$l,footer:Bl};let Yn=0;function Vl({title:n,onClose:e,children:t,footer:r,headerButtons:s,className:i="",overlayStyle:o,...a}){p.useEffect(()=>(++Yn===1&&document.body.classList.add("modal-open"),()=>{--Yn===0&&document.body.classList.remove("modal-open")}),[]);const c=w.jsx("div",{className:pe.overlay,style:o,onClick:e,children:w.jsxs("div",{className:`${pe.modal} ${i}`,onClick:l=>l.stopPropagation(),...a,children:[n&&w.jsxs("div",{className:pe.header,children:[w.jsx("h2",{children:n}),w.jsxs("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center"},children:[s,w.jsx("button",{className:pe.closeButton,onClick:e,"aria-label":"Close",type:"button","data-gamepad-focusable":"true",children:"×"})]})]}),w.jsx("div",{className:pe.content,children:t}),r&&w.jsx("div",{className:pe.footer,children:r})]})});return _s.createPortal(c,document.body)}const Hl="_keyboardModal_nsw4g_2",Wl="_inputDisplay_nsw4g_7",zl="_tempInput_nsw4g_12",Kl="_keyboardGrid_nsw4g_37",Gl="_keyRow_nsw4g_41",ql="_key_nsw4g_2",Jl="_specialKey_nsw4g_87",Yl="_spaceKey_nsw4g_98",Xl="_activeShift_nsw4g_103",K={keyboardModal:Hl,inputDisplay:Wl,tempInput:zl,keyboardGrid:Kl,keyRow:Gl,key:ql,specialKey:Jl,spaceKey:Yl,activeShift:Xl},Zl=({isVisible:n,onClose:e,onEnter:t,inputType:r="text",initialValue:s=""})=>{const{keyboardTitle:i}=Ql(),[o,a]=p.useState("lowercase"),[c,l]=p.useState("");p.useEffect(()=>{l(n?r==="number"?s&&s!=="0"?s:"":s||"":"")},[n,s,r]);const d={lowercase:[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["shift","z","x","c","v","b","n","m","backspace"],["space","enter"]],uppercase:[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["shift","Z","X","C","V","B","N","M","backspace"],["space","enter"]],numbers:[["1","2","3"],["4","5","6"],["7","8","9"],["0","backspace"],["enter"]]}[r==="number"?"numbers":o],m=p.useCallback(g=>{switch(g){case"shift":a(f=>f==="lowercase"?"uppercase":"lowercase");break;case"backspace":l(f=>f.slice(0,-1));break;case"enter":t?.(c);break;case"space":l(f=>f+" ");break;default:l(f=>f+g);break}},[t,c]),I=g=>{switch(g){case"shift":return"⇧";case"backspace":return"⌫";case"space":return"Space";case"enter":return"↵";default:return g}},_=g=>{let f=K.key;return["shift","backspace","space","enter"].includes(g)&&(f+=` ${K.specialKey}`),g==="space"&&(f+=` ${K.spaceKey}`),g==="shift"&&o==="uppercase"&&(f+=` ${K.activeShift}`),f};return p.useEffect(()=>{if(n){const g=f=>{f.key==="Escape"&&(f.preventDefault(),e?.())};return document.addEventListener("keydown",g),()=>{document.removeEventListener("keydown",g)}}},[n,e]),n?w.jsxs(Vl,{title:i||(r==="number"?"Number Pad":"Virtual Keyboard"),onClose:e,className:K.keyboardModal,overlayStyle:{zIndex:1300},children:[w.jsx("div",{className:K.inputDisplay,children:w.jsx("input",{type:r==="password"?"password":"text",value:c,className:K.tempInput,readOnly:!0,placeholder:"Type below..."})}),w.jsx("div",{className:K.keyboardGrid,children:d.map((g,f)=>w.jsx("div",{className:K.keyRow,children:g.map((v,k)=>w.jsx("button",{className:_(v),onClick:()=>m(v),"data-gamepad-focusable":"true","aria-label":v==="backspace"?"Backspace":v==="enter"?"Enter":v==="space"?"Space":v==="shift"?"Shift":v,children:I(v)},`${f}-${k}`))},f))})]}):null},ds=p.createContext(),Ql=()=>{const n=p.useContext(ds);if(!n)throw new Error("useVirtualKeyboardContext must be used within a VirtualKeyboardProvider");return n},ed=({children:n})=>{const e=Ll(),{isVisible:t,inputType:r,hideKeyboard:s,handleEnter:i,getCurrentInputValue:o}=e;return w.jsxs(ds.Provider,{value:e,children:[n,t&&w.jsx(Zl,{isVisible:t,inputType:r,initialValue:o(),onClose:s,onEnter:i})]})},td="_toast_1g2ii_1",nd="_slideOut_1g2ii_32",rd="_iconWrapper_1g2ii_47",sd="_icon_1g2ii_47",id="_emojiIcon_1g2ii_62",od="_content_1g2ii_76",ad="_title_1g2ii_83",cd="_message_1g2ii_90",ld="_emojiMessage_1g2ii_98",dd="_playerName_1g2ii_105",ud="_reactionText_1g2ii_111",hd="_emojiReaction_1g2ii_117",fd="_closeButton_1g2ii_135",B={toast:td,slideOut:nd,iconWrapper:rd,icon:sd,emojiIcon:id,content:od,title:ad,message:cd,emojiMessage:ld,playerName:dd,reactionText:ud,emojiReaction:hd,closeButton:fd},pd=({title:n,message:e,emoji:t="ℹ",color:r="#3498db",duration:s=4e3,onClose:i,position:o})=>{const[a,c]=p.useState(!0);p.useEffect(()=>{if(s>0){const h=setTimeout(()=>{c(!1),setTimeout(i,300)},s);return()=>clearTimeout(h)}},[s,i]);const l=!n&&t!=="ℹ";return w.jsxs("div",{className:`${B.toast} ${l&&a?B.emojiReaction:""} ${a?"":B.slideOut}`,style:{top:"max(20px, var(--safe-area-inset-top))",zIndex:1e4+o,borderColor:r},children:[w.jsx("div",{className:B.iconWrapper,children:w.jsx("span",{className:`${B.icon} ${l?B.emojiIcon:""}`,style:{color:r,textShadow:l?`0 0 20px ${r}, 0 0 40px ${r}60`:`0 0 8px ${r}80`},children:t})}),w.jsxs("div",{className:B.content,children:[n&&w.jsx("div",{className:B.title,children:n}),w.jsx("div",{className:`${B.message} ${l?B.emojiMessage:""}`,children:l?w.jsxs(w.Fragment,{children:[w.jsx("span",{className:B.playerName,children:w.jsx(Hs,{username:e})}),w.jsx("span",{className:B.reactionText,children:"reacted!"})]}):e})]}),w.jsx("button",{className:B.closeButton,onClick:i,"aria-label":"Close notification",children:"×"})]})},gd=p.createContext(),md=({children:n})=>{const[e,t]=p.useState([]),[r,s]=p.useState([]),[i,o]=p.useState(0),{socket:a}=ht(),c=p.useCallback((f,v,k="ℹ",M="#3498db",y=4e3)=>{const T=Date.now()+Math.random(),S={id:T,title:f,message:v,emoji:k,color:M,duration:y},E=Date.now();return E-i>=600?(t(O=>[...O,S]),o(E)):s(O=>[...O,S]),T},[i]),l=p.useCallback(f=>{t(v=>v.filter(k=>k.id!==f))},[]),h=p.useCallback((f,v,k)=>c(f,v,"✓","#27ae60",k),[c]),u=p.useCallback((f,v,k)=>c(f,v,"✕","#e74c3c",k),[c]),d=p.useCallback((f,v,k)=>c(f,v,"⚠","#f39c12",k),[c]),m=p.useCallback((f,v,k)=>c(f,v,"ℹ","#3498db",k),[c]),I=p.useCallback((f,v,k)=>c(f,v,"🎮","#9b59b6",k),[c]),_=p.useCallback((f,v,k)=>c(f,v,"💰","#16a085",k),[c]);p.useEffect(()=>{if(r.length===0)return;const f=setTimeout(()=>{const v=r[0];s(k=>k.slice(1)),t(k=>[...k,v]),o(Date.now())},600);return()=>clearTimeout(f)},[r,e]),p.useEffect(()=>{if(!a)return;const f=v=>{c(v.title||"",v.message,v.emoji||"ℹ",v.color||"#3498db",v.duration)};return a.on("toast",f),()=>{a.off("toast",f)}},[a,c]);const g={addToast:c,removeToast:l,showSuccess:h,showError:u,showWarning:d,showInfo:m,showGameEvent:I,showMoneyEvent:_,toasts:e};return w.jsxs(gd.Provider,{value:g,children:[n,w.jsx("div",{className:"toast-container",style:{position:"fixed",top:0,right:0,zIndex:1e4},children:e.map((f,v)=>w.jsx(pd,{title:f.title,message:f.message,emoji:f.emoji,color:f.color,duration:f.duration,position:v,onClose:()=>l(f.id)},f.id))})]})};function bd(){return p.useEffect(()=>{jt.initialize()},[]),w.jsx(md,{children:w.jsx(ed,{children:w.jsx(vs,{router:Ol})})})}const Xn={default:{"--bg-primary":"#1a2a3a","--bg-secondary":"#2c3e50","--bg-card":"#152534","--bg-card-dark":"#1c2a3a","--bg-panel-start":"#1e2a38","--bg-panel-end":"#2980b9","--bg-loading":"#1a1a2e","--text-primary":"#ecf0f1","--text-secondary":"#bdc3c7","--text-dark":"#2c3e50","--text-light":"#ecf0f1","--text-muted":"#7f8c8d","--text-white":"#ffffff","--text-gray":"#666666","--text-error":"#e74c3c","--text-success":"#2ecc71","--text-warning":"#f1c40f","--text-info":"#3498db","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#3498db","--info-dark":"#2980b9","--info-light":"#5dade2","--success":"#2ecc71","--success-dark":"#27ae60","--success-light":"#58d68d","--btn-primary-start":"#3498db","--btn-primary-end":"#27ae60","--btn-primary-hover-start":"#3fa9e5","--btn-primary-hover-end":"#2ecc71","--btn-secondary-start":"rgba(52, 73, 94, 0.9)","--btn-secondary-end":"rgba(44, 62, 80, 0.9)","--btn-secondary-hover-start":"rgba(52, 73, 94, 1)","--btn-secondary-hover-end":"rgba(44, 62, 80, 1)","--btn-tertiary-start":"#3498db","--btn-tertiary-end":"#2980b9","--btn-tertiary-hover-start":"#5faee3","--btn-tertiary-hover-end":"#3498db","--btn-tertiary-shadow":"rgba(52, 152, 219, 0.3)","--color-focus":"#00ff88","--color-focus-shadow":"rgba(0, 255, 136, 0.3)","--color-divider-start":"rgba(52, 152, 219, 0.2)","--color-divider-middle":"rgba(52, 152, 219, 0.8)","--color-divider-end":"rgba(52, 152, 219, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#3498db","--accent3":"#00ff88","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(10, 25, 47, 0.95)","--input-bg-hover":"rgba(15, 35, 60, 0.98)","--input-bg-focus":"rgba(20, 40, 70, 1)","--input-text-color":"#ecf0f1","--input-border-color":"rgba(51, 65, 85, 0.7)","--color-glass-dark":"rgba(0, 0, 0, 0.3)","--color-glass-light":"rgba(0, 0, 0, 0.1)"},light:{"--bg-primary":"#f8f9fa","--bg-secondary":"#e9ecef","--bg-card":"#ffffff","--bg-card-dark":"#f1f3f5","--bg-panel-start":"#dee2e6","--bg-panel-end":"#ced4da","--bg-loading":"#e9ecef","--text-primary":"#212529","--text-secondary":"#495057","--text-dark":"#212529","--text-light":"#212529","--text-muted":"#6c757d","--text-white":"#ffffff","--text-gray":"#6c757d","--text-error":"#dc3545","--text-success":"#28a745","--text-warning":"#ffc107","--text-info":"#17a2b8","--text-faded":"rgba(33, 37, 41, 0.6)","--text-subtle":"rgba(33, 37, 41, 0.75)","--text-bright":"rgba(33, 37, 41, 0.9)","--info":"#17a2b8","--info-dark":"#138496","--info-light":"#20c997","--color-glass-dark":"rgba(248, 249, 250, 1)","--color-glass-light":"rgba(233, 236, 239, 0.8)","--success":"#28a745","--success-dark":"#218838","--success-light":"#38c757","--btn-primary-start":"#007bff","--btn-primary-end":"#0056b3","--btn-primary-hover-start":"#0069d9","--btn-primary-hover-end":"#004085","--btn-secondary-start":"rgba(108, 117, 125, 0.2)","--btn-secondary-end":"rgba(73, 80, 87, 0.2)","--btn-secondary-hover-start":"rgba(108, 117, 125, 0.3)","--btn-secondary-hover-end":"rgba(73, 80, 87, 0.3)","--btn-tertiary-start":"#6c757d","--btn-tertiary-end":"#545b62","--btn-tertiary-hover-start":"#5a6268","--btn-tertiary-hover-end":"#454d55","--btn-tertiary-shadow":"rgba(108, 117, 125, 0.3)","--color-focus":"#007bff","--color-focus-shadow":"rgba(0, 123, 255, 0.25)","--color-border-light":"rgba(0, 0, 0, 0.175)","--color-border-lighter":"rgba(0, 0, 0, 0.125)","--color-divider-start":"rgba(0, 123, 255, 0.15)","--color-divider-middle":"rgba(0, 123, 255, 0.5)","--color-divider-end":"rgba(0, 123, 255, 0.15)","--accent":"#ffc107","--accent-dark":"#e0a800","--accent2":"#17a2b8","--accent3":"#28a745","--secondary":"#6c757d","--secondary-dark":"#545b62","--input-bg":"#ffffff","--input-bg-hover":"#f8f9fa","--input-bg-focus":"#ffffff","--input-text-color":"#212529","--input-border-color":"rgba(0, 0, 0, 0.15)"},dark:{"--bg-primary":"#0a0a0a","--bg-secondary":"#161616","--bg-card":"#1a1a1a","--bg-card-dark":"#222222","--bg-panel-start":"#1f1f1f","--bg-panel-end":"#2980b9","--bg-loading":"#0d0d0d","--text-primary":"#e8e8e8","--text-secondary":"#a8a8a8","--text-dark":"#ffffff","--text-light":"#e8e8e8","--text-muted":"#888888","--text-white":"#ffffff","--text-gray":"#999999","--text-error":"#ff6b6b","--text-success":"#51cf66","--text-warning":"#ffd43b","--text-info":"#4dabf7","--text-faded":"rgba(255, 255, 255, 0.45)","--text-subtle":"rgba(255, 255, 255, 0.6)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#2980b9","--info-dark":"#2471a3","--info-light":"#3498db","--success":"#27ae60","--success-dark":"#1e8449","--success-light":"#2ecc71","--btn-primary-start":"#2980b9","--btn-primary-end":"#f39c12","--btn-primary-hover-start":"#3498db","--btn-primary-hover-end":"#f1c40f","--btn-secondary-start":"rgba(33, 37, 41, 0.9)","--btn-secondary-end":"rgba(23, 25, 28, 0.9)","--btn-secondary-hover-start":"rgba(52, 58, 64, 1)","--btn-secondary-hover-end":"rgba(33, 37, 41, 1)","--btn-tertiary-start":"#2980b9","--btn-tertiary-end":"#1f618d","--btn-tertiary-hover-start":"#3498db","--btn-tertiary-hover-end":"#2980b9","--btn-tertiary-shadow":"rgba(41, 128, 185, 0.4)","--color-focus":"#00ccff","--color-focus-shadow":"rgba(0, 204, 255, 0.3)","--color-border-light":"rgba(255, 255, 255, 0.12)","--color-border-lighter":"rgba(255, 255, 255, 0.18)","--color-divider-start":"rgba(41, 128, 185, 0.2)","--color-divider-middle":"rgba(41, 128, 185, 0.8)","--color-divider-end":"rgba(41, 128, 185, 0.2)","--accent":"#f39c12","--accent-dark":"#d68910","--accent2":"#00ccff","--accent3":"#ff6b6b","--secondary":"#c0392b","--secondary-dark":"#a93226","--input-bg":"rgba(255, 255, 255, 0.08)","--input-bg-hover":"rgba(255, 255, 255, 0.1)","--input-bg-focus":"rgba(255, 255, 255, 0.12)","--input-text-color":"var(--text-primary)","--input-border-color":"var(--color-border-light)","--color-glass-dark":"rgba(41, 128, 185, 0.08)","--color-glass-light":"rgba(243, 156, 18, 0.08)"},packers:{"--bg-primary":"#0A1713","--bg-secondary":"#154734","--bg-card":"#0D1F1A","--bg-card-dark":"#122A1F","--bg-panel-start":"#154734","--bg-panel-end":"#203731","--bg-loading":"#061109","--text-primary":"#FFFFFF","--text-secondary":"#FFB612","--text-dark":"#FFB612","--text-light":"#FFFFFF","--text-muted":"#C9B896","--text-white":"#FFFFFF","--text-gray":"#B5A482","--text-error":"#FF6B6B","--text-success":"#FFB612","--text-warning":"#FFC42E","--text-info":"#FFB612","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#FFB612","--info-dark":"#FFA300","--info-light":"#FFC42E","--success":"#203731","--success-dark":"#154734","--success-light":"#2F5645","--btn-primary-start":"#203731","--btn-primary-end":"#154734","--btn-primary-hover-start":"#2F5645","--btn-primary-hover-end":"#203731","--btn-secondary-start":"#FFB612","--btn-secondary-end":"#FFA300","--btn-secondary-hover-start":"#FFC42E","--btn-secondary-hover-end":"#FFB612","--btn-tertiary-start":"#FFB612","--btn-tertiary-end":"#FFA300","--btn-tertiary-hover-start":"#FFC42E","--btn-tertiary-hover-end":"#FFB612","--btn-tertiary-shadow":"rgba(255, 182, 18, 0.3)","--color-focus":"#FFB612","--color-focus-shadow":"rgba(255, 182, 18, 0.3)","--color-divider-start":"rgba(32, 55, 49, 0.2)","--color-divider-middle":"rgba(255, 182, 18, 0.8)","--color-divider-end":"rgba(32, 55, 49, 0.2)","--accent":"#FFB612","--accent-dark":"#FFA300","--accent2":"#C9B896","--accent3":"#FFFFFF","--secondary":"#C9B896","--secondary-dark":"#B5A482","--input-bg":"rgba(21, 71, 52, 0.3)","--input-bg-hover":"rgba(21, 71, 52, 0.4)","--input-bg-focus":"rgba(21, 71, 52, 0.5)","--input-text-color":"#FFFFFF","--input-placeholder-color":"rgba(255, 255, 255, 0.5)","--input-border-color":"rgba(255, 182, 18, 0.4)","--input-border-hover":"rgba(255, 182, 18, 0.6)","--input-border-focus":"#FFB612","--input-border-width":"2px","--input-padding":"12px 16px","--input-font-size":"16px","--input-line-height":"1.5","--input-shadow-focus":"0 0 0 3px rgba(255, 182, 18, 0.25)","--color-glass-dark":"rgba(32, 55, 49, 0.08)","--color-glass-light":"rgba(255, 182, 18, 0.05)"},sunset:{"--bg-primary":"#0c1929","--bg-secondary":"#162544","--bg-card":"#0a1520","--bg-card-dark":"#111f35","--bg-panel-start":"#162544","--bg-panel-end":"#ff6b6b","--bg-loading":"#060d17","--text-primary":"#ffd6a5","--text-secondary":"#ffb088","--text-dark":"#8b5a3c","--text-light":"#ffd6a5","--text-muted":"#daa49a","--text-white":"#fff5f0","--text-gray":"#c9a882","--text-error":"#ff6b6b","--text-success":"#ff9a76","--text-warning":"#ffc93c","--text-info":"#ff8e71","--text-faded":"rgba(255, 214, 165, 0.6)","--text-subtle":"rgba(255, 214, 165, 0.7)","--text-bright":"rgba(255, 214, 165, 0.9)","--info":"#ff8e71","--info-dark":"#ff7657","--info-light":"#ffa589","--success":"#ff9a76","--success-dark":"#ff8561","--success-light":"#ffb088","--btn-primary-start":"#c44569","--btn-primary-end":"#f8961e","--btn-primary-hover-start":"#d65577","--btn-primary-hover-end":"#f9a73e","--btn-secondary-start":"rgba(22, 37, 68, 0.9)","--btn-secondary-end":"rgba(12, 25, 41, 0.9)","--btn-secondary-hover-start":"rgba(28, 46, 78, 1)","--btn-secondary-hover-end":"rgba(22, 37, 68, 1)","--btn-tertiary-start":"#ff6b6b","--btn-tertiary-end":"#ee5a52","--btn-tertiary-hover-start":"#ff8080","--btn-tertiary-hover-end":"#ff6b6b","--btn-tertiary-shadow":"rgba(255, 107, 107, 0.3)","--color-focus":"#ff8e71","--color-focus-shadow":"rgba(255, 142, 113, 0.3)","--color-divider-start":"rgba(196, 69, 105, 0.2)","--color-divider-middle":"rgba(248, 150, 30, 0.8)","--color-divider-end":"rgba(196, 69, 105, 0.2)","--accent":"#f8961e","--accent-dark":"#f37121","--accent2":"#ff6b6b","--accent3":"#c44569","--secondary":"#ff6b6b","--secondary-dark":"#ee5a52","--input-bg":"rgba(12, 25, 41, 0.95)","--input-bg-hover":"rgba(18, 35, 51, 0.98)","--input-bg-focus":"rgba(22, 37, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(255, 142, 113, 0.3)","--color-glass-dark":"rgba(196, 69, 105, 0.08)","--color-glass-light":"rgba(248, 150, 30, 0.05)"},"miami-vice":{"--bg-primary":"#1a0f2e","--bg-secondary":"#2d1844","--bg-card":"#160d28","--bg-card-dark":"#231432","--bg-panel-start":"#2d1844","--bg-panel-end":"#ff6b9d","--bg-loading":"#0f0820","--text-primary":"#ffeaa7","--text-secondary":"#fab1a0","--text-dark":"#74526c","--text-light":"#ffeaa7","--text-muted":"#dfe6e9","--text-white":"#fff5f0","--text-gray":"#b2bec3","--text-error":"#ff7675","--text-success":"#fdcb6e","--text-warning":"#ffeb3b","--text-info":"#00d2d3","--text-faded":"rgba(255, 234, 167, 0.6)","--text-subtle":"rgba(255, 234, 167, 0.7)","--text-bright":"rgba(255, 234, 167, 0.9)","--info":"#00d2d3","--info-dark":"#00b8b8","--info-light":"#01e5e5","--success":"#fdcb6e","--success-dark":"#f9b747","--success-light":"#ffeaa7","--btn-primary-start":"#ff6b9d","--btn-primary-end":"#00d2d3","--btn-primary-hover-start":"#ee5a6f","--btn-primary-hover-end":"#01e5e5","--btn-secondary-start":"rgba(45, 24, 68, 0.9)","--btn-secondary-end":"rgba(26, 15, 46, 0.9)","--btn-secondary-hover-start":"rgba(55, 34, 78, 1)","--btn-secondary-hover-end":"rgba(45, 24, 68, 1)","--btn-tertiary-start":"#00d2d3","--btn-tertiary-end":"#00b8b8","--btn-tertiary-hover-start":"#01e5e5","--btn-tertiary-hover-end":"#00d2d3","--btn-tertiary-shadow":"rgba(0, 210, 211, 0.3)","--color-focus":"#00d2d3","--color-focus-shadow":"rgba(0, 210, 211, 0.3)","--color-divider-start":"rgba(255, 107, 157, 0.2)","--color-divider-middle":"rgba(0, 210, 211, 0.8)","--color-divider-end":"rgba(255, 107, 157, 0.2)","--accent":"#feca57","--accent-dark":"#f9b747","--accent2":"#00d2d3","--accent3":"#ff6b9d","--secondary":"#ff7979","--secondary-dark":"#ff6348","--input-bg":"rgba(26, 15, 46, 0.95)","--input-bg-hover":"rgba(35, 20, 56, 0.98)","--input-bg-focus":"rgba(45, 24, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(0, 210, 211, 0.3)","--color-glass-dark":"rgba(255, 107, 157, 0.08)","--color-glass-light":"rgba(0, 210, 211, 0.05)"},purple:{"--bg-primary":"#1a1a2e","--bg-secondary":"#2d2d44","--bg-card":"#16132d","--bg-card-dark":"#1f1b3a","--bg-panel-start":"#1a1a2e","--bg-panel-end":"#8e44ad","--bg-loading":"#0f0f1a","--text-primary":"#f3e5f5","--text-secondary":"#ce93d8","--text-dark":"#4a148c","--text-light":"#f3e5f5","--text-muted":"#ba68c8","--text-white":"#ffffff","--text-gray":"#9c27b0","--text-error":"#f44336","--text-success":"#ab47bc","--text-warning":"#ffc107","--text-info":"#ba68c8","--text-faded":"rgba(243, 229, 245, 0.6)","--text-subtle":"rgba(243, 229, 245, 0.7)","--text-bright":"rgba(243, 229, 245, 0.9)","--info":"#8e44ad","--info-dark":"#7d3c98","--info-light":"#a569bd","--success":"#a569bd","--success-dark":"#8e44ad","--success-light":"#bb8fce","--btn-primary-start":"#8e44ad","--btn-primary-end":"#f1c40f","--btn-primary-hover-start":"#a569bd","--btn-primary-hover-end":"#f39c12","--btn-secondary-start":"rgba(45, 45, 68, 0.9)","--btn-secondary-end":"rgba(26, 26, 46, 0.9)","--btn-secondary-hover-start":"rgba(58, 58, 88, 1)","--btn-secondary-hover-end":"rgba(45, 45, 68, 1)","--btn-tertiary-start":"#8e44ad","--btn-tertiary-end":"#6c3483","--btn-tertiary-hover-start":"#a569bd","--btn-tertiary-hover-end":"#8e44ad","--btn-tertiary-shadow":"rgba(142, 68, 173, 0.3)","--color-focus":"#cc99ff","--color-focus-shadow":"rgba(204, 153, 255, 0.3)","--color-divider-start":"rgba(142, 68, 173, 0.2)","--color-divider-middle":"rgba(142, 68, 173, 0.8)","--color-divider-end":"rgba(142, 68, 173, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#ab47bc","--accent3":"#ba68c8","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(26, 26, 46, 0.95)","--input-bg-hover":"rgba(35, 35, 55, 0.98)","--input-bg-focus":"rgba(45, 45, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(142, 68, 173, 0.3)","--color-glass-dark":"rgba(142, 68, 173, 0.08)","--color-glass-light":"rgba(241, 196, 15, 0.08)"}},us=n=>{const e=Xn[n]||Xn.default,t=document.documentElement;Object.entries(e).forEach(([r,s])=>{t.style.setProperty(r,s)})},yd=()=>{const n=localStorage.getItem("selectedTheme")||"default";us(n)},ru=()=>localStorage.getItem("selectedTheme")||"default",su=n=>{localStorage.setItem("selectedTheme",n),us(n)},hs=p.createContext(null),fs=n=>{if(!n)return null;const e="https://api.in-between.live";if(n.startsWith("http"))return n;if(n.startsWith("/files/"))return`${e}${n}`;if(n.includes("/uploads/")){const t=n.split("/"),r=t.pop(),s=t[t.length-1];return`${e}/files/${s}/${r}`}else return`${e}${n}`},Zn=n=>n?{...n,profileImg:fs(n.profileImg)}:{},_d=({children:n})=>{const[e,t]=p.useState({profileImg:null,autoAnte:!1,muted:!1,selectedTitle:null}),[r,s]=p.useState(!0),{user:i,token:o}=kt(),a=tr.useCallback(async()=>{if(!i){t({autoAnte:!1}),s(!1);return}try{s(!0);const m="https://api.in-between.live";if(!o){console.error("[Preferences] No token available"),s(!1);return}const I=await fetch(`${m}/preferences`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}});if(!I.ok)throw new Error("Failed to load preferences");const _=await I.json(),f=Zn(_)||{autoAnte:!1,muted:!1};t(f),typeof f.muted<"u"&&jt.setMuted(f.muted)}catch(m){console.error("[Preferences] Error loading preferences:",m),t({autoAnte:!1})}finally{s(!1)}},[i,o]);p.useEffect(()=>{i&&a()},[i,a]);const c=async(m,I)=>{if(!i)return console.error("[Preferences] Cannot update preferences: User not logged in"),!1;try{const _="https://api.in-between.live";if(!o)return console.error("[Preferences] No token available"),!1;t(k=>({...k,[m]:I})),m==="muted"&&jt.setMuted(I);const g=await fetch(`${_}/preferences/${m}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({value:I})});if(!g.ok)throw new Error(`Failed to update ${m} preference`);const f=await g.json(),v=Zn(f);return t(v),!0}catch(_){return console.error(`[Preferences] Error updating ${m}:`,_),await a(),!1}},l=async()=>{const m=!e.autoAnte;return await c("autoAnte",m)},h=async()=>{const m=!e.muted;return await c("muted",m)},u=async m=>await c("selectedTitle",m),d=async m=>{if(!m)return console.error("[Preferences] No file provided for profile image upload"),!1;try{const I=new FormData;I.append("file",m);const _="https://api.in-between.live";if(!o)return console.error("[Preferences] No token available"),!1;const g=await fetch(`${_}/preferences/profileImg`,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:I}),f=await g.text();if(!g.ok)throw new Error(`Failed to upload profile image: ${f}`);const v=f?JSON.parse(f):{},k=fs(v.fileUrl);return t(M=>({...M,profileImg:k})),!0}catch(I){return console.error("[Preferences] Error uploading profile image:",I),!1}};return w.jsx(hs.Provider,{value:{preferences:e,updatePreference:c,toggleAutoAnte:l,toggleMute:h,updateSelectedTitle:u,uploadProfileImg:d,loading:r},children:n})},iu=()=>{const n=p.useContext(hs);if(!n)throw new Error("usePreferences must be used within a PreferencesProvider");return n},ps=p.createContext(null),vd=({children:n})=>{const{socket:e}=ht(),{token:t}=kt(),[r,s]=p.useState(new Map),i=p.useRef(new Set),o=p.useRef(null);p.useEffect(()=>{if(!e)return;const d=({userId:m,data:I})=>{console.log("[UserDataContext] Received user data update:",m,I),s(_=>{const g=new Map(_);return g.set(m,I),g})};return e.on("userDataUpdated",d),()=>{e.off("userDataUpdated",d)}},[e]),p.useEffect(()=>()=>{o.current&&clearTimeout(o.current)},[]);const a=p.useCallback(async d=>{if(!d||d.length===0||!t)return{};try{const m=await fetch(`${nr}/users`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({userIds:d})});if(!m.ok)throw new Error("Failed to fetch users data");const I=await m.json();return s(_=>{const g=new Map(_);return Object.entries(I).forEach(([f,v])=>{g.set(f,v)}),g}),I}catch{return{}}},[t]),c=p.useCallback(()=>{if(i.current.size===0)return;const d=Array.from(i.current);i.current.clear(),a(d)},[a]),l=p.useCallback(d=>{if(!d)return null;const m=r.get(d);return m||(i.current.add(d),o.current&&clearTimeout(o.current),o.current=setTimeout(()=>{c()},10),null)},[r,c]),h=p.useCallback(d=>{const m=d.filter(I=>!r.has(I));m.length>0&&a(m)},[r,a]),u={getUserData:l,prefetchUsers:h};return w.jsx(ps.Provider,{value:u,children:n})},ou=n=>{const e=p.useContext(ps);if(!e)throw new Error("useUserData must be used within UserDataProvider");return e.getUserData(n)},wd="__capgo_keep_url_path_after_reload",Ft="__capgo_history_stack__",Qn=100,Id=typeof window<"u"&&typeof document<"u"&&typeof history<"u";if(Id){const n=window;if(!n.__capgoHistoryPatched){n.__capgoHistoryPatched=!0;const e=()=>{try{if(n.__capgoKeepUrlPathAfterReload)return!0}catch{}try{return window.localStorage.getItem(wd)==="1"}catch{return!1}},t=()=>{try{const y=window.sessionStorage.getItem(Ft);if(!y)return{stack:[],index:-1};const T=JSON.parse(y);return!T||!Array.isArray(T.stack)||typeof T.index!="number"?{stack:[],index:-1}:T}catch{return{stack:[],index:-1}}},r=(y,T)=>{try{window.sessionStorage.setItem(Ft,JSON.stringify({stack:y,index:T}))}catch{}},s=()=>{try{window.sessionStorage.removeItem(Ft)}catch{}},i=y=>{try{const T=y??window.location.href,S=new URL(T instanceof URL?T.toString():T,window.location.href);return`${S.pathname}${S.search}${S.hash}`}catch{return null}},o=(y,T)=>{if(y.length<=Qn)return{stack:y,index:T};const S=y.length-Qn,E=y.slice(S),A=Math.max(0,T-S);return{stack:E,index:A}},a=y=>{document.readyState==="complete"||document.readyState==="interactive"?y():window.addEventListener("DOMContentLoaded",y,{once:!0})};let c=!1,l=!1,h=!1;const u=()=>{if(!c)return;const y=t(),T=i();if(T){if(y.stack.length===0){y.stack.push(T),y.index=0,r(y.stack,y.index);return}(y.index<0||y.index>=y.stack.length)&&(y.index=y.stack.length-1),y.stack[y.index]!==T&&(y.stack[y.index]=T,r(y.stack,y.index))}},d=(y,T)=>{if(!c||l)return;const S=i(y);if(!S)return;let{stack:E,index:A}=t();E.length===0?(E.push(S),A=E.length-1):T?((A<0||A>=E.length)&&(A=E.length-1),E[A]=S):A>=E.length-1?(E.push(S),A=E.length-1):(E=E.slice(0,A+1),E.push(S),A=E.length-1),{stack:E,index:A}=o(E,A),r(E,A)},m=()=>{if(!c||l)return;const y=t();if(y.stack.length===0){u();return}const T=y.index>=0&&y.index<y.stack.length?y.index:y.stack.length-1,S=i();if(y.stack.length===1&&S===y.stack[0])return;const E=y.stack[0];if(!E)return;l=!0;try{history.replaceState(history.state,document.title,E);for(let $=1;$<y.stack.length;$+=1)history.pushState(history.state,document.title,y.stack[$])}catch{l=!1;return}l=!1;const A=y.stack.length-1,O=T-A;O!==0?history.go(O):(history.replaceState(history.state,document.title,y.stack[T]),window.dispatchEvent(new PopStateEvent("popstate")))},I=()=>{!c||h||(h=!0,a(()=>{h=!1,m()}))};let _=null,g=null;const f=()=>{if(!c||l)return;const y=i();if(!y)return;const T=t(),S=T.stack.lastIndexOf(y);S>=0?T.index=S:(T.stack.push(y),T.index=T.stack.length-1);const E=o(T.stack,T.index);r(E.stack,E.index)},v=()=>{_&&g||(_=history.pushState,g=history.replaceState,history.pushState=function(T,S,E){const A=_.call(history,T,S,E);return d(E,!1),A},history.replaceState=function(T,S,E){const A=g.call(history,T,S,E);return d(E,!0),A},window.addEventListener("popstate",f))},k=()=>{_&&(history.pushState=_,_=null),g&&(history.replaceState=g,g=null),window.removeEventListener("popstate",f)},M=y=>{if(c===y){c&&(u(),I());return}c=y,c?(v(),u(),I()):(k(),s())};window.addEventListener("CapacitorUpdaterKeepUrlPathAfterReload",y=>{var T;const S=y,E=(T=S?.detail)===null||T===void 0?void 0:T.enabled;typeof E=="boolean"?(n.__capgoKeepUrlPathAfterReload=E,M(E)):(n.__capgoKeepUrlPathAfterReload=!0,M(!0))}),M(e())}}const Ed=Tt("CapacitorUpdater",{web:()=>Te(()=>import("./web-C-YTKM4M.js"),__vite__mapDeps([18,1,2,3]),import.meta.url).then(n=>new n.CapacitorUpdaterWeb)});yd();window.Capacitor?.isNativePlatform()&&(Ed.notifyAppReady(),window.Capacitor?.getPlatform()==="android"&&(document.documentElement.style.setProperty("--safe-area-inset-top","48px"),document.documentElement.style.setProperty("--safe-area-inset-bottom","0px"),console.log("✅ Android safe area insets set: top=48px")));Ss.createRoot(document.getElementById("root")).render(w.jsx(tr.StrictMode,{children:w.jsx(kl,{children:w.jsx(Fs,{children:w.jsx(vd,{children:w.jsx(_d,{children:w.jsx(bd,{})})})})})}));export{nr as $,ba as A,$d as B,Qd as C,Xd as D,he as E,te as F,re as G,eu as H,Zd as I,ja as J,X as K,Wd as L,Pn as M,hc as N,rt as O,qn as P,Jr as Q,qd as R,ec as S,se as T,w as U,Tt as V,as as W,ve as X,Ed as Y,Ql as Z,Te as _,Ld as a,Mt as a0,fe as a1,kt as a2,ht as a3,ou as a4,Vl as a5,nu as a6,jt as a7,Bs as a8,Hs as a9,iu as aa,pe as ab,ru as ac,su as ad,sr as ae,ps as af,Re as ag,yt as ah,mt as ai,He as aj,Ue as ak,Ja as al,ol as am,Vo as an,ga as ao,Ya as ap,qa as aq,Ro as ar,nn as as,Xa as at,Od as b,xd as c,Gd as d,tu as e,Fd as f,fl as g,ne as h,Md as i,Kd as j,Rd as k,Yd as l,Dd as m,Gn as n,zd as o,Sd as p,Cd as q,zo as r,jd as s,Nd as t,Ud as u,Jd as v,Pd as w,Vd as x,Hd as y,Bd as z};
