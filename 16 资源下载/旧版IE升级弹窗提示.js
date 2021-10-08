/*! ie-alert-warning */
/**
 * 「旧版IE淘汰行动」之「旧版IE升级提示弹窗代码」
 *  https://support.dmeng.net/ie-alert-warning.html
 * 
 * 最新版本链接
 * https://support.dmeng.net/ie-alert-warning/latest.js
 * 
 * 全球CDN分发永久链接，此链接不支持 Windows XP IE
 * https://cdn.jsdelivr.net/npm/ie-alert-warning/latest.js
 */

var _iealwn = _iealwn || [];
_iealwn.jselem = document.getElementById('_iealwn_js');
var u = navigator.userAgent
if (u.match(/MSIE (9|10)/g)) {
    if (!_iealwn.once) {
        _iealwn.once = parseFloat(_iealwn.jselem.getAttribute('data-once'));
        if (isNaN(_iealwn.once)) _iealwn.once = 0;
    }
    if (!_iealwn.outver) {
        _iealwn.outver = parseFloat(_iealwn.jselem.getAttribute('data-outver'));
        if (isNaN(_iealwn.outver)) _iealwn.outver = 10;
    }
}

if (_iealwn.outver < 6) _iealwn.outver = 6;
if (_iealwn.outver > 11) _iealwn.outver = 11;

// 国产双核浏览器
_iealwn.browserNames = {
    'QQBrowser': 'QQ浏览器',
    '360SE': '360安全浏览器',
    '2345Explorer': '2345加速浏览器',
    'Baidu': '百度浏览器',
    'LBBROWSER': '猎豹安全浏览器',
    'Maxthon': '傲游浏览器',
    'Sogou': '搜狗浏览器',
    'UC': 'UC浏览器'
};

// 示意图高度
_iealwn.imgHeight = {
    'QQBrowser': 172,
    '360SE': 176,
    '2345Explorer': 243,
    'Baidu': 172,
    'LBBROWSER': 220,
    'Maxthon': 400,
    'Sogou': 119,
    'UC': 126
};

_iealwn.browser = function () {
    // var u = navigator.userAgent;
    var browser = 'IE';

    if (u.indexOf('QQBrowser') > -1) {
        browser = 'QQBrowser';

    } else if (u.indexOf('2345Explorer') > -1) {
        browser = '2345Explorer';

    } else if (u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1) {
        browser = 'Sogou';

    } else if (u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1) {
        browser = 'Baidu';

    } else if (u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1) {
        browser = 'UC';

    } else if (u.indexOf('LBBROWSER') > -1 || (!!window.external && !!window.external.LiebaoAutoFill_CopyToClipboard)) {
        browser = 'LBBROWSER';

    } else if (u.indexOf('Maxthon') > -1 || (!!window._MX$MF_6a39a14b_c884_4333_a26b_08330f10ab4aMxBIG)) {
        browser = 'Maxthon';

    } else if (u.indexOf('360SE') > -1) {
        browser = '360SE';

    } else {

        // IE9、10
        if (!!u.match(/MSIE (9|10)/g)) {
            // 根据窗口标题栏、网址栏、收藏栏高度判断
            var navigator_top = window.screenTop - window.screenY;
            switch (navigator_top) {
                case 71:
                case 100:
                case 102:
                case 126:
                    browser = '2345Explorer';
                    break;
                case 75:
                case 74:
                case 105:
                case 104:
                    browser = '360SE';
                    break;
            }
        }
    }

    return browser;
};

_iealwn.close = function () {
    var el = document.getElementById("_iealwn_div");
    el.outerHTML = "";
    delete el;

    if (!!_iealwn.once) {
        var d = new Date();
        d = new Date(d.getTime() + 1000 * 60 * _iealwn.once);
        document.cookie = '_iealwn=once; expires=' + d.toGMTString() + '; path=/';
    }
};

