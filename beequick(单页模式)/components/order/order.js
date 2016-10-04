define([
        'text!./order.html','$css!./order.css'
    ],
    function(html){

        function render(){

            $('.container').html(html);
            getAjax();
        }


        function getAjax(){

            //生成新鲜预订模板
            function getOrderTpl(list){
                var tpl = '<li>\
                            <dl>\
                                <dt class="item_photo">\
                                    <img src="'+list.img+'">\
                                </dt>\
                                <dd class="item_name">\
                                    <p>'+list.name+'\
                                        <span class="item_dosage">'+list.specifics+'</span>\
                                    </p> \
                                </dd>\
                                <dd class="item_price">\
                                    ¥<span class="now_price">'+list.price+'</span>\
                                    <span class="old_price">¥'+list.market_price+'</span>\
                                    <div class="add_to_cart"></div>\
                                </dd>\
                            </dl>\
                           </li>';
                return tpl;
            }

            //获取新鲜预订商品数据
            function getOrderAjax() {
                $.get('http://www.vrserver.applinzi.com/aixianfeng/apiyuding.php',function (res) {

                    var orderData = JSON.parse(res.substring(0,res.indexOf('<')));
                    var html = [];
                    for(var i in orderData.product){
                        var item = getOrderTpl(orderData.product[i]);
                        html.push(item);
                    }
                    $('.list').html(html.join(''));
                });
            }

            //执行获取新鲜预订商品方法
            getOrderAjax();

        }

        function bindEvent(){

        }


        return {
            render:render,
            bindEvent:bindEvent
        }

    }
);