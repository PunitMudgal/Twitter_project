"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[242],{3772:(e,s,i)=>{i.d(s,{A:()=>d});var l=i(3003),r=(i(287),i(5043)),n=i(6213),o=i(5517),t=i(8529);function d(e){const s=(0,l.wA)(),[i,d]=(0,r.useState)({isLoading:!1,serverError:null});return(0,r.useEffect)((()=>{(async()=>{try{d((e=>({...e,isLoading:!0})));const{data:i,status:l}=await o.S.get(`/user/${e}`);200===l&&(d((e=>({...e,isLoading:!1}))),s((0,t.cr)(i)))}catch(i){d((e=>{var s;return{...e,isLoading:!1,serverError:n.A.isAxiosError(i)?null===(s=i.response)||void 0===s?void 0:s.data:"Unexpected Error"}}))}})()}),[e,s]),[i,d]}},6242:(e,s,i)=>{i.r(s),i.d(s,{default:()=>y});var l=i(1105),r=i(514),n=i(5043),o=i(7196),t=i(3003),d=i(611),a=i(3127),c=i(916),u=i(287),v=i(143),x=(i(9930),i(9392)),f=i(2952),h=i(4163),p=i(1578),m=i(6318),g=i(3216),j=i(579);const w=function(){const{handleUnfollowUser:e}=(0,p.A)(),s=(0,t.wA)(),i=(0,g.Zp)(),l=(0,t.d4)((e=>{var s;return null===(s=e.auth)||void 0===s?void 0:s.user})),w=(0,t.d4)((e=>{var s;return null===(s=e.auth)||void 0===s?void 0:s.currentFollowing})),[b,y]=(0,n.useState)(!1),[N,A]=(0,n.useState)([]),[k,E]=(0,n.useState)(!0),P=async()=>{try{E(!0);const e=await(0,u.X8)();A(e)}catch(e){console.error(e)}finally{E(!1)}};(0,n.useEffect)((()=>{null!==l&&void 0!==l&&l._id&&P()}),[l]),(0,n.useEffect)((()=>{var e;null!==l&&void 0!==l&&null!==(e=l.following)&&void 0!==e&&e.length&&(async()=>{try{const e=await(0,u.x_)(null===l||void 0===l?void 0:l.following);s((0,f.TK)(e))}catch(e){console.error("Error fetching friends:",e)}})()}),[null===l||void 0===l?void 0:l.following]);const _={visible:{transition:{staggerChildren:.2}}},C={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}};return(0,j.jsxs)("div",{className:"col-span-3 flex flex-col gap-4 sticky top-0 overflow-hidden lg:hidden ",children:[(0,j.jsx)("div",{className:"sticky top-0 w-screen h-12 flex bg-black items-center ",children:(0,j.jsx)(h.A,{})}),(0,j.jsxs)("div",{className:"ml-[4%] w-auto flex flex-col gap-4",children:[(0,j.jsxs)("div",{className:"flex flex-col justify-start w-auto border border-purple-700  p-3 rounded-md",children:[(0,j.jsxs)("div",{className:"flex justify-between items-center font-semibold mb-2 text-lg",children:[(0,j.jsx)("p",{children:"Friend Suggestions"}),(0,j.jsx)(o.Ll9,{onClick:()=>{P(),y(!0),setTimeout((()=>{y(!1)}),2e3)},className:`text-3xl p-1 rounded-full hover:bg-gray-800 bg-opacity-50 cursor-pointer ${b?"rotate-90-cw":""} `})]}),k?(0,j.jsx)(v.A,{}):(0,j.jsx)(r.P.div,{className:"friends-list-container",variants:_,initial:"hidden",animate:"visible",children:null===N||void 0===N?void 0:N.map((e=>(0,j.jsx)(r.P.div,{variants:C,whileHover:{scale:1.05},transition:{type:"spring",stiffness:120},children:(0,j.jsx)(x.A,{...e})},e._id)))})]}),(0,j.jsxs)(r.P.div,{className:" border border-purple-700 p-2 rounded-md",variants:_,initial:"hidden",animate:"visible",children:[(0,j.jsxs)("p",{className:"font-semibold mb-2 text-lg",children:["Your Followings"," ",(0,j.jsxs)("span",{className:"text-sm ",children:["(",null===w||void 0===w?void 0:w.length,")"]})," "]}),null===w||void 0===w?void 0:w.slice(0,4).map((n=>(0,j.jsxs)(r.P.div,{className:"flex gap-2 items-center p-2 text-sm font-semibold rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 ",variants:C,whileHover:{scale:1.05},transition:{type:"spring",stiffness:120},children:[(0,j.jsx)(c.A,{profilePhoto:null===n||void 0===n?void 0:n.profilePicturePath,userId:null===n||void 0===n?void 0:n._id}),(0,j.jsxs)("div",{className:"flex flex-col",children:[(0,j.jsxs)("p",{className:"flex gap-1 items-center capitalize",children:[(0,f.zw)(null===n||void 0===n?void 0:n.name),(null===n||void 0===n?void 0:n.isAdmin)&&(0,j.jsx)("img",{src:d,className:"h-4 w-4",alt:"purpletick"})]}),(0,j.jsxs)("p",{className:"text-gray2 text-xs",children:["@",(0,f.zw)(null===n||void 0===n?void 0:n.username)]})]}),(0,j.jsx)("button",{onClick:()=>e(n._id),className:"p-2 px-3 rounded-3xl ml-auto border bg-transparent text-white hover:text-red-600 hover:border-red-600",children:"Unfollow"}),(0,j.jsx)("img",{onClick:()=>{return e=n._id,s((0,m.Fr)({currentUserId:l._id,friendId:e})),void i("/messenger");var e},className:"h-6 w-auto invert ml-auto cursor-pointer",src:a.A,alt:"icon"})]},null===n||void 0===n?void 0:n._id)))]}),(0,j.jsx)("div",{className:"border border-purple-700 p-2 rounded-md",children:"Buy Premium Now"})]})]})};i(3772);var b=i(6348);const y=function(){const e=(0,t.d4)((e=>e.auth.isCheckingAuth)),s=(0,n.useRef)(null);return e?(0,j.jsx)(v.A,{}):(0,j.jsxs)("div",{className:"grid grid-cols-12 h-screen overflow-hidden lg:flex  ",children:[(0,j.jsx)(l.A,{}),(0,j.jsx)("div",{ref:s,className:"flex flex-col flex-grow col-span-5 border-x border-purple-700 h-full overflow-y-auto lg:col-span-7 ",children:(0,j.jsx)(b.m,{centerRef:s,children:(0,j.jsx)(g.sv,{})})}),(0,j.jsx)(w,{})]})}}}]);
//# sourceMappingURL=242.48f40122.chunk.js.map