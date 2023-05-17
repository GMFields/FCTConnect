import*as v from"react";import $e,{useEffect as ua,useState as Ke}from"react";import ma from"react-dom";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function da(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var yn={exports:{}},ze={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pa=$e,va=Symbol.for("react.element"),ha=Symbol.for("react.fragment"),ga=Object.prototype.hasOwnProperty,ba=pa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ya={key:!0,ref:!0,__self:!0,__source:!0};function xn(e,t,n){var a,r={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(a in t)ga.call(t,a)&&!ya.hasOwnProperty(a)&&(r[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)r[a]===void 0&&(r[a]=t[a]);return{$$typeof:va,type:e,key:i,ref:o,props:r,_owner:ba.current}}ze.Fragment=ha;ze.jsx=xn;ze.jsxs=xn;yn.exports=ze;var k=yn.exports,nt={},Ft=ma;nt.createRoot=Ft.createRoot,nt.hydrateRoot=Ft.hydrateRoot;/**
 * @remix-run/router v1.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ue(){return ue=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},ue.apply(this,arguments)}var z;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(z||(z={}));const Ut="popstate";function xa(e){e===void 0&&(e={});function t(a,r){let{pathname:i,search:o,hash:s}=a.location;return at("",{pathname:i,search:o,hash:s},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(a,r){return typeof r=="string"?r:Le(r)}return ka(t,n,null,e)}function N(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function kt(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function wa(){return Math.random().toString(36).substr(2,8)}function Dt(e,t){return{usr:e.state,key:e.key,idx:t}}function at(e,t,n,a){return n===void 0&&(n=null),ue({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?ie(t):t,{state:n,key:t&&t.key||a||wa()})}function Le(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),a&&a!=="#"&&(t+=a.charAt(0)==="#"?a:"#"+a),t}function ie(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}function ka(e,t,n,a){a===void 0&&(a={});let{window:r=document.defaultView,v5Compat:i=!1}=a,o=r.history,s=z.Pop,l=null,f=c();f==null&&(f=0,o.replaceState(ue({},o.state,{idx:f}),""));function c(){return(o.state||{idx:null}).idx}function u(){s=z.Pop;let g=c(),P=g==null?null:g-f;f=g,l&&l({action:s,location:b.location,delta:P})}function p(g,P){s=z.Push;let y=at(b.location,g,P);n&&n(y,g),f=c()+1;let E=Dt(y,f),A=b.createHref(y);try{o.pushState(E,"",A)}catch{r.location.assign(A)}i&&l&&l({action:s,location:b.location,delta:1})}function h(g,P){s=z.Replace;let y=at(b.location,g,P);n&&n(y,g),f=c();let E=Dt(y,f),A=b.createHref(y);o.replaceState(E,"",A),i&&l&&l({action:s,location:b.location,delta:0})}function x(g){let P=r.location.origin!=="null"?r.location.origin:r.location.href,y=typeof g=="string"?g:Le(g);return N(P,"No window.location.(origin|href) available to create URL for href: "+y),new URL(y,P)}let b={get action(){return s},get location(){return e(r,o)},listen(g){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(Ut,u),l=g,()=>{r.removeEventListener(Ut,u),l=null}},createHref(g){return t(r,g)},createURL:x,encodeLocation(g){let P=x(g);return{pathname:P.pathname,search:P.search,hash:P.hash}},push:p,replace:h,go(g){return o.go(g)}};return b}var $t;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})($t||($t={}));function Pa(e,t,n){n===void 0&&(n="/");let a=typeof t=="string"?ie(t):t,r=Pt(a.pathname||"/",n);if(r==null)return null;let i=wn(e);Ea(i);let o=null;for(let s=0;o==null&&s<i.length;++s)o=Ta(i[s],Ma(r));return o}function wn(e,t,n,a){t===void 0&&(t=[]),n===void 0&&(n=[]),a===void 0&&(a="");let r=(i,o,s)=>{let l={relativePath:s===void 0?i.path||"":s,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};l.relativePath.startsWith("/")&&(N(l.relativePath.startsWith(a),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+a+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(a.length));let f=Y([a,l.relativePath]),c=n.concat(l);i.children&&i.children.length>0&&(N(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+f+'".')),wn(i.children,t,c,f)),!(i.path==null&&!i.index)&&t.push({path:f,score:Ra(f,i.index),routesMeta:c})};return e.forEach((i,o)=>{var s;if(i.path===""||!((s=i.path)!=null&&s.includes("?")))r(i,o);else for(let l of kn(i.path))r(i,o,l)}),t}function kn(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,r=n.endsWith("?"),i=n.replace(/\?$/,"");if(a.length===0)return r?[i,""]:[i];let o=kn(a.join("/")),s=[];return s.push(...o.map(l=>l===""?i:[i,l].join("/"))),r&&s.push(...o),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function Ea(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:_a(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}const Oa=/^:\w+$/,Sa=3,Ca=2,Aa=1,Na=10,Ia=-2,zt=e=>e==="*";function Ra(e,t){let n=e.split("/"),a=n.length;return n.some(zt)&&(a+=Ia),t&&(a+=Ca),n.filter(r=>!zt(r)).reduce((r,i)=>r+(Oa.test(i)?Sa:i===""?Aa:Na),a)}function _a(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function Ta(e,t){let{routesMeta:n}=e,a={},r="/",i=[];for(let o=0;o<n.length;++o){let s=n[o],l=o===n.length-1,f=r==="/"?t:t.slice(r.length)||"/",c=La({path:s.relativePath,caseSensitive:s.caseSensitive,end:l},f);if(!c)return null;Object.assign(a,c.params);let u=s.route;i.push({params:a,pathname:Y([r,c.pathname]),pathnameBase:$a(Y([r,c.pathnameBase])),route:u}),c.pathnameBase!=="/"&&(r=Y([r,c.pathnameBase]))}return i}function La(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=ja(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let i=r[0],o=i.replace(/(.)\/+$/,"$1"),s=r.slice(1);return{params:a.reduce((f,c,u)=>{if(c==="*"){let p=s[u]||"";o=i.slice(0,i.length-p.length).replace(/(.)\/+$/,"$1")}return f[c]=Fa(s[u]||"",c),f},{}),pathname:i,pathnameBase:o,pattern:e}}function ja(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),kt(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/\/:(\w+)/g,(o,s)=>(a.push(s),"/([^\\/]+)"));return e.endsWith("*")?(a.push("*"),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function Ma(e){try{return decodeURI(e)}catch(t){return kt(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Fa(e,t){try{return decodeURIComponent(e)}catch(n){return kt(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+n+").")),e}}function Pt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}function Ua(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?ie(e):e;return{pathname:n?n.startsWith("/")?n:Da(n,t):t,search:za(a),hash:Wa(r)}}function Da(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function qe(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Pn(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function En(e,t,n,a){a===void 0&&(a=!1);let r;typeof e=="string"?r=ie(e):(r=ue({},e),N(!r.pathname||!r.pathname.includes("?"),qe("?","pathname","search",r)),N(!r.pathname||!r.pathname.includes("#"),qe("#","pathname","hash",r)),N(!r.search||!r.search.includes("#"),qe("#","search","hash",r)));let i=e===""||r.pathname==="",o=i?"/":r.pathname,s;if(a||o==null)s=n;else{let u=t.length-1;if(o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),u-=1;r.pathname=p.join("/")}s=u>=0?t[u]:"/"}let l=Ua(r,s),f=o&&o!=="/"&&o.endsWith("/"),c=(i||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(f||c)&&(l.pathname+="/"),l}const Y=e=>e.join("/").replace(/\/\/+/g,"/"),$a=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),za=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Wa=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ya(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const On=["post","put","patch","delete"];new Set(On);const Ba=["get",...On];new Set(Ba);/**
 * React Router v6.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function je(){return je=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},je.apply(this,arguments)}const Sn=v.createContext(null),Ha=v.createContext(null),oe=v.createContext(null),We=v.createContext(null),Q=v.createContext({outlet:null,matches:[],isDataRoute:!1}),Cn=v.createContext(null);function Ga(e,t){let{relative:n}=t===void 0?{}:t;be()||N(!1);let{basename:a,navigator:r}=v.useContext(oe),{hash:i,pathname:o,search:s}=Nn(e,{relative:n}),l=o;return a!=="/"&&(l=o==="/"?a:Y([a,o])),r.createHref({pathname:l,search:s,hash:i})}function be(){return v.useContext(We)!=null}function Ye(){return be()||N(!1),v.useContext(We).location}function An(e){v.useContext(oe).static||v.useLayoutEffect(e)}function Xa(){let{isDataRoute:e}=v.useContext(Q);return e?or():Va()}function Va(){be()||N(!1);let{basename:e,navigator:t}=v.useContext(oe),{matches:n}=v.useContext(Q),{pathname:a}=Ye(),r=JSON.stringify(Pn(n).map(s=>s.pathnameBase)),i=v.useRef(!1);return An(()=>{i.current=!0}),v.useCallback(function(s,l){if(l===void 0&&(l={}),!i.current)return;if(typeof s=="number"){t.go(s);return}let f=En(s,JSON.parse(r),a,l.relative==="path");e!=="/"&&(f.pathname=f.pathname==="/"?e:Y([e,f.pathname])),(l.replace?t.replace:t.push)(f,l.state,l)},[e,t,r,a])}function Nn(e,t){let{relative:n}=t===void 0?{}:t,{matches:a}=v.useContext(Q),{pathname:r}=Ye(),i=JSON.stringify(Pn(a).map(o=>o.pathnameBase));return v.useMemo(()=>En(e,JSON.parse(i),r,n==="path"),[e,i,r,n])}function Ka(e,t){return qa(e,t)}function qa(e,t,n){be()||N(!1);let{navigator:a}=v.useContext(oe),{matches:r}=v.useContext(Q),i=r[r.length-1],o=i?i.params:{};i&&i.pathname;let s=i?i.pathnameBase:"/";i&&i.route;let l=Ye(),f;if(t){var c;let b=typeof t=="string"?ie(t):t;s==="/"||(c=b.pathname)!=null&&c.startsWith(s)||N(!1),f=b}else f=l;let u=f.pathname||"/",p=s==="/"?u:u.slice(s.length)||"/",h=Pa(e,{pathname:p}),x=tr(h&&h.map(b=>Object.assign({},b,{params:Object.assign({},o,b.params),pathname:Y([s,a.encodeLocation?a.encodeLocation(b.pathname).pathname:b.pathname]),pathnameBase:b.pathnameBase==="/"?s:Y([s,a.encodeLocation?a.encodeLocation(b.pathnameBase).pathname:b.pathnameBase])})),r,n);return t&&x?v.createElement(We.Provider,{value:{location:je({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:z.Pop}},x):x}function Ja(){let e=ir(),t=Ya(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},i=null;return v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),n?v.createElement("pre",{style:r},n):null,i)}const Za=v.createElement(Ja,null);class Qa extends v.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error||n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error?v.createElement(Q.Provider,{value:this.props.routeContext},v.createElement(Cn.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function er(e){let{routeContext:t,match:n,children:a}=e,r=v.useContext(Sn);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),v.createElement(Q.Provider,{value:t},a)}function tr(e,t,n){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),e==null){var r;if((r=n)!=null&&r.errors)e=n.matches;else return null}let i=e,o=(a=n)==null?void 0:a.errors;if(o!=null){let s=i.findIndex(l=>l.route.id&&(o==null?void 0:o[l.route.id]));s>=0||N(!1),i=i.slice(0,Math.min(i.length,s+1))}return i.reduceRight((s,l,f)=>{let c=l.route.id?o==null?void 0:o[l.route.id]:null,u=null;n&&(u=l.route.errorElement||Za);let p=t.concat(i.slice(0,f+1)),h=()=>{let x;return c?x=u:l.route.Component?x=v.createElement(l.route.Component,null):l.route.element?x=l.route.element:x=s,v.createElement(er,{match:l,routeContext:{outlet:s,matches:p,isDataRoute:n!=null},children:x})};return n&&(l.route.ErrorBoundary||l.route.errorElement||f===0)?v.createElement(Qa,{location:n.location,revalidation:n.revalidation,component:u,error:c,children:h(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):h()},null)}var rt;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate"})(rt||(rt={}));var me;(function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId"})(me||(me={}));function nr(e){let t=v.useContext(Sn);return t||N(!1),t}function ar(e){let t=v.useContext(Ha);return t||N(!1),t}function rr(e){let t=v.useContext(Q);return t||N(!1),t}function In(e){let t=rr(),n=t.matches[t.matches.length-1];return n.route.id||N(!1),n.route.id}function ir(){var e;let t=v.useContext(Cn),n=ar(me.UseRouteError),a=In(me.UseRouteError);return t||((e=n.errors)==null?void 0:e[a])}function or(){let{router:e}=nr(rt.UseNavigateStable),t=In(me.UseNavigateStable),n=v.useRef(!1);return An(()=>{n.current=!0}),v.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r=="number"?e.navigate(r):e.navigate(r,je({fromRouteId:t},i)))},[e,t])}function it(e){N(!1)}function sr(e){let{basename:t="/",children:n=null,location:a,navigationType:r=z.Pop,navigator:i,static:o=!1}=e;be()&&N(!1);let s=t.replace(/^\/*/,"/"),l=v.useMemo(()=>({basename:s,navigator:i,static:o}),[s,i,o]);typeof a=="string"&&(a=ie(a));let{pathname:f="/",search:c="",hash:u="",state:p=null,key:h="default"}=a,x=v.useMemo(()=>{let b=Pt(f,s);return b==null?null:{location:{pathname:b,search:c,hash:u,state:p,key:h},navigationType:r}},[s,f,c,u,p,h,r]);return x==null?null:v.createElement(oe.Provider,{value:l},v.createElement(We.Provider,{children:n,value:x}))}function lr(e){let{children:t,location:n}=e;return Ka(ot(t),n)}var Wt;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(Wt||(Wt={}));new Promise(()=>{});function ot(e,t){t===void 0&&(t=[]);let n=[];return v.Children.forEach(e,(a,r)=>{if(!v.isValidElement(a))return;let i=[...t,r];if(a.type===v.Fragment){n.push.apply(n,ot(a.props.children,i));return}a.type!==it&&N(!1),!a.props.index||!a.props.children||N(!1);let o={id:a.props.id||i.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(o.children=ot(a.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function st(){return st=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},st.apply(this,arguments)}function fr(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function cr(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ur(e,t){return e.button===0&&(!t||t==="_self")&&!cr(e)}const mr=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"];function dr(e){let{basename:t,children:n,window:a}=e,r=v.useRef();r.current==null&&(r.current=xa({window:a,v5Compat:!0}));let i=r.current,[o,s]=v.useState({action:i.action,location:i.location});return v.useLayoutEffect(()=>i.listen(s),[i]),v.createElement(sr,{basename:t,children:n,location:o.location,navigationType:o.action,navigator:i})}const pr=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",vr=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,hr=v.forwardRef(function(t,n){let{onClick:a,relative:r,reloadDocument:i,replace:o,state:s,target:l,to:f,preventScrollReset:c}=t,u=fr(t,mr),{basename:p}=v.useContext(oe),h,x=!1;if(typeof f=="string"&&vr.test(f)&&(h=f,pr))try{let y=new URL(window.location.href),E=f.startsWith("//")?new URL(y.protocol+f):new URL(f),A=Pt(E.pathname,p);E.origin===y.origin&&A!=null?f=A+E.search+E.hash:x=!0}catch{}let b=Ga(f,{relative:r}),g=gr(f,{replace:o,state:s,target:l,preventScrollReset:c,relative:r});function P(y){a&&a(y),y.defaultPrevented||g(y)}return v.createElement("a",st({},u,{href:h||b,onClick:x||i?a:P,ref:n,target:l}))});var Yt;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(Yt||(Yt={}));var Bt;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Bt||(Bt={}));function gr(e,t){let{target:n,replace:a,state:r,preventScrollReset:i,relative:o}=t===void 0?{}:t,s=Xa(),l=Ye(),f=Nn(e,{relative:o});return v.useCallback(c=>{if(ur(c,n)){c.preventDefault();let u=a!==void 0?a:Le(l)===Le(f);s(e,{replace:u,state:r,preventScrollReset:i,relative:o})}},[l,s,f,a,r,n,e,i,o])}function Ht(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ht(Object(n),!0).forEach(function(a){R(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ht(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function Me(e){return Me=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Me(e)}function br(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Gt(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function yr(e,t,n){return t&&Gt(e.prototype,t),n&&Gt(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Et(e,t){return wr(e)||Pr(e,t)||Rn(e,t)||Or()}function ye(e){return xr(e)||kr(e)||Rn(e)||Er()}function xr(e){if(Array.isArray(e))return lt(e)}function wr(e){if(Array.isArray(e))return e}function kr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Pr(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var a=[],r=!0,i=!1,o,s;try{for(n=n.call(e);!(r=(o=n.next()).done)&&(a.push(o.value),!(t&&a.length===t));r=!0);}catch(l){i=!0,s=l}finally{try{!r&&n.return!=null&&n.return()}finally{if(i)throw s}}return a}}function Rn(e,t){if(e){if(typeof e=="string")return lt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return lt(e,t)}}function lt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Er(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Or(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Xt=function(){},Ot={},_n={},Tn=null,Ln={mark:Xt,measure:Xt};try{typeof window<"u"&&(Ot=window),typeof document<"u"&&(_n=document),typeof MutationObserver<"u"&&(Tn=MutationObserver),typeof performance<"u"&&(Ln=performance)}catch{}var Sr=Ot.navigator||{},Vt=Sr.userAgent,Kt=Vt===void 0?"":Vt,B=Ot,S=_n,qt=Tn,Pe=Ln;B.document;var U=!!S.documentElement&&!!S.head&&typeof S.addEventListener=="function"&&typeof S.createElement=="function",jn=~Kt.indexOf("MSIE")||~Kt.indexOf("Trident/"),Ee,Oe,Se,Ce,Ae,j="___FONT_AWESOME___",ft=16,Mn="fa",Fn="svg-inline--fa",J="data-fa-i2svg",ct="data-fa-pseudo-element",Cr="data-fa-pseudo-element-pending",St="data-prefix",Ct="data-icon",Jt="fontawesome-i2svg",Ar="async",Nr=["HTML","HEAD","STYLE","SCRIPT"],Un=function(){try{return!0}catch{return!1}}(),O="classic",C="sharp",At=[O,C];function xe(e){return new Proxy(e,{get:function(n,a){return a in n?n[a]:n[O]}})}var de=xe((Ee={},R(Ee,O,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),R(Ee,C,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),Ee)),pe=xe((Oe={},R(Oe,O,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),R(Oe,C,{solid:"fass",regular:"fasr",light:"fasl"}),Oe)),ve=xe((Se={},R(Se,O,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),R(Se,C,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),Se)),Ir=xe((Ce={},R(Ce,O,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),R(Ce,C,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),Ce)),Rr=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,Dn="fa-layers-text",_r=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Tr=xe((Ae={},R(Ae,O,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),R(Ae,C,{900:"fass",400:"fasr",300:"fasl"}),Ae)),$n=[1,2,3,4,5,6,7,8,9,10],Lr=$n.concat([11,12,13,14,15,16,17,18,19,20]),jr=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],K={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},he=new Set;Object.keys(pe[O]).map(he.add.bind(he));Object.keys(pe[C]).map(he.add.bind(he));var Mr=[].concat(At,ye(he),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",K.GROUP,K.SWAP_OPACITY,K.PRIMARY,K.SECONDARY]).concat($n.map(function(e){return"".concat(e,"x")})).concat(Lr.map(function(e){return"w-".concat(e)})),fe=B.FontAwesomeConfig||{};function Fr(e){var t=S.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Ur(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(S&&typeof S.querySelector=="function"){var Dr=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Dr.forEach(function(e){var t=Et(e,2),n=t[0],a=t[1],r=Ur(Fr(n));r!=null&&(fe[a]=r)})}var zn={styleDefault:"solid",familyDefault:"classic",cssPrefix:Mn,replacementClass:Fn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};fe.familyPrefix&&(fe.cssPrefix=fe.familyPrefix);var re=m(m({},zn),fe);re.autoReplaceSvg||(re.observeMutations=!1);var d={};Object.keys(zn).forEach(function(e){Object.defineProperty(d,e,{enumerable:!0,set:function(n){re[e]=n,ce.forEach(function(a){return a(d)})},get:function(){return re[e]}})});Object.defineProperty(d,"familyPrefix",{enumerable:!0,set:function(t){re.cssPrefix=t,ce.forEach(function(n){return n(d)})},get:function(){return re.cssPrefix}});B.FontAwesomeConfig=d;var ce=[];function $r(e){return ce.push(e),function(){ce.splice(ce.indexOf(e),1)}}var $=ft,L={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function zr(e){if(!(!e||!U)){var t=S.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=S.head.childNodes,a=null,r=n.length-1;r>-1;r--){var i=n[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return S.head.insertBefore(t,a),e}}var Wr="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ge(){for(var e=12,t="";e-- >0;)t+=Wr[Math.random()*62|0];return t}function se(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Nt(e){return e.classList?se(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Wn(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Yr(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(Wn(e[n]),'" ')},"").trim()}function Be(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function It(e){return e.size!==L.size||e.x!==L.x||e.y!==L.y||e.rotate!==L.rotate||e.flipX||e.flipY}function Br(e){var t=e.transform,n=e.containerWidth,a=e.iconWidth,r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:f}}function Hr(e){var t=e.transform,n=e.width,a=n===void 0?ft:n,r=e.height,i=r===void 0?ft:r,o=e.startCentered,s=o===void 0?!1:o,l="";return s&&jn?l+="translate(".concat(t.x/$-a/2,"em, ").concat(t.y/$-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(t.x/$,"em), calc(-50% + ").concat(t.y/$,"em)) "):l+="translate(".concat(t.x/$,"em, ").concat(t.y/$,"em) "),l+="scale(".concat(t.size/$*(t.flipX?-1:1),", ").concat(t.size/$*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var Gr=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Yn(){var e=Mn,t=Fn,n=d.cssPrefix,a=d.replacementClass,r=Gr;if(n!==e||a!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(a))}return r}var Zt=!1;function Je(){d.autoAddCss&&!Zt&&(zr(Yn()),Zt=!0)}var Xr={mixout:function(){return{dom:{css:Yn,insertCss:Je}}},hooks:function(){return{beforeDOMElementCreation:function(){Je()},beforeI2svg:function(){Je()}}}},M=B||{};M[j]||(M[j]={});M[j].styles||(M[j].styles={});M[j].hooks||(M[j].hooks={});M[j].shims||(M[j].shims=[]);var T=M[j],Bn=[],Vr=function e(){S.removeEventListener("DOMContentLoaded",e),Fe=1,Bn.map(function(t){return t()})},Fe=!1;U&&(Fe=(S.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(S.readyState),Fe||S.addEventListener("DOMContentLoaded",Vr));function Kr(e){U&&(Fe?setTimeout(e,0):Bn.push(e))}function we(e){var t=e.tag,n=e.attributes,a=n===void 0?{}:n,r=e.children,i=r===void 0?[]:r;return typeof e=="string"?Wn(e):"<".concat(t," ").concat(Yr(a),">").concat(i.map(we).join(""),"</").concat(t,">")}function Qt(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var qr=function(t,n){return function(a,r,i,o){return t.call(n,a,r,i,o)}},Ze=function(t,n,a,r){var i=Object.keys(t),o=i.length,s=r!==void 0?qr(n,r):n,l,f,c;for(a===void 0?(l=1,c=t[i[0]]):(l=0,c=a);l<o;l++)f=i[l],c=s(c,t[f],f,t);return c};function Jr(e){for(var t=[],n=0,a=e.length;n<a;){var r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){var i=e.charCodeAt(n++);(i&64512)==56320?t.push(((r&1023)<<10)+(i&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function ut(e){var t=Jr(e);return t.length===1?t[0].toString(16):null}function Zr(e,t){var n=e.length,a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function en(e){return Object.keys(e).reduce(function(t,n){var a=e[n],r=!!a.icon;return r?t[a.iconName]=a.icon:t[n]=a,t},{})}function mt(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=n.skipHooks,r=a===void 0?!1:a,i=en(t);typeof T.hooks.addPack=="function"&&!r?T.hooks.addPack(e,en(t)):T.styles[e]=m(m({},T.styles[e]||{}),i),e==="fas"&&mt("fa",t)}var Ne,Ie,Re,ee=T.styles,Qr=T.shims,ei=(Ne={},R(Ne,O,Object.values(ve[O])),R(Ne,C,Object.values(ve[C])),Ne),Rt=null,Hn={},Gn={},Xn={},Vn={},Kn={},ti=(Ie={},R(Ie,O,Object.keys(de[O])),R(Ie,C,Object.keys(de[C])),Ie);function ni(e){return~Mr.indexOf(e)}function ai(e,t){var n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!ni(r)?r:null}var qn=function(){var t=function(i){return Ze(ee,function(o,s,l){return o[l]=Ze(s,i,{}),o},{})};Hn=t(function(r,i,o){if(i[3]&&(r[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){r[l.toString(16)]=o})}return r}),Gn=t(function(r,i,o){if(r[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){r[l]=o})}return r}),Kn=t(function(r,i,o){var s=i[2];return r[o]=o,s.forEach(function(l){r[l]=o}),r});var n="far"in ee||d.autoFetchSvg,a=Ze(Qr,function(r,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(r.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});Xn=a.names,Vn=a.unicodes,Rt=He(d.styleDefault,{family:d.familyDefault})};$r(function(e){Rt=He(e.styleDefault,{family:d.familyDefault})});qn();function _t(e,t){return(Hn[e]||{})[t]}function ri(e,t){return(Gn[e]||{})[t]}function q(e,t){return(Kn[e]||{})[t]}function Jn(e){return Xn[e]||{prefix:null,iconName:null}}function ii(e){var t=Vn[e],n=_t("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function H(){return Rt}var Tt=function(){return{prefix:null,iconName:null,rest:[]}};function He(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,a=n===void 0?O:n,r=de[a][e],i=pe[a][e]||pe[a][r],o=e in T.styles?e:null;return i||o||null}var tn=(Re={},R(Re,O,Object.keys(ve[O])),R(Re,C,Object.keys(ve[C])),Re);function Ge(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.skipLookups,r=a===void 0?!1:a,i=(t={},R(t,O,"".concat(d.cssPrefix,"-").concat(O)),R(t,C,"".concat(d.cssPrefix,"-").concat(C)),t),o=null,s=O;(e.includes(i[O])||e.some(function(f){return tn[O].includes(f)}))&&(s=O),(e.includes(i[C])||e.some(function(f){return tn[C].includes(f)}))&&(s=C);var l=e.reduce(function(f,c){var u=ai(d.cssPrefix,c);if(ee[c]?(c=ei[s].includes(c)?Ir[s][c]:c,o=c,f.prefix=c):ti[s].indexOf(c)>-1?(o=c,f.prefix=He(c,{family:s})):u?f.iconName=u:c!==d.replacementClass&&c!==i[O]&&c!==i[C]&&f.rest.push(c),!r&&f.prefix&&f.iconName){var p=o==="fa"?Jn(f.iconName):{},h=q(f.prefix,f.iconName);p.prefix&&(o=null),f.iconName=p.iconName||h||f.iconName,f.prefix=p.prefix||f.prefix,f.prefix==="far"&&!ee.far&&ee.fas&&!d.autoFetchSvg&&(f.prefix="fas")}return f},Tt());return(e.includes("fa-brands")||e.includes("fab"))&&(l.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(l.prefix="fad"),!l.prefix&&s===C&&(ee.fass||d.autoFetchSvg)&&(l.prefix="fass",l.iconName=q(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||o==="fa")&&(l.prefix=H()||"fas"),l}var oi=function(){function e(){br(this,e),this.definitions={}}return yr(e,[{key:"add",value:function(){for(var n=this,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=r.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=m(m({},n.definitions[s]||{}),o[s]),mt(s,o[s]);var l=ve[O][s];l&&mt(l,o[s]),qn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(i){var o=r[i],s=o.prefix,l=o.iconName,f=o.icon,c=f[2];n[s]||(n[s]={}),c.length>0&&c.forEach(function(u){typeof u=="string"&&(n[s][u]=f)}),n[s][l]=f}),n}}]),e}(),nn=[],te={},ae={},si=Object.keys(ae);function li(e,t){var n=t.mixoutsTo;return nn=e,te={},Object.keys(ae).forEach(function(a){si.indexOf(a)===-1&&delete ae[a]}),nn.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(o){typeof r[o]=="function"&&(n[o]=r[o]),Me(r[o])==="object"&&Object.keys(r[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=r[o][s]})}),a.hooks){var i=a.hooks();Object.keys(i).forEach(function(o){te[o]||(te[o]=[]),te[o].push(i[o])})}a.provides&&a.provides(ae)}),n}function dt(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];var i=te[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(a))}),t}function Z(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var r=te[e]||[];r.forEach(function(i){i.apply(null,n)})}function F(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return ae[e]?ae[e].apply(null,t):void 0}function pt(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||H();if(t)return t=q(n,t)||t,Qt(Zn.definitions,n,t)||Qt(T.styles,n,t)}var Zn=new oi,fi=function(){d.autoReplaceSvg=!1,d.observeMutations=!1,Z("noAuto")},ci={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return U?(Z("beforeI2svg",t),F("pseudoElements2svg",t),F("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;d.autoReplaceSvg===!1&&(d.autoReplaceSvg=!0),d.observeMutations=!0,Kr(function(){mi({autoReplaceSvgRoot:n}),Z("watch",t)})}},ui={icon:function(t){if(t===null)return null;if(Me(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:q(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],a=He(t[0]);return{prefix:a,iconName:q(a,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(d.cssPrefix,"-"))>-1||t.match(Rr))){var r=Ge(t.split(" "),{skipLookups:!0});return{prefix:r.prefix||H(),iconName:q(r.prefix,r.iconName)||r.iconName}}if(typeof t=="string"){var i=H();return{prefix:i,iconName:q(i,t)||t}}}},_={noAuto:fi,config:d,dom:ci,parse:ui,library:Zn,findIconDefinition:pt,toHtml:we},mi=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,a=n===void 0?S:n;(Object.keys(T.styles).length>0||d.autoFetchSvg)&&U&&d.autoReplaceSvg&&_.dom.i2svg({node:a})};function Xe(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(a){return we(a)})}}),Object.defineProperty(e,"node",{get:function(){if(U){var a=S.createElement("div");return a.innerHTML=e.html,a.children}}}),e}function di(e){var t=e.children,n=e.main,a=e.mask,r=e.attributes,i=e.styles,o=e.transform;if(It(o)&&n.found&&!a.found){var s=n.width,l=n.height,f={x:s/l/2,y:.5};r.style=Be(m(m({},i),{},{"transform-origin":"".concat(f.x+o.x/16,"em ").concat(f.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:t}]}function pi(e){var t=e.prefix,n=e.iconName,a=e.children,r=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(d.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m(m({},r),{},{id:o}),children:a}]}]}function Lt(e){var t=e.icons,n=t.main,a=t.mask,r=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.title,f=e.maskId,c=e.titleId,u=e.extra,p=e.watchable,h=p===void 0?!1:p,x=a.found?a:n,b=x.width,g=x.height,P=r==="fak",y=[d.replacementClass,i?"".concat(d.cssPrefix,"-").concat(i):""].filter(function(D){return u.classes.indexOf(D)===-1}).filter(function(D){return D!==""||!!D}).concat(u.classes).join(" "),E={children:[],attributes:m(m({},u.attributes),{},{"data-prefix":r,"data-icon":i,class:y,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(b," ").concat(g)})},A=P&&!~u.classes.indexOf("fa-fw")?{width:"".concat(b/g*16*.0625,"em")}:{};h&&(E.attributes[J]=""),l&&(E.children.push({tag:"title",attributes:{id:E.attributes["aria-labelledby"]||"title-".concat(c||ge())},children:[l]}),delete E.attributes.title);var I=m(m({},E),{},{prefix:r,iconName:i,main:n,mask:a,maskId:f,transform:o,symbol:s,styles:m(m({},A),u.styles)}),X=a.found&&n.found?F("generateAbstractMask",I)||{children:[],attributes:{}}:F("generateAbstractIcon",I)||{children:[],attributes:{}},V=X.children,Ve=X.attributes;return I.children=V,I.attributes=Ve,s?pi(I):di(I)}function an(e){var t=e.content,n=e.width,a=e.height,r=e.transform,i=e.title,o=e.extra,s=e.watchable,l=s===void 0?!1:s,f=m(m(m({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});l&&(f[J]="");var c=m({},o.styles);It(r)&&(c.transform=Hr({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);var u=Be(c);u.length>0&&(f.style=u);var p=[];return p.push({tag:"span",attributes:f,children:[t]}),i&&p.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),p}function vi(e){var t=e.content,n=e.title,a=e.extra,r=m(m(m({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),i=Be(a.styles);i.length>0&&(r.style=i);var o=[];return o.push({tag:"span",attributes:r,children:[t]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var Qe=T.styles;function vt(e){var t=e[0],n=e[1],a=e.slice(4),r=Et(a,1),i=r[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(d.cssPrefix,"-").concat(K.GROUP)},children:[{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(K.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(K.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:n,icon:o}}var hi={found:!1,width:512,height:512};function gi(e,t){!Un&&!d.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function ht(e,t){var n=t;return t==="fa"&&d.styleDefault!==null&&(t=H()),new Promise(function(a,r){if(F("missingIconAbstract"),n==="fa"){var i=Jn(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&Qe[t]&&Qe[t][e]){var o=Qe[t][e];return a(vt(o))}gi(e,t),a(m(m({},hi),{},{icon:d.showMissingIcons&&e?F("missingIconAbstract")||{}:{}}))})}var rn=function(){},gt=d.measurePerformance&&Pe&&Pe.mark&&Pe.measure?Pe:{mark:rn,measure:rn},le='FA "6.4.0"',bi=function(t){return gt.mark("".concat(le," ").concat(t," begins")),function(){return Qn(t)}},Qn=function(t){gt.mark("".concat(le," ").concat(t," ends")),gt.measure("".concat(le," ").concat(t),"".concat(le," ").concat(t," begins"),"".concat(le," ").concat(t," ends"))},jt={begin:bi,end:Qn},_e=function(){};function on(e){var t=e.getAttribute?e.getAttribute(J):null;return typeof t=="string"}function yi(e){var t=e.getAttribute?e.getAttribute(St):null,n=e.getAttribute?e.getAttribute(Ct):null;return t&&n}function xi(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(d.replacementClass)}function wi(){if(d.autoReplaceSvg===!0)return Te.replace;var e=Te[d.autoReplaceSvg];return e||Te.replace}function ki(e){return S.createElementNS("http://www.w3.org/2000/svg",e)}function Pi(e){return S.createElement(e)}function ea(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,a=n===void 0?e.tag==="svg"?ki:Pi:n;if(typeof e=="string")return S.createTextNode(e);var r=a(e.tag);Object.keys(e.attributes||[]).forEach(function(o){r.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){r.appendChild(ea(o,{ceFn:a}))}),r}function Ei(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Te={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(r){n.parentNode.insertBefore(ea(r),n)}),n.getAttribute(J)===null&&d.keepOriginalSource){var a=S.createComment(Ei(n));n.parentNode.replaceChild(a,n)}else n.remove()},nest:function(t){var n=t[0],a=t[1];if(~Nt(n).indexOf(d.replacementClass))return Te.replace(t);var r=new RegExp("".concat(d.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var i=a[0].attributes.class.split(" ").reduce(function(s,l){return l===d.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});a[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=a.map(function(s){return we(s)}).join(`
`);n.setAttribute(J,""),n.innerHTML=o}};function sn(e){e()}function ta(e,t){var n=typeof t=="function"?t:_e;if(e.length===0)n();else{var a=sn;d.mutateApproach===Ar&&(a=B.requestAnimationFrame||sn),a(function(){var r=wi(),i=jt.begin("mutate");e.map(r),i(),n()})}}var Mt=!1;function na(){Mt=!0}function bt(){Mt=!1}var Ue=null;function ln(e){if(qt&&d.observeMutations){var t=e.treeCallback,n=t===void 0?_e:t,a=e.nodeCallback,r=a===void 0?_e:a,i=e.pseudoElementsCallback,o=i===void 0?_e:i,s=e.observeMutationsRoot,l=s===void 0?S:s;Ue=new qt(function(f){if(!Mt){var c=H();se(f).forEach(function(u){if(u.type==="childList"&&u.addedNodes.length>0&&!on(u.addedNodes[0])&&(d.searchPseudoElements&&o(u.target),n(u.target)),u.type==="attributes"&&u.target.parentNode&&d.searchPseudoElements&&o(u.target.parentNode),u.type==="attributes"&&on(u.target)&&~jr.indexOf(u.attributeName))if(u.attributeName==="class"&&yi(u.target)){var p=Ge(Nt(u.target)),h=p.prefix,x=p.iconName;u.target.setAttribute(St,h||c),x&&u.target.setAttribute(Ct,x)}else xi(u.target)&&r(u.target)})}}),U&&Ue.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Oi(){Ue&&Ue.disconnect()}function Si(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(a,r){var i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),n}function Ci(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"",r=Ge(Nt(e));return r.prefix||(r.prefix=H()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=ri(r.prefix,e.innerText)||_t(r.prefix,ut(e.innerText))),!r.iconName&&d.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Ai(e){var t=se(e.attributes).reduce(function(r,i){return r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r},{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return d.autoA11y&&(n?t["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(a||ge()):(t["aria-hidden"]="true",t.focusable="false")),t}function Ni(){return{iconName:null,title:null,titleId:null,prefix:null,transform:L,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function fn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Ci(e),a=n.iconName,r=n.prefix,i=n.rest,o=Ai(e),s=dt("parseNodeAttributes",{},e),l=t.styleParser?Si(e):[];return m({iconName:a,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:r,transform:L,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Ii=T.styles;function aa(e){var t=d.autoReplaceSvg==="nest"?fn(e,{styleParser:!1}):fn(e);return~t.extra.classes.indexOf(Dn)?F("generateLayersText",e,t):F("generateSvgReplacementMutation",e,t)}var G=new Set;At.map(function(e){G.add("fa-".concat(e))});Object.keys(de[O]).map(G.add.bind(G));Object.keys(de[C]).map(G.add.bind(G));G=ye(G);function cn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!U)return Promise.resolve();var n=S.documentElement.classList,a=function(u){return n.add("".concat(Jt,"-").concat(u))},r=function(u){return n.remove("".concat(Jt,"-").concat(u))},i=d.autoFetchSvg?G:At.map(function(c){return"fa-".concat(c)}).concat(Object.keys(Ii));i.includes("fa")||i.push("fa");var o=[".".concat(Dn,":not([").concat(J,"])")].concat(i.map(function(c){return".".concat(c,":not([").concat(J,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=se(e.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var l=jt.begin("onTree"),f=s.reduce(function(c,u){try{var p=aa(u);p&&c.push(p)}catch(h){Un||h.name==="MissingIcon"&&console.error(h)}return c},[]);return new Promise(function(c,u){Promise.all(f).then(function(p){ta(p,function(){a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),l(),c()})}).catch(function(p){l(),u(p)})})}function Ri(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;aa(e).then(function(n){n&&ta([n],t)})}function _i(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(t||{}).icon?t:pt(t||{}),r=n.mask;return r&&(r=(r||{}).icon?r:pt(r||{})),e(a,m(m({},n),{},{mask:r}))}}var Ti=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.transform,r=a===void 0?L:a,i=n.symbol,o=i===void 0?!1:i,s=n.mask,l=s===void 0?null:s,f=n.maskId,c=f===void 0?null:f,u=n.title,p=u===void 0?null:u,h=n.titleId,x=h===void 0?null:h,b=n.classes,g=b===void 0?[]:b,P=n.attributes,y=P===void 0?{}:P,E=n.styles,A=E===void 0?{}:E;if(t){var I=t.prefix,X=t.iconName,V=t.icon;return Xe(m({type:"icon"},t),function(){return Z("beforeDOMElementCreation",{iconDefinition:t,params:n}),d.autoA11y&&(p?y["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(x||ge()):(y["aria-hidden"]="true",y.focusable="false")),Lt({icons:{main:vt(V),mask:l?vt(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:I,iconName:X,transform:m(m({},L),r),symbol:o,title:p,maskId:c,titleId:x,extra:{attributes:y,styles:A,classes:g}})})}},Li={mixout:function(){return{icon:_i(Ti)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=cn,n.nodeCallback=Ri,n}}},provides:function(t){t.i2svg=function(n){var a=n.node,r=a===void 0?S:a,i=n.callback,o=i===void 0?function(){}:i;return cn(r,o)},t.generateSvgReplacementMutation=function(n,a){var r=a.iconName,i=a.title,o=a.titleId,s=a.prefix,l=a.transform,f=a.symbol,c=a.mask,u=a.maskId,p=a.extra;return new Promise(function(h,x){Promise.all([ht(r,s),c.iconName?ht(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(b){var g=Et(b,2),P=g[0],y=g[1];h([n,Lt({icons:{main:P,mask:y},prefix:s,iconName:r,transform:l,symbol:f,maskId:u,title:i,titleId:o,extra:p,watchable:!0})])}).catch(x)})},t.generateAbstractIcon=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.transform,s=n.styles,l=Be(s);l.length>0&&(r.style=l);var f;return It(o)&&(f=F("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),a.push(f||i.icon),{children:a,attributes:r}}}},ji={mixout:function(){return{layer:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,i=r===void 0?[]:r;return Xe({type:"layer"},function(){Z("beforeDOMElementCreation",{assembler:n,params:a});var o=[];return n(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(d.cssPrefix,"-layers")].concat(ye(i)).join(" ")},children:o}]})}}}},Mi={mixout:function(){return{counter:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,i=r===void 0?null:r,o=a.classes,s=o===void 0?[]:o,l=a.attributes,f=l===void 0?{}:l,c=a.styles,u=c===void 0?{}:c;return Xe({type:"counter",content:n},function(){return Z("beforeDOMElementCreation",{content:n,params:a}),vi({content:n.toString(),title:i,extra:{attributes:f,styles:u,classes:["".concat(d.cssPrefix,"-layers-counter")].concat(ye(s))}})})}}}},Fi={mixout:function(){return{text:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?L:r,o=a.title,s=o===void 0?null:o,l=a.classes,f=l===void 0?[]:l,c=a.attributes,u=c===void 0?{}:c,p=a.styles,h=p===void 0?{}:p;return Xe({type:"text",content:n},function(){return Z("beforeDOMElementCreation",{content:n,params:a}),an({content:n,transform:m(m({},L),i),title:s,extra:{attributes:u,styles:h,classes:["".concat(d.cssPrefix,"-layers-text")].concat(ye(f))}})})}}},provides:function(t){t.generateLayersText=function(n,a){var r=a.title,i=a.transform,o=a.extra,s=null,l=null;if(jn){var f=parseInt(getComputedStyle(n).fontSize,10),c=n.getBoundingClientRect();s=c.width/f,l=c.height/f}return d.autoA11y&&!r&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,an({content:n.innerHTML,width:s,height:l,transform:i,title:r,extra:o,watchable:!0})])}}},Ui=new RegExp('"',"ug"),un=[1105920,1112319];function Di(e){var t=e.replace(Ui,""),n=Zr(t,0),a=n>=un[0]&&n<=un[1],r=t.length===2?t[0]===t[1]:!1;return{value:ut(r?t[0]:t),isSecondary:a||r}}function mn(e,t){var n="".concat(Cr).concat(t.replace(":","-"));return new Promise(function(a,r){if(e.getAttribute(n)!==null)return a();var i=se(e.children),o=i.filter(function(V){return V.getAttribute(ct)===t})[0],s=B.getComputedStyle(e,t),l=s.getPropertyValue("font-family").match(_r),f=s.getPropertyValue("font-weight"),c=s.getPropertyValue("content");if(o&&!l)return e.removeChild(o),a();if(l&&c!=="none"&&c!==""){var u=s.getPropertyValue("content"),p=~["Sharp"].indexOf(l[2])?C:O,h=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?pe[p][l[2].toLowerCase()]:Tr[p][f],x=Di(u),b=x.value,g=x.isSecondary,P=l[0].startsWith("FontAwesome"),y=_t(h,b),E=y;if(P){var A=ii(b);A.iconName&&A.prefix&&(y=A.iconName,h=A.prefix)}if(y&&!g&&(!o||o.getAttribute(St)!==h||o.getAttribute(Ct)!==E)){e.setAttribute(n,E),o&&e.removeChild(o);var I=Ni(),X=I.extra;X.attributes[ct]=t,ht(y,h).then(function(V){var Ve=Lt(m(m({},I),{},{icons:{main:V,mask:Tt()},prefix:h,iconName:E,extra:X,watchable:!0})),D=S.createElement("svg");t==="::before"?e.insertBefore(D,e.firstChild):e.appendChild(D),D.outerHTML=Ve.map(function(ca){return we(ca)}).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function $i(e){return Promise.all([mn(e,"::before"),mn(e,"::after")])}function zi(e){return e.parentNode!==document.head&&!~Nr.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(ct)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function dn(e){if(U)return new Promise(function(t,n){var a=se(e.querySelectorAll("*")).filter(zi).map($i),r=jt.begin("searchPseudoElements");na(),Promise.all(a).then(function(){r(),bt(),t()}).catch(function(){r(),bt(),n()})})}var Wi={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=dn,n}}},provides:function(t){t.pseudoElements2svg=function(n){var a=n.node,r=a===void 0?S:a;d.searchPseudoElements&&dn(r)}}},pn=!1,Yi={mixout:function(){return{dom:{unwatch:function(){na(),pn=!0}}}},hooks:function(){return{bootstrap:function(){ln(dt("mutationObserverCallbacks",{}))},noAuto:function(){Oi()},watch:function(n){var a=n.observeMutationsRoot;pn?bt():ln(dt("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},vn=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(a,r){var i=r.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return a.flipX=!0,a;if(o&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(o){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},n)},Bi={mixout:function(){return{parse:{transform:function(n){return vn(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-transform");return r&&(n.transform=vn(r)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var a=n.main,r=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),f="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),c="rotate(".concat(r.rotate," 0 0)"),u={transform:"".concat(l," ").concat(f," ").concat(c)},p={transform:"translate(".concat(o/2*-1," -256)")},h={outer:s,inner:u,path:p};return{tag:"g",attributes:m({},h.outer),children:[{tag:"g",attributes:m({},h.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:m(m({},a.icon.attributes),h.path)}]}]}}}},et={x:0,y:0,width:"100%",height:"100%"};function hn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Hi(e){return e.tag==="g"?e.children:[e]}var Gi={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-mask"),i=r?Ge(r.split(" ").map(function(o){return o.trim()})):Tt();return i.prefix||(i.prefix=H()),n.mask=i,n.maskId=a.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.mask,s=n.maskId,l=n.transform,f=i.width,c=i.icon,u=o.width,p=o.icon,h=Br({transform:l,containerWidth:u,iconWidth:f}),x={tag:"rect",attributes:m(m({},et),{},{fill:"white"})},b=c.children?{children:c.children.map(hn)}:{},g={tag:"g",attributes:m({},h.inner),children:[hn(m({tag:c.tag,attributes:m(m({},c.attributes),h.path)},b))]},P={tag:"g",attributes:m({},h.outer),children:[g]},y="mask-".concat(s||ge()),E="clip-".concat(s||ge()),A={tag:"mask",attributes:m(m({},et),{},{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[x,P]},I={tag:"defs",children:[{tag:"clipPath",attributes:{id:E},children:Hi(p)},A]};return a.push(I,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(E,")"),mask:"url(#".concat(y,")")},et)}),{children:a,attributes:r}}}},Xi={provides:function(t){var n=!1;B.matchMedia&&(n=B.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:m(m({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=m(m({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:m(m({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:m(m({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m(m({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:m(m({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:m(m({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||a.push({tag:"path",attributes:m(m({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m(m({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},Vi={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-symbol"),i=r===null?!1:r===""?!0:r;return n.symbol=i,n}}}},Ki=[Xr,Li,ji,Mi,Fi,Wi,Yi,Bi,Gi,Xi,Vi];li(Ki,{mixoutsTo:_});_.noAuto;_.config;var qi=_.library;_.dom;var yt=_.parse;_.findIconDefinition;_.toHtml;var Ji=_.icon;_.layer;_.text;_.counter;var Zi={prefix:"fas",iconName:"crow",icon:[640,512,[],"f520","M456 0c-48.6 0-88 39.4-88 88v29.2L12.5 390.6c-14 10.8-16.6 30.9-5.9 44.9s30.9 16.6 44.9 5.9L126.1 384H259.2l46.6 113.1c5 12.3 19.1 18.1 31.3 13.1s18.1-19.1 13.1-31.3L311.1 384H352c1.1 0 2.1 0 3.2 0l46.6 113.2c5 12.3 19.1 18.1 31.3 13.1s18.1-19.1 13.1-31.3l-42-102C484.9 354.1 544 280 544 192V128v-8l80.5-20.1c8.6-2.1 13.8-10.8 11.6-19.4C629 52 603.4 32 574 32H523.9C507.7 12.5 483.3 0 456 0zm0 64a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"]},ra={exports:{}},Qi="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",eo=Qi,to=eo;function ia(){}function oa(){}oa.resetWarningCache=ia;var no=function(){function e(a,r,i,o,s,l){if(l!==to){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:oa,resetWarningCache:ia};return n.PropTypes=n,n};ra.exports=no();var ao=ra.exports;const w=da(ao);function gn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?gn(Object(n),!0).forEach(function(a){ne(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):gn(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function De(e){return De=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},De(e)}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ro(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function io(e,t){if(e==null)return{};var n=ro(e,t),a,r;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function xt(e){return oo(e)||so(e)||lo(e)||fo()}function oo(e){if(Array.isArray(e))return wt(e)}function so(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function lo(e,t){if(e){if(typeof e=="string")return wt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return wt(e,t)}}function wt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function fo(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function co(e){var t,n=e.beat,a=e.fade,r=e.beatFade,i=e.bounce,o=e.shake,s=e.flash,l=e.spin,f=e.spinPulse,c=e.spinReverse,u=e.pulse,p=e.fixedWidth,h=e.inverse,x=e.border,b=e.listItem,g=e.flip,P=e.size,y=e.rotation,E=e.pull,A=(t={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":i,"fa-shake":o,"fa-flash":s,"fa-spin":l,"fa-spin-reverse":c,"fa-spin-pulse":f,"fa-pulse":u,"fa-fw":p,"fa-inverse":h,"fa-border":x,"fa-li":b,"fa-flip":g===!0,"fa-flip-horizontal":g==="horizontal"||g==="both","fa-flip-vertical":g==="vertical"||g==="both"},ne(t,"fa-".concat(P),typeof P<"u"&&P!==null),ne(t,"fa-rotate-".concat(y),typeof y<"u"&&y!==null&&y!==0),ne(t,"fa-pull-".concat(E),typeof E<"u"&&E!==null),ne(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(A).map(function(I){return A[I]?I:null}).filter(function(I){return I})}function uo(e){return e=e-0,e===e}function sa(e){return uo(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var mo=["style"];function po(e){return e.charAt(0).toUpperCase()+e.slice(1)}function vo(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=sa(n.slice(0,a)),i=n.slice(a+1).trim();return r.startsWith("webkit")?t[po(r)]=i:t[r]=i,t},{})}function la(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(l){return la(e,l)}),r=Object.keys(t.attributes||{}).reduce(function(l,f){var c=t.attributes[f];switch(f){case"class":l.attrs.className=c,delete t.attributes.class;break;case"style":l.attrs.style=vo(c);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?l.attrs[f.toLowerCase()]=c:l.attrs[sa(f)]=c}return l},{attrs:{}}),i=n.style,o=i===void 0?{}:i,s=io(n,mo);return r.attrs.style=W(W({},r.attrs.style),o),e.apply(void 0,[t.tag,W(W({},r.attrs),s)].concat(xt(a)))}var fa=!1;try{fa=!0}catch{}function ho(){if(!fa&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function bn(e){if(e&&De(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(yt.icon)return yt.icon(e);if(e===null)return null;if(e&&De(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function tt(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?ne({},e,t):{}}var ke=$e.forwardRef(function(e,t){var n=e.icon,a=e.mask,r=e.symbol,i=e.className,o=e.title,s=e.titleId,l=e.maskId,f=bn(n),c=tt("classes",[].concat(xt(co(e)),xt(i.split(" ")))),u=tt("transform",typeof e.transform=="string"?yt.transform(e.transform):e.transform),p=tt("mask",bn(a)),h=Ji(f,W(W(W(W({},c),u),p),{},{symbol:r,title:o,titleId:s,maskId:l}));if(!h)return ho("Could not find icon",f),null;var x=h.abstract,b={ref:t};return Object.keys(e).forEach(function(g){ke.defaultProps.hasOwnProperty(g)||(b[g]=e[g])}),go(x[0],b)});ke.displayName="FontAwesomeIcon";ke.propTypes={beat:w.bool,border:w.bool,beatFade:w.bool,bounce:w.bool,className:w.string,fade:w.bool,flash:w.bool,mask:w.oneOfType([w.object,w.array,w.string]),maskId:w.string,fixedWidth:w.bool,inverse:w.bool,flip:w.oneOf([!0,!1,"horizontal","vertical","both"]),icon:w.oneOfType([w.object,w.array,w.string]),listItem:w.bool,pull:w.oneOf(["right","left"]),pulse:w.bool,rotation:w.oneOf([0,90,180,270]),shake:w.bool,size:w.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:w.bool,spinPulse:w.bool,spinReverse:w.bool,symbol:w.oneOfType([w.bool,w.string]),title:w.string,titleId:w.string,transform:w.oneOfType([w.string,w.object]),swapOpacity:w.bool};ke.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var go=la.bind(null,$e.createElement);function bo(){ua(()=>{qi.add(Zi)},[]);const[e,t]=Ke(""),[n,a]=Ke(""),[r,i]=Ke(!0),o=c=>{t(c.target.value)},s=c=>{a(c.target.value),i(f(c.target.value))},l=async c=>{if(c.preventDefault(),r)try{(await fetch(`http://localhost:8080/rest/users/login?username=${e}&password=${n}`,{method:"POST",headers:{"Content-Type":"application/json"}})).status==200&&console.log("SIUUUUUUUUU")}catch{}},f=c=>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(c);return k.jsx("section",{className:"vh-100",children:k.jsx("div",{className:"container-fluid",children:k.jsxs("div",{className:"row",children:[k.jsxs("div",{className:"col-sm-6 text-black",children:[k.jsxs("div",{className:"px-5 ms-xl-4",children:[k.jsx(ke,{icon:"crow",className:"fa-2x me-3 pt-5 mt-xl-4",style:{color:"#709085"}}),k.jsx("span",{className:"h1 fw-bold mb-0"})]}),k.jsx("div",{className:"d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5",children:k.jsxs("form",{style:{width:"23rem"},onSubmit:l,children:[k.jsx("h3",{className:"fw-normal mb-3 pb-3",style:{letterSpacing:"1px"},children:"Log in"}),k.jsx("div",{className:"form-outline mb-4",children:k.jsx("input",{type:"text",id:"form2Example18",className:"form-control form-control-lg ",placeholder:"Email address",value:e,onChange:o})}),k.jsxs("div",{className:"form-outline mb-4",children:[k.jsx("input",{type:"password",id:"form2Example28",className:`form-control form-control-lg ${r?"":"is-invalid"}`,placeholder:"Password",value:n,onChange:s}),!r&&k.jsx("div",{className:"invalid-feedback",children:"Password must have at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number."})]}),k.jsx("div",{className:"pt-1 mb-4",children:k.jsx("button",{className:"btn btn-info btn-lg btn-block btn-blue",type:"submit",children:"Login"})}),k.jsx("p",{className:"small mb-5 pb-lg-2",children:k.jsx("a",{className:"text-muted",href:"#!",children:"Forgot password?"})}),k.jsxs("p",{children:["Don't have an account?"," ",k.jsx(hr,{to:"/register",className:"link-blue",children:"Register here"})]})]})})]}),k.jsx("div",{className:"col-sm-6 px-0 d-none d-sm-block",children:k.jsx("img",{src:"https://www.fct.unl.pt/sites/default/files/images/nova_4.png",alt:"Login image",className:"w-100 vh-70",style:{objectFit:"cover",objectPosition:"left"}})})]})})})}function yo(){return k.jsx("div",{children:k.jsx("h1",{children:"Hello, world!"})})}function xo(){return k.jsx(dr,{children:k.jsxs(lr,{children:[k.jsx(it,{path:"/",element:k.jsx(bo,{})}),k.jsx(it,{path:"/register",element:k.jsx(yo,{})})]})})}nt.createRoot(document.getElementById("root")).render(k.jsx($e.StrictMode,{children:k.jsx(xo,{})}));
