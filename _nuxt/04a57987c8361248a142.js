(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{168:function(t,e,n){var content=n(173);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(80).default)("4923d6c7",content,!0,{sourceMap:!1})},169:function(t,e,n){var content=n(175);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(80).default)("937e8294",content,!0,{sourceMap:!1})},170:function(t,e,n){var content=n(177);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(80).default)("ae789a08",content,!0,{sourceMap:!1})},172:function(t,e,n){"use strict";var r=n(168);n.n(r).a},173:function(t,e,n){(t.exports=n(79)(!1)).push([t.i,".simple-card[data-v-25d6dac4]{margin:8px;width:250px;height:500px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;padding:16px 10px;box-sizing:border-box;border:1px solid #ccc;background-color:#fff;border-radius:6px}.fullscreen[data-v-25d6dac4]{margin:6px;width:auto;height:auto;position:fixed;top:0;bottom:0;left:0;right:0;z-index:100}",""])},174:function(t,e,n){"use strict";var r=n(169);n.n(r).a},175:function(t,e,n){(t.exports=n(79)(!1)).push([t.i,".header[data-v-29fe5c64]{display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;margin:0 4px}.qrcode[data-v-29fe5c64]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button-list[data-v-29fe5c64]{-webkit-box-flex:1;flex:1 1;-webkit-box-pack:end;justify-content:flex-end}.button[data-v-29fe5c64],.button-list[data-v-29fe5c64]{display:-webkit-box;display:flex}.button[data-v-29fe5c64]{-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin-left:2px;margin-top:-6px;width:20px;height:20px;font-size:24px;border-radius:100%;padding:12px;cursor:pointer}.button i[data-v-29fe5c64]{font-size:24px;color:#333;-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}textarea[data-v-29fe5c64]{-webkit-box-flex:1;flex:1 1;background-color:transparent;resize:none;margin-top:10px;padding-top:10px;border:0;border-top:1px solid #ccc;font-size:120%}textarea[data-v-29fe5c64]:focus{outline:none}.simple-card[focus-within][data-v-29fe5c64]{box-shadow:0 0 8px 3px rgba(153,153,238,.2)}.simple-card[data-v-29fe5c64]:focus-within{box-shadow:0 0 8px 3px rgba(153,153,238,.2)}",""])},176:function(t,e,n){"use strict";var r=n(170);n.n(r).a},177:function(t,e,n){(t.exports=n(79)(!1)).push([t.i,"main[data-v-6daf39e0]{flex-wrap:wrap;padding:8px}.open-button[data-v-6daf39e0],main[data-v-6daf39e0]{display:-webkit-box;display:flex}.open-button[data-v-6daf39e0]{-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:64px;height:64px;font-size:36px;padding:10px;margin:2px;border-radius:100%;color:#333;text-decoration:none}.open-button[data-v-6daf39e0]:focus{outline:none;box-shadow:0 0 8px 3px rgba(153,153,238,.4)}.v-enter-active[data-v-6daf39e0],.v-leave-active[data-v-6daf39e0]{-webkit-transition:opacity .4s;transition:opacity .4s}.v-enter[data-v-6daf39e0],.v-leave-to[data-v-6daf39e0]{opacity:0}",""])},178:function(t,e,n){"use strict";n.r(e);var r=n(171),o={props:{center:[Boolean],horizontal:[Boolean],fullscreen:[Boolean]},computed:{style:function(){return{"align-items":this.center?"center":"auto","justify-content":this.center?"center":"auto","flex-direction":this.horizontal?"row":"column"}}}},c=(n(172),n(32)),l=Object(c.a)(o,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"simple-card",class:{fullscreen:this.fullscreen},style:this.style},[this._t("default")],2)},[],!1,null,"25d6dac4",null).exports,d={props:["value"],components:{QrCode:r.a,SimpleCard:l},data:function(){return{fullscreen:!1}},computed:{qrOptions:function(){return{width:60,height:60,margin:0,color:{light:"#ffffff00",dark:"#000000ff"}}},url:function(){return"".concat(location.origin).concat(location.pathname,"?key=").concat(this.value.secret.key)}},mounted:function(){this.$refs.text.focus()}},f=(n(174),{components:{TextCard:Object(c.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("simple-card",{attrs:{fullscreen:t.fullscreen}},[n("div",{staticClass:"header"},[n("a",{attrs:{href:t.url,tabindex:"-1"}},[n("qr-code",{staticClass:"qrcode",attrs:{value:t.url,options:t.qrOptions,tag:"img"}})],1),t._v(" "),n("div",{staticClass:"button-list"},[n("div",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"button",on:{click:function(e){t.fullscreen=!t.fullscreen}}},[n("i",{staticClass:"fas",class:{"fa-expand":!t.fullscreen,"fa-compress":t.fullscreen}})]),t._v(" "),n("div",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"button",on:{click:function(e){return t.$store.commit("close",{secret:t.value.secret})}}},[n("i",{staticClass:"fas fa-times"})])])]),t._v(" "),n("textarea",{ref:"text",domProps:{value:t.value.text},on:{input:function(e){return t.$store.commit("update",{secret:t.value.secret,text:e.target.value})}}})])},[],!1,null,"29fe5c64",null).exports,SimpleCard:l},created:function(){var t=this,e=this.$route.query.key;"string"==typeof e&&(e=[e]),e?(e.forEach(function(e){return t.$store.commit("open",{secret:{key:e}})}),history.replaceState(null,null,location.origin+location.pathname)):this.$store.commit("create")}}),x=(n(176),Object(c.a)(f,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition-group",{attrs:{tag:"main"}},[t._l(t.$store.state.cards,function(t){return n("text-card",{key:t.secret.key,attrs:{value:t}})}),t._v(" "),n("simple-card",{key:"operation-card",attrs:{center:"",horizontal:""}},[n("a",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"open-button",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.$store.commit("create")}}},[n("i",{staticClass:"fas fa-qrcode"})]),t._v(" "),n("a",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"open-button",attrs:{href:""},on:{click:function(t){t.preventDefault()}}},[n("i",{staticClass:"fas fa-camera"})])])],2)},[],!1,null,"6daf39e0",null));e.default=x.exports}}]);