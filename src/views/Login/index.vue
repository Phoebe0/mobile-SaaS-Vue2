<template>
  <div>
    <!-- 导航头部 -->
    <!-- van-nav-bar等即使标签也是类名 -->
    <van-nav-bar title="登录"/>
    <!-- 登陆输入框 -->

    <van-form @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="mobile"
          name="手机号"
          label="手机号"
          placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号', trigger: 'onChange' },
          { pattern: /^1[3-9]\d{9}$/, message: '请填写11位手机号' }
        ]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="code"
        name="验证码"
        label="验证码"
        placeholder="验证码"
        :rules="[
         { required: true, message: '请填写验证码', trigger: 'onChange' },
         { pattern: /^\d{6}$/, message: '请填写6位验证码' }
        ]"
      />
    <div style="margin: 16px; ">
      <van-button color="linear-gradient(to right, #33fc21, #62a901)" round block type="info" native-type="submit">提交</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin, reqSendCode } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '17822222222',
      code: '246810',
      codeErrorMsg: '', // 验证码错误提示
      mobileErrorMsg: '' // 手机号错误提示
    }
  },
  methods: {
    // ...mapMutations('模块名', ['mutation名'])
    ...mapMutations('user', ['setTokenInfo']),

    // 登录
    async onSubmit () {
      // 加载提示
      this.$toast.loading({
        message: '大大请稍等~', // 提示文本
        forbidClick: true, // 禁止背景点击
        overlay: true, // 显示遮罩
        duration: 0 // 展示时长，值为0时不会消失
      })
      try {
        const { data: { data } } = await reqLogin(this.mobile, this.code)
        // 提交到user模块中存储token的mutation
        this.setTokenInfo(data)
        // Toast 默认采用单例模式，即同一时间只会存在一个 Toast
        this.$toast.success('恭喜大大登录♥')
        // 登陆成功后，使用编程式导航跳转至首页
        this.$router.push({ path: '/' })
      } catch (error) {
        this.$toast.fail('登陆失败')
      }
    },
    // 发送验证码 ------有错误--------
    async sendCode () {
      const res = await reqSendCode(this.mobile)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin: 10px;
  width: 90%;
  border-radius: 10px;
}

</style>
