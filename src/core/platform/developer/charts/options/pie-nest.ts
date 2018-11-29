export const PIENESTPAYLOAD = {
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

export const PIENEST = `
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
          selectedMode: "single",
          radius: [0, "30%"],

          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: dataList
        },
        {
          name: "交易类型",
          type: "pie",
          radius: ["40%", "55%"],
          label: {
            normal: {
              formatter: "{a|{a}}{abg|}\\n{hr|}\\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: dataList
        }
      ]
    };

`;
