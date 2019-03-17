(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-52108117-1', 'auto');

var page = document.location.pathname;

// Strip language path
page = page.replace(/^(\/[a-z]{2}|\/zh-cn)?\/(.*)$/, "/$2")

// Strip hashes, addresses, etc
page = page.replace(/^\/([a-z]{3})\/block\/.*$/, "/$1/block");
page = page.replace(/^\/([a-z]{3})\/tx\/.*$/, "/$1/tx");
page = page.replace(/^\/([a-z]{3})\/address\/.*$/, "/$1/address");

ga('send', 'pageview', page, { anonymizeIp: true });