_iealwn.load = function () {

    var css = '#iealertwn{text-align:center;display:block!important}\
    #iealertwn .iealwn-wrap{position:absolute;z-index:2147483647;top:25px;left:0;right:0}\
    #iealertwn .iealwn-box{width:800px;margin:0 auto 20px;overflow:hidden;border:1px solid #ededed}\
    #iealertwn .iealwn-main{border:10px solid #fff;font-family:"宋体"}\
    #iealertwn .iealwn-line{height:32px;line-height:32px;background-color:#ffeeba;color:#c4691f;text-align:center;font-size:12px}\
    #iealertwn .iealwn-line a{color:#c4691f;text-decoration:none}\
    #iealertwn .iealwn-notice{background-color:#fff8e5;padding:50px 55px 55px;text-align:left;color:#c4691f;font-size:16px}\
    #iealertwn .iealwn-title{display:block;background-repeat:no-repeat;line-height:22px;height:22px;padding-left:26px;margin:50px 0 10px 0;font-weight:700}\
    #iealertwn .iealwn-title_alert{margin:0 0 24px;padding:0;font-size:24px;line-height:28px;height:28px;color:#da2128}\
    #iealertwn .iealwn-title_horn{background-image:url('+ _iealwn.dir + '/images/icon_horn.png)}\
    #iealertwn .iealwn-title_browser{background-image:url('+ _iealwn.dir + '/images/icon_browser.png)}\
    #iealertwn .iealwn-title_faq{background-image:url('+ _iealwn.dir + '/images/icon_faq.png)}\
    #iealertwn .iealwn-text{position:relative;margin:10px 2px;line-height:24px}\
    #iealertwn .iealwn-text-muted, #iealertwn .iealwn-text-muted a{color:#999}\
    #iealertwn a{color:#da2128;text-decoration:underline}\
    #iealwn-browsers .iealwn-browser-link{text-decoration:none;display:inline-block;width:90px;color:#c4691f}\
    #iealwn-browsers .iealwn-browser-dlink{text-decoration:none;background-color:#ffeeba;color:#c4691f;display:inline-block;width:60px;text-align:center}\
    #iealwn-browsers .iealwn-browser-dlink:hover{background-color:#dc3545;color:#fff}\
    #iealwn-browsers .iealwn-browser-clear{clear:left;width:100%;height:1px;content:""}\
    #iealwn-browsers .iealwn-browser{background-color:#fff;background-repeat:no-repeat;background-position:8px 5px;line-height:44px;padding-left:50px;float:left;margin:18px 18px 0 0}\
    #iealwn-browsers .iealwn-browser-mr0{margin-right:0}\
    img.iealwn-guide{background:url('+ _iealwn.dir + '/images/blank.png) no-repeat center center #e9ecef}';

    var style = document.createElement('style');
    style.id = '_iealwn_style';
    style.type = 'text/css';

    if (style.styleSheet)
        style.styleSheet.cssText = css;
    else
        style.innerHTML = css;

    document.getElementsByTagName('head')[0].appendChild(style);

    var browsers = [
        {
            'slug': 'chrome', 'name': '谷歌浏览器',
            'url': 'https://www.google.cn/chrome/?hl=zh-CN&standalone=1',
            'durl': 'https://www.google.cn/chrome/thankyou.html?standalone=1&statcb=0&installdataindex=defaultbrowser'
        }, {
            'slug': 'firefox', 'name': '火狐浏览器',
            'url': 'https://www.mozilla.org/zh-CN/firefox/new/',
            'durl': 'https://download.mozilla.org/?product=firefox-stub&os=win&lang=zh-CN'
        }, {
            'slug': 'edge', 'name': '微软浏览器',
            'url': 'https://www.microsoft.com/zh-cn/windows/microsoft-edge',
            'durl': 'https://www.microsoft.com/zh-cn/windows/microsoft-edge'
        }, {
            'slug': 'ie2345', 'name': '2345浏览器',
            'url': 'http://ie.2345.cc/',
            'durl': 'https://dn-2345.cdn.bcebos.com/2345explorer/p8_k2345886_v2.0.exe'
        }, {
            'slug': 'se360', 'name': '360浏览器',
            'url': 'https://browser.360.cn/se/',
            'durl': 'https://dl.360safe.com/netunion/20140425/360se%2b75526%2bn1abed0ce91.exe'
        }, {
            'slug': 'qqbrowser', 'name': 'QQ浏览器',
            'url': 'http://browser.qq.com/',
            'durl': 'https://cdntip-net-production-file-1251013107.file.myqcloud.com/myapp/rcps/d/85000/QQBrowser_subid@100002_urlid@100002.exe'
        }
    ];

    var isXP = navigator.userAgent.indexOf("Windows NT 5") != -1;
    var is7or8 = navigator.userAgent.indexOf("Windows NT 6") != -1;
    var browsersHtml = '';
    for (var i = 0; i < browsers.length; i++) {

        var slug = browsers[i]['slug'];

        var classes = 'iealwn-browser iealwn-browser_' + slug;
        // 第三个右边距设置为0，必须用这个蠢办法，因为要支持IE6
        if ((i + 1) % 3 == 0) classes += ' iealwn-browser-mr0';

        if (isXP && slug.match(/(chrome|firefox|edge)/g)) {
            // 谷歌、火狐、微软浏览器都不支持 Windows XP

            var warningTitle = browsers[i]['name'] + '已经全面停止支持 Windows XP 系统！请选择其他浏览器。';
            if (slug == 'edge')
                warningTitle = 'Microsoft Edge 专为 Windows 10 打造！请选择其他浏览器。';

            browsersHtml +=
                '<div class="' + classes + '" style="background-image:url(' + _iealwn.dir + '/images/' + slug + '_gray.png)">\
                    <a href="#" onclick="alert(\''+ warningTitle + '\');return false;" class="iealwn-browser-link" style="color:#777">' + browsers[i]['name'] + '</a>\
                    <a href="#" onclick="alert(\''+ warningTitle + '\');return false;" class="iealwn-browser-dlink" style="color:#777;background:#ccc">不支持</a>\
                </div>';

        } else if (is7or8 && slug == 'edge') {
            /**
                微软浏览器都不支持 Windows 7 和 8，提示下载 IE11
                
                事实上可以装 Edge 的 Windows 10 的 IE 已经是11
                也就是说，能看到升级提示的人的系统都用不了 Edge 而可以用的则都不会看到升级提示
                那把 Edge 放到这里是多余的吗？
                不，这是为了宣传 Windows 10 ，吸引用户今早升级系统
            **/
            browsersHtml +=
                '<div class="' + classes + '" style="background-image:url(' + _iealwn.dir + '/images/' + slug + '_gray.png)">\
                    <a href="#" onclick="alert(\'Microsoft Edge 专为 Windows 10 打造！请选择其他浏览器或IE11。\');return false;" class="iealwn-browser-link" style="color:#777">' + browsers[i]['name'] + '</a>\
                    <a href="https://www.microsoft.com/zh-cn/download/internet-explorer-11-for-windows-7-details.aspx" class="iealwn-browser-dlink" target="_blank" title="下载' + browsers[i]['name'] + '">IE11</a>\
                </div>';

        } else {
            browsersHtml +=
                '<div class="' + classes + '" style="background-image:url(' + _iealwn.dir + '/images/' + slug + '.png)">\
                    <a href="' + browsers[i]['url'] + '" class="iealwn-browser-link" target="_blank">' + browsers[i]['name'] + '</a>\
                    <a href="' + browsers[i]['durl'] + '" class="iealwn-browser-dlink" target="_blank" title="点击下载' + browsers[i]['name'] + '">下载</a>\
                </div>';
        }

    }

    var currentBrowserHtml = '';
    currentBrowserHtml += '<div class="iealwn-text iealwn-text-muted">您使用的不是IE浏览器？是 ';
    var i = 1;
    var count = 0;
    for (var prop in _iealwn.browserNames) {
        count++;
    }
    for (var browser in _iealwn.browserNames) {
        currentBrowserHtml += '<a href="javascript:;" onclick="_iealwn.browserAlert(\'' + browser + '\')">' + _iealwn.browserNames[browser] + '</a>';
        if (i < count) {
            currentBrowserHtml += '、';
        }
        i++;
    }
    currentBrowserHtml += ' 其中一个吗？若是如此，您暂可不必升级，点击名称查看教程并按步骤切换至极速内核也可正常访问。</div>';

    var alertHtml =
        '<div id="iealertwn"><div class="iealwn-wrap"><div class="iealwn-box"><div class="iealwn-main">\
        <div class="iealwn-line">\
            <a href="https://support.dmeng.net/kill-old-versions-of-ie.html?utm_source=iealwn" target="_blank">旧版 Internet Explorer 升级提示弹窗</a>\
        </div>\
        <div class="iealwn-notice">\
            <div class="iealwn-title iealwn-title_alert">危险！您正在使用的IE' + (_iealwn.iever && _iealwn.denyall === false ? _iealwn.iever : '') + '浏览器已过期，请立即升级！</div>\
            <div class="iealwn-text">自2016年1月12日起，微软不再为IE11以下版本提供相应支持和更新。没有关键的浏览器安全更新，您的电脑可能易受有害病毒、间谍软件和其他恶意软件的攻击，它们可以窃取或损害您的业务数据和信息。为确保您的电脑安全，请停止使用IE的过期版本！</div>\
            <div class="iealwn-browser_alert" id="_iealwn_browserAlert">\
                <div class="iealwn-title iealwn-title_horn">是时候升级你的浏览器了！</div>\
                <div class="iealwn-text">如您坚持使用当前浏览器访问本站，您可能会看到排版错误、功能不全、无法正常使用的网页，甚至是满屏乱码。请'+ (_iealwn.denyall ? '' : '至少升级至 IE' + (_iealwn.outver + 1) + ' 或') + '使用更先进的浏览器访问。</div>\
            </div>\
            <div class="iealwn-browseralert_new" id="_iealwn_browserAlert_new">' + currentBrowserHtml + '</div>\
            <div class="iealwn-title iealwn-title_browser">下载更先进的浏览器</div>\
            <div class="iealwn-browsers" id="iealwn-browsers">'+
        browsersHtml +
        '<div class="iealwn-browser-clear"></div>\
            </div>\
            <div class="iealwn-title iealwn-title_faq">为什么会出现这个弹窗？</div>\
            <div class="iealwn-text">如果您不知道升级浏览器是什么意思，请请教一些熟练电脑操作的朋友。如您是网站技术人员，请加入旧版 Internet Explorer 淘汰行动。<a href="https://support.dmeng.net/kill-old-versions-of-ie.html?utm_source=iealwn" target="_blank">了解详情</a></div>\
        </div>\
        <div class="iealwn-line">\
            <a href="javascript:;" onclick="_iealwn.close()">我已了解风险，并关闭弹窗</a>\
        </div>\
    </div></div></div></div>';

    var alertDiv = document.createElement('div');
    alertDiv.id = '_iealwn_div';
    alertDiv.innerHTML = alertHtml;
    document.getElementsByTagName('body')[0].appendChild(alertDiv);

    // 延迟判断，因为傲游浏览器的属性是异步注入
    setTimeout(function () {
        _iealwn.browserAlert();
    }, 1000);

};

