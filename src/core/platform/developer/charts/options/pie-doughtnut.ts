export const PIEDOUGHTNUTPAYLOAD = {
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

export const PIEDOUGHTNUT = `
   var dataList = [];
    that.payload.dimensionList[0].data.forEach(function(val){
      dataList.push({name:val});
    });
    that.payload.measureList[0].data.forEach(function(val,i){
      dataList[i].value = val;
    });
  that.option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: that.payload.legend
      },
      series: [
        {
          name: "交易类型",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: dataList
        }
      ]
    };
`;
