const Ys=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};Ys();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=window,ei=Xe.ShadowRoot&&(Xe.ShadyCSS===void 0||Xe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,vs=Symbol(),di=new WeakMap;class Xs{constructor(e,t,i){if(this._$cssResult$=!0,i!==vs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ei&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=di.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&di.set(t,e))}return e}toString(){return this.cssText}}const Qs=n=>new Xs(typeof n=="string"?n:n+"",void 0,vs),en=(n,e)=>{ei?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=Xe.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},hi=ei?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Qs(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $t;const tt=window,ui=tt.trustedTypes,tn=ui?ui.emptyScript:"",pi=tt.reactiveElementPolyfillSupport,qt={toAttribute(n,e){switch(e){case Boolean:n=n?tn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ms=(n,e)=>e!==n&&(e==e||n==n),yt={attribute:!0,type:String,converter:qt,reflect:!1,hasChanged:ms};class Ee extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);s!==void 0&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=yt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||yt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(hi(s))}else e!==void 0&&t.push(hi(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return en(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=yt){var s;const o=this.constructor._$Ep(e,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:qt).toAttribute(t,i.type);this._$El=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),c=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:qt;this._$El=o,this[o]=c.fromAttribute(t,r.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||ms)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw t=!1,this._$Ek(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}Ee.finalized=!0,Ee.elementProperties=new Map,Ee.elementStyles=[],Ee.shadowRootOptions={mode:"open"},pi==null||pi({ReactiveElement:Ee}),(($t=tt.reactiveElementVersions)!==null&&$t!==void 0?$t:tt.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _t;const it=window,le=it.trustedTypes,gi=le?le.createPolicy("lit-html",{createHTML:n=>n}):void 0,Gt="$lit$",R=`lit$${(Math.random()+"").slice(9)}$`,ws="?"+R,sn=`<${ws}>`,J=document,Pe=()=>J.createComment(""),He=n=>n===null||typeof n!="object"&&typeof n!="function",bs=Array.isArray,nn=n=>bs(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",At=`[ 	
\f\r]`,Se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fi=/-->/g,vi=/>/g,N=RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mi=/'/g,wi=/"/g,$s=/^(?:script|style|textarea|title)$/i,ys=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),m=ys(1),on=ys(2),M=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),bi=new WeakMap,q=J.createTreeWalker(J,129,null,!1);function _s(n,e){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return gi!==void 0?gi.createHTML(e):e}const rn=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=Se;for(let c=0;c<t;c++){const a=n[c];let l,u,d=-1,h=0;for(;h<a.length&&(r.lastIndex=h,u=r.exec(a),u!==null);)h=r.lastIndex,r===Se?u[1]==="!--"?r=fi:u[1]!==void 0?r=vi:u[2]!==void 0?($s.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=N):u[3]!==void 0&&(r=N):r===N?u[0]===">"?(r=s!=null?s:Se,d=-1):u[1]===void 0?d=-2:(d=r.lastIndex-u[2].length,l=u[1],r=u[3]===void 0?N:u[3]==='"'?wi:mi):r===wi||r===mi?r=N:r===fi||r===vi?r=Se:(r=N,s=void 0);const p=r===N&&n[c+1].startsWith("/>")?" ":"";o+=r===Se?a+sn:d>=0?(i.push(l),a.slice(0,d)+Gt+a.slice(d)+R+p):a+R+(d===-2?(i.push(void 0),c):p)}return[_s(n,o+(n[t]||"<?>")+(e===2?"</svg>":"")),i]};class Ie{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const c=e.length-1,a=this.parts,[l,u]=rn(e,t);if(this.el=Ie.createElement(l,i),q.currentNode=this.el.content,t===2){const d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(s=q.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const h of s.getAttributeNames())if(h.endsWith(Gt)||h.startsWith(R)){const p=u[r++];if(d.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+Gt).split(R),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?ln:w[1]==="?"?dn:w[1]==="@"?hn:lt})}else a.push({type:6,index:o})}for(const h of d)s.removeAttribute(h)}if($s.test(s.tagName)){const d=s.textContent.split(R),h=d.length-1;if(h>0){s.textContent=le?le.emptyScript:"";for(let p=0;p<h;p++)s.append(d[p],Pe()),q.nextNode(),a.push({type:2,index:++o});s.append(d[h],Pe())}}}else if(s.nodeType===8)if(s.data===ws)a.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(R,d+1))!==-1;)a.push({type:7,index:o}),d+=R.length-1}o++}}static createElement(e,t){const i=J.createElement("template");return i.innerHTML=e,i}}function ce(n,e,t=n,i){var s,o,r,c;if(e===M)return e;let a=i!==void 0?(s=t._$Co)===null||s===void 0?void 0:s[i]:t._$Cl;const l=He(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,i)),i!==void 0?((r=(c=t)._$Co)!==null&&r!==void 0?r:c._$Co=[])[i]=a:t._$Cl=a),a!==void 0&&(e=ce(n,a._$AS(n,e.values),a,i)),e}class an{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:J).importNode(i,!0);q.currentNode=o;let r=q.nextNode(),c=0,a=0,l=s[0];for(;l!==void 0;){if(c===l.index){let u;l.type===2?u=new Ke(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new un(r,this,e)),this._$AV.push(u),l=s[++a]}c!==(l==null?void 0:l.index)&&(r=q.nextNode(),c++)}return q.currentNode=J,o}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ke{constructor(e,t,i,s){var o;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ce(this,e,t),He(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):nn(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==$&&He(this._$AH)?this._$AA.nextSibling.data=e:this.$(J.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ie.createElement(_s(s.h,s.h[0]),this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(i);else{const r=new an(o,this),c=r.u(this.options);r.v(i),this.$(c),this._$AH=r}}_$AC(e){let t=bi.get(e.strings);return t===void 0&&bi.set(e.strings,t=new Ie(e)),t}T(e){bs(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Ke(this.k(Pe()),this.k(Pe()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class lt{constructor(e,t,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=ce(this,e,t,0),r=!He(e)||e!==this._$AH&&e!==M,r&&(this._$AH=e);else{const c=e;let a,l;for(e=o[0],a=0;a<o.length-1;a++)l=ce(this,c[i+a],t,a),l===M&&(l=this._$AH[a]),r||(r=!He(l)||l!==this._$AH[a]),l===$?e=$:e!==$&&(e+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class ln extends lt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}}const cn=le?le.emptyScript:"";class dn extends lt{constructor(){super(...arguments),this.type=4}j(e){e&&e!==$?this.element.setAttribute(this.name,cn):this.element.removeAttribute(this.name)}}class hn extends lt{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=ce(this,e,t,0))!==null&&i!==void 0?i:$)===M)return;const s=this._$AH,o=e===$&&s!==$||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==$&&(s===$||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class un{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ce(this,e)}}const $i=it.litHtmlPolyfillSupport;$i==null||$i(Ie,Ke),((_t=it.litHtmlVersions)!==null&&_t!==void 0?_t:it.litHtmlVersions=[]).push("2.8.0");const pn=(n,e,t)=>{var i,s;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let r=o._$litPart$;if(r===void 0){const c=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new Ke(e.insertBefore(Pe(),c),c,void 0,t!=null?t:{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ti=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ii=Symbol(),yi=new Map;class As{constructor(e,t){if(this._$cssResult$=!0,t!==ii)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=yi.get(this.cssText);return ti&&e===void 0&&(yi.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const gn=n=>new As(typeof n=="string"?n:n+"",ii),g=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new As(t,ii)},fn=(n,e)=>{ti?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},_i=ti?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return gn(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ct;const Ai=window.trustedTypes,vn=Ai?Ai.emptyScript:"",Ci=window.reactiveElementPolyfillSupport,Vt={toAttribute(n,e){switch(e){case Boolean:n=n?vn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Cs=(n,e)=>e!==n&&(e==e||n==n),Et={attribute:!0,type:String,converter:Vt,reflect:!1,hasChanged:Cs};class te extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=Et){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Et}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(_i(s))}else e!==void 0&&t.push(_i(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return fn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Et){var s,o;const r=this.constructor._$Eh(e,i);if(r!==void 0&&i.reflect===!0){const c=((o=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&o!==void 0?o:Vt.toAttribute)(t,i.type);this._$Ei=e,c==null?this.removeAttribute(r):this.setAttribute(r,c),this._$Ei=null}}_$AK(e,t){var i,s,o;const r=this.constructor,c=r._$Eu.get(e);if(c!==void 0&&this._$Ei!==c){const a=r.getPropertyOptions(c),l=a.converter,u=(o=(s=(i=l)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof l=="function"?l:null)!==null&&o!==void 0?o:Vt.fromAttribute;this._$Ei=c,this[c]=u(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Cs)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,o)=>this[o]=s),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}te.finalized=!0,te.elementProperties=new Map,te.elementStyles=[],te.shadowRootOptions={mode:"open"},Ci==null||Ci({ReactiveElement:te}),((Ct=globalThis.reactiveElementVersions)!==null&&Ct!==void 0?Ct:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var St,Lt;class x extends te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=pn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return M}}x.finalized=!0,x._$litElement$=!0,(St=globalThis.litElementHydrateSupport)===null||St===void 0||St.call(globalThis,{LitElement:x});const Ei=globalThis.litElementPolyfillSupport;Ei==null||Ei({LitElement:x});((Lt=globalThis.litElementVersions)!==null&&Lt!==void 0?Lt:globalThis.litElementVersions=[]).push("3.3.3");class mn{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(s=>{s.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);!t||(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class G{constructor(e){var t,i,s,o,r,c,a;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!==null&&t!==void 0?t:"#55A183",this.bodyColor=(i=e==null?void 0:e.bodyColor)!==null&&i!==void 0?i:"#f5f5f7",this.showProcessingIndicator=(s=e==null?void 0:e.showProcessingIndicator)!==null&&s!==void 0?s:!1,this.processingImageMode=(o=e==null?void 0:e.processingImageMode)!==null&&o!==void 0?o:"complete",this.showCloseButton=(r=e==null?void 0:e.showCloseButton)!==null&&r!==void 0?r:!0,this.showHeaderLogo=(c=e==null?void 0:e.showHeaderLogo)!==null&&c!==void 0?c:!0,this.closeOnBackdropClick=(a=e==null?void 0:e.closeOnBackdropClick)!==null&&a!==void 0?a:!0}}/*! *****************************************************************************
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
***************************************************************************** */function Y(n,e,t,i){var s=arguments.length,o=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,e,t,i);else for(var c=n.length-1;c>=0;c--)(r=n[c])&&(o=(s<3?r(o):s>3?r(e,t,o):r(e,t))||o);return s>3&&o&&Object.defineProperty(e,t,o),o}function Si(n,e,t,i){function s(o){return o instanceof t?o:new t(function(r){r(o)})}return new(t||(t=Promise))(function(o,r){function c(u){try{l(i.next(u))}catch(d){r(d)}}function a(u){try{l(i.throw(u))}catch(d){r(d)}}function l(u){u.done?o(u.value):s(u.value).then(c,a)}l((i=i.apply(n,e||[])).next())})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Es=n=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(n,e):((t,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(r){customElements.define(t,r)}}})(n,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wn=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}};function ct(n){return(e,t)=>t!==void 0?((i,s,o)=>{s.constructor.createProperty(o,i)})(n,e,t):wn(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bn=({finisher:n,descriptor:e})=>(t,i)=>{var s;if(i===void 0){const o=(s=t.originalKey)!==null&&s!==void 0?s:t.key,r=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(t.key)}:{...t,key:o};return n!=null&&(r.finisher=function(c){n(c,o)}),r}{const o=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),n==null||n(o,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $n(n,e){return bn({descriptor:t=>{const i={get(){var s,o;return(o=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(n))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(e){const s=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var o,r;return this[s]===void 0&&(this[s]=(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(n))!==null&&r!==void 0?r:null),this[s]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var kt;((kt=window.HTMLSlotElement)===null||kt===void 0?void 0:kt.prototype.assignedElements)!=null;function*si(n=document.activeElement){n!=null&&(yield n,"shadowRoot"in n&&n.shadowRoot&&n.shadowRoot.mode!=="closed"&&(yield*si(n.shadowRoot.activeElement)))}function yn(){return[...si()].pop()}const Li=new WeakMap;function Ss(n){let e=Li.get(n);return e||(e=window.getComputedStyle(n,null),Li.set(n,e)),e}function _n(n){if("checkVisibility"in n&&typeof n.checkVisibility=="function")return n.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=Ss(n);return e.visibility!=="hidden"&&e.display!=="none"}function An(n){const e=Ss(n),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:n.scrollHeight>n.clientHeight&&t==="auto"||n.scrollWidth>n.clientWidth&&i==="auto"}function Cn(n){const e=n.tagName.toLowerCase(),t=Number(n.getAttribute("tabindex"));return n.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||n.hasAttribute("disabled")||n.closest("[inert]")||e==="input"&&n.getAttribute("type")==="radio"&&!n.hasAttribute("checked")||!_n(n)?!1:(e==="audio"||e==="video")&&n.hasAttribute("controls")||n.hasAttribute("tabindex")||n.hasAttribute("contenteditable")&&n.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:An(n)}function En(n,e){var t;return((t=n.getRootNode({composed:!0}))===null||t===void 0?void 0:t.host)!==e}function ki(n){const e=new WeakMap,t=[];function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||e.has(s))return;e.set(s,!0),!t.includes(s)&&Cn(s)&&t.push(s),s instanceof HTMLSlotElement&&En(s,n)&&s.assignedElements({flatten:!0}).forEach(o=>{i(o)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&i(s.shadowRoot)}for(const o of Array.from(s.children))i(o)}return i(n),t.sort((s,o)=>{const r=Number(s.getAttribute("tabindex"))||0;return(Number(o.getAttribute("tabindex"))||0)-r})}let Le=[];class Sn{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{!this.isActive()||this.checkFocus()},this.handleKeyDown=t=>{var i;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const s=yn();if(this.previousFocus=s,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const o=ki(this.element);let r=o.findIndex(a=>a===s);this.previousFocus=this.currentFocus;const c=this.tabDirection==="forward"?1:-1;for(;;){r+c>=o.length?r=0:r+c<0?r=o.length-1:r+=c,this.previousFocus=this.currentFocus;const a=o[r];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||a&&this.possiblyHasTabbableChildren(a))return;t.preventDefault(),this.currentFocus=a,(i=this.currentFocus)===null||i===void 0||i.focus({preventScroll:!1});const l=[...si()];if(l.includes(this.currentFocus)||!l.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){Le.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Le=Le.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Le[Le.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=ki(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],s=this.tabDirection==="forward"?t:i;typeof(s==null?void 0:s.focus)=="function"&&(this.currentFocus=s,s.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=window,ni=Qe.ShadowRoot&&(Qe.ShadyCSS===void 0||Qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ls=Symbol(),xi=new WeakMap;class Ln{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ls)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ni&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=xi.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&xi.set(t,e))}return e}toString(){return this.cssText}}const kn=n=>new Ln(typeof n=="string"?n:n+"",void 0,Ls),xn=(n,e)=>{ni?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=Qe.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},Ti=ni?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return kn(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xt;const st=window,Ri=st.trustedTypes,Tn=Ri?Ri.emptyScript:"",Bi=st.reactiveElementPolyfillSupport,Kt={toAttribute(n,e){switch(e){case Boolean:n=n?Tn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ks=(n,e)=>e!==n&&(e==e||n==n),Tt={attribute:!0,type:String,converter:Kt,reflect:!1,hasChanged:ks};class ke extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);s!==void 0&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=Tt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Tt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Ti(s))}else e!==void 0&&t.push(Ti(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return xn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=Tt){var s;const o=this.constructor._$Ep(e,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:Kt).toAttribute(t,i.type);this._$El=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),c=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:Kt;this._$El=o,this[o]=c.fromAttribute(t,r.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||ks)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw t=!1,this._$Ek(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}ke.finalized=!0,ke.elementProperties=new Map,ke.elementStyles=[],ke.shadowRootOptions={mode:"open"},Bi==null||Bi({ReactiveElement:ke}),((xt=st.reactiveElementVersions)!==null&&xt!==void 0?xt:st.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Rt;const nt=window,de=nt.trustedTypes,Pi=de?de.createPolicy("lit-html",{createHTML:n=>n}):void 0,B=`lit$${(Math.random()+"").slice(9)}$`,xs="?"+B,Rn=`<${xs}>`,he=document,ot=(n="")=>he.createComment(n),Me=n=>n===null||typeof n!="object"&&typeof n!="function",Ts=Array.isArray,Bn=n=>Ts(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Hi=/-->/g,Ii=/>/g,U=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mi=/'/g,Oi=/"/g,Rs=/^(?:script|style|textarea|title)$/i,Oe=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Ni=new WeakMap,se=he.createTreeWalker(he,129,null,!1),Pn=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=xe;for(let a=0;a<t;a++){const l=n[a];let u,d,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,d=r.exec(l),d!==null);)p=r.lastIndex,r===xe?d[1]==="!--"?r=Hi:d[1]!==void 0?r=Ii:d[2]!==void 0?(Rs.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=U):d[3]!==void 0&&(r=U):r===U?d[0]===">"?(r=s!=null?s:xe,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,u=d[1],r=d[3]===void 0?U:d[3]==='"'?Oi:Mi):r===Oi||r===Mi?r=U:r===Hi||r===Ii?r=xe:(r=U,s=void 0);const b=r===U&&n[a+1].startsWith("/>")?" ":"";o+=r===xe?l+Rn:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+B+b):l+B+(h===-2?(i.push(void 0),a):b)}const c=o+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Pi!==void 0?Pi.createHTML(c):c,i]};class Ne{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const c=e.length-1,a=this.parts,[l,u]=Pn(e,t);if(this.el=Ne.createElement(l,i),se.currentNode=this.el.content,t===2){const d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(s=se.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(B)){const p=u[r++];if(d.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(B),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?In:w[1]==="?"?On:w[1]==="@"?Nn:ht})}else a.push({type:6,index:o})}for(const h of d)s.removeAttribute(h)}if(Rs.test(s.tagName)){const d=s.textContent.split(B),h=d.length-1;if(h>0){s.textContent=de?de.emptyScript:"";for(let p=0;p<h;p++)s.append(d[p],ot()),se.nextNode(),a.push({type:2,index:++o});s.append(d[h],ot())}}}else if(s.nodeType===8)if(s.data===xs)a.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(B,d+1))!==-1;)a.push({type:7,index:o}),d+=B.length-1}o++}}static createElement(e,t){const i=he.createElement("template");return i.innerHTML=e,i}}function ue(n,e,t=n,i){var s,o,r,c;if(e===Oe)return e;let a=i!==void 0?(s=t._$Co)===null||s===void 0?void 0:s[i]:t._$Cl;const l=Me(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,i)),i!==void 0?((r=(c=t)._$Co)!==null&&r!==void 0?r:c._$Co=[])[i]=a:t._$Cl=a),a!==void 0&&(e=ue(n,a._$AS(n,e.values),a,i)),e}class Hn{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:he).importNode(i,!0);se.currentNode=o;let r=se.nextNode(),c=0,a=0,l=s[0];for(;l!==void 0;){if(c===l.index){let u;l.type===2?u=new dt(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new Un(r,this,e)),this.u.push(u),l=s[++a]}c!==(l==null?void 0:l.index)&&(r=se.nextNode(),c++)}return o}p(e){let t=0;for(const i of this.u)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class dt{constructor(e,t,i,s){var o;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cm=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ue(this,e,t),Me(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==Oe&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Bn(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==_&&Me(this._$AH)?this._$AA.nextSibling.data=e:this.T(he.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ne.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.p(i);else{const r=new Hn(o,this),c=r.v(this.options);r.p(i),this.T(c),this._$AH=r}}_$AC(e){let t=Ni.get(e.strings);return t===void 0&&Ni.set(e.strings,t=new Ne(e)),t}k(e){Ts(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new dt(this.O(ot()),this.O(ot()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cm=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ht{constructor(e,t,i,s,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=ue(this,e,t,0),r=!Me(e)||e!==this._$AH&&e!==Oe,r&&(this._$AH=e);else{const c=e;let a,l;for(e=o[0],a=0;a<o.length-1;a++)l=ue(this,c[i+a],t,a),l===Oe&&(l=this._$AH[a]),r||(r=!Me(l)||l!==this._$AH[a]),l===_?e=_:e!==_&&(e+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class In extends ht{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}const Mn=de?de.emptyScript:"";class On extends ht{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,Mn):this.element.removeAttribute(this.name)}}class Nn extends ht{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=ue(this,e,t,0))!==null&&i!==void 0?i:_)===Oe)return;const s=this._$AH,o=e===_&&s!==_||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==_&&(s===_||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Un{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ue(this,e)}}const Ui=nt.litHtmlPolyfillSupport;Ui==null||Ui(Ne,dt),((Rt=nt.litHtmlVersions)!==null&&Rt!==void 0?Rt:nt.litHtmlVersions=[]).push("2.6.1");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oi=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ri=Symbol(),Di=new Map;class Bs{constructor(e,t){if(this._$cssResult$=!0,t!==ri)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Di.get(this.cssText);return oi&&e===void 0&&(Di.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Dn=n=>new Bs(typeof n=="string"?n:n+"",ri),F=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new Bs(t,ri)},zn=(n,e)=>{oi?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},zi=oi?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Dn(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Bt;const Wi=window.trustedTypes,Wn=Wi?Wi.emptyScript:"",ji=window.reactiveElementPolyfillSupport,Zt={toAttribute(n,e){switch(e){case Boolean:n=n?Wn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ps=(n,e)=>e!==n&&(e==e||n==n),Pt={attribute:!0,type:String,converter:Zt,reflect:!1,hasChanged:Ps};class ie extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=Pt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Pt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(zi(s))}else e!==void 0&&t.push(zi(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return zn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Pt){var s,o;const r=this.constructor._$Eh(e,i);if(r!==void 0&&i.reflect===!0){const c=((o=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&o!==void 0?o:Zt.toAttribute)(t,i.type);this._$Ei=e,c==null?this.removeAttribute(r):this.setAttribute(r,c),this._$Ei=null}}_$AK(e,t){var i,s,o;const r=this.constructor,c=r._$Eu.get(e);if(c!==void 0&&this._$Ei!==c){const a=r.getPropertyOptions(c),l=a.converter,u=(o=(s=(i=l)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof l=="function"?l:null)!==null&&o!==void 0?o:Zt.fromAttribute;this._$Ei=c,this[c]=u(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ps)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,o)=>this[o]=s),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}ie.finalized=!0,ie.elementProperties=new Map,ie.elementStyles=[],ie.shadowRootOptions={mode:"open"},ji==null||ji({ReactiveElement:ie}),((Bt=globalThis.reactiveElementVersions)!==null&&Bt!==void 0?Bt:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ht;const pe=globalThis.trustedTypes,Fi=pe?pe.createPolicy("lit-html",{createHTML:n=>n}):void 0,P=`lit$${(Math.random()+"").slice(9)}$`,Hs="?"+P,jn=`<${Hs}>`,ge=document,Ue=(n="")=>ge.createComment(n),De=n=>n===null||typeof n!="object"&&typeof n!="function",Is=Array.isArray,Fn=n=>{var e;return Is(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},Te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qi=/-->/g,Gi=/>/g,D=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Vi=/'/g,Ki=/"/g,Ms=/^(?:script|style|textarea|title)$/i,qn=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),ai=qn(1),fe=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Zi=new WeakMap,Gn=(n,e,t)=>{var i,s;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let r=o._$litPart$;if(r===void 0){const c=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new Ze(e.insertBefore(Ue(),c),c,void 0,t!=null?t:{})}return r._$AI(n),r},ne=ge.createTreeWalker(ge,129,null,!1),Vn=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=Te;for(let a=0;a<t;a++){const l=n[a];let u,d,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,d=r.exec(l),d!==null);)p=r.lastIndex,r===Te?d[1]==="!--"?r=qi:d[1]!==void 0?r=Gi:d[2]!==void 0?(Ms.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=D):d[3]!==void 0&&(r=D):r===D?d[0]===">"?(r=s!=null?s:Te,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,u=d[1],r=d[3]===void 0?D:d[3]==='"'?Ki:Vi):r===Ki||r===Vi?r=D:r===qi||r===Gi?r=Te:(r=D,s=void 0);const b=r===D&&n[a+1].startsWith("/>")?" ":"";o+=r===Te?l+jn:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+P+b):l+P+(h===-2?(i.push(void 0),a):b)}const c=o+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Fi!==void 0?Fi.createHTML(c):c,i]};class ze{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const c=e.length-1,a=this.parts,[l,u]=Vn(e,t);if(this.el=ze.createElement(l,i),ne.currentNode=this.el.content,t===2){const d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(s=ne.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(P)){const p=u[r++];if(d.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(P),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?Zn:w[1]==="?"?Yn:w[1]==="@"?Xn:ut})}else a.push({type:6,index:o})}for(const h of d)s.removeAttribute(h)}if(Ms.test(s.tagName)){const d=s.textContent.split(P),h=d.length-1;if(h>0){s.textContent=pe?pe.emptyScript:"";for(let p=0;p<h;p++)s.append(d[p],Ue()),ne.nextNode(),a.push({type:2,index:++o});s.append(d[h],Ue())}}}else if(s.nodeType===8)if(s.data===Hs)a.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(P,d+1))!==-1;)a.push({type:7,index:o}),d+=P.length-1}o++}}static createElement(e,t){const i=ge.createElement("template");return i.innerHTML=e,i}}function ve(n,e,t=n,i){var s,o,r,c;if(e===fe)return e;let a=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu;const l=De(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,i)),i!==void 0?((r=(c=t)._$Cl)!==null&&r!==void 0?r:c._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=ve(n,a._$AS(n,e.values),a,i)),e}class Kn{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:ge).importNode(i,!0);ne.currentNode=o;let r=ne.nextNode(),c=0,a=0,l=s[0];for(;l!==void 0;){if(c===l.index){let u;l.type===2?u=new Ze(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new Qn(r,this,e)),this.v.push(u),l=s[++a]}c!==(l==null?void 0:l.index)&&(r=ne.nextNode(),c++)}return o}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ze{constructor(e,t,i,s){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ve(this,e,t),De(e)?e===A||e==null||e===""?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==fe&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Fn(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==A&&De(this._$AH)?this._$AA.nextSibling.data=e:this.k(ge.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=ze.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(i);else{const r=new Kn(o,this),c=r.p(this.options);r.m(i),this.k(c),this._$AH=r}}_$AC(e){let t=Zi.get(e.strings);return t===void 0&&Zi.set(e.strings,t=new ze(e)),t}S(e){Is(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Ze(this.A(Ue()),this.A(Ue()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ut{constructor(e,t,i,s,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=A}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=ve(this,e,t,0),r=!De(e)||e!==this._$AH&&e!==fe,r&&(this._$AH=e);else{const c=e;let a,l;for(e=o[0],a=0;a<o.length-1;a++)l=ve(this,c[i+a],t,a),l===fe&&(l=this._$AH[a]),r||(r=!De(l)||l!==this._$AH[a]),l===A?e=A:e!==A&&(e+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.C(e)}C(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Zn extends ut{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===A?void 0:e}}const Jn=pe?pe.emptyScript:"";class Yn extends ut{constructor(){super(...arguments),this.type=4}C(e){e&&e!==A?this.element.setAttribute(this.name,Jn):this.element.removeAttribute(this.name)}}class Xn extends ut{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=ve(this,e,t,0))!==null&&i!==void 0?i:A)===fe)return;const s=this._$AH,o=e===A&&s!==A||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==A&&(s===A||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Qn{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ve(this,e)}}const Ji=window.litHtmlPolyfillSupport;Ji==null||Ji(ze,Ze),((Ht=globalThis.litHtmlVersions)!==null&&Ht!==void 0?Ht:globalThis.litHtmlVersions=[]).push("2.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var It,Mt;class V extends ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Gn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return fe}}V.finalized=!0,V._$litElement$=!0,(It=globalThis.litElementHydrateSupport)===null||It===void 0||It.call(globalThis,{LitElement:V});const Yi=globalThis.litElementPolyfillSupport;Yi==null||Yi({LitElement:V});((Mt=globalThis.litElementVersions)!==null&&Mt!==void 0?Mt:globalThis.litElementVersions=[]).push("3.2.0");const eo=Object.freeze({processing:"processing",complete:"complete"});class to extends V{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=eo.processing}render(){return ai`
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
    `}static get styles(){const e=F`var(--activityIndicatorCheckmarkColor, #31A481)`,t=F`var(--activityIndicatorCompletedRingColor, #31A481)`,i=F`var(--activityIndicatorLoadingRingColor, #333333)`,s=F`var(--activityIndicatorLoadingDotColor, #333333)`;return F`
      #completed-ring {
        fill: ${t};
      }

      #check {
        fill: ${e};
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
    `}}window.customElements.define("ia-activity-indicator",to);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ot;const me=globalThis.trustedTypes,Xi=me?me.createPolicy("lit-html",{createHTML:n=>n}):void 0,H=`lit$${(Math.random()+"").slice(9)}$`,Os="?"+H,io=`<${Os}>`,we=document,rt=(n="")=>we.createComment(n),We=n=>n===null||typeof n!="object"&&typeof n!="function",Ns=Array.isArray,so=n=>{var e;return Ns(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},Re=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qi=/-->/g,es=/>/g,z=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ts=/'/g,is=/"/g,Us=/^(?:script|style|textarea|title)$/i,je=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),ss=new WeakMap,oe=we.createTreeWalker(we,129,null,!1),no=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=Re;for(let a=0;a<t;a++){const l=n[a];let u,d,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,d=r.exec(l),d!==null);)p=r.lastIndex,r===Re?d[1]==="!--"?r=Qi:d[1]!==void 0?r=es:d[2]!==void 0?(Us.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=z):d[3]!==void 0&&(r=z):r===z?d[0]===">"?(r=s!=null?s:Re,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,u=d[1],r=d[3]===void 0?z:d[3]==='"'?is:ts):r===is||r===ts?r=z:r===Qi||r===es?r=Re:(r=z,s=void 0);const b=r===z&&n[a+1].startsWith("/>")?" ":"";o+=r===Re?l+io:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+H+b):l+H+(h===-2?(i.push(void 0),a):b)}const c=o+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Xi!==void 0?Xi.createHTML(c):c,i]};class Fe{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const c=e.length-1,a=this.parts,[l,u]=no(e,t);if(this.el=Fe.createElement(l,i),oe.currentNode=this.el.content,t===2){const d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(s=oe.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(H)){const p=u[r++];if(d.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(H),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?ro:w[1]==="?"?lo:w[1]==="@"?co:gt})}else a.push({type:6,index:o})}for(const h of d)s.removeAttribute(h)}if(Us.test(s.tagName)){const d=s.textContent.split(H),h=d.length-1;if(h>0){s.textContent=me?me.emptyScript:"";for(let p=0;p<h;p++)s.append(d[p],rt()),oe.nextNode(),a.push({type:2,index:++o});s.append(d[h],rt())}}}else if(s.nodeType===8)if(s.data===Os)a.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(H,d+1))!==-1;)a.push({type:7,index:o}),d+=H.length-1}o++}}static createElement(e,t){const i=we.createElement("template");return i.innerHTML=e,i}}function be(n,e,t=n,i){var s,o,r,c;if(e===je)return e;let a=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu;const l=We(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,i)),i!==void 0?((r=(c=t)._$Cl)!==null&&r!==void 0?r:c._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=be(n,a._$AS(n,e.values),a,i)),e}class oo{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:we).importNode(i,!0);oe.currentNode=o;let r=oe.nextNode(),c=0,a=0,l=s[0];for(;l!==void 0;){if(c===l.index){let u;l.type===2?u=new pt(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new ho(r,this,e)),this.v.push(u),l=s[++a]}c!==(l==null?void 0:l.index)&&(r=oe.nextNode(),c++)}return o}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class pt{constructor(e,t,i,s){var o;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=be(this,e,t),We(e)?e===C||e==null||e===""?(this._$AH!==C&&this._$AR(),this._$AH=C):e!==this._$AH&&e!==je&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):so(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==C&&We(this._$AH)?this._$AA.nextSibling.data=e:this.k(we.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Fe.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(i);else{const r=new oo(o,this),c=r.p(this.options);r.m(i),this.k(c),this._$AH=r}}_$AC(e){let t=ss.get(e.strings);return t===void 0&&ss.set(e.strings,t=new Fe(e)),t}S(e){Ns(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new pt(this.A(rt()),this.A(rt()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class gt{constructor(e,t,i,s,o){this.type=1,this._$AH=C,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=be(this,e,t,0),r=!We(e)||e!==this._$AH&&e!==je,r&&(this._$AH=e);else{const c=e;let a,l;for(e=o[0],a=0;a<o.length-1;a++)l=be(this,c[i+a],t,a),l===je&&(l=this._$AH[a]),r||(r=!We(l)||l!==this._$AH[a]),l===C?e=C:e!==C&&(e+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.C(e)}C(e){e===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class ro extends gt{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===C?void 0:e}}const ao=me?me.emptyScript:"";class lo extends gt{constructor(){super(...arguments),this.type=4}C(e){e&&e!==C?this.element.setAttribute(this.name,ao):this.element.removeAttribute(this.name)}}class co extends gt{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=be(this,e,t,0))!==null&&i!==void 0?i:C)===je)return;const s=this._$AH,o=e===C&&s!==C||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==C&&(s===C||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class ho{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){be(this,e)}}const ns=window.litHtmlPolyfillSupport;ns==null||ns(Fe,pt),((Ot=globalThis.litHtmlVersions)!==null&&Ot!==void 0?Ot:globalThis.litHtmlVersions=[]).push("2.2.1");var uo=ai`
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
`;class po extends V{static get styles(){return F`
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
    `}render(){return uo}}customElements.define("ia-icon-close",po);var go=m`
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
`;let Jt=class extends x{constructor(){super(...arguments),this.config=new G}render(){return m`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?m`<div class="logo-icon">${go}</div>`:$}
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
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return m`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}static get styles(){const e=g`var(--modalLogoSize, 6.5rem)`,t=g`var(--processingImageSize, 7.5rem)`,i=g`var(--modalCornerRadius, 1rem)`,s=g`var(--modalBorder, 2px solid black)`,o=g`var(--modalBottomMargin, 2.5rem)`,r=g`var(--modalTopMargin, 5rem)`,c=g`var(--modalHeaderBottomPadding, 0.5em)`,a=g`var(--modalBottomPadding, 2rem)`,l=g`var(--modalScrollOffset, 5px)`,u=g`var(--modalTitleFontSize, 1.8rem)`,d=g`var(--modalSubtitleFontSize, 1.4rem)`,h=g`var(--modalHeadlineFontSize, 1.6rem)`,p=g`var(--modalMessageFontSize, 1.4rem)`,b=g`var(--modalTitleLineHeight, normal)`,w=g`var(--modalSubtitleLineHeight, normal)`,X=g`var(--modalHeadlineLineHeight, normal)`,Q=g`var(--modalMessageLineHeight, normal)`;return g`
      .processing-logo {
        margin: auto;
        width: ${t};
        height: ${t};
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
        padding-bottom: ${c};
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
        font-size: ${d};
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
        line-height: ${X};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${p};
        line-height: ${Q};
      }

      .logo-icon {
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18),
          0 2px 2px 0 rgba(0, 0, 0, 0.08);
        width: ${e};
        height: ${e};
        margin: -2.9rem auto 0.5rem auto;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo-icon svg {
        width: calc(${e} * 0.65);
        height: calc(${e} * 0.65);
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
    `}};Y([ct({type:Object})],Jt.prototype,"config",void 0);Jt=Y([Es("modal-template")],Jt);function fo(n,e,t){var i=t||{},s=i.noTrailing,o=s===void 0?!1:s,r=i.noLeading,c=r===void 0?!1:r,a=i.debounceMode,l=a===void 0?void 0:a,u,d=!1,h=0;function p(){u&&clearTimeout(u)}function b(X){var Q=X||{},O=Q.upcomingOnly,bt=O===void 0?!1:O;p(),d=!bt}function w(){for(var X=arguments.length,Q=new Array(X),O=0;O<X;O++)Q[O]=arguments[O];var bt=this,li=Date.now()-h;if(d)return;function Je(){h=Date.now(),e.apply(bt,Q)}function ci(){u=void 0}!c&&l&&!u&&Je(),p(),l===void 0&&li>n?c?(h=Date.now(),o||(u=setTimeout(l?ci:Je,n))):Je():o!==!0&&(u=setTimeout(l?ci:Je,l===void 0?n-li:n))}return w.cancel=b,w}var K;(function(n){n.Open="open",n.Closed="closed"})(K||(K={}));class vo{constructor(e){this.windowResizeThrottler=fo(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case K.Open:this.startResizeListener(),this.stopDocumentScroll();break;case K.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let $e=class extends x{constructor(){super(...arguments),this.mode=K.Closed,this.hostBridge=new vo(this),this.modal=new Sn(this),this.closeOnBackdropClick=!0}firstUpdated(){return Si(this,void 0,void 0,function*(){yield new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return m`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=K.Closed,this.customModalContent=void 0,this.modalTemplate.config=new G,this.modal.deactivate()}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}showModal(e){return Si(this,void 0,void 0,function*(){this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.modalTemplate.config=e.config,this.customModalContent=e.customModalContent,this.mode=K.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus(),this.modal.activate()})}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=g`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=g`var(--modalBackdropZindex, 1000)`,i=g`var(--modalWidth, 32rem)`,s=g`var(--modalMaxWidth, 95%)`,o=g`var(--modalZindex, 2000)`;return g`
      .container {
        width: 100%;
        height: 100%;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        background-color: ${e};
        width: 100%;
        height: 100%;
        z-index: ${t};
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
    `}};Y([ct({type:String,reflect:!0})],$e.prototype,"mode",void 0);Y([ct({type:Object})],$e.prototype,"customModalContent",void 0);Y([ct({type:Object})],$e.prototype,"hostBridge",void 0);Y([$n("modal-template")],$e.prototype,"modalTemplate",void 0);$e=Y([Es("modal-manager")],$e);function Ce(n){return new Promise((e,t)=>{n.oncomplete=n.onsuccess=()=>e(n.result),n.onabort=n.onerror=()=>t(n.error)})}function mo(n,e){const t=indexedDB.open(n);t.onupgradeneeded=()=>t.result.createObjectStore(e);const i=Ce(t);return(s,o)=>i.then(r=>o(r.transaction(e,s).objectStore(e)))}let Nt;function ft(){return Nt||(Nt=mo("keyval-store","keyval")),Nt}function wo(n,e=ft()){return e("readonly",t=>Ce(t.get(n)))}function bo(n,e,t=ft()){return t("readwrite",i=>(i.put(e,n),Ce(i.transaction)))}function $o(n,e=ft()){return e("readwrite",t=>(t.delete(n),Ce(t.transaction)))}function yo(n,e){return n.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},Ce(n.transaction)}function _o(n=ft()){return n("readonly",e=>{if(e.getAllKeys)return Ce(e.getAllKeys());const t=[];return yo(e,i=>t.push(i.key)).then(()=>t)})}function Ao(n,e){return n.setMilliseconds(n.getMilliseconds()+e*1e3),n}class Ds{constructor(e){var t,i,s,o;if(this.namespace=(t=e==null?void 0:e.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(i=e==null?void 0:e.defaultTTL)!==null&&i!==void 0?i:15*60,(!((s=e==null?void 0:e.immediateClean)!==null&&s!==void 0)||s)&&this.cleanExpired(),!(e!=null&&e.disableCleaning)){const r=(o=e==null?void 0:e.cleaningInterval)!==null&&o!==void 0?o:60;setInterval(()=>{this.cleanExpired()},r*1e3)}}async set(e){var t;const i={value:e.value},s=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,o=Ao(new Date,s);i.expires=o;const r=this.getNamespacedKey(e.key);try{await bo(r,i)}catch{}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await wo(t)}catch{}if(!i)return;const s=new Date;if(i.expires&&i.expires<s){await this.delete(e);return}return i.value}async delete(e){const t=this.getNamespacedKey(e);try{await $o(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await _o()}catch{}const t=[];for(const o of e)typeof o=="string"&&t.push(o);return t.filter(o=>o.startsWith(this.namespace)).map(o=>this.removeNamespace(o))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ws=n=>(...e)=>({_$litDirective$:n,values:e});class js{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const os=Ws(class extends js{constructor(n){var e;if(super(n),n.type!==zs.ATTRIBUTE||n.name!=="class"||((e=n.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){var t,i;if(this.it===void 0){this.it=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!(!((t=this.nt)===null||t===void 0)&&t.has(o))&&this.it.add(o);return this.render(e)}const s=n.element.classList;this.it.forEach(o=>{o in e||(s.remove(o),this.it.delete(o))});for(const o in e){const r=!!e[o];r===this.it.has(o)||((i=this.nt)===null||i===void 0?void 0:i.has(o))||(r?(s.add(o),this.it.add(o)):(s.remove(o),this.it.delete(o)))}return M}});class L{static isInIframe(){var e;try{return window.self!==window.top}catch(t){return(e=window==null?void 0:window.Sentry)==null||e.captureException(t),!0}}static getRedirectUrl(){let e;return L.isInIframe()?e=window.top.location.href:e=window.location.href,e}static goToUrl(e,t){let i;L.isInIframe()&&t?i=window.top.location:i=window.location,i.href===e?i.reload():i.href=e}static isOnStreamPage(){return window.location.href.indexOf("/stream/")>-1}static getQueryParam(e){const i=window.location.search.substring(1).split("&");let s="";for(let o=0;o<i.length;o+=1)if(s=i[o].split("="),s[0]===e)return s[1];return $}static getBackHref(){return window.location.href.replace(/[?&]{1}(?:admin|access)=1/,"")}static formatUrl(e,t){return/^https?:/.test(t)?t:`${e}${t}`}}const T={disconnectedCallback:"IABookActions:disconnectedCallback",bookHasRenewed:"IABookActions:handleLoanAutoRenewed - book has renewed for next one hour",bookRenewFailed:"IABookActions:handleLoanRenewNow - failed to renew",browseHasExpired:"IABookActions:browseHasExpired - one-hour loan has been expired",bookWasExpired:"IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller",clearTokenPoller:"IABookActions:startLoanTokenPoller - clearing token poller interval",clearOneHourTimer:"IABookActions:timerCountdown - one-hour timer interval cleared",bookAccessed:"IABookActions:bookAccessed",handleLoanTokenPoller:"IABookActions:handleLoanTokenPoller",setConsecutiveLoanCounts:"IABookActions:setConsecutiveLoanCounts",actionsHandlerService:"IABookActions:actionsHandlerService"},y=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)||location.host.match(/^internetarchive/)?console.log.bind(console):()=>{};async function j(n){var d,h;const e={action:null,identifier:"",success(){},error(){},...n};let t="/services/loans/loan";const i=window==null?void 0:window.location,s="loan token not found. please try again later.",o="This book is not available to borrow at this time. Please try again later.",r=["browse_book","borrow_book","create_token","renew_loan","return_loan"],c=((d=i==null?void 0:i.href)==null?void 0:d.indexOf("?error=true"))!==-1&&(i==null?void 0:i.hostname)!=="archive.org",a=["localhost","internetarchive.github.io"];let l=!1;a.includes(i.hostname)&&(l=!0,t=i.href);let u=new FormData;u.append("action",e.action),u.append("identifier",e.identifier);try{await fetch(t,{method:"POST",body:u}).then(async p=>c&&r.includes(e==null?void 0:e.action)?{success:!1,error:(e==null?void 0:e.action)==="create_token"?s:o}:l?(e==null?void 0:e.action)=="renew_loan"||(e==null?void 0:e.action)=="return_loan"?(await new Promise(b=>setTimeout(b,5e3)),{success:!0,loan:{renewal:!0}}):{success:!0,message:"operation executed successfully!"}:p.json()).then(p=>{p!=null&&p.error?e==null||e.error(p):e==null||e.success(p)})}catch(p){(h=window==null?void 0:window.Sentry)==null||h.captureException(`${T.actionsHandlerService} - Error: ${p}`)}}const Z={borrow:"BookReader-ReadingBorrow",browse:"BookReader-ReadingBrowse",preview:"BookReader-Preview",satisfactionMetric:"DetailsPage-Book",bookReaderHeader:"BookReader-Header",adminAccess:"Admin-Access"},re={browse:"Borrow-1Hour",browseAgain:"Borrow-Again",browseRenew:"BookRenew",browseReturn:"BookReturn",borrow:"Borrow-14Days",waitlistJoin:"JoinWaitlist",waitlistLeave:"LeaveWaitlist",doneBorrowing:"ReturnBook",login:"LogIn",purchase:"BWBPurchase",unavailable:"Book-Unavailable",printDisability:"Print-Disability",titleBar:"Book-Title-Bar"},Ye={browseAutoRenew:"BookAutoRenew",browseAutoReturn:"BookAutoReturn",browseManualRenew:"BookManualRenew",browseManualReturn:"BookManualReturn"};function Co(n){return n&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(n).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}function et(n,e,t,i,s,o){return document.cookie=encodeURIComponent(n)+"="+encodeURIComponent(e)+(t?`; expires=${t.toUTCString()}`:"")+(s?`; domain=${s}`:"")+(i?`; path=${i}`:"")+(o?"; secure":""),!0}class Fs{constructor(){this.identifier=void 0,this.gaStats={}}async storeLoanStatsCount(e,t=""){this.identifier=e;try{await this.getLoanStatsCount(t),this.sendMatrixStatsEvents(t);const i=new Date;i.setHours(i.getHours()+2),await et(this.getLoanCountStorageKey,JSON.stringify(this.lendingEventCounts),i,"/")}catch(i){y(i),this.sendEvent("Cookies-Error-Actions",i,this.identifier)}}async getLoanStatsCount(e){var o,r,c,a,l,u,d;this.lendingEventCounts=JSON.parse(await Co(this.getLoanCountStorageKey)),this.gaStats=(o=this.lendingEventCounts)!=null?o:{browse:0,renew:0,expire:0};let t=(c=(r=this.lendingEventCounts)==null?void 0:r.browse)!=null?c:0,i=(l=(a=this.lendingEventCounts)==null?void 0:a.renew)!=null?l:0,s=(d=(u=this.lendingEventCounts)==null?void 0:u.expire)!=null?d:0;switch(e){case"browse":t=t?Number(t)+1:1,this.gaStats.browse=t,i=0,s=0;break;case"autorenew":i=i?Number(i)+1:1,this.gaStats.renew=i;break;case"return":s=s?Number(s)+1:1,this.gaStats.expire=s,i=0,s=0;break}this.lendingEventCounts={browse:t,renew:i,expire:s}}sendMatrixStatsEvents(e){var s,o;const t=Z.browse,i=`browse${this.paddedNumber((s=this.gaStats)==null?void 0:s.browse)}-autorenew${this.paddedNumber((o=this.gaStats)==null?void 0:o.renew)}:${e}`;this.sendEvent(t,i,this.identifier)}paddedNumber(e){return e?e.toString().padStart(3,"0"):"000"}get getLoanCountStorageKey(){return`br-browse-${this.identifier}`}sendEvent(e,t,i,s){var o;y("eventCategory:-",e,"||	eventAction:-",t,"||	label:-",i,"||	extraParams:-",s),(o=window==null?void 0:window.archive_analytics)==null||o.send_event_no_sampling(e,t,i||this.identifier,s)}}class qs extends x{constructor(){super(),this.waitUntillBorrowComplete=6,this.loanAnanlytics=new Fs,this.bindEvents()}bindEvents(){this.addEventListener("browseBook",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browse"))}),this.addEventListener("browseBookAgain",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browseagain"))}),this.addEventListener("autoRenew",async({detail:e})=>{var i,s;this.handleLoanRenewNow(),await((i=this.loanAnanlytics)==null?void 0:i.storeLoanStatsCount(this.identifier,"autorenew"));const t=(e==null?void 0:e.renewType)==="auto"?Ye.browseAutoRenew:Ye.browseManualRenew;(s=this.loanAnanlytics)==null||s.sendEvent(Z.browse,re.browseRenew,t,this.identifier)}),this.addEventListener("autoReturn",async()=>{var e,t;this.handleReturnIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"autoreturn")),(t=this.loanAnanlytics)==null||t.sendEvent(Z.browse,re.browseReturn,Ye.browseAutoReturn,this.identifier)}),this.addEventListener("returnNow",({detail:e})=>{var t,i,s;if((e==null?void 0:e.borrowType)==="browse"&&((t=this.loanAnanlytics)==null||t.storeLoanStatsCount(this.identifier,"return"),(i=this.loanAnanlytics)==null||i.sendEvent(Z.browse,re.browseReturn,Ye.browseManualReturn,this.identifier)),this.handleReturnIt("returnNow"),(e==null?void 0:e.borrowType)==="borrow"){const{category:o,action:r}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(o,r,this.identifier)}}),this.addEventListener("borrowBook",({detail:e})=>{var s;this.handleBorrowIt();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("loginAndBorrow",({detail:e})=>{var s;this.handleLoginOk();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("leaveWaitlist",({detail:e})=>{var s;this.handleRemoveFromWaitingList();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("joinWaitlist",({detail:e})=>{var s;this.handleReserveIt();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("purchaseBook",({detail:e})=>{var s;const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("adminAccess",({detail:e})=>{var o;const{category:t,action:i}=e.event;(o=this.loanAnanlytics)==null||o.sendEvent(t,i,this.identifier),this.setStickyAdminAccess(!0);const s=new URL(window.location.href);s.searchParams.append("admin",1),window.location.search=s.search}),this.addEventListener("exitAdminAccess",({detail:e})=>{var s;const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier),this.setStickyAdminAccess(!1)}),this.addEventListener("bookTitleBar",({detail:e})=>{var s;const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)})}handleBrowseIt(){const e="browse_book";this.dispatchToggleActionGroup(),j({action:e,identifier:this.identifier,success:()=>{this.setBrowseTimeSession(),this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleLoanRenewNow(){const e="renew_loan";j({action:e,identifier:this.identifier,success:t=>{var o;y("RENEW_LOAN --- ",t,e,t.loan,this.identifier);const i=t.loan?t.loan:void 0,s=i.renewal;i&&s?this.setBrowseTimeSession():(y("RENEW_LOAN ERROR --- ",{action:e,isRenewal:s,activeLoan:i,data:t,id:this.identifier}),(o=window==null?void 0:window.Sentry)==null||o.captureMessage(`${T.bookRenewFailed} - Error: ${JSON.stringify(t)}`),this.dispatchActionError(e,{data:t,error:!0,message:"Loan renewal failed: no loan active."})),this.dispatchEvent(new CustomEvent("loanAutoRenewed",{detail:{action:e,data:{...t,loan:i}}}))},error:t=>{this.dispatchActionError(e,t)}})}handleReturnIt(e=""){const t="return_loan";e==="returnNow"&&this.dispatchToggleActionGroup(),j({action:t,identifier:this.identifier,success:()=>{this.deleteLoanCookies(),e==="returnNow"&&L.goToUrl(this.returnUrl,!0)},error:i=>{this.dispatchActionError(t,i)}})}handleBorrowIt(){const e="borrow_book";this.dispatchToggleActionGroup(),j({action:e,identifier:this.identifier,success:()=>{this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleReserveIt(){const e="join_waitlist";this.dispatchToggleActionGroup(),j({action:e,identifier:this.identifier,success:()=>{L.goToUrl(L.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}handleRemoveFromWaitingList(){const e="leave_waitlist";this.dispatchToggleActionGroup(),j({action:e,identifier:this.identifier,success:()=>{L.goToUrl(L.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}dispatchActionError(e,t={}){var i;(i=this.loanAnanlytics)==null||i.sendEvent("LendingServiceError",e),this.dispatchEvent(new CustomEvent("lendingActionError",{detail:{action:e,data:t}}))}dispatchToggleActionGroup(){this.dispatchEvent(new CustomEvent("toggleActionGroup"))}handleLoginOk(){const e=`/account/login?referer=${encodeURIComponent(L.getRedirectUrl())}`;L.goToUrl(e,!0)}handleReadItNow(e){const t=new URLSearchParams(window.location.search);if(e){const r=new URLSearchParams(e);for(const[c,a]of r.entries())t.append(c,a)}const i=t.toString(),s=i?`?${i}`:"",o=window.location.origin+window.location.pathname+s;setTimeout(()=>{L.goToUrl(o,!0)},this.waitUntillBorrowComplete*1e3)}async setBrowseTimeSession(){try{const e=new Date(new Date().getTime()+this.loanTotalTime*1e3);await this.localCache.set({key:`${this.identifier}-loanTime`,value:e,ttl:Number(this.loanTotalTime)}),await this.localCache.delete(`${this.identifier}-pageChangedTime`)}catch(e){y(e)}}deleteLoanCookies(){const e=new Date;e.setTime(e.getTime()-24*60*60*1e3),et(`loan-${this.identifier}=""`,"",e,"/",".archive.org"),et(`br-loan-${this.identifier}=""`,"",e,"/",".archive.org")}setStickyAdminAccess(e){const t=window.location.hostname==="localhost"?"localhost":".archive.org";et("sticky-admin-access",e,"","/",t)}}const rs=g`var(--white, #fff)`,Eo=g`var(--primaryDisableCTAFill, #767676)`,So=g`var(--secondaryCTABorder, #999)`,Lo=g`var(--primaryCTAFill, #194880)`,Ut=g`var(--primaryCTAFillRGB, 25, 72, 128)`,ko=g`var(--primaryCTABorder, #c5d1df)`,xo=g`var(--primaryErrorCTAFill, #d9534f)`,Dt=g`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,To=g`var(--primaryErrorCTABorder, #d43f3a)`,Ro=g`var(--secondaryCTAFill, #333)`,zt=g`var(--secondaryCTAFillRGB, 51, 51, 51)`,Bo=g`var(--primaryCTABorder, #979797)`,Po=g`#ee8950`,Ho=g`#ec7939`;var Io=g`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${rs};
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
    outline-color: ${rs};
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
    background-color: ${Eo};
    border: 1px solid ${So};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${Po}
    border-color: ${Ho};
  }

  .ia-button.primary {
    background-color: ${Lo};
    border-color: ${ko};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Ut}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Ut}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Ut}, 0.7);
  }

  .ia-button.danger {
    background-color: ${xo};
    border-color: ${To};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Dt}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Dt}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Dt}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Ro};
    border-color: ${Bo};
  }
  .ia-button.dark:hover {
    background-color: rgba(${zt}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${zt}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${zt}, 0.7);
  }
