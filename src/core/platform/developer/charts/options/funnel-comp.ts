export const FUNNELCOMPPAYLOAD = {
  legend: ["展现", "点击", "访问", "咨询", "订单"],
  measureList: [
      {data: [60], name: "访问"},
      {data: [40], name: "咨询"},
      {data: [20], name: "订单"},
      {data: [80], name: "点击"},
      {data: [100], name: "展现"}
  ]
};

export const FUNNELCOMP = `
  var measureList = [];
    that.payload.measureList.forEach(function(val){
      measureList.push({
        name:val.name,
        value:val.data[0]
      });
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
      series: [
        {
          name: "预期",
          type: "funnel",
          left: "10%",
          width: "80%",
          label: {
            normal: {
              formatter: "{b}预期"
            },
            emphasis: {
              position: "inside",
              formatter: "{b}预期: {c}%"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          data: measureList
        },
        {
          name: "实际",
          type: "funnel",
          left: "10%",
          width: "80%",
          maxSize: "80%",
          label: {
            normal: {
              position: "inside",
              formatter: "{c}%",
              textStyle: {
                color: "#fff"
              }
            },
            emphasis: {
              position: "inside",
              formatter: "{b}实际: {c}%"
            }
          },
          itemStyle: {
            normal: {
              opacity: 0.5,
              borderColor: "#fff",
              borderWidth: 2
            }
          },
          data: measureList
        }
      ]
    };
`;
