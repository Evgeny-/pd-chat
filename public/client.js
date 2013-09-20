// ==UserScript==
// @id             Prodota-chat
// @name           Prodota-chat
// @version        1.0
// @encoding       utf-8
// @namespace
// @author         Двапой
// @description
// @include        http://prodota.ru/*
// @run-at         document-end
// ==/UserScript==
(function (w) {
   var headID = document.getElementsByTagName("head")[0],
      newScript = document.createElement('script');

   if( ! headID) return;

   newScript.type = 'text/javascript';
   newScript.src = 'http://pd-chat.nodejitsu.com/socket.io/socket.io.js';
   headID.appendChild(newScript);
   newScript.addEventListener('load', startChat, false);

   function startChat () {

      var socket, input, sendButton, log, login, copy;

      copy = document.getElementById('ipbwrapper');
      login = document.getElementById('user_link');

      if( ! login) login = 'guest';
      else login = login.innerHTML;


      copy.innerHTML += '<div id="dvapoy_chat"><div id="dvapoy_log"></div><input type="text" id="dvapoy_input"><input type="submit" id="dvapoy_send" value="Отправить"></div>';
      copy.innerHTML += '<style>'
         +  '#dvapoy_chat {position:fixed;bottom:0;right:0;background:#fff;border:1px solid #ccc;box-shadow:0 0 7px rgba(0,0,0,.3);}'
         +  '#dvapoy_log {height: 200px;width:350px;padding: 10px;overflow-y:scroll;text-align:left;color:#111;}'
         +  '#dvapoy_input {width: 280px;}'
         +  '</style>';

      socket = io.connect('http://pd-chat.nodejitsu.com/');
      input = document.getElementById('dvapoy_input');
      sendButton = document.getElementById('sdvapoy_end');
      log = document.getElementById('dvapoy_log');

      login = login.split('&nbsp;')[0];
      if('trim' in String) login = login.trim();

      function showMessage(msg) {
         if(!msg.text) return;
         log.innerHTML += "<b>" + msg.name + "</b>: " + msg.text + "<br>";
         log.scrollTop = log.scrollHeight;
      }

      function send (obj) {
         socket.send(JSON.stringify(obj));
      }

      function sendMessage () {
         send({type: 'msg', text: input.value});
         input.value = '';
      }

      socket.on('connect', function () {
         send({type: 'nickname', user: login});

         socket.on('message', function (msg) {
            showMessage(msg);
         });

         input.addEventListener('keypress', function(e) {
            if (e.which == '13') sendMessage();
         });

         sendButton.addEventListener('click', sendMessage);
      });

      socket.on('error', function (err) {
         showMessage({name:'system', text: err});
      });
   };
}(unsafeWindow || window));