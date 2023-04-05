let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.loadingLogo');

window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(() => {
        
        logoSpan.forEach((span, idx)=>{
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 300);
        })

        setTimeout(() => {
           logoSpan.forEach((span, idx)=>{
            setTimeout(() => {
                span.classList.remove('active');
                span.classList.add('fade');   
            }, (idx + 1) * 50)
           })
        },1500)

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 1500)
        
    });
})