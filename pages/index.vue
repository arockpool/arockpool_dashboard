<template>
  <div class="dashboard-box">
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
          <div class="prom-name">存储供应商数</div>
          <div class="prom-con">
            <span>{{pool_overview.miners_count}}</span>
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
          <div class="prom-name">总出产</div>
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
        <div class="prominent-item">
          <div class="prom-name">24h挖矿效率</div>
          <div class="prom-con">
            <span>{{pool_overview.avg_reward}}</span>
            <span class="prom-unit">FIL/TiB</span>
          </div>
        </div>
        <div class="prominent-item">
          <div class="prom-name">最新币价</div>
          <div class="prom-con">
            <span>{{pool_overview.price}}</span>
            <span class="prom-unit">USDT</span>
          </div>
        </div>
      </div>
      <div class="big-box">
        <div class="left-box">
          <div class="lt">
            <div class="lt-name">
              <span class="echarts-title">MINING POOL存储供应商</span>
            </div>
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
            </div>
          </div>
          <div class="lb">
            <div class="rt-name">
              <span class="echarts-title">MINING POOL算力({{minersUnit}})</span>
            </div>
            <div class="rt-con" id="rt-con"></div>
          </div>
        </div>
        <div class="right-box">
          <div class="rt">
            <div class="lamp">
              <span>存储供应商</span>
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
                <div
                  style="color: #FFCC00; font-size: 1.4rem; padding-left: 2.5rem; margin-top: 1.2rem;"
                >{{showInfo.name}}</div>
                <ul style="padding-top: 1rem; padding-left: 2.5rem;">
                  <li style="margin-bottom: 0.4rem">
                    <span class="li-point"></span>
                    <span>MINING POOL规模：</span>
                    {{showInfo.scale}}
                  </li>
                  <li style="margin-bottom: 0.4rem">
                    <span class="li-point"></span>
                    <span>机柜数量：</span>
                    {{showInfo.frames}}
                  </li>
                  <li style="margin-bottom: 0.4rem">
                    <span class="li-point"></span>
                    <span>矿机数量：</span>
                    {{showInfo.machines}}
                  </li>
                  <li>
                    <span class="li-point"></span>
                    <span>总算力：</span>
                    {{showInfo.total_power}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="rb">
            <div class="rb-l">
              <div class="rb-l-name">
                <span class="echarts-title">存储供应商算力增量(TiB)</span>
              </div>
              <div class="rb-l-con" id="rb-l-con"></div>
            </div>
            <div class="rb-r">
              <div class="rb-r-name">
                <span class="echarts-title">MINING POOL挖矿效率(FIL/TiB)</span>
              </div>
              <div class="rb-r-con" id="rb-r-con"></div>
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

const rtCon = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('rt-con'))
  let min = 0;
  min = Number(Math.min(..._this.miners).toString().split('.')[0]);
  // 开始渲染
  myChart.setOption({
    tooltip: {},
    grid: {
      top: '16%',
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
      data: _this.xAxisDate
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
      type: 'bar',
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
      }
    }]
  })
};
const rbLCon = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('rb-l-con'))
  let ckey = 0, legend_data = [], series_data = [];
  Object.getOwnPropertyNames(_this.nodes).forEach((index) => {

    let obj = _this.nodes[index];
    if (obj instanceof Array) {
      legend_data.push(index);
      series_data.push({
        name: index,
        type: 'line',
        stack: 'up',
        data: obj,
        symbolSize: 2,
        itemStyle: {
          normal: {
            color: colorList[ckey]
          }
        },
        lineStyle: {
          width: 1,
        },
      });
      ckey++;
    }

  })



  // 开始渲染
  myChart.setOption({
    legend: {
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
      top: '14%',
      left: '4%',
      right: '6%',
      bottom: '2%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
    series: series_data
  })
};
const rbRCon = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('rb-r-con'))
  let min = 0;
  min = (new BigNumber(Number(Math.min(..._this.rates)))).decimalPlaces(4).toNumber();
  // 开始渲染
  myChart.setOption({
    tooltip: {},
    grid: {
      top: '16%',
      left: '4%',
      right: '4%',
      bottom: '2%',
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
          fontSize: 9,
          color: '#fff'
        },
        interval: 0
      },
      data: _this.xAxisDate
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
          color: '#fff'
        },
        formatter: '{value}',
        interval: 0
      },
      min,
    },
    series: [{
      name: '挖矿效率',
      type: 'line',
      symbolSize: 2,
      label: {
        show: true,
        position: 'top',
        textStyle: {
          fontFamily: 'QTFuture BT',
          fontSize: 9,
          color: '#FFFFFF'
        }
      },
      data: _this.rates,
      itemStyle: {
        normal: {
          color: '#FFCC00',
        }
      },
      lineStyle: {
        width: 1,
      },
    }]
  })
};

