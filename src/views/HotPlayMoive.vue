<template>
  <div class="hotplaymovie">
    <!-- {{this.$route.query.locationId}} -->
    <h2 class="hotplaymovie-title">正在热映({{hotPlayMovie.length}}部)</h2>
    <div class="no-hotPlay" v-show="hotPlayMovie.length === 0">当前城市暂无热映影片信息</div>
    <div class="hotPlay" v-show="hotPlayMovie.length > 0">
      <router-link
        v-for="hotmovie in hotPlayMovie"
        tag="div"
        :key="hotmovie.id"
        :to="{path:'/Moviedetails',query:{movieid:hotmovie.id}}"
      >
      <!--  @click="getMovieId(hotmovie.id)" -->
        <!-- <Movie :hotPlayMovie="hotPlayMovie"></Movie> -->
        <div class="movie">
          <div class="movie-list">
            <img :src="hotmovie.img" alt />
            <div class="movie-info">
              <h2 class="movie-name">{{hotmovie.t}}</h2>
              <div class="flex movieType">类型：{{hotmovie.movieType}}</div>
              <p class="dN flex">导演：{{hotmovie.dN}}</p>
              <p class="flex">主演：{{hotmovie.actors}}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// import Movie from '../components/Movie'

export default {
  data() {
    return {
      hotPlayMovie: [], //hotPlayMovie
      MovieId:0
    };
  },
  components: {
    // Movie
  },
  methods: {
    getHotPlay() {
      this.axios
        .get(`/movieapi/Showtime/LocationMovies.api?locationId=${this.$route.query.locationId}`)
        .then(res => {
          // console.log(res);
          // console.log(res.data.ms);
          this.hotPlayMovie = res.data.ms;
          console.log(this.hotPlayMovie,this.$route.query.locationId);
        });
    },
  },
  mounted() {
    this.getHotPlay();
  }
};
</script>


<style lang="scss" scoped>
.hotplaymovie {
  position: absolute;
  top: 20vw;
  padding: 0 4vw;
  width: 90%;
  .hotplaymovie-title {
    margin-top: 20px;
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
  .no-hotPlay {
    margin: 20px 0;
    height: 88px;
    line-height: 88px;
    font-size: 18px;
    text-align: center;
    background-color: #f7f7f7;
    color: #999;
  }
  .hotPlay {
    .hotPlaymovie-list {
      margin: 15px 0;
      background-color: skyblue;
      .movie-info {
        display: inline-block;
      }
    }
    .movie {
    .movie-list {
      display: flex;
      padding: 15px 0;
      background-color: #fff;
      border-bottom:1px solid #f5f5f5;
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
        .flex{
          height: 24px;
          color:#666;
        }
      }
    }
  }
  }
}
</style>