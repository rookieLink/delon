const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/router': 'ng.router',
    '@angular/common/http': 'ng.common.http',
    '@angular/forms': 'ng.forms',
    'ngx-echarts': 'ngx.echarts',
    'ng-zorro-antd': 'ngZorro.antd',
    'moment': 'moment',
    'ng-zorro-antd-extra': 'ngZorro.antd_extra',
    'file-saver': 'saveAs',
    'ngx-countdown': 'ngxCountDown',
    'xlsx': 'xlsx',
    'jszip': 'jszip',
    'lodash': 'lodash',
    'screenfull': 'screenfull',

    '@angular/cdk': 'ng.cdk',
    '@angular/cdk/coercion': 'ng.cdk.coercion',

    'ngx-perfect-scrollbar':'ngxPerfectScrollbar',
    'angular-split':'angularSplit',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/operators': 'Rx.Observable.prototype',
    'rxjs/observable/of': 'Rx.Observable',
    'rxjs/observable/zip': 'Rx.Observable',
    'rxjs/observable/fromEvent': 'Rx.Observable',
    'rxjs/observable/FromEventObservable': 'Rx.Observable',
    'rxjs/observable/combineLatest': 'Rx.Observable',

    '@delon/theme': 'alain.theme',
    '@delon/acl': 'alain.acl'
};

module.exports = {
    sourcemap: true,
    rollup: require('rollup'),
    context: 'this',
    name: 'alain.abc',
    output: 'abc.umd.js',
    format: 'umd',
    plugins: [
        replace({ "import * as moment": "import moment" }),
        resolve({
            jsnext: true,
            main: true
        })
    ],
    external: Object.keys(globals),
    globals: globals
};