const loadChart1 = function (_this) {
  let contain = document.getElementById('worldMap');
  let myChart = _this.$echarts.init(contain);
  let option = {
    backgroundColor: '#00050C',
    series: [{
      type: 'map3D',
      map: worldJson,
      left: -40,
      viewControl: {
        distance: 60
      },
      itemStyle: {

        opacity: 1,
        borderWidth: 1,
        borderColor: '#4bb5ff', // 地图边配色
      },
      environment: '#00050C',
      zoom: 1.2,
      light: {
        main: {
          intensity: 1
        },
        ambient: {
          intensity: 0
        }
      },
    }]
  }
  myChart.setOption(option);
}

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
      /*regions: [{
        name: "China",
        itemStyle: {
          normal: {
            opacity: 1,
            borderColor: "#3386EB",
            borderWidth: 0,
            areaColor: '#666CFB',
          },
        },
      },{
        name: "Australia",
        itemStyle: {
          normal: {
            opacity: 1,
            borderColor: "#3386EB",
            borderWidth: 0,
            areaColor: '#666CFB',
          },
        },
      },{
        name: "United Kingdom",
        itemStyle: {
          normal: {
            opacity: 1,
            borderColor: "#3386EB",
            borderWidth: 0,
            areaColor: '#666CFB',
          },
        },
      }],*/
    },
    series: series
  };
  myChart.setOption(option);

};
export default {
  name: "arock",
  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {

  },
  async asyncData({ app, redirect }) {
    redirect('/at');
    return {};
    let overview = await app.$axios.post('/api/get_pool_overview');
    let miners = await app.$axios.post('/api/get_pool_miners');
    let trend = await app.$axios.post('/api/get_pool_trend');
    let mines = await app.$axios.post('/api/get_pool_mines');
    let last_block_info = await app.$axios.post('/api/get_pool_last_block_info');
    let pool_overview = {}, pool_miners = {}, pool_trend = {}, pool_mines = {}, pool_last_block_info = {};

    if (overview.code === 0) {
      overview.data.total_reward = (new BigNumber(overview.data.total_reward)).decimalPlaces(2).toNumber();
      pool_overview = overview.data;
    }

    if (miners.code === 0) {
      pool_miners = miners.data.map(item => {
        return {
          ...item,
          luck: (new BigNumber(item.luck).multipliedBy(100).toNumber())
        }
      });
    }
    let xAxisDate = [], miner = [], nodes = [], rates = [], minersUnit = '';
    if (trend.code === 0) {
      pool_trend = trend.data;

      let nodeLen = [];

      Object.getOwnPropertyNames(pool_trend).forEach((index) => {
        let dateArr = index.split('-');
        let item = pool_trend[index];
        xAxisDate.push(`${dateArr[1]}-${dateArr[2]}`);
        miner.push(item.power_str.split(' ')[0]);
        if (minersUnit === '') minersUnit = item.power_str.split(' ')[1];
        nodeLen.push(item.increase_powers.length);
        nodes.push(item.increase_powers);
        rates.push((new BigNumber(item.avg_reward).decimalPlaces(4).toNumber()));
      });

      let d7 = {};

      nodes[nodeLen.indexOf(Math.max(...nodeLen))].map(item => {
        d7[item.miner_address] = [
          0, 0, 0, 0, 0, 0, 0
        ];
      });


      for (let j = 0; j < nodes.length; j++) {
        nodes[j].map(item_node => {
          if (typeof item_node.miner_address !== 'undefined') {
            let tib = (item_node.increase_power / 1099511627776).toString().split('.');
            d7[item_node.miner_address][j] = Number(`${tib[0]}${typeof tib[1] !== 'undefined' ? `.${tib[1].substring(0, 4)}` : ''}`);
          }

        });
      }
      nodes = d7;
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

    let i = 0;
    if (last_block_info.code === 0) {
      pool_last_block_info = last_block_info.data;
      let time_diff = moment().diff(pool_last_block_info.block_time * 1000);
      let minute = Number((time_diff / 1000 / 60).toString().split('.')[0]);
      let second = Number(((time_diff / 1000) % 60).toString().split('.')[0]);

      if (minute < 0 || second < 0) {
        minute = 0;
        second = i++;

        let time_diff = second;
        minute = Number((time_diff / 1000 / 60).toString().split('.')[0]);
        second = Number(((time_diff / 1000) % 60).toString().split('.')[0]);
      }

      pool_last_block_info.minute = minute;
      pool_last_block_info.second = second;
    }




    return {
      pool_overview,
      pool_miners,
      xAxisDate,
      miners: miner,
      mapJson,
      mines,
      nodes,
      rates,
      minersUnit,
      pool_mines,
      pool_last_block_info
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
    }
  },
  methods: {
    getCurrentTimeAndDurationTime() {
      let _this = this;
      setInterval(function () {
        _this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

        _this.day = moment().diff(moment(new Date("2020/10/15")), 'days');
        _this.hour = moment().format('HH');
        _this.minute = moment().format('mm');
        _this.second = moment().format('ss');

        _this.$axios.post('/api/get_pool_last_block_info').then(last_block_info => {
          let i = 0;
          if (last_block_info.code === 0) {
            _this.pool_last_block_info = last_block_info.data;
            let time_diff = moment().diff(_this.pool_last_block_info.block_time * 1000);
            let minute = Number((time_diff / 1000 / 60).toString().split('.')[0]);
            let second = Number(((time_diff / 1000) % 60).toString().split('.')[0]);

            if (minute < 0 || second < 0) {
              minute = 0;
              second = i++;

              let time_diff = second;
              minute = Number((time_diff / 1000 / 60).toString().split('.')[0]);
              second = Number(((time_diff / 1000) % 60).toString().split('.')[0]);
            }

            _this.pool_last_block_info.minute = minute;
            _this.pool_last_block_info.second = second;
          }
        }).catch(() => { });
        _this.$axios.post('/api/get_pool_overview').then((overview) => {
          if (overview.code === 0) {
            overview.data.total_reward = (new BigNumber(overview.data.total_reward)).decimalPlaces(2).toNumber();
            _this.pool_overview = overview.data;
          }
        }).catch(() => { });

      }, 1000);
    },
    oneDay() {
      let _this = this;
      setInterval(function () {
        _this.$axios.post('/api/get_pool_miners').then((miners) => {
          if (miners.code === 0) {
            _this.pool_miners = miners.data.map(item => {
              return {
                ...item,
                luck: (new BigNumber(item.luck).multipliedBy(100).toNumber())
              }
            });
          }
        }).catch(() => { });
        _this.$axios.post('/api/get_pool_trend').then((trend) => {
          if (trend.code === 0) {
            let pool_trend = trend.data;

            let nodeLen = [], xAxisDate = [], nodes = [], miner = [], rates = [], minersUnit = '';

            Object.getOwnPropertyNames(pool_trend).forEach((index) => {
              let dateArr = index.split('-');
              let item = pool_trend[index];
              xAxisDate.push(`${dateArr[1]}-${dateArr[2]}`);
              miner.push(item.power_str.split(' ')[0]);
              if (minersUnit === '') minersUnit = item.power_str.split(' ')[1];
              nodeLen.push(item.increase_powers.length);
              nodes.push(item.increase_powers);
              rates.push((new BigNumber(item.avg_reward).decimalPlaces(4).toNumber()));
            });

            let d7 = {};

            nodes[nodeLen.indexOf(Math.max(...nodeLen))].map(item => {
              d7[item.miner_address] = [
                0, 0, 0, 0, 0, 0, 0
              ];
            });


            for (let j = 0; j < nodes.length; j++) {
              nodes[j].map(item_node => {
                if (typeof item_node.miner_address !== 'undefined') {
                  let tib = (item_node.increase_power / 1099511627776).toString().split('.');
                  d7[item_node.miner_address][j] = Number(`${tib[0]}${typeof tib[1] !== 'undefined' ? `.${tib[1].substring(0, 4)}` : ''}`);
                }

              });
            }
            nodes = d7;
            _this.xAxisDate = xAxisDate;
            _this.nodes = nodes;
            _this.miners = miner;
            _this.rates = rates;
            _this.minersUnit = minersUnit;
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
      }, 86000000);
    }
  },
  mounted() {
    let _this = this;
    this.worldJson = worldJson;
    rtCon(this);
    rbLCon(this);
    rbRCon(this);
    let mKey = 0;
    _this.showPointer = [
      _this.mapJson[mKey].lineS,
      _this.mapJson[mKey].lineE,
    ]; // [data[1].lineS,data[1].lineE]
    _this.showInfo = {
      ..._this.mapJson[mKey]
    };
    loadChart(this);

    setInterval(function () {
      mKey++;
      if (mKey >= _this.mapJson.length) mKey = 0;

      _this.showPointer = [
        _this.mapJson[mKey].lineS,
        _this.mapJson[mKey].lineE,
      ];

      /*let ttt = setTimeout(function () {
        _this.$refs.minerIntro.classList.add('animate__bounceInLeft');
        _this.$refs.minerIntro1.classList.add('animate__bounceInLeft');
        _this.$refs.minerIntro.classList.remove('animate__bounceOutRight');
        _this.$refs.minerIntro1.classList.remove('animate__bounceOutRight');
        let tt = setTimeout(function () {
          _this.$refs.minerIntro.classList.remove('animate__bounceInLeft');
          _this.$refs.minerIntro1.classList.remove('animate__bounceInLeft');
          clearTimeout(tt);
        }, 400);
        clearTimeout(ttt);
      }, 600);
      _this.$refs.minerIntro.classList.add('animate__bounceOutRight');
      _this.$refs.minerIntro1.classList.add('animate__bounceOutRight');*/

      _this.showInfo = {
        ..._this.mapJson[mKey]
      };

      loadChart(_this);
    }, 6000);

    this.oneDay();
    this.getCurrentTimeAndDurationTime();
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
  margin-left: calc((((100% - 1rem) / 10) * 7.5) / 4.5);
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
  grid-template-columns: calc(100% / 6) calc(100% / 6) calc(100% / 6) calc(
      100% / 6
    ) calc(100% / 6) calc(100% / 6);
}
.big-box {
  margin-top: calc(1.7vh);
  margin-left: 25px;
  margin-right: 25px;
  display: grid;
  grid-template-columns: calc(((100% - 1rem) / 10) * 2.5) calc(
      ((100% - 1rem) / 10) * 7.5
    );
  grid-column-gap: 1rem;
}

.prominent-item {
  height: calc(10vh);
  background-image: url('~assets/boxStyle/prominent.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.prom-name {
  margin-top: calc(1.6vh);
  text-align: center;
  font-size: 1.4rem;
}

.prom-con {
  font-size: 2.2rem;
  text-align: center;
  font-weight: bold;
  line-height: 2.4rem;
  color: #0068ff;
}
.prom-unit {
  font-size: 1.4rem;
}
.lt {
  width: 100%;
  height: calc(50vh);
  background-image: url('~assets/boxStyle/arock/lt.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.lb {
  margin-top: 0.6rem;
  width: 100%;
  height: calc(25vh);
  background-image: url('~assets/boxStyle/arock/lb.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.rt {
  width: 100%;
  height: calc(55vh);
}
.worldMap {
  width: calc(55vw);
  height: calc(48vh);
}
.rb {
  width: 100%;
  height: calc(20vh);
  display: grid;
  grid-template-columns: 50% 50%;
}
.rb-l {
  width: 100%;
  height: calc(21vh);
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
  height: calc(25vh - 4rem);
}
.rb-l-name {
  width: 100%;
  height: 4rem;
  padding-top: 1rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
}
.rb-l-con,
.rb-r-con {
  width: 99%;
  height: calc(21vh - 5rem);
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
