import{R as k,ad as q,bR as w,ae as x,S as I,G as F,Y as N,W as R,L as e,X as s,aw as i,ai as u,V as $,Z as n,aN as B,au as E,af as P,ag as Q,bE as M,O,am as A}from"./index-LUeNgdw9.js";import{c as D,b as L,u as T,e as U,V as j}from"./index.esm-CuvOTSbQ.js";import{a as G,V as p,b as y}from"./route-block-D3zf8sPq.js";import{V as W}from"./VDivider-CsGpuCD4.js";import{V as X}from"./VContainer-BbQ6pW1k.js";const Y={class:"text-center"},Z={class:"text-center"},z={__name:"[id]",setup(H){const{api:V,apiAuth:b}=A(),{t:r}=k(),m=q(),_=w(),g=x(),f=I(),a=F({_id:"",name:"",price:0,description:"",image:"",sell:!0,category:"food"});(async()=>{try{const{data:t}=await V.get("/product/"+_.params.id);a.value=t.result,document.title=a.value.name+" | 購物網站"}catch(t){console.log(t),g.push("/")}})();const h=D({quantity:L().typeError(r("product.addCartQuantityInvalid")).required(r("product.addCartQuantityInvalid")).positive(r("product.addCartQuantityInvalid")).integer(r("product.addCartQuantityInvalid"))}),{handleSubmit:S,isSubmitting:v}=T({validationSchema:h,initialValues:{quantity:1}}),d=U("quantity"),C=S(async t=>{var l,c;if(!f.isLoggedIn){g.push("/login");return}try{const{data:o}=await b.patch("/user/cart",{product:a.value._id,quantity:t.quantity});f.cart=o.result,m({text:r("product.addCartSuccess"),snackbarProps:{color:"green"}})}catch(o){console.log(o),m({text:r("api."+(((c=(l=o==null?void 0:o.response)==null?void 0:l.data)==null?void 0:c.message)||"unknownError")),snackbarProps:{color:"red"}})}});return(t,l)=>(N(),R(O,null,[e(X,null,{default:s(()=>[e(G,null,{default:s(()=>[e(p,{cols:"12"},{default:s(()=>[i("h1",Y,u(a.value.name),1)]),_:1}),e(W),e(p,{cols:"12",md:"6"},{default:s(()=>[e($,{src:a.value.image},null,8,["src"])]),_:1}),e(p,{cols:"12",md:"6"},{default:s(()=>[i("p",null,u(t.$t("productCategory."+a.value.category)),1),i("p",null,u(a.value.price),1),i("p",null,u(a.value.description),1),e(j,{disabled:n(v),onSubmit:B(n(C),["prevent"])},{default:s(()=>[e(E,{modelValue:n(d).value.value,"onUpdate:modelValue":l[0]||(l[0]=c=>n(d).value.value=c),modelModifiers:{number:!0},type:"number","error-messages":n(d).errorMessage.value},null,8,["modelValue","error-messages"]),e(P,{type:"submit","prepend-icon":"mdi-cart",loading:n(v)},{default:s(()=>[Q(u(t.$t("product.addCart")),1)]),_:1},8,["loading"])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}),e(M,{"model-value":!a.value.sell,class:"align-center justify-center",scrim:"black",opacity:"0.8",persistent:""},{default:s(()=>[i("h1",Z,u(t.$t("api.productNotOnSell")),1)]),_:1},8,["model-value"])],64))}};typeof y=="function"&&y(z);export{z as default};
