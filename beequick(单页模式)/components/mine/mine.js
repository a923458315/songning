define([
        'text!./mine.html','$css!./mine.css'
    ],
    function(html){

        function render(){

            $('.container').html(html);
            // getAjax();
        }


        function getAjax(){
            $.get('url',function(){

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