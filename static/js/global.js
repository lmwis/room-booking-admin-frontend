var hostPre = "http://10.111.62.80:8000/";
var b64EncodeUnicode =  function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
};
/**
 * 格式化字符串
 * @param src
 * @returns {void | string | never|null}
 */
String.format = function(src){
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};