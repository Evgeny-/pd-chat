// ==UserScript==
// @id             Prodota-chat
// @name           Prodota-chat
// @version        1.0
// @encoding       utf-8
// @author         Двапой
// @include        http://prodota.ru/*
// @run-at         document-end
// ==/UserScript==
(function () {
   if(_appended) return;
   var script = document.createElement('script');
   script.src = 'http://http://localhost:8080/append.js';
   document.body.appendChild(script);  
   window._appended = true;
}());