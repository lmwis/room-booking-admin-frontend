var hostPre = "http://10.111.62.80:8000/";
var b64EncodeUnicode =  function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}