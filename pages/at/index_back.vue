<template>
  <div v-if="false" class="dashboard-box">
    <div class="top-bg"></div>
    <div class="content">
      <div class="top-box">
        <div class="top-time">{{currentTime}}</div>
        <div>
          <div class="top-name">一石云池全球运营中心</div>
          <div class="top-name-sub">
            <span>自2020-10-15主网上线</span>
            <span class="top-duration">{{day}}</span>
            <span>天</span>
            <span class="top-duration">{{hour}}</span>
            <span>小时</span>
            <span class="top-duration">{{minute}}</span>
            <span>分</span>
            <span class="top-duration">{{second}}</span>
            <span>秒</span>
          </div>
        </div>
        <div class="top-logo">
          <span class="logo_box">Mainnet</span>
        </div>
      </div>
      <div class="top-prominent">
        <div class="prominent-item">
          <div class="prom-name">位置</div>
          <div class="prom-con">
            <span style="font-size: 1.6rem">四大洲九大区域</span>
          </div>
        </div>
        <div class="prominent-item">
          <div class="prom-name">有效算力</div>
          <div class="prom-con">
            <span>{{pool_overview.total_power.split(' ')[0]}}</span>
            <span class="prom-unit">{{pool_overview.total_power.split(' ')[1]}}</span>
          </div>
        </div>
        <div class="prominent-item">
          <div class="prom-name">总产出</div>
          <div class="prom-con">
            <span>{{pool_overview.total_reward}}</span>
            <span class="prom-unit">FIL</span>
          </div>
        </div>
        <div class="prominent-item">
          <div class="prom-name">24h算力增长</div>
          <div class="prom-con">
            <span>{{pool_overview.increase_power.split(' ')[0]}}</span>
            <span class="prom-unit">{{pool_overview.increase_power.split(' ')[1]}}</span>
          </div>
        </div>
        <!--<div class="prominent-item">
          <div class="prom-name">24h挖矿效率</div>
          <div class="prom-con">
            <span>{{pool_overview.avg_reward}}</span>
            <span class="prom-unit">FIL/TiB</span>
          </div>
        </div>-->
        <div class="prominent-item">
          <div class="prom-name">通证价格</div>
          <div class="prom-con">
            <span>{{pool_overview.price}}</span>
            <span class="prom-unit">USDT</span>
          </div>
        </div>
      </div>
      <div class="big-box">
        <div class="left-box">
          <div class="lt" ref="videoBox">
            <!--<div class="lt-name"><span class="echarts-title">MINING POOL存储供应商</span></div>
            <div class="lt-con">
              <div class="lt-con-name">
                <div style="text-align: left;padding-left: 0.5rem">存储供应商</div>
                <div style="text-align: left;">总算力</div>
                <div>24h新增算力</div>
                <div style="text-align: right;padding-right: 0.5rem">幸运值</div>
              </div>
              <ul>
                <li class="lt-con-ul" v-for="item in pool_miners">
                  <div style="text-align: left;padding-left: 0.5rem">{{item.miner_address}}</div>
                  <div style="text-align: left;">{{item.power}}</div>
                  <div style="color: #0068FF;">{{item.increase_power}}</div>
                  <div style="text-align: right;padding-right: 0.5rem">{{item.luck}}%</div>
                </li>
              </ul>
            </div>-->

            <div style="margin-left: 10px; margin-top: 1.1rem;">
              <VideoPlayer id="my" :playsinline="true" :playerOptions="videoOptions"></VideoPlayer>
            </div>
          </div>
          <div class="lt-center mt-2">
            <div class="rt-name">
              <span class="echarts-title">云池存储供应商列表（共{{miners_count}}个）</span>
            </div>
            <div style="padding-left: 2rem; width: 100%;">
              <ul
                style="font-size: 1.1rem; line-height: 2.4rem; margin-bottom: 2rem; height: calc(23.5vh) width: 100%; "
              >
                <li class="grid grid-flow-col grid-cols-4 grid-rows-1 gap-2">
                  <div>存储供应商</div>
                  <div>有效算力</div>
                  <div>24h算力增长</div>
                  <div>扇区大小</div>
                </li>
                <li
                  v-for="(item, key) in miners_show"
                  :key="key"
                  class="grid grid-flow-col grid-cols-4 grid-rows-1 gap-2"
                >
                  <div>{{item.miner_address}}</div>
                  <div>{{item.power}}</div>
                  <div>{{item.increase_power}}</div>
                  <div>{{item.sector_size_str.replace(/.00/, '')}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="lb">
            <div class="rt-name">
              <span class="echarts-title">云池算力(PiB)</span>
            </div>
            <div class="rt-con" id="rt-con"></div>
          </div>
        </div>
        <div class="right-box">
          <div class="rt">
            <div class="lamp">
              <span class="lamp-color">{{pool_last_block_info.miner_address}}</span>
              <span>在</span>
              <span v-if="pool_last_block_info.minute !== 0">
                <span class="lamp-color">{{pool_last_block_info.minute}}</span>
                <span>分</span>
              </span>
              <span v-if="pool_last_block_info.second !== 0">
                <span class="lamp-color">{{pool_last_block_info.second}}</span>
                <span>秒</span>
              </span>
              <span>之前爆块</span>
            </div>
            <div class="worldMap" id="worldMap"></div>
            <div class="miner-intro">
              <div class="the-miner animate__animated" ref="minerIntro">
                <img class="miner-img" :src="showInfo.img" />
              </div>
              <div class="animate__animated" ref="minerIntro1">
                <div style="width: calc(20vw - 6rem); margin: 0 auto;">
                  <div
                    style="color: #FFCC00; font-size: 1.4rem; margin-top: 2.5rem;"
                  >{{showInfo.name}}</div>
                  <ul style="padding-top: 2rem;font-size: 1.1rem; ">
                    <li style="margin-bottom: 1.2rem">
                      <span class="li-point"></span>
                      <span>集群规模：</span>
                      {{showInfo.scale}}
                    </li>
                    <li style="margin-bottom: 0.4rem">
                      <span class="li-point"></span>
                      <span>机柜数量：</span>
                      {{showInfo.frames}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="rb">
            <div class="rb-l">
              <div class="rb-l-name">
                <span class="echarts-title">每日算力增量(TiB)</span>
              </div>
              <div class="rb-l-con" id="rb-l-con"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import worldJson from '~/assets/json/world.json'
import BigNumber from "bignumber.js";
import VideoPlayer from "../../components/VideoPlayer";
import utils from '~/static/utils.js';

const colorList = [
  '#69C682', '#57F9F7', '#EC7B67', '#846CF9',
  '#FFCC00', '#C0FABF', '#E97B9F', '#87FBC7',
  '#6868F6', '#EB6974', '#A876F7', '#A4D06C',
  '#B3CFE7', '#7D58BD', '#35731F', '#D7AE73',
  '#F6CB65', '#F0805A', '#7DEE86', '#671AD1',
  '#64A1E2', '#43D87C', '#F765BF', '#A87FD1',
  '#F7CA7E', '#C9CBFF', '#E4ED42', '#ED3A0E',
  '#50840B', '#FF9D82', '#BA4A2E', '#3A68B2',
  '#11F91D', '#BC6234', '#913BFF', '#6B69FF',
];

const BIG_NUMBER_FORMAT = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
};

const rtCon = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('rt-con'))
  let min = 0;
  min = Number(Math.min(..._this.miners).toString().split('.')[0]);
  // 开始渲染
  myChart.setOption({
    tooltip: {},
    grid: {
      top: '8%',
      left: '4%',
      right: '4%',
      bottom: '6%',
      containLabel: true
    },
    xAxis: {
      axisTick: {
        show: true
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          width: 1,
          color: '#063481'
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontFamily: 'QTFuture BT',
          color: '#fff',
          fontSize: 9,
        },
        interval: 0
      },
      data: _this.xAxisDate.slice(7, 14)
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          width: 1,
          color: '#063481'
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontFamily: 'QTFuture BT',
          fontSize: 9,
          color: '#fff',

        },
        formatter: '{value}',
        interval: 0
      },
      min,
    },
    series: [{
      name: '算力走势',
      type: 'line',
      barWidth: '60%',
      data: _this.miners,
      label: {
        show: true,
        position: 'top',
        textStyle: {
          fontFamily: 'QTFuture BT',
          fontSize: 9,
          color: '#FFFFFF'
        }
      },
      lineStyle: {
        width: 1,
      },
      itemStyle: {
        normal: {
          color: '#FFCC00',
        }
      }
    }]
  })
};
const rbLCon = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('rb-l-con'))
  let legend_data = [], series_data = [];

  series_data.push({
    name: 'power',
    type: 'bar',
    stack: 'power',
    data: _this.sum_data,
    symbolSize: 2,
    barWidth: 25,
    label: {
      show: true,
      position: 'top',
      textStyle: {
        fontFamily: 'QTFuture BT',
        fontSize: 9,
        color: '#FFFFFF'
      }
    },
    itemStyle: {
      normal: {
        color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 2, [{
          offset: 0.2,
          color: '#846CF9'
        }, {
          offset: 0.5,
          color: '#0068FF'
        }]),
      }
    },
    lineStyle: {
      width: 1,
    },
  });


  // 开始渲染
  myChart.setOption({
    legend: {
      show: false,
      data: legend_data,
      textStyle: {
        fontFamily: 'QTFuture BT',
        fontSize: 9,
        color: '#FFFFFF',
      },
      itemWidth: 6,
      itemHeight: 6,
      top: 0,
      left: '12%',
    },
    grid: {
      top: '8%',
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: _this.xAxisDate,
      axisTick: {
        show: true
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          width: 1,
          color: '#063481'
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontFamily: 'QTFuture BT',
          fontSize: 9,
          color: '#fff'
        },
        interval: 0
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          width: 1,
          color: '#063481'
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontFamily: 'QTFuture BT',
          fontSize: 9,
          color: '#fff'
        },
        formatter: '{value}',
        interval: 0
      },
    },
    series: series_data,

  })
};

