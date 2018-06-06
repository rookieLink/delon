export const BARSIMPLEPAYLOAD = {
  legend: ["2011年", "2012年"],
  dimensionList: [
    {
      name: "人口总数",
      data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"]
    }
  ],
  measureList: [
    {
      name: "2011年",
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: "2012年",
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
};

export const BARSIMPLE = `
that.option = {
    title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: that.payload.legend
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: that.payload.dimensionList[0].data
    },
    series: [
      {
        type:'bar',
        name:that.payload.measureList[0].name,
        data:that.payload.measureList[0].data
      },
      {
        type:'bar',
        name:that.payload.measureList[1].name,
        data:that.payload.measureList[1].data
      }
    ]
};
`;
