export const PIESIMPLEPAYLOAD = {
    legend: ['存款', '转账', '改密', '其它', '取款'],
    dimensionList: [
        {
            'name': '交易类型',
            'data': [
                '存款',
                '转账',
                '改密',
                '其它',
                '取款'
            ]
        }
    ],
    measureList: [
        {
            'name': '交易量',
            'data': [
                '4968',
                '11661',
                '5047',
                '48331',
                '8217'
            ]
        }
    ]
};

export const PIESIMPLE = `
  let dataList = [];
    that.payload.dimensionList[0].data.forEach(function(val){
      dataList.push({name:val});
    });
    that.payload.measureList[0].data.forEach(function(val,i){
      dataList[i].value = val;
    });
that.option = {
      title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        x: "center"
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: that.payload.legend || []
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: dataList,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
`;
