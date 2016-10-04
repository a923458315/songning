define(['backbone'],function(){

    var Router = Backbone.Router.extend({

        routes: {
            "home":  "home",
            "store": "store",
            "order": "order",
            "cart": "cart",
            "mine": "mine",
            "seckill": "seckill",
            "*actions": "defaultAction"
        },

        home: function() {
            require(['./components/home/home.js'],function(home){
                home.render();
            })
        },
        store: function() {
            require(['./components/store/store.js'],function(store){
                store.render();
            })
        },
        order: function() {
            require(['./components/order/order.js'],function(order){
                order.render();
            })
        },
        cart: function() {
            require(['./components/cart/cart.js'],function(cart){
                cart.render();
            })
        },
        mine: function() {
            require(['./components/mine/mine.js'],function(mine){
                mine.render();
            })
        },
        seckill:function () {
            require(['./components/seckill/seckill.js'],function (seckill) {
                seckill.render();
            });
        },
        defaultAction:function(){
            location.hash = "home";
        }

    });

    var router = new Router();

    return router;

});

