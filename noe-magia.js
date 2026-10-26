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


  // Lluvia de flores por TODA la página, no únicamente dentro de la pradera.
  // Se mantiene delicada para que se puedan leer las cartas y pulsar botones.
  const floralFiles=[
    "rosa-noelia.svg","lirio-noelia.svg","flor-blanca-noelia.svg",
    "flor-violeta-noelia.svg","margaritas-noelia.svg","tulipanes-noelia.svg",
    "lavanda-noelia.svg","camelias-noelia.svg"
  ];
  if(!reduce){
    const rain=document.createElement("div");
    rain.className="noe-global-rain";
    rain.setAttribute("aria-hidden","true");
    document.body.appendChild(rain);
    const count=window.innerWidth<600?19:34;
    for(let i=0;i<count;i++){
      const item=document.createElement("span");
      item.className="noe-rain-flower";
      const f=(i*7+Math.floor(i/4))%floralFiles.length;
      if(i%5===0){
        const petal=document.createElement("span");
        petal.textContent=["🌸","🌷","🌼","❀","✿"][i%5];
        item.appendChild(petal);
      }else{
        const picture=document.createElement("img");
        picture.src=floralFiles[f];
        picture.alt="";picture.decoding="async";
        item.appendChild(picture);
      }
      item.style.setProperty("--x",((i*37.71)%99).toFixed(1)+"%");
      item.style.setProperty("--size",(window.innerWidth<600?12+i%4*4:15+i%5*5)+"px");
      item.style.setProperty("--duration",(16+(i*7)%15)+"s");
      item.style.setProperty("--delay",(-i*2.23)+"s");
      item.style.setProperty("--spin",(4+i%5)+"s");
      item.style.setProperty("--drift",((i%2?-1:1)*(35+i%7*15))+"px");
      item.style.setProperty("--opacity",(.34+(i%4)*.065).toFixed(2));
      rain.appendChild(item);
    }
    const syncRain=()=>{
      const welcomeVisible=overlay&&!overlay.hidden&&!overlay.classList.contains("noe-leaving");
      rain.classList.toggle("flower-rain-behind",!welcomeVisible);
    };
    syncRain();
    if(enter)enter.addEventListener("click",()=>rain.classList.add("flower-rain-behind"));
  }

  // Muchas flores distintas sobre el césped, sin cubrir la cara del osito.
  const meadow=byId("meadowStage");
  if(meadow){
    const field=document.createElement("div");
    field.className="noe-meadow-wildflowers";
    field.setAttribute("aria-hidden","true");
    const spots=[
      [3,2,82,0],[9,10,66,-8],[16,0,80,7],[23,9,69,-9],[29,2,59,7],
      [37,0,55,-6],[45,7,48,4],[53,0,54,-8],[62,9,60,8],
      [69,0,67,-5],[77,8,72,6],[84,0,68,-6],[92,11,85,4],[98,1,73,-7],
      [6,26,48,9],[17,25,47,-8],[29,24,46,4],[72,25,43,-3],[82,23,49,8],[94,28,53,-8],
      [12,2,48,5],[35,16,40,-5],[57,15,38,6],[87,4,43,-7]
    ];
    spots.forEach(([x,bottom,width,tilt],i)=>{
      const image=document.createElement("img");
      image.src=floralFiles[(i*3+Math.floor(i/4))%floralFiles.length];
      image.alt="";
      image.loading="lazy";
      image.className=i%4===0?"back":"front";
      image.style.setProperty("--left",x+"%");
      image.style.setProperty("--bottom",bottom+"%");
      image.style.setProperty("--width",width+"px");
      image.style.setProperty("--tilt",tilt+"deg");
      image.style.setProperty("--sway",(3.4+i%5*.85)+"s");
      image.style.setProperty("--offset",(-i*.37)+"s");
      field.appendChild(image);
    });
    const teddy=byId("bearHug");
    // Detrás del osito y delante del paisaje, manteniendo los botones interactivos.
    if(teddy&&teddy.closest(".teddy-area"))meadow.insertBefore(field,teddy.closest(".teddy-area"));
    else meadow.appendChild(field);
  }

  // Sustituir las repeticiones de ramos por ocho ilustraciones botánicas distintas.
  document.querySelectorAll(".noe-floral-parade").forEach((parade,j)=>{
    parade.classList.add("noe-diverse");
    parade.replaceChildren();
    const order=j%2?[5,0,6,2,7,3,4,1]:[4,1,6,0,7,2,5,3];
    order.forEach((which,i)=>{
      const picture=document.createElement("img");
      picture.src=floralFiles[which];picture.alt="";
      picture.loading="lazy";
      picture.style.animationDelay=(-i*.72)+"s";
      parade.appendChild(picture);
    });
  });
  document.querySelectorAll(".noe-floral-banner img, .noe-floral-closing-bouquet img, .noe-floral-corner-decoration img").forEach((img,i)=>{
    if(i%3===0)img.src="camelias-noelia.svg";
    else if(i%3===1)img.src="tulipanes-noelia.svg";
    else img.src="margaritas-noelia.svg";
  });

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
