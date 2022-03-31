function setCookie(name, value, expires) {
    if (!expires) expires = 1000 * 60 * 60 * 24 * 365 * 5;
    path = "/";
    domain = document.domain;
    secure = false;
    var today = new Date();
    today.setTime(today.getTime());
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) +
        ((expires) ? ";expires=" + expires_date.toGMTString() : "") + //expires.toGMTString() 
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ((secure) ? ";secure" : "");
}

function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0) break;
    }
    return "";
}

function _getid(id) {
    return document.getElementById(id);
}

function trim(str) {
    return str.replace(/^\s*|\s*$/g, "");
}

function html_entity_encode(str) {
    str = str.replace(/&/gi, "&amp;");
    str = str.replace(/>/gi, "&gt;");
    str = str.replace(/</gi, "&lt;");
    str = str.replace(/\"/gi, "&quot;");
    str = str.replace(/\'/gi, "&#039;");
    return str;
}
var henc = html_entity_encode;

function setstorage(name, value) {
    if (window.localStorage) {
        localStorage[name] = value + '';
    }
}

function getstorage(name) {
    var s;
    if (window.localStorage) {
        s = localStorage[name];
    }
    return s;
}

function getFileName(url) {
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    return url;
}

function getfilename(s) {
    var arr = s.split('.');
    if (arr.length > 1) {
        arr.splice(arr.length - 1, 1);
    }
    return arr.join('.');
}

function getfileext(s) {
    if (!s) s = '';
    var arr = s.split('.');
    if (arr.length > 1) {
        return arr[arr.length - 1].toLowerCase();
    }
    return '';
}

function getfileext2(s) {
    if (!s) s = '';
    var arr = s.split('.');
    if (arr.length > 1) {
        return arr[arr.length - 1];
    }
    return '';
}

function getsize(fileSize) {
    if (fileSize === 0) return '0 kB';
    if (!fileSize || isNaN(fileSize)) return 'Unknown Size';

    function humanFileSize(bytes) {
        var thresh = 1024;
        if (bytes < thresh) return bytes + ' B';
        var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (bytes >= thresh);
        return bytes.toFixed(1) + ' ' + units[u];
    }
    return humanFileSize(fileSize);
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function getWindowWidth() {
    var windowWidth = 0;
    if (typeof(window.innerWidth) == 'number') {
        windowWidth = window.innerWidth;
    } else {
        var ieStrict = document.documentElement.clientWidth;
        var ieQuirks = document.body.clientWidth;
        windowWidth = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
    if (!windowWidth) windowWidth = 0;
    return windowWidth;
}

function getWindowHeight() {
    var windowHeight = 0;
    if (typeof(window.innerHeight) == 'number') {
        windowHeight = window.innerHeight;
    } else {
        var ieStrict = document.documentElement.clientHeight;
        var ieQuirks = document.body.clientHeight;
        windowHeight = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
    if (!windowHeight) windowHeight = 0;
    return windowHeight;
}

function getScrollLeft() {
    var scrollLeft;
    if (document.body && document.body.scrollLeft) {
        scrollLeft = document.body.scrollLeft;
    } else if (document.documentElement && document.documentElement.scrollLeft) {
        scrollLeft = document.documentElement.scrollLeft;
    }
    if (!scrollLeft) scrollLeft = 0;
    return scrollLeft;
}

function getScrollTop() {
    var scrollTop;
    if (document.body && document.body.scrollTop) {
        scrollTop = document.body.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    if (!scrollTop) scrollTop = 0;
    return scrollTop;
}

window.URL = window.URL || window.webkitURL;

function _getfrmdoc(ifrm) {
    return (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
}

var messagetimer = null;

function show_message(s, x, y, padding, timeout) {
    if (!x) x = 10;
    if (!y) y = 10;
    if (!padding) padding = 5;
    if (!timeout) timeout = 2000;

    var kind = 1;
    for (var i = 1; i <= 4; i++) {
        var s1 = "layer_message";
        if (i > 1) s1 = "layer_message" + i;
        var obj = document.getElementById(s1);
        if (obj) {
            kind = i;
            break;
        }
    }

    obj.style.left = "1px";
    obj.style.top = "1px";
    obj.innerHTML = "<label>" + s + "</label>";
    obj.style.display = "";

    if (kind == 1) {
        x = getScrollLeft() + x;
        y = getScrollTop() + y;
    } else if (kind == 2) {
        x = getScrollLeft() + ((getWindowWidth() - obj.clientWidth) / 2);
        y = getScrollTop() + ((getWindowHeight() - obj.clientHeight) / 2);
    } else if (kind == 3) {
        x = document.body.offsetWidth - obj.clientWidth - 5;
        y = getScrollTop() + y;
    } else {
        x = getScrollLeft() + ((getWindowWidth() - obj.clientWidth) / 2);
        y = getScrollTop() + y;
    }
    x = parseInt(x);
    y = parseInt(y);

    obj.style["border"] = "1px solid #000000";
    obj.style["padding"] = padding + "px";
    obj.style.left = x + "px";
    obj.style.top = y + "px";

    if (messagetimer) clearTimeout(messagetimer);
    messagetimer = setTimeout(hide_message, timeout);
}

function hide_message() {
    for (var i = 1; i <= 4; i++) {
        var s1 = "layer_message";
        if (i > 1) s1 = "layer_message" + i;
        var obj = document.getElementById(s1);
        if (obj) {
            obj.style.display = "none";
        }
    }
}

function shortstring(s, len) {
    if (!s) s = '';
    if (s.length > len) s = s.substr(0, len) + "...";
    return s;
}

function cutstring(s, len) {
    function isunicode(el) {
        return (escape(el).search(/%u/i) == -1 ? false : true);
    }
    var k = 0;
    for (var i = 0; i < s.length; i++) {
        if (isunicode(s[i])) k = k + 2;
        else k = k + 1
        if (k >= len) {
            return s.substr(0, i) + "...";
        }
    }
    return s;
}

Date.prototype.setISO8601 = function(timestamp) {
    var match = timestamp.match(
        "^([-+]?)(\\d{4,})(?:-?(\\d{2})(?:-?(\\d{2})" +
        "(?:[Tt ](\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:\\.(\\d{1,3})(?:\\d+)?)?)?)?" +
        "(?:[Zz]|(?:([-+])(\\d{2})(?::?(\\d{2}))?)?)?)?)?)?$");
    if (match) {
        for (var ints = [2, 3, 4, 5, 6, 7, 8, 10, 11], i = ints.length - 1; i >= 0; --i)
            match[ints[i]] = (typeof match[ints[i]] != "undefined" &&
                match[ints[i]].length > 0) ? parseInt(match[ints[i]], 10) : 0;
        if (match[1] == '-') // BC/AD
            match[2] *= -1;
        var ms = Date.UTC(
            match[2], // Y
            match[3] - 1, // M
            //match[3], // M
            match[4], // D
            match[5], // h
            match[6], // m
            match[7], // s
            match[8] // ms
        );
        if (typeof match[9] != "undefined" && match[9].length > 0) // offset
            ms += (match[9] == '+' ? -1 : 1) *
            (match[10] * 3600 * 1000 + match[11] * 60 * 1000); // oh om
        if (match[2] >= 0 && match[2] <= 99) // 1-99 AD
            ms -= 59958144000000;
        this.setTime(ms);
        return this;
    } else
        return null;
}

function getOffset(b, e) {
    var a = 0;
    var c = 0;

    while (b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop)) {
        a += b.offsetLeft;
        c += b.offsetTop;
        b = b.offsetParent;
    }

    if (e) {
        b2 = e.target;
        while (b2 && !isNaN(b2.scrollLeft) && !isNaN(b2.scrollTop)) {
            if (b2 == document.body) break;
            a = a - b2.scrollLeft;
            c = c - b2.scrollTop;
            if (b2.parentElement) b2 = b2.parentElement;
            else b2 = b2.parentNode;
        }
    }

    return {
        left: a,
        top: c
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getValue(s, s_find, s_end) {
    s_find = s_find.toLowerCase();
    s_end = s_end.toLowerCase();

    ss = s.toLowerCase();
    p1 = ss.indexOf(s_find);
    if (p1 < 0) return;
    s1 = s.substr(p1 + s_find.length, s.length);

    ss = s1.toLowerCase();
    p1 = ss.indexOf(s_end);
    if (p1 < 0) return;
    s1 = s1.substr(0, p1);
    return s1;
}

function booltostr(b) {
    if (b) return 'True';
    else return 'False';
}

function sec2hms(time) {
    var mins = ~~(time / 60);
    var secs = time % 60;

    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    ret = "";
    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


var base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                base64._keyStr.charAt(enc1) + base64._keyStr.charAt(enc2) +
                base64._keyStr.charAt(enc3) + base64._keyStr.charAt(enc4);

        }

        return output;
    },


    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }
}
var hexcase = 0;

function hex_md5(a) {
    return rstr2hex(rstr_md5(str2rstr_utf8(a)))
}

function hex_hmac_md5(a, b) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b)))
}

function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
}

