import utils from './utils.js';

const COLORS = ['#FFC4C4', '#BD10E0', '#003AFF', '#FF9966', '#6235FF', '#EF9FFF', '#8FEE90', '#A8B9FF', '#E9BC15', '#F56C6C', '#519400', '#C76918', '#9013FE', '#00FFC6', '#FF3B2C', '#0091FF', '#0068ff', '#6B69FF', '#8A21C9', '#FF63ED', '#C2372F', '#FFC900', '#FF9534', '#BFC71B', '#33C881', '#00F4DA', "#db006d", "#98e867", "#8378b9", "#d29629", "#b5dfa1", "#361658", "#0c42a9", "#0ed6ae", "#bff8cf", "#28b941", "#fc20e4", "#44682f", "#246f23", "#19d588", "#2f06c0", "#92fba7", "#173721", "#2dd0f3", "#b0e6a1", "#77eb6d", "#4270cb", "#7f1a30", "#649386", "#64f59a", "#3a88b4", "#2fd570", "#d40035", "#46945b", "#bfeddc", "#955a34", "#5398f0", "#a10aac", "#4cda21", "#8f4322", "#c8da4e", "#59640d", "#23c452", "#18c0aa", "#a71a85", "#ce0a86", "#95bd69", "#19c9be", "#8b8fd4", "#dfbcc2", "#41422e", "#914562", "#1afd5f", "#7987fd", "#19ff66", "#b8b97d", "#705ab5", "#1a168d", "#11be4a", "#a0470d", "#48ceab", "#ead440", "#ddc524", "#277886", "#fa760a", "#52b8e9", "#297e6f", "#245a18", "#699c40", "#b6ef87", "#d7963a", "#41a7fa", "#4ff487", "#fdada3", "#39d6cd", "#a9394c", "#b7e434", "#a83ef9", "#de84d7", "#986bf5", "#d3fd49", "#65d75a", "#c84db6", "#e4d766", "#2d304e", "#53b68b", "#53563c", "#823df3", "#7698e9", "#8ef076", "#ebed1e", "#f7570b", "#13c14e", "#11e8c7", "#691f0c", "#e841f5","#7698e1", "#8ef071", "#ebed11", "#f75701", "#13c141", "#11e8c1", "#691f01", "#e841f1"]

// 断点监控，重新绘制图表
var bpResizeEcharts = function(ec) {
  const cb = e => {
    if (e.matches && ec) {
      ec.resize()
    }
  }
  // 
  let mql_1560_max = window.matchMedia('(max-width:1560px)');
  mql_1560_max.addListener(cb)

  let mql_1560_min = window.matchMedia('(min-width:1560px)');
  mql_1560_min.addListener(cb)
  // 
  let mql_1024_max = window.matchMedia('(max-width:1024px)');
  mql_1024_max.addListener(cb)

  let mql_1024_min = window.matchMedia('(min-width:1024px)');
  mql_1024_min.addListener(cb)
  // 
  let mql_768_max = window.matchMedia('(max-width:768px)');
  mql_768_max.addListener(cb)

  let mql_768_min = window.matchMedia('(min-width:768px)');
  mql_768_min.addListener(cb)
  // 
  let mql_640_max = window.matchMedia('(max-width:640px)');
  mql_640_max.addListener(cb)

  let mql_640_min = window.matchMedia('(min-width:640px)');
  mql_640_min.addListener(cb)
};

// 矿工算力变化图表
var optionsForPower = function(origin) {
  return {
    color: ['#6C39F6', '#FFED8D'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          formatter: function(params) {
            if (utils.verifyDate(params.value)) {
              return params.value
            }
            return utils.formatPower(params.value, true, 0)
          }
        }
      },
      formatter: function(params) {
        let colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = utils.formatDate(new Date(rez), 'y/m/d')
        }
        params.map(item => {
          let strItem = '<div style="display: flex; align-items: center;">' + colorSpan(item.color) + '<div style="margin-right:15px">' + item.seriesName + ':' + '</div>' + '<div style="text-align: right; flex: 1;">' + utils.formatPower(item.value, true, 0, 'TiB') + '</div>' + '</div>';
          rez += strItem;
        });
        return rez;
      }
    },
    grid: {
      top: '40',
      left: '40',
      right: '20',
      bottom: '20'
    },
    legend: {
      textStyle: {
        color: '#718096'
      }
    },
    xAxis: {
      data: origin.x,
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [{
      type: 'value',
      name: '有效算力 TiB',
      nameTextStyle: {
        padding: [0, 0, 8, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: function(value) {
          let texts = [];
          texts.push(utils.formatPower(value, false, 0, 'TiB'));
          return texts;
        }
      },
    }, {
      type: 'value',
      show: false
    }, ],
    series: [{
      name: '算力增量',
      data: origin.y_1,
      type: 'bar',
      barWidth: '12'
    }, {
      name: '有效算力',
      data: origin.y_2,
      type: 'line',
      smooth: true
    }]
  }
};

