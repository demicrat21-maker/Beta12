/* ===== МЕНЮ: правьте названия, состав (d), вес (w) и цену (p) ===== */
const MENU = [
  {chip:"drinks", title:"Напитки", items:[
    {n:"Морс из ассорти ягод", w:"1 л", p:"300 ₽"}
  ]},
  {chip:"hot", title:"Горячее", items:[
    {n:"Шашлык свиной"},
    {n:"Шашлык куриный"},
    {n:"Люля-кебаб"},
    {n:"Стейк из сёмги на гриле"},
    {n:"Картофель запечённый или на гриле"},
    {n:"Овощи гриль", d:"шампиньоны, болгарский перец, кабачок, баклажан"}
  ]},
  {chip:"sauces", title:"Соусы", items:[
    {n:"Томатный", w:"1 креманка", p:"70 ₽"},
    {n:"Барбекю", w:"1 креманка", p:"70 ₽"},
    {n:"Тартар", w:"1 креманка", p:"70 ₽"},
    {n:"Сметано-чесночный", w:"1 креманка", p:"70 ₽"}
  ]},
  {chip:"cuts", title:"Нарезки", items:[
    {n:"Мясная нарезка", d:"ветчина, карбонад, грудинка, сырокопчёная колбаса", w:"300 г"},
    {n:"Сырная нарезка", d:"маасдам, пармезан, гауда, чеддер, дор-блю, песто", w:"250 г"},
    {n:"Овощная нарезка", d:"огурец, помидор, болгарский перец", w:"300 г"},
    {n:"Фруктовая нарезка", w:"550 г"},
    {n:"Рыбная нарезка", w:"250 г"},
    {n:"Соленья", d:"корнишоны, капуста, морковь по-корейски, помидоры"},
    {n:"Оливки, маслины"}
  ]},
  {chip:"salads", title:"Салаты", items:[
    {n:"Цезарь с курицей", w:"200 г"},
    {n:"Цезарь с креветками", w:"200 г"},
    {n:"Цезарь с лососем", w:"200 г"},
    {n:"Греческий салат", w:"220 г"}
  ]},
  {chip:"salads", title:"Салаты на общей тарелке", items:[
    {n:"Столичный", w:"180 г"},
    {n:"Оливье", w:"180 г"},
    {n:"Сельдь под шубой", w:"180 г"},
    {n:"Крабовый"},
    {n:"Капрезе", d:"моцарелла, помидоры, листья салата, бальзамический соус"}
  ]},
  {chip:"welcome", title:"Закуски «Велком-зона»", items:[
    {n:"Канапе", d:"бородинский хлеб, корнишоны, сырокопчёная колбаса, маслины"},
    {n:"Фруктовое канапе"},
    {n:"Канапе с креветкой", d:"черри, креветки, маслины"},
    {n:"Канапе с сырокопчёной колбасой", d:"черри, лист салата, моцарелла, оливка"},
    {n:"Сыр сулугуни в панировке"},
    {n:"Сырное ассорти", d:"на выбор"},
    {n:"Адыгейский сыр с клубникой"},
    {n:"Креветка темпура с соусом"},
    {n:"Тарталетки с маслом и икрой"},
    {n:"Тарталетка с сёмгой"},
    {n:"Тарталетка с салатом на выбор", d:"столичный, оливье, крабовый"},
    {n:"Брускетта с крабовым муссом, креветкой и огурцом"},
    {n:"Брускетта с творожным сыром и сёмгой"},
    {n:"Брускетта с творожным кремом и балыком"},
    {n:"Брускетта с моцареллой и соусом песто"},
    {n:"Рулетики из баклажана"},
    {n:"Рулетики из ветчины"},
    {n:"Шарики из микса бри", d:"бри, моцарелла, виноград, ореховая крошка, гренадин"},
    {n:"Шарики из сыра", d:"в панировке, зелени, грецком орехе"}
  ]}
];
(function(){try{
  var box=document.getElementById("dishes"); if(!box)return;
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
  var groups=MENU.map(function(g){
    var s=el("section","menu-group");s.setAttribute("data-chip",g.chip);
    s.appendChild(el("h3","menu-cat",g.title));
    if(g.note)s.appendChild(el("p","menu-note",g.note));
    var ul=el("ul","menu-items");
    g.items.forEach(function(it){
      var li=el("li");var left=el("div");
      left.appendChild(el("h4",null,it.n));
      if(it.d)left.appendChild(el("p",null,it.d));
      li.appendChild(left);
      if(it.w||it.p){
        var m=el("span","meta");
        if(it.w)m.appendChild(el("span","w",it.w));
        if(it.p)m.appendChild(el("span","pr",it.p));
        li.appendChild(m);
      }
      ul.appendChild(li);
    });
    s.appendChild(ul);box.appendChild(s);return s;
  });
  document.querySelector(".filters").addEventListener("click",function(e){
    var b=e.target.closest(".chip");if(!b)return;
    [].forEach.call(document.querySelectorAll(".filters .chip"),function(c){c.classList.toggle("on",c===b);});
    var f=b.getAttribute("data-f");
    groups.forEach(function(s){s.classList.toggle("off",f!=="all"&&s.getAttribute("data-chip")!==f);});
  });
}catch(e){}})();

