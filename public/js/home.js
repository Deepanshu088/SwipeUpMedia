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
// function must(){
//     var items = document.getElementsByClassName("item");
//     var noitems = 4;
//     var sw = screen.width;
//     if(sw < 768){
//         noitems = 2; 
//         if(sw < 600){
//             noitems = 1;
//         }
//     }
//     for(var i=0;i<noitems;i++){
//         items[i].display = "block";
//     }
// }
// must();
