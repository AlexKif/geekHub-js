(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{152:function(e,t,a){},153:function(e,t,a){},243:function(e,t,a){},244:function(e,t,a){},245:function(e,t,a){},247:function(e,t,a){},250:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(17),r=a.n(c),i=(a(152),a(16)),o=(a(153),a(253)),l=a(254),u=a(47),d=a(61),m=a(37),f=a.n(m),h=a(147),j=function(e){h.a.success({message:"Success",description:e})},p=a(29),b=Object(p.a)();f.a.interceptors.response.use((function(e){return e}),(function(e){var t;return e.response&&(400===e.response.status&&(t=e.response.data.message,h.a.error({message:"Error",description:t})),403===e.response.status&&(localStorage.removeItem("token"),b.push("/login"))),Promise.reject(e.response)}));var g={baseUrl:"http://localhost:8080",registration:function(e,t){return f()({method:"post",url:"".concat(this.baseUrl,"/registration"),data:{email:e,password:t}})},login:function(e,t,a){return f()({method:"post",url:"".concat(this.baseUrl,"/login"),data:{email:e,password:t,remember:a}})},createFolder:function(e,t){var a=localStorage.getItem("token");return f()({method:"post",url:"".concat(this.baseUrl,"/file-manager/folder"),data:{folderName:e},params:{path:t},headers:{Authorization:"Bearer ".concat(a)}})},getFilesByPath:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=localStorage.getItem("token");return f()({method:"get",url:"".concat(this.baseUrl,"/file-manager/files"),params:{path:e},headers:{Authorization:"Bearer ".concat(t)}})},uploadFile:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=localStorage.getItem("token");return f()({method:"post",url:"".concat(this.baseUrl,"/file-manager/files"),data:e,headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(a)},params:{path:t}})},downloadFile:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=localStorage.getItem("token");return f()({method:"get",url:"".concat(this.baseUrl,"/file-manager/download/").concat(e),headers:{Authorization:"Bearer ".concat(a)},params:{path:t}})},deleteItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=localStorage.getItem("token");return f()({method:"get",url:"".concat(this.baseUrl,"/file-manager/delete/").concat(e),headers:{Authorization:"Bearer ".concat(a)},params:{path:t}})},moveItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3?arguments[3]:void 0,s=localStorage.getItem("token");return f()({method:"get",url:"".concat(this.baseUrl,"/file-manager/").concat(n,"/").concat(e),headers:{Authorization:"Bearer ".concat(s)},params:{from:t,to:a}})},renameItem:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a=arguments.length>2?arguments[2]:void 0;console.log(e,t,a);var n=localStorage.getItem("token");return f()({method:"post",url:"".concat(this.baseUrl,"/file-manager/rename/").concat(t),headers:{Authorization:"Bearer ".concat(n)},data:{newName:a},params:{path:e}})}},O=a(4),v=function(){var e=Object(i.f)(),t=Object(n.useCallback)((function(t){g.registration(t.email,t.password).then((function(t){200===t.status&&(j("You have successfully registered"),localStorage.setItem("token",t.data.token),e.push("/file-manager"))}))}),[]);return Object(n.useEffect)((function(){localStorage.getItem("token")&&e.push("/file-manager")}),[]),Object(O.jsx)("div",{className:"sing sign-up",children:Object(O.jsxs)("div",{className:"sing-wrapper",children:[Object(O.jsx)("h2",{children:"Registration"}),Object(O.jsxs)(o.a,{name:"basic",initialValues:{remember:!0},onFinish:t,children:[Object(O.jsx)(o.a.Item,{label:"Email",name:"email",hasFeedback:!0,rules:[{required:!0,message:"Please input your email!"},{type:"email",message:"Please enter valid email!"}],children:Object(O.jsx)(l.a,{})}),Object(O.jsx)(o.a.Item,{name:"password",label:"Password",rules:[{required:!0,message:"Please input your password!"},{min:8,message:"Minimum password length 8 characters!"}],hasFeedback:!0,children:Object(O.jsx)(l.a.Password,{})}),Object(O.jsx)(o.a.Item,{name:"confirm",label:"Confirm Password",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Please confirm your password!"},function(e){var t=e.getFieldValue;return{validator:function(e,a){return a&&t("password")!==a?a.length<8?Promise.reject(new Error("Minimum password length 8 characters!")):Promise.reject(new Error("The two passwords that you entered do not match!")):Promise.resolve()}}}],children:Object(O.jsx)(l.a.Password,{})}),Object(O.jsx)(o.a.Item,{children:Object(O.jsx)(u.a,{type:"primary",htmlType:"submit",children:"Submit"})}),Object(O.jsxs)("p",{className:"sing-question",children:["Have account? ",Object(O.jsx)(d.a,{to:"/login",children:"Sign In to your account"})]})]})]})})},x=(a(243),a(256)),w=function(){var e=Object(i.f)(),t=Object(n.useCallback)((function(t){g.login(t.email,t.password,t.remember).then((function(t){200===t.status&&(localStorage.setItem("token",t.data.token),e.push("/file-manager"))}))}),[]);return Object(n.useEffect)((function(){localStorage.getItem("token")&&e.push("/file-manager")}),[]),Object(O.jsx)("div",{className:"sing sign-in",children:Object(O.jsxs)("div",{className:"sing-wrapper",children:[Object(O.jsx)("h2",{children:"Sign in"}),Object(O.jsxs)(o.a,{name:"basic",initialValues:{remember:!0},onFinish:t,children:[Object(O.jsx)(o.a.Item,{label:"Email",name:"email",hasFeedback:!0,rules:[{required:!0,message:"Please input your email!"},{type:"email",message:"Please enter valid email!"}],children:Object(O.jsx)(l.a,{})}),Object(O.jsx)(o.a.Item,{label:"Password",name:"password",hasFeedback:!0,rules:[{required:!0,message:"Please input your password!"},{min:8,message:"Minimum password length 8 characters"}],children:Object(O.jsx)(l.a.Password,{})}),Object(O.jsx)(o.a.Item,{name:"remember",valuePropName:"checked",children:Object(O.jsx)(x.a,{children:"Remember me"})}),Object(O.jsx)(o.a.Item,{children:Object(O.jsx)(u.a,{type:"primary",htmlType:"submit",children:"Submit"})}),Object(O.jsxs)("p",{className:"sing-question",children:["Not registered? ",Object(O.jsx)(d.a,{to:"/registration",children:"Create an account"})]})]})]})})},y=a(60),k=a(26),I=(a(244),a(245),a(66)),C=function(e){return Object(O.jsx)(I.b,{id:"\ud83e\udd23",children:e.items.map((function(t,a){return Object(O.jsx)(I.a,{onClick:e.onChange,id:t.toLowerCase().replace(" ",""),children:t},a)}))})},F=(a(246),a(247),a(36)),S=a(257),P=a(258);function _(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0===e)return"0 Bytes";var a=1024,n=t<0?0:t,s=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],c=Math.floor(Math.log(e)/Math.log(a));return parseFloat((e/Math.pow(a,c)).toFixed(n))+" "+s[c]}var B=function(e){var t=Object(F.c)((function(e){return e.fileManager})),a=t.files,s=t.path,c=Object(n.useState)(!1),r=Object(k.a)(c,2),i=r[0],o=r[1],l=Object(n.useState)({}),u=Object(k.a)(l,2),d=u[0],m=u[1],f=Object(n.useState)(!1),h=Object(k.a)(f,2),j=h[0],p=h[1],b=function(){o(!1)};return Object(O.jsxs)(O.Fragment,{children:[s.length?Object(O.jsx)("span",{onDoubleClick:e.goBack,className:"go-back-path",title:"go back",children:"..."}):null,Object(O.jsx)("ul",{className:"files-list",children:null===a||void 0===a?void 0:a.map((function(t,a){var n=t.name.split(".").pop(),c="file"===t.type&&("pdf"===n||"doc"===n||"docx"===n||"png"===n||"jpg"===n||"mp3"===n||"wav"===n);return"folder"===t.type?Object(O.jsxs)("li",{title:"Double click to open",className:"files-list__item",onContextMenuCapture:function(){return e.listContextHandler(t)},onDoubleClick:function(a){return e.listDbClickHandler(a,t)},children:[Object(O.jsx)(S.a,{}),Object(O.jsx)("span",{className:"files-list__folder",children:t.name})]},a):Object(O.jsxs)("li",{title:"Double click to download",className:"files-list__item",onContextMenuCapture:function(){return e.listContextHandler(t)},onDoubleClick:function(a){return e.listDbClickHandler(a,t)},children:[c?Object(O.jsx)("span",{className:"files-list__format",children:t.name.split(".").pop()}):Object(O.jsx)(P.a,{}),Object(O.jsxs)("span",{className:"files-list__file",onMouseEnter:function(){return function(e){m({});var t=e.name.split(".").pop();j||"file"!==e.type||"png"!==t&&"jpg"!==t||(o(!0),p(!0),g.downloadFile(e.name,s).then((function(t){m({image:t.data.file,id:e.id}),p(!1)})).catch((function(e){p(!1)})))}(t)},onMouseLeave:b,children:[t.name,i&&d.id===t.id&&Object(O.jsx)("span",{className:"files-list__preview",children:Object(O.jsx)("img",{src:"data:image/png;base64,".concat(d.image),alt:"image-preview"})})]}),Object(O.jsx)("span",{className:"files-list__size",children:_(t.size)})]},a)}))})]})},N=a(255),M=a(93),E=Object(M.b)({name:"fileManager",initialState:{files:[],path:[]},reducers:{setFolder:function(e,t){e.files.unshift(t.payload)},setFile:function(e,t){t.payload.length>1?e.files=[].concat(Object(y.a)(e.files),Object(y.a)(t.payload)):e.files.push(t.payload[0])},setFlies:function(e,t){e.files=t.payload},setPath:function(e,t){e.path.push(t.payload)},removeLastPath:function(e,t){e.path.pop()},deleteItem:function(e,t){var a=e.files.findIndex((function(e){return e.id===t.payload.id}));e.files.splice(a,1)},renameItem:function(e,t){var a=e.files.findIndex((function(e){return e.id===t.payload.id}));e.files[a].name=t.payload.name}}}),U=E.actions,D=U.setFolder,z=U.setFile,q=U.setFlies,A=U.setPath,H=U.removeLastPath,T=U.deleteItem,R=U.renameItem,L=E.reducer,V=function(e){var t=Object(n.useState)(""),a=Object(k.a)(t,2),s=a[0],c=a[1],r=Object(F.b)(),i=function(){e.onClose(!1)};return Object(O.jsxs)(N.a,{visible:e.showModal,onOk:function(){g.createFolder(s,e.path).then((function(e){c(""),i(),r(D(e.data))}))},onCancel:i,children:[Object(O.jsx)("h3",{children:"New folder"}),Object(O.jsx)(l.a,{placeholder:"Folder name",onChange:function(e){c(e.target.value)},value:s})]})},J=a(113),Y=function(e){var t=Object(n.useState)(""),a=Object(k.a)(t,2),s=a[0],c=a[1],r=Object(F.b)();Object(n.useEffect)((function(){c(function(e){if(e.name)return"folder"===e.type?e.name:e.name.replace(/\.[^/.]+$/,"")}(e.selectedItem))}),[e.selectedItem]);var i=function(){e.onClose(!1)};return Object(O.jsxs)(N.a,{visible:e.showModal,onOk:function(){var t=e.selectedItem.name.split(".").pop(),a="file"===e.selectedItem.type,n=a?"".concat(s,".").concat(t):s;g.renameItem(e.path,e.selectedItem.name,n).then((function(t){200===t.status&&(i(),r(R(Object(J.a)(Object(J.a)({},e.selectedItem),{},{name:t.data.newName}))),j("".concat(a?"File":"Folder"," was renamed")))}))},onCancel:i,children:[Object(O.jsx)("h3",{children:"Rename"}),Object(O.jsx)(l.a,{placeholder:"Folder name",onChange:function(e){c(e.target.value)},value:s})]})},G=function(){var e=Object(F.b)(),t=Object(F.c)((function(e){return e.fileManager})).path,a=Object(n.useRef)(null),s=Object(n.useState)(null),c=Object(k.a)(s,2),r=c[0],i=c[1],o=Object(n.useState)([]),l=Object(k.a)(o,2),u=l[0],d=l[1],m=Object(n.useState)(["Create folder","Upload file"]),f=Object(k.a)(m,2),h=f[0],p=f[1],b=Object(n.useState)(""),v=Object(k.a)(b,2),x=v[0],w=v[1],S=Object(n.useState)(""),P=Object(k.a)(S,2),_=P[0],N=P[1],M=Object(n.useState)(!1),E=Object(k.a)(M,2),U=E[0],R=E[1],L=Object(n.useState)(!1),J=Object(k.a)(L,2),G=J[0],K=J[1];Object(n.useEffect)((function(){g.getFilesByPath().then((function(t){e(q(t.data.files))}))}),[]);var Z=Object(I.c)({id:"\ud83e\udd23"}).show,$=function(){d(t),i(_)},Q=function(){var a="cut"===x?"cut":"copy";g.moveItem(r.name,u,t,a).then((function(t){i(null);var n="file"===t.data[0].type;e(n?z(t.data):D(t.data[0])),j("".concat(n?"File":"Folder"," was ").concat("cut"===a?"moved":"copied"))}))},W=function(){g.deleteItem(_.name,t).then((function(t){if(200===t.status){e(T(_));var a="file"===_.type;j("".concat(a?"File":"Folder"," was deleted"))}}))};return Object(O.jsxs)("div",{className:"file-manager",children:[Object(O.jsx)("div",{onContextMenu:Z,className:"file-manager__wrapper",onContextMenuCapture:function(e){var t=e.target.className;return p(r&&"files-list__item"!==t&&"files-list__file"!==t&&"files-list__folder"!==t?["Paste"]:"files-list__item"===t||"files-list__file"===t||"files-list__folder"===t?["Copy","Cut","Delete","Rename"]:["Create folder","Upload file"])},children:Object(O.jsx)(B,{listContextHandler:function(e){N(e)},listDbClickHandler:function(a,n){"folder"===n.type?g.getFilesByPath([].concat(Object(y.a)(t),[n.name])).then((function(t){e(q(t.data.files)),e(A(n.name))})):g.downloadFile(n.name,t).then((function(e){var t=document.createElement("a");t.href="data:application/octet-stream;base64,"+e.data.file,t.download=n.name,t.click()}))},goBack:function(){var a=Object(y.a)(t);a.pop(),g.getFilesByPath(a).then((function(t){e(q(t.data.files)),e(H())}))}})}),Object(O.jsx)(C,{items:h,onChange:function(e){var t=e.event;switch(w(t.currentTarget.id),t.currentTarget.id){case"createfolder":R(!0);break;case"uploadfile":a.current.click();break;case"delete":W();break;case"cut":case"copy":$();break;case"paste":Q();break;case"rename":K(!0)}}}),Object(O.jsx)(V,{showModal:U,onClose:R,path:t}),Object(O.jsx)(Y,{selectedItem:_,showModal:G,onClose:K,path:t}),Object(O.jsx)("input",{type:"file",name:"file-uploader",onClick:function(e){e.target.value=null},onChange:function(a){var n=a.target.files,s=new FormData;if(n.length){for(var c=0;c<n.length;c++)s.append("file",n[c]);g.uploadFile(s,t).then((function(t){e(z(t.data.files))}))}},id:"file",multiple:!0,ref:a,style:{display:"none"}})]})},K=function(){return Object(O.jsx)(i.b,{history:b,children:Object(O.jsxs)(i.c,{children:[Object(O.jsx)(i.a,{exact:!0,path:["/login","/"],component:w}),Object(O.jsx)(i.a,{exact:!0,path:"/registration",component:v}),Object(O.jsx)(i.a,{exact:!0,path:"/file-manager",component:G})]})})},Z=(a(249),a(33)),$=Object(Z.c)({fileManager:L}),Q=Object(M.a)({reducer:$});r.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(F.a,{store:Q,children:Object(O.jsx)(K,{})})}),document.getElementById("root"))}},[[250,1,2]]]);
//# sourceMappingURL=main.d454c801.chunk.js.map