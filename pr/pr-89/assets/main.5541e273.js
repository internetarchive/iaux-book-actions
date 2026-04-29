const Bs=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};Bs();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const He=globalThis,Ut=He.ShadowRoot&&(He.ShadyCSS===void 0||He.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,es=Symbol(),Kt=new WeakMap;class Ps{constructor(e,t,i){if(this._$cssResult$=!0,i!==es)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ut&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Kt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Kt.set(t,e))}return e}toString(){return this.cssText}}const Os=n=>new Ps(typeof n=="string"?n:n+"",void 0,es),Us=(n,e)=>{if(Ut)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=He.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},Zt=Ut?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Os(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ms,defineProperty:Is,getOwnPropertyDescriptor:Ns,getOwnPropertyNames:Hs,getOwnPropertySymbols:Ds,getPrototypeOf:zs}=Object,O=globalThis,Jt=O.trustedTypes,Ws=Jt?Jt.emptyScript:"",et=O.reactiveElementPolyfillSupport,ye=(n,e)=>n,je={toAttribute(n,e){switch(e){case Boolean:n=n?Ws:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Mt=(n,e)=>!Ms(n,e),Yt={attribute:!0,type:String,converter:je,reflect:!1,useDefault:!1,hasChanged:Mt};var qi,Gi;(qi=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(Gi=O.litPropertyMetadata)!=null||(O.litPropertyMetadata=new WeakMap);class pe extends HTMLElement{static addInitializer(e){var t;this._$Ei(),((t=this.l)!=null?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Yt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Is(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){var r;const{get:s,set:o}=(r=Ns(this.prototype,e))!=null?r:{get(){return this[t]},set(l){this[t]=l}};return{get:s,set(l){const a=s==null?void 0:s.call(this);o==null||o.call(this,l),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return(t=this.elementProperties.get(e))!=null?t:Yt}static _$Ei(){if(this.hasOwnProperty(ye("elementProperties")))return;const e=zs(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ye("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ye("properties"))){const t=this.properties,i=[...Hs(t),...Ds(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Zt(s))}else e!==void 0&&t.push(Zt(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$EO)!=null?t:this._$EO=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var t;const e=(t=this.shadowRoot)!=null?t:this.attachShadow(this.constructor.shadowRootOptions);return Us(e,this.constructor.elementStyles),e}connectedCallback(){var e,t;(e=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostConnected)==null?void 0:s.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:je).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){var o,r,l;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:je;this._$Em=s;const d=c.fromAttribute(t,a.type);this[s]=(l=d!=null?d:(r=this._$Ej)==null?void 0:r.get(s))!=null?l:d,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){var r,l;if(e!==void 0){const a=this.constructor;if(s===!1&&(o=this[e]),i!=null||(i=a.getPropertyOptions(e)),!(((r=i.hasChanged)!=null?r:Mt)(o,t)||i.useDefault&&i.reflect&&o===((l=this._$Ej)==null?void 0:l.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},r){var l,a,c;i&&!((l=this._$Ej)!=null?l:this._$Ej=new Map).has(e)&&(this._$Ej.set(e,(a=r!=null?r:t)!=null?a:this[e]),o!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&((c=this._$Eq)!=null?c:this._$Eq=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i,s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((i=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,l]of this._$Ep)this[r]=l;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,l]of o){const{wrapped:a}=l,c=this[r];a!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,l,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}var Vi;pe.elementStyles=[],pe.shadowRootOptions={mode:"open"},pe[ye("elementProperties")]=new Map,pe[ye("finalized")]=new Map,et==null||et({ReactiveElement:pe}),((Vi=O.reactiveElementVersions)!=null?Vi:O.reactiveElementVersions=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $e=globalThis,Xt=n=>n,Fe=$e.trustedTypes,Qt=Fe?Fe.createPolicy("lit-html",{createHTML:n=>n}):void 0,ts="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,is="?"+x,js=`<${is}>`,V=document,Ee=()=>V.createComment(""),Se=n=>n===null||typeof n!="object"&&typeof n!="function",It=Array.isArray,Fs=n=>It(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",tt=`[ 	
\f\r]`,ge=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ei=/-->/g,ti=/>/g,N=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ii=/'/g,si=/"/g,ss=/^(?:script|style|textarea|title)$/i,ns=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),w=ns(1),qs=ns(2),M=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ni=new WeakMap,W=V.createTreeWalker(V,129);function os(n,e){if(!It(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qt!==void 0?Qt.createHTML(e):e}const Gs=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":e===3?"<math>":"",r=ge;for(let l=0;l<t;l++){const a=n[l];let c,d,h=-1,u=0;for(;u<a.length&&(r.lastIndex=u,d=r.exec(a),d!==null);)u=r.lastIndex,r===ge?d[1]==="!--"?r=ei:d[1]!==void 0?r=ti:d[2]!==void 0?(ss.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=N):d[3]!==void 0&&(r=N):r===N?d[0]===">"?(r=s!=null?s:ge,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?N:d[3]==='"'?si:ii):r===si||r===ii?r=N:r===ei||r===ti?r=ge:(r=N,s=void 0);const g=r===N&&n[l+1].startsWith("/>")?" ":"";o+=r===ge?a+js:h>=0?(i.push(c),a.slice(0,h)+ts+a.slice(h)+x+g):a+x+(h===-2?l:g)}return[os(n,o+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Le{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const l=e.length-1,a=this.parts,[c,d]=Gs(e,t);if(this.el=Le.createElement(c,i),W.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=W.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(ts)){const u=d[r++],g=s.getAttribute(h).split(x),y=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:y[2],strings:g,ctor:y[1]==="."?Ks:y[1]==="?"?Zs:y[1]==="@"?Js:Ve}),s.removeAttribute(h)}else h.startsWith(x)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(ss.test(s.tagName)){const h=s.textContent.split(x),u=h.length-1;if(u>0){s.textContent=Fe?Fe.emptyScript:"";for(let g=0;g<u;g++)s.append(h[g],Ee()),W.nextNode(),a.push({type:2,index:++o});s.append(h[u],Ee())}}}else if(s.nodeType===8)if(s.data===is)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(x,h+1))!==-1;)a.push({type:7,index:o}),h+=x.length-1}o++}}static createElement(e,t){const i=V.createElement("template");return i.innerHTML=e,i}}function se(n,e,t=n,i){var r,l,a;if(e===M)return e;let s=i!==void 0?(r=t._$Co)==null?void 0:r[i]:t._$Cl;const o=Se(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,t,i)),i!==void 0?((a=t._$Co)!=null?a:t._$Co=[])[i]=s:t._$Cl=s),s!==void 0&&(e=se(n,s._$AS(n,e.values),s,i)),e}class Vs{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var c;const{el:{content:t},parts:i}=this._$AD,s=((c=e==null?void 0:e.creationScope)!=null?c:V).importNode(t,!0);W.currentNode=s;let o=W.nextNode(),r=0,l=0,a=i[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new Oe(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Ys(o,this,e)),this._$AV.push(d),a=i[++l]}r!==(a==null?void 0:a.index)&&(o=W.nextNode(),r++)}return W.currentNode=V,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Oe{get _$AU(){var e,t;return(t=(e=this._$AM)==null?void 0:e._$AU)!=null?t:this._$Cv}constructor(e,t,i,s){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(o=s==null?void 0:s.isConnected)!=null?o:!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=se(this,e,t),Se(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Fs(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&Se(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Le.createElement(os(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(t);else{const r=new Vs(s,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=ni.get(e.strings);return t===void 0&&ni.set(e.strings,t=new Le(e)),t}k(e){It(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Oe(this.O(Ee()),this.O(Ee()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const s=Xt(e).nextSibling;Xt(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Ve{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=se(this,e,t,0),r=!Se(e)||e!==this._$AH&&e!==M,r&&(this._$AH=e);else{const l=e;let a,c;for(e=o[0],a=0;a<o.length-1;a++)c=se(this,l[i+a],t,a),c===M&&(c=this._$AH[a]),r||(r=!Se(c)||c!==this._$AH[a]),c===b?e=b:e!==b&&(e+=(c!=null?c:"")+o[a+1]),this._$AH[a]=c}r&&!s&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Ks extends Ve{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}}class Zs extends Ve{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}}class Js extends Ve{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var r;if((e=(r=se(this,e,t,0))!=null?r:b)===M)return;const i=this._$AH,s=e===b&&i!==b||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)==null?void 0:t.host)!=null?i:this.element,e):this._$AH.handleEvent(e)}}class Ys{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){se(this,e)}}const it=$e.litHtmlPolyfillSupport;var Ki;it==null||it(Le,Oe),((Ki=$e.litHtmlVersions)!=null?Ki:$e.litHtmlVersions=[]).push("3.3.2");const Xs=(n,e,t)=>{var o,r;const i=(o=t==null?void 0:t.renderBefore)!=null?o:e;let s=i._$litPart$;if(s===void 0){const l=(r=t==null?void 0:t.renderBefore)!=null?r:null;i._$litPart$=s=new Oe(e.insertBefore(Ee(),l),l,void 0,t!=null?t:{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=globalThis,Nt=De.ShadowRoot&&(De.ShadyCSS===void 0||De.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ht=Symbol(),oi=new WeakMap;class rs{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Nt&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=oi.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&oi.set(t,e))}return e}toString(){return this.cssText}}const Qs=n=>new rs(typeof n=="string"?n:n+"",void 0,Ht),p=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new rs(t,n,Ht)},en=(n,e)=>{if(Nt)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=De.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},ri=Nt?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Qs(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:tn,defineProperty:sn,getOwnPropertyDescriptor:nn,getOwnPropertyNames:on,getOwnPropertySymbols:rn,getPrototypeOf:an}=Object,U=globalThis,ai=U.trustedTypes,ln=ai?ai.emptyScript:"",st=U.reactiveElementPolyfillSupport,_e=(n,e)=>n,Et={toAttribute(n,e){switch(e){case Boolean:n=n?ln:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},as=(n,e)=>!tn(n,e),li={attribute:!0,type:String,converter:Et,reflect:!1,useDefault:!1,hasChanged:as};var Zi,Ji;(Zi=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(Ji=U.litPropertyMetadata)!=null||(U.litPropertyMetadata=new WeakMap);class X extends HTMLElement{static addInitializer(e){var t;this._$Ei(),((t=this.l)!=null?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=li){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&sn(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){var r;const{get:s,set:o}=(r=nn(this.prototype,e))!=null?r:{get(){return this[t]},set(l){this[t]=l}};return{get:s,set(l){const a=s==null?void 0:s.call(this);o==null||o.call(this,l),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return(t=this.elementProperties.get(e))!=null?t:li}static _$Ei(){if(this.hasOwnProperty(_e("elementProperties")))return;const e=an(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_e("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_e("properties"))){const t=this.properties,i=[...on(t),...rn(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(ri(s))}else e!==void 0&&t.push(ri(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$EO)!=null?t:this._$EO=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var t;const e=(t=this.shadowRoot)!=null?t:this.attachShadow(this.constructor.shadowRootOptions);return en(e,this.constructor.elementStyles),e}connectedCallback(){var e,t;(e=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostConnected)==null?void 0:s.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Et).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){var o,r,l;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Et;this._$Em=s;const d=c.fromAttribute(t,a.type);this[s]=(l=d!=null?d:(r=this._$Ej)==null?void 0:r.get(s))!=null?l:d,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){var r,l;if(e!==void 0){const a=this.constructor;if(s===!1&&(o=this[e]),i!=null||(i=a.getPropertyOptions(e)),!(((r=i.hasChanged)!=null?r:as)(o,t)||i.useDefault&&i.reflect&&o===((l=this._$Ej)==null?void 0:l.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},r){var l,a,c;i&&!((l=this._$Ej)!=null?l:this._$Ej=new Map).has(e)&&(this._$Ej.set(e,(a=r!=null?r:t)!=null?a:this[e]),o!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&((c=this._$Eq)!=null?c:this._$Eq=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i,s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((i=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,l]of this._$Ep)this[r]=l;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,l]of o){const{wrapped:a}=l,c=this[r];a!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,l,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}var Yi;X.elementStyles=[],X.shadowRootOptions={mode:"open"},X[_e("elementProperties")]=new Map,X[_e("finalized")]=new Map,st==null||st({ReactiveElement:X}),((Yi=U.reactiveElementVersions)!=null?Yi:U.reactiveElementVersions=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=globalThis;class L extends X{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return(i=(t=this.renderOptions).renderBefore)!=null||(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Xs(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return M}}var Xi;L._$litElement$=!0,L.finalized=!0,(Xi=q.litElementHydrateSupport)==null||Xi.call(q,{LitElement:L});const nt=q.litElementPolyfillSupport;nt==null||nt({LitElement:L});var Qi;((Qi=q.litElementVersions)!=null?Qi:q.litElementVersions=[]).push("4.2.2");class cn{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(s=>{s.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);!t||(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class j{constructor(e){var t,i,s,o,r,l,a,c,d;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!=null?t:"#55A183",this.bodyColor=(i=e==null?void 0:e.bodyColor)!=null?i:"#fbfbfd",this.showProcessingIndicator=(s=e==null?void 0:e.showProcessingIndicator)!=null?s:!1,this.processingImageMode=(o=e==null?void 0:e.processingImageMode)!=null?o:"complete",this.showCloseButton=(r=e==null?void 0:e.showCloseButton)!=null?r:!0,this.showLeftNavButton=(l=e==null?void 0:e.showLeftNavButton)!=null?l:!1,this.leftNavButtonText=(a=e==null?void 0:e.leftNavButtonText)!=null?a:"",this.showHeaderLogo=(c=e==null?void 0:e.showHeaderLogo)!=null?c:!0,this.closeOnBackdropClick=(d=e==null?void 0:e.closeOnBackdropClick)!=null?d:!0}}/*! *****************************************************************************
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
***************************************************************************** */function T(n,e,t,i){var s=arguments.length,o=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,e,t,i);else for(var l=n.length-1;l>=0;l--)(r=n[l])&&(o=(s<3?r(o):s>3?r(e,t,o):r(e,t))||o);return s>3&&o&&Object.defineProperty(e,t,o),o}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ls=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dn={attribute:!0,type:String,converter:je,reflect:!1,hasChanged:Mt},hn=(n=dn,e,t)=>{const{kind:i,metadata:s}=t;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(t.name,n),i==="accessor"){const{name:r}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,a,n,!0,l)},init(l){return l!==void 0&&this.C(r,void 0,n,l),l}}}if(i==="setter"){const{name:r}=t;return function(l){const a=this[r];e.call(this,l),this.requestUpdate(r,a,n,!0,l)}}throw Error("Unsupported decorator location: "+i)};function Ke(n){return(e,t)=>typeof t=="object"?hn(n,e,t):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(n,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ci=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function un(n,e){return(t,i,s)=>{const o=r=>{var l,a;return(a=(l=r.renderRoot)==null?void 0:l.querySelector(n))!=null?a:null};if(e){const{get:r,set:l}=typeof i=="object"?t:s!=null?s:(()=>{const a=Symbol();return{get(){return this[a]},set(c){this[a]=c}}})();return ci(t,i,{get(){let a=r.call(this);return a===void 0&&(a=o(this),(a!==null||this.hasUpdated)&&l.call(this,a)),a}})}return ci(t,i,{get(){return o(this)}})}}function*Dt(n=document.activeElement){n!=null&&(yield n,"shadowRoot"in n&&n.shadowRoot&&n.shadowRoot.mode!=="closed"&&(yield*Dt(n.shadowRoot.activeElement)))}function cs(){return[...Dt()].pop()}const di=new WeakMap;function ds(n){let e=di.get(n);return e||(e=window.getComputedStyle(n,null),di.set(n,e)),e}function pn(n){if("checkVisibility"in n&&typeof n.checkVisibility=="function")return n.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=ds(n);return e.visibility!=="hidden"&&e.display!=="none"}function gn(n){const e=ds(n),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:n.scrollHeight>n.clientHeight&&t==="auto"||n.scrollWidth>n.clientWidth&&i==="auto"}function fn(n){const e=n.tagName.toLowerCase(),t=Number(n.getAttribute("tabindex"));return n.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||n.hasAttribute("disabled")||n.closest("[inert]")||e==="input"&&n.getAttribute("type")==="radio"&&!n.hasAttribute("checked")||!pn(n)?!1:(e==="audio"||e==="video")&&n.hasAttribute("controls")||n.hasAttribute("tabindex")||n.hasAttribute("contenteditable")&&n.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:gn(n)}function mn(n,e){var t;return((t=n.getRootNode({composed:!0}))==null?void 0:t.host)!==e}function hi(n){const e=new WeakMap,t=[];function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||e.has(s))return;e.set(s,!0),!t.includes(s)&&fn(s)&&t.push(s),s instanceof HTMLSlotElement&&mn(s,n)&&s.assignedElements({flatten:!0}).forEach(o=>{i(o)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&i(s.shadowRoot)}for(const o of Array.from(s.children))i(o)}return i(n),t.sort((s,o)=>{const r=Number(s.getAttribute("tabindex"))||0;return(Number(o.getAttribute("tabindex"))||0)-r})}let fe=[];class wn{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{!this.isActive()||this.checkFocus()},this.handleKeyDown=t=>{var l;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=cs();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const s=hi(this.element);let o=s.findIndex(a=>a===i);this.previousFocus=this.currentFocus;const r=this.tabDirection==="forward"?1:-1;for(;;){o+r>=s.length?o=0:o+r<0?o=s.length-1:o+=r,this.previousFocus=this.currentFocus;const a=s[o];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||a&&this.possiblyHasTabbableChildren(a))return;t.preventDefault(),this.currentFocus=a,(l=this.currentFocus)==null||l.focus({preventScroll:!1});const c=[...Dt()];if(c.includes(this.currentFocus)||!c.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){fe.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){fe=fe.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return fe[fe.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=hi(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],s=this.tabDirection==="forward"?t:i;typeof(s==null?void 0:s.focus)=="function"&&(this.currentFocus=s,s.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze=window,zt=ze.ShadowRoot&&(ze.ShadyCSS===void 0||ze.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,hs=Symbol(),ui=new WeakMap;class bn{constructor(e,t,i){if(this._$cssResult$=!0,i!==hs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(zt&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ui.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ui.set(t,e))}return e}toString(){return this.cssText}}const vn=n=>new bn(typeof n=="string"?n:n+"",void 0,hs),yn=(n,e)=>{zt?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=ze.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},pi=zt?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return vn(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot;const qe=window,gi=qe.trustedTypes,$n=gi?gi.emptyScript:"",fi=qe.reactiveElementPolyfillSupport,St={toAttribute(n,e){switch(e){case Boolean:n=n?$n:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},us=(n,e)=>e!==n&&(e==e||n==n),rt={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:us};class me extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);s!==void 0&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=rt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||rt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(pi(s))}else e!==void 0&&t.push(pi(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return yn(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=rt){var s;const o=this.constructor._$Ep(e,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:St).toAttribute(t,i.type);this._$El=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:St;this._$El=o,this[o]=l.fromAttribute(t,r.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||us)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw t=!1,this._$Ek(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}me.finalized=!0,me.elementProperties=new Map,me.elementStyles=[],me.shadowRootOptions={mode:"open"},fi==null||fi({ReactiveElement:me}),((ot=qe.reactiveElementVersions)!==null&&ot!==void 0?ot:qe.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var at;const Ge=window,ne=Ge.trustedTypes,mi=ne?ne.createPolicy("lit-html",{createHTML:n=>n}):void 0,Lt="$lit$",R=`lit$${(Math.random()+"").slice(9)}$`,ps="?"+R,_n=`<${ps}>`,K=document,ke=()=>K.createComment(""),Te=n=>n===null||typeof n!="object"&&typeof n!="function",gs=Array.isArray,An=n=>gs(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",lt=`[ 	
\f\r]`,we=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wi=/-->/g,bi=/>/g,H=RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vi=/'/g,yi=/"/g,fs=/^(?:script|style|textarea|title)$/i,Cn=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),En=Cn(1),oe=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),$i=new WeakMap,F=K.createTreeWalker(K,129,null,!1);function ms(n,e){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return mi!==void 0?mi.createHTML(e):e}const Sn=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=we;for(let l=0;l<t;l++){const a=n[l];let c,d,h=-1,u=0;for(;u<a.length&&(r.lastIndex=u,d=r.exec(a),d!==null);)u=r.lastIndex,r===we?d[1]==="!--"?r=wi:d[1]!==void 0?r=bi:d[2]!==void 0?(fs.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=H):d[3]!==void 0&&(r=H):r===H?d[0]===">"?(r=s!=null?s:we,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?H:d[3]==='"'?yi:vi):r===yi||r===vi?r=H:r===wi||r===bi?r=we:(r=H,s=void 0);const g=r===H&&n[l+1].startsWith("/>")?" ":"";o+=r===we?a+_n:h>=0?(i.push(c),a.slice(0,h)+Lt+a.slice(h)+R+g):a+R+(h===-2?(i.push(void 0),l):g)}return[ms(n,o+(n[t]||"<?>")+(e===2?"</svg>":"")),i]};class xe{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const l=e.length-1,a=this.parts,[c,d]=Sn(e,t);if(this.el=xe.createElement(c,i),F.currentNode=this.el.content,t===2){const h=this.el.content,u=h.firstChild;u.remove(),h.append(...u.childNodes)}for(;(s=F.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const h=[];for(const u of s.getAttributeNames())if(u.endsWith(Lt)||u.startsWith(R)){const g=d[r++];if(h.push(u),g!==void 0){const y=s.getAttribute(g.toLowerCase()+Lt).split(R),E=/([.?@])?(.*)/.exec(g);a.push({type:1,index:o,name:E[2],strings:y,ctor:E[1]==="."?kn:E[1]==="?"?xn:E[1]==="@"?Rn:Ze})}else a.push({type:6,index:o})}for(const u of h)s.removeAttribute(u)}if(fs.test(s.tagName)){const h=s.textContent.split(R),u=h.length-1;if(u>0){s.textContent=ne?ne.emptyScript:"";for(let g=0;g<u;g++)s.append(h[g],ke()),F.nextNode(),a.push({type:2,index:++o});s.append(h[u],ke())}}}else if(s.nodeType===8)if(s.data===ps)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(R,h+1))!==-1;)a.push({type:7,index:o}),h+=R.length-1}o++}}static createElement(e,t){const i=K.createElement("template");return i.innerHTML=e,i}}function re(n,e,t=n,i){var s,o,r,l;if(e===oe)return e;let a=i!==void 0?(s=t._$Co)===null||s===void 0?void 0:s[i]:t._$Cl;const c=Te(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==c&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),c===void 0?a=void 0:(a=new c(n),a._$AT(n,t,i)),i!==void 0?((r=(l=t)._$Co)!==null&&r!==void 0?r:l._$Co=[])[i]=a:t._$Cl=a),a!==void 0&&(e=re(n,a._$AS(n,e.values),a,i)),e}class Ln{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:K).importNode(i,!0);F.currentNode=o;let r=F.nextNode(),l=0,a=0,c=s[0];for(;c!==void 0;){if(l===c.index){let d;c.type===2?d=new Ue(r,r.nextSibling,this,e):c.type===1?d=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(d=new Bn(r,this,e)),this._$AV.push(d),c=s[++a]}l!==(c==null?void 0:c.index)&&(r=F.nextNode(),l++)}return F.currentNode=K,o}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ue{constructor(e,t,i,s){var o;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=re(this,e,t),Te(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==oe&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):An(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==$&&Te(this._$AH)?this._$AA.nextSibling.data=e:this.$(K.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=xe.createElement(ms(s.h,s.h[0]),this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(i);else{const r=new Ln(o,this),l=r.u(this.options);r.v(i),this.$(l),this._$AH=r}}_$AC(e){let t=$i.get(e.strings);return t===void 0&&$i.set(e.strings,t=new xe(e)),t}T(e){gs(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Ue(this.k(ke()),this.k(ke()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Ze{constructor(e,t,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=re(this,e,t,0),r=!Te(e)||e!==this._$AH&&e!==oe,r&&(this._$AH=e);else{const l=e;let a,c;for(e=o[0],a=0;a<o.length-1;a++)c=re(this,l[i+a],t,a),c===oe&&(c=this._$AH[a]),r||(r=!Te(c)||c!==this._$AH[a]),c===$?e=$:e!==$&&(e+=(c!=null?c:"")+o[a+1]),this._$AH[a]=c}r&&!s&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class kn extends Ze{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}}const Tn=ne?ne.emptyScript:"";class xn extends Ze{constructor(){super(...arguments),this.type=4}j(e){e&&e!==$?this.element.setAttribute(this.name,Tn):this.element.removeAttribute(this.name)}}class Rn extends Ze{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=re(this,e,t,0))!==null&&i!==void 0?i:$)===oe)return;const s=this._$AH,o=e===$&&s!==$||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==$&&(s===$||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Bn{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){re(this,e)}}const _i=Ge.litHtmlPolyfillSupport;_i==null||_i(xe,Ue),((at=Ge.litHtmlVersions)!==null&&at!==void 0?at:Ge.litHtmlVersions=[]).push("2.8.0");const Pn=(n,e,t)=>{var i,s;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let r=o._$litPart$;if(r===void 0){const l=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new Ue(e.insertBefore(ke(),l),l,void 0,t!=null?t:{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,jt=Symbol(),Ai=new Map;class ws{constructor(e,t){if(this._$cssResult$=!0,t!==jt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Ai.get(this.cssText);return Wt&&e===void 0&&(Ai.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const On=n=>new ws(typeof n=="string"?n:n+"",jt),be=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new ws(t,jt)},Un=(n,e)=>{Wt?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},Ci=Wt?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return On(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct;const Ei=window.trustedTypes,Mn=Ei?Ei.emptyScript:"",Si=window.reactiveElementPolyfillSupport,kt={toAttribute(n,e){switch(e){case Boolean:n=n?Mn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},bs=(n,e)=>e!==n&&(e==e||n==n),dt={attribute:!0,type:String,converter:kt,reflect:!1,hasChanged:bs};class Q extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=dt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||dt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Ci(s))}else e!==void 0&&t.push(Ci(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Un(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=dt){var s,o;const r=this.constructor._$Eh(e,i);if(r!==void 0&&i.reflect===!0){const l=((o=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&o!==void 0?o:kt.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(r):this.setAttribute(r,l),this._$Ei=null}}_$AK(e,t){var i,s,o;const r=this.constructor,l=r._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const a=r.getPropertyOptions(l),c=a.converter,d=(o=(s=(i=c)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof c=="function"?c:null)!==null&&o!==void 0?o:kt.fromAttribute;this._$Ei=l,this[l]=d(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||bs)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,o)=>this[o]=s),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}Q.finalized=!0,Q.elementProperties=new Map,Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},Si==null||Si({ReactiveElement:Q}),((ct=globalThis.reactiveElementVersions)!==null&&ct!==void 0?ct:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ht,ut;class Ae extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return oe}}Ae.finalized=!0,Ae._$litElement$=!0,(ht=globalThis.litElementHydrateSupport)===null||ht===void 0||ht.call(globalThis,{LitElement:Ae});const Li=globalThis.litElementPolyfillSupport;Li==null||Li({LitElement:Ae});((ut=globalThis.litElementVersions)!==null&&ut!==void 0?ut:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const In=n=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(n,e):((t,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(r){customElements.define(t,r)}}})(n,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nn=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}};function Hn(n){return(e,t)=>t!==void 0?((i,s,o)=>{s.constructor.createProperty(o,i)})(n,e,t):Nn(n,e)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;((pt=window.HTMLSlotElement)===null||pt===void 0?void 0:pt.prototype.assignedElements)!=null;var ki;(function(n){n.processing="processing",n.complete="complete"})(ki||(ki={}));let Tt=class extends Ae{constructor(){super(...arguments),this.mode="processing"}render(){return En`
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
    `}static get styles(){const e=be`var(--activityIndicatorCheckmarkColor, #31A481)`,t=be`var(--activityIndicatorCompletedRingColor, #31A481)`,i=be`var(--activityIndicatorLoadingRingColor, #333333)`,s=be`var(--activityIndicatorLoadingDotColor, #333333)`;return be`
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
    `}};T([Hn({type:String})],Tt.prototype,"mode",void 0);Tt=T([In("ia-activity-indicator")],Tt);var Dn=w`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class zn extends L{static get styles(){return p`
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
    `}render(){return Dn}}customElements.define("ia-icon-close",zn);var Wn=w`
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
`,jn=w`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    title="Left arrow icon"
    alt="Left arrow icon"
  >
    <path
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
  </svg>
`;let xt=class extends L{constructor(){super(...arguments),this.config=new j}render(){return w`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton?this.leftNavButtonTemplate:b}
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?w`<div class="logo-icon">${Wn}</div>`:b}
            ${this.config.title?w`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?w`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
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
              ${this.config.headline?w` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?w` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}handleLeftNavButtonPressed(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("leftNavButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return w`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}get leftNavButtonTemplate(){var e;return w`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${jn} ${(e=this.config.leftNavButtonText)!=null?e:""}
    </button> `}static get styles(){const e=p`var(--modalLogoSize, 6.5rem)`,t=p`var(--processingImageSize, 7.5rem)`,i=p`var(--modalCornerRadius, 1rem)`,s=p`var(--modalBorder, 2px solid black)`,o=p`var(--modalBottomMargin, 2.5rem)`,r=p`var(--modalTopMargin, 5rem)`,l=p`var(--modalHeaderBottomPadding, 0.5em)`,a=p`var(--modalBottomPadding, 2rem)`,c=p`var(--modalScrollOffset, 5px)`,d=p`var(--modalTitleFontSize, 1.8rem)`,h=p`var(--modalSubtitleFontSize, 1.4rem)`,u=p`var(--modalHeadlineFontSize, 1.6rem)`,g=p`var(--modalMessageFontSize, 1.4rem)`,y=p`var(--modalTitleLineHeight, normal)`,E=p`var(--modalSubtitleLineHeight, normal)`,Z=p`var(--modalHeadlineLineHeight, normal)`,J=p`var(--modalMessageLineHeight, normal)`;return p`
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
        padding-bottom: ${l};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${d};
        font-weight: bold;
        line-height: ${y};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${h};
        line-height: ${E};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${s};
        border-top: 0;
        padding: 0 1rem calc(${a} - ${c}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${o}));
        min-height: 5rem;
        padding: 0 0 calc(${c}) 0;
      }

      .headline {
        font-size: ${u};
        font-weight: bold;
        text-align: center;
        line-height: ${Z};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${g};
        line-height: ${J};
      }

      .logo-icon {
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
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
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
          0 4px 4px 0 rgba(0, 0, 0, 0.08);
      }

      .back-button {
        position: absolute;
        left: 1.2rem;
        top: 1.2rem;
        height: 2rem;
        background-color: transparent;
        outline: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: white;
        font-family: inherit;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }

      .back-button svg {
        height: 1.5rem;
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
    `}};T([Ke({type:Object})],xt.prototype,"config",void 0);xt=T([ls("modal-template")],xt);function Fn(n,e,t){var i=t||{},s=i.noTrailing,o=s===void 0?!1:s,r=i.noLeading,l=r===void 0?!1:r,a=i.debounceMode,c=a===void 0?void 0:a,d,h=!1,u=0;function g(){d&&clearTimeout(d)}function y(Z){var J=Z||{},I=J.upcomingOnly,Qe=I===void 0?!1:I;g(),h=!Qe}function E(){for(var Z=arguments.length,J=new Array(Z),I=0;I<Z;I++)J[I]=arguments[I];var Qe=this,Gt=Date.now()-u;if(h)return;function Ie(){u=Date.now(),e.apply(Qe,J)}function Vt(){d=void 0}!l&&c&&!d&&Ie(),g(),c===void 0&&Gt>n?l?(u=Date.now(),o||(d=setTimeout(c?Vt:Ie,n))):Ie():o!==!0&&(d=setTimeout(c?Vt:Ie,c===void 0?n-Gt:n))}return E.cancel=y,E}var P;(function(n){n.Open="open",n.Closed="closed"})(P||(P={}));class qn{constructor(e){this.windowResizeThrottler=Fn(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case P.Open:this.startResizeListener(),this.stopDocumentScroll();break;case P.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let ae=class extends L{constructor(){super(...arguments),this.mode=P.Closed,this.hostBridge=new qn(this),this.modal=new wn(this),this.closeOnBackdropClick=!0}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return w`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          @leftNavButtonPressed=${this.callUserPressedLeftNavButtonCallback}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){var e,t;this.mode=P.Closed,this.customModalContent=void 0,this.modalTemplate&&(this.modalTemplate.config=new j),this.modal.deactivate(),(t=(e=this.triggeringElement)==null?void 0:e.focus)==null||t.call(e),this.triggeringElement=void 0}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}callUserPressedLeftNavButtonCallback(){const e=this.userPressedLeftNavButtonCallback;this.userPressedLeftNavButtonCallback=void 0,e&&e()}async showModal(e){this.mode===P.Closed&&this.captureFocusedElement(),this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.userPressedLeftNavButtonCallback=e.userPressedLeftNavButtonCallback,this.customModalContent=e.customModalContent,this.mode=P.Open,this.modalTemplate&&(this.modalTemplate.config=e.config,await this.modalTemplate.updateComplete,this.modalTemplate.focus()),this.modal.activate()}captureFocusedElement(){this.triggeringElement=cs()}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=p`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=p`var(--modalBackdropZindex, 1000)`,i=p`var(--modalWidth, 32rem)`,s=p`var(--modalMaxWidth, 95%)`,o=p`var(--modalZindex, 2000)`;return p`
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
    `}};T([Ke({type:String,reflect:!0})],ae.prototype,"mode",void 0);T([Ke({type:Object})],ae.prototype,"customModalContent",void 0);T([Ke({type:Object})],ae.prototype,"hostBridge",void 0);T([un("modal-template")],ae.prototype,"modalTemplate",void 0);ae=T([ls("modal-manager")],ae);function ue(n){return new Promise((e,t)=>{n.oncomplete=n.onsuccess=()=>e(n.result),n.onabort=n.onerror=()=>t(n.error)})}function Gn(n,e){const t=indexedDB.open(n);t.onupgradeneeded=()=>t.result.createObjectStore(e);const i=ue(t);return(s,o)=>i.then(r=>o(r.transaction(e,s).objectStore(e)))}let gt;function Je(){return gt||(gt=Gn("keyval-store","keyval")),gt}function Vn(n,e=Je()){return e("readonly",t=>ue(t.get(n)))}function Kn(n,e,t=Je()){return t("readwrite",i=>(i.put(e,n),ue(i.transaction)))}function Zn(n,e=Je()){return e("readwrite",t=>(t.delete(n),ue(t.transaction)))}function Jn(n,e){return n.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},ue(n.transaction)}function Yn(n=Je()){return n("readonly",e=>{if(e.getAllKeys)return ue(e.getAllKeys());const t=[];return Jn(e,i=>t.push(i.key)).then(()=>t)})}function Xn(n,e){return n.setMilliseconds(n.getMilliseconds()+e*1e3),n}class vs{constructor(e){var t,i,s,o;if(this.namespace=(t=e==null?void 0:e.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(i=e==null?void 0:e.defaultTTL)!==null&&i!==void 0?i:15*60,(!((s=e==null?void 0:e.immediateClean)!==null&&s!==void 0)||s)&&this.cleanExpired(),!(e!=null&&e.disableCleaning)){const r=(o=e==null?void 0:e.cleaningInterval)!==null&&o!==void 0?o:60;setInterval(()=>{this.cleanExpired()},r*1e3)}}async set(e){var t;const i={value:e.value},s=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,o=Xn(new Date,s);i.expires=o;const r=this.getNamespacedKey(e.key);try{await Kn(r,i)}catch{}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await Vn(t)}catch{}if(!i)return;const s=new Date;if(i.expires&&i.expires<s){await this.delete(e);return}return i.value}async delete(e){const t=this.getNamespacedKey(e);try{await Zn(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await Yn()}catch{}const t=[];for(const o of e)typeof o=="string"&&t.push(o);return t.filter(o=>o.startsWith(this.namespace)).map(o=>this.removeNamespace(o))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ys={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$s=n=>(...e)=>({_$litDirective$:n,values:e});class _s{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ti=$s(class extends _s{constructor(n){var e;if(super(n),n.type!==ys.ATTRIBUTE||n.name!=="class"||((e=n.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){var i,s;if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(e)}const t=n.element.classList;for(const o of this.st)o in e||(t.remove(o),this.st.delete(o));for(const o in e){const r=!!e[o];r===this.st.has(o)||((s=this.nt)==null?void 0:s.has(o))||(r?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return M}});class C{static isInIframe(){var e;try{return window.self!==window.top}catch(t){return(e=window==null?void 0:window.Sentry)==null||e.captureException(t),!0}}static getRedirectUrl(){let e;return C.isInIframe()?e=window.top.location.href:e=window.location.href,e}static goToUrl(e,t){let i;C.isInIframe()&&t?i=window.top.location:i=window.location,i.href===e?i.reload():i.href=e}static isOnStreamPage(){return window.location.href.indexOf("/stream/")>-1}static getQueryParam(e){const i=window.location.search.substring(1).split("&");let s="";for(let o=0;o<i.length;o+=1)if(s=i[o].split("="),s[0]===e)return s[1];return b}static getBackHref(){return window.location.href.replace(/[?&]{1}(?:admin|access)=1/,"")}static formatUrl(e,t){return/^https?:/.test(t)?t:`${e}${t}`}}const k={disconnectedCallback:"IABookActions:disconnectedCallback",bookHasRenewed:"IABookActions:handleLoanAutoRenewed - book has renewed for next one hour",bookRenewFailed:"IABookActions:handleLoanRenewNow - failed to renew",browseHasExpired:"IABookActions:browseHasExpired - one-hour loan has been expired",bookWasExpired:"IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller",clearTokenPoller:"IABookActions:startLoanTokenPoller - clearing token poller interval",clearOneHourTimer:"IABookActions:timerCountdown - one-hour timer interval cleared",bookAccessed:"IABookActions:bookAccessed",handleLoanTokenPoller:"IABookActions:handleLoanTokenPoller",setConsecutiveLoanCounts:"IABookActions:setConsecutiveLoanCounts",actionsHandlerService:"IABookActions:actionsHandlerService"},v=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)||location.host.match(/^internetarchive/)?console.log.bind(console):()=>{};async function z(n){var h,u;const e={action:null,identifier:"",success(){},error(){},...n};let t="/services/loans/loan";const i=window==null?void 0:window.location,s="loan token not found. please try again later.",o="This book is not available to borrow at this time. Please try again later.",r=["browse_book","borrow_book","create_token","renew_loan","return_loan"],l=((h=i==null?void 0:i.href)==null?void 0:h.indexOf("?error=true"))!==-1&&(i==null?void 0:i.hostname)!=="archive.org",a=["localhost","internetarchive.github.io"];let c=!1;a.includes(i.hostname)&&(c=!0,t=i.href);let d=new FormData;d.append("action",e.action),d.append("identifier",e.identifier);try{await fetch(t,{method:"POST",body:d}).then(async g=>l&&r.includes(e==null?void 0:e.action)?{success:!1,error:(e==null?void 0:e.action)==="create_token"?s:o}:c?(e==null?void 0:e.action)=="renew_loan"||(e==null?void 0:e.action)=="return_loan"?(await new Promise(y=>setTimeout(y,5e3)),{success:!0,loan:{renewal:!0}}):{success:!0,message:"operation executed successfully!"}:g.json()).then(g=>{g!=null&&g.error?e==null||e.error(g):e==null||e.success(g)})}catch(g){(u=window==null?void 0:window.Sentry)==null||u.captureException(`${k.actionsHandlerService} - Error: ${g}`)}}const G={borrow:"BookReader-ReadingBorrow",browse:"BookReader-ReadingBrowse",preview:"BookReader-Preview",satisfactionMetric:"DetailsPage-Book",bookReaderHeader:"BookReader-Header",adminAccess:"Admin-Access"},te={browse:"Borrow-1Hour",browseAgain:"Borrow-Again",browseRenew:"BookRenew",browseReturn:"BookReturn",borrow:"Borrow-14Days",waitlistJoin:"JoinWaitlist",waitlistLeave:"LeaveWaitlist",doneBorrowing:"ReturnBook",login:"LogIn",purchase:"BWBPurchase",unavailable:"Book-Unavailable",printDisability:"Print-Disability",titleBar:"Book-Title-Bar"},Ne={browseAutoRenew:"BookAutoRenew",browseAutoReturn:"BookAutoReturn",browseManualRenew:"BookManualRenew",browseManualReturn:"BookManualReturn"};function Qn(n){return n&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(n).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}function We(n,e,t,i,s,o){return document.cookie=encodeURIComponent(n)+"="+encodeURIComponent(e)+(t?`; expires=${t.toUTCString()}`:"")+(s?`; domain=${s}`:"")+(i?`; path=${i}`:"")+(o?"; secure":""),!0}class As{constructor(){this.identifier=void 0,this.gaStats={}}async storeLoanStatsCount(e,t=""){this.identifier=e;try{await this.getLoanStatsCount(t),this.sendMatrixStatsEvents(t);const i=new Date;i.setHours(i.getHours()+2),await We(this.getLoanCountStorageKey,JSON.stringify(this.lendingEventCounts),i,"/")}catch(i){v(i),this.sendEvent("Cookies-Error-Actions",i,this.identifier)}}async getLoanStatsCount(e){var o,r,l,a,c,d,h;this.lendingEventCounts=JSON.parse(await Qn(this.getLoanCountStorageKey)),this.gaStats=(o=this.lendingEventCounts)!=null?o:{browse:0,renew:0,expire:0};let t=(l=(r=this.lendingEventCounts)==null?void 0:r.browse)!=null?l:0,i=(c=(a=this.lendingEventCounts)==null?void 0:a.renew)!=null?c:0,s=(h=(d=this.lendingEventCounts)==null?void 0:d.expire)!=null?h:0;switch(e){case"browse":t=t?Number(t)+1:1,this.gaStats.browse=t,i=0,s=0;break;case"autorenew":i=i?Number(i)+1:1,this.gaStats.renew=i;break;case"return":s=s?Number(s)+1:1,this.gaStats.expire=s,i=0,s=0;break}this.lendingEventCounts={browse:t,renew:i,expire:s}}sendMatrixStatsEvents(e){var s,o;const t=G.browse,i=`browse${this.paddedNumber((s=this.gaStats)==null?void 0:s.browse)}-autorenew${this.paddedNumber((o=this.gaStats)==null?void 0:o.renew)}:${e}`;this.sendEvent(t,i,this.identifier)}paddedNumber(e){return e?e.toString().padStart(3,"0"):"000"}get getLoanCountStorageKey(){return`br-browse-${this.identifier}`}sendEvent(e,t,i,s){var o;v("eventCategory:-",e,"||	eventAction:-",t,"||	label:-",i,"||	extraParams:-",s),(o=window==null?void 0:window.archive_analytics)==null||o.send_event_no_sampling(e,t,i||this.identifier,s)}}class Cs extends L{constructor(){super(),this.waitUntillBorrowComplete=6,this.loanAnanlytics=new As,this.bindEvents()}bindEvents(){this.addEventListener("browseBook",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browse"))}),this.addEventListener("browseBookAgain",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browseagain"))}),this.addEventListener("autoRenew",async({detail:e})=>{var i,s;this.handleLoanRenewNow(),await((i=this.loanAnanlytics)==null?void 0:i.storeLoanStatsCount(this.identifier,"autorenew"));const t=(e==null?void 0:e.renewType)==="auto"?Ne.browseAutoRenew:Ne.browseManualRenew;(s=this.loanAnanlytics)==null||s.sendEvent(G.browse,te.browseRenew,t,this.identifier)}),this.addEventListener("autoReturn",async()=>{var e,t;this.handleReturnIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"autoreturn")),(t=this.loanAnanlytics)==null||t.sendEvent(G.browse,te.browseReturn,Ne.browseAutoReturn,this.identifier)}),this.addEventListener("returnNow",({detail:e})=>{var t,i,s;if((e==null?void 0:e.borrowType)==="browse"&&((t=this.loanAnanlytics)==null||t.storeLoanStatsCount(this.identifier,"return"),(i=this.loanAnanlytics)==null||i.sendEvent(G.browse,te.browseReturn,Ne.browseManualReturn,this.identifier)),this.handleReturnIt("returnNow"),(e==null?void 0:e.borrowType)==="borrow"){const{category:o,action:r}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(o,r,this.identifier)}}),this.addEventListener("borrowBook",({detail:e})=>{var s;this.handleBorrowIt();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("loginAndBorrow",({detail:e})=>{var s;this.handleLoginOk();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("leaveWaitlist",({detail:e})=>{var s;this.handleRemoveFromWaitingList();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("joinWaitlist",({detail:e})=>{var s;this.handleReserveIt();const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("purchaseBook",({detail:e})=>{var s;const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)}),this.addEventListener("adminAccess",({detail:e})=>{var o;const{category:t,action:i}=e.event;(o=this.loanAnanlytics)==null||o.sendEvent(t,i,this.identifier),this.setStickyAdminAccess(!0);const s=new URL(window.location.href);s.searchParams.append("admin",1),window.location.search=s.search}),this.addEventListener("exitAdminAccess",({detail:e})=>{var s;const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier),this.setStickyAdminAccess(!1)}),this.addEventListener("bookTitleBar",({detail:e})=>{var s;const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier)})}handleBrowseIt(){const e="browse_book";this.dispatchToggleActionGroup(),z({action:e,identifier:this.identifier,success:()=>{this.setBrowseTimeSession(),this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleLoanRenewNow(){const e="renew_loan";z({action:e,identifier:this.identifier,success:t=>{var o;v("RENEW_LOAN --- ",t,e,t.loan,this.identifier);const i=t.loan?t.loan:void 0,s=i.renewal;i&&s?this.setBrowseTimeSession():(v("RENEW_LOAN ERROR --- ",{action:e,isRenewal:s,activeLoan:i,data:t,id:this.identifier}),(o=window==null?void 0:window.Sentry)==null||o.captureMessage(`${k.bookRenewFailed} - Error: ${JSON.stringify(t)}`),this.dispatchActionError(e,{data:t,error:!0,message:"Loan renewal failed: no loan active."})),this.dispatchEvent(new CustomEvent("loanAutoRenewed",{detail:{action:e,data:{...t,loan:i}}}))},error:t=>{this.dispatchActionError(e,t)}})}handleReturnIt(e=""){const t="return_loan";e==="returnNow"&&this.dispatchToggleActionGroup(),z({action:t,identifier:this.identifier,success:()=>{this.deleteLoanCookies(),e==="returnNow"&&C.goToUrl(this.returnUrl,!0)},error:i=>{this.dispatchActionError(t,i)}})}handleBorrowIt(){const e="borrow_book";this.dispatchToggleActionGroup(),z({action:e,identifier:this.identifier,success:()=>{this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleReserveIt(){const e="join_waitlist";this.dispatchToggleActionGroup(),z({action:e,identifier:this.identifier,success:()=>{C.goToUrl(C.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}handleRemoveFromWaitingList(){const e="leave_waitlist";this.dispatchToggleActionGroup(),z({action:e,identifier:this.identifier,success:()=>{C.goToUrl(C.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}dispatchActionError(e,t={}){var i;(i=this.loanAnanlytics)==null||i.sendEvent("LendingServiceError",e),this.dispatchEvent(new CustomEvent("lendingActionError",{detail:{action:e,data:t}}))}dispatchToggleActionGroup(){this.dispatchEvent(new CustomEvent("toggleActionGroup"))}handleLoginOk(){const e=`/account/login?referer=${encodeURIComponent(C.getRedirectUrl())}`;C.goToUrl(e,!0)}handleReadItNow(e){const t=new URLSearchParams(window.location.search);if(e){const r=new URLSearchParams(e);for(const[l,a]of r.entries())t.append(l,a)}const i=t.toString(),s=i?`?${i}`:"",o=window.location.origin+window.location.pathname+s;setTimeout(()=>{C.goToUrl(o,!0)},this.waitUntillBorrowComplete*1e3)}async setBrowseTimeSession(){try{const e=new Date(new Date().getTime()+this.loanTotalTime*1e3);await this.localCache.set({key:`${this.identifier}-loanTime`,value:e,ttl:Number(this.loanTotalTime)}),await this.localCache.delete(`${this.identifier}-pageChangedTime`)}catch(e){v(e)}}deleteLoanCookies(){const e=new Date;e.setTime(e.getTime()-24*60*60*1e3),We(`loan-${this.identifier}=""`,"",e,"/",".archive.org"),We(`br-loan-${this.identifier}=""`,"",e,"/",".archive.org")}setStickyAdminAccess(e){const t=window.location.hostname==="localhost"?"localhost":".archive.org";We("sticky-admin-access",e,"","/",t)}}const xi=p`var(--white, #fff)`,eo=p`var(--primaryDisableCTAFill, #767676)`,to=p`var(--secondaryCTABorder, #999)`,io=p`var(--primaryCTAFill, #194880)`,ft=p`var(--primaryCTAFillRGB, 25, 72, 128)`,so=p`var(--primaryCTABorder, #c5d1df)`,no=p`var(--primaryErrorCTAFill, #d9534f)`,mt=p`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,oo=p`var(--primaryErrorCTABorder, #d43f3a)`,ro=p`var(--secondaryCTAFill, #333)`,wt=p`var(--secondaryCTAFillRGB, 51, 51, 51)`,ao=p`var(--primaryCTABorder, #979797)`,lo=p`#ee8950`,co=p`#ec7939`;var ho=p`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${xi};
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
    outline-color: ${xi};
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
    background-color: ${eo};
    border: 1px solid ${to};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${lo}
    border-color: ${co};
  }

  .ia-button.primary {
    background-color: ${io};
    border-color: ${so};
  }
  .ia-button.primary:hover {
    background-color: rgba(${ft}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${ft}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${ft}, 0.7);
  }

  .ia-button.danger {
    background-color: ${no};
    border-color: ${oo};
  }
  .ia-button.danger:hover {
    background-color: rgba(${mt}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${mt}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${mt}, 0.7);
  }

  .ia-button.dark {
    background-color: ${ro};
    border-color: ${ao};
  }
  .ia-button.dark:hover {
    background-color: rgba(${wt}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${wt}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${wt}, 0.7);
  }
`;const Y=p`var(--white, #fff)`,Ri=p`var(--primaryBGColor, #000)`,uo=p`var(--iaBookActionsDropdownBGColor, #2d2d2d)`;var po=p`
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
    background-color: ${Y};
    border-radius: 10px;
  }
  .action-buttons .desktop.purchase {
    margin-left: 5px;
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${Y};
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
    background-color: ${Ri};
    border: 1px solid ${Y};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    background: ${uo};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${Ri};
    list-style: none;
    height: 3rem;
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${Y};
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
    background: ${Y};
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
    background-color: ${Y};
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
`;const Bi=700,go=800,fo=w`<svg
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
</svg>`,mo=w`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
    fill="#fff"
  />
</svg>`,bt=w`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill="#fff"
  />
</svg>`;class wo extends Cs{static get properties(){return{userid:{type:String},identifier:{type:String},primaryActions:{type:Array},secondaryActions:{type:Array},primaryColor:{type:String},dropdownState:{type:String},width:{type:Number},hasAdminAccess:{type:Boolean},dropdownArrow:{type:String},disabled:{type:Boolean},returnUrl:{type:String},autoRenew:{type:Boolean},loanRenewType:{type:String},autoReturn:{type:Boolean},returnNow:{type:Boolean}}}constructor(){super(),this.userid="",this.identifier="",this.primaryActions=[],this.secondaryActions=[],this.primaryColor="",this.dropdownState="close",this.width=0,this.hasAdminAccess=!1,this.dropdownArrow=bt,this.initialButton=!1,this.title="",this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.disabled=!1,this.returnUrl="",this.autoRenew=!1,this.loanRenewType="",this.autoReturn=!1,this.returnNow=!1}updated(e){(e.has("width")||e.has("disabled"))&&this.isBelowTabletContainer&&this.resetActions(),e.has("autoRenew")&&this.autoRenew&&this.dispatchLoanEvent("autoRenew",{renewType:this.loanRenewType});const t=e.has("autoReturn")&&this.autoReturn;t&&this.dispatchLoanEvent("autoReturn"),e.has("returnNow")&&this.returnNow&&!t&&this.dispatchLoanEvent("returnNow",{borrowType:"browse"})}dispatchLoanEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}resetActions(){this.primaryActions.length&&(this.primaryActions=this.primaryActions.concat(this.secondaryActions),this.primaryColor=this.primaryActions[0].className,this.hasAdminAccess&&this.sortActionButtonOrder(),this.secondaryActions=[])}sortActionButtonOrder(){let e=1;const t=0;this.secondaryActions.length===2&&(e=2),e=this.primaryActions.length-e;const i=this.primaryActions[e],s=this.primaryActions;s.splice(e,1),s.splice(t,0,i),this.primaryActions=s}render(){return w`
      <div
        class="${Ti({actiongroup:!0,disabled:this.disabled})}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `}get renderPrimaryActions(){return this.primaryActions.length===0?b:(this.dropdownState==="close"&&(this.primaryColor=this.primaryActions[0].className),this.primaryActions.length===1?this.initialActionTemplate:w`
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
    `)}get renderSecondaryActions(){return this.secondaryActions.length?this.secondaryActions.map(e=>this.renderActionButton(e)):b}renderActionLink(e,t=!1){return w`<span class="${this.getDeviceType} ${e.className}">
      <a
        class="ia-button ${e.className} ${t?"initial":""}"
        href="${e.url}"
        target=${e.target}
        @click=${()=>{this.clickHandler(e.id,e.analyticsEvent,e==null?void 0:e.borrowType)}}
      >
        ${e.id==="purchaseBook"?fo:""} ${e.text}
        <small>${e.subText}</small>
      </a>
    </span>`}renderActionButton(e,t=!1){if(e.url)return this.renderActionLink(e,t);const{analyticsEvent:i}=e;return w`<button
      class="ia-button ${e.className} ${t?"initial":""}"
      @click=${()=>{this.clickHandler(e.id,i,e==null?void 0:e.borrowType)}}
    >
      ${e.text}
    </button>`}clickHandler(e,t,i=""){if(this.dropdownState="close",this.dropdownArrow=bt,!t||!e)return;const{category:s,action:o}=t;this.dispatchEvent(new CustomEvent(e,{detail:{event:{category:s,action:o},borrowType:i}}))}get initialActionTemplate(){return this.initialButton=!1,this.primaryActions.length>1&&(this.initialButton=!0),this.renderActionButton(this.primaryActions[0],this.initialButton)}get getPrimaryItems(){return this.primaryActions.slice(1).map(e=>w`<li>${this.renderActionButton(e,this.initialButton)}</li>`)}get getLoaderIcon(){return w`<img
      class="${Ti({actionloader:!0,disabled:this.disabled})}"
      alt=""
      src="${this.loaderIcon}"
    />`}get isBelowTabletContainer(){return this.width<=go}get getDeviceType(){return this.isBelowTabletContainer?"mobile":"desktop"}toggleDropdown(){this.dropdownState==="open"?(this.dropdownState="close",this.dropdownArrow=bt,this.primaryColor=this.primaryActions[0].className):(this.dropdownState="open",this.dropdownArrow=mo,this.primaryColor="dark")}static get styles(){return[ho,po]}}window.customElements.define("collapsible-action-group",wo);const bo=w`
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
`;class vo extends Cs{static get properties(){return{identifier:{type:String},bookTitle:{type:String}}}constructor(){super(),this.identifier="",this.bookTitle="",this.analyticsCategories=G,this.analyticsActions=te}clickHandler(){const{category:e,action:t}={category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.titleBar};this.dispatchEvent(new CustomEvent("bookTitleBar",{detail:{event:{category:e,action:t}}}))}render(){return w`
      <a
        class="embed-link"
        @click=${()=>{this.clickHandler()}}
        href="/details/${this.identifier}"
      >
        <span>${bo}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `}static get styles(){return p`
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
    `}}window.customElements.define("book-title-bar",vo);class yo extends L{static get properties(){return{texts:{type:String},textClass:{type:String}}}constructor(){super(),this.texts="",this.textClass=""}render(){return w`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `}static get styles(){return p`
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
    `}}window.customElements.define("text-group",yo);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Rt extends _s{constructor(e){if(super(e),this.it=b,e.type!==ys.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===b||e==null)return this._t=void 0,this.it=e;if(e===M)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Rt.directiveName="unsafeHTML",Rt.resultType=1;const $o=$s(Rt);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qt=Symbol(),Pi=new Map;class Es{constructor(e,t){if(this._$cssResult$=!0,t!==qt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Pi.get(this.cssText);return Ft&&e===void 0&&(Pi.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const _o=n=>new Es(typeof n=="string"?n:n+"",qt),Ao=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new Es(t,qt)},Co=(n,e)=>{Ft?n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)})},Oi=Ft?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return _o(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var vt;const Ui=window.trustedTypes,Eo=Ui?Ui.emptyScript:"",Mi=window.reactiveElementPolyfillSupport,Bt={toAttribute(n,e){switch(e){case Boolean:n=n?Eo:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ss=(n,e)=>e!==n&&(e==e||n==n),yt={attribute:!0,type:String,converter:Bt,reflect:!1,hasChanged:Ss};class ee extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Eh(i,t);s!==void 0&&(this._$Eu.set(s,i),e.push(s))}),e}static createProperty(e,t=yt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||yt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Oi(s))}else e!==void 0&&t.push(Oi(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Co(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=yt){var s,o;const r=this.constructor._$Eh(e,i);if(r!==void 0&&i.reflect===!0){const l=((o=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&o!==void 0?o:Bt.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(r):this.setAttribute(r,l),this._$Ei=null}}_$AK(e,t){var i,s,o;const r=this.constructor,l=r._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const a=r.getPropertyOptions(l),c=a.converter,d=(o=(s=(i=c)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof c=="function"?c:null)!==null&&o!==void 0?o:Bt.fromAttribute;this._$Ei=l,this[l]=d(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ss)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,o)=>this[o]=s),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}ee.finalized=!0,ee.elementProperties=new Map,ee.elementStyles=[],ee.shadowRootOptions={mode:"open"},Mi==null||Mi({ReactiveElement:ee}),((vt=globalThis.reactiveElementVersions)!==null&&vt!==void 0?vt:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $t;const le=globalThis.trustedTypes,Ii=le?le.createPolicy("lit-html",{createHTML:n=>n}):void 0,B=`lit$${(Math.random()+"").slice(9)}$`,Ls="?"+B,So=`<${Ls}>`,ce=document,Re=(n="")=>ce.createComment(n),Be=n=>n===null||typeof n!="object"&&typeof n!="function",ks=Array.isArray,Lo=n=>{var e;return ks(n)||typeof((e=n)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ni=/-->/g,Hi=/>/g,D=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Di=/'/g,zi=/"/g,Ts=/^(?:script|style|textarea|title)$/i,ko=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),To=ko(1),de=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Wi=new WeakMap,xo=(n,e,t)=>{var i,s;const o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let r=o._$litPart$;if(r===void 0){const l=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new Me(e.insertBefore(Re(),l),l,void 0,t!=null?t:{})}return r._$AI(n),r},ie=ce.createTreeWalker(ce,129,null,!1),Ro=(n,e)=>{const t=n.length-1,i=[];let s,o=e===2?"<svg>":"",r=ve;for(let a=0;a<t;a++){const c=n[a];let d,h,u=-1,g=0;for(;g<c.length&&(r.lastIndex=g,h=r.exec(c),h!==null);)g=r.lastIndex,r===ve?h[1]==="!--"?r=Ni:h[1]!==void 0?r=Hi:h[2]!==void 0?(Ts.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=D):h[3]!==void 0&&(r=D):r===D?h[0]===">"?(r=s!=null?s:ve,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?D:h[3]==='"'?zi:Di):r===zi||r===Di?r=D:r===Ni||r===Hi?r=ve:(r=D,s=void 0);const y=r===D&&n[a+1].startsWith("/>")?" ":"";o+=r===ve?c+So:u>=0?(i.push(d),c.slice(0,u)+"$lit$"+c.slice(u)+B+y):c+B+(u===-2?(i.push(void 0),a):y)}const l=o+(n[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Ii!==void 0?Ii.createHTML(l):l,i]};class Pe{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const l=e.length-1,a=this.parts,[c,d]=Ro(e,t);if(this.el=Pe.createElement(c,i),ie.currentNode=this.el.content,t===2){const h=this.el.content,u=h.firstChild;u.remove(),h.append(...u.childNodes)}for(;(s=ie.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const h=[];for(const u of s.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(B)){const g=d[r++];if(h.push(u),g!==void 0){const y=s.getAttribute(g.toLowerCase()+"$lit$").split(B),E=/([.?@])?(.*)/.exec(g);a.push({type:1,index:o,name:E[2],strings:y,ctor:E[1]==="."?Po:E[1]==="?"?Uo:E[1]==="@"?Mo:Ye})}else a.push({type:6,index:o})}for(const u of h)s.removeAttribute(u)}if(Ts.test(s.tagName)){const h=s.textContent.split(B),u=h.length-1;if(u>0){s.textContent=le?le.emptyScript:"";for(let g=0;g<u;g++)s.append(h[g],Re()),ie.nextNode(),a.push({type:2,index:++o});s.append(h[u],Re())}}}else if(s.nodeType===8)if(s.data===Ls)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(B,h+1))!==-1;)a.push({type:7,index:o}),h+=B.length-1}o++}}static createElement(e,t){const i=ce.createElement("template");return i.innerHTML=e,i}}function he(n,e,t=n,i){var s,o,r,l;if(e===de)return e;let a=i!==void 0?(s=t._$Cl)===null||s===void 0?void 0:s[i]:t._$Cu;const c=Be(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==c&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),c===void 0?a=void 0:(a=new c(n),a._$AT(n,t,i)),i!==void 0?((r=(l=t)._$Cl)!==null&&r!==void 0?r:l._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=he(n,a._$AS(n,e.values),a,i)),e}class Bo{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:s}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:ce).importNode(i,!0);ie.currentNode=o;let r=ie.nextNode(),l=0,a=0,c=s[0];for(;c!==void 0;){if(l===c.index){let d;c.type===2?d=new Me(r,r.nextSibling,this,e):c.type===1?d=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(d=new Io(r,this,e)),this.v.push(d),c=s[++a]}l!==(c==null?void 0:c.index)&&(r=ie.nextNode(),l++)}return o}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Me{constructor(e,t,i,s){var o;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cg=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=he(this,e,t),Be(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==de&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Lo(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==_&&Be(this._$AH)?this._$AA.nextSibling.data=e:this.k(ce.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Pe.createElement(s.h,this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.m(i);else{const r=new Bo(o,this),l=r.p(this.options);r.m(i),this.k(l),this._$AH=r}}_$AC(e){let t=Wi.get(e.strings);return t===void 0&&Wi.set(e.strings,t=new Pe(e)),t}S(e){ks(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Me(this.A(Re()),this.A(Re()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Ye{constructor(e,t,i,s,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(o===void 0)e=he(this,e,t,0),r=!Be(e)||e!==this._$AH&&e!==de,r&&(this._$AH=e);else{const l=e;let a,c;for(e=o[0],a=0;a<o.length-1;a++)c=he(this,l[i+a],t,a),c===de&&(c=this._$AH[a]),r||(r=!Be(c)||c!==this._$AH[a]),c===_?e=_:e!==_&&(e+=(c!=null?c:"")+o[a+1]),this._$AH[a]=c}r&&!s&&this.C(e)}C(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Po extends Ye{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===_?void 0:e}}const Oo=le?le.emptyScript:"";class Uo extends Ye{constructor(){super(...arguments),this.type=4}C(e){e&&e!==_?this.element.setAttribute(this.name,Oo):this.element.removeAttribute(this.name)}}class Mo extends Ye{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=he(this,e,t,0))!==null&&i!==void 0?i:_)===de)return;const s=this._$AH,o=e===_&&s!==_||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==_&&(s===_||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Io{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){he(this,e)}}const ji=window.litHtmlPolyfillSupport;ji==null||ji(Pe,Me),(($t=globalThis.litHtmlVersions)!==null&&$t!==void 0?$t:globalThis.litHtmlVersions=[]).push("2.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _t,At;class Ce extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=xo(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return de}}Ce.finalized=!0,Ce._$litElement$=!0,(_t=globalThis.litElementHydrateSupport)===null||_t===void 0||_t.call(globalThis,{LitElement:Ce});const Fi=globalThis.litElementPolyfillSupport;Fi==null||Fi({LitElement:Ce});((At=globalThis.litElementVersions)!==null&&At!==void 0?At:globalThis.litElementVersions=[]).push("3.2.0");var No=To`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title id="linkTitleID">Get more information</title>
  <desc id="linkDescID">Informative icon</desc>
    <path d="m0 0h100v100h-100z" fill="#000"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" class="fill-color" fill-rule="nonzero"/>
</svg>
`;class Ho extends Ce{static get styles(){return Ao`
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
    `}render(){return No}}customElements.define("ia-icon-info",Ho);class Do extends L{static get properties(){return{iconClass:{type:String}}}constructor(){super(),this.iconClass="",this.helpURL="https://help.archive.org/help/borrowing-from-the-lending-library"}render(){return w`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `}get getInfoIcon(){return qs`${$o(this.icon)}`}static get styles(){return p`
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
    `}}window.customElements.define("info-icon",Do);class zo extends L{static get properties(){return{secondsLeftOnLoan:{type:Number},displayTime:{type:Boolean}}}constructor(){super(),this.secondsLeftOnLoan=0,this.displayTime=!1}get minutesLeftOnLoan(){let e=Math.round(this.secondsLeftOnLoan);return e=Math.ceil(e/60),e<10?e=`0:0${e}`:e===60?e="1:00":e=`0:${e}`,e}get remainingTime(){const e="minute",t=this.minutesLeftOnLoan;return t!==1?`${t} ${e}s`:`${t} ${e}`}render(){const e=this.displayTime?"view":"hide";return w`
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
    `}static get styles(){return p`
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
    `}}window.customElements.define("timer-countdown",zo);window.IALendingIntervals={tokenPoller:0,timerCountdown:0,browseExpireTimeout:0,clearTokenPoller:()=>{window.clearInterval(window.IALendingIntervals.tokenPoller),window.IALendingIntervals.tokenPoller=0},clearTimerCountdown:()=>{window.clearInterval(window.IALendingIntervals.timerCountdown),window.IALendingIntervals.timerCountdown=0},clearBrowseExpireTimeout:()=>{window.clearTimeout(window.IALendingIntervals.browseExpireTimeout),window.IALendingIntervals.browseExpireTimeout=0},clearAll:()=>{var n,e,t;(n=window==null?void 0:window.IALendingIntervals)==null||n.clearTokenPoller(),(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTimerCountdown(),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearBrowseExpireTimeout()}};class Wo{constructor(e,t,i={},s){this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=s,this.printDisabilityLink="/details/printdisabled?tab=about",this.analyticsCategories=G,this.analyticsActions=te}firstBrowseConfig(){return{id:"browseBook",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.browse}}}browseAgainConfig(){return{id:"browseBookAgain",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.browse,action:this.analyticsActions.browseAgain}}}returnBookConfig(){const e=this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.borrow;return{id:"returnNow",text:"Return now",className:"danger",analyticsEvent:{category:e,action:this.analyticsActions.doneBorrowing},borrowType:this.lendingStatus.user_has_browsed?"browse":"borrow"}}borrowBookConfig(e=!1){return!this.lendingStatus.available_to_borrow&&!this.lendingStatus.user_is_printdisabled||this.lendingStatus.user_has_borrowed?null:{id:"borrowBook",text:"Borrow for 14 days",className:"primary",disabled:e,analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.preview,action:this.analyticsActions.borrow}}}loginAndBorrowBookConfig(){return{id:"loginAndBorrow",text:"Log In and Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}leaveWaitlistConfig(){return{id:"leaveWaitlist",text:"Leave Waitlist",className:"dark",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistLeave}}}loginAndWaitlistConfig(){return{id:"loginAndWaitlist",text:"Log In and Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}waitlistConfig(){const e=!!this.userid,t=this.lendingStatus||{};return!t.available_to_waitlist||t.available_to_borrow?null:e?{id:"joinWaitlist",text:"Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistJoin}}:this.loginAndWaitlistConfig()}purchaseConfig(){return this.bwbPurchaseUrl?{id:"purchaseBook",text:"Purchase at ",subText:"Better World Books",title:"Purchase",url:this.bwbPurchaseUrl,target:"_blank",className:"purchase dark",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.purchase}}:null}printDisabilityConfig(){return this.lendingStatus.user_is_printdisabled?null:{id:"printDisability",text:"Print Disability Access",title:"Print Disability Access",url:this.printDisabilityLink,target:"_self",className:"print-disability",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.printDisability}}}adminAccessConfig(){return this.lendingStatus.user_has_borrowed||!this.lendingStatus.isAdmin?null:{id:"adminAccess",text:"Admin Access",title:"You have administrative privileges to read this book",className:"danger",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.borrow}}}adminOrPrintDisabledExitConfig(){const t=`\u2190 Exit ${C.getQueryParam("admin")==="1"?"admin":"print-disabled"} access mode`;return{id:"exitAdminAccess",text:t,url:C.getBackHref(),target:"_self",className:"exit-admin",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.doneBorrowing}}}unavailableBookConfig(){return{id:"borrowUnavailable",text:"Borrow Unavailable",className:"primary unavailable",disabled:!0,analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.unavailable}}}isEmbed(e){return{primaryTitle:`<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${e}</a>`,primaryActions:[],primaryColor:""}}}const A={available_1hr:"Renews automatically with continued use.",available_14d:"This book can be borrowed for 14 days.",available_pd:"Book available to patrons with print disabilities.",available_waitlist:"A waitlist is available.",admin_access:"You have administrative privileges to read this book.",claim_waitlist:"You are at the top of the waitlist for this book.",being_borrowed:"Another patron is using this book. Please check back later.",eligible_pd:"You are eligible for print-disabled access.",on_waitlist:"You are on the waitlist for this book.",session_expired:"Renews automatically with continued use.",unavailable:"This book is not available at this time."};class jo{constructor(e,t,i,s){this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=s,this.analyticsCategories=G,this.analyticsActions=te,this.actionsConfig=new Wo(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl)}onlyAdminAction(){return{primaryTitle:A.admin_access,primaryActions:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}adminOrPrintDisabledReadingAction(){return{primaryTitle:"",primaryActions:[],secondaryActions:[this.actionsConfig.adminOrPrintDisabledExitConfig()],borrowType:"adminBorrowed"}}patronIsReadingAction(){const e=this.lendingStatus||{},t=e.loanCount>=e.maxLoans;let i="",s=e.user_has_browsed&&!e.browsingExpired;return s?i=A.available_1hr:i=`Your loan of this book has ${e.daysLeftOnLoan} days left.`,{primaryTitle:i,primaryActions:[this.actionsConfig.returnBookConfig(),this.actionsConfig.borrowBookConfig(t),this.actionsConfig.waitlistConfig(),this.actionsConfig.printDisabilityConfig()],primaryColor:"danger",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()],borrowType:s?"browsed":"borrowed"}}claimWaitlistAction(){const e=this.lendingStatus||{},t=this.actionsConfig.leaveWaitlistConfig(),i=this.actionsConfig.borrowBookConfig(),s=e.available_to_browse?this.actionsConfig.firstBrowseConfig():null;let o=[i];return s&&o.push(s),o.push(t),{primaryTitle:A.claim_waitlist,primaryActions:o,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowPrintDisabledAction(){return{primaryTitle:A.eligible_pd,primaryActions:[this.actionsConfig.borrowBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}onlyPrintDisabledAction(){const e=this.lendingStatus.isAdmin?[]:this.actionsConfig.unavailableBookConfig();return{primaryTitle:A.available_pd,primaryActions:[e],primaryColor:"primary",secondaryActions:[]}}onWaitlistAction(){return{primaryTitle:A.on_waitlist,primaryActions:[this.actionsConfig.leaveWaitlistConfig(),this.actionsConfig.firstBrowseConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}restrictedAction(){const e=this.lendingStatus||{};return{primaryTitle:e.max_browsable_copies&&!e.available_lendable_copies?A.being_borrowed:A.unavailable,primaryActions:[this.actionsConfig.unavailableBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}loggedOutOptions(){const e=this.lendingStatus||{},t=!e.available_to_waitlist&&!e.available_to_borrow,i=this.actionsConfig.waitlistConfig();let s=null;e.available_to_borrow||e.available_to_browse?s=this.actionsConfig.loginAndBorrowBookConfig():t&&(s=this.actionsConfig.unavailableBookConfig());const o=this.actionsConfig.printDisabilityConfig(),r=[s,i,o].filter(a=>a!==null);return{primaryTitle:e.available_to_browse?A.available_1hr:e.available_to_borrow?A.available_14d:A.unavailable,primaryActions:r,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrow1HrAction(){const e=this.lendingStatus||{},t=!e.available_to_browse&&e.browsingExpired,i=e.available_to_browse||t,s=i&&e.available_to_borrow,o=i&&!e.available_to_borrow&&e.available_to_waitlist,r=i&&!e.available_to_borrow&&!e.available_to_waitlist,l=e.available_browsable_copies<1&&e.available_browsable_copies<e.max_browsable_copies,a=t?A.session_expired:!i&&l?A.being_borrowed:!i&&e.available_to_waitlist?A.available_waitlist:A.available_1hr,c=t?this.actionsConfig.browseAgainConfig():this.actionsConfig.firstBrowseConfig(),d=this.actionsConfig.borrowBookConfig(),h=this.actionsConfig.waitlistConfig(),u=this.actionsConfig.printDisabilityConfig();return{primaryTitle:a,primaryActions:r?[c,u]:s?[c,d,u]:o?[c,h,u]:[],primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowAction(){const e=this.lendingStatus||{};if(!!!this.userid)return this.loggedOutOptions();if(e.available_to_browse||e.browsingExpired)return this.borrow1HrAction();let i=null;const s=this.actionsConfig.waitlistConfig(),o=this.actionsConfig.printDisabilityConfig(),r=e.loanCount>=e.maxLoans;!e.available_to_borrow&&!s?i=this.actionsConfig.unavailableBookConfig():e.available_to_borrow&&(i=this.actionsConfig.borrowBookConfig(r));const a=[i,s,o].filter(function(c){return c!==null});return{primaryTitle:s?A.being_borrowed:"",primaryActions:a,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}getBrowseCountdownTitle(){const e=this.lendingStatus.secondsLeftOnLoan;var t=new Date(+new Date+e*1e3),i=t.getHours()%12,s=(""+t.getMinutes()).replace(/^(\d{1})$/,"0$1"),o=t.getHours()>11?" PM":" AM";return i===0&&(i=12),"Borrow ends at "+i+":"+s+o}getCurrentLendingActions(){let e;const t=this.lendingStatus||{},i=C.getQueryParam("admin")=="1"&&t.isAdmin,s=C.getQueryParam("access")=="1"&&t.user_is_printdisabled,o=t.user_has_borrowed||t.user_has_browsed&&!t.browsingExpired,r=!t.user_has_borrowed&&!t.user_has_browsed,l=!t.available_to_borrow&&!t.available_to_browse,a=t.is_printdisabled&&t.user_is_printdisabled,c=(t.available_to_browse||t.available_to_borrow)&&r&&!t.user_on_waitlist;return i||s?e=this.adminOrPrintDisabledReadingAction():t.isAdmin&&r&&l?e=this.onlyAdminAction():o?e=this.patronIsReadingAction():t.user_can_claim_waitlist?e=this.claimWaitlistAction():a?e=this.borrowPrintDisabledAction():c||t.browsingExpired?e=this.borrowAction():t.isPrintDisabledOnly?e=this.onlyPrintDisabledAction():t.user_on_waitlist?e=this.onWaitlistAction():e=this.restrictedAction(),e}}class Fo{constructor(e,t,i,s,o){this.identifier=e,this.borrowType=t,this.successCallback=i,this.errorCallback=s,this.pollerDelay=o,this.loanTokenInterval=void 0,this.loanAnalytics=new As,this.bookAccessed()}disconnectedCallback(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTokenPoller()}async bookAccessed(){var e;this.borrowType?(this.handleLoanTokenPoller(!0),this.borrowType!=="adminBorrowed"&&(window.IALendingIntervals.tokenPoller=setInterval(()=>{this.handleLoanTokenPoller()},this.pollerDelay*1e3))):((e=window==null?void 0:window.Sentry)==null||e.captureMessage(`${k.bookAccessed} - not borrowed`),this.disconnectedCallback())}async handleLoanTokenPoller(e=!1){const t="create_token";z({identifier:this.identifier,action:t,error:i=>{var s,o;this.errorCallback({detail:{action:t,data:i}}),(s=window==null?void 0:window.Sentry)==null||s.captureMessage(`${k.handleLoanTokenPoller} - Error: ${JSON.stringify(i)}`),(o=this.loanAnalytics)==null||o.sendEvent("LendingServiceLoanError",t,this.identifier)},success:()=>{e&&this.successCallback()}})}}class qo{constructor(e,t,i,s){this.hasPageChanged=e,this.identifier=t,this.localCache=i,this.loanRenewTimeConfig=s,this.loanRenewMessage="This book has been renewed for #time #unitsOfTime.",this.loanReturnWarning="With no action, this book will be auto-returned in #time #unitsOfTime.",this.result={texts:null,renewNow:!1,renewType:""}}handleLoanRenew(){try{return this.hasPageChanged?this.pageChanged():this.autoChecker()}catch(e){v(e)}return b}async pageChanged(){const{loanRenewAtLast:e}=this.loanRenewTimeConfig,t=new Date,i=await this.localCache.get(`${this.identifier}-loanTime`),s=this.changeTime(i,e,"sub");return s!==null&&t>=s&&(this.result={texts:this.loanRenewMessage,renewNow:!0,renewType:"auto"}),this.setPageChangedTime(),this.result}async autoChecker(){const{pageChangedInLast:e}=this.loanRenewTimeConfig,t=await this.localCache.get(`${this.identifier}-pageChangedTime`),i=this.changeTime(new Date,e,"sub");return t===void 0||t<=i?this.result={texts:this.loanReturnWarning,renewNow:!1,renewType:""}:t>=i&&(this.result={texts:"",renewNow:!0,renewType:"auto"}),this.result}async setPageChangedTime(){await this.localCache.set({key:`${this.identifier}-pageChangedTime`,value:new Date,ttl:Number(this.loanRenewTimeConfig.loanTotalTime)})}getMessageTexts(e,t){let i="minute",s=e,o=t;return o=Math.ceil(o/60),o>59&&(o=1,i="hour"),s=s==null?void 0:s.replace(/#time/,o),s==null?void 0:s.replace(/#unitsOfTime/,o!==1?`${i}s`:i)}changeTime(e,t,i){return e===void 0?null:i==="sub"?new Date(e.getTime()-t*1e3):new Date(e.getTime()+t*1e3)}}const Go={browseExpired:"IABookReader:BrowsingHasExpired"},S={iaButton:"min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;",renew:"background:#194880;width:110px;",return:"background:#d9534f;width:120px;",loaderIcon:"display:inline-block;width:20px;height:20px;margin-top:2px;color:white;--activityIndicatorLoadingRingColor:#fff;--activityIndicatorLoadingDotColor:#fff;",refresh:"background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"};class Vo extends L{static get properties(){return{userid:{type:String},identifier:{type:String},bookTitle:{type:String},lendingStatus:{type:Object},returnUrl:{type:String},width:{type:Number},bwbPurchaseUrl:{type:String},lendingBarPostInit:{type:Function,attribute:!1},barType:{type:String},sharedObserver:{attribute:!1},disableActionGroup:{type:Boolean},modal:{Object},tokenDelay:{type:Number},timerExecutionSeconds:{type:Number},localCache:{type:Object},loanRenewTimeConfig:{type:Object},loanRenewResult:{type:Object}}}constructor(){super(),this.userid="",this.identifier="",this.bookTitle="",this.returnUrl="",this.lendingStatus={},this.width=0,this.bwbPurchaseUrl="",this.lendingBarPostInit=()=>{},this.barType="action",this.sharedObserver=void 0,this.disableActionGroup=!1,this.tokenDelay=120,this.timerExecutionSeconds=30,this.postInitComplete=!1,this.primaryActions=[],this.primaryTitle="",this.primaryColor="primary",this.secondaryActions=[],this.lendingOptions={},this.borrowType=null,this.browseTimer=void 0,this.timeWhenTimerStart=void 0,this.returnNow=!1,this.loanRenewTimeConfig={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900},this.loanRenewResult={texts:"",renewNow:!1,secondsLeft:0,renewType:""}}disconnectedCallback(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearAll(),this.sentryCaptureMsg(k.disconnectedCallback),this.disconnectResizeObserver()}sentryCaptureMsg(e){var t;v(window==null?void 0:window.Sentry),(t=window==null?void 0:window.Sentry)==null||t.captureMessage(e)}firstUpdated(){this.bindLoanRenewEvents(),this.localCache=new vs({namespace:"loanRenew"}),this.sharedObserver||(this.sharedObserver=new cn,this.setupResizeObserver())}updated(e){(e.has("lendingStatus")||e.has("bwbPurchaseUrl"))&&this.setupLendingToolbarActions(),e.has("sharedObserver")&&(this.disconnectResizeObserver(),this.setupResizeObserver()),e.has("loanRenewResult")&&this.loanRenewResult.renewNow&&window.IALendingIntervals.clearAll()}handleResize(e){const{target:t}=e;if(t!==this.shadowRoot.host)return;const{contentRect:i}=e;this.width=Math.round(i.width)}disconnectResizeObserver(){var e;(e=this.sharedObserver)==null||e.removeObserver({handler:this,target:this.shadowRoot.host})}setupResizeObserver(){var e;!this.shadowRoot||(e=this.sharedObserver)==null||e.addObserver({handler:this,target:this.shadowRoot.host})}async setupLendingToolbarActions(){var i,s,o,r;this.lendingOptions=new jo(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl);const e=this.lendingOptions.getCurrentLendingActions();if(!e)return;this.primaryTitle=e.primaryTitle,this.primaryActions=(i=e.primaryActions)==null?void 0:i.filter(l=>l!=null),this.primaryColor=e.primaryColor,this.secondaryActions=(s=e.secondaryActions)==null?void 0:s.filter(l=>l!=null),this.borrowType=e.borrowType?e.borrowType:null;const t="browsingExpired"in this.lendingStatus&&((o=this.lendingStatus)==null?void 0:o.browsingExpired);if(t){v("setupLendingToolbarActions > hasExpired --- "),this.tokenPoller||this.sentryCaptureMsg(k.bookWasExpired),(r=window==null?void 0:window.IALendingIntervals)==null||r.clearAll(),this.dispatchEvent(new Event(Go.browseExpired,{bubbles:!0,cancelable:!1,composed:!0}));return}if(this.borrowType==="browsed"&&(await this.startTimerCountdown(),await this.startBrowseTimer()),!this.borrowType||this.barType==="title"){this.lendingBarPostInit();return}setTimeout(()=>{!t&&!window.IALendingIntervals.tokenPoller&&this.startLoanTokenPoller()},100),this.requestUpdate()}bindLoanRenewEvents(){window.addEventListener("BookReader:userAction",()=>{v("IABookActions:BookReader:userAction"),this.borrowType==="browsed"&&this.autoLoanRenewChecker(!0)}),document.addEventListener("visibilitychange",async()=>{if(!document.hidden&&(v("visibilitychange event execute:------------------ ",new Date().getMinutes(),new Date().getSeconds(),this.borrowType),this.borrowType==="browsed"&&this.lendingStatus.browsingExpired===!1)){const e=await this.localCache.get(`${this.identifier}-loanTime`),t=Math.round((e-new Date)/1e3);t>=this.timerExecutionSeconds?this.loanStatusCheckInterval(Number(t)):(this.browseHasExpired(),this.disconnectedCallback())}})}async autoLoanRenewChecker(e=!1){this.loanRenewHelper=new qo(e,this.identifier,this.localCache,this.loanRenewTimeConfig),await this.loanRenewHelper.handleLoanRenew(),this.loanRenewResult=this.loanRenewHelper.result}get modal(){const e=document.body.querySelector("modal-manager");return e==null||e.setAttribute("id","action-bar-modal"),e}async showWarningModal(){var s,o,r;v("****** showWarningModal ******"),this.modal.customModalContent=b,(s=this.modal)==null||s.closeModal(),this.loanRenewResult={texts:"",renewNow:!1};let{secondsLeft:e}=this.loanRenewResult;e===void 0?e=this.lendingStatus.secondsLeftOnLoan:e=e>60?e:60;const t=new j({headline:"Are you still reading?",headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:(o=this.loanRenewHelper)==null?void 0:o.getMessageTexts(this.loanRenewResult.texts,e)}),i=w`<br />
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;justify-content:center;"
      >
        <button
          style="${S.iaButton} ${S.renew}"
          @click=${()=>this.patronWantsToRenewBook()}
        >
          Keep reading
        </button>
        <button
          style="${S.iaButton} ${S.return}"
          @click=${()=>this.patronWantsToReturnBook()}
        >
          Return the book
        </button>
      </div> `;this.modal.setAttribute("aria-live","assertive"),await((r=this.modal)==null?void 0:r.showModal({config:t,customModalContent:i}))}async showWarningDisabledModal(e="renewBook"){var o,r;let{secondsLeft:t}=this.loanRenewResult;t===void 0?t=this.lendingStatus.secondsLeftOnLoan:t=t>60?t:60;const i=new j({headline:"Are you still reading?",headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:(o=this.loanRenewHelper)==null?void 0:o.getMessageTexts(this.loanRenewResult.texts,t)}),s=w`<br />
      <div
        id="disabled-book-action-bar-custom-buttons"
        style="display:flex;justify-content:center; opacity:0.8; pointer-events:none;"
      >
        <button
          disabled
          style="${S.iaButton} ${S.renew}"
        >
          ${e==="renewBook"?w`<ia-activity-indicator
                mode="processing"
                style=${S.loaderIcon}
              ></ia-activity-indicator>`:"Keep reading"}
        </button>
        <span
          style="position: absolute; visibility: none; height: 1px; width: 1px; overflow: hidden;"
          >Renewing loan, one moment please.</span
        >
        <button
          disabled
          style="${S.iaButton} ${S.return}"
        >
          ${e==="returnBook"?w`<ia-activity-indicator
                mode="processing"
                style=${S.loaderIcon}
              ></ia-activity-indicator>`:"Return the book"}
        </button>
      </div> `;await((r=this.modal)==null?void 0:r.showModal({config:i,customModalContent:s}))}async patronWantsToRenewBook(){this.showWarningDisabledModal(),this.loanRenewResult={texts:"",renewNow:!0,renewType:"manual"}}async patronWantsToReturnBook(){this.showWarningDisabledModal("returnBook"),document.querySelector("ia-book-actions").disableActionGroup=!0,this.returnNow=!0}async showExpiredModal(){var i;const e=new j({headline:"",showCloseButton:!1,closeOnBackdropClick:!1,headerColor:"#194880",message:"This book has been returned due to inactivity."}),t=w`<br />
      <div style="text-align: center">
        <button
          style="${S.iaButton} ${S.renew}"
          @click=${()=>{C.goToUrl(this.returnUrl,!0)}}
        >
          Okay
        </button>
      </div> `;await((i=this.modal)==null?void 0:i.showModal({config:e,customModalContent:t}))}async browseHasExpired(){var t;v("BrowseHasExpired ---"),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearAll();const e={...this.lendingStatus,browsingExpired:!0,secondsLeftOnLoan:0};this.lendingStatus=e,await this.localCache.delete(`${this.identifier}-loanTime`),await this.localCache.delete(`${this.identifier}-pageChangedTime`),this.loanRenewResult.renewNow=!1,this.loanRenewResult.texts="This book has been returned due to inactivity.",await this.showExpiredModal(),this.sentryCaptureMsg(k.browseHasExpired)}async startBrowseTimer(){var s;(s=window==null?void 0:window.IALendingIntervals)==null||s.clearBrowseExpireTimeout();const{browsingExpired:e,user_has_browsed:t,secondsLeftOnLoan:i}=this.lendingStatus;if(!t||e){v("startBrowseTimer --- !user_has_browsed || browsingExpired",{user_has_browsed:t,browsingExpired:e,secondsLeftOnLoan:i});return}window.IALendingIntervals.browseExpireTimeout=setTimeout(()=>{v("startBrowseTimer > browseExpireTimeout --- will expire loan",i),this.browseHasExpired()},i*1e3)}render(){return this.barType==="title"?w`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`:w`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`}get bookTitleBar(){return w`<book-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></book-title-bar>`}get timerCountdownEl(){return this.shadowRoot.querySelector("timer-countdown")}get bookActionBar(){return w`
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
    `}async handleLoanAutoRenewed({detail:e}){var s,o,r;const t=(s=e==null?void 0:e.data)==null?void 0:s.loan,i=`Whoops, seems we hit a hiccup with renewing this book. Please refresh & retry. --- (Debug: ${(o=e==null?void 0:e.data)==null?void 0:o.error})`;if(!t){this.showErrorModal(i,"handleLoanAutoRenewed");return}if(this.loanRenewResult.renewNow){const l=await this.localCache.get(`${this.identifier}-loanTime`),a=Math.round((l-new Date)/1e3);v(l,a),v("IABookActions: handleLoanAutoRenewed --- ",{ajaxResponse:e==null?void 0:e.data,loanRenewResult:this.loanRenewResult,secondsLeftOnLoan:a});const c={...this.lendingStatus,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:a};this.lendingStatus=c,(r=this.modal)==null||r.closeModal(),this.modal.removeAttribute("id"),this.modal.customModalContent=b,this.sentryCaptureMsg(k.bookHasRenewed)}}async startTimerCountdown(){var t;(t=window==null?void 0:window.IALendingIntervals)==null||t.clearTimerCountdown();const e=Number(this.lendingStatus.secondsLeftOnLoan);this.timeWhenTimerStart=new Date,window.IALendingIntervals.timerCountdown=setInterval(async()=>{await this.loanStatusCheckInterval(e)},this.timerExecutionSeconds*1e3)}async loanStatusCheckInterval(e){let t=e;t-=this.timerExecutionSeconds,t=Math.round(t);const i=await this.reSyncTimerIfGoneOff(t);i.hasSynced&&(t=i.whatShouldLeft,v("startTimerCountdown --- stale, timer has resyncd",{secondsLeft:t})),v("startTimerCountdown --- countdown still valid. continue...",{resyncd:i,secondsLeft:t,loanRenewAtLast:this.loanRenewTimeConfig.loanRenewAtLast},"time: ",new Date().getMinutes(),":",new Date().getSeconds(),", timerDelay: ",this.timerExecutionSeconds),t<=this.loanRenewTimeConfig.loanRenewAtLast&&await this.loanRenewAttempt(t),t<=this.timerExecutionSeconds&&(this.disconnectedCallback(),this.sentryCaptureMsg(k.clearOneHourTimer))}async reSyncTimerIfGoneOff(e){const t=new Date,i=t.getTime()/1e3-this.timeWhenTimerStart.getTime()/1e3,s=this.lendingStatus.secondsLeftOnLoan-i;v("currentTime: ",t),v("timeWhenTimerStart: ",this.timeWhenTimerStart),v("diffInSeconds: ",i),v("secondsShouldLeft: ",s),v("this.lendingStatus.secondsLeftOnLoan: ",this.lendingStatus.secondsLeftOnLoan);const o=Math.round(e),r=Math.round(s),l=this.timerCountdownEl.secondsLeftOnLoan||0;if(v("reSyncTimerIfGoneOff?",{whatIsleft:o,whatShouldLeft:r,timerElSeconds:l,timeLeftInMin:Math.ceil(e/60)}),l!==r||o!==r){const a={...this.lendingStatus,secondsLeftOnLoan:r};this.lendingStatus=a}return o!==r?(v("reSyncTimerIfGoneOff --- let's re-sync."),{hasSynced:!0,whatShouldLeft:r}):{hasSynced:!1,whatShouldLeft:r}}async loanRenewAttempt(e){v("loanRenewAttempt ---",{secondsLeft:e,loanRenewResult:this.loanRenewResult});let t=e;if(t<50){v("loanRenewAttempt --- loanSecondsLeft < 50, will expire"),await this.browseHasExpired();return}await this.autoLoanRenewChecker(!1),this.loanRenewResult.renewNow===!1&&(t-=60,this.loanRenewResult.secondsLeft=t,this.showWarningModal())}startLoanTokenPoller(){const e=()=>{this.postInitComplete||this.lendingBarPostInit(),this.postInitComplete=!0},t=i=>{this.handleLendingActionError(i)};this.tokenPoller=new Fo(this.identifier,this.borrowType,e,t,this.tokenDelay)}handleToggleActionGroup(){this.disableActionGroup=!this.disableActionGroup}handleLendingActionError(e){var s,o,r,l;this.disableActionGroup=!1,(s=window==null?void 0:window.IALendingIntervals)==null||s.clearAll();const t=(o=e==null?void 0:e.detail)==null?void 0:o.action,i=(l=(r=e==null?void 0:e.detail)==null?void 0:r.data)==null?void 0:l.error;if(i&&t!=="create_token"&&this.showErrorModal(i,t),t==="create_token"){const a={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0};this.lendingStatus=a}if(i&&i.match(/not available to borrow/gm)){let a=this.lendingStatus;t==="browse_book"?a={...this.lendingStatus,available_to_browse:!1}:t==="borrow_book"&&(a={...this.lendingStatus,available_to_borrow:!1}),this.lendingStatus=a}}async showErrorModal(e,t){var s;const i=new j({title:"Lending error",message:e,headerColor:"#d9534f",showCloseButton:!0});if(t==="create_token"){const o=w`<button
        style="${S.refresh}"
        @click=${()=>window.location.reload(!0)}
      >
        refresh
      </button>`;i.message=w` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${o} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this.identifier}"
          >info@archive.org</a
        ><br /><br />
        <code>errorLog: ${e}</code>`}await((s=this.modal)==null?void 0:s.showModal({config:i}))}get iconClass(){return this.width<=Bi?"mobile":"desktop"}get textClass(){return this.width>=Bi?"visible":"hidden"}get infoIconTemplate(){return w`<info-icon iconClass=${this.iconClass}></info-icon>`}get textGroupTemplate(){return this.primaryTitle?w`<text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </text-group>`:b}get hasAdminAccess(){return!this.lendingStatus.userHasBorrowed&&this.lendingStatus.isAdmin}static get styles(){return p`
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
    `}}window.customElements.define("ia-book-actions",Vo);const Xe={active_borrows:0,active_browses:0,available_borrowable_copies:0,available_browsable_copies:1,available_lendable_copies:1,available_to_borrow:!1,available_to_browse:!1,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!1,is_readable:!1,last_borrow:null,last_browse:null,last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:null,orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:0,user_loan_record:[],user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",browsingExpired:!1,daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!0,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:0,loanRecord:[],loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:10,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!1,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},Ko={active_borrows:0,active_browses:1,available_borrowable_copies:0,available_browsable_copies:0,available_lendable_copies:0,available_to_borrow:!0,available_to_browse:!0,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!0,is_readable:!1,last_borrow:null,last_browse:"2021-07-30 09:57:40",last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:"2021-07-30 10:57:40",orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:1,user_loan_record:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!1,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:1,loanId:"1ca15f92d07dfdae3f7b1516084aec5d603800b8",loanRecord:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},loanStartDate:"2021-07-30 09:57:40",loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:0,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!0,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},Pt=new vs({namespace:"loanRenew",defaultTTL:1*60}),Zo="@neeraj-archive",Ot="naturalhistoryof00unse_4111";let Ct="https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863";const xs=new j;xs.headerColor="#d9534f";let Jo=function(){setTimeout(function(){},100)},f=document.querySelector("ia-book-actions");f.userid=Zo;f.identifier=Ot;f.bookTitle="Contemporary Black biography. Volume 39 : profiles from the interContemporary Black biography. Volume 39";f.lendingStatus=Ko;f.bwbPurchaseUrl="";f.modalConfig=xs;f.lendingBarPostInit=Jo;f.tokenDelay=10;f.timerExecutionSeconds=3;f.returnUrl="";f.localCache=Pt;let Rs={loanTotalTime:120,loanRenewAtLast:110,pageChangedInLast:30},Yo={loanTotalTime:300,loanRenewAtLast:240,pageChangedInLast:60},Xo={loanTotalTime:600,loanRenewAtLast:480,pageChangedInLast:120},Qo={loanTotalTime:1800,loanRenewAtLast:1500,pageChangedInLast:600},er={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900};f.loanRenewTimeConfig=Rs;let tr=new URLSearchParams(document.location.search);switch(tr.get("timer")){case"5":f.loanRenewTimeConfig=Yo;break;case"10":f.loanRenewTimeConfig=Xo;break;case"30":f.loanRenewTimeConfig=Qo;break;case"60":f.loanRenewTimeConfig=er;break;default:f.loanRenewTimeConfig=Rs;break}let m=f.lendingStatus,ir=f.loanRenewTimeConfig.loanTotalTime;document.querySelectorAll(".titleBar input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?f.barType="title":f.barType="action"})});document.querySelectorAll(".searchParam input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("q","test")):(i="",t.delete("q")),history.pushState){var s=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:s},"",s)}})});document.querySelectorAll(".errorEnable input[type=checkbox]").forEach(n=>{window.location.href.indexOf("?error=true")!==-1&&(n.checked=!0),n.addEventListener("click",e=>{var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("error",!0)):(i="",t.delete("error")),history.pushState){var s=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:s},"",s)}})});document.querySelectorAll(".userState input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?(e.target.value==="isAdmin"&&(m.isAdmin=!0),e.target.value==="isLoggedIn"&&(f.userid="@neeraj")):(e.target.value==="isAdmin"&&(m.isAdmin=!1),e.target.value==="isLoggedIn"&&(f.userid=""));let t={...Xe,...m};f.lendingStatus=t})});document.querySelectorAll(".printDisabled input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?(e.target.value==="is_printdisabled"&&(m.is_printdisabled=!0),e.target.value==="user_is_printdisabled"&&(m.user_is_printdisabled=!0)):(e.target.value==="is_printdisabled"&&(m.is_printdisabled=!1),e.target.value==="user_is_printdisabled"&&(m.user_is_printdisabled=!1));let t={...Xe,...m};f.lendingStatus=t})});document.querySelectorAll(".availableToBrowse input[type=radio]").forEach(n=>{n.addEventListener("click",async e=>{if(e.target.value==="user_has_browsed"){m.user_has_browsed=!0,m.available_to_browse=!1,m.secondsLeftOnLoan=ir,m.browsingExpired=!1;const t=new Date(new Date().getTime()+f.loanRenewTimeConfig.loanTotalTime*1e3);try{await Pt.set({key:`${Ot}-loanTime`,value:t,ttl:Number(f.loanRenewTimeConfig.loanTotalTime)}),await Pt.delete(`${Ot}-pageChangedTime`)}catch{}}else e.target.value==="browsingExpired"?(m.user_has_browsed=!0,m.available_to_browse=!1,m.secondsLeftOnLoan=0,m.browsingExpired=!0):e.target.value==="available_to_browse"&&(m.available_to_browse=!0,m.user_has_browsed=!1);setTimeout(()=>{let t={...Xe,...m};f.lendingStatus=t},10)})});document.querySelector("#show_warning_modal").addEventListener("click",async()=>{if(!f.lendingStatus.user_has_browsed){const n={...f.lendingStatus,user_has_browsed:!0};f.lendingStatus=n,await f.updateComplete}f.showWarningModal(),f.lendingStatus.user_has_browsed&&f.showWarningModal()});document.querySelector("#show_expired_modal").addEventListener("click",async()=>{if(!f.lendingStatus.user_has_browsed){const n={...f.lendingStatus,user_has_browsed:!0};f.lendingStatus=n,await f.updateComplete}await new Promise(n=>setTimeout(n,5e3)),f.browseHasExpired()});document.querySelector("#resync_timer").addEventListener("click",async n=>{f.lendingStatus.user_has_browsed&&document.querySelector("ia-book-actions").dispatchEvent(new Event("visibilitychange",{detail:{},bubbles:!0,composed:!0})),await new Promise(e=>setTimeout(e,5e3))});document.querySelectorAll(".availableToBorrow input[type=radio]").forEach(n=>{n.addEventListener("click",e=>{e.target.value==="available_to_borrow"?(m.available_to_borrow=!0,m.user_on_waitlist=!1,m.available_to_waitlist=!1,m.user_has_borrowed=!1):e.target.value==="user_can_claim_waitlist"?(m.available_to_borrow=!0,m.user_on_waitlist=!0,m.user_can_claim_waitlist=!0,m.user_has_borrowed=!1,m.available_to_waitlist=!1):e.target.value==="user_on_waitlist"?(m.available_to_borrow=!1,m.user_on_waitlist=!0,m.available_to_waitlist=!1,m.user_has_borrowed=!1):e.target.value==="available_to_waitlist"?(m.available_to_borrow=!1,m.user_on_waitlist=!1,m.available_to_waitlist=!0,m.user_has_borrowed=!1):e.target.value==="user_has_borrowed"&&(m.available_to_borrow=!1,m.user_on_waitlist=!1,m.available_to_waitlist=!1,m.user_has_borrowed=!0);let t={...Xe,...m};f.lendingStatus=t})});document.querySelectorAll(".purchase input[type=checkbox]").forEach(n=>{n.addEventListener("click",e=>{e.target.checked?Ct="https://www.google.com":Ct="",f.bwbPurchaseUrl=Ct})});document.querySelector(".pageChangedEvent").addEventListener("click",()=>{document.querySelector("ia-book-actions").dispatchEvent(new CustomEvent("BookReader:userAction",{detail:{},bubbles:!0,composed:!0}))});window.addEventListener("IABookReader:BrowsingHasExpired",()=>{console.log("IABookReader:BrowsingHasExpired EVENT FIRED")});