const loadChart = function (_this) {

  _this.$echarts.registerMap('world', _this.worldJson);

  let contain = document.getElementById('worldMap');

  let myChart = _this.$echarts.init(contain);

  let convertValData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];
      res.push({
        name: dataItem.areaName,
        value: dataItem.lineS.concat(dataItem.value),
      });
    }
    return res;
  };
  let series = [];
  series.push(
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 1,
      rippleEffect: {
        period: 10,
        scale: 4,
        brushType: 'fill'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: function (v) {
            return `{white|${v.name}}\n{yellow|【建设中】}`
          },
          position: 'top',
          offset: [15, 0],
          color: '#FFFFFF',
          fontFamily: 'QTFuture BT',
          show: true,
          textStyle: {
            fontSize: 9,
            fontFamily: 'QTFuture BT',
          },

          rich: {
            yellow: {
              fontFamily: 'QTFuture BT',
              fontSize: 9,
              color: '#FFCC00',
            },
            white: {
              fontFamily: 'QTFuture BT',
              fontSize: 9,
              color: '#FFFFFF'
            }
          }
        },
      },
      itemStyle: {
        normal: {
          color: function (v) {
            let color = '#FFFFFF';

            if (v.value[0] === _this.showInfo.lineS[0] && v.value[1] === _this.showInfo.lineS[1]) {
              color = '#FFCC00';
            }
            return color;
          },
          // shadowBlur: 4,
          // shadowColor: '#333'
        }
      },
      symbolSize: 8,
      data: [
        {
          name: '美国数据中心',
          value: [-74.0059731, 40.7143528, ''],
        },
        {
          name: '台湾数据中心',
          value: [121.50, 25.05, ''],
        },
      ],
    },
    {  // 动画点 涟漪
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 1,
      rippleEffect: {
        period: 10,
        scale: 4,
        brushType: 'fill'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          offset: [15, 0],
          color: '#FFFFFF',
          show: false
        },
      },
      itemStyle: {
        normal: {
          color: function (v) {
            let color = '#FFFFFF';

            if (v.value[0] === _this.showInfo.lineS[0] && v.value[1] === _this.showInfo.lineS[1]) {
              color = '#FFCC00';
            }
            return color;
          },
          // shadowBlur: 4,
          // shadowColor: '#333'
        }
      },
      symbolSize: 8,
      data: convertValData(_this.mapJson)
    },
    { // 动画曲线
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 3, //特效动画的时间，单位为 s
        // trailLength: 0.1, //特效尾迹的长度。0~1数值越大尾迹越长
        color: '#FFCC00',
        symbol: 'arrow',
        symbolSize: 8, //图标大小
      },
      lineStyle: {
        show: true,
        normal: {
          color: '#FFCC00',
          width: 2, //线条宽度
          opacity: 0.05, //尾迹线条透明度
          curveness: 0.3 //尾迹线条曲直度
        }
      },
      data: [
        {
          coords: _this.showPointer,
          lineStyle: { color: '#FFCC00' }
        }
      ]
    },
  );

  let option = {
    backgroundColor: '#00050C',
    geo: {
      map: 'world',
      label: {
        emphasis: {
          show: false
        }
      },
      zoom: 1.2,
      roam: false,
      itemStyle: {
        emphasis: {
          areaColor: '#3386EB'
        },
        normal: {
          areaColor: '#3386EB',
          borderColor: '#00050C',
        },
      },
    },
    series: series
  };
  myChart.setOption(option);

};