/* Вкладки с работами */
const tabs=[...document.querySelectorAll(".tab")];
function openTab(t){
  tabs.forEach(b=>{
    const on=b===t;
    b.classList.toggle("on",on);
    b.setAttribute("aria-selected",on);
    b.tabIndex=on?0:-1;
    document.getElementById(b.getAttribute("aria-controls")).hidden=!on;
  });
}
tabs.forEach((t,i)=>{
  t.addEventListener("click",()=>openTab(t));
  t.addEventListener("keydown",e=>{
    const d={ArrowRight:1,ArrowLeft:-1}[e.key]; if(!d) return;
    const n=tabs[(i+d+tabs.length)%tabs.length]; n.focus(); openTab(n);
  });
});

/* Меню на телефоне (если не сработает, остальной сайт продолжит работать) */
(function(){try{
  var b=document.querySelector(".burger"),n=document.getElementById("nav");
  if(!b||!n)return;
  function set(o){n.classList.toggle("open",o);b.setAttribute("aria-expanded",o?"true":"false");b.setAttribute("aria-label",o?"Закрыть меню":"Открыть меню");}
  b.addEventListener("click",function(){set(!n.classList.contains("open"));});
  n.addEventListener("click",function(e){if(e.target.closest("a"))set(false);});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false);});
}catch(e){}})();

/* Отзывы (данные берутся из файла reviews.js; при любой ошибке остальной сайт работает) */
(function(){try{
  var box=document.getElementById("reviews-box"); if(!box)return;
  var VK="https://vk.ru/club91135205";
  var all=(typeof REVIEWS!=="undefined"&&Array.isArray(REVIEWS))?REVIEWS:[];
  var list=all.filter(function(r){return r&&r.text;});
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
  function btn(label){var a=el("a","btn",label);a.href=VK;a.target="_blank";a.rel="noopener";return a;}
  if(!list.length){
    var d=el("div","empty");
    d.appendChild(el("p",null,"Здесь скоро появятся отзывы наших клиентов. Праздновали с нами? Напишите несколько слов, нам важно ваше мнение."));
    d.appendChild(btn("Оставить отзыв"));
    box.appendChild(d);return;
  }
  var grid=el("div","reviews-list");
  list.forEach(function(r){
    var f=el("figure","review");
    var n=parseInt(r.stars,10);
    if(n>=1&&n<=5){var s=el("div","stars",new Array(n+1).join("\u2605"));s.setAttribute("aria-label","Оценка "+n+" из 5");f.appendChild(s);}
    f.appendChild(el("blockquote",null,r.text));
    var c=el("figcaption",null,r.name||"Клиент");
    if(r.event)c.appendChild(el("span",null,r.event));
    f.appendChild(c);grid.appendChild(f);
  });
  box.appendChild(grid);
  var w=el("div","reviews-cta");w.appendChild(btn("Оставить отзыв"));box.appendChild(w);
}catch(e){}})();

