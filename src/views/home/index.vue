<template>
  <!-- <div>
    <input type="text" v-model="phone" />
    <button @click="captchaGet">获取验证码</button>
    <br />
    <input type="text" v-model="captcha" />
    <button @click="captchaLogin">登录</button>
  </div> -->
  <div id="qr">
    <!-- <button @click="qrGetkey">获取二维码</button>
    <img :src="url" alt="二维码" /> -->
    <img src="https://picgoxl.oss-cn-beijing.aliyuncs.com/img/m.png" alt="" />
    <div id="qrImg">
      <p>扫码登录</p>
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="image" class="Img" />
        </template>
        <template #default>
            <img :src="url" class="Img" />
        </template>
      </el-skeleton>
      <div id="other">选择其他登录方式</div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
import { reactive, toRefs, onBeforeMount } from "vue";
export default {
  name: "home",
  setup() {
    let Captcha = reactive({
      phone: "",
      captcha: "",
      loading: true,
      captchaGet() {
        api.captchaGet(Number(this.phone));
      },
      captchaVerify() {
        return api
          .captchaVerify(Number(this.phone), Number(this.captcha))
          .then((res) => {
            console.log(res.data);
            return res.data;
          });
      },
      async captchaLogin() {
        let res = await this.captchaVerify();
        if (res) {
          api
            .captchaLogin(Number(this.phone), "2222", Number(this.captcha))
            .then((res) => {
              console.log(res);
            });
        }
      },
    });
    let qr = reactive({
      url: "",
      key: "",
      qrGetkey() {
        api.qrGetkey().then((res) => {
          this.key = res.data.unikey;
          console.log("res:",res);
          api.qrCreate(this.key).then((data) => {
            // console.log(data);
            this.url = data.data.qrimg;
            Captcha.loading = false;
            this.checkQr();
          });
        });
      },
      checkQr() {
        let timer = setInterval(() => {
          api.qrCheck(this.key).then((res) => {
            console.log(res);
            if (res.code === 803) {
              clearInterval(timer);
              message.loginStatusGet();
            }
          });
        }, 5000);
      },
    });
    let message = reactive({
      id: 0,
      loginStatusGet() {
        api.loginStatusGet().then((d) => {
          this.id = d.data.account.id;
          api.userDetialGet(this.id).then((res) => {
            console.log(res);
          });
        });
      },
    });
    onBeforeMount(() => {
      qr.qrGetkey();
      api.mvGet().then(res=>{
        console.log("mv:",res)
      })
    });
    return { ...toRefs(Captcha), ...toRefs(qr) };
  }
};
</script>

<style>
input {
  width: 200px;
  height: 25px;
}
#qr {
  margin: 50px 0 0 100px;
  display: flex;
}
#qrImg {
  width: 60%;
  padding-top: 25px;
  text-align: center;
  /* letter-spacing: 10px; */
  font-size: 25px;
  color: rgb(163, 24, 163);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
#qrImg .el-skeleton{
  display:flex;
  justify-content: center;
}
#qrImg .Img {
  display: block;
  width: 250px;
  height: 250px;
}
#other{
  font-size:18px;
  padding:10px;
  border-radius: 30px;
  border:2px solid purple;
}
#other:hover{
  cursor:pointer;
}
</style>