// 矿工挖矿收益图表
var optionsForFil = function(origin) {
  return {
    color: ['#6C39F6', '#FFED8D'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params) {
        let colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = utils.formatDate(new Date(rez), 'y/m/d')
        }
        params.map(item => {
          let strItem = '<div style="display: flex; align-items: center;">' + colorSpan(item.color) + '<div style="margin-right:15px">' + item.seriesName + ':' + '</div>' + '<div style="text-align: right; flex: 1;">' + utils.formatFil(item.value, true) + '</div>' + '</div>';
          rez += strItem;
        });
        return rez;
      }
    },
    grid: {
      top: '40',
      left: '50',
      right: '20',
      bottom: '20'
    },
    legend: {
      textStyle: {
        color: '#718096'
      }
    },
    xAxis: {
      data: origin.x,
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [{
      type: 'value',
      name: '挖矿收益 FIL',
      nameTextStyle: {
        padding: [0, 0, 8, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: function(value) {
          let texts = [];
          texts.push(utils.formatFil(value, false));
          return texts;
        }
      },
    }, {
      type: 'value',
      show: false
    }, ],
    series: [{
      name: '当日收益',
      data: origin.y_1,
      type: 'bar',
      barWidth: '12'
    }, {
      name: '历史收益',
      data: origin.y_2,
      type: 'line',
      smooth: true
    }]
  }
};

// 矿工收益释放图表
var optionsForReleaseFil = function(origin) {
  return {
    color: ['#6C39F6', '#FFED8D', '#2d3748'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params) {
        let colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = utils.formatDate(new Date(rez), 'y/m/d')
        }
        params.map(item => {
          let strItem = '<div style="display: flex; align-items: center;">' + colorSpan(item.color) + '<div style="margin-right:15px">' + item.seriesName + ':' + '</div>' + '<div style="text-align: right; flex: 1;">' + utils.formatFil(item.value, true) + '</div>' + '</div>';
          rez += strItem;
        });
        return rez;
      }
    },
    grid: {
      top: '40',
      left: '50',
      right: '20',
      bottom: '20'
    },
    legend: {
      textStyle: {
        color: '#718096'
      }
    },
    xAxis: {
      data: origin.x,
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [{
      type: 'value',
      name: '收益量 FIL',
      nameTextStyle: {
        padding: [0, 0, 8, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: function(value) {
          let texts = [];
          texts.push(utils.formatFil(value, false));
          return texts;
        }
      },
    }, {
      type: 'value',
      show: false
    }, ],
    series: [{
      name: '当日释放量',
      data: origin.y_1,
      type: 'bar',
      barWidth: '12'
    }, {
      name: '历史释放量',
      data: origin.y_2,
      type: 'line',
      smooth: true
    }, {
      name: '剩余未释放',
      data: origin.y_3,
      type: 'line',
      smooth: true
    }]
  }
};

