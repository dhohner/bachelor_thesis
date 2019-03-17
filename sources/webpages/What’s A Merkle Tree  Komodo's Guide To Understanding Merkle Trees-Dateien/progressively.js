/*!
* Themerella
*
* (c) Copyright themerella.com
*
* @version 1.0.0
* @author  Themerella
*/



/*!
* progressively 1.0.0
* https://github.com/thinker3197/progressively
* @license MIT licensed
*
* Copyright (C) 2016 Ashish
*/
!function(a,b){'function'==typeof define&&define.amd?define(function(){return b(a)}):'object'==typeof exports?module.exports=b:a.progressively=b(a)}(this,function(a){'use strict';function b(a,b){var c={};for(var d in a)c[d]=b.hasOwnProperty(d)?b[d]:a[d];return c}function c(){return window.devicePixelRatio>1}function d(a){setTimeout(function(){var b=new Image;b.onload=function(){a.classList.remove('progressive--not-loaded'),a.classList.add('progressive--is-loaded'),a.src=this.src,h(a)},c()&&a.hasAttribute("data-rjs")?b.src=a.getAttribute("data-rjs"):b.src=a.getAttribute("data-progressive")},f.delay)}function e(){g||(clearTimeout(g),g=setTimeout(function(){i.render(),g=null},f.throttle))}var f,g,h,i={};return h=function(){},f={throttle:300,delay:100,offset:300,onLoad:function(){}},i.init=function(c){c=c||{},f=b(f,c),h=f.onLoad||h,i.render(),document.addEventListener?a.addEventListener('load',e,!1):a.attachEvent('onload',e)},i.render=function(){var a=document.querySelectorAll('.progressive__img'),b=new IntersectionObserver(function(a){a.forEach(function(a){var b=!1;a.isIntersecting&&!b&&(b=!0,a.target.classList.contains('progressive--not-loaded')&&d(a.target))})},{threshould:.1,rootMargin:f.offset+'px'});a.forEach(function(a,c){b.observe(a)})},i.drop=function(){clearTimeout(g)},i});