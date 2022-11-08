<!--
 * @Author: new-wang
 * @Date: 2022-11-07 16:57:48
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 17:56:56
 * @Description: 登录页
-->

<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-box-header">
                <!-- 返回 帮助 关于  -->
            </div>

            <div class="login-wrapper">
                <div class="login-img-describe">
                    <!-- 图片或welcome -->
                </div>
                <div class="login-body">
                    <!-- <div class="login-logo">
                        logo
                    </div> -->
                    <el-form size="large" ref = "formRef" :rules = "rules" :model="form" class="login-form">
                        <el-form-item label="" prop="userName">
                            <el-input prefix-icon ="User" v-model="form.userName" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input 
                                prefix-icon ="Lock"  
                                v-model="form.password"
                                :type="passwordType" 
                                placeholder="密码">
                                <template #suffix>
                                    <el-icon class="el-input__icon" @click.native = "showPwd">
                                        <component :is="passwordType==='password'?'Hide':'View'"></component>
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="validateCode">
                            <el-col :span="14">
                                <el-input v-model="form.validateCode" placeholder="验证码"></el-input>
                            </el-col>
                            <el-col :span="10" class="code-img">
                                <img :src="codeImg" alt="" @click="changeVerify">
                            </el-col>
                        </el-form-item>

                    </el-form>
                </div>
            </div>

            <div class="login-footer">
                <!-- footer -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const formRef = ref()
const codeImg = ref(null)
const changeVerify = ()=>{
    const time = new Date().getTime();
    form.time = time;
    codeImg.value = 'https://ksserver.shandongkunshang.com:8095' + '/verify/getVerify?time=' + form.time
}
const passwordType = ref('password')

const showPwd = ()=>{
    passwordType.value === 'password' ? passwordType.value='': passwordType.value = 'password'
}

const form = reactive({
    userName: '',
    password: '',
    validateCode: '',
    time: new Date().getTime(),
    corporationId: null
})

const rules = reactive({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password:{
        required: true, message: '请输入密码', trigger: 'blur'
    },
    validateCode:{
        required: true, message: '请输入验证码', trigger: 'blur'
    }
})

onMounted(()=>{
    codeImg.value = 'https://ksserver.shandongkunshang.com:8095' + '/verify/getVerify?time=' + form.time
})
</script>

<style lang="scss" scoped>
.login-container{
    background: rgb(132, 188, 248);
    // background-image: url(https://hongguishanglv.com/img/login_s.2f930fa9.png);
    background-repeat: no-repeat;
    background-position: left center;
    
    height: 100%;
    min-height: 460px;
    .login-box{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: space-between;
        // align-items: flex-end;
        box-sizing: border-box;
        padding: 20px;
        // background: #fff;
        .login-box-header{
            background: #fff;
            text-align: right;
        }
        .login-wrapper{
            // background: rgba($color: #fff, $alpha:.2);
            height: 80%;
            width: 80%;
            min-height: 400px;
            min-width: 800px;
            align-self: center;
            display: flex;
            justify-content: space-between;
            .login-img-describe{
                width: 50%;
                background: url("assets/images/loginBg.png") no-repeat;
                background-size: cover;
                background-position: center;
                opacity: .8;
                border-radius: 10px 0 0 10px;
            }
            .login-body{
                background: rgba($color: #fff, $alpha:.5);
                width: 50%;
                border-radius: 0 10px 10px 0;
                .login-logo{
                    background: #fff;
                    height: 80px;
                }
                .login-form{
                    padding: 20px;

                    .code-img{
                        display: flex;
                        justify-content: center;
                        img{
                            height: 40px;
                        }
                    }
                }
            }
        }
        .login-footer{
            background: #fff;
        }
    }
}
</style>