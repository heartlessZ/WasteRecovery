webpackJsonp([1],{Gn3T:function(e,t){},"hwf/":function(e,t){},j0Wa:function(e,t){},kZki:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("wjrB"),a={name:"identity-certificate",data:function(){return{limit:2,ruleForm:{realName:"",idCard:"",urls:[]},rules:{realName:[{required:!0,message:"请输入真实姓名",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}],idCard:[{required:!0,message:"请输入身份证号码",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){return!!e&&(t.ruleForm.urls.length<2?(t.$message({type:"error",offset:70,center:!0,message:"请上传身份证正反面照片"}),!1):void t.$emit("nextstep",t.ruleForm))})},getImageUrl:function(e){this.ruleForm.urls=e}},components:{UploadImg:i.a}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"identity-card"}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"真实姓名",prop:"realName"}},[r("el-input",{model:{value:e.ruleForm.realName,callback:function(t){e.$set(e.ruleForm,"realName",t)},expression:"ruleForm.realName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"身份证号",prop:"idCard"}},[r("el-input",{model:{value:e.ruleForm.idCard,callback:function(t){e.$set(e.ruleForm,"idCard",t)},expression:"ruleForm.idCard"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"身份证正反面照片",required:""}},[r("upload-img",{attrs:{limit:e.limit},on:{getimageurl:e.getImageUrl}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],1)],1)},staticRenderFns:[]};var l=r("VU/8")(a,s,!1,function(e){r("Gn3T")},"data-v-10c77ab4",null).exports,n={name:"business-info",data:function(){return{limit:1,ruleForm:{businessName:"",creditCode:"",urls:""},rules:{businessName:[{required:!0,message:"请输入营业执照名",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}],creditCode:[{required:!0,message:"请输入信用代码",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){return!!e&&(t.ruleForm.urls.length<2?(t.$message({type:"error",offset:70,center:!0,message:"请上传营业执照照片"}),!1):void t.$emit("submitapply",t.ruleForm))})},getImageUrl:function(e){this.ruleForm.urls=e[0]},previous:function(){this.$emit("previous")}},components:{UploadImg:i.a}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"identity-card"}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"营业执照名",prop:"businessName"}},[r("el-input",{model:{value:e.ruleForm.businessName,callback:function(t){e.$set(e.ruleForm,"businessName",t)},expression:"ruleForm.businessName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"信用代码",prop:"creditCode"}},[r("el-input",{model:{value:e.ruleForm.creditCode,callback:function(t){e.$set(e.ruleForm,"creditCode",t)},expression:"ruleForm.creditCode"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"营业执照图片",required:""}},[r("upload-img",{attrs:{limit:e.limit},on:{getimageurl:e.getImageUrl}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("下一步")])],1)],1)],1)},staticRenderFns:[]};var m=r("VU/8")(n,o,!1,function(e){r("hwf/")},"data-v-66099245",null).exports,u=r("vMJZ"),d={name:"join-us",data:function(){return{active:0,isInputed:!1,loading:!1,backStorageUrl:"",applyForm:{businessLicense:"",businessName:"",cardBack:"",cardName:"",cardPositive:"",creditCode:"",idCard:"",address:"",lat:"",lng:""}}},components:{IdentityCertificate:l,BusinessInfo:m,Amap:r("Hnt4").a},methods:{addressValidate:function(){this.applyForm.address?this.active++:this.$message({type:"error",offset:70,center:!0,message:"请选择地址"})},nextStep:function(e){this.applyForm.cardName=e.realName,this.applyForm.idCard=e.idCard,this.applyForm.cardPositive=e.urls[0],this.applyForm.cardBack=e.urls[1],this.active++},previous:function(){this.active--},submitApply:function(e){var t=this;this.applyForm.businessName=e.businessName,this.applyForm.creditCode=e.creditCode,this.applyForm.businessLicense=e.urls,this.regionId=this.$store.getters.userInfo.regionId,Object(u.l)(this.applyForm).then(function(e){t.active++})},getPosition:function(e,t){this.applyForm.address=e,this.applyForm.lng=String(t.lng),this.applyForm.lat=String(t.lat)}},mounted:function(){var e=this;this.loading=!0,Object(u.m)().then(function(t){t.status&&t.data&&(e.isInputed=!0,e.active=3,1==t.data.state&&(e.active=4,e.$store.getters.config.forEach(function(t){"backStorageUrl"==t.vkey&&(e.backStorageUrl=t.vvalue)}))),e.loading=!1})}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"userInfo"}},[r("div",{staticClass:"title"},[e._v("商家入驻")]),e._v(" "),r("el-divider",{staticClass:"line-style"}),e._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"contain"},[r("el-steps",{attrs:{active:e.active,"finish-status":"success","align-center":""}},[r("el-step",{attrs:{title:"地址信息"}}),e._v(" "),r("el-step",{attrs:{title:"上传身份证明"}}),e._v(" "),r("el-step",{attrs:{title:"营业执照"}}),e._v(" "),r("el-step",{attrs:{title:"申请成功，等待审核"}}),e._v(" "),r("el-step",{attrs:{title:"审核通过"}})],1),e._v(" "),r("div",[0===e.active?r("div",{staticClass:"form-card"},[r("amap",{on:{getposition:e.getPosition}}),e._v(" "),r("div",[r("el-button",{attrs:{type:"primary"},on:{click:e.addressValidate}},[e._v("下一步")])],1)],1):e._e(),e._v(" "),1===e.active?r("div",{staticClass:"form-card"},[r("identity-certificate",{on:{nextstep:e.nextStep}})],1):2===e.active?r("div",{staticClass:"form-card"},[r("business-info",{on:{submitapply:e.submitApply,previous:e.previous}})],1):3===e.active?r("div",{staticClass:"form-card"},[r("div",{staticStyle:{width:"40%",margin:"auto",height:"100px","text-align":"center","font-size":"1.1rem"}},[e._v("提交申请成功，请等待管理员审核，审核结果将在三个工作日内通过短信下发至您的手机")])]):4===e.active?r("div",{staticClass:"form-card"},[r("div",{staticStyle:{width:"40%",margin:"auto",height:"100px","text-align":"center","font-size":"1.1rem"}},[r("el-link",{attrs:{type:"primary",href:e.backStorageUrl,target:"_blank"}},[e._v("进入后台")])],1)]):e._e()])],1)],1)},staticRenderFns:[]};var p=r("VU/8")(d,c,!1,function(e){r("j0Wa")},"data-v-3aba8dac",null);t.default=p.exports}});
//# sourceMappingURL=1.9d432867fba6e478e31a.js.map