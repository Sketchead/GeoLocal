"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5631],{5631:(T,D,s)=>{s.r(D),s.d(D,{DatosClientePageModule:()=>E});var g=s(9808),n=s(4182),u=s(7590),h=s(7733),f=s(655),_=s(7323),y=s(3562),t=s(2096),v=s(2468),C=s(7556),i=s(2425),e=s(4068);function o(l,x){if(1&l){const r=t.EpF();t.TgZ(0,"div",5)(1,"div",6)(2,"label"),t._uU(3,"NOMBRE(S)"),t.qZA(),t.TgZ(4,"input",7),t.NdJ("ngModelChange",function(c){t.CHM(r);const p=t.oxw();return t.KtG(p.name=c)}),t.qZA()(),t.TgZ(5,"div",6)(6,"label"),t._uU(7,"NOMBRE USUARIO"),t.qZA(),t.TgZ(8,"input",8),t.NdJ("ngModelChange",function(c){t.CHM(r);const p=t.oxw();return t.KtG(p.username=c)}),t.qZA()(),t.TgZ(9,"div",6)(10,"label"),t._uU(11,"APELLIDO PATERNO"),t.qZA(),t.TgZ(12,"input",9),t.NdJ("ngModelChange",function(c){t.CHM(r);const p=t.oxw();return t.KtG(p.firstLastname=c)}),t.qZA()(),t.TgZ(13,"div",6)(14,"label"),t._uU(15,"APELLIDO MATERNO"),t.qZA(),t.TgZ(16,"input",10),t.NdJ("ngModelChange",function(c){t.CHM(r);const p=t.oxw();return t.KtG(p.secondLastname=c)}),t.qZA()(),t.TgZ(17,"button",11),t._uU(18,"CONFIRMAR"),t.qZA()()}if(2&l){const r=t.oxw();t.xp6(4),t.Q6J("ngModel",r.name),t.xp6(4),t.Q6J("ngModel",r.username),t.xp6(4),t.Q6J("ngModel",r.firstLastname),t.xp6(4),t.Q6J("ngModel",r.secondLastname)}}function a(l,x){if(1&l){const r=t.EpF();t.TgZ(0,"div",5)(1,"div",6)(2,"label"),t._uU(3,"NOMBRE(S)"),t.qZA(),t.TgZ(4,"input",7),t.NdJ("ngModelChange",function(c){t.CHM(r);const p=t.oxw();return t.KtG(p.name=c)}),t.qZA()(),t.TgZ(5,"div",6)(6,"label"),t._uU(7,"NOMBRE LOCAL"),t.qZA(),t.TgZ(8,"input",12),t.NdJ("ngModelChange",function(c){t.CHM(r);const p=t.oxw();return t.KtG(p.resname=c)}),t.qZA()(),t.TgZ(9,"div",6)(10,"label"),t._uU(11,"UBICACION"),t.qZA(),t.TgZ(12,"button",13),t.NdJ("click",function(){t.CHM(r);const c=t.oxw();return t.KtG(c.ubicacion())}),t._uU(13,"SELECCIONAR"),t.qZA()(),t.TgZ(14,"button",14),t.NdJ("click",function(){t.CHM(r);const c=t.oxw();return t.KtG(c.updateConfirmation())}),t._uU(15,"CONFIRMAR"),t.qZA()()}if(2&l){const r=t.oxw();t.xp6(4),t.Q6J("ngModel",r.name),t.xp6(4),t.Q6J("ngModel",r.resname)}}const P=[{path:"",component:(()=>{class l{constructor(r,d,c,p,U,b,R,L,A){this.dataservice=r,this.router=d,this.loadingController=c,this.auth=p,this.a=U,this.alertController=b,this.firestore=R,this.clientService=L,this.restaurantService=A,this.userLogged=null,this.userType=null;const J=(0,_.v0)();(0,_.Aj)(J,Z=>(0,f.mG)(this,void 0,void 0,function*(){if(Z){this.userLogged=this.auth.currentUser.uid;const I=(0,y.JU)(this.firestore,`users/${this.auth.currentUser.uid}`);yield(0,y.QT)(I).then(O=>(0,f.mG)(this,void 0,void 0,function*(){this.userType=yield O.data().client.type,console.log(this.userType),"client"==this.userType?(this.name=yield O.data().client.name,this.username=yield O.data().client.username,this.firstLastname=yield O.data().client.firstLastname,this.secondLastname=yield O.data().client.secondLastname):"restaurant"==this.userType&&(this.name=yield O.data().client.name,this.resname=yield O.data().client.username)}))}}))}ngOnInit(){}editClient(r){return(0,f.mG)(this,void 0,void 0,function*(){if(r){const d=yield this.loadingController.create();yield d.present(),"client"==this.userType?(this.client={user:this.auth.currentUser.uid,email:this.auth.currentUser.email,name:this.name,username:this.username,firstLastname:this.firstLastname,secondLastname:this.secondLastname,type:"client"},yield this.clientService.editClient(this.client)):(this.rest={user:this.auth.currentUser.uid,email:this.auth.currentUser.email,name:this.name,username:this.resname,latitude:this.restaurantService.latitude,longitude:this.restaurantService.longitude,type:"restaurant"},yield this.restaurantService.editRes(this.rest)),yield d.dismiss(),this.Done("Editado exitoso","Tu perfil se ha modificado con exito"),yield this.router.navigateByUrl("/app/profile",{replaceUrl:!0})}})}type(){let r="";return r=this.userType,r}back(){this.router.navigateByUrl("/app/profile",{replaceUrl:!0})}updateConfirmation(){return(0,f.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({header:"\xbfEstas seguro?",message:"Este cambio sera visible para los demas usuarios",cssClass:"custom-alert",buttons:[{text:"No",handler:()=>this.editClient(!1)},{text:"Si",handler:()=>this.editClient(!0)}]})).present()})}Done(r,d){return(0,f.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({header:r,message:d,buttons:["OK"]})).present()})}ubicacion(){this.router.navigateByUrl("ubicationr",{replaceUrl:!0}),this.restaurantService.uso=1}}return l.\u0275fac=function(r){return new(r||l)(t.Y36(v.D),t.Y36(h.F0),t.Y36(u.HT),t.Y36(_.gx),t.Y36(C.e),t.Y36(u.Br),t.Y36(y.gg),t.Y36(i.y),t.Y36(e.T))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-datos-cliente"]],decls:9,vars:2,consts:[["id","container"],[1,"header"],[3,"click"],["ngNativeValidate",""],["class","formulario",4,"ngIf"],[1,"formulario"],[1,"campo"],["type","text","id","nombre","name","name","required","",3,"ngModel","ngModelChange"],["type","text","id","username","name","username","required","",3,"ngModel","ngModelChange"],["type","text","id","pLastname","name","pLastname","required","",3,"ngModel","ngModelChange"],["type","text","id","mLastname","name","mLastname","required","",3,"ngModel","ngModelChange"],["id","botonRegistro","type","submit"],["type","text","id","resname","name","resname","required","",3,"ngModel","ngModelChange"],["id","botonUbicacion",3,"click"],["id","botonRegistro","type","submit",3,"click"]],template:function(r,d){1&r&&(t.TgZ(0,"ion-content")(1,"div",0)(2,"div",1)(3,"ion-back-button",2),t.NdJ("click",function(){return d.back()}),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5,"Editar perfil"),t.qZA()(),t.TgZ(6,"form",3),t.YNc(7,o,19,4,"div",4),t.YNc(8,a,16,2,"div",4),t.qZA()()()),2&r&&(t.xp6(7),t.Q6J("ngIf","client"==d.type()),t.xp6(1),t.Q6J("ngIf","restaurant"==d.type()))},dependencies:[g.O5,n.Fj,n.JJ,n.JL,n.Q7,n.On,n.F,u.oU,u.W2,u.wd,u.cs],styles:['#container[_ngcontent-%COMP%]{text-align:center;position:relative;height:100vh}#container[_ngcontent-%COMP%]:before{content:"";background:url(/assets/images/fondoInicio.jpg);height:100%;background-position:center;background-repeat:no-repeat;background-size:cover;opacity:.3;position:absolute;inset:0;z-index:-1}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}#logo[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;width:60%}.formulario[_ngcontent-%COMP%]{display:block;position:relative;padding-top:30px}.formulario[_ngcontent-%COMP%]   .campo[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{position:absolute;margin:5px;color:#ea7622;font-weight:700;font-size:15px}.formulario[_ngcontent-%COMP%]   .campo[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:35px 5px 10px;width:80%;border:none;font-size:15px;border-bottom:2px solid #EA7622;padding-bottom:5px;background-color:#00000003}#botonRegistro[_ngcontent-%COMP%]{margin:15px;width:80%;border-radius:20px;font-size:25x;color:#000;background-color:#fff;border:1px solid #EA7622;font-weight:bolder;padding-top:7px;padding-bottom:7px}ion-back-button[_ngcontent-%COMP%]{display:inline-block;width:10%}ion-title[_ngcontent-%COMP%]{text-align:start;display:inline-block;width:80%}#botonUbicacion[_ngcontent-%COMP%]{margin:35px 5px 5px;width:80%;border-radius:20px;font-size:25;color:#fff;background-color:#ea7622;font-weight:bolder;padding-top:7px;padding-bottom:7px}']}),l})()}];let M=(()=>{class l{}return l.\u0275fac=function(r){return new(r||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[h.Bz.forChild(P),h.Bz]}),l})(),E=(()=>{class l{}return l.\u0275fac=function(r){return new(r||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[g.ez,n.u5,u.Pc,M]}),l})()},7556:(T,D,s)=>{s.d(D,{e:()=>v});var g=s(655),n=s(7323),u=s(8304),h=s(7311),f=s(2731),_=s(5070),y=s(3562),t=s(2096);let v=(()=>{class C{constructor(e,o){this.auth=e,this.firestore=o}register({email:e,password:o}){return(0,g.mG)(this,void 0,void 0,function*(){try{return yield(0,_.Xb)(this.auth,e,o)}catch(a){return null}})}googleregister(){return(0,g.mG)(this,void 0,void 0,function*(){try{const e=(0,n.v0)(),o=new u.hJ;yield(0,u.F6)(e,o)}catch(e){return null}})}facebookregister(){return(0,g.mG)(this,void 0,void 0,function*(){try{const e=(0,n.v0)(),o=new u._O;yield(0,u.F6)(e,o)}catch(e){return null}})}hasSetup(){return(0,g.mG)(this,void 0,void 0,function*(){const o=(0,n.v0)().currentUser.uid,a=(0,f.hJ)(this.firestore,"users");return(0,f.IO)((0,f.hJ)(a,"users"),(0,f.ar)("user","==",o))?(console.log("false"),()=>(0,h.Y_)(["/app/home"])):()=>(0,h.Y_)(["/user-type"])})}login({email:e,password:o}){return(0,g.mG)(this,void 0,void 0,function*(){try{return yield(0,n.e5)(this.auth,e,o)}catch(a){return console.log("error Login: "+a),a}})}googleLogin(){return(0,g.mG)(this,void 0,void 0,function*(){try{const e=(0,n.v0)(),o=new u.hJ;yield(0,u.F6)(e,o)}catch(e){return null}})}facebookLogin(){return(0,g.mG)(this,void 0,void 0,function*(){try{const e=(0,n.v0)(),o=new u._O;yield(0,u.F6)(e,o)}catch(e){return null}})}logout(){return(0,_.w7)(this.auth)}getUserType(e){return(0,g.mG)(this,void 0,void 0,function*(){const o=(0,y.JU)(this.firestore,`users/${e}`);let a=null;(0,y.QT)(o).then(m=>(console.log(m.data(),m.id),a=m.data(),a.type))})}}return C.\u0275fac=function(e){return new(e||C)(t.LFG(n.gx),t.LFG(y.gg))},C.\u0275prov=t.Yz7({token:C,factory:C.\u0275fac,providedIn:"root"}),C})()},2468:(T,D,s)=>{s.d(D,{D:()=>t});var g=s(655),n=s(3562),u=s(6180),h=s(6961),f=s(5525),_=s(2096),y=s(7323);let t=(()=>{class v{constructor(i,e,o){this.firestore=i,this.auth=e,this.storage=o}getPosts(){const i=(0,n.hJ)(this.firestore,"posts");return(0,n.BS)(i,{idField:"id"})}getUsers(){const i=(0,n.hJ)(this.firestore,"posts");return(0,n.BS)(i,{idField:"id"})}getProfiles(){const i=(0,n.hJ)(this.firestore,"users");return(0,n.BS)(i,{idField:"user"})}getPostById(i){let e;const o=(0,n.JU)(this.firestore,`posts/${i}`);let a=(0,n._1)(o,{idField:"id"});return e.author=a.author,e.id=a.id,e.images=a.images,e.pos=a.pos,e.positive=a.positive,e.text=a.text,e.title=a.title,e}addPost(i){const e=(0,n.hJ)(this.firestore,"posts");return(0,n.ET)(e,i)}addPostGetId(i){const e=(0,n.hJ)(this.firestore,"posts");return(0,n.ET)(e,i).then(a=>(console.log(a.id),a.id))}deletePost(i){const e=(0,n.JU)(this.firestore,`posts/${i.id}`);return(0,n.oe)(e)}deleteImage(i){for(let o=0;o<i.images.length;o++)console.log(i.images[o])}updatePost(i){const e=(0,n.JU)(this.firestore,`posts/${i.id}`);return(0,n.r7)(e,{title:i.title,text:i.text,positive:i.positive})}uploadPhoto(i){return(0,g.mG)(this,void 0,void 0,function*(){let e;const P=(0,u.iH)(this.storage,`uploads/${this.auth.currentUser.uid}/photo.png`);try{yield(0,h.sf)(P,i.base64String,"base64"),e=[yield(0,h.Jt)(P)];const E=(0,n.JU)(this.firestore,"posts/bvSZeSKsuk6Ea95M6ytv");return yield(0,f.pl)(E,{images:e}),!0}catch(M){return console.log(M),null}})}uploadPhotoWId(i,e){return(0,g.mG)(this,void 0,void 0,function*(){let o;const m=e,M=(0,u.iH)(this.storage,`uploads/${this.auth.currentUser.uid}/${m}/photo.png`);try{yield(0,h.sf)(M,i.base64String,"base64"),o=[yield(0,h.Jt)(M)];const l=(0,n.JU)(this.firestore,`posts/${m}`);return yield(0,n.r7)(l,{images:o}),!0}catch(E){return console.log(E),null}})}getImagesArray(i){return(0,g.mG)(this,void 0,void 0,function*(){let e;const P=(0,u.iH)(this.storage,`uploads/${this.auth.currentUser.uid}/photo.png`);try{return yield(0,h.sf)(P,i.base64String,"base64"),e=[yield(0,h.Jt)(P)],e}catch(M){return console.log(M),null}})}getDoc(i){return(0,g.mG)(this,void 0,void 0,function*(){const e=(0,n.JU)(this.firestore,`posts/${i}`);let o=null;(0,n.QT)(e).then(a=>(console.log(a.data(),a.id),o=a.data(),o))})}}return v.\u0275fac=function(i){return new(i||v)(_.LFG(n.gg),_.LFG(y.gx),_.LFG(u.Ke))},v.\u0275prov=_.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"}),v})()}}]);