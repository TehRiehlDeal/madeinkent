/**
 * Created by Kevin Riehl on 2/2/2017.
 */
String.prototype.toCamel = function(){
    var re = /(\b[a-z](?!\s))/g;
    return this.toLowerCase().replace(re, function(x){
        return x.toUpperCase();
    });
};

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className=el.className.replace(reg, ' ')
    }
}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined)
            rv[i] = arr[i];
    return rv;
}