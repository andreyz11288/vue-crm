"use strict";(self["webpackChunkcrm"]=self["webpackChunkcrm"]||[]).push([[456],{456:function(e,r,t){t.r(r),t.d(r,{default:function(){return h}});var i=t(3396),l=t(7139),o=t(9242);const c={key:1},a={class:"breadcrumb-wrap"},n={class:"row"},s={class:"col s12 m6"},d={class:"card-content white-text"},u={key:2,class:"center"};function z(e,r,t,z,m,w){const p=(0,i.up)("Loader"),f=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",null,[e.loading?((0,i.wg)(),(0,i.j4)(p,{key:0})):e.record?((0,i.wg)(),(0,i.iD)("div",c,[(0,i._)("div",a,[(0,i.Wm)(f,{to:"/history",class:"breadcrumb"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,l.zw)(e.$filters.localize.localizeFilter("Story")),1)])),_:1}),(0,i._)("a",{onClick:r[0]||(r[0]=(0,o.iM)((()=>{}),["prevent"])),class:"breadcrumb"},(0,l.zw)("income"===e.record.type?e.$filters.localize.localizeFilter("Income"):e.$filters.localize.localizeFilter("Outcome")),1)]),(0,i._)("div",n,[(0,i._)("div",s,[(0,i._)("div",{class:(0,l.C_)(["card",{red:"outcome"===e.record.type,green:"income"===e.record.type}])},[(0,i._)("div",d,[(0,i._)("p",null,(0,l.zw)(e.$filters.localize.localizeFilter("Description"))+": "+(0,l.zw)(e.record.description),1),(0,i._)("p",null,(0,l.zw)(e.$filters.localize.localizeFilter("Sum"))+": "+(0,l.zw)(e.$filters.filter.currencyFilter(Math.abs(e.record.amount),e.info.currency)),1),(0,i._)("p",null,(0,l.zw)(e.$filters.localize.localizeFilter("Category"))+": "+(0,l.zw)(e.record.categoryName),1),(0,i._)("small",null,(0,l.zw)(w.originalDate(e.record.date)),1)])],2)])])])):((0,i.wg)(),(0,i.iD)("p",u,(0,l.zw)(e.$filters.localize.localizeFilter("Entry with id"))+"="+(0,l.zw)(e.$route.params.id)+" "+(0,l.zw)(e.$filters.localize.localizeFilter("not found")),1))])}var m=t(141),w=t(65),p={name:"detailRecord",components:{Loader:m.Z},data:()=>({record:null,loading:!0}),async mounted(){const e=this.$route.params.id,r=await this.$store.dispatch("fetchRecordById",e),t=await this.$store.dispatch("fetchCategoryById",r.categoryId);this.record={...r,categoryName:t.title},this.loading=!1},methods:{originalDate(e){const r=new Date(e),t={timeZone:"UTC",hour12:!1};return`${r.toISOString().split("T")[0]}, ${r.toLocaleTimeString("en-US",t)}`}},computed:{...(0,w.Se)(["info"])}},f=t(89);const y=(0,f.Z)(p,[["render",z]]);var h=y}}]);
//# sourceMappingURL=456.cd8b1a91.js.map