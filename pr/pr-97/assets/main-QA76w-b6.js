(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=globalThis,Ne=ge.ShadowRoot&&(ge.ShadyCSS===void 0||ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,De=Symbol(),Ke=new WeakMap;let ut=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==De)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ne&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ke.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ke.set(t,e))}return e}toString(){return this.cssText}};const $t=o=>new ut(typeof o=="string"?o:o+"",void 0,De),c=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((i,n,s)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+o[s+1],o[0]);return new ut(t,o,De)},kt=(o,e)=>{if(Ne)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),n=ge.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,o.appendChild(i)}},Ze=Ne?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return $t(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Tt,defineProperty:xt,getOwnPropertyDescriptor:St,getOwnPropertyNames:Et,getOwnPropertySymbols:Bt,getPrototypeOf:Rt}=Object,O=globalThis,Ve=O.trustedTypes,It=Ve?Ve.emptyScript:"",Ce=O.reactiveElementPolyfillSupport,ie=(o,e)=>o,we={toAttribute(o,e){switch(e){case Boolean:o=o?It:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},He=(o,e)=>!Tt(o,e),Je={attribute:!0,type:String,converter:we,reflect:!1,useDefault:!1,hasChanged:He};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),O.litPropertyMetadata??(O.litPropertyMetadata=new WeakMap);let Z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Je){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&xt(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=St(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:n,set(r){const a=n==null?void 0:n.call(this);s==null||s.call(this,r),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Je}static _$Ei(){if(this.hasOwnProperty(ie("elementProperties")))return;const e=Rt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ie("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ie("properties"))){const t=this.properties,i=[...Et(t),...Bt(t)];for(const n of i)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(Ze(n))}else e!==void 0&&t.push(Ze(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var s;const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const r=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:we).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){var s,r;const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const a=i.getPropertyOptions(n),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)==null?void 0:s.fromAttribute)!==void 0?a.converter:we;this._$Em=n;const h=l.fromAttribute(t,a.type);this[n]=h??((r=this._$Ej)==null?void 0:r.get(n))??h,this._$Em=null}}requestUpdate(e,t,i,n=!1,s){var r;if(e!==void 0){const a=this.constructor;if(n===!1&&(s=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??He)(s,t)||i.useDefault&&i.reflect&&s===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:a}=r,l=this[s];a!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,r,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(n=>{var s;return(s=n.hostUpdate)==null?void 0:s.call(n)}),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[ie("elementProperties")]=new Map,Z[ie("finalized")]=new Map,Ce==null||Ce({ReactiveElement:Z}),(O.reactiveElementVersions??(O.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oe=globalThis,Ye=o=>o,be=oe.trustedTypes,Xe=be?be.createPolicy("lit-html",{createHTML:o=>o}):void 0,pt="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+I,Pt=`<${gt}>`,j=document,ne=()=>j.createComment(""),se=o=>o===null||typeof o!="object"&&typeof o!="function",Ue=Array.isArray,Ot=o=>Ue(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Le=`[ 	
\f\r]`,ee=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qe=/-->/g,et=/>/g,D=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tt=/'/g,it=/"/g,ft=/^(?:script|style|textarea|title)$/i,Mt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),d=Mt(1),G=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ot=new WeakMap,U=j.createTreeWalker(j,129);function wt(o,e){if(!Ue(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xe!==void 0?Xe.createHTML(e):e}const Nt=(o,e)=>{const t=o.length-1,i=[];let n,s=e===2?"<svg>":e===3?"<math>":"",r=ee;for(let a=0;a<t;a++){const l=o[a];let h,w,g=-1,_=0;for(;_<l.length&&(r.lastIndex=_,w=r.exec(l),w!==null);)_=r.lastIndex,r===ee?w[1]==="!--"?r=Qe:w[1]!==void 0?r=et:w[2]!==void 0?(ft.test(w[2])&&(n=RegExp("</"+w[2],"g")),r=D):w[3]!==void 0&&(r=D):r===D?w[0]===">"?(r=n??ee,g=-1):w[1]===void 0?g=-2:(g=r.lastIndex-w[2].length,h=w[1],r=w[3]===void 0?D:w[3]==='"'?it:tt):r===it||r===tt?r=D:r===Qe||r===et?r=ee:(r=D,n=void 0);const y=r===D&&o[a+1].startsWith("/>")?" ":"";s+=r===ee?l+Pt:g>=0?(i.push(h),l.slice(0,g)+pt+l.slice(g)+I+y):l+I+(g===-2?a:y)}return[wt(o,s+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class re{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0;const a=e.length-1,l=this.parts,[h,w]=Nt(e,t);if(this.el=re.createElement(h,i),U.currentNode=this.el.content,t===2||t===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(n=U.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(const g of n.getAttributeNames())if(g.endsWith(pt)){const _=w[r++],y=n.getAttribute(g).split(I),T=/([.?@])?(.*)/.exec(_);l.push({type:1,index:s,name:T[2],strings:y,ctor:T[1]==="."?Ht:T[1]==="?"?Ut:T[1]==="@"?zt:ye}),n.removeAttribute(g)}else g.startsWith(I)&&(l.push({type:6,index:s}),n.removeAttribute(g));if(ft.test(n.tagName)){const g=n.textContent.split(I),_=g.length-1;if(_>0){n.textContent=be?be.emptyScript:"";for(let y=0;y<_;y++)n.append(g[y],ne()),U.nextNode(),l.push({type:2,index:++s});n.append(g[_],ne())}}}else if(n.nodeType===8)if(n.data===gt)l.push({type:2,index:s});else{let g=-1;for(;(g=n.data.indexOf(I,g+1))!==-1;)l.push({type:7,index:s}),g+=I.length-1}s++}}static createElement(e,t){const i=j.createElement("template");return i.innerHTML=e,i}}function J(o,e,t=o,i){var r,a;if(e===G)return e;let n=i!==void 0?(r=t._$Co)==null?void 0:r[i]:t._$Cl;const s=se(e)?void 0:e._$litDirective$;return(n==null?void 0:n.constructor)!==s&&((a=n==null?void 0:n._$AO)==null||a.call(n,!1),s===void 0?n=void 0:(n=new s(o),n._$AT(o,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=n:t._$Cl=n),n!==void 0&&(e=J(o,n._$AS(o,e.values),n,i)),e}class Dt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=((e==null?void 0:e.creationScope)??j).importNode(t,!0);U.currentNode=n;let s=U.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new de(s,s.nextSibling,this,e):l.type===1?h=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(h=new Wt(s,this,e)),this._$AV.push(h),l=i[++a]}r!==(l==null?void 0:l.index)&&(s=U.nextNode(),r++)}return U.currentNode=j,n}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class de{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),se(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==G&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ot(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&se(this._$AH)?this._$AA.nextSibling.data=e:this.T(j.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=re.createElement(wt(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===n)this._$AH.p(t);else{const r=new Dt(n,this),a=r.u(this.options);r.p(t),this.T(a),this._$AH=r}}_$AC(e){let t=ot.get(e.strings);return t===void 0&&ot.set(e.strings,t=new re(e)),t}k(e){Ue(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new de(this.O(ne()),this.O(ne()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const n=Ye(e).nextSibling;Ye(e).remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class ye{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,t=this,i,n){const s=this.strings;let r=!1;if(s===void 0)e=J(this,e,t,0),r=!se(e)||e!==this._$AH&&e!==G,r&&(this._$AH=e);else{const a=e;let l,h;for(e=s[0],l=0;l<s.length-1;l++)h=J(this,a[i+l],t,l),h===G&&(h=this._$AH[l]),r||(r=!se(h)||h!==this._$AH[l]),h===m?e=m:e!==m&&(e+=(h??"")+s[l+1]),this._$AH[l]=h}r&&!n&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ht extends ye{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class Ut extends ye{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class zt extends ye{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??m)===G)return;const i=this._$AH,n=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==m&&(i===m||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Wt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const $e=oe.litHtmlPolyfillSupport;$e==null||$e(re,de),(oe.litHtmlVersions??(oe.litHtmlVersions=[])).push("3.3.2");const Ft=(o,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let n=i._$litPart$;if(n===void 0){const s=(t==null?void 0:t.renderBefore)??null;i._$litPart$=n=new de(e.insertBefore(ne(),s),s,void 0,t??{})}return n._$AI(o),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=globalThis;let x=class extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ft(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return G}};var ht;x._$litElement$=!0,x.finalized=!0,(ht=W.litElementHydrateSupport)==null||ht.call(W,{LitElement:x});const ke=W.litElementPolyfillSupport;ke==null||ke({LitElement:x});(W.litElementVersions??(W.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt={attribute:!0,type:String,converter:we,reflect:!1,hasChanged:He},Gt=(o=jt,e,t)=>{const{kind:i,metadata:n}=t;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(t.name,o),i==="accessor"){const{name:r}=t;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,l,o,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,o,a),a}}}if(i==="setter"){const{name:r}=t;return function(a){const l=this[r];e.call(this,a),this.requestUpdate(r,l,o,!0,a)}}throw Error("Unsupported decorator location: "+i)};function u(o){return(e,t)=>typeof t=="object"?Gt(o,e,t):((i,n,s)=>{const r=n.hasOwnProperty(s);return n.constructor.createProperty(s,i),r?Object.getOwnPropertyDescriptor(n,s):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function he(o){return u({...o,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt=(o,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(o,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Kt(o,e){return(t,i,n)=>{const s=r=>{var a;return((a=r.renderRoot)==null?void 0:a.querySelector(o))??null};return qt(t,i,{get(){return s(this)}})}}class Zt{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(n=>{n.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class z{constructor(e){this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(e==null?void 0:e.headerColor)??"#55A183",this.bodyColor=(e==null?void 0:e.bodyColor)??"#fbfbfd",this.showProcessingIndicator=(e==null?void 0:e.showProcessingIndicator)??!1,this.processingImageMode=(e==null?void 0:e.processingImageMode)??"complete",this.showCloseButton=(e==null?void 0:e.showCloseButton)??!0,this.showLeftNavButton=(e==null?void 0:e.showLeftNavButton)??!1,this.leftNavButtonText=(e==null?void 0:e.leftNavButtonText)??"",this.showHeaderLogo=(e==null?void 0:e.showHeaderLogo)??!0,this.closeOnBackdropClick=(e==null?void 0:e.closeOnBackdropClick)??!0}}function R(o,e,t,i){var n=arguments.length,s=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(o,e,t,i);else for(var a=o.length-1;a>=0;a--)(r=o[a])&&(s=(n<3?r(s):n>3?r(e,t,s):r(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s}function*ze(o=document.activeElement){o!=null&&(yield o,"shadowRoot"in o&&o.shadowRoot&&o.shadowRoot.mode!=="closed"&&(yield*ze(o.shadowRoot.activeElement)))}function bt(){return[...ze()].pop()}const nt=new WeakMap;function mt(o){let e=nt.get(o);return e||(e=window.getComputedStyle(o,null),nt.set(o,e)),e}function Vt(o){if("checkVisibility"in o&&typeof o.checkVisibility=="function")return o.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=mt(o);return e.visibility!=="hidden"&&e.display!=="none"}function Jt(o){const e=mt(o),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:o.scrollHeight>o.clientHeight&&t==="auto"||o.scrollWidth>o.clientWidth&&i==="auto"}function Yt(o){const e=o.tagName.toLowerCase(),t=Number(o.getAttribute("tabindex"));return o.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||o.hasAttribute("disabled")||o.closest("[inert]")||e==="input"&&o.getAttribute("type")==="radio"&&!o.hasAttribute("checked")||!Vt(o)?!1:(e==="audio"||e==="video")&&o.hasAttribute("controls")||o.hasAttribute("tabindex")||o.hasAttribute("contenteditable")&&o.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Jt(o)}function Xt(o,e){var t;return((t=o.getRootNode({composed:!0}))==null?void 0:t.host)!==e}function st(o){const e=new WeakMap,t=[];function i(n){if(n instanceof Element){if(n.hasAttribute("inert")||n.closest("[inert]")||e.has(n))return;e.set(n,!0),!t.includes(n)&&Yt(n)&&t.push(n),n instanceof HTMLSlotElement&&Xt(n,o)&&n.assignedElements({flatten:!0}).forEach(s=>{i(s)}),n.shadowRoot!==null&&n.shadowRoot.mode==="open"&&i(n.shadowRoot)}for(const s of Array.from(n.children))i(s)}return i(o),t.sort((n,s)=>{const r=Number(n.getAttribute("tabindex"))||0;return(Number(s.getAttribute("tabindex"))||0)-r})}let te=[];class Qt{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var a;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=bt();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const n=st(this.element);let s=n.findIndex(l=>l===i);this.previousFocus=this.currentFocus;const r=this.tabDirection==="forward"?1:-1;for(;;){s+r>=n.length?s=0:s+r<0?s=n.length-1:s+=r,this.previousFocus=this.currentFocus;const l=n[s];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||l&&this.possiblyHasTabbableChildren(l))return;t.preventDefault(),this.currentFocus=l,(a=this.currentFocus)==null||a.focus({preventScroll:!1});const h=[...ze()];if(h.includes(this.currentFocus)||!h.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){te.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){te=te.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return te[te.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=st(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],n=this.tabDirection==="forward"?t:i;typeof(n==null?void 0:n.focus)=="function"&&(this.currentFocus=n,n.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}var rt;(function(o){o.processing="processing",o.complete="complete"})(rt||(rt={}));let Ie=class extends x{constructor(){super(...arguments),this.mode="processing"}render(){return d`
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
    `}static get styles(){const e=c`var(--activityIndicatorCheckmarkColor, #31A481)`,t=c`var(--activityIndicatorCompletedRingColor, #31A481)`,i=c`var(--activityIndicatorLoadingRingColor, #333333)`,n=c`var(--activityIndicatorLoadingDotColor, #333333)`;return c`
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
        fill: ${n};
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
    `}};R([u({type:String})],Ie.prototype,"mode",void 0);Ie=R([B("ia-activity-indicator")],Ie);const ei=d`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class ti extends x{static get styles(){return c`
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
    `}render(){return ei}}customElements.define("ia-icon-close",ti);const ii=d`
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
`,oi=d`
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
`;let Pe=class extends x{constructor(){super(...arguments),this.config=new z}render(){return d`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton?this.leftNavButtonTemplate:m}
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?d`<div class="logo-icon">${ii}</div>`:m}
            ${this.config.title?d`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?d`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
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
              ${this.config.headline?d` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?d` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}handleLeftNavButtonPressed(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("leftNavButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return d`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}get leftNavButtonTemplate(){return d`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${oi} ${this.config.leftNavButtonText??""}
    </button> `}static get styles(){const e=c`var(--modalLogoSize, 6.5rem)`,t=c`var(--processingImageSize, 7.5rem)`,i=c`var(--modalCornerRadius, 1rem)`,n=c`var(--modalBorder, 2px solid black)`,s=c`var(--modalBottomMargin, 2.5rem)`,r=c`var(--modalTopMargin, 5rem)`,a=c`var(--modalHeaderBottomPadding, 0.5em)`,l=c`var(--modalBottomPadding, 2rem)`,h=c`var(--modalScrollOffset, 5px)`,w=c`var(--modalTitleFontSize, 1.8rem)`,g=c`var(--modalSubtitleFontSize, 1.4rem)`,_=c`var(--modalHeadlineFontSize, 1.6rem)`,y=c`var(--modalMessageFontSize, 1.4rem)`,T=c`var(--modalTitleLineHeight, normal)`,Q=c`var(--modalSubtitleLineHeight, normal)`,M=c`var(--modalHeadlineLineHeight, normal)`,q=c`var(--modalMessageLineHeight, normal)`;return c`
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
        border: ${n};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${a};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${w};
        font-weight: bold;
        line-height: ${T};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${g};
        line-height: ${Q};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${n};
        border-top: 0;
        padding: 0 1rem calc(${l} - ${h}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${s}));
        min-height: 5rem;
        padding: 0 0 calc(${h}) 0;
      }

      .headline {
        font-size: ${_};
        font-weight: bold;
        text-align: center;
        line-height: ${M};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${y};
        line-height: ${q};
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
    `}};R([u({type:Object})],Pe.prototype,"config",void 0);Pe=R([B("modal-template")],Pe);function ni(o,e,t){var i=t||{},n=i.noTrailing,s=n===void 0?!1:n,r=i.noLeading,a=r===void 0?!1:r,l=i.debounceMode,h=l===void 0?void 0:l,w,g=!1,_=0;function y(){w&&clearTimeout(w)}function T(M){var q=M||{},N=q.upcomingOnly,Ae=N===void 0?!1:N;y(),g=!Ae}function Q(){for(var M=arguments.length,q=new Array(M),N=0;N<M;N++)q[N]=arguments[N];var Ae=this,Ge=Date.now()-_;if(g)return;function ue(){_=Date.now(),e.apply(Ae,q)}function qe(){w=void 0}!a&&h&&!w&&ue(),y(),h===void 0&&Ge>o?a?(_=Date.now(),s||(w=setTimeout(h?qe:ue,o))):ue():s!==!0&&(w=setTimeout(h?qe:ue,h===void 0?o-Ge:o))}return Q.cancel=T,Q}var P;(function(o){o.Open="open",o.Closed="closed"})(P||(P={}));class si{constructor(e){this.windowResizeThrottler=ni(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case P.Open:this.startResizeListener(),this.stopDocumentScroll();break;case P.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let Y=class extends x{constructor(){super(...arguments),this.mode=P.Closed,this.hostBridge=new si(this),this.modal=new Qt(this),this.closeOnBackdropClick=!0}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return d`
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
    `}getMode(){return this.mode}closeModal(){var e,t;this.mode=P.Closed,this.customModalContent=void 0,this.modalTemplate&&(this.modalTemplate.config=new z),this.modal.deactivate(),(t=(e=this.triggeringElement)==null?void 0:e.focus)==null||t.call(e),this.triggeringElement=void 0}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}callUserPressedLeftNavButtonCallback(){const e=this.userPressedLeftNavButtonCallback;this.userPressedLeftNavButtonCallback=void 0,e&&e()}async showModal(e){this.mode===P.Closed&&this.captureFocusedElement(),this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.userPressedLeftNavButtonCallback=e.userPressedLeftNavButtonCallback,this.customModalContent=e.customModalContent,this.mode=P.Open,this.modalTemplate&&(this.modalTemplate.config=e.config,await this.modalTemplate.updateComplete,this.modalTemplate.focus()),this.modal.activate()}captureFocusedElement(){this.triggeringElement=bt()}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=c`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=c`var(--modalBackdropZindex, 1000)`,i=c`var(--modalWidth, 32rem)`,n=c`var(--modalMaxWidth, 95%)`,s=c`var(--modalZindex, 2000)`;return c`
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
        z-index: ${s};
        width: ${i};
        max-width: ${n};
      }
    `}};R([u({type:String,reflect:!0})],Y.prototype,"mode",void 0);R([u({type:Object})],Y.prototype,"customModalContent",void 0);R([u({type:Object})],Y.prototype,"hostBridge",void 0);R([Kt("modal-template")],Y.prototype,"modalTemplate",void 0);Y=R([B("modal-manager")],Y);function X(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function ri(o,e){const t=indexedDB.open(o);t.onupgradeneeded=()=>t.result.createObjectStore(e);const i=X(t);return(n,s)=>i.then(r=>s(r.transaction(e,n).objectStore(e)))}let Te;function ve(){return Te||(Te=ri("keyval-store","keyval")),Te}function ai(o,e=ve()){return e("readonly",t=>X(t.get(o)))}function li(o,e,t=ve()){return t("readwrite",i=>(i.put(e,o),X(i.transaction)))}function ci(o,e=ve()){return e("readwrite",t=>(t.delete(o),X(t.transaction)))}function di(o,e){return o.openCursor().onsuccess=function(){this.result&&(e(this.result),this.result.continue())},X(o.transaction)}function hi(o=ve()){return o("readonly",e=>{if(e.getAllKeys)return X(e.getAllKeys());const t=[];return di(e,i=>t.push(i.key)).then(()=>t)})}function ui(o,e){return o.setMilliseconds(o.getMilliseconds()+e*1e3),o}class yt{constructor(e){var t,i,n,s;if(this.namespace=(t=e==null?void 0:e.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(i=e==null?void 0:e.defaultTTL)!==null&&i!==void 0?i:15*60,(!((n=e==null?void 0:e.immediateClean)!==null&&n!==void 0)||n)&&this.cleanExpired(),!(e!=null&&e.disableCleaning)){const r=(s=e==null?void 0:e.cleaningInterval)!==null&&s!==void 0?s:60;setInterval(()=>{this.cleanExpired()},r*1e3)}}async set(e){var t;const i={value:e.value},n=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,s=ui(new Date,n);i.expires=s;const r=this.getNamespacedKey(e.key);try{await li(r,i)}catch{}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await ai(t)}catch{}if(!i)return;const n=new Date;if(i.expires&&i.expires<n){await this.delete(e);return}return i.value}async delete(e){const t=this.getNamespacedKey(e);try{await ci(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await hi()}catch{}const t=[];for(const s of e)typeof s=="string"&&t.push(s);return t.filter(s=>s.startsWith(this.namespace)).map(s=>this.removeNamespace(s))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pi={ATTRIBUTE:1},gi=o=>(...e)=>({_$litDirective$:o,values:e});class fi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=gi(class extends fi{constructor(o){var e;if(super(o),o.type!==pi.ATTRIBUTE||o.name!=="class"||((e=o.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var i,n;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!((i=this.nt)!=null&&i.has(s))&&this.st.add(s);return this.render(e)}const t=o.element.classList;for(const s of this.st)s in e||(t.remove(s),this.st.delete(s));for(const s in e){const r=!!e[s];r===this.st.has(s)||(n=this.nt)!=null&&n.has(s)||(r?(t.add(s),this.st.add(s)):(t.remove(s),this.st.delete(s)))}return G}});class ${static isInIframe(){var e;try{return window.self!==window.top}catch(t){return(e=window==null?void 0:window.Sentry)==null||e.captureException(t),!0}}static getRedirectUrl(){return $.isInIframe()?window.top.location.href:window.location.href}static goToUrl(e,t){const i=$.isInIframe()&&t?window.top.location:window.location;i.href===e?i.reload():i.href=e}static isOnStreamPage(){return window.location.href.indexOf("/stream/")>-1}static getQueryParam(e){const i=window.location.search.substring(1).split("&");for(let n=0;n<i.length;n+=1){const s=i[n].split("=");if(s[0]===e)return s[1]}return m}static getBackHref(){return window.location.href.replace(/[?&]{1}(?:admin|access)=1/,"")}static formatUrl(e,t){return/^https?:/.test(t)?t:`${e}${t}`}}const E={disconnectedCallback:"IABookActions:disconnectedCallback",bookHasRenewed:"IABookActions:handleLoanAutoRenewed - book has renewed for next one hour",bookRenewFailed:"IABookActions:handleLoanRenewNow - failed to renew",browseHasExpired:"IABookActions:browseHasExpired - one-hour loan has been expired",bookWasExpired:"IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller",clearOneHourTimer:"IABookActions:timerCountdown - one-hour timer interval cleared",bookAccessed:"IABookActions:bookAccessed",handleLoanTokenPoller:"IABookActions:handleLoanTokenPoller",actionsHandlerService:"IABookActions:actionsHandlerService"},wi=location.hostname==="localhost"||/^(www|cat)-[a-z0-9]+\.archive\.org$/.test(location.host)||/\.code\.archive\.org$/.test(location.host)||/\.dev\.archive\.org$/.test(location.host)||/^ia-petabox-/.test(location.host)||/^internetarchive/.test(location.host),b=wi?console.log.bind(console):()=>{};async function H(o){var g,_;const e={success:()=>{},error:()=>{},...o,action:o.action??null,identifier:o.identifier??""};let t="/services/loans/loan";const i=window==null?void 0:window.location,n="loan token not found. please try again later.",s="This book is not available to borrow at this time. Please try again later.",r=["browse_book","borrow_book","create_token","renew_loan","return_loan"],a=((g=i==null?void 0:i.href)==null?void 0:g.indexOf("?error=true"))!==-1&&(i==null?void 0:i.hostname)!=="archive.org",l=["localhost","internetarchive.github.io"];let h=!1;l.includes(i.hostname)&&(h=!0,t=i.href);const w=new FormData;w.append("action",String(e.action)),w.append("identifier",e.identifier);try{await fetch(t,{method:"POST",body:w}).then(async y=>a&&r.includes(e.action)?{success:!1,error:e.action==="create_token"?n:s}:h?e.action==="renew_loan"||e.action==="return_loan"?(await new Promise(T=>setTimeout(T,5e3)),{success:!0,loan:{renewal:!0}}):{success:!0,message:"operation executed successfully!"}:y.json()).then(y=>{y!=null&&y.error?e.error(y):e.success(y)})}catch(y){(_=window==null?void 0:window.Sentry)==null||_.captureException(`${E.actionsHandlerService} - Error: ${y}`)}}const F={borrow:"BookReader-ReadingBorrow",browse:"BookReader-ReadingBrowse",preview:"BookReader-Preview",satisfactionMetric:"DetailsPage-Book",bookReaderHeader:"BookReader-Header",adminAccess:"Admin-Access"},V={browse:"Borrow-1Hour",browseAgain:"Borrow-Again",browseRenew:"BookRenew",browseReturn:"BookReturn",borrow:"Borrow-14Days",waitlistJoin:"JoinWaitlist",waitlistLeave:"LeaveWaitlist",doneBorrowing:"ReturnBook",login:"LogIn",purchase:"BWBPurchase",unavailable:"Book-Unavailable",printDisability:"Print-Disability",titleBar:"Book-Title-Bar"},pe={browseAutoRenew:"BookAutoRenew",browseAutoReturn:"BookAutoReturn",browseManualRenew:"BookManualRenew",browseManualReturn:"BookManualReturn"};function bi(o){return o&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(o).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}function fe(o,e,t,i,n,s){return document.cookie=encodeURIComponent(o)+"="+encodeURIComponent(e)+(t?`; expires=${t.toUTCString()}`:"")+(n?`; domain=${n}`:"")+`; path=${i}`,!0}class vt{constructor(){this.gaStats={},this.lendingEventCounts=null}async storeLoanStatsCount(e,t=""){this.identifier=e;try{await this.getLoanStatsCount(t),this.sendMatrixStatsEvents(t);const i=new Date;i.setHours(i.getHours()+2),fe(this.getLoanCountStorageKey,JSON.stringify(this.lendingEventCounts),i,"/")}catch(i){b(i),this.sendEvent("Cookies-Error-Actions",String(i),this.identifier)}}async getLoanStatsCount(e){var r,a,l;const t=bi(this.getLoanCountStorageKey);this.lendingEventCounts=t?JSON.parse(t):null,this.gaStats=this.lendingEventCounts??{browse:0,renew:0,expire:0};let i=((r=this.lendingEventCounts)==null?void 0:r.browse)??0,n=((a=this.lendingEventCounts)==null?void 0:a.renew)??0,s=((l=this.lendingEventCounts)==null?void 0:l.expire)??0;switch(e){case"browse":i=i?Number(i)+1:1,this.gaStats.browse=i,n=0,s=0;break;case"autorenew":n=n?Number(n)+1:1,this.gaStats.renew=n;break;case"return":s=s?Number(s)+1:1,this.gaStats.expire=s,n=0,s=0;break}this.lendingEventCounts={browse:i,renew:n,expire:s}}sendMatrixStatsEvents(e){var n,s;const t=F.browse,i=`browse${this.paddedNumber((n=this.gaStats)==null?void 0:n.browse)}-autorenew${this.paddedNumber((s=this.gaStats)==null?void 0:s.renew)}:${e}`;this.sendEvent(t,i,this.identifier)}paddedNumber(e){return e?e.toString().padStart(3,"0"):"000"}get getLoanCountStorageKey(){return`br-browse-${this.identifier}`}sendEvent(e,t,i,n){var s;b("eventCategory:-",e,"||	eventAction:-",t,"||	label:-",i,"||	extraParams:-",n),(s=window==null?void 0:window.archive_analytics)==null||s.send_event_no_sampling(e,t,i||this.identifier,n)}}class _t extends x{constructor(){super(),this.waitUntillBorrowComplete=6,this.loanAnanlytics=new vt,this.bindEvents()}bindEvents(){this.addEventListener("browseBook",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browse"))}),this.addEventListener("browseBookAgain",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browseagain"))}),this.addEventListener("autoRenew",async e=>{var n,s;const t=e.detail;this.handleLoanRenewNow(),await((n=this.loanAnanlytics)==null?void 0:n.storeLoanStatsCount(this.identifier,"autorenew"));const i=(t==null?void 0:t.renewType)==="auto"?pe.browseAutoRenew:pe.browseManualRenew;(s=this.loanAnanlytics)==null||s.sendEvent(F.browse,V.browseRenew,i,{identifier:this.identifier})}),this.addEventListener("autoReturn",async()=>{var e,t;this.handleReturnIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"autoreturn")),(t=this.loanAnanlytics)==null||t.sendEvent(F.browse,V.browseReturn,pe.browseAutoReturn,{identifier:this.identifier})}),this.addEventListener("returnNow",e=>{var i,n,s;const t=e.detail;if((t==null?void 0:t.borrowType)==="browse"&&((i=this.loanAnanlytics)==null||i.storeLoanStatsCount(this.identifier,"return"),(n=this.loanAnanlytics)==null||n.sendEvent(F.browse,V.browseReturn,pe.browseManualReturn,{identifier:this.identifier})),this.handleReturnIt("returnNow"),(t==null?void 0:t.borrowType)==="borrow"&&t.event){const{category:r,action:a}=t.event;(s=this.loanAnanlytics)==null||s.sendEvent(r,a,this.identifier)}}),this.addEventListener("borrowBook",e=>{var i;const t=e.detail;if(this.handleBorrowIt(),t!=null&&t.event){const{category:n,action:s}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(n,s,this.identifier)}}),this.addEventListener("loginAndBorrow",e=>{var i;const t=e.detail;if(this.handleLoginOk(),t!=null&&t.event){const{category:n,action:s}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(n,s,this.identifier)}}),this.addEventListener("leaveWaitlist",e=>{var i;const t=e.detail;if(this.handleRemoveFromWaitingList(),t!=null&&t.event){const{category:n,action:s}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(n,s,this.identifier)}}),this.addEventListener("joinWaitlist",e=>{var i;const t=e.detail;if(this.handleReserveIt(),t!=null&&t.event){const{category:n,action:s}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(n,s,this.identifier)}}),this.addEventListener("purchaseBook",e=>{var i;const t=e.detail;if(t!=null&&t.event){const{category:n,action:s}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(n,s,this.identifier)}}),this.addEventListener("adminAccess",e=>{var n;const t=e.detail;if(t!=null&&t.event){const{category:s,action:r}=t.event;(n=this.loanAnanlytics)==null||n.sendEvent(s,r,this.identifier)}this.setStickyAdminAccess(!0);const i=new URL(window.location.href);i.searchParams.append("admin","1"),window.location.search=i.search}),this.addEventListener("exitAdminAccess",e=>{var i;const t=e.detail;if(t!=null&&t.event){const{category:n,action:s}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(n,s,this.identifier)}this.setStickyAdminAccess(!1)}),this.addEventListener("bookTitleBar",e=>{var i;const t=e.detail;if(t!=null&&t.event){const{category:n,action:s}=t.event;(i=this.loanAnanlytics)==null||i.sendEvent(n,s,this.identifier)}})}handleBrowseIt(){const e="browse_book";this.dispatchToggleActionGroup(),H({action:e,identifier:this.identifier,success:()=>{this.setBrowseTimeSession(),this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleLoanRenewNow(){const e="renew_loan";H({action:e,identifier:this.identifier,success:t=>{var r;const i=t;b("RENEW_LOAN --- ",t,e,i==null?void 0:i.loan,this.identifier);const n=i==null?void 0:i.loan,s=n==null?void 0:n.renewal;n&&s?this.setBrowseTimeSession():(b("RENEW_LOAN ERROR --- ",{action:e,isRenewal:s,activeLoan:n,data:t,id:this.identifier}),(r=window==null?void 0:window.Sentry)==null||r.captureMessage(`${E.bookRenewFailed} - Error: ${JSON.stringify(t)}`),this.dispatchActionError(e,{data:t,error:!0,message:"Loan renewal failed: no loan active."})),this.dispatchEvent(new CustomEvent("loanAutoRenewed",{detail:{action:e,data:{...t,loan:n}}}))},error:t=>{this.dispatchActionError(e,t)}})}handleReturnIt(e=""){const t="return_loan";e==="returnNow"&&this.dispatchToggleActionGroup(),H({action:t,identifier:this.identifier,success:()=>{this.deleteLoanCookies(),e==="returnNow"&&this.returnUrl&&$.goToUrl(this.returnUrl,!0)},error:i=>{this.dispatchActionError(t,i)}})}handleBorrowIt(){const e="borrow_book";this.dispatchToggleActionGroup(),H({action:e,identifier:this.identifier,success:()=>{this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleReserveIt(){const e="join_waitlist";this.dispatchToggleActionGroup(),H({action:e,identifier:this.identifier,success:()=>{$.goToUrl($.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}handleRemoveFromWaitingList(){const e="leave_waitlist";this.dispatchToggleActionGroup(),H({action:e,identifier:this.identifier,success:()=>{$.goToUrl($.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}dispatchActionError(e,t={}){var i;(i=this.loanAnanlytics)==null||i.sendEvent("LendingServiceError",e),this.dispatchEvent(new CustomEvent("lendingActionError",{detail:{action:e,data:t}}))}dispatchToggleActionGroup(){this.dispatchEvent(new CustomEvent("toggleActionGroup"))}handleLoginOk(){const e=`/login?referer=${encodeURIComponent($.getRedirectUrl())}`;$.goToUrl(e,!0)}handleReadItNow(e){const t=new URLSearchParams(window.location.search);if(e){const r=new URLSearchParams(e);for(const[a,l]of r.entries())t.append(a,l)}const i=t.toString(),n=i?`?${i}`:"",s=window.location.origin+window.location.pathname+n;setTimeout(()=>{$.goToUrl(s,!0)},this.waitUntillBorrowComplete*1e3)}async setBrowseTimeSession(){if(this.localCache)try{const e=new Date(new Date().getTime()+(this.loanTotalTime??0)*1e3);await this.localCache.set({key:`${this.identifier}-loanTime`,value:e,ttl:Number(this.loanTotalTime??0)}),await this.localCache.delete(`${this.identifier}-pageChangedTime`)}catch(e){b(e)}}deleteLoanCookies(){const e=new Date;e.setTime(e.getTime()-24*60*60*1e3),fe(`loan-${this.identifier}=""`,"",e,"/",".archive.org"),fe(`br-loan-${this.identifier}=""`,"",e,"/",".archive.org")}setStickyAdminAccess(e){const t=window.location.hostname==="localhost"?"localhost":".archive.org";fe("sticky-admin-access",String(e),void 0,"/",t)}}const lt=c`var(--white, #fff)`,mi=c`var(--primaryDisableCTAFill, #767676)`,yi=c`var(--secondaryCTABorder, #999)`,vi=c`var(--primaryCTAFill, #194880)`,xe=c`var(--primaryCTAFillRGB, 25, 72, 128)`,_i=c`var(--primaryCTABorder, #c5d1df)`,Ai=c`var(--primaryErrorCTAFill, #d9534f)`,Se=c`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,Ci=c`var(--primaryErrorCTABorder, #d43f3a)`,Li=c`var(--secondaryCTAFill, #333)`,Ee=c`var(--secondaryCTAFillRGB, 51, 51, 51)`,$i=c`var(--primaryCTABorder, #979797)`,ki=c`#ee8950`,Ti=c`#ec7939`,xi=c`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${lt};
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
    outline-color: ${lt};
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
    background-color: ${mi};
    border: 1px solid ${yi};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${ki}
    border-color: ${Ti};
  }

  .ia-button.primary {
    background-color: ${vi};
    border-color: ${_i};
  }
  .ia-button.primary:hover {
    background-color: rgba(${xe}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${xe}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${xe}, 0.7);
  }

  .ia-button.danger {
    background-color: ${Ai};
    border-color: ${Ci};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Se}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Se}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Se}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Li};
    border-color: ${$i};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Ee}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Ee}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Ee}, 0.7);
  }