// 矿工挖矿效率图表
var optionsForFilEffect = function(origin) {
  return {
    color: ['#6C39F6', '#FFED8D'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params) {
        let colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = utils.formatDate(new Date(rez), 'y/m/d')
        }
        params.map(item => {
          let strItem = '<div style="display: flex; align-items: center;">' + colorSpan(item.color) + '<div style="margin-right:15px">' + item.seriesName + ':' + '</div>' + '<div style="text-align: right; flex: 1;">' + utils.formatFil(item.value, true) + '</div>' + '</div>';
          rez += strItem;
        });
        return rez;
      }
    },
    grid: {
      top: '40',
      left: '50',
      right: '20',
      bottom: '20'
    },
    legend: {
      show: false
    },
    xAxis: {
      data: origin.x,
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [{
      type: 'value',
      name: '挖矿效率 FIL/T',
      nameTextStyle: {
        padding: [0, 0, 8, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: function(value) {
          let texts = [];
          texts.push(utils.formatFil(value, false));
          return texts;
        }
      },
    }, {
      type: 'value',
      show: false
    }, ],
    series: [{
      name: '挖矿效率',
      data: origin.y_1,
      type: 'line',
      smooth: true
    }]
  }
};

// 扇区质押统计图表
var optionsForSector = function(origin) {
  return {
    color: ['#6C39F6', '#FFED8D'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params) {
        let colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = utils.formatDate(new Date(rez), 'y/m/d')
        }
        params.map(item => {
          let strItem = '<div style="display: flex; align-items: center;">' + colorSpan(item.color) + '<div style="margin-right:15px">' + item.seriesName + ':' + '</div>' + '<div style="text-align: right; flex: 1;">' + utils.formatFil(item.value, true) + '</div>' + '</div>';
          rez += strItem;
        });
        return rez;
      }
    },
    grid: {
      top: '40',
      left: '50',
      right: '20',
      bottom: '20'
    },
    legend: {
      show: false
    },
    xAxis: {
      data: origin.x,
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [{
      type: 'value',
      name: '扇区质押/32GiB',
      nameTextStyle: {
        padding: [0, 0, 8, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: function(value) {
          let texts = [];
          texts.push(utils.formatFil(value, true));
          return texts;
        }
      }
    }, {
      type: 'value',
      show: false
    }, ],
    series: [{
      name: '扇区质押',
      data: origin.y_1,
      type: 'line',
      smooth: true
    }]
  }
};

// 矿池爆块统计
var optionsForBlock = function(origin) {
  return {
    color: ['#6C39F6', '#FFED8D'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params) {
        let colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = utils.formatDate(new Date(rez), 'y/m/d')
        }
        params.map(item => {
          let strItem = ''
          if (item.seriesName == '爆块奖励') {
            strItem = '<div style="display: flex; align-items: center;">' + colorSpan(item.color) + '<div style="margin-right:15px">' + item.seriesName + ':' + '</div>' + '<div style="text-align: right; flex: 1;">' + utils.formatFil(item.value, true) + '</div>' + '</div>';
          } else {
            strItem = '<div style="display: flex; align-items: center;">' + colorSpan(item.color) + '<div style="margin-right:15px">' + item.seriesName + ':' + '</div>' + '<div style="text-align: right; flex: 1;">' + item.value + '</div>' + '</div>';
          }
          rez += strItem;
        });
        return rez;
      }
    },
    grid: {
      top: '40',
      left: '50',
      right: '40',
      bottom: '20'
    },
    legend: {
      textStyle: {
        color: '#718096'
      }
    },
    xAxis: {
      data: origin.x,
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [{
      type: 'value',
      name: '爆块奖励',
      nameTextStyle: {
        padding: [0, 0, 8, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: function(value) {
          let texts = [];
          texts.push(utils.formatFil(value, true));
          return texts;
        }
      }
    }, {
      type: 'value',
      name: '爆块数',
      nameTextStyle: {
        padding: [0, 0, 8, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      }
    }],
    series: [{
      name: '爆块奖励',
      data: origin.y_1,
      type: 'line'
    }, {
      name: '爆块数',
      data: origin.y_2,
      type: 'bar',
      barWidth: '12',
      yAxisIndex: 1
    }]
  }
};

//
// ################
//
// 爆块信息图
var optionsForBlockOutput = function(origin, ec = null, isMobile = false) {
  bpResizeEcharts(ec)

  let _series = [];

  origin.y.map(per => {
    _series.push({
      name: per.address,
      type: 'bar',
      stack: 'block',
      // barWidth: 10,
      // barCategoryGap: '100%',
      label: {
        show: true,
        fontSize: 10,
        formatter: function(params) {
          return params.data > 1 ? `${params.data}` : ''
        }
      },
      data: per.data
    })
  })

  return {
    color: COLORS,
    tooltip: {
      show: !isMobile,
      formatter: function(item) {
        return `<div class="px-1">
                  <div class="flex items-center">
                    <div style="min-width: 72px; text-align-last: justify;">区块高度：</div>
                    <div>${item.name}</div>
                  </div>                  <div class="flex items-center">
                    <div style="min-width: 72px; text-align-last: justify;">存储提供程序ID：</div>
                    <span class="w-2 h-2 rounded-full mr-2" style="background-color:${item.color};"></span>
                    <div>${item.seriesName}</div>
                  </div>
                  <div class="flex items-center">
                    <div style="min-width: 72px; text-align-last: justify;">赢票数量：</div>
                    <div>${item.data}</div>
                  </div>
                </div>`
      }
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 5,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#718096'
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisTick: {
        show: false
      },
      data: origin.x
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#718096'
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      },
      interval: 1
    },
    series: _series
  }
};