`;const ee=g`var(--white, #fff)`,as=g`var(--primaryBGColor, #000)`,Mo=g`var(--iaBookActionsDropdownBGColor, #2d2d2d)`;var Oo=g`
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
    background-color: ${ee};
    border-radius: 10px;
  }
  .action-buttons .desktop.purchase {
    margin-left: 5px;
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${ee};
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
    background-color: ${as};
    border: 1px solid ${ee};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    background: ${Mo};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${as};
    list-style: none;
    height: 3rem;
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${ee};
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
    background: ${ee};
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
    background-color: ${ee};
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
`;const ls=700,No=800,Uo=m`<svg
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
</svg>`,Do=m`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
    fill="#fff"
  />
</svg>`,Wt=m`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill="#fff"
  />
</svg>`;class zo extends qs{static get properties(){return{userid:{type:String},identifier:{type:String},primaryActions:{type:Array},secondaryActions:{type:Array},primaryColor:{type:String},dropdownState:{type:String},width:{type:Number},hasAdminAccess:{type:Boolean},dropdownArrow:{type:String},disabled:{type:Boolean},returnUrl:{type:String},autoRenew:{type:Boolean},loanRenewType:{type:String},autoReturn:{type:Boolean},returnNow:{type:Boolean}}}constructor(){super(),this.userid="",this.identifier="",this.primaryActions=[],this.secondaryActions=[],this.primaryColor="",this.dropdownState="close",this.width=0,this.hasAdminAccess=!1,this.dropdownArrow=Wt,this.initialButton=!1,this.title="",this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.disabled=!1,this.returnUrl="",this.autoRenew=!1,this.loanRenewType="",this.autoReturn=!1,this.returnNow=!1}updated(e){(e.has("width")||e.has("disabled"))&&this.isBelowTabletContainer&&this.resetActions(),e.has("autoRenew")&&this.autoRenew&&this.dispatchLoanEvent("autoRenew",{renewType:this.loanRenewType});const t=e.has("autoReturn")&&this.autoReturn;t&&this.dispatchLoanEvent("autoReturn"),e.has("returnNow")&&this.returnNow&&!t&&this.dispatchLoanEvent("returnNow",{borrowType:"browse"})}dispatchLoanEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}resetActions(){this.primaryActions.length&&(this.primaryActions=this.primaryActions.concat(this.secondaryActions),this.primaryColor=this.primaryActions[0].className,this.hasAdminAccess&&this.sortActionButtonOrder(),this.secondaryActions=[])}sortActionButtonOrder(){let e=1;const t=0;this.secondaryActions.length===2&&(e=2),e=this.primaryActions.length-e;const i=this.primaryActions[e],s=this.primaryActions;s.splice(e,1),s.splice(t,0,i),this.primaryActions=s}render(){return m`
      <div
        class="${os({actiongroup:!0,disabled:this.disabled})}"
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
    `)}get renderSecondaryActions(){return this.secondaryActions.length?this.secondaryActions.map(e=>this.renderActionButton(e)):$}renderActionLink(e,t=!1){return m`<span class="${this.getDeviceType} ${e.className}">
      <a
        class="ia-button ${e.className} ${t?"initial":""}"
        href="${e.url}"
        target=${e.target}
        @click=${()=>{this.clickHandler(e.id,e.analyticsEvent,e==null?void 0:e.borrowType)}}
      >
        ${e.id==="purchaseBook"?Uo:""} ${e.text}
        <small>${e.subText}</small>
      </a>
    </span>`}renderActionButton(e,t=!1){if(e.url)return this.renderActionLink(e,t);const{analyticsEvent:i}=e;return m`<button
      class="ia-button ${e.className} ${t?"initial":""}"
      @click=${()=>{this.clickHandler(e.id,i,e==null?void 0:e.borrowType)}}
    >
      ${e.text}
    </button>`}clickHandler(e,t,i=""){if(this.dropdownState="close",this.dropdownArrow=Wt,!t||!e)return;const{category:s,action:o}=t;this.dispatchEvent(new CustomEvent(e,{detail:{event:{category:s,action:o},borrowType:i}}))}get initialActionTemplate(){return this.initialButton=!1,this.primaryActions.length>1&&(this.initialButton=!0),this.renderActionButton(this.primaryActions[0],this.initialButton)}get getPrimaryItems(){return this.primaryActions.slice(1).map(e=>m`<li>${this.renderActionButton(e,this.initialButton)}</li>`)}get getLoaderIcon(){return m`<img
      class="${os({actionloader:!0,disabled:this.disabled})}"
      alt=""
      src="${this.loaderIcon}"
    />`}get isBelowTabletContainer(){return this.width<=No}get getDeviceType(){return this.isBelowTabletContainer?"mobile":"desktop"}toggleDropdown(){this.dropdownState==="open"?(this.dropdownState="close",this.dropdownArrow=Wt,this.primaryColor=this.primaryActions[0].className):(this.dropdownState="open",this.dropdownArrow=Do,this.primaryColor="dark")}static get styles(){return[Io,Oo]}}window.customElements.define("collapsible-action-group",zo);const Wo=m`
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
`;class jo extends qs{static get properties(){return{identifier:{type:String},bookTitle:{type:String}}}constructor(){super(),this.identifier="",this.bookTitle="",this.analyticsCategories=Z,this.analyticsActions=re}clickHandler(){const{category:e,action:t}={category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.titleBar};this.dispatchEvent(new CustomEvent("bookTitleBar",{detail:{event:{category:e,action:t}}}))}render(){return m`
      <a
        class="embed-link"
        @click=${()=>{this.clickHandler()}}
        href="/details/${this.identifier}"
      >
        <span>${Wo}</span>
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
    `}}window.customElements.define("book-title-bar",jo);class Fo extends x{static get properties(){return{texts:{type:String},textClass:{type:String}}}constructor(){super(),this.texts="",this.textClass=""}render(){return m`
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
    `}}window.customElements.define("text-group",Fo);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Yt extends js{constructor(e){if(super(e),this.et=$,e.type!==zs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===$||e==null)return this.ft=void 0,this.et=e;if(e===M)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Yt.directiveName="unsafeHTML",Yt.resultType=1;const qo=Ws(Yt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var jt;const ye=globalThis.trustedTypes,cs=ye?ye.createPolicy("lit-html",{createHTML:n=>n}):void 0,I=`lit$${(Math.random()+"").slice(9)}$`,Gs="?"+I,Go=`<${Gs}>`,_e=document,at=(n="")=>_e.createComment(n),qe=n=>n===null||typeof n!="object"&&typeof n!="function",Vs=Array.isArray,Vo=n=>{var e;return Vs(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},Be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ds=/-->/g,hs=/>/g,W=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,us=/'/g,ps=/"/g,Ks=/^(?:script|style|textarea|title)$/i,Ge=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),gs=new WeakMap,ae=_e.createTreeWalker(_e,129,null,!1),Ko=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=Be;for(let a=0;a<t;a++){const l=n[a];let u,d,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,d=r.exec(l),d!==null);)p=r.lastIndex,r===Be?d[1]==="!--"?r=ds:d[1]!==void 0?r=hs:d[2]!==void 0?(Ks.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=W):d[3]!==void 0&&(r=W):r===W?d[0]===">"?(r=s!=null?s:Be,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,u=d[1],r=d[3]===void 0?W:d[3]==='"'?ps:us):r===ps||r===us?r=W:r===ds||r===hs?r=Be:(r=W,s=void 0);const b=r===W&&n[a+1].startsWith("/>")?" ":"";o+=r===Be?l+Go:h>=0?(i.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+I+b):l+I+(h===-2?(i.push(void 0),a):b)}const c=o+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[cs!==void 0?cs.createHTML(c):c,i]};class Ve{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const c=e.length-1,a=this.parts,[l,u]=Ko(e,t);if(this.el=Ve.createElement(l,i),ae.currentNode=this.el.content,t===2){const d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(s=ae.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const h of s.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(I)){const p=u[r++];if(d.push(h),p!==void 0){const b=s.getAttribute(p.toLowerCase()+"$lit$").split(I),w=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?Jo:w[1]==="?"?Xo:w[1]==="@"?Qo:mt})}else a.push({type:6,index:o})}for(const h of d)s.removeAttribute(h)}if(Ks.test(s.tagName)){const d=s.textContent.split(I),h=d.length-1;if(h>0){s.textContent=ye?ye.emptyScript:"";for(let p=0;p<h;p++)s.append(d[p],at()),ae.nextNode(),a.push({type:2,index:++o});s.append(d[h],at())}}}else if(s.nodeType===8)if(s.data===Gs)a.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(I,d+1))!==-1;)a.push({type:7,index:o}),d+=I.length-1}o++}}static createElement(e,t){const i=_e.createElement("template");return i.innerHTML=e,i}}function Ae(n,e,t=n,i){var s,o,r,c;if(e===Ge)return e;let a=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu;const l=qe(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,t,i)),i!==void 0?((r=(c=t)._$Cl)!==null&&r!==void 0?r:c._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=Ae(n,a._$AS(n,e.values),a,i)),e}class Zo{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:_e).importNode(i,!0);ae.currentNode=o;let r=ae.nextNode(),c=0,a=0,l=s[0];for(;l!==void 0;){if(c===l.index){let u;l.type===2?u=new vt(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new er(r,this,e)),this.v.push(u),l=s[++a]}c!==(l==null?void 0:l.index)&&(r=ae.nextNode(),c++)}return o}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class vt{constructor(e,t,i,s){var o;this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ae(this,e,t),qe(e)?e===E||e==null||e===""?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==Ge&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Vo(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==E&&qe(this._$AH)?this._$AA.nextSibling.data=e:this.k(_e.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ve.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(i);else{const r=new Zo(o,this),c=r.p(this.options);r.m(i),this.k(c),this._$AH=r}}_$AC(e){let t=gs.get(e.strings);return t===void 0&&gs.set(e.strings,t=new Ve(e)),t}S(e){Vs(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new vt(this.A(at()),this.A(at()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class mt{constructor(e,t,i,s,o){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=Ae(this,e,t,0),r=!qe(e)||e!==this._$AH&&e!==Ge,r&&(this._$AH=e);else{const c=e;let a,l;for(e=o[0],a=0;a<o.length-1;a++)l=Ae(this,c[i+a],t,a),l===Ge&&(l=this._$AH[a]),r||(r=!qe(l)||l!==this._$AH[a]),l===E?e=E:e!==E&&(e+=(l!=null?l:"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.C(e)}C(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Jo extends mt{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===E?void 0:e}}const Yo=ye?ye.emptyScript:"";class Xo extends mt{constructor(){super(...arguments),this.type=4}C(e){e&&e!==E?this.element.setAttribute(this.name,Yo):this.element.removeAttribute(this.name)}}class Qo extends mt{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=Ae(this,e,t,0))!==null&&i!==void 0?i:E)===Ge)return;const s=this._$AH,o=e===E&&s!==E||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==E&&(s===E||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class er{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ae(this,e)}}const fs=window.litHtmlPolyfillSupport;fs==null||fs(Ve,vt),((jt=globalThis.litHtmlVersions)!==null&&jt!==void 0?jt:globalThis.litHtmlVersions=[]).push("2.2.1");var tr=ai`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title id="linkTitleID">Get more information</title>
  <desc id="linkDescID">Informative icon</desc>
    <path d="m0 0h100v100h-100z" fill="#000"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" class="fill-color" fill-rule="nonzero"/>
</svg>
`;class ir extends V{static get styles(){return F`
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
    `}render(){return tr}}customElements.define("ia-icon-info",ir);class sr extends x{static get properties(){return{iconClass:{type:String}}}constructor(){super(),this.iconClass="",this.helpURL="https://help.archive.org/help/borrowing-from-the-lending-library"}render(){return m`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `}get getInfoIcon(){return on`${qo(this.icon)}`}static get styles(){return g`
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
    `}}window.customElements.define("info-icon",sr);class nr extends x{static get properties(){return{secondsLeftOnLoan:{type:Number},displayTime:{type:Boolean}}}constructor(){super(),this.secondsLeftOnLoan=0,this.displayTime=!1}get minutesLeftOnLoan(){let e=Math.round(this.secondsLeftOnLoan);return e=Math.ceil(e/60),e<10?e=`0:0${e}`:e===60?e="1:00":e=`0:${e}`,e}get remainingTime(){const e="minute",t=this.minutesLeftOnLoan;return t!==1?`${t} ${e}s`:`${t} ${e}`}render(){const e=this.displayTime?"view":"hide";return m`
      <button
        id="timer-counter"
        class=${e}
        @click=${()=>{this.displayTime=!this.displayTime}}
        role="timer"
      >
        <span>${this.minutesLeftOnLoan} - </span>
        <span class="second">${Number(this.secondsLeftOnLoan)}</span>
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
    `}}window.customElements.define("timer-countdown",nr);window.IALendingIntervals={tokenPoller:0,timerCountdown:0,browseExpireTimeout:0,clearTokenPoller:()=>{window.clearInterval(window.IALendingIntervals.tokenPoller),window.IALendingIntervals.tokenPoller=0},clearTimerCountdown:()=>{window.clearInterval(window.IALendingIntervals.timerCountdown),window.IALendingIntervals.timerCountdown=0},clearBrowseExpireTimeout:()=>{window.clearTimeout(window.IALendingIntervals.browseExpireTimeout),window.IALendingIntervals.browseExpireTimeout=0},clearAll:()=>{var n,e,t;(n=window==null?void 0:window.IALendingIntervals)==null||n.clearTokenPoller(),(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTimerCountdown(),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearBrowseExpireTimeout()}};class or{constructor(e,t,i={},s){this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=s,this.printDisabilityLink="/details/printdisabled?tab=about",this.analyticsCategories=Z,this.analyticsActions=re}firstBrowseConfig(){return{id:"browseBook",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.browse}}}browseAgainConfig(){return{id:"browseBookAgain",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.browse,action:this.analyticsActions.browseAgain}}}returnBookConfig(){const e=this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.borrow;return{id:"returnNow",text:"Return now",className:"danger",analyticsEvent:{category:e,action:this.analyticsActions.doneBorrowing},borrowType:this.lendingStatus.user_has_browsed?"browse":"borrow"}}borrowBookConfig(e=!1){return!this.lendingStatus.available_to_borrow&&!this.lendingStatus.user_is_printdisabled||this.lendingStatus.user_has_borrowed?null:{id:"borrowBook",text:"Borrow for 14 days",className:"primary",disabled:e,analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.preview,action:this.analyticsActions.borrow}}}loginAndBorrowBookConfig(){return{id:"loginAndBorrow",text:"Log In and Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}leaveWaitlistConfig(){return{id:"leaveWaitlist",text:"Leave Waitlist",className:"dark",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistLeave}}}loginAndWaitlistConfig(){return{id:"loginAndWaitlist",text:"Log In and Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}waitlistConfig(){const e=!!this.userid,t=this.lendingStatus||{};return!t.available_to_waitlist||t.available_to_borrow?null:e?{id:"joinWaitlist",text:"Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistJoin}}:this.loginAndWaitlistConfig()}purchaseConfig(){return this.bwbPurchaseUrl?{id:"purchaseBook",text:"Purchase at ",subText:"Better World Books",title:"Purchase",url:this.bwbPurchaseUrl,target:"_blank",className:"purchase dark",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.purchase}}:null}printDisabilityConfig(){return this.lendingStatus.user_is_printdisabled?null:{id:"printDisability",text:"Print Disability Access",title:"Print Disability Access",url:this.printDisabilityLink,target:"_self",className:"print-disability",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.printDisability}}}adminAccessConfig(){return this.lendingStatus.user_has_borrowed||!this.lendingStatus.isAdmin?null:{id:"adminAccess",text:"Admin Access",title:"You have administrative privileges to read this book",className:"danger",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.borrow}}}adminOrPrintDisabledExitConfig(){const t=`\u2190 Exit ${L.getQueryParam("admin")==="1"?"admin":"print-disabled"} access mode`;return{id:"exitAdminAccess",text:t,url:L.getBackHref(),target:"_self",className:"exit-admin",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.doneBorrowing}}}unavailableBookConfig(){return{id:"borrowUnavailable",text:"Borrow Unavailable",className:"primary unavailable",disabled:!0,analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.unavailable}}}isEmbed(e){return{primaryTitle:`<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${e}</a>`,primaryActions:[],primaryColor:""}}}const S={available_1hr:"Renews automatically with continued use.",available_14d:"This book can be borrowed for 14 days.",available_pd:"Book available to patrons with print disabilities.",available_waitlist:"A waitlist is available.",admin_access:"You have administrative privileges to read this book.",claim_waitlist:"You are at the top of the waitlist for this book.",being_borrowed:"Another patron is using this book. Please check back later.",eligible_pd:"You are eligible for print-disabled access.",on_waitlist:"You are on the waitlist for this book.",session_expired:"Renews automatically with continued use.",unavailable:"This book is not available at this time."};class rr{constructor(e,t,i,s){this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=s,this.analyticsCategories=Z,this.analyticsActions=re,this.actionsConfig=new or(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl)}onlyAdminAction(){return{primaryTitle:S.admin_access,primaryActions:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}adminOrPrintDisabledReadingAction(){return{primaryTitle:"",primaryActions:[],secondaryActions:[this.actionsConfig.adminOrPrintDisabledExitConfig()],borrowType:"adminBorrowed"}}patronIsReadingAction(){const e=this.lendingStatus||{},t=e.loanCount>=e.maxLoans;let i="",s=e.user_has_browsed&&!e.browsingExpired;return s?i=S.available_1hr:i=`Your loan of this book has ${e.daysLeftOnLoan} days left.`,{primaryTitle:i,primaryActions:[this.actionsConfig.returnBookConfig(),this.actionsConfig.borrowBookConfig(t),this.actionsConfig.waitlistConfig(),this.actionsConfig.printDisabilityConfig()],primaryColor:"danger",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()],borrowType:s?"browsed":"borrowed"}}claimWaitlistAction(){const e=this.lendingStatus||{},t=this.actionsConfig.leaveWaitlistConfig(),i=this.actionsConfig.borrowBookConfig(),s=e.available_to_browse?this.actionsConfig.firstBrowseConfig():null;let o=[i];return s&&o.push(s),o.push(t),{primaryTitle:S.claim_waitlist,primaryActions:o,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowPrintDisabledAction(){return{primaryTitle:S.eligible_pd,primaryActions:[this.actionsConfig.borrowBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}onlyPrintDisabledAction(){const e=this.lendingStatus.isAdmin?[]:this.actionsConfig.unavailableBookConfig();return{primaryTitle:S.available_pd,primaryActions:[e],primaryColor:"primary",secondaryActions:[]}}onWaitlistAction(){return{primaryTitle:S.on_waitlist,primaryActions:[this.actionsConfig.leaveWaitlistConfig(),this.actionsConfig.firstBrowseConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}restrictedAction(){const e=this.lendingStatus||{};return{primaryTitle:e.max_browsable_copies&&!e.available_lendable_copies?S.being_borrowed:S.unavailable,primaryActions:[this.actionsConfig.unavailableBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}loggedOutOptions(){const e=this.lendingStatus||{},t=!e.available_to_waitlist&&!e.available_to_borrow,i=this.actionsConfig.waitlistConfig();let s=null;e.available_to_borrow||e.available_to_browse?s=this.actionsConfig.loginAndBorrowBookConfig():t&&(s=this.actionsConfig.unavailableBookConfig());const o=this.actionsConfig.printDisabilityConfig(),r=[s,i,o].filter(a=>a!==null);return{primaryTitle:e.available_to_browse?S.available_1hr:e.available_to_borrow?S.available_14d:S.unavailable,primaryActions:r,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrow1HrAction(){const e=this.lendingStatus||{},t=!e.available_to_browse&&e.browsingExpired,i=e.available_to_browse||t,s=i&&e.available_to_borrow,o=i&&!e.available_to_borrow&&e.available_to_waitlist,r=i&&!e.available_to_borrow&&!e.available_to_waitlist,c=e.available_browsable_copies<1&&e.available_browsable_copies<e.max_browsable_copies,a=t?S.session_expired:!i&&c?S.being_borrowed:!i&&e.available_to_waitlist?S.available_waitlist:S.available_1hr,l=t?this.actionsConfig.browseAgainConfig():this.actionsConfig.firstBrowseConfig(),u=this.actionsConfig.borrowBookConfig(),d=this.actionsConfig.waitlistConfig(),h=this.actionsConfig.printDisabilityConfig();return{primaryTitle:a,primaryActions:r?[l,h]:s?[l,u,h]:o?[l,d,h]:[],primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowAction(){const e=this.lendingStatus||{};if(!!!this.userid)return this.loggedOutOptions();if(e.available_to_browse||e.browsingExpired)return this.borrow1HrAction();let i=null;const s=this.actionsConfig.waitlistConfig(),o=this.actionsConfig.printDisabilityConfig(),r=e.loanCount>=e.maxLoans;!e.available_to_borrow&&!s?i=this.actionsConfig.unavailableBookConfig():e.available_to_borrow&&(i=this.actionsConfig.borrowBookConfig(r));const a=[i,s,o].filter(function(l){return l!==null});return{primaryTitle:s?S.being_borrowed:"",primaryActions:a,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}getBrowseCountdownTitle(){const e=this.lendingStatus.secondsLeftOnLoan;var t=new Date(+new Date+e*1e3),i=t.getHours()%12,s=(""+t.getMinutes()).replace(/^(\d{1})$/,"0$1"),o=t.getHours()>11?" PM":" AM";return i===0&&(i=12),"Borrow ends at "+i+":"+s+o}getCurrentLendingActions(){let e;const t=this.lendingStatus||{},i=L.getQueryParam("admin")=="1"&&t.isAdmin,s=L.getQueryParam("access")=="1"&&t.user_is_printdisabled,o=t.user_has_borrowed||t.user_has_browsed&&!t.browsingExpired,r=!t.user_has_borrowed&&!t.user_has_browsed,c=!t.available_to_borrow&&!t.available_to_browse,a=t.is_printdisabled&&t.user_is_printdisabled,l=(t.available_to_browse||t.available_to_borrow)&&r&&!t.user_on_waitlist;return i||s?e=this.adminOrPrintDisabledReadingAction():t.isAdmin&&r&&c?e=this.onlyAdminAction():o?e=this.patronIsReadingAction():t.user_can_claim_waitlist?e=this.claimWaitlistAction():a?e=this.borrowPrintDisabledAction():l||t.browsingExpired?e=this.borrowAction():t.isPrintDisabledOnly?e=this.onlyPrintDisabledAction():t.user_on_waitlist?e=this.onWaitlistAction():e=this.restrictedAction(),e}}class ar{constructor(e,t,i,s,o){this.identifier=e,this.borrowType=t,this.successCallback=i,this.errorCallback=s,this.pollerDelay=o,this.loanTokenInterval=void 0,this.loanAnalytics=new Fs,this.bookAccessed()}disconnectedCallback(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTokenPoller()}async bookAccessed(){var e;this.borrowType?(this.handleLoanTokenPoller(!0),this.borrowType!=="adminBorrowed"&&(window.IALendingIntervals.tokenPoller=setInterval(()=>{this.handleLoanTokenPoller()},this.pollerDelay*1e3))):((e=window==null?void 0:window.Sentry)==null||e.captureMessage(`${T.bookAccessed} - not borrowed`),this.disconnectedCallback())}async handleLoanTokenPoller(e=!1){const t="create_token";j({identifier:this.identifier,action:t,error:i=>{var s,o;this.errorCallback({detail:{action:t,data:i}}),(s=window==null?void 0:window.Sentry)==null||s.captureMessage(`${T.handleLoanTokenPoller} - Error: ${JSON.stringify(i)}`),(o=this.loanAnalytics)==null||o.sendEvent("LendingServiceLoanError",t,this.identifier)},success:()=>{e&&this.successCallback()}})}}class lr{constructor(e,t,i,s){this.hasPageChanged=e,this.identifier=t,this.localCache=i,this.loanRenewTimeConfig=s,this.loanRenewMessage="This book has been renewed for #time #unitsOfTime.",this.loanReturnWarning="With no action, this book will be auto-returned in #time #unitsOfTime.",this.result={texts:null,renewNow:!1,renewType:""}}handleLoanRenew(){try{return this.hasPageChanged?this.pageChanged():this.autoChecker()}catch(e){y(e)}return $}async pageChanged(){const{loanRenewAtLast:e}=this.loanRenewTimeConfig,t=new Date,i=await this.localCache.get(`${this.identifier}-loanTime`),s=this.changeTime(i,e,"sub");return s!==null&&t>=s&&(this.result={texts:this.loanRenewMessage,renewNow:!0,renewType:"auto"}),this.setPageChangedTime(),this.result}async autoChecker(){const{pageChangedInLast:e}=this.loanRenewTimeConfig,t=await this.localCache.get(`${this.identifier}-pageChangedTime`),i=this.changeTime(new Date,e,"sub");return t===void 0||t<=i?this.result={texts:this.loanReturnWarning,renewNow:!1,renewType:""}:t>=i&&(this.result={texts:"",renewNow:!0,renewType:"auto"}),this.result}async setPageChangedTime(){await this.localCache.set({key:`${this.identifier}-pageChangedTime`,value:new Date,ttl:Number(this.loanRenewTimeConfig.loanTotalTime)})}getMessageTexts(e,t){let i="minute",s=e,o=t;return o=Math.ceil(o/60),o>59&&(o=1,i="hour"),s=s==null?void 0:s.replace(/#time/,o),s==null?void 0:s.replace(/#unitsOfTime/,o!==1?`${i}s`:i)}changeTime(e,t,i){return e===void 0?null:i==="sub"?new Date(e.getTime()-t*1e3):new Date(e.getTime()+t*1e3)}}const cr={browseExpired:"IABookReader:BrowsingHasExpired"},k={iaButton:"min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;",renew:"background:#194880;width:110px;",return:"background:#d9534f;width:120px;",loaderIcon:"display:inline-block;width:20px;height:20px;margin-top:2px;color:white;--activityIndicatorLoadingRingColor:#fff;--activityIndicatorLoadingDotColor:#fff;",refresh:"background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"};class dr extends x{static get properties(){return{userid:{type:String},identifier:{type:String},bookTitle:{type:String},lendingStatus:{type:Object},returnUrl:{type:String},width:{type:Number},bwbPurchaseUrl:{type:String},lendingBarPostInit:{type:Function,attribute:!1},barType:{type:String},sharedObserver:{attribute:!1},disableActionGroup:{type:Boolean},modal:{Object},tokenDelay:{type:Number},timerExecutionSeconds:{type:Number},localCache:{type:Object},loanRenewTimeConfig:{type:Object},loanRenewResult:{type:Object}}}constructor(){super(),this.userid="",this.identifier="",this.bookTitle="",this.returnUrl="",this.lendingStatus={},this.width=0,this.bwbPurchaseUrl="",this.lendingBarPostInit=()=>{},this.barType="action",this.sharedObserver=void 0,this.disableActionGroup=!1,this.tokenDelay=120,this.timerExecutionSeconds=30,this.postInitComplete=!1,this.primaryActions=[],this.primaryTitle="",this.primaryColor="primary",this.secondaryActions=[],this.lendingOptions={},this.borrowType=null,this.browseTimer=void 0,this.timeWhenTimerStart=void 0,this.returnNow=!1,this.loanRenewTimeConfig={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900},this.loanRenewResult={texts:"",renewNow:!1,secondsLeft:0,renewType:""}}disconnectedCallback(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearAll(),this.sentryCaptureMsg(T.disconnectedCallback),this.disconnectResizeObserver()}sentryCaptureMsg(e){var t;y(window==null?void 0:window.Sentry),(t=window==null?void 0:window.Sentry)==null||t.captureMessage(e)}firstUpdated(){this.bindLoanRenewEvents(),this.localCache=new Ds({namespace:"loanRenew"}),this.sharedObserver||(this.sharedObserver=new mn,this.setupResizeObserver())}updated(e){(e.has("lendingStatus")||e.has("bwbPurchaseUrl"))&&this.setupLendingToolbarActions(),e.has("sharedObserver")&&(this.disconnectResizeObserver(),this.setupResizeObserver()),e.has("loanRenewResult")&&this.loanRenewResult.renewNow&&window.IALendingIntervals.clearAll()}handleResize(e){const{target:t}=e;if(t!==this.shadowRoot.host)return;const{contentRect:i}=e;this.width=Math.round(i.width)}disconnectResizeObserver(){var e;(e=this.sharedObserver)==null||e.removeObserver({handler:this,target:this.shadowRoot.host})}setupResizeObserver(){var e;!this.shadowRoot||(e=this.sharedObserver)==null||e.addObserver({handler:this,target:this.shadowRoot.host})}async setupLendingToolbarActions(){var i,s,o,r;this.lendingOptions=new rr(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl);const e=this.lendingOptions.getCurrentLendingActions();if(!e)return;this.primaryTitle=e.primaryTitle,this.primaryActions=(i=e.primaryActions)==null?void 0:i.filter(c=>c!=null),this.primaryColor=e.primaryColor,this.secondaryActions=(s=e.secondaryActions)==null?void 0:s.filter(c=>c!=null),this.borrowType=e.borrowType?e.borrowType:null;const t="browsingExpired"in this.lendingStatus&&((o=this.lendingStatus)==null?void 0:o.browsingExpired);if(t){y("setupLendingToolbarActions > hasExpired --- "),this.tokenPoller||this.sentryCaptureMsg(T.bookWasExpired),(r=window==null?void 0:window.IALendingIntervals)==null||r.clearAll(),this.dispatchEvent(new Event(cr.browseExpired,{bubbles:!0,cancelable:!1,composed:!0}));return}if(this.borrowType==="browsed"&&(await this.startTimerCountdown(),await this.startBrowseTimer()),!this.borrowType||this.barType==="title"){this.lendingBarPostInit();return}setTimeout(()=>{!t&&!window.IALendingIntervals.tokenPoller&&this.startLoanTokenPoller()},100),this.requestUpdate()}bindLoanRenewEvents(){window.addEventListener("BookReader:userAction",()=>{y("IABookActions:BookReader:userAction"),this.borrowType==="browsed"&&this.autoLoanRenewChecker(!0)}),document.addEventListener("visibilitychange",async()=>{if(!document.hidden&&(y("visibilitychange event execute:------------------ ",new Date().getMinutes(),new Date().getSeconds(),this.borrowType),this.borrowType==="browsed"&&this.lendingStatus.browsingExpired===!1)){const e=await this.localCache.get(`${this.identifier}-loanTime`),t=Math.round((e-new Date)/1e3);t>=this.timerExecutionSeconds?this.loanStatusCheckInterval(Number(t)):(this.browseHasExpired(),this.disconnectedCallback())}})}async autoLoanRenewChecker(e=!1){this.loanRenewHelper=new lr(e,this.identifier,this.localCache,this.loanRenewTimeConfig),await this.loanRenewHelper.handleLoanRenew(),this.loanRenewResult=this.loanRenewHelper.result}get modal(){const e=document.body.querySelector("modal-manager");return e==null||e.setAttribute("id","action-bar-modal"),e}async showWarningModal(){var s,o,r;y("****** showWarningModal ******"),this.modal.customModalContent=$,(s=this.modal)==null||s.closeModal(),this.loanRenewResult={texts:"",renewNow:!1};let{secondsLeft:e}=this.loanRenewResult;e===void 0?e=this.lendingStatus.secondsLeftOnLoan:e=e>60?e:60;const t=new G({headline:"Are you still reading?",headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:(o=this.loanRenewHelper)==null?void 0:o.getMessageTexts(this.loanRenewResult.texts,e)}),i=m`<br />
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;justify-content:center;"
      >
        <button
          style="${k.iaButton} ${k.renew}"
          @click=${()=>this.patronWantsToRenewBook()}
        >
          Keep reading
        </button>
        <button
          style="${k.iaButton} ${k.return}"
          @click=${()=>this.patronWantsToReturnBook()}
        >
          Return the book
        </button>
      </div> `;this.modal.setAttribute("aria-live","assertive"),await((r=this.modal)==null?void 0:r.showModal({config:t,customModalContent:i}))}async showWarningDisabledModal(e="renewBook"){var o,r;let{secondsLeft:t}=this.loanRenewResult;t===void 0?t=this.lendingStatus.secondsLeftOnLoan:t=t>60?t:60;const i=new G({headline:"Are you still reading?",headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:(o=this.loanRenewHelper)==null?void 0:o.getMessageTexts(this.loanRenewResult.texts,t)}),s=m`<br />
      <div
        id="disabled-book-action-bar-custom-buttons"
        style="display:flex;justify-content:center; opacity:0.8; pointer-events:none;"
      >
        <button
          disabled
          style="${k.iaButton} ${k.renew}"
        >
          ${e==="renewBook"?m`<ia-activity-indicator
                mode="processing"
                style=${k.loaderIcon}
              ></ia-activity-indicator>`:"Keep reading"}
        </button>
        <span
          style="position: absolute; visibility: none; height: 1px; width: 1px; overflow: hidden;"
          >Renewing loan, one moment please.</span
        >
        <button
          disabled
          style="${k.iaButton} ${k.return}"
        >
          ${e==="returnBook"?m`<ia-activity-indicator
                mode="processing"
                style=${k.loaderIcon}
              ></ia-activity-indicator>`:"Return the book"}
        </button>
      </div> `;await((r=this.modal)==null?void 0:r.showModal({config:i,customModalContent:s}))}async patronWantsToRenewBook(){this.showWarningDisabledModal(),this.loanRenewResult={texts:"",renewNow:!0,renewType:"manual"}}async patronWantsToReturnBook(){this.showWarningDisabledModal("returnBook"),document.querySelector("ia-book-actions").disableActionGroup=!0,this.returnNow=!0}async showExpiredModal(){var i;const e=new G({headline:"",showCloseButton:!1,closeOnBackdropClick:!1,headerColor:"#194880",message:"This book has been returned due to inactivity."}),t=m`<br />
      <div style="text-align: center">
        <button
          style="${k.iaButton} ${k.renew}"
          @click=${()=>{L.goToUrl(this.returnUrl,!0)}}
        >
          Okay
        </button>
      </div> `;await((i=this.modal)==null?void 0:i.showModal({config:e,customModalContent:t}))}async browseHasExpired(){var t;y("BrowseHasExpired ---"),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearAll();const e={...this.lendingStatus,browsingExpired:!0,secondsLeftOnLoan:0};this.lendingStatus=e,await this.localCache.delete(`${this.identifier}-loanTime`),await this.localCache.delete(`${this.identifier}-pageChangedTime`),this.loanRenewResult.renewNow=!1,this.loanRenewResult.texts="This book has been returned due to inactivity.",await this.showExpiredModal(),this.sentryCaptureMsg(T.browseHasExpired)}async startBrowseTimer(){var s;(s=window==null?void 0:window.IALendingIntervals)==null||s.clearBrowseExpireTimeout();const{browsingExpired:e,user_has_browsed:t,secondsLeftOnLoan:i}=this.lendingStatus;if(!t||e){y("startBrowseTimer --- !user_has_browsed || browsingExpired",{user_has_browsed:t,browsingExpired:e,secondsLeftOnLoan:i});return}window.IALendingIntervals.browseExpireTimeout=setTimeout(()=>{y("startBrowseTimer > browseExpireTimeout --- will expire loan",i),this.browseHasExpired()},i*1e3)}render(){return this.barType==="title"?m`<section class="lending-wrapper">
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
        .loanRenewType=${this.loanRenewResult.renewType}
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
    `}async handleLoanAutoRenewed({detail:e}){var s,o,r;const t=(s=e==null?void 0:e.data)==null?void 0:s.loan,i=`Whoops, seems we hit a hiccup with renewing this book. Please refresh & retry. --- (Debug: ${(o=e==null?void 0:e.data)==null?void 0:o.error})`;if(!t){this.showErrorModal(i,"handleLoanAutoRenewed");return}if(this.loanRenewResult.renewNow){const c=await this.localCache.get(`${this.identifier}-loanTime`),a=Math.round((c-new Date)/1e3);y(c,a),y("IABookActions: handleLoanAutoRenewed --- ",{ajaxResponse:e==null?void 0:e.data,loanRenewResult:this.loanRenewResult,secondsLeftOnLoan:a});const l={...this.lendingStatus,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:a};this.lendingStatus=l,(r=this.modal)==null||r.closeModal(),this.modal.removeAttribute("id"),this.modal.customModalContent=$,this.sentryCaptureMsg(T.bookHasRenewed)}}async startTimerCountdown(){var t;(t=window==null?void 0:window.IALendingIntervals)==null||t.clearTimerCountdown();const e=Number(this.lendingStatus.secondsLeftOnLoan);this.timeWhenTimerStart=new Date,window.IALendingIntervals.timerCountdown=setInterval(async()=>{await this.loanStatusCheckInterval(e)},this.timerExecutionSeconds*1e3)}async loanStatusCheckInterval(e){let t=e;t-=this.timerExecutionSeconds,t=Math.round(t);const i=await this.reSyncTimerIfGoneOff(t);i.hasSynced&&(t=i.whatShouldLeft,y("startTimerCountdown --- stale, timer has resyncd",{secondsLeft:t})),y("startTimerCountdown --- countdown still valid. continue...",{resyncd:i,secondsLeft:t,loanRenewAtLast:this.loanRenewTimeConfig.loanRenewAtLast},"time: ",new Date().getMinutes(),":",new Date().getSeconds(),", timerDelay: ",this.timerExecutionSeconds),t<=this.loanRenewTimeConfig.loanRenewAtLast&&await this.loanRenewAttempt(t),t<=this.timerExecutionSeconds&&(this.disconnectedCallback(),this.sentryCaptureMsg(T.clearOneHourTimer))}async reSyncTimerIfGoneOff(e){const t=new Date,i=t.getTime()/1e3-this.timeWhenTimerStart.getTime()/1e3,s=this.lendingStatus.secondsLeftOnLoan-i;y("currentTime: ",t),y("timeWhenTimerStart: ",this.timeWhenTimerStart),y("diffInSeconds: ",i),y("secondsShouldLeft: ",s),y("this.lendingStatus.secondsLeftOnLoan: ",this.lendingStatus.secondsLeftOnLoan);const o=Math.round(e),r=Math.round(s),c=this.timerCountdownEl.secondsLeftOnLoan||0;if(y("reSyncTimerIfGoneOff?",{whatIsleft:o,whatShouldLeft:r,timerElSeconds:c,timeLeftInMin:Math.ceil(e/60)}),c!==r||o!==r){const a={...this.lendingStatus,secondsLeftOnLoan:r};this.lendingStatus=a}return o!==r?(y("reSyncTimerIfGoneOff --- let's re-sync."),{hasSynced:!0,whatShouldLeft:r}):{hasSynced:!1,whatShouldLeft:r}}async loanRenewAttempt(e){y("loanRenewAttempt ---",{secondsLeft:e,loanRenewResult:this.loanRenewResult});let t=e;if(t<50){y("loanRenewAttempt --- loanSecondsLeft < 50, will expire"),await this.browseHasExpired();return}await this.autoLoanRenewChecker(!1),this.loanRenewResult.renewNow===!1&&(t-=60,this.loanRenewResult.secondsLeft=t,this.showWarningModal())}startLoanTokenPoller(){const e=()=>{this.postInitComplete||this.lendingBarPostInit(),this.postInitComplete=!0},t=i=>{this.handleLendingActionError(i)};this.tokenPoller=new ar(this.identifier,this.borrowType,e,t,this.tokenDelay)}handleToggleActionGroup(){this.disableActionGroup=!this.disableActionGroup}handleLendingActionError(e){var s,o,r,c;this.disableActionGroup=!1,(s=window==null?void 0:window.IALendingIntervals)==null||s.clearAll();const t=(o=e==null?void 0:e.detail)==null?void 0:o.action,i=(c=(r=e==null?void 0:e.detail)==null?void 0:r.data)==null?void 0:c.error;if(i&&t!=="create_token"&&this.showErrorModal(i,t),t==="create_token"){const a={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0};this.lendingStatus=a}if(i&&i.match(/not available to borrow/gm)){let a=this.lendingStatus;t==="browse_book"?a={...this.lendingStatus,available_to_browse:!1}:t==="borrow_book"&&(a={...this.lendingStatus,available_to_borrow:!1}),this.lendingStatus=a}}async showErrorModal(e,t){var s;const i=new G({title:"Lending error",message:e,headerColor:"#d9534f",showCloseButton:!0});if(t==="create_token"){const o=m`<button
        style="${k.refresh}"
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
        <code>errorLog: ${e}</code>`}await((s=this.modal)==null?void 0:s.showModal({config:i}))}get iconClass(){return this.width<=ls?"mobile":"desktop"}get textClass(){return this.width>=ls?"visible":"hidden"}get infoIconTemplate(){return m`<info-icon iconClass=${this.iconClass}></info-icon>`}get textGroupTemplate(){return this.primaryTitle?m`<text-group
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
    `}}window.customElements.define("ia-book-actions",dr);const wt={active_borrows:0,active_browses:0,available_borrowable_copies:0,available_browsable_copies:1,available_lendable_copies:1,available_to_borrow:!1,available_to_browse:!1,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!1,is_readable:!1,last_borrow:null,last_browse:null,last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:null,orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:0,user_loan_record:[],user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",browsingExpired:!1,daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!0,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:0,loanRecord:[],loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:10,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!1,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},hr={active_borrows:0,active_browses:1,available_borrowable_copies:0,available_browsable_copies:0,available_lendable_copies:0,available_to_borrow:!0,available_to_browse:!0,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!0,is_readable:!1,last_borrow:null,last_browse:"2021-07-30 09:57:40",last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:"2021-07-30 10:57:40",orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:1,user_loan_record:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!1,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:1,loanId:"1ca15f92d07dfdae3f7b1516084aec5d603800b8",loanRecord:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},loanStartDate:"2021-07-30 09:57:40",loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:0,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!0,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},Xt=new Ds({namespace:"loanRenew",defaultTTL:1*60}),ur="@neeraj-archive",Qt="naturalhistoryof00unse_4111";let Ft="https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863";const Zs=new G;Zs.headerColor="#d9534f";let pr=function(){setTimeout(function(){},100)},f=document.querySelector("ia-book-actions");f.userid=ur;f.identifier=Qt;f.bookTitle="Contemporary Black biography. Volume 39 : profiles from the interContemporary Black biography. Volume 39";f.lendingStatus=hr;f.bwbPurchaseUrl="";f.modalConfig=Zs;f.lendingBarPostInit=pr;f.tokenDelay=2;f.timerExecutionSeconds=2;f.returnUrl="";f.localCache=Xt;let Js={loanTotalTime:60,loanRenewAtLast:55,pageChangedInLast:5},gr={loanTotalTime:300,loanRenewAtLast:240,pageChangedInLast:60},fr={loanTotalTime:600,loanRenewAtLast:480,pageChangedInLast:120},vr={loanTotalTime:1800,loanRenewAtLast:1500,pageChangedInLast:600},mr={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900};f.loanRenewTimeConfig=Js;let wr=new URLSearchParams(document.location.search);switch(wr.get("timer")){case"5":f.loanRenewTimeConfig=gr;break;case"10":f.loanRenewTimeConfig=fr;break;case"30":f.loanRenewTimeConfig=vr;break;case"60":f.loanRenewTimeConfig=mr;break;default:f.loanRenewTimeConfig=Js;break}let v=f.lendingStatus,br=f.loanRenewTimeConfig.loanTotalTime;document.querySelectorAll(".titleBar input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?f.barType="title":f.barType="action"})});document.querySelectorAll(".searchParam input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("q","test")):(i="",t.delete("q")),history.pushState){var s=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:s},"",s)}})});document.querySelectorAll(".errorEnable input[type=checkbox]").forEach(n=>{window.location.href.indexOf("?error=true")!==-1&&(n.checked=!0),n.addEventListener("click",e=>{var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("error",!0)):(i="",t.delete("error")),history.pushState){var s=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:s},"",s)}})});document.querySelectorAll(".userState input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?(e.target.value==="isAdmin"&&(v.isAdmin=!0),e.target.value==="isLoggedIn"&&(f.userid="@neeraj")):(e.target.value==="isAdmin"&&(v.isAdmin=!1),e.target.value==="isLoggedIn"&&(f.userid=""));let t={...wt,...v};f.lendingStatus=t})});document.querySelectorAll(".printDisabled input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?(e.target.value==="is_printdisabled"&&(v.is_printdisabled=!0),e.target.value==="user_is_printdisabled"&&(v.user_is_printdisabled=!0)):(e.target.value==="is_printdisabled"&&(v.is_printdisabled=!1),e.target.value==="user_is_printdisabled"&&(v.user_is_printdisabled=!1));let t={...wt,...v};f.lendingStatus=t})});document.querySelectorAll(".availableToBrowse input[type=radio]").forEach(n=>{n.addEventListener("click",async e=>{if(e.target.value==="user_has_browsed"){v.user_has_browsed=!0,v.available_to_browse=!1,v.secondsLeftOnLoan=br,v.browsingExpired=!1;const t=new Date(new Date().getTime()+f.loanRenewTimeConfig.loanTotalTime*1e3);try{await Xt.set({key:`${Qt}-loanTime`,value:t,ttl:Number(f.loanRenewTimeConfig.loanTotalTime)}),await Xt.delete(`${Qt}-pageChangedTime`)}catch{}}else e.target.value==="browsingExpired"?(v.user_has_browsed=!0,v.available_to_browse=!1,v.secondsLeftOnLoan=0,v.browsingExpired=!0):e.target.value==="available_to_browse"&&(v.available_to_browse=!0,v.user_has_browsed=!1);setTimeout(()=>{let t={...wt,...v};f.lendingStatus=t},10)})});document.querySelector("#show_warning_modal").addEventListener("click",async()=>{if(!f.lendingStatus.user_has_browsed){const n={...f.lendingStatus,user_has_browsed:!0};f.lendingStatus=n,await f.updateComplete}f.showWarningModal(),f.lendingStatus.user_has_browsed&&f.showWarningModal()});document.querySelector("#show_expired_modal").addEventListener("click",async()=>{if(!f.lendingStatus.user_has_browsed){const n={...f.lendingStatus,user_has_browsed:!0};f.lendingStatus=n,await f.updateComplete}await new Promise(n=>setTimeout(n,5e3)),f.browseHasExpired()});document.querySelector("#resync_timer").addEventListener("click",async n=>{f.lendingStatus.user_has_browsed&&document.querySelector("ia-book-actions").dispatchEvent(new Event("visibilitychange",{detail:{},bubbles:!0,composed:!0})),await new Promise(e=>setTimeout(e,5e3))});document.querySelectorAll(".availableToBorrow input[type=radio]").forEach(n=>{n.addEventListener("click",e=>{e.target.value==="available_to_borrow"?(v.available_to_borrow=!0,v.user_on_waitlist=!1,v.available_to_waitlist=!1,v.user_has_borrowed=!1):e.target.value==="user_can_claim_waitlist"?(v.available_to_borrow=!0,v.user_on_waitlist=!0,v.user_can_claim_waitlist=!0,v.user_has_borrowed=!1,v.available_to_waitlist=!1):e.target.value==="user_on_waitlist"?(v.available_to_borrow=!1,v.user_on_waitlist=!0,v.available_to_waitlist=!1,v.user_has_borrowed=!1):e.target.value==="available_to_waitlist"?(v.available_to_borrow=!1,v.user_on_waitlist=!1,v.available_to_waitlist=!0,v.user_has_borrowed=!1):e.target.value==="user_has_borrowed"&&(v.available_to_borrow=!1,v.user_on_waitlist=!1,v.available_to_waitlist=!1,v.user_has_borrowed=!0);let t={...wt,...v};f.lendingStatus=t})});document.querySelectorAll(".purchase input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?Ft="https://www.google.com":Ft="",f.bwbPurchaseUrl=Ft})});document.querySelector(".pageChangedEvent").addEventListener("click",()=>{document.querySelector("ia-book-actions").dispatchEvent(new CustomEvent("BookReader:userAction",{detail:{},bubbles:!0,composed:!0}))});window.addEventListener("IABookReader:BrowsingHasExpired",()=>{console.log("IABookReader:BrowsingHasExpired EVENT FIRED")});
