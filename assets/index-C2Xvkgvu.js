const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./web-D0zBYph8.js","./vendor-CT7sGowS.js","./socket-CA1CrNgP.js","./audio-hxunv4lQ.js","./LoginPage-C5tzvNt2.js","./useGamepadNavigation-DKu7SyYo.js","./openInBrowser-B-P-Hwq0.js","./AppHeader-CxjrnIBg.js","./LoginPage-D-klECcc.css","./TempMigratePage-D2jjsl3u.js","./TempMigratePage-DbcdDhMr.css","./Lobby-Do3RkUex.js","./useAdInterstitial-LH5w6QQm.js","./useAdInterstitial-Dda1dfGz.css","./Lobby-DE9wGkk_.css","./GameRoom-BSyUNrmm.js","./GameRoom-DxZefuTJ.css","./web-BNB4aX6O.js"])))=>i.map(i=>d[i]);
import{r as gi,a as mi,g as yi,b as p,R as Qn,d as vi,N as Zn,e as bi}from"./vendor-CT7sGowS.js";import{l as wi}from"./socket-CA1CrNgP.js";import{r as _i}from"./audio-hxunv4lQ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var At={exports:{}},xe={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var on;function Ii(){if(on)return xe;on=1;var n=gi(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function a(c,l,d){var f,h={},u=null,m=null;d!==void 0&&(u=""+d),l.key!==void 0&&(u=""+l.key),l.ref!==void 0&&(m=l.ref);for(f in l)r.call(l,f)&&!s.hasOwnProperty(f)&&(h[f]=l[f]);if(c&&c.defaultProps)for(f in l=c.defaultProps,l)h[f]===void 0&&(h[f]=l[f]);return{$$typeof:e,type:c,key:u,ref:m,props:h,_owner:i.current}}return xe.Fragment=t,xe.jsx=a,xe.jsxs=a,xe}var an;function Ei(){return an||(an=1,At.exports=Ii()),At.exports}var o=Ei(),Xe={},cn;function Ti(){if(cn)return Xe;cn=1;var n=mi();return Xe.createRoot=n.createRoot,Xe.hydrateRoot=n.hydrateRoot,Xe}var Ai=Ti();const Si=yi(Ai),ln={default:{"--bg-primary":"#1a2a3a","--bg-secondary":"#2c3e50","--bg-card":"#152534","--bg-card-dark":"#1c2a3a","--bg-panel-start":"#1e2a38","--bg-panel-end":"#2980b9","--bg-loading":"#1a1a2e","--text-primary":"#ecf0f1","--text-secondary":"#bdc3c7","--text-dark":"#2c3e50","--text-light":"#ecf0f1","--text-muted":"#7f8c8d","--text-white":"#ffffff","--text-gray":"#666666","--text-error":"#e74c3c","--text-success":"#2ecc71","--text-warning":"#f1c40f","--text-info":"#3498db","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#3498db","--info-dark":"#2980b9","--info-light":"#5dade2","--success":"#2ecc71","--success-dark":"#27ae60","--success-light":"#58d68d","--btn-primary-start":"#3498db","--btn-primary-end":"#27ae60","--btn-primary-hover-start":"#3fa9e5","--btn-primary-hover-end":"#2ecc71","--btn-secondary-start":"rgba(52, 73, 94, 0.9)","--btn-secondary-end":"rgba(44, 62, 80, 0.9)","--btn-secondary-hover-start":"rgba(52, 73, 94, 1)","--btn-secondary-hover-end":"rgba(44, 62, 80, 1)","--btn-tertiary-start":"#3498db","--btn-tertiary-end":"#2980b9","--btn-tertiary-hover-start":"#5faee3","--btn-tertiary-hover-end":"#3498db","--btn-tertiary-shadow":"rgba(52, 152, 219, 0.3)","--color-focus":"#00ff88","--color-focus-shadow":"rgba(0, 255, 136, 0.3)","--color-divider-start":"rgba(52, 152, 219, 0.2)","--color-divider-middle":"rgba(52, 152, 219, 0.8)","--color-divider-end":"rgba(52, 152, 219, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#3498db","--accent3":"#00ff88","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(10, 25, 47, 0.95)","--input-bg-hover":"rgba(15, 35, 60, 0.98)","--input-bg-focus":"rgba(20, 40, 70, 1)","--input-text-color":"#ecf0f1","--input-border-color":"rgba(51, 65, 85, 0.7)","--color-glass-dark":"rgba(0, 0, 0, 0.3)","--color-glass-light":"rgba(0, 0, 0, 0.1)"},light:{"--bg-primary":"#f8f9fa","--bg-secondary":"#e9ecef","--bg-card":"#ffffff","--bg-card-dark":"#f1f3f5","--bg-panel-start":"#dee2e6","--bg-panel-end":"#ced4da","--bg-loading":"#e9ecef","--text-primary":"#212529","--text-secondary":"#495057","--text-dark":"#212529","--text-light":"#212529","--text-muted":"#6c757d","--text-white":"#ffffff","--text-gray":"#6c757d","--text-error":"#dc3545","--text-success":"#28a745","--text-warning":"#ffc107","--text-info":"#17a2b8","--text-faded":"rgba(33, 37, 41, 0.6)","--text-subtle":"rgba(33, 37, 41, 0.75)","--text-bright":"rgba(33, 37, 41, 0.9)","--info":"#17a2b8","--info-dark":"#138496","--info-light":"#20c997","--color-glass-dark":"rgba(248, 249, 250, 1)","--color-glass-light":"rgba(233, 236, 239, 0.8)","--success":"#28a745","--success-dark":"#218838","--success-light":"#38c757","--btn-primary-start":"#007bff","--btn-primary-end":"#0056b3","--btn-primary-hover-start":"#0069d9","--btn-primary-hover-end":"#004085","--btn-secondary-start":"rgba(108, 117, 125, 0.2)","--btn-secondary-end":"rgba(73, 80, 87, 0.2)","--btn-secondary-hover-start":"rgba(108, 117, 125, 0.3)","--btn-secondary-hover-end":"rgba(73, 80, 87, 0.3)","--btn-tertiary-start":"#6c757d","--btn-tertiary-end":"#545b62","--btn-tertiary-hover-start":"#5a6268","--btn-tertiary-hover-end":"#454d55","--btn-tertiary-shadow":"rgba(108, 117, 125, 0.3)","--color-focus":"#007bff","--color-focus-shadow":"rgba(0, 123, 255, 0.25)","--color-border-light":"rgba(0, 0, 0, 0.175)","--color-border-lighter":"rgba(0, 0, 0, 0.125)","--color-divider-start":"rgba(0, 123, 255, 0.15)","--color-divider-middle":"rgba(0, 123, 255, 0.5)","--color-divider-end":"rgba(0, 123, 255, 0.15)","--accent":"#ffc107","--accent-dark":"#e0a800","--accent2":"#17a2b8","--accent3":"#28a745","--secondary":"#6c757d","--secondary-dark":"#545b62","--input-bg":"#ffffff","--input-bg-hover":"#f8f9fa","--input-bg-focus":"#ffffff","--input-text-color":"#212529","--input-border-color":"rgba(0, 0, 0, 0.15)"},dark:{"--bg-primary":"#0a0a0a","--bg-secondary":"#161616","--bg-card":"#1a1a1a","--bg-card-dark":"#222222","--bg-panel-start":"#1f1f1f","--bg-panel-end":"#2980b9","--bg-loading":"#0d0d0d","--text-primary":"#e8e8e8","--text-secondary":"#a8a8a8","--text-dark":"#ffffff","--text-light":"#e8e8e8","--text-muted":"#888888","--text-white":"#ffffff","--text-gray":"#999999","--text-error":"#ff6b6b","--text-success":"#51cf66","--text-warning":"#ffd43b","--text-info":"#4dabf7","--text-faded":"rgba(255, 255, 255, 0.45)","--text-subtle":"rgba(255, 255, 255, 0.6)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#2980b9","--info-dark":"#2471a3","--info-light":"#3498db","--success":"#27ae60","--success-dark":"#1e8449","--success-light":"#2ecc71","--btn-primary-start":"#2980b9","--btn-primary-end":"#f39c12","--btn-primary-hover-start":"#3498db","--btn-primary-hover-end":"#f1c40f","--btn-secondary-start":"rgba(33, 37, 41, 0.9)","--btn-secondary-end":"rgba(23, 25, 28, 0.9)","--btn-secondary-hover-start":"rgba(52, 58, 64, 1)","--btn-secondary-hover-end":"rgba(33, 37, 41, 1)","--btn-tertiary-start":"#2980b9","--btn-tertiary-end":"#1f618d","--btn-tertiary-hover-start":"#3498db","--btn-tertiary-hover-end":"#2980b9","--btn-tertiary-shadow":"rgba(41, 128, 185, 0.4)","--color-focus":"#00ccff","--color-focus-shadow":"rgba(0, 204, 255, 0.3)","--color-border-light":"rgba(255, 255, 255, 0.12)","--color-border-lighter":"rgba(255, 255, 255, 0.18)","--color-divider-start":"rgba(41, 128, 185, 0.2)","--color-divider-middle":"rgba(41, 128, 185, 0.8)","--color-divider-end":"rgba(41, 128, 185, 0.2)","--accent":"#f39c12","--accent-dark":"#d68910","--accent2":"#00ccff","--accent3":"#ff6b6b","--secondary":"#c0392b","--secondary-dark":"#a93226","--input-bg":"rgba(255, 255, 255, 0.08)","--input-bg-hover":"rgba(255, 255, 255, 0.1)","--input-bg-focus":"rgba(255, 255, 255, 0.12)","--input-text-color":"var(--text-primary)","--input-border-color":"var(--color-border-light)","--color-glass-dark":"rgba(41, 128, 185, 0.08)","--color-glass-light":"rgba(243, 156, 18, 0.08)"},packers:{"--bg-primary":"#0A1713","--bg-secondary":"#154734","--bg-card":"#0D1F1A","--bg-card-dark":"#122A1F","--bg-panel-start":"#154734","--bg-panel-end":"#203731","--bg-loading":"#061109","--text-primary":"#FFFFFF","--text-secondary":"#FFB612","--text-dark":"#FFB612","--text-light":"#FFFFFF","--text-muted":"#C9B896","--text-white":"#FFFFFF","--text-gray":"#B5A482","--text-error":"#FF6B6B","--text-success":"#FFB612","--text-warning":"#FFC42E","--text-info":"#FFB612","--text-faded":"rgba(255, 255, 255, 0.6)","--text-subtle":"rgba(255, 255, 255, 0.7)","--text-bright":"rgba(255, 255, 255, 0.9)","--info":"#FFB612","--info-dark":"#FFA300","--info-light":"#FFC42E","--success":"#203731","--success-dark":"#154734","--success-light":"#2F5645","--btn-primary-start":"#203731","--btn-primary-end":"#154734","--btn-primary-hover-start":"#2F5645","--btn-primary-hover-end":"#203731","--btn-secondary-start":"#FFB612","--btn-secondary-end":"#FFA300","--btn-secondary-hover-start":"#FFC42E","--btn-secondary-hover-end":"#FFB612","--btn-tertiary-start":"#FFB612","--btn-tertiary-end":"#FFA300","--btn-tertiary-hover-start":"#FFC42E","--btn-tertiary-hover-end":"#FFB612","--btn-tertiary-shadow":"rgba(255, 182, 18, 0.3)","--color-focus":"#FFB612","--color-focus-shadow":"rgba(255, 182, 18, 0.3)","--color-divider-start":"rgba(32, 55, 49, 0.2)","--color-divider-middle":"rgba(255, 182, 18, 0.8)","--color-divider-end":"rgba(32, 55, 49, 0.2)","--accent":"#FFB612","--accent-dark":"#FFA300","--accent2":"#C9B896","--accent3":"#FFFFFF","--secondary":"#C9B896","--secondary-dark":"#B5A482","--input-bg":"rgba(21, 71, 52, 0.3)","--input-bg-hover":"rgba(21, 71, 52, 0.4)","--input-bg-focus":"rgba(21, 71, 52, 0.5)","--input-text-color":"#FFFFFF","--input-placeholder-color":"rgba(255, 255, 255, 0.5)","--input-border-color":"rgba(255, 182, 18, 0.4)","--input-border-hover":"rgba(255, 182, 18, 0.6)","--input-border-focus":"#FFB612","--input-border-width":"2px","--input-padding":"12px 16px","--input-font-size":"16px","--input-line-height":"1.5","--input-shadow-focus":"0 0 0 3px rgba(255, 182, 18, 0.25)","--color-glass-dark":"rgba(32, 55, 49, 0.08)","--color-glass-light":"rgba(255, 182, 18, 0.05)"},sunset:{"--bg-primary":"#0c1929","--bg-secondary":"#162544","--bg-card":"#0a1520","--bg-card-dark":"#111f35","--bg-panel-start":"#162544","--bg-panel-end":"#ff6b6b","--bg-loading":"#060d17","--text-primary":"#ffd6a5","--text-secondary":"#ffb088","--text-dark":"#8b5a3c","--text-light":"#ffd6a5","--text-muted":"#daa49a","--text-white":"#fff5f0","--text-gray":"#c9a882","--text-error":"#ff6b6b","--text-success":"#ff9a76","--text-warning":"#ffc93c","--text-info":"#ff8e71","--text-faded":"rgba(255, 214, 165, 0.6)","--text-subtle":"rgba(255, 214, 165, 0.7)","--text-bright":"rgba(255, 214, 165, 0.9)","--info":"#ff8e71","--info-dark":"#ff7657","--info-light":"#ffa589","--success":"#ff9a76","--success-dark":"#ff8561","--success-light":"#ffb088","--btn-primary-start":"#c44569","--btn-primary-end":"#f8961e","--btn-primary-hover-start":"#d65577","--btn-primary-hover-end":"#f9a73e","--btn-secondary-start":"rgba(22, 37, 68, 0.9)","--btn-secondary-end":"rgba(12, 25, 41, 0.9)","--btn-secondary-hover-start":"rgba(28, 46, 78, 1)","--btn-secondary-hover-end":"rgba(22, 37, 68, 1)","--btn-tertiary-start":"#ff6b6b","--btn-tertiary-end":"#ee5a52","--btn-tertiary-hover-start":"#ff8080","--btn-tertiary-hover-end":"#ff6b6b","--btn-tertiary-shadow":"rgba(255, 107, 107, 0.3)","--color-focus":"#ff8e71","--color-focus-shadow":"rgba(255, 142, 113, 0.3)","--color-divider-start":"rgba(196, 69, 105, 0.2)","--color-divider-middle":"rgba(248, 150, 30, 0.8)","--color-divider-end":"rgba(196, 69, 105, 0.2)","--accent":"#f8961e","--accent-dark":"#f37121","--accent2":"#ff6b6b","--accent3":"#c44569","--secondary":"#ff6b6b","--secondary-dark":"#ee5a52","--input-bg":"rgba(12, 25, 41, 0.95)","--input-bg-hover":"rgba(18, 35, 51, 0.98)","--input-bg-focus":"rgba(22, 37, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(255, 142, 113, 0.3)","--color-glass-dark":"rgba(196, 69, 105, 0.08)","--color-glass-light":"rgba(248, 150, 30, 0.05)"},"miami-vice":{"--bg-primary":"#1a0f2e","--bg-secondary":"#2d1844","--bg-card":"#160d28","--bg-card-dark":"#231432","--bg-panel-start":"#2d1844","--bg-panel-end":"#ff6b9d","--bg-loading":"#0f0820","--text-primary":"#ffeaa7","--text-secondary":"#fab1a0","--text-dark":"#74526c","--text-light":"#ffeaa7","--text-muted":"#dfe6e9","--text-white":"#fff5f0","--text-gray":"#b2bec3","--text-error":"#ff7675","--text-success":"#fdcb6e","--text-warning":"#ffeb3b","--text-info":"#00d2d3","--text-faded":"rgba(255, 234, 167, 0.6)","--text-subtle":"rgba(255, 234, 167, 0.7)","--text-bright":"rgba(255, 234, 167, 0.9)","--info":"#00d2d3","--info-dark":"#00b8b8","--info-light":"#01e5e5","--success":"#fdcb6e","--success-dark":"#f9b747","--success-light":"#ffeaa7","--btn-primary-start":"#ff6b9d","--btn-primary-end":"#00d2d3","--btn-primary-hover-start":"#ee5a6f","--btn-primary-hover-end":"#01e5e5","--btn-secondary-start":"rgba(45, 24, 68, 0.9)","--btn-secondary-end":"rgba(26, 15, 46, 0.9)","--btn-secondary-hover-start":"rgba(55, 34, 78, 1)","--btn-secondary-hover-end":"rgba(45, 24, 68, 1)","--btn-tertiary-start":"#00d2d3","--btn-tertiary-end":"#00b8b8","--btn-tertiary-hover-start":"#01e5e5","--btn-tertiary-hover-end":"#00d2d3","--btn-tertiary-shadow":"rgba(0, 210, 211, 0.3)","--color-focus":"#00d2d3","--color-focus-shadow":"rgba(0, 210, 211, 0.3)","--color-divider-start":"rgba(255, 107, 157, 0.2)","--color-divider-middle":"rgba(0, 210, 211, 0.8)","--color-divider-end":"rgba(255, 107, 157, 0.2)","--accent":"#feca57","--accent-dark":"#f9b747","--accent2":"#00d2d3","--accent3":"#ff6b9d","--secondary":"#ff7979","--secondary-dark":"#ff6348","--input-bg":"rgba(26, 15, 46, 0.95)","--input-bg-hover":"rgba(35, 20, 56, 0.98)","--input-bg-focus":"rgba(45, 24, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(0, 210, 211, 0.3)","--color-glass-dark":"rgba(255, 107, 157, 0.08)","--color-glass-light":"rgba(0, 210, 211, 0.05)"},purple:{"--bg-primary":"#1a1a2e","--bg-secondary":"#2d2d44","--bg-card":"#16132d","--bg-card-dark":"#1f1b3a","--bg-panel-start":"#1a1a2e","--bg-panel-end":"#8e44ad","--bg-loading":"#0f0f1a","--text-primary":"#f3e5f5","--text-secondary":"#ce93d8","--text-dark":"#4a148c","--text-light":"#f3e5f5","--text-muted":"#ba68c8","--text-white":"#ffffff","--text-gray":"#9c27b0","--text-error":"#f44336","--text-success":"#ab47bc","--text-warning":"#ffc107","--text-info":"#ba68c8","--text-faded":"rgba(243, 229, 245, 0.6)","--text-subtle":"rgba(243, 229, 245, 0.7)","--text-bright":"rgba(243, 229, 245, 0.9)","--info":"#8e44ad","--info-dark":"#7d3c98","--info-light":"#a569bd","--success":"#a569bd","--success-dark":"#8e44ad","--success-light":"#bb8fce","--btn-primary-start":"#8e44ad","--btn-primary-end":"#f1c40f","--btn-primary-hover-start":"#a569bd","--btn-primary-hover-end":"#f39c12","--btn-secondary-start":"rgba(45, 45, 68, 0.9)","--btn-secondary-end":"rgba(26, 26, 46, 0.9)","--btn-secondary-hover-start":"rgba(58, 58, 88, 1)","--btn-secondary-hover-end":"rgba(45, 45, 68, 1)","--btn-tertiary-start":"#8e44ad","--btn-tertiary-end":"#6c3483","--btn-tertiary-hover-start":"#a569bd","--btn-tertiary-hover-end":"#8e44ad","--btn-tertiary-shadow":"rgba(142, 68, 173, 0.3)","--color-focus":"#cc99ff","--color-focus-shadow":"rgba(204, 153, 255, 0.3)","--color-divider-start":"rgba(142, 68, 173, 0.2)","--color-divider-middle":"rgba(142, 68, 173, 0.8)","--color-divider-end":"rgba(142, 68, 173, 0.2)","--accent":"#f1c40f","--accent-dark":"#d4ac0d","--accent2":"#ab47bc","--accent3":"#ba68c8","--secondary":"#e74c3c","--secondary-dark":"#c0392b","--input-bg":"rgba(26, 26, 46, 0.95)","--input-bg-hover":"rgba(35, 35, 55, 0.98)","--input-bg-focus":"rgba(45, 45, 68, 1)","--input-text-color":"var(--text-primary)","--input-border-color":"rgba(142, 68, 173, 0.3)","--color-glass-dark":"rgba(142, 68, 173, 0.08)","--color-glass-light":"rgba(241, 196, 15, 0.08)"}},er=n=>{const e=ln[n]||ln.default,t=document.documentElement;Object.entries(e).forEach(([r,i])=>{t.style.setProperty(r,i)})},xi=()=>{const n=localStorage.getItem("selectedTheme")||"default";er(n)},ud=()=>localStorage.getItem("selectedTheme")||"default",hd=n=>{localStorage.setItem("selectedTheme",n),er(n)},tr="https://api.in-between.live",Pi="https://api.in-between.live",fd="https://in-between.live",ki={apiKey:"AIzaSyBUm2vU-bPYSpsxIdd7pYerZx81GNgVJgQ",authDomain:"in-between-live.firebaseapp.com",projectId:"in-between-live",storageBucket:"in-between-live.firebasestorage.app",messagingSenderId:"800669475084",appId:"1:800669475084:web:89e0bbd44313d8bd3d2929",measurementId:"G-1PZPC7KWZF"},nr=p.createContext(),ut=()=>p.useContext(nr),Ci=({children:n})=>{const{token:e}=Tt(),[t,r]=p.useState(null),[i,s]=p.useState(!1),[a,c]=p.useState(null);p.useEffect(()=>{if(typeof window>"u")return;if(!e){t&&(t.disconnect(),r(null),s(!1),c(null));return}const d=wi(Pi,{auth:{token:e},reconnection:!0,reconnectionAttempts:5,reconnectionDelay:1e3,transports:["websocket","polling"],timeout:1e4});r(d),d.on("connect",()=>{c(null)}),d.on("authenticated",h=>{d.auth={userId:h.userId,username:h.username},s(!0),d.emit("getGameList")}),d.on("connect_error",h=>{c(`Failed to connect to game server: ${h.message}`),s(!1)}),d.on("disconnect",()=>{s(!1)}),d.on("error",h=>{c(h.message||"Unknown socket error")});const f=["connect","authenticated","disconnect","connect_error","error","transport"];return()=>{d&&(f.forEach(h=>d.off(h)),d.disconnect(),r(null),s(!1),c(null))}},[e]);const l={socket:t,isConnected:i,error:a,setError:c};return o.jsx(nr.Provider,{value:l,children:n})},Ri=()=>{};var dn={};/**
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
 */const rr=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Oi=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},ir={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,f=s>>2,h=(s&3)<<4|c>>4;let u=(c&15)<<2|d>>6,m=d&63;l||(m=64,a||(u=64)),r.push(t[f],t[h],t[u],t[m])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(rr(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Oi(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const h=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||h==null)throw new ji;const u=s<<2|c>>4;if(r.push(u),d!==64){const m=c<<4&240|d>>2;if(r.push(m),h!==64){const E=d<<6&192|h;r.push(E)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ji extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Li=function(n){const e=rr(n);return ir.encodeByteArray(e,!0)},sr=function(n){return Li(n).replace(/\./g,"")},or=function(n){try{return ir.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ni(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Di=()=>Ni().__FIREBASE_DEFAULTS__,Ui=()=>{if(typeof process>"u"||typeof dn>"u")return;const n=dn.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Mi=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&or(n[1]);return e&&JSON.parse(e)},zt=()=>{try{return Ri()||Di()||Ui()||Mi()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Fi=n=>{var e,t;return(t=(e=zt())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ar=()=>{var n;return(n=zt())===null||n===void 0?void 0:n.config},cr=n=>{var e;return(e=zt())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Bi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function ht(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wi(n){return(await fetch(n,{credentials:"include"})).ok}const je={};function Vi(){const n={prod:[],emulator:[]};for(const e of Object.keys(je))je[e]?n.emulator.push(e):n.prod.push(e);return n}function $i(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let un=!1;function Hi(n,e){if(typeof window>"u"||typeof document>"u"||!ht(window.location.host)||je[n]===e||je[n]||un)return;je[n]=e;function t(u){return`__firebase__banner__${u}`}const r="__firebase__banner",s=Vi().prod.length>0;function a(){const u=document.getElementById(r);u&&u.remove()}function c(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function l(u,m){u.setAttribute("width","24"),u.setAttribute("id",m),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function d(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{un=!0,a()},u}function f(u,m){u.setAttribute("id",m),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=$i(r),m=t("text"),E=document.getElementById(m)||document.createElement("span"),v=t("learnmore"),w=document.getElementById(v)||document.createElement("a"),b=t("preprendIcon"),_=document.getElementById(b)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const T=u.element;c(T),f(w,v);const C=d();l(_,b),T.append(_,E,w,C),document.body.appendChild(T)}s?(E.innerText="Preview backend disconnected.",_.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,E.innerText="Preview backend running in this workspace."),E.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
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
 */function M(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Gi(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(M())}function zi(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function qi(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ki(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Yi(){const n=M();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ji(){try{return typeof indexedDB=="object"}catch{return!1}}function Xi(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const Qi="FirebaseError";class le extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Qi,Object.setPrototypeOf(this,le.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$e.prototype.create)}}class $e{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Zi(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new le(i,c,r)}}function Zi(n,e){return n.replace(es,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const es=/\{\$([^}]+)}/g;function ts(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function we(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(hn(s)&&hn(a)){if(!we(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function hn(n){return n!==null&&typeof n=="object"}/**
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
 */function Ee(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ke(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Ce(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function ns(n,e){const t=new rs(n,e);return t.subscribe.bind(t)}class rs{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");is(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=St),i.error===void 0&&(i.error=St),i.complete===void 0&&(i.complete=St);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function is(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function St(){}/**
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
 */function k(n){return n&&n._delegate?n._delegate:n}class _e{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class ss{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Bi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(as(e))try{this.getOrInitializeService({instanceIdentifier:de})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=de){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=de){return this.instances.has(e)}getOptions(e=de){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:os(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=de){return this.component?this.component.multipleInstances?e:de:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function os(n){return n===de?void 0:n}function as(n){return n.instantiationMode==="EAGER"}/**
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
 */class cs{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ss(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var P;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(P||(P={}));const ls={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},ds=P.INFO,us={[P.DEBUG]:"log",[P.VERBOSE]:"log",[P.INFO]:"info",[P.WARN]:"warn",[P.ERROR]:"error"},hs=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=us[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class lr{constructor(e){this.name=e,this._logLevel=ds,this._logHandler=hs,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in P))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ls[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,P.DEBUG,...e),this._logHandler(this,P.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,P.VERBOSE,...e),this._logHandler(this,P.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,P.INFO,...e),this._logHandler(this,P.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,P.WARN,...e),this._logHandler(this,P.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,P.ERROR,...e),this._logHandler(this,P.ERROR,...e)}}const fs=(n,e)=>e.some(t=>n instanceof t);let fn,pn;function ps(){return fn||(fn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function gs(){return pn||(pn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const dr=new WeakMap,Mt=new WeakMap,ur=new WeakMap,xt=new WeakMap,qt=new WeakMap;function ms(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(oe(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&dr.set(t,n)}).catch(()=>{}),qt.set(e,n),e}function ys(n){if(Mt.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});Mt.set(n,e)}let Ft={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Mt.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ur.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return oe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function vs(n){Ft=n(Ft)}function bs(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Pt(this),e,...t);return ur.set(r,e.sort?e.sort():[e]),oe(r)}:gs().includes(n)?function(...e){return n.apply(Pt(this),e),oe(dr.get(this))}:function(...e){return oe(n.apply(Pt(this),e))}}function ws(n){return typeof n=="function"?bs(n):(n instanceof IDBTransaction&&ys(n),fs(n,ps())?new Proxy(n,Ft):n)}function oe(n){if(n instanceof IDBRequest)return ms(n);if(xt.has(n))return xt.get(n);const e=ws(n);return e!==n&&(xt.set(n,e),qt.set(e,n)),e}const Pt=n=>qt.get(n);function _s(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),c=oe(a);return r&&a.addEventListener("upgradeneeded",l=>{r(oe(a.result),l.oldVersion,l.newVersion,oe(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Is=["get","getKey","getAll","getAllKeys","count"],Es=["put","add","delete","clear"],kt=new Map;function gn(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(kt.get(e))return kt.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Es.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Is.includes(t)))return;const s=async function(a,...c){const l=this.transaction(a,i?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return kt.set(e,s),s}vs(n=>({...n,get:(e,t,r)=>gn(e,t)||n.get(e,t,r),has:(e,t)=>!!gn(e,t)||n.has(e,t)}));/**
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
 */class Ts{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(As(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function As(n){const e=n.getComponent();return e?.type==="VERSION"}const Bt="@firebase/app",mn="0.13.2";/**
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
 */const K=new lr("@firebase/app"),Ss="@firebase/app-compat",xs="@firebase/analytics-compat",Ps="@firebase/analytics",ks="@firebase/app-check-compat",Cs="@firebase/app-check",Rs="@firebase/auth",Os="@firebase/auth-compat",js="@firebase/database",Ls="@firebase/data-connect",Ns="@firebase/database-compat",Ds="@firebase/functions",Us="@firebase/functions-compat",Ms="@firebase/installations",Fs="@firebase/installations-compat",Bs="@firebase/messaging",Ws="@firebase/messaging-compat",Vs="@firebase/performance",$s="@firebase/performance-compat",Hs="@firebase/remote-config",Gs="@firebase/remote-config-compat",zs="@firebase/storage",qs="@firebase/storage-compat",Ks="@firebase/firestore",Ys="@firebase/ai",Js="@firebase/firestore-compat",Xs="firebase",Qs="11.10.0";/**
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
 */const Wt="[DEFAULT]",Zs={[Bt]:"fire-core",[Ss]:"fire-core-compat",[Ps]:"fire-analytics",[xs]:"fire-analytics-compat",[Cs]:"fire-app-check",[ks]:"fire-app-check-compat",[Rs]:"fire-auth",[Os]:"fire-auth-compat",[js]:"fire-rtdb",[Ls]:"fire-data-connect",[Ns]:"fire-rtdb-compat",[Ds]:"fire-fn",[Us]:"fire-fn-compat",[Ms]:"fire-iid",[Fs]:"fire-iid-compat",[Bs]:"fire-fcm",[Ws]:"fire-fcm-compat",[Vs]:"fire-perf",[$s]:"fire-perf-compat",[Hs]:"fire-rc",[Gs]:"fire-rc-compat",[zs]:"fire-gcs",[qs]:"fire-gcs-compat",[Ks]:"fire-fst",[Js]:"fire-fst-compat",[Ys]:"fire-vertex","fire-js":"fire-js",[Xs]:"fire-js-all"};/**
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
 */const st=new Map,eo=new Map,Vt=new Map;function yn(n,e){try{n.container.addComponent(e)}catch(t){K.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Me(n){const e=n.name;if(Vt.has(e))return K.debug(`There were multiple attempts to register component ${e}.`),!1;Vt.set(e,n);for(const t of st.values())yn(t,n);for(const t of eo.values())yn(t,n);return!0}function hr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function N(n){return n==null?!1:n.settings!==void 0}/**
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
 */const to={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ae=new $e("app","Firebase",to);/**
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
 */class no{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new _e("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ae.create("app-deleted",{appName:this._name})}}/**
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
 */const He=Qs;function fr(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Wt,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw ae.create("bad-app-name",{appName:String(i)});if(t||(t=ar()),!t)throw ae.create("no-options");const s=st.get(i);if(s){if(we(t,s.options)&&we(r,s.config))return s;throw ae.create("duplicate-app",{appName:i})}const a=new cs(i);for(const l of Vt.values())a.addComponent(l);const c=new no(t,r,a);return st.set(i,c),c}function ro(n=Wt){const e=st.get(n);if(!e&&n===Wt&&ar())return fr();if(!e)throw ae.create("no-app",{appName:n});return e}function pe(n,e,t){var r;let i=(r=Zs[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),K.warn(c.join(" "));return}Me(new _e(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const io="firebase-heartbeat-database",so=1,Fe="firebase-heartbeat-store";let Ct=null;function pr(){return Ct||(Ct=_s(io,so,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Fe)}catch(t){console.warn(t)}}}}).catch(n=>{throw ae.create("idb-open",{originalErrorMessage:n.message})})),Ct}async function oo(n){try{const t=(await pr()).transaction(Fe),r=await t.objectStore(Fe).get(gr(n));return await t.done,r}catch(e){if(e instanceof le)K.warn(e.message);else{const t=ae.create("idb-get",{originalErrorMessage:e?.message});K.warn(t.message)}}}async function vn(n,e){try{const r=(await pr()).transaction(Fe,"readwrite");await r.objectStore(Fe).put(e,gr(n)),await r.done}catch(t){if(t instanceof le)K.warn(t.message);else{const r=ae.create("idb-set",{originalErrorMessage:t?.message});K.warn(r.message)}}}function gr(n){return`${n.name}!${n.options.appId}`}/**
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
 */const ao=1024,co=30;class lo{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ho(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=bn();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>co){const a=fo(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){K.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=bn(),{heartbeatsToSend:r,unsentEntries:i}=uo(this._heartbeatsCache.heartbeats),s=sr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return K.warn(t),""}}}function bn(){return new Date().toISOString().substring(0,10)}function uo(n,e=ao){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),wn(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),wn(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ho{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ji()?Xi().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await oo(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vn(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vn(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function wn(n){return sr(JSON.stringify({version:2,heartbeats:n})).length}function fo(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function po(n){Me(new _e("platform-logger",e=>new Ts(e),"PRIVATE")),Me(new _e("heartbeat",e=>new lo(e),"PRIVATE")),pe(Bt,mn,n),pe(Bt,mn,"esm2017"),pe("fire-js","")}po("");var go="firebase",mo="11.10.0";/**
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
 */pe(go,mo,"app");function Kt(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function mr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const yo=mr,yr=new $e("auth","Firebase",mr());/**
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
 */const ot=new lr("@firebase/auth");function vo(n,...e){ot.logLevel<=P.WARN&&ot.warn(`Auth (${He}): ${n}`,...e)}function et(n,...e){ot.logLevel<=P.ERROR&&ot.error(`Auth (${He}): ${n}`,...e)}/**
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
 */function V(n,...e){throw Jt(n,...e)}function F(n,...e){return Jt(n,...e)}function Yt(n,e,t){const r=Object.assign(Object.assign({},yo()),{[e]:t});return new $e("auth","Firebase",r).create(e,{appName:n.name})}function U(n){return Yt(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ft(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&V(n,"argument-error"),Yt(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Jt(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return yr.create(n,...e)}function g(n,e,...t){if(!n)throw Jt(e,...t)}function z(n){const e="INTERNAL ASSERTION FAILED: "+n;throw et(e),new Error(e)}function Y(n,e){n||z(e)}/**
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
 */function Be(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Xt(){return _n()==="http:"||_n()==="https:"}function _n(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function bo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xt()||qi()||"connection"in navigator)?navigator.onLine:!0}function wo(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Ge{constructor(e,t){this.shortDelay=e,this.longDelay=t,Y(t>e,"Short delay should be less than long delay!"),this.isMobile=Gi()||Ki()}get(){return bo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */class vr{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;z("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;z("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;z("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const _o={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Io=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Eo=new Ge(3e4,6e4);function j(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function L(n,e,t,r,i={}){return br(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=Ee(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:l},s);return zi()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&ht(n.emulatorConfig.host)&&(d.credentials="include"),vr.fetch()(await wr(n,n.config.apiHost,t,c),d)})}async function br(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},_o),e);try{const i=new Ao(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Re(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Re(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Re(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Re(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Yt(n,f,d);V(n,f)}}catch(i){if(i instanceof le)throw i;V(n,"network-request-failed",{message:String(i)})}}async function X(n,e,t,r,i={}){const s=await L(n,e,t,r,i);return"mfaPendingCredential"in s&&V(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function wr(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?Qt(n.config,i):`${n.config.apiScheme}://${i}`;return Io.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function To(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ao{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(F(this.auth,"network-request-failed")),Eo.get())})}}function Re(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=F(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */function In(n){return n!==void 0&&n.getResponse!==void 0}function En(n){return n!==void 0&&n.enterprise!==void 0}class _r{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return To(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
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
 */async function So(n){return(await L(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Ir(n,e){return L(n,"GET","/v2/recaptchaConfig",j(n,e))}/**
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
 */async function xo(n,e){return L(n,"POST","/v1/accounts:delete",e)}async function Po(n,e){return L(n,"POST","/v1/accounts:update",e)}async function at(n,e){return L(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Le(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ko(n,e=!1){const t=k(n),r=await t.getIdToken(e),i=pt(r);g(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:r,authTime:Le(Rt(i.auth_time)),issuedAtTime:Le(Rt(i.iat)),expirationTime:Le(Rt(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Rt(n){return Number(n)*1e3}function pt(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return et("JWT malformed, contained fewer than 3 sections"),null;try{const i=or(t);return i?JSON.parse(i):(et("Failed to decode base64 JWT payload"),null)}catch(i){return et("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Tn(n){const e=pt(n);return g(e,"internal-error"),g(typeof e.exp<"u","internal-error"),g(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ue(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof le&&Co(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Co({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Ro{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class $t{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Le(this.lastLoginAt),this.creationTime=Le(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function We(n){var e;const t=n.auth,r=await n.getIdToken(),i=await ue(n,at(t,{idToken:r}));g(i?.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Er(s.providerUserInfo):[],c=jo(n.providerData,a),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!c?.length,f=l?d:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new $t(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,h)}async function Oo(n){const e=k(n);await We(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jo(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Er(n){return n.map(e=>{var{providerId:t}=e,r=Kt(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Lo(n,e){const t=await br(n,{},async()=>{const r=Ee({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await wr(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&ht(n.emulatorConfig.host)&&(l.credentials="include"),vr.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function No(n,e){return L(n,"POST","/v2/accounts:revokeToken",j(n,e))}/**
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
 */class ge{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){g(e.idToken,"internal-error"),g(typeof e.idToken<"u","internal-error"),g(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Tn(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){g(e.length!==0,"internal-error");const t=Tn(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(g(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Lo(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new ge;return r&&(g(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(g(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(g(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ge,this.toJSON())}_performRefresh(){return z("not implemented")}}/**
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
 */function Z(n,e){g(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class H{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Kt(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ro(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new $t(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ue(this,this.stsTokenManager.getToken(this.auth,e));return g(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ko(this,e)}reload(){return Oo(this)}_assign(e){this!==e&&(g(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new H(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){g(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await We(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(N(this.auth.app))return Promise.reject(U(this.auth));const e=await this.getIdToken();return await ue(this,xo(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,l,d,f;const h=(r=t.displayName)!==null&&r!==void 0?r:void 0,u=(i=t.email)!==null&&i!==void 0?i:void 0,m=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,E=(a=t.photoURL)!==null&&a!==void 0?a:void 0,v=(c=t.tenantId)!==null&&c!==void 0?c:void 0,w=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,b=(d=t.createdAt)!==null&&d!==void 0?d:void 0,_=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:T,emailVerified:C,isAnonymous:y,providerData:A,stsTokenManager:x}=t;g(T&&x,e,"internal-error");const I=ge.fromJSON(this.name,x);g(typeof T=="string",e,"internal-error"),Z(h,e.name),Z(u,e.name),g(typeof C=="boolean",e,"internal-error"),g(typeof y=="boolean",e,"internal-error"),Z(m,e.name),Z(E,e.name),Z(v,e.name),Z(w,e.name),Z(b,e.name),Z(_,e.name);const S=new H({uid:T,auth:e,email:u,emailVerified:C,displayName:h,isAnonymous:y,photoURL:E,phoneNumber:m,tenantId:v,stsTokenManager:I,createdAt:b,lastLoginAt:_});return A&&Array.isArray(A)&&(S.providerData=A.map(O=>Object.assign({},O))),w&&(S._redirectEventId=w),S}static async _fromIdTokenResponse(e,t,r=!1){const i=new ge;i.updateFromServerResponse(t);const s=new H({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await We(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];g(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Er(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,c=new ge;c.updateFromIdToken(r);const l=new H({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new $t(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,d),l}}/**
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
 */const An=new Map;function q(n){Y(n instanceof Function,"Expected a class definition");let e=An.get(n);return e?(Y(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,An.set(n,e),e)}/**
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
 */class Tr{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Tr.type="NONE";const Sn=Tr;/**
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
 */function tt(n,e,t){return`firebase:${n}:${e}:${t}`}class me{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=tt(this.userKey,i.apiKey,s),this.fullPersistenceKey=tt("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await at(this.auth,{idToken:e}).catch(()=>{});return t?H._fromGetAccountInfoResponse(this.auth,t,e):null}return H._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new me(q(Sn),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||q(Sn);const a=tt(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let h;if(typeof f=="string"){const u=await at(e,{idToken:f}).catch(()=>{});if(!u)break;h=await H._fromGetAccountInfoResponse(e,u,f)}else h=H._fromJSON(e,f);d!==s&&(c=h),s=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new me(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new me(s,e,r))}}/**
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
 */function xn(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Pr(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ar(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Cr(e))return"Blackberry";if(Rr(e))return"Webos";if(Sr(e))return"Safari";if((e.includes("chrome/")||xr(e))&&!e.includes("edge/"))return"Chrome";if(kr(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Ar(n=M()){return/firefox\//i.test(n)}function Sr(n=M()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function xr(n=M()){return/crios\//i.test(n)}function Pr(n=M()){return/iemobile/i.test(n)}function kr(n=M()){return/android/i.test(n)}function Cr(n=M()){return/blackberry/i.test(n)}function Rr(n=M()){return/webos/i.test(n)}function Zt(n=M()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Do(n=M()){var e;return Zt(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Uo(){return Yi()&&document.documentMode===10}function Or(n=M()){return Zt(n)||kr(n)||Rr(n)||Cr(n)||/windows phone/i.test(n)||Pr(n)}/**
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
 */function jr(n,e=[]){let t;switch(n){case"Browser":t=xn(M());break;case"Worker":t=`${xn(M())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${He}/${r}`}/**
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
 */class Mo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,c)=>{try{const l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function Fo(n,e={}){return L(n,"GET","/v2/passwordPolicy",j(n,e))}/**
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
 */const Bo=6;class Wo{constructor(e){var t,r,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Bo,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Vo{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Pn(this),this.idTokenSubscription=new Pn(this),this.beforeStateQueue=new Mo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=q(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await me.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await at(this,{idToken:e}),r=await H._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(N(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return g(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await We(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=wo()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(N(this.app))return Promise.reject(U(this));const t=e?k(e):null;return t&&g(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&g(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return N(this.app)?Promise.reject(U(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return N(this.app)?Promise.reject(U(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(q(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Fo(this),t=new Wo(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new $e("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await No(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&q(e)||this._popupRedirectResolver;g(t,this,"argument-error"),this.redirectPersistenceManager=await me.create(this,[q(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(g(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return g(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=jr(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(N(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&vo(`Error while retrieving App Check token: ${t.error}`),t?.token}}function D(n){return k(n)}class Pn{constructor(e){this.auth=e,this.observer=null,this.addObserver=ns(t=>this.observer=t)}get next(){return g(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ze={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function $o(n){ze=n}function en(n){return ze.loadJS(n)}function Ho(){return ze.recaptchaV2Script}function Go(){return ze.recaptchaEnterpriseScript}function zo(){return ze.gapiScript}function Lr(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const qo=500,Ko=6e4,Qe=1e12;class Yo{constructor(e){this.auth=e,this.counter=Qe,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new Qo(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||Qe;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||Qe;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||Qe;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class Jo{constructor(){this.enterprise=new Xo}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Xo{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Qo{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;g(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Zo(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},Ko)},qo))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Zo(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const ea="recaptcha-enterprise",Ne="NO_RECAPTCHA";class Nr{constructor(e){this.type=ea,this.auth=D(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{Ir(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new _r(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,a,c){const l=window.grecaptcha;En(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(Ne)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Jo().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&En(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Go();l.length!==0&&(l+=c),en(l).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Pe(n,e,t,r=!1,i=!1){const s=new Nr(n);let a;if(i)a=Ne;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function ce(n,e,t,r,i){var s,a;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const c=await Pe(n,e,t,t==="getOobCode");return r(n,c)}else return r(n,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Pe(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(c)});else if(i==="PHONE_PROVIDER")if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("PHONE_PROVIDER")){const c=await Pe(n,e,t);return r(n,c).catch(async l=>{var d;if(((d=n._getRecaptchaConfig())===null||d===void 0?void 0:d.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const f=await Pe(n,e,t,!1,!0);return r(n,f)}return Promise.reject(l)})}else{const c=await Pe(n,e,t,!1,!0);return r(n,c)}else return Promise.reject(i+" provider is not supported.")}async function ta(n){const e=D(n),t=await Ir(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new _r(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Nr(e).verify()}/**
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
 */function na(n,e){const t=hr(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(we(s,e??{}))return i;V(i,"already-initialized")}return t.initialize({options:e})}function ra(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(q);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function ia(n,e,t){const r=D(n);g(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Dr(e),{host:a,port:c}=sa(e),l=c===null?"":`:${c}`,d={url:`${s}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){g(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),g(we(d,r.config.emulator)&&we(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,ht(a)?(Wi(`${s}//${a}${l}`),Hi("Auth",!0)):oa()}function Dr(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function sa(n){const e=Dr(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:kn(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:kn(a)}}}function kn(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function oa(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class gt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return z("not implemented")}_getIdTokenResponse(e){return z("not implemented")}_linkToIdToken(e,t){return z("not implemented")}_getReauthenticationResolver(e){return z("not implemented")}}/**
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
 */async function aa(n,e){return L(n,"POST","/v1/accounts:resetPassword",j(n,e))}async function ca(n,e){return L(n,"POST","/v1/accounts:update",e)}async function la(n,e){return L(n,"POST","/v1/accounts:signUp",e)}async function da(n,e){return L(n,"POST","/v1/accounts:update",j(n,e))}/**
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
 */async function ua(n,e){return X(n,"POST","/v1/accounts:signInWithPassword",j(n,e))}async function mt(n,e){return L(n,"POST","/v1/accounts:sendOobCode",j(n,e))}async function ha(n,e){return mt(n,e)}async function fa(n,e){return mt(n,e)}async function pa(n,e){return mt(n,e)}async function ga(n,e){return mt(n,e)}/**
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
 */async function ma(n,e){return X(n,"POST","/v1/accounts:signInWithEmailLink",j(n,e))}async function ya(n,e){return X(n,"POST","/v1/accounts:signInWithEmailLink",j(n,e))}/**
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
 */class Ve extends gt{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Ve(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ve(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ce(e,t,"signInWithPassword",ua,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ma(e,{email:this._email,oobCode:this._password});default:V(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ce(e,r,"signUpPassword",la,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ya(e,{idToken:t,email:this._email,oobCode:this._password});default:V(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function ye(n,e){return X(n,"POST","/v1/accounts:signInWithIdp",j(n,e))}/**
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
 */const va="http://localhost";class J extends gt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new J(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):V("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Kt(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new J(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return ye(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ye(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ye(e,t)}buildRequest(){const e={requestUri:va,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ee(t)}return e}}/**
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
 */async function Cn(n,e){return L(n,"POST","/v1/accounts:sendVerificationCode",j(n,e))}async function ba(n,e){return X(n,"POST","/v1/accounts:signInWithPhoneNumber",j(n,e))}async function wa(n,e){const t=await X(n,"POST","/v1/accounts:signInWithPhoneNumber",j(n,e));if(t.temporaryProof)throw Re(n,"account-exists-with-different-credential",t);return t}const _a={USER_NOT_FOUND:"user-not-found"};async function Ia(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return X(n,"POST","/v1/accounts:signInWithPhoneNumber",j(n,t),_a)}/**
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
 */class De extends gt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new De({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new De({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return ba(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return wa(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Ia(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new De({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
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
 */function Ea(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ta(n){const e=ke(Ce(n)).link,t=e?ke(Ce(e)).deep_link_id:null,r=ke(Ce(n)).deep_link_id;return(r?ke(Ce(r)).link:null)||r||t||e||n}class yt{constructor(e){var t,r,i,s,a,c;const l=ke(Ce(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,f=(r=l.oobCode)!==null&&r!==void 0?r:null,h=Ea((i=l.mode)!==null&&i!==void 0?i:null);g(d&&f&&h,"argument-error"),this.apiKey=d,this.operation=h,this.code=f,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.lang)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Ta(e);try{return new yt(t)}catch{return null}}}/**
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
 */class he{constructor(){this.providerId=he.PROVIDER_ID}static credential(e,t){return Ve._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=yt.parseLink(t);return g(r,"argument-error"),Ve._fromEmailAndCode(e,r.code,r.tenantId)}}he.PROVIDER_ID="password";he.EMAIL_PASSWORD_SIGN_IN_METHOD="password";he.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Te{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ae extends Te{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class nt extends Ae{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return g("providerId"in t&&"signInMethod"in t,"argument-error"),J._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return g(e.idToken||e.accessToken,"argument-error"),J._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return nt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return nt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:a,providerId:c}=e;if(!r&&!i&&!t&&!s||!c)return null;try{return new nt(c)._credential({idToken:t,accessToken:r,nonce:a,pendingToken:s})}catch{return null}}}/**
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
 */class ee extends Ae{constructor(){super("facebook.com")}static credential(e){return J._fromParams({providerId:ee.PROVIDER_ID,signInMethod:ee.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ee.credentialFromTaggedObject(e)}static credentialFromError(e){return ee.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ee.credential(e.oauthAccessToken)}catch{return null}}}ee.FACEBOOK_SIGN_IN_METHOD="facebook.com";ee.PROVIDER_ID="facebook.com";/**
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
 */class te extends Ae{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return J._fromParams({providerId:te.PROVIDER_ID,signInMethod:te.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return te.credentialFromTaggedObject(e)}static credentialFromError(e){return te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return te.credential(t,r)}catch{return null}}}te.GOOGLE_SIGN_IN_METHOD="google.com";te.PROVIDER_ID="google.com";/**
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
 */class ne extends Ae{constructor(){super("github.com")}static credential(e){return J._fromParams({providerId:ne.PROVIDER_ID,signInMethod:ne.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ne.credentialFromTaggedObject(e)}static credentialFromError(e){return ne.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ne.credential(e.oauthAccessToken)}catch{return null}}}ne.GITHUB_SIGN_IN_METHOD="github.com";ne.PROVIDER_ID="github.com";/**
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
 */class re extends Ae{constructor(){super("twitter.com")}static credential(e,t){return J._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return re.credential(t,r)}catch{return null}}}re.TWITTER_SIGN_IN_METHOD="twitter.com";re.PROVIDER_ID="twitter.com";/**
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
 */async function Ur(n,e){return X(n,"POST","/v1/accounts:signUp",j(n,e))}/**
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
 */class G{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await H._fromIdTokenResponse(e,r,i),a=Rn(r);return new G({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Rn(r);return new G({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Rn(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function pd(n){var e;if(N(n.app))return Promise.reject(U(n));const t=D(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new G({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Ur(t,{returnSecureToken:!0}),i=await G._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}/**
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
 */class ct extends le{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ct.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new ct(e,t,r,i)}}function Mr(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ct._fromErrorAndOperation(n,s,e,r):s})}/**
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
 */function Fr(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function gd(n,e){const t=k(n);await vt(!0,t,e);const{providerUserInfo:r}=await Po(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=Fr(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Br(n,e,t=!1){const r=await ue(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return G._forOperation(n,"link",r)}async function vt(n,e,t){await We(e);const r=Fr(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";g(r.has(t)===n,e.auth,i)}/**
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
 */async function Aa(n,e,t=!1){const{auth:r}=n;if(N(r.app))return Promise.reject(U(r));const i="reauthenticate";try{const s=await ue(n,Mr(r,i,e,n),t);g(s.idToken,r,"internal-error");const a=pt(s.idToken);g(a,r,"internal-error");const{sub:c}=a;return g(n.uid===c,r,"user-mismatch"),G._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&V(r,"user-mismatch"),s}}/**
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
 */async function Wr(n,e,t=!1){if(N(n.app))return Promise.reject(U(n));const r="signIn",i=await Mr(n,r,e),s=await G._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function tn(n,e){return Wr(D(n),e)}async function Sa(n,e){const t=k(n);return await vt(!1,t,e.providerId),Br(t,e)}/**
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
 */async function xa(n,e){return X(n,"POST","/v1/accounts:signInWithCustomToken",j(n,e))}/**
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
 */async function md(n,e){if(N(n.app))return Promise.reject(U(n));const t=D(n),r=await xa(t,{token:e,returnSecureToken:!0}),i=await G._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
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
 */function bt(n,e,t){var r;g(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),g(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),g(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(g(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(g(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
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
 */async function nn(n){const e=D(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function yd(n,e,t){const r=D(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&bt(r,i,t),await ce(r,i,"getOobCode",fa,"EMAIL_PASSWORD_PROVIDER")}async function vd(n,e,t){await aa(k(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&nn(n),r})}async function bd(n,e){await da(k(n),{oobCode:e})}async function wd(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=D(n),a=await ce(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Ur,"EMAIL_PASSWORD_PROVIDER").catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&nn(n),l}),c=await G._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function _d(n,e,t){return N(n.app)?Promise.reject(U(n)):tn(k(n),he.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&nn(n),r})}/**
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
 */async function Id(n,e,t){const r=D(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(a,c){g(c.handleCodeInApp,r,"argument-error"),c&&bt(r,a,c)}s(i,t),await ce(r,i,"getOobCode",pa,"EMAIL_PASSWORD_PROVIDER")}function Ed(n,e){const t=yt.parseLink(e);return t?.operation==="EMAIL_SIGNIN"}async function Td(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=k(n),i=he.credentialWithLink(e,t||Be());return g(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),tn(r,i)}/**
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
 */async function Pa(n,e){return L(n,"POST","/v1/accounts:createAuthUri",j(n,e))}/**
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
 */async function Ad(n,e){const t=Xt()?Be():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await Pa(k(n),r);return i||[]}async function Sd(n,e){const t=k(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&bt(t.auth,i,e);const{email:s}=await ha(t.auth,i);s!==n.email&&await n.reload()}async function xd(n,e,t){const r=k(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&bt(r.auth,s,t);const{email:a}=await ga(r.auth,s);a!==n.email&&await n.reload()}/**
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
 */async function ka(n,e){return L(n,"POST","/v1/accounts:update",e)}/**
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
 */async function Pd(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=k(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await ue(r,ka(r.auth,s));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const c=r.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function kd(n,e){const t=k(n);return N(t.auth.app)?Promise.reject(U(t.auth)):Vr(t,e,null)}function Cd(n,e){return Vr(k(n),null,e)}async function Vr(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const a=await ue(n,ca(r,s));await n._updateTokensIfNecessary(a,!0)}/**
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
 */function Ca(n){var e,t;if(!n)return null;const{providerId:r}=n,i=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},s=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&n?.idToken){const a=(t=(e=pt(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(a){const c=a!=="anonymous"&&a!=="custom"?a:null;return new ve(s,c)}}if(!r)return null;switch(r){case"facebook.com":return new Ra(s,i);case"github.com":return new Oa(s,i);case"google.com":return new ja(s,i);case"twitter.com":return new La(s,i,n.screenName||null);case"custom":case"anonymous":return new ve(s,null);default:return new ve(s,r,i)}}class ve{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class $r extends ve{constructor(e,t,r,i){super(e,t,r),this.username=i}}class Ra extends ve{constructor(e,t){super(e,"facebook.com",t)}}class Oa extends $r{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class ja extends ve{constructor(e,t){super(e,"google.com",t)}}class La extends $r{constructor(e,t,r){super(e,"twitter.com",t,r)}}function Rd(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:Ca(t)}/**
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
 */function Od(n,e){return k(n).setPersistence(e)}function Na(n,e,t,r){return k(n).onIdTokenChanged(e,t,r)}function Da(n,e,t){return k(n).beforeAuthStateChanged(e,t)}function Ua(n,e,t,r){return k(n).onAuthStateChanged(e,t,r)}function Ma(n){return k(n).signOut()}function jd(n,e){return D(n).revokeAccessToken(e)}async function Ld(n){return k(n).delete()}/**
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
 */function On(n,e){return L(n,"POST","/v2/accounts/mfaEnrollment:start",j(n,e))}const lt="__sak";/**
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
 */class Hr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(lt,"1"),this.storage.removeItem(lt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Fa=1e3,Ba=10;class Gr extends Hr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Or(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Uo()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ba):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Fa)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Gr.type="LOCAL";const Wa=Gr;/**
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
 */class zr extends Hr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}zr.type="SESSION";const qr=zr;/**
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
 */function Va(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class wt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new wt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async d=>d(t.origin,s)),l=await Va(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}wt.receivers=[];/**
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
 */function _t(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class $a{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{const d=_t("",20);i.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(h){const u=h;if(u.data.eventId===d)switch(u.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(u.data.response);break;default:clearTimeout(f),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function R(){return window}function Ha(n){R().location.href=n}/**
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
 */function rn(){return typeof R().WorkerGlobalScope<"u"&&typeof R().importScripts=="function"}async function Ga(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function za(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function qa(){return rn()?self:null}/**
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
 */const Kr="firebaseLocalStorageDb",Ka=1,dt="firebaseLocalStorage",Yr="fbase_key";class qe{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function It(n,e){return n.transaction([dt],e?"readwrite":"readonly").objectStore(dt)}function Ya(){const n=indexedDB.deleteDatabase(Kr);return new qe(n).toPromise()}function Ht(){const n=indexedDB.open(Kr,Ka);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(dt,{keyPath:Yr})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(dt)?e(r):(r.close(),await Ya(),e(await Ht()))})})}async function jn(n,e,t){const r=It(n,!0).put({[Yr]:e,value:t});return new qe(r).toPromise()}async function Ja(n,e){const t=It(n,!1).get(e),r=await new qe(t).toPromise();return r===void 0?null:r.value}function Ln(n,e){const t=It(n,!0).delete(e);return new qe(t).toPromise()}const Xa=800,Qa=3;class Jr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ht(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Qa)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return rn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=wt._getInstance(qa()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ga(),!this.activeServiceWorker)return;this.sender=new $a(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||za()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ht();return await jn(e,lt,"1"),await Ln(e,lt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>jn(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Ja(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ln(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=It(i,!1).getAll();return new qe(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xa)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Jr.type="LOCAL";const Za=Jr;/**
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
 */function Nn(n,e){return L(n,"POST","/v2/accounts/mfaSignIn:start",j(n,e))}/**
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
 */const Ot=Lr("rcb"),ec=new Ge(3e4,6e4);class tc{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=R().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return g(nc(t),e,"argument-error"),this.shouldResolveImmediately(t)&&In(R().grecaptcha)?Promise.resolve(R().grecaptcha):new Promise((r,i)=>{const s=R().setTimeout(()=>{i(F(e,"network-request-failed"))},ec.get());R()[Ot]=()=>{R().clearTimeout(s),delete R()[Ot];const c=R().grecaptcha;if(!c||!In(c)){i(F(e,"internal-error"));return}const l=c.render;c.render=(d,f)=>{const h=l(d,f);return this.counter++,h},this.hostLanguage=t,r(c)};const a=`${Ho()}?${Ee({onload:Ot,render:"explicit",hl:t})}`;en(a).catch(()=>{clearTimeout(s),i(F(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=R().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function nc(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class rc{async load(e){return new Yo(e)}clearedOneInstance(){}}/**
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
 */const Ue="recaptcha",ic={theme:"light",type:"image"};class Nd{constructor(e,t,r=Object.assign({},ic)){this.parameters=r,this.type=Ue,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=D(e),this.isInvisible=this.parameters.size==="invisible",g(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;g(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new rc:new tc,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=a=>{a&&(this.tokenChangeListeners.delete(s),i(a))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){g(!this.parameters.sitekey,this.auth,"argument-error"),g(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),g(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=R()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){g(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){g(Xt()&&!rn(),this.auth,"internal-error"),await sc(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await So(this.auth);g(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return g(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function sc(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class Xr{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=De._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Dd(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=D(n),i=await Qr(r,e,k(t));return new Xr(i,s=>tn(r,s))}async function Ud(n,e,t){const r=k(n);await vt(!1,r,"phone");const i=await Qr(r.auth,e,k(t));return new Xr(i,s=>Sa(r,s))}async function Qr(n,e,t){var r;if(!n._getRecaptchaConfig())try{await ta(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const s=i.session;if("phoneNumber"in i){g(s.type==="enroll",n,"internal-error");const a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await ce(n,a,"mfaSmsEnrollment",async(f,h)=>{if(h.phoneEnrollmentInfo.captchaResponse===Ne){g(t?.type===Ue,f,"argument-error");const u=await jt(f,h,t);return On(f,u)}return On(f,h)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneSessionInfo.sessionInfo}else{g(s.type==="signin",n,"internal-error");const a=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;g(a,n,"missing-multi-factor-info");const c={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await ce(n,c,"mfaSmsSignIn",async(h,u)=>{if(u.phoneSignInInfo.captchaResponse===Ne){g(t?.type===Ue,h,"argument-error");const m=await jt(h,u,t);return Nn(h,m)}return Nn(h,u)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await ce(n,s,"sendVerificationCode",async(d,f)=>{if(f.captchaResponse===Ne){g(t?.type===Ue,d,"argument-error");const h=await jt(d,f,t);return Cn(d,h)}return Cn(d,f)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t?._reset()}}async function jt(n,e,t){g(t.type===Ue,n,"argument-error");const r=await t.verify();g(typeof r=="string",n,"argument-error");const i=Object.assign({},e);if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,l=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:a,clientType:c,recaptchaVersion:l}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:a,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
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
 */function Ke(n,e){return e?q(e):(g(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class sn extends gt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ye(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ye(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ye(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function oc(n){return Wr(n.auth,new sn(n),n.bypassAuthState)}function ac(n){const{auth:e,user:t}=n;return g(t,e,"internal-error"),Aa(t,new sn(n),n.bypassAuthState)}async function cc(n){const{auth:e,user:t}=n;return g(t,e,"internal-error"),Br(t,new sn(n),n.bypassAuthState)}/**
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
 */class Zr{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return oc;case"linkViaPopup":case"linkViaRedirect":return cc;case"reauthViaPopup":case"reauthViaRedirect":return ac;default:V(this.auth,"internal-error")}}resolve(e){Y(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Y(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const lc=new Ge(2e3,1e4);async function Md(n,e,t){if(N(n.app))return Promise.reject(F(n,"operation-not-supported-in-this-environment"));const r=D(n);ft(n,e,Te);const i=Ke(r,t);return new ie(r,"signInViaPopup",e,i).executeNotNull()}async function Fd(n,e,t){const r=k(n);ft(r.auth,e,Te);const i=Ke(r.auth,t);return new ie(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class ie extends Zr{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,ie.currentPopupAction&&ie.currentPopupAction.cancel(),ie.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return g(e,this.auth,"internal-error"),e}async onExecution(){Y(this.filter.length===1,"Popup operations only handle one event");const e=_t();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ie.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lc.get())};e()}}ie.currentPopupAction=null;/**
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
 */const dc="pendingRedirect",rt=new Map;class uc extends Zr{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=rt.get(this.auth._key());if(!e){try{const r=await hc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}rt.set(this.auth._key(),e)}return this.bypassAuthState||rt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function hc(n,e){const t=ni(e),r=ti(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function ei(n,e){return ti(n)._set(ni(e),"true")}function fc(n,e){rt.set(n._key(),e)}function ti(n){return q(n._redirectPersistence)}function ni(n){return tt(dc,n.config.apiKey,n.name)}/**
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
 */function Bd(n,e,t){return pc(n,e,t)}async function pc(n,e,t){if(N(n.app))return Promise.reject(U(n));const r=D(n);ft(n,e,Te),await r._initializationPromise;const i=Ke(r,t);return await ei(i,r),i._openRedirect(r,e,"signInViaRedirect")}function Wd(n,e,t){return gc(n,e,t)}async function gc(n,e,t){const r=k(n);ft(r.auth,e,Te),await r.auth._initializationPromise;const i=Ke(r.auth,t);await vt(!1,r,e.providerId),await ei(i,r.auth);const s=await mc(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function Vd(n,e){return await D(n)._initializationPromise,ri(n,e,!1)}async function ri(n,e,t=!1){if(N(n.app))return Promise.reject(U(n));const r=D(n),i=Ke(r,e),a=await new uc(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}async function mc(n){const e=_t(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
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
 */const yc=600*1e3;class vc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!bc(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!ii(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(F(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yc&&this.cachedEventUids.clear(),this.cachedEventUids.has(Dn(e))}saveEventToCache(e){this.cachedEventUids.add(Dn(e)),this.lastProcessedEventTime=Date.now()}}function Dn(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ii({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function bc(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ii(n);default:return!1}}/**
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
 */async function wc(n,e={}){return L(n,"GET","/v1/projects",e)}/**
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
 */const _c=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ic=/^https?/;async function Ec(n){if(n.config.emulator)return;const{authorizedDomains:e}=await wc(n);for(const t of e)try{if(Tc(t))return}catch{}V(n,"unauthorized-domain")}function Tc(n){const e=Be(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Ic.test(t))return!1;if(_c.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Ac=new Ge(3e4,6e4);function Un(){const n=R().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Sc(n){return new Promise((e,t)=>{var r,i,s;function a(){Un(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Un(),t(F(n,"network-request-failed"))},timeout:Ac.get()})}if(!((i=(r=R().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=R().gapi)===null||s===void 0)&&s.load)a();else{const c=Lr("iframefcb");return R()[c]=()=>{gapi.load?a():t(F(n,"network-request-failed"))},en(`${zo()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw it=null,e})}let it=null;function xc(n){return it=it||Sc(n),it}/**
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
 */const Pc=new Ge(5e3,15e3),kc="__/auth/iframe",Cc="emulator/auth/iframe",Rc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Oc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jc(n){const e=n.config;g(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Qt(e,Cc):`https://${n.config.authDomain}/${kc}`,r={apiKey:e.apiKey,appName:n.name,v:He},i=Oc.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ee(r).slice(1)}`}async function Lc(n){const e=await xc(n),t=R().gapi;return g(t,n,"internal-error"),e.open({where:document.body,url:jc(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Rc,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=F(n,"network-request-failed"),c=R().setTimeout(()=>{s(a)},Pc.get());function l(){R().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}/**
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
 */const Nc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Dc=500,Uc=600,Mc="_blank",Fc="http://localhost";class Mn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Bc(n,e,t,r=Dc,i=Uc){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Nc),{width:r.toString(),height:i.toString(),top:s,left:a}),d=M().toLowerCase();t&&(c=xr(d)?Mc:t),Ar(d)&&(e=e||Fc,l.scrollbars="yes");const f=Object.entries(l).reduce((u,[m,E])=>`${u}${m}=${E},`,"");if(Do(d)&&c!=="_self")return Wc(e||"",c),new Mn(null);const h=window.open(e||"",c,f);g(h,n,"popup-blocked");try{h.focus()}catch{}return new Mn(h)}function Wc(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Vc="__/auth/handler",$c="emulator/auth/handler",Hc=encodeURIComponent("fac");async function Fn(n,e,t,r,i,s){g(n.config.authDomain,n,"auth-domain-config-required"),g(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:He,eventId:i};if(e instanceof Te){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",ts(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,h]of Object.entries({}))a[f]=h}if(e instanceof Ae){const f=e.getScopes().filter(h=>h!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),d=l?`#${Hc}=${encodeURIComponent(l)}`:"";return`${Gc(n)}?${Ee(c).slice(1)}${d}`}function Gc({config:n}){return n.emulator?Qt(n,$c):`https://${n.authDomain}/${Vc}`}/**
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
 */const Lt="webStorageSupport";class zc{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qr,this._completeRedirectFn=ri,this._overrideRedirectResult=fc}async _openPopup(e,t,r,i){var s;Y((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Fn(e,t,r,Be(),i);return Bc(e,a,_t())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Fn(e,t,r,Be(),i);return Ha(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Y(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Lc(e),r=new vc(e);return t.register("authEvent",i=>(g(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Lt,{type:Lt},i=>{var s;const a=(s=i?.[0])===null||s===void 0?void 0:s[Lt];a!==void 0&&t(!!a),V(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ec(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Or()||Sr()||Zt()}}const qc=zc;var Bn="@firebase/auth",Wn="1.10.8";/**
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
 */class Kc{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){g(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Yc(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Jc(n){Me(new _e("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;g(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jr(n)},d=new Vo(r,i,s,l);return ra(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Me(new _e("auth-internal",e=>{const t=D(e.getProvider("auth").getImmediate());return(r=>new Kc(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pe(Bn,Wn,Yc(n)),pe(Bn,Wn,"esm2017")}/**
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
 */const Xc=300,Qc=cr("authIdTokenMaxAge")||Xc;let Vn=null;const Zc=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Qc)return;const i=t?.token;Vn!==i&&(Vn=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function el(n=ro()){const e=hr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=na(n,{popupRedirectResolver:qc,persistence:[Za,Wa,qr]}),r=cr("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=Zc(s.toString());Da(t,a,()=>a(t.currentUser)),Na(t,c=>a(c))}}const i=Fi("auth");return i&&ia(t,`http://${i}`),t}function tl(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}$o({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=F("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",tl().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Jc("Browser");const nl=fr(ki),Nt=el(nl),rl="modulepreload",il=function(n,e){return new URL(n,e).href},$n={},Se=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){let d=function(f){return Promise.all(f.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const a=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=c?.nonce||c?.getAttribute("nonce");i=d(t.map(f=>{if(f=il(f,r),f in $n)return;$n[f]=!0;const h=f.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(r)for(let E=a.length-1;E>=0;E--){const v=a[E];if(v.href===f&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${u}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":rl,h||(m.as="script"),m.crossOrigin="",m.href=f,l&&m.setAttribute("nonce",l),document.head.appendChild(m),h)return new Promise((E,v)=>{m.addEventListener("load",E),m.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${f}`)))})}))}function s(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return i.then(a=>{for(const c of a||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})};/*! Capacitor: https://capacitorjs.com/ - MIT License */var Ie;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Ie||(Ie={}));class Dt extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const sl=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},ol=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},i=()=>e!==null?e.name:sl(n),s=()=>i()!=="web",a=h=>{const u=d.get(h);return!!(u?.platforms.has(i())||c(h))},c=h=>{var u;return(u=t.PluginHeaders)===null||u===void 0?void 0:u.find(m=>m.name===h)},l=h=>n.console.error(h),d=new Map,f=(h,u={})=>{const m=d.get(h);if(m)return console.warn(`Capacitor plugin "${h}" already registered. Cannot register plugins twice.`),m.proxy;const E=i(),v=c(h);let w;const b=async()=>(!w&&E in u?w=typeof u[E]=="function"?w=await u[E]():w=u[E]:e!==null&&!w&&"web"in u&&(w=typeof u.web=="function"?w=await u.web():w=u.web),w),_=(I,S)=>{var O,B;if(v){const Q=v?.methods.find($=>S===$.name);if(Q)return Q.rtype==="promise"?$=>t.nativePromise(h,S.toString(),$):($,Ye)=>t.nativeCallback(h,S.toString(),$,Ye);if(I)return(O=I[S])===null||O===void 0?void 0:O.bind(I)}else{if(I)return(B=I[S])===null||B===void 0?void 0:B.bind(I);throw new Dt(`"${h}" plugin is not implemented on ${E}`,Ie.Unimplemented)}},T=I=>{let S;const O=(...B)=>{const Q=b().then($=>{const Ye=_($,I);if(Ye){const Je=Ye(...B);return S=Je?.remove,Je}else throw new Dt(`"${h}.${I}()" is not implemented on ${E}`,Ie.Unimplemented)});return I==="addListener"&&(Q.remove=async()=>S()),Q};return O.toString=()=>`${I.toString()}() { [capacitor code] }`,Object.defineProperty(O,"name",{value:I,writable:!1,configurable:!1}),O},C=T("addListener"),y=T("removeListener"),A=(I,S)=>{const O=C({eventName:I},S),B=async()=>{const $=await O;y({eventName:I,callbackId:$},S)},Q=new Promise($=>O.then(()=>$({remove:B})));return Q.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await B()},Q},x=new Proxy({},{get(I,S){switch(S){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?A:C;case"removeListener":return y;default:return T(S)}}});return r[h]=x,d.set(h,{name:h,proxy:x,platforms:new Set([...Object.keys(u),...v?[E]:[]])}),x};return t.convertFileSrc||(t.convertFileSrc=h=>h),t.getPlatform=i,t.handleError=l,t.isNativePlatform=s,t.isPluginAvailable=a,t.registerPlugin=f,t.Exception=Dt,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},al=n=>n.Capacitor=ol(n),be=al(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Et=be.registerPlugin;class si{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const s=this.windowListeners[e];s&&!s.registered&&this.addWindowListener(s),r&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,t);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const i=this.listeners[e];if(!i){if(r){let s=this.retainedEventArguments[e];s||(s=[]),s.push(t),this.retainedEventArguments[e]=s}return}i.forEach(s=>s(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new be.Exception(e,Ie.Unimplemented)}unavailable(e="not available"){return new be.Exception(e,Ie.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const i=r.indexOf(t);this.listeners[e].splice(i,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const Hn=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Gn=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class cl extends si{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[i,s]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=Gn(i).trim(),s=Gn(s).trim(),t[i]=s}),t}async setCookie(e){try{const t=Hn(e.key),r=Hn(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,s=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${i}; path=${s}; ${a};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Et("CapacitorCookies",{web:()=>new cl});const ll=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const i=r.result;e(i.indexOf(",")>=0?i.split(",")[1]:i)},r.onerror=i=>t(i),r.readAsDataURL(n)}),dl=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,s,a)=>(i[s]=n[e[a]],i),{})},ul=(n,e=!0)=>n?Object.entries(n).reduce((r,i)=>{const[s,a]=i;let c,l;return Array.isArray(a)?(l="",a.forEach(d=>{c=e?encodeURIComponent(d):d,l+=`${s}=${c}&`}),l.slice(0,-1)):(c=e?encodeURIComponent(a):a,l=`${s}=${c}`),`${r}&${l}`},"").substr(1):null,hl=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),i=dl(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[a,c]of Object.entries(n.data||{}))s.set(a,c);t.body=s.toString()}else if(i.includes("multipart/form-data")||n.data instanceof FormData){const s=new FormData;if(n.data instanceof FormData)n.data.forEach((c,l)=>{s.append(l,c)});else for(const c of Object.keys(n.data))s.append(c,n.data[c]);t.body=s;const a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(i.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class fl extends si{async request(e){const t=hl(e,e.webFetchExtra),r=ul(e.params,e.shouldEncodeUrlParams),i=r?`${e.url}?${r}`:e.url,s=await fetch(i,t),a=s.headers.get("content-type")||"";let{responseType:c="text"}=s.ok?e:{};a.includes("application/json")&&(c="json");let l,d;switch(c){case"arraybuffer":case"blob":d=await s.blob(),l=await ll(d);break;case"json":l=await s.json();break;case"document":case"text":default:l=await s.text()}const f={};return s.headers.forEach((h,u)=>{f[u]=h}),{data:l,headers:f,status:s.status,url:s.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Et("CapacitorHttp",{web:()=>new fl});var zn;(function(n){n.IndexedDbLocal="INDEXED_DB_LOCAL",n.InMemory="IN_MEMORY",n.BrowserLocal="BROWSER_LOCAL",n.BrowserSession="BROWSER_SESSION"})(zn||(zn={}));var qn;(function(n){n.APPLE="apple.com",n.FACEBOOK="facebook.com",n.GAME_CENTER="gc.apple.com",n.GITHUB="github.com",n.GOOGLE="google.com",n.MICROSOFT="microsoft.com",n.PLAY_GAMES="playgames.google.com",n.TWITTER="twitter.com",n.YAHOO="yahoo.com",n.PASSWORD="password",n.PHONE="phone"})(qn||(qn={}));const fe=Et("FirebaseAuthentication",{web:()=>Se(()=>import("./web-D0zBYph8.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(n=>new n.FirebaseAuthenticationWeb)}),oi=p.createContext(null),pl=({children:n})=>{const[e,t]=p.useState(null),[r,i]=p.useState(null),[s,a]=p.useState(!0),[c,l]=p.useState(!1),f=ut()?.socket;p.useEffect(()=>{if(f&&e)return f.on("balanceUpdated",v=>{if(console.log("[AuthContext] Received balanceUpdated event:",v),v&&typeof v.balance=="number"){console.log(`[AuthContext] Updating user balance from ${e?.balance} to ${v.balance}`);const w={...e,balance:v.balance};t(w)}else console.warn("[AuthContext] Received invalid balance data:",v)}),()=>{f.off("balanceUpdated")}},[f,e]);const h=async v=>{if(!v)return null;try{const w=await fetch(`${tr}/auth/me`,{headers:{Authorization:`Bearer ${v}`,"Content-Type":"application/json"}});return w.ok?(await w.json()).user:null}catch(w){return console.error("[Auth] Error fetching user data:",w),null}};p.useEffect(()=>{const v=be.isNativePlatform(),w=async _=>{if(!_){t(null),i(null),a(!1);return}i(_);const T=await h(_);T?t(T):(t(null),i(null)),a(!1)};if(v){const _=fe.addListener("authStateChange",async T=>{if(T.user){const C=await fe.getIdToken();await w(C.token)}else await w(null)});return fe.getCurrentUser().then(async T=>{if(T.user){const C=await fe.getIdToken();await w(C.token)}else a(!1)}),()=>_.remove()}const b=Ua(Nt,async _=>{if(_){const T=await _.getIdToken();await w(T)}else await w(null)});return()=>b()},[]);const u=async(v,w)=>{t(v),i(w),l(!0);const b=await h(w);b&&t(b)},m=p.useCallback(async()=>{await(be.isNativePlatform()?fe.signOut():Ma(Nt)),t(null),i(null),l(!1)},[]),E=p.useCallback(async()=>{const w=be.isNativePlatform()?(await fe.getIdToken({forceRefresh:!0})).token:await Nt.currentUser?.getIdToken(!0);if(!w){m();return}i(w);const b=await h(w);b?t(b):m()},[m]);return s?null:o.jsx(oi.Provider,{value:{user:e,token:r,login:u,logout:m,refreshUserData:E,loading:s},children:n})},Tt=()=>{const n=p.useContext(oi);if(!n)throw new Error("useAuth must be used within an AuthProvider");return n},ai=p.createContext(null),gl=({children:n})=>{const{socket:e}=ut(),{token:t}=Tt(),[r,i]=p.useState(new Map),s=p.useRef(new Set),a=p.useRef(null);p.useEffect(()=>{if(!e)return;const u=({userId:m,data:E})=>{i(v=>{const w=new Map(v);return w.set(m,E),w})};return e.on("userDataUpdated",u),()=>{e.off("userDataUpdated",u)}},[e]),p.useEffect(()=>()=>{a.current&&clearTimeout(a.current)},[]);const c=p.useCallback(async u=>{if(!u||u.length===0||!t)return{};try{const m=await fetch(`${tr}/users`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({userIds:u})});if(!m.ok)throw new Error("Failed to fetch users data");const E=await m.json();return i(v=>{const w=new Map(v);return Object.entries(E).forEach(([b,_])=>{w.set(b,_)}),w}),E}catch{return{}}},[t]),l=p.useCallback(()=>{if(s.current.size===0)return;const u=Array.from(s.current);s.current.clear(),c(u)},[c]),d=p.useCallback(u=>{if(!u)return null;const m=r.get(u);return m||(s.current.add(u),a.current&&clearTimeout(a.current),a.current=setTimeout(()=>{l()},10),null)},[r,l]),f=p.useCallback(u=>{const m=u.filter(E=>!r.has(E));m.length>0&&c(m)},[r,c]),h={getUserData:d,prefetchUsers:f};return o.jsx(ai.Provider,{value:h,children:n})},$d=n=>{const e=p.useContext(ai);if(!e)throw new Error("useUserData must be used within UserDataProvider");return e.getUserData(n)};var ml=_i();class yl{constructor(){this.sounds={},this.muted=!1,this.initialized=!1,this.categories=["ui"],this.lastPlayedTime={},this.debounceTime=500,this.audioUnlocked=!1,this.API_URL="https://api.in-between.live",typeof window<"u"&&setTimeout(()=>{this.initialize(),this._setupMobileAudioUnlock()},0)}initialize(){this.initialized||(this.loadCategory("ui"),this.initialized=!0)}loadCategory(e){if(this.sounds[e])return;const t={};e==="ui"&&(t.join=[0,500],t.leave=[500,1e3],t.alert=[1500,1500]),this.sounds[e]=new ml.Howl({src:[`${this.API_URL}/assets/audio/${e}-sounds.mp3`,`${this.API_URL}/assets/audio/${e}-sounds.webm`],sprite:t,preload:!0,html5:this._isMobileDevice(),format:["mp3","webm"],pool:10})}play(e,t=1){if(this.muted)return;this.initialized||this.initialize();let r,i;if(e.includes(".")?[r,i]=e.split("."):(r="ui",i=e),!this.sounds[r]){this.loadCategory(r);return}const s=`${r}.${i}`,a=Date.now(),c=this.lastPlayedTime[s]||0;if(!(a-c<this.debounceTime))return this.lastPlayedTime[s]=a,this.sounds[r].volume(t),this.sounds[r].play(i)}setMuted(e){this.muted=e,Object.values(this.sounds).forEach(t=>{t&&t.mute&&t.mute(e)})}syncWithPreferences(e){e&&typeof e.muted<"u"&&this.setMuted(e.muted)}_setupMobileAudioUnlock(){if(typeof window>"u"||!this._isMobileDevice())return;const e=()=>{if(this.audioUnlocked)return;const t=new Audio;t.src="data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAQAAAAAAAAAAABSAJAJAQgAAgAAAAiIkfC3/////////////////////",t.load(),t.play().then(()=>{this.audioUnlocked=!0,document.body.removeEventListener("touchstart",e),document.body.removeEventListener("touchend",e),document.body.removeEventListener("click",e)}).catch(()=>{})};document.body.addEventListener("touchstart",e,!1),document.body.addEventListener("touchend",e,!1),document.body.addEventListener("click",e,!1)}_isMobileDevice(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1}}const Gt=new yl,ci=p.createContext(null),li=n=>{if(!n)return null;const e="https://api.in-between.live";if(n.startsWith("http"))return n;if(n.startsWith("/files/"))return`${e}${n}`;if(n.includes("/uploads/")){const t=n.split("/"),r=t.pop(),i=t[t.length-1];return`${e}/files/${i}/${r}`}return`${e}${n}`},Kn=n=>n?{...n,profileImg:li(n.profileImg)}:{},vl=({children:n})=>{const[e,t]=p.useState({profileImg:null,autoAnte:!1,muted:!1,selectedTitle:null}),[r,i]=p.useState(!0),{user:s,token:a}=Tt(),c=Qn.useCallback(async()=>{if(!s){t({autoAnte:!1}),i(!1);return}try{i(!0);const m="https://api.in-between.live";if(!a){console.error("[Preferences] No token available"),i(!1);return}const E=await fetch(`${m}/preferences`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}});if(!E.ok)throw new Error("Failed to load preferences");const v=await E.json(),b=Kn(v)||{autoAnte:!1,muted:!1};t(b),typeof b.muted<"u"&&Gt.setMuted(b.muted)}catch(m){console.error("[Preferences] Error loading preferences:",m),t({autoAnte:!1})}finally{i(!1)}},[s,a]);p.useEffect(()=>{s&&c()},[s,c]);const l=async(m,E)=>{if(!s)return console.error("[Preferences] Cannot update preferences: User not logged in"),!1;try{const v="https://api.in-between.live";if(!a)return console.error("[Preferences] No token available"),!1;t(T=>({...T,[m]:E})),m==="muted"&&Gt.setMuted(E);const w=await fetch(`${v}/preferences/${m}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({value:E})});if(!w.ok)throw new Error(`Failed to update ${m} preference`);const b=await w.json(),_=Kn(b);return t(_),!0}catch(v){return console.error(`[Preferences] Error updating ${m}:`,v),await c(),!1}},d=()=>{const m=!e.autoAnte;return l("autoAnte",m)},f=()=>{const m=!e.muted;return l("muted",m)},h=m=>l("selectedTitle",m),u=async m=>{if(!m)return console.error("[Preferences] No file provided for profile image upload"),!1;try{const E=new FormData;E.append("file",m);const v="https://api.in-between.live";if(!a)return console.error("[Preferences] No token available"),!1;const w=await fetch(`${v}/preferences/profileImg`,{method:"POST",headers:{Authorization:`Bearer ${a}`},body:E}),b=await w.text();if(!w.ok)throw new Error(`Failed to upload profile image: ${b}`);const _=b?JSON.parse(b):{},T=li(_.fileUrl);return t(C=>({...C,profileImg:T})),!0}catch(E){return console.error("[Preferences] Error uploading profile image:",E),!1}};return o.jsx(ci.Provider,{value:{preferences:e,updatePreference:l,toggleAutoAnte:d,toggleMute:f,updateSelectedTitle:h,uploadProfileImg:u,loading:r},children:n})},Hd=()=>{const n=p.useContext(ci);if(!n)throw new Error("usePreferences must be used within a PreferencesProvider");return n},di=p.createContext(),bl=({children:n})=>{const t=p.useMemo(()=>({showAds:!0}),[!0]);return o.jsx(di.Provider,{value:t,children:n})},Gd=()=>{const n=p.useContext(di);if(!n)throw new Error("useAds must be used within AdProvider");return n},wl="_toast_1g2ii_1",_l="_slideOut_1g2ii_32",Il="_iconWrapper_1g2ii_47",El="_icon_1g2ii_47",Tl="_emojiIcon_1g2ii_62",Al="_content_1g2ii_76",Sl="_title_1g2ii_83",xl="_message_1g2ii_90",Pl="_emojiMessage_1g2ii_98",kl="_playerName_1g2ii_105",Cl="_reactionText_1g2ii_111",Rl="_emojiReaction_1g2ii_117",Ol="_closeButton_1g2ii_135",W={toast:wl,slideOut:_l,iconWrapper:Il,icon:El,emojiIcon:Tl,content:Al,title:Sl,message:xl,emojiMessage:Pl,playerName:kl,reactionText:Cl,emojiReaction:Rl,closeButton:Ol},jl="_username_1shc8_1",Ll="_discriminator_1shc8_6",Yn={username:jl,discriminator:Ll};function ui(n){if(!n)return{base:"",discriminator:null,full:""};const e=n.split("#");return e.length===2&&/^\d{4}$/.test(e[1])?{base:e[0],discriminator:e[1],full:n}:{base:n,discriminator:null,full:n}}function Nl(n,e=!1){const{base:t,discriminator:r}=ui(n);return e&&r?`${t}#${r}`:t}function Dl(n){const{discriminator:e}=ui(n);return e}const Ul=({username:n,showDiscriminator:e=!1,className:t=""})=>{if(!n)return null;const r=Nl(n),i=Dl(n);return o.jsxs("span",{className:`${Yn.username} ${t}`,children:[r,e&&i&&o.jsxs("span",{className:Yn.discriminator,children:["#",i]})]})},Ml=({title:n,message:e,emoji:t="ℹ",color:r="#3498db",duration:i=4e3,onClose:s,position:a})=>{const[c,l]=p.useState(!0);p.useEffect(()=>{if(i>0){const f=setTimeout(()=>{l(!1),setTimeout(s,300)},i);return()=>clearTimeout(f)}},[i,s]);const d=!n&&t!=="ℹ";return o.jsxs("div",{className:`${W.toast} ${d&&c?W.emojiReaction:""} ${c?"":W.slideOut}`,style:{top:"max(20px, var(--safe-area-inset-top))",zIndex:1e4+a,borderColor:r},children:[o.jsx("div",{className:W.iconWrapper,children:o.jsx("span",{className:`${W.icon} ${d?W.emojiIcon:""}`,style:{color:r,textShadow:d?`0 0 20px ${r}, 0 0 40px ${r}60`:`0 0 8px ${r}80`},children:t})}),o.jsxs("div",{className:W.content,children:[n&&o.jsx("div",{className:W.title,children:n}),o.jsx("div",{className:`${W.message} ${d?W.emojiMessage:""}`,children:d?o.jsxs(o.Fragment,{children:[o.jsx("span",{className:W.playerName,children:o.jsx(Ul,{username:e})}),o.jsx("span",{className:W.reactionText,children:"reacted!"})]}):e})]}),o.jsx("button",{type:"button",className:W.closeButton,onClick:s,"aria-label":"Close notification",children:"×"})]})},hi=p.createContext(),zd=()=>{const n=p.useContext(hi);if(!n)throw new Error("useToast must be used within a ToastProvider");return n},Fl=({children:n})=>{const[e,t]=p.useState([]),[r,i]=p.useState([]),[s,a]=p.useState(0),{socket:c}=ut(),l=p.useCallback((b,_,T="ℹ",C="#3498db",y=4e3)=>{const A=Date.now()+Math.random(),x={id:A,title:b,message:_,emoji:T,color:C,duration:y},I=Date.now();return I-s>=600?(t(O=>[...O,x]),a(I)):i(O=>[...O,x]),A},[s]),d=p.useCallback(b=>{t(_=>_.filter(T=>T.id!==b))},[]),f=p.useCallback((b,_,T)=>l(b,_,"✓","#27ae60",T),[l]),h=p.useCallback((b,_,T)=>l(b,_,"✕","#e74c3c",T),[l]),u=p.useCallback((b,_,T)=>l(b,_,"⚠","#f39c12",T),[l]),m=p.useCallback((b,_,T)=>l(b,_,"ℹ","#3498db",T),[l]),E=p.useCallback((b,_,T)=>l(b,_,"🎮","#9b59b6",T),[l]),v=p.useCallback((b,_,T)=>l(b,_,"💰","#16a085",T),[l]);p.useEffect(()=>{if(r.length===0)return;const b=setTimeout(()=>{const _=r[0];i(T=>T.slice(1)),t(T=>[...T,_]),a(Date.now())},600);return()=>clearTimeout(b)},[r,e]),p.useEffect(()=>{if(!c)return;const b=_=>{l(_.title||"",_.message,_.emoji||"ℹ",_.color||"#3498db",_.duration)};return c.on("toast",b),()=>{c.off("toast",b)}},[c,l]);const w={addToast:l,removeToast:d,showSuccess:f,showError:h,showWarning:u,showInfo:m,showGameEvent:E,showMoneyEvent:v,toasts:e};return o.jsxs(hi.Provider,{value:w,children:[n,o.jsx("div",{className:"toast-container",style:{position:"fixed",top:0,right:0,zIndex:1e4},children:e.map((b,_)=>o.jsx(Ml,{title:b.title,message:b.message,emoji:b.emoji,color:b.color,duration:b.duration,position:_,onClose:()=>d(b.id)},b.id))})]})},Bl=()=>{const[n,e]=p.useState(!1),[t,r]=p.useState(null),[i,s]=p.useState("text"),[a,c]=p.useState(""),[l,d]=p.useState(!1);p.useEffect(()=>{const v=()=>{const b=document.body.classList.contains("gamepad-navigation-active");d(b)};v();const w=new MutationObserver(v);return w.observe(document.body,{attributes:!0,attributeFilter:["class"]}),()=>w.disconnect()},[]);const f=p.useCallback((v,w="text",b="")=>{v&&(r(v),s(w),c(b),e(!0),v.blur())},[]),h=p.useCallback(()=>{e(!1),r(null),s("text"),c("")},[]),u=p.useCallback(v=>{if(!t)return;Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,v||"");const b=new Event("input",{bubbles:!0});t.dispatchEvent(b);const _=new Event("change",{bubbles:!0});t.dispatchEvent(_),h()},[t,h]),m=p.useCallback((v,w="text",b="")=>{if(!v)return;let _=v;v.querySelector&&v.querySelector("input")&&(_=v.querySelector("input"));const T=C=>{l&&document.body.classList.contains("gamepad-navigation-active")&&(C.preventDefault(),f(_,w,b))};return _.addEventListener("click",T),()=>{_.removeEventListener("click",T)}},[l,f]),E=p.useCallback(()=>t?.value||"",[t]);return{isVisible:n,inputType:i,keyboardTitle:a,currentInput:t,isGamepadActive:l,showKeyboard:f,hideKeyboard:h,handleEnter:u,enhanceInput:m,getCurrentInputValue:E}},fi=p.createContext(),qd=()=>{const n=p.useContext(fi);if(!n)throw new Error("useVirtualKeyboardContext must be used within a VirtualKeyboardProvider");return n},Wl=({children:n})=>{const e=Bl(),{isVisible:t,inputType:r,hideKeyboard:i,handleEnter:s,getCurrentInputValue:a}=e;return o.jsxs(fi.Provider,{value:e,children:[n,t&&o.jsx(VirtualKeyboard,{isVisible:t,inputType:r,initialValue:a(),onClose:i,onEnter:s})]})},pi=p.createContext(),Kd=()=>p.useContext(pi),Vl=({children:n})=>{const{socket:e,isConnected:t}=ut(),[r,i]=p.useState([]),[s,a]=p.useState(!0),[c,l]=p.useState(null);p.useEffect(()=>{if(!e||!t)return;const f=u=>{i(u),a(!1)},h=u=>{console.error("[LobbyContext] Socket error:",u.message||u),l(u.message||"An error occurred"),a(!1)};return e.on("gameList",f),e.on("error",h),e.emit("getGameList"),()=>{e.off("gameList",f),e.off("error",h)}},[e,t]);const d={gameList:r,loading:s,error:c};return o.jsx(pi.Provider,{value:d,children:n})},$l="_loadingScreen_16l5s_1",Hl="_loadingContainer_16l5s_10",Gl="_spinner_16l5s_21",zl="_message_16l5s_31",Ze={loadingScreen:$l,loadingContainer:Hl,spinner:Gl,message:zl},Oe=({message:n="Loading..."})=>o.jsx("div",{className:Ze.loadingScreen,children:o.jsxs("div",{className:Ze.loadingContainer,children:[o.jsx("div",{className:Ze.spinner}),o.jsx("p",{className:Ze.message,children:n})]})}),ql="_legalPage_hiva8_3",Kl="_container_hiva8_12",Yl="_lastUpdated_hiva8_25",Jl="_footer_hiva8_89",se={legalPage:ql,container:Kl,lastUpdated:Yl,footer:Jl};function Xl(){return p.useEffect(()=>{document.title="Terms of Service | In-Between";let n=document.querySelector('meta[name="description"]');n||(n=document.createElement("meta"),n.name="description",document.head.appendChild(n)),n.content="Terms of Service for In-Between card game platform. Read our user agreement, eligibility requirements, and acceptable use policy.",window.scrollTo(0,0)},[]),o.jsx("article",{className:se.legalPage,children:o.jsxs("div",{className:se.container,children:[o.jsx("h1",{children:"Terms of Service"}),o.jsx("p",{className:se.lastUpdated,children:o.jsx("em",{children:"Last Updated: October 31, 2025"})}),o.jsxs("section",{children:[o.jsx("h2",{children:"1. Introduction and Acceptance"}),o.jsx("p",{children:'Welcome to In-Between, a multiplayer card game platform operated by Applied Method, LLC ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.'}),o.jsx("p",{children:"These Terms constitute a legally binding agreement between you and Applied Method, LLC. Your continued use of the Service indicates your acceptance of these Terms and any future modifications."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"2. Eligibility"}),o.jsx("p",{children:"You must be at least 13 years old to use the Service. By using the Service, you represent and warrant that you are at least 13 years old. If you are under 13, you are not permitted to use the Service."}),o.jsx("p",{children:"If we discover that a user is under 13 years old, we will immediately terminate their account and delete their personal information in accordance with applicable law."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"3. Account Registration and Security"}),o.jsx("p",{children:"To access certain features of the Service, you may be required to create an account using one of our supported social login providers (Google, Facebook, or Apple). You agree to:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Provide accurate and complete information during registration"}),o.jsx("li",{children:"Maintain the security of your account credentials"}),o.jsx("li",{children:"Notify us immediately of any unauthorized access to your account"}),o.jsx("li",{children:"Accept responsibility for all activities that occur under your account"}),o.jsx("li",{children:"Not share your account with others or allow others to access your account"})]}),o.jsx("p",{children:"We reserve the right to suspend or terminate accounts that violate these Terms or engage in suspicious activity."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"4. Acceptable Use Policy"}),o.jsx("p",{children:"You agree to use the Service in a manner consistent with all applicable laws and regulations. We actively moderate content and reserve the right to review and remove inappropriate content, including usernames, profile pictures, and chat messages."}),o.jsx("p",{children:o.jsx("strong",{children:"Prohibited activities include, but are not limited to:"})}),o.jsxs("ul",{children:[o.jsx("li",{children:"Harassment, bullying, or abusive behavior toward other users"}),o.jsx("li",{children:"Using offensive, inappropriate, or misleading usernames"}),o.jsx("li",{children:"Uploading inappropriate or offensive profile pictures"}),o.jsx("li",{children:"Cheating, exploiting bugs, or manipulating game mechanics for unfair advantage"}),o.jsx("li",{children:"Attempting to gain unauthorized access to other accounts or our systems"}),o.jsx("li",{children:"Using automated scripts, bots, or other tools to interact with the Service"}),o.jsx("li",{children:"Spamming, advertising, or soliciting other users for commercial purposes"}),o.jsx("li",{children:"Posting or sharing illegal, harmful, or malicious content"}),o.jsx("li",{children:"Impersonating other users, moderators, or Applied Method, LLC representatives"})]}),o.jsx("p",{children:"Violation of this Acceptable Use Policy may result in content removal, account suspension, or permanent termination without notice or refund."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"5. Virtual Currency and Purchases"}),o.jsx("p",{children:"The Service may offer virtual currency, cosmetic items, or other digital goods for purchase. All purchases are final and non-refundable except where required by law."}),o.jsx("p",{children:o.jsx("strong",{children:"You acknowledge and agree that:"})}),o.jsxs("ul",{children:[o.jsx("li",{children:"Virtual currency and digital items have no real-world monetary value"}),o.jsx("li",{children:"Virtual currency cannot be transferred, exchanged, or redeemed outside the Service"}),o.jsx("li",{children:"We reserve the right to modify prices, offerings, and availability at any time"}),o.jsx("li",{children:"Purchases are subject to the policies of third-party app stores (Apple App Store, Google Play Store)"}),o.jsx("li",{children:"No refunds will be provided for unused virtual currency or items upon account termination"}),o.jsx("li",{children:"We are not responsible for unauthorized purchases made through your account"})]}),o.jsxs("p",{children:["If you believe you have been charged in error, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})," within 30 days of the transaction."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"6. Intellectual Property Rights"}),o.jsx("p",{children:'All content, features, and functionality of the Service, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, software, and the compilation thereof (collectively, "Content"), are owned by Applied Method, LLC and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.'}),o.jsx("p",{children:"We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial use. You may not:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Copy, modify, distribute, sell, or lease any part of the Service"}),o.jsx("li",{children:"Reverse engineer, decompile, or disassemble the Service or its software"}),o.jsx("li",{children:"Remove or modify any copyright, trademark, or other proprietary notices"}),o.jsx("li",{children:"Use the Service for any commercial purpose without our written permission"})]}),o.jsx("p",{children:"By submitting user-generated content (such as usernames, chat messages, or profile pictures), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of operating and improving the Service."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"7. User-Generated Content and Moderation"}),o.jsx("p",{children:"The Service may allow you to create, submit, or display content such as usernames, profile pictures, and chat messages. You retain ownership of your user-generated content, but you grant us the rights described in Section 6."}),o.jsx("p",{children:"We actively moderate content and reserve the right to review, remove, or modify any user-generated content that violates these Terms or is deemed inappropriate. However, we are not obligated to monitor all content and are not responsible for user-generated content."}),o.jsx("p",{children:"You are solely responsible for your content and the consequences of posting it. You represent and warrant that you own or have the necessary rights to post your content and that it does not violate any third-party rights or applicable laws."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"8. Disclaimer of Warranties"}),o.jsx("p",{children:'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.'}),o.jsx("p",{children:"We do not warrant that:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"The Service will be uninterrupted, timely, secure, or error-free"}),o.jsx("li",{children:"The results obtained from using the Service will be accurate or reliable"}),o.jsx("li",{children:"Any errors in the Service will be corrected"}),o.jsx("li",{children:"The Service will meet your requirements or expectations"})]}),o.jsx("p",{children:"We are not responsible for issues caused by third-party services, including social login providers, payment processors, or hosting providers. Your use of the Service is at your sole risk."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"9. Limitation of Liability"}),o.jsx("p",{children:"TO THE MAXIMUM EXTENT PERMITTED BY LAW, APPLIED METHOD, LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE."}),o.jsx("p",{children:"IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER."}),o.jsx("p",{children:"We are not liable for:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Loss or corruption of virtual currency or account data"}),o.jsx("li",{children:"Unauthorized access to your account due to your failure to maintain security"}),o.jsx("li",{children:"Service interruptions or downtime"}),o.jsx("li",{children:"Actions or omissions of third-party service providers"}),o.jsx("li",{children:"Conduct of other users"})]}),o.jsx("p",{children:"Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"10. Indemnification"}),o.jsx("p",{children:"You agree to indemnify, defend, and hold harmless Applied Method, LLC, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Your use or misuse of the Service"}),o.jsx("li",{children:"Your violation of these Terms"}),o.jsx("li",{children:"Your violation of any rights of another person or entity"}),o.jsx("li",{children:"Your user-generated content"}),o.jsx("li",{children:"Your breach of any representation or warranty contained in these Terms"})]}),o.jsx("p",{children:"We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"11. Dispute Resolution and Governing Law"}),o.jsx("p",{children:"These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions."}),o.jsx("p",{children:"Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Delaware, and the arbitrator's decision shall be final and binding."}),o.jsx("p",{children:"You agree to waive any right to a jury trial and to participate in a class action lawsuit against Applied Method, LLC. Each party shall bear its own costs and attorneys' fees, unless otherwise awarded by the arbitrator."}),o.jsx("p",{children:"Notwithstanding the above, either party may seek injunctive or equitable relief in a court of competent jurisdiction to prevent actual or threatened infringement, misappropriation, or violation of intellectual property rights."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"12. Termination"}),o.jsx("p",{children:"We reserve the right to suspend or terminate your account and access to the Service at any time, with or without cause, and with or without notice, for any reason including but not limited to:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Violation of these Terms"}),o.jsx("li",{children:"Fraudulent, abusive, or illegal activity"}),o.jsx("li",{children:"Extended periods of inactivity"}),o.jsx("li",{children:"Requests from law enforcement or government agencies"}),o.jsx("li",{children:"Technical or security issues"})]}),o.jsxs("p",{children:["You may terminate your account at any time by contacting us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),". Upon termination:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"Your right to use the Service will immediately cease"}),o.jsx("li",{children:"Your account data will be deleted in accordance with our Privacy Policy"}),o.jsx("li",{children:"Any unused virtual currency or items will be forfeited without refund"}),o.jsx("li",{children:"Sections of these Terms that by their nature should survive termination will survive"})]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"13. Changes to Terms"}),o.jsx("p",{children:"We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email (to the address associated with your account) or by posting a notice on the Service at least 30 days before the changes take effect."}),o.jsx("p",{children:"Your continued use of the Service after the effective date of the modified Terms constitutes your acceptance of the changes. If you do not agree to the modified Terms, you must stop using the Service and may terminate your account."}),o.jsx("p",{children:"We encourage you to review these Terms periodically to stay informed of any updates."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"14. Miscellaneous"}),o.jsxs("p",{children:[o.jsx("strong",{children:"Entire Agreement:"})," These Terms, together with our Privacy Policy, constitute the entire agreement between you and Applied Method, LLC regarding the Service."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Severability:"})," If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Waiver:"})," Our failure to enforce any right or provision of these Terms will not constitute a waiver of such right or provision."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Assignment:"})," You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign these Terms without restriction."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Contact Information:"})," For questions, concerns, or notices regarding these Terms, please contact us at:"]}),o.jsxs("p",{children:["Applied Method, LLC",o.jsx("br",{}),"1111B S Governors Ave STE 26981",o.jsx("br",{}),"Dover, DE 19904",o.jsx("br",{}),"United States",o.jsx("br",{}),"Email: ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})]})]}),o.jsx("div",{className:se.footer,children:o.jsx("p",{children:"By using In-Between, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service."})})]})})}function Ql(){return p.useEffect(()=>{document.title="Privacy Policy | In-Between";let n=document.querySelector('meta[name="description"]');n||(n=document.createElement("meta"),n.name="description",document.head.appendChild(n)),n.content="Privacy Policy for In-Between card game. Learn how we collect, use, and protect your personal information, and your rights under GDPR and CCPA.",window.scrollTo(0,0)},[]),o.jsx("article",{className:se.legalPage,children:o.jsxs("div",{className:se.container,children:[o.jsx("h1",{children:"Privacy Policy"}),o.jsx("p",{className:se.lastUpdated,children:o.jsx("em",{children:"Last Updated: October 31, 2025"})}),o.jsxs("section",{children:[o.jsx("h2",{children:"1. Introduction"}),o.jsx("p",{children:'Applied Method, LLC ("we," "us," or "our") operates the In-Between card game platform (the "Service"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Service.'}),o.jsx("p",{children:"By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Service."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"2. Information We Collect"}),o.jsx("p",{children:"We collect several types of information to provide and improve our Service."}),o.jsx("h3",{children:"2.1 Personal Information"}),o.jsx("p",{children:"When you create an account or use the Service, we collect:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Email address"})," - Provided by your social login provider (Google, Facebook, or Apple)"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Username"})," - Your chosen display name within the game"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Profile picture"})," - Either uploaded by you or retrieved from your social login provider"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"OAuth provider ID"})," - A unique identifier from Google, Facebook, or Apple used for authentication"]})]}),o.jsx("h3",{children:"2.2 Gameplay Data"}),o.jsx("p",{children:"To provide game functionality and track your progress, we collect:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Game history and match results"}),o.jsx("li",{children:"Win/loss records and player rankings"}),o.jsx("li",{children:"Achievements earned and experience points (XP)"}),o.jsx("li",{children:"In-game purchases and virtual currency balance"}),o.jsx("li",{children:"Chat messages (for moderation purposes)"}),o.jsx("li",{children:"Game preferences and settings"})]}),o.jsx("h3",{children:"2.3 Technical Information"}),o.jsx("p",{children:"We automatically collect certain technical information when you use the Service:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"IP address"}),o.jsx("li",{children:"Device type, model, and operating system"}),o.jsx("li",{children:"Browser type and version"}),o.jsx("li",{children:"Session data and timestamps"}),o.jsx("li",{children:"Cookies and local storage data"}),o.jsx("li",{children:"Error logs and crash reports"})]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"3. How We Use Your Information"}),o.jsx("p",{children:"We use the collected information for the following purposes:"}),o.jsx("h3",{children:"Account Management"}),o.jsx("p",{children:"Creating and maintaining user accounts, authenticating users, and managing account security."}),o.jsx("h3",{children:"Gameplay"}),o.jsx("p",{children:"Providing game functionality, matchmaking, leaderboards, statistics tracking, and achievement systems."}),o.jsx("h3",{children:"Communication"}),o.jsx("p",{children:"Sending service updates, notifications about game events, responding to support requests, and communicating important changes to our Terms or Privacy Policy."}),o.jsx("h3",{children:"Analytics"}),o.jsx("p",{children:"Understanding user behavior, improving game features, identifying bugs, and optimizing the user experience through analytics tools like Google Analytics."}),o.jsx("h3",{children:"Content Moderation"}),o.jsx("p",{children:"Reviewing user-generated content (usernames, profile pictures, chat messages) to enforce our Terms of Service and maintain a safe gaming environment."}),o.jsx("h3",{children:"Monetization"}),o.jsx("p",{children:"Processing in-game purchases, managing virtual currency, and displaying advertisements through Google AdSense (when implemented)."}),o.jsx("h3",{children:"Legal Compliance"}),o.jsx("p",{children:"Complying with legal obligations, protecting our rights, preventing fraud, and responding to legal requests from law enforcement or government agencies."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"4. Third-Party Services"}),o.jsx("p",{children:"We share data with the following third-party services to provide the Service:"}),o.jsx("h3",{children:"4.1 Social Login Providers"}),o.jsxs("p",{children:["We use OAuth authentication through ",o.jsx("strong",{children:"Google"}),", ",o.jsx("strong",{children:"Facebook"}),", and ",o.jsx("strong",{children:"Apple"})," to allow you to sign in with your existing accounts. When you use social login:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"We receive limited profile data (email address, name, profile picture)"}),o.jsx("li",{children:"These providers have their own privacy policies governing their data practices"}),o.jsx("li",{children:"We do not have access to your social media passwords"}),o.jsx("li",{children:"You can revoke our access through your social provider's settings at any time"})]}),o.jsx("h3",{children:"4.2 Analytics Services"}),o.jsxs("p",{children:["We use ",o.jsx("strong",{children:"Google Analytics"})," to understand how users interact with the Service. Google Analytics collects:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"IP addresses (anonymized where possible)"}),o.jsx("li",{children:"Device information and browser details"}),o.jsx("li",{children:"User behavior data (page views, session duration, interactions)"}),o.jsx("li",{children:"Traffic sources and referral information"})]}),o.jsxs("p",{children:["You can opt out of Google Analytics using browser extensions like the"," ",o.jsx("a",{href:"https://tools.google.com/dlpage/gaoptout",target:"_blank",rel:"noopener noreferrer",children:"Google Analytics Opt-out Browser Add-on"}),"."]}),o.jsx("h3",{children:"4.3 Advertising Services"}),o.jsxs("p",{children:["We may display advertisements through ",o.jsx("strong",{children:"Google AdSense"}),". When implemented, Google may:"]}),o.jsxs("ul",{children:[o.jsx("li",{children:"Use cookies to serve personalized ads based on your interests"}),o.jsx("li",{children:"Collect information about your visits to our Service and other websites"}),o.jsxs("li",{children:["Allow you to opt out of personalized advertising through your"," ",o.jsx("a",{href:"https://adssettings.google.com/",target:"_blank",rel:"noopener noreferrer",children:"Google Ads Settings"})]})]}),o.jsx("h3",{children:"4.4 Payment Processors"}),o.jsxs("p",{children:["For in-game purchases, we use ",o.jsx("strong",{children:"Stripe"})," and app store payment systems (Apple App Store, Google Play Store). Payment information is handled directly by these processors and is not stored on our servers. We only receive confirmation of successful transactions and limited transaction details."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"5. Cookies and Tracking Technologies"}),o.jsx("p",{children:"We use cookies and similar tracking technologies to provide and improve the Service:"}),o.jsx("h3",{children:"Essential Cookies"}),o.jsx("p",{children:"Required for authentication and session management. These cookies are necessary for the Service to function and cannot be disabled."}),o.jsx("h3",{children:"Preference Cookies"}),o.jsx("p",{children:"Store your settings and preferences (such as game settings, volume preferences, and display options) to provide a personalized experience."}),o.jsx("h3",{children:"Analytics Cookies"}),o.jsx("p",{children:"Used by Google Analytics to track usage patterns and help us understand how users interact with the Service."}),o.jsx("h3",{children:"Advertising Cookies"}),o.jsx("p",{children:"If advertising is enabled, these cookies may be used to serve personalized ads based on your interests and browsing behavior."}),o.jsx("p",{children:"Most web browsers allow you to control cookies through their settings. However, disabling cookies may limit your ability to use certain features of the Service."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"6. Your Rights Under GDPR (EU Users)"}),o.jsx("p",{children:"If you are located in the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR):"}),o.jsx("h3",{children:"Right to Access"}),o.jsx("p",{children:"You have the right to request a copy of the personal data we hold about you."}),o.jsx("h3",{children:"Right to Rectification"}),o.jsx("p",{children:"You can request that we correct any inaccurate or incomplete personal data."}),o.jsx("h3",{children:'Right to Erasure ("Right to be Forgotten")'}),o.jsx("p",{children:"You can request that we delete your personal data, subject to certain legal exceptions."}),o.jsx("h3",{children:"Right to Restriction of Processing"}),o.jsx("p",{children:"You can request that we limit the processing of your personal data in certain circumstances."}),o.jsx("h3",{children:"Right to Data Portability"}),o.jsx("p",{children:"You can request to receive your personal data in a structured, commonly used, and machine-readable format, and have it transferred to another service provider."}),o.jsx("h3",{children:"Right to Object"}),o.jsx("p",{children:"You can object to processing of your personal data based on legitimate interests or for direct marketing purposes."}),o.jsx("h3",{children:"Right to Withdraw Consent"}),o.jsx("p",{children:"Where processing is based on your consent, you have the right to withdraw that consent at any time."}),o.jsxs("p",{children:[o.jsxs("strong",{children:["To exercise any of these rights, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),"."]})," We will respond to your request within 30 days."]}),o.jsx("p",{children:"You also have the right to lodge a complaint with your local data protection authority if you believe we have violated your privacy rights."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"7. Your Rights Under CCPA (California Users)"}),o.jsx("p",{children:"If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):"}),o.jsx("h3",{children:"Right to Know"}),o.jsx("p",{children:"You have the right to request disclosure of the categories and specific pieces of personal information we have collected about you, the sources from which we collected it, our business purposes for collecting it, and the categories of third parties with whom we share it."}),o.jsx("h3",{children:"Right to Delete"}),o.jsx("p",{children:"You have the right to request deletion of your personal information, subject to certain legal exceptions."}),o.jsx("h3",{children:"Right to Opt-Out of Sale"}),o.jsxs("p",{children:[o.jsx("strong",{children:"We do not sell your personal information."}),' However, if we ever decide to do so in the future, we will provide a clear "Do Not Sell My Personal Information" link on our website.']}),o.jsx("h3",{children:"Right to Non-Discrimination"}),o.jsx("p",{children:"You have the right to not be discriminated against for exercising your CCPA rights. We will not deny you service, charge different prices, or provide a different level of service for exercising your privacy rights."}),o.jsx("h3",{children:"Categories of Information Collected"}),o.jsx("p",{children:"We collect the following categories of personal information:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Identifiers (email, username, OAuth IDs)"}),o.jsx("li",{children:"Commercial information (purchase history, virtual currency balance)"}),o.jsx("li",{children:"Internet or network activity (gameplay data, browsing behavior)"}),o.jsx("li",{children:"Geolocation data (IP address)"})]}),o.jsxs("p",{children:[o.jsxs("strong",{children:["To exercise any of these rights, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),"."]})," We will verify your identity before processing your request and respond within 45 days."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"8. Data Retention"}),o.jsx("p",{children:"We retain your personal information for as long as necessary to provide the Service and fulfill the purposes described in this Privacy Policy:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Active accounts:"})," Data is retained while your account remains active"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Game history:"})," Gameplay data is retained for leaderboards, statistics, and historical records"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Deleted accounts:"})," Personal data is deleted within 90 days of account deletion, except where we are legally required to retain it (e.g., for tax or legal compliance purposes)"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Backup data:"})," Data may persist in backup systems for up to 12 months after deletion"]})]}),o.jsxs("p",{children:["If you would like to request earlier deletion of your data, please contact us at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"}),"."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"9. Security Measures"}),o.jsx("p",{children:"We take the security of your personal information seriously and implement industry-standard measures to protect it:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Authentication Security:"})," We use secure OAuth authentication through trusted providers (Google, Facebook, Apple) and do not store passwords on our servers"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Encryption in Transit:"})," All data transmitted between your device and our servers is encrypted using HTTPS/TLS"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Database Security:"})," Our CouchDB database is protected with access controls and authentication"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"JWT Authentication:"})," Session tokens use industry-standard JSON Web Tokens for secure authentication"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Regular Updates:"})," We keep our software and dependencies up to date with security patches"]})]}),o.jsx("p",{children:"However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security. You are responsible for maintaining the security of your account credentials."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"10. Children's Privacy (COPPA Compliance)"}),o.jsx("p",{children:"The Service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13."}),o.jsx("p",{children:"If you are under 13 years old, please do not use the Service or provide any personal information to us. If we discover that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information as quickly as possible."}),o.jsxs("p",{children:["If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us immediately at"," ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})," so we can take appropriate action."]})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"11. International Data Transfers"}),o.jsx("p",{children:"The Service is hosted on Render.com, a US-based hosting provider. Your personal information may be transferred to, stored, and processed in the United States or other countries where our service providers operate."}),o.jsx("p",{children:"These countries may have data protection laws that differ from the laws of your country. By using the Service, you consent to the transfer of your information to the United States and other countries where we operate."}),o.jsx("p",{children:"For users in the European Economic Area (EEA), we take steps to ensure that international data transfers comply with applicable data protection laws, including the use of standard contractual clauses when appropriate."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"12. Changes to This Privacy Policy"}),o.jsx("p",{children:"We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors."}),o.jsx("p",{children:"When we make material changes to this Privacy Policy, we will:"}),o.jsxs("ul",{children:[o.jsx("li",{children:'Update the "Last Updated" date at the top of this page'}),o.jsx("li",{children:"Notify you by email (to the address associated with your account)"}),o.jsx("li",{children:"Display a prominent notice on the Service"}),o.jsx("li",{children:"Provide at least 30 days' notice before the changes take effect"})]}),o.jsx("p",{children:"Your continued use of the Service after the effective date of the updated Privacy Policy constitutes your acceptance of the changes. If you do not agree with the updated Privacy Policy, you should stop using the Service and may request deletion of your account."}),o.jsx("p",{children:"We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information."})]}),o.jsxs("section",{children:[o.jsx("h2",{children:"13. Contact Us"}),o.jsx("p",{children:"If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:"}),o.jsxs("p",{children:[o.jsx("strong",{children:"Applied Method, LLC"}),o.jsx("br",{}),"1111B S Governors Ave STE 26981",o.jsx("br",{}),"Dover, DE 19904",o.jsx("br",{}),"United States",o.jsx("br",{}),"Email: ",o.jsx("a",{href:"mailto:support@appliedmethod.com",children:"support@appliedmethod.com"})]}),o.jsx("p",{children:"We will respond to your inquiry as soon as possible, typically within 30 days."})]}),o.jsx("div",{className:se.footer,children:o.jsx("p",{children:"Thank you for trusting In-Between with your personal information. We are committed to protecting your privacy and providing a safe, enjoyable gaming experience."})})]})})}const Zl=p.lazy(()=>Se(()=>import("./LoginPage-C5tzvNt2.js"),__vite__mapDeps([4,1,5,6,7,2,3,8]),import.meta.url)),ed=p.lazy(()=>Se(()=>import("./TempMigratePage-D2jjsl3u.js"),__vite__mapDeps([9,1,5,7,2,3,10]),import.meta.url)),td=p.lazy(()=>Se(()=>import("./Lobby-Do3RkUex.js"),__vite__mapDeps([11,1,5,7,12,13,6,2,3,14]),import.meta.url)),nd=p.lazy(()=>Se(()=>import("./GameRoom-BSyUNrmm.js"),__vite__mapDeps([15,1,12,13,5,2,3,16]),import.meta.url)),Jn=({children:n})=>{const{user:e,loading:t}=Tt();return t?o.jsx(Oe,{message:"Checking authentication..."}):e?n:o.jsx(Zn,{to:"/auth",replace:!0})},rd=vi([{path:"/",element:o.jsx(Jn,{children:o.jsx(Vl,{children:o.jsx(p.Suspense,{fallback:o.jsx(Oe,{message:"Loading..."}),children:o.jsx(td,{})})})})},{path:"/auth",element:o.jsx(p.Suspense,{fallback:o.jsx(Oe,{message:"Loading..."}),children:o.jsx(Zl,{})})},{path:"/migrate",element:o.jsx(p.Suspense,{fallback:o.jsx(Oe,{message:"Loading..."}),children:o.jsx(ed,{})})},{path:"/terms",element:o.jsx(Xl,{})},{path:"/privacy",element:o.jsx(Ql,{})},{path:"/:gameId",element:o.jsx(Jn,{children:o.jsx(p.Suspense,{fallback:o.jsx(Oe,{message:"Loading..."}),children:o.jsx(nd,{})})})},{path:"*",element:o.jsx(Zn,{to:"/",replace:!0})}]);function id(){return p.useEffect(()=>{Gt.initialize()},[]),o.jsx(Fl,{children:o.jsx(Wl,{children:o.jsx(bi,{router:rd})})})}const sd="__capgo_keep_url_path_after_reload",Ut="__capgo_history_stack__",Xn=100,od=typeof window<"u"&&typeof document<"u"&&typeof history<"u";if(od){const n=window;if(!n.__capgoHistoryPatched){n.__capgoHistoryPatched=!0;const e=()=>{try{if(n.__capgoKeepUrlPathAfterReload)return!0}catch{}try{return window.localStorage.getItem(sd)==="1"}catch{return!1}},t=()=>{try{const y=window.sessionStorage.getItem(Ut);if(!y)return{stack:[],index:-1};const A=JSON.parse(y);return!A||!Array.isArray(A.stack)||typeof A.index!="number"?{stack:[],index:-1}:A}catch{return{stack:[],index:-1}}},r=(y,A)=>{try{window.sessionStorage.setItem(Ut,JSON.stringify({stack:y,index:A}))}catch{}},i=()=>{try{window.sessionStorage.removeItem(Ut)}catch{}},s=y=>{try{const A=y??window.location.href,x=new URL(A instanceof URL?A.toString():A,window.location.href);return`${x.pathname}${x.search}${x.hash}`}catch{return null}},a=(y,A)=>{if(y.length<=Xn)return{stack:y,index:A};const x=y.length-Xn,I=y.slice(x),S=Math.max(0,A-x);return{stack:I,index:S}},c=y=>{document.readyState==="complete"||document.readyState==="interactive"?y():window.addEventListener("DOMContentLoaded",y,{once:!0})};let l=!1,d=!1,f=!1;const h=()=>{if(!l)return;const y=t(),A=s();if(A){if(y.stack.length===0){y.stack.push(A),y.index=0,r(y.stack,y.index);return}(y.index<0||y.index>=y.stack.length)&&(y.index=y.stack.length-1),y.stack[y.index]!==A&&(y.stack[y.index]=A,r(y.stack,y.index))}},u=(y,A)=>{if(!l||d)return;const x=s(y);if(!x)return;let{stack:I,index:S}=t();I.length===0?(I.push(x),S=I.length-1):A?((S<0||S>=I.length)&&(S=I.length-1),I[S]=x):S>=I.length-1?(I.push(x),S=I.length-1):(I=I.slice(0,S+1),I.push(x),S=I.length-1),{stack:I,index:S}=a(I,S),r(I,S)},m=()=>{if(!l||d)return;const y=t();if(y.stack.length===0){h();return}const A=y.index>=0&&y.index<y.stack.length?y.index:y.stack.length-1,x=s();if(y.stack.length===1&&x===y.stack[0])return;const I=y.stack[0];if(!I)return;d=!0;try{history.replaceState(history.state,document.title,I);for(let B=1;B<y.stack.length;B+=1)history.pushState(history.state,document.title,y.stack[B])}catch{d=!1;return}d=!1;const S=y.stack.length-1,O=A-S;O!==0?history.go(O):(history.replaceState(history.state,document.title,y.stack[A]),window.dispatchEvent(new PopStateEvent("popstate")))},E=()=>{!l||f||(f=!0,c(()=>{f=!1,m()}))};let v=null,w=null;const b=()=>{if(!l||d)return;const y=s();if(!y)return;const A=t(),x=A.stack.lastIndexOf(y);x>=0?A.index=x:(A.stack.push(y),A.index=A.stack.length-1);const I=a(A.stack,A.index);r(I.stack,I.index)},_=()=>{v&&w||(v=history.pushState,w=history.replaceState,history.pushState=function(A,x,I){const S=v.call(history,A,x,I);return u(I,!1),S},history.replaceState=function(A,x,I){const S=w.call(history,A,x,I);return u(I,!0),S},window.addEventListener("popstate",b))},T=()=>{v&&(history.pushState=v,v=null),w&&(history.replaceState=w,w=null),window.removeEventListener("popstate",b)},C=y=>{if(l===y){l&&(h(),E());return}l=y,l?(_(),h(),E()):(T(),i())};window.addEventListener("CapacitorUpdaterKeepUrlPathAfterReload",y=>{var A;const x=y,I=(A=x?.detail)===null||A===void 0?void 0:A.enabled;typeof I=="boolean"?(n.__capgoKeepUrlPathAfterReload=I,C(I)):(n.__capgoKeepUrlPathAfterReload=!0,C(!0))}),C(e())}}const ad=Et("CapacitorUpdater",{web:()=>Se(()=>import("./web-BNB4aX6O.js"),__vite__mapDeps([17,1,2,3]),import.meta.url).then(n=>new n.CapacitorUpdaterWeb)});xi();window.Capacitor?.isNativePlatform()&&(ad.notifyAppReady(),window.Capacitor?.getPlatform()==="android"&&(document.documentElement.style.setProperty("--safe-area-inset-top","48px"),document.documentElement.style.setProperty("--safe-area-inset-bottom","0px"),console.log("✅ Android safe area insets set: top=48px")));Si.createRoot(document.getElementById("root")).render(o.jsx(Qn.StrictMode,{children:o.jsx(pl,{children:o.jsx(Ci,{children:o.jsx(gl,{children:o.jsx(vl,{children:o.jsx(bl,{children:o.jsx(id,{})})})})})})}));export{fd as $,ia as A,xd as B,Bd as C,Md as D,he as E,ee as F,ne as G,Wd as H,Fd as I,Sa as J,J as K,Rd as L,Sn as M,Za as N,nt as O,qn as P,qr as Q,Nd as R,Wa as S,re as T,fe as U,Nt as V,si as W,Ma as X,be as Y,o as Z,Tt as _,bd as a,qd as a0,tr as a1,ut as a2,$d as a3,Kd as a4,Gd as a5,Gt as a6,ad as a7,Et as a8,Se as a9,Ul as aa,ai as ab,Hd as ac,Oe as ad,Nl as ae,ui as af,ud as ag,hd as ah,zd as ai,vd as b,wd as c,Ld as d,Vd as e,Ad as f,el as g,te as h,Ed as i,jd as j,yd as k,Ud as l,Id as m,zn as n,Od as o,pd as p,md as q,Oo as r,Sd as s,_d as t,Td as u,Dd as v,gd as w,kd as x,Cd as y,Pd as z};
