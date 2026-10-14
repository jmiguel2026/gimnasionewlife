(function(){
 var NUMERO="51926498836";
 function wa(msg){return "https://wa.me/"+NUMERO+"?text="+encodeURIComponent(msg);}

 // Botón flotante
 document.getElementById("waFloat").href=wa("Hola, quiero información sobre las membresías del gimnasio");

 // Botones de planes
 document.querySelectorAll("[data-plan]").forEach(function(b){
  b.addEventListener("click",function(){
   window.open(wa("Hola, quiero información sobre el plan "+b.dataset.plan+" del gimnasio"),"_blank","noopener");
  });
 });

 // Menú móvil
 var burger=document.getElementById("burger"),menu=document.getElementById("menu");
 burger.addEventListener("click",function(){
  var open=menu.classList.toggle("open");
  burger.setAttribute("aria-expanded",open);
 });
 menu.querySelectorAll("a").forEach(function(a){
  a.addEventListener("click",function(){menu.classList.remove("open");burger.setAttribute("aria-expanded","false");});
 });

 // Animación al hacer scroll
 var items=document.querySelectorAll(".rv");
 if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){
   es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
  },{threshold:.15});
  items.forEach(function(el,i){el.style.transitionDelay=(i%3)*0.12+"s";io.observe(el);});
 }else{items.forEach(function(el){el.classList.add("in");});}

 document.getElementById("year").textContent=new Date().getFullYear();
})();
