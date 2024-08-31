export function cookie() {
    let cookieNotification = document.getElementById('cookie_notification'),
        cookieDate = localStorage.getItem('cookieDate'),
        cookieBtn = cookieNotification.querySelector('.cookie-alert__button'),
        svg_cookie = cookieNotification.querySelector(".cookie-close");
    if(svg_cookie){
        svg_cookie.addEventListener('click', function() {
            cookieNotification.style.display = 'none';
        });
    }
    if( !cookieDate || (+cookieDate + 31536000000) < Date.now() ){
        cookieNotification.classList.add('show');
    }

    cookieBtn.addEventListener('click', function(){
        localStorage.setItem( 'cookieDate', Date.now() );
        cookieNotification.classList.remove('show');
    });
}