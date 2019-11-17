<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">GIS可视化展示</router-link>
        </div>

        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                Openlayers
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li v-for="item in app_ol" :key="item.name">
                    <router-link :to="item.path">{{item.title}}</router-link>
                </li>
              </ul>
            </li>
            <li><a href="#">Leaflet</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                Echarts
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li><a href="#">全国空气质量</a></li>
                <li><a href="#">EJB</a></li>
                </ul>
            </li>
            <li><a href="/src/my_work/photo.html">图片展示</a></li>
            <li><a href="#">关于作者</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 内容区 -->
    <div class="map-container" >
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './route/index'

Vue.use(VueRouter)

export default {
  name: 'app',
  data(){
    let app_ol = this.getMenu('/ol/')
    return {
      app_ol
    }
  },
  router,
  mounted() {
  },
  methods: {
    getMenu(root){
      let routerList = this.$router.options.routes
      let subList = []
      routerList.forEach(rt => {
        if(rt.path.indexOf(root) > -1){
          subList.push({
            name: rt.name,
            title: rt.meta.title,
            path: rt.path
          })
        }
      })
      return subList
    }
  }
}
</script>

<style lang='less'>
  @import url('~bootstrap/less/bootstrap.less');
  @import url('/src/assets/css/mapview.css');
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 30px;
  }
  .map-container{
    min-height: 500px;
    width: 100%;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
    transform: translateX(200px)
  }

  .fade-enter-active,
  .fade-leave-active{
    transition: all 0.5s ease;
  }
</style>
