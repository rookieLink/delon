import {BARSIMPLE, BARSIMPLEPAYLOAD} from './options/bar-simple';
import {BARSTACK, BARSTACKPAYLOAD} from './options/bar-stack';
import {BARMAXMINAVG, BARMAXMINAVGPAYLOAD} from './options/bar-maxminavg';
import {BARZOOM, BARZOOMPAYLOAD} from './options/bar-zoom';
import {BARMIXLINE, BARMIXLINEPAYLOAD} from './options/bar-mixline';

import {LINEAREASTACK, LINESTACKPAYLOAD} from './options/line-areastack';
import {LINEMARKER, LINEMARKERPAYLOAD} from './options/line-marker';

import {SCATTERSIMPLE, SCATTERPAYLOAD} from './options/scatter-simple';

import {PIECUSTOM, PIECUSTOMPAYLOAD} from './options/pie-custom';
import {PIEDOUGHTNUT, PIEDOUGHTNUTPAYLOAD} from './options/pie-doughtnut';
import {PIESIMPLE, PIESIMPLEPAYLOAD} from './options/pie-simple';
import {PIENEST, PIENESTPAYLOAD} from './options/pie-nest';
import {PIEROSE, PIEROSEPAYLOAD} from './options/pie-rose';
import {GAUGECAR, GAUGECARPAYLOAD} from './options/gauge-car';
import {GAUGESIMPLE, GAUGESIMPLEPAYLOAD} from './options/gauge-simple';
import {FUNNELCOMP, FUNNELCOMPPAYLOAD} from './options/funnel-comp';
import {FUNNELSIMPLE, FUNNELSIMPLEPAYLOAD} from './options/funnel-simple';
import {LINEDYNAMIC, LINEDYNAMICPAYLOAD} from './options/line-dynamicdata';
import {LINEAREASIMPLE, LINEPAYLOAD} from './options/line-areasimple';

export const CHARTTYPEMAPPING = {
  'line-areaSimple': {
    payload: LINEPAYLOAD,
    text: LINEAREASIMPLE
  },
  'line-areaStack': {
    payload: LINESTACKPAYLOAD,
    text: LINEAREASTACK
  },
  'scatter-simple': {
    payload: SCATTERPAYLOAD,
    text: SCATTERSIMPLE
  },
  // "line-confidenceBand": {
  //   payload: LINECONFIDENCEPAYLOAD,
  //   text: LINECONFIDENCEBAND
  // },
  'line-lineMarker': {
    payload: LINEMARKERPAYLOAD,
    text: LINEMARKER
  },
  'line-dynamicData': {
    payload: LINEDYNAMICPAYLOAD,
    text: LINEDYNAMIC
  },
  'bar-simple': {
    payload: BARSIMPLEPAYLOAD,
    text: BARSIMPLE
  },
  'bar-stack': {
    payload: BARSTACKPAYLOAD,
    text: BARSTACK
  },
  'bar-zoom': {
    payload: BARZOOMPAYLOAD,
    text: BARZOOM
  },
  'bar-maxminavg': {
    payload: BARMAXMINAVGPAYLOAD,
    text: BARMAXMINAVG
  },
  'bar-mixline': {
    payload: BARMIXLINEPAYLOAD,
    text: BARMIXLINE
  },
  'pie-custom': {
    payload: PIECUSTOMPAYLOAD,
    text: PIECUSTOM
  },
  'pie-doughtnut': {
    payload: PIEDOUGHTNUTPAYLOAD,
    text: PIEDOUGHTNUT
  },
  'pie-nest': {
    payload: PIENESTPAYLOAD,
    text: PIENEST
  },
  'pie-rose': {
    payload: PIEROSEPAYLOAD,
    text: PIEROSE
  },
  'pie-simple': {
    payload: PIESIMPLEPAYLOAD,
    text: PIESIMPLE
  },
  // "radar-simple": {
  //   payload: RADARSIMPLEPAYLOAD,
  //   text: RADARSIMPLE
  // },
  'gauge-car': {
    payload: GAUGECARPAYLOAD,
    text: GAUGECAR
  },
  'gauge-simple': {
    payload: GAUGESIMPLEPAYLOAD,
    text: GAUGESIMPLE
  },
  'funnel-comp': {
    payload: FUNNELCOMPPAYLOAD,
    text: FUNNELCOMP
  },
  'funnel-simple': {
    payload: FUNNELSIMPLEPAYLOAD,
    text: FUNNELSIMPLE
  }
};


