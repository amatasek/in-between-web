const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-CYGSIbbt.js","./vendor-x77BqUlH.js","./audio-DijUiIHu.js","./socket-CA1CrNgP.js","./ModernAuthPage-BhI33_-H.js","./useGamepadNavigation-DduwX_rl.js","./AppHeader-DJkLkuqI.js","./AppHeader-Dw3y85lw.css","./openInBrowser-Cnm8eseD.js","./ModernAuthPage-D-klECcc.css","./AuthPage-BKFtDoir.js","./AuthPage-DbcdDhMr.css","./Lobby-b3625-Mx.js","./GamepadInput-DAtaOwyv.js","./GamepadInput-B4hG-7Ng.css","./Lobby-Cu8YMy0m.css","./GameRoom-BoteMUxA.js","./GameRoom-DTN8b981.css","./web-B-m2cFBG.js"])))=>i.map(i=>d[i]);
import{b as gs,d as ys,g as bs,r as m,e as vs,N as tr,f as ws,R as _s,h as nr}from"./vendor-x77BqUlH.js";import{r as Is}from"./audio-DijUiIHu.js";import{l as Es}from"./socket-CA1CrNgP.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var xt={exports:{}},Pe={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cn;function Ts(){if(cn)return Pe;cn=1;var n=gs(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function a(c,l,d){var f,h={},u=null,y=null;d!==void 0&&(u=""+d),l.key!==void 0&&(u=""+l.key),l.ref!==void 0&&(y=l.ref);for(f in l)r.call(l,f)&&!i.hasOwnProperty(f)&&(h[f]=l[f]);if(c&&c.defaultProps)for(f in l=c.defaultProps,l)h[f]===void 0&&(h[f]=l[f]);return{$$typeof:e,type:c,key:u,ref:y,props:h,_owner:s.current}}return Pe.Fragment=t,Pe.jsx=a,Pe.jsxs=a,Pe}var ln;function As(){return ln||(ln=1,xt.exports=Ts()),xt.exports}var o=As(),Ze={},dn;function Ss(){if(dn)return Ze;dn=1;var n=ys();return Ze.createRoot=n.createRoot,Ze.hydrateRoot=n.hydrateRoot,Ze}var xs=Ss();const ks=bs(xs);var Ps=Is();class Cs{constructor(){this.sounds={},this.muted=!1,this.initialized=!1,this.categories=["ui"],this.lastPlayedTime={},this.debounceTime=500,this.audioUnlocked=!1,this.API_URL="https://api.in-between.live",typeof window<"u"&&setTimeout(()=>{this.initialize(),this._setupMobileAudioUnlock()},0)}initialize(){this.initialized||(this.loadCategory("ui"),this.initialized=!0)}loadCategory(e){if(this.sounds[e])return;const t={};e==="ui"&&(t.join=[0,500],t.leave=[500,1e3],t.alert=[1500,1500]),this.sounds[e]=new Ps.Howl({src:[`${this.API_URL}/assets/audio/${e}-sounds.mp3`,`${this.API_URL}/assets/audio/${e}-sounds.webm`],sprite:t,preload:!0,html5:this._isMobileDevice(),format:["mp3","webm"],pool:10})}play(e,t=1){if(this.muted)return;this.initialized||this.initialize();let r,s;if(e.includes(".")?[r,s]=e.split("."):(r="ui",s=e),!this.sounds[r]){this.loadCategory(r);return}const i=`${r}.${s}`,a=Date.now(),c=this.lastPlayedTime[i]||0;if(!(a-c<this.debounceTime))return this.lastPlayedTime[i]=a,this.sounds[r].volume(t),this.sounds[r].play(s)}setMuted(e){this.muted=e,Object.values(this.sounds).forEach(t=>{t&&t.mute&&t.mute(e)})}syncWithPreferences(e){e&&typeof e.muted<"u"&&this.setMuted(e.muted)}_setupMobileAudioUnlock(){if(typeof window>"u"||!this._isMobileDevice())return;const e=()=>{if(this.audioUnlocked)return;const t=new Audio;t.src="data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAQAAAAAAAAAAABSAJAJAQgAAgAAAAiIkfC3/////////////////////",t.load(),t.play().then(()=>{this.audioUnlocked=!0,document.body.removeEventListener("touchstart",e),document.body.removeEventListener("touchend",e),document.body.removeEventListener("click",e)}).catch(r=>{})};document.body.addEventListener("touchstart",e,!1),document.body.addEventListener("touchend",e,!1),document.body.addEventListener("click",e,!1)}_isMobileDevice(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}}const Bt=new Cs,Rs="modulepreload",Os=function(n,e){return new URL(n,e).href},un={},Ae=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){let d=function(f){return Promise.all(f.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const a=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=c?.nonce||c?.getAttribute("nonce");s=d(t.map(f=>{if(f=Os(f,r),f in un)return;un[f]=!0;const h=f.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(r)for(let I=a.length-1;I>=0;I--){const w=a[I];if(w.href===f&&(!h||w.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${u}`))return;const y=document.createElement("link");if(y.rel=h?"stylesheet":Rs,h||(y.as="script"),y.crossOrigin="",y.href=f,l&&y.setAttribute("nonce",l),document.head.appendChild(y),h)return new Promise((I,w)=>{y.addEventListener("load",I),y.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},js="_loadingScreen_16l5s_1",Ls="_loadingContainer_16l5s_10",Ns="_spinner_16l5s_21",Ds="_message_16l5s_31",et={loadingScreen:js,loadingContainer:Ls,spinner:Ns,message:Ds},Re=({message:n="Loading..."})=>o.jsx("div",{className:et.loadingScreen,children:o.jsxs("div",{className:et.loadingContainer,children:[o.jsx("div",{className:et.spinner}),o.jsx("p",{className:et.message,children:n})]})}),rr="https://api.in-between.live",Us="https://api.in-between.live",Ld="https://in-between.live",Ms={apiKey:"AIzaSyBUm2vU-bPYSpsxIdd7pYerZx81GNgVJgQ",authDomain:"in-between-live.firebaseapp.com",projectId:"in-between-live",storageBucket:"in-between-live.firebasestorage.app",messagingSenderId:"800669475084",appId:"1:800669475084:web:89e0bbd44313d8bd3d2929",measurementId:"G-1PZPC7KWZF"},sr=m.createContext(),ft=()=>m.useContext(sr),Fs=({children:n})=>{const{token:e}=St(),[t,r]=m.useState(null),[s,i]=m.useState(!1),[a,c]=m.useState(null);m.useEffect(()=>{if(typeof window>"u")return;if(!e){t&&(t.disconnect(),r(null),i(!1),c(null));return}const d=Es(Us,{auth:{token:e},reconnection:!0,reconnectionAttempts:5,reconnectionDelay:1e3,transports:["websocket","polling"],timeout:1e4});r(d),d.on("connect",()=>{c(null)}),d.on("authenticated",h=>{d.auth={userId:h.userId,username:h.username},i(!0),d.emit("getGameList")}),d.on("connect_error",h=>{c("Failed to connect to game server: "+h.message),i(!1)}),d.on("disconnect",()=>{i(!1)}),d.on("error",h=>{c(h.message||"Unknown socket error")});const f=["connect","authenticated","disconnect","connect_error","error","transport"];return()=>{d&&(f.forEach(h=>d.off(h)),d.disconnect(),r(null),i(!1),c(null))}},[e]);const l={socket:t,isConnected:s,error:a,setError:c};return o.jsx(sr.Provider,{value:l,children:n})},Bs="_username_1shc8_1",Ws="_discriminator_1shc8_6",hn={username:Bs,discriminator:Ws};function ir(n){if(!n)return{base:"",discriminator:null,full:""};const e=n.split("#");return e.length===2&&/^\d{4}$/.test(e[1])?{base:e[0],discriminator:e[1],full:n}:{base:n,discriminator:null,full:n}}function $s(n,e=!1){const{base:t,discriminator:r}=ir(n);return e&&r?`${t}#${r}`:t}function Vs(n){const{discriminator:e}=ir(n);return e}const Hs=({username:n,showDiscriminator:e=!1,className:t=""})=>{if(!n)return null;const r=$s(n),s=Vs(n);return o.jsxs("span",{className:`${hn.username} ${t}`,children:[r,e&&s&&o.jsxs("span",{className:hn.discriminator,children:["#",s]})]})},Gs=()=>{};var fn={};/**
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
 */const or=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},zs=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},ar={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,d=l?n[s+2]:0,f=i>>2,h=(i&3)<<4|c>>4;let u=(c&15)<<2|d>>6,y=d&63;l||(y=64,a||(u=64)),r.push(t[f],t[h],t[u],t[y])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(or(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):zs(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const h=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||h==null)throw new qs;const u=i<<2|c>>4;if(r.push(u),d!==64){const y=c<<4&240|d>>2;if(r.push(y),h!==64){const I=d<<6&192|h;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class qs extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ks=function(n){const e=or(n);return ar.encodeByteArray(e,!0)},cr=function(n){return Ks(n).replace(/\./g,"")},lr=function(n){try{return ar.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ys(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Js=()=>Ys().__FIREBASE_DEFAULTS__,Xs=()=>{if(typeof process>"u"||typeof fn>"u")return;const n=fn.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Qs=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&lr(n[1]);return e&&JSON.parse(e)},Kt=()=>{try{return Gs()||Js()||Xs()||Qs()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Zs=n=>{var e,t;return(t=(e=Kt())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},dr=()=>{var n;return(n=Kt())===null||n===void 0?void 0:n.config},ur=n=>{var e;return(e=Kt())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class ei{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function pt(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ti(n){return(await fetch(n,{credentials:"include"})).ok}const Ne={};function ni(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ne))Ne[e]?n.emulator.push(e):n.prod.push(e);return n}function ri(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let pn=!1;function si(n,e){if(typeof window>"u"||typeof document>"u"||!pt(window.location.host)||Ne[n]===e||Ne[n]||pn)return;Ne[n]=e;function t(u){return`__firebase__banner__${u}`}const r="__firebase__banner",i=ni().prod.length>0;function a(){const u=document.getElementById(r);u&&u.remove()}function c(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function l(u,y){u.setAttribute("width","24"),u.setAttribute("id",y),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function d(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{pn=!0,a()},u}function f(u,y){u.setAttribute("id",y),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=ri(r),y=t("text"),I=document.getElementById(y)||document.createElement("span"),w=t("learnmore"),g=document.getElementById(w)||document.createElement("a"),p=t("preprendIcon"),_=document.getElementById(p)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const A=u.element;c(A),f(g,w);const D=d();l(_,p),A.append(_,I,g,D),document.body.appendChild(A)}i?(I.innerText="Preview backend disconnected.",_.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(_.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,I.innerText="Preview backend running in this workspace."),I.setAttribute("id",y)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
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
 */function M(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ii(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(M())}function oi(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ai(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ci(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function li(){const n=M();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function di(){try{return typeof indexedDB=="object"}catch{return!1}}function ui(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const hi="FirebaseError";class de extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=hi,Object.setPrototypeOf(this,de.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ge.prototype.create)}}class Ge{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?fi(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new de(s,c,r)}}function fi(n,e){return n.replace(pi,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const pi=/\{\$([^}]+)}/g;function mi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ie(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(mn(i)&&mn(a)){if(!Ie(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function mn(n){return n!==null&&typeof n=="object"}/**
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
 */function Se(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Oe(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function je(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function gi(n,e){const t=new yi(n,e);return t.subscribe.bind(t)}class yi{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");bi(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=kt),s.error===void 0&&(s.error=kt),s.complete===void 0&&(s.complete=kt);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bi(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function kt(){}/**
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
 */function P(n){return n&&n._delegate?n._delegate:n}class Ee{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ue="[DEFAULT]";/**
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
 */class vi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ei;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_i(e))try{this.getOrInitializeService({instanceIdentifier:ue})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=ue){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ue){return this.instances.has(e)}getOptions(e=ue){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:wi(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ue){return this.component?this.component.multipleInstances?e:ue:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function wi(n){return n===ue?void 0:n}function _i(n){return n.instantiationMode==="EAGER"}/**
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
 */class Ii{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var k;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(k||(k={}));const Ei={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},Ti=k.INFO,Ai={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},Si=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Ai[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class hr{constructor(e){this.name=e,this._logLevel=Ti,this._logHandler=Si,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in k))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ei[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...e),this._logHandler(this,k.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...e),this._logHandler(this,k.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,k.INFO,...e),this._logHandler(this,k.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,k.WARN,...e),this._logHandler(this,k.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...e),this._logHandler(this,k.ERROR,...e)}}const xi=(n,e)=>e.some(t=>n instanceof t);let gn,yn;function ki(){return gn||(gn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pi(){return yn||(yn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fr=new WeakMap,Wt=new WeakMap,pr=new WeakMap,Pt=new WeakMap,Yt=new WeakMap;function Ci(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(ae(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&fr.set(t,n)}).catch(()=>{}),Yt.set(e,n),e}function Ri(n){if(Wt.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Wt.set(n,e)}let $t={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wt.get(n);if(e==="objectStoreNames")return n.objectStoreNames||pr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ae(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Oi(n){$t=n($t)}function ji(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ct(this),e,...t);return pr.set(r,e.sort?e.sort():[e]),ae(r)}:Pi().includes(n)?function(...e){return n.apply(Ct(this),e),ae(fr.get(this))}:function(...e){return ae(n.apply(Ct(this),e))}}function Li(n){return typeof n=="function"?ji(n):(n instanceof IDBTransaction&&Ri(n),xi(n,ki())?new Proxy(n,$t):n)}function ae(n){if(n instanceof IDBRequest)return Ci(n);if(Pt.has(n))return Pt.get(n);const e=Li(n);return e!==n&&(Pt.set(n,e),Yt.set(e,n)),e}const Ct=n=>Yt.get(n);function Ni(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=ae(a);return r&&a.addEventListener("upgradeneeded",l=>{r(ae(a.result),l.oldVersion,l.newVersion,ae(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Di=["get","getKey","getAll","getAllKeys","count"],Ui=["put","add","delete","clear"],Rt=new Map;function bn(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Rt.get(e))return Rt.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Ui.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Di.includes(t)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&l.done]))[0]};return Rt.set(e,i),i}Oi(n=>({...n,get:(e,t,r)=>bn(e,t)||n.get(e,t,r),has:(e,t)=>!!bn(e,t)||n.has(e,t)}));/**
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
 */class Mi{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Fi(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Fi(n){const e=n.getComponent();return e?.type==="VERSION"}const Vt="@firebase/app",vn="0.13.2";/**
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
 */const Y=new hr("@firebase/app"),Bi="@firebase/app-compat",Wi="@firebase/analytics-compat",$i="@firebase/analytics",Vi="@firebase/app-check-compat",Hi="@firebase/app-check",Gi="@firebase/auth",zi="@firebase/auth-compat",qi="@firebase/database",Ki="@firebase/data-connect",Yi="@firebase/database-compat",Ji="@firebase/functions",Xi="@firebase/functions-compat",Qi="@firebase/installations",Zi="@firebase/installations-compat",eo="@firebase/messaging",to="@firebase/messaging-compat",no="@firebase/performance",ro="@firebase/performance-compat",so="@firebase/remote-config",io="@firebase/remote-config-compat",oo="@firebase/storage",ao="@firebase/storage-compat",co="@firebase/firestore",lo="@firebase/ai",uo="@firebase/firestore-compat",ho="firebase",fo="11.10.0";/**
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
 */const Ht="[DEFAULT]",po={[Vt]:"fire-core",[Bi]:"fire-core-compat",[$i]:"fire-analytics",[Wi]:"fire-analytics-compat",[Hi]:"fire-app-check",[Vi]:"fire-app-check-compat",[Gi]:"fire-auth",[zi]:"fire-auth-compat",[qi]:"fire-rtdb",[Ki]:"fire-data-connect",[Yi]:"fire-rtdb-compat",[Ji]:"fire-fn",[Xi]:"fire-fn-compat",[Qi]:"fire-iid",[Zi]:"fire-iid-compat",[eo]:"fire-fcm",[to]:"fire-fcm-compat",[no]:"fire-perf",[ro]:"fire-perf-compat",[so]:"fire-rc",[io]:"fire-rc-compat",[oo]:"fire-gcs",[ao]:"fire-gcs-compat",[co]:"fire-fst",[uo]:"fire-fst-compat",[lo]:"fire-vertex","fire-js":"fire-js",[ho]:"fire-js-all"};/**
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
 */const at=new Map,mo=new Map,Gt=new Map;function wn(n,e){try{n.container.addComponent(e)}catch(t){Y.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Be(n){const e=n.name;if(Gt.has(e))return Y.debug(`There were multiple attempts to register component ${e}.`),!1;Gt.set(e,n);for(const t of at.values())wn(t,n);for(const t of mo.values())wn(t,n);return!0}function mr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function L(n){return n==null?!1:n.settings!==void 0}/**
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
 */const go={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ce=new Ge("app","Firebase",go);/**
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
 */class yo{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ee("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ce.create("app-deleted",{appName:this._name})}}/**
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
 */const ze=fo;function gr(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ht,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw ce.create("bad-app-name",{appName:String(s)});if(t||(t=dr()),!t)throw ce.create("no-options");const i=at.get(s);if(i){if(Ie(t,i.options)&&Ie(r,i.config))return i;throw ce.create("duplicate-app",{appName:s})}const a=new Ii(s);for(const l of Gt.values())a.addComponent(l);const c=new yo(t,r,a);return at.set(s,c),c}function bo(n=Ht){const e=at.get(n);if(!e&&n===Ht&&dr())return gr();if(!e)throw ce.create("no-app",{appName:n});return e}function ge(n,e,t){var r;let s=(r=po[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Y.warn(c.join(" "));return}Be(new Ee(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const vo="firebase-heartbeat-database",wo=1,We="firebase-heartbeat-store";let Ot=null;function yr(){return Ot||(Ot=Ni(vo,wo,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(We)}catch(t){console.warn(t)}}}}).catch(n=>{throw ce.create("idb-open",{originalErrorMessage:n.message})})),Ot}async function _o(n){try{const t=(await yr()).transaction(We),r=await t.objectStore(We).get(br(n));return await t.done,r}catch(e){if(e instanceof de)Y.warn(e.message);else{const t=ce.create("idb-get",{originalErrorMessage:e?.message});Y.warn(t.message)}}}async function _n(n,e){try{const r=(await yr()).transaction(We,"readwrite");await r.objectStore(We).put(e,br(n)),await r.done}catch(t){if(t instanceof de)Y.warn(t.message);else{const r=ce.create("idb-set",{originalErrorMessage:t?.message});Y.warn(r.message)}}}function br(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Io=1024,Eo=30;class To{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new So(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=In();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Eo){const a=xo(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Y.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=In(),{heartbeatsToSend:r,unsentEntries:s}=Ao(this._heartbeatsCache.heartbeats),i=cr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Y.warn(t),""}}}function In(){return new Date().toISOString().substring(0,10)}function Ao(n,e=Io){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),En(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),En(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class So{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return di()?ui().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _o(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return _n(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return _n(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function En(n){return cr(JSON.stringify({version:2,heartbeats:n})).length}function xo(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function ko(n){Be(new Ee("platform-logger",e=>new Mi(e),"PRIVATE")),Be(new Ee("heartbeat",e=>new To(e),"PRIVATE")),ge(Vt,vn,n),ge(Vt,vn,"esm2017"),ge("fire-js","")}ko("");var Po="firebase",Co="11.10.0";/**
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
 */ge(Po,Co,"app");function Jt(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function vr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ro=vr,wr=new Ge("auth","Firebase",vr());/**
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
 */const ct=new hr("@firebase/auth");function Oo(n,...e){ct.logLevel<=k.WARN&&ct.warn(`Auth (${ze}): ${n}`,...e)}function nt(n,...e){ct.logLevel<=k.ERROR&&ct.error(`Auth (${ze}): ${n}`,...e)}/**
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
 */function $(n,...e){throw Qt(n,...e)}function F(n,...e){return Qt(n,...e)}function Xt(n,e,t){const r=Object.assign(Object.assign({},Ro()),{[e]:t});return new Ge("auth","Firebase",r).create(e,{appName:n.name})}function U(n){return Xt(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function mt(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&$(n,"argument-error"),Xt(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Qt(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return wr.create(n,...e)}function b(n,e,...t){if(!n)throw Qt(e,...t)}function q(n){const e="INTERNAL ASSERTION FAILED: "+n;throw nt(e),new Error(e)}function J(n,e){n||q(e)}/**
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
 */function $e(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Zt(){return Tn()==="http:"||Tn()==="https:"}function Tn(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function jo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Zt()||ai()||"connection"in navigator)?navigator.onLine:!0}function Lo(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class qe{constructor(e,t){this.shortDelay=e,this.longDelay=t,J(t>e,"Short delay should be less than long delay!"),this.isMobile=ii()||ci()}get(){return jo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function en(n,e){J(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class _r{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;q("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;q("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;q("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Do=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Uo=new qe(3e4,6e4);function O(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function j(n,e,t,r,s={}){return Ir(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Se(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:l},i);return oi()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&pt(n.emulatorConfig.host)&&(d.credentials="include"),_r.fetch()(await Er(n,n.config.apiHost,t,c),d)})}async function Ir(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},No),e);try{const s=new Fo(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Le(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Le(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Le(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Le(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Xt(n,f,d);$(n,f)}}catch(s){if(s instanceof de)throw s;$(n,"network-request-failed",{message:String(s)})}}async function Q(n,e,t,r,s={}){const i=await j(n,e,t,r,s);return"mfaPendingCredential"in i&&$(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Er(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?en(n.config,s):`${n.config.apiScheme}://${s}`;return Do.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function Mo(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Fo{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(F(this.auth,"network-request-failed")),Uo.get())})}}function Le(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=F(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */function An(n){return n!==void 0&&n.getResponse!==void 0}function Sn(n){return n!==void 0&&n.enterprise!==void 0}class Tr{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Mo(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
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
 */async function Bo(n){return(await j(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Ar(n,e){return j(n,"GET","/v2/recaptchaConfig",O(n,e))}/**
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
 */async function Wo(n,e){return j(n,"POST","/v1/accounts:delete",e)}async function $o(n,e){return j(n,"POST","/v1/accounts:update",e)}async function lt(n,e){return j(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function De(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Vo(n,e=!1){const t=P(n),r=await t.getIdToken(e),s=gt(r);b(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:De(jt(s.auth_time)),issuedAtTime:De(jt(s.iat)),expirationTime:De(jt(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function jt(n){return Number(n)*1e3}function gt(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return nt("JWT malformed, contained fewer than 3 sections"),null;try{const s=lr(t);return s?JSON.parse(s):(nt("Failed to decode base64 JWT payload"),null)}catch(s){return nt("Caught error parsing JWT payload as JSON",s?.toString()),null}}function xn(n){const e=gt(n);return b(e,"internal-error"),b(typeof e.exp<"u","internal-error"),b(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function he(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof de&&Ho(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Ho({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Go{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */async function Ve(n){var e;const t=n.auth,r=await n.getIdToken(),s=await he(n,lt(t,{idToken:r}));b(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Sr(i.providerUserInfo):[],c=qo(n.providerData,a),l=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!c?.length,f=l?d:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new zt(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,h)}async function zo(n){const e=P(n);await Ve(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function qo(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Sr(n){return n.map(e=>{var{providerId:t}=e,r=Jt(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Ko(n,e){const t=await Ir(n,{},async()=>{const r=Se({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Er(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&pt(n.emulatorConfig.host)&&(l.credentials="include"),_r.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Yo(n,e){return j(n,"POST","/v2/accounts:revokeToken",O(n,e))}/**
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
 */class ye{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b(typeof e.idToken<"u","internal-error"),b(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xn(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){b(e.length!==0,"internal-error");const t=xn(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Ko(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new ye;return r&&(b(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(b(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(b(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ye,this.toJSON())}_performRefresh(){return q("not implemented")}}/**
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
 */function ee(n,e){b(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class H{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Jt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Go(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new zt(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await he(this,this.stsTokenManager.getToken(this.auth,e));return b(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Vo(this,e)}reload(){return zo(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new H(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ve(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(L(this.auth.app))return Promise.reject(U(this.auth));const e=await this.getIdToken();return await he(this,Wo(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,l,d,f;const h=(r=t.displayName)!==null&&r!==void 0?r:void 0,u=(s=t.email)!==null&&s!==void 0?s:void 0,y=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,I=(a=t.photoURL)!==null&&a!==void 0?a:void 0,w=(c=t.tenantId)!==null&&c!==void 0?c:void 0,g=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,p=(d=t.createdAt)!==null&&d!==void 0?d:void 0,_=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:A,emailVerified:D,isAnonymous:v,providerData:T,stsTokenManager:x}=t;b(A&&x,e,"internal-error");const E=ye.fromJSON(this.name,x);b(typeof A=="string",e,"internal-error"),ee(h,e.name),ee(u,e.name),b(typeof D=="boolean",e,"internal-error"),b(typeof v=="boolean",e,"internal-error"),ee(y,e.name),ee(I,e.name),ee(w,e.name),ee(g,e.name),ee(p,e.name),ee(_,e.name);const S=new H({uid:A,auth:e,email:u,emailVerified:D,displayName:h,isAnonymous:v,photoURL:I,phoneNumber:y,tenantId:w,stsTokenManager:E,createdAt:p,lastLoginAt:_});return T&&Array.isArray(T)&&(S.providerData=T.map(R=>Object.assign({},R))),g&&(S._redirectEventId=g),S}static async _fromIdTokenResponse(e,t,r=!1){const s=new ye;s.updateFromServerResponse(t);const i=new H({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ve(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];b(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Sr(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new ye;c.updateFromIdToken(r);const l=new H({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new zt(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,d),l}}/**
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
 */const kn=new Map;function K(n){J(n instanceof Function,"Expected a class definition");let e=kn.get(n);return e?(J(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,kn.set(n,e),e)}/**
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
 */class xr{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}xr.type="NONE";const Pn=xr;/**
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
 */function rt(n,e,t){return`firebase:${n}:${e}:${t}`}class be{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=rt(this.userKey,s.apiKey,i),this.fullPersistenceKey=rt("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await lt(this.auth,{idToken:e}).catch(()=>{});return t?H._fromGetAccountInfoResponse(this.auth,t,e):null}return H._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new be(K(Pn),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||K(Pn);const a=rt(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let h;if(typeof f=="string"){const u=await lt(e,{idToken:f}).catch(()=>{});if(!u)break;h=await H._fromGetAccountInfoResponse(e,u,f)}else h=H._fromJSON(e,f);d!==i&&(c=h),i=d;break}}catch{}const l=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new be(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new be(i,e,r))}}/**
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
 */function Cn(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Rr(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(kr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jr(e))return"Blackberry";if(Lr(e))return"Webos";if(Pr(e))return"Safari";if((e.includes("chrome/")||Cr(e))&&!e.includes("edge/"))return"Chrome";if(Or(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function kr(n=M()){return/firefox\//i.test(n)}function Pr(n=M()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Cr(n=M()){return/crios\//i.test(n)}function Rr(n=M()){return/iemobile/i.test(n)}function Or(n=M()){return/android/i.test(n)}function jr(n=M()){return/blackberry/i.test(n)}function Lr(n=M()){return/webos/i.test(n)}function tn(n=M()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Jo(n=M()){var e;return tn(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Xo(){return li()&&document.documentMode===10}function Nr(n=M()){return tn(n)||Or(n)||Lr(n)||jr(n)||/windows phone/i.test(n)||Rr(n)}/**
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
 */function Dr(n,e=[]){let t;switch(n){case"Browser":t=Cn(M());break;case"Worker":t=`${Cn(M())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ze}/${r}`}/**
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
 */class Qo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function Zo(n,e={}){return j(n,"GET","/v2/passwordPolicy",O(n,e))}/**
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
 */const ea=6;class ta{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:ea,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class na{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Rn(this),this.idTokenSubscription=new Rn(this),this.beforeStateQueue=new Qo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=wr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=K(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await be.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await lt(this,{idToken:e}),r=await H._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(L(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s?._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&l?.user&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ve(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Lo()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(L(this.app))return Promise.reject(U(this));const t=e?P(e):null;return t&&b(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return L(this.app)?Promise.reject(U(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return L(this.app)?Promise.reject(U(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(K(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Zo(this),t=new ta(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ge("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Yo(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&K(e)||this._popupRedirectResolver;b(t,this,"argument-error"),this.redirectPersistenceManager=await be.create(this,[K(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dr(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(L(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Oo(`Error while retrieving App Check token: ${t.error}`),t?.token}}function N(n){return P(n)}class Rn{constructor(e){this.auth=e,this.observer=null,this.addObserver=gi(t=>this.observer=t)}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ke={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ra(n){Ke=n}function nn(n){return Ke.loadJS(n)}function sa(){return Ke.recaptchaV2Script}function ia(){return Ke.recaptchaEnterpriseScript}function oa(){return Ke.gapiScript}function Ur(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const aa=500,ca=6e4,tt=1e12;class la{constructor(e){this.auth=e,this.counter=tt,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new ha(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||tt;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||tt;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||tt;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class da{constructor(){this.enterprise=new ua}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ua{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ha{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;b(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=fa(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},ca)},aa))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function fa(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const pa="recaptcha-enterprise",Ue="NO_RECAPTCHA";class Mr{constructor(e){this.type=pa,this.auth=N(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{Ar(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new Tr(l);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(l=>{c(l)})})}function s(i,a,c){const l=window.grecaptcha;Sn(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(Ue)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new da().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&Sn(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=ia();l.length!==0&&(l+=c),nn(l).then(()=>{s(c,i,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Ce(n,e,t,r=!1,s=!1){const i=new Mr(n);let a;if(s)a=Ue;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function le(n,e,t,r,s){var i,a;if(s==="EMAIL_PASSWORD_PROVIDER")if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const c=await Ce(n,e,t,t==="getOobCode");return r(n,c)}else return r(n,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Ce(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(c)});else if(s==="PHONE_PROVIDER")if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("PHONE_PROVIDER")){const c=await Ce(n,e,t);return r(n,c).catch(async l=>{var d;if(((d=n._getRecaptchaConfig())===null||d===void 0?void 0:d.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const f=await Ce(n,e,t,!1,!0);return r(n,f)}return Promise.reject(l)})}else{const c=await Ce(n,e,t,!1,!0);return r(n,c)}else return Promise.reject(s+" provider is not supported.")}async function ma(n){const e=N(n),t=await Ar(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Tr(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Mr(e).verify()}/**
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
 */function ga(n,e){const t=mr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Ie(i,e??{}))return s;$(s,"already-initialized")}return t.initialize({options:e})}function ya(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(K);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function ba(n,e,t){const r=N(n);b(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Fr(e),{host:a,port:c}=va(e),l=c===null?"":`:${c}`,d={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){b(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),b(Ie(d,r.config.emulator)&&Ie(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,pt(a)?(ti(`${i}//${a}${l}`),si("Auth",!0)):wa()}function Fr(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function va(n){const e=Fr(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:On(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:On(a)}}}function On(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function wa(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class yt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return q("not implemented")}_getIdTokenResponse(e){return q("not implemented")}_linkToIdToken(e,t){return q("not implemented")}_getReauthenticationResolver(e){return q("not implemented")}}/**
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
 */async function _a(n,e){return j(n,"POST","/v1/accounts:resetPassword",O(n,e))}async function Ia(n,e){return j(n,"POST","/v1/accounts:update",e)}async function Ea(n,e){return j(n,"POST","/v1/accounts:signUp",e)}async function Ta(n,e){return j(n,"POST","/v1/accounts:update",O(n,e))}/**
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
 */async function Aa(n,e){return Q(n,"POST","/v1/accounts:signInWithPassword",O(n,e))}async function bt(n,e){return j(n,"POST","/v1/accounts:sendOobCode",O(n,e))}async function Sa(n,e){return bt(n,e)}async function xa(n,e){return bt(n,e)}async function ka(n,e){return bt(n,e)}async function Pa(n,e){return bt(n,e)}/**
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
 */async function Ca(n,e){return Q(n,"POST","/v1/accounts:signInWithEmailLink",O(n,e))}async function Ra(n,e){return Q(n,"POST","/v1/accounts:signInWithEmailLink",O(n,e))}/**
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
 */class He extends yt{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new He(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new He(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return le(e,t,"signInWithPassword",Aa,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ca(e,{email:this._email,oobCode:this._password});default:$(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return le(e,r,"signUpPassword",Ea,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ra(e,{idToken:t,email:this._email,oobCode:this._password});default:$(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function ve(n,e){return Q(n,"POST","/v1/accounts:signInWithIdp",O(n,e))}/**
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
 */const Oa="http://localhost";class X extends yt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new X(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):$("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Jt(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new X(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return ve(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ve(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ve(e,t)}buildRequest(){const e={requestUri:Oa,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Se(t)}return e}}/**
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
 */async function jn(n,e){return j(n,"POST","/v1/accounts:sendVerificationCode",O(n,e))}async function ja(n,e){return Q(n,"POST","/v1/accounts:signInWithPhoneNumber",O(n,e))}async function La(n,e){const t=await Q(n,"POST","/v1/accounts:signInWithPhoneNumber",O(n,e));if(t.temporaryProof)throw Le(n,"account-exists-with-different-credential",t);return t}const Na={USER_NOT_FOUND:"user-not-found"};async function Da(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Q(n,"POST","/v1/accounts:signInWithPhoneNumber",O(n,t),Na)}/**
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
 */class Me extends yt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Me({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Me({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return ja(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return La(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Da(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new Me({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
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
 */function Ua(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ma(n){const e=Oe(je(n)).link,t=e?Oe(je(e)).deep_link_id:null,r=Oe(je(n)).deep_link_id;return(r?Oe(je(r)).link:null)||r||t||e||n}class vt{constructor(e){var t,r,s,i,a,c;const l=Oe(je(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,f=(r=l.oobCode)!==null&&r!==void 0?r:null,h=Ua((s=l.mode)!==null&&s!==void 0?s:null);b(d&&f&&h,"argument-error"),this.apiKey=d,this.operation=h,this.code=f,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=l.lang)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Ma(e);try{return new vt(t)}catch{return null}}}/**
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
 */class fe{constructor(){this.providerId=fe.PROVIDER_ID}static credential(e,t){return He._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=vt.parseLink(t);return b(r,"argument-error"),He._fromEmailAndCode(e,r.code,r.tenantId)}}fe.PROVIDER_ID="password";fe.EMAIL_PASSWORD_SIGN_IN_METHOD="password";fe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class xe{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ke extends xe{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class st extends ke{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return b("providerId"in t&&"signInMethod"in t,"argument-error"),X._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return b(e.idToken||e.accessToken,"argument-error"),X._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return st.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return st.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:a,providerId:c}=e;if(!r&&!s&&!t&&!i||!c)return null;try{return new st(c)._credential({idToken:t,accessToken:r,nonce:a,pendingToken:i})}catch{return null}}}/**
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
 */class te extends ke{constructor(){super("facebook.com")}static credential(e){return X._fromParams({providerId:te.PROVIDER_ID,signInMethod:te.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return te.credentialFromTaggedObject(e)}static credentialFromError(e){return te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return te.credential(e.oauthAccessToken)}catch{return null}}}te.FACEBOOK_SIGN_IN_METHOD="facebook.com";te.PROVIDER_ID="facebook.com";/**
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
 */class ne extends ke{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return X._fromParams({providerId:ne.PROVIDER_ID,signInMethod:ne.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ne.credentialFromTaggedObject(e)}static credentialFromError(e){return ne.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ne.credential(t,r)}catch{return null}}}ne.GOOGLE_SIGN_IN_METHOD="google.com";ne.PROVIDER_ID="google.com";/**
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
 */class re extends ke{constructor(){super("github.com")}static credential(e){return X._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return re.credential(e.oauthAccessToken)}catch{return null}}}re.GITHUB_SIGN_IN_METHOD="github.com";re.PROVIDER_ID="github.com";/**
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
 */class se extends ke{constructor(){super("twitter.com")}static credential(e,t){return X._fromParams({providerId:se.PROVIDER_ID,signInMethod:se.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return se.credentialFromTaggedObject(e)}static credentialFromError(e){return se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return se.credential(t,r)}catch{return null}}}se.TWITTER_SIGN_IN_METHOD="twitter.com";se.PROVIDER_ID="twitter.com";/**
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
 */async function Br(n,e){return Q(n,"POST","/v1/accounts:signUp",O(n,e))}/**
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
 */class G{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await H._fromIdTokenResponse(e,r,s),a=Ln(r);return new G({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Ln(r);return new G({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Ln(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function Nd(n){var e;if(L(n.app))return Promise.reject(U(n));const t=N(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new G({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Br(t,{returnSecureToken:!0}),s=await G._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
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
 */class dt extends de{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,dt.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new dt(e,t,r,s)}}function Wr(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?dt._fromErrorAndOperation(n,i,e,r):i})}/**
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
 */function $r(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function Dd(n,e){const t=P(n);await wt(!0,t,e);const{providerUserInfo:r}=await $o(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=$r(r||[]);return t.providerData=t.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Vr(n,e,t=!1){const r=await he(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return G._forOperation(n,"link",r)}async function wt(n,e,t){await Ve(e);const r=$r(e.providerData),s=n===!1?"provider-already-linked":"no-such-provider";b(r.has(t)===n,e.auth,s)}/**
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
 */async function Fa(n,e,t=!1){const{auth:r}=n;if(L(r.app))return Promise.reject(U(r));const s="reauthenticate";try{const i=await he(n,Wr(r,s,e,n),t);b(i.idToken,r,"internal-error");const a=gt(i.idToken);b(a,r,"internal-error");const{sub:c}=a;return b(n.uid===c,r,"user-mismatch"),G._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&$(r,"user-mismatch"),i}}/**
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
 */async function Hr(n,e,t=!1){if(L(n.app))return Promise.reject(U(n));const r="signIn",s=await Wr(n,r,e),i=await G._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function rn(n,e){return Hr(N(n),e)}async function Ba(n,e){const t=P(n);return await wt(!1,t,e.providerId),Vr(t,e)}/**
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
 */async function Wa(n,e){return Q(n,"POST","/v1/accounts:signInWithCustomToken",O(n,e))}/**
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
 */async function Ud(n,e){if(L(n.app))return Promise.reject(U(n));const t=N(n),r=await Wa(t,{token:e,returnSecureToken:!0}),s=await G._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(s.user),s}/**
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
 */function _t(n,e,t){var r;b(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),b(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),b(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(b(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(b(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
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
 */async function sn(n){const e=N(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Md(n,e,t){const r=N(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&_t(r,s,t),await le(r,s,"getOobCode",xa,"EMAIL_PASSWORD_PROVIDER")}async function Fd(n,e,t){await _a(P(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&sn(n),r})}async function Bd(n,e){await Ta(P(n),{oobCode:e})}async function Wd(n,e,t){if(L(n.app))return Promise.reject(U(n));const r=N(n),a=await le(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Br,"EMAIL_PASSWORD_PROVIDER").catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&sn(n),l}),c=await G._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function $d(n,e,t){return L(n.app)?Promise.reject(U(n)):rn(P(n),fe.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&sn(n),r})}/**
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
 */async function Vd(n,e,t){const r=N(n),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(a,c){b(c.handleCodeInApp,r,"argument-error"),c&&_t(r,a,c)}i(s,t),await le(r,s,"getOobCode",ka,"EMAIL_PASSWORD_PROVIDER")}function Hd(n,e){const t=vt.parseLink(e);return t?.operation==="EMAIL_SIGNIN"}async function Gd(n,e,t){if(L(n.app))return Promise.reject(U(n));const r=P(n),s=fe.credentialWithLink(e,t||$e());return b(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),rn(r,s)}/**
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
 */async function $a(n,e){return j(n,"POST","/v1/accounts:createAuthUri",O(n,e))}/**
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
 */async function zd(n,e){const t=Zt()?$e():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:s}=await $a(P(n),r);return s||[]}async function qd(n,e){const t=P(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&_t(t.auth,s,e);const{email:i}=await Sa(t.auth,s);i!==n.email&&await n.reload()}async function Kd(n,e,t){const r=P(n),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&_t(r.auth,i,t);const{email:a}=await Pa(r.auth,i);a!==n.email&&await n.reload()}/**
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
 */async function Va(n,e){return j(n,"POST","/v1/accounts:update",e)}/**
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
 */async function Yd(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=P(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await he(r,Va(r.auth,i));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const c=r.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function Jd(n,e){const t=P(n);return L(t.auth.app)?Promise.reject(U(t.auth)):Gr(t,e,null)}function Xd(n,e){return Gr(P(n),null,e)}async function Gr(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(i.email=e),t&&(i.password=t);const a=await he(n,Ia(r,i));await n._updateTokensIfNecessary(a,!0)}/**
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
 */function Ha(n){var e,t;if(!n)return null;const{providerId:r}=n,s=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},i=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&n?.idToken){const a=(t=(e=gt(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(a){const c=a!=="anonymous"&&a!=="custom"?a:null;return new we(i,c)}}if(!r)return null;switch(r){case"facebook.com":return new Ga(i,s);case"github.com":return new za(i,s);case"google.com":return new qa(i,s);case"twitter.com":return new Ka(i,s,n.screenName||null);case"custom":case"anonymous":return new we(i,null);default:return new we(i,r,s)}}class we{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class zr extends we{constructor(e,t,r,s){super(e,t,r),this.username=s}}class Ga extends we{constructor(e,t){super(e,"facebook.com",t)}}class za extends zr{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class qa extends we{constructor(e,t){super(e,"google.com",t)}}class Ka extends zr{constructor(e,t,r){super(e,"twitter.com",t,r)}}function Qd(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:Ha(t)}/**
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
 */function Zd(n,e){return P(n).setPersistence(e)}function Ya(n,e,t,r){return P(n).onIdTokenChanged(e,t,r)}function Ja(n,e,t){return P(n).beforeAuthStateChanged(e,t)}function Xa(n,e,t,r){return P(n).onAuthStateChanged(e,t,r)}function Qa(n){return P(n).signOut()}function eu(n,e){return N(n).revokeAccessToken(e)}async function tu(n){return P(n).delete()}/**
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
 */function Nn(n,e){return j(n,"POST","/v2/accounts/mfaEnrollment:start",O(n,e))}const ut="__sak";/**
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
 */class qr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ut,"1"),this.storage.removeItem(ut),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Za=1e3,ec=10;class Kr extends qr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Nr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Xo()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ec):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Za)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kr.type="LOCAL";const tc=Kr;/**
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
 */class Yr extends qr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Yr.type="SESSION";const Jr=Yr;/**
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
 */function nc(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class It{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new It(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),l=await nc(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}It.receivers=[];/**
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
 */function Et(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class rc{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const d=Et("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(h){const u=h;if(u.data.eventId===d)switch(u.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(u.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function C(){return window}function sc(n){C().location.href=n}/**
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
 */function on(){return typeof C().WorkerGlobalScope<"u"&&typeof C().importScripts=="function"}async function ic(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function oc(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function ac(){return on()?self:null}/**
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
 */const Xr="firebaseLocalStorageDb",cc=1,ht="firebaseLocalStorage",Qr="fbase_key";class Ye{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Tt(n,e){return n.transaction([ht],e?"readwrite":"readonly").objectStore(ht)}function lc(){const n=indexedDB.deleteDatabase(Xr);return new Ye(n).toPromise()}function qt(){const n=indexedDB.open(Xr,cc);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ht,{keyPath:Qr})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ht)?e(r):(r.close(),await lc(),e(await qt()))})})}async function Dn(n,e,t){const r=Tt(n,!0).put({[Qr]:e,value:t});return new Ye(r).toPromise()}async function dc(n,e){const t=Tt(n,!1).get(e),r=await new Ye(t).toPromise();return r===void 0?null:r.value}function Un(n,e){const t=Tt(n,!0).delete(e);return new Ye(t).toPromise()}const uc=800,hc=3;class Zr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await qt(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>hc)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return on()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=It._getInstance(ac()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ic(),!this.activeServiceWorker)return;this.sender=new rc(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||oc()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await qt();return await Dn(e,ut,"1"),await Un(e,ut),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Dn(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>dc(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Un(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Tt(s,!1).getAll();return new Ye(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Zr.type="LOCAL";const fc=Zr;/**
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
 */function Mn(n,e){return j(n,"POST","/v2/accounts/mfaSignIn:start",O(n,e))}/**
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
 */const Lt=Ur("rcb"),pc=new qe(3e4,6e4);class mc{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=C().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return b(gc(t),e,"argument-error"),this.shouldResolveImmediately(t)&&An(C().grecaptcha)?Promise.resolve(C().grecaptcha):new Promise((r,s)=>{const i=C().setTimeout(()=>{s(F(e,"network-request-failed"))},pc.get());C()[Lt]=()=>{C().clearTimeout(i),delete C()[Lt];const c=C().grecaptcha;if(!c||!An(c)){s(F(e,"internal-error"));return}const l=c.render;c.render=(d,f)=>{const h=l(d,f);return this.counter++,h},this.hostLanguage=t,r(c)};const a=`${sa()}?${Se({onload:Lt,render:"explicit",hl:t})}`;nn(a).catch(()=>{clearTimeout(i),s(F(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=C().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function gc(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class yc{async load(e){return new la(e)}clearedOneInstance(){}}/**
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
 */const Fe="recaptcha",bc={theme:"light",type:"image"};class nu{constructor(e,t,r=Object.assign({},bc)){this.parameters=r,this.type=Fe,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=N(e),this.isInvisible=this.parameters.size==="invisible",b(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;b(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new yc:new mc,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(s=>{const i=a=>{a&&(this.tokenChangeListeners.delete(i),s(a))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){b(!this.parameters.sitekey,this.auth,"argument-error"),b(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),b(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=C()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){b(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){b(Zt()&&!on(),this.auth,"internal-error"),await vc(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Bo(this.auth);b(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return b(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function vc(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class es{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Me._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function ru(n,e,t){if(L(n.app))return Promise.reject(U(n));const r=N(n),s=await ts(r,e,P(t));return new es(s,i=>rn(r,i))}async function su(n,e,t){const r=P(n);await wt(!1,r,"phone");const s=await ts(r.auth,e,P(t));return new es(s,i=>Ba(r,i))}async function ts(n,e,t){var r;if(!n._getRecaptchaConfig())try{await ma(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const i=s.session;if("phoneNumber"in s){b(i.type==="enroll",n,"internal-error");const a={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await le(n,a,"mfaSmsEnrollment",async(f,h)=>{if(h.phoneEnrollmentInfo.captchaResponse===Ue){b(t?.type===Fe,f,"argument-error");const u=await Nt(f,h,t);return Nn(f,u)}return Nn(f,h)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneSessionInfo.sessionInfo}else{b(i.type==="signin",n,"internal-error");const a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;b(a,n,"missing-multi-factor-info");const c={mfaPendingCredential:i.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await le(n,c,"mfaSmsSignIn",async(h,u)=>{if(u.phoneSignInInfo.captchaResponse===Ue){b(t?.type===Fe,h,"argument-error");const y=await Nt(h,u,t);return Mn(h,y)}return Mn(h,u)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneResponseInfo.sessionInfo}}else{const i={phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await le(n,i,"sendVerificationCode",async(d,f)=>{if(f.captchaResponse===Ue){b(t?.type===Fe,d,"argument-error");const h=await Nt(d,f,t);return jn(d,h)}return jn(d,f)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t?._reset()}}async function Nt(n,e,t){b(t.type===Fe,n,"argument-error");const r=await t.verify();b(typeof r=="string",n,"argument-error");const s=Object.assign({},e);if("phoneEnrollmentInfo"in s){const i=s.phoneEnrollmentInfo.phoneNumber,a=s.phoneEnrollmentInfo.captchaResponse,c=s.phoneEnrollmentInfo.clientType,l=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:a,clientType:c,recaptchaVersion:l}}),s}else if("phoneSignInInfo"in s){const i=s.phoneSignInInfo.captchaResponse,a=s.phoneSignInInfo.clientType,c=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:a,recaptchaVersion:c}}),s}else return Object.assign(s,{recaptchaToken:r}),s}/**
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
 */function Je(n,e){return e?K(e):(b(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class an extends yt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ve(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ve(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ve(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function wc(n){return Hr(n.auth,new an(n),n.bypassAuthState)}function _c(n){const{auth:e,user:t}=n;return b(t,e,"internal-error"),Fa(t,new an(n),n.bypassAuthState)}async function Ic(n){const{auth:e,user:t}=n;return b(t,e,"internal-error"),Vr(t,new an(n),n.bypassAuthState)}/**
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
 */class ns{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return wc;case"linkViaPopup":case"linkViaRedirect":return Ic;case"reauthViaPopup":case"reauthViaRedirect":return _c;default:$(this.auth,"internal-error")}}resolve(e){J(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){J(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Ec=new qe(2e3,1e4);async function iu(n,e,t){if(L(n.app))return Promise.reject(F(n,"operation-not-supported-in-this-environment"));const r=N(n);mt(n,e,xe);const s=Je(r,t);return new ie(r,"signInViaPopup",e,s).executeNotNull()}async function ou(n,e,t){const r=P(n);mt(r.auth,e,xe);const s=Je(r.auth,t);return new ie(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class ie extends ns{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ie.currentPopupAction&&ie.currentPopupAction.cancel(),ie.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){J(this.filter.length===1,"Popup operations only handle one event");const e=Et();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ie.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ec.get())};e()}}ie.currentPopupAction=null;/**
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
 */const Tc="pendingRedirect",it=new Map;class Ac extends ns{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=it.get(this.auth._key());if(!e){try{const r=await Sc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}it.set(this.auth._key(),e)}return this.bypassAuthState||it.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Sc(n,e){const t=is(e),r=ss(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}async function rs(n,e){return ss(n)._set(is(e),"true")}function xc(n,e){it.set(n._key(),e)}function ss(n){return K(n._redirectPersistence)}function is(n){return rt(Tc,n.config.apiKey,n.name)}/**
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
 */function au(n,e,t){return kc(n,e,t)}async function kc(n,e,t){if(L(n.app))return Promise.reject(U(n));const r=N(n);mt(n,e,xe),await r._initializationPromise;const s=Je(r,t);return await rs(s,r),s._openRedirect(r,e,"signInViaRedirect")}function cu(n,e,t){return Pc(n,e,t)}async function Pc(n,e,t){const r=P(n);mt(r.auth,e,xe),await r.auth._initializationPromise;const s=Je(r.auth,t);await wt(!1,r,e.providerId),await rs(s,r.auth);const i=await Cc(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function lu(n,e){return await N(n)._initializationPromise,os(n,e,!1)}async function os(n,e,t=!1){if(L(n.app))return Promise.reject(U(n));const r=N(n),s=Je(r,e),a=await new Ac(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}async function Cc(n){const e=Et(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
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
 */const Rc=600*1e3;class Oc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!jc(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!as(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(F(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Rc&&this.cachedEventUids.clear(),this.cachedEventUids.has(Fn(e))}saveEventToCache(e){this.cachedEventUids.add(Fn(e)),this.lastProcessedEventTime=Date.now()}}function Fn(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function as({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function jc(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return as(n);default:return!1}}/**
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
 */async function Lc(n,e={}){return j(n,"GET","/v1/projects",e)}/**
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
 */const Nc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dc=/^https?/;async function Uc(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Lc(n);for(const t of e)try{if(Mc(t))return}catch{}$(n,"unauthorized-domain")}function Mc(n){const e=$e(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Dc.test(t))return!1;if(Nc.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Fc=new qe(3e4,6e4);function Bn(){const n=C().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Bc(n){return new Promise((e,t)=>{var r,s,i;function a(){Bn(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Bn(),t(F(n,"network-request-failed"))},timeout:Fc.get()})}if(!((s=(r=C().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=C().gapi)===null||i===void 0)&&i.load)a();else{const c=Ur("iframefcb");return C()[c]=()=>{gapi.load?a():t(F(n,"network-request-failed"))},nn(`${oa()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw ot=null,e})}let ot=null;function Wc(n){return ot=ot||Bc(n),ot}/**
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
 */const $c=new qe(5e3,15e3),Vc="__/auth/iframe",Hc="emulator/auth/iframe",Gc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},zc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function qc(n){const e=n.config;b(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?en(e,Hc):`https://${n.config.authDomain}/${Vc}`,r={apiKey:e.apiKey,appName:n.name,v:ze},s=zc.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Se(r).slice(1)}`}async function Kc(n){const e=await Wc(n),t=C().gapi;return b(t,n,"internal-error"),e.open({where:document.body,url:qc(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gc,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=F(n,"network-request-failed"),c=C().setTimeout(()=>{i(a)},$c.get());function l(){C().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
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
 */const Yc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Jc=500,Xc=600,Qc="_blank",Zc="http://localhost";class Wn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function el(n,e,t,r=Jc,s=Xc){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Yc),{width:r.toString(),height:s.toString(),top:i,left:a}),d=M().toLowerCase();t&&(c=Cr(d)?Qc:t),kr(d)&&(e=e||Zc,l.scrollbars="yes");const f=Object.entries(l).reduce((u,[y,I])=>`${u}${y}=${I},`,"");if(Jo(d)&&c!=="_self")return tl(e||"",c),new Wn(null);const h=window.open(e||"",c,f);b(h,n,"popup-blocked");try{h.focus()}catch{}return new Wn(h)}function tl(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const nl="__/auth/handler",rl="emulator/auth/handler",sl=encodeURIComponent("fac");async function $n(n,e,t,r,s,i){b(n.config.authDomain,n,"auth-domain-config-required"),b(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ze,eventId:s};if(e instanceof xe){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",mi(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,h]of Object.entries({}))a[f]=h}if(e instanceof ke){const f=e.getScopes().filter(h=>h!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),d=l?`#${sl}=${encodeURIComponent(l)}`:"";return`${il(n)}?${Se(c).slice(1)}${d}`}function il({config:n}){return n.emulator?en(n,rl):`https://${n.authDomain}/${nl}`}/**
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
 */const Dt="webStorageSupport";class ol{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jr,this._completeRedirectFn=os,this._overrideRedirectResult=xc}async _openPopup(e,t,r,s){var i;J((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await $n(e,t,r,$e(),s);return el(e,a,Et())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await $n(e,t,r,$e(),s);return sc(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(J(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Kc(e),r=new Oc(e);return t.register("authEvent",s=>(b(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Dt,{type:Dt},s=>{var i;const a=(i=s?.[0])===null||i===void 0?void 0:i[Dt];a!==void 0&&t(!!a),$(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Uc(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Nr()||Pr()||tn()}}const al=ol;var Vn="@firebase/auth",Hn="1.10.8";/**
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
 */class cl{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function ll(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function dl(n){Be(new Ee("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;b(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dr(n)},d=new na(r,s,i,l);return ya(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Be(new Ee("auth-internal",e=>{const t=N(e.getProvider("auth").getImmediate());return(r=>new cl(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ge(Vn,Hn,ll(n)),ge(Vn,Hn,"esm2017")}/**
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
 */const ul=300,hl=ur("authIdTokenMaxAge")||ul;let Gn=null;const fl=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>hl)return;const s=t?.token;Gn!==s&&(Gn=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function pl(n=bo()){const e=mr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=ga(n,{popupRedirectResolver:al,persistence:[fc,tc,Jr]}),r=ur("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=fl(i.toString());Ja(t,a,()=>a(t.currentUser)),Ya(t,c=>a(c))}}const s=Zs("auth");return s&&ba(t,`http://${s}`),t}function ml(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}ra({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=F("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",ml().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});dl("Browser");const gl=gr(Ms),Ut=pl(gl);/*! Capacitor: https://capacitorjs.com/ - MIT License */var Te;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Te||(Te={}));class Mt extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const yl=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},bl=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:yl(n),i=()=>s()!=="web",a=h=>{const u=d.get(h);return!!(u?.platforms.has(s())||c(h))},c=h=>{var u;return(u=t.PluginHeaders)===null||u===void 0?void 0:u.find(y=>y.name===h)},l=h=>n.console.error(h),d=new Map,f=(h,u={})=>{const y=d.get(h);if(y)return console.warn(`Capacitor plugin "${h}" already registered. Cannot register plugins twice.`),y.proxy;const I=s(),w=c(h);let g;const p=async()=>(!g&&I in u?g=typeof u[I]=="function"?g=await u[I]():g=u[I]:e!==null&&!g&&"web"in u&&(g=typeof u.web=="function"?g=await u.web():g=u.web),g),_=(E,S)=>{var R,B;if(w){const Z=w?.methods.find(V=>S===V.name);if(Z)return Z.rtype==="promise"?V=>t.nativePromise(h,S.toString(),V):(V,Xe)=>t.nativeCallback(h,S.toString(),V,Xe);if(E)return(R=E[S])===null||R===void 0?void 0:R.bind(E)}else{if(E)return(B=E[S])===null||B===void 0?void 0:B.bind(E);throw new Mt(`"${h}" plugin is not implemented on ${I}`,Te.Unimplemented)}},A=E=>{let S;const R=(...B)=>{const Z=p().then(V=>{const Xe=_(V,E);if(Xe){const Qe=Xe(...B);return S=Qe?.remove,Qe}else throw new Mt(`"${h}.${E}()" is not implemented on ${I}`,Te.Unimplemented)});return E==="addListener"&&(Z.remove=async()=>S()),Z};return R.toString=()=>`${E.toString()}() { [capacitor code] }`,Object.defineProperty(R,"name",{value:E,writable:!1,configurable:!1}),R},D=A("addListener"),v=A("removeListener"),T=(E,S)=>{const R=D({eventName:E},S),B=async()=>{const V=await R;v({eventName:E,callbackId:V},S)},Z=new Promise(V=>R.then(()=>V({remove:B})));return Z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await B()},Z},x=new Proxy({},{get(E,S){switch(S){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return w?T:D;case"removeListener":return v;default:return A(S)}}});return r[h]=x,d.set(h,{name:h,proxy:x,platforms:new Set([...Object.keys(u),...w?[I]:[]])}),x};return t.convertFileSrc||(t.convertFileSrc=h=>h),t.getPlatform=s,t.handleError=l,t.isNativePlatform=i,t.isPluginAvailable=a,t.registerPlugin=f,t.Exception=Mt,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},vl=n=>n.Capacitor=bl(n),_e=vl(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),At=_e.registerPlugin;class cs{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,t);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new _e.Exception(e,Te.Unimplemented)}unavailable(e="not available"){return new _e.Exception(e,Te.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const s=r.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const zn=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),qn=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class wl extends cs{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=qn(s).trim(),i=qn(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=zn(e.key),r=zn(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,i=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${i}; ${a};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}At("CapacitorCookies",{web:()=>new wl});const _l=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>t(s),r.readAsDataURL(n)}),Il=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,i,a)=>(s[i]=n[e[a]],s),{})},El=(n,e=!0)=>n?Object.entries(n).reduce((r,s)=>{const[i,a]=s;let c,l;return Array.isArray(a)?(l="",a.forEach(d=>{c=e?encodeURIComponent(d):d,l+=`${i}=${c}&`}),l.slice(0,-1)):(c=e?encodeURIComponent(a):a,l=`${i}=${c}`),`${r}&${l}`},"").substr(1):null,Tl=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=Il(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[a,c]of Object.entries(n.data||{}))i.set(a,c);t.body=i.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const i=new FormData;if(n.data instanceof FormData)n.data.forEach((c,l)=>{i.append(l,c)});else for(const c of Object.keys(n.data))i.append(c,n.data[c]);t.body=i;const a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class Al extends cs{async request(e){const t=Tl(e,e.webFetchExtra),r=El(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,t),a=i.headers.get("content-type")||"";let{responseType:c="text"}=i.ok?e:{};a.includes("application/json")&&(c="json");let l,d;switch(c){case"arraybuffer":case"blob":d=await i.blob(),l=await _l(d);break;case"json":l=await i.json();break;case"document":case"text":default:l=await i.text()}const f={};return i.headers.forEach((h,u)=>{f[u]=h}),{data:l,headers:f,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}At("CapacitorHttp",{web:()=>new Al});var Kn;(function(n){n.IndexedDbLocal="INDEXED_DB_LOCAL",n.InMemory="IN_MEMORY",n.BrowserLocal="BROWSER_LOCAL",n.BrowserSession="BROWSER_SESSION"})(Kn||(Kn={}));var Yn;(function(n){n.APPLE="apple.com",n.FACEBOOK="facebook.com",n.GAME_CENTER="gc.apple.com",n.GITHUB="github.com",n.GOOGLE="google.com",n.MICROSOFT="microsoft.com",n.PLAY_GAMES="playgames.google.com",n.TWITTER="twitter.com",n.YAHOO="yahoo.com",n.PASSWORD="password",n.PHONE="phone"})(Yn||(Yn={}));const pe=At("FirebaseAuthentication",{web:()=>Ae(()=>import("./web-CYGSIbbt.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(n=>new n.FirebaseAuthenticationWeb)}),ls=m.createContext(null),Sl=({children:n})=>{const[e,t]=m.useState(null),[r,s]=m.useState(null),[i,a]=m.useState(!0),[c,l]=m.useState(!1),f=ft()?.socket;m.useEffect(()=>{if(f&&e)return f.on("balanceUpdated",w=>{if(console.log("[AuthContext] Received balanceUpdated event:",w),w&&typeof w.balance=="number"){console.log(`[AuthContext] Updating user balance from ${e?.balance} to ${w.balance}`);const g={...e,balance:w.balance};t(g)}else console.warn("[AuthContext] Received invalid balance data:",w)}),()=>{f.off("balanceUpdated")}},[f,e]);const h=async w=>{if(!w)return null;try{const g=await fetch(`${rr}/auth/me`,{headers:{Authorization:`Bearer ${w}`,"Content-Type":"application/json"}});return g.ok?(await g.json()).user:null}catch(g){return console.error("[Auth] Error fetching user data:",g),null}};m.useEffect(()=>{const w=_e.isNativePlatform(),g=async p=>{if(!p){t(null),s(null),a(!1);return}s(p);const _=await h(p);_?t(_):(t(null),s(null)),a(!1)};if(w){const p=pe.addListener("authStateChange",async _=>{if(_.user){const A=await pe.getIdToken();await g(A.token)}else await g(null)});return pe.getCurrentUser().then(async _=>{if(_.user){const A=await pe.getIdToken();await g(A.token)}else a(!1)}),()=>p.remove()}else{const p=Xa(Ut,async _=>{if(_){const A=await _.getIdToken();await g(A)}else await g(null)});return()=>p()}},[]);const u=async(w,g)=>{t(w),s(g),l(!0);const p=await h(g);p&&t(p)},y=m.useCallback(async()=>{await(_e.isNativePlatform()?pe.signOut():Qa(Ut)),t(null),s(null),l(!1)},[]),I=m.useCallback(async()=>{const g=_e.isNativePlatform()?(await pe.getIdToken({forceRefresh:!0})).token:await Ut.currentUser?.getIdToken(!0);if(!g){y();return}s(g);const p=await h(g);p?t(p):y()},[y]);return i?null:o.jsx(ls.Provider,{value:{user:e,token:r,login:u,logout:y,refreshUserData:I,loading:i},children:n})},St=()=>{const n=m.useContext(ls);if(!n)throw new Error("useAuth must be used within an AuthProvider");return n},ds=m.createContext(),du=()=>m.useContext(ds),xl=({children:n})=>{const{socket:e,isConnected:t}=ft(),[r,s]=m.useState([]),[i,a]=m.useState(!0),[c,l]=m.useState(null);m.useEffect(()=>{if(!e||!t)return;const f=u=>{s(u),a(!1)},h=u=>{console.error("[LobbyContext] Socket error:",u.message||u),l(u.message||"An error occurred"),a(!1)};return e.on("gameList",f),e.on("error",h),e.emit("getGameList"),()=>{e.off("gameList",f),e.off("error",h)}},[e,t]);const d={gameList:r,loading:i,error:c};return o.jsx(ds.Provider,{value:d,children:n})},kl="_legalPage_hiva8_3",Pl="_container_hiva8_12",Cl="_lastUpdated_hiva8_25",Rl="_footer_hiva8_89",oe={legalPage:kl,container:Pl,lastUpdated:Cl,footer:Rl};function Ol(){return m.useEffect(()=>{document.title="Terms of Service | In-Between";let n=document.querySelector('meta[name="description"]');n||(n=document.createElement("meta"),n.name="description",document.head.appendChild(n)),n.content="Terms of Service for In-Between card game platform. Read our user agreement, eligibility requirements, and acceptable use policy.",window.scrollTo(0,0)},[]),o.jsx("article",{className:oe.legalPage,children:o.jsxs("div",{className:oe.container,children:[o.jsx("h1",{children:"Terms of Service"}),o.jsx("p",{className:oe.lastUpdated,children:o.jsx("em",{children:"Last Updated: October 31, 2025"})}),o.jsxs("section",{children:[o.jsx("h2",{children:"1. Introduction and Acceptance"}),o.jsx("p",{children:'Welcome to In-Between, a multiplayer card game platform operated by Applied Method, LLC ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.'}),o.jsx("p",{children:"These Terms constitute a legally binding agreement between you and Applied Method, LLC. Your continued use of the Service indicates your acceptance of these Terms and any future modifications."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"2. Eligibility"}),o.jsx("p",{children:"You must be at least 13 years old to use the Service. By using the Service, you represent and warrant that you are at least 13 years old. If you are under 13, you are not permitted to use the Service."}),o.jsx("p",{children:"If we discover that a user is under 13 years old, we will immediately terminate their account and delete their personal information in accordance with applicable law."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"3. Account Registration and Security"}),o.jsx("p",{children:"To access certain features of the Service, you may be required to create an account using one of our supported social login providers (Google, Facebook, or Apple). You agree to:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Provide accurate and complete information during registration"}),o.jsx("li",{children:"Maintain the security of your account credentials"}),o.jsx("li",{children:"Notify us immediately of any unauthorized access to your account"}),o.jsx("li",{children:"Accept responsibility for all activities that occur under your account"}),o.jsx("li",{children:"Not share your account with others or allow others to access your account"})]}),o.jsx("p",{children:"We reserve the right to suspend or terminate accounts that violate these Terms or engage in suspicious activity."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"4. Acceptable Use Policy"}),o.jsx("p",{children:"You agree to use the Service in a manner consistent with all applicable laws and regulations. We actively moderate content and reserve the right to review and remove inappropriate content, including usernames, profile pictures, and chat messages."}),o.jsx("p",{children:o.jsx("strong",{children:"Prohibited activities include, but are not limited to:"})}),o.jsxs("ul",{children:[o.jsx("li",{children:"Harassment, bullying, or abusive behavior toward other users"}),o.jsx("li",{children:"Using offensive, inappropriate, or misleading usernames"}),o.jsx("li",{children:"Uploading inappropriate or offensive profile pictures"}),o.jsx("li",{children:"Cheating, exploiting bugs, or manipulating game mechanics for unfair advantage"}),o.jsx("li",{children:"Attempting to gain unauthorized access to other accounts or our systems"}),o.jsx("li",{children:"Using automated scripts, bots, or other tools to interact with the Service"}),o.jsx("li",{children:"Spamming, advertising, or soliciting other users for commercial purposes"}),o.jsx("li",{children:"Posting or sharing illegal, harmful, or malicious content"}),o.jsx("li",{children:"Impersonating other users, moderators, or Applied Method, LLC representatives"})]}),o.jsx("p",{children:"Violation of this Acceptable Use Policy may result in content removal, account suspension, or permanent termination without notice or refund."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"5. Virtual Currency and Purchases"}),o.jsx("p",{children:"The Service may offer virtual currency, cosmetic items, or other digital goods for purchase. All purchases are final and non-refundable except where required by law."}),o.jsx("p",{children:o.jsx("strong",{children:"You acknowledge and agree that:"})}),o.jsxs("ul",{children:[o.jsx("li",{children:"Virtual currency and digital items have no real-world monetary value"}),o.jsx("li",{children:"Virtual currency cannot be transferred, exchanged, or redeemed outside the Service"}),o.jsx("li",{children:"We reserve the right to modify prices, offerings, and availability at any time"}),o.jsx("li",{children:"Purchases are subject to the policies of third-party app stores (Apple App Store, Google Play Store)"}),o.jsx("li",{children:"No refunds will be provided for unused virtual currency or items upon account termination"}),o.jsx("li",{children:"We are not responsible for unauthorized purchases made through your account"})]}),o.jsxs("p",{children:["If you believe you have been charged in error, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})," within 30 days of the transaction."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"6. Intellectual Property Rights"}),o.jsx("p",{children:'All content, features, and functionality of the Service, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, software, and the compilation thereof (collectively, "Content"), are owned by Applied Method, LLC and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.'}),o.jsx("p",{children:"We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial use. You may not:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Copy, modify, distribute, sell, or lease any part of the Service"}),o.jsx("li",{children:"Reverse engineer, decompile, or disassemble the Service or its software"}),o.jsx("li",{children:"Remove or modify any copyright, trademark, or other proprietary notices"}),o.jsx("li",{children:"Use the Service for any commercial purpose without our written permission"})]}),o.jsx("p",{children:"By submitting user-generated content (such as usernames, chat messages, or profile pictures), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of operating and improving the Service."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"7. User-Generated Content and Moderation"}),o.jsx("p",{children:"The Service may allow you to create, submit, or display content such as usernames, profile pictures, and chat messages. You retain ownership of your user-generated content, but you grant us the rights described in Section 6."}),o.jsx("p",{children:"We actively moderate content and reserve the right to review, remove, or modify any user-generated content that violates these Terms or is deemed inappropriate. However, we are not obligated to monitor all content and are not responsible for user-generated content."}),o.jsx("p",{children:"You are solely responsible for your content and the consequences of posting it. You represent and warrant that you own or have the necessary rights to post your content and that it does not violate any third-party rights or applicable laws."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"8. Disclaimer of Warranties"}),o.jsx("p",{children:'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.'}),o.jsx("p",{children:"We do not warrant that:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"The Service will be uninterrupted, timely, secure, or error-free"}),o.jsx("li",{children:"The results obtained from using the Service will be accurate or reliable"}),o.jsx("li",{children:"Any errors in the Service will be corrected"}),o.jsx("li",{children:"The Service will meet your requirements or expectations"})]}),o.jsx("p",{children:"We are not responsible for issues caused by third-party services, including social login providers, payment processors, or hosting providers. Your use of the Service is at your sole risk."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"9. Limitation of Liability"}),o.jsx("p",{children:"TO THE MAXIMUM EXTENT PERMITTED BY LAW, APPLIED METHOD, LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE."}),o.jsx("p",{children:"IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER."}),o.jsx("p",{children:"We are not liable for:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Loss or corruption of virtual currency or account data"}),o.jsx("li",{children:"Unauthorized access to your account due to your failure to maintain security"}),o.jsx("li",{children:"Service interruptions or downtime"}),o.jsx("li",{children:"Actions or omissions of third-party service providers"}),o.jsx("li",{children:"Conduct of other users"})]}),o.jsx("p",{children:"Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"10. Indemnification"}),o.jsx("p",{children:"You agree to indemnify, defend, and hold harmless Applied Method, LLC, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Your use or misuse of the Service"}),o.jsx("li",{children:"Your violation of these Terms"}),o.jsx("li",{children:"Your violation of any rights of another person or entity"}),o.jsx("li",{children:"Your user-generated content"}),o.jsx("li",{children:"Your breach of any representation or warranty contained in these Terms"})]}),o.jsx("p",{children:"We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"11. Dispute Resolution and Governing Law"}),o.jsx("p",{children:"These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions."}),o.jsx("p",{children:"Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Delaware, and the arbitrator's decision shall be final and binding."}),o.jsx("p",{children:"You agree to waive any right to a jury trial and to participate in a class action lawsuit against Applied Method, LLC. Each party shall bear its own costs and attorneys' fees, unless otherwise awarded by the arbitrator."}),o.jsx("p",{children:"Notwithstanding the above, either party may seek injunctive or equitable relief in a court of competent jurisdiction to prevent actual or threatened infringement, misappropriation, or violation of intellectual property rights."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"12. Termination"}),o.jsx("p",{children:"We reserve the right to suspend or terminate your account and access to the Service at any time, with or without cause, and with or without notice, for any reason including but not limited to:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Violation of these Terms"}),o.jsx("li",{children:"Fraudulent, abusive, or illegal activity"}),o.jsx("li",{children:"Extended periods of inactivity"}),o.jsx("li",{children:"Requests from law enforcement or government agencies"}),o.jsx("li",{children:"Technical or security issues"})]}),o.jsxs("p",{children:["You may terminate your account at any time by contacting us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),". Upon termination:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"Your right to use the Service will immediately cease"}),o.jsx("li",{children:"Your account data will be deleted in accordance with our Privacy Policy"}),o.jsx("li",{children:"Any unused virtual currency or items will be forfeited without refund"}),o.jsx("li",{children:"Sections of these Terms that by their nature should survive termination will survive"})]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"13. Changes to Terms"}),o.jsx("p",{children:"We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email (to the address associated with your account) or by posting a notice on the Service at least 30 days before the changes take effect."}),o.jsx("p",{children:"Your continued use of the Service after the effective date of the modified Terms constitutes your acceptance of the changes. If you do not agree to the modified Terms, you must stop using the Service and may terminate your account."}),o.jsx("p",{children:"We encourage you to review these Terms periodically to stay informed of any updates."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"14. Miscellaneous"}),o.jsxs("p",{children:[o.jsx("strong",{children:"Entire Agreement:"})," These Terms, together with our Privacy Policy, constitute the entire agreement between you and Applied Method, LLC regarding the Service."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Severability:"})," If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Waiver:"})," Our failure to enforce any right or provision of these Terms will not constitute a waiver of such right or provision."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Assignment:"})," You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign these Terms without restriction."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Contact Information:"})," For questions, concerns, or notices regarding these Terms, please contact us at:"]}),o.jsxs("p",{children:["Applied Method, LLC",o.jsx("br",{}),"1111B S Governors Ave STE 26981",o.jsx("br",{}),"Dover, DE 19904",o.jsx("br",{}),"United States",o.jsx("br",{}),"Email: ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})]})]}),o.jsx("div",{className:oe.footer,children:o.jsx("p",{children:"By using In-Between, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service."})})]})})}function jl(){return m.useEffect(()=>{document.title="Privacy Policy | In-Between";let n=document.querySelector('meta[name="description"]');n||(n=document.createElement("meta"),n.name="description",document.head.appendChild(n)),n.content="Privacy Policy for In-Between card game. Learn how we collect, use, and protect your personal information, and your rights under GDPR and CCPA.",window.scrollTo(0,0)},[]),o.jsx("article",{className:oe.legalPage,children:o.jsxs("div",{className:oe.container,children:[o.jsx("h1",{children:"Privacy Policy"}),o.jsx("p",{className:oe.lastUpdated,children:o.jsx("em",{children:"Last Updated: October 31, 2025"})}),o.jsxs("section",{children:[o.jsx("h2",{children:"1. Introduction"}),o.jsx("p",{children:'Applied Method, LLC ("we," "us," or "our") operates the In-Between card game platform (the "Service"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Service.'}),o.jsx("p",{children:"By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Service."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"2. Information We Collect"}),o.jsx("p",{children:"We collect several types of information to provide and improve our Service."}),o.jsx("h3",{children:"2.1 Personal Information"}),o.jsx("p",{children:"When you create an account or use the Service, we collect:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Email address"})," - Provided by your social login provider (Google, Facebook, or Apple)"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Username"})," - Your chosen display name within the game"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Profile picture"})," - Either uploaded by you or retrieved from your social login provider"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"OAuth provider ID"})," - A unique identifier from Google, Facebook, or Apple used for authentication"]})]}),o.jsx("h3",{children:"2.2 Gameplay Data"}),o.jsx("p",{children:"To provide game functionality and track your progress, we collect:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Game history and match results"}),o.jsx("li",{children:"Win/loss records and player rankings"}),o.jsx("li",{children:"Achievements earned and experience points (XP)"}),o.jsx("li",{children:"In-game purchases and virtual currency balance"}),o.jsx("li",{children:"Chat messages (for moderation purposes)"}),o.jsx("li",{children:"Game preferences and settings"})]}),o.jsx("h3",{children:"2.3 Technical Information"}),o.jsx("p",{children:"We automatically collect certain technical information when you use the Service:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"IP address"}),o.jsx("li",{children:"Device type, model, and operating system"}),o.jsx("li",{children:"Browser type and version"}),o.jsx("li",{children:"Session data and timestamps"}),o.jsx("li",{children:"Cookies and local storage data"}),o.jsx("li",{children:"Error logs and crash reports"})]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"3. How We Use Your Information"}),o.jsx("p",{children:"We use the collected information for the following purposes:"}),o.jsx("h3",{children:"Account Management"}),o.jsx("p",{children:"Creating and maintaining user accounts, authenticating users, and managing account security."}),o.jsx("h3",{children:"Gameplay"}),o.jsx("p",{children:"Providing game functionality, matchmaking, leaderboards, statistics tracking, and achievement systems."}),o.jsx("h3",{children:"Communication"}),o.jsx("p",{children:"Sending service updates, notifications about game events, responding to support requests, and communicating important changes to our Terms or Privacy Policy."}),o.jsx("h3",{children:"Analytics"}),o.jsx("p",{children:"Understanding user behavior, improving game features, identifying bugs, and optimizing the user experience through analytics tools like Google Analytics."}),o.jsx("h3",{children:"Content Moderation"}),o.jsx("p",{children:"Reviewing user-generated content (usernames, profile pictures, chat messages) to enforce our Terms of Service and maintain a safe gaming environment."}),o.jsx("h3",{children:"Monetization"}),o.jsx("p",{children:"Processing in-game purchases, managing virtual currency, and displaying advertisements through Google AdSense (when implemented)."}),o.jsx("h3",{children:"Legal Compliance"}),o.jsx("p",{children:"Complying with legal obligations, protecting our rights, preventing fraud, and responding to legal requests from law enforcement or government agencies."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"4. Third-Party Services"}),o.jsx("p",{children:"We share data with the following third-party services to provide the Service:"}),o.jsx("h3",{children:"4.1 Social Login Providers"}),o.jsxs("p",{children:["We use OAuth authentication through ",o.jsx("strong",{children:"Google"}),", ",o.jsx("strong",{children:"Facebook"}),", and ",o.jsx("strong",{children:"Apple"})," to allow you to sign in with your existing accounts. When you use social login:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"We receive limited profile data (email address, name, profile picture)"}),o.jsx("li",{children:"These providers have their own privacy policies governing their data practices"}),o.jsx("li",{children:"We do not have access to your social media passwords"}),o.jsx("li",{children:"You can revoke our access through your social provider's settings at any time"})]}),o.jsx("h3",{children:"4.2 Analytics Services"}),o.jsxs("p",{children:["We use ",o.jsx("strong",{children:"Google Analytics"})," to understand how users interact with the Service. Google Analytics collects:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"IP addresses (anonymized where possible)"}),o.jsx("li",{children:"Device information and browser details"}),o.jsx("li",{children:"User behavior data (page views, session duration, interactions)"}),o.jsx("li",{children:"Traffic sources and referral information"})]}),o.jsxs("p",{children:["You can opt out of Google Analytics using browser extensions like the"," ",o.jsx("a",{href:"https://tools.google.com/dlpage/gaoptout",target:"_blank",rel:"noopener noreferrer",children:"Google Analytics Opt-out Browser Add-on"}),"."]}),o.jsx("h3",{children:"4.3 Advertising Services"}),o.jsxs("p",{children:["We may display advertisements through ",o.jsx("strong",{children:"Google AdSense"}),". When implemented, Google may:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"Use cookies to serve personalized ads based on your interests"}),o.jsx("li",{children:"Collect information about your visits to our Service and other websites"}),o.jsxs("li",{children:["Allow you to opt out of personalized advertising through your"," ",o.jsx("a",{href:"https://adssettings.google.com/",target:"_blank",rel:"noopener noreferrer",children:"Google Ads Settings"})]})]}),o.jsx("h3",{children:"4.4 Payment Processors"}),o.jsxs("p",{children:["For in-game purchases, we use ",o.jsx("strong",{children:"Stripe"})," and app store payment systems (Apple App Store, Google Play Store). Payment information is handled directly by these processors and is not stored on our servers. We only receive confirmation of successful transactions and limited transaction details."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"5. Cookies and Tracking Technologies"}),o.jsx("p",{children:"We use cookies and similar tracking technologies to provide and improve the Service:"}),o.jsx("h3",{children:"Essential Cookies"}),o.jsx("p",{children:"Required for authentication and session management. These cookies are necessary for the Service to function and cannot be disabled."}),o.jsx("h3",{children:"Preference Cookies"}),o.jsx("p",{children:"Store your settings and preferences (such as game settings, volume preferences, and display options) to provide a personalized experience."}),o.jsx("h3",{children:"Analytics Cookies"}),o.jsx("p",{children:"Used by Google Analytics to track usage patterns and help us understand how users interact with the Service."}),o.jsx("h3",{children:"Advertising Cookies"}),o.jsx("p",{children:"If advertising is enabled, these cookies may be used to serve personalized ads based on your interests and browsing behavior."}),o.jsx("p",{children:"Most web browsers allow you to control cookies through their settings. However, disabling cookies may limit your ability to use certain features of the Service."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"6. Your Rights Under GDPR (EU Users)"}),o.jsx("p",{children:"If you are located in the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR):"}),o.jsx("h3",{children:"Right to Access"}),o.jsx("p",{children:"You have the right to request a copy of the personal data we hold about you."}),o.jsx("h3",{children:"Right to Rectification"}),o.jsx("p",{children:"You can request that we correct any inaccurate or incomplete personal data."}),o.jsx("h3",{children:'Right to Erasure ("Right to be Forgotten")'}),o.jsx("p",{children:"You can request that we delete your personal data, subject to certain legal exceptions."}),o.jsx("h3",{children:"Right to Restriction of Processing"}),o.jsx("p",{children:"You can request that we limit the processing of your personal data in certain circumstances."}),o.jsx("h3",{children:"Right to Data Portability"}),o.jsx("p",{children:"You can request to receive your personal data in a structured, commonly used, and machine-readable format, and have it transferred to another service provider."}),o.jsx("h3",{children:"Right to Object"}),o.jsx("p",{children:"You can object to processing of your personal data based on legitimate interests or for direct marketing purposes."}),o.jsx("h3",{children:"Right to Withdraw Consent"}),o.jsx("p",{children:"Where processing is based on your consent, you have the right to withdraw that consent at any time."}),o.jsxs("p",{children:[o.jsxs("strong",{children:["To exercise any of these rights, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),"."]})," We will respond to your request within 30 days."]}),o.jsx("p",{children:"You also have the right to lodge a complaint with your local data protection authority if you believe we have violated your privacy rights."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"7. Your Rights Under CCPA (California Users)"}),o.jsx("p",{children:"If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):"}),o.jsx("h3",{children:"Right to Know"}),o.jsx("p",{children:"You have the right to request disclosure of the categories and specific pieces of personal information we have collected about you, the sources from which we collected it, our business purposes for collecting it, and the categories of third parties with whom we share it."}),o.jsx("h3",{children:"Right to Delete"}),o.jsx("p",{children:"You have the right to request deletion of your personal information, subject to certain legal exceptions."}),o.jsx("h3",{children:"Right to Opt-Out of Sale"}),o.jsxs("p",{children:[o.jsx("strong",{children:"We do not sell your personal information."}),' However, if we ever decide to do so in the future, we will provide a clear "Do Not Sell My Personal Information" link on our website.']}),o.jsx("h3",{children:"Right to Non-Discrimination"}),o.jsx("p",{children:"You have the right to not be discriminated against for exercising your CCPA rights. We will not deny you service, charge different prices, or provide a different level of service for exercising your privacy rights."}),o.jsx("h3",{children:"Categories of Information Collected"}),o.jsx("p",{children:"We collect the following categories of personal information:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Identifiers (email, username, OAuth IDs)"}),o.jsx("li",{children:"Commercial information (purchase history, virtual currency balance)"}),o.jsx("li",{children:"Internet or network activity (gameplay data, browsing behavior)"}),o.jsx("li",{children:"Geolocation data (IP address)"})]}),o.jsxs("p",{children:[o.jsxs("strong",{children:["To exercise any of these rights, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),"."]})," We will verify your identity before processing your request and respond within 45 days."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"8. Data Retention"}),o.jsx("p",{children:"We retain your personal information for as long as necessary to provide the Service and fulfill the purposes described in this Privacy Policy:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Active accounts:"})," Data is retained while your account remains active"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Game history:"})," Gameplay data is retained for leaderboards, statistics, and historical records"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Deleted accounts:"})," Personal data is deleted within 90 days of account deletion, except where we are legally required to retain it (e.g., for tax or legal compliance purposes)"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Backup data:"})," Data may persist in backup systems for up to 12 months after deletion"]})]}),o.jsxs("p",{children:["If you would like to request earlier deletion of your data, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),"."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"9. Security Measures"}),o.jsx("p",{children:"We take the security of your personal information seriously and implement industry-standard measures to protect it:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Authentication Security:"})," We use secure OAuth authentication through trusted providers (Google, Facebook, Apple) and do not store passwords on our servers"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Encryption in Transit:"})," All data transmitted between your device and our servers is encrypted using HTTPS/TLS"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Database Security:"})," Our CouchDB database is protected with access controls and authentication"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"JWT Authentication:"})," Session tokens use industry-standard JSON Web Tokens for secure authentication"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Regular Updates:"})," We keep our software and dependencies up to date with security patches"]})]}),o.jsx("p",{children:"However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security. You are responsible for maintaining the security of your account credentials."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"10. Children's Privacy (COPPA Compliance)"}),o.jsx("p",{children:"The Service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13."}),o.jsx("p",{children:"If you are under 13 years old, please do not use the Service or provide any personal information to us. If we discover that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information as quickly as possible."}),o.jsxs("p",{children:["If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us immediately at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})," so we can take appropriate action."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"11. International Data Transfers"}),o.jsx("p",{children:"The Service is hosted on Render.com, a US-based hosting provider. Your personal information may be transferred to, stored, and processed in the United States or other countries where our service providers operate."}),o.jsx("p",{children:"These countries may have data protection laws that differ from the laws of your country. By using the Service, you consent to the transfer of your information to the United States and other countries where we operate."}),o.jsx("p",{children:"For users in the European Economic Area (EEA), we take steps to ensure that international data transfers comply with applicable data protection laws, including the use of standard contractual clauses when appropriate."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"12. Changes to This Privacy Policy"}),o.jsx("p",{children:"We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors."}),o.jsx("p",{children:"When we make material changes to this Privacy Policy, we will:"}),o.jsxs("ul",{children:[o.jsx("li",{children:'Update the "Last Updated" date at the top of this page'}),o.jsx("li",{children:"Notify you by email (to the address associated with your account)"}),o.jsx("li",{children:"Display a prominent notice on the Service"}),o.jsx("li",{children:"Provide at least 30 days' notice before the changes take effect"})]}),o.jsx("p",{children:"Your continued use of the Service after the effective date of the updated Privacy Policy constitutes your acceptance of the changes. If you do not agree with the updated Privacy Policy, you should stop using the Service and may request deletion of your account."}),o.jsx("p",{children:"We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"13. Contact Us"}),o.jsx("p",{children:"If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:"}),o.jsxs("p",{children:[o.jsx("strong",{children:"Applied Method, LLC"}),o.jsx("br",{}),"1111B S Governors Ave STE 26981",o.jsx("br",{}),"Dover, DE 19904",o.jsx("br",{}),"United States",o.jsx("br",{}),"Email: ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})]}),o.jsx("p",{children:"We will respond to your inquiry as soon as possible, typically within 30 days."})]}),o.jsx("div",{className:oe.footer,children:o.jsx("p",{children:"Thank you for trusting In-Between with your personal information. We are committed to protecting your privacy and providing a safe, enjoyable gaming experience."})})]})})}const Ll=m.lazy(()=>Ae(()=>import("./ModernAuthPage-BhI33_-H.js"),__vite__mapDeps([4,1,5,6,7,8,2,3,9]),import.meta.url)),Nl=m.lazy(()=>Ae(()=>import("./AuthPage-BKFtDoir.js"),__vite__mapDeps([10,1,5,6,7,2,3,11]),import.meta.url)),Dl=m.lazy(()=>Ae(()=>import("./Lobby-b3625-Mx.js"),__vite__mapDeps([12,1,5,6,7,13,14,8,2,3,15]),import.meta.url)),Ul=m.lazy(()=>Ae(()=>import("./GameRoom-BoteMUxA.js"),__vite__mapDeps([16,1,13,14,5,2,3,17]),import.meta.url)),Jn=({children:n})=>{const{user:e,loading:t}=St();return t?o.jsx(Re,{message:"Checking authentication..."}):e?n:o.jsx(tr,{to:"/auth",replace:!0})},Ml=vs([{path:"/",element:o.jsx(Jn,{children:o.jsx(xl,{children:o.jsx(m.Suspense,{fallback:o.jsx(Re,{message:"Loading..."}),children:o.jsx(Dl,{})})})})},{path:"/auth",element:o.jsx(m.Suspense,{fallback:o.jsx(Re,{message:"Loading..."}),children:o.jsx(Ll,{})})},{path:"/migrate",element:o.jsx(m.Suspense,{fallback:o.jsx(Re,{message:"Loading..."}),children:o.jsx(Nl,{})})},{path:"/terms",element:o.jsx(Ol,{})},{path:"/privacy",element:o.jsx(jl,{})},{path:"/:gameId",element:o.jsx(Jn,{children:o.jsx(m.Suspense,{fallback:o.jsx(Re,{message:"Loading..."}),children:o.jsx(Ul,{})})})},{path:"*",element:o.jsx(tr,{to:"/",replace:!0})}]),Fl=()=>{const[n,e]=m.useState(!1),[t,r]=m.useState(null),[s,i]=m.useState("text"),[a,c]=m.useState(""),[l,d]=m.useState(!1);m.useEffect(()=>{const w=()=>{const p=document.body.classList.contains("gamepad-navigation-active");d(p)};w();const g=new MutationObserver(w);return g.observe(document.body,{attributes:!0,attributeFilter:["class"]}),()=>g.disconnect()},[]);const f=m.useCallback((w,g="text",p="")=>{w&&(r(w),i(g),c(p),e(!0),w.blur())},[]),h=m.useCallback(()=>{e(!1),r(null),i("text"),c("")},[]),u=m.useCallback(w=>{if(!t)return;Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,w||"");const p=new Event("input",{bubbles:!0});t.dispatchEvent(p);const _=new Event("change",{bubbles:!0});t.dispatchEvent(_),h()},[t,h]),y=m.useCallback((w,g="text",p="")=>{if(!w)return;let _=w;w.querySelector&&w.querySelector("input")&&(_=w.querySelector("input"));const A=D=>{l&&document.body.classList.contains("gamepad-navigation-active")&&(D.preventDefault(),f(_,g,p))};return _.addEventListener("click",A),()=>{_.removeEventListener("click",A)}},[l,f]),I=m.useCallback(()=>t?.value||"",[t]);return{isVisible:n,inputType:s,keyboardTitle:a,currentInput:t,isGamepadActive:l,showKeyboard:f,hideKeyboard:h,handleEnter:u,enhanceInput:y,getCurrentInputValue:I}},Bl="_overlay_12fs3_1",Wl="_modal_12fs3_17",$l="_header_12fs3_38",Vl="_closeButton_12fs3_55",Hl="_sectionHeader_12fs3_74",Gl="_settingDescription_12fs3_90",zl="_errorMessage_12fs3_112",ql="_content_12fs3_122",Kl="_footer_12fs3_151",me={overlay:Bl,modal:Wl,header:$l,closeButton:Vl,sectionHeader:Hl,settingDescription:Gl,errorMessage:zl,content:ql,footer:Kl};let Xn=0;function Yl({title:n,onClose:e,children:t,footer:r,headerButtons:s,className:i="",overlayStyle:a,...c}){m.useEffect(()=>(++Xn===1&&document.body.classList.add("modal-open"),()=>{--Xn===0&&document.body.classList.remove("modal-open")}),[]);const l=o.jsx("div",{className:me.overlay,style:a,onClick:e,children:o.jsxs("div",{className:`${me.modal} ${i}`,onClick:d=>d.stopPropagation(),...c,children:[n&&o.jsxs("div",{className:me.header,children:[o.jsx("h2",{children:n}),o.jsxs("div",{style:{display:"flex",gap:"0.5rem",alignItems:"center"},children:[s,o.jsx("button",{className:me.closeButton,onClick:e,"aria-label":"Close",type:"button","data-gamepad-focusable":"true",children:"×"})]})]}),o.jsx("div",{className:me.content,children:t}),r&&o.jsx("div",{className:me.footer,children:r})]})});return ws.createPortal(l,document.body)}const Jl="_keyboardModal_nsw4g_2",Xl="_inputDisplay_nsw4g_7",Ql="_tempInput_nsw4g_12",Zl="_keyboardGrid_nsw4g_37",ed="_keyRow_nsw4g_41",td="_key_nsw4g_2",nd="_specialKey_nsw4g_87",rd="_spaceKey_nsw4g_98",sd="_activeShift_nsw4g_103",z={keyboardModal:Jl,inputDisplay:Xl,tempInput:Ql,keyboardGrid:Zl,keyRow:ed,key:td,specialKey:nd,spaceKey:rd,activeShift:sd},id=({isVisible:n,onClose:e,onEnter:t,inputType:r="text",initialValue:s=""})=>{const{keyboardTitle:i}=od(),[a,c]=m.useState("lowercase"),[l,d]=m.useState("");m.useEffect(()=>{d(n?r==="number"?s&&s!=="0"?s:"":s||"":"")},[n,s,r]);const u={lowercase:[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["shift","z","x","c","v","b","n","m","backspace"],["space","enter"]],uppercase:[["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["shift","Z","X","C","V","B","N","M","backspace"],["space","enter"]],numbers:[["1","2","3"],["4","5","6"],["7","8","9"],["0","backspace"],["enter"]]}[r==="number"?"numbers":a],y=m.useCallback(g=>{switch(g){case"shift":c(p=>p==="lowercase"?"uppercase":"lowercase");break;case"backspace":d(p=>p.slice(0,-1));break;case"enter":t?.(l);break;case"space":d(p=>p+" ");break;default:d(p=>p+g);break}},[t,l]),I=g=>{switch(g){case"shift":return"⇧";case"backspace":return"⌫";case"space":return"Space";case"enter":return"↵";default:return g}},w=g=>{let p=z.key;return["shift","backspace","space","enter"].includes(g)&&(p+=` ${z.specialKey}`),g==="space"&&(p+=` ${z.spaceKey}`),g==="shift"&&a==="uppercase"&&(p+=` ${z.activeShift}`),p};return m.useEffect(()=>{if(n){const g=p=>{p.key==="Escape"&&(p.preventDefault(),e?.())};return document.addEventListener("keydown",g),()=>{document.removeEventListener("keydown",g)}}},[n,e]),n?o.jsxs(Yl,{title:i||(r==="number"?"Number Pad":"Virtual Keyboard"),onClose:e,className:z.keyboardModal,overlayStyle:{zIndex:1300},children:[o.jsx("div",{className:z.inputDisplay,children:o.jsx("input",{type:r==="password"?"password":"text",value:l,className:z.tempInput,readOnly:!0,placeholder:"Type below..."})}),o.jsx("div",{className:z.keyboardGrid,children:u.map((g,p)=>o.jsx("div",{className:z.keyRow,children:g.map((_,A)=>o.jsx("button",{className:w(_),onClick:()=>y(_),"data-gamepad-focusable":"true","aria-label":_==="backspace"?"Backspace":_==="enter"?"Enter":_==="space"?"Space":_==="shift"?"Shift":_,children:I(_)},`${p}-${A}`))},p))})]}):null},us=m.createContext(),od=()=>{const n=m.useContext(us);if(!n)throw new Error("useVirtualKeyboardContext must be used within a VirtualKeyboardProvider");return n},ad=({children:n})=>{const e=Fl(),{isVisible:t,inputType:r,hideKeyboard:s,handleEnter:i,getCurrentInputValue:a}=e;return o.jsxs(us.Provider,{value:e,children:[n,t&&o.jsx(id,{isVisible:t,inputType:r,initialValue:a(),onClose:s,onEnter:i})]})},cd="_toast_1g2ii_1",ld="_slideOut_1g2ii_32",dd="_iconWrapper_1g2ii_47",ud="_icon_1g2ii_47",hd="_emojiIcon_1g2ii_62",fd="_content_1g2ii_76",pd="_title_1g2ii_83",md="_message_1g2ii_90",gd="_emojiMessage_1g2ii_98",yd="_playerName_1g2ii_105",bd="_reactionText_1g2ii_111",vd="_emojiReaction_1g2ii_117",wd="_closeButton_1g2ii_135",W={toast:cd,slideOut:ld,iconWrapper:dd,icon:ud,emojiIcon:hd,content:fd,title:pd,message:md,emojiMessage:gd,playerName:yd,reactionText:bd,emojiReaction:vd,closeButton:wd},_d=({title:n,message:e,emoji:t="ℹ",color:r="#3498db",duration:s=4e3,onClose:i,position:a})=>{const[c,l]=m.useState(!0);m.useEffect(()=>{if(s>0){const f=setTimeout(()=>{l(!1),setTimeout(i,300)},s);return()=>clearTimeout(f)}},[s,i]);const d=!n&&t!=="ℹ";return o.jsxs("div",{className:`${W.toast} ${d&&c?W.emojiReaction:""} ${c?"":W.slideOut}`,style:{top:"max(20px, var(--safe-area-inset-top))",zIndex:1e4+a,borderColor:r},children:[o.jsx("div",{className:W.iconWrapper,children:o.jsx("span",{className:`${W.icon} ${d?W.emojiIcon:""}`,style:{color:r,textShadow:d?`0 0 20px ${r}, 0 0 40px ${r}60`:`0 0 8px ${r}80`},children:t})}),o.jsxs("div",{className:W.content,children:[n&&o.jsx("div",{className:W.title,children:n}),o.jsx("div",{className:`${W.message} ${d?W.emojiMessage:""}`,children:d?o.jsxs(o.Fragment,{children:[o.jsx("span",{className:W.playerName,children:o.jsx(Hs,{username:e})}),o.jsx("span",{className:W.reactionText,children:"reacted!"})]}):e})]}),o.jsx("button",{className:W.closeButton,onClick:i,"aria-label":"Close notification",children:"×"})]})},Id=m.createContext(),Ed=({children:n})=>{const[e,t]=m.useState([]),[r,s]=m.useState([]),[i,a]=m.useState(0),{socket:c}=ft(),l=m.useCallback((p,_,A="ℹ",D="#3498db",v=4e3)=>{const T=Date.now()+Math.random(),x={id:T,title:p,message:_,emoji:A,color:D,duration:v},E=Date.now();return E-i>=600?(t(R=>[...R,x]),a(E)):s(R=>[...R,x]),T},[i]),d=m.useCallback(p=>{t(_=>_.filter(A=>A.id!==p))},[]),f=m.useCallback((p,_,A)=>l(p,_,"✓","#27ae60",A),[l]),h=m.useCallback((p,_,A)=>l(p,_,"✕","#e74c3c",A),[l]),u=m.useCallback((p,_,A)=>l(p,_,"⚠","#f39c12",A),[l]),y=m.useCallback((p,_,A)=>l(p,_,"ℹ","#3498db",A),[l]),I=m.useCallback((p,_,A)=>l(p,_,"🎮","#9b59b6",A),[l]),w=m.useCallback((p,_,A)=>l(p,_,"💰","#16a085",A),[l]);m.useEffect(()=>{if(r.length===0)return;const p=setTimeout(()=>{const _=r[0];s(A=>A.slice(1)),t(A=>[...A,_]),a(Date.now())},600);return()=>clearTimeout(p)},[r,e]),m.useEffect(()=>{if(!c)return;const p=_=>{l(_.title||"",_.message,_.emoji||"ℹ",_.color||"#3498db",_.duration)};return c.on("toast",p),()=>{c.off("toast",p)}},[c,l]);const g={addToast:l,removeToast:d,showSuccess:f,showError:h,showWarning:u,showInfo:y,showGameEvent:I,showMoneyEvent:w,toasts:e};return o.jsxs(Id.Provider,{value:g,children:[n,o.jsx("div",{className:"toast-container",style:{position:"fixed",top:0,right:0,zIndex:1e4},children:e.map((p,_)=>o.jsx(_d,{title:p.title,message:p.message,emoji:p.emoji,color:p.color,duration:p.duration,position:_,onClose:()=>d(p.id)},p.id))})]})};function Td(){return m.useEffect(()=>{Bt.initialize()},[]),o.jsx(Ed,{children:o.jsx(ad,{children:o.jsx(_s,{router:Ml})})})}const Qn={default:{"--bg-primary":"#1a2a3a","--bg-secondary":"#2c3e50","--bg-card":"#152534","--bg-card-dark":"#1c2a3a","--bg-panel-start":"#1e2a38","--bg-panel-end":"#2980b9","--bg-loading":"#1a1a2e","--text-primary":"#ecf0f1","--text-secondary":"#bdc3c7","--text-dark":"#2c3e50","--text-light":"#ecf0f1","--text-muted":"#7f8c8d","--text-white":"#ffffff","--text-gray":"#666666","--text-error":"#e74c3c","--text-success":"#2ecc71","--text-warning":"#f1c40f","--text-info":"#3498db","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#3498db","--info-dark":"#2980b9","--info-light":"#5dade2","--success":"#2ecc71","--success-dark":"#27ae60","--success-light":"#58d68d","--btn-primary-start":"#3498db","--btn-primary-end":"#27ae60","--btn-primary-hover-start":"#3fa9e5","--btn-primary-hover-end":"#2ecc71","--btn-secondary-start":"rgba(52, 73, 94, 0.9)","--btn-secondary-end":"rgba(44, 62, 80, 0.9)","--btn-secondary-hover-start":"rgba(52, 73, 94, 1)","--btn-secondary-hover-end":"rgba(44, 62, 80, 1)","--btn-tertiary-start":"#3498db","--btn-tertiary-end":"#2980b9","--btn-tertiary-hover-start":"#5faee3","--btn-tertiary-hover-end":"#3498db","--btn-tertiary-shadow":"rgba(52, 152, 219, 0.3)","--color-focus":"#00ff88","--color-focus-shadow":"rgba(0, 255, 136, 0.3)","--color-divider-start":"rgba(52, 152, 219, 0.2)","--color-divider-middle":"rgba(52, 152, 219, 0.8)","--color-divider-end":"rgba(52, 152, 219, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#3498db","--accent3":"#00ff88","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(10, 25, 47, 0.95)","--input-bg-hover":"rgba(15, 35, 60, 0.98)","--input-bg-focus":"rgba(20, 40, 70, 1)","--input-text-color":"#ecf0f1","--input-border-color":"rgba(51, 65, 85, 0.7)","--color-glass-dark":"rgba(0, 0, 0, 0.3)","--color-glass-light":"rgba(0, 0, 0, 0.1)"},light:{"--bg-primary":"#f8f9fa","--bg-secondary":"#e9ecef","--bg-card":"#ffffff","--bg-card-dark":"#f1f3f5","--bg-panel-start":"#dee2e6","--bg-panel-end":"#ced4da","--bg-loading":"#e9ecef","--text-primary":"#212529","--text-secondary":"#495057","--text-dark":"#212529","--text-light":"#212529","--text-muted":"#6c757d","--text-white":"#ffffff","--text-gray":"#6c757d","--text-error":"#dc3545","--text-success":"#28a745","--text-warning":"#ffc107","--text-info":"#17a2b8","--text-faded":"rgba(33, 37, 41, 0.6)","--text-subtle":"rgba(33, 37, 41, 0.75)","--text-bright":"rgba(33, 37, 41, 0.9)","--info":"#17a2b8","--info-dark":"#138496","--info-light":"#20c997","--color-glass-dark":"rgba(248, 249, 250, 1)","--color-glass-light":"rgba(233, 236, 239, 0.8)","--success":"#28a745","--success-dark":"#218838","--success-light":"#38c757","--btn-primary-start":"#007bff","--btn-primary-end":"#0056b3","--btn-primary-hover-start":"#0069d9","--btn-primary-hover-end":"#004085","--btn-secondary-start":"rgba(108, 117, 125, 0.2)","--btn-secondary-end":"rgba(73, 80, 87, 0.2)","--btn-secondary-hover-start":"rgba(108, 117, 125, 0.3)","--btn-secondary-hover-end":"rgba(73, 80, 87, 0.3)","--btn-tertiary-start":"#6c757d","--btn-tertiary-end":"#545b62","--btn-tertiary-hover-start":"#5a6268","--btn-tertiary-hover-end":"#454d55","--btn-tertiary-shadow":"rgba(108, 117, 125, 0.3)","--color-focus":"#007bff","--color-focus-shadow":"rgba(0, 123, 255, 0.25)","--color-border-light":"rgba(0, 0, 0, 0.175)","--color-border-lighter":"rgba(0, 0, 0, 0.125)","--color-divider-start":"rgba(0, 123, 255, 0.15)","--color-divider-middle":"rgba(0, 123, 255, 0.5)","--color-divider-end":"rgba(0, 123, 255, 0.15)","--accent":"#ffc107","--accent-dark":"#e0a800","--accent2":"#17a2b8","--accent3":"#28a745","--secondary":"#6c757d","--secondary-dark":"#545b62","--input-bg":"#ffffff","--input-bg-hover":"#f8f9fa","--input-bg-focus":"#ffffff","--input-text-color":"#212529","--input-border-color":"rgba(0, 0, 0, 0.15)"},dark:{"--bg-primary":"#0a0a0a","--bg-secondary":"#161616","--bg-card":"#1a1a1a","--bg-card-dark":"#222222","--bg-panel-start":"#1f1f1f","--bg-panel-end":"#2980b9","--bg-loading":"#0d0d0d","--text-primary":"#e8e8e8","--text-secondary":"#a8a8a8","--text-dark":"#ffffff","--text-light":"#e8e8e8","--text-muted":"#888888","--text-white":"#ffffff","--text-gray":"#999999","--text-error":"#ff6b6b","--text-success":"#51cf66","--text-warning":"#ffd43b","--text-info":"#4dabf7","--text-faded":"rgba(255, 255, 255, 0.45)","--text-subtle":"rgba(255, 255, 255, 0.6)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#2980b9","--info-dark":"#2471a3","--info-light":"#3498db","--success":"#27ae60","--success-dark":"#1e8449","--success-light":"#2ecc71","--btn-primary-start":"#2980b9","--btn-primary-end":"#f39c12","--btn-primary-hover-start":"#3498db","--btn-primary-hover-end":"#f1c40f","--btn-secondary-start":"rgba(33, 37, 41, 0.9)","--btn-secondary-end":"rgba(23, 25, 28, 0.9)","--btn-secondary-hover-start":"rgba(52, 58, 64, 1)","--btn-secondary-hover-end":"rgba(33, 37, 41, 1)","--btn-tertiary-start":"#2980b9","--btn-tertiary-end":"#1f618d","--btn-tertiary-hover-start":"#3498db","--btn-tertiary-hover-end":"#2980b9","--btn-tertiary-shadow":"rgba(41, 128, 185, 0.4)","--color-focus":"#00ccff","--color-focus-shadow":"rgba(0, 204, 255, 0.3)","--color-border-light":"rgba(255, 255, 255, 0.12)","--color-border-lighter":"rgba(255, 255, 255, 0.18)","--color-divider-start":"rgba(41, 128, 185, 0.2)","--color-divider-middle":"rgba(41, 128, 185, 0.8)","--color-divider-end":"rgba(41, 128, 185, 0.2)","--accent":"#f39c12","--accent-dark":"#d68910","--accent2":"#00ccff","--accent3":"#ff6b6b","--secondary":"#c0392b","--secondary-dark":"#a93226","--input-bg":"rgba(255, 255, 255, 0.08)","--input-bg-hover":"rgba(255, 255, 255, 0.1)","--input-bg-focus":"rgba(255, 255, 255, 0.12)","--input-text-color":"var(--text-primary)","--input-border-color":"var(--color-border-light)","--color-glass-dark":"rgba(41, 128, 185, 0.08)","--color-glass-light":"rgba(243, 156, 18, 0.08)"},packers:{"--bg-primary":"#0A1713","--bg-secondary":"#154734","--bg-card":"#0D1F1A","--bg-card-dark":"#122A1F","--bg-panel-start":"#154734","--bg-panel-end":"#203731","--bg-loading":"#061109","--text-primary":"#FFFFFF","--text-secondary":"#FFB612","--text-dark":"#FFB612","--text-light":"#FFFFFF","--text-muted":"#C9B896","--text-white":"#FFFFFF","--text-gray":"#B5A482","--text-error":"#FF6B6B","--text-success":"#FFB612","--text-warning":"#FFC42E","--text-info":"#FFB612","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#FFB612","--info-dark":"#FFA300","--info-light":"#FFC42E","--success":"#203731","--success-dark":"#154734","--success-light":"#2F5645","--btn-primary-start":"#203731","--btn-primary-end":"#154734","--btn-primary-hover-start":"#2F5645","--btn-primary-hover-end":"#203731","--btn-secondary-start":"#FFB612","--btn-secondary-end":"#FFA300","--btn-secondary-hover-start":"#FFC42E","--btn-secondary-hover-end":"#FFB612","--btn-tertiary-start":"#FFB612","--btn-tertiary-end":"#FFA300","--btn-tertiary-hover-start":"#FFC42E","--btn-tertiary-hover-end":"#FFB612","--btn-tertiary-shadow":"rgba(255, 182, 18, 0.3)","--color-focus":"#FFB612","--color-focus-shadow":"rgba(255, 182, 18, 0.3)","--color-divider-start":"rgba(32, 55, 49, 0.2)","--color-divider-middle":"rgba(255, 182, 18, 0.8)","--color-divider-end":"rgba(32, 55, 49, 0.2)","--accent":"#FFB612","--accent-dark":"#FFA300","--accent2":"#C9B896","--accent3":"#FFFFFF","--secondary":"#C9B896","--secondary-dark":"#B5A482","--input-bg":"rgba(21, 71, 52, 0.3)","--input-bg-hover":"rgba(21, 71, 52, 0.4)","--input-bg-focus":"rgba(21, 71, 52, 0.5)","--input-text-color":"#FFFFFF","--input-placeholder-color":"rgba(255, 255, 255, 0.5)","--input-border-color":"rgba(255, 182, 18, 0.4)","--input-border-hover":"rgba(255, 182, 18, 0.6)","--input-border-focus":"#FFB612","--input-border-width":"2px","--input-padding":"12px 16px","--input-font-size":"16px","--input-line-height":"1.5","--input-shadow-focus":"0 0 0 3px rgba(255, 182, 18, 0.25)","--color-glass-dark":"rgba(32, 55, 49, 0.08)","--color-glass-light":"rgba(255, 182, 18, 0.05)"},sunset:{"--bg-primary":"#0c1929","--bg-secondary":"#162544","--bg-card":"#0a1520","--bg-card-dark":"#111f35","--bg-panel-start":"#162544","--bg-panel-end":"#ff6b6b","--bg-loading":"#060d17","--text-primary":"#ffd6a5","--text-secondary":"#ffb088","--text-dark":"#8b5a3c","--text-light":"#ffd6a5","--text-muted":"#daa49a","--text-white":"#fff5f0","--text-gray":"#c9a882","--text-error":"#ff6b6b","--text-success":"#ff9a76","--text-warning":"#ffc93c","--text-info":"#ff8e71","--text-faded":"rgba(255, 214, 165, 0.6)","--text-subtle":"rgba(255, 214, 165, 0.7)","--text-bright":"rgba(255, 214, 165, 0.9)","--info":"#ff8e71","--info-dark":"#ff7657","--info-light":"#ffa589","--success":"#ff9a76","--success-dark":"#ff8561","--success-light":"#ffb088","--btn-primary-start":"#c44569","--btn-primary-end":"#f8961e","--btn-primary-hover-start":"#d65577","--btn-primary-hover-end":"#f9a73e","--btn-secondary-start":"rgba(22, 37, 68, 0.9)","--btn-secondary-end":"rgba(12, 25, 41, 0.9)","--btn-secondary-hover-start":"rgba(28, 46, 78, 1)","--btn-secondary-hover-end":"rgba(22, 37, 68, 1)","--btn-tertiary-start":"#ff6b6b","--btn-tertiary-end":"#ee5a52","--btn-tertiary-hover-start":"#ff8080","--btn-tertiary-hover-end":"#ff6b6b","--btn-tertiary-shadow":"rgba(255, 107, 107, 0.3)","--color-focus":"#ff8e71","--color-focus-shadow":"rgba(255, 142, 113, 0.3)","--color-divider-start":"rgba(196, 69, 105, 0.2)","--color-divider-middle":"rgba(248, 150, 30, 0.8)","--color-divider-end":"rgba(196, 69, 105, 0.2)","--accent":"#f8961e","--accent-dark":"#f37121","--accent2":"#ff6b6b","--accent3":"#c44569","--secondary":"#ff6b6b","--secondary-dark":"#ee5a52","--input-bg":"rgba(12, 25, 41, 0.95)","--input-bg-hover":"rgba(18, 35, 51, 0.98)","--input-bg-focus":"rgba(22, 37, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(255, 142, 113, 0.3)","--color-glass-dark":"rgba(196, 69, 105, 0.08)","--color-glass-light":"rgba(248, 150, 30, 0.05)"},"miami-vice":{"--bg-primary":"#1a0f2e","--bg-secondary":"#2d1844","--bg-card":"#160d28","--bg-card-dark":"#231432","--bg-panel-start":"#2d1844","--bg-panel-end":"#ff6b9d","--bg-loading":"#0f0820","--text-primary":"#ffeaa7","--text-secondary":"#fab1a0","--text-dark":"#74526c","--text-light":"#ffeaa7","--text-muted":"#dfe6e9","--text-white":"#fff5f0","--text-gray":"#b2bec3","--text-error":"#ff7675","--text-success":"#fdcb6e","--text-warning":"#ffeb3b","--text-info":"#00d2d3","--text-faded":"rgba(255, 234, 167, 0.6)","--text-subtle":"rgba(255, 234, 167, 0.7)","--text-bright":"rgba(255, 234, 167, 0.9)","--info":"#00d2d3","--info-dark":"#00b8b8","--info-light":"#01e5e5","--success":"#fdcb6e","--success-dark":"#f9b747","--success-light":"#ffeaa7","--btn-primary-start":"#ff6b9d","--btn-primary-end":"#00d2d3","--btn-primary-hover-start":"#ee5a6f","--btn-primary-hover-end":"#01e5e5","--btn-secondary-start":"rgba(45, 24, 68, 0.9)","--btn-secondary-end":"rgba(26, 15, 46, 0.9)","--btn-secondary-hover-start":"rgba(55, 34, 78, 1)","--btn-secondary-hover-end":"rgba(45, 24, 68, 1)","--btn-tertiary-start":"#00d2d3","--btn-tertiary-end":"#00b8b8","--btn-tertiary-hover-start":"#01e5e5","--btn-tertiary-hover-end":"#00d2d3","--btn-tertiary-shadow":"rgba(0, 210, 211, 0.3)","--color-focus":"#00d2d3","--color-focus-shadow":"rgba(0, 210, 211, 0.3)","--color-divider-start":"rgba(255, 107, 157, 0.2)","--color-divider-middle":"rgba(0, 210, 211, 0.8)","--color-divider-end":"rgba(255, 107, 157, 0.2)","--accent":"#feca57","--accent-dark":"#f9b747","--accent2":"#00d2d3","--accent3":"#ff6b9d","--secondary":"#ff7979","--secondary-dark":"#ff6348","--input-bg":"rgba(26, 15, 46, 0.95)","--input-bg-hover":"rgba(35, 20, 56, 0.98)","--input-bg-focus":"rgba(45, 24, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(0, 210, 211, 0.3)","--color-glass-dark":"rgba(255, 107, 157, 0.08)","--color-glass-light":"rgba(0, 210, 211, 0.05)"},purple:{"--bg-primary":"#1a1a2e","--bg-secondary":"#2d2d44","--bg-card":"#16132d","--bg-card-dark":"#1f1b3a","--bg-panel-start":"#1a1a2e","--bg-panel-end":"#8e44ad","--bg-loading":"#0f0f1a","--text-primary":"#f3e5f5","--text-secondary":"#ce93d8","--text-dark":"#4a148c","--text-light":"#f3e5f5","--text-muted":"#ba68c8","--text-white":"#ffffff","--text-gray":"#9c27b0","--text-error":"#f44336","--text-success":"#ab47bc","--text-warning":"#ffc107","--text-info":"#ba68c8","--text-faded":"rgba(243, 229, 245, 0.6)","--text-subtle":"rgba(243, 229, 245, 0.7)","--text-bright":"rgba(243, 229, 245, 0.9)","--info":"#8e44ad","--info-dark":"#7d3c98","--info-light":"#a569bd","--success":"#a569bd","--success-dark":"#8e44ad","--success-light":"#bb8fce","--btn-primary-start":"#8e44ad","--btn-primary-end":"#f1c40f","--btn-primary-hover-start":"#a569bd","--btn-primary-hover-end":"#f39c12","--btn-secondary-start":"rgba(45, 45, 68, 0.9)","--btn-secondary-end":"rgba(26, 26, 46, 0.9)","--btn-secondary-hover-start":"rgba(58, 58, 88, 1)","--btn-secondary-hover-end":"rgba(45, 45, 68, 1)","--btn-tertiary-start":"#8e44ad","--btn-tertiary-end":"#6c3483","--btn-tertiary-hover-start":"#a569bd","--btn-tertiary-hover-end":"#8e44ad","--btn-tertiary-shadow":"rgba(142, 68, 173, 0.3)","--color-focus":"#cc99ff","--color-focus-shadow":"rgba(204, 153, 255, 0.3)","--color-divider-start":"rgba(142, 68, 173, 0.2)","--color-divider-middle":"rgba(142, 68, 173, 0.8)","--color-divider-end":"rgba(142, 68, 173, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#ab47bc","--accent3":"#ba68c8","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(26, 26, 46, 0.95)","--input-bg-hover":"rgba(35, 35, 55, 0.98)","--input-bg-focus":"rgba(45, 45, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(142, 68, 173, 0.3)","--color-glass-dark":"rgba(142, 68, 173, 0.08)","--color-glass-light":"rgba(241, 196, 15, 0.08)"}},hs=n=>{const e=Qn[n]||Qn.default,t=document.documentElement;Object.entries(e).forEach(([r,s])=>{t.style.setProperty(r,s)})},Ad=()=>{const n=localStorage.getItem("selectedTheme")||"default";hs(n)},uu=()=>localStorage.getItem("selectedTheme")||"default",hu=n=>{localStorage.setItem("selectedTheme",n),hs(n)},fs=m.createContext(null),ps=n=>{if(!n)return null;const e="https://api.in-between.live";if(n.startsWith("http"))return n;if(n.startsWith("/files/"))return`${e}${n}`;if(n.includes("/uploads/")){const t=n.split("/"),r=t.pop(),s=t[t.length-1];return`${e}/files/${s}/${r}`}else return`${e}${n}`},Zn=n=>n?{...n,profileImg:ps(n.profileImg)}:{},Sd=({children:n})=>{const[e,t]=m.useState({profileImg:null,autoAnte:!1,muted:!1,selectedTitle:null}),[r,s]=m.useState(!0),{user:i,token:a}=St(),c=nr.useCallback(async()=>{if(!i){t({autoAnte:!1}),s(!1);return}try{s(!0);const y="https://api.in-between.live";if(!a){console.error("[Preferences] No token available"),s(!1);return}const I=await fetch(`${y}/preferences`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}});if(!I.ok)throw new Error("Failed to load preferences");const w=await I.json(),p=Zn(w)||{autoAnte:!1,muted:!1};t(p),typeof p.muted<"u"&&Bt.setMuted(p.muted)}catch(y){console.error("[Preferences] Error loading preferences:",y),t({autoAnte:!1})}finally{s(!1)}},[i,a]);m.useEffect(()=>{i&&c()},[i,c]);const l=async(y,I)=>{if(!i)return console.error("[Preferences] Cannot update preferences: User not logged in"),!1;try{const w="https://api.in-between.live";if(!a)return console.error("[Preferences] No token available"),!1;t(A=>({...A,[y]:I})),y==="muted"&&Bt.setMuted(I);const g=await fetch(`${w}/preferences/${y}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({value:I})});if(!g.ok)throw new Error(`Failed to update ${y} preference`);const p=await g.json(),_=Zn(p);return t(_),!0}catch(w){return console.error(`[Preferences] Error updating ${y}:`,w),await c(),!1}},d=async()=>{const y=!e.autoAnte;return await l("autoAnte",y)},f=async()=>{const y=!e.muted;return await l("muted",y)},h=async y=>await l("selectedTitle",y),u=async y=>{if(!y)return console.error("[Preferences] No file provided for profile image upload"),!1;try{const I=new FormData;I.append("file",y);const w="https://api.in-between.live";if(!a)return console.error("[Preferences] No token available"),!1;const g=await fetch(`${w}/preferences/profileImg`,{method:"POST",headers:{Authorization:`Bearer ${a}`},body:I}),p=await g.text();if(!g.ok)throw new Error(`Failed to upload profile image: ${p}`);const _=p?JSON.parse(p):{},A=ps(_.fileUrl);return t(D=>({...D,profileImg:A})),!0}catch(I){return console.error("[Preferences] Error uploading profile image:",I),!1}};return o.jsx(fs.Provider,{value:{preferences:e,updatePreference:l,toggleAutoAnte:d,toggleMute:f,updateSelectedTitle:h,uploadProfileImg:u,loading:r},children:n})},fu=()=>{const n=m.useContext(fs);if(!n)throw new Error("usePreferences must be used within a PreferencesProvider");return n},ms=m.createContext(null),xd=({children:n})=>{const{socket:e}=ft(),{token:t}=St(),[r,s]=m.useState(new Map),i=m.useRef(new Set),a=m.useRef(null);m.useEffect(()=>{if(!e)return;const u=({userId:y,data:I})=>{console.log("[UserDataContext] Received user data update:",y,I),s(w=>{const g=new Map(w);return g.set(y,I),g})};return e.on("userDataUpdated",u),()=>{e.off("userDataUpdated",u)}},[e]),m.useEffect(()=>()=>{a.current&&clearTimeout(a.current)},[]);const c=m.useCallback(async u=>{if(!u||u.length===0||!t)return{};try{const y=await fetch(`${rr}/users`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({userIds:u})});if(!y.ok)throw new Error("Failed to fetch users data");const I=await y.json();return s(w=>{const g=new Map(w);return Object.entries(I).forEach(([p,_])=>{g.set(p,_)}),g}),I}catch{return{}}},[t]),l=m.useCallback(()=>{if(i.current.size===0)return;const u=Array.from(i.current);i.current.clear(),c(u)},[c]),d=m.useCallback(u=>{if(!u)return null;const y=r.get(u);return y||(i.current.add(u),a.current&&clearTimeout(a.current),a.current=setTimeout(()=>{l()},10),null)},[r,l]),f=m.useCallback(u=>{const y=u.filter(I=>!r.has(I));y.length>0&&c(y)},[r,c]),h={getUserData:d,prefetchUsers:f};return o.jsx(ms.Provider,{value:h,children:n})},pu=n=>{const e=m.useContext(ms);if(!e)throw new Error("useUserData must be used within UserDataProvider");return e.getUserData(n)},kd="__capgo_keep_url_path_after_reload",Ft="__capgo_history_stack__",er=100,Pd=typeof window<"u"&&typeof document<"u"&&typeof history<"u";if(Pd){const n=window;if(!n.__capgoHistoryPatched){n.__capgoHistoryPatched=!0;const e=()=>{try{if(n.__capgoKeepUrlPathAfterReload)return!0}catch{}try{return window.localStorage.getItem(kd)==="1"}catch{return!1}},t=()=>{try{const v=window.sessionStorage.getItem(Ft);if(!v)return{stack:[],index:-1};const T=JSON.parse(v);return!T||!Array.isArray(T.stack)||typeof T.index!="number"?{stack:[],index:-1}:T}catch{return{stack:[],index:-1}}},r=(v,T)=>{try{window.sessionStorage.setItem(Ft,JSON.stringify({stack:v,index:T}))}catch{}},s=()=>{try{window.sessionStorage.removeItem(Ft)}catch{}},i=v=>{try{const T=v??window.location.href,x=new URL(T instanceof URL?T.toString():T,window.location.href);return`${x.pathname}${x.search}${x.hash}`}catch{return null}},a=(v,T)=>{if(v.length<=er)return{stack:v,index:T};const x=v.length-er,E=v.slice(x),S=Math.max(0,T-x);return{stack:E,index:S}},c=v=>{document.readyState==="complete"||document.readyState==="interactive"?v():window.addEventListener("DOMContentLoaded",v,{once:!0})};let l=!1,d=!1,f=!1;const h=()=>{if(!l)return;const v=t(),T=i();if(T){if(v.stack.length===0){v.stack.push(T),v.index=0,r(v.stack,v.index);return}(v.index<0||v.index>=v.stack.length)&&(v.index=v.stack.length-1),v.stack[v.index]!==T&&(v.stack[v.index]=T,r(v.stack,v.index))}},u=(v,T)=>{if(!l||d)return;const x=i(v);if(!x)return;let{stack:E,index:S}=t();E.length===0?(E.push(x),S=E.length-1):T?((S<0||S>=E.length)&&(S=E.length-1),E[S]=x):S>=E.length-1?(E.push(x),S=E.length-1):(E=E.slice(0,S+1),E.push(x),S=E.length-1),{stack:E,index:S}=a(E,S),r(E,S)},y=()=>{if(!l||d)return;const v=t();if(v.stack.length===0){h();return}const T=v.index>=0&&v.index<v.stack.length?v.index:v.stack.length-1,x=i();if(v.stack.length===1&&x===v.stack[0])return;const E=v.stack[0];if(!E)return;d=!0;try{history.replaceState(history.state,document.title,E);for(let B=1;B<v.stack.length;B+=1)history.pushState(history.state,document.title,v.stack[B])}catch{d=!1;return}d=!1;const S=v.stack.length-1,R=T-S;R!==0?history.go(R):(history.replaceState(history.state,document.title,v.stack[T]),window.dispatchEvent(new PopStateEvent("popstate")))},I=()=>{!l||f||(f=!0,c(()=>{f=!1,y()}))};let w=null,g=null;const p=()=>{if(!l||d)return;const v=i();if(!v)return;const T=t(),x=T.stack.lastIndexOf(v);x>=0?T.index=x:(T.stack.push(v),T.index=T.stack.length-1);const E=a(T.stack,T.index);r(E.stack,E.index)},_=()=>{w&&g||(w=history.pushState,g=history.replaceState,history.pushState=function(T,x,E){const S=w.call(history,T,x,E);return u(E,!1),S},history.replaceState=function(T,x,E){const S=g.call(history,T,x,E);return u(E,!0),S},window.addEventListener("popstate",p))},A=()=>{w&&(history.pushState=w,w=null),g&&(history.replaceState=g,g=null),window.removeEventListener("popstate",p)},D=v=>{if(l===v){l&&(h(),I());return}l=v,l?(_(),h(),I()):(A(),s())};window.addEventListener("CapacitorUpdaterKeepUrlPathAfterReload",v=>{var T;const x=v,E=(T=x?.detail)===null||T===void 0?void 0:T.enabled;typeof E=="boolean"?(n.__capgoKeepUrlPathAfterReload=E,D(E)):(n.__capgoKeepUrlPathAfterReload=!0,D(!0))}),D(e())}}const Cd=At("CapacitorUpdater",{web:()=>Ae(()=>import("./web-B-m2cFBG.js"),__vite__mapDeps([18,1,2,3]),import.meta.url).then(n=>new n.CapacitorUpdaterWeb)});Ad();window.Capacitor?.isNativePlatform()&&(Cd.notifyAppReady(),window.Capacitor?.getPlatform()==="android"&&(document.documentElement.style.setProperty("--safe-area-inset-top","48px"),document.documentElement.style.setProperty("--safe-area-inset-bottom","0px"),console.log("✅ Android safe area insets set: top=48px")));ks.createRoot(document.getElementById("root")).render(o.jsx(nr.StrictMode,{children:o.jsx(Sl,{children:o.jsx(Fs,{children:o.jsx(xd,{children:o.jsx(Sd,{children:o.jsx(Td,{})})})})})}));export{_e as $,ba as A,Kd as B,au as C,iu as D,fe as E,te as F,re as G,cu as H,ou as I,Ba as J,X as K,Qd as L,Pn as M,fc as N,st as O,Yn as P,Jr as Q,nu as R,tc as S,se as T,o as U,od as V,cs as W,rr as X,Ut as Y,pe as Z,Ae as _,Bd as a,St as a0,Ld as a1,At as a2,Cd as a3,ft as a4,pu as a5,Yl as a6,du as a7,Bt as a8,$s as a9,Hs as aa,fu as ab,me as ac,uu as ad,hu as ae,ir as af,ms as ag,Re as ah,vt as ai,yt as aj,He as ak,Me as al,Ja as am,al as an,Vo as ao,ga as ap,Xa as aq,Ya as ar,Ro as as,rn as at,Qa as au,Fd as b,Wd as c,tu as d,lu as e,zd as f,pl as g,ne as h,Hd as i,eu as j,Md as k,su as l,Vd as m,Kn as n,Zd as o,Nd as p,Ud as q,zo as r,qd as s,$d as t,Gd as u,ru as v,Dd as w,Jd as x,Xd as y,Yd as z};
