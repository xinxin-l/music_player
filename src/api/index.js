import {
    get
  } from '../utils/request.js'
  
  const api = {
    captchaLogin(phone,password,captcha){
      return get('/api/login/cellphone',{
        phone,password,captcha
      })
    },
    captchaGet(phone){
      return get('/api/captcha/sent',{
        phone
      })
    },
    captchaVerify(phone,captcha){
      return get('/api/captcha/verify',{
        phone,captcha
      })
    },
    qrGetkey(){
      return get(`/api/login/qr/key?timestamp=${new Date().getTime()}`)
    },
    qrCreate(key){
      return get(`/api/login/qr/create?timestamp=${new Date().getTime()}`,{
        key,qrimg:true
      })
    },
    qrCheck(key){
      return get(`/api/login/qr/check?timestamp=${new Date().getTime()}`,{
        key
      })
    },
    loginStatusGet(){
      return get('/api/login/status')
    },
    userDetialGet(uid){
      return get('/api/user/detail',{
        uid
      })
    },
    userAccountGet(){
      return get('/api/user/account')
    },
    userSubcountGet(){
      return get('/api/user/subcount')
    },
    mvGet(){
      return get('/api/mv/all',{
        area:'全部'
      })
    }
  }
  export default api