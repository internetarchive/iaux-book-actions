const xt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}};xt();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se=globalThis,Ee=se.ShadowRoot&&(se.ShadyCSS===void 0||se.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Se=Symbol(),Ne=new WeakMap;class dt{constructor(e,t,i){if(this._$cssResult$=!0,i!==Se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ee&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ne.set(t,e))}return e}toString(){return this.cssText}}const Et=o=>new dt(typeof o=="string"?o:o+"",void 0,Se),d=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((i,n,s)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+o[s+1],o[0]);return new dt(t,o,Se)},St=(o,e)=>{if(Ee)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),n=se.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,o.appendChild(i)}},De=Ee?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Et(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Bt,defineProperty:Rt,getOwnPropertyDescriptor:It,getOwnPropertyNames:Pt,getOwnPropertySymbols:Mt,getPrototypeOf:Ot}=Object,x=globalThis,He=x.trustedTypes,Nt=He?He.emptyScript:"",pe=x.reactiveElementPolyfillSupport,V=(o,e)=>o,le={toAttribute(o,e){switch(e){case Boolean:o=o?Nt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Be=(o,e)=>!Bt(o,e),Ue={attribute:!0,type:String,converter:le,reflect:!1,useDefault:!1,hasChanged:Be};var ot,st;(ot=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(st=x.litPropertyMetadata)!=null||(x.litPropertyMetadata=new WeakMap);class U extends HTMLElement{static addInitializer(e){var t;this._$Ei(),((t=this.l)!=null?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Rt(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){var r;const{get:n,set:s}=(r=It(this.prototype,e))!=null?r:{get(){return this[t]},set(l){this[t]=l}};return{get:n,set(l){const a=n==null?void 0:n.call(this);s==null||s.call(this,l),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return(t=this.elementProperties.get(e))!=null?t:Ue}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;const e=Ot(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){const t=this.properties,i=[...Pt(t),...Mt(t)];for(const n of i)this.createProperty(n,t[n])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(De(n))}else e!==void 0&&t.push(De(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$EO)!=null?t:this._$EO=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var t;const e=(t=this.shadowRoot)!=null?t:this.attachShadow(this.constructor.shadowRootOptions);return St(e,this.constructor.elementStyles),e}connectedCallback(){var e,t;(e=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostConnected)==null?void 0:n.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var s;const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const r=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:le).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){var s,r,l;const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const a=i.getPropertyOptions(n),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)==null?void 0:s.fromAttribute)!==void 0?a.converter:le;this._$Em=n;const h=c.fromAttribute(t,a.type);this[n]=(l=h!=null?h:(r=this._$Ej)==null?void 0:r.get(n))!=null?l:h,this._$Em=null}}requestUpdate(e,t,i,n=!1,s){var r,l;if(e!==void 0){const a=this.constructor;if(n===!1&&(s=this[e]),i!=null||(i=a.getPropertyOptions(e)),!(((r=i.hasChanged)!=null?r:Be)(s,t)||i.useDefault&&i.reflect&&s===((l=this._$Ej)==null?void 0:l.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:s},r){var l,a,c;i&&!((l=this._$Ej)!=null?l:this._$Ej=new Map).has(e)&&(this._$Ej.set(e,(a=r!=null?r:t)!=null?a:this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&((c=this._$Eq)!=null?c:this._$Eq=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i,n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((i=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,l]of this._$Ep)this[r]=l;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,l]of s){const{wrapped:a}=l,c=this[r];a!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,l,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(n=this._$EO)==null||n.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}var rt;U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[V("elementProperties")]=new Map,U[V("finalized")]=new Map,pe==null||pe({ReactiveElement:U}),((rt=x.reactiveElementVersions)!=null?rt:x.reactiveElementVersions=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis,ze=o=>o,ce=J.trustedTypes,Fe=ce?ce.createPolicy("lit-html",{createHTML:o=>o}):void 0,ht="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ut="?"+$,Dt=`<${ut}>`,O=document,Y=()=>O.createComment(""),X=o=>o===null||typeof o!="object"&&typeof o!="function",Re=Array.isArray,Ht=o=>Re(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",we=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,We=/-->/g,je=/>/g,B=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ge=/'/g,qe=/"/g,gt=/^(?:script|style|textarea|title)$/i,pt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),p=pt(1),Ut=pt(2),E=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Ke=new WeakMap,I=O.createTreeWalker(O,129);function wt(o,e){if(!Re(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(e):e}const zt=(o,e)=>{const t=o.length-1,i=[];let n,s=e===2?"<svg>":e===3?"<math>":"",r=q;for(let l=0;l<t;l++){const a=o[l];let c,h,w=-1,f=0;for(;f<a.length&&(r.lastIndex=f,h=r.exec(a),h!==null);)f=r.lastIndex,r===q?h[1]==="!--"?r=We:h[1]!==void 0?r=je:h[2]!==void 0?(gt.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=B):h[3]!==void 0&&(r=B):r===B?h[0]===">"?(r=n!=null?n:q,w=-1):h[1]===void 0?w=-2:(w=r.lastIndex-h[2].length,c=h[1],r=h[3]===void 0?B:h[3]==='"'?qe:Ge):r===qe||r===Ge?r=B:r===We||r===je?r=q:(r=B,n=void 0);const y=r===B&&o[l+1].startsWith("/>")?" ":"";s+=r===q?a+Dt:w>=0?(i.push(c),a.slice(0,w)+ht+a.slice(w)+$+y):a+$+(w===-2?l:y)}return[wt(o,s+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Q{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0;const l=e.length-1,a=this.parts,[c,h]=zt(e,t);if(this.el=Q.createElement(c,i),I.currentNode=this.el.content,t===2||t===3){const w=this.el.content.firstChild;w.replaceWith(...w.childNodes)}for(;(n=I.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(const w of n.getAttributeNames())if(w.endsWith(ht)){const f=h[r++],y=n.getAttribute(w).split($),C=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:C[2],strings:y,ctor:C[1]==="."?Wt:C[1]==="?"?jt:C[1]==="@"?Gt:de}),n.removeAttribute(w)}else w.startsWith($)&&(a.push({type:6,index:s}),n.removeAttribute(w));if(gt.test(n.tagName)){const w=n.textContent.split($),f=w.length-1;if(f>0){n.textContent=ce?ce.emptyScript:"";for(let y=0;y<f;y++)n.append(w[y],Y()),I.nextNode(),a.push({type:2,index:++s});n.append(w[f],Y())}}}else if(n.nodeType===8)if(n.data===ut)a.push({type:2,index:s});else{let w=-1;for(;(w=n.data.indexOf($,w+1))!==-1;)a.push({type:7,index:s}),w+=$.length-1}s++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function W(o,e,t=o,i){var r,l,a;if(e===E)return e;let n=i!==void 0?(r=t._$Co)==null?void 0:r[i]:t._$Cl;const s=X(e)?void 0:e._$litDirective$;return(n==null?void 0:n.constructor)!==s&&((l=n==null?void 0:n._$AO)==null||l.call(n,!1),s===void 0?n=void 0:(n=new s(o),n._$AT(o,t,i)),i!==void 0?((a=t._$Co)!=null?a:t._$Co=[])[i]=n:t._$Cl=n),n!==void 0&&(e=W(o,n._$AS(o,e.values),n,i)),e}class Ft{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var c;const{el:{content:t},parts:i}=this._$AD,n=((c=e==null?void 0:e.creationScope)!=null?c:O).importNode(t,!0);I.currentNode=n;let s=I.nextNode(),r=0,l=0,a=i[0];for(;a!==void 0;){if(r===a.index){let h;a.type===2?h=new ee(s,s.nextSibling,this,e):a.type===1?h=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(h=new qt(s,this,e)),this._$AV.push(h),a=i[++l]}r!==(a==null?void 0:a.index)&&(s=I.nextNode(),r++)}return I.currentNode=O,n}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){var e,t;return(t=(e=this._$AM)==null?void 0:e._$AU)!=null?t:this._$Cv}constructor(e,t,i,n){var s;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=(s=n==null?void 0:n.isConnected)!=null?s:!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),X(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ht(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&X(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Q.createElement(wt(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===n)this._$AH.p(t);else{const r=new Ft(n,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=Ke.get(e.strings);return t===void 0&&Ke.set(e.strings,t=new Q(e)),t}k(e){Re(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new ee(this.O(Y()),this.O(Y()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const n=ze(e).nextSibling;ze(e).remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class de{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(e,t=this,i,n){const s=this.strings;let r=!1;if(s===void 0)e=W(this,e,t,0),r=!X(e)||e!==this._$AH&&e!==E,r&&(this._$AH=e);else{const l=e;let a,c;for(e=s[0],a=0;a<s.length-1;a++)c=W(this,l[i+a],t,a),c===E&&(c=this._$AH[a]),r||(r=!X(c)||c!==this._$AH[a]),c===b?e=b:e!==b&&(e+=(c!=null?c:"")+s[a+1]),this._$AH[a]=c}r&&!n&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Wt extends de{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}}class jt extends de{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}}class Gt extends de{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){var r;if((e=(r=W(this,e,t,0))!=null?r:b)===E)return;const i=this._$AH,n=e===b&&i!==b||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==b&&(i===b||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)==null?void 0:t.host)!=null?i:this.element,e):this._$AH.handleEvent(e)}}class qt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const fe=J.litHtmlPolyfillSupport;var at;fe==null||fe(Q,ee),((at=J.litHtmlVersions)!=null?at:J.litHtmlVersions=[]).push("3.3.3");const Kt=(o,e,t)=>{var s,r;const i=(s=t==null?void 0:t.renderBefore)!=null?s:e;let n=i._$litPart$;if(n===void 0){const l=(r=t==null?void 0:t.renderBefore)!=null?r:null;i._$litPart$=n=new ee(e.insertBefore(Y(),l),l,void 0,t!=null?t:{})}return n._$AI(o),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis;class _ extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return(i=(t=this.renderOptions).renderBefore)!=null||(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Kt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}var lt;_._$litElement$=!0,_.finalized=!0,(lt=P.litElementHydrateSupport)==null||lt.call(P,{LitElement:_});const be=P.litElementPolyfillSupport;be==null||be({LitElement:_});var ct;((ct=P.litElementVersions)!=null?ct:P.litElementVersions=[]).push("4.2.2");class Zt{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(n=>{n.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);!t||(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class z{constructor(e){var t,i,n,s,r,l,a,c,h;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!=null?t:"#55A183",this.bodyColor=(i=e==null?void 0:e.bodyColor)!=null?i:"#fbfbfd",this.showProcessingIndicator=(n=e==null?void 0:e.showProcessingIndicator)!=null?n:!1,this.processingImageMode=(s=e==null?void 0:e.processingImageMode)!=null?s:"complete",this.showCloseButton=(r=e==null?void 0:e.showCloseButton)!=null?r:!0,this.showLeftNavButton=(l=e==null?void 0:e.showLeftNavButton)!=null?l:!1,this.leftNavButtonText=(a=e==null?void 0:e.leftNavButtonText)!=null?a:"",this.showHeaderLogo=(c=e==null?void 0:e.showHeaderLogo)!=null?c:!0,this.closeOnBackdropClick=(h=e==null?void 0:e.closeOnBackdropClick)!=null?h:!0}}/*! *****************************************************************************
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
***************************************************************************** */function k(o,e,t,i){var n=arguments.length,s=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(o,e,t,i);else for(var l=o.length-1;l>=0;l--)(r=o[l])&&(s=(n<3?r(s):n>3?r(e,t,s):r(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt={attribute:!0,type:String,converter:le,reflect:!1,hasChanged:Be},Jt=(o=Vt,e,t)=>{const{kind:i,metadata:n}=t;let s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(t.name,o),i==="accessor"){const{name:r}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,a,o,!0,l)},init(l){return l!==void 0&&this.C(r,void 0,o,l),l}}}if(i==="setter"){const{name:r}=t;return function(l){const a=this[r];e.call(this,l),this.requestUpdate(r,a,o,!0,l)}}throw Error("Unsupported decorator location: "+i)};function te(o){return(e,t)=>typeof t=="object"?Jt(o,e,t):((i,n,s)=>{const r=n.hasOwnProperty(s);return n.constructor.createProperty(s,i),r?Object.getOwnPropertyDescriptor(n,s):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ze=(o,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(o,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Yt(o,e){return(t,i,n)=>{const s=r=>{var l,a;return(a=(l=r.renderRoot)==null?void 0:l.querySelector(o))!=null?a:null};if(e){const{get:r,set:l}=typeof i=="object"?t:n!=null?n:(()=>{const a=Symbol();return{get(){return this[a]},set(c){this[a]=c}}})();return Ze(t,i,{get(){let a=r.call(this);return a===void 0&&(a=s(this),(a!==null||this.hasUpdated)&&l.call(this,a)),a}})}return Ze(t,i,{get(){return s(this)}})}}function*Pe(o=document.activeElement){o!=null&&(yield o,"shadowRoot"in o&&o.shadowRoot&&o.shadowRoot.mode!=="closed"&&(yield*Pe(o.shadowRoot.activeElement)))}function ft(){return[...Pe()].pop()}const Ve=new WeakMap;function bt(o){let e=Ve.get(o);return e||(e=window.getComputedStyle(o,null),Ve.set(o,e)),e}function Xt(o){if("checkVisibility"in o&&typeof o.checkVisibility=="function")return o.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=bt(o);return e.visibility!=="hidden"&&e.display!=="none"}function Qt(o){const e=bt(o),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:o.scrollHeight>o.clientHeight&&t==="auto"||o.scrollWidth>o.clientWidth&&i==="auto"}function ei(o){const e=o.tagName.toLowerCase(),t=Number(o.getAttribute("tabindex"));return o.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||o.hasAttribute("disabled")||o.closest("[inert]")||e==="input"&&o.getAttribute("type")==="radio"&&!o.hasAttribute("checked")||!Xt(o)?!1:(e==="audio"||e==="video")&&o.hasAttribute("controls")||o.hasAttribute("tabindex")||o.hasAttribute("contenteditable")&&o.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Qt(o)}function ti(o,e){var t;return((t=o.getRootNode({composed:!0}))==null?void 0:t.host)!==e}function Je(o){const e=new WeakMap,t=[];function i(n){if(n instanceof Element){if(n.hasAttribute("inert")||n.closest("[inert]")||e.has(n))return;e.set(n,!0),!t.includes(n)&&ei(n)&&t.push(n),n instanceof HTMLSlotElement&&ti(n,o)&&n.assignedElements({flatten:!0}).forEach(s=>{i(s)}),n.shadowRoot!==null&&n.shadowRoot.mode==="open"&&i(n.shadowRoot)}for(const s of Array.from(n.children))i(s)}return i(o),t.sort((n,s)=>{const r=Number(n.getAttribute("tabindex"))||0;return(Number(s.getAttribute("tabindex"))||0)-r})}let K=[];class ii{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{!this.isActive()||this.checkFocus()},this.handleKeyDown=t=>{var l;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=ft();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const n=Je(this.element);let s=n.findIndex(a=>a===i);this.previousFocus=this.currentFocus;const r=this.tabDirection==="forward"?1:-1;for(;;){s+r>=n.length?s=0:s+r<0?s=n.length-1:s+=r,this.previousFocus=this.currentFocus;const a=n[s];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||a&&this.possiblyHasTabbableChildren(a))return;t.preventDefault(),this.currentFocus=a,(l=this.currentFocus)==null||l.focus({preventScroll:!1});const c=[...Pe()];if(c.includes(this.currentFocus)||!c.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){K.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){K=K.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return K[K.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=Je(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],n=this.tabDirection==="forward"?t:i;typeof(n==null?void 0:n.focus)=="function"&&(this.currentFocus=n,n.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}var Ye;(function(o){o.processing="processing",o.complete="complete"})(Ye||(Ye={}));let Le=class extends _{constructor(){super(...arguments),this.mode="processing"}render(){return p`
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
    `}static get styles(){const e=d`var(--activityIndicatorCheckmarkColor, #31A481)`,t=d`var(--activityIndicatorCompletedRingColor, #31A481)`,i=d`var(--activityIndicatorLoadingRingColor, #333333)`,n=d`var(--activityIndicatorLoadingDotColor, #333333)`;return d`
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
    `}};k([te({type:String})],Le.prototype,"mode",void 0);Le=k([Ie("ia-activity-indicator")],Le);var ni=p`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`;class oi extends _{static get styles(){return d`
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
    `}render(){return ni}}customElements.define("ia-icon-close",oi);var si=p`
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
`,ri=p`
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
`;let ke=class extends _{constructor(){super(...arguments),this.config=new z}render(){return p`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton?this.leftNavButtonTemplate:b}
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?p`<div class="logo-icon">${si}</div>`:b}
            ${this.config.title?p`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?p`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
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
              ${this.config.headline?p` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?p` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}handleLeftNavButtonPressed(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("leftNavButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return p`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}get leftNavButtonTemplate(){var e;return p`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${ri} ${(e=this.config.leftNavButtonText)!=null?e:""}
    </button> `}static get styles(){const e=d`var(--modalLogoSize, 6.5rem)`,t=d`var(--processingImageSize, 7.5rem)`,i=d`var(--modalCornerRadius, 1rem)`,n=d`var(--modalBorder, 2px solid black)`,s=d`var(--modalBottomMargin, 2.5rem)`,r=d`var(--modalTopMargin, 5rem)`,l=d`var(--modalHeaderBottomPadding, 0.5em)`,a=d`var(--modalBottomPadding, 2rem)`,c=d`var(--modalScrollOffset, 5px)`,h=d`var(--modalTitleFontSize, 1.8rem)`,w=d`var(--modalSubtitleFontSize, 1.4rem)`,f=d`var(--modalHeadlineFontSize, 1.6rem)`,y=d`var(--modalMessageFontSize, 1.4rem)`,C=d`var(--modalTitleLineHeight, normal)`,ie=d`var(--modalSubtitleLineHeight, normal)`,N=d`var(--modalHeadlineLineHeight, normal)`,D=d`var(--modalMessageLineHeight, normal)`;return d`
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
        padding-bottom: ${l};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${h};
        font-weight: bold;
        line-height: ${C};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${w};
        line-height: ${ie};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${n};
        border-top: 0;
        padding: 0 1rem calc(${a} - ${c}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${s}));
        min-height: 5rem;
        padding: 0 0 calc(${c}) 0;
      }

      .headline {
        font-size: ${f};
        font-weight: bold;
        text-align: center;
        line-height: ${N};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${y};
        line-height: ${D};
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
    `}};k([te({type:Object})],ke.prototype,"config",void 0);ke=k([Ie("modal-template")],ke);function ai(o,e,t){var i=t||{},n=i.noTrailing,s=n===void 0?!1:n,r=i.noLeading,l=r===void 0?!1:r,a=i.debounceMode,c=a===void 0?void 0:a,h,w=!1,f=0;function y(){h&&clearTimeout(h)}function C(N){var D=N||{},S=D.upcomingOnly,ge=S===void 0?!1:S;y(),w=!ge}function ie(){for(var N=arguments.length,D=new Array(N),S=0;S<N;S++)D[S]=arguments[S];var ge=this,Me=Date.now()-f;if(w)return;function ne(){f=Date.now(),e.apply(ge,D)}function Oe(){h=void 0}!l&&c&&!h&&ne(),y(),c===void 0&&Me>o?l?(f=Date.now(),s||(h=setTimeout(c?Oe:ne,o))):ne():s!==!0&&(h=setTimeout(c?Oe:ne,c===void 0?o-Me:o))}return ie.cancel=C,ie}var T;(function(o){o.Open="open",o.Closed="closed"})(T||(T={}));class li{constructor(e){this.windowResizeThrottler=ai(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case T.Open:this.startResizeListener(),this.stopDocumentScroll();break;case T.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let j=class extends _{constructor(){super(...arguments),this.mode=T.Closed,this.hostBridge=new li(this),this.modal=new ii(this),this.closeOnBackdropClick=!0}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return p`
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
    `}getMode(){return this.mode}closeModal(){var e,t;this.mode=T.Closed,this.customModalContent=void 0,this.modalTemplate&&(this.modalTemplate.config=new z),this.modal.deactivate(),(t=(e=this.triggeringElement)==null?void 0:e.focus)==null||t.call(e),this.triggeringElement=void 0}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}callUserPressedLeftNavButtonCallback(){const e=this.userPressedLeftNavButtonCallback;this.userPressedLeftNavButtonCallback=void 0,e&&e()}async showModal(e){this.mode===T.Closed&&this.captureFocusedElement(),this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.userPressedLeftNavButtonCallback=e.userPressedLeftNavButtonCallback,this.customModalContent=e.customModalContent,this.mode=T.Open,this.modalTemplate&&(this.modalTemplate.config=e.config,await this.modalTemplate.updateComplete,this.modalTemplate.focus()),this.modal.activate()}captureFocusedElement(){this.triggeringElement=ft()}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=d`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=d`var(--modalBackdropZindex, 1000)`,i=d`var(--modalWidth, 32rem)`,n=d`var(--modalMaxWidth, 95%)`,s=d`var(--modalZindex, 2000)`;return d`
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
    `}};k([te({type:String,reflect:!0})],j.prototype,"mode",void 0);k([te({type:Object})],j.prototype,"customModalContent",void 0);k([te({type:Object})],j.prototype,"hostBridge",void 0);k([Yt("modal-template")],j.prototype,"modalTemplate",void 0);j=k([Ie("modal-manager")],j);function G(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function ci(o,e){const t=indexedDB.open(o);t.onupgradeneeded=()=>t.result.createObjectStore(e);const i=G(t);return(n,s)=>i.then(r=>s(r.transaction(e,n).objectStore(e)))}let me;function he(){return me||(me=ci("keyval-store","keyval")),me}function di(o,e=he()){return e("readonly",t=>G(t.get(o)))}function hi(o,e,t=he()){return t("readwrite",i=>(i.put(e,o),G(i.transaction)))}function ui(o,e=he()){return e("readwrite",t=>(t.delete(o),G(t.transaction)))}function gi(o,e){return o.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},G(o.transaction)}function pi(o=he()){return o("readonly",e=>{if(e.getAllKeys)return G(e.getAllKeys());const t=[];return gi(e,i=>t.push(i.key)).then(()=>t)})}function wi(o,e){return o.setMilliseconds(o.getMilliseconds()+e*1e3),o}class mt{constructor(e){var t,i,n,s;if(this.namespace=(t=e==null?void 0:e.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(i=e==null?void 0:e.defaultTTL)!==null&&i!==void 0?i:15*60,(!((n=e==null?void 0:e.immediateClean)!==null&&n!==void 0)||n)&&this.cleanExpired(),!(e!=null&&e.disableCleaning)){const r=(s=e==null?void 0:e.cleaningInterval)!==null&&s!==void 0?s:60;setInterval(()=>{this.cleanExpired()},r*1e3)}}async set(e){var t;const i={value:e.value},n=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,s=wi(new Date,n);i.expires=s;const r=this.getNamespacedKey(e.key);try{await hi(r,i)}catch{}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await di(t)}catch{}if(!i)return;const n=new Date;if(i.expires&&i.expires<n){await this.delete(e);return}return i.value}async delete(e){const t=this.getNamespacedKey(e);try{await ui(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await pi()}catch{}const t=[];for(const s of e)typeof s=="string"&&t.push(s);return t.filter(s=>s.startsWith(this.namespace)).map(s=>this.removeNamespace(s))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vt=o=>(...e)=>({_$litDirective$:o,values:e});class At{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=vt(class extends At{constructor(o){var e;if(super(o),o.type!==yt.ATTRIBUTE||o.name!=="class"||((e=o.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var i,n;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!((i=this.nt)!=null&&i.has(s))&&this.st.add(s);return this.render(e)}const t=o.element.classList;for(const s of this.st)s in e||(t.remove(s),this.st.delete(s));for(const s in e){const r=!!e[s];r===this.st.has(s)||((n=this.nt)==null?void 0:n.has(s))||(r?(t.add(s),this.st.add(s)):(t.remove(s),this.st.delete(s)))}return E}});class A{static isInIframe(){var e;try{return window.self!==window.top}catch(t){return(e=window==null?void 0:window.Sentry)==null||e.captureException(t),!0}}static getRedirectUrl(){let e;return A.isInIframe()?e=window.top.location.href:e=window.location.href,e}static goToUrl(e,t){let i;A.isInIframe()&&t?i=window.top.location:i=window.location,i.href===e?i.reload():i.href=e}static isOnStreamPage(){return window.location.href.indexOf("/stream/")>-1}static getQueryParam(e){const i=window.location.search.substring(1).split("&");let n="";for(let s=0;s<i.length;s+=1)if(n=i[s].split("="),n[0]===e)return n[1];return b}static getBackHref(){return window.location.href.replace(/[?&]{1}(?:admin|access)=1/,"")}static formatUrl(e,t){return/^https?:/.test(t)?t:`${e}${t}`}}const L={disconnectedCallback:"IABookActions:disconnectedCallback",bookHasRenewed:"IABookActions:handleLoanAutoRenewed - book has renewed for next one hour",bookRenewFailed:"IABookActions:handleLoanRenewNow - failed to renew",browseHasExpired:"IABookActions:browseHasExpired - one-hour loan has been expired",bookWasExpired:"IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller",clearTokenPoller:"IABookActions:startLoanTokenPoller - clearing token poller interval",clearOneHourTimer:"IABookActions:timerCountdown - one-hour timer interval cleared",bookAccessed:"IABookActions:bookAccessed",handleLoanTokenPoller:"IABookActions:handleLoanTokenPoller",setConsecutiveLoanCounts:"IABookActions:setConsecutiveLoanCounts",actionsHandlerService:"IABookActions:actionsHandlerService"},m=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)||location.host.match(/^internetarchive/)?console.log.bind(console):()=>{};async function R(o){var w;const e={action:null,identifier:"",success(){},error(){},...o};let t="/services/loans/loan";const i=window==null?void 0:window.location,n="loan token not found. please try again later.",s="This book is not available to borrow at this time. Please try again later.",r=["browse_book","borrow_book","create_token","renew_loan","return_loan"],l=new URLSearchParams(i==null?void 0:i.search).get("error")==="true"&&(i==null?void 0:i.hostname)!=="archive.org",a=["localhost","internetarchive.github.io"];let c=!1;a.includes(i.hostname)&&(c=!0,t=i.href);let h=new FormData;h.append("action",e.action),h.append("identifier",e.identifier);try{await fetch(t,{method:"POST",body:h}).then(async f=>l&&r.includes(e==null?void 0:e.action)?{success:!1,error:(e==null?void 0:e.action)==="create_token"?n:s}:c?(e==null?void 0:e.action)=="renew_loan"||(e==null?void 0:e.action)=="return_loan"?(await new Promise(y=>setTimeout(y,5e3)),{success:!0,loan:{renewal:!0}}):{success:!0,message:"operation executed successfully!"}:f.json()).then(f=>{f!=null&&f.error?(m(`[IABookActions] \u2717 ${e.action} failed`,f),e==null||e.error(f)):(m(`[IABookActions] \u2713 ${e.action} succeeded`,f),e==null||e.success(f))})}catch(f){(w=window==null?void 0:window.Sentry)==null||w.captureException(`${L.actionsHandlerService} - Error: ${f}`)}}const M={borrow:"BookReader-ReadingBorrow",browse:"BookReader-ReadingBrowse",preview:"BookReader-Preview",satisfactionMetric:"DetailsPage-Book",bookReaderHeader:"BookReader-Header",adminAccess:"Admin-Access"},F={browse:"Borrow-1Hour",browseAgain:"Borrow-Again",browseRenew:"BookRenew",browseReturn:"BookReturn",borrow:"Borrow-14Days",waitlistJoin:"JoinWaitlist",waitlistLeave:"LeaveWaitlist",doneBorrowing:"ReturnBook",login:"LogIn",purchase:"BWBPurchase",unavailable:"Book-Unavailable",printDisability:"Print-Disability",titleBar:"Book-Title-Bar"},oe={browseAutoRenew:"BookAutoRenew",browseAutoReturn:"BookAutoReturn",browseManualRenew:"BookManualRenew",browseManualReturn:"BookManualReturn"};function fi(o){return o&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(o).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}function re(o,e,t,i,n,s){return document.cookie=encodeURIComponent(o)+"="+encodeURIComponent(e)+(t?`; expires=${t.toUTCString()}`:"")+(n?`; domain=${n}`:"")+(i?`; path=${i}`:"")+(s?"; secure":""),!0}class _t{constructor(){this.identifier=void 0,this.gaStats={}}async storeLoanStatsCount(e,t=""){this.identifier=e;try{await this.getLoanStatsCount(t),this.sendMatrixStatsEvents(t);const i=new Date;i.setHours(i.getHours()+2),await re(this.getLoanCountStorageKey,JSON.stringify(this.lendingEventCounts),i,"/")}catch(i){m(i),this.sendEvent("Cookies-Error-Actions",i,this.identifier)}}async getLoanStatsCount(e){var s,r,l,a,c,h,w;this.lendingEventCounts=JSON.parse(await fi(this.getLoanCountStorageKey)),this.gaStats=(s=this.lendingEventCounts)!=null?s:{browse:0,renew:0,expire:0};let t=(l=(r=this.lendingEventCounts)==null?void 0:r.browse)!=null?l:0,i=(c=(a=this.lendingEventCounts)==null?void 0:a.renew)!=null?c:0,n=(w=(h=this.lendingEventCounts)==null?void 0:h.expire)!=null?w:0;switch(e){case"browse":t=t?Number(t)+1:1,this.gaStats.browse=t,i=0,n=0;break;case"autorenew":i=i?Number(i)+1:1,this.gaStats.renew=i;break;case"return":n=n?Number(n)+1:1,this.gaStats.expire=n,i=0,n=0;break}this.lendingEventCounts={browse:t,renew:i,expire:n}}sendMatrixStatsEvents(e){var n,s;const t=M.browse,i=`browse${this.paddedNumber((n=this.gaStats)==null?void 0:n.browse)}-autorenew${this.paddedNumber((s=this.gaStats)==null?void 0:s.renew)}:${e}`;this.sendEvent(t,i,this.identifier)}paddedNumber(e){return e?e.toString().padStart(3,"0"):"000"}get getLoanCountStorageKey(){return`br-browse-${this.identifier}`}sendEvent(e,t,i,n){var s;m("eventCategory:-",e,"||	eventAction:-",t,"||	label:-",i,"||	extraParams:-",n),(s=window==null?void 0:window.archive_analytics)==null||s.send_event_no_sampling(e,t,i||this.identifier,n)}}class Ct extends _{constructor(){super(),this.waitUntillBorrowComplete=6,this.loanAnanlytics=new _t,this.bindEvents()}bindEvents(){this.addEventListener("browseBook",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browse"))}),this.addEventListener("browseBookAgain",async()=>{var e;this.handleBrowseIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"browseagain"))}),this.addEventListener("autoRenew",({detail:e})=>{this.handleLoanRenewNow(e==null?void 0:e.renewType)}),this.addEventListener("autoReturn",async()=>{var e,t;this.handleReturnIt(),await((e=this.loanAnanlytics)==null?void 0:e.storeLoanStatsCount(this.identifier,"autoreturn")),(t=this.loanAnanlytics)==null||t.sendEvent(M.browse,F.browseReturn,oe.browseAutoReturn,this.identifier)}),this.addEventListener("returnNow",({detail:e})=>{var t,i,n;if((e==null?void 0:e.borrowType)==="browse"&&((t=this.loanAnanlytics)==null||t.storeLoanStatsCount(this.identifier,"return"),(i=this.loanAnanlytics)==null||i.sendEvent(M.browse,F.browseReturn,oe.browseManualReturn,this.identifier)),this.handleReturnIt("returnNow"),(e==null?void 0:e.borrowType)==="borrow"){const{category:s,action:r}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(s,r,this.identifier)}}),this.addEventListener("borrowBook",({detail:e})=>{var n;this.handleBorrowIt();const{category:t,action:i}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(t,i,this.identifier)}),this.addEventListener("loginAndBorrow",({detail:e})=>{var n;this.handleLoginOk();const{category:t,action:i}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(t,i,this.identifier)}),this.addEventListener("leaveWaitlist",({detail:e})=>{var n;this.handleRemoveFromWaitingList();const{category:t,action:i}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(t,i,this.identifier)}),this.addEventListener("joinWaitlist",({detail:e})=>{var n;this.handleReserveIt();const{category:t,action:i}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(t,i,this.identifier)}),this.addEventListener("purchaseBook",({detail:e})=>{var n;const{category:t,action:i}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(t,i,this.identifier)}),this.addEventListener("adminAccess",({detail:e})=>{var s;const{category:t,action:i}=e.event;(s=this.loanAnanlytics)==null||s.sendEvent(t,i,this.identifier),this.setStickyAdminAccess(!0);const n=new URL(window.location.href);n.searchParams.append("admin",1),window.location.search=n.search}),this.addEventListener("exitAdminAccess",({detail:e})=>{var n;const{category:t,action:i}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(t,i,this.identifier),this.setStickyAdminAccess(!1)}),this.addEventListener("bookTitleBar",({detail:e})=>{var n;const{category:t,action:i}=e.event;(n=this.loanAnanlytics)==null||n.sendEvent(t,i,this.identifier)})}handleBrowseIt(){const e="browse_book";this.dispatchToggleActionGroup(),R({action:e,identifier:this.identifier,success:()=>{this.setBrowseTimeSession(),this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleLoanRenewNow(e){const t="renew_loan";R({action:t,identifier:this.identifier,success:async i=>{var r,l,a;m("RENEW_LOAN --- ",i,t,i.loan,this.identifier);const n=i.loan?i.loan:void 0,s=n.renewal;if(n&&s){await this.setBrowseTimeSession(),await((r=this.loanAnanlytics)==null?void 0:r.storeLoanStatsCount(this.identifier,"autorenew"));const c=e==="auto"?oe.browseAutoRenew:oe.browseManualRenew;(l=this.loanAnanlytics)==null||l.sendEvent(M.browse,F.browseRenew,c,this.identifier)}else m("RENEW_LOAN ERROR --- ",{action:t,isRenewal:s,activeLoan:n,data:i,id:this.identifier}),(a=window==null?void 0:window.Sentry)==null||a.captureMessage(`${L.bookRenewFailed} - Error: ${JSON.stringify(i)}`),this.dispatchActionError(t,{data:i,error:!0,message:"Loan renewal failed: no loan active."});this.dispatchEvent(new CustomEvent("loanAutoRenewed",{detail:{action:t,data:{...i,loan:n}}}))},error:i=>{this.dispatchActionError(t,i)}})}handleReturnIt(e=""){const t="return_loan";e==="returnNow"&&this.dispatchToggleActionGroup(),R({action:t,identifier:this.identifier,success:()=>{this.deleteLoanCookies(),e==="returnNow"&&A.goToUrl(this.returnUrl,!0)},error:i=>{this.dispatchActionError(t,i)}})}handleBorrowIt(){const e="borrow_book";this.dispatchToggleActionGroup(),R({action:e,identifier:this.identifier,success:()=>{this.handleReadItNow()},error:t=>{this.dispatchActionError(e,t)}})}handleReserveIt(){const e="join_waitlist";this.dispatchToggleActionGroup(),R({action:e,identifier:this.identifier,success:()=>{A.goToUrl(A.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}handleRemoveFromWaitingList(){const e="leave_waitlist";this.dispatchToggleActionGroup(),R({action:e,identifier:this.identifier,success:()=>{A.goToUrl(A.getRedirectUrl(),!0)},error:t=>{this.dispatchActionError(e,t)}})}dispatchActionError(e,t={}){var i;(i=this.loanAnanlytics)==null||i.sendEvent("LendingServiceError",e),this.dispatchEvent(new CustomEvent("lendingActionError",{detail:{action:e,data:t}}))}dispatchToggleActionGroup(){this.dispatchEvent(new CustomEvent("toggleActionGroup"))}handleLoginOk(){const e=`/account/login?referer=${encodeURIComponent(A.getRedirectUrl())}`;A.goToUrl(e,!0)}handleReadItNow(e){const t=new URLSearchParams(window.location.search);if(e){const r=new URLSearchParams(e);for(const[l,a]of r.entries())t.append(l,a)}const i=t.toString(),n=i?`?${i}`:"",s=window.location.origin+window.location.pathname+n;setTimeout(()=>{A.goToUrl(s,!0)},this.waitUntillBorrowComplete*1e3)}async setBrowseTimeSession(){try{const e=new Date(new Date().getTime()+this.loanTotalTime*1e3);await this.localCache.set({key:`${this.identifier}-loanTime`,value:e,ttl:Number(this.loanTotalTime)}),await this.localCache.delete(`${this.identifier}-pageChangedTime`)}catch(e){m(e)}}deleteLoanCookies(){const e=new Date;e.setTime(e.getTime()-24*60*60*1e3),re(`loan-${this.identifier}=""`,"",e,"/",".archive.org"),re(`br-loan-${this.identifier}=""`,"",e,"/",".archive.org")}setStickyAdminAccess(e){const t=window.location.hostname==="localhost"?"localhost":".archive.org",i=new Date(Date.now()+30*24*60*60*1e3);re("sticky-admin-access",e,i,"/",t)}}const Qe=d`var(--white, #fff)`,bi=d`var(--primaryDisableCTAFill, #767676)`,mi=d`var(--secondaryCTABorder, #999)`,yi=d`var(--primaryCTAFill, #194880)`,ye=d`var(--primaryCTAFillRGB, 25, 72, 128)`,vi=d`var(--primaryCTABorder, #c5d1df)`,Ai=d`var(--primaryErrorCTAFill, #d9534f)`,ve=d`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,_i=d`var(--primaryErrorCTABorder, #d43f3a)`,Ci=d`var(--secondaryCTAFill, #333)`,Ae=d`var(--secondaryCTAFillRGB, 51, 51, 51)`,Li=d`var(--primaryCTABorder, #979797)`,ki=d`#ee8950`,$i=d`#ec7939`;var Ti=d`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${Qe};
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
    outline-color: ${Qe};
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
    background-color: ${bi};
    border: 1px solid ${mi};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${ki}
    border-color: ${$i};
  }

  .ia-button.primary {
    background-color: ${yi};
    border-color: ${vi};
  }
  .ia-button.primary:hover {
    background-color: rgba(${ye}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${ye}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${ye}, 0.7);
  }

  .ia-button.danger {
    background-color: ${Ai};
    border-color: ${_i};
  }
  .ia-button.danger:hover {
    background-color: rgba(${ve}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${ve}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${ve}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Ci};
    border-color: ${Li};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Ae}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Ae}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Ae}, 0.7);
  }
`;const H=d`var(--white, #fff)`,et=d`var(--primaryBGColor, #000)`,xi=d`var(--iaBookActionsDropdownBGColor, #2d2d2d)`;var Ei=d`
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
    background-color: ${H};
    border-radius: 10px;
  }
  .action-buttons .desktop.purchase {
    margin-left: 5px;
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${H};
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
    background-color: ${et};
    border: 1px solid ${H};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    background: ${xi};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${et};
    list-style: none;
    height: 3rem;
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${H};
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
    background: ${H};
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
    background-color: ${H};
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
`;const tt=700,Si=800,Bi=p`<svg
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
</svg>`,Ri=p`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
    fill="#fff"
  />
</svg>`,_e=p`<svg
  height="4"
  viewBox="0 0 8 4"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill="#fff"
  />
</svg>`;class Ii extends Ct{static get properties(){return{userid:{type:String},identifier:{type:String},primaryActions:{type:Array},secondaryActions:{type:Array},primaryColor:{type:String},dropdownState:{type:String},width:{type:Number},hasAdminAccess:{type:Boolean},dropdownArrow:{type:String},disabled:{type:Boolean},returnUrl:{type:String},autoRenew:{type:Boolean},loanRenewType:{type:String},autoReturn:{type:Boolean},returnNow:{type:Boolean}}}constructor(){super(),this.userid="",this.identifier="",this.primaryActions=[],this.secondaryActions=[],this.primaryColor="",this.dropdownState="close",this.width=0,this.hasAdminAccess=!1,this.dropdownArrow=_e,this.initialButton=!1,this.title="",this.loaderIcon="https://archive.org/upload/images/tree/loading.gif",this.disabled=!1,this.returnUrl="",this.autoRenew=!1,this.loanRenewType="",this.autoReturn=!1,this.returnNow=!1}updated(e){(e.has("width")||e.has("disabled"))&&this.isBelowTabletContainer&&this.resetActions(),e.has("autoRenew")&&this.autoRenew&&this.dispatchLoanEvent("autoRenew",{renewType:this.loanRenewType});const t=e.has("autoReturn")&&this.autoReturn;t&&this.dispatchLoanEvent("autoReturn"),e.has("returnNow")&&this.returnNow&&!t&&this.dispatchLoanEvent("returnNow",{borrowType:"browse"})}dispatchLoanEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}resetActions(){this.primaryActions.length&&(this.primaryActions=this.primaryActions.concat(this.secondaryActions),this.primaryColor=this.primaryActions[0].className,this.hasAdminAccess&&this.sortActionButtonOrder(),this.secondaryActions=[])}sortActionButtonOrder(){let e=1;const t=0;this.secondaryActions.length===2&&(e=2),e=this.primaryActions.length-e;const i=this.primaryActions[e],n=this.primaryActions;n.splice(e,1),n.splice(t,0,i),this.primaryActions=n}render(){return p`
      <div
        class="${Xe({actiongroup:!0,disabled:this.disabled})}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `}get renderPrimaryActions(){return this.primaryActions.length===0?b:(this.dropdownState==="close"&&(this.primaryColor=this.primaryActions[0].className),this.primaryActions.length===1?this.initialActionTemplate:p`
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
    `)}get renderSecondaryActions(){return this.secondaryActions.length?this.secondaryActions.map(e=>this.renderActionButton(e)):b}renderActionLink(e,t=!1){return p`<span class="${this.getDeviceType} ${e.className}">
      <a
        class="ia-button ${e.className} ${t?"initial":""}"
        href="${e.url}"
        target=${e.target}
        @click=${()=>{this.clickHandler(e.id,e.analyticsEvent,e==null?void 0:e.borrowType)}}
      >
        ${e.id==="purchaseBook"?Bi:""} ${e.text}
        <small>${e.subText}</small>
      </a>
    </span>`}renderActionButton(e,t=!1){if(e.url)return this.renderActionLink(e,t);const{analyticsEvent:i}=e;return p`<button
      class="ia-button ${e.className} ${t?"initial":""}"
      @click=${()=>{this.clickHandler(e.id,i,e==null?void 0:e.borrowType)}}
    >
      ${e.text}
    </button>`}clickHandler(e,t,i=""){if(this.dropdownState="close",this.dropdownArrow=_e,!t||!e)return;const{category:n,action:s}=t;this.dispatchEvent(new CustomEvent(e,{detail:{event:{category:n,action:s},borrowType:i}}))}get initialActionTemplate(){return this.initialButton=!1,this.primaryActions.length>1&&(this.initialButton=!0),this.renderActionButton(this.primaryActions[0],this.initialButton)}get getPrimaryItems(){return this.primaryActions.slice(1).map(e=>p`<li>${this.renderActionButton(e,this.initialButton)}</li>`)}get getLoaderIcon(){return p`<img
      class="${Xe({actionloader:!0,disabled:this.disabled})}"
      alt=""
      src="${this.loaderIcon}"
    />`}get isBelowTabletContainer(){return this.width<=Si}get getDeviceType(){return this.isBelowTabletContainer?"mobile":"desktop"}toggleDropdown(){this.dropdownState==="open"?(this.dropdownState="close",this.dropdownArrow=_e,this.primaryColor=this.primaryActions[0].className):(this.dropdownState="open",this.dropdownArrow=Ri,this.primaryColor="dark")}static get styles(){return[Ti,Ei]}}window.customElements.define("collapsible-action-group",Ii);const Pi=p`
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
`;class Mi extends Ct{static get properties(){return{identifier:{type:String},bookTitle:{type:String}}}constructor(){super(),this.identifier="",this.bookTitle="",this.analyticsCategories=M,this.analyticsActions=F}clickHandler(){const{category:e,action:t}={category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.titleBar};this.dispatchEvent(new CustomEvent("bookTitleBar",{detail:{event:{category:e,action:t}}}))}render(){return p`
      <a
        class="embed-link"
        @click=${()=>{this.clickHandler()}}
        href="/details/${this.identifier}"
      >
        <span>${Pi}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `}static get styles(){return d`
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
    `}}window.customElements.define("book-title-bar",Mi);class Oi extends _{static get properties(){return{texts:{type:String},textClass:{type:String}}}constructor(){super(),this.texts="",this.textClass=""}render(){return p`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `}static get styles(){return d`
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
    `}}window.customElements.define("text-group",Oi);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class $e extends At{constructor(e){if(super(e),this.it=b,e.type!==yt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===b||e==null)return this._t=void 0,this.it=e;if(e===E)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}$e.directiveName="unsafeHTML",$e.resultType=1;const Ni=vt($e);var Di=p`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m0 0h100v100h-100z" fill="#000"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" class="fill-color" fill="#fff" fill-rule="nonzero"/>
</svg>
`;class Hi extends _{static get styles(){return d`
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
    `}render(){return Di}}customElements.define("ia-icon-info",Hi);class Ui extends _{static get properties(){return{iconClass:{type:String}}}constructor(){super(),this.iconClass="",this.helpURL="https://help.archive.org/help/borrowing-from-the-lending-library"}render(){return p`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `}get getInfoIcon(){return Ut`${Ni(this.icon)}`}static get styles(){return d`
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
    `}}window.customElements.define("info-icon",Ui);class zi extends _{static get properties(){return{secondsLeftOnLoan:{type:Number},displayTime:{type:Boolean}}}constructor(){super(),this.secondsLeftOnLoan=0,this.displayTime=!1}get minutesLeftOnLoan(){let e=Math.round(this.secondsLeftOnLoan);return e=Math.ceil(e/60),e<10?e=`0:0${e}`:e===60?e="1:00":e=`0:${e}`,e}get remainingTime(){const e="minute",t=this.minutesLeftOnLoan;return t!==1?`${t} ${e}s`:`${t} ${e}`}render(){const e=this.displayTime?"view":"hide";return p`
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
    `}static get styles(){return d`
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
    `}}window.customElements.define("timer-countdown",zi);window.IALendingIntervals={tokenPoller:0,timerCountdown:0,browseExpireTimeout:0,clearTokenPoller:()=>{window.clearInterval(window.IALendingIntervals.tokenPoller),window.IALendingIntervals.tokenPoller=0},clearTimerCountdown:()=>{window.clearInterval(window.IALendingIntervals.timerCountdown),window.IALendingIntervals.timerCountdown=0},clearBrowseExpireTimeout:()=>{window.clearTimeout(window.IALendingIntervals.browseExpireTimeout),window.IALendingIntervals.browseExpireTimeout=0},clearAll:()=>{var o,e,t;(o=window==null?void 0:window.IALendingIntervals)==null||o.clearTokenPoller(),(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTimerCountdown(),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearBrowseExpireTimeout()}};class Fi{constructor(e,t,i={},n){this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=n,this.printDisabilityLink="/details/printdisabled?tab=about",this.analyticsCategories=M,this.analyticsActions=F}firstBrowseConfig(){return{id:"browseBook",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.browse}}}browseAgainConfig(){return{id:"browseBookAgain",text:"Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.browse,action:this.analyticsActions.browseAgain}}}returnBookConfig(){const e=this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.borrow;return{id:"returnNow",text:"Return now",className:"danger",analyticsEvent:{category:e,action:this.analyticsActions.doneBorrowing},borrowType:this.lendingStatus.user_has_browsed?"browse":"borrow"}}borrowBookConfig(e=!1){return!this.lendingStatus.available_to_borrow&&!this.lendingStatus.user_is_printdisabled||this.lendingStatus.user_has_borrowed?null:{id:"borrowBook",text:"Borrow for 14 days",className:"primary",disabled:e,analyticsEvent:{category:this.lendingStatus.user_has_browsed?this.analyticsCategories.browse:this.analyticsCategories.preview,action:this.analyticsActions.borrow}}}loginAndBorrowBookConfig(){return{id:"loginAndBorrow",text:"Log In and Borrow",className:"primary",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}leaveWaitlistConfig(){return{id:"leaveWaitlist",text:"Leave Waitlist",className:"dark",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistLeave}}}loginAndWaitlistConfig(){return{id:"loginAndWaitlist",text:"Log In and Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.login}}}waitlistConfig(){const e=!!this.userid,t=this.lendingStatus||{};return!t.available_to_waitlist||t.available_to_borrow?null:e?{id:"joinWaitlist",text:"Join Waitlist",className:"warning",analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.waitlistJoin}}:this.loginAndWaitlistConfig()}purchaseConfig(){return this.bwbPurchaseUrl?{id:"purchaseBook",text:"Purchase at ",subText:"Better World Books",title:"Purchase",url:this.bwbPurchaseUrl,target:"_blank",className:"purchase dark",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.purchase}}:null}printDisabilityConfig(){return this.lendingStatus.user_is_printdisabled?null:{id:"printDisability",text:"Print Disability Access",title:"Print Disability Access",url:this.printDisabilityLink,target:"_self",className:"print-disability",analyticsEvent:{category:this.analyticsCategories.bookReaderHeader,action:this.analyticsActions.printDisability}}}adminAccessConfig(){return this.lendingStatus.user_has_borrowed||!this.lendingStatus.isAdmin?null:{id:"adminAccess",text:"Admin Access",title:"You have administrative privileges to read this book",className:"danger",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.borrow}}}adminOrPrintDisabledExitConfig(){const t=`\u2190 Exit ${A.getQueryParam("admin")==="1"?"admin":"print-disabled"} access mode`;return{id:"exitAdminAccess",text:t,url:A.getBackHref(),target:"_self",className:"exit-admin",analyticsEvent:{category:this.analyticsCategories.adminAccess,action:this.analyticsActions.doneBorrowing}}}unavailableBookConfig(){return{id:"borrowUnavailable",text:"Borrow Unavailable",className:"primary unavailable",disabled:!0,analyticsEvent:{category:this.analyticsCategories.preview,action:this.analyticsActions.unavailable}}}isEmbed(e){return{primaryTitle:`<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${e}</a>`,primaryActions:[],primaryColor:""}}}const v={available_1hr:"Renews automatically with continued use.",available_14d:"This book can be borrowed for 14 days.",available_pd:"Book available to patrons with print disabilities.",available_waitlist:"A waitlist is available.",admin_access:"You have administrative privileges to read this book.",claim_waitlist:"You are at the top of the waitlist for this book.",being_borrowed:"Another patron is using this book. Please check back later.",eligible_pd:"You are eligible for print-disabled access.",on_waitlist:"You are on the waitlist for this book.",session_expired:"Renews automatically with continued use.",unavailable:"This book is not available at this time."};class Wi{constructor(e,t,i,n){this.userid=e,this.identifier=t,this.lendingStatus=i,this.bwbPurchaseUrl=n,this.analyticsCategories=M,this.analyticsActions=F,this.actionsConfig=new Fi(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl)}onlyAdminAction(){return{primaryTitle:v.admin_access,primaryActions:[],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}adminOrPrintDisabledReadingAction(){return{primaryTitle:"",primaryActions:[],secondaryActions:[this.actionsConfig.adminOrPrintDisabledExitConfig()],borrowType:"adminBorrowed"}}patronIsReadingAction(){const e=this.lendingStatus||{},t=e.loanCount>=e.maxLoans;let i="",n=e.user_has_browsed&&!e.browsingExpired;return n?i=v.available_1hr:i=`Your loan of this book has ${e.daysLeftOnLoan} days left.`,{primaryTitle:i,primaryActions:[this.actionsConfig.returnBookConfig(),this.actionsConfig.borrowBookConfig(t),this.actionsConfig.waitlistConfig(),this.actionsConfig.printDisabilityConfig()],primaryColor:"danger",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()],borrowType:n?"browsed":"borrowed"}}claimWaitlistAction(){const e=this.lendingStatus||{},t=this.actionsConfig.leaveWaitlistConfig(),i=this.actionsConfig.borrowBookConfig(),n=e.available_to_browse?this.actionsConfig.firstBrowseConfig():null;let s=[i];return n&&s.push(n),s.push(t),{primaryTitle:v.claim_waitlist,primaryActions:s,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowPrintDisabledAction(){return{primaryTitle:v.eligible_pd,primaryActions:[this.actionsConfig.borrowBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}onlyPrintDisabledAction(){const e=this.lendingStatus.isAdmin?[]:this.actionsConfig.unavailableBookConfig();return{primaryTitle:v.available_pd,primaryActions:[e],primaryColor:"primary",secondaryActions:[]}}onWaitlistAction(){return{primaryTitle:v.on_waitlist,primaryActions:[this.actionsConfig.leaveWaitlistConfig(),this.actionsConfig.firstBrowseConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}restrictedAction(){const e=this.lendingStatus||{};return{primaryTitle:e.max_browsable_copies&&!e.available_lendable_copies?v.being_borrowed:v.unavailable,primaryActions:[this.actionsConfig.unavailableBookConfig()],primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}loggedOutOptions(){const e=this.lendingStatus||{},t=!e.available_to_waitlist&&!e.available_to_borrow,i=this.actionsConfig.waitlistConfig();let n=null;e.available_to_borrow||e.available_to_browse?n=this.actionsConfig.loginAndBorrowBookConfig():t&&(n=this.actionsConfig.unavailableBookConfig());const s=this.actionsConfig.printDisabilityConfig(),r=[n,i,s].filter(a=>a!==null);return{primaryTitle:e.available_to_browse?v.available_1hr:e.available_to_borrow?v.available_14d:v.unavailable,primaryActions:r,primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrow1HrAction(){const e=this.lendingStatus||{},t=!e.available_to_browse&&e.browsingExpired,i=e.available_to_browse||t,n=i&&e.available_to_borrow,s=i&&!e.available_to_borrow&&e.available_to_waitlist,r=i&&!e.available_to_borrow&&!e.available_to_waitlist,l=e.available_browsable_copies<1&&e.available_browsable_copies<e.max_browsable_copies,a=t?v.session_expired:!i&&l?v.being_borrowed:!i&&e.available_to_waitlist?v.available_waitlist:v.available_1hr,c=t?this.actionsConfig.browseAgainConfig():this.actionsConfig.firstBrowseConfig(),h=this.actionsConfig.borrowBookConfig(),w=this.actionsConfig.waitlistConfig(),f=this.actionsConfig.printDisabilityConfig();return{primaryTitle:a,primaryActions:r?[c,f]:n?[c,h,f]:s?[c,w,f]:[],primaryColor:"primary",footer:"printDisabilityLine()",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}borrowAction(){const e=this.lendingStatus||{};if(!!!this.userid)return this.loggedOutOptions();if(e.available_to_browse||e.browsingExpired)return this.borrow1HrAction();let i=null;const n=this.actionsConfig.waitlistConfig(),s=this.actionsConfig.printDisabilityConfig(),r=e.loanCount>=e.maxLoans;!e.available_to_borrow&&!n?i=this.actionsConfig.unavailableBookConfig():e.available_to_borrow&&(i=this.actionsConfig.borrowBookConfig(r));const a=[i,n,s].filter(function(c){return c!==null});return{primaryTitle:n?v.being_borrowed:"",primaryActions:a,primaryColor:"primary",secondaryActions:[this.actionsConfig.adminAccessConfig(),this.actionsConfig.purchaseConfig()]}}getBrowseCountdownTitle(){const e=this.lendingStatus.secondsLeftOnLoan;var t=new Date(+new Date+e*1e3),i=t.getHours()%12,n=(""+t.getMinutes()).replace(/^(\d{1})$/,"0$1"),s=t.getHours()>11?" PM":" AM";return i===0&&(i=12),"Borrow ends at "+i+":"+n+s}getCurrentLendingActions(){let e;const t=this.lendingStatus||{},i=A.getQueryParam("admin")=="1"&&t.isAdmin,n=A.getQueryParam("access")=="1"&&t.user_is_printdisabled,s=t.user_has_borrowed||t.user_has_browsed&&!t.browsingExpired,r=!t.user_has_borrowed&&!t.user_has_browsed,l=!t.available_to_borrow&&!t.available_to_browse,a=t.is_printdisabled&&t.user_is_printdisabled,c=(t.available_to_browse||t.available_to_borrow)&&r&&!t.user_on_waitlist;return i||n?e=this.adminOrPrintDisabledReadingAction():t.isAdmin&&r&&l?e=this.onlyAdminAction():s?e=this.patronIsReadingAction():t.user_can_claim_waitlist?e=this.claimWaitlistAction():a?e=this.borrowPrintDisabledAction():c||t.browsingExpired?e=this.borrowAction():t.isPrintDisabledOnly?e=this.onlyPrintDisabledAction():t.user_on_waitlist?e=this.onWaitlistAction():e=this.restrictedAction(),e}}class ji{constructor(e,t,i,n,s){this.identifier=e,this.borrowType=t,this.successCallback=i,this.errorCallback=n,this.pollerDelay=s,this.loanTokenInterval=void 0,this.loanAnalytics=new _t,this.bookAccessed()}disconnectedCallback(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearTokenPoller()}async bookAccessed(){var e;this.borrowType?(this.handleLoanTokenPoller(!0),this.borrowType!=="adminBorrowed"&&(window.IALendingIntervals.tokenPoller=setInterval(()=>{this.handleLoanTokenPoller()},this.pollerDelay*1e3))):((e=window==null?void 0:window.Sentry)==null||e.captureMessage(`${L.bookAccessed} - not borrowed`),this.disconnectedCallback())}async handleLoanTokenPoller(e=!1){const t="create_token";R({identifier:this.identifier,action:t,error:i=>{var n,s;this.errorCallback({detail:{action:t,data:i}}),(n=window==null?void 0:window.Sentry)==null||n.captureMessage(`${L.handleLoanTokenPoller} - Error: ${JSON.stringify(i)}`),(s=this.loanAnalytics)==null||s.sendEvent("LendingServiceLoanError",t,this.identifier)},success:()=>{e&&this.successCallback()}})}}class Gi{constructor(e,t,i,n){this.hasPageChanged=e,this.identifier=t,this.localCache=i,this.loanRenewTimeConfig=n,this.loanRenewMessage="This book has been renewed for #time #unitsOfTime.",this.loanReturnWarning="Go to any other page to keep your loan active.",this.result={texts:null,renewNow:!1,renewType:""}}async handleLoanRenew(){try{return this.hasPageChanged?this.pageChanged():this.autoChecker()}catch(e){m(e)}return b}async pageChanged(){const{loanRenewAtLast:e}=this.loanRenewTimeConfig,t=new Date,i=await this.localCache.get(`${this.identifier}-loanTime`),n=this.changeTime(i,e,"sub");return n!==null&&t>=n&&(this.result={texts:this.loanRenewMessage,renewNow:!0,renewType:"auto"}),this.setPageChangedTime(),this.result}async autoChecker(){const{pageChangedInLast:e}=this.loanRenewTimeConfig,t=await this.localCache.get(`${this.identifier}-pageChangedTime`),i=this.changeTime(new Date,e,"sub");return t===void 0||t<=i?this.result={texts:this.loanReturnWarning,renewNow:!1,renewType:""}:t>=i&&(this.result={texts:"",renewNow:!0,renewType:"auto"}),this.result}async setPageChangedTime(){await this.localCache.set({key:`${this.identifier}-pageChangedTime`,value:new Date,ttl:Number(this.loanRenewTimeConfig.loanTotalTime)})}getMessageTexts(e,t){let i="minute",n=e,s=t;return s=Math.ceil(s/60),s>59&&(s=1,i="hour"),n=n==null?void 0:n.replace(/#time/,s),n==null?void 0:n.replace(/#unitsOfTime/,s!==1?`${i}s`:i)}changeTime(e,t,i){return e===void 0?null:i==="sub"?new Date(e.getTime()-t*1e3):new Date(e.getTime()+t*1e3)}}const qi=p`<svg
  height="20"
  width="20"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd"><path d="m0 0h100v100h-100z" fill="#fff"/>
    <path d="m49.8315487 0h.1702245c6.7356878 0 13.1853038 1.31117332 19.3488483 3.93351997 6.1635444 2.62234664 11.4854233 6.15778963 15.9656369 10.60632903 4.4802135 4.4485394 8.0478347 9.7522946 10.7028636 15.9112655 2.655029 6.1589709 3.980878 12.6038012 3.9789971 19.3344909.0567419 6.6716279-1.1702933 13.0585776-3.6811042 19.1608491-2.510811 6.1022715-6.106803 11.5206067-10.7879759 16.2550055-9.7027949 9.7522946-21.4884754 14.6851412-35.3570414 14.79854h-.1702244c-6.7333236 0-13.1829397-1.3111733-19.3488483-3.93352-6.1659087-2.6223466-11.4877876-6.1577896-15.9656369-10.606329s-8.04547055-9.7522946-10.7028637-15.9112655c-2.65739314-6.1589709-3.9844243-12.6038012-3.98254337-19.3344909-.05674149-6.6716279 1.17029325-13.0585776 3.68110421-19.1608491 2.51081095-6.1022715 6.10680292-11.5206067 10.78797586-16.2550055 9.7027949-9.75229456 21.4884754-14.68514123 35.3570414-14.79854zm12.6566146 26.4757998c1.6745578-1.6828001 2.5118367-3.6747334 2.5118367-5.9757998 0-2.4126333-.8095238-4.4324583-2.4285714-6.059475s-3.6289796-2.440525-6.0297959-2.440525c-2.4008164 0-4.4107483.8135083-6.029796 2.440525-1.6745578 1.6270167-2.5118367 3.6468417-2.5118367 6.059475 0 2.1871753.8372789 4.1791086 2.5118367 5.9757998 1.6745579 1.6828001 3.6844898 2.5242002 6.029796 2.5242002 2.3453061 0 4.3274829-.8414001 5.9465306-2.5242002zm-12.1370589 52.7776981-1.2815282-.9486968c0-.4588935.398855-1.8938272 1.196565-4.3048011l12.7338588-39-23.0745876 3.6164609.2548896 3.873251c0-.1141289.4554971-.1997256 1.3664914-.2567901.9109942 0 1.623741.1723823 2.1382404.5171468.5121392.2306356.7965299.6039323.8531721 1.1198902 0 .8607225-.6549247 3.2134431-1.9647739 7.0581619l-8.1175252 24.1061729c-1.0242785 3.2716963-1.5080967 5.5388203-1.4514546 6.8013717.0566421 1.6643804.8826732 2.9839963 2.4780932 3.9588477 1.2532071.803658 2.8769482 1.205487 4.8712231 1.205487h.5982825c1.7653464-.0570645 3.8445846-.3875629 6.2377146-.9914952 2.3931299-.6039323 4.3590839-1.3933242 5.8978617-2.3681756 1.3098493-.803658 2.3919499-1.5359853 3.2463021-2.1969821.8543521-.6609968 1.3959925-1.1341564 1.6249211-1.4194788l.3433929-.3459533-2.8214861-3.3596708-2.9914125 2.0650205c-.79771.4588935-1.5104568.7454047-2.1382404.8595337z" fill="#000" fill-rule="nonzero"/>
  </g>
</svg>
`,Ki={browseExpired:"IABookReader:BrowsingHasExpired"},Z={iaButton:"min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;",renew:"background:#194880;width:110px;",return:"background:#d9534f;width:120px;",loaderIcon:"display:inline-block;width:20px;height:20px;margin-top:2px;color:white;--activityIndicatorLoadingRingColor:#fff;--activityIndicatorLoadingDotColor:#fff;",refresh:"background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"};class Zi extends _{static get properties(){return{userid:{type:String},identifier:{type:String},bookTitle:{type:String},lendingStatus:{type:Object},returnUrl:{type:String},width:{type:Number},bwbPurchaseUrl:{type:String},lendingBarPostInit:{type:Function,attribute:!1},barType:{type:String},sharedObserver:{attribute:!1},disableActionGroup:{type:Boolean},modal:{Object},tokenDelay:{type:Number},timerExecutionSeconds:{type:Number},localCache:{type:Object},loanRenewTimeConfig:{type:Object},loanRenewResult:{type:Object}}}constructor(){super(),this.userid="",this.identifier="",this.bookTitle="",this.returnUrl="",this.lendingStatus={},this.width=0,this.bwbPurchaseUrl="",this.lendingBarPostInit=()=>{},this.barType="action",this.sharedObserver=void 0,this.disableActionGroup=!1,this.tokenDelay=120,this.timerExecutionSeconds=30,this.postInitComplete=!1,this.primaryActions=[],this.primaryTitle="",this.primaryColor="primary",this.secondaryActions=[],this.lendingOptions={},this.borrowType=null,this.browseTimer=void 0,this.timeWhenTimerStart=void 0,this.loanRenewInProgress=!1,this.warningModalOpen=!1,this.warningModalDismissed=!1,this.loanRenewTimeConfig={loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900},this.loanRenewResult={texts:"",renewNow:!1,secondsLeft:0,renewType:""}}disconnectedCallback(){var e;(e=window==null?void 0:window.IALendingIntervals)==null||e.clearAll(),this.sentryCaptureMsg(L.disconnectedCallback),this.disconnectResizeObserver()}sentryCaptureMsg(e){var t;(t=window==null?void 0:window.Sentry)==null||t.captureMessage(e)}firstUpdated(){this.bindLoanRenewEvents(),this.localCache=new mt({namespace:"loanRenew"}),this.sharedObserver||(this.sharedObserver=new Zt,this.setupResizeObserver())}updated(e){(e.has("lendingStatus")||e.has("bwbPurchaseUrl"))&&this.setupLendingToolbarActions(),e.has("sharedObserver")&&(this.disconnectResizeObserver(),this.setupResizeObserver()),e.has("loanRenewResult")&&this.loanRenewResult.renewNow&&(this.loanRenewInProgress=!0,window.IALendingIntervals.clearAll())}handleResize(e){const{target:t}=e;if(t!==this.shadowRoot.host)return;const{contentRect:i}=e;this.width=Math.round(i.width)}disconnectResizeObserver(){var e;(e=this.sharedObserver)==null||e.removeObserver({handler:this,target:this.shadowRoot.host})}setupResizeObserver(){var e;!this.shadowRoot||(e=this.sharedObserver)==null||e.addObserver({handler:this,target:this.shadowRoot.host})}async setupLendingToolbarActions(){var i,n,s,r;const e="browsingExpired"in this.lendingStatus&&((i=this.lendingStatus)==null?void 0:i.browsingExpired);if(e){m("[IABookActions] browsing expired \u2014 leaving action bar untouched"),this.tokenPoller||this.sentryCaptureMsg(L.bookWasExpired),(n=window==null?void 0:window.IALendingIntervals)==null||n.clearAll(),this.dispatchEvent(new Event(Ki.browseExpired,{bubbles:!0,cancelable:!1,composed:!0}));return}this.lendingOptions=new Wi(this.userid,this.identifier,this.lendingStatus,this.bwbPurchaseUrl);const t=this.lendingOptions.getCurrentLendingActions();if(!!t){if(this.primaryTitle=t.primaryTitle,this.primaryActions=(s=t.primaryActions)==null?void 0:s.filter(l=>l!=null),this.primaryColor=t.primaryColor,this.secondaryActions=(r=t.secondaryActions)==null?void 0:r.filter(l=>l!=null),this.borrowType=t.borrowType?t.borrowType:null,this.borrowType==="browsed"&&(await this.startTimerCountdown(),await this.startBrowseTimer()),!this.borrowType||this.barType==="title"){this.lendingBarPostInit();return}setTimeout(()=>{!e&&!window.IALendingIntervals.tokenPoller&&this.startLoanTokenPoller()},100),this.requestUpdate()}}bindLoanRenewEvents(){window.addEventListener("BookReader:userAction",()=>{const e=this.lendingStatus.browsingExpired;m("[IABookActions] BookReader:userAction received",{borrowType:this.borrowType,browsingExpired:e}),e&&this.autoRenewExpiredLoan(),this.borrowType==="browsed"&&!e&&this.autoLoanRenewChecker(!0)}),document.addEventListener("visibilitychange",async()=>{if(document.hidden){m("[IABookActions] visibilitychange: tab backgrounded");return}m("[IABookActions] visibilitychange: tab foregrounded",this.borrowType);try{if(this.lendingStatus.browsingExpired===!0){this.autoRenewExpiredLoan();return}if(this.borrowType!=="browsed")return;if(this.lendingStatus.browsingExpired===!1){const e=await this.localCache.get(`${this.identifier}-loanTime`),t=Math.round((e-new Date)/1e3);t>=this.timerExecutionSeconds?this.loanStatusCheckInterval(Number(t)):(this.autoRenewExpiredLoan(),this.disconnectedCallback())}}catch(e){m("[IABookActions] visibilitychange handler failed",e),this.sentryCaptureMsg(`visibilitychange handler failed: ${e}`)}})}async autoLoanRenewChecker(e=!1){this.loanRenewHelper=new Gi(e,this.identifier,this.localCache,this.loanRenewTimeConfig),await this.loanRenewHelper.handleLoanRenew(),this.loanRenewResult=this.loanRenewHelper.result}autoRenewExpiredLoan(){var e;this.loanRenewInProgress||(this.loanRenewInProgress=!0,(e=this.modal)==null||e.closeModal(),this.lendingStatus={...this.lendingStatus,browsingExpired:!1,secondsLeftOnLoan:this.loanRenewTimeConfig.loanTotalTime},setTimeout(()=>{this.loanRenewResult={texts:"",renewNow:!0,renewType:"auto"}},0))}get modal(){const e=document.body.querySelector("modal-manager");return e==null||e.setAttribute("id","action-bar-modal"),e}async showWarningModal(){var r,l,a;if(this.warningModalOpen)return;this.warningModalOpen=!0,m("[IABookActions] showWarningModal");const{texts:e,secondsLeft:t}=this.loanRenewResult;let i=t;i===void 0||i<=0?i=this.lendingStatus.secondsLeftOnLoan:i=i>60?i:60,this.modal.customModalContent=b,(r=this.modal)==null||r.closeModal(),this.loanRenewResult={texts:"",renewNow:!1};const n=new z({headline:"Are you still there?",headerColor:"#194880",showCloseButton:!1,closeOnBackdropClick:!1,message:p`<span
        style="display:inline-flex;align-items:center;flex-wrap:nowrap;gap:4px;"
      >
        <span>${(l=this.loanRenewHelper)==null?void 0:l.getMessageTexts(e,i)}</span>
        <a
          href="https://help.archive.org/help/borrowing-from-the-lending-library"
          target="_blank"
          title="Get more info on borrowing from The Lending Library"
          data-event-click-tracking="BookReader|BrowsableMoreInfo"
          style="display:inline-flex;flex-shrink:0;line-height:0;"
        >
          ${qi}
        </a>
      </span>`}),s=p`
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;margin-top:10px;"
      >
        <button
          style="${Z.iaButton} ${Z.renew}"
          @click=${()=>this.dismissWarningModal()}
        >
          Okay
        </button>
      </div> `;this.modal.setAttribute("aria-live","assertive"),await((a=this.modal)==null?void 0:a.showModal({config:n,customModalContent:s}))}dismissWarningModal(){var e;(e=this.modal)==null||e.closeModal(),this.warningModalOpen=!1,this.warningModalDismissed=!0}async browseHasExpired(){var t,i;m("[IABookActions] browseHasExpired"),(t=window==null?void 0:window.IALendingIntervals)==null||t.clearAll();const e={...this.lendingStatus,browsingExpired:!0,secondsLeftOnLoan:0};this.lendingStatus=e,await this.localCache.delete(`${this.identifier}-loanTime`),await this.localCache.delete(`${this.identifier}-pageChangedTime`),this.loanRenewResult.renewNow=!1,this.loanRenewResult.texts="This book has been returned due to inactivity.",(i=this.modal)==null||i.closeModal(),this.sentryCaptureMsg(L.browseHasExpired)}async showLoanUnavailableModal(){var i;const e=new z({headline:"",showCloseButton:!1,closeOnBackdropClick:!1,headerColor:"#194880",message:"Due to inactivity, this book was returned, and someone else has now borrowed it. Please try again later."}),t=p`<br />
      <div style="text-align: center">
        <button
          style="${Z.iaButton} ${Z.renew}"
          @click=${()=>A.goToUrl(this.returnUrl,!0)}
        >
          Okay
        </button>
      </div>`;await((i=this.modal)==null?void 0:i.showModal({config:e,customModalContent:t}))}async startBrowseTimer(){var n;(n=window==null?void 0:window.IALendingIntervals)==null||n.clearBrowseExpireTimeout();const{browsingExpired:e,user_has_browsed:t,secondsLeftOnLoan:i}=this.lendingStatus;!t||e||(window.IALendingIntervals.browseExpireTimeout=setTimeout(()=>{this.browseHasExpired()},i*1e3))}render(){return this.barType==="title"?p`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`:p`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`}get bookTitleBar(){return p`<book-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></book-title-bar>`}get timerCountdownEl(){return this.shadowRoot.querySelector("timer-countdown")}get bookActionBar(){return p`
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
        @loanAutoRenewed=${this.handleLoanAutoRenewed}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      <timer-countdown
        .secondsLeftOnLoan=${Math.round(Number(this.lendingStatus.secondsLeftOnLoan))}
      ></timer-countdown>
    `}async handleLoanAutoRenewed({detail:e}){var n,s,r;const t=(n=e==null?void 0:e.data)==null?void 0:n.loan,i=`Whoops, seems we hit a hiccup with renewing this book. Please refresh & retry. --- (Debug: ${(s=e==null?void 0:e.data)==null?void 0:s.error})`;if(!t){this.showErrorModal(i,"handleLoanAutoRenewed");return}if(this.loanRenewResult.renewNow){const l=await this.localCache.get(`${this.identifier}-loanTime`),a=Math.round((l-new Date)/1e3),c=Number.isFinite(a)&&a>0?a:this.loanRenewTimeConfig.loanTotalTime;m("[IABookActions] handleLoanAutoRenewed",{secondsLeft:c,rawSecondsLeft:a,ajaxResponse:e==null?void 0:e.data});const h={...this.lendingStatus,user_has_browsed:!0,browsingExpired:!1,secondsLeftOnLoan:c};this.lendingStatus=h,(r=this.modal)==null||r.closeModal(),this.modal.removeAttribute("id"),this.modal.customModalContent=b,this.sentryCaptureMsg(L.bookHasRenewed),this.warningModalDismissed=!1}this.warningModalOpen=!1,this.loanRenewInProgress=!1}async startTimerCountdown(){var t;(t=window==null?void 0:window.IALendingIntervals)==null||t.clearTimerCountdown();const e=Number(this.lendingStatus.secondsLeftOnLoan);this.timeWhenTimerStart=new Date,window.IALendingIntervals.timerCountdown=setInterval(async()=>{await this.loanStatusCheckInterval(e)},this.timerExecutionSeconds*1e3)}async loanStatusCheckInterval(e){let t=e;t-=this.timerExecutionSeconds,t=Math.round(t);const i=this.reSyncTimerIfGoneOff(t);i.hasSynced&&(t=i.whatShouldLeft,m("[IABookActions] timer: timer re-synced",{secondsLeft:t})),m("[IABookActions] timer",{secondsLeft:t,loanRenewAtLast:this.loanRenewTimeConfig.loanRenewAtLast,pageChangedInLast:this.loanRenewTimeConfig.pageChangedInLast}),t<=this.loanRenewTimeConfig.loanRenewAtLast&&await this.loanRenewAttempt(t),t<=this.timerExecutionSeconds&&(this.disconnectedCallback(),this.sentryCaptureMsg(L.clearOneHourTimer))}reSyncTimerIfGoneOff(e){const i=new Date().getTime()/1e3-this.timeWhenTimerStart.getTime()/1e3,n=this.lendingStatus.secondsLeftOnLoan-i,s=Math.round(e),r=Math.round(n);if((this.timerCountdownEl.secondsLeftOnLoan||0)!==r||s!==r){const a={...this.lendingStatus,secondsLeftOnLoan:r};this.lendingStatus=a}return s!==r?(m(`[IABookActions] reSyncTimerIfGoneOff ${s} - ${r}: re-syncing timer`),{hasSynced:!0,whatShouldLeft:r}):{hasSynced:!1,whatShouldLeft:r}}async loanRenewAttempt(e){let t=e;if(t<50){m("[IABookActions] loanRenewAttempt: < 50s left, expiring loan"),await this.browseHasExpired();return}await this.autoLoanRenewChecker(!1),this.loanRenewResult.renewNow===!1&&!this.warningModalDismissed&&(t-=60,this.loanRenewResult.secondsLeft=t,this.showWarningModal())}startLoanTokenPoller(){const e=()=>{this.postInitComplete||this.lendingBarPostInit(),this.postInitComplete=!0},t=i=>{this.handleLendingActionError(i)};this.tokenPoller=new ji(this.identifier,this.borrowType,e,t,this.tokenDelay)}handleToggleActionGroup(){this.disableActionGroup=!this.disableActionGroup}handleLendingActionError(e){var n,s,r,l;this.disableActionGroup=!1,(n=window==null?void 0:window.IALendingIntervals)==null||n.clearAll();const t=(s=e==null?void 0:e.detail)==null?void 0:s.action,i=(l=(r=e==null?void 0:e.detail)==null?void 0:r.data)==null?void 0:l.error;if(t==="renew_loan"&&(this.loanRenewInProgress=!1),i&&t==="renew_loan"&&i.match(/not available/)?this.showLoanUnavailableModal():i&&t!=="create_token"&&this.showErrorModal(i,t),t==="create_token"){const a={...this.lendingStatus,user_has_browsed:!1,available_to_browse:!0};this.lendingStatus=a}if(i&&i.match(/not available to borrow/gm)){let a=this.lendingStatus;t==="browse_book"?a={...this.lendingStatus,available_to_browse:!1}:t==="borrow_book"&&(a={...this.lendingStatus,available_to_borrow:!1}),this.lendingStatus=a}}async showErrorModal(e,t){var n;const i=new z({title:"Lending error",message:e,headerColor:"#d9534f",showCloseButton:!0});if(t==="create_token"){const s=p`<button
        style="${Z.refresh}"
        @click=${()=>window.location.reload(!0)}
      >
        refresh
      </button>`;i.message=p` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${s} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this.identifier}"
          >info@archive.org</a
        ><br /><br />
        <code>errorLog: ${e}</code>`}await((n=this.modal)==null?void 0:n.showModal({config:i}))}get iconClass(){return this.width<=tt?"mobile":"desktop"}get textClass(){return this.width>=tt?"visible":"hidden"}get infoIconTemplate(){return p`<info-icon iconClass=${this.iconClass}></info-icon>`}get textGroupTemplate(){return this.primaryTitle?p`<text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </text-group>`:b}get hasAdminAccess(){return!this.lendingStatus.userHasBorrowed&&this.lendingStatus.isAdmin}static get styles(){return d`
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
    `}}window.customElements.define("ia-book-actions",Zi);const ue={active_borrows:0,active_browses:0,available_borrowable_copies:0,available_browsable_copies:1,available_lendable_copies:1,available_to_borrow:!1,available_to_browse:!1,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!1,is_readable:!1,last_borrow:null,last_browse:null,last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:null,orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:0,user_loan_record:[],user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",browsingExpired:!1,daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!0,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:0,loanRecord:[],loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:10,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!1,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},Vi={active_borrows:0,active_browses:1,available_borrowable_copies:0,available_browsable_copies:0,available_lendable_copies:0,available_to_borrow:!0,available_to_browse:!0,available_to_waitlist:!1,copies_reserved_for_waitlist:0,is_lendable:!0,is_login_required:!1,is_printdisabled:!0,is_readable:!1,last_borrow:null,last_browse:"2021-07-30 09:57:40",last_waitlist:null,max_borrowable_copies:0,max_browsable_copies:1,max_lendable_copies:1,next_borrow_expiration:null,next_browse_expiration:"2021-07-30 10:57:40",orphaned_acs_loans:0,upgradable_browses:0,user_at_max_loans:!1,user_can_claim_waitlist:!1,user_has_acs_borrowed:!1,user_has_borrowed:!1,user_has_browsed:!1,user_is_printdisabled:!1,user_loan_count:1,user_loan_record:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},user_on_waitlist:!1,users_on_waitlist:0,bookUrl:"/details/practicalorganic00plim",daysLeftOnLoan:0,isAdmin:!1,isArchiveOrgLending:!0,isAvailable:!1,isAvailableForBrowsing:!1,isBrowserBorrowable:!0,isLendingRequired:!0,isOpenLibraryLending:!1,isPrintDisabledOnly:!1,loanCount:1,loanId:"1ca15f92d07dfdae3f7b1516084aec5d603800b8",loanRecord:{userid:"@neeraj-archive",listname:"loan",identifier:"practicalorganic00plim"},loanStartDate:"2021-07-30 09:57:40",loansUrl:"/details/@neeraj-archive?tab=loans#loans-on-loan",maxLoans:10,secondsLeftOnLoan:0,shouldProtectImages:!0,totalWaitlistCount:0,userHasBorrowed:!1,userHasBrowsed:!0,userHoldIsReady:!1,userIsPrintDisabled:!1,userOnWaitingList:!1,userWaitlistPosition:-1,userid:"@neeraj-archive"},Te=new mt({namespace:"loanRenew",defaultTTL:1*60}),Ji="@neeraj-archive",xe="naturalhistoryof00unse_4111";let Ce="https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863";const Lt=new z;Lt.headerColor="#d9534f";let Yi=function(){setTimeout(function(){},100)},u=document.querySelector("ia-book-actions");u.userid=Ji;u.identifier=xe;u.bookTitle="Contemporary Black biography. Volume 39 : profiles from the interContemporary Black biography. Volume 39";u.lendingStatus=Vi;u.bwbPurchaseUrl="";u.modalConfig=Lt;u.lendingBarPostInit=Yi;u.tokenDelay=10;u.timerExecutionSeconds=3;u.returnUrl="";u.localCache=Te;const kt={"15s":{loanTotalTime:15,loanRenewAtLast:13,pageChangedInLast:5},"30s":{loanTotalTime:30,loanRenewAtLast:27,pageChangedInLast:10},2:{loanTotalTime:120,loanRenewAtLast:95,pageChangedInLast:15},5:{loanTotalTime:300,loanRenewAtLast:240,pageChangedInLast:60},10:{loanTotalTime:600,loanRenewAtLast:480,pageChangedInLast:120},30:{loanTotalTime:1800,loanRenewAtLast:1500,pageChangedInLast:600},60:{loanTotalTime:3600,loanRenewAtLast:660,pageChangedInLast:900}};let it=new URLSearchParams(document.location.search);const $t=kt[it.get("timer")]?it.get("timer"):"2";u.loanRenewTimeConfig=kt[$t];document.querySelectorAll(".timer-presets button").forEach(o=>{o.dataset.timer===$t&&o.classList.add("active-preset"),o.addEventListener("click",()=>{const e=new URLSearchParams(window.location.search);e.set("timer",o.dataset.timer),window.location.search=e.toString()})});let g=u.lendingStatus,Xi=u.loanRenewTimeConfig.loanTotalTime;document.querySelectorAll(".titleBar input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?u.barType="title":u.barType="action"})});document.querySelectorAll(".searchParam input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("q","test")):(i="",t.delete("q")),history.pushState){var n=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:n},"",n)}})});document.querySelectorAll(".errorEnable input[type=checkbox]").forEach(o=>{window.location.href.indexOf("?error=true")!==-1&&(o.checked=!0),o.addEventListener("click",e=>{console.log(`[Demo] error-response mode ${e.target.checked?"enabled":"disabled"}`);var t=new URLSearchParams(window.location.search),i="";if(e.target.checked?(i="?",t.set("error",!0)):(i="",t.delete("error")),history.pushState){var n=window.location.protocol+"//"+window.location.host+window.location.pathname+i+t;window.history.pushState({path:n},"",n)}})});document.querySelectorAll(".userState input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?(e.target.value==="isAdmin"&&(g.isAdmin=!0),e.target.value==="isLoggedIn"&&(u.userid="@neeraj")):(e.target.value==="isAdmin"&&(g.isAdmin=!1),e.target.value==="isLoggedIn"&&(u.userid=""));let t={...ue,...g};u.lendingStatus=t})});document.querySelectorAll(".printDisabled input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?(e.target.value==="is_printdisabled"&&(g.is_printdisabled=!0),e.target.value==="user_is_printdisabled"&&(g.user_is_printdisabled=!0)):(e.target.value==="is_printdisabled"&&(g.is_printdisabled=!1),e.target.value==="user_is_printdisabled"&&(g.user_is_printdisabled=!1));let t={...ue,...g};u.lendingStatus=t})});document.querySelectorAll(".availableToBrowse input[type=radio]").forEach(o=>{o.addEventListener("click",async e=>{if(console.log(`[Demo] "${e.target.value}" selected under availableToBrowse`),e.target.value==="user_has_browsed"){g.user_has_browsed=!0,g.available_to_browse=!1,g.secondsLeftOnLoan=Xi,g.browsingExpired=!1;const t=new Date(new Date().getTime()+u.loanRenewTimeConfig.loanTotalTime*1e3);try{await Te.set({key:`${xe}-loanTime`,value:t,ttl:Number(u.loanRenewTimeConfig.loanTotalTime)}),await Te.delete(`${xe}-pageChangedTime`)}catch{}}else e.target.value==="browsingExpired"?(g.user_has_browsed=!0,g.available_to_browse=!1,g.secondsLeftOnLoan=0,g.browsingExpired=!0):e.target.value==="available_to_browse"&&(g.available_to_browse=!0,g.user_has_browsed=!1);setTimeout(()=>{let t={...ue,...g};u.lendingStatus=t},10)})});document.querySelector("#show_warning_modal").addEventListener("click",async()=>{if(console.log("[Demo] scenario 1 button clicked: show warning modal"),!u.lendingStatus.user_has_browsed){const o={...u.lendingStatus,user_has_browsed:!0};u.lendingStatus=o,await u.updateComplete}await u.autoLoanRenewChecker(!1),u.showWarningModal()});document.querySelector("#show_expired_modal").addEventListener("click",async()=>{if(console.log("[Demo] scenario 2 button clicked: force auto-return"),!u.lendingStatus.user_has_browsed){const o={...u.lendingStatus,user_has_browsed:!0};u.lendingStatus=o,await u.updateComplete}await new Promise(o=>setTimeout(o,100)),u.browseHasExpired()});document.querySelector("#resync_timer").addEventListener("click",async o=>{console.log("[Demo] scenario 4 button clicked: simulate visibilitychange (tab return)"),u.lendingStatus.user_has_browsed&&document.querySelector("ia-book-actions").dispatchEvent(new Event("visibilitychange",{detail:{},bubbles:!0,composed:!0})),await new Promise(e=>setTimeout(e,1e3))});document.querySelectorAll(".availableToBorrow input[type=radio]").forEach(o=>{o.addEventListener("click",e=>{e.target.value==="available_to_borrow"?(g.available_to_borrow=!0,g.user_on_waitlist=!1,g.available_to_waitlist=!1,g.user_has_borrowed=!1):e.target.value==="user_can_claim_waitlist"?(g.available_to_borrow=!0,g.user_on_waitlist=!0,g.user_can_claim_waitlist=!0,g.user_has_borrowed=!1,g.available_to_waitlist=!1):e.target.value==="user_on_waitlist"?(g.available_to_borrow=!1,g.user_on_waitlist=!0,g.available_to_waitlist=!1,g.user_has_borrowed=!1):e.target.value==="available_to_waitlist"?(g.available_to_borrow=!1,g.user_on_waitlist=!1,g.available_to_waitlist=!0,g.user_has_borrowed=!1):e.target.value==="user_has_borrowed"&&(g.available_to_borrow=!1,g.user_on_waitlist=!1,g.available_to_waitlist=!1,g.user_has_borrowed=!0);let t={...ue,...g};u.lendingStatus=t})});document.querySelectorAll(".purchase input[type=checkbox]").forEach(o=>{o.addEventListener("click",e=>{e.target.checked?Ce="https://www.google.com":Ce="",u.bwbPurchaseUrl=Ce})});document.querySelectorAll(".pageChangedEvent").forEach(o=>{o.addEventListener("click",()=>{console.log("[Demo] page-change / BookReader:userAction dispatched"),document.querySelector("ia-book-actions").dispatchEvent(new CustomEvent("BookReader:userAction",{detail:{},bubbles:!0,composed:!0}))})});window.addEventListener("IABookReader:BrowsingHasExpired",()=>{console.log("IABookReader:BrowsingHasExpired EVENT FIRED")});const ae=document.querySelector("#exec-log"),nt=document.querySelector("#loan-status-badge"),Qi=document.querySelector("#live-status-detail");function Tt(o){const e=document.createElement("div");e.textContent=o,ae.appendChild(e),ae.scrollTop=ae.scrollHeight}window.__renderExecLogEntry=Tt;window.__execLog.forEach(Tt);document.querySelector("#clear-exec-log").addEventListener("click",()=>{ae.textContent="",window.__execLog=[]});function en(){const o=u.lendingStatus||{};return u.loanRenewInProgress?{badge:"RENEWING",className:"status-renewing"}:o.browsingExpired?{badge:"RETURNED",className:"status-returned"}:o.user_has_browsed?{badge:"ACTIVE",className:"status-active"}:{badge:"NO LOAN",className:"status-none"}}function tn(){const o=u.lendingStatus||{};return u.loanRenewInProgress?"\u{1F504} Attempting silent re-borrow (create_token \u2192 renew_loan)\u2026":u.warningModalOpen?"\u26A0\uFE0F Warning modal open \u2014 closing it will NOT renew the loan":o.browsingExpired?"Auto-returned due to inactivity. By design: no modal, no refresh \u2014 only this badge and the action bar (Borrow) reflect it, until the patron interacts again.":o.user_has_browsed?`~${Math.round(Number(o.secondsLeftOnLoan||0))}s left on this loan`:"Not currently browsing this book"}setInterval(()=>{const{badge:o,className:e}=en();nt.textContent=o,nt.className=`loan-status-badge ${e}`,Qi.textContent=tn()},250);
