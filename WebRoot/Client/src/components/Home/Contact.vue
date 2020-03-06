<template>
  <section id="contact" class="section" data-stellar-background-ratio="-0.2">
    <div class="contact-form">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-sm-6 col-xs-12">
            <div class="contact-us">
              <h3>联系我们</h3>
              <div class="contact-address">
                <!-- <p>Centerville Road, DE 19808, US </p> -->
                <p class="phone">
                  Phone:
                  <span>12345678901</span>
                </p>
                <p class="email">
                  E-mail:
                  <span>66897683@qq.com</span>
                </p>
              </div>
              <div class="social-icons">
                <!-- <ul>
                    <li class="facebook"><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li class="twitter"><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li class="google-plus"><a href="#"><i class="fa fa-google-plus"></i></a></li>
                    <li class="linkedin"><a href="#"><i class="fa fa-linkedin"></i></a></li>
                    <li class="dribbble"><a href="#"><i class="fa fa-dribbble"></i></a></li>
                </ul>-->
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-sm-6 col-xs-12">
            <div class="contact-block">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="message"
                      placeholder="请填写您的宝贵意见"
                      rows="8"
                      v-model="info.describe"
                      data-error="Write your message"
                      required
                    ></textarea>
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="submit-button text-center">
                    <button class="btn btn-common" type="default" @click="sendIdea">发送</button>
                    <div id="msgSubmit" class="h3 text-center hidden"></div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { addContact } from "../../api/user";
export default {
  name: "contact",
  data() {
    return {
      info: {
        describe: "",
        email: "",
        phone: ""
      }
    };
  },
  methods: {
    sendIdea() {
      if (this.info.describe.trim() == "") {
        this.$message({
          type: "error",
          offset: 70,
          center: true,
          message: "请填写您的宝贵意见"
        });
        return false;
      }
      this.info.email = this.$store.getters.userInfo.email
      this.info.phone = this.$store.getters.userInfo.phone
      addContact(this.info).then(res => {
        if (res.status) {
          this.$message({
            type: "success",
            offset: 70,
            center: true,
            message: "提交成功"
          });
          this.info.describe = ''
        }
      });
    }
  }
};
</script>