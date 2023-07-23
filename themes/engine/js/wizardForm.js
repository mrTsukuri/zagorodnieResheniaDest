require('zangdar');

function prevTab(){
    let tabs = document.querySelectorAll('.choosing-tabs-btn');
    tabs.forEach(item => {item.classList.remove('prev-item')});
    for(let i = 0; i < tabs.length; i++){                        
        if(!tabs[i].classList.contains('active')){                            
            tabs[i].classList.add('prev-item');
        } else {
            break                                                     
        }
    } 
}
document.querySelectorAll('.zangdar__wizard').forEach(wizardForm => {
    window.wizard = new Zangdar(wizardForm, {
        onStepChange(step) {                       
            const breadcrumb = this.getBreadcrumb()                     
            buildSteps(breadcrumb)
        },
        onValidation(step, fields, form) {
            if (step.labeled('2')) {
                const err_message = form.querySelector('.error__message')
                if (err_message) {
                    err_message.parentNode.removeChild(err_message)
                }                
                return true
            }
            return true
        },
        onSubmit(e) {
            e.preventDefault()
            this.getCurrentStep().active = false
            this.getCurrentStep().completed = true
            console.log
            const breadcrumb = this.getBreadcrumb()
            buildSteps(breadcrumb)
            e.target.style.display = 'none'
            document.getElementById('form-completed').style.display = 'block'
            return false
        }
    })
    
    window.buildSteps = steps => {                     
        const $steps = document.getElementById('steps')        
        for (let label in steps) { 
            //console.log(steps[label].index);          
            if (steps.hasOwnProperty(label)) {
                const $li = document.querySelector('.choosing-tabs-btn');
                $li.querySelector('.num').innerHTML = steps[label].index + 1 + '. '
                $li.classList.add('step-item')            
                if (steps[label].active) {
                    document.querySelectorAll('.choosing-tabs-btn').forEach(item => {item.classList.remove('active')});
                    $li.classList.add('active')                                            
                }                           
                $li.addEventListener('click', e => {
                    e.preventDefault()                    
                    wizard.revealStep(label)
                    prevTab()
                      
                })                          
                $steps.appendChild($li)
            }
        }
    }
    
    const breadcrumb = wizard.getBreadcrumb()         
    buildSteps(breadcrumb)
    
    const startBtn = document.querySelector('.start-step')
    startBtn.addEventListener('click', function(e){
        e.preventDefault();
        wizard.revealStep(0);
        prevTab()
    })
    
    document.querySelectorAll('.next-step').forEach(item => {
        item.addEventListener('click', () => {  
            document.querySelector('.choosing-block').scrollIntoView({block: "start", behavior: "smooth"});
            prevTab()
        })
    })
    document.querySelectorAll('.prev-step').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.choosing-block').scrollIntoView({block: "start", behavior: "smooth"});
            prevTab()                        
        })
    })    
     
})
