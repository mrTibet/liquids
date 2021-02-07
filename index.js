const app ={
    buttons:[],
    box:[],
    currentPage:[],
    liquid:[],
    show: new Event('show'),
    init: function(){
        app.buttons = document.querySelectorAll('.buttons');
        app.buttons.forEach((btn)=>{
            btn.addEventListener('show', app.pageShown)
        })
        document.querySelectorAll('.btn').forEach((bt)=>{
            bt.addEventListener('click', app.btn);
        })

        document.getElementById('fire').addEventListener('click' , app.fireOn)

        app.liquid = document.querySelector('.box');
        
        app.box =document.getElementById('main-box');
        history.replaceState({},'Home','#home-blue')
        window.addEventListener('popstate', app.poppin);

    },
    btn: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        app.currentPage = currentPage;
        
        document.querySelector('.active-btn').classList.remove('active-btn')
        document.getElementById(currentPage).classList.add('active-btn');
        console.log(currentPage);

        history.pushState({},currentPage,`#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show)

        app.box.classList.toggle(currentPage);
        /*setTimeout((b)=>{
            b.classList.remove(currentPage);
        }, 1200, app.box);*/
    },
    pageShown: function(ev){
        console.log('Page',ev.target.id, 'just shown');
        //let h1 = ev.target.querySelector('h1');
        let h1 = document.getElementById('tit')
        h1.classList.add('fresh')
        setTimeout((h)=>{
            h.classList.remove('fresh')
        }, 1200, h1);
    },
    fireOn: function(ev){
        document.querySelector('.fire').classList.toggle('turn-on');

        if(app.liquid.classList.length===2){
            setTimeout(()=>{
                for(let bub of app.liquid.children){
                    bub.classList.toggle('bubbles')
                }
            }, 2000)
        }
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash =  location.hash.replace('#','');
        document.querySelector('.active-btn').classList.remove('active-btn');
        document.getElementById(hash).classList.add('active-btn');
        console.log(hash);

        document.getElementById(hash).dispatchEvent(app.show)
    }
}

document.addEventListener('DOMContentLoaded', app.init);