export const PIEROSEPAYLOAD = {
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

export const PIEROSE = `
 var dataList = [];
    that.payload.dimensionList[0].data.forEach(function(val){
      dataList.push({name:val});
    });
    that.payload.measureList[0].data.forEach(function(val,i){
      dataList[i].value = val;
    });
that.option = {
    title : {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:that.payload.legend || []
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [20, 110],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:dataList
        },
        {
            name:'面积模式',
            type:'pie',
            radius : [30, 110],
            center : ['75%', '50%'],
            roseType : 'area',
            data:dataList
        }
    ]
};


`;
