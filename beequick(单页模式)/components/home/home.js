define([
        'text!./home.html', '../../lib/swiper-3.3.1.jquery.min','$css!./home.css','$css!./swiper-3.3.1.min.css'
    ],
    function(html){

        function render(){

            $('.container').html(html);
            getAjax();

        }


        //轮播图
        function slider() {

            var mySwiper = new Swiper('.slider', {
                autoplay: 2000,//可选选项，自动滑动
                //循环滚动
                loop:true,
                //点击按钮
                pagination:".swiper-pagination",
                //可以点击切换图片
                paginationClickable:true,

                onAutoplayStop:function (swiper) {
                    swiper.startAutoplay();
                }
            })

        }


        function getAjax(){
            
            //生成轮播图模板
            function getBannerTpl(list) {
                var tpl = '<div class="swiper-slide">\
                                <img src='+list.img+' alt="">\
                           </div>';
                return tpl;
            }
            
            //获取轮播图数据
            function getBannerAjax() {
                $.get('http://www.vrserver.applinzi.com/aixianfeng/apihome.php',function (res) {
                    var bannerData = JSON.parse(res.substring(0,res.indexOf('<'))).data.slide;
                    var html = [];
                    for(var i in bannerData){
                        var item = getBannerTpl(bannerData[i].activity);
                        html.push(item);
                    }
                    $('.swiper-wrapper').html(html.join(''));
                    slider();
                });
            }

            //生成鲜蜂热卖模板
            function getHotSaleTpl(list) {
                if(list.pm_desc == ""){
                    var desc = "";
                }else{
                    var desc = "<span class='giveFree'>"+list.pm_desc+"</span>";
                }
                var str = '<li class="goods">\
                                <img src="'+list.img+'">\
                                <p class="goods_name">'+list.name+'</p>\
                                <p class="goods_tag">'+desc+'\
                                </p>\
                                <p class="goods_dosage">'+list.specifics+'</p>\
                                <p class="goods_price">\
                                    <span class="goods_price_now">¥'+list.price+'</span>\
                                    <span class="goods_price_old">¥'+list.market_price+'</span>\
                                </p>\
                                <div class="addGoods"></div>\
                            </li>';
                return str;
            }

            //获取鲜蜂热卖商品数据
            function getHotSaleAjax() {
                $.get('http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php',function (res) {
                    var hotSellData = JSON.parse(res.substring(0,res.indexOf('<'))).data;
                    var html = [];
                    for(var i in hotSellData){
                        var item = getHotSaleTpl(hotSellData[i]);
                        html.push(item);
                    }
                    $('.hot_sell_goods').html(html.join(''));
                })
            }

            //生成主页menu图标
            function getMenuTpl(list) {
                var tpl = '<li>\
                                <a href="#seckill"><img src='+list.img+'></a>\
                                <p>'+list.name+'</p>\
                           </li>';
                return tpl;
            }

            //获取主页menu数据
            function getMenuAjax() {
                $.get('http://www.vrserver.applinzi.com/aixianfeng/apihome.php',function (res) {
                    var menuData = JSON.parse(res.substring(0,res.indexOf('<'))).data.menu;
                    var html = [];
                    for(var i in menuData){
                        var item = getMenuTpl(menuData[i].activity);
                        html.push(item);
                    }
                    $('.menu ul').html(html.join(''));
                });
            }

            //执行获取轮播图数据方法
            getBannerAjax();

            //执行获取鲜蜂热卖数据方法
            getHotSaleAjax();

            //执行获取menu菜单数据方法
            getMenuAjax();

        }

        //绑定事件
        function bindEvent(){

        }

        return {
            render:render,
            bindEvent:bindEvent
        }

    }
);