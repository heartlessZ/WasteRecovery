<template>
  <section id="contact" class="section" data-stellar-background-ratio="-0.2">
    <div class="contact-form">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-sm-6 col-xs-12">
            <div class="contact-us">
              <h3>{{$t('Contact.title')}}</h3>
              <div class="contact-address">
                <!-- <p>Centerville Road, DE 19808, US </p> -->
                <p class="phone">
                  {{$t('Contact.phone')}}:
                  <span>{{contact.phone}}</span>
                </p>
                <p class="email">
                  {{$t('Contact.email')}}:
                  <span>{{contact.email}}</span>
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
                      :placeholder="$t('Contact.Tips')"
                      rows="8"
                      v-model="info.describe"
                      data-error="Write your message"
                      required
                    ></textarea>
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="submit-button text-center">
                    <button class="btn btn-common" type="default" @click="sendIdea">{{$t('Contact.Submission')}}</button>
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
import request from '../../utils/request'
export default {
  name: "contact",
  data() {
    return {
      info: {
        describe: "",
        email: "",
        phone: ""
      },
      contact: {
        phone:'',
        email:''
      },
    };
  },
  methods: {
    getPhone () {
      request.get('/setting/get' + '?vkey=phone').then(res => {
        if (res.status) {
          this.contact.phone = res.data.vvalue;
        }
      })
    },
    getemail () {
      request.get('/setting/get' + '?vkey=email').then(res => {
        if (res.status) {
          this.contact.email = res.data.vvalue;
        }
      })
    },
    sendIdea() {
      if (this.info.describe.trim() == "") {
        this.$message({
          type: "error",
          offset: 70,
          center: true,
          message: this.$t('Contact.Tips')
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
            message: res.msg
          });
          this.info.describe = ''
        }
      });
    }
  },
  mounted () {
    this.getPhone();
    this.getemail();
  },
};
</script>