export const CHARTS = [
  {
    name: '散点图',
    icon: 'zijin-icon-scatter',
    lists: [
      {
        no: 'scatter-simple',
        name: '气泡图',
        img: './assets/images/charts/dev-scatter.jpg',
        icon: 'zijin-icon-scatter'
      }
    ]
  },
  {
    name: '折线图',
    icon: 'zijin-icon-line',
    lists: [
      {
        no: 'line-areaStack',
        name: '堆叠区域图',
        img: './assets/images/charts/area-stack.png',
        icon: 'zijin-icon-line'
      },
      {
        no: 'line-areaSimple',
        name: 'line-areaSimple',
        img: './assets/images/charts/area-simple.png',
        icon: 'zijin-icon-line'
      },
      {
        no: 'line-dynamicData',
        name: 'line-dynamicData',
        img: './assets/images/charts/dynamic-data2.png',
        icon: 'zijin-icon-line'
      },
      {
        no: 'line-lineMarker',
        name: 'line-lineMarker',
        img: './assets/images/charts/line-marker.png',
        icon: 'zijin-icon-line'
      }
    ]
  },
  {
    name: '柱状图',
    icon: 'zijin-icon-histogram',
    lists: [
      {
        no: 'bar-simple',
        name: 'bar-simple',
        img: './assets/images/charts/bar-stack.png',
        icon: 'zijin-icon-histogram'
      },
      {
        no: 'bar-stack',
        name: 'stack',
        img: './assets/images/charts/bar2.png',
        icon: 'zijin-icon-histogram'
      },
      {
        no: 'bar-zoom',
        name: 'bar-zoom',
        img: './assets/images/charts/bar1.png',
        icon: 'zijin-icon-histogram'
      },
      {
        no: 'bar-maxminavg',
        name: 'bar-maxminavg',
        img: './assets/images/charts/bar4.png',
        icon: 'zijin-icon-histogram'
      },
      {
        no: 'bar-mixline',
        name: 'bar-mixline',
        img: './assets/images/charts/mix-line-bar.png',
        icon: 'zijin-icon-histogram'
      }
    ]
  },
  {
    name: '饼图',
    icon: 'zijin-icon-pie',
    lists: [
      {
        no: 'pie-custom',
        name: 'pie-custom',
        img: './assets/images/charts/pie-custom.png',
        icon: 'zijin-icon-pie'
      },
      {
        no: 'pie-doughtnut',
        name: 'pie-doughtnut',
        img: './assets/images/charts/pie-doughnut.png',
        icon: 'zijin-icon-pie'
      },
      {
        no: 'pie-nest',
        name: 'pie-nest',
        img: './assets/images/charts/pie-nest.png',
        icon: 'zijin-icon-pie'
      },
      {
        no: 'pie-rose',
        name: 'pie-rose',
        img: './assets/images/charts/pie-roseType.png',
        icon: 'zijin-icon-pie'
      },
      {
        no: 'pie-simple',
        name: 'pie-simple',
        img: './assets/images/charts/pie-simple.png',
        icon: 'zijin-icon-pie'
      }
    ]
  },
  {
    name: '仪表盘',
    icon: 'zijin-icon-dashboard',
    lists: [
      {
        no: 'gauge-car',
        name: 'gauge-car',
        img: './assets/images/charts/gauge-car.png',
        icon: 'zijin-icon-dashboard'
      },
      {
        no: 'gauge-simple',
        name: 'gauge-simple',
        img: './assets/images/charts/gauge.png',
        icon: 'zijin-icon-dashboard'
      }
    ]
  },
  {
    name: '漏斗图',
    icon: 'zijin-icon-funnel',
    lists: [
      {
        no: 'funnel-comp',
        name: 'funnel-comp',
        img: './assets/images/charts/funnel-customize.png',
        icon: 'zijin-icon-funnel'
      },
      {
        no: 'funnel-simple',
        name: 'funnel-simple',
        img: './assets/images/charts/funnel.png',
        icon: 'zijin-icon-funnel'
      }
    ]
  }
];
