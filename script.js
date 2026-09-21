/* DUSTINNOPE ANIMATION STUDIOS — shared JS: fog/ember canvas, reveal, nav, mailto form */
(function(){
  "use strict";

  /* ---------- HERO FOG + EMBERS (lightweight canvas) ---------- */
  var canvas = document.getElementById('fog-canvas');
  if(canvas){
    var ctx = canvas.getContext('2d'), W, H, parts = [];
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function size(){ W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    size(); window.addEventListener('resize', size);
    function spawn(n){
      for(var i=0;i<n;i++){
        var ember = Math.random() < 0.35;
        parts.push({
          x: Math.random()*W, y: ember ? H + 20 : Math.random()*H,
          r: ember ? Math.random()*2.2+0.8 : Math.random()*90+40,
          vx: (Math.random()-0.5)*(ember?0.35:0.25),
          vy: ember ? -(Math.random()*0.7+0.25) : (Math.random()-0.5)*0.15,
          a: ember ? Math.random()*0.75+0.25 : Math.random()*0.10+0.04,
          ember: ember,
          hue: ember ? (Math.random()<0.5 ? '193,18,31' : '200,90,30') : '150,150,160'
        });
      }
    }
    spawn(70);
    function tick(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<parts.length;i++){
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if(p.ember && Math.random()<0.02) p.vx += (Math.random()-0.5)*0.2;
        if(p.y < -30 || p.x < -120 || p.x > W+120){
          parts.splice(i,1); i--; spawn(1); continue;
        }
        var g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
        g.addColorStop(0,'rgba('+p.hue+','+p.a+')');
        g.addColorStop(1,'rgba('+p.hue+',0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      if(!reduce) requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------- SCROLL REVEAL ---------- */
  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },{threshold:0.12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- MOBILE NAV ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }

  /* ---------- CONTACT FORM -> MAILTO ---------- */
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var msg = document.getElementById('cf-message').value.trim();
      var subject = encodeURIComponent('Studio inquiry from ' + (name || 'the website'));
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
      window.location.href = 'mailto:dustin@dustinnope.com?subject=' + subject + '&body=' + body;
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  document.querySelectorAll('.js-year').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });
})();
