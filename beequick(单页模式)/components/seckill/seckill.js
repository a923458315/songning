define([
        'text!./seckill.html', '$css!./seckill.css'
],function (html) {
    function render() {
        $('.container').html(html);
        getAjax();
    }

    function getAjax() {

        $('.return').on('click',function () {
            location.href = "index.html";
        });

        //生成疯狂秒杀模板
        function getSeckillTpl(list) {
            var tpl = '<div class="conduct">\
                    <div class="img">\
                        <img src="'+list.img+'" alt=""/>\
                    </div>\
                    <div class="conductInfo">\
                        <p class="title">'+list.name+'</p>\
                        <p class="instruction">'+list.specifics+'</p>\
                        <p class="price">￥\
                            <span class="curPrice">'+list.price+'</span>\
                            <span class="mark">原价:</span>\
                            <span class="oldPrice">'+list.market_price+'</span>\
                        </p>\
                        <a href="##" class="buying">'+list.btnText+'</a>\
                    </div>\
                   </div>';
            return tpl;
        }

        //获取疯狂秒杀数据
        function getSeckillAjax() {
            $.get('http://www.vrserver.applinzi.com/aixianfeng/apimiaosha.php',function (res) {
                var seckillData = JSON.parse(res.substring(0,res.indexOf('<scrip')));
                var html = [];
                for(var i in seckillData.product){
                    var item = getSeckillTpl(seckillData.product[i]);
                    html.push(item);
                }
                $('.conductList').html(html.join(''));
            });
        }

        //执行获取疯狂秒杀数据
        getSeckillAjax();

    }

    return {
        render:render
    };
});














