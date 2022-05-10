const CircleProgress = (timeline) => {
    $('.progress').each(function () {
        const percentagetoDegree = (value) => {
            return ((value/100)*360);
        }
                var value = $(this).attr('data-value');
                var left = $(this).find('.progress-left .progress-bar');
                var right = $(this).find('.progress-right .progress-bar');
            if(value > 0){
                
                if(value <= 50){
                    timeline.to('.progress-left .progress-bar',{duration : 1.3,rotate : percentagetoDegree(value)},"-=1.1");
                    //right.css('transform','rotate('+percentagetoDegree(value)+'deg)');
                }else{
                    timeline.to('.progress-right .progress-bar',{duration : 1.3,rotate : 180},"-=1.1");
                    //right.css('transform','rotate(180deg)');
                    timeline.to('.progress-left .progress-bar',{duration : 1.3,rotate :percentagetoDegree(value -50)});
                    //left.css('transform','rotate('+percentagetoDegree(value -50)+'deg)');
                }
            } 
         });
}