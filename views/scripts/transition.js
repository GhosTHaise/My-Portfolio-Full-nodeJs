import chargeData from "/projet.js";
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
                    timeline.to(right,{duration : 1.3,rotate : percentagetoDegree(value)},"-=1.1");
                    //right.css('transform','rotate('+percentagetoDegree(value)+'deg)');
                }else{
                    timeline.to(right,{duration : 1.3,rotate : 180},"-=1.1");
                    //right.css('transform','rotate(180deg)');
                    timeline.to(left,{duration : 1.3,rotate :percentagetoDegree(value -50)},"-=1.1");
                    //left.css('transform','rotate('+percentagetoDegree(value -50)+'deg)');
                }
            } 
         });
}
var navMenus = document.querySelectorAll('#navMenu');
let MenuList = ["","skill","projet","contact"];
let initial = 0; 
for(let navMenu of navMenus){
    let currentRoot = MenuList[initial]
    navMenu.addEventListener('click',(event) =>{
       event.stopPropagation()
       barba.go("/"+currentRoot);
       //barba.go("/"+ event.target.attributes['direction'].value);
       
    });
    initial++;
    
}

function delay(n){
    n = n || 2000;
    return new Promise(done => {
        setTimeout(()=>{
            done();
        },n);
    });
}
function CompetenceAnimation(){
    gsap.registerPlugin(Flip);
        let layouts = ["final"]
}

function pageTransition(){
    const tl = gsap.timeline();
    tl.to('.loading_screen',{duration : 1.2,width : "100%",left : "0%", ease : "Expo.easeInOut"});
    tl.to('.loading_screen',{duration : 1,width : "100%",left : "100%", ease : "Expo.easeInOut",delay : .3});
    tl.set(".loading_screen",{
        left : "-100%"
    })
}
function contentAnimation(){
    const tl = gsap.timeline();
    tl.to('img',{duration : 1.5,opacity : 1,scale : 1});
    tl.to('.left',{duration : 1.5,translateY : 0,opacity : 1},"-=1.1")
    tl.from('.title_skill',{duration : 1.5,translateY : -50,opacity : 0},"-=1.1")
    CircleProgress(tl);
}
const setBackground = (color) =>{
    gsap.to('body',{
        background : color,
        duration : .2,
        delay : .2
    })
}
const refreshNavActive = () =>{
    const currentNavRoot = window.history.state.states.slice(-1)[0].url.split('/').pop()
    var navMenu = (currentNavRoot != '') ? document.querySelector('.'+currentNavRoot+'bt') : document.querySelector('.homebt');
    for(let eachNav of document.querySelectorAll('#navMenu')){
        eachNav.classList.remove('active');
    }
    navMenu.classList.add('active')
}
const once = (a,b) =>{
    var c;
    return function(){
        if(a){
            c = a.apply(b || this.arguments);
            a = b = null; 
        }
        return c ;
    }
}
$(function(){
    barba.init({
        sync : true,
        debug : true,
        views : [{
            namespace : 'projet_section',
            beforeEnter(data){
                var o = once(chargeData());
            },
        },{
            namespace : 'skill_section',
            beforeEnter(data){
                setBackground('white')
            }
        },{
            namespace : 'home_section',
            beforeEnter(data){
                setBackground('#17b791')
                document.querySelector('.cv_btn').addEventListener('click',()=>{
                    window.open('https://gateway.pinata.cloud/ipfs/QmWqmGH6C7FxaaoZcjLzCuyygS8vsrkQvaf9Ssf9YDqJaR/RANDRIAMBOLOLOMANANA%20Nomentsoa%20Sambatra%20Fitiavana.pdf')
                })
            }
        },{
            namespace : 'contact_section',
            beforeEnter(data){
                setBackground('#17b791')
            }
        }],
        transitions : [{
            name: 'default-transition',
            async beforeLeave(data){
            },
            async leave(data){
               const done = this.async();
               pageTransition();
                await delay(1500);
                done();
            },  
            async enter(data){
                //pageTransition()
                refreshNavActive()
                contentAnimation();
                
            },
            async once(data){
                //pageTransition()
                refreshNavActive()
                contentAnimation();
            }
        }]
    })
})
