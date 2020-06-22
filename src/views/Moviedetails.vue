<template>
  <div class="details">
    <!-- 头部 -->
    <div class="details-header">
      <div class="details-header-img">
        <img :src="DetailBasic.img" />
      </div>
      <div class="details-header-info">
        <h2 class="info-name">{{DetailBasic.name}}</h2>
        <div class="header-info">
          <p class="mins">时长: {{DetailBasic.mins}}</p>
        </div>
        <div class="header-info">
          类型:
          <span v-for="i in DetailBasic.type" :key="i">{{i}}</span>
        </div>
        <div class="header-info">
          <p class="date">上映时间: {{DetailBasic.releaseDate}}</p>
          <p class="area">{{DetailBasic.releaseArea}}</p>
        </div>
      </div>
    </div>
    <!-- 一句话概括 -->
    <div class="commentSpecial">“ {{DetailBasic.commentSpecial}} ”</div>
    <!-- 详情 -->
    <div class="details-contents">
      <div class="details-title">影片资料</div>
      <!-- 电影 -->
      <div class="movie-other">
        <h3 class="title">简介</h3>
        <div class="movie-story">{{DetailBasic.story}}</div>
        <!-- 演职人员 -->
        <div class="movie-actors">
          <h3 class="title">演职人员</h3>
          <div class="actors-wrapper" ref="actorsWrapper">
            <ul class="clearfix">
              <div class="actors-list">
                <img :src="DetailDirector.img" />
                <div class="actors-name">导演: {{DetailDirector.name}}</div>
              </div>

              <li
                class="actors-list"
                v-for="(actors,index) in DetailBasic.actors"
                :key="index"
                v-show="actors.name"
              >
                <img :src="actors.img" />
                <div class="actors-name">{{actors.name}}</div>
                <div class="actors-roleName">饰: {{actors.roleName}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="movie-video">
        <h3 class="title">终极预告片</h3>
        <a :href="`https://video-topic-m.mtime.cn/movie/${$route.query.movieid}/videos`">
          <img :src="DetailVideo.img" alt srcset />
        </a>
      </div>
      <div class="hot-comment">
        <h3 class="title">影片评论</h3>
        <ul>
          <li v-for="(mini,index) in HotCommentMini.list" :key="index">
            <div class="user-info">
              <img :src="mini.headImg" alt srcset />
              <div class="user-name">{{mini.nickname}}</div>
              <div class="user-rating">{{mini.rating}} 分</div>
            </div>
            <div class="user-comment">
              <p>{{mini.content}}</p>
            </div>
          </li>
          <li v-for="(plus,index,i) in HotCommentPlus.list" :key="i">
            <div class="user-info">
              <img :src="plus.headImg" alt srcset />
              <div class="user-name">{{plus.nickname}}</div>
              <div class="user-rating">{{plus.rating}} 分</div>
            </div>
            <div class="user-comment">
              <p>{{plus.content}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="details-null">~到底啦~</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      DetailBasic: {},
      DetailDirector: {},
      DetailVideo: {},
      HotCommentMini: {},
      HotCommentPlus: {}
    };
  },
  methods: {
    getMovieDetail() {
      this.axios
        .get(
          `/details/movie/detail.api?locationId=366&movieId=${this.$route.query.movieid}`
        )
        .then(res => {
          console.log(res)
          var MovieDetail = {};
          MovieDetail = res.data.data;
          this.DetailBasic = MovieDetail.basic;
          this.DetailDirector = this.DetailBasic.director;
          this.DetailVideo = this.DetailBasic.video;
        });
    },
    getHotComment() {
      this.axios
        .get(
          `/details/movie/hotComment.api?movieId=${this.$route.query.movieid}`
        )
        .then(res => {
          // console.log(res.data.data);
          this.HotCommentMini = res.data.data.mini;
          this.HotCommentPlus = res.data.data.plus;
          // console.log(this.HotCommentPlus.list);
        });
    },

    initalScroll() {
      if (!this.actorsScroller) {
        // 避免内存泄漏，当menuScroller已经被创建时无需再实例化新的BScroll对象
        this.actorsScroller = new BScroll(this.$refs.actorsWrapper, {
          click: true,
          scrollX: true,
          scrollY: false
          // bounce: false
        });
      } else {
        this.actorsScroller.refresh();
      }
      //
    },
    destroyScroll() {
      if (this.actorsScroller) {
        this.actorsScroller.destroy();
        this.actorsScroller = null;
      }
    }
  },

  mounted() {
    this.getMovieDetail();
    this.getHotComment();
    this.$nextTick(() => {
      this.initalScroll();
    });
  }
};
</script>

<style lang="scss" scoped>
.details {
   position: absolute;
  top: 20vw;
  background-color: rgb(33, 35, 61);
  width: 100vw;
  // height: 100vh;
  .details-header {
    display: flex;
    padding: 4vh 5vw 2vh;
    color: #fff;
    .details-header-img {
      flex: 0 1;
      img {
        width: 123px;
        height: 185px;
        border-radius: 10px;
      }
    }
    .details-header-info {
      flex: 1 1;
      margin-left: 8vw;
      p {
        display: inline-block;
      }
      .info-name {
        font-size: 20px;
        font-weight: bold;
      }
      .header-info {
        margin-top: 12px;
        .mins {
          padding-right: 10px;
        }
        .date {
          margin-right: 10px;
        }
      }
    }
  }
  .commentSpecial {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: gold;
    font-size: 20px;
  }
  .details-contents {
    padding: 2vh 2vw;
    background-color: #fff;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    .details-title {
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 1.3rem;
      font-weight: 600;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      margin: 15px 0;
    }
    .movie-other {
      .movie-story {
        text-align: justify;
        font-size: 14px;
        line-height: 2;
      }
      .movie-actors {
        margin-top: 3vh;
        overflow: hidden;
        ul {
          width: 500%;
          .actors-list {
            float: left;
            margin-right: 2vw;
            img {
              width: 23vw;
              height: 32vw;
            }
            .actors-name {
              margin-top: 8px;
              text-align: center;
            }
            .actors-roleName {
              margin-top: 3px;
              text-align: center;
              color: #999;
            }
          }
        }
      }
    }
    .movie-video {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .hot-comment {
      padding-top: 3vw;
      li {
        padding: 5vw 0 0;
        .user-info {
          height: 15vw;
          line-height: 15vw;
          overflow: hidden;
          img {
            float: left;
            width: 12vw;
            height: 12vw;
            border-radius: 12vw;
            margin-top: 1.5vw;
          }
          .user-name {
            float: left;
            margin-top: -12px;
            margin-left: 15px;
            font-size: 1rem;
            font-weight: bold;
          }
          .user-rating {
            float: right;
            margin-right: 5vw;
            font-size: 1.5rem;
            color: goldenrod;
          }
        }
        .user-comment {
          font-size: 1rem;
          line-height: 6vw;
        }
      }
    }
  }
}
.details-null {
  padding: 5vw 0 2vw;
  text-align: center;
  color: #999;
}
</style>