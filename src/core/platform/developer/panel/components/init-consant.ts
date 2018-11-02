export const devInfo = {
    // optionMsg: [
    //     {
    //         prefix: '现金库存',
    //         data: 'orgName',            // todo(ccliu): 需要适应多个聚合字段值，即一行有多个数据值需要展示
    //         lineStyle: {
    //             'font-size': '20px',
    //             'background-color': 'green'
    //         },
    //         dataStyle: {
    //             'font-size': '10px'
    //         },
    //     },
    //     {
    //         data: 'cashStock',
    //         lineStyle: {},
    //         dataStyle: {
    //             display: 'block',
    //             'font-size': '41px'
    //         },
    //     },
    //     {
    //         lineStyle: {},
    //         prefix: '上个周期现金库存量: ',
    //         prefixStyle: {},
    //         data: 'cashStock',
    //         dataStyle: {},
    //         suffix: '万元',
    //         suffixStyle: {}
    //     }
    // ],
    optionMsg: {
        lines: [
            {
                data: [
                    {
                        literal: '现金库存',
                        field: 'orgNo',         // field值优先于literal
                        style: {
                            'font-size': '20px',
                            'background-color': 'green'
                        }
                    }
                ],
                style: {}

            },
        ],
        style: {
            'font-size': '20px',
        }
    },
    payload: {
        orgNo: '0000',
        orgName: '总行',
        cashStock: 98380000,
        交易类型: 87462000,
        userName: 'ccliu',
        account: 'tiny',
        userAgent: 'mac'
    }

};
export const devDetail = {
    optionMsg: {
        fields: [
            {
                desc: '现金库存',
                data: 'orgNo'

            },
            {
                desc: '现金库存',
                data: 'cashStockOld'

            },
            {
                desc: '现金库存',
                data: 'orgName'

            }
        ],
        style: {}
    },
    payload: {
        orgNo: '0000',
        orgName: '总行',
        cashStock: 98380000,
        cashStockOld: 87462000
    }
};
export const devRank = {
    optionMsg: {
        top: {
            lineStyle: {},
            title: '用户列表',
            titleStyle: {},
            subtitle: '（xxx行)',
            subtitleStyle: {}
        },
        fields: [
            {
                field: 'no',
                desc: '用户名'
            },
            {
                field: 'name',
                desc: '姓名'
            },
            {
                field: 'email',
                desc: '电话标志'
            }
        ],
        topStyle: {},
        headStyle: {},
        lineStyle: {}
    },
    payload: [
        {
            no: 'user',
            name: 'aaaa',
            email: 'xxx@zjft.com'
        },
        {
            no: 'user2',
            name: 'aaaa2',
            email: 'xxx2@zjft.com'
        },
        {
            no: 'user3',
            name: 'aaaa3',
            email: 'xxx3@zjft.com'
        },
        {
            no: 'user4',
            name: 'aaaa4',
            email: 'xxx4@zjft.com'
        }
    ]
};

export const DevInit: Map<string, any> = new Map<string, any>();

DevInit.set('info', devInfo);
DevInit.set('detail', devDetail);
DevInit.set('rank', devRank);

