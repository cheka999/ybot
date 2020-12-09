// ==UserScript==
// @name         bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}


let vvod = document.getElementById("text");
let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];
let word = words[getRandom(0, words.length)];

if (vvod!=undefined){
    let i = 0;
    let timerId = setInterval(function(){
    vvod.value = vvod.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
 document.getElementsByClassName("button mini-suggest__button button_theme_websearch")[0].click();


        }
    },500);


}else{

let pageNum;
let links = document.links;
let linkIsFound = false
 for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
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
}
