// ==UserScript==// ==UserScript==
// @name         bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==


function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать барабанное шоу в москве","Барабанщики на свадьбу","Барабанщики на корпоратив"]
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let words = sites[site];
let word = words[getRandom(0, words.length)];

let vvod = document.getElementById("text");


if (vvod!=undefined){
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(function(){
    vvod.value = vvod.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
 document.getElementsByClassName("button mini-suggest__button button_theme_websearch")[0].click();



        }
    },500);


}else if (location.hostname =="yandex.ru"){
site = getCookie("site");
let pageNum;
let links = document.links;
let linkIsFound = false
 for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes(site)){
            link.removeAttribute("target");
            linkIsFound = true;
            setTimeout(()=>{link.click();},1000);
            break;
        }
  }

setTimeout(()=>{
  pageNum = document.querySelector("span.pager__item").innerText;
  if(!linkIsFound && pageNum<10){
   setTimeout(()=>{
    document.getElementsByClassName("pager__item_kind_next")[0].click();
    },3000);
  }
  else if(!linkIsFound){
     location.href = "https://yandex.ru";
  }
 },1000);
}else{
    if(getRandom(1,11) > 8 ) setTimeout(()=>{location.href = "https://yandex.ru/";},3000);
    let links = document.links;
    setInterval(()=>{
      let index = getRandom(0,links.length);
      let link = links[index];
      if (link.href.includes(location.hostname)){
    setTimeout(()=>{link.click();},3000);
      }
        },3000);
}

