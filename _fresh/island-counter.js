import{b as u}from"./chunk-AMBYU5BD.js";import"./chunk-UMY7KUS6.js";import{a as c,g as s}from"./chunk-V7IMYVGJ.js";var b=s([]);var N=s(void 0);function g(t){return t.children}g.displayName="Partial";var y=0,I=Array.isArray;function e(t,n,l,C,f,d){n||(n={});var i,r,o=n;if("ref"in o)for(r in o={},n)r=="ref"?i=n[r]:o[r]=n[r];var p={type:t,props:o,key:l,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--y,__i:-1,__u:0,__source:f,__self:d};if(typeof t=="function"&&(i=t.defaultProps))for(r in i)o[r]===void 0&&(o[r]=i[r]);return c.vnode&&c.vnode(p),p}function a(t){return e("button",{...t,disabled:!u||t.disabled,class:"px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"})}function S(t){return e("div",{class:"flex gap-8 py-6",children:[e(a,{onClick:()=>t.count.value-=1,children:"-1"}),e("p",{class:"text-3xl tabular-nums",children:t.count}),e(a,{onClick:()=>t.count.value+=1,children:"+1"})]})}export{S as default};
