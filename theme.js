(function(){
  var saved=null;
  try{saved=localStorage.getItem("awscourse-theme")}catch(e){}
  var t=(saved==="light")?"light":"dark";
  function apply(cur){
    document.documentElement.setAttribute("data-theme",cur);
    var b=document.getElementById("themeBtn");
    if(b){b.textContent=(cur==="light")?"Dark 🌙":"Light ☀️";b.setAttribute("aria-pressed",String(cur==="light"))}
  }
  apply(t);
  window.themeToggle=function(){
    t=(t==="light")?"dark":"light";
    try{localStorage.setItem("awscourse-theme",t)}catch(e){}
    apply(t);
  };
  document.addEventListener("DOMContentLoaded",function(){apply(t)});
})();