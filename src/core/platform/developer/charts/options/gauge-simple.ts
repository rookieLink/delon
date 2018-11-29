export const GAUGESIMPLEPAYLOAD = {
    dimensionList: [
        {
            'name': '交易类型',
            'data': [
                '存款'
            ]
        }
    ],
    measureList: [
        {
            'name': '交易量',
            'data': [
                '60'
            ]
        }
    ]
};

export const GAUGESIMPLE = `
 var dataList = [];
    that.payload.dimensionList[0].data.forEach(function(val){
      dataList.push({name:val});
    });
    that.payload.measureList[0].data.forEach(function(val,i){
      dataList[i].value = val;
    });
  that.option = {
      tooltip: {
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: "业务指标",
          type: "gauge",
          detail: {formatter: "{value}%"},
          data: dataList
        }
      ]
    };
`;
