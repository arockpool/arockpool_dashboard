import Vue from 'vue'

// 引入 ECharts  index.simple 模块 来自以下源码
// https://github.com/apache/incubator-echarts

import echarts from 'echarts';
import 'echarts-gl';
/*import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';*/

// 添加echarts插件
Vue.prototype.$echarts = echarts;