_iealwn.fixload = function (num) {
    if (
        document.getElementById('_iealwn_div') === null
        && document.getElementsByTagName('head').length > 0
        && document.getElementsByTagName('body').length > 0
    ) {
        _iealwn.load();
    } else {
        if (num > 1) {
            setTimeout(function () {
                _iealwn.fixload(num - 1);
            }, 1000);
        }
    }
};

_iealwn.browserAlert = function (browser) {

    if (!browser) {
        browser = _iealwn.browser();
    }
    var names = _iealwn.browserNames;
    var alertHtml = '';

    if (!!names[browser]) {

        var browserName = names[browser];
        var imgHeight = _iealwn.imgHeight[browser];

        alertHtml +=
            '<div class="iealwn-title iealwn-title_horn">您使用的是' + browserName + '吗？</div>\
            <div class="iealwn-text">您正在使用的可能是' + browserName + 'IE兼容模式。若是如此，您暂可不必升级，按下图所示步骤切换至极速内核也可正常访问。（示意图仅供参考，浏览器不同版本可能有差异）</div>\
            <div class="iealwn-text"><img class="iealwn-guide" src="' + _iealwn.dir + '/images/switch-' + browser + '.png" width="586" height="' + imgHeight + '" style="width:586px !important;height:' + imgHeight + 'px !important" alt="示意图" title="如图片未显示，请点击右键选择 显示图片(H)"></div>\
        ';

        alertHtml += '<div class="iealwn-text iealwn-text-muted">其他双核浏览器切换极速内核示意图（点击名称查看）：';
        for (var key in names) {
            if (key == browser) continue;
            alertHtml += '<a href="javascript:;" onclick="_iealwn.browserAlert(\'' + key + '\')">' + names[key] + '</a> &nbsp;';
        }
        alertHtml += '</div>';

        document.getElementById('_iealwn_browserAlert').style.display = 'none';
        document.getElementById('_iealwn_browserAlert_new').innerHTML = alertHtml;
    }

};

