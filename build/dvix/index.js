window.Site = {
    local : !! ~location.search.indexOf('local'),
    daily : !! ~location.search.indexOf('daily'),
    debug : !! ~location.search.indexOf('debug'),
    build : !! ~location.search.indexOf('build')
};

if(  (/daily.taobao.net/g).test(location.host)  ){
    Site.daily = true;
}

var canvaxVersion = "1.0.0";
var canvaxUrl     = "http://g.tbcdn.cn/thx/canvax/"+ canvaxVersion +"/";
if( Site.daily ){
    canvaxVersion = '1.0.1'
    canvaxUrl     = "http://g.assets.daily.taobao.net/thx/canvax/" + canvaxVersion + "/";
}

KISSY.config({
    packages: [{
        name  : 'canvax' , 
        path  :  canvaxUrl,
        debug :  Site.debug
    }]
});

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
};
KISSY.add("dvix/index" , function( S , Canvax ){

    var Dvix = {
        Canvax : Canvax
    };

    return Dvix;

} , {
    requires : [
      "canvax/"
    ]
   
})

