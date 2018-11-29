export const FUNNELSIMPLEPAYLOAD = {
    legend: ['存款', '转账', '改密', '其它', '取款'],
    dimensionList: [
        {
            'name': '交易类型',
            'data': ['存款', '转账', '改密', '其它', '取款']
        }
    ],
    measureList: [
        {
            'name': '交易量',
            'data': ['20', '40', '60', '80', '100']
        }
    ]
};

export const FUNNELSIMPLE = `
   var dataList = [];
    that.payload.dimensionList[0].data.forEach(function(val){
      dataList.push({name:val});
    });
    that.payload.measureList[0].data.forEach(function(val,i){
      dataList[i].value = val;
    });
that.option = {
  title: {
    text: "漏斗图",
    subtext: "纯属虚构"
  },
  tooltip: {
    trigger: "item",
  },
  toolbox: {
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: that.payload.legend
  },
  calculable: true,
  series: [
    {
      name: "漏斗图",
      type: "funnel",
      left: "10%",
      top: 60,
      bottom: 60,
      width: "80%",
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%",
      sort: "descending",
      gap: 2,
      label: {
        normal: {
          show: true,
          position: "inside"
        },
        emphasis: {
          textStyle: {
            fontSize: 20
          }
        }
      },
      labelLine: {
        normal: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid"
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: "#fff",
          borderWidth: 1
        }
      },
      data: dataList
    }
  ]
};

`;












