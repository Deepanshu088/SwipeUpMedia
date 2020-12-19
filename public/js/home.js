function navbarOpen(){
    var MI = document.getElementById("menuIcon");
    var MM = document.getElementById("MobileMenu");
    if(MI.innerText=="☰"){
        MM.style.maxHeight="300px";
        MI.innerHTML="<b>✕</b>";
    }else{
        navbarClose();
    }
return;
}
function navbarClose(){
    var MI = document.getElementById("menuIcon");
    var MM = document.getElementById("MobileMenu");
    MI.innerHTML="<b>☰</b>"
    MM.style.maxHeight="0px";
return;
}