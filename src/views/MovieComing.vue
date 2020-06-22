<template>
  <div class="movieComing-body">
    <h2 class="movieComing-title">即将上映{{MovieComing.length}}部</h2>
    <div class="no-movieComing" v-show="MovieComing.length === 0">当前城市暂无热映影片信息</div>
    <div class="movieComing" v-show="MovieComing.length > 0">
      <router-link
        v-for="hotmovie in MovieComing"
        tag="div"
        :key="hotmovie.id"
        :to="{path:'/Moviedetails',query:{movieid:hotmovie.id}}"
      >
        <div class="movie">
          <div class="movie-list">
            <img :src="hotmovie.image" alt />
            <div class="movie-info">
              <h2 class="movie-name">{{hotmovie.title}}</h2>
              <div class="flex movieType">类型：{{hotmovie.type}}</div>
              <p class="dN flex">导演：{{hotmovie.director}}</p>
              <p class="flex">主演：{{hotmovie.actor1}} {{hotmovie.actor2}}</p>
            </div>
            <div class="attention" v-if="Attention[0].id == hotmovie.id">
              最受欢迎
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieNum: 0,
      Attention: {},
      MovieComing: []
    };
  },
  components: {},
  methods: {
    getMovieComing() {
      this.axios
        .get(`/movieapi/Movie/MovieComingNew.api?locationId=${this.$route.query.locationId}`)
        .then(res => {
          this.Attention = res.data.attention;
          console.log("最受关注", this.Attention);
          this.MovieComing = res.data.moviecomings;
          console.log(this.MovieComing,this.$route.query.locationId);
        });
    }
  },
  mounted() {
    this.getMovieComing();
  }
};
</script>


<style lang="scss" scoped>
.movieComing-body {
  position: absolute;
  top: 24vw;
  padding: 0 4vw;
  width: 90%;
  .attention {
    position: absolute;
    right: 10vw;
    top: 5vw;
    color:goldenrod;
    font-size: 1rem;
    font-weight: bold;
  }
  .movieComing-title,
  .Attention-title {
    height: 20px;
    line-height: 20px;
    color: #ef4238;
    font-size: 16px;
    &:before {
      float: left;
      width: 6px;
      height: 20px;
      margin-right: 10px;
      background-color: #ef4238;
      content: "";
    }
  }
  .no-movieComing {
    margin: 20px 0;
    height: 88px;
    line-height: 88px;
    font-size: 18px;
    text-align: center;
    background-color: #f7f7f7;
    color: #999;
  }
  .movieComing {
    .movie {
      .movie-list {
        position: relative;
        display: flex;
        padding: 15px 0;
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
        img {
          flex: 0 0 auto;
          width: 64px;
          height: 100px;
        }
        .movie-info {
          margin-left: 10px;
          flex: 1 1 auto;
          overflow: hidden;
          .movie-name {
            height: 28px;
            width: auto;
            overflow: hidden;
            font-weight: 500;
            font-size: 16px;
            line-height: 25px;
          }
          .flex {
            height: 24px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>