const setAreaNodes = (_this) => {
  let area_nodes = ['成都区域存储供应商', '雅安区域存储供应商', '宁夏区域存储供应商', '欧洲区域存储供应商', '澳洲区域存储供应商', '青海区域存储供应商', '内蒙区域存储供应商'];
  let the_time = [
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60,
  ];
  let sec = 0;
  let the_sec = the_time[Math.floor(Math.random() * 31)];

  let pool_last_block_info = {
    miner_address: area_nodes[Math.floor(Math.random() * area_nodes.length)],
    minute: 0,
    second: sec,
  };

  setInterval(function () {
    _this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

    _this.day = moment().diff(moment(new Date("2020/10/15")), 'days');
    _this.hour = moment().format('HH');
    _this.minute = moment().format('mm');
    _this.second = moment().format('ss');



    if (sec >= the_sec) {
      pool_last_block_info.miner_address = area_nodes[Math.floor(Math.random() * area_nodes.length)];
      the_sec = the_time[Math.floor(Math.random() * 31)];
      sec = 0;
    }
    sec++;
    pool_last_block_info.minute = Number((sec / 60).toString().split('.')[0]);
    pool_last_block_info.second = Number(((sec) % 60).toString().split('.')[0]);
  }, 1000);

  _this.pool_last_block_info = pool_last_block_info;

};


