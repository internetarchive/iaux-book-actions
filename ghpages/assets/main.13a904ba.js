const Zs=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}};Zs();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zt=window,Xe=Zt.ShadowRoot&&(Zt.ShadyCSS===void 0||Zt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fs=Symbol(),ci=new WeakMap;class Js{constructor(t,e,i){if(this._$cssResult$=!0,i!==fs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Xe&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=ci.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ci.set(e,t))}return t}toString(){return this.cssText}}const Ys=n=>new Js(typeof n=="string"?n:n+"",void 0,fs),Xs=(n,t)=>{Xe?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=Zt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},di=Xe?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Ys(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var me;const Yt=window,hi=Yt.trustedTypes,Qs=hi?hi.emptyScript:"",ui=Yt.reactiveElementPolyfillSupport,We={toAttribute(n,t){switch(t){case Boolean:n=n?Qs:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},vs=(n,t)=>t!==n&&(t==t||n==n),we={attribute:!0,type:String,converter:We,reflect:!1,hasChanged:vs};class At extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=we){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||we}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(di(s))}else t!==void 0&&e.push(di(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Xs(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=we){var s;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:We).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),d=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:We;this._$El=o,this[o]=d.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||vs)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}At.finalized=!0,At.elementProperties=new Map,At.elementStyles=[],At.shadowRootOptions={mode:"open"},ui==null||ui({ReactiveElement:At}),((me=Yt.reactiveElementVersions)!==null&&me!==void 0?me:Yt.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var be;const Xt=window,rt=Xt.trustedTypes,pi=rt?rt.createPolicy("lit-html",{createHTML:n=>n}):void 0,je="$lit$",R=`lit$${(Math.random()+"").slice(9)}$`,ms="?"+R,tn=`<${ms}>`,Z=document,Rt=()=>Z.createComment(""),Bt=n=>n===null||typeof n!="object"&&typeof n!="function",ws=Array.isArray,en=n=>ws(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",$e=`[ 	
\f\r]`,Ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gi=/-->/g,fi=/>/g,N=RegExp(`>|${$e}(?:([^\\s"'>=/]+)(${$e}*=${$e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vi=/'/g,mi=/"/g,bs=/^(?:script|style|textarea|title)$/i,$s=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),m=$s(1),sn=$s(2),M=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),wi=new WeakMap,q=Z.createTreeWalker(Z,129,null,!1);function ys(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return pi!==void 0?pi.createHTML(t):t}const nn=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=Ct;for(let d=0;d<e;d++){const a=n[d];let l,u,c=-1,h=0;for(;h<a.length&&(r.lastIndex=h,u=r.exec(a),u!==null);)h=r.lastIndex,r===Ct?u[1]==="!--"?r=gi:u[1]!==void 0?r=fi:u[2]!==void 0?(bs.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=N):u[3]!==void 0&&(r=N):r===N?u[0]===">"?(r=s!=null?s:Ct,c=-1):u[1]===void 0?c=-2:(c=r.lastIndex-u[2].length,l=u[1],r=u[3]===void 0?N:u[3]==='"'?mi:vi):r===mi||r===vi?r=N:r===gi||r===fi?r=Ct:(r=N,s=void 0);const p=r===N&&n[d+1].startsWith("/>")?" ":"";o+=r===Ct?a+tn:c>=0?(i.push(l),a.slice(0,c)+je+a.slice(c)+R+p):a+R+(c===-2?(i.push(void 0),d):p)}return[ys(n,o+(n[e]||"<?>")+(t===2?"</svg>":"")),i]};class Pt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const d=t.length-1,a=this.parts,[l,u]=nn(t,e);if(this.el=Pt.createElement(l,i),q.currentNode=this.el.content,e===2){const c=this.el.content,h=c.firstChild;h.remove(),c.append(...h.childNodes)}for(;(s=q.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const h of s.getAttributeNames())if(h.endsWith(je)||h.startsWith(R)){const p=u[r++];if(c.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+je).split(R),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?rn:w[1]==="?"?ln:w[1]==="@"?cn:ne})}else a.push({type:6,index:o})}for(const h of c)s.removeAttribute(h)}if(bs.test(s.tagName)){const c=s.textContent.split(R),h=c.length-1;if(h>0){s.textContent=rt?rt.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],Rt()),q.nextNode(),a.push({type:2,index:++o});s.append(c[h],Rt())}}}else if(s.nodeType===8)if(s.data===ms)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(R,c+1))!==-1;)a.push({type:7,index:o}),c+=R.length-1}o++}}static createElement(t,e){const i=Z.createElement("template");return i.innerHTML=t,i}}function at(n,t,e=n,i){var s,o,r,d;if(t===M)return t;let a=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const l=Bt(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,e,i)),i!==void 0?((r=(d=e)._$Co)!==null&&r!==void 0?r:d._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=at(n,a._$AS(n,t.values),a,i)),t}class on{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:Z).importNode(i,!0);q.currentNode=o;let r=q.nextNode(),d=0,a=0,l=s[0];for(;l!==void 0;){if(d===l.index){let u;l.type===2?u=new Gt(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new dn(r,this,t)),this._$AV.push(u),l=s[++a]}d!==(l==null?void 0:l.index)&&(r=q.nextNode(),d++)}return q.currentNode=Z,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Gt{constructor(t,e,i,s){var o;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=at(this,t,e),Bt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):en(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==$&&Bt(this._$AH)?this._$AA.nextSibling.data=t:this.$(Z.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Pt.createElement(ys(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const r=new on(o,this),d=r.u(this.options);r.v(i),this.$(d),this._$AH=r}}_$AC(t){let e=wi.get(t.strings);return e===void 0&&wi.set(t.strings,e=new Pt(t)),e}T(t){ws(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Gt(this.k(Rt()),this.k(Rt()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class ne{constructor(t,e,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=at(this,t,e,0),r=!Bt(t)||t!==this._$AH&&t!==M,r&&(this._$AH=t);else{const d=t;let a,l;for(t=o[0],a=0;a<o.length-1;a++)l=at(this,d[i+a],e,a),l===M&&(l=this._$AH[a]),r||(r=!Bt(l)||l!==this._$AH[a]),l===$?t=$:t!==$&&(t+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class rn extends ne{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}const an=rt?rt.emptyScript:"";class ln extends ne{constructor(){super(...arguments),this.type=4}j(t){t&&t!==$?this.element.setAttribute(this.name,an):this.element.removeAttribute(this.name)}}class cn extends ne{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=at(this,t,e,0))!==null&&i!==void 0?i:$)===M)return;const s=this._$AH,o=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==$&&(s===$||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class dn{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){at(this,t)}}const bi=Xt.litHtmlPolyfillSupport;bi==null||bi(Pt,Gt),((be=Xt.litHtmlVersions)!==null&&be!==void 0?be:Xt.litHtmlVersions=[]).push("2.8.0");const hn=(n,t,e)=>{var i,s;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=o._$litPart$;if(r===void 0){const d=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new Gt(t.insertBefore(Rt(),d),d,void 0,e!=null?e:{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ti=Symbol(),$i=new Map;class _s{constructor(t,e){if(this._$cssResult$=!0,e!==ti)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=$i.get(this.cssText);return Qe&&t===void 0&&($i.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const un=n=>new _s(typeof n=="string"?n:n+"",ti),g=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new _s(e,ti)},pn=(n,t)=>{Qe?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},yi=Qe?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return un(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ye;const _i=window.trustedTypes,gn=_i?_i.emptyScript:"",Ai=window.reactiveElementPolyfillSupport,Fe={toAttribute(n,t){switch(t){case Boolean:n=n?gn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},As=(n,t)=>t!==n&&(t==t||n==n),_e={attribute:!0,type:String,converter:Fe,reflect:!1,hasChanged:As};class tt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Eh(i,e);s!==void 0&&(this._$Eu.set(s,i),t.push(s))}),t}static createProperty(t,e=_e){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_e}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(yi(s))}else t!==void 0&&e.push(yi(t));return e}static _$Eh(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return pn(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=_e){var s,o;const r=this.constructor._$Eh(t,i);if(r!==void 0&&i.reflect===!0){const d=((o=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&o!==void 0?o:Fe.toAttribute)(e,i.type);this._$Ei=t,d==null?this.removeAttribute(r):this.setAttribute(r,d),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,d=r._$Eu.get(t);if(d!==void 0&&this._$Ei!==d){const a=r.getPropertyOptions(d),l=a.converter,u=(o=(s=(i=l)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof l=="function"?l:null)!==null&&o!==void 0?o:Fe.fromAttribute;this._$Ei=d,this[d]=u(e,a.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||As)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Ei!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,o)=>this[o]=s),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$Eg)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$ES(i,this[i],e)),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}tt.finalized=!0,tt.elementProperties=new Map,tt.elementStyles=[],tt.shadowRootOptions={mode:"open"},Ai==null||Ai({ReactiveElement:tt}),((ye=globalThis.reactiveElementVersions)!==null&&ye!==void 0?ye:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ae,Ce;class x extends tt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=hn(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return M}}x.finalized=!0,x._$litElement$=!0,(Ae=globalThis.litElementHydrateSupport)===null||Ae===void 0||Ae.call(globalThis,{LitElement:x});const Ci=globalThis.litElementPolyfillSupport;Ci==null||Ci({LitElement:x});((Ce=globalThis.litElementVersions)!==null&&Ce!==void 0?Ce:globalThis.litElementVersions=[]).push("3.3.3");class fn{constructor(){this.resizeObserver=new ResizeObserver(t=>{window.requestAnimationFrame(()=>{for(const e of t){const i=this.resizeHandlers.get(e.target);i==null||i.forEach(s=>{s.handleResize(e)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((t,e)=>{this.resizeObserver.unobserve(e)}),this.resizeHandlers.clear()}addObserver(t){var e;const i=(e=this.resizeHandlers.get(t.target))!==null&&e!==void 0?e:new Set;i.add(t.handler),this.resizeHandlers.set(t.target,i),this.resizeObserver.observe(t.target,t.options)}removeObserver(t){const e=this.resizeHandlers.get(t.target);!e||(e.delete(t.handler),e.size===0&&(this.resizeObserver.unobserve(t.target),this.resizeHandlers.delete(t.target)))}}class G{constructor(t){var e,i,s,o,r,d,a;this.title=t==null?void 0:t.title,this.subtitle=t==null?void 0:t.subtitle,this.headline=t==null?void 0:t.headline,this.message=t==null?void 0:t.message,this.headerColor=(e=t==null?void 0:t.headerColor)!==null&&e!==void 0?e:"#55A183",this.bodyColor=(i=t==null?void 0:t.bodyColor)!==null&&i!==void 0?i:"#f5f5f7",this.showProcessingIndicator=(s=t==null?void 0:t.showProcessingIndicator)!==null&&s!==void 0?s:!1,this.processingImageMode=(o=t==null?void 0:t.processingImageMode)!==null&&o!==void 0?o:"complete",this.showCloseButton=(r=t==null?void 0:t.showCloseButton)!==null&&r!==void 0?r:!0,this.showHeaderLogo=(d=t==null?void 0:t.showHeaderLogo)!==null&&d!==void 0?d:!0,this.closeOnBackdropClick=(a=t==null?void 0:t.closeOnBackdropClick)!==null&&a!==void 0?a:!0}}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function J(n,t,e,i){var s=arguments.length,o=s<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,t,e,i);else for(var d=n.length-1;d>=0;d--)(r=n[d])&&(o=(s<3?r(o):s>3?r(t,e,o):r(t,e))||o);return s>3&&o&&Object.defineProperty(t,e,o),o}function Ei(n,t,e,i){function s(o){return o instanceof e?o:new e(function(r){r(o)})}return new(e||(e=Promise))(function(o,r){function d(u){try{l(i.next(u))}catch(c){r(c)}}function a(u){try{l(i.throw(u))}catch(c){r(c)}}function l(u){u.done?o(u.value):s(u.value).then(d,a)}l((i=i.apply(n,t||[])).next())})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cs=n=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(n,t):((e,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(r){customElements.define(e,r)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vn=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}};function oe(n){return(t,e)=>e!==void 0?((i,s,o)=>{s.constructor.createProperty(o,i)})(n,t,e):vn(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mn=({finisher:n,descriptor:t})=>(e,i)=>{var s;if(i===void 0){const o=(s=e.originalKey)!==null&&s!==void 0?s:e.key,r=t!=null?{kind:"method",placement:"prototype",key:o,descriptor:t(e.key)}:{...e,key:o};return n!=null&&(r.finisher=function(d){n(d,o)}),r}{const o=e.constructor;t!==void 0&&Object.defineProperty(e,i,t(i)),n==null||n(o,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function wn(n,t){return mn({descriptor:e=>{const i={get(){var s,o;return(o=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(n))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(t){const s=typeof e=="symbol"?Symbol():"__"+e;i.get=function(){var o,r;return this[s]===void 0&&(this[s]=(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(n))!==null&&r!==void 0?r:null),this[s]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ee;((Ee=window.HTMLSlotElement)===null||Ee===void 0?void 0:Ee.prototype.assignedElements)!=null;function*ei(n=document.activeElement){n!=null&&(yield n,"shadowRoot"in n&&n.shadowRoot&&n.shadowRoot.mode!=="closed"&&(yield*ei(n.shadowRoot.activeElement)))}function bn(){return[...ei()].pop()}const Si=new WeakMap;function Es(n){let t=Si.get(n);return t||(t=window.getComputedStyle(n,null),Si.set(n,t)),t}function $n(n){if("checkVisibility"in n&&typeof n.checkVisibility=="function")return n.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=Es(n);return t.visibility!=="hidden"&&t.display!=="none"}function yn(n){const t=Es(n),{overflowY:e,overflowX:i}=t;return e==="scroll"||i==="scroll"?!0:e!=="auto"||i!=="auto"?!1:n.scrollHeight>n.clientHeight&&e==="auto"||n.scrollWidth>n.clientWidth&&i==="auto"}function _n(n){const t=n.tagName.toLowerCase(),e=Number(n.getAttribute("tabindex"));return n.hasAttribute("tabindex")&&(isNaN(e)||e<=-1)||n.hasAttribute("disabled")||n.closest("[inert]")||t==="input"&&n.getAttribute("type")==="radio"&&!n.hasAttribute("checked")||!$n(n)?!1:(t==="audio"||t==="video")&&n.hasAttribute("controls")||n.hasAttribute("tabindex")||n.hasAttribute("contenteditable")&&n.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:yn(n)}function An(n,t){var e;return((e=n.getRootNode({composed:!0}))===null||e===void 0?void 0:e.host)!==t}function ki(n){const t=new WeakMap,e=[];function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||t.has(s))return;t.set(s,!0),!e.includes(s)&&_n(s)&&e.push(s),s instanceof HTMLSlotElement&&An(s,n)&&s.assignedElements({flatten:!0}).forEach(o=>{i(o)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&i(s.shadowRoot)}for(const o of Array.from(s.children))i(o)}return i(n),e.sort((s,o)=>{const r=Number(s.getAttribute("tabindex"))||0;return(Number(o.getAttribute("tabindex"))||0)-r})}let Et=[];class Cn{constructor(t){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{!this.isActive()||this.checkFocus()},this.handleKeyDown=e=>{var i;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const s=bn();if(this.previousFocus=s,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const o=ki(this.element);let r=o.findIndex(a=>a===s);this.previousFocus=this.currentFocus;const d=this.tabDirection==="forward"?1:-1;for(;;){r+d>=o.length?r=0:r+d<0?r=o.length-1:r+=d,this.previousFocus=this.currentFocus;const a=o[r];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||a&&this.possiblyHasTabbableChildren(a))return;e.preventDefault(),this.currentFocus=a,(i=this.currentFocus)===null||i===void 0||i.focus({preventScroll:!1});const l=[...ei()];if(l.includes(this.currentFocus)||!l.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){Et.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Et=Et.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Et[Et.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=ki(this.element);if(!this.element.matches(":focus-within")){const e=t[0],i=t[t.length-1],s=this.tabDirection==="forward"?e:i;typeof(s==null?void 0:s.focus)=="function"&&(this.currentFocus=s,s.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=window,ii=Jt.ShadowRoot&&(Jt.ShadyCSS===void 0||Jt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ss=Symbol(),Li=new WeakMap;class En{constructor(t,e,i){if(this._$cssResult$=!0,i!==Ss)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ii&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Li.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Li.set(e,t))}return t}toString(){return this.cssText}}const Sn=n=>new En(typeof n=="string"?n:n+"",void 0,Ss),kn=(n,t)=>{ii?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=Jt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},xi=ii?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Sn(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Se;const Qt=window,Ti=Qt.trustedTypes,Ln=Ti?Ti.emptyScript:"",Ri=Qt.reactiveElementPolyfillSupport,qe={toAttribute(n,t){switch(t){case Boolean:n=n?Ln:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ks=(n,t)=>t!==n&&(t==t||n==n),ke={attribute:!0,type:String,converter:qe,reflect:!1,hasChanged:ks};class St extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=ke){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ke}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(xi(s))}else t!==void 0&&e.push(xi(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return kn(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=ke){var s;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:qe).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),d=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:qe;this._$El=o,this[o]=d.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ks)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}St.finalized=!0,St.elementProperties=new Map,St.elementStyles=[],St.shadowRootOptions={mode:"open"},Ri==null||Ri({ReactiveElement:St}),((Se=Qt.reactiveElementVersions)!==null&&Se!==void 0?Se:Qt.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Le;const te=window,lt=te.trustedTypes,Bi=lt?lt.createPolicy("lit-html",{createHTML:n=>n}):void 0,B=`lit$${(Math.random()+"").slice(9)}$`,Ls="?"+B,xn=`<${Ls}>`,ct=document,ee=(n="")=>ct.createComment(n),Ht=n=>n===null||typeof n!="object"&&typeof n!="function",xs=Array.isArray,Tn=n=>xs(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pi=/-->/g,Hi=/>/g,U=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ii=/'/g,Mi=/"/g,Ts=/^(?:script|style|textarea|title)$/i,It=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Oi=new WeakMap,it=ct.createTreeWalker(ct,129,null,!1),Rn=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=kt;for(let a=0;a<e;a++){const l=n[a];let u,c,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,c=r.exec(l),c!==null);)p=r.lastIndex,r===kt?c[1]==="!--"?r=Pi:c[1]!==void 0?r=Hi:c[2]!==void 0?(Ts.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=U):c[3]!==void 0&&(r=U):r===U?c[0]===">"?(r=s!=null?s:kt,h=-1):c[1]===void 0?h=-2:(h=r.lastIndex-c[2].length,u=c[1],r=c[3]===void 0?U:c[3]==='"'?Mi:Ii):r===Mi||r===Ii?r=U:r===Pi||r===Hi?r=kt:(r=U,s=void 0);const b=r===U&&n[a+1].startsWith("/>")?" ":"";o+=r===kt?l+xn:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+B+b):l+B+(h===-2?(i.push(void 0),a):b)}const d=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Bi!==void 0?Bi.createHTML(d):d,i]};class Mt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const d=t.length-1,a=this.parts,[l,u]=Rn(t,e);if(this.el=Mt.createElement(l,i),it.currentNode=this.el.content,e===2){const c=this.el.content,h=c.firstChild;h.remove(),c.append(...h.childNodes)}for(;(s=it.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(B)){const p=u[r++];if(c.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(B),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?Pn:w[1]==="?"?In:w[1]==="@"?Mn:ae})}else a.push({type:6,index:o})}for(const h of c)s.removeAttribute(h)}if(Ts.test(s.tagName)){const c=s.textContent.split(B),h=c.length-1;if(h>0){s.textContent=lt?lt.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],ee()),it.nextNode(),a.push({type:2,index:++o});s.append(c[h],ee())}}}else if(s.nodeType===8)if(s.data===Ls)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(B,c+1))!==-1;)a.push({type:7,index:o}),c+=B.length-1}o++}}static createElement(t,e){const i=ct.createElement("template");return i.innerHTML=t,i}}function dt(n,t,e=n,i){var s,o,r,d;if(t===It)return t;let a=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const l=Ht(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,e,i)),i!==void 0?((r=(d=e)._$Co)!==null&&r!==void 0?r:d._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=dt(n,a._$AS(n,t.values),a,i)),t}class Bn{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:ct).importNode(i,!0);it.currentNode=o;let r=it.nextNode(),d=0,a=0,l=s[0];for(;l!==void 0;){if(d===l.index){let u;l.type===2?u=new re(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new On(r,this,t)),this.u.push(u),l=s[++a]}d!==(l==null?void 0:l.index)&&(r=it.nextNode(),d++)}return o}p(t){let e=0;for(const i of this.u)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class re{constructor(t,e,i,s){var o;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=dt(this,t,e),Ht(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==It&&this.g(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tn(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==_&&Ht(this._$AH)?this._$AA.nextSibling.data=t:this.T(ct.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Mt.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.p(i);else{const r=new Bn(o,this),d=r.v(this.options);r.p(i),this.T(d),this._$AH=r}}_$AC(t){let e=Oi.get(t.strings);return e===void 0&&Oi.set(t.strings,e=new Mt(t)),e}k(t){xs(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new re(this.O(ee()),this.O(ee()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cm=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class ae{constructor(t,e,i,s,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=dt(this,t,e,0),r=!Ht(t)||t!==this._$AH&&t!==It,r&&(this._$AH=t);else{const d=t;let a,l;for(t=o[0],a=0;a<o.length-1;a++)l=dt(this,d[i+a],e,a),l===It&&(l=this._$AH[a]),r||(r=!Ht(l)||l!==this._$AH[a]),l===_?t=_:t!==_&&(t+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class Pn extends ae{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}const Hn=lt?lt.emptyScript:"";class In extends ae{constructor(){super(...arguments),this.type=4}j(t){t&&t!==_?this.element.setAttribute(this.name,Hn):this.element.removeAttribute(this.name)}}class Mn extends ae{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=dt(this,t,e,0))!==null&&i!==void 0?i:_)===It)return;const s=this._$AH,o=t===_&&s!==_||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==_&&(s===_||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class On{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){dt(this,t)}}const Ni=te.litHtmlPolyfillSupport;Ni==null||Ni(Mt,re),((Le=te.litHtmlVersions)!==null&&Le!==void 0?Le:te.litHtmlVersions=[]).push("2.6.1");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const si=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ni=Symbol(),Ui=new Map;class Rs{constructor(t,e){if(this._$cssResult$=!0,e!==ni)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=Ui.get(this.cssText);return si&&t===void 0&&(Ui.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const Nn=n=>new Rs(typeof n=="string"?n:n+"",ni),F=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new Rs(e,ni)},Un=(n,t)=>{si?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},Di=si?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Nn(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xe;const zi=window.trustedTypes,Dn=zi?zi.emptyScript:"",Wi=window.reactiveElementPolyfillSupport,Ge={toAttribute(n,t){switch(t){case Boolean:n=n?Dn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Bs=(n,t)=>t!==n&&(t==t||n==n),Te={attribute:!0,type:String,converter:Ge,reflect:!1,hasChanged:Bs};class et extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Eh(i,e);s!==void 0&&(this._$Eu.set(s,i),t.push(s))}),t}static createProperty(t,e=Te){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Te}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(Di(s))}else t!==void 0&&e.push(Di(t));return e}static _$Eh(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Un(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=Te){var s,o;const r=this.constructor._$Eh(t,i);if(r!==void 0&&i.reflect===!0){const d=((o=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&o!==void 0?o:Ge.toAttribute)(e,i.type);this._$Ei=t,d==null?this.removeAttribute(r):this.setAttribute(r,d),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,d=r._$Eu.get(t);if(d!==void 0&&this._$Ei!==d){const a=r.getPropertyOptions(d),l=a.converter,u=(o=(s=(i=l)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof l=="function"?l:null)!==null&&o!==void 0?o:Ge.fromAttribute;this._$Ei=d,this[d]=u(e,a.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Bs)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Ei!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,o)=>this[o]=s),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$Eg)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$ES(i,this[i],e)),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}et.finalized=!0,et.elementProperties=new Map,et.elementStyles=[],et.shadowRootOptions={mode:"open"},Wi==null||Wi({ReactiveElement:et}),((xe=globalThis.reactiveElementVersions)!==null&&xe!==void 0?xe:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Re;const ht=globalThis.trustedTypes,ji=ht?ht.createPolicy("lit-html",{createHTML:n=>n}):void 0,P=`lit$${(Math.random()+"").slice(9)}$`,Ps="?"+P,zn=`<${Ps}>`,ut=document,Ot=(n="")=>ut.createComment(n),Nt=n=>n===null||typeof n!="object"&&typeof n!="function",Hs=Array.isArray,Wn=n=>{var t;return Hs(n)||typeof((t=n)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},Lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Fi=/-->/g,qi=/>/g,D=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Gi=/'/g,Vi=/"/g,Is=/^(?:script|style|textarea|title)$/i,jn=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),oi=jn(1),pt=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Ki=new WeakMap,Fn=(n,t,e)=>{var i,s;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=o._$litPart$;if(r===void 0){const d=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new Vt(t.insertBefore(Ot(),d),d,void 0,e!=null?e:{})}return r._$AI(n),r},st=ut.createTreeWalker(ut,129,null,!1),qn=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=Lt;for(let a=0;a<e;a++){const l=n[a];let u,c,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,c=r.exec(l),c!==null);)p=r.lastIndex,r===Lt?c[1]==="!--"?r=Fi:c[1]!==void 0?r=qi:c[2]!==void 0?(Is.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=D):c[3]!==void 0&&(r=D):r===D?c[0]===">"?(r=s!=null?s:Lt,h=-1):c[1]===void 0?h=-2:(h=r.lastIndex-c[2].length,u=c[1],r=c[3]===void 0?D:c[3]==='"'?Vi:Gi):r===Vi||r===Gi?r=D:r===Fi||r===qi?r=Lt:(r=D,s=void 0);const b=r===D&&n[a+1].startsWith("/>")?" ":"";o+=r===Lt?l+zn:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+P+b):l+P+(h===-2?(i.push(void 0),a):b)}const d=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ji!==void 0?ji.createHTML(d):d,i]};class Ut{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const d=t.length-1,a=this.parts,[l,u]=qn(t,e);if(this.el=Ut.createElement(l,i),st.currentNode=this.el.content,e===2){const c=this.el.content,h=c.firstChild;h.remove(),c.append(...h.childNodes)}for(;(s=st.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(P)){const p=u[r++];if(c.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(P),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?Vn:w[1]==="?"?Zn:w[1]==="@"?Jn:le})}else a.push({type:6,index:o})}for(const h of c)s.removeAttribute(h)}if(Is.test(s.tagName)){const c=s.textContent.split(P),h=c.length-1;if(h>0){s.textContent=ht?ht.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],Ot()),st.nextNode(),a.push({type:2,index:++o});s.append(c[h],Ot())}}}else if(s.nodeType===8)if(s.data===Ps)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(P,c+1))!==-1;)a.push({type:7,index:o}),c+=P.length-1}o++}}static createElement(t,e){const i=ut.createElement("template");return i.innerHTML=t,i}}function gt(n,t,e=n,i){var s,o,r,d;if(t===pt)return t;let a=i!==void 0?(s=e._$Cl)===null||s===void 0?void 0:s[i]:e._$Cu;const l=Nt(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,e,i)),i!==void 0?((r=(d=e)._$Cl)!==null&&r!==void 0?r:d._$Cl=[])[i]=a:e._$Cu=a),a!==void 0&&(t=gt(n,a._$AS(n,t.values),a,i)),t}class Gn{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:ut).importNode(i,!0);st.currentNode=o;let r=st.nextNode(),d=0,a=0,l=s[0];for(;l!==void 0;){if(d===l.index){let u;l.type===2?u=new Vt(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new Yn(r,this,t)),this.v.push(u),l=s[++a]}d!==(l==null?void 0:l.index)&&(r=st.nextNode(),d++)}return o}m(t){let e=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Vt{constructor(t,e,i,s){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=gt(this,t,e),Nt(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==pt&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):Wn(t)?this.S(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==A&&Nt(this._$AH)?this._$AA.nextSibling.data=t:this.k(ut.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Ut.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.m(i);else{const r=new Gn(o,this),d=r.p(this.options);r.m(i),this.k(d),this._$AH=r}}_$AC(t){let e=Ki.get(t.strings);return e===void 0&&Ki.set(t.strings,e=new Ut(t)),e}S(t){Hs(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Vt(this.A(Ot()),this.A(Ot()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class le{constructor(t,e,i,s,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=A}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=gt(this,t,e,0),r=!Nt(t)||t!==this._$AH&&t!==pt,r&&(this._$AH=t);else{const d=t;let a,l;for(t=o[0],a=0;a<o.length-1;a++)l=gt(this,d[i+a],e,a),l===pt&&(l=this._$AH[a]),r||(r=!Nt(l)||l!==this._$AH[a]),l===A?t=A:t!==A&&(t+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.C(t)}C(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class Vn extends le{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===A?void 0:t}}const Kn=ht?ht.emptyScript:"";class Zn extends le{constructor(){super(...arguments),this.type=4}C(t){t&&t!==A?this.element.setAttribute(this.name,Kn):this.element.removeAttribute(this.name)}}class Jn extends le{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=gt(this,t,e,0))!==null&&i!==void 0?i:A)===pt)return;const s=this._$AH,o=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==A&&(s===A||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Yn{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){gt(this,t)}}const Zi=window.litHtmlPolyfillSupport;Zi==null||Zi(Ut,Vt),((Re=globalThis.litHtmlVersions)!==null&&Re!==void 0?Re:globalThis.litHtmlVersions=[]).push("2.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Be,Pe;class V extends et{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=Fn(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return pt}}V.finalized=!0,V._$litElement$=!0,(Be=globalThis.litElementHydrateSupport)===null||Be===void 0||Be.call(globalThis,{LitElement:V});const Ji=globalThis.litElementPolyfillSupport;Ji==null||Ji({LitElement:V});((Pe=globalThis.litElementVersions)!==null&&Pe!==void 0?Pe:globalThis.litElementVersions=[]).push("3.2.0");const Xn=Object.freeze({processing:"processing",complete:"complete"});class Qn extends V{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=Xn.processing}render(){return oi`
      <div class="${this.mode}">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="indicatorTitle indicatorDescription"
        >
          <title id="indicatorTitle">Activity Indicator</title>
          <desc id="indicatorDescription">
            A rotating activity indicator with three dots in the middle.
          </desc>
          <g
            id="icons/check-ring---squared"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="completed-ring"
              class="loaded-indicator"
              d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <polygon
              id="check"
              class="loaded-indicator"
              transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
              points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
            ></polygon>
            <path
              id="activity-ring"
              class="activity-indicator"
              d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <g
              id="activity-dots"
              class="activity-indicator"
              transform="translate(40.000000, 55.000000)"
            >
              <circle id="left-dot" cx="5" cy="5" r="5"></circle>
              <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
              <circle id="right-dot" cx="35" cy="5" r="5"></circle>
            </g>
          </g>
        </svg>
      </div>
    `}static get styles(){const t=F`var(--activityIndicatorCheckmarkColor, #31A481)`,e=F`var(--activityIndicatorCompletedRingColor, #31A481)`,i=F`var(--activityIndicatorLoadingRingColor, #333333)`,s=F`var(--activityIndicatorLoadingDotColor, #333333)`;return F`
      #completed-ring {
        fill: ${e};
      }

      #check {
        fill: ${t};
      }

      #activity-ring {
        fill: ${i};
      }

      #activity-dots {
        fill: ${s};
      }

      .activity-indicator {
        opacity: 0;
        transition: opacity 0.25s ease-out;
      }

      .processing .activity-indicator {
        opacity: 1;
      }

      .loaded-indicator {
        opacity: 1;
        transition: opacity 0.25s ease-out;
      }

      .processing .loaded-indicator {
        opacity: 0;
      }

      .image {
        border: 1px solid red;
        display: inline-block;
      }

      .processing #activity-ring {
        animation: rotate 1.3s infinite linear;
        transform-origin: 50px 50px;
        transform-box: fill-box;
      }

      .processing #left-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.2s;
      }

      .processing #middle-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.4s;
      }

      .processing #right-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.6s;
      }

      @keyframes rotate {
        0% {
          transform: rotate(-360deg);
        }
        100% {
          /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
          transform: rotate(0deg);
        }
      }

      @keyframes dot {
        0% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `}}window.customElements.define("ia-activity-indicator",Qn);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var He;const ft=globalThis.trustedTypes,Yi=ft?ft.createPolicy("lit-html",{createHTML:n=>n}):void 0,H=`lit$${(Math.random()+"").slice(9)}$`,Ms="?"+H,to=`<${Ms}>`,vt=document,ie=(n="")=>vt.createComment(n),Dt=n=>n===null||typeof n!="object"&&typeof n!="function",Os=Array.isArray,eo=n=>{var t;return Os(n)||typeof((t=n)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},xt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xi=/-->/g,Qi=/>/g,z=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ts=/'/g,es=/"/g,Ns=/^(?:script|style|textarea|title)$/i,zt=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),is=new WeakMap,nt=vt.createTreeWalker(vt,129,null,!1),io=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=xt;for(let a=0;a<e;a++){const l=n[a];let u,c,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,c=r.exec(l),c!==null);)p=r.lastIndex,r===xt?c[1]==="!--"?r=Xi:c[1]!==void 0?r=Qi:c[2]!==void 0?(Ns.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=z):c[3]!==void 0&&(r=z):r===z?c[0]===">"?(r=s!=null?s:xt,h=-1):c[1]===void 0?h=-2:(h=r.lastIndex-c[2].length,u=c[1],r=c[3]===void 0?z:c[3]==='"'?es:ts):r===es||r===ts?r=z:r===Xi||r===Qi?r=xt:(r=z,s=void 0);const b=r===z&&n[a+1].startsWith("/>")?" ":"";o+=r===xt?l+to:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+H+b):l+H+(h===-2?(i.push(void 0),a):b)}const d=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Yi!==void 0?Yi.createHTML(d):d,i]};class Wt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const d=t.length-1,a=this.parts,[l,u]=io(t,e);if(this.el=Wt.createElement(l,i),nt.currentNode=this.el.content,e===2){const c=this.el.content,h=c.firstChild;h.remove(),c.append(...h.childNodes)}for(;(s=nt.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(H)){const p=u[r++];if(c.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(H),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?no:w[1]==="?"?ro:w[1]==="@"?ao:de})}else a.push({type:6,index:o})}for(const h of c)s.removeAttribute(h)}if(Ns.test(s.tagName)){const c=s.textContent.split(H),h=c.length-1;if(h>0){s.textContent=ft?ft.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],ie()),nt.nextNode(),a.push({type:2,index:++o});s.append(c[h],ie())}}}else if(s.nodeType===8)if(s.data===Ms)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(H,c+1))!==-1;)a.push({type:7,index:o}),c+=H.length-1}o++}}static createElement(t,e){const i=vt.createElement("template");return i.innerHTML=t,i}}function mt(n,t,e=n,i){var s,o,r,d;if(t===zt)return t;let a=i!==void 0?(s=e._$Cl)===null||s===void 0?void 0:s[i]:e._$Cu;const l=Dt(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,e,i)),i!==void 0?((r=(d=e)._$Cl)!==null&&r!==void 0?r:d._$Cl=[])[i]=a:e._$Cu=a),a!==void 0&&(t=mt(n,a._$AS(n,t.values),a,i)),t}class so{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:vt).importNode(i,!0);nt.currentNode=o;let r=nt.nextNode(),d=0,a=0,l=s[0];for(;l!==void 0;){if(d===l.index){let u;l.type===2?u=new ce(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new lo(r,this,t)),this.v.push(u),l=s[++a]}d!==(l==null?void 0:l.index)&&(r=nt.nextNode(),d++)}return o}m(t){let e=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ce{constructor(t,e,i,s){var o;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=mt(this,t,e),Dt(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==zt&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):eo(t)?this.S(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==C&&Dt(this._$AH)?this._$AA.nextSibling.data=t:this.k(vt.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Wt.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.m(i);else{const r=new so(o,this),d=r.p(this.options);r.m(i),this.k(d),this._$AH=r}}_$AC(t){let e=is.get(t.strings);return e===void 0&&is.set(t.strings,e=new Wt(t)),e}S(t){Os(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new ce(this.A(ie()),this.A(ie()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class de{constructor(t,e,i,s,o){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=mt(this,t,e,0),r=!Dt(t)||t!==this._$AH&&t!==zt,r&&(this._$AH=t);else{const d=t;let a,l;for(t=o[0],a=0;a<o.length-1;a++)l=mt(this,d[i+a],e,a),l===zt&&(l=this._$AH[a]),r||(r=!Dt(l)||l!==this._$AH[a]),l===C?t=C:t!==C&&(t+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.C(t)}C(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class no extends de{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===C?void 0:t}}const oo=ft?ft.emptyScript:"";class ro extends de{constructor(){super(...arguments),this.type=4}C(t){t&&t!==C?this.element.setAttribute(this.name,oo):this.element.removeAttribute(this.name)}}class ao extends de{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=mt(this,t,e,0))!==null&&i!==void 0?i:C)===zt)return;const s=this._$AH,o=t===C&&s!==C||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==C&&(s===C||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class lo{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){mt(this,t)}}const ss=window.litHtmlPolyfillSupport;ss==null||ss(Wt,ce),((He=globalThis.litHtmlVersions)!==null&&He!==void 0?He:globalThis.litHtmlVersions=[]).push("2.2.1");var co=oi`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  aria-labelledby="closeTitleID closeDescID"
>
  <title id="closeTitleID">Close icon</title>
  <desc id="closeDescID">A line drawing of an X</desc>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class ho extends V{static get styles(){return F`
      :host {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .stroke-color {
        stroke: var(--iconStrokeColor);
      }
    `}render(){return co}}customElements.define("ia-icon-close",ho);var uo=m`
  <svg
    class="ia-logo"
    viewBox="0 0 27 30"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="logoTitleID logoDescID"
  >
    <title id="logoTitleID">Internet Archive logo</title>
    <desc id="logoDescID">
      A line drawing of the Internet Archive headquarters building façade.
    </desc>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <mask id="mask-2" class="fill-color">
        <path
          d="M26.6666667,28.6046512 L26.6666667,30 L0,30 L0.000283687943,28.6046512 L26.6666667,28.6046512 Z M25.6140351,26.5116279 L25.6140351,28.255814 L1.05263158,28.255814 L1.05263158,26.5116279 L25.6140351,26.5116279 Z M3.62469203,7.6744186 L3.91746909,7.82153285 L4.0639977,10.1739544 L4.21052632,13.9963932 L4.21052632,17.6725617 L4.0639977,22.255044 L4.03962296,25.3421929 L3.62469203,25.4651163 L2.16024641,25.4651163 L1.72094074,25.3421929 L1.55031755,22.255044 L1.40350877,17.6970339 L1.40350877,14.0211467 L1.55031755,10.1739544 L1.68423854,7.80887484 L1.98962322,7.6744186 L3.62469203,7.6744186 Z M24.6774869,7.6744186 L24.9706026,7.82153285 L25.1168803,10.1739544 L25.2631579,13.9963932 L25.2631579,17.6725617 L25.1168803,22.255044 L25.0927809,25.3421929 L24.6774869,25.4651163 L23.2130291,25.4651163 L22.7736357,25.3421929 L22.602418,22.255044 L22.4561404,17.6970339 L22.4561404,14.0211467 L22.602418,10.1739544 L22.7369262,7.80887484 L23.0420916,7.6744186 L24.6774869,7.6744186 Z M9.94042303,7.6744186 L10.2332293,7.82153285 L10.3797725,10.1739544 L10.5263158,13.9963932 L10.5263158,17.6725617 L10.3797725,22.255044 L10.3556756,25.3421929 L9.94042303,25.4651163 L8.47583122,25.4651163 L8.0362015,25.3421929 L7.86556129,22.255044 L7.71929825,17.6970339 L7.71929825,14.0211467 L7.86556129,10.1739544 L8.00005604,7.80887484 L8.30491081,7.6744186 L9.94042303,7.6744186 Z M18.0105985,7.6744186 L18.3034047,7.82153285 L18.449948,10.1739544 L18.5964912,13.9963932 L18.5964912,17.6725617 L18.449948,22.255044 L18.425851,25.3421929 L18.0105985,25.4651163 L16.5460067,25.4651163 L16.1066571,25.3421929 L15.9357367,22.255044 L15.7894737,17.6970339 L15.7894737,14.0211467 L15.9357367,10.1739544 L16.0702315,7.80887484 L16.3753664,7.6744186 L18.0105985,7.6744186 Z M25.6140351,4.53488372 L25.6140351,6.97674419 L1.05263158,6.97674419 L1.05263158,4.53488372 L25.6140351,4.53488372 Z M13.0806755,0 L25.9649123,2.93331338 L25.4484139,3.8372093 L0.771925248,3.8372093 L0,3.1041615 L13.0806755,0 Z"
          id="path-1"
        ></path>
      </mask>
      <use class="fill-color" xlink:href="#path-1"></use>
      <g mask="url(#mask-2)" class="fill-color">
        <path
          d="M0,0 L26.6666667,0 L26.6666667,30 L0,30 L0,0 Z"
          id="swatch"
        ></path>
      </g>
    </g>
  </svg>
`;let Ve=class extends x{constructor(){super(...arguments),this.config=new G}render(){return m`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?m`<div class="logo-icon">${uo}</div>`:$}
            ${this.config.title?m`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?m`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
          </header>
          <section
            class="modal-body"
            style="background-color: ${this.config.bodyColor}"
          >
            <div class="content">
              <div
                class="processing-logo ${this.config.showProcessingIndicator?"":"hidden"}"
              >
                <ia-activity-indicator
                  .mode=${this.config.processingImageMode}
                ></ia-activity-indicator>
              </div>
              ${this.config.headline?m` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?m` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(t){if(t.preventDefault(),t.type==="keydown"&&t.key!==" "&&t.key!=="Enter")return;const e=new Event("closeButtonPressed");this.dispatchEvent(e)}get closeButtonTemplate(){return m`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}static get styles(){const t=g`var(--modalLogoSize, 6.5rem)`,e=g`var(--processingImageSize, 7.5rem)`,i=g`var(--modalCornerRadius, 1rem)`,s=g`var(--modalBorder, 2px solid black)`,o=g`var(--modalBottomMargin, 2.5rem)`,r=g`var(--modalTopMargin, 5rem)`,d=g`var(--modalHeaderBottomPadding, 0.5em)`,a=g`var(--modalBottomPadding, 2rem)`,l=g`var(--modalScrollOffset, 5px)`,u=g`var(--modalTitleFontSize, 1.8rem)`,c=g`var(--modalSubtitleFontSize, 1.4rem)`,h=g`var(--modalHeadlineFontSize, 1.6rem)`,p=g`var(--modalMessageFontSize, 1.4rem)`,b=g`var(--modalTitleLineHeight, normal)`,w=g`var(--modalSubtitleLineHeight, normal)`,Y=g`var(--modalHeadlineLineHeight, normal)`,X=g`var(--modalMessageLineHeight, normal)`;return g`
      .processing-logo {
        margin: auto;
        width: ${e};
        height: ${e};
      }

      .processing-logo.hidden {
        height: 1rem;
      }

      .processing-logo.hidden ia-activity-indicator {
        display: none;
      }

      .modal-wrapper {
        outline: none;
      }

      .modal-container {
        border-radius: ${i};
        width: 100%;
        margin-top: ${r};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${i}) calc(${i}) 0 0;
        border: ${s};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${d};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${u};
        font-weight: bold;
        line-height: ${b};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${c};
        line-height: ${w};
      }

      .modal-body {
        background-color: #f5f5f7;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${s};
        border-top: 0;
        padding: 0 1rem calc(${a} - ${l}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${o}));
        min-height: 5rem;
        padding: 0 0 calc(${l}) 0;
      }

      .headline {
        font-size: ${h};
        font-weight: bold;
        text-align: center;
        line-height: ${Y};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${p};
        line-height: ${X};
      }

      .logo-icon {
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18),
          0 2px 2px 0 rgba(0, 0, 0, 0.08);
        width: ${t};
        height: ${t};
        margin: -2.9rem auto 0.5rem auto;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo-icon svg {
        width: calc(${t} * 0.65);
        height: calc(${t} * 0.65);
      }

      .logo-icon svg .fill-color {
        fill: white;
      }

      .logo-icon svg .stroke-color {
        stroke: red;
      }

      .close-button {
        position: absolute;
        right: 1.2rem;
        top: 1.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        border: 0;
        padding: 0;
        cursor: pointer;
        background-color: white;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18),
          0 4px 4px 0 rgba(0, 0, 0, 0.08);
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      slot::slotted(.sr-only) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    `}};J([oe({type:Object})],Ve.prototype,"config",void 0);Ve=J([Cs("modal-template")],Ve);function po(n,t,e){var i=e||{},s=i.noTrailing,o=s===void 0?!1:s,r=i.noLeading,d=r===void 0?!1:r,a=i.debounceMode,l=a===void 0?void 0:a,u,c=!1,h=0;function p(){u&&clearTimeout(u)}function b(Y){var X=Y||{},O=X.upcomingOnly,ve=O===void 0?!1:O;p(),c=!ve}function w(){for(var Y=arguments.length,X=new Array(Y),O=0;O<Y;O++)X[O]=arguments[O];var ve=this,ai=Date.now()-h;if(c)return;function Kt(){h=Date.now(),t.apply(ve,X)}function li(){u=void 0}!d&&l&&!u&&Kt(),p(),l===void 0&&ai>n?d?(h=Date.now(),o||(u=setTimeout(l?li:Kt,n))):Kt():o!==!0&&(u=setTimeout(l?li:Kt,l===void 0?n-ai:n))}return w.cancel=b,w}var K;(function(n){n.Open="open",n.Closed="closed"})(K||(K={}));class go{constructor(t){this.windowResizeThrottler=po(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=t}handleModeChange(t){switch(t){case K.Open:this.startResizeListener(),this.stopDocumentScroll();break;case K.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let wt=class extends x{constructor(){super(...arguments),this.mode=K.Closed,this.hostBridge=new go(this),this.modal=new Cn(this),this.closeOnBackdropClick=!0}firstUpdated(){return Ei(this,void 0,void 0,function*(){yield new Promise(t=>setTimeout(t,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",t=>{t.key==="Escape"&&this.backdropClicked()})})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return m`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=K.Closed,this.customModalContent=void 0,this.modalTemplate.config=new G,this.modal.deactivate()}callUserClosedModalCallback(){const t=this.userClosedModalCallback;this.userClosedModalCallback=void 0,t&&t()}showModal(t){return Ei(this,void 0,void 0,function*(){this.closeOnBackdropClick=t.config.closeOnBackdropClick,this.userClosedModalCallback=t.userClosedModalCallback,this.modalTemplate.config=t.config,this.customModalContent=t.customModalContent,this.mode=K.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus(),this.modal.activate()})}updated(t){t.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const t=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(t)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const t=g`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,e=g`var(--modalBackdropZindex, 1000)`,i=g`var(--modalWidth, 32rem)`,s=g`var(--modalMaxWidth, 95%)`,o=g`var(--modalZindex, 2000)`;return g`
      .container {
        width: 100%;
        height: 100%;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        background-color: ${t};
        width: 100%;
        height: 100%;
        z-index: ${e};
      }

      modal-template {
        outline: 0;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: ${o};
        width: ${i};
        max-width: ${s};
      }
    `}};J([oe({type:String,reflect:!0})],wt.prototype,"mode",void 0);J([oe({type:Object})],wt.prototype,"customModalContent",void 0);J([oe({type:Object})],wt.prototype,"hostBridge",void 0);J([wn("modal-template")],wt.prototype,"modalTemplate",void 0);wt=J([Cs("modal-manager")],wt);function _t(n){return new Promise((t,e)=>{n.oncomplete=n.onsuccess=()=>t(n.result),n.onabort=n.onerror=()=>e(n.error)})}function fo(n,t){const e=indexedDB.open(n);e.onupgradeneeded=()=>e.result.createObjectStore(t);const i=_t(e);return(s,o)=>i.then(r=>o(r.transaction(t,s).objectStore(t)))}let Ie;function he(){return Ie||(Ie=fo("keyval-store","keyval")),Ie}function vo(n,t=he()){return t("readonly",e=>_t(e.get(n)))}function mo(n,t,e=he()){return e("readwrite",i=>(i.put(t,n),_t(i.transaction)))}function wo(n,t=he()){return t("readwrite",e=>(e.delete(n),_t(e.transaction)))}function bo(n,t){return n.openCursor().onsuccess=function(){!this.result||(t(this.result),this.result.continue())},_t(n.transaction)}function $o(n=he()){return n("readonly",t=>{if(t.getAllKeys)return _t(t.getAllKeys());const e=[];return bo(t,i=>e.push(i.key)).then(()=>e)})}function yo(n,t){return n.setMilliseconds(n.getMilliseconds()+t*1e3),n}class Us{constructor(t){var e,i,s,o;if(this.namespace=(e=t==null?void 0:t.namespace)!==null&&e!==void 0?e:"LocalCache",this.defaultTTL=(i=t==null?void 0:t.defaultTTL)!==null&&i!==void 0?i:15*60,(!((s=t==null?void 0:t.immediateClean)!==null&&s!==void 0)||s)&&this.cleanExpired(),!(t!=null&&t.disableCleaning)){const r=(o=t==null?void 0:t.cleaningInterval)!==null&&o!==void 0?o:60;setInterval(()=>{this.cleanExpired()},r*1e3)}}async set(t){var e;const i={value:t.value},s=(e=t.ttl)!==null&&e!==void 0?e:this.defaultTTL,o=yo(new Date,s);i.expires=o;const r=this.getNamespacedKey(t.key);try{await mo(r,i)}catch{}}async get(t){const e=this.getNamespacedKey(t);let i;try{i=await vo(e)}catch{}if(!i)return;const s=new Date;if(i.expires&&i.expires<s){await this.delete(t);return}return i.value}async delete(t){const e=this.getNamespacedKey(t);try{await wo(e)}catch{}}async cleanExpired(){const t=await this.getAllKeys();await Promise.all(t.map(async e=>this.get(e)))}async getAllKeys(){let t=[];try{t=await $o()}catch{}const e=[];for(const o of t)typeof o=="string"&&e.push(o);return e.filter(o=>o.startsWith(this.namespace)).map(o=>this.removeNamespace(o))}getNamespacedKey(t){return`${this.namespace}-${t}`}removeNamespace(t){return t.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ds={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zs=n=>(...t)=>({_$litDirective$:n,values:t});class Ws{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ns=zs(class extends Ws{constructor(n){var t;if(super(n),n.type!==Ds.ATTRIBUTE||n.name!=="class"||((t=n.strings)===null||t===void 0?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){var e,i;if(this.it===void 0){this.it=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in t)t[o]&&!(!((e=this.nt)===null||e===void 0)&&e.has(o))&&this.it.add(o);return this.render(t)}const s=n.element.classList;this.it.forEach(o=>{o in t||(s.remove(o),this.it.delete(o))});for(const o in t){const r=!!t[o];r===this.it.has(o)||((i=this.nt)===null||i===void 0?void 0:i.has(o))||(r?(s.add(o),this.it.add(o)):(s.remove(o),this.it.delete(o)))}return M}});class k{static isInIframe(){var t;try{return window.self!==window.top}catch(e){return(t=window==null?void 0:window.Sentry)==null||t.captureException(e),!0}}static getRedirectUrl(){let t;return k.isInIframe()?t=window.top.location.href:t=window.location.href,t}static goToUrl(t,e){let i;k.isInIframe()&&e?i=window.top.location:i=window.location,i.href===t?i.reload():i.href=t}static isOnStreamPage(){return window.location.href.indexOf("/stream/")>-1}static getQueryParam(t){const i=window.location.search.substring(1).split("&");let s="";for(let o=0;o<i.length;o+=1)if(s=i[o].split("="),s[0]===t)return s[1];return $}static getBackHref(){return window.location.href.replace(/[?&]{1}(?:admin|access)=1/,"")}static formatUrl(t,e){return/^https?:/.test(e)?e:`${t}${e}`}}const T={disconnectedCallback:"IABookActions:disconnectedCallback",bookHasRenewed:"IABookActions:handleLoanAutoRenewed - book has renewed for next one hour",bookRenewFailed:"IABookActions:handleLoanRenewNow - failed to renew",browseHasExpired:"IABookActions:browseHasExpired - one-hour loan has been expired",bookWasExpired:"IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller",clearTokenPoller:"IABookActions:startLoanTokenPoller - clearing token poller interval",clearOneHourTimer:"IABookActions:timerCountdown - one-hour timer interval cleared",bookAccessed:"IABookActions:bookAccessed",handleLoanTokenPoller:"IABookActions:handleLoanTokenPoller",setConsecutiveLoanCounts:"IABookActions:setConsecutiveLoanCounts",actionsHandlerService:"IABookActions:actionsHandlerService"},y=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)?console.log.bind(console):()=>{};async function j(n){var l,u;const t={action:null,identifier:"",success(){},error(){},...n};let e="/services/loans/loan";const i=window==null?void 0:window.location,s="loan token not found. please try again later.",o="This book is not available to borrow at this time. Please try again later.",r=["browse_book","borrow_book","create_token","renew_loan","return_loan"],d=((l=i==null?void 0:i.href)==null?void 0:l.indexOf("?error=true"))!==-1&&(i==null?void 0:i.hostname)!=="archive.org";(i==null?void 0:i.pathname)==="/demo/"&&(e="/demo/");let a=new FormData;a.append("action",t.action),a.append("identifier",t.identifier);try{await fetch(e,{method:"POST",body:a}).then(async c=>d&&r.includes(t==null?void 0:t.action)?{success:!1,error:(t==null?void 0:t.action)==="create_token"?s:o}:e=="/demo/1"||e=="/demo/"?(t==null?void 0:t.action)=="renew_loan"||(t==null?void 0:t.action)=="return_loan"?(await new Promise(h=>setTimeout(h,5e3)),{success:!0,loan:{renewal:!0}}):{success:!0,message:"operation executed successfully!"}:c.json()).then(c=>{c!=null&&c.error?t==null||t.error(c):t==null||t.success(c)})}catch(c){(u=window==null?void 0:window.Sentry)==null||u.captureException(`${T.actionsHandlerService} - Error: ${c}`)}}const ue={borrow:"BookReader-ReadingBorrow",browse:"BookReader-ReadingBrowse",preview:"BookReader-Preview",satisfactionMetric:"DetailsPage-Book",bookReaderHeader:"BookReader-Header",adminAccess:"Admin-Access"},ri={browse:"Borrow-1Hour",browseAgain:"Borrow-Again",browseAutoRenew:"AutoRenewBook",browseAutoReturn:"AutoReturnBook",borrow:"Borrow-14Days",waitlistJoin:"JoinWaitlist",waitlistLeave:"LeaveWaitlist",doneBorrowing:"ReturnBook",login:"LogIn",purchase:"BWBPurchase",unavailable:"Book-Unavailable",printDisability:"Print-Disability",titleBar:"Book-Title-Bar"};function _o(n){return n&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(n).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}function Ke(n,t,e,i,s,o){return document.cookie=encodeURIComponent(n)+"="+encodeURIComponent(t)+(e?`; expires=${e.toUTCString()}`:"")+(s?`; domain=${s}`:"")+(i?`; path=${i}`:"")+(o?"; secure":""),!0}class js{constructor(){this.identifier=void 0,this.gaStats={}}async storeLoanStatsCount(t,e=""){this.identifier=t;try{await this.getLoanStatsCount(e);const i=new Date;i.setHours(i.getHours()+2),await Ke(this.getLoanCountStorageKey,JSON.stringify(this.lendingEventCounts),i,"/")}catch(i){y(i),this.sendEvent("Cookies-Error-Actions",i,this.identifier)}}async getLoanStatsCount(t){var d,a,l,u,c,h,p,b,w;this.lendingEventCounts=JSON.parse(await _o(this.getLoanCountStorageKey)),this.gaStats=(d=this.lendingEventCounts)!=null?d:{browse:0,renew:0,expire:0};let e=(l=(a=this.lendingEventCounts)==null?void 0:a.browse)!=null?l:0,i=(c=(u=this.lendingEventCounts)==null?void 0:u.renew)!=null?c:0,s=(p=(h=this.lendingEventCounts)==null?void 0:h.expire)!=null?p:0;switch(t){case"browse":e=e?Number(e)+1:1,this.gaStats.browse=e,i=0,s=0;break;case"autorenew":i=i?Number(i)+1:1,this.gaStats.renew=i;break;case"return":s=s?Number(s)+1:1,this.gaStats.expire=s,i=0,s=0;break}this.lendingEventCounts={browse:e,renew:i,expire:s};const o=ue.browse,r=`browse${this.paddedNumber((b=this.gaStats)==null?void 0:b.browse)}-autorenew${this.paddedNumber((w=this.gaStats)==null?void 0:w.renew)}:${t}`;this.sendEvent(o,r,this.identifier)}paddedNumber(t){return t?t.toString().padStart(3,"0"):"000"}get getLoanCountStorageKey(){return`br-browse-${this.identifier}`}sendEvent(t,e,i,s){var o;(o=window==null?void 0:window.archive_analytics)==null||o.send_event_no_sampling(t,e,i||this.identifier,s)}}class Fs extends x{constructor(){super(),this.waitUntillBorrowComplete=6,this.loanAnanlytics=new js,this.bindEvents()}bindEvents(){this.addEventListener("browseBook",async()=>{var t;this.handleBrowseIt(),await((t=this.loanAnanlytics)==null?void 0:t.storeLoanStatsCount(this.identifier,"browse"))}),this.addEventListener("browseBookAgain",async()=>{var t;this.handleBrowseIt(),await((t=this.loanAnanlytics)==null?void 0:t.storeLoanStatsCount(this.identifier,"browseagain"))}),this.addEventListener("autoRenew",async()=>{var t;this.handleLoanRenewNow(),await((t=this.loanAnanlytics)==null?void 0:t.storeLoanStatsCount(this.identifier,"autorenew"))}),this.addEventListener("autoReturn",async()=>{var t;this.handleReturnIt(),await((t=this.loanAnanlytics)==null?void 0:t.storeLoanStatsCount(this.identifier,"autoreturn"))}),this.addEventListener("returnNow",({detail:t})=>{var e,i;if((t==null?void 0:t.borrowType)==="browse"&&((e=this.loanAnanlytics)==null||e.storeLoanStatsCount(this.identifier,"return")),this.handleReturnIt("returnNow"),(t==null?void 0:t.borrowType)==="borrow"){const{category:s,action:o}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(s,o,this.identifier)}}),this.addEventListener("borrowBook",({detail:t})=>{var s;this.handleBorrowIt();const{category:e,action:i}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(e,i,this.identifier)}),this.addEventListener("loginAndBorrow",({detail:t})=>{var s;this.handleLoginOk();const{category:e,action:i}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(e,i,this.identifier)}),this.addEventListener("leaveWaitlist",({detail:t})=>{var s;this.handleRemoveFromWaitingList();const{category:e,action:i}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(e,i,this.identifier)}),this.addEventListener("joinWaitlist",({detail:t})=>{var s;this.handleReserveIt();const{category:e,action:i}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(e,i,this.identifier)}),this.addEventListener("purchaseBook",({detail:t})=>{var s;const{category:e,action:i}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(e,i,this.identifier)}),this.addEventListener("adminAccess",({detail:t})=>{var o;const{category:e,action:i}=t.event;(o=this.loanAnanlytics)==null||o.sendEvent(e,i,this.identifier);const s=new URL(window.location.href);s.searchParams.append("admin",1),window.location.search=s.search}),this.addEventListener("exitAdminAccess",({detail:t})=>{var s;const{category:e,action:i}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(e,i,this.identifier)}),this.addEventListener("bookTitleBar",({detail:t})=>{var s;const{category:e,action:i}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(e,i,this.identifier)})}handleBrowseIt(){const t="browse_book";this.dispatchToggleActionGroup(),j({action:t,identifier:this.identifier,success:()=>{this.setBrowseTimeSession(),this.handleReadItNow()},error:e=>{this.dispatchActionError(t,e)}})}handleLoanRenewNow(){const t="renew_loan";j({action:t,identifier:this.identifier,success:e=>{var o;y("RENEW_LOAN --- ",e,t,e.loan,this.identifier);const i=e.loan?e.loan:void 0,s=i.renewal;i&&s?this.setBrowseTimeSession():(y("RENEW_LOAN ERROR --- ",{action:t,isRenewal:s,activeLoan:i,data:e,id:this.identifier}),(o=window==null?void 0:window.Sentry)==null||o.captureMessage(`${T.bookRenewFailed} - Error: ${JSON.stringify(e)}`),this.dispatchActionError(t,{data:e,error:!0,message:"Loan renewal failed: no loan active."})),this.dispatchEvent(new CustomEvent("loanAutoRenewed",{detail:{action:t,data:{...e,loan:i}}}))},error:e=>{this.dispatchActionError(t,e)}})}handleReturnIt(t=""){const e="return_loan";t==="returnNow"&&this.dispatchToggleActionGroup(),j({action:e,identifier:this.identifier,success:()=>{this.deleteLoanCookies(),t==="returnNow"&&k.goToUrl(this.returnUrl,!0)},error:i=>{this.dispatchActionError(e,i)}})}handleBorrowIt(){const t="borrow_book";this.dispatchToggleActionGroup(),j({action:t,identifier:this.identifier,success:()=>{this.handleReadItNow()},error:e=>{this.dispatchActionError(t,e)}})}handleReserveIt(){const t="join_waitlist";this.dispatchToggleActionGroup(),j({action:t,identifier:this.identifier,success:()=>{k.goToUrl(k.getRedirectUrl(),!0)},error:e=>{this.dispatchActionError(t,e)}})}handleRemoveFromWaitingList(){const t="leave_waitlist";this.dispatchToggleActionGroup(),j({action:t,identifier:this.identifier,success:()=>{k.goToUrl(k.getRedirectUrl(),!0)},error:e=>{this.dispatchActionError(t,e)}})}dispatchActionError(t,e={}){var i;(i=this.loanAnanlytics)==null||i.sendEvent("LendingServiceError",t),this.dispatchEvent(new CustomEvent("lendingActionError",{detail:{action:t,data:e}}))}dispatchToggleActionGroup(){this.dispatchEvent(new CustomEvent("toggleActionGroup"))}handleLoginOk(){const t=`/account/login?referer=${encodeURIComponent(k.getRedirectUrl())}`;k.goToUrl(t,!0)}handleReadItNow(t){const e=new URLSearchParams(window.location.search);if(t){const r=new URLSearchParams(t);for(const[d,a]of r.entries())e.append(d,a)}const i=e.toString(),s=i?`?${i}`:"",o=window.location.origin+window.location.pathname+s;setTimeout(()=>{k.goToUrl(o,!0)},this.waitUntillBorrowComplete*1e3)}async setBrowseTimeSession(){try{const t=new Date(new Date().getTime()+this.loanTotalTime*1e3);await this.localCache.set({key:`${this.identifier}-loanTime`,value:t,ttl:Number(this.loanTotalTime)}),await this.localCache.delete(`${this.identifier}-pageChangedTime`)}catch(t){y(t)}}deleteLoanCookies(){const t=new Date;t.setTime(t.getTime()-24*60*60*1e3),Ke(`loan-${this.identifier}=""`,"",t,"/",".archive.org"),Ke(`br-loan-${this.identifier}=""`,"",t,"/",".archive.org")}}const os=g`var(--white, #fff)`,Ao=g`var(--primaryDisableCTAFill, #767676)`,Co=g`var(--secondaryCTABorder, #999)`,Eo=g`var(--primaryCTAFill, #194880)`,Me=g`var(--primaryCTAFillRGB, 25, 72, 128)`,So=g`var(--primaryCTABorder, #c5d1df)`,ko=g`var(--primaryErrorCTAFill, #d9534f)`,Oe=g`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,Lo=g`var(--primaryErrorCTABorder, #d43f3a)`,xo=g`var(--secondaryCTAFill, #333)`,Ne=g`var(--secondaryCTAFillRGB, 51, 51, 51)`,To=g`var(--primaryCTABorder, #979797)`,Ro=g`#ee8950`,Bo=g`#ec7939`;var Po=g`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${os};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 1rem;
    outline-color: ${os};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${Ao};
    border: 1px solid ${Co};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${Ro}
    border-color: ${Bo};
  }

  .ia-button.primary {
    background-color: ${Eo};
    border-color: ${So};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Me}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Me}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Me}, 0.7);
  }

  .ia-button.danger {
    background-color: ${ko};
    border-color: ${Lo};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Oe}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Oe}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Oe}, 0.7);
  }

  .ia-button.dark {
    background-color: ${xo};
    border-color: ${To};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Ne}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Ne}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Ne}, 0.7);
  }
`;const Q=g`var(--white, #fff)`,rs=g`var(--primaryBGColor, #000)`,Ho=g`var(--iaBookActionsDropdownBGColor, #2d2d2d)`;var Io=g`
  :host {
    display: inline-flex;
    height: 3.5rem;
    padding: 1rem 0;
  }
  .actiongroup {
    display: flex;
    margin-right: 10px;
  }
  .action-buttons {
    display: inline-flex;
    align-items: center;
  }
  .action-buttons .ia-button {
    margin: 0;
    height: 3.5rem;
    padding: 0 2rem;
  }
  .action-buttons .desktop {
    background-color: ${Q};
    border-radius: 10px;
  }
  .action-buttons .desktop.purchase {
    margin-left: 5px;
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${Q};
    margin-right: 4px;
  }
  .primary,
  .secondary {
    position: relative;
    border-radius: 5px;
  }
  .primary .initial {
    border-radius: 4px 0 0 4px;
    margin-right: 0;
  }
  .primary svg {
    vertical-align: middle;
  }

  .secondary .ia-button.purchase {
    padding: 2px 10px 2px 35px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .secondary .ia-button.exit-admin {
    background-color: ${rs};
    border: 1px solid ${Q};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    background: ${Ho};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${rs};
    list-style: none;
    height: 3rem;
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${Q};
    border: none;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    height: 3rem;
    position: relative;
    padding: 0.6rem 1.2rem;
    margin: 0;
  }
  .dropdown-content .ia-button:is(:focus-visible, :hover) {
    background: unset;
  }
  .dropdown-content li .ia-button {
    border-radius: 0;
  }
  .dropdown-content li .ia-button:hover {
    background: ${Q};
    color: rgb(45, 45, 45);
  }
  .dropdown-content li:first-child .ia-button {
    border-radius: 0.3rem 0.3rem 0 0;
  }
  .dropdown-content li:last-child .ia-button {
    border-radius: 0;
    border-radius: 0 0 0.3rem 0.3rem;
  }
  .dropdown-content .purchase:hover svg g {
    fill: black;
  }
  .dropdown-content .purchase {
    padding-left: 35px;
    margin: 0;
  }
  .dropdown-content .purchase small {
    display: initial;
    font-size: 1.4rem;
  }

  .ia-button.down-arrow {
    border-radius: 0 0.4rem 0.4rem 0;
    padding: 0 0.6rem;
    margin-left: 0;
  }
  .actionloader {
    vertical-align: middle;
    visibility: hidden;
    padding: 0.9rem 0.2rem;
  }
  .close {
    display: none;
  }
  .open {
    display: block;
    z-index: 2;
  }
  .visible {
    display: inline-block;
  }
  .btn:hover,
  .dropdown:hover .btn {
    background-color: ${Q};
  }
  a {
    text-decoration: none;
  }
  .purchase small {
    display: block;
    font-size: 1rem;
  }
  .purchase svg {
    position: absolute;
    left: 10px;
    top: 20%;
  }
  .unavailable {
    opacity: 0.7;
    pointer-events: none;
  }
  .disabled {
    opacity: 0.8;
    pointer-events: none;
    visibility: visible;
  }
`;const as=700,Mo=800,Oo=m`<svg
  height="20"
  viewBox="0 0 75 75"
  width="20"
  xmlns="http://www.w3.org/2000/svg"
>
  <g fill="#fff" fill-rule="evenodd" transform="translate(0 13.736264)">
    <path
      d="m22.8463837 18.2119173c6.5756797.1478113 10.585751 1.8020104 13.0298545 3.5887422l3.9291669 17.6234408c-4.8169735 1.3742664-9.2153954 4.1561307-12.6728799 7.9003587-5.9346575-9.1046945-13.627732-14.2752618-26.92576083-19.445829l.0576431-.0724863.08436419-.1026121c1.1105031-1.331793 8.72437099-9.8023542 22.49761204-9.4916143z"
    />
    <path
      d="m74.9439846 1.1046788c-8.1318682 11.7830147-14.8351649 24.4553135-17.2527473 38.4615385-2.8571429-1.0004447-5.9340659-1.5562473-9.1208791-1.5562473-1.3812656 0-2.7625312.1317192-4.0892393.3399693l-2.9788221-18.0144913c6.444022-11.67552841 19.228784-18.40456144 32.9707606-19.20539059z"
    />
    <path
      d="m36.8571258 21.719357 3.6273911-.8052884 2.5793903 17.8073684c-.7020757.1150413-1.4041514.2300825-2.1062271.4601649z"
    />
    <path
      d="m70.1594803.55538282c-13.7069528 2.06173881-23.764449 8.35192747-29.6753948 19.07620888l-.2624906.5200262-3.7425669.8013234c-2.8059684-1.7413364-5.5070193-3.8778459-12.5979079-4.0336896-7.5995702-.1676376-12.2045639 1.9616824-16.46353768 3.7996974l.57415955-.5673312c4.03313533-3.936109 8.45564043-7.3737923 14.98104763-8.4391649 4.9512458-.776666 10.8981852.1535901 14.8163388 6.4911269.6044492-19.13367701 23.3058132-18.5735241 32.3703519-17.64819708z"
    />
  </g>
</svg>`,No=m`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
    fill="#fff"
  />
</svg>`,Ue=m`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill="#fff"
  />
</svg>`;class Uo extends Fs{static get properties(){return{userid:{type:String},identifier:{type:String},primaryActions:{type:Array},secondaryActions:{type:Array},primaryColor:{type:String},dropdownState:{type:String},width:{type:Number},hasAdminAccess:{type:Boolean},dropdownArrow:{type:String},disabled:{type:Boolean},returnUrl:{type:String},autoRenew:{type:Boolean},autoReturn:{type:Boolean},returnNow:{type:Boolean}}}constructor(){super(),this.userid="",this.identifier="",this.primaryActions=[],this.secondaryActions=[],this.primaryColor="",this.dropdownState="close",this.width=0,this.hasAdminAccess=!1,this.dropdownArrow=Ue,this.initialButton=!1,this.title="",this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.disabled=!1,this.returnUrl="",this.autoRenew=!1,this.autoReturn=!1,this.returnNow=!1}updated(t){(t.has("width")||t.has("disabled"))&&this.isBelowTabletContainer&&this.resetActions(),t.has("autoRenew")&&this.autoRenew&&this.dispatchLoanEvent("autoRenew");const e=t.has("autoReturn")&&this.autoReturn;e&&this.dispatchLoanEvent("autoReturn"),t.has("returnNow")&&this.returnNow&&!e&&this.dispatchLoanEvent("returnNow",{borrowType:"browse"})}dispatchLoanEvent(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e}))}resetActions(){this.primaryActions.length&&(this.primaryActions=this.primaryActions.concat(this.secondaryActions),this.primaryColor=this.primaryActions[0].className,this.hasAdminAccess&&this.sortActionButtonOrder(),this.secondaryActions=[])}sortActionButtonOrder(){let t=1;const e=0;this.secondaryActions.length===2&&(t=2),t=this.primaryActions.length-t;const i=this.primaryActions[t],s=this.primaryActions;s.splice(t,1),s.splice(e,0,i),this.primaryActions=s}render(){return m`
      <div
        class="${ns({actiongroup:!0,disabled:this.disabled})}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `}get renderPrimaryActions(){return this.primaryActions.length===0?$:(this.dropdownState==="close"&&(this.primaryColor=this.primaryActions[0].className),this.primaryActions.length===1?this.initialActionTemplate:m`
      ${this.initialActionTemplate}
      <button
        class="ia-button ${this.primaryColor} down-arrow"
        @click=${this.toggleDropdown}
      >
        ${this.dropdownArrow}
      </button>

      <ul class="dropdown-content ${this.dropdownState}">
        ${this.getPrimaryItems}
      </ul>
    `)}get renderSecondaryActions(){return this.secondaryActions.length?this.secondaryActions.map(t=>this.renderActionButton(t)):$}renderActionLink(t,e=!1){return m`<span class="${this.getDeviceType} ${t.className}">
      <a
        class="ia-button ${t.className} ${e?"initial":""}"
        href="${t.url}"
        target=${t.target}
        @click=${()=>{this.clickHandler(t.id,t.analyticsEvent,t==null?void 0:t.borrowType)}}
      >
        ${t.id==="purchaseBook"?Oo:""} ${t.text}
        <small>${t.subText}</small>
      </a>
    </span>`}renderActionButton(t,e=!1){if(t.url)return this.renderActionLink(t,e);const{analyticsEvent:i}=t;return m`<button
      class="ia-button ${t.className} ${e?"initial":""}"
      @click=${()=>{this.clickHandler(t.id,i,t==null?void 0:t.borrowType)}}
    >
      ${t.text}
    </button>`}clickHandler(t,e,i=""){if(this.dropdownState="close",this.dropdownArrow=Ue,!e||!t)return;const{category:s,action:o}=e;this.dispatchEvent(new CustomEvent(t,{detail:{event:{category:s,action:o},borrowType:i}}))}get initialActionTemplate(){return this.initialButton=!1,this.primaryActions.length>1&&(this.initialButton=!0),this.renderActionButton(this.primaryActions[0],this.initialButton)}get getPrimaryItems(){return this.primaryActions.slice(1).map(t=>m`<li>${this.renderActionButton(t,this.initialButton)}</li>`)}get getLoaderIcon(){return m`<img
      class="${ns({actionloader:!0,disabled:this.disabled})}"
      alt=""
      src="${this.loaderIcon}"
    />`}get isBelowTabletContainer(){return this.width<=Mo}get getDeviceType(){return this.isBelowTabletContainer?"mobile":"desktop"}toggleDropdown(){this.dropdownState==="open"?(this.dropdownState="close",this.dropdownArrow=Ue,this.primaryColor=this.primaryActions[0].className):(this.dropdownState="open",this.dropdownArrow=No,this.primaryColor="dark")}static get styles(){return[Po,Io]}}window.customElements.define("collapsible-action-group",Uo);const Do=m`
  <svg
    class="ia-logo"
    width="26"
    height="26"
    viewBox="0 0 27 30"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="logoTitleID logoDescID"
  >
    <title id="logoTitleID">Internet Archive logo</title>
    <desc id="logoDescID">
      A line drawing of the Internet Archive headquarters building façade.
    </desc>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <mask id="mask-2" fill="white">
        <path
          d="M26.6666667,28.6046512 L26.6666667,30 L0,30 L0.000283687943,28.6046512 L26.6666667,28.6046512 Z M25.6140351,26.5116279 L25.6140351,28.255814 L1.05263158,28.255814 L1.05263158,26.5116279 L25.6140351,26.5116279 Z M3.62469203,7.6744186 L3.91746909,7.82153285 L4.0639977,10.1739544 L4.21052632,13.9963932 L4.21052632,17.6725617 L4.0639977,22.255044 L4.03962296,25.3421929 L3.62469203,25.4651163 L2.16024641,25.4651163 L1.72094074,25.3421929 L1.55031755,22.255044 L1.40350877,17.6970339 L1.40350877,14.0211467 L1.55031755,10.1739544 L1.68423854,7.80887484 L1.98962322,7.6744186 L3.62469203,7.6744186 Z M24.6774869,7.6744186 L24.9706026,7.82153285 L25.1168803,10.1739544 L25.2631579,13.9963932 L25.2631579,17.6725617 L25.1168803,22.255044 L25.0927809,25.3421929 L24.6774869,25.4651163 L23.2130291,25.4651163 L22.7736357,25.3421929 L22.602418,22.255044 L22.4561404,17.6970339 L22.4561404,14.0211467 L22.602418,10.1739544 L22.7369262,7.80887484 L23.0420916,7.6744186 L24.6774869,7.6744186 Z M9.94042303,7.6744186 L10.2332293,7.82153285 L10.3797725,10.1739544 L10.5263158,13.9963932 L10.5263158,17.6725617 L10.3797725,22.255044 L10.3556756,25.3421929 L9.94042303,25.4651163 L8.47583122,25.4651163 L8.0362015,25.3421929 L7.86556129,22.255044 L7.71929825,17.6970339 L7.71929825,14.0211467 L7.86556129,10.1739544 L8.00005604,7.80887484 L8.30491081,7.6744186 L9.94042303,7.6744186 Z M18.0105985,7.6744186 L18.3034047,7.82153285 L18.449948,10.1739544 L18.5964912,13.9963932 L18.5964912,17.6725617 L18.449948,22.255044 L18.425851,25.3421929 L18.0105985,25.4651163 L16.5460067,25.4651163 L16.1066571,25.3421929 L15.9357367,22.255044 L15.7894737,17.6970339 L15.7894737,14.0211467 L15.9357367,10.1739544 L16.0702315,7.80887484 L16.3753664,7.6744186 L18.0105985,7.6744186 Z M25.6140351,4.53488372 L25.6140351,6.97674419 L1.05263158,6.97674419 L1.05263158,4.53488372 L25.6140351,4.53488372 Z M13.0806755,0 L25.9649123,2.93331338 L25.4484139,3.8372093 L0.771925248,3.8372093 L0,3.1041615 L13.0806755,0 Z"
          id="path-1"
        ></path>
      </mask>
      <use fill="#FFFFFF" xlink:href="#path-1"></use>
      <g mask="url(#mask-2)" fill="#FFFFFF">
        <path
          d="M0,0 L26.6666667,0 L26.6666667,30 L0,30 L0,0 Z"
          id="swatch"
        ></path>
      </g>
    </g>
  </svg>
`;class zo extends Fs{static get properties(){return{identifier:{type:String},bookTitle:{type:String}}}constructor(){super(),this.identifier="",this.bookTitle="",this.analyticsCategories=ue,this.analyticsActions=ri}clickHandler(){const{category:t,action:e}={category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.titleBar};this.dispatchEvent(new CustomEvent("bookTitleBar",{detail:{event:{category:t,action:e}}}))}render(){return m`
      <a
        class="embed-link"
        @click=${()=>{this.clickHandler()}}
        href="/details/${this.identifier}"
      >
        <span>${Do}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `}static get styles(){return g`
      :host {
        padding: 0 10px;
        height: 3.4rem;
        display: flex;
      }
      .embed-link {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--primaryTextColor, #fff);
        font-size: 1.4rem;
      }
      .embed-link .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: left;
        line-height: initial;
      }
      .embed-link svg {
        margin-right: 0.5rem;
        display: block;
      }
      .embed-link:hover {
        text-decoration: underline;
      }
    `}}window.customElements.define("book-title-bar",zo);class Wo extends x{static get properties(){return{texts:{type:String},textClass:{type:String}}}constructor(){super(),this.texts="",this.textClass=""}render(){return m`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `}static get styles(){return g`
      :host {
        display: inline-block;
      }
      .variable-texts {
        margin-right: 10px;
        vertical-align: middle;
        font-size: 1.7rem;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `}}window.customElements.define("text-group",Wo);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ze extends Ws{constructor(t){if(super(t),this.et=$,t.type!==Ds.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this.ft=void 0,this.et=t;if(t===M)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Ze.directiveName="unsafeHTML",Ze.resultType=1;const jo=zs(Ze);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var De;const bt=globalThis.trustedTypes,ls=bt?bt.createPolicy("lit-html",{createHTML:n=>n}):void 0,I=`lit$${(Math.random()+"").slice(9)}$`,qs="?"+I,Fo=`<${qs}>`,$t=document,se=(n="")=>$t.createComment(n),jt=n=>n===null||typeof n!="object"&&typeof n!="function",Gs=Array.isArray,qo=n=>{var t;return Gs(n)||typeof((t=n)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},Tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cs=/-->/g,ds=/>/g,W=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,hs=/'/g,us=/"/g,Vs=/^(?:script|style|textarea|title)$/i,Ft=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),ps=new WeakMap,ot=$t.createTreeWalker($t,129,null,!1),Go=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=Tt;for(let a=0;a<e;a++){const l=n[a];let u,c,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,c=r.exec(l),c!==null);)p=r.lastIndex,r===Tt?c[1]==="!--"?r=cs:c[1]!==void 0?r=ds:c[2]!==void 0?(Vs.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=W):c[3]!==void 0&&(r=W):r===W?c[0]===">"?(r=s!=null?s:Tt,h=-1):c[1]===void 0?h=-2:(h=r.lastIndex-c[2].length,u=c[1],r=c[3]===void 0?W:c[3]==='"'?us:hs):r===us||r===hs?r=W:r===cs||r===ds?r=Tt:(r=W,s=void 0);const b=r===W&&n[a+1].startsWith("/>")?" ":"";o+=r===Tt?l+Fo:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+I+b):l+I+(h===-2?(i.push(void 0),a):b)}const d=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ls!==void 0?ls.createHTML(d):d,i]};class qt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const d=t.length-1,a=this.parts,[l,u]=Go(t,e);if(this.el=qt.createElement(l,i),ot.currentNode=this.el.content,e===2){const c=this.el.content,h=c.firstChild;h.remove(),c.append(...h.childNodes)}for(;(s=ot.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(I)){const p=u[r++];if(c.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(I),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?Ko:w[1]==="?"?Jo:w[1]==="@"?Yo:ge})}else a.push({type:6,index:o})}for(const h of c)s.removeAttribute(h)}if(Vs.test(s.tagName)){const c=s.textContent.split(I),h=c.length-1;if(h>0){s.textContent=bt?bt.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],se()),ot.nextNode(),a.push({type:2,index:++o});s.append(c[h],se())}}}else if(s.nodeType===8)if(s.data===qs)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(I,c+1))!==-1;)a.push({type:7,index:o}),c+=I.length-1}o++}}static createElement(t,e){const i=$t.createElement("template");return i.innerHTML=t,i}}function yt(n,t,e=n,i){var s,o,r,d;if(t===Ft)return t;let a=i!==void 0?(s=e._$Cl)===null||s===void 0?void 0:s[i]:e._$Cu;const l=jt(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,e,i)),i!==void 0?((r=(d=e)._$Cl)!==null&&r!==void 0?r:d._$Cl=[])[i]=a:e._$Cu=a),a!==void 0&&(t=yt(n,a._$AS(n,t.values),a,i)),t}class Vo{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:$t).importNode(i,!0);ot.currentNode=o;let r=ot.nextNode(),d=0,a=0,l=s[0];for(;l!==void 0;){if(d===l.index){let u;l.type===2?u=new pe(r,r.nextSibling,this,t):l.type===1?u=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(u=new Xo(r,this,t)),this.v.push(u),l=s[++a]}d!==(l==null?void 0:l.index)&&(r=ot.nextNode(),d++)}return o}m(t){let e=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class pe{constructor(t,e,i,s){var o;this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=yt(this,t,e),jt(t)?t===E||t==null||t===""?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==Ft&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):qo(t)?this.S(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==E&&jt(this._$AH)?this._$AA.nextSibling.data=t:this.k($t.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=qt.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.m(i);else{const r=new Vo(o,this),d=r.p(this.options);r.m(i),this.k(d),this._$AH=r}}_$AC(t){let e=ps.get(t.strings);return e===void 0&&ps.set(t.strings,e=new qt(t)),e}S(t){Gs(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new pe(this.A(se()),this.A(se()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class ge{constructor(t,e,i,s,o){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=yt(this,t,e,0),r=!jt(t)||t!==this._$AH&&t!==Ft,r&&(this._$AH=t);else{const d=t;let a,l;for(t=o[0],a=0;a<o.length-1;a++)l=yt(this,d[i+a],e,a),l===Ft&&(l=this._$AH[a]),r||(r=!jt(l)||l!==this._$AH[a]),l===E?t=E:t!==E&&(t+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.C(t)}C(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class Ko extends ge{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===E?void 0:t}}const Zo=bt?bt.emptyScript:"";class Jo extends ge{constructor(){super(...arguments),this.type=4}C(t){t&&t!==E?this.element.setAttribute(this.name,Zo):this.element.removeAttribute(this.name)}}class Yo extends ge{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=yt(this,t,e,0))!==null&&i!==void 0?i:E)===Ft)return;const s=this._$AH,o=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==E&&(s===E||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Xo{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){yt(this,t)}}const gs=window.litHtmlPolyfillSupport;gs==null||gs(qt,pe),((De=globalThis.litHtmlVersions)!==null&&De!==void 0?De:globalThis.litHtmlVersions=[]).push("2.2.1");var Qo=oi`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title id="linkTitleID">Info icon</title>
  <desc id="linkDescID">Informative icon</desc>
    <path d="m0 0h100v100h-100z" fill="#000"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" class="fill-color" fill-rule="nonzero"/>
</svg>
`;class tr extends V{static get styles(){return F`
      :host {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .stroke-color {
        stroke: var(--iconStrokeColor);
      }
    `}render(){return Qo}}customElements.define("ia-icon-info",tr);class er extends x{static get properties(){return{iconClass:{type:String}}}constructor(){super(),this.iconClass="",this.helpURL="https://help.archive.org/help/borrowing-from-the-lending-library"}render(){return m`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `}get getInfoIcon(){return sn`${jo(this.icon)}`}static get styles(){return g`
      ia-icon-info {
        display: inline-block;
        width: 18px;
        height: 20px;
        vertical-align: middle;
        --iconFillColor: white;
      }
      .more-info-icon img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        background: white;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `}}window.customElements.define("info-icon",er);class ir extends x{static get properties(){return{secondsLeftOnLoan:{type:Number},displayTime:{type:Boolean}}}constructor(){super(),this.secondsLeftOnLoan=0,this.displayTime=!1}get minutesLeftOnLoan(){let t=Math.round(this.secondsLeftOnLoan);return t=Math.ceil(t/60),t<10?t=`0:0${t}`:t===60?t="1:00":t=`0:${t}`,t}get remainingTime(){const t="minute",e=this.minutesLeftOnLoan;return e!==1?`${e} ${t}s`:`${e} ${t}`}render(){const t=this.displayTime?"view":"hide";return m`
      <button
        id="timer-counter"
        class=${t}
        @click=${()=>{this.displayTime=!this.displayTime}}
        role="timer"
      >
        <span>${this.minutesLeftOnLoan}</span>
        <span class="sr-only">${this.remainingTime} left</span>
      </button>
    `}static get styles(){return g`
      :host {
        right: 0;
        margin-right: 10px;
        position: absolute;
      }

      .sr-only {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        margin: 0;
        padding: 0;
        border: none;
        overflow: hidden;
      }

      button#timer-counter {
        cursor: pointer;
      }

      .hide {
        opacity: 0;
      }

      .show {
        opacity: 1;
      }
    `}}window.customElements.define("timer-countdown",ir);window.IALendingIntervals={tokenPoller:0,timerCountdown:0,browseExpireTimeout:0,clearTokenPoller:()=>{window.clearInterval(window.IALendingIntervals.tokenPoller),window.IALendingIntervals.tokenPoller=0},clearTimerCountdown:()=>{window.clearInterval(window.IALendingIntervals.timerCountdown),window.IALendingIntervals.timerCountdown=0},clearBrowseExpireTimeout:()=>{window.clearTimeout(window.IALendingIntervals.browseExpireTimeout),window.IALendingIntervals.browseExpireTimeout=0},clearAll:()=>{var n,t,e;(n=window==null?void 0:window.IALendingIntervals)==null||n.clearTokenPoller(),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearTimerCountdown(),(e=window==null?void 0:window.IALendingIntervals)==null||e.clearBrowseExpireTimeout()}};class sr{constructor(t,e,i={},s){this.userid=t,this.identifier=e,this.lendingStatus=i,this.bwbPurchaseUrl=s,this.printDisabilityLink="/details/printdisabled?tab=about",this.analyticsCategories=ue,this.analyticsActions=ri}firstBrowseConfig(){return{id:"browseBook",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.browse}}}browseAgainConfig(){return{id:"browseBookAgain",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.browse,action:this.analyticsActions.browseAgain}}}returnBookConfig(){const t=this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.borrow;return{id:"returnNow",text:"Return now",className:"danger",analyticsEvent:{category:t,action:this.analyticsActions.doneBorrowing},borrowType:this.lendingStatus.user_has_browsed?"browse":"borrow"}}borrowBookConfig(t=!1){return!this.lendingStatus.available_to_borrow&&!this.lendingStatus.user_is_printdisabled||this.lendingStatus.user_has_borrowed?null:{id:"borrowBook",text:"Borrow for 14 days",className:"primary",disabled:t,analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.preview,action:this.analyticsActions.borrow}}}loginAndBorrowBookConfig(){return{id:"loginAndBorrow",text:"Log In and Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}leaveWaitlistConfig(){return{id:"leaveWaitlist",text:"Leave Waitlist",className:"dark",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistLeave}}}loginAndWaitlistConfig(){return{id:"loginAndWaitlist",text:"Log In and Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}waitlistConfig(){const t=!!this.userid,e=this.lendingStatus||{};return!e.available_to_waitlist||e.available_to_borrow?null:t?{id:"joinWaitlist",text:"Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistJoin}}:this.loginAndWaitlistConfig()}purchaseConfig(){return this.bwbPurchaseUrl?{id:"purchaseBook",text:"Purchase at ",subText:"Better World Books",title:"Purchase",url:this.bwbPurchaseUrl,target:"_blank",className:"purchase dark",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.purchase}}:null}printDisabilityConfig(){return this.lendingStatus.user_is_printdisabled?null:{id:"printDisability",text:"Print Disability Access",title:"Print Disability Access",url:this.printDisabilityLink,target:"_self",className:"print-disability",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.printDisability}}}adminAccessConfig(){return this.lendingStatus.user_has_borrowed||!this.lendingStatus.isAdmin?null:{id:"adminAccess",text:"Admin Access",title:"You have administrative privileges to read this book",className:"danger",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.borrow}}}adminOrPrintDisabledExitConfig(){const e=`\u2190 Exit ${k.getQueryParam("admin")==="1"?"admin":"print-disabled"} access mode`;return{id:"exitAdminAccess",text:e,url:k.getBackHref(),target:"_self",className:"exit-admin",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.doneBorrowing}}}unavailableBookConfig(){return{id:"borrowUnavailable",text:"Borrow Unavailable",className:"primary unavailable",disabled:!0,analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.unavailable}}}isEmbed(t){return{primaryTitle:`<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${t}</a>`,primaryActions:[],primaryColor:""}}}const S={available_1hr:"Renews automatically with continued use.",available_14d:"This book can be borrowed for 14 days.",available_pd:"Book available to patrons with print disabilities.",available_waitlist:"A waitlist is available.",admin_access:"You have administrative privileges to read this book.",claim_waitlist:"You are at the top of the waitlist for this book.",being_borrowed:"Another patron is using this book. Please check back later.",eligible_pd:"You are eligible for print-disabled access.",on_waitlist:"You are on the waitlist for this book.",session_expired:"Renews automatically with continued use.",unavailable:"This book is not available at this time."};class nr{constructor(t,e,i,s){this.userid=t,this.identifier=e,this.lendingStatus=i,this.bwbPurchaseUrl=s,this.analyticsCategories=ue,this.analyticsActions=ri,this.actionsConfig=new sr(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl)}onlyAdminAction(){return{primaryTitle:S.admin_access,primaryActions:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}adminOrPrintDisabledReadingAction(){return{primaryTitle:"",primaryActions:[],secondaryActions:[this.actionsConfig.adminOrPrintDisabledExitConfig()],borrowType:"adminBorrowed"}}patronIsReadingAction(){const t=this.lendingStatus||{},e=t.loanCount>=t.maxLoans;let i="",s=t.user_has_browsed&&!t.browsingExpired;return s?i=S.available_1hr:i=`Your loan of this book has ${t.daysLeftOnLoan} days left.`,{primaryTitle:i,primaryActions:[this.actionsConfig.returnBookConfig(),this.actionsConfig.borrowBookConfig(e),this.actionsConfig.waitlistConfig(),this.actionsConfig.printDisabilityConfig()],primaryColor:"danger",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()],borrowType:s?"browsed":"borrowed"}}claimWaitlistAction(){const t=this.lendingStatus||{},e=this.actionsConfig.leaveWaitlistConfig(),i=this.actionsConfig.borrowBookConfig(),s=t.available_to_browse?this.actionsConfig.firstBrowseConfig():null;let o=[i];return s&&o.push(s),o.push(e),{primaryTitle:S.claim_waitlist,primaryActions:o,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowPrintDisabledAction(){return{primaryTitle:S.eligible_pd,primaryActions:[this.actionsConfig.borrowBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}onlyPrintDisabledAction(){const t=this.lendingStatus.isAdmin?[]:this.actionsConfig.unavailableBookConfig();return{primaryTitle:S.available_pd,primaryActions:[t],primaryColor:"primary",secondaryActions:[]}}onWaitlistAction(){return{primaryTitle:S.on_waitlist,primaryActions:[this.actionsConfig.leaveWaitlistConfig(),this.actionsConfig.firstBrowseConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}restrictedAction(){const t=this.lendingStatus||{};return{primaryTitle:t.max_browsable_copies&&!t.available_lendable_copies?S.being_borrowed:S.unavailable,primaryActions:[this.actionsConfig.unavailableBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}loggedOutOptions(){const t=this.lendingStatus||{},e=!t.available_to_waitlist&&!t.available_to_borrow,i=this.actionsConfig.waitlistConfig();let s=null;t.available_to_borrow||t.available_to_browse?s=this.actionsConfig.loginAndBorrowBookConfig():e&&(s=this.actionsConfig.unavailableBookConfig());const o=this.actionsConfig.printDisabilityConfig(),r=[s,i,o].filter(a=>a!==null);return{primaryTitle:t.available_to_browse?S.available_1hr:t.available_to_borrow?S.available_14d:S.unavailable,primaryActions:r,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrow1HrAction(){const t=this.lendingStatus||{},e=!t.available_to_browse&&t.browsingExpired,i=t.available_to_browse||e,s=i&&t.available_to_borrow,o=i&&!t.available_to_borrow&&t.available_to_waitlist,r=i&&!t.available_to_borrow&&!t.available_to_waitlist,d=t.available_browsable_copies<1&&t.available_browsable_copies<t.max_browsable_copies,a=e?S.session_expired:!i&&d?S.being_borrowed:!i&&t.available_to_waitlist?S.available_waitlist:S.available_1hr,l=e?this.actionsConfig.browseAgainConfig():this.actionsConfig.firstBrowseConfig(),u=this.actionsConfig.borrowBookConfig(),c=this.actionsConfig.waitlistConfig(),h=this.actionsConfig.printDisabilityConfig();return{primaryTitle:a,primaryActions:r?[l,h]:s?[l,u,h]:o?[l,c,h]:[],primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowAction(){const t=this.lendingStatus||{};if(!!!this.userid)return this.loggedOutOptions();if(t.available_to_browse||t.browsingExpired)return this.borrow1HrAction();let i=null;const s=this.actionsConfig.waitlistConfig(),o=this.actionsConfig.printDisabilityConfig(),r=t.loanCount>=t.maxLoans;!t.available_to_borrow&&!s?i=this.actionsConfig.unavailableBookConfig():t.available_to_borrow&&(i=this.actionsConfig.borrowBookConfig(r));const a=[i,s,o].filter(function(l){return l!==null});return{primaryTitle:s?S.being_borrowed:"",primaryActions:a,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}getBrowseCountdownTitle(){const t=this.lendingStatus.secondsLeftOnLoan;var e=new Date(+new Date+t*1e3),i=e.getHours()%12,s=(""+e.getMinutes()).replace(/^(\d{1})$/,"0$1"),o=e.getHours()>11?" PM":" AM";return i===0&&(i=12),"Borrow ends at "+i+":"+s+o}getCurrentLendingActions(){let t;const e=this.lendingStatus||{},i=k.getQueryParam("admin")=="1"&&e.isAdmin,s=k.getQueryParam("access")=="1"&&e.user_is_printdisabled,o=e.user_has_borrowed||e.user_has_browsed&&!e.browsingExpired,r=!e.user_has_borrowed&&!e.user_has_browsed,d=!e.available_to_borrow&&!e.available_to_browse,a=e.is_printdisabled&&e.user_is_printdisabled,l=(e.available_to_browse||e.available_to_borrow)&&r&&!e.user_on_waitlist;return i||s?t=this.adminOrPrintDisabledReadingAction():e.isAdmin&&r&&d?t=this.onlyAdminAction():o?t=this.patronIsReadingAction():e.user_can_claim_waitlist?t=this.claimWaitlistAction():a?t=this.borrowPrintDisabledAction():l||e.browsingExpired?t=this.borrowAction():e.isPrintDisabledOnly?t=this.onlyPrintDisabledAction():e.user_on_waitlist?t=this.onWaitlistAction():t=this.restrictedAction(),t}}class or{constructor(t,e,i,s,o){this.identifier=t,this.borrowType=e,this.successCallback=i,this.errorCallback=s,this.pollerDelay=o,this.loanTokenInterval=void 0,this.loanAnalytics=new js,this.bookAccessed()}disconnectedCallback(){var t;(t=window==null?void 0:window.IALendingIntervals)==null||t.clearTokenPoller()}async bookAccessed(){var t;this.borrowType?(this.handleLoanTokenPoller(!0),this.borrowType!=="adminBorrowed"&&(window.IALendingIntervals.tokenPoller=setInterval(()=>{this.handleLoanTokenPoller()},this.pollerDelay*1e3))):((t=window==null?void 0:window.Sentry)==null||t.captureMessage(`${T.bookAccessed} - not borrowed`),this.disconnectedCallback())}async handleLoanTokenPoller(t=!1){const e="create_token";j({identifier:this.identifier,action:e,error:i=>{var s,o;this.errorCallback({detail:{action:e,data:i}}),(s=window==null?void 0:window.Sentry)==null||s.captureMessage(`${T.handleLoanTokenPoller} - Error: ${JSON.stringify(i)}`),(o=this.loanAnalytics)==null||o.sendEvent("LendingServiceLoanError",e,this.identifier)},success:()=>{t&&this.successCallback()}})}}class rr{constructor(t,e,i,s){this.hasPageChanged=t,this.identifier=e,this.localCache=i,this.loanRenewTimeConfig=s,this.loanRenewMessage="This book has been renewed for #time #unitsOfTime.",this.loanReturnWarning="With no action, this book will be auto-returned in #time #unitsOfTime.",this.result={texts:null,renewNow:!1}}handleLoanRenew(){try{return this.hasPageChanged?this.pageChanged():this.autoChecker()}catch(t){y(t)}return $}async pageChanged(){const{loanRenewAtLast:t}=this.loanRenewTimeConfig,e=new Date,i=await this.localCache.get(`${this.identifier}-loanTime`),s=this.changeTime(i,t,"sub");return s!==null&&e>=s&&(this.result.texts=this.loanRenewMessage,this.result.renewNow=!0),this.setPageChangedTime(),this.result}async autoChecker(){const{pageChangedInLast:t}=this.loanRenewTimeConfig,e=await this.localCache.get(`${this.identifier}-pageChangedTime`),i=this.changeTime(new Date,t,"sub");return e===void 0||e<=i?(this.result.texts=this.loanReturnWarning,this.result.renewNow=!1):e>=i&&(this.result.texts="",this.result.renewNow=!0),this.result}async setPageChangedTime(){await this.localCache.set({key:`${this.identifier}-pageChangedTime`,value:new Date,ttl:Number(this.loanRenewTimeConfig.loanTotalTime)})}getMessageTexts(t,e){let i="minute",s=t,o=e;return o=Math.ceil(o/60),o>59&&(o=1,i="hour"),s=s==null?void 0:s.replace(/#time/,o),s==null?void 0:s.replace(/#unitsOfTime/,o!==1?`${i}s`:i)}changeTime(t,e,i){return t===void 0?null:i==="sub"?new Date(t.getTime()-e*1e3):new Date(t.getTime()+e*1e3)}}const ar={browseExpired:"IABookReader:BrowsingHasExpired"},L={iaButton:"min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;",renew:"background:#194880;width:110px;",return:"background:#d9534f;width:120px;",loaderIcon:"display:inline-block;width:20px;height:20px;margin-top:2px;color:white;--activityIndicatorLoadingRingColor:#fff;--activityIndicatorLoadingDotColor:#fff;",refresh:"background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"};class lr extends x{static get properties(){return{userid:{type:String},identifier:{type:String},bookTitle:{type:String},lendingStatus:{type:Object},returnUrl:{type:String},width:{type:Number},bwbPurchaseUrl:{type:String},lendingBarPostInit:{type:Function,attribute:!1},barType:{type:String},sharedObserver:{attribute:!1},disableActionGroup:{type:Boolean},modal:{Object},tokenDelay:{type:Number},timerExecutionSeconds:{type:Number},localCache:{type:Object},loanRenewTimeConfig:{type:Object},loanRenewResult:{type:Object}}}constructor(){super(),this.userid="",this.identifier="",this.bookTitle="",this.returnUrl="",this.lendingStatus={},this.width=0,this.bwbPurchaseUrl="",this.lendingBarPostInit=()=>{},this.barType="action",this.sharedObserver=void 0,this.disableActionGroup=!1,this.tokenDelay=120,this.timerExecutionSeconds=30,this.postInitComplete=!1,this.primaryActions=[],this.primaryTitle="",this.primaryColor="primary",this.secondaryActions=[],this.lendingOptions={},this.borrowType=null,this.browseTimer=void 0,this.returnNow=!1,this.loanRenewTimeConfig={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900},this.loanRenewResult={texts:"",renewNow:!1,secondsLeft:0}}disconnectedCallback(){var t;(t=window==null?void 0:window.IALendingIntervals)==null||t.clearAll(),this.sentryCaptureMsg(T.disconnectedCallback),this.disconnectResizeObserver()}sentryCaptureMsg(t){var e;y(window==null?void 0:window.Sentry),(e=window==null?void 0:window.Sentry)==null||e.captureMessage(t)}firstUpdated(){this.bindLoanRenewEvents(),this.localCache=new Us({namespace:"loanRenew"}),this.sharedObserver||(this.sharedObserver=new fn,this.setupResizeObserver())}updated(t){(t.has("lendingStatus")||t.has("bwbPurchaseUrl"))&&this.setupLendingToolbarActions(),t.has("sharedObserver")&&(this.disconnectResizeObserver(),this.setupResizeObserver()),t.has("loanRenewResult")&&this.loanRenewResult.renewNow&&window.IALendingIntervals.clearAll()}handleResize(t){const{target:e}=t;if(e!==this.shadowRoot.host)return;const{contentRect:i}=t;this.width=Math.round(i.width)}disconnectResizeObserver(){var t;(t=this.sharedObserver)==null||t.removeObserver({handler:this,target:this.shadowRoot.host})}setupResizeObserver(){var t;!this.shadowRoot||(t=this.sharedObserver)==null||t.addObserver({handler:this,target:this.shadowRoot.host})}async setupLendingToolbarActions(){var i,s,o,r;this.lendingOptions=new nr(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl);const t=this.lendingOptions.getCurrentLendingActions();if(!t)return;this.primaryTitle=t.primaryTitle,this.primaryActions=(i=t.primaryActions)==null?void 0:i.filter(d=>d!=null),this.primaryColor=t.primaryColor,this.secondaryActions=(s=t.secondaryActions)==null?void 0:s.filter(d=>d!=null),this.borrowType=t.borrowType?t.borrowType:null;const e="browsingExpired"in this.lendingStatus&&((o=this.lendingStatus)==null?void 0:o.browsingExpired);if(e){y("setupLendingToolbarActions > hasExpired --- "),this.tokenPoller||this.sentryCaptureMsg(T.bookWasExpired),(r=window==null?void 0:window.IALendingIntervals)==null||r.clearAll(),this.dispatchEvent(new Event(ar.browseExpired,{bubbles:!0,cancelable:!1,composed:!0}));return}if(this.borrowType==="browsed"&&(await this.startTimerCountdown(),await this.startBrowseTimer()),!this.borrowType||this.barType==="title"){this.lendingBarPostInit();return}setTimeout(()=>{!e&&!window.IALendingIntervals.tokenPoller&&this.startLoanTokenPoller()},100),this.requestUpdate()}bindLoanRenewEvents(){window.addEventListener("BookReader:userAction",()=>{y("IABookActions:BookReader:userAction"),this.borrowType==="browsed"&&this.autoLoanRenewChecker(!0)}),document.addEventListener("visibilitychange",async()=>{if(!document.hidden&&(y("visibilitychange event execute:------------------ ",new Date().getMinutes(),new Date().getSeconds(),this.borrowType),this.borrowType==="browsed"&&this.lendingStatus.browsingExpired===!1)){const t=await this.localCache.get(`${this.identifier}-loanTime`),e=Math.round((t-new Date)/1e3);e>=this.timerExecutionSeconds?this.loanStatusCheckInterval(Number(e)):(this.browseHasExpired(),this.disconnectedCallback())}})}async autoLoanRenewChecker(t=!1){this.loanRenewHelper=new rr(t,this.identifier,this.localCache,this.loanRenewTimeConfig),await this.loanRenewHelper.handleLoanRenew(),this.loanRenewResult=this.loanRenewHelper.result}get modal(){const t=document.body.querySelector("modal-manager");return t==null||t.setAttribute("id","action-bar-modal"),t}async showWarningModal(){var s,o,r;y("****** showWarningModal ******"),this.modal.customModalContent=$,(s=this.modal)==null||s.closeModal(),this.loanRenewResult={texts:"",renewNow:!1};let{secondsLeft:t}=this.loanRenewResult;t===void 0?t=this.lendingStatus.secondsLeftOnLoan:t=t>60?t:60;const e=new G({headline:"Are you still reading?",headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:(o=this.loanRenewHelper)==null?void 0:o.getMessageTexts(this.loanRenewResult.texts,t)}),i=m`<br />
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;justify-content:center;"
      >
        <button
          style="${L.iaButton} ${L.renew}"
          @click=${()=>this.patronWantsToRenewBook()}
        >
          Keep reading
        </button>
        <button
          style="${L.iaButton} ${L.return}"
          @click=${()=>this.patronWantsToReturnBook()}
        >
          Return the book
        </button>
      </div> `;this.modal.setAttribute("aria-live","assertive"),await((r=this.modal)==null?void 0:r.showModal({config:e,customModalContent:i}))}async showWarningDisabledModal(t="renewBook"){var o,r;let{secondsLeft:e}=this.loanRenewResult;e===void 0?e=this.lendingStatus.secondsLeftOnLoan:e=e>60?e:60;const i=new G({headline:"Are you still reading?",headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:(o=this.loanRenewHelper)==null?void 0:o.getMessageTexts(this.loanRenewResult.texts,e)}),s=m`<br />
      <div
        id="disabled-book-action-bar-custom-buttons"
        style="display:flex;justify-content:center; opacity:0.8; pointer-events:none;"
      >
        <button
          disabled
          style="${L.iaButton} ${L.renew}"
        >
          ${t==="renewBook"?m`<ia-activity-indicator
                mode="processing"
                style=${L.loaderIcon}
              ></ia-activity-indicator>`:"Keep reading"}
        </button>
        <span
          style="position: absolute; visibility: none; height: 1px; width: 1px; overflow: hidden;"
          >Renewing loan, one moment please.</span
        >
        <button
          disabled
          style="${L.iaButton} ${L.return}"
        >
          ${t==="returnBook"?m`<ia-activity-indicator
                mode="processing"
                style=${L.loaderIcon}
              ></ia-activity-indicator>`:"Return the book"}
        </button>
      </div> `;await((r=this.modal)==null?void 0:r.showModal({config:i,customModalContent:s}))}async patronWantsToRenewBook(){this.showWarningDisabledModal(),this.loanRenewResult={texts:"",renewNow:!0}}async patronWantsToReturnBook(){this.showWarningDisabledModal("returnBook"),document.querySelector("ia-book-actions").disableActionGroup=!0,this.returnNow=!0}async showExpiredModal(){var i;const t=new G({headline:"",showCloseButton:!1,closeOnBackdropClick:!1,headerColor:"#194880",message:"This book has been returned due to inactivity."}),e=m`<br />
      <div style="text-align: center">
        <button
          style="${L.iaButton} ${L.renew}"
          @click=${()=>{k.goToUrl(this.returnUrl,!0)}}
        >
          Okay
        </button>
      </div> `;await((i=this.modal)==null?void 0:i.showModal({config:t,customModalContent:e}))}async browseHasExpired(){var e;y("BrowseHasExpired ---"),(e=window==null?void 0:window.IALendingIntervals)==null||e.clearAll();const t={...this.lendingStatus,browsingExpired:!0,secondsLeftOnLoan:0};this.lendingStatus=t,await this.localCache.delete(`${this.identifier}-loanTime`),await this.localCache.delete(`${this.identifier}-pageChangedTime`),this.loanRenewResult.renewNow=!1,this.loanRenewResult.texts="This book has been returned due to inactivity.",await this.showExpiredModal(),this.sentryCaptureMsg(T.browseHasExpired)}async startBrowseTimer(){var s;(s=window==null?void 0:window.IALendingIntervals)==null||s.clearBrowseExpireTimeout();const{browsingExpired:t,user_has_browsed:e,secondsLeftOnLoan:i}=this.lendingStatus;if(!e||t){y("startBrowseTimer --- !user_has_browsed || browsingExpired",{user_has_browsed:e,browsingExpired:t,secondsLeftOnLoan:i});return}window.IALendingIntervals.browseExpireTimeout=setTimeout(()=>{y("startBrowseTimer > browseExpireTimeout --- will expire loan",i),this.browseHasExpired()},i*1e3)}render(){return this.barType==="title"?m`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`:m`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`}get bookTitleBar(){return m`<book-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></book-title-bar>`}get timerCountdownEl(){return this.shadowRoot.querySelector("timer-countdown")}get bookActionBar(){return m`
      <collapsible-action-group
        .userid=${this.userid}
        .identifier=${this.identifier}
        .primaryColor=${this.primaryColor}
        .primaryActions=${this.primaryActions}
        .secondaryActions=${this.secondaryActions}
        .width=${this.width}
        .borrowType=${this.borrowType}
        .returnUrl=${this.returnUrl}
        .localCache=${this.localCache}
        .loanTotalTime=${this.loanRenewTimeConfig.loanTotalTime}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?autoRenew=${this.loanRenewResult.renewNow}
        ?autoReturn=${this.lendingStatus.browsingExpired}
        ?returnNow=${this.returnNow}
        @loanAutoRenewed=${this.handleLoanAutoRenewed}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      <timer-countdown
        .secondsLeftOnLoan=${Math.round(Number(this.lendingStatus.secondsLeftOnLoan))}
      ></timer-countdown>
    `}async handleLoanAutoRenewed({detail:t}){var s,o,r;const e=(s=t==null?void 0:t.data)==null?void 0:s.loan,i=`Whoops, seems we hit a hiccup with renewing this book. Please refresh & retry. --- (Debug: ${(o=t==null?void 0:t.data)==null?void 0:o.error})`;if(!e){this.showErrorModal(i,"handleLoanAutoRenewed");return}if(this.loanRenewResult.renewNow){const d=await this.localCache.get(`${this.identifier}-loanTime`),a=Math.round((d-new Date)/1e3);y(d,a),y("IABookActions: handleLoanAutoRenewed --- ",{ajaxResponse:t==null?void 0:t.data,loanRenewResult:this.loanRenewResult,secondsLeftOnLoan:a});const l={...this.lendingStatus,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:a};this.lendingStatus=l,(r=this.modal)==null||r.closeModal(),this.modal.removeAttribute("id"),this.modal.customModalContent=$,this.sentryCaptureMsg(T.bookHasRenewed)}}startTimerCountdown(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTimerCountdown();const t=Number(this.lendingStatus.secondsLeftOnLoan);this.timeWhenTimerStart=new Date,window.IALendingIntervals.timerCountdown=setInterval(async()=>{await this.loanStatusCheckInterval(t)},this.timerExecutionSeconds*1e3)}async loanStatusCheckInterval(t){let e=t;e-=this.timerExecutionSeconds,e=Math.round(e);const i=await this.reSyncTimerIfGoneOff(e);i.hasSynced&&(e=i.whatShouldLeft,y("startTimerCountdown --- stale, timer has resyncd",{secondsLeft:e})),y("startTimerCountdown --- countdown still valid. continue...",{resyncd:i,secondsLeft:e,loanRenewAtLast:this.loanRenewTimeConfig.loanRenewAtLast},"time: ",new Date().getMinutes(),":",new Date().getSeconds(),", timerDelay: ",this.timerExecutionSeconds),e<=this.loanRenewTimeConfig.loanRenewAtLast&&await this.loanRenewAttempt(e),e<=this.timerExecutionSeconds&&(this.disconnectedCallback(),this.sentryCaptureMsg(T.clearOneHourTimer))}async reSyncTimerIfGoneOff(t){const i=new Date().getTime()/1e3-this.timeWhenTimerStart.getTime()/1e3,s=this.lendingStatus.secondsLeftOnLoan-i,o=Math.round(t),r=Math.round(s),d=this.timerCountdownEl.secondsLeftOnLoan||0;if(y("reSyncTimerIfGoneOff?",{whatIsleft:o,whatShouldLeft:r,timerElSeconds:d,timeLeftInMin:Math.ceil(t/60)}),d!==r||o!==r){const a={...this.lendingStatus,secondsLeftOnLoan:r};this.lendingStatus=a}return o!==r?(y("reSyncTimerIfGoneOff --- let's re-sync."),{hasSynced:!0,whatShouldLeft:r}):{hasSynced:!1,whatShouldLeft:r}}async loanRenewAttempt(t){y("loanRenewAttempt ---",{secondsLeft:t,loanRenewResult:this.loanRenewResult});let e=t;if(e<50){y("loanRenewAttempt --- loanSecondsLeft < 50, will expire"),await this.browseHasExpired();return}await this.autoLoanRenewChecker(!1),this.loanRenewResult.renewNow===!1&&(e-=60,this.loanRenewResult.secondsLeft=e,this.showWarningModal())}startLoanTokenPoller(){const t=()=>{this.postInitComplete||this.lendingBarPostInit(),this.postInitComplete=!0},e=i=>{this.handleLendingActionError(i)};this.tokenPoller=new or(this.identifier,this.borrowType,t,e,this.tokenDelay)}handleToggleActionGroup(){this.disableActionGroup=!this.disableActionGroup}handleLendingActionError(t){var s,o,r,d;this.disableActionGroup=!1,(s=window==null?void 0:window.IALendingIntervals)==null||s.clearAll();const e=(o=t==null?void 0:t.detail)==null?void 0:o.action,i=(d=(r=t==null?void 0:t.detail)==null?void 0:r.data)==null?void 0:d.error;if(i&&e!=="create_token"&&this.showErrorModal(i,e),e==="create_token"){const a={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0};this.lendingStatus=a}if(i&&i.match(/not available to borrow/gm)){let a=this.lendingStatus;e==="browse_book"?a={...this.lendingStatus,available_to_browse:!1}:e==="borrow_book"&&(a={...this.lendingStatus,available_to_borrow:!1}),this.lendingStatus=a}}async showErrorModal(t,e){var s;const i=new G({title:"Lending error",message:t,headerColor:"#d9534f",showCloseButton:!0});if(e==="create_token"){const o=m`<button
        style="${L.refresh}"
        @click=${()=>window.location.reload(!0)}
      >
        refresh
      </button>`;i.message=m` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${o} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this.identifier}"
          >info@archive.org</a
        ><br /><br />
        <code>errorLog: ${t}</code>`}await((s=this.modal)==null?void 0:s.showModal({config:i}))}get iconClass(){return this.width<=as?"mobile":"desktop"}get textClass(){return this.width>=as?"visible":"hidden"}get infoIconTemplate(){return m`<info-icon iconClass=${this.iconClass}></info-icon>`}get textGroupTemplate(){return this.primaryTitle?m`<text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </text-group>`:$}get hasAdminAccess(){return!this.lendingStatus.userHasBorrowed&&this.lendingStatus.isAdmin}static get styles(){return g`
      :host {
        display: block;
      }

      .hide {
        display: none;
      }

      .lending-wrapper {
        width: 100%;
        margin: 0 auto;
        background: var(--primaryBGColor, #000);
        color: var(--primaryTextColor, #fff);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    `}}window.customElements.define("ia-book-actions",lr);const fe={active_borrows:0,active_browses:0,available_borrowable_copies:0,available_browsable_copies:1,available_lendable_copies:1,available_to_borrow:!1,available_to_browse:!1,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!1,is_readable:!1,last_borrow:null,last_browse:null,last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:null,orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:0,user_loan_record:[],user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",browsingExpired:!1,daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!0,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:0,loanRecord:[],loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:10,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!1,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},cr={active_borrows:0,active_browses:1,available_borrowable_copies:0,available_browsable_copies:0,available_lendable_copies:0,available_to_borrow:!0,available_to_browse:!0,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!0,is_readable:!1,last_borrow:null,last_browse:"2021-07-30 09:57:40",last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:"2021-07-30 10:57:40",orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:1,user_loan_record:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!1,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:1,loanId:"1ca15f92d07dfdae3f7b1516084aec5d603800b8",loanRecord:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},loanStartDate:"2021-07-30 09:57:40",loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:155,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!0,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},Je=new Us({namespace:"loanRenew",defaultTTL:1*60}),dr="@neeraj-archive",Ye="naturalhistoryof00unse_4111";let ze="https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863";const Ks=new G;Ks.headerColor="#d9534f";let hr=function(){setTimeout(function(){},100)},v=document.querySelector("ia-book-actions");v.userid=dr;v.identifier=Ye;v.bookTitle="Contemporary Black biography. Volume 39 : profiles from the interContemporary Black biography. Volume 39";v.lendingStatus=cr;v.bwbPurchaseUrl="";v.modalConfig=Ks;v.lendingBarPostInit=hr;v.tokenDelay=2;v.timerExecutionSeconds=4;v.returnUrl="";v.localCache=Je;let ur={loanTotalTime:120,loanRenewAtLast:80,pageChangedInLast:15};v.loanRenewTimeConfig=ur;let f=v.lendingStatus,pr=v.loanRenewTimeConfig.loanTotalTime;document.querySelectorAll(".titleBar input[type=checkbox]").forEach(n=>{n.addEventListener("click",t=>{t.target.checked?v.barType="title":v.barType="action"})});document.querySelectorAll(".searchParam input[type=checkbox]").forEach(n=>{n.addEventListener("click",t=>{var e=new URLSearchParams(window.location.search),i="";if(t.target.checked?(i="?",e.set("q","test")):(i="",e.delete("q")),history.pushState){var s=window.location.protocol+"//"+window.location.host+window.location.pathname+i+e;window.history.pushState({path:s},"",s)}})});document.querySelectorAll(".errorEnable input[type=checkbox]").forEach(n=>{window.location.href.indexOf("?error=true")!==-1&&(n.checked=!0),n.addEventListener("click",t=>{var e=new URLSearchParams(window.location.search),i="";if(t.target.checked?(i="?",e.set("error",!0)):(i="",e.delete("error")),history.pushState){var s=window.location.protocol+"//"+window.location.host+window.location.pathname+i+e;window.history.pushState({path:s},"",s)}})});document.querySelectorAll(".userState input[type=checkbox]").forEach(n=>{n.addEventListener("click",t=>{t.target.checked?(t.target.value==="isAdmin"&&(f.isAdmin=!0),t.target.value==="isLoggedIn"&&(v.userid="@neeraj")):(t.target.value==="isAdmin"&&(f.isAdmin=!1),t.target.value==="isLoggedIn"&&(v.userid=""));let e={...fe,...f};v.lendingStatus=e})});document.querySelectorAll(".printDisabled input[type=checkbox]").forEach(n=>{n.addEventListener("click",t=>{t.target.checked?(t.target.value==="is_printdisabled"&&(f.is_printdisabled=!0),t.target.value==="user_is_printdisabled"&&(f.user_is_printdisabled=!0)):(t.target.value==="is_printdisabled"&&(f.is_printdisabled=!1),t.target.value==="user_is_printdisabled"&&(f.user_is_printdisabled=!1));let e={...fe,...f};v.lendingStatus=e})});document.querySelectorAll(".availableToBrowse input[type=radio]").forEach(n=>{n.addEventListener("click",async t=>{if(t.target.value==="user_has_browsed"){f.user_has_browsed=!0,f.available_to_browse=!1,f.secondsLeftOnLoan=pr,f.browsingExpired=!1;const e=new Date(new Date().getTime()+v.loanRenewTimeConfig.loanTotalTime*1e3);try{await Je.set({key:`${Ye}-loanTime`,value:e,ttl:Number(v.loanRenewTimeConfig.loanTotalTime)}),await Je.delete(`${Ye}-pageChangedTime`)}catch{}}else t.target.value==="browsingExpired"?(f.user_has_browsed=!0,f.available_to_browse=!1,f.secondsLeftOnLoan=0,f.browsingExpired=!0):t.target.value==="available_to_browse"&&(f.available_to_browse=!0,f.user_has_browsed=!1);setTimeout(()=>{let e={...fe,...f};v.lendingStatus=e},10)})});document.querySelector("#show_warning_modal").addEventListener("click",async()=>{if(!v.lendingStatus.user_has_browsed){const n={...v.lendingStatus,user_has_browsed:!0};v.lendingStatus=n,await v.updateComplete}v.showWarningModal(),v.lendingStatus.user_has_browsed&&v.showWarningModal()});document.querySelector("#show_expired_modal").addEventListener("click",async()=>{if(!v.lendingStatus.user_has_browsed){const n={...v.lendingStatus,user_has_browsed:!0};v.lendingStatus=n,await v.updateComplete}await new Promise(n=>setTimeout(n,5e3)),v.browseHasExpired()});document.querySelector("#resync_timer").addEventListener("click",async n=>{v.lendingStatus.user_has_browsed&&document.querySelector("ia-book-actions").dispatchEvent(new Event("visibilitychange",{detail:{},bubbles:!0,composed:!0})),await new Promise(t=>setTimeout(t,5e3))});document.querySelectorAll(".availableToBorrow input[type=radio]").forEach(n=>{n.addEventListener("click",t=>{t.target.value==="available_to_borrow"?(f.available_to_borrow=!0,f.user_on_waitlist=!1,f.available_to_waitlist=!1,f.user_has_borrowed=!1):t.target.value==="user_can_claim_waitlist"?(f.available_to_borrow=!0,f.user_on_waitlist=!0,f.user_can_claim_waitlist=!0,f.user_has_borrowed=!1,f.available_to_waitlist=!1):t.target.value==="user_on_waitlist"?(f.available_to_borrow=!1,f.user_on_waitlist=!0,f.available_to_waitlist=!1,f.user_has_borrowed=!1):t.target.value==="available_to_waitlist"?(f.available_to_borrow=!1,f.user_on_waitlist=!1,f.available_to_waitlist=!0,f.user_has_borrowed=!1):t.target.value==="user_has_borrowed"&&(f.available_to_borrow=!1,f.user_on_waitlist=!1,f.available_to_waitlist=!1,f.user_has_borrowed=!0);let e={...fe,...f};v.lendingStatus=e})});document.querySelectorAll(".purchase input[type=checkbox]").forEach(n=>{n.addEventListener("click",t=>{t.target.checked?ze="https://www.google.com":ze="",v.bwbPurchaseUrl=ze})});document.querySelector(".pageChangedEvent").addEventListener("click",()=>{document.querySelector("ia-book-actions").dispatchEvent(new CustomEvent("BookReader:userAction",{detail:{},bubbles:!0,composed:!0}))});window.addEventListener("IABookReader:BrowsingHasExpired",()=>{console.log("IABookReader:BrowsingHasExpired EVENT FIRED")});
