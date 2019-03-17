self.define=self.define||(()=>{const e={},t={},o=e=>e.replace(/^.\/(\w+)-[a-f0-9]{8,}.js$/,"./$1.js");return function(n,a){const i=o(`./${((document.currentScript||{}).src||"").split("?").shift().split("/").pop()}`),r={};if(i in e&&!(i in t))return void console.error(`module redefined: ${i}`);let c,l;if("function"==typeof n)l=n,c=[];else{if(null==a)throw new Error(`evaluating module ${i}: invalid arguments`);c=n,l=a}const s=c.map(n=>"exports"===n?r:function(o){if(o in e)return e[o];if(!(o in t))return e[o]=new Promise((e,n)=>{const a=setTimeout(()=>{n(new Error(`could not resolve ${o}`))},1e4);t[o]=(t=>{clearTimeout(a),e(t)})});throw new Error(`could not resolve ${o}`)}(o(n))),d=Promise.all(s).then(e=>(l(...e),r)).catch(e=>{throw e.message=`evaluating module ${i}: ${e.message}`,e});t[i]?(t[i](d),delete t[i]):e[i]=d}})(),define(["./frameworks-0e0307a1.js"],function(e){"use strict";let t,o=!1;function n(e){t=setTimeout(a,5e3,e)}async function a(t){const a=t.value,i=e.getAttribute(t,"data-url");if(await e.verifySsoSession(),a===await e.fetchText(i))n(t);else if(!o){const t=document.querySelector("#gollum-editor-submit");t instanceof HTMLButtonElement&&(t.disabled=!0,e.query(document,"#gollum-error-message").classList.remove("d-none"))}}e.observe("#wiki-current-version",{constructor:HTMLInputElement,initialize(e){n(e)},remove(){clearTimeout(t)}}),e.on("click","#gollum-editor-submit",function(){o=!0});const i={node1:null,node2:null,selectNodeRange(){const e=i.node1,t=i.node2;if(e&&t){if(i.nodeComesAfter(e,t)){const e=i.node1;i.node1=i.node2,i.node2=e}let o=e.nextElementSibling;for(;o&&o!==t;)o=o.nextElementSibling}},nodeComesAfter(e,t){let o=e.previousElementSibling;for(;o;){if(o===t)return!0;o=o.previousElementSibling}return!1},checkNode(t){const o=e.closest(t,".js-wiki-history-revision");t.checked?i.node1?i.node2?t.checked=!1:(i.node2=o,i.selectNodeRange()):i.node1=o:i.node1&&o===i.node1?(i.node1=null,i.node2&&(i.node1=i.node2,i.node2=null)):i.node2&&o===i.node2&&(i.node2=null)}};e.observe(".js-wiki-history-checkbox",function(t){e.invariant(t instanceof HTMLInputElement,"null.js:79"),t.checked&&i.checkNode(t)}),e.on("change",".js-wiki-history-checkbox",function(t){let o=t.currentTarget;e.invariant(o instanceof HTMLInputElement,"null.js:86"),i.checkNode(o)}),e.hashChange(function(){if(!document.querySelector("#wiki-wrapper"))return;const t=window.location.hash.match(/^#(wiki-(.+))$/);if(!t)return;const o=t[1],n=t[2];e.findElementByFragmentName(document,o)||(window.location.hash=n)});const r={markupCreated:!1,markup:"",attachEvents(){e.query(document,"#gollum-dialog-action-ok").addEventListener("click",r.eventOK),e.query(document,"#gollum-dialog-action-cancel").addEventListener("click",r.eventCancel);for(const t of e.querySelectorAll(document,'#gollum-dialog-dialog input[type="text"]'))t.addEventListener("keydown",r.eventKeydown)},detachEvents(){e.query(document,"#gollum-dialog-action-ok").removeEventListener("click",r.eventOK),e.query(document,"#gollum-dialog-action-cancel").removeEventListener("click",r.eventCancel)},createFieldMarkup(e){let t="<fieldset>";for(let o=0;o<e.length;o++)if("object"==typeof e[o]){switch(t+="<div>",e[o].type){case"text":t+=r.createFieldText(e[o])}t+="</div>"}return t+="</fieldset>"},createFieldText(e){let t="";return e.name&&(t+='<label class="d-block mb-1"',e.id&&(t+=` for="gollum-dialog-dialog-generated-field-${e.id}"`),t+=`>${e.name}</label>`),t+='<input type="text" class="mb-3 input-block"',e.id&&(t+=` name="${e.id}"`,t+=` id="gollum-dialog-dialog-generated-field-${e.id}">`),t},createMarkup:(e,t)=>(r.markupCreated=!0,`\n      <div id="gollum-dialog-dialog">\n        <div class="Box-header">\n          <h3 class="Box-title">${e}</h3>\n        </div>\n        <div class="Box-body overflow-auto">\n          <div id="gollum-dialog-dialog-body">${t}</div>\n          <div id="gollum-dialog-dialog-buttons" class="pt-3 border-top">\n            <button type="button" id="gollum-dialog-action-cancel" class="ml-2 btn btn-sm btn-outline float-right" data-close-dialog>Cancel</a>\n            <button type="button" id="gollum-dialog-action-ok" class="btn btn-sm btn-outline float-right" data-close-dialog>OK</a>\n          </div>\n        </div>\n      </div>`),eventCancel(e){e.preventDefault(),r.hide()},eventOK(t){t.preventDefault();const o={};for(const n of e.querySelectorAll(document,"#gollum-dialog-dialog-body input",HTMLInputElement)){const e=n.getAttribute("name");e&&(o[e]=n.value)}r.getDetailsElement().addEventListener("toggle",function(){"function"==typeof r.okEventCallback&&r.okEventCallback(o)},{once:!0}),r.hide()},eventKeydown(e){"Enter"===e.key&&r.eventOK(e)},hide(){r.markupCreated=!1,r.getDetailsElement().removeAttribute("open"),r.detachEvents()},getDetailsElement:()=>e.query(document,".js-gollum-button-details"),init(e){let t="",o="";if(!e||"object"!=typeof e)return;e.body&&"string"==typeof e.body&&(o=`<p>${e.body}</p>`),e.fields&&"object"==typeof e.fields&&(o+=r.createFieldMarkup(e.fields)),e.title&&"string"==typeof e.title&&(t=e.title),r.okEventCallback=e.OK,r.markup=r.createMarkup(t,o),r.show(),r.attachEvents();const n=document.querySelector('#gollum-dialog-dialog input[type="text"]');n instanceof HTMLInputElement&&(n.autofocus=!0)},show(){r.markupCreated&&(e.query(document,".js-gollum-button-dialog").innerHTML=r.markup,r.getDetailsElement().setAttribute("open",""))}},c={MarkupType:"markdown",EditorMode:"code",NewFile:!1,HasFunctionBar:!0};let l={};function s(t){if(l=Object.assign(c,t),p.baseEditorMarkup()&&p.functionBar()){const t=e.query(document,"#gollum-editor-body").getAttribute("data-markup-lang");if(t&&(l.MarkupType=t),p.formatSelector()&&h.init(e.query(document,"#gollum-editor-format-selector select",HTMLSelectElement)),u.setActiveLanguage(l.MarkupType),p.help()){const e=document.getElementById("gollum-editor-help");e&&(e.style.display="none",e.classList.remove("jaws"))}}}function d(e,t){"object"==typeof t&&u.define(e,t)}const u={_ACTIVE_LANG:"",_LOADED_LANGS:[],_LANG:{},define(e,t){if(u._ACTIVE_LANG=e,u._LOADED_LANGS.push(e),"object"==typeof s.WikiLanguage){const o={};Object.assign(o,s.WikiLanguage,t),u._LANG[e]=o}else u._LANG[e]=t},getActiveLanguage:()=>u._ACTIVE_LANG,setActiveLanguage(e){if(u.getHookFunctionFor("deactivate")){const e=u.getHookFunctionFor("deactivate");e&&e()}function t(){if(m.refresh(),u.isValid()&&p.formatSelector()&&h.updateSelected(),u.getHookFunctionFor("activate")){const e=u.getHookFunctionFor("activate");e&&e()}}u.isLoadedFor(e)?(u._ACTIVE_LANG=e,t()):(u._ACTIVE_LANG="",u.define(e,{}),t())},getHookFunctionFor(e,t){let o=t;return o||(o=u._ACTIVE_LANG),u.isLoadedFor(o)&&u._LANG[o][e]&&"function"==typeof u._LANG[o][e]?u._LANG[o][e]:null},getDefinitionFor(e,t){let o=t;return o||(o=u._ACTIVE_LANG),u.isLoadedFor(o)&&u._LANG[o][e]&&"object"==typeof u._LANG[o][e]?u._LANG[o][e]:null},isLoadedFor(e){if(0===u._LOADED_LANGS.length)return!1;for(let t=0;t<u._LOADED_LANGS.length;t++)if(u._LOADED_LANGS[t]===e)return!0;return!1},isValid:()=>u._ACTIVE_LANG&&"object"==typeof u._LANG[u._ACTIVE_LANG]},p={baseEditorMarkup:()=>null!=document.querySelector("#gollum-editor")&&null!=document.querySelector("#gollum-editor-body"),formatSelector:()=>null!=document.querySelector("#gollum-editor-format-selector select"),functionBar:()=>l.HasFunctionBar&&null!=document.querySelector("#gollum-editor-function-bar"),ff4Environment:()=>new RegExp(/Firefox\/4.0b/).test(navigator.userAgent),editSummaryMarkup:()=>null!=document.querySelector("input#gollum-editor-message-field"),help:()=>null!=document.querySelector("#gollum-editor #gollum-editor-help")&&null!=document.querySelector("#gollum-editor #function-help")},m={isActive:!1,activate(){const t=e.query(document,"#gollum-editor-function-bar");for(const o of e.querySelectorAll(t,".function-button"))null!=u.getDefinitionFor(o.id)?(o.addEventListener("click",m.evtFunctionButtonClick),o.classList.remove("disabled")):"function-help"!==o.id&&(o.removeEventListener("click",m.evtFunctionButtonClick),o.classList.add("disabled"));t.classList.add("active"),m.isActive=!0},deactivate(){const t=e.query(document,"#gollum-editor-function-bar");for(const o of e.querySelectorAll(t,".function-button"))o.removeEventListener("click",m.evtFunctionButtonClick);t.classList.remove("active"),m.isActive=!1},evtFunctionButtonClick(t){const o=t.currentTarget;e.invariant(o instanceof HTMLElement,"null.js:270"),t.preventDefault();const n=u.getDefinitionFor(o.id);"object"==typeof n&&n&&m.executeAction(n)},executeAction(t){const o=document.getElementById("gollum-editor-body");e.invariant(o instanceof HTMLTextAreaElement,"null.js:281");const n=o.value,a=m.getFieldSelection(o);let i="string"==typeof a?a:"",r=!0,c=null;if("function"==typeof t.exec&&"string"==typeof a){const i=t.exec;return e.invariant("function"==typeof i,"null.js:294"),void i.call(t,n,a,o)}let l=/([^\n]+)/gi;if(t.search&&"object"==typeof t.search&&(l=null,l=new RegExp(t.search)),t.replace&&"string"==typeof t.replace){const e=t.replace;""===(i=(i=i.replace(l,e)).replace(/\$[\d]/g,""))&&(c=e.indexOf("$1"),i=e.replace(/\$[\d]/g,""),-1===c&&(c=Math.floor(e.length/2)))}t.append&&"string"==typeof t.append&&("string"==typeof a&&i===a&&(r=!1),i+=t.append),i&&m.replaceFieldSelection(o,i,r,c)},getFieldSelectionPosition:e=>({start:e.selectionStart,end:e.selectionEnd}),getFieldSelection(e){const t=m.getFieldSelectionPosition(e);return e.value.substring(t.start,t.end)},isShown(){const t=document.querySelector("#gollum-editor-function-bar");return null!=t&&e.visible(t)},refresh(){p.functionBar()&&(u.isValid()?(m.activate(),g&&g.setActiveHelp(u.getActiveLanguage())):(m.isShown()&&m.deactivate(),g.isShown()&&g.hide()))},replaceFieldSelection(e,t,o,n){const a=m.getFieldSelectionPosition(e),i=e.value;let r=!0;!1===o&&(r=!1);let c=null;e.scrollTop&&(c=e.scrollTop),e.value=i.substring(0,a.start)+t+i.substring(a.end),r&&("number"==typeof n&&n>0?e.setSelectionRange(a.start+n,a.start+n):e.setSelectionRange(a.start,a.start+t.length)),e.focus(),c&&(e.scrollTop=c)}},h={SELECTOR:null,evtChangeFormat(){const e=this.value;u.setActiveLanguage(e)},init(e){null!=h.SELECTOR&&h.SELECTOR.removeEventListener("change",h.evtChangeFormat),h.SELECTOR=e,h.updateSelected();const t=h.SELECTOR;t&&t.addEventListener("change",h.evtChangeFormat)},updateSelected(){const e=u.getActiveLanguage(),t=h.SELECTOR;t&&(t.value=e)}},g={_ACTIVE_HELP:"",_ACTIVE_HELP_LANG:"",_LOADED_HELP_LANGS:[],_HELP:{},define(e,t){const o=document.querySelector("#function-help");if(g.isValidHelpFormat(t)){if(g._ACTIVE_HELP_LANG=e,g._LOADED_HELP_LANGS.push(e),g._HELP[e]=t,o){o.classList.remove("disabled"),o.addEventListener("click",g.evtHelpButtonClick),g.generateHelpMenuFor(e);const t=document.querySelector("#gollum-editor-help");t&&t.hasAttribute("data-autodisplay")&&g.show()}}else o&&(o.classList.add("disabled"),o.removeEventListener("click",g.evtHelpButtonClick))},clickFirstHelpLink(){const e=document.querySelector("#gollum-editor-help-list .menu-item");e&&e.click()},generateHelpMenuFor(t){if(!g._HELP[t])return!1;const o=g._HELP[t],n=e.query(document,"#gollum-editor-help-parent");n.innerHTML="",e.query(document,"#gollum-editor-help-list").innerHTML="",e.query(document,"#gollum-editor-help-content").innerHTML="";for(let a=0;a<o.length&&"object"==typeof o[a];a++){const t=e.parseHTML(document,`<a href="#" rel="${a}" class="menu-item border-bottom">${o[a].menuName}</a>`),i=e.query(t,"a");0===a&&i.classList.add("selected"),i.addEventListener("click",g.evtParentMenuClick),n.append(t)}g.generateSubMenu(o[0],0),g.clickFirstHelpLink()},generateSubMenu(t,o){const n=e.query(document,"#gollum-editor-help-list");n.innerHTML="",e.query(document,"#gollum-editor-help-content").innerHTML="";for(let a=0;a<t.content.length&&"object"==typeof t.content[a];a++){const i=e.parseHTML(document,`<a href="#" rel="${o}:${a}" class="menu-item border-bottom">${t.content[a].menuName}</a>`);for(const t of e.querySelectorAll(i,"a"))t.addEventListener("click",g.evtSubMenuClick);n.append(i)}},hide(){const e=document.querySelector("#gollum-editor-help");e&&(e.style.display="none")},show(){const e=document.querySelector("#gollum-editor-help");e&&(e.style.display="")},showHelpFor(t,o){const n=g._HELP[g._ACTIVE_HELP_LANG][t].content[o].data;e.query(document,"#gollum-editor-help-content").innerHTML=n},isLoadedFor(e){for(let t=0;t<g._LOADED_HELP_LANGS.length;t++)if(e===g._LOADED_HELP_LANGS[t])return!0;return!1},isShown(){const t=document.querySelector("#gollum-editor-help");return null!=t&&e.visible(t)},isValidHelpFormat:e=>!("object"!=typeof e||!e.length||"string"!=typeof e[0].menuName||"object"!=typeof e[0].content||!e[0].content.length),setActiveHelp(e){const t=document.querySelector("#function-help");g.isLoadedFor(e)?(g._ACTIVE_HELP_LANG=e,t&&(t.classList.remove("disabled"),t.addEventListener("click",g.evtHelpButtonClick),g.generateHelpMenuFor(e))):(t&&(t.classList.add("disabled"),t.removeEventListener("click",g.evtHelpButtonClick)),g.isShown()&&g.hide())},evtHelpButtonClick(t){const o=t.currentTarget;if(e.invariant(o instanceof Element,"null.js:644"),t.preventDefault(),g.isShown()){const t=e.query(document,"#gollum-editor-help");if(t.hasAttribute("data-autodisplay")){const n=e.getAttribute(o,"data-dismiss-help-url"),a=e.getAttribute(o,"data-dismiss-help-authenticity-token"),i=new URLSearchParams;i.append("authenticity_token",a),e.fetch(n,{method:"delete",body:i}),t.removeAttribute("data-autodisplay")}g.hide()}else g.show()},evtParentMenuClick(t){t.preventDefault();const o=t.currentTarget;if(e.invariant(o instanceof HTMLAnchorElement,"null.js:673"),o.classList.contains("selected"))return;const n=o.rel,a=g._HELP[g._ACTIVE_HELP_LANG][n];for(const i of e.querySelectorAll(document,"#gollum-editor-help-parent .menu-item"))i.classList.remove("selected");o.classList.add("selected"),g.generateSubMenu(a,n),g.clickFirstHelpLink()},evtSubMenuClick(t){t.preventDefault();const o=t.currentTarget;if(e.invariant(o instanceof HTMLAnchorElement,"null.js:696"),o.classList.contains("selected"))return;const n=o.rel.split(":");for(const a of e.querySelectorAll(document,"#gollum-editor-help-list .menu-item"))a.classList.remove("selected");o.classList.add("selected"),g.showHelpFor(n[0],n[1])}},f=g.define;function b(t){const o=e.query(document,"#gollum-editor-body",HTMLTextAreaElement);m.replaceFieldSelection(o,t)}const y={"function-bold":{search:/(^[\n]+)([\n\s]*)/g,replace:"*$1*$2"},"function-italic":{search:/(^[\n]+)([\n\s]*)/g,replace:"_$1_$2"},"function-code":{search:/(^[\n]+)([\n\s]*)/g,replace:"+$1+$2"},"function-ul":{search:/(^[\n]+)([\n\s]*)/g,replace:"* $1$2"},"function-ol":{search:/(.+)([\n]?)/g,replace:". $1$2"},"function-blockquote":{search:/(.+)([\n]?)/g,replace:"----\n$1$2\n----\n"},"function-link":{exec(){r.init({title:"Insert Link",fields:[{id:"text",name:"Link Text",type:"text",help:"The text to display to the user."},{id:"href",name:"URL",type:"text",help:"The URL to link to."}],OK(e){let t="";e.text&&e.href&&(t=`${e.href}[${e.text}]`),b(t)}})}},"function-image":{exec(){r.init({title:"Insert Image",fields:[{id:"url",name:"Image URL",type:"text"},{id:"alt",name:"Alt Text",type:"text"}],OK(e){let t="";e.url&&e.alt&&(t=`image::${e.url}[${e.alt}]`),b(t)}})}}},k={"function-bold":{search:/([^\n]+)([\n\s]*)/g,replace:"**$1**$2"},"function-italic":{search:/([^\n]+)([\n\s]*)/g,replace:"_$1_$2"},"function-code":{search:/([^\n]+)([\n\s]*)/g,replace:"`$1`$2"},"function-hr":{append:"\n***\n"},"function-ul":{search:/(.+)([\n]?)/g,replace:"* $1$2"},"function-ol":{search:/(.+)([\n]?)/g,replace:"1. $1$2"},"function-blockquote":{search:/(.+)([\n]?)/g,replace:"> $1$2"},"function-h1":{search:/(.+)([\n]?)/g,replace:"# $1$2"},"function-h2":{search:/(.+)([\n]?)/g,replace:"## $1$2"},"function-h3":{search:/(.+)([\n]?)/g,replace:"### $1$2"},"function-link":{exec(){r.init({title:"Insert Link",fields:[{id:"text",name:"Link Text",type:"text"},{id:"href",name:"URL",type:"text"}],OK(e){let t="";e.text&&e.href&&(t=`[${e.text}](${e.href})`),b(t)}})}},"function-image":{exec(){r.init({title:"Insert Image",fields:[{id:"url",name:"Image URL",type:"text"},{id:"alt",name:"Alt Text",type:"text"}],OK(e){let t="";e.url&&(t=`![${e.alt}](${e.url})`),b(t)}})}}},w={"function-bold":{search:/([^\n]+)([\n\s]*)/g,replace:"*$1*$2"},"function-italic":{search:/([^\n]+)([\n\s]*)/g,replace:"/$1/$2"},"function-code":{search:/(^[\n]+)([\n\s]*)/g,replace:"=$1=$2"},"function-ul":{search:/(.+)([\n]?)/g,replace:"* $1$2"},"function-ol":{search:/(.+)([\n]?)/g,replace:"1. $1$2"},"function-blockquote":{search:/(.+)([\n]?)/g,replace:"#+BEGIN_QUOTE\n$1$2\n#+END_QUOTE\n"},"function-h1":{search:/(.+)([\n]?)/g,replace:"* $1$2"},"function-h2":{search:/(.+)([\n]?)/g,replace:"** $1$2"},"function-h3":{search:/(.+)([\n]?)/g,replace:"*** $1$2"},"function-link":{exec(){r.init({title:"Insert Link",fields:[{id:"text",name:"Link Text",type:"text"},{id:"href",name:"URL",type:"text"}],OK(e){let t="";e.text&&e.href?t=`[[${e.href}][${e.text}]]`:e.href&&(t=`[[${e.href}]]`),b(t)}})}},"function-image":{exec(){r.init({title:"Insert Image",fields:[{id:"url",name:"Image URL",type:"text"}],OK(e){let t="";e.url&&(t=`[[${e.url}]]`),b(t)}})}}},x={"function-bold":{search:/(^[\n]+)([\n\s]*)/g,replace:"B<$1>$2"},"function-italic":{search:/(^[\n]+)([\n\s]*)/g,replace:"I<$1>$2"},"function-code":{search:/(^[\n]+)([\n\s]*)/g,replace:"C<$1>$2"},"function-h1":{search:/(.+)([\n]?)/gi,replace:"=head1 $1$2"},"function-h2":{search:/(.+)([\n]?)/gi,replace:"=head2 $1$2"},"function-h3":{search:/(.+)([\n]?)/gi,replace:"=head3 $1$2"},"function-link":{exec(){r.init({title:"Insert Link",fields:[{id:"text",name:"Link Text",type:"text"},{id:"href",name:"URL",type:"text"}],OK(e){let t="";e.text&&e.href&&(t=`L<${e.text}|${e.href}>`),b(t)}})}}},L={"function-bold":{search:/(^[\n]+)([\n\s]*)/g,replace:"*$1*$2"},"function-italic":{search:/(^[\n]+)([\n\s]*)/g,replace:"_$1_$2"},"function-hr":{append:"\n***\n"},"function-code":{search:/(^[\n]+)([\n\s]*)/g,replace:"<pre><code>$1</code></pre>$2"},"function-ul":{search:/(.+)([\n]?)/gi,replace:"* $1$2"},"function-ol":{search:/(.+)([\n]?)/gi,replace:"# $1$2"},"function-blockquote":{search:/(.+)([\n]?)/gi,replace:"bq. $1$2"},"function-link":{exec(){r.init({title:"Insert Link",fields:[{id:"text",name:"Link Text",type:"text",help:"The text to display to the user."},{id:"href",name:"URL",type:"text",help:"The URL to link to."}],OK(e){let t="";e.text&&e.href&&(t=`"${e.text}":${e.href}`),b(t)}})}},"function-image":{exec(){r.init({title:"Insert Image",fields:[{id:"url",name:"Image URL",type:"text"},{id:"alt",name:"Alt Text",type:"text"}],OK(e){if(e.url){let t=`!${e.url}`;""!==e.alt&&(t+=`(${e.alt})`),b(t+="!")}}})}}},v={"function-bold":{search:/([^\n]+)([\n]*)/gi,replace:"**$1**$2"},"function-italic":{search:/([^\n]+)([\n]*)/gi,replace:"//$1//$2"},"function-code":{search:/([^\n]+)([\n]*)/gi,replace:"{{{$1}}}$2"},"function-hr":{append:"\n\n----\n\n"},"function-ul":{search:/(.+)([\n]?)/gi,replace:"* $1$2"},"function-ol":{search:/(.+)([\n]?)/gi,replace:"# $1$2"},"function-link":{exec(){r.init({title:"Insert Link",fields:[{id:"text",name:"Link Text",type:"text",help:"The text to display to the user."},{id:"href",name:"URL",type:"text",help:"The URL to link to."}],OK(e){b(`[[${e.href}|${e.text}]]`)}})}},"function-image":{exec(){r.init({title:"Insert Image",fields:[{id:"url",name:"Image URL",type:"text"},{id:"alt",name:"Alt Text",type:"text"}],OK(e){let t="";e.url&&e.alt&&(t=`{{${e.url}`,""!==e.alt&&(t+=`|${e.alt}}}`)),b(t)}})}}},T={"function-bold":{search:/([^\n]+)([\n\s]*)/g,replace:"((*$1*))$2"},"function-code":{search:/([^\n]+)([\n\s]*)/g,replace:"(({$1}))$2"},"function-ul":{search:/(.+)([\n]?)/gi,replace:"* $1$2"},"function-ol":{exec(e,t){let o="";const n=t.split("\n"),a=/[\w]+/;for(let i=0;i<n.length;i++)a.test(n[i])&&(o+=`(${(i+1).toString()}) ${n[i]}`);b(o)}},"function-h1":{search:/(.+)([\n]?)/gi,replace:"= $1$2"},"function-h2":{search:/(.+)([\n]?)/gi,replace:"== $1$2"},"function-h3":{search:/(.+)([\n]?)/gi,replace:"=== $1$2"}};e.observe("#gollum-editor",function(e){s({NewFile:e.classList.contains("create")})}),s.WikiLanguage={"function-internal-link":{exec:()=>r.init({title:"Insert Wiki Link",fields:[{id:"name",name:"Link Name",type:"text"}],OK:e=>b(e.name?`[[${e.name}]]`:"")})}},e.on("click",".js-wiki-toggle-collapse",function(t){const o=e.closest(t.currentTarget,".js-wiki-pages-box");for(const e of o.querySelectorAll(".js-wiki-sidebar-toggle-display"))e.classList.toggle("d-none")}),e.on("click",".js-wiki-more-pages-link",function(t){t.preventDefault(),e.closest(t.currentTarget,".js-wiki-pages-box").classList.toggle("wiki-show-more")}),e.on("preview:setup",".js-previewable-comment-form",function(t){e.invariant(t instanceof CustomEvent,"null.js:66");const o=t.currentTarget.querySelector("#wiki_format");if(o){t.detail.data.wiki_format=o.value}}),e.on("change","#wiki_format",function(t){const o=t.currentTarget,n=e.closest(o,".js-previewable-comment-form");n.classList.contains("preview-selected")&&n.dispatchEvent(new CustomEvent("preview:render",{bubbles:!0,cancelable:!1}))}),f("asciidoc",[{menuName:"Text Formatting",content:[{menuName:"Headers",data:"<p>ASCIIDoc headers can be written in two ways: with differing underlines or with different indentation using <code>=</code> (equals sign). ASCIIDoc supports headings 1-4. The editor will automatically use the <code>=</code> notation. To create a level one header, prefix your line with one <code>=</code>. Level two headers are created with <code>==</code> and so on.</p>"},{menuName:"Bold / Italic",data:"<p>To display text as <strong>bold</strong>, wrap the text in <code>*</code> (asterisks). To display text as <em>italic</em>, wrap the text in <code>_</code> (underscores). To create <code>monospace</code> text, wrap the text in <code>+</code> (plus signs)."},{menuName:"Scripts",data:"<p>Superscript and subscript is created the same way as other inline formats. To create superscript text, wrap your text in <code>^</code> (carats). To create subscript text, wrap your text in <code>~</code> (tildes).</p>"},{menuName:"Special Characters",data:"<p>ASCIIDoc will automatically convert textual representations of commonly-used special characters. For example, <code>(R)</code> becomes &reg;, <code>(C)</code> becomes &copy; and <code>(TM)</code> becomes &trade;.</p>"}]},{menuName:"Blocks",content:[{menuName:"Paragraphs",data:"<p>ASCIIDoc allows paragraphs to have optional titles or icons to denote special sections. To make a normal paragraph, simply add a line between blocks and a new paragraph will start. If you want to title your paragraphs, adda line prefixed by <code>.</code> (full stop). An example paragraph with optional title is displayed below:<br><br><code>.Optional Title<br><br>This is my paragraph. It is two sentences long.</code></p>"},{menuName:"Source Blocks",data:"<p>To create source blocks (long blocks of code), follow the same syntax as above but with an extra line denoting the inline source and lines of four dashes (<code>----</code>) delimiting the source block.. An example of Python source is below:<br><br><code>.python.py<br>[source,python]<br>----<br># i just wrote a comment in python<br># and maybe one more<br>----</code></p>"},{menuName:"Comment Blocks",data:"<p>Comment blocks are useful if you want to keep notes for yourself inline but do not want them displayed to the public. To create a comment block, simply wrap the paragraph in dividers with four slashes (<code>////</code>). An example comment block is below:<br><br><code>////<br>My comment block is here now<br><br>It can be multiple paragraphs. Really.<br>////</p>"},{menuName:"Quote Blocks",data:"<p>Quote blocks work much like comment blocks &mdash; simply create dividers using four underscores (<code>____</code>) around your quote. An example quote block is displayed below:<br><code>____<br>This is my quote block. Quote something nice here, otherwise there is no point in quoting.<br>____</code></p>"}]},{menuName:"Macros",content:[{menuName:"Links",data:'<p>To create links to external pages, you can simply write the URI if you want the URI to link to itself. (i.e., <code>https://github.com/</code> will automatically be parsed to <a href="javascript:void(0);">https://github.com/</a>. If you want different text to be displayed, simply append it to the end of the URI in between <code>[</code> (brackets.) For example, <code>https://github.com/[GitHub]</code> will be parsed as <a href="javascript:void(0);">GitHub</a>, with the URI pointing to <code>https://github.com</code>.</p>'},{menuName:"Images",data:"<p>Images in ASCIIDoc work much like hyperlinks, but image URLs are prefixed with <code>image:</code>. For example, to link to an image at <code>images/icons/home.png</code>, write <code>image:images/icons/home.png</code>. Alt text can be added by appending the text to the URI in <code>[</code> (brackets).</p>"}]}]),f("markdown",[{menuName:"Block Elements",content:[{menuName:"Paragraphs &amp; Breaks",data:"<p>To create a paragraph, simply create a block of text that is not separated by one or more blank lines. Blocks of text separated by one or more blank lines will be parsed as paragraphs.</p><p>If you want to create a line break, end a line with two or more spaces, then hit Return/Enter.</p>"},{menuName:"Headers",data:"<p>Markdown supports two header formats. The wiki editor uses the &ldquo;atx&rdquo;-style headers. Simply prefix your header text with the number of <code>#</code> characters to specify heading depth. For example: <code># Header 1</code>, <code>## Header 2</code> and <code>### Header 3</code> will be progressively smaller headers. You may end your headers with any number of hashes.</p>"},{menuName:"Blockquotes",data:"<p>Markdown creates blockquotes email-style by prefixing each line with the <code>&gt;</code>. This looks best if you decide to hard-wrap text and prefix each line with a <code>&gt;</code> character, but Markdown supports just putting <code>&gt;</code> before your paragraph.</p>"},{menuName:"Lists",data:"<p>Markdown supports both ordered and unordered lists. To create an ordered list, simply prefix each line with a number (any number will do &mdash; this is why the editor only uses one number.) To create an unordered list, you can prefix each line with <code>*</code>, <code>+</code> or <code>-</code>.</p> List items can contain multiple paragraphs, however each paragraph must be indented by at least 4 spaces or a tab."},{menuName:"Code Blocks",data:"<p>Markdown wraps code blocks in pre-formatted tags to preserve indentation in your code blocks. To create a code block, indent the entire block by at least 4 spaces or one tab. Markdown will strip the extra indentation you’ve added to the code block.</p>"},{menuName:"Horizontal Rules",data:"Horizontal rules are created by placing three or more hyphens, asterisks or underscores on a line by themselves. Spaces are allowed between the hyphens, asterisks or underscores."}]},{menuName:"Span Elements",content:[{menuName:"Links",data:"<p>Markdown has two types of links: <strong>inline</strong> and <strong>reference</strong>. For both types of links, the text you want to display to the user is placed in square brackets. For example, if you want your link to display the text &ldquo;GitHub&rdquo;, you write <code>[GitHub]</code>.</p><p>To create an inline link, create a set of parentheses immediately after the brackets and write your URL within the parentheses. (e.g., <code>[GitHub](https://github.com/)</code>). Relative paths are allowed in inline links.</p><p>To create a reference link, use two sets of square brackets. <code>[[my internal link|internal-ref]]</code> will link to the internal reference <code>internal-ref</code>.</p>"},{menuName:"Emphasis",data:"<p>Asterisks (<code>*</code>) and underscores (<code>_</code>) are treated as emphasis and are wrapped with an <code>&lt;em&gt;</code> tag, which usually displays as italics in most browsers. Double asterisks (<code>**</code>) or double underscores (<code>__</code>) are treated as bold using the <code>&lt;strong&gt;</code> tag. To create italic or bold text, simply wrap your words in single/double asterisks/underscores. For example, <code>**My double emphasis text**</code> becomes <strong>My double emphasis text</strong>, and <code>*My single emphasis text*</code> becomes <em>My single emphasis text</em>.</p>"},{menuName:"Code",data:"<p>To create inline spans of code, simply wrap the code in backticks (<code>`</code>). Markdown will turn <code>`myFunction`</code> into <code>myFunction</code>.</p>"},{menuName:"Images",data:"<p>Markdown image syntax looks a lot like the syntax for links; it is essentially the same syntax preceded by an exclamation point (<code>!</code>). For example, if you want to link to an image at <code>https://github.com/unicorn.png</code> with the alternate text <code>My Unicorn</code>, you would write <code>![My Unicorn](https://github.com/unicorn.png)</code>.</p>"}]},{menuName:"Miscellaneous",content:[{menuName:"Automatic Links",data:'<p>If you want to create a link that displays the actual URL, markdown allows you to quickly wrap the URL in <code>&lt;</code> and <code>&gt;</code> to do so. For example, the link <a href="javascript:void(0);">https://github.com/</a> is easily produced by writing <code>&lt;https://github.com/&gt;</code>.</p>'},{menuName:"Escaping",data:"<p>If you want to use a special Markdown character in your document (such as displaying literal asterisks), you can escape the character with the backslash (<code>\\</code>). Markdown will ignore the character directly after a backslash."}]}]),f("org",[{menuName:"Block Elements",content:[{menuName:"Paragraphs &amp; Breaks",data:"<p>To create a paragraph, simply create a block of text that is not separated by one or more blank lines. Blocks of text separated by one or more blank lines will be parsed as paragraphs.</p>"},{menuName:"Headers",data:"<p>Simply prefix your header text with the number of <code>*</code> characters to specify heading depth. For example: <code>* Header 1</code>, <code>** Header 2</code> and <code>*** Header 3</code> will be progressively smaller headers.</p>"},{menuName:"Blockquotes",data:"<p>To create a blockquote, simple embed the text between <code>#+BEGIN_QUOTE</code> and <code>#+END_QUOTE</code>. An example quote block is displayed below:<br><code>#+BEGIN_QUOTE<br>This is my quote block. Quote something nice here, otherwise there is no point in quoting.<br>#+END_QUOTE</code></p>"},{menuName:"Lists",data:"<p>Org-mode supports both ordered and unordered lists. To create an ordered list, simply prefix each line with a number (any number will do &mdash; this is why the editor only uses one number.) To create an unordered list, you can prefix each line with <code>+</code> or <code>-</code>.</p>"},{menuName:"Code Blocks",data:"<p>Code Blocks are similar to blockquote, except that <code>#+BEGIN_EXAMPLE</code> and <code>#+END_EXAMPLE</code> are used.</p>"},{menuName:"Tables",data:"<p>Org-mode supports simple tables (tables with equal number of cells in each row). To create a simple table, just separate the contents of each cell with a <code>|</code> character. For example, <br><br><code>|one|two|three|<br>|four|five|six|</code><br><br> will appear as a table with two rows and three columns.  Additionally, <br><br><code>|one|two|three|<br>|---+---+-----|<br>|four|five|six|</code><br><br> will also appear as a table, but the first row will be interpreted as a header row and the <code>&lt;th&gt;</code> tag will be used to render it. </p>"}]},{menuName:"Span Elements",content:[{menuName:"Links",data:'<p>To create links to external pages, you need to enclose the URI in double square brackets. (i.e., <code>[[https://github.com/]]</code> will automatically be parsed to <a href="javascript:void(0);">https://github.com/</a>)If you want to add text, to be displayed to the user, you write the URI and the text next to each other, both enclosed in square brackets and both of them together enclosed in another pair of square brackets. For example, if you want your link to display the text &ldquo;GitHub&rdquo;, you write <code>[[https://github.com][GitHub]]</code>.</p>'},{menuName:"Emphasis",data:"<p>Forward slashes (<code>/</code>) are treated as emphasis and are wrapped with an <code>&lt;i&gt;</code> tag. Asterisks (<code>*</code>) are treated as bold using the <code>&lt;b&gt;</code> tag.</p>"},{menuName:"Code",data:"<p>To create inline spans of code, simply wrap the code in equal signs (<code>=</code>). Orgmode will turn <code>=myFunction=</code> into <code>myFunction</code>.</p>"},{menuName:"Images",data:"<p>Org-mode image syntax is exactly same as the syntax that you would use for a URI to link to itself. The image URI is enclosed in double square brackets. Alt text on images is not currently supported by Gollum's Org-mode parser.</p>"}]}]),f("pod",[{menuName:"Command Paragraphs",content:[{menuName:"Headings",data:"<p>All command paragraphs start with <code>=</code> (equals sign).</p><p>To create headings 1 through 4, begin your command paragraph with <code>=headN</code>, where <code>N</code> is the number of the heading 1 through 4. For example, to make a first-order heading (the largest possible,) write <code>=head1</code>, then on the next line begin your paragraph that you want under the heading.</p>"},{menuName:"Beginning &amp; Ending",data:"<p>Perl pod blocks should begin with <code>=pod</code> and end with <code>=cut</code>, signifying to Pod parsers that the pod block has begun and ended. These command paragraphs only signal the beginning and end of a pod block.</p>"},{menuName:"Other Formats",data:"<p>pod also allows blocks in other formats, such as HTML or plain text. To create one of these blocks, use the <code>=format SYNTAX</code> command paragraph, where <code>SYNTAX</code> is the syntax of the block (e.g. <code>html</code> or <code>txt</code>). At the end of your block, use the <code>=end SYNTAX</code> block.</p>"},{menuName:"Encoding",data:"<p>If you are having encoding troubles, use the <code>=encoding ENC_TYPE</code> command, where <code>ENC_TYPE</code> is the encoding type (e.g. <code>utf8</code>, <code>koi8-r</code>). This will affect the entire document, not just the block below the command.</p>"}]},{menuName:"Formatting",content:[{menuName:"Text",data:"<p>Formatting text as <strong>bold</strong>, <em>italic</em> or <code>code</code> works in the <code>S&lt;word&gt;</code> syntax, where <code>S</code> is an abbreviation for the type of text you are trying to create. For example, <code>B&lt;my bold text&gt;</code> becomes <strong>my bold text</strong>,  <code>I&lt;italic text&gt;</code> becomes <em>italic text</em> and <code>C&lt;code here()&gt;</code> becomes <code>code here()</code>.</p>"},{menuName:"Hyperlinks",data:"<p>Writing hyperlinks in pod is much like formatting text, using the same <code>S&lt;&gt;</code> syntax. Instead of <code>B</code>, <code>I</code> or <code>C</code>, use <code>L</code> to begin a hyperlink.</p><p>pod allows you to hyperlink to a <code>man</code> page, a Perl documentation page, or another web page. To link to a <code>man</code> or Perl documentation page, simply include the page name in the link (e.g. <code>L&lt;perl(1)&gt;</code> or <code>L&lt;Net::Ping&gt;</code>). If you want to link to a web page, separate the URL and the link text with a pipe (e.g. to link to github.com, write <code>L&lt;GitHub|https://github.com/&gt;</code>)."}]}]),f("textile",[{menuName:"Phrase Modifiers",content:[{menuName:"Emphasis / Strength",data:"<p>To place emphasis or strength on inline text, simply place <code>_</code> (underscores) around the text for emphasis or <code>*</code> (asterisks) around the text for strength. In most browsers, <code>_mytext_</code> will appear as italics and <code>*mytext*</code> will appear as bold.</p><p>To force italics or bold, simply double the characters: <code>__mytext__</code> will appear italic and <code>**mytext**</code> will appear as bold text.</p>"},{menuName:"Citations / Editing",data:'<p>To display citations, wrap your text in <code>??</code> (two question marks).</p><p>To display edit marks such as deleted text (strikethrough) or inserted text (underlined text), wrap your text in <code>-</code> (minuses) or <code>+</code> (pluses). For example <code>-mytext-</code> will be rendered as <span style="text-decoration: line-through;">mytext</span> and <code>+mytext+</code> will be rendered as <span style="text-decoration: underline;">mytext</span></p>'},{menuName:"Superscript / Subscript",data:"<p>To display superscript, wrap your text in <code>^</code> (carets). To display subscript, wrap your text in <code>~</code> (tildes).</p>"},{menuName:"Code",data:"<p>To display monospace code, wrap your text in <code>@</code> (at symbol). For example, <code>@mytext@</code> will appear as <code>mytext</code>.</p>"},{menuName:"Acronyms",data:'<p>To create an acronym, suffix the acronym with the definition in parentheses. For example, <code>JS(JavaScript)</code> will be displayed as <abbr title="JavaScript">JS</abbr>.</p>'}]},{menuName:"Block Modifiers",content:[{menuName:"Headings",data:"<p>To display a heading in Textile, prefix your line of text with <code>hn.</code>, where <code>n</code> equals the heading size you want (1 is largest, 6 is smallest).</p>"},{menuName:"Paragraphs / Quotes",data:"<p>To create a new paragraph, prefix your first line of a block of text with <code>p.</code>.</p><p>To create a blockquote, make sure at least one blank line exists between your text and any surrounding text, and then prefix that block with <code>bq.</code> If you need to extend a blockquote to more than one text block, write <code>bq..</code> (note the two periods) and prefix your next normal paragraph with <code>p.</code></p>"},{menuName:"Code Blocks",data:"<p>Code blocks in textile are simply prefixed like any other block. To create a code block, place the beginning of the block on a separate line and prefix it with <code>bc.</code></p><p>To display a preformatted block, prefix the block with <code>pre.</code></p>"},{menuName:"Lists",data:"<p>To create ordered lists, prefix each line with <code>#</code>. To create unordered lists, prefix each line with <code>*</code>.</p>"}]},{menuName:"Links / Images",content:[{menuName:"Links",data:'<p>To display a link, put the text you want to display in quotes, then a colon (<code>:</code>), then the URL after the colon. For example <code>&quot;GitHub&quot;:https://github.com/</code> will appear as <a href="javascript:void(0);">GitHub</a>.</p>'},{menuName:"Images",data:"<p>To display an image, simply wrap the image’s URL in <code>!</code> (exclamation points). If you want to link the image to a URL, you can blend the image and link syntax: place your image URL in the exclamation points and suffix that with a colon and your URL. For example, an image at <code>http://myurl/image.png</code> that should link to <code>http://myurl/</code> should be written as <code>!http://myurl/image.png!:http://myurl/</code>.</p>"}]}]),d("asciidoc",y),d("creole",v),d("markdown",k),d("org",w),d("pod",x),d("rdoc",T),d("textile",L)});
//# sourceMappingURL=wiki-b3f884ff.js.map