// 全网算力走势
var optionsForAllPower = function(origin, ec = null) {
  bpResizeEcharts(ec)

  let _series = [];

  origin.y.map(per => {
    _series.push({
      name: per.address,
      type: 'line',
      stack: 'block',
      symbol: 'none',
      areaStyle: {},
      data: per.data
    })
  })

  return {
    color: COLORS,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          formatter: function(params) {
            if (typeof(params.value) == 'string' && params.value.indexOf(':') > -1) {
              return params.value
            }
            return utils.formatPower(params.value, true, 2)
          }
        }
      },
      formatter: function(params) {
        let title = `${params[0].name}`;
        params.map(item => {
          title += `<div class="w-full flex items-center px-1">
                      <div class="rounded-full w-3 h-3 mr-2" style="background-color: ${item.color};"></div>
                      <div style="min-width: 72px;">${item.seriesName}：</div>
                      <div>${utils.formatPower(item.value, true, 2)}</div>
                     </div>`;
        });
        return title;
      }
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#718096'
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisTick: {
        show: false
      },
      data: origin.x
    },
    yAxis: {
      type: 'value',
      name: '有效算力',
      nameTextStyle: {
        padding: [0, 0, -5, 0],
        fontSize: 10
      },
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#718096',
        formatter: function(value) {
          let texts = [];
          texts.push(utils.formatPower(value, true, 0));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      }
    },
    series: _series
  }
};

// 爆块信息图
var optionsForBlockOutputStat = function(origin, ec = null) {
  bpResizeEcharts(ec)
  return {
    color: ['#0DEBCF', '#6C39F6'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        let title = `${params[0].name}`;
        params.map(item => {
          title += `<div class="w-full flex items-center px-1">
                      <div class="rounded-full w-3 h-3 mr-2" style="background-color: ${item.color};"></div>
                      <div style="min-width: 72px; text-align-last: justify;">${item.seriesName}：</div>
                      <div>${item.componentSubType == 'bar' ? item.value : utils.formatFil(item.value, true, 2)}</div>
                     </div>`;
        });
        return title;
      }
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 20,
      containLabel: true
    },
    xAxis: {
      data: origin.x,
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#718096'
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      type: 'value',
      name: '出块',
      max: 800,
      nameTextStyle: {
        padding: [0, 0, -5, 0],
        fontSize: 10
      },
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#718096'
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      }
    }, {
      type: 'value',
      name: '奖励/FIL',
      nameTextStyle: {
        padding: [0, 0, -5, 0],
        fontSize: 10
      },
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#718096'
      },
      axisLine: {
        lineStyle: {
          color: '#718096'
        }
      },
      splitLine: {
        show: false
      }
    }],
    series: [{
      name: '爆块数',
      data: origin.y_1,
      type: 'bar',
      // barWidth: 10
    }, {
      name: '爆块奖励',
      data: origin.y_2,
      type: 'line',
      smooth: false,
      yAxisIndex: 1
    }]
  }
};

export default {
  COLORS,
  optionsForPower,
  optionsForFil,
  optionsForReleaseFil,
  optionsForFilEffect,
  optionsForSector,
  optionsForBlock,
  optionsForBlockOutput,
  optionsForAllPower,
  optionsForBlockOutputStat
}