export default {
  name: "arock",
  mixins: [],

  props: [],

  components: {
    VideoPlayer
  },

  watch: {

  },

  computed: {

  },
  async asyncData({ app }) {
    let overview = await app.$axios.post('/api/get_pool_overview');
    let trend = await app.$axios.post('/api/get_pool_trend', { days: 14 });
    let mines = await app.$axios.post('/api/get_pool_mines');
    let pool_overview = {}, pool_trend = {}, pool_mines = {};

    if (overview.code === 0) {
      overview.data.total_reward = (new BigNumber((new BigNumber(overview.data.total_reward)).toFixed(2, 1))).toFormat(2, BIG_NUMBER_FORMAT);
      pool_overview = overview.data;
    }

    let xAxisDate = [], miner = [], sum_data = [];
    if (trend.code === 0) {
      pool_trend = trend.data;

      xAxisDate = Object.keys(pool_trend);


      Object.keys(pool_trend).forEach(key => {
        let tib = (pool_trend[key].increase_power / 1099511627776).toString().split('.');
        sum_data[key] = Number(`${tib[0]}${typeof tib[1] !== 'undefined' ? `.${tib[1].substring(0, 4)}` : ''}`);

        let tib1 = (pool_trend[key].power / 1099511627776 / 1024).toString().split('.');
        miner[key] = Number(`${tib1[0]}${typeof tib1[1] !== 'undefined' ? `.${tib1[1].substring(0, 4)}` : ''}`);
      })

      sum_data = Object.values(sum_data);
      miner = Object.values(miner);

    }
    let mapJson = [];
    if (mines.code === 0) {
      mines = mines.data.map(item => {
        mapJson.push({
          ...item,
          areaName: item.name,
          value: '',
          lineS: [item.longitude, item.latitude],
          lineE: [220, 60]
        })
      });
    }


    let all = await Promise.all([
      app.$axios.post('/api/get_pool_miners', { sector_type: 0, page_size: 100 }),
      app.$axios.post('/api/get_pool_miners', { sector_type: 1, page_size: 100 })
    ])

    let miners64 = all[1].data.objs
    let miners32 = all[0].data.objs
    let miners_all = [
      ...miners64,
      ...miners32
    ]
    let miners_show = miners_all.slice(0, 6)
    let miners_count = miners_all.length;

    return {
      pool_overview,
      xAxisDate,
      miners: miner.slice(7, 14),
      mapJson,
      mines,
      pool_mines,
      sum_data,
      miners_show,
      miners_all,
      miners_count
    }
  },
  data() {
    return {
      worldJson: {},
      currentTime: '',
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      len: 0,
      showPointer: [],
      showInfo: {},
      pool_last_block_info: {},
      videoOptions: {
        width: '200px',
        muted: true,
        loop: true,
        autoplay: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: "https://bbhe-mgr.oss-cn-hongkong.aliyuncs.com/arockpool_import_6f7565f87b4f11eb9c8c0242ac130002_K5Utt5EI2MSlPM0UEod74wIksLonzmt1"
        }],
      }
    }
  },
  methods: {
    getOverview() {
      let _this = this;
      setInterval(function () {
        _this.$axios.post('/api/get_pool_overview').then((overview) => {
          if (overview.code === 0) {
            overview.data.total_reward = (new BigNumber((new BigNumber(overview.data.total_reward)).toFixed(2, 1))).toFormat(2, BIG_NUMBER_FORMAT);
            _this.pool_overview = overview.data;
          }
        }).catch(() => { });
      }, 30000);
    },
    oneDay() {
      let _this = this;
      setInterval(function () {
        _this.$axios.post('/api/get_pool_trend', { days: 14 }).then((trend) => {
          if (trend.code === 0) {
            let pool_trend = trend.data;
            xAxisDate = Object.keys(pool_trend);

            let xAxisDate = [], miner = [];

            let sum_data = [];
            Object.keys(pool_trend).forEach(key => {
              let tib = (pool_trend[key].increase_power / 1099511627776).toString().split('.');
              sum_data[key] = Number(`${tib[0]}${typeof tib[1] !== 'undefined' ? `.${tib[1].substring(0, 4)}` : ''}`);


              let tib1 = (pool_trend[key].power / 1099511627776 / 1024).toString().split('.');
              miner[key] = Number(`${tib1[0]}${typeof tib1[1] !== 'undefined' ? `.${tib1[1].substring(0, 4)}` : ''}`);
            })
            sum_data = Object.values(sum_data);
            miner = Object.values(miner);


            _this.xAxisDate = xAxisDate;
            _this.miners = miner.slice(7, 14);
            _this.sum_data = sum_data;
          }
        }).catch(() => { });
        _this.$axios.post('/api/get_pool_mines').then((mines) => {
          if (mines.code === 0) {
            let mapJson = [];
            _this.mines = mines.data.map(item => {
              mapJson.push({
                ...item,
                areaName: item.name,
                value: '',
                lineS: [item.longitude, item.latitude],
                lineE: [220, 60]
              })
            });
            _this.mapJson = mapJson;
          }
        }).catch(() => { });
      }, 1800000);
    }
  },
  mounted() {
    this.videoOptions = {
      width: `${this.$refs.videoBox.clientWidth - 17}px`,
      muted: true,
      loop: true,
      autoplay: false,
      language: 'en',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [{
        type: "video/mp4",
        src: "https://bbhe-mgr.oss-cn-hongkong.aliyuncs.com/arockpool_import_6f7565f87b4f11eb9c8c0242ac130002_K5Utt5EI2MSlPM0UEod74wIksLonzmt1"
      }],
    };



    let _this = this;
    this.worldJson = worldJson;
    rtCon(this);
    rbLCon(this);
    // rbRCon(this);
    let mKey = 0;
    _this.showPointer = [
      _this.mapJson[mKey].lineS,
      _this.mapJson[mKey].lineE,
    ]; // [data[1].lineS,data[1].lineE]
    _this.showInfo = {
      ..._this.mapJson[mKey]
    };
    loadChart(this);

    // 云池存储供应商列表
    let len = [0, 6];
    setInterval(function () {
      len[1] = len[1] + 1;
      len[0] = len[0] + 1;
      if (len[1] >= _this.miners_count) {
        len[1] = 6;
        len[0] = 0;
      }
      _this.miners_show = _this.miners_all.slice(len[0], len[1])
    }, 3000);

    setInterval(function () {
      mKey++;
      if (mKey >= _this.mapJson.length) mKey = 0;

      _this.showPointer = [
        _this.mapJson[mKey].lineS,
        _this.mapJson[mKey].lineE,
      ];

      _this.showInfo = {
        ..._this.mapJson[mKey]
      };

      loadChart(_this);
    }, 6000);

    setAreaNodes(this);
    this.oneDay();
    this.getOverview();
    window.addEventListener("keydown", utils.keyDownF11, true) // 监听全屏刷新

    setInterval(function () {
      window.location.reload()
    }, 2 * 60 * 60 * 1000)
  }
}
</script>

