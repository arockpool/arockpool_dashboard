<template>
  <div class="dashboard-box">
    <div class="top_title"></div>
    <div class="top_title_box">
      <div class="top_box">
        <div class="top_time">{{currentTime}}</div>
      </div>
      <div class="top_box">
        <div class="top_title_big">
          <img
            src="~/assets/boxStyle/filecoin_index.png"
            style="width: 35rem; margin: 0.5rem auto 0.6rem; "
          />
        </div>
        <div class="top_title_sub">
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
      <div class="top_box">
        <div class="top_logo">
          <span class="logo_box">Mainnet</span>
        </div>
      </div>
      <div style="margin-top: -1rem">
        <div class="common-column prominent">
          <div class="prom-item">
            <div class="porm-name">区块高度</div>
            <div class="porm-con">
              <span>{{overview.height}}</span>
            </div>
          </div>
          <div class="prom-item">
            <div class="porm-name">全网有效算力</div>
            <div class="porm-con">
              <span>{{overview.total_power_str.split(' ')[0]}}</span>
              <span class="porm-unit">{{overview.total_power_str.split(' ')[1]}}</span>
            </div>
          </div>
          <div class="prom-item">
            <div class="porm-name">全网总产出</div>
            <div class="porm-con">
              <span>{{overview.total_rewards}}</span>
              <span class="porm-unit">FIL</span>
            </div>
          </div>
          <div class="prom-item">
            <div class="porm-name">全网质押量</div>
            <div class="porm-con">
              <span>{{overview.total_pledge}}</span>
              <span class="porm-unit">FIL</span>
            </div>
          </div>
          <div class="prom-item">
            <div class="porm-name">当前质押</div>
            <div class="porm-con">
              <span>{{overview.avg_pledge}}</span>
              <span class="porm-unit">FIL/TiB</span>
            </div>
          </div>
          <div class="prom-item">
            <div class="porm-name">24h产出效率</div>
            <div class="porm-con">
              <span>{{overview.avg_reward}}</span>
              <span class="porm-unit">FIL/TiB</span>
            </div>
          </div>
        </div>
      </div>
      <div class="common-column center-box">
        <div>
          <div class="clt">
            <div class="echarts-name">
              <div style="display: grid; grid-template-columns: 50% 50%">
                <span class="echarts-title">全网算力走势(EiB)</span>
                <span
                  style="font-size: 1rem; padding-right: 1rem; line-height: 2rem; text-align: right;"
                >24h算力增长：{{computationalPower}} PiB</span>
              </div>
            </div>
            <div id="clt" class="echarts"></div>
          </div>
          <div class="clb">
            <div class="echarts-name">
              <span class="echarts-title">全网产出效率走势(FIL/TiB)</span>
            </div>
            <div id="clb" class="echarts"></div>
          </div>
        </div>
        <div style="position: relative;">
          <div id="three"></div>
          <div class="news-position" v-if="showNews.length > 0">
            <div class="news-box">
              <div class="inner-box">
                <el-carousel height="100px" direction="vertical" :interval="20000">
                  <el-carousel-item v-for="(item, index) in showNews" :key="index">
                    <div>
                      <div
                        style="font-size: 1.4rem; font-weight: bold; color: #FFCC00;"
                      >{{item.title}}</div>
                      <div style="font-size: 1.3rem; text-align: justify;">{{item.content}}</div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="crt">
            <div class="echarts-name">
              <span class="echarts-title">存储供应商排名前20</span>
            </div>
            <div id="crt" class="echarts"></div>
          </div>
          <div class="crb">
            <div class="echarts-name">
              <span class="echarts-title">全球有效算力分布</span>
            </div>
            <div id="crb" class="echarts"></div>
          </div>
        </div>
      </div>
      <div class="common-column">
        <div class="bottom-box">
          <div>
            <div class="bl-name">
              <div style="text-align: left;">近半小时出块</div>
              <div style="text-align: right;">
                最新区块时间:
                <span
                  style="color: #E5963D; font-family: '微软雅黑' !important;"
                >{{nearUpdateTimeString}}</span>之前
              </div>
            </div>
            <div class="bl" id="bl"></div>
          </div>
          <div>
            <div class="br-name">
              <div style="text-align: left;padding-left: 1rem;">存储供应商</div>
              <div>出块率</div>
              <div style="text-align: right;padding-right: 1rem;">出块/占比</div>
            </div>
            <div class="br" id="br">
              <ul class="br-ul">
                <li class="br-name" v-for="(item, index) in brData" :key="index">
                  <div style="text-align: left;">
                    <span class="li-disc" :style="`background-color: ${item.color}`"></span>
                    {{item.miner_address}}
                  </div>
                  <div>{{item.block_rate}}%</div>
                  <div
                    style="text-align: right;padding-right: 1rem;"
                  >{{item.win_count}}/{{item.win_count_ratio}}%</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import moment from "moment";
