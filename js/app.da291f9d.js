(function(){"use strict";var e={2403:function(e,t,n){var r=n(144),i=n(1096),o=n(2349),u=n(1903),s=n(3551),a=function(){var e=this,t=e._self._c;return t(i.Z,[t(o.Z,{attrs:{app:"",color:"black lighten-2",dark:""}}),t(s.Z,[t(u.Z,[t("VuewerBase")],1)],1)],1)},c=[],l=function(){var e=this,t=e._self._c;return t("GithubRepo")},h=[],f=n(4837),d=n(1828),p=n(9781),v=n(5223),b=n(4192),g=n(5057),m=n(5234),w=function(){var e=this,t=e._self._c;return t(p.Z,{attrs:{color:"black lighten-2",dark:""}},[t(v.EB,{staticClass:"text-h5 black lighten-3"},[e._v(" Procure por repositórios ")]),t(v.ZB,[t(f.Z,{attrs:{items:e.entries,loading:e.isLoading,"search-input":e.search,color:"white","hide-no-data":"","hide-selected":"","item-text":"login","item-value":"API",label:"Entre com o nome de usuário",placeholder:"Digite para buscar","prepend-icon":"mdi-database-search","return-object":""},on:{"update:searchInput":function(t){e.search=t},"update:search-input":function(t){e.search=t}},model:{value:e.user,callback:function(t){e.user=t},expression:"user"}})],1),t(b.Z),t(v.h7,[t(m.Z),t(d.Z,{attrs:{disabled:!e.user,color:"grey darken-3"},on:{click:function(t){e.user=null}}},[e._v(" Clear "),t(g.Z,{attrs:{right:""}},[e._v(" mdi-close-circle ")])],1)],1)],1)},Z=[];const y={async search_users(e){const t=await fetch(`https://api.github.com/search/users?q=${e}`);return await t.json()}};let _=null;var k={name:"GithubRepo",data:()=>({descriptionLimit:60,entries:[],isLoading:!1,user:null,search:null,reposlist:[]}),methods:{searchDebounced(){this.isLoading=!0,_&&clearTimeout(_),_=setTimeout((async()=>{const e=await y.search_users(this.search);this.entries=e.items,this.isLoading=!1,_=null}),1e3)}},watch:{search(){""!=this.search?this.entries.length>0||this.isLoading||this.searchDebounced():this.entries=[]}}},O=k,j=n(3736),x=(0,j.Z)(O,w,Z,!1,null,null,null),P=x.exports,T={name:"VuewerBase",components:{GithubRepo:P}},L=T,B=(0,j.Z)(L,l,h,!1,null,null,null),S=B.exports,C={name:"App",components:{VuewerBase:S},data:()=>({})},D=C,E=(0,j.Z)(D,a,c,!1,null,null,null),G=E.exports,M=n(2250);r.ZP.use(M.Z);var R=new M.Z({});r.ZP.config.productionTip=!1,new r.ZP({vuetify:R,render:e=>e(G)}).$mount("#app")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,r,i,o){if(!r){var u=1/0;for(l=0;l<e.length;l++){r=e[l][0],i=e[l][1],o=e[l][2];for(var s=!0,a=0;a<r.length;a++)(!1&o||u>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[a])}))?r.splice(a--,1):(s=!1,o<u&&(u=o));if(s){e.splice(l--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,u=r[0],s=r[1],a=r[2],c=0;if(u.some((function(t){return 0!==e[t]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(a)var l=a(n)}for(t&&t(r);c<u.length;c++)o=u[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(l)},r=self["webpackChunkgitvuewer"]=self["webpackChunkgitvuewer"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(2403)}));r=n.O(r)})();
//# sourceMappingURL=app.da291f9d.js.map