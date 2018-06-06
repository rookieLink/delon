export const BARZOOMPAYLOAD = {
  legend: ["直接访问"],
  dimensionList: [
    {
      name: "",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
  ],
  measureList: [
    {
      name: '直接访问',
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ]

};

export const BARZOOM = `
 that.option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend:{
      data: that.payload.legend
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : that.payload.dimensionList[0].data,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
    {
      name: that.payload.measureList[0].name,
      type: 'bar',
      barWidth: '60%',
      data: that.payload.measureList[0].data
    }
    ]
};
`;