<style scoped>
.show_intro {
  display: inline-block;
}
.hidden_intro {
  display: none;
}
.li-point {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #0068ff;
  display: inline-block;
  margin-right: 1rem;
}

.miner-intro {
  position: absolute;
  top: calc(24vh);
  right: 2.5rem;
  width: calc(20vw);
  height: calc(50vh);
  background-size: 100% 100%;
  background-image: url('~assets/boxStyle/arock/miner-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  padding: 0.2rem 1.2rem 1.2rem 0.2rem;
  overflow: hidden;
}
.the-miner {
  width: 100%;
}
.miner-img {
  width: 100%;
  height: calc(30vh);
  object-fit: cover;
  object-position: bottom;
  margin-bottom: 0.5rem;
}
.lamp {
  margin-top: 0.43rem;
  margin-left: calc((10% * 7.5) / 3.5);
  text-align: center;
  width: 28rem;
  height: 4rem;
  line-height: 4rem;
  background-image: url('~assets/boxStyle/arock/lamp-box.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 1.5rem;
}
.lamp-color {
  color: #ffcc00;
  font-weight: bold;
}

.dashboard-box {
  color: #ffffff;
  width: calc(100vw);
  height: calc(100vh);
  background-color: #00050c;
}
.content {
  position: absolute;
  top: 0;
}
.top-box {
  width: 100%;
  height: calc(9vh);
  display: grid;
  grid-template-columns: calc(100vw / 3) calc(100vw / 3) calc(100vw / 3);
}
.top-bg {
  width: 100%;
  height: 230px;
  background-image: url('~assets/boxStyle/arock/top_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-y: -76px;
}
.top-time {
  margin-top: 1rem;
  padding-left: 60px;
  font-size: 1.6rem;
  line-height: calc(7.5vh);
}
.top-logo {
  padding-right: 60px;
  font-size: 1.6rem;
  line-height: calc(5.5vh);
  text-align: right;
}
.logo_box {
  display: inline-block;
  margin-top: 1rem;
  text-align: center;
  line-height: 3.5rem;
  width: 8rem;
  height: 3.5rem;
  background-size: 100% 100%;
  background-image: url('~assets/boxStyle/arock/logo.png');
  background-repeat: no-repeat;
  font-weight: bold;
}
.top-name {
  margin-top: 0.8rem;
  margin-bottom: 0.1rem;
  font-size: 2.5rem;
  text-align: center;
}
.top-name-sub {
  font-size: 1.1rem;
  text-align: center;
}
.top-duration {
  font-weight: bold;
  color: #ffcc00;
}
.top-prominent {
  margin-top: calc(1.7vh);
  margin-left: 25px;
  margin-right: 25px;
  height: calc(10vh);
  display: grid;
  grid-template-columns: calc(100% / 5) calc(100% / 5) calc(100% / 5) calc(
      100% / 5
    ) calc(100% / 5);
}
.big-box {
  margin-top: calc(1.7vh);
  margin-left: 25px;
  margin-right: 25px;
  display: grid;
  grid-template-columns: calc(10% * 2.5) calc(10% * 7.5);
  /*grid-column-gap: 1rem;*/
}

.prominent-item {
  height: calc(10vh);
  background-image: url('~assets/boxStyle/prominent.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.prom-name {
  margin-top: calc(1.7vh);
  text-align: center;
  font-size: 1.4rem;
}

.prom-con {
  font-size: 2.2rem;
  text-align: center;
  font-weight: bold;
  line-height: 3rem;
  color: #0068ff;
}
.prom-unit {
  font-size: 1.4rem;
}
.lt {
  width: 100%;
  height: calc(26vh);
  background-image: url('~assets/boxStyle/arock/lt.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
}
.lt-center {
  width: 100%;
  height: calc(24vh);
  background-image: url('~assets/boxStyle/arock/lt.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
}
.lb {
  margin-top: 0.6rem;
  width: 100%;
  height: calc(26vh);
  background-image: url('~assets/boxStyle/arock/lb.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.rt {
  width: 100%;
  height: calc(53.3vh);
}
.worldMap {
  width: calc(55vw);
  height: calc(48vh);
}
.rb {
  width: 100%;
  height: calc(23vh);
  /*display: grid;
    grid-template-columns: 50% 50%;*/
}
.rb-l {
  width: 100%;
  height: calc(23vh);
  background-image: url('~assets/boxStyle/arock/rb-l.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.rb-r {
  width: 100%;
  height: calc(21vh);
  background-image: url('~assets/boxStyle/arock/rb-r.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.lt-name {
  width: 100%;
  height: 4.5rem;
  padding-top: 1rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  font-family: '微软雅黑', 'QTFuture BT';
  font-weight: bold;
}
.echarts-title {
  padding-left: 1rem;
  padding-top: 0.1rem;
  display: inline-block;
  background-image: url('~assets/boxStyle/echarts-title.png');
  background-repeat: no-repeat;
  background-position-x: 0;
  background-position-y: 0;
  background-size: contain;
}
.lt-con {
  width: 100%;
  padding: 0 1rem;
  height: calc(55vh - 4.5rem);
}

.rt-name {
  width: 100%;
  height: 4rem;
  padding-top: 1rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
}

.rt-con {
  width: 100%;
  padding: 0 1rem;
  height: calc(26vh - 4rem);
}
.rb-l-name {
  width: 100%;
  height: 4rem;
  padding-top: 1rem;
  padding-left: 2rem;
  font-size: 1.4rem;
  font-weight: bold;
}
.rb-l-con,
.rb-r-con {
  width: 99%;
  height: calc(23vh - 5rem);
}
.rb-r-name {
  width: 100%;
  height: 4rem;
  padding-top: 1rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
}
.lt-con-name {
  font-size: 1.1rem;
  width: 100%;
  height: calc(5vh);
  line-height: calc(5vh);
  text-align: center;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
.lt-con-ul {
  font-size: 1.1rem;
  width: 100%;
  height: calc(5vh);
  text-align: center;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
.lt-con-ul div {
  width: 100%;
  height: calc(5vh);
  line-height: calc(5vh);
}
</style>