/* Плавное появление блоков при прокрутке (если что-то не поддерживается, всё просто видно сразу) */
(function(){try{
  if(!("IntersectionObserver" in window))return;
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var sel=".block > h2,.block > .intro,.tabs,.case-title,.filters,.dishes,.tile,.steps li,.gallery figure,.gallery4 figure,details,.reviews-list,#reviews-box .empty,.contact > *";
  var items=[].slice.call(document.querySelectorAll(sel));
  var seen=[],count=new Map();
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting)return;
      var el=en.target;io.unobserve(el);
      el.classList.add("in");
      var d=parseInt(el.getAttribute("data-d")||"0",10);
      setTimeout(function(){el.classList.remove("reveal","in");el.style.transitionDelay="";},900+d);
    });
  },{threshold:0,rootMargin:"0px 0px -6% 0px"});
  items.forEach(function(el){
    if(seen.indexOf(el)>-1)return;seen.push(el);
    var p=el.parentNode,i=count.get(p)||0;count.set(p,i+1);
    var d=Math.min(i,5)*90;
    el.setAttribute("data-d",d);el.style.transitionDelay=d+"ms";
    el.classList.add("reveal");io.observe(el);
  });
}catch(e){}})();

/* Подразделы «Фотографии / Видео» и видео из ВКонтакте (при ошибке остальной сайт работает) */
(function(){try{
  var VK="https://vk.ru/club91135205";
  var NAMES={wedding:"Свадьбы",buffet:"Фуршет",banquet:"Банкет",dishes:"Блюда"};
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
  function link(label,href,cls){var a=el("a",cls||null,label);a.href=href;a.target="_blank";a.rel="noopener";return a;}

  /* переключатель Фотографии / Видео внутри каждой вкладки */
  [].forEach.call(document.querySelectorAll(".subtabs"),function(group){
    var btns=[].slice.call(group.querySelectorAll(".subtab"));
    function open(b){
      btns.forEach(function(x){
        var on=x===b;
        x.classList.toggle("on",on);x.setAttribute("aria-selected",on?"true":"false");x.tabIndex=on?0:-1;
        document.getElementById(x.getAttribute("aria-controls")).hidden=!on;
      });
    }
    btns.forEach(function(b,i){
      b.addEventListener("click",function(){open(b);});
      b.addEventListener("keydown",function(e){
        var d={ArrowRight:1,ArrowLeft:-1}[e.key];if(!d)return;
        var n=btns[(i+d+btns.length)%btns.length];n.focus();open(n);
      });
    });
  });

  /* видео */
  var data=(typeof VIDEOS!=="undefined"&&VIDEOS)?VIDEOS:{};
  [].forEach.call(document.querySelectorAll(".subpanel[data-cat]"),function(panel){
    var cat=panel.getAttribute("data-cat"),box=panel.querySelector(".video-box");
    var list=(Array.isArray(data[cat])?data[cat]:[]).filter(function(v){return v&&(v.embed||(v.oid&&v.id));});
    if(!list.length){
      var d=el("div","empty");
      d.appendChild(el("p",null,"Видео в разделе «"+(NAMES[cat]||"")+"» скоро появятся здесь. Хотите посмотреть примеры сейчас? Загляните к нам ВКонтакте."));
      d.appendChild(link("Смотреть во ВКонтакте",VK,"btn"));
      box.appendChild(d);return;
    }
    var wrap=el("div","video-list");
    list.forEach(function(v){
      var item=el("figure","video-item"+(v.vertical?"":" h"));
      var frame=el("div","video-frame");
      frame.style.aspectRatio=v.vertical?"9 / 16":"16 / 9";
      var poster=el("button","video-poster");
      poster.type="button";
      poster.setAttribute("aria-label","Смотреть видео"+(v.title?": "+v.title:""));
      poster.appendChild(el("span","play","\u25B6"));
      poster.appendChild(el("span","pt","Смотреть видео"));
      poster.addEventListener("click",function(){
        var src=v.embed||("https://vk.ru/video_ext.php?oid="+v.oid+"&id="+v.id+"&hd=2");
        src+=(src.indexOf("?")>-1?"&":"?")+"autoplay=1";
        var f=document.createElement("iframe");
        f.src=src;f.allow="autoplay; encrypted-media; fullscreen; picture-in-picture";
        f.setAttribute("allowfullscreen","");f.setAttribute("title",v.title||"Видео");
        frame.innerHTML="";frame.appendChild(f);
      });
      frame.appendChild(poster);
      item.appendChild(frame);
      var cap=el("figcaption");
      if(v.title)cap.appendChild(el("span","vt",v.title));
      if(v.url)cap.appendChild(link("Открыть во ВКонтакте",v.url,"vl"));
      item.appendChild(cap);
      wrap.appendChild(item);
    });
    box.appendChild(wrap);
  });
}catch(e){}})();

