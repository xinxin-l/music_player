<template>
  <div class="box">
    <div id="left" @click="selected">
      <div class="nav" id="player">MusicPlayer</div>
      <router-link
        to="/today"
        :class="[active[0] ? 'selected nav' : 'nav']"
        :id="0"
        >今日推荐</router-link
      >
      <router-link
        to="/popular"
        :class="[active[1] ? 'selected nav' : 'nav']"
        :id="1"
        >热门音乐</router-link
      >
      <router-link
        to="/home"
        :class="[active[2] ? 'selected nav' : 'nav']"
        :id="2"
        >个人中心</router-link
      >
    </div>
    <div id="right">
      <div id="bar">
        <div id="btn">
          <i class="el-icon-arrow-left" @click="pageBack"></i>
          <i class="el-icon-arrow-right" @click="pageForward"></i>
        </div>
        <input type="text" id="search" />
        <div id="img"></div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "layout",
  setup() {
    let active = reactive([true, false, false]);
    let num = 0;
    const router = useRouter();
    // const route = useRoute();
    function selected(e) {
      if(e.target.id.length>1) return
      active[num] = false;
      num = e.target.id;
      active[num] = true;
    }
    function pageBack() {
      router.back();
    }
    function pageForward() {
      router.forward();
    }
    return { active, selected, pageBack, pageForward };
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
}
#left {
  display: flex;
  flex-direction: column;
  border-right: 1px dashed rgba(109, 3, 109, 0.304);
}
#left .nav {
  text-decoration: none;
  display: block;
  height: 100px;
  line-height: 100px;
  width: 100%;
  text-align: center;
  font-size: 20px;
}
#left .nav:hover {
  background-color: rgba(229, 208, 255, 0.192);
  text-shadow: 1px 1px 3px rgba(164, 97, 226, 0.498);
  box-shadow: 5px 5px 15px 0.5px rgba(196, 161, 229, 0.498);
}
#left .nav:active {
  color: rgb(147, 57, 230);
}

#left #player {
  padding-bottom: 30px;
  line-height: 130px;
  font-size: 30px;
  color: rgba(156, 119, 190, 0.847);
  /* color:hsla(0,0%,100%,.14) */
}
#left #player:hover {
  background-color: transparent;
  box-shadow: 0 0 0 0;
}
#left .selected {
  background-color: rgba(229, 208, 255, 0.192);
  text-shadow: 1px 1px 3px rgba(164, 97, 226, 0.498);
  box-shadow: 5px 5px 15px 0.5px rgba(196, 161, 229, 0.498);
  border-right: 2px solid rgba(196, 161, 229, 0.698);
}
#bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 85px;
  background-color: rgba(197, 158, 238, 0.07);
}
#btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  font-size: 24px;
  margin-left: -100px;
}
#btn i {
  width: 40%;
  height: 60px;
  line-height: 60px;
  margin-right: 5px;
  text-align: center;
}
#btn i:hover {
  background-color: rgba(227, 196, 254, 0.402);
  border-radius: 10px;
  cursor: pointer;
}
#search {
  width: 300px;
  height: 34px;
  border-radius: 16px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.858);
  border: 1px rgba(99, 70, 124, 0.802) solid;
}
#search:focus {
  border: 1.5px rgb(178, 80, 193) solid;
  box-shadow: 3px 3px 12px 0.5px rgba(77, 29, 124, 0.119);
}
#img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgb(230, 194, 247);
}
</style>