`,K=c`var(--white, #fff)`,ct=c`var(--primaryBGColor, #000)`,Si=c`var(--iaBookActionsDropdownBGColor, #2d2d2d)`,Ei=c`
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
    background-color: ${K};
    border-radius: 10px;
  }
  .action-buttons .desktop.purchase {
    margin-left: 5px;
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${K};
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
    background-color: ${ct};
    border: 1px solid ${K};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    background: ${Si};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${ct};
    list-style: none;
    height: 3rem;
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${K};
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
    background: ${K};
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
    background-color: ${K};
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
`,dt=700,Bi=800,Ri=d`<svg
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
</svg>`,Ii=d`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
    fill="#fff"
  />
</svg>`,Be=d`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill="#fff"
  />
</svg>`;var Pi=Object.defineProperty,Oi=Object.getOwnPropertyDescriptor,k=(o,e,t,i)=>{for(var n=i>1?void 0:i?Oi(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(n=(i?r(e,t,n):r(n))||n);return i&&n&&Pi(e,t,n),n};let C=class extends _t{constructor(){super(...arguments),this.userid="",this.identifier="",this.primaryActions=[],this.secondaryActions=[],this.primaryColor="",this.dropdownState="close",this.width=0,this.hasAdminAccess=!1,this.dropdownArrow=Be,this.disabled=!1,this.returnUrl="",this.autoRenew=!1,this.loanRenewType="",this.autoReturn=!1,this.returnNow=!1,this.initialButton=!1,this.title="",this.loaderIcon="https://archive.org/upload/images/tree/loading.gif"}updated(o){(o.has("width")||o.has("disabled"))&&this.isBelowTabletContainer&&this.resetActions(),o.has("autoRenew")&&this.autoRenew&&this.dispatchLoanEvent("autoRenew",{renewType:this.loanRenewType});const e=o.has("autoReturn")&&this.autoReturn;e&&this.dispatchLoanEvent("autoReturn"),o.has("returnNow")&&this.returnNow&&!e&&this.dispatchLoanEvent("returnNow",{borrowType:"browse"})}dispatchLoanEvent(o,e){this.dispatchEvent(new CustomEvent(o,{detail:e}))}resetActions(){this.primaryActions.length&&(this.primaryActions=this.primaryActions.concat(this.secondaryActions),this.primaryColor=this.primaryActions[0].className,this.hasAdminAccess&&this.sortActionButtonOrder(),this.secondaryActions=[])}sortActionButtonOrder(){let o=1;const e=0;this.secondaryActions.length===2&&(o=2),o=this.primaryActions.length-o;const t=this.primaryActions[o],i=this.primaryActions;i.splice(o,1),i.splice(e,0,t),this.primaryActions=i}render(){return d`
      <div
        class="${at({actiongroup:!0,disabled:this.disabled})}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `}get renderPrimaryActions(){return this.primaryActions.length===0?m:(this.dropdownState==="close"&&(this.primaryColor=this.primaryActions[0].className),this.primaryActions.length===1?this.initialActionTemplate:d`
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
    `)}get renderSecondaryActions(){return this.secondaryActions.length?this.secondaryActions.map(o=>this.renderActionButton(o)):m}renderActionLink(o,e=!1){return d`<span class="${this.getDeviceType} ${o.className}">
      <a
        class="ia-button ${o.className} ${e?"initial":""}"
        href="${o.url??""}"
        target=${o.target??""}
        @click=${()=>{this.clickHandler(o.id??"",o.analyticsEvent,o.borrowType??"")}}
      >
        ${o.id==="purchaseBook"?Ri:""} ${o.text}
        <small>${o.subText??""}</small>
      </a>
    </span>`}renderActionButton(o,e=!1){if(o.url)return this.renderActionLink(o,e);const{analyticsEvent:t}=o;return d`<button
      class="ia-button ${o.className} ${e?"initial":""}"
      @click=${()=>{this.clickHandler(o.id??"",t,o.borrowType??"")}}
    >
      ${o.text}
    </button>`}clickHandler(o,e,t=""){if(this.dropdownState="close",this.dropdownArrow=Be,!e||!o)return;const{category:i,action:n}=e;this.dispatchEvent(new CustomEvent(o,{detail:{event:{category:i,action:n},borrowType:t}}))}get initialActionTemplate(){return this.initialButton=!1,this.primaryActions.length>1&&(this.initialButton=!0),this.renderActionButton(this.primaryActions[0],this.initialButton)}get getPrimaryItems(){return this.primaryActions.slice(1).map(o=>d`<li>${this.renderActionButton(o,this.initialButton)}</li>`)}get getLoaderIcon(){return d`<img
      class="${at({actionloader:!0,disabled:this.disabled})}"
      alt=""
      src="${this.loaderIcon}"
    />`}get isBelowTabletContainer(){return this.width<=Bi}get getDeviceType(){return this.isBelowTabletContainer?"mobile":"desktop"}toggleDropdown(){this.dropdownState==="open"?(this.dropdownState="close",this.dropdownArrow=Be,this.primaryColor=this.primaryActions[0].className):(this.dropdownState="open",this.dropdownArrow=Ii,this.primaryColor="dark")}};C.styles=[xi,Ei];k([u({type:String})],C.prototype,"userid",2);k([u({type:String})],C.prototype,"identifier",2);k([u({type:Array})],C.prototype,"primaryActions",2);k([u({type:Array})],C.prototype,"secondaryActions",2);k([u({type:String})],C.prototype,"primaryColor",2);k([u({type:String})],C.prototype,"dropdownState",2);k([u({type:Number})],C.prototype,"width",2);k([u({type:Boolean})],C.prototype,"hasAdminAccess",2);k([u({attribute:!1})],C.prototype,"dropdownArrow",2);k([u({type:Boolean})],C.prototype,"disabled",2);k([u({type:String})],C.prototype,"returnUrl",2);k([u({type:Boolean})],C.prototype,"autoRenew",2);k([u({type:String})],C.prototype,"loanRenewType",2);k([u({type:Boolean})],C.prototype,"autoReturn",2);k([u({type:Boolean})],C.prototype,"returnNow",2);C=k([B("collapsible-action-group")],C);const Mi=d`
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
`;var Ni=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,We=(o,e,t,i)=>{for(var n=i>1?void 0:i?Di(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(n=(i?r(e,t,n):r(n))||n);return i&&n&&Ni(e,t,n),n};let ae=class extends _t{constructor(){super(...arguments),this.identifier="",this.bookTitle="",this.analyticsCategories=F,this.analyticsActions=V}clickHandler(){this.dispatchEvent(new CustomEvent("bookTitleBar",{detail:{event:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.titleBar}}}))}render(){return d`
      <a
        class="embed-link"
        @click=${()=>this.clickHandler()}
        href="/details/${this.identifier}"
      >
        <span>${Mi}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `}};ae.styles=c`
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
  `;We([u({type:String})],ae.prototype,"identifier",2);We([u({type:String})],ae.prototype,"bookTitle",2);ae=We([B("book-title-bar")],ae);var Hi=Object.defineProperty,Ui=Object.getOwnPropertyDescriptor,Fe=(o,e,t,i)=>{for(var n=i>1?void 0:i?Ui(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(n=(i?r(e,t,n):r(n))||n);return i&&n&&Hi(e,t,n),n};let le=class extends x{constructor(){super(...arguments),this.texts="",this.textClass=""}render(){return d`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `}};le.styles=c`
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
  `;Fe([u({type:String})],le.prototype,"texts",2);Fe([u({type:String})],le.prototype,"textClass",2);le=Fe([B("text-group")],le);const zi=d`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m0 0h100v100h-100z" fill="#000"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" class="fill-color" fill="#fff" fill-rule="nonzero"/>
</svg>
`;class Wi extends x{static get styles(){return c`
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
    `}render(){return zi}}customElements.define("ia-icon-info",Wi);var Fi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,At=(o,e,t,i)=>{for(var n=i>1?void 0:i?ji(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(n=(i?r(e,t,n):r(n))||n);return i&&n&&Fi(e,t,n),n};let me=class extends x{constructor(){super(...arguments),this.iconClass="",this.helpURL="https://help.archive.org/help/borrowing-from-the-lending-library"}render(){return d`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `}};me.styles=c`
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
  `;At([u({type:String})],me.prototype,"iconClass",2);me=At([B("info-icon")],me);var Gi=Object.defineProperty,qi=Object.getOwnPropertyDescriptor,je=(o,e,t,i)=>{for(var n=i>1?void 0:i?qi(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(n=(i?r(e,t,n):r(n))||n);return i&&n&&Gi(e,t,n),n};let ce=class extends x{constructor(){super(...arguments),this.secondsLeftOnLoan=0,this.displayTime=!1}get totalMinutes(){return Math.ceil(Math.round(this.secondsLeftOnLoan)/60)}get minutesLeftOnLoan(){const{totalMinutes:o}=this;return o<10?`0:0${o}`:o===60?"1:00":`0:${o}`}get remainingTime(){const o="minute",e=this.minutesLeftOnLoan;return this.totalMinutes===1?`${e} ${o}`:`${e} ${o}s`}render(){const o=this.displayTime?"view":"hide";return d`
      <button
        id="timer-counter"
        class=${o}
        @click=${()=>{this.displayTime=!this.displayTime}}
        role="timer"
      >
        <span>${this.minutesLeftOnLoan} - </span>
        <span class="second">${Number(this.secondsLeftOnLoan)}</span>
        <span class="sr-only">${this.remainingTime} left</span>
      </button>
    `}};ce.styles=c`
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
  `;je([u({type:Number})],ce.prototype,"secondsLeftOnLoan",2);je([u({type:Boolean})],ce.prototype,"displayTime",2);ce=je([B("timer-countdown")],ce);window.IALendingIntervals={tokenPoller:0,timerCountdown:0,browseExpireTimeout:0,clearTokenPoller(){var o;(o=window.IALendingIntervals)!=null&&o.tokenPoller&&window.clearInterval(window.IALendingIntervals.tokenPoller),window.IALendingIntervals&&(window.IALendingIntervals.tokenPoller=0)},clearTimerCountdown(){var o;(o=window.IALendingIntervals)!=null&&o.timerCountdown&&window.clearInterval(window.IALendingIntervals.timerCountdown),window.IALendingIntervals&&(window.IALendingIntervals.timerCountdown=0)},clearBrowseExpireTimeout(){var o;(o=window.IALendingIntervals)!=null&&o.browseExpireTimeout&&window.clearTimeout(window.IALendingIntervals.browseExpireTimeout),window.IALendingIntervals&&(window.IALendingIntervals.browseExpireTimeout=0)},clearAll(){var o,e,t;(o=window==null?void 0:window.IALendingIntervals)==null||o.clearTokenPoller(),(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTimerCountdown(),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearBrowseExpireTimeout()}};class Ki{constructor(e,t,i={},n){this.printDisabilityLink="/details/printdisabled?tab=about",this.analyticsCategories=F,this.analyticsActions=V,this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=n}firstBrowseConfig(){return{id:"browseBook",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.browse}}}browseAgainConfig(){return{id:"browseBookAgain",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.browse,action:this.analyticsActions.browseAgain}}}returnBookConfig(){return{id:"returnNow",text:"Return now",className:"danger",analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.borrow,action:this.analyticsActions.doneBorrowing},borrowType:this.lendingStatus.user_has_browsed?"browse":"borrow"}}borrowBookConfig(e=!1){return!this.lendingStatus.available_to_borrow&&!this.lendingStatus.user_is_printdisabled||this.lendingStatus.user_has_borrowed?null:{id:"borrowBook",text:"Borrow for 14 days",className:"primary",disabled:e,analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.preview,action:this.analyticsActions.borrow}}}loginAndBorrowBookConfig(){return{id:"loginAndBorrow",text:"Log In and Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}leaveWaitlistConfig(){return{id:"leaveWaitlist",text:"Leave Waitlist",className:"dark",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistLeave}}}loginAndWaitlistConfig(){return{id:"loginAndWaitlist",text:"Log In and Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}waitlistConfig(){const e=!!this.userid,t=this.lendingStatus||{};return!t.available_to_waitlist||t.available_to_borrow?null:e?{id:"joinWaitlist",text:"Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistJoin}}:this.loginAndWaitlistConfig()}purchaseConfig(){return this.bwbPurchaseUrl?{id:"purchaseBook",text:"Purchase at ",subText:"Better World Books",title:"Purchase",url:this.bwbPurchaseUrl,target:"_blank",className:"purchase dark",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.purchase}}:null}printDisabilityConfig(){return this.lendingStatus.user_is_printdisabled?null:{id:"printDisability",text:"Print Disability Access",title:"Print Disability Access",url:this.printDisabilityLink,target:"_self",className:"print-disability",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.printDisability}}}adminAccessConfig(){return this.lendingStatus.user_has_borrowed||!this.lendingStatus.isAdmin?null:{id:"adminAccess",text:"Admin Access",title:"You have administrative privileges to read this book",className:"danger",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.borrow}}}adminOrPrintDisabledExitConfig(){return{id:"exitAdminAccess",text:`← Exit ${$.getQueryParam("admin")==="1"?"admin":"print-disabled"} access mode`,url:$.getBackHref(),target:"_self",className:"exit-admin",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.doneBorrowing}}}unavailableBookConfig(){return{id:"borrowUnavailable",text:"Borrow Unavailable",className:"primary unavailable",disabled:!0,analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.unavailable}}}isEmbed(e){return{primaryTitle:`<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${e}</a>`,primaryActions:[],primaryColor:""}}}const L={available_1hr:"Renews automatically with continued use.",available_14d:"This book can be borrowed for 14 days.",available_pd:"Book available to patrons with print disabilities.",available_waitlist:"A waitlist is available.",admin_access:"You have administrative privileges to read this book.",claim_waitlist:"You are at the top of the waitlist for this book.",being_borrowed:"Another patron is using this book. Please check back later.",eligible_pd:"You are eligible for print-disabled access.",on_waitlist:"You are on the waitlist for this book.",session_expired:"Renews automatically with continued use.",unavailable:"This book is not available at this time."};class Zi{constructor(e,t,i,n){this.analyticsCategories=F,this.analyticsActions=V,this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=n,this.actionsConfig=new Ki(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl)}onlyAdminAction(){return{primaryTitle:L.admin_access,primaryActions:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}adminOrPrintDisabledReadingAction(){return{primaryTitle:"",primaryActions:[],secondaryActions:[this.actionsConfig.adminOrPrintDisabledExitConfig()],borrowType:"adminBorrowed"}}patronIsReadingAction(){const e=this.lendingStatus||{},t=e.loanCount??0,i=e.maxLoans??0,n=t>=i;let s="";const r=!!e.user_has_browsed&&!e.browsingExpired;return r?s=L.available_1hr:s=`Your loan of this book has ${e.daysLeftOnLoan} days left.`,{primaryTitle:s,primaryActions:[this.actionsConfig.returnBookConfig(),this.actionsConfig.borrowBookConfig(n),this.actionsConfig.waitlistConfig(),this.actionsConfig.printDisabilityConfig()],primaryColor:"danger",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()],borrowType:r?"browsed":"borrowed"}}claimWaitlistAction(){const e=this.lendingStatus||{},t=this.actionsConfig.leaveWaitlistConfig(),i=this.actionsConfig.borrowBookConfig(),n=e.available_to_browse?this.actionsConfig.firstBrowseConfig():null,s=[i];return n&&s.push(n),s.push(t),{primaryTitle:L.claim_waitlist,primaryActions:s,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowPrintDisabledAction(){return{primaryTitle:L.eligible_pd,primaryActions:[this.actionsConfig.borrowBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}onlyPrintDisabledAction(){const e=this.lendingStatus.isAdmin?null:this.actionsConfig.unavailableBookConfig();return{primaryTitle:L.available_pd,primaryActions:[e],primaryColor:"primary",secondaryActions:[]}}onWaitlistAction(){return{primaryTitle:L.on_waitlist,primaryActions:[this.actionsConfig.leaveWaitlistConfig(),this.actionsConfig.firstBrowseConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}restrictedAction(){const e=this.lendingStatus||{};return{primaryTitle:!!e.max_browsable_copies&&!e.available_lendable_copies?L.being_borrowed:L.unavailable,primaryActions:[this.actionsConfig.unavailableBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}loggedOutOptions(){const e=this.lendingStatus||{},t=!e.available_to_waitlist&&!e.available_to_borrow,i=this.actionsConfig.waitlistConfig();let n=null;e.available_to_borrow||e.available_to_browse?n=this.actionsConfig.loginAndBorrowBookConfig():t&&(n=this.actionsConfig.unavailableBookConfig());const s=this.actionsConfig.printDisabilityConfig(),r=[n,i,s].filter(l=>l!==null);return{primaryTitle:e.available_to_browse?L.available_1hr:e.available_to_borrow?L.available_14d:L.unavailable,primaryActions:r,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrow1HrAction(){const e=this.lendingStatus||{},t=!e.available_to_browse&&!!e.browsingExpired,i=!!e.available_to_browse||t,n=i&&!!e.available_to_borrow,s=i&&!e.available_to_borrow&&!!e.available_to_waitlist,r=i&&!e.available_to_borrow&&!e.available_to_waitlist,a=e.available_browsable_copies??0,l=e.max_browsable_copies??0,h=a<1&&a<l,w=t?L.session_expired:!i&&h?L.being_borrowed:!i&&e.available_to_waitlist?L.available_waitlist:L.available_1hr,g=t?this.actionsConfig.browseAgainConfig():this.actionsConfig.firstBrowseConfig(),_=this.actionsConfig.borrowBookConfig(),y=this.actionsConfig.waitlistConfig(),T=this.actionsConfig.printDisabilityConfig();return{primaryTitle:w,primaryActions:r?[g,T]:n?[g,_,T]:s?[g,y,T]:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowAction(){const e=this.lendingStatus||{};if(!!!this.userid)return this.loggedOutOptions();if(e.available_to_browse||e.browsingExpired)return this.borrow1HrAction();let i=null;const n=this.actionsConfig.waitlistConfig(),s=this.actionsConfig.printDisabilityConfig(),r=e.loanCount??0,a=e.maxLoans??0,l=r>=a;!e.available_to_borrow&&!n?i=this.actionsConfig.unavailableBookConfig():e.available_to_borrow&&(i=this.actionsConfig.borrowBookConfig(l));const w=[i,n,s].filter(g=>g!==null);return{primaryTitle:n?L.being_borrowed:"",primaryActions:w,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}getBrowseCountdownTitle(){const e=this.lendingStatus.secondsLeftOnLoan??0,t=new Date(+new Date+e*1e3);let i=t.getHours()%12;const n=(""+t.getMinutes()).replace(/^(\d{1})$/,"0$1"),s=t.getHours()>11?" PM":" AM";return i===0&&(i=12),`Borrow ends at ${i}:${n}${s}`}getCurrentLendingActions(){let e;const t=this.lendingStatus||{},i=$.getQueryParam("admin")==="1"&&!!t.isAdmin,n=$.getQueryParam("access")==="1"&&!!t.user_is_printdisabled,s=!!t.user_has_borrowed||!!t.user_has_browsed&&!t.browsingExpired,r=!t.user_has_borrowed&&!t.user_has_browsed,a=!t.available_to_borrow&&!t.available_to_browse,l=!!t.is_printdisabled&&!!t.user_is_printdisabled,h=(!!t.available_to_browse||!!t.available_to_borrow)&&r&&!t.user_on_waitlist;return i||n?e=this.adminOrPrintDisabledReadingAction():t.isAdmin&&r&&a?e=this.onlyAdminAction():s?e=this.patronIsReadingAction():t.user_can_claim_waitlist?e=this.claimWaitlistAction():l?e=this.borrowPrintDisabledAction():h||t.browsingExpired?e=this.borrowAction():t.isPrintDisabledOnly?e=this.onlyPrintDisabledAction():t.user_on_waitlist?e=this.onWaitlistAction():e=this.restrictedAction(),e}}class Vi{constructor(e,t,i,n,s){this.loanTokenInterval=void 0,this.loanAnalytics=new vt,this.identifier=e,this.borrowType=t,this.successCallback=i,this.errorCallback=n,this.pollerDelay=s,this.bookAccessed()}disconnectedCallback(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTokenPoller()}async bookAccessed(){var e;this.borrowType?(this.handleLoanTokenPoller(!0),this.borrowType!=="adminBorrowed"&&window.IALendingIntervals&&(window.IALendingIntervals.tokenPoller=setInterval(()=>{this.handleLoanTokenPoller()},this.pollerDelay*1e3))):((e=window==null?void 0:window.Sentry)==null||e.captureMessage(`${E.bookAccessed} - not borrowed`),this.disconnectedCallback())}async handleLoanTokenPoller(e=!1){const t="create_token";H({identifier:this.identifier,action:t,error:i=>{var n,s;this.errorCallback({detail:{action:t,data:i}}),(n=window==null?void 0:window.Sentry)==null||n.captureMessage(`${E.handleLoanTokenPoller} - Error: ${JSON.stringify(i)}`),(s=this.loanAnalytics)==null||s.sendEvent("LendingServiceLoanError",t,this.identifier)},success:()=>{e&&this.successCallback()}})}}class Ji{constructor(e,t,i,n){this.loanRenewMessage="This book has been renewed for #time #unitsOfTime.",this.loanReturnWarning="With no action, this book will be auto-returned in #time #unitsOfTime.",this.result={texts:"",renewNow:!1,renewType:""},this.hasPageChanged=e,this.identifier=t,this.localCache=i,this.loanRenewTimeConfig=n}async handleLoanRenew(){try{return this.hasPageChanged?await this.pageChanged():await this.autoChecker()}catch(e){b(e)}return this.result}async pageChanged(){const{loanRenewAtLast:e}=this.loanRenewTimeConfig,t=new Date,i=await this.localCache.get(`${this.identifier}-loanTime`),n=this.changeTime(i,e,"sub");return n!==null&&t>=n&&(this.result={texts:this.loanRenewMessage,renewNow:!0,renewType:"auto"}),this.setPageChangedTime(),this.result}async autoChecker(){const{pageChangedInLast:e}=this.loanRenewTimeConfig,t=await this.localCache.get(`${this.identifier}-pageChangedTime`),i=this.changeTime(new Date,e,"sub");return t===void 0||i!==null&&t<=i?this.result={texts:this.loanReturnWarning,renewNow:!1,renewType:""}:i!==null&&t>=i&&(this.result={texts:"",renewNow:!0,renewType:"auto"}),this.result}async setPageChangedTime(){await this.localCache.set({key:`${this.identifier}-pageChangedTime`,value:new Date,ttl:Number(this.loanRenewTimeConfig.loanTotalTime)})}getMessageTexts(e,t){let i="minute",n=Math.ceil(t/60);return n>59&&(n=1,i="hour"),(e??"").replace(/#time/,String(n)).replace(/#unitsOfTime/,n!==1?`${i}s`:i)}changeTime(e,t,i){return e===void 0?null:i==="sub"?new Date(e.getTime()-t*1e3):new Date(e.getTime()+t*1e3)}}var Yi=Object.defineProperty,Xi=Object.getOwnPropertyDescriptor,A=(o,e,t,i)=>{for(var n=i>1?void 0:i?Xi(e,t):e,s=o.length-1,r;s>=0;s--)(r=o[s])&&(n=(i?r(e,t,n):r(n))||n);return i&&n&&Yi(e,t,n),n};const Qi={browseExpired:"IABookReader:BrowsingHasExpired"},S={iaButton:"min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;",renew:"background:#194880;width:110px;",return:"background:#d9534f;width:120px;",loaderIcon:"display:inline-block;width:20px;height:20px;margin-top:2px;color:white;--activityIndicatorLoadingRingColor:#fff;--activityIndicatorLoadingDotColor:#fff;",refresh:"background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"};let v=class extends x{constructor(){super(...arguments),this.userid="",this.identifier="",this.bookTitle="",this.lendingStatus={},this.returnUrl="",this.width=0,this.bwbPurchaseUrl="",this.lendingBarPostInit=()=>{},this.barType="action",this.disableActionGroup=!1,this.tokenDelay=120,this.timerExecutionSeconds=30,this.loanRenewTimeConfig={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900},this.loanRenewResult={texts:"",renewNow:!1,secondsLeft:0,renewType:""},this.postInitComplete=!1,this.primaryActions=[],this.primaryTitle="",this.primaryColor="primary",this.secondaryActions=[],this.borrowType=null,this.returnNow=!1}disconnectedCallback(){var o;super.disconnectedCallback(),(o=window==null?void 0:window.IALendingIntervals)==null||o.clearAll(),this.sentryCaptureMsg(E.disconnectedCallback),this.disconnectResizeObserver()}sentryCaptureMsg(o){var e;b(window==null?void 0:window.Sentry),(e=window==null?void 0:window.Sentry)==null||e.captureMessage(o)}firstUpdated(){this.bindLoanRenewEvents(),this.localCache=new yt({namespace:"loanRenew"}),this.sharedObserver||(this.sharedObserver=new Zt,this.setupResizeObserver())}updated(o){var e;(o.has("lendingStatus")||o.has("bwbPurchaseUrl"))&&this.setupLendingToolbarActions(),o.has("sharedObserver")&&(this.disconnectResizeObserver(),this.setupResizeObserver()),o.has("loanRenewResult")&&this.loanRenewResult.renewNow&&((e=window.IALendingIntervals)==null||e.clearAll())}handleResize(o){var i;const{target:e}=o;if(e!==((i=this.shadowRoot)==null?void 0:i.host))return;const{contentRect:t}=o;this.width=Math.round(t.width)}disconnectResizeObserver(){var o;this.shadowRoot&&((o=this.sharedObserver)==null||o.removeObserver({handler:this,target:this.shadowRoot.host}))}setupResizeObserver(){var o;this.shadowRoot&&((o=this.sharedObserver)==null||o.addObserver({handler:this,target:this.shadowRoot.host}))}async setupLendingToolbarActions(){var t,i,n,s;this.lendingOptions=new Zi(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl);const o=this.lendingOptions.getCurrentLendingActions();if(!o)return;this.primaryTitle=o.primaryTitle,this.primaryActions=(t=o.primaryActions)==null?void 0:t.filter(r=>r!=null),this.primaryColor=o.primaryColor??"primary",this.secondaryActions=(i=o.secondaryActions)==null?void 0:i.filter(r=>r!=null),this.borrowType=o.borrowType??null;const e="browsingExpired"in this.lendingStatus&&!!((n=this.lendingStatus)!=null&&n.browsingExpired);if(e){b("setupLendingToolbarActions > hasExpired --- "),this.tokenPoller||this.sentryCaptureMsg(E.bookWasExpired),(s=window==null?void 0:window.IALendingIntervals)==null||s.clearAll(),this.dispatchEvent(new Event(Qi.browseExpired,{bubbles:!0,cancelable:!1,composed:!0}));return}if(this.borrowType==="browsed"&&(await this.startTimerCountdown(),await this.startBrowseTimer()),!this.borrowType||this.barType==="title"){this.lendingBarPostInit();return}setTimeout(()=>{var r;!e&&!((r=window.IALendingIntervals)!=null&&r.tokenPoller)&&this.startLoanTokenPoller()},100),this.requestUpdate()}bindLoanRenewEvents(){window.addEventListener("BookReader:userAction",()=>{b("IABookActions:BookReader:userAction"),this.borrowType==="browsed"&&this.autoLoanRenewChecker(!0)}),document.addEventListener("visibilitychange",async()=>{var o,e;if(!document.hidden&&(b("visibilitychange event execute:------------------ ",new Date().getMinutes(),new Date().getSeconds(),this.borrowType),this.borrowType==="browsed"&&this.lendingStatus.browsingExpired===!1)){const t=await((o=this.localCache)==null?void 0:o.get(`${this.identifier}-loanTime`)),i=Math.round((((e=t==null?void 0:t.getTime)==null?void 0:e.call(t))??0)/1e3-new Date().getTime()/1e3);i>=this.timerExecutionSeconds?this.loanStatusCheckInterval(Number(i)):(this.browseHasExpired(),this.disconnectedCallback())}})}async autoLoanRenewChecker(o=!1){this.localCache&&(this.loanRenewHelper=new Ji(o,this.identifier,this.localCache,this.loanRenewTimeConfig),await this.loanRenewHelper.handleLoanRenew(),this.loanRenewResult=this.loanRenewHelper.result)}get modal(){const o=document.body.querySelector("modal-manager");return o==null||o.setAttribute("id","action-bar-modal"),o}async showWarningModal(){var i,n,s,r;b("****** showWarningModal ******"),this.modal&&(this.modal.customModalContent=m),(i=this.modal)==null||i.closeModal(),this.loanRenewResult={texts:"",renewNow:!1};let{secondsLeft:o}=this.loanRenewResult;o===void 0?o=this.lendingStatus.secondsLeftOnLoan:o=o>60?o:60;const e=new z({headline:d`Are you still reading?`,headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:d`${(n=this.loanRenewHelper)==null?void 0:n.getMessageTexts(this.loanRenewResult.texts,o??0)}`}),t=d`<br />
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
      </div> `;(s=this.modal)==null||s.setAttribute("aria-live","assertive"),await((r=this.modal)==null?void 0:r.showModal({config:e,customModalContent:t}))}async showWarningDisabledModal(o="renewBook"){var n,s;let{secondsLeft:e}=this.loanRenewResult;e===void 0?e=this.lendingStatus.secondsLeftOnLoan:e=e>60?e:60;const t=new z({headline:d`Are you still reading?`,headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:d`${(n=this.loanRenewHelper)==null?void 0:n.getMessageTexts(this.loanRenewResult.texts,e??0)}`}),i=d`<br />
      <div
        id="disabled-book-action-bar-custom-buttons"
        style="display:flex;justify-content:center; opacity:0.8; pointer-events:none;"
      >
        <button
          disabled
          style="${S.iaButton} ${S.renew}"
        >
          ${o==="renewBook"?d`<ia-activity-indicator
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
          ${o==="returnBook"?d`<ia-activity-indicator
                mode="processing"
                style=${S.loaderIcon}
              ></ia-activity-indicator>`:"Return the book"}
        </button>
      </div> `;await((s=this.modal)==null?void 0:s.showModal({config:t,customModalContent:i}))}async patronWantsToRenewBook(){this.showWarningDisabledModal(),this.loanRenewResult={texts:"",renewNow:!0,renewType:"manual"}}async patronWantsToReturnBook(){this.showWarningDisabledModal("returnBook"),this.disableActionGroup=!0,this.returnNow=!0}async showExpiredModal(){var t;const o=new z({headline:d``,showCloseButton:!1,closeOnBackdropClick:!1,headerColor:"#194880",message:d`This book has been returned due to inactivity.`}),e=d`<br />
      <div style="text-align: center">
        <button
          style="${S.iaButton} ${S.renew}"
          @click=${()=>{$.goToUrl(this.returnUrl,!0)}}
        >
          Okay
        </button>
      </div> `;await((t=this.modal)==null?void 0:t.showModal({config:o,customModalContent:e}))}async browseHasExpired(){var e,t,i;b("BrowseHasExpired ---"),(e=window==null?void 0:window.IALendingIntervals)==null||e.clearAll();const o={...this.lendingStatus,browsingExpired:!0,secondsLeftOnLoan:0};this.lendingStatus=o,await((t=this.localCache)==null?void 0:t.delete(`${this.identifier}-loanTime`)),await((i=this.localCache)==null?void 0:i.delete(`${this.identifier}-pageChangedTime`)),this.loanRenewResult.renewNow=!1,this.loanRenewResult.texts="This book has been returned due to inactivity.",await this.showExpiredModal(),this.sentryCaptureMsg(E.browseHasExpired)}async startBrowseTimer(){var i;(i=window==null?void 0:window.IALendingIntervals)==null||i.clearBrowseExpireTimeout();const o=this.lendingStatus.browsingExpired,e=this.lendingStatus.user_has_browsed,t=this.lendingStatus.secondsLeftOnLoan??0;if(!e||o){b("startBrowseTimer --- !user_has_browsed || browsingExpired",{user_has_browsed:e,browsingExpired:o,secondsLeftOnLoan:t});return}window.IALendingIntervals&&(window.IALendingIntervals.browseExpireTimeout=setTimeout(()=>{b("startBrowseTimer > browseExpireTimeout --- will expire loan",t),this.browseHasExpired()},t*1e3))}render(){return this.barType==="title"?d`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`:d`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`}get bookTitleBar(){return d`<book-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></book-title-bar>`}get timerCountdownEl(){var o;return((o=this.shadowRoot)==null?void 0:o.querySelector("timer-countdown"))??null}get bookActionBar(){return d`
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
        .loanRenewType=${this.loanRenewResult.renewType??""}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?autoRenew=${this.loanRenewResult.renewNow}
        ?autoReturn=${!!this.lendingStatus.browsingExpired}
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
    `}async handleLoanAutoRenewed(o){var n,s,r,a,l,h;const e=o.detail,t=(n=e==null?void 0:e.data)==null?void 0:n.loan,i=`Whoops, seems we hit a hiccup with renewing this book. Please refresh & retry. --- (Debug: ${(s=e==null?void 0:e.data)==null?void 0:s.error})`;if(!t){this.showErrorModal(i,"handleLoanAutoRenewed");return}if(this.loanRenewResult.renewNow){const w=await((r=this.localCache)==null?void 0:r.get(`${this.identifier}-loanTime`)),g=Math.round(((((a=w==null?void 0:w.getTime)==null?void 0:a.call(w))??0)-new Date().getTime())/1e3);b(w,g),b("IABookActions: handleLoanAutoRenewed --- ",{ajaxResponse:e==null?void 0:e.data,loanRenewResult:this.loanRenewResult,secondsLeftOnLoan:g});const _={...this.lendingStatus,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:g};this.lendingStatus=_,(l=this.modal)==null||l.closeModal(),(h=this.modal)==null||h.removeAttribute("id"),this.modal&&(this.modal.customModalContent=m),this.sentryCaptureMsg(E.bookHasRenewed)}}async startTimerCountdown(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTimerCountdown();const o=Number(this.lendingStatus.secondsLeftOnLoan);this.timeWhenTimerStart=new Date,window.IALendingIntervals&&(window.IALendingIntervals.timerCountdown=setInterval(async()=>{await this.loanStatusCheckInterval(o)},this.timerExecutionSeconds*1e3))}async loanStatusCheckInterval(o){let e=o;e-=this.timerExecutionSeconds,e=Math.round(e);const t=await this.reSyncTimerIfGoneOff(e);t.hasSynced&&(e=t.whatShouldLeft,b("startTimerCountdown --- stale, timer has resyncd",{secondsLeft:e})),b("startTimerCountdown --- countdown still valid. continue...",{resyncd:t,secondsLeft:e,loanRenewAtLast:this.loanRenewTimeConfig.loanRenewAtLast},"time: ",new Date().getMinutes(),":",new Date().getSeconds(),", timerDelay: ",this.timerExecutionSeconds),e<=this.loanRenewTimeConfig.loanRenewAtLast&&await this.loanRenewAttempt(e),e<=this.timerExecutionSeconds&&(this.disconnectedCallback(),this.sentryCaptureMsg(E.clearOneHourTimer))}async reSyncTimerIfGoneOff(o){var l;const e=new Date,t=this.timeWhenTimerStart??new Date,i=e.getTime()/1e3-t.getTime()/1e3,n=(this.lendingStatus.secondsLeftOnLoan??0)-i;b("currentTime: ",e),b("timeWhenTimerStart: ",this.timeWhenTimerStart),b("diffInSeconds: ",i),b("secondsShouldLeft: ",n),b("this.lendingStatus.secondsLeftOnLoan: ",this.lendingStatus.secondsLeftOnLoan);const s=Math.round(o),r=Math.round(n),a=((l=this.timerCountdownEl)==null?void 0:l.secondsLeftOnLoan)||0;if(b("reSyncTimerIfGoneOff?",{whatIsleft:s,whatShouldLeft:r,timerElSeconds:a,timeLeftInMin:Math.ceil(o/60)}),a!==r||s!==r){const h={...this.lendingStatus,secondsLeftOnLoan:r};this.lendingStatus=h}return s!==r?(b("reSyncTimerIfGoneOff --- let's re-sync."),{hasSynced:!0,whatShouldLeft:r}):{hasSynced:!1,whatShouldLeft:r}}async loanRenewAttempt(o){b("loanRenewAttempt ---",{secondsLeft:o,loanRenewResult:this.loanRenewResult});let e=o;if(e<50){b("loanRenewAttempt --- loanSecondsLeft < 50, will expire"),await this.browseHasExpired();return}await this.autoLoanRenewChecker(!1),this.loanRenewResult.renewNow===!1&&(e-=60,this.loanRenewResult.secondsLeft=e,this.showWarningModal())}startLoanTokenPoller(){const o=()=>{this.postInitComplete||this.lendingBarPostInit(),this.postInitComplete=!0},e=t=>{this.handleLendingActionError(new CustomEvent("lendingActionError",{detail:t.detail}))};this.tokenPoller=new Vi(this.identifier,this.borrowType,o,e,this.tokenDelay)}handleToggleActionGroup(){this.disableActionGroup=!this.disableActionGroup}handleLendingActionError(o){var n,s;this.disableActionGroup=!1,(n=window==null?void 0:window.IALendingIntervals)==null||n.clearAll();const e=o.detail,t=e==null?void 0:e.action,i=(s=e==null?void 0:e.data)==null?void 0:s.error;if(i&&t!=="create_token"&&this.showErrorModal(i,t??""),t==="create_token"){const r={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0};this.lendingStatus=r}if(i&&i.match(/not available to borrow/gm)){let r=this.lendingStatus;t==="browse_book"?r={...this.lendingStatus,available_to_browse:!1}:t==="borrow_book"&&(r={...this.lendingStatus,available_to_borrow:!1}),this.lendingStatus=r}}async showErrorModal(o,e){var i;const t=new z({title:d`Lending error`,message:d`${o}`,headerColor:"#d9534f",showCloseButton:!0});if(e==="create_token"){const n=d`<button
        style="${S.refresh}"
        @click=${()=>window.location.reload()}
      >
        refresh
      </button>`;t.message=d` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${n} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this.identifier}"
          >info@archive.org</a
        ><br /><br />
        <code>errorLog: ${o}</code>`}await((i=this.modal)==null?void 0:i.showModal({config:t}))}get iconClass(){return this.width<=dt?"mobile":"desktop"}get textClass(){return this.width>=dt?"visible":"hidden"}get infoIconTemplate(){return d`<info-icon iconClass=${this.iconClass}></info-icon>`}get textGroupTemplate(){return this.primaryTitle?d`<text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </text-group>`:m}get hasAdminAccess(){return!this.lendingStatus.userHasBorrowed&&!!this.lendingStatus.isAdmin}};v.styles=c`
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
  `;A([u({type:String})],v.prototype,"userid",2);A([u({type:String})],v.prototype,"identifier",2);A([u({type:String})],v.prototype,"bookTitle",2);A([u({type:Object})],v.prototype,"lendingStatus",2);A([u({type:String})],v.prototype,"returnUrl",2);A([u({type:Number})],v.prototype,"width",2);A([u({type:String})],v.prototype,"bwbPurchaseUrl",2);A([u({attribute:!1})],v.prototype,"lendingBarPostInit",2);A([u({type:String})],v.prototype,"barType",2);A([u({attribute:!1})],v.prototype,"sharedObserver",2);A([u({type:Boolean})],v.prototype,"disableActionGroup",2);A([u({type:Number})],v.prototype,"tokenDelay",2);A([u({type:Number})],v.prototype,"timerExecutionSeconds",2);A([u({type:Object})],v.prototype,"localCache",2);A([u({type:Object})],v.prototype,"loanRenewTimeConfig",2);A([u({type:Object})],v.prototype,"loanRenewResult",2);A([he()],v.prototype,"postInitComplete",2);A([he()],v.prototype,"primaryActions",2);A([he()],v.prototype,"primaryTitle",2);A([he()],v.prototype,"primaryColor",2);A([he()],v.prototype,"secondaryActions",2);v=A([B("ia-book-actions")],v);const _e={active_borrows:0,active_browses:0,available_borrowable_copies:0,available_browsable_copies:1,available_lendable_copies:1,available_to_borrow:!1,available_to_browse:!1,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!1,is_readable:!1,last_borrow:null,last_browse:null,last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:null,orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:0,user_loan_record:[],user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",browsingExpired:!1,daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!0,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:0,loanRecord:[],loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:10,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!1,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},eo={active_borrows:0,active_browses:1,available_borrowable_copies:0,available_browsable_copies:0,available_lendable_copies:0,available_to_borrow:!0,available_to_browse:!0,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!0,is_readable:!1,last_borrow:null,last_browse:"2021-07-30 09:57:40",last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:"2021-07-30 10:57:40",orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:1,user_loan_record:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!1,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:1,loanId:"1ca15f92d07dfdae3f7b1516084aec5d603800b8",loanRecord:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},loanStartDate:"2021-07-30 09:57:40",loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:0,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!0,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},Oe=new yt({namespace:"loanRenew",defaultTTL:1*60}),to="@neeraj-archive",Me="naturalhistoryof00unse_4111";let Re="https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863";const Ct=new z;Ct.headerColor="#d9534f";let io=function(){setTimeout(function(){},100)},p=document.querySelector("ia-book-actions");p.userid=to;p.identifier=Me;p.bookTitle="Contemporary Black biography. Volume 39 : profiles from the interContemporary Black biography. Volume 39";p.lendingStatus=eo;p.bwbPurchaseUrl="";p.modalConfig=Ct;p.lendingBarPostInit=io;p.tokenDelay=10;p.timerExecutionSeconds=3;p.returnUrl="";p.localCache=Oe;let Lt={loanTotalTime:120,loanRenewAtLast:110,pageChangedInLast:30},oo={loanTotalTime:300,loanRenewAtLast:240,pageChangedInLast:60},no={loanTotalTime:600,loanRenewAtLast:480,pageChangedInLast:120},so={loanTotalTime:1800,loanRenewAtLast:1500,pageChangedInLast:600},ro={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900};p.loanRenewTimeConfig=Lt;let ao=new URLSearchParams(document.location.search);switch(ao.get("timer")){case"5":p.loanRenewTimeConfig=oo;break;case"10":p.loanRenewTimeConfig=no;break;case"30":p.loanRenewTimeConfig=so;break;case"60":p.loanRenewTimeConfig=ro;break;default:p.loanRenewTimeConfig=Lt;break}let f=p.lendingStatus,lo=p.loanRenewTimeConfig.loanTotalTime;document.querySelectorAll(".titleBar input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?p.barType="title":p.barType="action"})});document.querySelectorAll(".searchParam input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("q","test")):(i="",t.delete("q")),history.pushState){var n=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:n},"",n)}})});document.querySelectorAll(".errorEnable input[type=checkbox]").forEach(o=>{window.location.href.indexOf("?error=true")!==-1&&(o.checked=!0),o.addEventListener("click",e=>{var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("error",!0)):(i="",t.delete("error")),history.pushState){var n=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:n},"",n)}})});document.querySelectorAll(".userState input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?(e.target.value==="isAdmin"&&(f.isAdmin=!0),e.target.value==="isLoggedIn"&&(p.userid="@neeraj")):(e.target.value==="isAdmin"&&(f.isAdmin=!1),e.target.value==="isLoggedIn"&&(p.userid=""));let t={..._e,...f};p.lendingStatus=t})});document.querySelectorAll(".printDisabled input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?(e.target.value==="is_printdisabled"&&(f.is_printdisabled=!0),e.target.value==="user_is_printdisabled"&&(f.user_is_printdisabled=!0)):(e.target.value==="is_printdisabled"&&(f.is_printdisabled=!1),e.target.value==="user_is_printdisabled"&&(f.user_is_printdisabled=!1));let t={..._e,...f};p.lendingStatus=t})});document.querySelectorAll(".availableToBrowse input[type=radio]").forEach(o=>{o.addEventListener("click",async e=>{if(e.target.value==="user_has_browsed"){f.user_has_browsed=!0,f.available_to_browse=!1,f.secondsLeftOnLoan=lo,f.browsingExpired=!1;const t=new Date(new Date().getTime()+p.loanRenewTimeConfig.loanTotalTime*1e3);try{await Oe.set({key:`${Me}-loanTime`,value:t,ttl:Number(p.loanRenewTimeConfig.loanTotalTime)}),await Oe.delete(`${Me}-pageChangedTime`)}catch{}}else e.target.value==="browsingExpired"?(f.user_has_browsed=!0,f.available_to_browse=!1,f.secondsLeftOnLoan=0,f.browsingExpired=!0):e.target.value==="available_to_browse"&&(f.available_to_browse=!0,f.user_has_browsed=!1);setTimeout(()=>{let t={..._e,...f};p.lendingStatus=t},10)})});document.querySelector("#show_warning_modal").addEventListener("click",async()=>{if(!p.lendingStatus.user_has_browsed){const o={...p.lendingStatus,user_has_browsed:!0};p.lendingStatus=o,await p.updateComplete}p.showWarningModal(),p.lendingStatus.user_has_browsed&&p.showWarningModal()});document.querySelector("#show_expired_modal").addEventListener("click",async()=>{if(!p.lendingStatus.user_has_browsed){const o={...p.lendingStatus,user_has_browsed:!0};p.lendingStatus=o,await p.updateComplete}await new Promise(o=>setTimeout(o,5e3)),p.browseHasExpired()});document.querySelector("#resync_timer").addEventListener("click",async o=>{p.lendingStatus.user_has_browsed&&document.querySelector("ia-book-actions").dispatchEvent(new Event("visibilitychange",{detail:{},bubbles:!0,composed:!0})),await new Promise(e=>setTimeout(e,5e3))});document.querySelectorAll(".availableToBorrow input[type=radio]").forEach(o=>{o.addEventListener("click",e=>{e.target.value==="available_to_borrow"?(f.available_to_borrow=!0,f.user_on_waitlist=!1,f.available_to_waitlist=!1,f.user_has_borrowed=!1):e.target.value==="user_can_claim_waitlist"?(f.available_to_borrow=!0,f.user_on_waitlist=!0,f.user_can_claim_waitlist=!0,f.user_has_borrowed=!1,f.available_to_waitlist=!1):e.target.value==="user_on_waitlist"?(f.available_to_borrow=!1,f.user_on_waitlist=!0,f.available_to_waitlist=!1,f.user_has_borrowed=!1):e.target.value==="available_to_waitlist"?(f.available_to_borrow=!1,f.user_on_waitlist=!1,f.available_to_waitlist=!0,f.user_has_borrowed=!1):e.target.value==="user_has_borrowed"&&(f.available_to_borrow=!1,f.user_on_waitlist=!1,f.available_to_waitlist=!1,f.user_has_borrowed=!0);let t={..._e,...f};p.lendingStatus=t})});document.querySelectorAll(".purchase input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?Re="https://www.google.com":Re="",p.bwbPurchaseUrl=Re})});document.querySelector(".pageChangedEvent").addEventListener("click",()=>{document.querySelector("ia-book-actions").dispatchEvent(new CustomEvent("BookReader:userAction",{detail:{},bubbles:!0,composed:!0}))});window.addEventListener("IABookReader:BrowsingHasExpired",()=>{console.log("IABookReader:BrowsingHasExpired EVENT FIRED")});