function rstr_md5(a) {
    return binl2rstr(binl_md5(rstr2binl(a), a.length * 8))
}

function rstr_hmac_md5(c, f) {
    var e = rstr2binl(c);
    if (e.length > 16) {
        e = binl_md5(e, c.length * 8)
    }
    var a = Array(16),
        d = Array(16);
    for (var b = 0; b < 16; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828
    }
    var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8);
    return binl2rstr(binl_md5(d.concat(g), 512 + 128))
}

function rstr2hex(c) {
    try {
        hexcase
    } catch (g) {
        hexcase = 0
    }
    var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var b = "";
    var a;
    for (var d = 0; d < c.length; d++) {
        a = c.charCodeAt(d);
        b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15)
    }
    return b
}

function str2rstr_utf8(c) {
    var b = "";
    var d = -1;
    var a, e;
    while (++d < c.length) {
        a = c.charCodeAt(d);
        e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0;
        if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
            a = 65536 + ((a & 1023) << 10) + (e & 1023);
            d++
        }
        if (a <= 127) {
            b += String.fromCharCode(a)
        } else {
            if (a <= 2047) {
                b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63))
            } else {
                if (a <= 65535) {
                    b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63))
                } else {
                    if (a <= 2097151) {
                        b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63))
                    }
                }
            }
        }
    }
    return b
}

