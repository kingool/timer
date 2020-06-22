<template>
  <div id="app">
    
      <Header
        :city="city"
        :cityId="cityId"
        :showLocation="showLocation"
        @changecity="ChangeCity"
        @changelocation="changeLocation"
      />
      <div class="nav">
      <div class="category">
        <router-link
          class="category-item"
          tag="div"
          :to="{path:'/',query:{locationId:cityId}}"
          exact
        >正在上映</router-link>
        <router-link
          class="category-item"
          tag="div"
          :to="{path:'/comingmovie',query:{locationId:cityId}}"
        >即将上映</router-link>
        <router-link class="category-item" tag="div" to="/mine">我的</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  data() {
    return {
      showLocation: false,
      city: "",
      cityId: 366
    };
  },
  computed: {},
  components: {
    Header
  },
  methods: {
    changeLocation(show) {
      this.showLocation = show;
    },
    ChangeCity(id, name) {
      console.log(id, name);
      this.cityId = id;
      this.city = name;
      this.showLocation = false;
      return this.cityId, (this.city = name);
    }
  },
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>
<style lang="scss">
#app {
  position: relative;
  width: 100%;
  .nav {
    position: fixed;
    top: 12vw;
    left: 0;
    width: 100%;
    z-index: 10;
    .category {
      display: flex;
      height: 37px;
      width: 100%;
      line-height: 36px;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      .category-item {
        flex: 1;
        text-align: center;
        height: 36px;
        font-size: 14px;
      }
    }
  }
}
.active {
  color: #ef4238;
}
</style>
