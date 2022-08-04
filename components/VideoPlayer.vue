<template>
  <div class="video-player-box"
       :id="id"
       :playsinline="playsinline"
       @play="onPlayerPlay($event)"
       @pause="onPlayerPause($event)"
       @ended="onPlayerEnded($event)"
       @loadeddata="onPlayerLoadeddata($event)"
       @waiting="onPlayerWaiting($event)"
       @playing="onPlayerPlaying($event)"
       @timeupdate="onPlayerTimeupdate($event)"
       @canplay="onPlayerCanplay($event)"
       @canplaythrough="onPlayerCanplaythrough($event)"
       @ready="playerReadied"
       @statechanged="playerStateChanged($event)"
       v-video-player:myVideo="playerOptions">
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  export default {
    props: ["playerOptions", "playsinline", "id"],
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // console.log('example 01: the player is readied', player)
      }
    }
  }
</script>

<style>
.vjs-tech {
  z-index: 99;
}
</style>
