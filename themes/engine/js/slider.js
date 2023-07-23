import Swiper, {Navigation, Pagination, Thumbs, EffectFade, Autoplay} from 'swiper';
    
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.baner-slider').forEach(banerSlider => {
        new Swiper(banerSlider, {
            modules: [Navigation, Pagination, EffectFade, Autoplay],                
            spaceBetween: 10,
            slidesPerView: 1,
            effect: "fade",
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },          
            navigation: {
                nextEl: '.baner-slider-next',
                prevEl: '.baner-slider-prev',
            },
            pagination: {
                el: '.baner-slider-pagination',
                type: 'bullets'
            },                              
        });     
    })
    if(document.querySelector('.slider-4')){
        document.querySelectorAll('.slider-4').forEach(item => {            
            let currentCategory = item.dataset.category;             
            let currentNavigation = document.querySelector(`.slider-navigation-4[data-category="${currentCategory}"]`);                     
            let navigation = {};
            let pagination = {};                       
            if (currentNavigation) {
                let next = currentNavigation.querySelector('.slider-next');                
                let prev = currentNavigation.querySelector('.slider-prev');                
                navigation = {
                    nextEl: next,
                    prevEl: prev,
                },
                pagination = {
                    el: currentNavigation.querySelector('.slider-pagination'),
                    type: 'bullets'
                };                 
            } 
            new Swiper(item, {
                modules: [Navigation, Pagination],                
                spaceBetween: 20,
                slidesPerView: 'auto',
                navigation: navigation,
                pagination: pagination,                
                slideActiveClass: "active",
                breakpoints: {                    
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 3,                                                                           
                    },                                     
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 4,                                                                           
                    },                                     
                    1194: {
                        spaceBetween: 30,
                        slidesPerView: 4,                                                                           
                    }                                      
                }
            });
        });
    }
    if(document.querySelector('.slider-3')){
        document.querySelectorAll('.slider-3').forEach(item => {            
            let currentCategory = item.dataset.category;             
            let currentNavigation = document.querySelector(`.slider-navigation-3[data-category="${currentCategory}"]`);                     
            let navigation = {};
            let pagination = {};                       
            if (currentNavigation) {
                let next = currentNavigation.querySelector('.slider-next');                
                let prev = currentNavigation.querySelector('.slider-prev');                
                navigation = {
                    nextEl: next,
                    prevEl: prev,
                },
                pagination = {
                    el: currentNavigation.querySelector('.slider-pagination'),
                    type: 'bullets'
                };                 
            } 
            new Swiper(item, {
                modules: [Navigation, Pagination],                
                spaceBetween: 20,
                slidesPerView: 'auto',
                navigation: navigation,
                pagination: pagination,                
                slideActiveClass: "active",
                breakpoints: {                    
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 2,                                                                           
                    },                                     
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3,                                                                           
                    },                                     
                    1194: {
                        spaceBetween: 30,
                        slidesPerView: 3,                                                                           
                    }                                      
                }
            });
        });
    }
    document.querySelectorAll('.work-slider').forEach(workSlider => {                   
        let swiperWorkThumbs = new Swiper('.work-slider-thumbs', {            
            slidesPerView: 4,
            spaceBetween: 10,
            breakpoints: {
                992: {
                    spaceBetween: 20,    
                }
            }                        
        });        
        const swiperDefOpt = {            
            spaceBetween: 20,
            slidesPerView: 1,    
        }  
        const swiperProductOpt = { 
            modules: [Thumbs],                      
            thumbs: {
                swiper: swiperWorkThumbs
            },            
        } 
        if(document.querySelector('.work-slider-thumbs')){            
            new Swiper(workSlider, Object.assign({}, swiperDefOpt, swiperProductOpt));
        }
        else{            
            new Swiper(workSlider, Object.assign({}, swiperDefOpt));    
        }               
    })              
})    