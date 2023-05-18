import*as P from"react";import k,{useEffect as Y,useState as U,useRef as Ze,useCallback as et,useImperativeHandle as Ya,createContext as Fn,useContext as Ba}from"react";import Ha from"react-dom";import"@popperjs/core";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function Xa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var zn={exports:{}},st={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Va=k,Ga=Symbol.for("react.element"),qa=Symbol.for("react.fragment"),Ka=Object.prototype.hasOwnProperty,Ja=Va.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Qa={key:!0,ref:!0,__self:!0,__source:!0};function Dn(e,t,n){var a,r={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(a in t)Ka.call(t,a)&&!Qa.hasOwnProperty(a)&&(r[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)r[a]===void 0&&(r[a]=t[a]);return{$$typeof:Ga,type:e,key:i,ref:o,props:r,_owner:Ja.current}}st.Fragment=qa;st.jsx=Dn;st.jsxs=Dn;zn.exports=st;var u=zn.exports,xt={},nn=Ha;xt.createRoot=nn.createRoot,xt.hydrateRoot=nn.hydrateRoot;/**
 * @remix-run/router v1.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Oe(){return Oe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},Oe.apply(this,arguments)}var oe;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(oe||(oe={}));const an="popstate";function Za(e){e===void 0&&(e={});function t(a,r){let{pathname:i,search:o,hash:s}=a.location;return wt("",{pathname:i,search:o,hash:s},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(a,r){return typeof r=="string"?r:tt(r)}return tr(t,n,null,e)}function F(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ut(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function er(){return Math.random().toString(36).substr(2,8)}function rn(e,t){return{usr:e.state,key:e.key,idx:t}}function wt(e,t,n,a){return n===void 0&&(n=null),Oe({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?ke(t):t,{state:n,key:t&&t.key||a||er()})}function tt(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),a&&a!=="#"&&(t+=a.charAt(0)==="#"?a:"#"+a),t}function ke(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}function tr(e,t,n,a){a===void 0&&(a={});let{window:r=document.defaultView,v5Compat:i=!1}=a,o=r.history,s=oe.Pop,l=null,c=f();c==null&&(c=0,o.replaceState(Oe({},o.state,{idx:c}),""));function f(){return(o.state||{idx:null}).idx}function d(){s=oe.Pop;let p=f(),N=p==null?null:p-c;c=p,l&&l({action:s,location:g.location,delta:N})}function m(p,N){s=oe.Push;let b=wt(g.location,p,N);n&&n(b,p),c=f()+1;let C=rn(b,c),E=g.createHref(b);try{o.pushState(C,"",E)}catch{r.location.assign(E)}i&&l&&l({action:s,location:g.location,delta:1})}function h(p,N){s=oe.Replace;let b=wt(g.location,p,N);n&&n(b,p),c=f();let C=rn(b,c),E=g.createHref(b);o.replaceState(C,"",E),i&&l&&l({action:s,location:g.location,delta:0})}function v(p){let N=r.location.origin!=="null"?r.location.origin:r.location.href,b=typeof p=="string"?p:tt(p);return F(N,"No window.location.(origin|href) available to create URL for href: "+b),new URL(b,N)}let g={get action(){return s},get location(){return e(r,o)},listen(p){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(an,d),l=p,()=>{r.removeEventListener(an,d),l=null}},createHref(p){return t(r,p)},createURL:v,encodeLocation(p){let N=v(p);return{pathname:N.pathname,search:N.search,hash:N.hash}},push:m,replace:h,go(p){return o.go(p)}};return g}var on;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(on||(on={}));function nr(e,t,n){n===void 0&&(n="/");let a=typeof t=="string"?ke(t):t,r=Wt(a.pathname||"/",n);if(r==null)return null;let i=Un(e);ar(i);let o=null;for(let s=0;o==null&&s<i.length;++s)o=dr(i[s],hr(r));return o}function Un(e,t,n,a){t===void 0&&(t=[]),n===void 0&&(n=[]),a===void 0&&(a="");let r=(i,o,s)=>{let l={relativePath:s===void 0?i.path||"":s,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};l.relativePath.startsWith("/")&&(F(l.relativePath.startsWith(a),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+a+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(a.length));let c=le([a,l.relativePath]),f=n.concat(l);i.children&&i.children.length>0&&(F(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Un(i.children,t,f,c)),!(i.path==null&&!i.index)&&t.push({path:c,score:fr(c,i.index),routesMeta:f})};return e.forEach((i,o)=>{var s;if(i.path===""||!((s=i.path)!=null&&s.includes("?")))r(i,o);else for(let l of Wn(i.path))r(i,o,l)}),t}function Wn(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,r=n.endsWith("?"),i=n.replace(/\?$/,"");if(a.length===0)return r?[i,""]:[i];let o=Wn(a.join("/")),s=[];return s.push(...o.map(l=>l===""?i:[i,l].join("/"))),r&&s.push(...o),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function ar(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ur(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}const rr=/^:\w+$/,ir=3,or=2,sr=1,lr=10,cr=-2,sn=e=>e==="*";function fr(e,t){let n=e.split("/"),a=n.length;return n.some(sn)&&(a+=cr),t&&(a+=or),n.filter(r=>!sn(r)).reduce((r,i)=>r+(rr.test(i)?ir:i===""?sr:lr),a)}function ur(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function dr(e,t){let{routesMeta:n}=e,a={},r="/",i=[];for(let o=0;o<n.length;++o){let s=n[o],l=o===n.length-1,c=r==="/"?t:t.slice(r.length)||"/",f=mr({path:s.relativePath,caseSensitive:s.caseSensitive,end:l},c);if(!f)return null;Object.assign(a,f.params);let d=s.route;i.push({params:a,pathname:le([r,f.pathname]),pathnameBase:yr(le([r,f.pathnameBase])),route:d}),f.pathnameBase!=="/"&&(r=le([r,f.pathnameBase]))}return i}function mr(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=pr(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let i=r[0],o=i.replace(/(.)\/+$/,"$1"),s=r.slice(1);return{params:a.reduce((c,f,d)=>{if(f==="*"){let m=s[d]||"";o=i.slice(0,i.length-m.length).replace(/(.)\/+$/,"$1")}return c[f]=vr(s[d]||"",f),c},{}),pathname:i,pathnameBase:o,pattern:e}}function pr(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Ut(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/\/:(\w+)/g,(o,s)=>(a.push(s),"/([^\\/]+)"));return e.endsWith("*")?(a.push("*"),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function hr(e){try{return decodeURI(e)}catch(t){return Ut(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function vr(e,t){try{return decodeURIComponent(e)}catch(n){return Ut(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+n+").")),e}}function Wt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}function gr(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?ke(e):e;return{pathname:n?n.startsWith("/")?n:br(n,t):t,search:xr(a),hash:wr(r)}}function br(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function pt(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Yn(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Bn(e,t,n,a){a===void 0&&(a=!1);let r;typeof e=="string"?r=ke(e):(r=Oe({},e),F(!r.pathname||!r.pathname.includes("?"),pt("?","pathname","search",r)),F(!r.pathname||!r.pathname.includes("#"),pt("#","pathname","hash",r)),F(!r.search||!r.search.includes("#"),pt("#","search","hash",r)));let i=e===""||r.pathname==="",o=i?"/":r.pathname,s;if(a||o==null)s=n;else{let d=t.length-1;if(o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),d-=1;r.pathname=m.join("/")}s=d>=0?t[d]:"/"}let l=gr(r,s),c=o&&o!=="/"&&o.endsWith("/"),f=(i||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||f)&&(l.pathname+="/"),l}const le=e=>e.join("/").replace(/\/\/+/g,"/"),yr=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),xr=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,wr=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function kr(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Hn=["post","put","patch","delete"];new Set(Hn);const Nr=["get",...Hn];new Set(Nr);/**
 * React Router v6.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function nt(){return nt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},nt.apply(this,arguments)}const Xn=P.createContext(null),Pr=P.createContext(null),Ne=P.createContext(null),lt=P.createContext(null),ve=P.createContext({outlet:null,matches:[],isDataRoute:!1}),Vn=P.createContext(null);function Cr(e,t){let{relative:n}=t===void 0?{}:t;Le()||F(!1);let{basename:a,navigator:r}=P.useContext(Ne),{hash:i,pathname:o,search:s}=qn(e,{relative:n}),l=o;return a!=="/"&&(l=o==="/"?a:le([a,o])),r.createHref({pathname:l,search:s,hash:i})}function Le(){return P.useContext(lt)!=null}function ct(){return Le()||F(!1),P.useContext(lt).location}function Gn(e){P.useContext(Ne).static||P.useLayoutEffect(e)}function Er(){let{isDataRoute:e}=P.useContext(ve);return e?zr():Sr()}function Sr(){Le()||F(!1);let{basename:e,navigator:t}=P.useContext(Ne),{matches:n}=P.useContext(ve),{pathname:a}=ct(),r=JSON.stringify(Yn(n).map(s=>s.pathnameBase)),i=P.useRef(!1);return Gn(()=>{i.current=!0}),P.useCallback(function(s,l){if(l===void 0&&(l={}),!i.current)return;if(typeof s=="number"){t.go(s);return}let c=Bn(s,JSON.parse(r),a,l.relative==="path");e!=="/"&&(c.pathname=c.pathname==="/"?e:le([e,c.pathname])),(l.replace?t.replace:t.push)(c,l.state,l)},[e,t,r,a])}function qn(e,t){let{relative:n}=t===void 0?{}:t,{matches:a}=P.useContext(ve),{pathname:r}=ct(),i=JSON.stringify(Yn(a).map(o=>o.pathnameBase));return P.useMemo(()=>Bn(e,JSON.parse(i),r,n==="path"),[e,i,r,n])}function jr(e,t){return Or(e,t)}function Or(e,t,n){Le()||F(!1);let{navigator:a}=P.useContext(Ne),{matches:r}=P.useContext(ve),i=r[r.length-1],o=i?i.params:{};i&&i.pathname;let s=i?i.pathnameBase:"/";i&&i.route;let l=ct(),c;if(t){var f;let g=typeof t=="string"?ke(t):t;s==="/"||(f=g.pathname)!=null&&f.startsWith(s)||F(!1),c=g}else c=l;let d=c.pathname||"/",m=s==="/"?d:d.slice(s.length)||"/",h=nr(e,{pathname:m}),v=$r(h&&h.map(g=>Object.assign({},g,{params:Object.assign({},o,g.params),pathname:le([s,a.encodeLocation?a.encodeLocation(g.pathname).pathname:g.pathname]),pathnameBase:g.pathnameBase==="/"?s:le([s,a.encodeLocation?a.encodeLocation(g.pathnameBase).pathname:g.pathnameBase])})),r,n);return t&&v?P.createElement(lt.Provider,{value:{location:nt({pathname:"/",search:"",hash:"",state:null,key:"default"},c),navigationType:oe.Pop}},v):v}function Ar(){let e=Fr(),t=kr(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},i=null;return P.createElement(P.Fragment,null,P.createElement("h2",null,"Unexpected Application Error!"),P.createElement("h3",{style:{fontStyle:"italic"}},t),n?P.createElement("pre",{style:r},n):null,i)}const Rr=P.createElement(Ar,null);class Ir extends P.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error||n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error?P.createElement(ve.Provider,{value:this.props.routeContext},P.createElement(Vn.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Tr(e){let{routeContext:t,match:n,children:a}=e,r=P.useContext(Xn);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),P.createElement(ve.Provider,{value:t},a)}function $r(e,t,n){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),e==null){var r;if((r=n)!=null&&r.errors)e=n.matches;else return null}let i=e,o=(a=n)==null?void 0:a.errors;if(o!=null){let s=i.findIndex(l=>l.route.id&&(o==null?void 0:o[l.route.id]));s>=0||F(!1),i=i.slice(0,Math.min(i.length,s+1))}return i.reduceRight((s,l,c)=>{let f=l.route.id?o==null?void 0:o[l.route.id]:null,d=null;n&&(d=l.route.errorElement||Rr);let m=t.concat(i.slice(0,c+1)),h=()=>{let v;return f?v=d:l.route.Component?v=P.createElement(l.route.Component,null):l.route.element?v=l.route.element:v=s,P.createElement(Tr,{match:l,routeContext:{outlet:s,matches:m,isDataRoute:n!=null},children:v})};return n&&(l.route.ErrorBoundary||l.route.errorElement||c===0)?P.createElement(Ir,{location:n.location,revalidation:n.revalidation,component:d,error:f,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):h()},null)}var kt;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate"})(kt||(kt={}));var Ae;(function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId"})(Ae||(Ae={}));function _r(e){let t=P.useContext(Xn);return t||F(!1),t}function Lr(e){let t=P.useContext(Pr);return t||F(!1),t}function Mr(e){let t=P.useContext(ve);return t||F(!1),t}function Kn(e){let t=Mr(),n=t.matches[t.matches.length-1];return n.route.id||F(!1),n.route.id}function Fr(){var e;let t=P.useContext(Vn),n=Lr(Ae.UseRouteError),a=Kn(Ae.UseRouteError);return t||((e=n.errors)==null?void 0:e[a])}function zr(){let{router:e}=_r(kt.UseNavigateStable),t=Kn(Ae.UseNavigateStable),n=P.useRef(!1);return Gn(()=>{n.current=!0}),P.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r=="number"?e.navigate(r):e.navigate(r,nt({fromRouteId:t},i)))},[e,t])}function Nt(e){F(!1)}function Dr(e){let{basename:t="/",children:n=null,location:a,navigationType:r=oe.Pop,navigator:i,static:o=!1}=e;Le()&&F(!1);let s=t.replace(/^\/*/,"/"),l=P.useMemo(()=>({basename:s,navigator:i,static:o}),[s,i,o]);typeof a=="string"&&(a=ke(a));let{pathname:c="/",search:f="",hash:d="",state:m=null,key:h="default"}=a,v=P.useMemo(()=>{let g=Wt(c,s);return g==null?null:{location:{pathname:g,search:f,hash:d,state:m,key:h},navigationType:r}},[s,c,f,d,m,h,r]);return v==null?null:P.createElement(Ne.Provider,{value:l},P.createElement(lt.Provider,{children:n,value:v}))}function Ur(e){let{children:t,location:n}=e;return jr(Pt(t),n)}var ln;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(ln||(ln={}));new Promise(()=>{});function Pt(e,t){t===void 0&&(t=[]);let n=[];return P.Children.forEach(e,(a,r)=>{if(!P.isValidElement(a))return;let i=[...t,r];if(a.type===P.Fragment){n.push.apply(n,Pt(a.props.children,i));return}a.type!==Nt&&F(!1),!a.props.index||!a.props.children||F(!1);let o={id:a.props.id||i.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(o.children=Pt(a.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ct(){return Ct=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},Ct.apply(this,arguments)}function Wr(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function Yr(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Br(e,t){return e.button===0&&(!t||t==="_self")&&!Yr(e)}const Hr=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"];function Xr(e){let{basename:t,children:n,window:a}=e,r=P.useRef();r.current==null&&(r.current=Za({window:a,v5Compat:!0}));let i=r.current,[o,s]=P.useState({action:i.action,location:i.location});return P.useLayoutEffect(()=>i.listen(s),[i]),P.createElement(Dr,{basename:t,children:n,location:o.location,navigationType:o.action,navigator:i})}const Vr=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Gr=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,qr=P.forwardRef(function(t,n){let{onClick:a,relative:r,reloadDocument:i,replace:o,state:s,target:l,to:c,preventScrollReset:f}=t,d=Wr(t,Hr),{basename:m}=P.useContext(Ne),h,v=!1;if(typeof c=="string"&&Gr.test(c)&&(h=c,Vr))try{let b=new URL(window.location.href),C=c.startsWith("//")?new URL(b.protocol+c):new URL(c),E=Wt(C.pathname,m);C.origin===b.origin&&E!=null?c=E+C.search+C.hash:v=!0}catch{}let g=Cr(c,{relative:r}),p=Kr(c,{replace:o,state:s,target:l,preventScrollReset:f,relative:r});function N(b){a&&a(b),b.defaultPrevented||p(b)}return P.createElement("a",Ct({},d,{href:h||g,onClick:v||i?a:N,ref:n,target:l}))});var cn;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(cn||(cn={}));var fn;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(fn||(fn={}));function Kr(e,t){let{target:n,replace:a,state:r,preventScrollReset:i,relative:o}=t===void 0?{}:t,s=Er(),l=ct(),c=qn(e,{relative:o});return P.useCallback(f=>{if(Br(f,n)){f.preventDefault();let d=a!==void 0?a:tt(l)===tt(c);s(e,{replace:d,state:r,preventScrollReset:i,relative:o})}},[l,s,c,a,r,n,e,i,o])}function un(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?un(Object(n),!0).forEach(function(a){z(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):un(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function at(e){return at=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},at(e)}function Jr(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function dn(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function Qr(e,t,n){return t&&dn(e.prototype,t),n&&dn(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yt(e,t){return ei(e)||ni(e,t)||Jn(e,t)||ri()}function Me(e){return Zr(e)||ti(e)||Jn(e)||ai()}function Zr(e){if(Array.isArray(e))return Et(e)}function ei(e){if(Array.isArray(e))return e}function ti(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ni(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var a=[],r=!0,i=!1,o,s;try{for(n=n.call(e);!(r=(o=n.next()).done)&&(a.push(o.value),!(t&&a.length===t));r=!0);}catch(l){i=!0,s=l}finally{try{!r&&n.return!=null&&n.return()}finally{if(i)throw s}}return a}}function Jn(e,t){if(e){if(typeof e=="string")return Et(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Et(e,t)}}function Et(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function ai(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ri(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var mn=function(){},Bt={},Qn={},Zn=null,ea={mark:mn,measure:mn};try{typeof window<"u"&&(Bt=window),typeof document<"u"&&(Qn=document),typeof MutationObserver<"u"&&(Zn=MutationObserver),typeof performance<"u"&&(ea=performance)}catch{}var ii=Bt.navigator||{},pn=ii.userAgent,hn=pn===void 0?"":pn,ce=Bt,I=Qn,vn=Zn,Ue=ea;ce.document;var ne=!!I.documentElement&&!!I.head&&typeof I.addEventListener=="function"&&typeof I.createElement=="function",ta=~hn.indexOf("MSIE")||~hn.indexOf("Trident/"),We,Ye,Be,He,Xe,Z="___FONT_AWESOME___",St=16,na="fa",aa="svg-inline--fa",pe="data-fa-i2svg",jt="data-fa-pseudo-element",oi="data-fa-pseudo-element-pending",Ht="data-prefix",Xt="data-icon",gn="fontawesome-i2svg",si="async",li=["HTML","HEAD","STYLE","SCRIPT"],ra=function(){try{return!0}catch{return!1}}(),R="classic",L="sharp",Vt=[R,L];function Fe(e){return new Proxy(e,{get:function(n,a){return a in n?n[a]:n[R]}})}var Re=Fe((We={},z(We,R,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),z(We,L,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light"}),We)),Ie=Fe((Ye={},z(Ye,R,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),z(Ye,L,{solid:"fass",regular:"fasr",light:"fasl"}),Ye)),Te=Fe((Be={},z(Be,R,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),z(Be,L,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light"}),Be)),ci=Fe((He={},z(He,R,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),z(He,L,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl"}),He)),fi=/fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,ia="fa-layers-text",ui=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,di=Fe((Xe={},z(Xe,R,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),z(Xe,L,{900:"fass",400:"fasr",300:"fasl"}),Xe)),oa=[1,2,3,4,5,6,7,8,9,10],mi=oa.concat([11,12,13,14,15,16,17,18,19,20]),pi=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],de={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},$e=new Set;Object.keys(Ie[R]).map($e.add.bind($e));Object.keys(Ie[L]).map($e.add.bind($e));var hi=[].concat(Vt,Me($e),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",de.GROUP,de.SWAP_OPACITY,de.PRIMARY,de.SECONDARY]).concat(oa.map(function(e){return"".concat(e,"x")})).concat(mi.map(function(e){return"w-".concat(e)})),Se=ce.FontAwesomeConfig||{};function vi(e){var t=I.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function gi(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(I&&typeof I.querySelector=="function"){var bi=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];bi.forEach(function(e){var t=Yt(e,2),n=t[0],a=t[1],r=gi(vi(n));r!=null&&(Se[a]=r)})}var sa={styleDefault:"solid",familyDefault:"classic",cssPrefix:na,replacementClass:aa,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};Se.familyPrefix&&(Se.cssPrefix=Se.familyPrefix);var we=y(y({},sa),Se);we.autoReplaceSvg||(we.observeMutations=!1);var w={};Object.keys(sa).forEach(function(e){Object.defineProperty(w,e,{enumerable:!0,set:function(n){we[e]=n,je.forEach(function(a){return a(w)})},get:function(){return we[e]}})});Object.defineProperty(w,"familyPrefix",{enumerable:!0,set:function(t){we.cssPrefix=t,je.forEach(function(n){return n(w)})},get:function(){return we.cssPrefix}});ce.FontAwesomeConfig=w;var je=[];function yi(e){return je.push(e),function(){je.splice(je.indexOf(e),1)}}var ie=St,J={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function xi(e){if(!(!e||!ne)){var t=I.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=I.head.childNodes,a=null,r=n.length-1;r>-1;r--){var i=n[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return I.head.insertBefore(t,a),e}}var wi="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function _e(){for(var e=12,t="";e-- >0;)t+=wi[Math.random()*62|0];return t}function Pe(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Gt(e){return e.classList?Pe(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function la(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ki(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(la(e[n]),'" ')},"").trim()}function ft(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function qt(e){return e.size!==J.size||e.x!==J.x||e.y!==J.y||e.rotate!==J.rotate||e.flipX||e.flipY}function Ni(e){var t=e.transform,n=e.containerWidth,a=e.iconWidth,r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function Pi(e){var t=e.transform,n=e.width,a=n===void 0?St:n,r=e.height,i=r===void 0?St:r,o=e.startCentered,s=o===void 0?!1:o,l="";return s&&ta?l+="translate(".concat(t.x/ie-a/2,"em, ").concat(t.y/ie-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(t.x/ie,"em), calc(-50% + ").concat(t.y/ie,"em)) "):l+="translate(".concat(t.x/ie,"em, ").concat(t.y/ie,"em) "),l+="scale(".concat(t.size/ie*(t.flipX?-1:1),", ").concat(t.size/ie*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var Ci=`:root, :host {
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
}`;function ca(){var e=na,t=aa,n=w.cssPrefix,a=w.replacementClass,r=Ci;if(n!==e||a!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(a))}return r}var bn=!1;function ht(){w.autoAddCss&&!bn&&(xi(ca()),bn=!0)}var Ei={mixout:function(){return{dom:{css:ca,insertCss:ht}}},hooks:function(){return{beforeDOMElementCreation:function(){ht()},beforeI2svg:function(){ht()}}}},ee=ce||{};ee[Z]||(ee[Z]={});ee[Z].styles||(ee[Z].styles={});ee[Z].hooks||(ee[Z].hooks={});ee[Z].shims||(ee[Z].shims=[]);var q=ee[Z],fa=[],Si=function e(){I.removeEventListener("DOMContentLoaded",e),rt=1,fa.map(function(t){return t()})},rt=!1;ne&&(rt=(I.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(I.readyState),rt||I.addEventListener("DOMContentLoaded",Si));function ji(e){ne&&(rt?setTimeout(e,0):fa.push(e))}function ze(e){var t=e.tag,n=e.attributes,a=n===void 0?{}:n,r=e.children,i=r===void 0?[]:r;return typeof e=="string"?la(e):"<".concat(t," ").concat(ki(a),">").concat(i.map(ze).join(""),"</").concat(t,">")}function yn(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Oi=function(t,n){return function(a,r,i,o){return t.call(n,a,r,i,o)}},vt=function(t,n,a,r){var i=Object.keys(t),o=i.length,s=r!==void 0?Oi(n,r):n,l,c,f;for(a===void 0?(l=1,f=t[i[0]]):(l=0,f=a);l<o;l++)c=i[l],f=s(f,t[c],c,t);return f};function Ai(e){for(var t=[],n=0,a=e.length;n<a;){var r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){var i=e.charCodeAt(n++);(i&64512)==56320?t.push(((r&1023)<<10)+(i&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function Ot(e){var t=Ai(e);return t.length===1?t[0].toString(16):null}function Ri(e,t){var n=e.length,a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function xn(e){return Object.keys(e).reduce(function(t,n){var a=e[n],r=!!a.icon;return r?t[a.iconName]=a.icon:t[n]=a,t},{})}function At(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=n.skipHooks,r=a===void 0?!1:a,i=xn(t);typeof q.hooks.addPack=="function"&&!r?q.hooks.addPack(e,xn(t)):q.styles[e]=y(y({},q.styles[e]||{}),i),e==="fas"&&At("fa",t)}var Ve,Ge,qe,ge=q.styles,Ii=q.shims,Ti=(Ve={},z(Ve,R,Object.values(Te[R])),z(Ve,L,Object.values(Te[L])),Ve),Kt=null,ua={},da={},ma={},pa={},ha={},$i=(Ge={},z(Ge,R,Object.keys(Re[R])),z(Ge,L,Object.keys(Re[L])),Ge);function _i(e){return~hi.indexOf(e)}function Li(e,t){var n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!_i(r)?r:null}var va=function(){var t=function(i){return vt(ge,function(o,s,l){return o[l]=vt(s,i,{}),o},{})};ua=t(function(r,i,o){if(i[3]&&(r[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){r[l.toString(16)]=o})}return r}),da=t(function(r,i,o){if(r[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){r[l]=o})}return r}),ha=t(function(r,i,o){var s=i[2];return r[o]=o,s.forEach(function(l){r[l]=o}),r});var n="far"in ge||w.autoFetchSvg,a=vt(Ii,function(r,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(r.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});ma=a.names,pa=a.unicodes,Kt=ut(w.styleDefault,{family:w.familyDefault})};yi(function(e){Kt=ut(e.styleDefault,{family:w.familyDefault})});va();function Jt(e,t){return(ua[e]||{})[t]}function Mi(e,t){return(da[e]||{})[t]}function me(e,t){return(ha[e]||{})[t]}function ga(e){return ma[e]||{prefix:null,iconName:null}}function Fi(e){var t=pa[e],n=Jt("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function fe(){return Kt}var Qt=function(){return{prefix:null,iconName:null,rest:[]}};function ut(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,a=n===void 0?R:n,r=Re[a][e],i=Ie[a][e]||Ie[a][r],o=e in q.styles?e:null;return i||o||null}var wn=(qe={},z(qe,R,Object.keys(Te[R])),z(qe,L,Object.keys(Te[L])),qe);function dt(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.skipLookups,r=a===void 0?!1:a,i=(t={},z(t,R,"".concat(w.cssPrefix,"-").concat(R)),z(t,L,"".concat(w.cssPrefix,"-").concat(L)),t),o=null,s=R;(e.includes(i[R])||e.some(function(c){return wn[R].includes(c)}))&&(s=R),(e.includes(i[L])||e.some(function(c){return wn[L].includes(c)}))&&(s=L);var l=e.reduce(function(c,f){var d=Li(w.cssPrefix,f);if(ge[f]?(f=Ti[s].includes(f)?ci[s][f]:f,o=f,c.prefix=f):$i[s].indexOf(f)>-1?(o=f,c.prefix=ut(f,{family:s})):d?c.iconName=d:f!==w.replacementClass&&f!==i[R]&&f!==i[L]&&c.rest.push(f),!r&&c.prefix&&c.iconName){var m=o==="fa"?ga(c.iconName):{},h=me(c.prefix,c.iconName);m.prefix&&(o=null),c.iconName=m.iconName||h||c.iconName,c.prefix=m.prefix||c.prefix,c.prefix==="far"&&!ge.far&&ge.fas&&!w.autoFetchSvg&&(c.prefix="fas")}return c},Qt());return(e.includes("fa-brands")||e.includes("fab"))&&(l.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(l.prefix="fad"),!l.prefix&&s===L&&(ge.fass||w.autoFetchSvg)&&(l.prefix="fass",l.iconName=me(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||o==="fa")&&(l.prefix=fe()||"fas"),l}var zi=function(){function e(){Jr(this,e),this.definitions={}}return Qr(e,[{key:"add",value:function(){for(var n=this,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=r.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=y(y({},n.definitions[s]||{}),o[s]),At(s,o[s]);var l=Te[R][s];l&&At(l,o[s]),va()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(i){var o=r[i],s=o.prefix,l=o.iconName,c=o.icon,f=c[2];n[s]||(n[s]={}),f.length>0&&f.forEach(function(d){typeof d=="string"&&(n[s][d]=c)}),n[s][l]=c}),n}}]),e}(),kn=[],be={},xe={},Di=Object.keys(xe);function Ui(e,t){var n=t.mixoutsTo;return kn=e,be={},Object.keys(xe).forEach(function(a){Di.indexOf(a)===-1&&delete xe[a]}),kn.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(o){typeof r[o]=="function"&&(n[o]=r[o]),at(r[o])==="object"&&Object.keys(r[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=r[o][s]})}),a.hooks){var i=a.hooks();Object.keys(i).forEach(function(o){be[o]||(be[o]=[]),be[o].push(i[o])})}a.provides&&a.provides(xe)}),n}function Rt(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];var i=be[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(a))}),t}function he(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var r=be[e]||[];r.forEach(function(i){i.apply(null,n)})}function te(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return xe[e]?xe[e].apply(null,t):void 0}function It(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||fe();if(t)return t=me(n,t)||t,yn(ba.definitions,n,t)||yn(q.styles,n,t)}var ba=new zi,Wi=function(){w.autoReplaceSvg=!1,w.observeMutations=!1,he("noAuto")},Yi={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return ne?(he("beforeI2svg",t),te("pseudoElements2svg",t),te("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;w.autoReplaceSvg===!1&&(w.autoReplaceSvg=!0),w.observeMutations=!0,ji(function(){Hi({autoReplaceSvgRoot:n}),he("watch",t)})}},Bi={icon:function(t){if(t===null)return null;if(at(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:me(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],a=ut(t[0]);return{prefix:a,iconName:me(a,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(w.cssPrefix,"-"))>-1||t.match(fi))){var r=dt(t.split(" "),{skipLookups:!0});return{prefix:r.prefix||fe(),iconName:me(r.prefix,r.iconName)||r.iconName}}if(typeof t=="string"){var i=fe();return{prefix:i,iconName:me(i,t)||t}}}},H={noAuto:Wi,config:w,dom:Yi,parse:Bi,library:ba,findIconDefinition:It,toHtml:ze},Hi=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,a=n===void 0?I:n;(Object.keys(q.styles).length>0||w.autoFetchSvg)&&ne&&w.autoReplaceSvg&&H.dom.i2svg({node:a})};function mt(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(a){return ze(a)})}}),Object.defineProperty(e,"node",{get:function(){if(ne){var a=I.createElement("div");return a.innerHTML=e.html,a.children}}}),e}function Xi(e){var t=e.children,n=e.main,a=e.mask,r=e.attributes,i=e.styles,o=e.transform;if(qt(o)&&n.found&&!a.found){var s=n.width,l=n.height,c={x:s/l/2,y:.5};r.style=ft(y(y({},i),{},{"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:t}]}function Vi(e){var t=e.prefix,n=e.iconName,a=e.children,r=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(w.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:y(y({},r),{},{id:o}),children:a}]}]}function Zt(e){var t=e.icons,n=t.main,a=t.mask,r=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.title,c=e.maskId,f=e.titleId,d=e.extra,m=e.watchable,h=m===void 0?!1:m,v=a.found?a:n,g=v.width,p=v.height,N=r==="fak",b=[w.replacementClass,i?"".concat(w.cssPrefix,"-").concat(i):""].filter(function(X){return d.classes.indexOf(X)===-1}).filter(function(X){return X!==""||!!X}).concat(d.classes).join(" "),C={children:[],attributes:y(y({},d.attributes),{},{"data-prefix":r,"data-icon":i,class:b,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(g," ").concat(p)})},E=N&&!~d.classes.indexOf("fa-fw")?{width:"".concat(g/p*16*.0625,"em")}:{};h&&(C.attributes[pe]=""),l&&(C.children.push({tag:"title",attributes:{id:C.attributes["aria-labelledby"]||"title-".concat(f||_e())},children:[l]}),delete C.attributes.title);var A=y(y({},C),{},{prefix:r,iconName:i,main:n,mask:a,maskId:c,transform:o,symbol:s,styles:y(y({},E),d.styles)}),W=a.found&&n.found?te("generateAbstractMask",A)||{children:[],attributes:{}}:te("generateAbstractIcon",A)||{children:[],attributes:{}},T=W.children,Q=W.attributes;return A.children=T,A.attributes=Q,s?Vi(A):Xi(A)}function Nn(e){var t=e.content,n=e.width,a=e.height,r=e.transform,i=e.title,o=e.extra,s=e.watchable,l=s===void 0?!1:s,c=y(y(y({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});l&&(c[pe]="");var f=y({},o.styles);qt(r)&&(f.transform=Pi({transform:r,startCentered:!0,width:n,height:a}),f["-webkit-transform"]=f.transform);var d=ft(f);d.length>0&&(c.style=d);var m=[];return m.push({tag:"span",attributes:c,children:[t]}),i&&m.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),m}function Gi(e){var t=e.content,n=e.title,a=e.extra,r=y(y(y({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),i=ft(a.styles);i.length>0&&(r.style=i);var o=[];return o.push({tag:"span",attributes:r,children:[t]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var gt=q.styles;function Tt(e){var t=e[0],n=e[1],a=e.slice(4),r=Yt(a,1),i=r[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(w.cssPrefix,"-").concat(de.GROUP)},children:[{tag:"path",attributes:{class:"".concat(w.cssPrefix,"-").concat(de.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(w.cssPrefix,"-").concat(de.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:n,icon:o}}var qi={found:!1,width:512,height:512};function Ki(e,t){!ra&&!w.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function $t(e,t){var n=t;return t==="fa"&&w.styleDefault!==null&&(t=fe()),new Promise(function(a,r){if(te("missingIconAbstract"),n==="fa"){var i=ga(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&gt[t]&&gt[t][e]){var o=gt[t][e];return a(Tt(o))}Ki(e,t),a(y(y({},qi),{},{icon:w.showMissingIcons&&e?te("missingIconAbstract")||{}:{}}))})}var Pn=function(){},_t=w.measurePerformance&&Ue&&Ue.mark&&Ue.measure?Ue:{mark:Pn,measure:Pn},Ce='FA "6.4.0"',Ji=function(t){return _t.mark("".concat(Ce," ").concat(t," begins")),function(){return ya(t)}},ya=function(t){_t.mark("".concat(Ce," ").concat(t," ends")),_t.measure("".concat(Ce," ").concat(t),"".concat(Ce," ").concat(t," begins"),"".concat(Ce," ").concat(t," ends"))},en={begin:Ji,end:ya},Je=function(){};function Cn(e){var t=e.getAttribute?e.getAttribute(pe):null;return typeof t=="string"}function Qi(e){var t=e.getAttribute?e.getAttribute(Ht):null,n=e.getAttribute?e.getAttribute(Xt):null;return t&&n}function Zi(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(w.replacementClass)}function eo(){if(w.autoReplaceSvg===!0)return Qe.replace;var e=Qe[w.autoReplaceSvg];return e||Qe.replace}function to(e){return I.createElementNS("http://www.w3.org/2000/svg",e)}function no(e){return I.createElement(e)}function xa(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,a=n===void 0?e.tag==="svg"?to:no:n;if(typeof e=="string")return I.createTextNode(e);var r=a(e.tag);Object.keys(e.attributes||[]).forEach(function(o){r.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){r.appendChild(xa(o,{ceFn:a}))}),r}function ao(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Qe={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(r){n.parentNode.insertBefore(xa(r),n)}),n.getAttribute(pe)===null&&w.keepOriginalSource){var a=I.createComment(ao(n));n.parentNode.replaceChild(a,n)}else n.remove()},nest:function(t){var n=t[0],a=t[1];if(~Gt(n).indexOf(w.replacementClass))return Qe.replace(t);var r=new RegExp("".concat(w.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var i=a[0].attributes.class.split(" ").reduce(function(s,l){return l===w.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});a[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=a.map(function(s){return ze(s)}).join(`
`);n.setAttribute(pe,""),n.innerHTML=o}};function En(e){e()}function wa(e,t){var n=typeof t=="function"?t:Je;if(e.length===0)n();else{var a=En;w.mutateApproach===si&&(a=ce.requestAnimationFrame||En),a(function(){var r=eo(),i=en.begin("mutate");e.map(r),i(),n()})}}var tn=!1;function ka(){tn=!0}function Lt(){tn=!1}var it=null;function Sn(e){if(vn&&w.observeMutations){var t=e.treeCallback,n=t===void 0?Je:t,a=e.nodeCallback,r=a===void 0?Je:a,i=e.pseudoElementsCallback,o=i===void 0?Je:i,s=e.observeMutationsRoot,l=s===void 0?I:s;it=new vn(function(c){if(!tn){var f=fe();Pe(c).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!Cn(d.addedNodes[0])&&(w.searchPseudoElements&&o(d.target),n(d.target)),d.type==="attributes"&&d.target.parentNode&&w.searchPseudoElements&&o(d.target.parentNode),d.type==="attributes"&&Cn(d.target)&&~pi.indexOf(d.attributeName))if(d.attributeName==="class"&&Qi(d.target)){var m=dt(Gt(d.target)),h=m.prefix,v=m.iconName;d.target.setAttribute(Ht,h||f),v&&d.target.setAttribute(Xt,v)}else Zi(d.target)&&r(d.target)})}}),ne&&it.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ro(){it&&it.disconnect()}function io(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(a,r){var i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),n}function oo(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"",r=dt(Gt(e));return r.prefix||(r.prefix=fe()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Mi(r.prefix,e.innerText)||Jt(r.prefix,Ot(e.innerText))),!r.iconName&&w.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function so(e){var t=Pe(e.attributes).reduce(function(r,i){return r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r},{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return w.autoA11y&&(n?t["aria-labelledby"]="".concat(w.replacementClass,"-title-").concat(a||_e()):(t["aria-hidden"]="true",t.focusable="false")),t}function lo(){return{iconName:null,title:null,titleId:null,prefix:null,transform:J,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function jn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=oo(e),a=n.iconName,r=n.prefix,i=n.rest,o=so(e),s=Rt("parseNodeAttributes",{},e),l=t.styleParser?io(e):[];return y({iconName:a,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:r,transform:J,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var co=q.styles;function Na(e){var t=w.autoReplaceSvg==="nest"?jn(e,{styleParser:!1}):jn(e);return~t.extra.classes.indexOf(ia)?te("generateLayersText",e,t):te("generateSvgReplacementMutation",e,t)}var ue=new Set;Vt.map(function(e){ue.add("fa-".concat(e))});Object.keys(Re[R]).map(ue.add.bind(ue));Object.keys(Re[L]).map(ue.add.bind(ue));ue=Me(ue);function On(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!ne)return Promise.resolve();var n=I.documentElement.classList,a=function(d){return n.add("".concat(gn,"-").concat(d))},r=function(d){return n.remove("".concat(gn,"-").concat(d))},i=w.autoFetchSvg?ue:Vt.map(function(f){return"fa-".concat(f)}).concat(Object.keys(co));i.includes("fa")||i.push("fa");var o=[".".concat(ia,":not([").concat(pe,"])")].concat(i.map(function(f){return".".concat(f,":not([").concat(pe,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Pe(e.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var l=en.begin("onTree"),c=s.reduce(function(f,d){try{var m=Na(d);m&&f.push(m)}catch(h){ra||h.name==="MissingIcon"&&console.error(h)}return f},[]);return new Promise(function(f,d){Promise.all(c).then(function(m){wa(m,function(){a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),l(),f()})}).catch(function(m){l(),d(m)})})}function fo(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Na(e).then(function(n){n&&wa([n],t)})}function uo(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(t||{}).icon?t:It(t||{}),r=n.mask;return r&&(r=(r||{}).icon?r:It(r||{})),e(a,y(y({},n),{},{mask:r}))}}var mo=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.transform,r=a===void 0?J:a,i=n.symbol,o=i===void 0?!1:i,s=n.mask,l=s===void 0?null:s,c=n.maskId,f=c===void 0?null:c,d=n.title,m=d===void 0?null:d,h=n.titleId,v=h===void 0?null:h,g=n.classes,p=g===void 0?[]:g,N=n.attributes,b=N===void 0?{}:N,C=n.styles,E=C===void 0?{}:C;if(t){var A=t.prefix,W=t.iconName,T=t.icon;return mt(y({type:"icon"},t),function(){return he("beforeDOMElementCreation",{iconDefinition:t,params:n}),w.autoA11y&&(m?b["aria-labelledby"]="".concat(w.replacementClass,"-title-").concat(v||_e()):(b["aria-hidden"]="true",b.focusable="false")),Zt({icons:{main:Tt(T),mask:l?Tt(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:A,iconName:W,transform:y(y({},J),r),symbol:o,title:m,maskId:f,titleId:v,extra:{attributes:b,styles:E,classes:p}})})}},po={mixout:function(){return{icon:uo(mo)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=On,n.nodeCallback=fo,n}}},provides:function(t){t.i2svg=function(n){var a=n.node,r=a===void 0?I:a,i=n.callback,o=i===void 0?function(){}:i;return On(r,o)},t.generateSvgReplacementMutation=function(n,a){var r=a.iconName,i=a.title,o=a.titleId,s=a.prefix,l=a.transform,c=a.symbol,f=a.mask,d=a.maskId,m=a.extra;return new Promise(function(h,v){Promise.all([$t(r,s),f.iconName?$t(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(g){var p=Yt(g,2),N=p[0],b=p[1];h([n,Zt({icons:{main:N,mask:b},prefix:s,iconName:r,transform:l,symbol:c,maskId:d,title:i,titleId:o,extra:m,watchable:!0})])}).catch(v)})},t.generateAbstractIcon=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.transform,s=n.styles,l=ft(s);l.length>0&&(r.style=l);var c;return qt(o)&&(c=te("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),a.push(c||i.icon),{children:a,attributes:r}}}},ho={mixout:function(){return{layer:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,i=r===void 0?[]:r;return mt({type:"layer"},function(){he("beforeDOMElementCreation",{assembler:n,params:a});var o=[];return n(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(w.cssPrefix,"-layers")].concat(Me(i)).join(" ")},children:o}]})}}}},vo={mixout:function(){return{counter:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,i=r===void 0?null:r,o=a.classes,s=o===void 0?[]:o,l=a.attributes,c=l===void 0?{}:l,f=a.styles,d=f===void 0?{}:f;return mt({type:"counter",content:n},function(){return he("beforeDOMElementCreation",{content:n,params:a}),Gi({content:n.toString(),title:i,extra:{attributes:c,styles:d,classes:["".concat(w.cssPrefix,"-layers-counter")].concat(Me(s))}})})}}}},go={mixout:function(){return{text:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?J:r,o=a.title,s=o===void 0?null:o,l=a.classes,c=l===void 0?[]:l,f=a.attributes,d=f===void 0?{}:f,m=a.styles,h=m===void 0?{}:m;return mt({type:"text",content:n},function(){return he("beforeDOMElementCreation",{content:n,params:a}),Nn({content:n,transform:y(y({},J),i),title:s,extra:{attributes:d,styles:h,classes:["".concat(w.cssPrefix,"-layers-text")].concat(Me(c))}})})}}},provides:function(t){t.generateLayersText=function(n,a){var r=a.title,i=a.transform,o=a.extra,s=null,l=null;if(ta){var c=parseInt(getComputedStyle(n).fontSize,10),f=n.getBoundingClientRect();s=f.width/c,l=f.height/c}return w.autoA11y&&!r&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,Nn({content:n.innerHTML,width:s,height:l,transform:i,title:r,extra:o,watchable:!0})])}}},bo=new RegExp('"',"ug"),An=[1105920,1112319];function yo(e){var t=e.replace(bo,""),n=Ri(t,0),a=n>=An[0]&&n<=An[1],r=t.length===2?t[0]===t[1]:!1;return{value:Ot(r?t[0]:t),isSecondary:a||r}}function Rn(e,t){var n="".concat(oi).concat(t.replace(":","-"));return new Promise(function(a,r){if(e.getAttribute(n)!==null)return a();var i=Pe(e.children),o=i.filter(function(T){return T.getAttribute(jt)===t})[0],s=ce.getComputedStyle(e,t),l=s.getPropertyValue("font-family").match(ui),c=s.getPropertyValue("font-weight"),f=s.getPropertyValue("content");if(o&&!l)return e.removeChild(o),a();if(l&&f!=="none"&&f!==""){var d=s.getPropertyValue("content"),m=~["Sharp"].indexOf(l[2])?L:R,h=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?Ie[m][l[2].toLowerCase()]:di[m][c],v=yo(d),g=v.value,p=v.isSecondary,N=l[0].startsWith("FontAwesome"),b=Jt(h,g),C=b;if(N){var E=Fi(g);E.iconName&&E.prefix&&(b=E.iconName,h=E.prefix)}if(b&&!p&&(!o||o.getAttribute(Ht)!==h||o.getAttribute(Xt)!==C)){e.setAttribute(n,C),o&&e.removeChild(o);var A=lo(),W=A.extra;W.attributes[jt]=t,$t(b,h).then(function(T){var Q=Zt(y(y({},A),{},{icons:{main:T,mask:Qt()},prefix:h,iconName:C,extra:W,watchable:!0})),X=I.createElement("svg");t==="::before"?e.insertBefore(X,e.firstChild):e.appendChild(X),X.outerHTML=Q.map(function(O){return ze(O)}).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function xo(e){return Promise.all([Rn(e,"::before"),Rn(e,"::after")])}function wo(e){return e.parentNode!==document.head&&!~li.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(jt)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function In(e){if(ne)return new Promise(function(t,n){var a=Pe(e.querySelectorAll("*")).filter(wo).map(xo),r=en.begin("searchPseudoElements");ka(),Promise.all(a).then(function(){r(),Lt(),t()}).catch(function(){r(),Lt(),n()})})}var ko={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=In,n}}},provides:function(t){t.pseudoElements2svg=function(n){var a=n.node,r=a===void 0?I:a;w.searchPseudoElements&&In(r)}}},Tn=!1,No={mixout:function(){return{dom:{unwatch:function(){ka(),Tn=!0}}}},hooks:function(){return{bootstrap:function(){Sn(Rt("mutationObserverCallbacks",{}))},noAuto:function(){ro()},watch:function(n){var a=n.observeMutationsRoot;Tn?Lt():Sn(Rt("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},$n=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(a,r){var i=r.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return a.flipX=!0,a;if(o&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(o){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},n)},Po={mixout:function(){return{parse:{transform:function(n){return $n(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-transform");return r&&(n.transform=$n(r)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var a=n.main,r=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),c="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),f="rotate(".concat(r.rotate," 0 0)"),d={transform:"".concat(l," ").concat(c," ").concat(f)},m={transform:"translate(".concat(o/2*-1," -256)")},h={outer:s,inner:d,path:m};return{tag:"g",attributes:y({},h.outer),children:[{tag:"g",attributes:y({},h.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:y(y({},a.icon.attributes),h.path)}]}]}}}},bt={x:0,y:0,width:"100%",height:"100%"};function _n(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Co(e){return e.tag==="g"?e.children:[e]}var Eo={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-mask"),i=r?dt(r.split(" ").map(function(o){return o.trim()})):Qt();return i.prefix||(i.prefix=fe()),n.mask=i,n.maskId=a.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.mask,s=n.maskId,l=n.transform,c=i.width,f=i.icon,d=o.width,m=o.icon,h=Ni({transform:l,containerWidth:d,iconWidth:c}),v={tag:"rect",attributes:y(y({},bt),{},{fill:"white"})},g=f.children?{children:f.children.map(_n)}:{},p={tag:"g",attributes:y({},h.inner),children:[_n(y({tag:f.tag,attributes:y(y({},f.attributes),h.path)},g))]},N={tag:"g",attributes:y({},h.outer),children:[p]},b="mask-".concat(s||_e()),C="clip-".concat(s||_e()),E={tag:"mask",attributes:y(y({},bt),{},{id:b,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[v,N]},A={tag:"defs",children:[{tag:"clipPath",attributes:{id:C},children:Co(m)},E]};return a.push(A,{tag:"rect",attributes:y({fill:"currentColor","clip-path":"url(#".concat(C,")"),mask:"url(#".concat(b,")")},bt)}),{children:a,attributes:r}}}},So={provides:function(t){var n=!1;ce.matchMedia&&(n=ce.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:y(y({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=y(y({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:y(y({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:y(y({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:y(y({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:y(y({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:y(y({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||a.push({tag:"path",attributes:y(y({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:y(y({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},jo={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-symbol"),i=r===null?!1:r===""?!0:r;return n.symbol=i,n}}}},Oo=[Ei,po,ho,vo,go,ko,No,Po,Eo,So,jo];Ui(Oo,{mixoutsTo:H});H.noAuto;H.config;var Ao=H.library;H.dom;var Mt=H.parse;H.findIconDefinition;H.toHtml;var Ro=H.icon;H.layer;H.text;H.counter;var Io={prefix:"fas",iconName:"crow",icon:[640,512,[],"f520","M456 0c-48.6 0-88 39.4-88 88v29.2L12.5 390.6c-14 10.8-16.6 30.9-5.9 44.9s30.9 16.6 44.9 5.9L126.1 384H259.2l46.6 113.1c5 12.3 19.1 18.1 31.3 13.1s18.1-19.1 13.1-31.3L311.1 384H352c1.1 0 2.1 0 3.2 0l46.6 113.2c5 12.3 19.1 18.1 31.3 13.1s18.1-19.1 13.1-31.3l-42-102C484.9 354.1 544 280 544 192V128v-8l80.5-20.1c8.6-2.1 13.8-10.8 11.6-19.4C629 52 603.4 32 574 32H523.9C507.7 12.5 483.3 0 456 0zm0 64a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"]},Pa={exports:{}},To="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",$o=To,_o=$o;function Ca(){}function Ea(){}Ea.resetWarningCache=Ca;var Lo=function(){function e(a,r,i,o,s,l){if(l!==_o){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:Ea,resetWarningCache:Ca};return n.PropTypes=n,n};Pa.exports=Lo();var Mo=Pa.exports;const S=Xa(Mo);function Ln(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function se(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ln(Object(n),!0).forEach(function(a){ye(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ln(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function ot(e){return ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ot(e)}function ye(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Fo(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function zo(e,t){if(e==null)return{};var n=Fo(e,t),a,r;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function Ft(e){return Do(e)||Uo(e)||Wo(e)||Yo()}function Do(e){if(Array.isArray(e))return zt(e)}function Uo(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Wo(e,t){if(e){if(typeof e=="string")return zt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return zt(e,t)}}function zt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Yo(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Bo(e){var t,n=e.beat,a=e.fade,r=e.beatFade,i=e.bounce,o=e.shake,s=e.flash,l=e.spin,c=e.spinPulse,f=e.spinReverse,d=e.pulse,m=e.fixedWidth,h=e.inverse,v=e.border,g=e.listItem,p=e.flip,N=e.size,b=e.rotation,C=e.pull,E=(t={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":i,"fa-shake":o,"fa-flash":s,"fa-spin":l,"fa-spin-reverse":f,"fa-spin-pulse":c,"fa-pulse":d,"fa-fw":m,"fa-inverse":h,"fa-border":v,"fa-li":g,"fa-flip":p===!0,"fa-flip-horizontal":p==="horizontal"||p==="both","fa-flip-vertical":p==="vertical"||p==="both"},ye(t,"fa-".concat(N),typeof N<"u"&&N!==null),ye(t,"fa-rotate-".concat(b),typeof b<"u"&&b!==null&&b!==0),ye(t,"fa-pull-".concat(C),typeof C<"u"&&C!==null),ye(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(E).map(function(A){return E[A]?A:null}).filter(function(A){return A})}function Ho(e){return e=e-0,e===e}function Sa(e){return Ho(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var Xo=["style"];function Vo(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Go(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=Sa(n.slice(0,a)),i=n.slice(a+1).trim();return r.startsWith("webkit")?t[Vo(r)]=i:t[r]=i,t},{})}function ja(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(l){return ja(e,l)}),r=Object.keys(t.attributes||{}).reduce(function(l,c){var f=t.attributes[c];switch(c){case"class":l.attrs.className=f,delete t.attributes.class;break;case"style":l.attrs.style=Go(f);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?l.attrs[c.toLowerCase()]=f:l.attrs[Sa(c)]=f}return l},{attrs:{}}),i=n.style,o=i===void 0?{}:i,s=zo(n,Xo);return r.attrs.style=se(se({},r.attrs.style),o),e.apply(void 0,[t.tag,se(se({},r.attrs),s)].concat(Ft(a)))}var Oa=!1;try{Oa=!0}catch{}function qo(){if(!Oa&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Mn(e){if(e&&ot(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(Mt.icon)return Mt.icon(e);if(e===null)return null;if(e&&ot(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function yt(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?ye({},e,t):{}}var De=k.forwardRef(function(e,t){var n=e.icon,a=e.mask,r=e.symbol,i=e.className,o=e.title,s=e.titleId,l=e.maskId,c=Mn(n),f=yt("classes",[].concat(Ft(Bo(e)),Ft(i.split(" ")))),d=yt("transform",typeof e.transform=="string"?Mt.transform(e.transform):e.transform),m=yt("mask",Mn(a)),h=Ro(c,se(se(se(se({},f),d),m),{},{symbol:r,title:o,titleId:s,maskId:l}));if(!h)return qo("Could not find icon",c),null;var v=h.abstract,g={ref:t};return Object.keys(e).forEach(function(p){De.defaultProps.hasOwnProperty(p)||(g[p]=e[p])}),Ko(v[0],g)});De.displayName="FontAwesomeIcon";De.propTypes={beat:S.bool,border:S.bool,beatFade:S.bool,bounce:S.bool,className:S.string,fade:S.bool,flash:S.bool,mask:S.oneOfType([S.object,S.array,S.string]),maskId:S.string,fixedWidth:S.bool,inverse:S.bool,flip:S.oneOf([!0,!1,"horizontal","vertical","both"]),icon:S.oneOfType([S.object,S.array,S.string]),listItem:S.bool,pull:S.oneOf(["right","left"]),pulse:S.bool,rotation:S.oneOf([0,90,180,270]),shake:S.bool,size:S.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:S.bool,spinPulse:S.bool,spinReverse:S.bool,symbol:S.oneOfType([S.bool,S.string]),title:S.string,titleId:S.string,transform:S.oneOfType([S.string,S.object]),swapOpacity:S.bool};De.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var Ko=ja.bind(null,k.createElement);function Jo(){Y(()=>{Ao.add(Io)},[]);const[e,t]=U(""),[n,a]=U(""),[r,i]=U(!0),o=f=>{t(f.target.value)},s=f=>{a(f.target.value),i(c(f.target.value))},l=async f=>{if(f.preventDefault(),r)try{(await fetch(`http://localhost:8080/rest/users/login?username=${e}&password=${n}`,{method:"POST",headers:{"Content-Type":"application/json"}})).status==200&&console.log("SIUUUUUUUUU")}catch{}},c=f=>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(f);return u.jsx("section",{className:"vh-100",children:u.jsx("div",{className:"container-fluid",children:u.jsxs("div",{className:"row",children:[u.jsxs("div",{className:"col-sm-6 text-black",children:[u.jsxs("div",{className:"px-5 ms-xl-4",children:[u.jsx(De,{icon:"crow",className:"fa-2x me-3 pt-5 mt-xl-4",style:{color:"#709085"}}),u.jsx("span",{className:"h1 fw-bold mb-0"})]}),u.jsx("div",{className:"d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5",children:u.jsxs("form",{style:{width:"23rem"},onSubmit:l,children:[u.jsx("h3",{className:"fw-normal mb-3 pb-3",style:{letterSpacing:"1px"},children:"Log in"}),u.jsx("div",{className:"form-outline mb-4",children:u.jsx("input",{type:"text",id:"form2Example18",className:"form-control form-control-lg ",placeholder:"Email address",value:e,onChange:o})}),u.jsxs("div",{className:"form-outline mb-4",children:[u.jsx("input",{type:"password",id:"form2Example28",className:`form-control form-control-lg ${r?"":"is-invalid"}`,placeholder:"Password",value:n,onChange:s}),!r&&u.jsx("div",{className:"invalid-feedback",children:"Password must have at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number."})]}),u.jsx("div",{className:"pt-1 mb-4",children:u.jsx("button",{className:"btn btn-info btn-lg btn-block btn-blue",type:"submit",children:"Login"})}),u.jsx("p",{className:"small mb-5 pb-lg-2",children:u.jsx("a",{className:"text-muted",href:"#!",children:"Forgot password?"})}),u.jsxs("p",{children:["Don't have an account?"," ",u.jsx(qr,{to:"/register",className:"link-blue",children:"Register here"})]})]})})]}),u.jsx("div",{className:"col-sm-6 px-0 d-none d-sm-block",children:u.jsx("img",{src:"https://www.fct.unl.pt/sites/default/files/images/nova_4.png",alt:"Login image",className:"w-100 vh-70",style:{objectFit:"cover",objectPosition:"left"}})})]})})})}function Aa(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=Aa(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function x(){for(var e=0,t,n,a="";e<arguments.length;)(t=arguments[e++])&&(n=Aa(t))&&(a&&(a+=" "),a+=n);return a}(function(){try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".dropdown-menu .active{color:#16181b;background-color:#eee}.dropdown-menu [data-active=true] a.dropdown-item,.dropdown-menu .dropdown-item:focus,.dropdown-menu li:focus .dropdown-item :not(.disabled){color:#16181b;background-color:#eee}.dropdown-menu li:focus{outline:none}.dropdown-menu.dropdown-menu-dark [data-active=true] a.dropdown-item,.dropdown-menu.dropdown-menu-dark .dropdown-item:focus,.dropdown-menu.dropdown-menu-dark li:focus .dropdown-item{color:#fff;background-color:#1266f1}.btn-group.dropstart>.dropdown-menu{right:0!important}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();const Ra=k.forwardRef(({breakpoint:e,fluid:t,children:n,className:a,tag:r,...i},o)=>{const s=x(`${t?"container-fluid":`container${e?"-"+e:""}`}`,a);return u.jsx(r,{className:s,...i,ref:o,children:n})});Ra.defaultProps={tag:"div"};const Dt=k.forwardRef(({center:e,children:t,className:n,end:a,lg:r,md:i,offsetLg:o,offsetMd:s,offsetSm:l,order:c,size:f,sm:d,start:m,tag:h,xl:v,xxl:g,xs:p,...N},b)=>{const C=x(f&&`col-${f}`,p&&`col-xs-${p}`,d&&`col-sm-${d}`,i&&`col-md-${i}`,r&&`col-lg-${r}`,v&&`col-xl-${v}`,g&&`col-xxl-${g}`,!f&&!p&&!d&&!i&&!r&&!v&&!g?"col":"",c&&`order-${c}`,m&&"align-self-start",e&&"align-self-center",a&&"align-self-end",l&&`offset-sm-${l}`,s&&`offset-md-${s}`,o&&`offset-lg-${o}`,n);return u.jsx(h,{className:C,ref:b,...N,children:t})});Dt.defaultProps={tag:"div"};const Qo=k.forwardRef(({className:e,color:t,pill:n,light:a,dot:r,tag:i,children:o,notification:s,...l},c)=>{const f=x("badge",a?t&&`badge-${t}`:t&&`bg-${t}`,r&&"badge-dot",n&&"rounded-pill",s&&"badge-notification",e);return u.jsx(i,{className:f,ref:c,...l,children:o})});Qo.defaultProps={tag:"span",color:"primary"};const Zo=({...e})=>{const[t,n]=U(!1),a=x("ripple-wave",t&&"active");return Y(()=>{const r=setTimeout(()=>{n(!0)},50);return()=>{clearTimeout(r)}},[]),u.jsx("div",{className:a,...e})},es=(...e)=>{const t=k.useRef();return k.useEffect(()=>{e.forEach(n=>{n&&(typeof n=="function"?n(t.current):n.current=t.current)})},[e]),t},Ia=k.forwardRef(({className:e,rippleTag:t,rippleCentered:n,rippleDuration:a,rippleUnbound:r,rippleRadius:i,rippleColor:o,children:s,onMouseDown:l,...c},f)=>{const d=Ze(null),m=es(f,d),h="rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%",v=[0,0,0],g=["primary","secondary","success","danger","warning","info","light","dark"],[p,N]=U([]),[b,C]=U(!1),E=x("ripple","ripple-surface",r&&"ripple-surface-unbound",b&&`ripple-surface-${o}`,e),A=()=>{if(g.find(O=>O===(o==null?void 0:o.toLowerCase())))return C(!0);{const O=W(o).join(",");return`radial-gradient(circle, ${h.split("{{color}}").join(`${O}`)})`}},W=O=>{const $=j=>(j.length<7&&(j=`#${j[1]}${j[1]}${j[2]}${j[2]}${j[3]}${j[3]}`),[parseInt(j.substr(1,2),16),parseInt(j.substr(3,2),16),parseInt(j.substr(5,2),16)]),_=j=>{const M=document.body.appendChild(document.createElement("fictum")),B="rgb(1, 2, 3)";return M.style.color=B,M.style.color!==B||(M.style.color=j,M.style.color===B||M.style.color==="")?v:(j=getComputedStyle(M).color,document.body.removeChild(M),j)},V=j=>(j=j.match(/[.\d]+/g).map(M=>+Number(M)),j.length=3,j);return O.toLowerCase()==="transparent"?v:O[0]==="#"?$(O):(O.indexOf("rgb")===-1&&(O=_(O)),O.indexOf("rgb")===0?V(O):v)},T=O=>{const{offsetX:$,offsetY:_,height:V,width:j}=O,M=_<=V/2,B=$<=j/2,ae=(Ua,Wa)=>Math.sqrt(Ua**2+Wa**2),re=_===V/2&&$===j/2,K={first:M===!0&&B===!1,second:M===!0&&B===!0,third:M===!1&&B===!0,fourth:M===!1&&B===!1},G={topLeft:ae($,_),topRight:ae(j-$,_),bottomLeft:ae($,V-_),bottomRight:ae(j-$,V-_)};let D=0;return re||K.fourth?D=G.topLeft:K.third?D=G.topRight:K.second?D=G.bottomRight:K.first&&(D=G.bottomLeft),D*2},Q=O=>{var $;const _=($=m.current)==null?void 0:$.getBoundingClientRect(),V=O.clientX-_.left,j=O.clientY-_.top,M=_.height,B=_.width,ae={offsetX:n?M/2:V,offsetY:n?B/2:j,height:M,width:B},re={delay:a&&a*.5,duration:a&&a-a*.5},K=T(ae),G=i||K/2,D={left:n?`${B/2-G}px`:`${V-G}px`,top:n?`${M/2-G}px`:`${j-G}px`,height:i?`${i*2}px`:`${K}px`,width:i?`${i*2}px`:`${K}px`,transitionDelay:`0s, ${re.delay}ms`,transitionDuration:`${a}ms, ${re.duration}ms`};return b?D:{...D,backgroundImage:`${A()}`}},X=O=>{const $=Q(O),_=p.concat($);N(_),l&&l(O)};return Y(()=>{const O=setTimeout(()=>{p.length>0&&N(p.splice(1,p.length-1))},a);return()=>{clearTimeout(O)}},[a,p]),u.jsxs(t,{className:E,onMouseDown:O=>X(O),ref:m,...c,children:[s,p.map((O,$)=>u.jsx(Zo,{style:O},$))]})});Ia.defaultProps={rippleTag:"div",rippleDuration:500,rippleRadius:0,rippleColor:"dark"};const Ta=k.forwardRef(({className:e,color:t,outline:n,children:a,rounded:r,disabled:i,floating:o,size:s,href:l,block:c,active:f,toggle:d,noRipple:m,tag:h,...v},g)=>{const[p,N]=U(f||!1);let b;const C=t&&["light","link"].includes(t)||n?"dark":"light";t!=="none"?n?t?b=`btn-outline-${t}`:b="btn-outline-primary":t?b=`btn-${t}`:b="btn-primary":b="";const E=x(t!=="none"&&"btn",b,r&&"btn-rounded",o&&"btn-floating",s&&`btn-${s}`,`${(l||h!=="button")&&i?"disabled":""}`,c&&"btn-block",p&&"active",e);return l&&h!=="a"&&(h="a"),["hr","img","input"].includes(h)||m?u.jsx(h,{className:E,onClick:d?()=>{N(!p)}:void 0,disabled:i&&h==="button"?!0:void 0,href:l,ref:g,...v,children:a}):u.jsx(Ia,{rippleTag:h,rippleColor:C,className:E,onClick:d?()=>{N(!p)}:void 0,disabled:i&&h==="button"?!0:void 0,href:l,ref:g,...v,children:a})});Ta.defaultProps={tag:"button",role:"button",color:"primary"};const ts=k.forwardRef(({className:e,children:t,shadow:n,toolbar:a,size:r,vertical:i,tag:o,...s},l)=>{let c;a?c="btn-toolbar":i?c="btn-group-vertical":c="btn-group";const f=x(c,n&&`shadow-${n}`,r&&`btn-group-${r}`,e);return u.jsx(o,{className:f,ref:l,...s,children:t})});ts.defaultProps={tag:"div",role:"group"};const ns=k.forwardRef(({className:e,children:t,tag:n,color:a,grow:r,size:i,...o},s)=>{const l=x(`${r?"spinner-grow":"spinner-border"}`,a&&`text-${a}`,`${i?r?"spinner-grow-"+i:"spinner-border-"+i:""}`,e);return u.jsx(n,{className:l,ref:s,...o,children:t})});ns.defaultProps={tag:"div"};const $a=k.forwardRef(({className:e,children:t,border:n,background:a,tag:r,shadow:i,alignment:o,...s},l)=>{const c=x("card",n&&`border border-${n}`,a&&`bg-${a}`,i&&`shadow-${i}`,o&&`text-${o}`,e);return u.jsx(r,{className:c,ref:l,...s,children:t})});$a.defaultProps={tag:"div"};const as=k.forwardRef(({className:e,children:t,border:n,background:a,tag:r,...i},o)=>{const s=x("card-header",n&&`border-${n}`,a&&`bg-${a}`,e);return u.jsx(r,{className:s,...i,ref:o,children:t})});as.defaultProps={tag:"div"};const rs=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("card-subtitle",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});rs.defaultProps={tag:"p"};const is=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("card-title",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});is.defaultProps={tag:"h5"};const os=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("card-text",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});os.defaultProps={tag:"p"};const _a=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("card-body",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});_a.defaultProps={tag:"div"};const ss=k.forwardRef(({className:e,children:t,border:n,background:a,tag:r,...i},o)=>{const s=x("card-footer",n&&`border-${n}`,a&&`bg-${a}`,e);return u.jsx(r,{className:s,...i,ref:o,children:t})});ss.defaultProps={tag:"div"};const ls=({className:e,children:t,overlay:n,position:a,fluid:r,...i})=>{const o=x(a&&`card-img-${a}`,r&&"img-fluid",n&&"card-img",e);return u.jsx("img",{className:o,...i,children:t})},cs=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("card-img-overlay",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});cs.defaultProps={tag:"div"};const fs=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("card-group",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});fs.defaultProps={tag:"div"};const us=k.forwardRef(({className:e,tag:t,horizontal:n,horizontalSize:a,light:r,numbered:i,children:o,small:s,...l},c)=>{const f=x("list-group",n&&(a?`list-group-horizontal-${a}`:"list-group-horizontal"),r&&"list-group-light",i&&"list-group-numbered",s&&"list-group-small",e);return u.jsx(t,{className:f,ref:c,...l,children:o})});us.defaultProps={tag:"ul"};const ds=k.forwardRef(({className:e,tag:t,active:n,disabled:a,action:r,color:i,children:o,noBorders:s,...l},c)=>{const f=t==="button",d=x("list-group-item",n&&"active",a&&!f&&"disabled",r&&"list-group-item-action",i&&`list-group-item-${i}`,s&&"border-0",e);return u.jsx(t,{className:d,disabled:f&&a,ref:c,...l,children:o})});ds.defaultProps={tag:"li"};const La=k.forwardRef(({around:e,between:t,bottom:n,center:a,children:r,className:i,evenly:o,end:s,middle:l,start:c,tag:f,top:d,...m},h)=>{const v=x("row",e&&"justify-content-around",t&&"justify-content-between",n&&"align-self-end",a&&"justify-content-center",o&&"justifty-content-evenly",s&&"justify-content-end",l&&"align-self-center",c&&"justify-content-start",d&&"align-self-start",i);return u.jsx(f,{className:v,...m,ref:h,children:r})});La.defaultProps={tag:"div"};const Ke=({animate:e,className:t,icon:n,fab:a,fas:r,fal:i,far:o,flag:s,spin:l,fixed:c,flip:f,list:d,size:m,pull:h,pulse:v,color:g,border:p,rotate:N,inverse:b,stack:C,iconType:E,children:A,...W})=>{let T;s?T="flag":a?T="fab":r?T="fas":o?T="far":i?T="fal":T="fa";const Q=x(E?`fa-${E}`:T,e&&`fa-${e}`,s?`flag-${s}`:n&&`fa-${n}`,m&&`fa-${m}`,g&&`text-${g}`,p&&"fa-border",N&&`fa-rotate-${N}`,h&&`fa-pull-${h}`,l&&!e&&"fa-spin",d&&"fa-li",c&&"fa-fw",v&&!e&&"fa-pulse",b&&"fa-inverse",f&&`fa-flip-${f}`,C&&`fa-stack-${C}`,t);return u.jsx("i",{className:Q,...W,children:A})},ms=k.forwardRef(({className:e,children:t,tag:n,variant:a,color:r,blockquote:i,note:o,noteColor:s,listUnStyled:l,listInLine:c,...f},d)=>{const m=x(a&&a,i&&"blockquote",o&&"note",r&&`text-${r}`,s&&`note-${s}`,l&&"list-unstyled",c&&"list-inline",e);return i&&(n="blockquote"),(l||c)&&(n="ul"),u.jsx(n,{className:m,ref:d,...f,children:t})});ms.defaultProps={tag:"p"};k.forwardRef(({className:e,color:t,uppercase:n,bold:a,children:r,...i},o)=>{const s=x("breadcrumb",a&&"font-weight-bold",t&&`text-${t}`,n&&"text-uppercase",e);return u.jsx("nav",{"aria-label":"breadcrumb",children:u.jsx("ol",{className:s,ref:o,...i,children:r})})});const ps=k.forwardRef(({className:e,active:t,current:n,children:a,...r},i)=>{const o=x("breadcrumb-item",t&&"active",e);return u.jsx("li",{className:o,ref:i,"aria-current":t&&n,...r,children:a})});ps.defaultProps={current:"page"};const hs=e=>{if(e!==!1)return`navbar-expand-${e}`},vs=k.forwardRef(({className:e,children:t,light:n,dark:a,scrolling:r,fixed:i,sticky:o,scrollingNavbarOffset:s,color:l,transparent:c,expand:f,tag:d,bgColor:m,...h},v)=>{const[g,p]=U(!1),N=x({"navbar-light":n,"navbar-dark":a,"scrolling-navbar":r||s,"top-nav-collapse":g,[`text-${l}`]:l&&c?g:l},i&&`fixed-${i}`,o&&"sticky-top","navbar",f&&hs(f),m&&`bg-${m}`,e),b=et(()=>{s&&window.pageYOffset>s?p(!0):p(!1)},[s]);return Y(()=>((r||s)&&window.addEventListener("scroll",b),()=>{window.removeEventListener("scroll",b)}),[b,r,s]),u.jsx(d,{className:N,role:"navigation",...h,ref:v,children:t})});vs.defaultProps={tag:"nav"};const gs=k.forwardRef(({children:e,className:t,disabled:n,active:a,tag:r,...i},o)=>{const s=x("nav-link",n?"disabled":a?"active":"",t);return u.jsx(r,{"data-test":"nav-link",className:s,style:{cursor:"pointer"},ref:o,...i,children:e})});gs.defaultProps={tag:"a",active:!1,className:"",disabled:!1};const bs=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("navbar-brand",e);return u.jsx(n,{className:i,ref:r,...a,children:t})});bs.defaultProps={tag:"a"};const ys=k.forwardRef(({children:e,className:t,active:n,text:a,tag:r,...i},o)=>{const s=x("nav-item",n&&"active",a&&"navbar-text",t);return u.jsx(r,{...i,className:s,ref:o,children:e})});ys.defaultProps={tag:"li"};const xs=k.forwardRef(({children:e,className:t,right:n,fullWidth:a,left:r,tag:i,...o},s)=>{const l=x("navbar-nav",a&&"w-100",n&&"ms-auto",r&&"me-auto",t);return u.jsx(i,{className:l,ref:s,...o,children:e})});xs.defaultProps={tag:"ul",fullWidth:!0};const ws=k.forwardRef(({children:e,className:t,tag:n,...a},r)=>{const i=x("navbar-toggler",t);return u.jsx(n,{...a,className:i,ref:r,children:e})});ws.defaultProps={tag:"button"};k.forwardRef(({children:e,bgColor:t,color:n,className:a,...r},i)=>{const o=x(t&&`bg-${t}`,n&&`text-${n}`,a);return u.jsx("footer",{className:o,...r,ref:i,children:e})});k.forwardRef(({children:e,size:t,circle:n,center:a,end:r,start:i,className:o,...s},l)=>{const c=x("pagination",a&&"justify-content-center",n&&"pagination-circle",r&&"justify-content-end",t&&`pagination-${t}`,i&&"justify-content-start",o);return u.jsx("ul",{className:c,...s,ref:l,children:e})});const ks=k.forwardRef(({children:e,className:t,tag:n,...a},r)=>{const i=x("page-link",t);return u.jsx(n,{className:i,...a,ref:r,children:e})});ks.defaultProps={tag:"a"};k.forwardRef(({children:e,className:t,active:n,disabled:a,...r},i)=>{const o=x("page-item",n&&"active",a&&"disabled",t);return u.jsx("li",{className:o,...r,ref:i,children:e})});const Ma=k.forwardRef(({animated:e,children:t,className:n,style:a,tag:r,valuenow:i,valuemax:o,striped:s,bgColor:l,valuemin:c,width:f,...d},m)=>{const h=x("progress-bar",l&&`bg-${l}`,s&&"progress-bar-striped",e&&"progress-bar-animated",n),v={width:`${f}%`,...a};return u.jsx(r,{className:h,style:v,ref:m,role:"progressbar",...d,"aria-valuenow":Number(f)??i,"aria-valuemin":Number(c),"aria-valuemax":Number(o),children:t})});Ma.defaultProps={tag:"div"};const Ns=k.forwardRef(({className:e,children:t,tag:n,height:a,style:r,...i},o)=>{const s=x("progress",e),l={height:`${a}px`,...r};return u.jsx(n,{className:s,ref:o,style:l,...i,children:k.Children.map(t,c=>{if(!k.isValidElement(c)||c.type!==Ma){console.error("Progress component only allows ProgressBar as child");return}else return c})})});Ns.defaultProps={tag:"div"};const Ee=k.forwardRef(({className:e,size:t,contrast:n,value:a,defaultValue:r,id:i,labelClass:o,wrapperClass:s,wrapperStyle:l,wrapperTag:c,label:f,onChange:d,children:m,labelRef:h,labelStyle:v,type:g,onBlur:p,readonly:N,...b},C)=>{var E,A;const[W,T]=U(a||r),[Q,X]=U(0),[O,$]=U(!1),_=Ze(null);Ya(C,()=>_.current);const V=Ze(null),j=h||V,M=x("form-outline",n&&"form-white",s),B=x("form-control",O&&"active",g==="date"&&"active",t&&`form-control-${t}`,e),ae=x("form-label",o);Y(()=>{if(!_.current)return;const{value:D}=_.current;D.length>0?$(!0):$(!1)},[(E=_.current)==null?void 0:E.value]),Y(()=>{a!==void 0&&(a.toString().length>0?$(!0):$(!1))},[a]),Y(()=>{r!==void 0&&(r.toString().length>0?$(!0):$(!1))},[r]);const re=et(()=>{var D;(D=j.current)!=null&&D.clientWidth&&X(j.current.clientWidth*.8+8)},[j]);Y(()=>{re()},[(A=j.current)==null?void 0:A.clientWidth,re]);const K=D=>{T(D.target.value),d==null||d(D)},G=et(D=>{_.current&&(W!==void 0&&W.toString().length>0||a!==void 0&&a.toString().length>0||_.current.value.length>0?$(!0):$(!1),p&&p(D))},[W,a,p]);return u.jsxs(c,{className:M,style:l,children:[u.jsx("input",{type:g,readOnly:N,className:B,onBlur:G,onChange:K,onFocus:re,value:a,defaultValue:r,id:i,ref:_,...b}),f&&u.jsx("label",{className:ae,style:v,htmlFor:i,ref:j,children:f}),u.jsxs("div",{className:"form-notch",children:[u.jsx("div",{className:"form-notch-leading"}),u.jsx("div",{className:"form-notch-middle",style:{width:Q}}),u.jsx("div",{className:"form-notch-trailing"})]}),m]})});Ee.defaultProps={wrapperTag:"div",readonly:!1};const Fa=({className:e,inputRef:t,labelClass:n,wrapperClass:a,labelStyle:r,wrapperTag:i,wrapperStyle:o,label:s,inline:l,btn:c,id:f,btnColor:d,disableWrapper:m,toggleSwitch:h,...v})=>{let g="form-check-input",p="form-check-label";c&&(g="btn-check",d?p=`btn btn-${d}`:p="btn btn-primary");const N=x(s&&!c&&"form-check",l&&!c&&"form-check-inline",h&&"form-switch",a),b=x(g,e),C=x(p,n),E=u.jsxs(u.Fragment,{children:[u.jsx("input",{className:b,id:f,ref:t,...v}),s&&u.jsx("label",{className:C,style:r,htmlFor:f,children:s})]});return u.jsx(u.Fragment,{children:m?E:u.jsx(i,{style:o,className:N,children:E})})};Fa.defaultProps={wrapperTag:"div"};const Ps=({...e})=>u.jsx(Fa,{type:"checkbox",...e}),za=({className:e,children:t,show:n,id:a,navbar:r,tag:i,collapseRef:o,style:s,...l})=>{const[c,f]=U(!1),[d,m]=U(void 0),[h,v]=U(!1),g=x(h?"collapsing":"collapse",!h&&c&&"show",r&&"navbar-collapse",e),p=Ze(null),N=o??p,b=et(()=>{c&&m(void 0)},[c]);return Y(()=>{var C;d===void 0&&c&&m((C=N==null?void 0:N.current)==null?void 0:C.scrollHeight)},[d,c,N]),Y(()=>{f(n),c&&v(!0);const C=setTimeout(()=>{v(!1)},350);return()=>{clearTimeout(C)}},[n,c]),Y(()=>{var C;m(c?(C=N==null?void 0:N.current)==null?void 0:C.scrollHeight:0)},[c,N]),Y(()=>(window.addEventListener("resize",b),()=>{window.removeEventListener("resize",b)}),[b]),u.jsx(i,{style:{height:d,...s},id:a,className:g,...l,ref:N,children:t})};za.defaultProps={tag:"div"};Fn(null);const Cs=k.forwardRef(({className:e,centered:t,children:n,size:a,scrollable:r,tag:i,...o},s)=>{const l=x("modal-dialog",r&&"modal-dialog-scrollable",t&&"modal-dialog-centered",a&&`modal-${a}`,e);return u.jsx(i,{className:l,...o,ref:s,children:n})});Cs.defaultProps={tag:"div"};const Es=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("modal-content",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});Es.defaultProps={tag:"div"};const Ss=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("modal-header",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});Ss.defaultProps={tag:"div"};const js=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("modal-title",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});js.defaultProps={tag:"h5"};const Os=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("modal-body",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});Os.defaultProps={tag:"div"};const As=k.forwardRef(({className:e,children:t,tag:n,...a},r)=>{const i=x("modal-footer",e);return u.jsx(n,{className:i,...a,ref:r,children:t})});As.defaultProps={tag:"div"};k.createContext({activeElement:null,setTargets:null});const Rs=k.forwardRef(({className:e,children:t,noBorder:n,textBefore:a,textAfter:r,noWrap:i,tag:o,textTag:s,textClass:l,size:c,textProps:f,...d},m)=>{const h=x("input-group",i&&"flex-nowrap",c&&`input-group-${c}`,e),v=x("input-group-text",n&&"border-0",l),g=p=>u.jsx(u.Fragment,{children:p&&Array.isArray(p)?p.map((N,b)=>u.jsx(s,{className:v,...f,children:N},b)):u.jsx(s,{className:v,...f,children:p})});return u.jsxs(o,{className:h,ref:m,...d,children:[a&&g(a),t,r&&g(r)]})});Rs.defaultProps={tag:"div",textTag:"span"};const Is=k.forwardRef(({className:e,children:t,isValidated:n,onReset:a,onSubmit:r,...i},o)=>{const[s,l]=U(n),c=x("needs-validation",s&&"was-validated",e);return u.jsx("form",{className:c,onSubmit:f=>{f.preventDefault(),l(!0),r&&r(f)},onReset:f=>{f.preventDefault(),l(!1),a&&a(f)},ref:o,...i,children:t})});Is.defaultProps={noValidate:!0};k.forwardRef(({className:e,fill:t,pills:n,justify:a,children:r,...i},o)=>{const s=x("nav",n?"nav-pills":"nav-tabs",t&&"nav-fill",a&&"nav-justified",e);return u.jsx("ul",{className:s,ref:o,...i,children:r})});k.forwardRef(({className:e,children:t,style:n,...a},r)=>{const i=x("nav-item",e);return u.jsx("li",{className:i,style:{cursor:"pointer",...n},role:"presentation",ref:r,...a,children:t})});k.forwardRef(({className:e,color:t,active:n,onShow:a,onHide:r,children:i,...o},s)=>{const l=x("nav-link",n&&"active",t&&`bg-${t}`,e);return Y(()=>{n?a==null||a():r==null||r()},[n]),u.jsx("a",{className:l,ref:s,...o,children:i})});const Ts=k.forwardRef(({className:e,tag:t,children:n,...a},r)=>{const i=x("tab-content",e);return u.jsx(t,{className:i,ref:r,...a,children:n})});Ts.defaultProps={tag:"div"};const $s=k.forwardRef(({className:e,tag:t,show:n,children:a,...r},i)=>{const[o,s]=U(!1),l=x("tab-pane","fade",o&&"show",n&&"active",e);return Y(()=>{let c;return n?c=setTimeout(()=>{s(!0)},100):s(!1),()=>{clearTimeout(c)}},[n]),u.jsx(t,{className:l,role:"tabpanel",ref:i,...r,children:a})});$s.defaultProps={tag:"div"};Fn({active:0});const Da=k.createContext({activeItem:0,setActiveItem:null,alwaysOpen:!1,initialActive:0}),_s=k.forwardRef(({alwaysOpen:e,borderless:t,className:n,flush:a,initialActive:r,tag:i,children:o,onChange:s,...l},c)=>{const f=x("accordion",a&&"accordion-flush",t&&"accordion-borderless",n),[d,m]=U(r);return Y(()=>{d&&s&&s(d)},[s,d]),u.jsx(i,{className:f,ref:c,...l,children:u.jsx(Da.Provider,{value:{activeItem:d,setActiveItem:m,alwaysOpen:e,initialActive:r},children:o})})});_s.defaultProps={tag:"div",initialActive:0};const Ls=k.forwardRef(({className:e,bodyClassName:t,bodyStyle:n,headerClassName:a,collapseId:r,headerTitle:i,headerStyle:o,btnClassName:s,tag:l,children:c,...f},d)=>{const{activeItem:m,setActiveItem:h,alwaysOpen:v,initialActive:g}=Ba(Da),[p,N]=U(g),b=x("accordion-item",e),C=x("accordion-header",a),E=x("accordion-body",t),A=x("accordion-button",v?r!==p&&"collapsed":r!==m&&"collapsed",s),W=T=>{v?N(T!==p?T:0):h(T!==m?T:0)};return u.jsxs(l,{className:b,ref:d,...f,children:[u.jsx("h2",{className:C,style:o,children:u.jsx("button",{onClick:()=>W(r),className:A,type:"button",children:i})}),u.jsx(za,{id:r.toString(),show:v?p===r:m===r,children:u.jsx("div",{className:E,style:n,children:c})})]})});Ls.defaultProps={tag:"div"};function Ms(){return u.jsx(Ra,{fluid:!0,children:u.jsx($a,{className:"text-black m-5",style:{borderRadius:"25px"},children:u.jsx(_a,{children:u.jsxs(La,{children:[u.jsxs(Dt,{md:"10",lg:"6",className:"order-2 order-lg-1 d-flex flex-column align-items-center",children:[u.jsx("p",{className:"text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4",children:"Sign up"}),u.jsxs("div",{className:"d-flex flex-row align-items-center mb-4 ",children:[u.jsx(Ke,{fas:!0,icon:"user me-3",size:"lg"}),u.jsx(Ee,{label:"Your Name",id:"form1",type:"text",className:"w-100"})]}),u.jsxs("div",{className:"d-flex flex-row align-items-center mb-4",children:[u.jsx(Ke,{fas:!0,icon:"envelope me-3",size:"lg"}),u.jsx(Ee,{label:"Your Email",id:"form2",type:"email"})]}),u.jsxs("div",{className:"d-flex flex-row align-items-center mb-4",children:[u.jsx(Ke,{fas:!0,icon:"lock me-3",size:"lg"}),u.jsx(Ee,{label:"Password",id:"form3",type:"password"})]}),u.jsxs("div",{className:"d-flex flex-row align-items-center mb-4",children:[u.jsx(Ke,{fas:!0,icon:"key me-3",size:"lg"}),u.jsx(Ee,{label:"Repeat your password",id:"form4",type:"password"})]}),u.jsx("div",{className:"mb-4",children:u.jsx(Ps,{name:"flexCheck",value:"",id:"flexCheckDefault",label:"Subscribe to our newsletter"})}),u.jsx(Ta,{className:"mb-4",size:"lg",children:"Register"})]}),u.jsx(Dt,{md:"10",lg:"6",className:"order-1 order-lg-2 d-flex align-items-center",children:u.jsx(ls,{src:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp",fluid:!0})})]})})})})}function Fs(){return u.jsx(Xr,{children:u.jsxs(Ur,{children:[u.jsx(Nt,{path:"/",element:u.jsx(Jo,{})}),u.jsx(Nt,{path:"/register",element:u.jsx(Ms,{})})]})})}xt.createRoot(document.getElementById("root")).render(u.jsx(k.StrictMode,{children:u.jsx(Fs,{})}));
