<template>
  <div class="register-container">
    <div class="register">
    <h3>注册新用户
        <span class="go">我有账号，去 <a @click="$router.push('/login')" target="_blank">登陆</a></span>
    </h3>
    <div class="loginInfo">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="101px">
        <el-row :gutter="15">
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="code">
            <el-input v-model="form.code" placeholder="请输入验证码" :style="{width: '80%'}"></el-input>
            <button style="height: 27px;margin-left: 8px;" @click="getCode">获取验证码</button>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入登录密码" :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="password2">
            <el-input type="password" v-model="form.password2" placeholder="请输入确认密码" :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item prop="agree">
            <el-checkbox  :checked="agree" @change="checkedChange">同意协议并注册<a href="javascript:;">《尚品汇用户协议》</a></el-checkbox>
          </el-form-item>
          <el-form-item size="large" class="btn">
            <el-button @click="submitForm">完成注册</el-button>
          </el-form-item>
        </el-row>
     </el-form>
    </div>
  </div>
  </div>
</template>
<script>
import { reqRegisterCode, reqRegisterUser } from '@/api/register'
export default {
  components: {},
  props: [],
  data() {
    return {
      agree:false,
      form: {
        phone:'17345420956',
        code: '0956',
        password: '123456',
        password2: '123456',
      },
      rules: {
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入登录密码',
          trigger: 'blur'
        }],
        password2: [{
          required: true,
          message: '请输入确认密码',
          trigger: 'blur'
        }],
        // agree:[{
        //   type:'boolean',
        //   message: '请勾选',
        //   required: true,
        //   trigger: 'change'
        // }]
      },
    }
  },
  watch: {},
  mounted() {
    
  },
  methods: {
    submitForm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        if(this.form.password2 != this.form.password)this.$message.error('两次输入的密码不同')
        if(!this.agree){
          return this.$message.error('请勾选协议')
        }
         try {
            const { phone, code, password } = this.form
            await reqRegisterUser({phone, code, password})
            this.$message.success('注册成功')
            this.$router.push('/login')
         } catch (error) {
            this.$message.error(error.message)
         }
      })
    },
    checkedChange(val){
      this.agree = val
    },
    async getCode(){
     const res =  await reqRegisterCode(this.form.phone)
     this.form.code = res.data
    }
  }
}

</script>
<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }
    .loginInfo{
      margin: 40px auto;
      width: 500px;
      height: 400px;
    }
    .btn {
      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }
}
</style> 
