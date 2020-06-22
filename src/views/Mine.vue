<template>
  <div class="mine">
    <div class="login" v-show="!isLogin">
      <div class="user-logo">
        <img src="../../public/img/login-no.jpg" alt />
      </div>
      <div class="form">
        <input name="account" type="text" placeholder="请输入账号" />
        <input name="password" type="password" placeholder="请输入密码" />
        <button @click="Login">登录</button>
      </div>
    </div>
    <!-- 我的 -->
    <div class="person" v-show="isLogin">
      <div class="header">
        <div class="user-logo">
          <img src="../../public/img/login-no.jpg" alt />
        </div>
      </div>
      <!-- other -->
      <div class="other">
        <ul>
          <li>
            我看过的
            <i class="iconfont icon-left-arrow"></i>
          </li>
          <li>
            我想看的
            <i class="iconfont icon-left-arrow"></i>
          </li>
          <li>
            设置
            <i class="iconfont icon-left-arrow"></i>
          </li>
        </ul>
      </div>

      <button @click="Login">退出</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    Login() {
      // localStorage.setItem("LocaLogin",true);
      // var login = localStorage.getItem("LocaLogin");
      // console.log(typeof login);
      this.isLogin = true
    }
  },
  watch:{
  }
};
</script>

<style lang="scss" scoped>
.mine {
  position: absolute;
  top: 22vw;
  // padding: 0 4vw;
  width: 100%;
  height: 100vh;
  z-index: 9;
  .user-logo {
    position: absolute;
    top: 10vh;
    left: 40vw;
    img {
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
    }
  }
  .form {
    position: absolute;
    top: 30vh;
    left: 5vw;
    input {
      display: block;
      width: 85vw;
      height: 8vw;
      border-radius: 2vw;
      outline: none;
      border: 1px #999 solid;
      padding-left: 5vw;
      margin-bottom: 2vh;
    }
    button {
      width: 90vw;
      height: 10vw;
      border-radius: 2vw;
      border: none;
      background-color: #ef4f4f;
      color: #fff;
    }
  }
  .person {
    background-color: #f5f5f5;
    height: 100vh;
    .header {
      height: 25vh;
      background: url("../../public/img/mine-bg.8286fad1.png");
    }
    .other {
      margin-top: 2vh;
      background-color: #fff;
      li {
        margin: 0 3vw;
        font-size: 4vw;
        height: 6vh;
        line-height: 6vh;
        i {
          float: right;
        }
      }
    }
    button {
      margin: 10vw 5vw;
      width: 90vw;
      height: 10vw;
      border-radius: 2vw;
      border: none;
      background-color: #ef4f4f;
      color: #fff;
    }
  }
}
</style>