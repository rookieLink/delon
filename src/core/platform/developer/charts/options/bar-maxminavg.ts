export const BARMAXMINAVGPAYLOAD = {
  legend: ["蒸发量", "降水量"],
  dimensionList: [
    {
      name: "",
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    }
  ],
  measureList: [
    {
      name: "蒸发量",
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
    },
    {
      name: "降水量",
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
    }
  ]


};

export const BARMAXMINAVG = `
 that.option = {
    title : {
        text: '某地区蒸发量和降水量',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:that.payload.legend
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : that.payload.dimensionList[0].data
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
      data: that.payload.measureList[0].data,
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    },
     {
      name: that.payload.measureList[1].name,
      type: 'bar',
      data: that.payload.measureList[1].data,
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    },
   ]
};
`;
