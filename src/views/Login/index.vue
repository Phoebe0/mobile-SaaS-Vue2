<template>
  <div>
    <!-- 导航头部 -->
    <!-- van-nav-bar等即使标签也是类名 -->
    <van-nav-bar title="标题"/>
    <!-- 登陆输入框 -->
    <!--
      error-message 登录错误提示
     -->
    <van-cell-group>
      <van-field
        v-model.trim="mobile"
        required
        label="手机号"
        placeholder="请输入手机号"
        :error-message="mobileErrorMsg"
        @input="validate"
      />
      <van-field
        v-model.trim="code"
        required
        label="验证码"
        placeholder="请输入验证码"
        :error-message="codeErrorMsg"
        @input="validate"
      >
         <template #button>
          <van-button size="mini" type="primary" @click="sendCode">发送验证码</van-button>
        </template>
      </van-field>
      <!-- <van-button plain hairline type="info">细边框按钮</van-button> -->
    <!-- 登录按钮 -->
    <van-button
    class="login"
    color="linear-gradient(to right, #33fc21, #62a901)"
    @click="login"
    >登录</van-button>

    </van-cell-group>
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
    // 校验的方法
    validate () {
      // 手机号的非空校验
      if (!this.mobile) {
        this.mobileErrorMsg = '手机号不能为空'
        return false
      }
      // 正则校验手机号的合法性
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.mobileErrorMsg = '请输入11位手机号'
        return false
      }
      // 手机号全部校验通过，清空错误提示
      this.mobileErrorMsg = ''
      // 验证码的非空校验
      if (!this.code) {
        this.codeErrorMsg = '验证码不能为空'
        return false
      }
      // 验证码的合法校验
      if (!/^\d{6}$/.test(this.code)) {
        this.codeErrorMsg = '请输入合法验证码'
        return false
      }
      // 验证码全部校验通过，清空错误提示
      this.codeErrorMsg = ''
      return true
    },
    // 登陆方法
    async login () {
      if (!this.validate()) return
      // 加载提示
      this.$toast.loading({
        message: '大大请稍等~', // 提示文本
        forbidClick: true, // 禁止背景点击
        overlay: true, // 显示遮罩
        duration: 0 // 展示时长，值为0时不会消失
      })
      const { data: { data } } = await reqLogin(this.mobile, this.code)
      // 提交到user模块中存储token的mutation
      this.setTokenInfo(data)
      // Toast 默认采用单例模式，即同一时间只会存在一个 Toast
      this.$toast.success('恭喜大大登录♥')
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
