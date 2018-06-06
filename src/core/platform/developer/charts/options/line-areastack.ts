export const LINESTACKPAYLOAD = {
  legend: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
  dimensionList: [
    {
      name: "",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
  ],
  measureList: [
    {
      name: "邮件营销",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "联盟广告",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "视频广告",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "直接访问",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "搜索引擎",
      data: [820, 932, 901, 934, 1290, 2222, 6666]
    }
  ]
};

export const LINEAREASTACK = `
that.option = {
    title: {
        text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:legend
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
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
            boundaryGap : false,
            data : dimensionList[0].data
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
     {
       name: measureList[0].name,
       type: 'line',
       stack: '总量',
       areaStyle: {normal: {}},
       data: measureList[0].data,
     },
     {
       name: measureList[1].name,
       type: 'line',
       stack: '总量',
       areaStyle: {normal: {}},
       data: measureList[1].data,
     },
     {
       name: measureList[2].name,
       type: 'line',
       stack: '总量',
       areaStyle: {normal: {}},
       data: measureList[2].data,
     },
     {
       name: measureList[3].name,
       type: 'line',
       stack: '总量',
       areaStyle: {normal: {}},
       data: measureList[3].data,
     },
     {
       name: measureList[4].name,
       type: 'line',
       stack: '总量',
       label: {
         normal: {
           show: true,
           position: 'top'
         }
       },
       areaStyle: {normal: {}},
       data: measureList[4].data
     }
   ]
};
`;