function rstr2binl(b) {
    var a = Array(b.length >> 2);
    for (var c = 0; c < a.length; c++) {
        a[c] = 0
    }
    for (var c = 0; c < b.length * 8; c += 8) {
        a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32)
    }
    return a
}

function binl2rstr(b) {
    var a = "";
    for (var c = 0; c < b.length * 32; c += 8) {
        a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255)
    }
    return a
}

function binl_md5(p, k) {
    p[k >> 5] |= 128 << ((k) % 32);
    p[(((k + 64) >>> 9) << 4) + 14] = k;
    var o = 1732584193;
    var n = -271733879;
    var m = -1732584194;
    var l = 271733878;
    for (var g = 0; g < p.length; g += 16) {
        var j = o;
        var h = n;
        var f = m;
        var e = l;
        o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
        l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
        m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
        n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
        o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
        l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
        m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
        n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
        o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
        l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
        m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
        n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
        o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
        l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
        m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
        n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
        o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
        l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
        m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
        n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
        o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
        l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
        m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
        n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
        o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
        l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
        m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
        n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
        o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
        l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
        m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
        n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
        o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
        l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
        m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
        n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
        o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
        l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
        m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
        n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
        o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
        l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
        m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
        n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
        o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
        l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
        m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
        n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
        o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
        l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
        m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
        n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
        o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
        l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
        m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
        n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
        o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
        l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
        m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
        n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
        o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
        l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
        m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
        n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
        o = safe_add(o, j);
        n = safe_add(n, h);
        m = safe_add(m, f);
        l = safe_add(l, e)
    }
    return Array(o, n, m, l)
}

function md5_cmn(h, e, d, c, g, f) {
    return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
}

function md5_ff(g, f, k, j, e, i, h) {
    return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h)
}

function md5_gg(g, f, k, j, e, i, h) {
    return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h)
}

function md5_hh(g, f, k, j, e, i, h) {
    return md5_cmn(f ^ k ^ j, g, f, e, i, h)
}

function md5_ii(g, f, k, j, e, i, h) {
    return md5_cmn(k ^ (f | (~j)), g, f, e, i, h)
}

function safe_add(a, d) {
    var c = (a & 65535) + (d & 65535);
    var b = (a >> 16) + (d >> 16) + (c >> 16);
    return (b << 16) | (c & 65535)
}

function bit_rol(a, b) {
    return (a << b) | (a >>> (32 - b))
};

function deentitize(s) {
    /* convert all standard XML entities to the corresponding characters */
    // first numbered entities
    var numberedreg = /&#(x?)([a-f0-9]{2,});/ig;
    while (true) {
        var match = numberedreg.exec(s);
        if (!match) {
            break;
        };
        var value = match[2];
        var base = 10;
        if (match[1]) {
            base = 16;
        };
        value = String.fromCharCode(parseInt(value, base));
        s = s.replace(new RegExp(match[0], 'g'), value);
    };
    // and standard ones
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&apos;/g, "'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/&amp;/g, '&');
    s = s.replace(/&nbsp;/g, "");

    // remove the xml declaration as E4X cannot parse it
    s = s.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
    return s;
}

function get_topurl(s) {
    var s1, s2;
    if (!s) s = '';
    var p1 = s.indexOf("//");
    if (p1 >= 0) {
        s1 = s.substr(0, p1 + 2);
        s2 = s.substr(p1 + 2, s.length);
        p1 = s2.indexOf("/");
        if (p1 >= 0) {
            s2 = s2.substr(0, p1);
        }
        s = s1 + s2;
    }
    return s;
}

function proc_show(name, forceshow) {
    var a = _getid(name);
    if (!a) return;
    if (a.style.display == '') a.style.display = 'none';
    else a.style.display = '';
    if (forceshow) a.style.display = '';
    if (window.gd_btn_login2) gd_btn_login2();
}

function fillnumber(s) {
    s = String(s);
    if (s.length == 1) {
        return '0' + s;
    }
    return s;
}

function datetimetostring(ts) {
    var t = new Date(ts);
    var s = '';
    if (!isNaN(t)) {
        var y = t.getFullYear();
        var m = t.getMonth() + 1;
        var d = t.getDate();
        s = y + '-' + fillnumber(m) + '-' + fillnumber(d) + ' ' + fillnumber(t.getHours()) + ':' + fillnumber(t.getMinutes()) + ':' + fillnumber(t.getSeconds());
    }
    return s;
}

function validateURL(textval) {
    var regexp = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+([a-z]{2,6}|[0-9]{1,6})/i;
    return regexp.test(textval);
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}