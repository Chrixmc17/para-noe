/* Pradera encantada para Noe — capa de decoración e interacciones */
(() => {
  "use strict";
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId=id=>document.getElementById(id);
  const overlay=byId("noeWelcome");
  const enter=byId("noeWelcomeEnter");
  // La música original la sintetiza el sitio. Autoplay puede ser bloqueado por el navegador.
  // El botón de bienvenida proporciona un gesto directo para iniciarla con seguridad.
  const beginMeadow=()=>{
    if(!overlay || overlay.classList.contains("noe-leaving"))return;
    overlay.classList.add("noe-leaving");
    overlay.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
    if(typeof setMusic==="function" && !musicActive){
      void setMusic(true);
    }
    setTimeout(()=>{overlay.hidden=true;},750);
  };
  if(overlay&&enter){
    document.body.style.overflow="hidden";
    enter.addEventListener("click",beginMeadow);
    enter.focus({preventScroll:true});
  }

  const sky=byId("noeMeadowLayer");
  if(sky&&!reduce){
    const butterflies=[
      ["one","🦋"],["two","🦋"],["three","🦋"]
    ];
    for(const [c,t]of butterflies){
      const e=document.createElement("span");
      e.className="noe-flying-butterfly "+c;e.textContent=t;
      sky.appendChild(e);
    }
    for(let i=0;i<17;i++){
      const p=document.createElement("span");
      p.className="noe-floating-petal";
      p.textContent=i%4===0?"✿":i%3===0?"❀":"❁";
      p.style.left=(i*19+3)%100+"%";
      p.style.setProperty("--fall",(11+(i%7)*2)+"s");
      p.style.setProperty("--lag",(-i*2.2)+"s");
      sky.appendChild(p);
    }
    for(const c of ["one","two","three"]){
      const d=document.createElement("span");
      d.className="noe-dewdrop "+c;
      sky.appendChild(d);
    }
  }

  const bear=byId("bearHug");
  if(bear){
    bear.addEventListener("click",()=>{
      bear.classList.remove("noe-hugging");
      void bear.offsetWidth;
      bear.classList.add("noe-hugging");
      setTimeout(()=>bear.classList.remove("noe-hugging"),2200);
    });
  }

  const notes=[
    "Noe, espero que hoy encuentres aunque sea un ratito de calma solo para ti. 🌷",
    "Si el día fue difícil, ojalá la noche llegue más tranquila. No tienes que poder con todo. ☁️",
    "Que nunca se te olvide que mereces cariño, paciencia y cosas bonitas. ♡",
    "A veces la vida nos regala una sonrisa en un momento pequeño. Ojalá hoy tengas una. 🌼",
    "Este jardincito no te pide nada: puedes volver cuando quieras y quedarte el tiempo que necesites. 🧸",
    "Que puedas descansar, respirar y sentirte en paz contigo misma. 🌙",
    "El osito y las flores te mandan un abrazo suave, sin prisas. 🌿"
  ];
  let count=0;
  const button=byId("noeEnvelopeButton");
  const output=byId("noeWishMessage");
  const again=byId("noeWishAgain");
  const progress=byId("noeWishProgress");
  const stage=byId("noeWishCard");
  let opened=false;
  function scatter(){
    if(reduce||!stage)return;
    for(let i=0;i<11;i++){
      const p=document.createElement("span");
      p.className="noe-floating-blossom";
      p.textContent=i%2?"✦":"🌸";
      p.style.left=(35+Math.random()*30)+"%";
      p.style.top=(42+Math.random()*19)+"%";
      p.style.setProperty("--dx",((Math.random()-.5)*230)+"px");
      p.style.animationDelay=(i*.055)+"s";
      stage.appendChild(p);
      setTimeout(()=>p.remove(),2700);
    }
  }
  function openWish(){
    if(!button||!output)return;
    if(!opened){
      opened=true;
      button.classList.add("is-open");
      button.setAttribute("aria-label","Sobre abierto. Descubrir otra notita");
    }
    output.textContent=notes[count%notes.length];
    count++;
    if(progress)progress.textContent="Notita "+count+" descubierta ♡";
    scatter();
  }
  if(button)button.addEventListener("click",openWish);
  if(again)again.addEventListener("click",openWish);

  // Intenta reproducir al cargar solo cuando lo permite el navegador, sin bloquear la página.
  // En caso contrario se activa al elegir Entrar a la pradera.
  if(typeof AudioContext!=="undefined" || typeof window.webkitAudioContext!=="undefined"){
    const tryOnLoad=()=>{
      if(!overlay || overlay.classList.contains("noe-leaving"))return;
      // No iniciar setMusic() en un AudioContext suspendido: dependerá del toque de bienvenida.
      // El control de sonido original permanece disponible para encender y apagar.
    };
    if(document.readyState==="complete")tryOnLoad();
    else window.addEventListener("load",tryOnLoad,{once:true});
  }
})();
