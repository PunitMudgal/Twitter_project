"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[225],{3225:(e,a,l)=>{l.r(a),l.d(a,{default:()=>b});var t=l(5043),r=l(2021),s=l(3216),o=l(287),i=l(3768),c=l(6720),n=l(3003),u=l(7653),d=l(2347),p=l(9618),f=l(2952),m=l(8529),x=l(579);const b=function(){const e=(0,s.Zp)(),a=(0,n.wA)(),l=(0,n.d4)(f.mB),[b,g]=(0,t.useState)(null),[v,h]=(0,t.useState)(null),[j,y]=(0,t.useState)(null),[N,w]=(0,t.useState)(null),[P,C]=(0,t.useState)(""),[S,k]=(0,t.useState)(""),[U,R]=(0,t.useState)(""),A=async t=>{t.preventDefault();try{const t=new FormData;t.append("userId",l._id),P&&t.append("name",P),S&&t.append("bio",S),U&&t.append("from",U),b&&t.append("profilePicturePath",b),j&&t.append("coverPicture",j);const r=(0,o.TK)(t);await i.oR.promise(r,{loading:"Updating...",success:"Update Successful",error:e=>e.response.data.message||"Error!"}),r.then((e=>{a((0,f.gV)(e)),a((0,m.cr)(e))})),e(-1)}catch(r){console.error("Error During Update:",r),i.oR.error("Update failed, please try again.")}};return(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("div",{className:"absolute top-0 left-0 overflow-hidden  bg-gray-700 bg-opacity-60 h-screen w-full z-10",children:(0,x.jsxs)("div",{className:"absolute top-[6%] bg-black text-gray-400 left-1/2 transform -translate-x-1/2  w-[40%] shadow rounded-md",children:[(0,x.jsxs)("div",{className:"flex items-center gap-8 justify-between  p-3 font-semibold",children:[(0,x.jsx)(r.clO,{className:"cursor-pointer text-xl",onClick:()=>e(-1)}),(0,x.jsx)("p",{className:" text-left text-xl",children:"Edit Profile"}),(0,x.jsx)("button",{type:"submit",className:"bg-gray-100 rounded-3xl text-black px-3 py-1  ",onClick:A,children:"Save"})]}),(0,x.jsxs)(d.A,{onSubmit:A,className:"flex flex-col relative",component:"form",sx:{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"#5f6a6a"},"&:hover fieldset":{borderColor:"#5f6a6a"},"&.Mui-focused fieldset":{borderColor:"#7d3c98"}},input:{color:"#a6acaf"},label:{color:"#5f6a6a"},"& .MuiInputBase-multiline":{color:"#a6acaf"}},noValidate:!0,autoComplete:"off",children:[(0,x.jsxs)("div",{className:"relative bg-zinc-800 w-full h-[200px] flex justify-center items-center ",children:[(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"absolute flex gap-1 left-[45%] top-[42%] text-3xl justify-center items-center ",children:[(0,x.jsx)("label",{htmlFor:"coverPicture",className:"p-2 rounded-full bg-gray-700 bg-opacity-45 hover:bg-opacity-75 ",children:(0,x.jsx)(c.YZc,{})}),N||(null===l||void 0===l?void 0:l.coverPicture)&&(0,x.jsx)(r.clO,{onClick:()=>{w(null),y(null)},className:"p-1 text-5xl rounded-full bg-gray-700 bg-opacity-45 hover:bg-opacity-75"})]}),(0,x.jsx)("input",{accept:"image/*",onChange:e=>{const a=e.target.files[0];a&&(y(a),w(URL.createObjectURL(a)))},type:"file",name:"coverPicture",id:"coverPicture",style:{display:"none"}})]}),N||(null===l||void 0===l?void 0:l.coverPicture)&&(0,x.jsx)("img",{src:N||l.coverPicture,className:"w-full h-full object-cover  ",alt:"avatar"})]}),(0,x.jsxs)("div",{className:"",children:[(0,x.jsx)("label",{htmlFor:"profilePicture",className:"absolute top-[25%] left-5 h-32 w-32 border-2 rounded-full overflow-hidden cursor-pointer",children:(0,x.jsx)("img",{className:"h-full w-full object-cover ",src:v||l.profilePicturePath||u,alt:"profile"})}),(0,x.jsx)("input",{accept:"image/*",onChange:e=>{const a=e.target.files[0];a&&(g(a),h(URL.createObjectURL(a)))},type:"file",name:"profilePicture",id:"profilePicture",style:{display:"none"}})]}),(0,x.jsxs)("div",{className:"flex flex-col gap-3 p-5  mt-16",children:[(0,x.jsx)(p.A,{id:"standard-basic",label:"Name",variant:"outlined",name:"name",onChange:e=>C(e.target.value),value:P}),(0,x.jsx)(p.A,{id:"outlined-basic",label:"Bio",name:"bio",onChange:e=>k(e.target.value),value:S,multiline:!0,rows:4,variant:"outlined"}),(0,x.jsx)(p.A,{id:"outlined-basic",label:"Location",name:"from",onChange:e=>R(e.target.value),value:U,variant:"outlined"})]})]})]})})})}}}]);
//# sourceMappingURL=225.2fccd700.chunk.js.map