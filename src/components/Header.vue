<template>
  <div class="header">
    <div class="header-location" @click="$emit('changelocation',true)">
      <span class="iconfont icon-dingwei"></span>
      <p v-if="city">{{city}}</p>
      <p v-if="city === ''">定位失败</p>
    </div>
    <transition name="location">
      <div class="locationAll" v-show="showLocation">
        <!-- title -->
        <div class="city-title">
          <div class="title">
            选择城市
            <div class="but iconfont icon-guanbi" @click="$emit('changelocation',false)"></div>
          </div>

          <div class="search-city">
            <input v-model="keyword" type="text" class="search-input" placeholder="请输入城市关键词" />
          </div>
        </div>
        <!-- 搜索列表 -->
        <div class="keywordList" v-show="keyword">
          <ul v-for="(item,index) in keywordList" :key="index">
            <li class="city-item" 
            @click="$emit('changecity',item.id,item.n)">{{item.n}}</li>
          </ul>
        </div>
        <!-- 城市列表 -->
        <div class="city-wrapper" ref="cityWrapper">
          <div class="cityList" v-show="!keyword">
            <!-- GPS -->
            <div class="gps-city">
              <h3>GPS</h3>
              <ul>
                <li class="city-item">浏览器定位失败</li>
              </ul>
            </div>
            <!-- 热门 -->
            <div class="hot-city">
              <h3>热门</h3>
              <ul>
                <li
                  v-for="(c,index) in hotCity"
                  :key="index"
                  class="city-item"
                  @click="$emit('changecity',c.id,c.n)"
                >{{c.n}}</li>
              </ul>
            </div>
            <!-- 城市排行 -->
            <div class="cityPinyin">
              <h3>其他</h3>
              <ul v-for="(list,index) in cityList" :key="index">
                <li class="city-item" 
                @click="$emit('changecity',list.id,list.n)">{{list.n}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    city: {
      type: String
      // defalut:""
    },
    showLocation: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      keyword: "",
      keywordList: [],
      timer: null,
      cityList: [],
      hotCity: [],
      cityPinyin: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "N",
        "M",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  methods: {
    // 获取热门城市
    getCity() {
      // console.log(this.city)
      this.axios("/api/city").then(res => {
        var arrhotcity = [];

        for (var i = 0; i < 8; i++) {
          arrhotcity.push(res.data.areaId[i]);
        }
        this.hotCity = arrhotcity;
        this.cityList = res.data.areaId;
      });
    },

    initalScroll() {
      if (!this.cityScroller) {
        // 避免内存泄漏，当menuScroller已经被创建时无需再实例化新的BScroll对象
        this.cityScroller = new BScroll(this.$refs.cityWrapper, {
          click: true,
          bounce: false
        });
      } else {
        this.cityScroller.refresh();
      }
    },
    destroyScroll() {
      if (this.cityScroller) {
        this.cityScroller.destroy();
        this.cityScroller = null;
      }
    },
    // 获取当前位置信息
    getTmap() {
      window.addEventListener(
        "message",
        function(event) {
          // 接收位置信息
          var loc = event.data;
          console.log("location", loc);
        },
        false
      );
    }
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.keyword) {
        // console.log(this.cityList)
        return;
      }
      this.timer = setTimeout(() => {
        const result = [];
        this.cityList.forEach(value => {
          if (value.n.indexOf(this.keyword) > -1) {
            result.push(value);
          }
        });
        console.log(result);
        this.keywordList = result;
      }, 50);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getCity();
      this.initalScroll();
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  line-height: 40px;
  background-color: #d43d3d;
  z-index: 999;
  .header-location {
    display: inline-block;
    margin-left: 15px;
    color: #fff;
    p {
      display: inline-block;
      font-size: 12px;
      margin-left: 8px;
    }
  }
  .locationAll {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 667px;
    background: #fff;
    z-index: 10;
    &.location-enter,
    &.location-leave-to {
      opacity: 0;
    }

    &.location-enter-active,
    &.location-leave-active {
      transition: opacity 0.5s linear;
    }

    &.location-enter-to,
    &.location-leave {
      opacity: 1;
    }
    .city-title {
      width: 100%;
      height: 28vw;
      background: #fff;
      color: #000;
      font-size: 16px;
      line-height: 45px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      // border-bottom:2px #666 solid ;
      .title {
        height: 14vw;
        background-color: #333;
        color: #fff;
        .but {
          position: absolute;
          top: 0;
          right: 15px;
        }
      }

      .search-city {
        height: 14vw;
        background-color: #4f4f4f;
        .search-input {
          height: 8vw;
          width: 80%;
          // border: ;
          padding: 0;
          margin: 0;
        }
      }
    }
    .keywordList {
      position: absolute;
      top: 28vw;
      width: 100%;
      z-index: 10;
      .city-item {
        display: block;
        padding: 14px;
        overflow: hidden;
        font-size: 15px;
      }
    }
    .city-wrapper {
      overflow: hidden;
      position: absolute;
      top: 28vw;
      width: 100%;
      height: 667px;
      .cityList {
        h3 {
          padding: 0 12px;
          background: #eee;
          color: #777;
          font-size: 12px;
          font-weight: 400;
        }
        .city-item {
          display: block;
          padding: 14px;
          overflow: hidden;
          font-size: 15px;
          background: transparent
            linear-gradient(
              0deg,
              #ededed,
              #ededed 50%,
              transparent 0,
              transparent 0
            )
            0 100% repeat-x;
          background-size: 100% 1px;
        }
      }
    }
  }
}
</style>