_iealwn.iever = false;

var _jsver = 0;
/*@cc_on
    _jsver = @_jscript_version;
@*/

if (_jsver == 0) {
    // IE11 或者不是 IE
    if (!!window.MSInputMethodContext && !!document.documentMode) {
        _iealwn.iever = 11;
    }
} else {

    var docmode = document.documentMode;

    if (!!docmode && docmode > 5) {
        _iealwn.iever = docmode;
    } else if (_jsver == 5.7 && window.XMLHttpRequest) {
        _iealwn.iever = 7;
    } else if (_jsver == 5.6 || (_jsver == 5.7 && !window.XMLHttpRequest)) {
        _iealwn.iever = 6;
    } else {
        _iealwn.iever = 5;
    }
}

if (_iealwn.iever !== false && _iealwn.iever <= _iealwn.outver) {
    _iealwn.denyall = _iealwn.outver >= 11;
    _iealwn.show = true;
    if (!!_iealwn.once) {
        var cke = document.cookie.match(new RegExp('_iealwn=([^;]+)'));
        if (cke && cke[1] == "once") {
            _iealwn.show = false;
        }
    }
    if (_iealwn.show) {
        if (!_iealwn.dir) {
            var path = _iealwn.jselem.src.split('?')[0];
            _iealwn.dir = path.split('/').slice(0, -1).join('/');

        }

        if (window.addEventListener) {
            window.addEventListener('load', _iealwn.load, false);
        } else if (window.attachEvent) {
            window.attachEvent('onload', _iealwn.load);
        }

        // fixed some sites event load error
        setTimeout(function () {
            _iealwn.fixload(5);
        }, 1500);
    }
}