export const BARSTACKPAYLOAD = {
  legend: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
  dimensionList: [
    {
      name: "",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
  ],
  measureList: [
    {
      name: "直接访问",
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: "邮件营销",
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "联盟广告",
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "视频广告",
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: "搜素引擎",
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]


};

export const BARSTACK = `
that.option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
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
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data:that.payload.dimensionList[0].data
    },
    series: [
    {
      name: that.payload.measureList[0].name,
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: that.payload.measureList[0].data
    },
    {
      name: that.payload.measureList[1].name,
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: that.payload.measureList[1].data

    },
    {
      name: that.payload.measureList[2].name,
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: that.payload.measureList[2].data

    },
    {
      name: that.payload.measureList[3].name,
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: that.payload.measureList[3].data
    },
    {
      name: that.payload.measureList[4].name,
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: that.payload.measureList[4].data
    }
    ]
};
`;
