export const LINEDYNAMICPAYLOAD = {
  legend:[],
  dimensionList:[{
    name:"",
    data:[]
  }],
  measureList:[
    {
      name:"模拟数据",
      data:[10,20,30,40,50,60,70,80,90,100]
    }
  ]
};
export const LINEDYNAMIC = `
that.option = {
    title: {
        text: '动态数据 + 时间坐标轴'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: that.payload.measureList[0].name,
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: that.payload.measureList[0].data
    }]
};
`;