import * as THREE from 'three';
import dot from '~/assets/uploads/user_upload/39231/dot.png';
import earth_map from '~/assets/uploads/user_upload/39231/earth.jpg';
import clouds from '~/assets/uploads/user_upload/39231/clouds.jpg';
import utils from '~/static/utils.js';
import BigNumber from 'bignumber.js';

const colorList = [
  '#EC7B67', '#C0FABF', '#E97B9F', '#87FBC7',
  '#6868F6', '#EB6974', '#A876F7', '#A4D06C',
  '#B3CFE7', '#7D58BD', '#35731F', '#D7AE73',
  '#F6CB65', '#F0805A', '#7DEE86', '#671AD1',
  '#64A1E2', '#43D87C', '#F765BF', '#A87FD1',
  '#F7CA7E', '#C9CBFF', '#E4ED42', '#ED3A0E',
  '#50840B', '#FF9D82', '#BA4A2E', '#3A68B2',
  '#11F91D', '#BC6234', '#913BFF', '#6B69FF',
];
const earth = function (_this) {
  document.querySelector('#three').innerHTML = '';

  const CITY_RADIUS = -10,
    CITY_MARGIN = 0,
    BLINT_SPEED = 0.04,
    HEXAGON_RADIUS = 5,
    radius = 180
  let scene, camera, renderer, clock, control, plane1, plane2, earthImgData
  let earthImg, earthData, earthParticles = new THREE.Object3D(),
    cloud = new THREE.Object3D(),
    dotTexture = new THREE.TextureLoader().load(dot)

  main()

  function main() {
    earthImg = document.createElement('img')
    earthImg.src = earth_map
    earthImg.onload = () => {
      let earthCanvas = document.createElement('canvas')
      let earthCtx = earthCanvas.getContext('2d')
      earthCanvas.width = earthImg.width
      earthCanvas.height = earthImg.height
      earthCtx.drawImage(earthImg, 0, 0, earthImg.width, earthImg.height)
      earthImgData = earthCtx.getImageData(0, 0, earthImg.width, earthImg.height)
      // basic scene
      createBasicScene()
      // 球面打点
      createEarthParticles()
      // 云层
      createCloudGrid()

      animate()
    }
  }

  function createBasicScene() {
    let width = window.document.querySelector('#three').clientWidth,
      height = window.document.querySelector('#three').clientHeight
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000)
    camera.position.z = 500
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    renderer.setClearColor(0x00050C, 1);
    document.querySelector('#three').appendChild(renderer.domElement)
    clock = new THREE.Clock()
    let axes = new THREE.AxesHelper(CITY_RADIUS + 10)
    scene.add(axes)

    window.addEventListener('resize', resize)
  }

  function createEarthParticles() {
    let positions = []
    let materials = []
    let sizes = []
    for (var i = 0; i < 2; i++) {
      positions[i] = {
        positions: []
      }
      sizes[i] = {
        sizes: []
      }
      let mat = new THREE.PointsMaterial()
      mat.size = 6
      mat.color = new THREE.Color(0x0068FF)
      mat.map = dotTexture
      mat.depthWrite = false
      mat.transparent = true
      mat.opacity = 1
      mat.side = THREE.FrontSide
      mat.blending = THREE.AdditiveBlending
      let n = i / 2
      mat.t_ = n * Math.PI * 2
      mat.speed_ = BLINT_SPEED
      mat.min_ = .2 * Math.random() + .5
      mat.delta_ = .1 * Math.random() + .1
      mat.opacity_coef_ = 1
      materials.push(mat)
    }
    var spherical = new THREE.Spherical
    spherical.radius = radius
    const step = 250
    for (let i = 0; i < step; i++) {
      let vec = new THREE.Vector3
      let radians = step * (1 - Math.sin(i / step * Math.PI)) / step + .5 // 每个纬线圈内的角度均分
      for (let j = 0; j < step; j += radians) {
        let c = j / step, // 底图上的横向百分比
          f = i / step, // 底图上的纵向百分比
          index = Math.floor(2 * Math.random())
        let pos = positions[index]
        let size = sizes[index]
        if (isLandByUV(c, f)) { // 根据横纵百分比判断在底图中的像素值
          spherical.theta = c * Math.PI * 2 - Math.PI / 2 // 横纵百分比转换为theta和phi夹角
          spherical.phi = f * Math.PI // 横纵百分比转换为theta和phi夹角
          vec.setFromSpherical(spherical) // 夹角转换为世界坐标
          pos.positions.push(vec.x)
          pos.positions.push(vec.y)
          pos.positions.push(vec.z)
          if (j % 3 === 0) {
            size.sizes.push(6.0)
          }
        }
      }
    }
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i],
        size = sizes[i],
        bufferGeom = new THREE.BufferGeometry,
        typedArr1 = new Float32Array(pos.positions.length),
        typedArr2 = new Float32Array(size.sizes.length)
      for (let j = 0; j < pos.positions.length; j++) {
        typedArr1[j] = pos.positions[j]
      }
      for (let j = 0; j < size.sizes.length; j++) {
        typedArr2[j] = size.sizes[j]
      }
      bufferGeom.addAttribute("position", new THREE.BufferAttribute(typedArr1, 3))
      bufferGeom.addAttribute('size', new THREE.BufferAttribute(typedArr2, 1))
      bufferGeom.computeBoundingSphere()
      let particle = new THREE.Points(bufferGeom, materials[i])
      earthParticles.add(particle)
    }
    scene.add(earthParticles)
  }

  function createCloudGrid() {
    const XRayMaterial = function (options) {
      let uniforms = {
        uTex: {
          type: "t",
          value: options.map || new THREE.Texture
        },
        offsetRepeat: {
          value: new THREE.Vector4(0, 0, 1, 1)
        },
        alphaProportion: {
          type: "1f",
          value: options.alphaProportion || .5
        },
        diffuse: {
          value: options.color || new THREE.Color(0x0068FF)
        },
        opacity: {
          value: options.opacity || 1
        },
        gridOffset: {
          value: 0
        }
      }
      return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
varying float _alpha;
varying vec2 vUv;
uniform vec4 offsetRepeat;
uniform float alphaProportion;
void main() {
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
vUv = uv * offsetRepeat.zw + offsetRepeat.xy;
vec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );
vec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);
_alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );
_alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );
}`,
        fragmentShader: `
