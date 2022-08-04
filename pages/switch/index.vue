<template>
  <div class="disabled-over">
    <iframe
      id="at"
      style="border:none; "
      :width="searchTableWidth"
      :height="searchTableHeight"
      v-bind:src="`/${dashboard[0]}`"
    ></iframe>
    <iframe
      id="mn"
      style="border:none"
      :width="searchTableWidth"
      :height="searchTableHeight"
      v-bind:src="`/${dashboard[1]}`"
    ></iframe>
  </div>
</template>

<script>
  import utils from '~/static/utils.js';
  export default {
    name: "changing_over",
    methods: {
      widthHeight() {
        this.searchTableHeight = window.innerHeight;
        this.searchTableWidth = window.innerWidth
      },
    },
    data() {
      return {
        dashboard: ['at','mn'],

        searchTableHeight: 0,
        searchTableWidth: 0
      }
    },
    mounted() {
      window.onresize = () => {
        this.widthHeight(); // 自适应高宽度
      };
      this.$nextTick(function () {
        this.widthHeight();
      });
      let _this = this, key = 0;
      setInterval(function () {
        key++;
        _this.$el.querySelector(`#${_this.dashboard[key%2]}`).scrollIntoView({
          behavior: "smooth",  // 平滑过渡
          block: "start" // 上边框与视窗顶部平齐。默认值
        });
      }, 120000);
      window.addEventListener("keydown", utils.keyDownF11, true) // 监听全屏刷新
    }
  }
</script>

<style>
  .disabled-over,body {
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
  }

  .disabled-over::-webkit-scrollbar, body::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
</style>
