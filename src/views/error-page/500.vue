<template>
  <div class="bor">
    <div class="main">
      <div class="main_cen">
        <div class="le">
          <p class="le_le">500</p>
          <div class="le_ri">
            <p>服务器错误，请返回重试或者联系技术人员！</p>
            <button @click="butclick">返回</button>
          </div>
          <div class="cl"></div>
        </div>
        <div class="ri">
          <img src="@/assets/500_images/500.png"
               alt="" />
        </div>
        <div class="cl"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServerError",
  methods: {
    butclick () {
      this.$router.go(-1)
    },
  },
};
</script>

<style scoped>
.cl {
  clear: both;
}
.main {
  position: absolute;
  width: 100%;
  height: 333px;
  left: 0;
  top: 50%;
  margin-top: -200px;
  background: url('@/assets/500_images/500_bg.png') no-repeat center 96px;
  background-size: 100% 175px;
}
.main_cen {
  width: 84%;
  margin: 0 auto;
  position: relative;
}
.le {
  float: left;
  margin-top: 140px;
}
.le_le {
  font-size: 44px;
  color: #fff;
  font-weight: 444;
  float: left;
  width: 175px;
  height: 46px;
  text-align: center;
  line-height: 46px;
}
.le_ri {
  color: #fff;
  float: left;
  padding-left: 35px;
  margin-left: 35px;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
}
.le_ri p {
  color: #fff;
  font-size: 15px;
  line-height: 24px;
}
.le_ri button {
  width: 120px;
  line-height: 34px;
  text-align: center;
  font-size: 12px;
  color: #f66e23;
  background-color: #fff;
  border-radius: 30px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.le_ri button:hover {
  background-color: rgb(228, 228, 228);
  transition: all 0.4s;
}
.ri {
  float: right;
}
.ri img {
  display: block;
}
</style>