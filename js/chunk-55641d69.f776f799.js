(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55641d69"],{"12fd":function(t,n,e){},2423:function(t,n,e){"use strict";e.d(n,"g",(function(){return r})),e.d(n,"f",(function(){return i})),e.d(n,"e",(function(){return s})),e.d(n,"a",(function(){return c})),e.d(n,"c",(function(){return o})),e.d(n,"b",(function(){return u})),e.d(n,"d",(function(){return l})),e.d(n,"i",(function(){return h})),e.d(n,"h",(function(){return d})),e.d(n,"j",(function(){return f}));var a=e("b775"),r=function(t,n){return Object(a["a"])({method:"GET",url:"/app/v1_0/users/".concat(t,"/articles"),params:n})},i=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_1/articles",params:t})},s=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_0/articles/".concat(t)})},c=function(t){return Object(a["a"])({method:"POST",url:"/app/v1_0/article/collections",data:{target:t}})},o=function(t){return Object(a["a"])({method:"DELETE",url:"/app/v1_0/article/collections/".concat(t)})},u=function(t){return Object(a["a"])({method:"POST",url:"/app/v1_0/article/likings",data:{target:t}})},l=function(t){return Object(a["a"])({method:"DELETE",url:"/app/v1_0/article/likings/".concat(t)})},h=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_0/user/articles",params:t})},d=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_0/article/collections",params:t})},f=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_0/user/histories",params:t})}},"25f0":function(t,n,e){"use strict";var a=e("6eeb"),r=e("825a"),i=e("d039"),s=e("ad6d"),c="toString",o=RegExp.prototype,u=o[c],l=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),h=u.name!=c;(l||h)&&a(RegExp.prototype,c,(function(){var t=r(this),n=String(t.source),e=t.flags,a=String(void 0===e&&t instanceof RegExp&&!("flags"in o)?s.call(t):e);return"/"+n+"/"+a}),{unsafe:!0})},2909:function(t,n,e){"use strict";function a(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}e("a4d3"),e("e01a"),e("d28b"),e("a630"),e("e260"),e("d3b7"),e("25f0"),e("3ca3"),e("ddb0");function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(t){return a(t)||r(t)||i()}e.d(n,"a",(function(){return s}))},"455b":function(t,n,e){},"4df4":function(t,n,e){"use strict";var a=e("f8c2"),r=e("7b0b"),i=e("9bdd"),s=e("e95a"),c=e("50c4"),o=e("8418"),u=e("35a1");t.exports=function(t){var n,e,l,h,d,f=r(t),p="function"==typeof this?this:Array,v=arguments.length,m=v>1?arguments[1]:void 0,b=void 0!==m,g=0,w=u(f);if(b&&(m=a(m,v>2?arguments[2]:void 0,2)),void 0==w||p==Array&&s(w))for(n=c(f.length),e=new p(n);n>g;g++)o(e,g,b?m(f[g],g):f[g]);else for(h=w.call(f),d=h.next,e=new p;!(l=d.call(h)).done;g++)o(e,g,b?i(h,m,[l.value,g],!0):l.value);return e.length=g,e}},"7abe":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"home-container"},[e("van-nav-bar",{attrs:{fixed:""}},[e("van-button",{staticClass:"search-button",attrs:{slot:"title",type:"info",round:"",size:"mini"},on:{click:function(n){return t.$router.push("/search")}},slot:"title"},[t._v("搜索")])],1),e("van-tabs",{model:{value:t.active,callback:function(n){t.active=n},expression:"active"}},[e("van-icon",{staticClass:"wap-nav",attrs:{slot:"nav-right",name:"wap-nav"},on:{click:function(n){t.isChannelsEditShow=!0}},slot:"nav-right"}),t._l(t.channels,(function(t){return e("van-tab",{key:t.id,attrs:{title:t.name}},[e("ArticleList",{attrs:{channel:t}})],1)}))],2),e("van-popup",{style:{height:"90%"},attrs:{closeable:"",position:"bottom","close-icon-position":"top-left"},model:{value:t.isChannelsEditShow,callback:function(n){t.isChannelsEditShow=n},expression:"isChannelsEditShow"}},[e("channel-edit",{attrs:{channels:t.channels},on:{chose:t.choseChannel,close:function(n){t.isChannelsEditShow=!1}}})],1)],1)},r=[],i=(e("96cf"),e("1da1")),s=e("b775"),c=function(){return Object(s["a"])({method:"GET",url:"/app/v1_0/user/channels"})},o=function(){return Object(s["a"])({method:"GET",url:"/app/v1_0/channels"})},u=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(n){t.isLoading=n},expression:"isLoading"}},[e("div",[e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(n){t.loading=n},expression:"loading"}},t._l(t.list,(function(n,a){return e("van-cell",{key:a,attrs:{title:n.title},on:{click:function(e){return t.$router.push("/article/"+n.art_id)}}})})),1)],1)])},l=[],h=e("2909"),d=e("2423"),f={props:{channel:{type:Object,required:!0}},data:function(){return{list:[],loading:!1,finished:!1,timestamp:null,isLoading:!1}},methods:{onLoad:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var n,e,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(d["f"])({channel_id:this.channel.id,timestamp:this.timestamp||Date.now(),with_top:1});case 2:e=t.sent,a=e.data,(n=this.list).push.apply(n,Object(h["a"])(a.data.results)),this.loading=!1,a.data.results.length?this.timestamp=a.data.pre_timestamp:this.finished=!0;case 7:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),onRefresh:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var n,e,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(d["f"])({channel_id:this.channel.id,timestamp:Date.now(),with_top:1});case 2:e=t.sent,a=e.data,r=a.data.results,(n=this.list).unshift.apply(n,Object(h["a"])(r)),this.isLoading=!1,this.$toast("刷新了".concat(r.length,"条数据"));case 8:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}()}},p=f,v=e("2877"),m=Object(v["a"])(p,u,l,!1,null,null,null),b=m.exports,g=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"channel_edit"},[e("van-cell-group",[e("van-cell",{attrs:{title:"我的频道"}},[e("van-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){t.isEditShow=!t.isEditShow}}},[t._v(t._s(t.isEditShow?"完成":"编辑"))])],1)],1),e("van-grid",{attrs:{gutter:10}},t._l(t.channels,(function(n,a){return e("van-grid-item",{key:n.id,staticClass:"gridList",attrs:{text:n.name},on:{click:function(n){return t.onUserChannelClick(a)}}},[e("van-icon",{directives:[{name:"show",rawName:"v-show",value:t.isEditShow&&0!==a,expression:"isEditShow && index!==0"}],staticClass:"closeIcon",attrs:{slot:"icon",name:"close"},slot:"icon"})],1)})),1),e("van-cell-group",[e("van-cell",{attrs:{title:"频道推荐"}})],1),e("van-grid",{attrs:{gutter:10}},t._l(t.remainingChannels,(function(n){return e("van-grid-item",{key:n.id,attrs:{text:n.name},on:{click:function(e){return t.myChannelAdd(n)}}})})),1)],1)},w=[],y=(e("7db0"),e("a434"),e("159b"),e("5d2d")),E={props:{channels:{required:!0,type:Array}},data:function(){return{allChannels:[],isEditShow:!1}},created:function(){this.onLoadChannels()},watch:{channels:function(){Object(y["b"])("user-channel",this.channels)}},methods:{onUserChannelClick:function(t){this.isEditShow?this.channels.splice(t,1):this.$emit("chose",t)},myChannelAdd:function(t){this.channels.push(t)},onLoadChannels:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var n,e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o();case 2:n=t.sent,e=n.data,this.allChannels=e.data.channels;case 5:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}()},computed:{remainingChannels:function(){var t=this,n=[];return this.allChannels.forEach((function(e){t.channels.find((function(t){return t.id===e.id}))||n.push(e)})),n}}},C=E,_=(e("7d36"),Object(v["a"])(C,g,w,!1,null,"7f8d2ffb",null)),j=_.exports,O={name:"HomePage",components:{ArticleList:b,ChannelEdit:j},props:{},data:function(){return{active:0,channels:[],isChannelsEditShow:!1}},computed:{},watch:{},created:function(){this.userChannels()},mounted:function(){},methods:{choseChannel:function(t){this.active=t,this.isChannelsEditShow=!1},userChannels:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var n,e,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=[],e=Object(y["a"])("user-channel"),!e){t.next=6;break}n=e,t.next=11;break;case 6:return t.next=8,c();case 8:a=t.sent,r=a.data,n=r.data.channels;case 11:this.channels=n;case 12:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}()}},x=O,k=(e("9f1f"),Object(v["a"])(x,a,r,!1,null,"252cf8ca",null));n["default"]=k.exports},"7d36":function(t,n,e){"use strict";var a=e("12fd"),r=e.n(a);r.a},"7db0":function(t,n,e){"use strict";var a=e("23e7"),r=e("b727").find,i=e("44d2"),s="find",c=!0;s in[]&&Array(1)[s]((function(){c=!1})),a({target:"Array",proto:!0,forced:c},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i(s)},"9f1f":function(t,n,e){"use strict";var a=e("455b"),r=e.n(a);r.a},a630:function(t,n,e){var a=e("23e7"),r=e("4df4"),i=e("1c7e"),s=!i((function(t){Array.from(t)}));a({target:"Array",stat:!0,forced:s},{from:r})},ad6d:function(t,n,e){"use strict";var a=e("825a");t.exports=function(){var t=a(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}}}]);
//# sourceMappingURL=chunk-55641d69.f776f799.js.map