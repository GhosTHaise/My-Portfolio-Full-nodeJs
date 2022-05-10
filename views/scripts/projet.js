import  projets  from "/projetDB";
//Install gsap plugin
gsap.registerPlugin(Flip,ScrollToPlugin);

    const detail = document.querySelector('.detail'),
      detailImg = document.querySelector('.detail > img'),
      detailTitle = document.querySelector('.detail .title'),
      detailDescription = document.querySelector('.detail .description');
      
let mid = Math.floor(projets.length / 2),
    translateXValue = 0,
    disabled = false,
    activeItem = null;


const initialisationProjet = () => {
    const projetList = gsap.utils.toArray('.projet');
    for(let projet of projetList){
        projet.classList.remove('active')
    }
    translateXValue = (Math.floor(window.innerWidth / 2) + (projetList[0].offsetWidth * 0.15));
    projetList[mid].classList.add('active');
    gsap.to('body',{
        backgroundColor : projetList[mid].dataset.color,
        ease : "power2.inOut",
        duration : .8
    });
    document.querySelector('#StepBack').addEventListener('click',() => {
        if(window.history.state.states.slice(-2,-1)[0]){
             barba.go(window.history.state.states.slice(-2,-1)[0].url)
        }else{
            barba.go('/');
        }  
    })
    for(let s = 0,i = mid - 1;i >= 0;i--){
        s++;
        gsap.set(projetList[i],{
            translateX : - (Math.floor(window.innerWidth / 2) + (projetList[i].offsetWidth * 0.15) )* s,
            transformOrigin : 'top',
            scale : .6});
    }
    for(let t = 0,j = mid + 1;j < projetList.length;j++){
        t++;
        gsap.set(projetList[j],{
            translateX : (Math.floor(window.innerWidth / 2 + (projetList[j].offsetWidth * 0.15)) * t),
            transformOrigin : 'bottom',
            scale : .6
        })
    }

    document.removeEventListener('keydown',(e) => disabled && move(e));
    document.addEventListener('keydown',(e) => !disabled && move(e));
    projetList.forEach(p => p.addEventListener('click',()=> !disabled && showDetails(p)));
}
const generateProjet = () =>{
    const container = document.querySelector('.exploration');
    projets.forEach( e => container.appendChild(createProjet(e)))
}
const createProjet = (projetData) =>{
    const projet = document.createElement('div'),
          title = document.createElement('div'),
          description = document.createElement('div'),
          img = document.createElement('img');
    
        projet.classList.add('projet');
        title.classList.add('title');
        description.classList.add('description');
        projet.setAttribute('data-color',projetData.color);
        img.src = projetData.url;
        title.textContent = projetData.title;
        description.textContent = projetData.desc;
        projet.appendChild(title);
        projet.appendChild(img);
        projet.appendChild(description);
        return projet;

}

