define([
        'text!./cart.html','$css!./cart.css'
    ],
    function(html){

        function render(){

            $('.container').html(html);
            // getAjax();
        }


        function getAjax(){
            $.get('',function(){

            })
        }

        function bindEvent(){

        }


        return {
            render:render,
            bindEvent:bindEvent
        }

    }
);