/* Фильтры фотографий по видам (при ошибке остальной сайт работает) */
(function(){try{
  var TYPES={
    wedding:[["all","Все"],["president","Президиум"],["photozone","Фотозоны и рассадка"],["tables","Столы гостей"],["decor","Декор и детали"]],
    dishes:[["all","Все"],["salads","Салаты"],["cuts","Нарезки"],["hot","Горячее"],["sauces","Соусы"]]
  };
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
  Object.keys(TYPES).forEach(function(cat){
    var panel=document.getElementById(cat+"-photos");if(!panel)return;
    var figs=[].slice.call(panel.querySelectorAll("figure[data-type]"));
    if(!figs.length)return;
    var bar=el("div","ptypes");bar.setAttribute("role","group");bar.setAttribute("aria-label","Виды фотографий");
    var result=el("div","gf off");
    var kids=[].slice.call(panel.children);
    function show(type,btn){
      [].forEach.call(bar.children,function(b){var on=b===btn;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on?"true":"false");});
      if(type==="all"){
        kids.forEach(function(k){k.classList.remove("off");});
        result.classList.add("off");result.innerHTML="";return;
      }
      kids.forEach(function(k){k.classList.add("off");});
      result.innerHTML="";
      figs.forEach(function(f){
        if((f.getAttribute("data-type")||"").split(" ").indexOf(type)>-1){
          var c=f.cloneNode(true);
          c.classList.remove("reveal","in");c.style.transitionDelay="";c.removeAttribute("data-d");
          result.appendChild(c);
        }
      });
      result.classList.remove("off");
    }
    TYPES[cat].forEach(function(t,i){
      var b=el("button","ptype"+(i===0?" on":""),t[1]);b.type="button";b.setAttribute("aria-pressed",i===0?"true":"false");
      b.addEventListener("click",function(){show(t[0],b);});
      bar.appendChild(b);
    });
    panel.insertBefore(bar,panel.firstChild);
    panel.appendChild(result);
  });
}catch(e){}})();

/* Учёт нажатий на кнопки ВКонтакте и Макс в Яндекс Метрике (если Метрика недоступна, ничего не происходит) */
(function(){try{
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a[href]");
    if(!a||typeof ym!=="function")return;
    var h=a.href||"",g=h.indexOf("vk.ru")>-1?"vk_click":(h.indexOf("max.ru")>-1?"max_click":(h.indexOf("tel:")===0?"phone_click":""));
    if(g)ym(113834187,"reachGoal",g);
  });
}catch(e){}})();