const move = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const projetList = gsap.utils.toArray('.projet');
    if(projetList.some((pc)=>  pc.classList.contains('active'))){
        mid = projetList.findIndex( (pc)=> pc.classList.contains('active'));
    }
    //eviter de deplacer le projet si actif
    if(!activeItem){
        switch (e.key) {
            case "ArrowLeft" :
                moveLeft(projetList);
                break;
            case "ArrowRight" :
                moveRight(projetList)
                break;
        }
    }
}
const moveLeft = (projetList) => {
    if(!projetList[mid - 1]){
        return ;
    }
    console.log("current :"+mid)
        disabled = true;
        for(let i=0;i < mid;i++){
            const pl = projetList[i];
            gsap.to(pl,{
                translateX : (gsap.getProperty(pl,'translateX')) + translateXValue,
                transformOrigin : 'top',
                scale : .6,
                duration : .8,
                ease : "power2.inOut"
            })
        }
        gsap.to(projetList[mid - 1],{
                translateX : gsap.getProperty(projetList[mid - 1],'translateX') + translateXValue,
                transformOrigin : 'initial',
                scale : 1,
                duration : .8,
                ease : "power2.inOut",
                onComplete : () => {disabled = false}
        });
        projetList[mid].classList.remove('active');
        projetList[mid - 1].classList.add('active');
        gsap.to('body',{
            backgroundImage : projets[mid - 1].color,
            ease : "power2.inOut",
            duration : .8
        });
        gsap.to(['.title','.page-logo'],{
            color : projets[mid-1].text_color,
            duration : .8,
            ease : "power2.inOut"
        })
        for(let j= mid ; j < projetList.length;j++ ){
            gsap.to(projetList[j],{
                translateX : gsap.getProperty(projetList[j],'translateX') + translateXValue,
                transformOrigin : "bottom",
                ease : "power2.inOut",
                scale : .6,
                duration : .8
            })
        }
    
}
const moveRight = (projetList) => {
    if(!projetList[mid + 1]){
        return;
    }
    disabled = true;
    for(let i = 0 ; i <= mid; i++){
        const pr = projetList[i];
        gsap.to(pr,{
            translateX : gsap.getProperty(pr,'translateX') - translateXValue,
            transformOrigin : 'top',
            scale : .6,
            duration : .8,
            ease : "power2.inOut"
        })
    }
    gsap.to(projetList[mid + 1],{
        translateX : gsap.getProperty(projetList[mid + 1],'translateX') - translateXValue,
        transformOrigin : 'initial',
        scale  : 1,
        duration : .8,
        ease : "power2.inOut",
        onComplete : () => {disabled = false}
    })
    projetList[mid].classList.remove('active');
    projetList[mid+1].classList.add('active')
    gsap.to('body',{
        backgroundImage : projets[mid+1].color,
        duration : .8,
        ease : "power.inOut"
    })
    gsap.to(['.title','.page-logo'],{
        color : projets[mid+1].text_color,
        duration : .8,
        ease : "power2.inOut"
    })
    for(let j = mid+2;j<projetList.length;j++){
        gsap.to(projetList[j],{
            translateX : gsap.getProperty(projetList[j],'translateX') - translateXValue,
            transformOrigin : 'bottom',
            scale : .6,
            duration : .8,
            ease : "power2.inOut"
        })
    }
}

const showDetails = (e) => {
    if(!e.classList.contains('active')){
        return ;
    }
    if(activeItem){
        return hideDetails();
    }
    const onLoad = () => {
        gsap.to(detailTitle,{
            scale : 1.3,
            ease : "power2.inOut"
        })
        Flip.fit(detail,e);
        //enregistrer le state de detail
        const state = Flip.getState(detail);

        //rendu final
        gsap.set(document.querySelector('.detail'),{clearProps : true});
        gsap.set(detail,{
            visibility : 'visible',
            overflow : 'hidden',
            position:'absolute',
            top:'0',
            width:'100%',
            height:'100%',
            ease:"power2.inOut",
            backgroundImage : e.dataset.color,
            scrollTo : {y:0,x:0}
        })
        gsap.to(detailImg,{
            height : '90%',
            ease : "power2.inOut"
        })
        gsap.to(detailTitle,{
            top:'40%',
            ease:"power2.inOut"
        })
        //ajouter des transitions
        Flip.from(state,{
            duration : .5,
            ease : "power2.inOut",
            onComplete : () => {
                gsap.set(detail,{overflow : 'auto'})
            }
        }).to(detailDescription,{autoAlpha : 1,stagger : .15});
        detailImg.removeEventListener('load',onLoad);
        document.addEventListener('click',hideDetails);
    }
    detailImg.src = e.children[1].src;
    detailTitle.textContent = e.children[0].textContent;
    detailDescription.textContent = e.children[2].textContent;
    detailImg.addEventListener('load',onLoad);
    activeItem = e;
}
const hideDetails = () => {
    document.removeEventListener('click',hideDetails);
    gsap.to(detailTitle,{
        top : '50%',
        scale : 1,
        delay : .2,
        ease : "power2.inOut"
    })
    gsap.to(detailDescription,{
        autoAlpha : 0
    })
    const state = Flip.getState(detail);
    Flip.fit(detail,activeItem);
    gsap.to(detailImg,{
        height : '100%',
        delay : .2,
        ease : "power2.inOut"
    }),
    gsap.to(detail,{
        delay : .2,
        scrollTo : {y:0,x:0}
    });
    Flip.from(state,{
        duration : .5,
        ease : "power2.inOut",
        delay: .2,
        onComplete : () => {activeItem = null}
    }).set(detail,{clearProps : true})
}

    const chargeData = async() => {   
        gsap.to('body',{
            backgroundImage : projets[mid].color,
            duration : .8,
            ease : "power2.inOut"
        }) 
    generateProjet();
    setTimeout(()=> {initialisationProjet()},1000);
    gsap.to(['.projet-info','.exploration'],{
        autoAlpha : 1,
        delay : .2,
        duration : .2
    });
    
}
export default chargeData;