uniform sampler2D uTex;
uniform vec3 diffuse;
uniform float opacity;
uniform float gridOffset;
varying float _alpha;
varying vec2 vUv;
void main() {
vec4 texColor = texture2D( uTex, vUv );
float _a = _alpha * opacity;
if( _a <= 0.0 ) discard;
_a = _a * ( sin( vUv.y * 2000.0 + gridOffset ) * .5 + .5 );
gl_FragColor = vec4( texColor.rgb * diffuse, _a );
}`,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        depthTest: !1
      })
    }
    let geometry = new THREE.SphereGeometry(1.3 * radius, 60, 40),
      map = new THREE.TextureLoader().load(clouds)
    map.wrapT = THREE.ClampToEdgeWrapping
    map.wrapS = THREE.ClampToEdgeWrapping
    let material = new XRayMaterial({
      map: map,
      alphaProportion: .05,
      color: new THREE.Color(0x0068FF),
      opacity: .5,
      gridOffsetSpeed: .6
    }),
      mesh = new THREE.Mesh(geometry, material)
    mesh.matrixAutoUpdate = !1
    cloud.add(mesh)
    scene.add(cloud)
  }

  function resize() {
    renderer.setSize(window.document.querySelector('#three').clientWidth, window.document.querySelector('#three').clientHeight)
    camera.aspect = window.document.querySelector('#three').clientWidth / window.document.querySelector('#three').clientHeight
    camera.updateProjectionMatrix()
  }

  function render() {
    let delta = clock.getDelta()
    /*control.update(delta)*/
    renderer.render(scene, camera)
  }

  function animate() {
    requestAnimationFrame(animate)
    // 球面粒子闪烁
    let objects = earthParticles.children
    objects.forEach(obj => {
      let material = obj.material
      material.t_ += material.speed_
      material.opacity = (Math.sin(material.t_) * material.delta_ + material.min_) * material.opacity_coef_
      material.needsUpdate = true
    })

    scene.rotation.y += 0.004;

    cloud.rotation.y -= 0.01;
    render()
  }

  function createPosition(lnglat) {
    let spherical = new THREE.Spherical
    spherical.radius = radius
    const lng = lnglat[0]
    const lat = lnglat[1]
    const theta = (lng + 90) * (Math.PI / 180)
    const phi = (90 - lat) * (Math.PI / 180)
    spherical.phi = phi
    spherical.theta = theta
    let position = new THREE.Vector3()
    position.setFromSpherical(spherical)
    return position
  }

  function isLandByUV(c, f) {
    if (!earthImgData) { // 底图数据
      console.error('data error!')
    }
    let n = parseInt(earthImg.width * c) // 根据横纵百分比计算图象坐标系中的坐标
    let o = parseInt(earthImg.height * f) // 根据横纵百分比计算图象坐标系中的坐标
    return 0 === earthImgData.data[4 * (o * earthImgData.width + n)] // 查找底图中对应像素点的rgba值并判断
  }

};

const colorWare = function (params) {
  return colorList[Math.floor(Math.random() * 32)]
};

const clt = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('clt'))
  let min = 0;
  let seriesData = _this.trend.map(item => {
    let res = item.power_str.split(' ');
    return res[0];
  });

  min = (new BigNumber(Math.min(...seriesData))).minus(0.01).decimalPlaces(2).toNumber();

  // 开始渲染
  myChart.setOption({
    tooltip: {},
    grid: {
      top: '10%',
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
          fontSize: 9,
          color: '#fff'
        },
        interval: 0
      },
      data: _this.trend.map(item => {
        let date = item.date.split('-');
        return `${date[1]}-${date[2]}`
      })
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
      min
    },
    series: [{
      name: '算力走势',
      type: 'bar',
      barWidth: '60%',
      data: seriesData,
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
    }]
  })
};
const clb = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('clb'))
  let min = 0;
  let max = 0.3;
  let seriesData = _this.trend.map(item => item.avg_reward);

  min = (new BigNumber(Math.min(...seriesData))).minus(0.01).decimalPlaces(3).toNumber();
  max = (new BigNumber(Math.max(...seriesData))).plus(0.01).decimalPlaces(3).toNumber();

  // 开始渲染
  myChart.setOption({
    tooltip: {},
    grid: {
      top: '6%',
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
          fontSize: 9,
          color: '#fff'
        },
        interval: 0
      },
      data: _this.trend.map(item => {
        let date = item.date.split('-');
        return `${date[1]}-${date[2]}`
      })
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
        formatter: `{value}`,
        interval: 0
      },
      min,
      max,
      splitNumber: 6
    },
    series: [{
      name: '产出效率',
      type: 'line',
      data: seriesData,
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
const crt = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('crt'))
  // 开始渲染
  myChart.setOption({
    grid: {
      top: '2%',
      left: '18%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          width: 0,
          color: '#063481'
        },
      },
      axisLabel: {
        show: false,
        textStyle: {
          color: '#fff',
          fontFamily: 'QTFuture BT'
        },
      },
    },
    yAxis: [
      {
        axisTick: {
          show: true
        },
        axisLine: {
          lineStyle: {
            type: 'solid',
            width: 0,
            color: '#063481'
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            align: 'left',
            fontFamily: 'QTFuture BT',
            fontSize: 9,
            padding: [0, 0, 0, -50]
          },
          interval: 0
        },
        type: 'category',
        data: _this.crtData.map(item => item.miner_address),

      },
      {
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            type: 'solid',
            width: 0,
            color: '#063481'
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontFamily: 'QTFuture BT',
            fontSize: 9,
          },
          formatter: '{value}',
          interval: 0
        },
        type: 'category',
        data: _this.crtData.map(item => item.power_str),

      }
    ],
    series: [
      {
        type: 'bar',
        data: _this.crtData.map(item => {
          let val = item.power_str.split(' ')[0];

          if (['f02614', 'f09652', 'f010424', 'f03362', 'f020928', 'f039992'].indexOf(item.miner_address) >= 0) {
            val = {
              value: item.power_str.split(' ')[0],
              itemStyle: {
                color: new _this.$echarts.graphic.LinearGradient(0, 0, 2, 0, [{
                  offset: 0.2,
                  color: '#EB9BA2'
                }, {
                  offset: 0.5,
                  color: '#FFCC00'
                }]),
              }
            };
          }

          return val;
        }),
        label: {
          show: true,
          position: 'insideLeft',
          textStyle: {
            color: '#FFFFFF'
          },
          formatter: function (val) {
            return _this.rk[val.value];
          }
        },
        itemStyle: {
          normal: {
            color: new _this.$echarts.graphic.LinearGradient(0, 0, 2, 0, [{
              offset: 0.2,
              color: '#846CF9'
            }, {
              offset: 0.5,
              color: '#0068FF'
            }]),
          }
        }
      }
    ]
  })
};
const crb = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('crb'))
  // 开始渲染
  myChart.setOption({
    grid: {
      top: '4%',
      left: '4%',
      right: '10%',
      bottom: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : ({d}%)'
    },
    series: [
      {
        name: '全球有效算力',
        type: 'pie',
        radius: '75%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: [
          { value: _this.distribution.south_america, name: '南美洲' },
          { value: _this.distribution.africa, name: '非洲' },
          { value: _this.distribution.asia, name: '亚洲' },
          { value: _this.distribution.europe, name: '欧洲' },
          { value: _this.distribution.north_america, name: '北美洲' },
          { value: _this.distribution.oceania, name: '大洋洲' },
        ],
        itemStyle: {
          normal: {
            color: function (params) {
              //自定义颜色
              var colorList = [
                '#F6CB65',
                '#69C682',
                '#EC7B67',
                '#0068FF',
                '#846CF9',
                '#57F9F7',
              ];
              return colorList[params.dataIndex]
            }
          }
        },
        labelLine: {           //引导线设置
          normal: {
            show: true,       //引导线不显示
            length: 1,  // 改变标示线的长度
            lineStyle: {
              color: "#2E343E"  // 改变标示线的颜色
            }

          }
        },
        label: {
          formatter: function (e) {
            return `{white|${e.data.name}：}{yellow|${e.percent}%}`;
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
      }
    ]
  })
};
const bl = function (_this) {
  let myChart = _this.$echarts.init(document.getElementById('bl'))
  let tipsets = JSON.parse(JSON.stringify(_this.list.tipsets));
  let lay = [], max = 0;
  // 获取最大的爆块矿工个数
  tipsets.map((item) => {
    max = max >= item.blocks.length ? max : item.blocks.length;
  });

  for (let i = 0; i < max; i++) {
    for (let j = 0; j < tipsets.length; j++) {
      if (typeof lay[i] === "undefined") lay[i] = [];
      let block = tipsets[j].blocks.shift();
      if (typeof block !== "undefined") {
        lay[i].push(1); // block.win_count
      } else {
        lay[i].push(0);
      }
    }
  }

  // 开始渲染
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {        // 坐标轴指示器，坐标轴触发有效
        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: '4%',
      left: '2%',
      right: '4%',
      bottom: '8%',
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
      },
      type: 'category',
      data: tipsets.map(item => item.height).reverse(),
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
      },
      type: 'value',
    },
    series: lay.map((item, index) => {
      return {
        name: '',
        type: 'bar',
        stack: 'block',
        label: {
          show: false,
          position: 'insideRight',

        },
        itemStyle: {
          normal: {
            color: colorWare,
          }
        },
        data: item.reverse()
      }
    })
  });
};
// 矿工添加名次
const setRanking = (ranking) => {
  let rking = ranking.map(item => item.power_str.split(' ')[0]).sort(function (a, b) { return b - a });
  let rk = {};
  for (let i = 0; i < rking.length; i++) {
    rk[rking[i]] = `top ${i + 1}`;
  }
  return rk;
}

export default {
  name: 'Index',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {

  },

  async asyncData({ app }) {
    let over = await app.$axios.post('/api/get_overview');
    let power_trend = await app.$axios.post('/api/get_power_trend');
    let miner_ranking = await app.$axios.post('/api/get_miner_ranking');
    let block_list = await app.$axios.post('/api/get_block_list');
    let power_distribution = await app.$axios.post('/api/get_power_distribution');
    let overview = {};
    let trend = {};
    let ranking = {};
    let list = {};
    let distribution = {};
    let rk = {};

    if (over.code === 0) {
      over.data.avg_pledge = (new BigNumber(over.data.avg_pledge)).multipliedBy(32).decimalPlaces(4).toNumber();
      overview = over.data;
    }
    if (power_trend.code === 0) {
      trend = power_trend.data;
    }
    if (miner_ranking.code === 0) {
      ranking = miner_ranking.data;
      rk = setRanking(ranking);
    }
    if (block_list.code === 0) {
      list = block_list.data;
    }

    if (power_distribution.code === 0) {
      distribution = power_distribution.data;
    }

    return {
      overview: {
        ...overview,
        block_reward_24: utils.formatterAmount(overview.block_reward_24, 2),
        height: utils.formatterAmount(overview.height, 2),
        total_pledge: utils.formatterAmount(overview.total_pledge, 2),
        total_rewards: utils.formatterAmount(overview.total_rewards, 2),
        total_power_str: overview.total_power_str,
      },
      trend: trend.reverse(),
      ranking: ranking.reverse(),
      list,
      distribution,
      rk,
      showNews: []
    }
  },

  data: function () {
    return {
      colorList: (function (colorList) {
        return [...colorList]
      })(colorList),
      currentTime: '',
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      crtData: [],
      brData: [],
      nearUpdateTime: null,
      nearUpdateTimeString: '',
      computationalPower: '',
    }
  },

  methods: {
    getComputationalPower() {
      this.$axios.post('/api/get_calculate_info').then(res => {

        if (res.code === 0) {
          this.computationalPower = res.data.increase_power_per_day_str;
        }
      }).catch(err => { });
    },
    refreshData() {
      let _this = this;
      setInterval(async function () {
        let power_trend = await _this.$axios.post('/api/get_power_trend');
        let miner_ranking = await _this.$axios.post('/api/get_miner_ranking');
        let power_distribution = await _this.$axios.post('/api/get_power_distribution');
        let trend = {};
        let ranking = {};

        if (power_trend.code === 0) {
          trend = power_trend.data;
          _this.trend = trend.reverse();
        }
        if (miner_ranking.code === 0) {
          ranking = miner_ranking.data;

          // 添加名次
          _this.rk = setRanking(ranking);

          _this.ranking = ranking.reverse();
        }

        if (power_distribution.code === 0) {
          _this.distribution = power_distribution.data;
        }

        _this.per();
        _this.getNews();
      }, 100000);
    },
    // 每秒
    getCurrentTimeAndDurationTime() {
      let _this = this;
      setInterval(function () {
        _this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

        _this.day = moment().diff(moment(new Date("2020/10/15")), 'days');
        _this.hour = moment().format('HH');
        _this.minute = moment().format('mm');
        _this.second = moment().format('ss');

        let min = moment().diff(moment(_this.nearUpdateTime), "minutes");
        let sec = moment().diff(moment(_this.nearUpdateTime), "second") % 60;
        _this.nearUpdateTimeString = `${min > 0 ? `${min}min` : ''}${sec > 0 ? `${sec}s` : '30s'}`

      }, 1000);
    },
    crtAnimate() {
      let _this = this, start_key = 0, end_key = 10, start_br = 0, end_br = 5;
      setInterval(function () {
        _this.crtData = _this.ranking.slice(start_key, end_key);
        start_key++;
        end_key++;
        if (end_key > _this.ranking.length) {
          start_key = 0;
          end_key = 10;
        }
        crt(_this);

        let cindex = start_br;
        _this.brData = _this.list.miners.slice(start_br, end_br).map(item => {
          item.color = colorList[cindex % 32];
          cindex++;
          return item;
        });
        start_br++;
        end_br++;
        if (end_br > _this.list.miners.length) {
          start_br = 0;
          end_br = 5;
        }



      }, 4000);

    },
    per() {
      clt(this); //柱状图
      clb(this); //折线图
      crb(this); //饼状图
      // earth(this); //地球
    },
    perHalfMinuteUpdate() {
      let _this = this;
      setInterval(async function () {

        _this.$axios.post('/api/get_block_list').then((block_list) => {
          if (block_list.code === 0) {
            _this.list = block_list.data;
          }
          bl(_this); // 底部柱状图
          _this.nearUpdateTime = (new Date).valueOf();
        }).catch(() => { });


        _this.$axios.post('/api/get_overview').then((over) => {

          if (over.code === 0) {
            over.data.avg_pledge = (new BigNumber(over.data.avg_pledge)).multipliedBy(32).decimalPlaces(4).toNumber();
            let overview = over.data;

            _this.overview = {
              ...overview,
              block_reward_24: utils.formatterAmount(overview.block_reward_24, 2),
              height: utils.formatterAmount(overview.height, 2),
              total_pledge: utils.formatterAmount(overview.total_pledge, 2),
              total_rewards: utils.formatterAmount(overview.total_rewards, 2),
              total_power_str: overview.total_power_str,
            }
          }

        }).catch(() => { });
        _this.getComputationalPower();
      }, 30000); // 三十秒刷新一次
    },
    getNews() {
      this.$axios.post('/api/get_notice_list').then((res) => {
        if (res.code === 0) {
          this.showNews = res.data.objs;
        }
      }).catch(() => { });
    }
  },

  mounted: function () {
    this.getNews();
    this.getComputationalPower();
    this.nearUpdateTime = (new Date).valueOf();
    this.getCurrentTimeAndDurationTime();

    // 初始化
    this.per();
    earth(this);
    crt(this); //横向柱状图
    bl(this); // 底部柱状图


    // 定时器
    this.crtAnimate();
    this.perHalfMinuteUpdate();

    this.refreshData();

    window.addEventListener("keydown", utils.keyDownF11, true) // 监听全屏刷新
    setInterval(function () {
      window.location.reload()
    }, 2 * 60 * 60 * 1000)
  },

  beforeDestroy: function () {

  }
}
</script>
<style>
.el-carousel__indicators {
  display: none;
}
#three {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.news-position {
  position: absolute;
  top: -4px;
  left: 0;
  width: 100%;
  height: 100%;
}
.inner-box {
  height: 100%;
  padding: 1.6rem 2.5rem;
}
.news-box {
  width: 86%;
  background-image: url('~assets/boxStyle/news-box.png');
  background-size: 100% 100%;
  margin: 0 auto;
}

.dashboard-box {
  color: #ffffff;
  width: calc(100vw);
  height: calc(100vh);
  background-color: #00050c;
}
.top_title {
  width: calc(100vw);
  height: 486px;
  background-image: url('~assets/boxStyle/top_title.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-x: center;
  background-position-y: -100px;
}
.top_title_box {
  position: absolute;
  top: 0;
  width: calc(100vw);
  display: grid;
  grid-template-columns: calc(33.333vw) calc(33.333vw) calc(33.333vw);
  grid-row-gap: calc(0.9vh);
}
.top_box {
  height: calc(11.8vh);
}
.top_title_big {
  padding-top: 1rem;
}
.top_title_sub {
  text-align: center;
  color: #ffffff;
  font-size: 1.2rem;
}
.top-duration {
  font-weight: bold;
  color: #ffcc00;
}
.top_time {
  position: relative;
  font-size: 1.6rem;
  top: 4rem;
  left: 3rem;
}
.top_logo {
  position: relative;
  font-size: 1.6rem;
  top: 4rem;
  right: 3rem;
  text-align: right;
}
.common-column {
  width: calc(100vw);
  grid-column-start: 1;
  grid-column-end: 4;
  padding-left: 3rem;
  padding-right: 3rem;
}
.prominent {
  display: grid;
  grid-template-columns:
    calc(100% / 6) calc(100% / 6) calc(100% / 6) calc(100% / 6)
    calc(100% / 6) calc(100% / 6);
}
.prom-item {
  position: relative;
  width: 100%;
  top: 0.8rem;
  height: calc(10vh);
  background-image: url('~assets/boxStyle/prominent.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.center-box {
  display: grid;
  grid-template-columns: calc(25%) calc(50%) calc(25%);
  grid-gap: 0;
}
.center-box > div:nth-child(1) {
  height: calc(55.5vh);
}
.center-box > div:nth-child(2) {
  margin-top: 1rem;
  height: calc(55vh);
}
.center-box > div:nth-child(3) {
  height: calc(55.5vh);
}
.bottom-box {
  margin-top: 0.5rem;
  background-image: url('~assets/boxStyle/bottom.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: calc(100%);
  height: calc(18vh);
  display: grid;

  grid-template-columns: calc(85%) calc(15%);
  grid-gap: 0;
}
.bottom-box > div:nth-child(1) {
  height: calc(18vh);
}
.bottom-box > div:nth-child(2) {
  height: calc(18vh);
}
.porm-name {
  margin-top: calc(1.7vh);
  text-align: center;
  font-size: 1.4rem;
}
.porm-con {
  font-size: 2.2rem;
  text-align: center;
  line-height: 3rem;
  font-weight: bold;
  color: #0068ff;
}
.porm-unit {
  font-size: 1.4rem;
}
.clt,
.clb,
.crt,
.crb {
  width: 100%;
  height: calc(27.5vh);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.clt {
  background-image: url('~assets/boxStyle/clt.png');
  margin-top: calc(0.8vh);
  margin-bottom: calc(0.8vh);
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
.echarts-name {
  width: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  padding-top: 1rem;
  padding-left: 1rem;
}
.echarts {
  width: 100%;
  height: calc(22.6vh);
}
.clb {
  background-image: url('~assets/boxStyle/clb.png');
}
.crt {
  background-image: url('~assets/boxStyle/crt.png');
  margin-top: calc(0.8vh);
  margin-bottom: calc(0.8vh);
}
.crb {
  background-image: url('~assets/boxStyle/crb.png');
}
.bl-name {
  height: calc(3vh);
  line-height: calc(3vh);
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: 50% 50%;
  padding-left: 1rem;
  padding-right: 1.5rem;
}
.br-name {
  height: calc(3vh);
  line-height: calc(3vh);
  display: grid;
  grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);
}
.br-name div {
  text-align: center;
}
.bl {
  height: calc(14vh);
}
.li-disc {
  margin-top: 0.6rem;
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}
.logo_box {
  display: inline-block;
  text-align: center;
  line-height: 3.5rem;
  width: 8rem;
  height: 3.5rem;
  background-size: 100% 100%;
  background-image: url('~assets/boxStyle/logo.png');
  background-repeat: no-repeat;
  font-weight: bold;
}
</style>
