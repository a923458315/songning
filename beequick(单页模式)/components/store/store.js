define([
        'text!./store.html', '$css!./store.css'
    ],
    function(html){

        function render(){

            $('.container').html(html);
            getAjax();
        }


        function getAjax(){
            
            // 生成闪送超市商品列表模板
            function getGoodsListTpl(list) {
                if(list.pm_desc){
                    var goods_tap = '<p class="goods_tag">\
                                        <span class="giveFree">'+list.pm_desc+'</span>\
                                     </p>';
                }else{
                    var goods_tap = '<p class="goods_tag"></p>';
                }
                var tpl = '<li>\
                            <div class="list_photo">\
                                <img src="'+list.img+'">\
                            </div>\
                            <div class="list_info">\
                                <p class="goods_name">'+list.name+'</p>\
                                '+goods_tap+'\
                                <p class="goods_dosage">'+list.specifics+'</p>\
                                <div class="goods_price">\
                                    <span class="goods_price_now">¥'+list.price+'</span>\
                                    <span class="goods_price_old">¥'+list.market_price+'</span>\
                                    <div>\
                                        <span class="reduce"></span>\
                                        <span class="pur_num">1</span>\
                                        <span class="add"></span>\
                                    </div>\
                                </div>\
                            </div>\
                            </li>';
                return tpl;
            }

            //获取闪送超市商品列表数据
            function getGoodsListAjax(name) {
                $.get('http://www.vrserver.applinzi.com/aixianfeng/apicategory.php?category='+name+'',function (res) {
                    var html = [];
                    var listData = JSON.parse(res.substring(0,res.indexOf('<script')));
                    for (var i in listData.data){
                        var item = getGoodsListTpl(listData.data[i]);
                        html.push(item);
                    }
                    $('.goods_list').html(html.join(''));
                });
            }

            //默认加载热销榜商品列表数据
            getGoodsListAjax('热销榜');

            //执行获取数据方法
            $('.left_content ul').delegate('li','click',function () {
                $(this).addClass('checked').siblings('li').removeClass('checked');
                getGoodsListAjax($(this).html().trim());
            });


        }

        function bindEvent(){

        }


        return {
            render:render,
            bindEvent:bindEvent
        }

    }
);