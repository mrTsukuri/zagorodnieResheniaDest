import JsTabs from 'js-tabs';
import MmenuLight from 'mmenu-light';
import { Modal, Toast } from './../../../../node_modules/bootstrap/dist/js/bootstrap.esm.min';




function parseHTML(html) {
    const t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

  
document.addEventListener('DOMContentLoaded', function () {                                        
    //spoiler
    if (document.querySelector('.spoiler')) {
        document.querySelectorAll('.spoiler').forEach(item => {
            let btn = item.querySelector('.spoiler-btn');
            let container = item.querySelector('.spoiler-block');
            if(container.classList.contains('active')){
                container.style.height = container.clientHeight + 'px';
            }
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                btn.classList.toggle('active');
                event.target.closest('.spoiler').classList.toggle('active');
                if(!container.classList.contains('active')){
                    container.classList.add('active');
                    container.style.height = 'auto';
                    let height = container.clientHeight + 'px';
                    container.style.height = '0px'; 
                    setTimeout(function () {
                        container.style.height = height;
                    }, 0);    
                } else {                    
                    container.style.height = '0px';                                                            
                    setTimeout(function () {                    
                        container.classList.remove('active');
                    }, 350);                
                }                
            })
            
        })
    } 
    //tabs
    function tabs(tabName){        
        if(document.querySelector(tabName)){            
            document.querySelectorAll(tabName).forEach(item => {
                let tab = new JsTabs({
                    elm: item,
                    shouldScrollTabIntoView: false,
                });
                tab.init();                    
            });            
        }    
    }    
    tabs('.works-tabs');     
    mobileMenu                                       
    let mobileMenu = new MmenuLight(document.querySelector("#mobile-menu"));
    mobileMenu.navigation({
        title: "Меню",
        theme: "dark"
    });
    let drawerMenu = mobileMenu.offcanvas();
    document.querySelectorAll('a[href="#mobile-menu"]').forEach(mmenu => {
        mmenu.addEventListener('click', function (evnt) {
            evnt.preventDefault();
            drawerMenu.open();
        })
    });       
    //map    
    if(document.querySelector('.map')){
        function mapLoad(){
            document.querySelector('.map').classList.add('preloader');            
            let map = document.querySelector('.map');
            setTimeout(() => {                
                let src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Abc15307fa9ae7887674b4eb1769982c838f9ea0aec4e2c83db03bf31ba6ff19a&amp;width=100%25&amp;height=485&amp;lang=ru_RU&amp;scroll=false"
                if(document.querySelector('.map-block').dataset.src){
                    src = document.querySelector('.map-block').dataset.src; 
                }
                let script = document.createElement('script');
                script.async = true;
                script.src = src;
                document.querySelector('.map-block').replaceWith(script);                                                      
            }, 1000)
            setTimeout(() => {
                document.querySelector('.map iframe').setAttribute('loading', 'lazy');
                document.querySelector('.map').classList.remove('preloader');
            }, 1500)
        }
        let load = false;        
        if(document.querySelector('.map-block').dataset.load === 'true'){
            load = true;
            mapLoad();
        }
        window.addEventListener('scroll', function(){      
            if(load === false){
                load = true;
                mapLoad();  
            }
        })
    }                
    //notice
    const notice = (message, delay = 4000) => {
        let container = document.querySelector('.js_toast_container');
        if (!container) {
            container = parseHTML(`<div aria-live="polite" aria-atomic="true">
                                            <div class="toast-container position-fixed top-0 end-0 p-3 js_toast_container" style="z-index: 10000;"> 
                                            </div>
                                        </div>`);
    
            document.querySelector('body').append(container);
        }    
        let id = Math.random().toString().substring(2);    
        let element = parseHTML(`<div class="toast" id="toast_${id}" role="alert" aria-live="assertive" data-bs-animation="true" data-bs-delay="${delay}" aria-atomic="true">
                                            <div class="toast-header">                                                
                                            </div>
                                            <div class="toast-body">
                                                ${message}
                                                <button type="button" class="btn-close border-0 bg-transparent p-0" data-bs-dismiss="toast" aria-label="Close">
                                                    <i class="Close icon fs-20"></i> 
                                                </button>
                                            </div>
                                        </div>`);    
        container.append(element);
        let to = document.querySelector(`#toast_${id}`);        
        let t = new Toast(to);
        t.show();    
        to.addEventListener('hidden.bs.toast', () => to.remove());        
    };    
    window.noty = notice;            
    //Mask
    if(document.querySelector('input[type="tel"]')){    
        function isNumber(val) {
            return /^[-]?\d+$/.test(val);
        }          
        function format(targetInput, e) {        
            let tel = targetInput.value.replace(/[^0-9]/g, '');            
            let result = '';
            let position = getCursorPosition(targetInput);
            if (tel.length) {
                if ("1" !== tel[0] && "2" !== tel[0] && "3" !== tel[0] && "4" !== tel[0] && "5" !== tel[0] && "6" !== tel[0] && "9" !== tel[0] || (tel = "7" + tel), "8" === tel[0])
                    result = "7";
                else {
                    if ("7" !== tel[0])
                        return;
                    result = tel[0]
                }
                result = '+' + result,          
                result = result + " (" + tel.substring(1, 4),
                tel.length > 3 && (result = result + ") " + tel.substring(4, 7)),
                tel.length > 6 && (result = result + " " + tel.substring(7, 9)),
                tel.length > 9 && (result = result + "-" + tel.substring(9, 11))                           
            }                                      
            targetInput.value = result;               
            if (e.keyCode === 46 || e.keyCode === 8) {                     
                setCaretPosition(targetInput, position);            
            }        
        }
        function setCaretPosition(elem, caretPos) {
            let range = void 0;    
            if (elem.createTextRange) {    
                range = elem.createTextRange();    
                range.move('character', caretPos);    
                range.select();    
            } else {    
                elem.focus();    
                if (elem.selectionStart !== undefined) {    
                    elem.setSelectionRange(caretPos, caretPos);    
                }    
            }    
        }            
        function getCursorPosition(element) {    
            let el = element;    
            let pos = 0;    
            if ('selectionStart' in el) {    
                pos = el.selectionStart;    
            } else if ('selection' in document) {    
                el.focus();    
                var Sel = document.selection.createRange();    
                var SelLength = document.selection.createRange().text.length;    
                Sel.moveStart('character', -el.value.length);    
                pos = Sel.text.length - SelLength;    
            }            
            return pos;    
        }    
        function formatUp(e){
            format(e.currentTarget, e);                
            if(isNumber(e.key) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39){            
                format(e.currentTarget, e);
            }    
        }   
        function formatDown(e){                       
            if(!isNumber(e.key) && e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 39){            
                e.preventDefault();
                e.stopPropagation();                      
            }
        }
        function clickInpt(e){
            if(e.currentTarget.value === ''){
                e.currentTarget.value = '+7 (';
            }    
        }
        document.querySelectorAll('input[type="tel"]').forEach(input => {               
            input.addEventListener('keydown', formatDown)
            input.addEventListener('keyup', formatUp)
            input.addEventListener('click', clickInpt)
            document.addEventListener('click', function(e){
                if(e.target !== input && input.value == '+7 ('){
                    input.value= '';
                }
            })     
        })
        

    }    
    //скролл до верха
    if(document.querySelector('.scroll-item')){        
        document.addEventListener('scroll', ()=> {                      
            if(window.pageYOffset > 300){
                document.querySelectorAll('.scroll-item').forEach(item => {
                    item.classList.add('active');
                })
            } else {
                document.querySelectorAll('.scroll-item').forEach(item => {
                    item.classList.remove('active');
                })    
            }

        })
        document.querySelector('.scroll-top').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
    }        
})
