"use strict";(self["webpackChunkcrm"]=self["webpackChunkcrm"]||[]).push([[873],{873:function(t,e,i){i.r(e),i.d(e,{default:function(){return Y}});var l=i(3396),a=i(7139);const r={class:"page-title"},s={key:1,class:"row"},n={key:1,class:"center"};function o(t,e,i,o,c,d){const u=(0,l.up)("Loader"),m=(0,l.up)("CategoryCreate"),h=(0,l.up)("CategoryEdit");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",r,[(0,l._)("h3",null,(0,a.zw)(t.$filters.localize.localizeFilter("Categories")),1)]),(0,l._)("section",null,[t.loading?((0,l.wg)(),(0,l.j4)(u,{key:0})):((0,l.wg)(),(0,l.iD)("div",s,[(0,l.Wm)(m,{onCreated:d.addNewCategory},null,8,["onCreated"]),t.categories.length?((0,l.wg)(),(0,l.j4)(h,{categories:t.categories,key:t.categories.length+t.updateCount,onEdited:d.editCategories,currentCategory:t.currentCategory},null,8,["categories","onEdited","currentCategory"])):((0,l.wg)(),(0,l.iD)("p",n,(0,a.zw)(t.$filters.localize.localizeFilter("No categories yet")),1))]))])])}i(560);var c=i(9242);const d={class:"col s12 m6"},u={class:"page-subtitle"},m={class:"input-field"},h={for:"name"},v={key:0,class:"helper-text invalid"},g={class:"input-field"},$={for:"limit"},y={key:0,class:"helper-text invalid"},p={class:"btn waves-effect waves-light",type:"submit"},w=(0,l._)("i",{class:"material-icons right"},"send",-1);function z(t,e,i,r,s,n){return(0,l.wg)(),(0,l.iD)("div",d,[(0,l._)("div",null,[(0,l._)("div",u,[(0,l._)("h4",null,(0,a.zw)(t.$filters.localize.localizeFilter("Create")),1)]),(0,l._)("form",{onSubmit:e[2]||(e[2]=(0,c.iM)(((...t)=>n.submitHandler&&n.submitHandler(...t)),["prevent"]))},[(0,l._)("div",m,[(0,l.wy)((0,l._)("input",{id:"name",type:"text","onUpdate:modelValue":e[0]||(e[0]=e=>t.title=e),class:(0,a.C_)({invalid:t.v$.title.$dirty&&t.v$.title.required.$invalid})},null,2),[[c.nr,t.title]]),(0,l._)("label",h,(0,a.zw)(t.$filters.localize.localizeFilter("Name")),1),t.v$.title.$dirty&&t.v$.title.required.$invalid?((0,l.wg)(),(0,l.iD)("span",v,(0,a.zw)(t.$filters.localize.localizeFilter("Enter category name")),1)):(0,l.kq)("",!0)]),(0,l._)("div",g,[(0,l.wy)((0,l._)("input",{id:"limit",type:"number","onUpdate:modelValue":e[1]||(e[1]=e=>t.limit=e),class:(0,a.C_)({invalid:t.v$.limit.$dirty&&t.v$.limit.minValue.$invalid})},null,2),[[c.nr,t.limit,void 0,{number:!0}]]),(0,l._)("label",$,(0,a.zw)(t.$filters.localize.localizeFilter("Limit")),1),t.v$.limit.$dirty&&t.v$.limit.minValue.$invalid?((0,l.wg)(),(0,l.iD)("span",y,(0,a.zw)(t.$filters.localize.localizeFilter("Minimum value"))+" "+(0,a.zw)(t.v$.limit.minValue.$params.min),1)):(0,l.kq)("",!0)]),(0,l._)("button",p,[(0,l.Uk)((0,a.zw)(t.$filters.localize.localizeFilter("Create"))+" ",1),w])],32)])])}var f=i(4219),C=i(5420),_={name:"CategoryCreate",setup:()=>({v$:(0,f.Xw)()}),data:()=>({title:"",limit:20}),validations:{title:{required:C.C1},limit:{minValue:(0,C.uv)(20)}},mounted(){M.updateTextFields()},methods:{async submitHandler(){if(this.v$.$invalid)this.v$.$touch();else try{const t=await this.$store.dispatch("createCategory",{title:this.title,limit:this.limit});this.title="",this.limit=20,this.v$.$reset(),this.$emit("created",t),M.toast({html:this.$filters.localize.localizeFilter("Category successfully created")})}catch(t){M.toast({html:this.$filters.localize.localizeFilter("Something went wrong")})}}}},b=i(89);const F=(0,b.Z)(_,[["render",z]]);var k=F;const V={class:"col s12 m6"},q={class:"page-subtitle"},D={class:"input-field"},x=["value"],E={class:"input-field"},U={for:"name"},H={key:0,class:"helper-text invalid"},S={class:"input-field"},N={for:"limit"},L={key:0,class:"helper-text invalid"},Z={class:"btn waves-effect waves-light",type:"submit"},j=(0,l._)("i",{class:"material-icons right"},"send",-1);function T(t,e,i,r,s,n){return(0,l.wg)(),(0,l.iD)("div",V,[(0,l._)("div",null,[(0,l._)("div",q,[(0,l._)("h4",null,(0,a.zw)(t.$filters.localize.localizeFilter("Edit")),1)]),(0,l._)("form",{onSubmit:e[3]||(e[3]=(0,c.iM)(((...t)=>n.submitHandler&&n.submitHandler(...t)),["prevent"]))},[(0,l._)("div",D,[(0,l.wy)((0,l._)("select",{ref:"select","onUpdate:modelValue":e[0]||(e[0]=e=>t.current=e)},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(i.categories,(t=>((0,l.wg)(),(0,l.iD)("option",{key:t.id,value:t.id},(0,a.zw)(t.title),9,x)))),128))],512),[[c.bM,t.current]]),(0,l._)("label",null,(0,a.zw)(t.$filters.localize.localizeFilter("Select a category")),1)]),(0,l._)("div",E,[(0,l.wy)((0,l._)("input",{id:"name",type:"text","onUpdate:modelValue":e[1]||(e[1]=e=>t.title=e),class:(0,a.C_)({invalid:t.v$.title.$dirty&&t.v$.title.required.$invalid})},null,2),[[c.nr,t.title]]),(0,l._)("label",U,(0,a.zw)(t.$filters.localize.localizeFilter("Name")),1),t.v$.title.$dirty&&t.v$.title.required.$invalid?((0,l.wg)(),(0,l.iD)("span",H,(0,a.zw)(t.$filters.localize.localizeFilter("Enter category name")),1)):(0,l.kq)("",!0)]),(0,l._)("div",S,[(0,l.wy)((0,l._)("input",{id:"limit",type:"number","onUpdate:modelValue":e[2]||(e[2]=e=>t.limit=e),class:(0,a.C_)({invalid:t.v$.limit.$dirty&&t.v$.limit.minValue.$invalid})},null,2),[[c.nr,t.limit,void 0,{number:!0}]]),(0,l._)("label",N,(0,a.zw)(t.$filters.localize.localizeFilter("Limit")),1),t.v$.limit.$dirty&&t.v$.limit.minValue.$invalid?((0,l.wg)(),(0,l.iD)("span",L,(0,a.zw)(t.$filters.localize.localizeFilter("Minimum value"))+" "+(0,a.zw)(t.v$.limit.minValue.$params.min),1)):(0,l.kq)("",!0)]),(0,l._)("button",Z,[(0,l.Uk)((0,a.zw)(t.$filters.localize.localizeFilter("Update"))+" ",1),j])],32)])])}var X={name:"CategoryEdit",setup:()=>({v$:(0,f.Xw)()}),props:{categories:{type:Array,required:!0},currentCategory:{required:!0}},data:()=>({select:null,limit:20,title:"",current:null}),validations:{title:{required:C.C1},limit:{minValue:(0,C.uv)(20)}},watch:{current(t){const{title:e,limit:i}=this.categories.find((e=>e.id===t));this.title=e,this.limit=i}},created(){Object.keys(this.$props.currentCategory).length?this.showCurrentCategory(this.$props.currentCategory):this.showCurrentCategory(this.categories[0])},mounted(){M.updateTextFields(),this.select=M.FormSelect.init(this.$refs.select)},methods:{showCurrentCategory({id:t,title:e,limit:i}){this.current=t,this.title=e,this.limit=i},async submitHandler(){if(this.v$.$invalid)this.v$.$touch();else try{await this.$store.dispatch("editCategory",{id:this.current,title:this.title,limit:this.limit});M.toast({html:this.$filters.localize.localizeFilter("Category successfully changed")}),this.$emit("edited",{id:this.current,title:this.title,limit:this.limit})}catch(t){M.toast({html:this.$filters.localize.localizeFilter("Something went wrong")})}}},deactivated(){this.select&&this.select.deactivated&&this.select.deactivated()}};const A=(0,b.Z)(X,[["render",T]]);var I=A,K=i(141),O={name:"categories",data:()=>({categories:[],loading:!0,updateCount:0,currentCategory:{}}),components:{Loader:K.Z,CategoryCreate:k,CategoryEdit:I},async mounted(){this.categories=await this.$store.dispatch("fetchCategories"),this.loading=!1},methods:{addNewCategory(t){this.categories.push(t)},editCategories(t){this.currentCategory={id:t.id,title:t.title,limit:t.limit},this.updateCount++;const e=this.categories.findIndex((e=>e.id===t.id));this.categories[e].title=t.title,this.categories[e].limit=t.limit}}};const W=(0,b.Z)(O,[["render",o]]);var Y=W}}]);
//# sourceMappingURL=873.9e91c446.js.map