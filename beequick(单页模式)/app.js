
require.config({

    paths:{
        'jquery':'./lib/jquery',
        'backbone':'./lib/backbone',
        'underscore':'./lib/underscore',
        'text':'./lib/text',
        '$css':'./lib/css'
    }
});


require(['jquery'],function($){
    //设置html的默认字体大小  随着视窗宽度大小改变
    var width = document.documentElement.clientWidth || document.body.clientWidth,
        html = document.documentElement;
    html.style.fontSize = width/10 + "px" ;
    window.onresize = function (){
        width = document.documentElement.clientWidth || document.body.clientWidth;
        html.style.fontSize = width/10 + "px" ;
    };

    //实现底部菜单的样式变换
    var oldItem = $('.bottom a:first-of-type li');
    $('.bottom').on('click','li',function () {
        if (oldItem[0] != this) {
            var remFontSize = parseFloat($("html").css('fontSize'));
            var oldItemIcon = oldItem.find('div');
            oldItemIcon.css('backgroundPositionY', parseFloat(oldItemIcon.css('backgroundPositionY')) / remFontSize + oldItemIcon.height() / remFontSize + "rem");
            var currItemIcon = $(this).find('div');
            currItemIcon.css('backgroundPositionY', parseFloat(currItemIcon.css('backgroundPositionY')) / remFontSize - currItemIcon.height() / remFontSize + "rem");
            oldItem = $(this);
        }
    })
});



require(['jquery','backbone','./router.js'],function($,Backbone){
    Backbone.history.start();
});
