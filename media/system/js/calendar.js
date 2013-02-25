Calendar=function(e,t,n,r){this.activeDiv=null;this.currentDateEl=null;this.getDateStatus=null;this.getDateToolTip=null;this.getDateText=null;this.timeout=null;this.onSelected=n||null;this.onClose=r||null;this.dragging=false;this.hidden=false;this.minYear=1970;this.maxYear=2050;this.dateFormat=Calendar._TT["DEF_DATE_FORMAT"];this.ttDateFormat=Calendar._TT["TT_DATE_FORMAT"];this.isPopup=true;this.weekNumbers=true;this.firstDayOfWeek=typeof e=="number"?e:Calendar._FD;this.showsOtherMonths=false;this.dateStr=t;this.ar_days=null;this.showsTime=false;this.time24=true;this.yearStep=2;this.hiliteToday=true;this.multiple=null;this.table=null;this.element=null;this.tbody=null;this.firstdayname=null;this.monthsCombo=null;this.yearsCombo=null;this.hilitedMonth=null;this.activeMonth=null;this.hilitedYear=null;this.activeYear=null;this.dateClicked=false;this.hiliteClass="alert-info";this.activeClass="alert-success";if(typeof Calendar._SDN=="undefined"){if(typeof Calendar._SDN_len=="undefined")Calendar._SDN_len=3;var i=new Array;for(var s=8;s>0;){i[--s]=Calendar._DN[s].substr(0,Calendar._SDN_len)}Calendar._SDN=i;if(typeof Calendar._SMN_len=="undefined")Calendar._SMN_len=3;i=new Array;for(var s=12;s>0;){i[--s]=Calendar._MN[s].substr(0,Calendar._SMN_len)}Calendar._SMN=i}};Calendar._C=null;Calendar.is_ie=/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent);Calendar.is_ie5=Calendar.is_ie&&/msie 5\.0/i.test(navigator.userAgent);Calendar.is_opera=/opera/i.test(navigator.userAgent);Calendar.is_khtml=/Konqueror|Safari|KHTML/i.test(navigator.userAgent);Calendar.getAbsolutePos=function(e){var t=0,n=0;var r=/^div$/i.test(e.tagName);if(r&&e.scrollLeft)t=e.scrollLeft;if(r&&e.scrollTop)n=e.scrollTop;var i={x:e.offsetLeft-t,y:e.offsetTop-n};if(e.offsetParent){var s=this.getAbsolutePos(e.offsetParent);i.x+=s.x;i.y+=s.y}return i};Calendar.isRelated=function(e,t){var n=t.relatedTarget;if(!n){var r=t.type;if(r=="mouseover"){n=t.fromElement}else if(r=="mouseout"){n=t.toElement}}while(n){if(n==e){return true}n=n.parentNode}return false};Calendar.removeClass=function(e,t){if(!(e&&e.className)){return}var n=e.className.split(" ");var r=new Array;for(var i=n.length;i>0;){if(n[--i]!=t){r[r.length]=n[i]}}e.className=r.join(" ")};Calendar.addClass=function(e,t){Calendar.removeClass(e,t);e.className+=" "+t};Calendar.getElement=function(e){var t=Calendar.is_ie?window.event.srcElement:e.currentTarget;while(t.nodeType!=1||/^div$/i.test(t.tagName))t=t.parentNode;return t};Calendar.getTargetElement=function(e){var t=Calendar.is_ie?window.event.srcElement:e.target;while(t.nodeType!=1)t=t.parentNode;return t};Calendar.stopEvent=function(e){e||(e=window.event);if(Calendar.is_ie){e.cancelBubble=true;e.returnValue=false}else{e.preventDefault();e.stopPropagation()}return false};Calendar.addEvent=function(e,t,n){if(e.attachEvent){e.attachEvent("on"+t,n)}else if(e.addEventListener){e.addEventListener(t,n,true)}else{e["on"+t]=n}};Calendar.removeEvent=function(e,t,n){if(e.detachEvent){e.detachEvent("on"+t,n)}else if(e.removeEventListener){e.removeEventListener(t,n,true)}else{e["on"+t]=null}};Calendar.createElement=function(e,t){var n=null;if(document.createElementNS){n=document.createElementNS("http://www.w3.org/1999/xhtml",e)}else{n=document.createElement(e)}if(typeof t!="undefined"){t.appendChild(n)}return n};Calendar._add_evs=function(el){with(Calendar){addEvent(el,"mouseover",dayMouseOver);addEvent(el,"mousedown",dayMouseDown);addEvent(el,"mouseout",dayMouseOut);if(is_ie){addEvent(el,"dblclick",dayMouseDblClick);el.setAttribute("unselectable",true)}}};Calendar.findMonth=function(e){if(typeof e.month!="undefined"){return e}else if(typeof e.parentNode.month!="undefined"){return e.parentNode}return null};Calendar.findYear=function(e){if(typeof e.year!="undefined"){return e}else if(typeof e.parentNode.year!="undefined"){return e.parentNode}return null};Calendar.showMonthsCombo=function(){var e=Calendar._C;if(!e){return false}var e=e;var t=e.activeDiv;var n=e.monthsCombo;if(e.hilitedMonth){Calendar.removeClass(e.hilitedMonth,"hilite")}if(e.activeMonth){Calendar.removeClass(e.activeMonth,e.activeClass)}var r=e.monthsCombo.getElementsByTagName("a")[e.date.getMonth()];Calendar.addClass(r,e.activeClass);e.activeMonth=r;var i=n.style;i.display="block";if(t.navtype<0)i.left=t.offsetLeft+"px";else{var s=n.offsetWidth;if(typeof s=="undefined")s=50;i.left=t.offsetLeft+t.offsetWidth-s+"px"}i.top=t.offsetTop+t.offsetHeight+"px"};Calendar.showYearsCombo=function(e){var t=Calendar._C;if(!t){return false}var t=t;var n=t.activeDiv;var r=t.yearsCombo;if(t.hilitedYear){Calendar.removeClass(t.hilitedYear,"hilite")}if(t.activeYear){Calendar.removeClass(t.activeYear,t.activeClass)}t.activeYear=null;var i=t.date.getFullYear()+(e?1:-1);var s=r.firstChild;var o=false;for(var u=12;u>0;--u){if(i>=t.minYear&&i<=t.maxYear){s.getElementsByTagName("a")[0].innerHTML=i;s.year=i;s.style.display="block";o=true}else{s.style.display="none"}s=s.nextSibling;i+=e?t.yearStep:-t.yearStep}if(o){var a=r.style;a.display="block";if(n.navtype<0)a.left=n.offsetLeft+"px";else{var f=r.offsetWidth;if(typeof f=="undefined")f=50;a.left=n.offsetLeft+n.offsetWidth-f+"px"}a.top=n.offsetTop+n.offsetHeight+"px"}};Calendar.tableMouseUp=function(ev){var cal=Calendar._C;if(!cal){return false}if(cal.timeout){clearTimeout(cal.timeout)}var el=cal.activeDiv;if(!el){return false}var target=Calendar.getTargetElement(ev);ev||(ev=window.event);Calendar.removeClass(el,cal.activeClass);if(target==el||target.parentNode==el){Calendar.cellClick(el,ev)}var mon=Calendar.findMonth(target);var date=null;if(mon){date=new Date(cal.date);if(mon.month!=date.getMonth()){date.setMonth(mon.month);cal.setDate(date);cal.dateClicked=false;cal.callHandler()}}else{var year=Calendar.findYear(target);if(year){date=new Date(cal.date);if(year.year!=date.getFullYear()){date.setFullYear(year.year);cal.setDate(date);cal.dateClicked=false;cal.callHandler()}}}with(Calendar){removeEvent(document,"mouseup",tableMouseUp);removeEvent(document,"mouseover",tableMouseOver);removeEvent(document,"mousemove",tableMouseOver);cal._hideCombos();_C=null;return stopEvent(ev)}};Calendar.tableMouseOver=function(e){var t=Calendar._C;if(!t){return}var n=t.activeDiv;var r=Calendar.getTargetElement(e);if(r==n||r.parentNode==n){Calendar.addClass(n,"hilite");Calendar.addClass(n.parentNode,"rowhilite")}else{if(typeof n.navtype=="undefined"||n.navtype!=50&&(n.navtype==0||Math.abs(n.navtype)>2))Calendar.removeClass(n,t.activeClass);Calendar.removeClass(n,"hilite");Calendar.removeClass(n.parentNode,"rowhilite")}e||(e=window.event);if(n.navtype==50&&r!=n){var i=Calendar.getAbsolutePos(n);var s=n.offsetWidth;var o=e.clientX;var u;var a=true;if(o>i.x+s){u=o-i.x-s;a=false}else u=i.x-o;if(u<0)u=0;var f=n._range;var l=n._current;var c=Math.floor(u/10)%f.length;for(var h=f.length;--h>=0;)if(f[h]==l)break;while(c-->0)if(a){if(--h<0)h=f.length-1}else if(++h>=f.length)h=0;var p=f[h];n.innerHTML=p;t.onUpdateTime()}var d=Calendar.findMonth(r);if(d){if(d.month!=t.date.getMonth()){if(t.hilitedMonth){Calendar.removeClass(t.hilitedMonth,t.hiliteClass)}Calendar.addClass(d,t.hiliteClass);t.hilitedMonth=d}else if(t.hilitedMonth){Calendar.removeClass(t.hilitedMonth,t.hiliteClass)}}else{if(t.hilitedMonth){Calendar.removeClass(t.hilitedMonth,t.hiliteClass)}var v=Calendar.findYear(r);if(v){if(v.year!=t.date.getFullYear()){if(t.hilitedYear){Calendar.removeClass(t.hilitedYear,t.hiliteClass)}Calendar.addClass(v,t.hiliteClass);t.hilitedYear=v}else if(t.hilitedYear){Calendar.removeClass(t.hilitedYear,t.hiliteClass)}}else if(t.hilitedYear){Calendar.removeClass(t.hilitedYear,t.hiliteClass)}}return Calendar.stopEvent(e)};Calendar.tableMouseDown=function(e){if(Calendar.getTargetElement(e)==Calendar.getElement(e)){return Calendar.stopEvent(e)}};Calendar.calDragIt=function(e){var t=Calendar._C;if(!(t&&t.dragging)){return false}var n;var r;if(Calendar.is_ie){r=window.event.clientY+document.body.scrollTop;n=window.event.clientX+document.body.scrollLeft}else{n=e.pageX;r=e.pageY}t.hideShowCovered();var i=t.element.style;i.left=n-t.xOffs+"px";i.top=r-t.yOffs+"px";return Calendar.stopEvent(e)};Calendar.calDragEnd=function(ev){var cal=Calendar._C;if(!cal){return false}cal.dragging=false;with(Calendar){removeEvent(document,"mousemove",calDragIt);removeEvent(document,"mouseup",calDragEnd);tableMouseUp(ev)}cal.hideShowCovered()};Calendar.dayMouseDown=function(ev){var el=document.id(Calendar.getElement(ev));var target=ev.target||ev.srcElement;if(document.id(el).get("tag")!=="td"){var testel=el.getParent("td");if(testel){el=testel}else{el=el.getParent(".dropdown-menu");if(el){el=el.getElement("table")}}}else{if(!document.id(target).hasClass("btn")&&!el.hasClass("day")&&!el.hasClass("title")){return}}if(!el){el=document.id(target).getParent(".dropdown-menu");el=el.getElement("table");el.navtype=300}if(!el||el.disabled){return false}var cal=el.calendar;cal.activeDiv=el;Calendar._C=cal;if(el.navtype!=300)with(Calendar){if(el.navtype==50){el._current=el.innerHTML;addEvent(document,"mousemove",tableMouseOver)}else addEvent(document,Calendar.is_ie5?"mousemove":"mouseover",tableMouseOver);addEvent(document,"mouseup",tableMouseUp)}else if(cal.isPopup){cal._dragStart(ev)}if(el.navtype==-1||el.navtype==1){if(cal.timeout)clearTimeout(cal.timeout);cal.timeout=setTimeout("Calendar.showMonthsCombo()",250)}else if(el.navtype==-2||el.navtype==2){if(cal.timeout)clearTimeout(cal.timeout);cal.timeout=setTimeout(el.navtype>0?"Calendar.showYearsCombo(true)":"Calendar.showYearsCombo(false)",250)}else{if(typeof el.navtype==="undefined"){$(el).addClass("alert-success");$(el).removeClass("alert-info")}cal.timeout=null}return Calendar.stopEvent(ev)};Calendar.dayMouseDblClick=function(e){Calendar.cellClick(Calendar.getElement(e),e||window.event);if(Calendar.is_ie){document.selection.empty()}};Calendar.dayMouseOver=function(e){var t=Calendar.getElement(e);if(Calendar.isRelated(t,e)||Calendar._C||t.disabled){return false}if(document.id(t).get("tag")!=="td"){var n=t.getParent("td");if(n){t=n}}if(t.ttip){if(t.ttip.substr(0,1)=="_"){t.ttip=t.caldate.print(t.calendar.ttDateFormat)+t.ttip.substr(1)}t.calendar.tooltips.innerHTML=t.ttip}if(t.navtype!=300){Calendar.addClass(t,"hilite");if(typeof t.navtype==="undefined"){Calendar.addClass(t,"alert-info")}if(t.caldate){Calendar.addClass(t.parentNode,"rowhilite");var r=t.calendar;if(r&&r.getDateToolTip){var i=t.caldate;window.status=i;t.title=r.getDateToolTip(i,i.getFullYear(),i.getMonth(),i.getDate())}}}return Calendar.stopEvent(e)};Calendar.dayMouseOut=function(ev){with(Calendar){var el=getElement(ev);if(isRelated(el,ev)||_C||el.disabled)return false;removeClass(el,"hilite");removeClass(el,"alert-info");if(el.caldate)removeClass(el.parentNode,"rowhilite");if(el.calendar)el.calendar.tooltips.innerHTML=_TT["SEL_DATE"]}};Calendar.showHelp=function(e){var t=e?e.calendar:this;Calendar.removeClass(e,"hilite");var n=Calendar._TT["ABOUT"];if(typeof n!="undefined"){n+=t.showsTime?Calendar._TT["ABOUT_TIME"]:""}else{n="Help and about box text is not translated into this language.\n"+"If you know this language and you feel generous please update\n"+'the corresponding file in "lang" subdir to match calendar-en.js\n'+"and send it back to <mihai_bazon@yahoo.com> to get it into the distribution  ;-)\n\n"+"Thank you!\n"+"http://dynarch.com/mishoo/calendar.epl\n"}alert(n)};Calendar.cellClick=function(e,t){var n=e.calendar;var r=false;var i=false;var s=null;if(typeof e.navtype=="undefined"){if(n.currentDateEl){Calendar.removeClass(n.currentDateEl,"selected");Calendar.removeClass(n.currentDateEl,"alert-success");Calendar.addClass(e,"selected");r=n.currentDateEl==e;if(!r){n.currentDateEl=e}}n.date.setDateOnly(e.caldate);s=n.date;var o=!(n.dateClicked=!e.otherMonth);if(!o&&!n.currentDateEl&&n.multiple)n._toggleMultipleDate(new Date(s));else i=!e.disabled;if(o)n._init(n.firstDayOfWeek,s)}else{if(e.navtype==200){Calendar.removeClass(e,"hilite");n.callCloseHandler();return}s=new Date(n.date);if(e.navtype==0)s.setDateOnly(new Date);n.dateClicked=false;var u=s.getFullYear();var a=s.getMonth();function f(e){var t=s.getDate();var n=s.getMonthDays(e);if(t>n){s.setDate(n)}s.setMonth(e)}switch(e.navtype){case 400:this.showHelp(e);return;case-2:if(u>n.minYear){s.setFullYear(u-1)}break;case-1:if(a>0){f(a-1)}else if(u-->n.minYear){s.setFullYear(u);f(11)}break;case 1:if(a<11){f(a+1)}else if(u<n.maxYear){s.setFullYear(u+1);f(0)}break;case 2:if(u<n.maxYear){s.setFullYear(u+1)}break;case 100:n.setFirstDayOfWeek(e.fdow);return;case 50:var l=e._range;var c=e.innerHTML;for(var h=l.length;--h>=0;)if(l[h]==c)break;if(t&&t.shiftKey){if(--h<0)h=l.length-1}else if(++h>=l.length)h=0;var p=l[h];e.innerHTML=p;n.onUpdateTime();return;case 0:if(typeof n.getDateStatus=="function"&&n.getDateStatus(s,s.getFullYear(),s.getMonth(),s.getDate())){return false}break}if(!s.equalsTo(n.date)){n.setDate(s);i=true}else if(e.navtype==0)i=r=true}if(i){t&&n.callHandler()}if(r){Calendar.removeClass(e,"hilite");t&&n.callCloseHandler()}};Calendar.prototype.create=function(e){var t=null;if(!e){t=document.getElementsByTagName("body")[0];this.isPopup=true}else{t=e;this.isPopup=false}this.date=this.dateStr?new Date(this.dateStr):new Date;var n=Calendar.createElement("table");this.table=n;n.className="table table-condensed";n.cellSpacing=0;n.cellPadding=0;n.style.marginBottom=0;n.calendar=this;Calendar.addEvent(n,"mousedown",Calendar.tableMouseDown);var r=Calendar.createElement("div");this.element=r;if(Calendar._DIR){this.element.style.direction=Calendar._DIR}r.className="dropdown-menu j-calendar";if(this.isPopup){r.style.position="absolute";r.style.display="none";r.style.width="300px";r.style.padding="0"}n.style.width="100%";this.wrapper=Calendar.createElement("div");this.wrapper.className="itemContentPadder";r.appendChild(this.wrapper);this.wrapper.appendChild(n);var i=Calendar.createElement("thead",n);i.className="draggable modal-header";var s=null;var o=null;var u=this;var a=function(e,t,n,r,i,a){r=r?r:"td";a=a?'class="'+a+'"':"";i=i?i:{};s=Calendar.createElement(r,o);s.colSpan=t;for(key in i){s.style[key]=i[key]}if(n!=0&&Math.abs(n)<=2){s.className+=" nav"}Calendar._add_evs(s);s.calendar=u;s.navtype=n;if(n!=0&&Math.abs(n)<=2){s.innerHTML="<a class='btn btn-small' style='display:inline;padding:2px 6px;' unselectable='on'>"+e+"</a>"}else{s.innerHTML="<div unselectable='on'"+a+">"+e+"</div>"}return s};o=Calendar.createElement("tr",i);var f=6;this.isPopup&&--f;this.weekNumbers&&++f;var l='<a href="#" data-action="help" style="padding:0"><span class="icon-help icon-question-sign"></span></a>';l+='<a href="#" data-action="help" style="display:block" class="nav element-invisible">?</a>';a(l,1,400,"td",{textAlign:"center","padding-right":0,"margin-right":0}).ttip=Calendar._TT["INFO"];var c=document.id(o).getElement;var h=document.id(o).getElements("a[data-action=help]");for(var p=0;p<h.length;p++){var c=h[p];Calendar.addEvent(c,"click",function(e){Calendar.stopEvent(e);Calendar.showHelp()})}this.title=a('<div style="text-align:center"><span class="icon-calendar"></span> <span></span></div>',f,300);this.title.className="title";if(this.isPopup){this.title.ttip=Calendar._TT["DRAG_TO_MOVE"];this.title.style.cursor="move";var d='<a href="#" data-action="close" style="padding:0"><span class="icon-cancel icon-remove-sign"></span></a>';d+='<a href="#" data-action="close" style="display:block" class="nav element-invisible">&#x00d7;</a>';a(d,1,200,"td",{textAlign:"center","padding-right":0,"margin-right":0}).ttip=Calendar._TT["CLOSE"];var v=document.id(o).getElements("a[data-action=close]");for(var p=0;p<v.length;p++){var m=v[p];Calendar.addEvent(m,"click",function(e){Calendar.stopEvent(e);var t=m.getParent("table");var n=t.calendar;n.callCloseHandler()})}}o=Calendar.createElement("tr",i);o.className="headrow";this._nav_py=a("&#x00ab;",1,-2);this._nav_py.ttip=Calendar._TT["PREV_YEAR"];this._nav_pm=a("&#x2039;",1,-1);this._nav_pm.ttip=Calendar._TT["PREV_MONTH"];this._nav_now=a('<a class="btn btn-mini" data-action="today" style="display:inline;padding:2px 6px"><span class="icon-flag"></span> '+Calendar._TT["TODAY"]+"</a>",this.weekNumbers?4:3,0,"td",{textAlign:"center"});var g=document.id(o).getElement("a[data-action=today]");Calendar.addEvent(g,"click",function(e){var t=g.getParent("table");var n=t.calendar;Calendar.cellClick(n._nav_now)});this._nav_now.ttip=Calendar._TT["GO_TODAY"];this._nav_nm=a("&#x203a;",1,1);this._nav_nm.ttip=Calendar._TT["NEXT_MONTH"];this._nav_ny=a("&#x00bb;",1,2);this._nav_ny.ttip=Calendar._TT["NEXT_YEAR"];o=Calendar.createElement("tr",i);o.className="daynames";if(this.weekNumbers){s=Calendar.createElement("td",o);s.className="name wn";s.innerHTML=Calendar._TT["WK"]}for(var p=7;p>0;--p){s=Calendar.createElement("td",o);if(!p){s.navtype=100;s.calendar=this;Calendar._add_evs(s)}}this.firstdayname=this.weekNumbers?o.firstChild.nextSibling:o.firstChild;this._displayWeekdays();var y=Calendar.createElement("tbody",n);this.tbody=y;for(p=6;p>0;--p){o=Calendar.createElement("tr",y);if(this.weekNumbers){s=Calendar.createElement("td",o)}for(var b=7;b>0;--b){s=Calendar.createElement("td",o);s.calendar=this;Calendar._add_evs(s)}}if(this.showsTime){o=Calendar.createElement("tr",y);o.className="time";s=Calendar.createElement("td",o);s.className="time";s.colSpan=2;s.innerHTML=Calendar._TT["TIME"]||"&#160;";s=Calendar.createElement("td",o);s.className="time";s.colSpan=this.weekNumbers?4:3;(function(){function e(e,t,n,r){var i=Calendar.createElement("span",s);i.className=e;i.innerHTML=t;i.calendar=u;i.ttip=Calendar._TT["TIME_PART"];i.navtype=50;i._range=[];if(typeof n!="number")i._range=n;else{for(var o=n;o<=r;++o){var a;if(o<10&&r>=10)a="0"+o;else a=""+o;i._range[i._range.length]=a}}Calendar._add_evs(i);return i}var t=u.date.getHours();var n=u.date.getMinutes();var r=!u.time24;var i=t>12;if(r&&i)t-=12;var a=e("hour",t,r?1:0,r?12:23);var f=Calendar.createElement("span",s);f.innerHTML=":";f.className="colon";var l=e("minute",n,0,59);var c=null;s=Calendar.createElement("td",o);s.className="time";s.colSpan=2;if(r)c=e("ampm",i?"pm":"am",["am","pm"]);else s.innerHTML="&#160;";u.onSetTime=function(){var e,t=this.date.getHours(),n=this.date.getMinutes();if(r){e=t>=12;if(e)t-=12;if(t==0)t=12;c.innerHTML=e?"pm":"am"}a.innerHTML=t<10?"0"+t:t;l.innerHTML=n<10?"0"+n:n};u.onUpdateTime=function(){var e=this.date;var t=parseInt(a.innerHTML,10);if(r){if(/pm/i.test(c.innerHTML)&&t<12)t+=12;else if(/am/i.test(c.innerHTML)&&t==12)t=0}var n=e.getDate();var i=e.getMonth();var s=e.getFullYear();e.setHours(t);e.setMinutes(parseInt(l.innerHTML,10));e.setFullYear(s);e.setMonth(i);e.setDate(n);this.dateClicked=false;this.callHandler()}})()}else{this.onSetTime=this.onUpdateTime=function(){}}var w=Calendar.createElement("div",this.element);w.className="modal-footer";o=w;s=a(Calendar._TT["SEL_DATE"],this.weekNumbers?8:7,300,"div","","pull-left");s.className="ttip";if(this.isPopup){s.ttip=Calendar._TT["DRAG_TO_MOVE"];s.style.cursor="move"}this.tooltips=s;r=Calendar.createElement("ul",this.element);this.monthsCombo=r;r.className="combo dropdown-menu";var E=Calendar.createElement("ul");for(p=0;p<Calendar._MN.length;++p){var S=Calendar.createElement("a");S.className=Calendar.is_ie?"label-IEfix":"label-ok";S.month=p;S.innerHTML=Calendar._SMN[p];var x=Calendar.createElement("li");x.appendChild(S);r.appendChild(x)}r=Calendar.createElement("ul",this.element);this.yearsCombo=r;r.className="combo dropdown-menu";for(p=12;p>0;--p){var T=Calendar.createElement("a");T.className=Calendar.is_ie?"label-IEfix":"label-ok";var x=Calendar.createElement("li");x.appendChild(T);r.appendChild(x)}this._init(this.firstDayOfWeek,this.date);t.appendChild(this.element)};Calendar.prototype.recreate=function(){if(this.element){var e=this.element.parentNode;e.removeChild(this.element);if(e==document.body)this.create();else{this.create(e);this.show()}}else this.create()};Calendar.prototype.toggleColumn=function(e){if(!this.multiple)return;var t=(e+7-this.firstDayOfWeek)%7;if(this.weekNumbers)t++;var n=true,r=[],i;for(var s=3;s<this.table.rows.length-1;s++){i=this.table.rows[s].cells[t];if(i&&i.caldate&&!i.otherMonth&&!i.disabled){ds=i.caldate.print("%Y%m%d",this.dateType);if(!this.multiple[ds])n=false;r[s]=!!this.multiple[ds]}}for(s=3;s<this.table.rows.length;s++){i=this.table.rows[s].cells[t];if(i&&i.caldate&&!i.otherMonth&&!i.disabled&&(n||!r[s]))this._toggleMultipleDate(i.caldate)}};Calendar.prototype.toggleRow=function(e){if(!this.multiple)return;var t=this.table.rows[e+2].cells;var n=true,r=[];for(var i=0;i<t.length;i++){if(t[i].caldate&&!t[i].otherMonth&&!t[i].disabled){ds=t[i].caldate.print("%Y%m%d",this.dateType);if(!this.multiple[ds])n=false;r[i]=!!this.multiple[ds]}}for(i=0;i<t.length;i++){if(t[i].caldate&&!t[i].otherMonth&&!t[i].disabled&&(n||!r[i]))this._toggleMultipleDate(t[i].caldate)}};Calendar.prototype.setWeekNumbers=function(e){this.weekNumbers=e;this.recreate()};Calendar.prototype.setOtherMonths=function(e){this.showsOtherMonths=e;this.refresh()};Calendar.prototype.setLangNumbers=function(e){this.langNumbers=e;this.refresh()};Calendar.prototype.setDateType=function(e){this.dateType=e;this.recreate()};Calendar.prototype.setShowsTime=function(e){this.showsTime=e;this.recreate()};Calendar.prototype.setTime24=function(e){this.time24=e;this.recreate()};Calendar._keyEvent=function(e){var t=window._dynarch_popupCalendar;if(!t||t.multiple)return false;Calendar.is_ie&&(e=window.event);var n=Calendar.is_ie||e.type=="keypress",r=e.keyCode;if(Calendar._DIR=="rtl"){if(r==37)r=39;else if(r==39)r=37}if(e.ctrlKey){switch(r){case 37:n&&Calendar.cellClick(t._nav_pm);break;case 38:n&&Calendar.cellClick(t._nav_py);break;case 39:n&&Calendar.cellClick(t._nav_nm);break;case 40:n&&Calendar.cellClick(t._nav_ny);break;default:return false}}else switch(r){case 32:Calendar.cellClick(t._nav_now);break;case 27:n&&t.callCloseHandler();break;case 37:case 38:case 39:case 40:if(n){var i,s,o,u,a,f;i=r==37||r==38;f=r==37||r==39?1:7;function l(){a=t.currentDateEl;var e=a.pos;s=e&15;o=e>>4;u=t.ar_days[o][s]}l();function c(){var e=new Date(t.date);e.setDate(e.getDate()-f);t.setDate(e)}function h(){var e=new Date(t.date);e.setDate(e.getDate()+f);t.setDate(e)}while(1){switch(r){case 37:if(--s>=0)u=t.ar_days[o][s];else{s=6;r=38;continue}break;case 38:if(--o>=0)u=t.ar_days[o][s];else{c();l()}break;case 39:if(++s<7)u=t.ar_days[o][s];else{s=0;r=40;continue}break;case 40:if(++o<t.ar_days.length)u=t.ar_days[o][s];else{h();l()}break}break}if(u){if(!u.disabled)Calendar.cellClick(u);else if(i)c();else h()}}break;case 13:if(n)Calendar.cellClick(t.currentDateEl,e);break;default:return false}return Calendar.stopEvent(e)};Calendar.prototype._init=function(e,t){var n=new Date,r=n.getFullYear(),i=n.getMonth(),s=n.getDate();this.table.style.visibility="hidden";var o=t.getFullYear();if(o<this.minYear){o=this.minYear;t.setFullYear(o)}else if(o>this.maxYear){o=this.maxYear;t.setFullYear(o)}this.firstDayOfWeek=e;this.date=new Date(t);var u=t.getMonth();var a=t.getDate();var f=t.getMonthDays();t.setDate(1);var l=(t.getDay()-this.firstDayOfWeek)%7;if(l<0)l+=7;t.setDate(-l);t.setDate(t.getDate()+1);var c=this.tbody.firstChild;var h=Calendar._SMN[u];var p=this.ar_days=new Array;var d=Calendar._TT["WEEKEND"];var v=this.multiple?this.datesCells={}:null;for(var m=0;m<6;++m,c=c.nextSibling){var g=c.firstChild;if(this.weekNumbers){g.className="day wn";g.innerHTML=t.getWeekNumber();g=g.nextSibling}c.className="daysrow";var y=false,b,w=p[m]=[];for(var E=0;E<7;++E,g=g.nextSibling,t.setDate(b+1)){b=t.getDate();var S=t.getDay();g.className="day";g.style["textAlign"]="right";g.pos=m<<4|E;w[E]=g;var x=t.getMonth()==u;if(!x){if(this.showsOtherMonths){g.className+=" othermonth";g.otherMonth=true}else{g.className="day emptycell";g.innerHTML="&#160;";g.disabled=true;continue}}else{g.otherMonth=false;y=true;g.style.cursor="pointer"}g.disabled=false;g.innerHTML=this.getDateText?this.getDateText(t,b):b;if(v)v[t.print("%Y%m%d")]=g;if(this.getDateStatus){var T=this.getDateStatus(t,o,u,b);if(T===true){g.className+=" disabled";g.disabled=true}else{if(/disabled/i.test(T))g.disabled=true;g.className+=" "+T}}if(!g.disabled){g.caldate=new Date(t);g.ttip="_";if(!this.multiple&&x&&b==a&&this.hiliteToday){g.className+=" selected";g.className+=" alert alert-success";this.currentDateEl=g}if(t.getFullYear()==r&&t.getMonth()==i&&b==s){g.className+=" today";g.className+=" alert alert-block";g.ttip+=Calendar._TT["PART_TODAY"]}if(d.indexOf(S.toString())!=-1)g.className+=g.otherMonth?" oweekend":" weekend"}}if(!(y||this.showsOtherMonths)){c.style.display="none";c.className="emptyrow"}else{c.style.display=""}}this.title.getElementsByTagName("span")[1].innerHTML=Calendar._MN[u]+", "+o;this.onSetTime();this.table.style.visibility="visible";this._initMultipleDates()};Calendar.prototype._initMultipleDates=function(){if(this.multiple){for(var e in this.multiple){var t=this.datesCells[e];var n=this.multiple[e];if(!n)continue;if(t){t.className+=" selected";t.className+=" alert-success"}}}};Calendar.prototype._toggleMultipleDate=function(e){if(this.multiple){var t=e.print("%Y%m%d");var n=this.datesCells[t];if(n){var r=this.multiple[t];if(!r){Calendar.addClass(n,"selected");Calendar.addClass(n,"alert-success");this.multiple[t]=e}else{Calendar.removeClass(n,"selected");Calendar.removeClass(n,"alert-success");delete this.multiple[t]}}}};Calendar.prototype.setDateToolTipHandler=function(e){this.getDateToolTip=e};Calendar.prototype.setDate=function(e){if(!e.equalsTo(this.date)){this._init(this.firstDayOfWeek,e)}};Calendar.prototype.refresh=function(){this._init(this.firstDayOfWeek,this.date)};Calendar.prototype.setFirstDayOfWeek=function(e){this._init(e,this.date);this._displayWeekdays()};Calendar.prototype.setDateStatusHandler=Calendar.prototype.setDisabledHandler=function(e){this.getDateStatus=e};Calendar.prototype.setRange=function(e,t){this.minYear=e;this.maxYear=t};Calendar.prototype.callHandler=function(){if(this.onSelected){this.onSelected(this,this.date.print(this.dateFormat))}};Calendar.prototype.callCloseHandler=function(){if(this.onClose){this.onClose(this)}this.hideShowCovered()};Calendar.prototype.destroy=function(){var e=this.element.parentNode;e.removeChild(this.element);Calendar._C=null;window._dynarch_popupCalendar=null};Calendar.prototype.reparent=function(e){var t=this.element;t.parentNode.removeChild(t);e.appendChild(t)};Calendar._checkCalendar=function(e){var t=window._dynarch_popupCalendar;if(!t){return false}var n=Calendar.is_ie?Calendar.getElement(e):Calendar.getTargetElement(e);for(;n!=null&&n!=t.element;n=n.parentNode);if(n==null){window._dynarch_popupCalendar.callCloseHandler();return Calendar.stopEvent(e)}};Calendar.prototype.show=function(){var e=this.table.getElementsByTagName("tr");for(var t=e.length;t>0;){var n=e[--t];Calendar.removeClass(n,"rowhilite");var r=n.getElementsByTagName("td");for(var i=r.length;i>0;){var s=r[--i];Calendar.removeClass(s,"alert-info");Calendar.removeClass(s,"alert-success")}}this.element.style.display="block";this.hidden=false;if(this.isPopup){window._dynarch_popupCalendar=this;Calendar.addEvent(document,"keydown",Calendar._keyEvent);Calendar.addEvent(document,"keypress",Calendar._keyEvent);Calendar.addEvent(document,"mousedown",Calendar._checkCalendar)}this.hideShowCovered()};Calendar.prototype.hide=function(){if(this.isPopup){Calendar.removeEvent(document,"keydown",Calendar._keyEvent);Calendar.removeEvent(document,"keypress",Calendar._keyEvent);Calendar.removeEvent(document,"mousedown",Calendar._checkCalendar)}this.element.style.display="none";this.hidden=true;this.hideShowCovered()};Calendar.prototype.showAt=function(e,t){var n=this.element.style;n.left=e+"px";n.top=t+"px";this.show()};Calendar.prototype.showAtElement=function(e,t){function i(e){if(e.x<0)e.x=0;if(e.y<0)e.y=0;var t=document.createElement("div");var n=t.style;n.position="absolute";n.right=n.bottom=n.width=n.height="0px";document.body.appendChild(t);var r=Calendar.getAbsolutePos(t);document.body.removeChild(t);if(Calendar.is_ie){r.y+=document.body.scrollTop;r.x+=document.body.scrollLeft}else{r.y+=window.scrollY;r.x+=window.scrollX}var i=e.x+e.width-r.x;if(i>0)e.x-=i;i=e.y+e.height-r.y;if(i>0)e.y-=i}var n=this;var r=Calendar.getAbsolutePos(e);if(!t||typeof t!="string"){this.showAt(r.x,r.y+e.offsetHeight);return true}this.element.style.display="block";Calendar.continuation_for_the_khtml_browser=function(){var s=n.element.offsetWidth;var o=n.element.offsetHeight;n.element.style.display="none";var u=t.substr(0,1);var a="l";if(t.length>1){a=t.substr(1,1)}switch(u){case"T":r.y-=o;break;case"B":r.y+=e.offsetHeight;break;case"C":r.y+=(e.offsetHeight-o)/2;break;case"t":r.y+=e.offsetHeight-o;break;case"b":break}switch(a){case"L":r.x-=s;break;case"R":r.x+=e.offsetWidth;break;case"C":r.x+=(e.offsetWidth-s)/2;break;case"l":r.x+=e.offsetWidth-s;break;case"r":break}r.width=s;r.height=o+40;n.monthsCombo.style.display="none";i(r);n.showAt(r.x,r.y)};if(Calendar.is_khtml)setTimeout("Calendar.continuation_for_the_khtml_browser()",10);else Calendar.continuation_for_the_khtml_browser()};Calendar.prototype.setDateFormat=function(e){this.dateFormat=e};Calendar.prototype.setTtDateFormat=function(e){this.ttDateFormat=e};Calendar.prototype.parseDate=function(e,t){if(!t)t=this.dateFormat;this.setDate(Date.parseDate(e,t))};Calendar.prototype.hideShowCovered=function(){function e(e){var t=e.style.visibility;if(!t){if(document.defaultView&&typeof document.defaultView.getComputedStyle=="function"){if(!Calendar.is_khtml)t=document.defaultView.getComputedStyle(e,"").getPropertyValue("visibility");else t=""}else if(e.currentStyle){t=e.currentStyle.visibility}else t=""}return t}if(!Calendar.is_ie&&!Calendar.is_opera)return;var t=new Array("applet","iframe","select");var n=this.element;var r=Calendar.getAbsolutePos(n);var i=r.x;var s=n.offsetWidth+i;var o=r.y;var u=n.offsetHeight+o;for(var a=t.length;a>0;){var f=document.getElementsByTagName(t[--a]);var l=null;for(var c=f.length;c>0;){l=f[--c];r=Calendar.getAbsolutePos(l);var h=r.x;var p=l.offsetWidth+h;var d=r.y;var v=l.offsetHeight+d;if(this.hidden||h>s||p<i||d>u||v<o){if(!l.__msh_save_visibility){l.__msh_save_visibility=e(l)}l.style.visibility=l.__msh_save_visibility}else{if(!l.__msh_save_visibility){l.__msh_save_visibility=e(l)}l.style.visibility="hidden"}}}};Calendar.prototype._displayWeekdays=function(){var e=this.firstDayOfWeek;var t=this.firstdayname;var n=Calendar._TT["WEEKEND"];for(var r=0;r<7;++r){t.className="day name";t.style.textAlign="center";var i=(r+e)%7;if(r){t.ttip=Calendar._TT["DAY_FIRST"].replace("%s",Calendar._DN[i]);t.navtype=100;t.calendar=this;t.fdow=i;Calendar._add_evs(t)}if(n.indexOf(i.toString())!=-1){Calendar.addClass(t,"weekend")}t.innerHTML=Calendar._SDN[(r+e)%7];t=t.nextSibling}};Calendar.prototype._hideCombos=function(){this.monthsCombo.style.display="none";this.yearsCombo.style.display="none"};Calendar.prototype._dragStart=function(ev){if(this.dragging){return}this.dragging=true;var posX;var posY;if(Calendar.is_ie){posY=window.event.clientY+document.body.scrollTop;posX=window.event.clientX+document.body.scrollLeft}else{posY=ev.clientY+window.scrollY;posX=ev.clientX+window.scrollX}var st=this.element.style;this.xOffs=posX-parseInt(st.left);this.yOffs=posY-parseInt(st.top);with(Calendar){addEvent(document,"mousemove",calDragIt);addEvent(document,"mouseup",calDragEnd)}};Date._MD=new Array(31,28,31,30,31,30,31,31,30,31,30,31);Date.SECOND=1e3;Date.MINUTE=60*Date.SECOND;Date.HOUR=60*Date.MINUTE;Date.DAY=24*Date.HOUR;Date.WEEK=7*Date.DAY;Date.parseDate=function(e,t){var n=new Date;var r=0;var i=-1;var s=0;var o=e.split(/\W+/);var u=t.match(/%./g);var a=0,f=0;var l=0;var c=0;for(a=0;a<o.length;++a){if(!o[a])continue;switch(u[a]){case"%d":case"%e":s=parseInt(o[a],10);break;case"%m":i=parseInt(o[a],10)-1;break;case"%Y":case"%y":r=parseInt(o[a],10);r<100&&(r+=r>29?1900:2e3);break;case"%b":case"%B":for(f=0;f<12;++f){if(Calendar._MN[f].substr(0,o[a].length).toLowerCase()==o[a].toLowerCase()){i=f;break}}break;case"%H":case"%I":case"%k":case"%l":l=parseInt(o[a],10);break;case"%P":case"%p":if(/pm/i.test(o[a])&&l<12)l+=12;else if(/am/i.test(o[a])&&l>=12)l-=12;break;case"%M":c=parseInt(o[a],10);break}}if(isNaN(r))r=n.getFullYear();if(isNaN(i))i=n.getMonth();if(isNaN(s))s=n.getDate();if(isNaN(l))l=n.getHours();if(isNaN(c))c=n.getMinutes();if(r!=0&&i!=-1&&s!=0)return new Date(r,i,s,l,c,0);r=0;i=-1;s=0;for(a=0;a<o.length;++a){if(o[a].search(/[a-zA-Z]+/)!=-1){var h=-1;for(f=0;f<12;++f){if(Calendar._MN[f].substr(0,o[a].length).toLowerCase()==o[a].toLowerCase()){h=f;break}}if(h!=-1){if(i!=-1){s=i+1}i=h}}else if(parseInt(o[a],10)<=12&&i==-1){i=o[a]-1}else if(parseInt(o[a],10)>31&&r==0){r=parseInt(o[a],10);r<100&&(r+=r>29?1900:2e3)}else if(s==0){s=o[a]}}if(r==0)r=n.getFullYear();if(i!=-1&&s!=0)return new Date(r,i,s,l,c,0);return n};Date.prototype.getMonthDays=function(e){var t=this.getFullYear();if(typeof e=="undefined"){e=this.getMonth()}if(0==t%4&&(0!=t%100||0==t%400)&&e==1){return 29}else{return Date._MD[e]}};Date.prototype.getDayOfYear=function(){var e=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);var t=new Date(this.getFullYear(),0,0,0,0,0);var n=e-t;return Math.floor(n/Date.DAY)};Date.prototype.getWeekNumber=function(){var e=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);var t=e.getDay();e.setDate(e.getDate()-(t+6)%7+3);var n=e.valueOf();e.setMonth(0);e.setDate(4);return Math.round((n-e.valueOf())/(7*864e5))+1};Date.prototype.equalsTo=function(e){return this.getFullYear()==e.getFullYear()&&this.getMonth()==e.getMonth()&&this.getDate()==e.getDate()&&this.getHours()==e.getHours()&&this.getMinutes()==e.getMinutes()};Date.prototype.setDateOnly=function(e){var t=new Date(e);this.setDate(1);this.setFullYear(t.getFullYear());this.setMonth(t.getMonth());this.setDate(t.getDate())};Date.prototype.print=function(e){var t=this.getMonth();var n=this.getDate();var r=this.getFullYear();var i=this.getWeekNumber();var s=this.getDay();var o={};var u=this.getHours();var a=u>=12;var f=a?u-12:u;var l=this.getDayOfYear();if(f==0)f=12;var c=this.getMinutes();var h=this.getSeconds();o["%a"]=Calendar._SDN[s];o["%A"]=Calendar._DN[s];o["%b"]=Calendar._SMN[t];o["%B"]=Calendar._MN[t];o["%C"]=1+Math.floor(r/100);o["%d"]=n<10?"0"+n:n;o["%e"]=n;o["%H"]=u<10?"0"+u:u;o["%I"]=f<10?"0"+f:f;o["%j"]=l<100?l<10?"00"+l:"0"+l:l;o["%k"]=u;o["%l"]=f;o["%m"]=t<9?"0"+(1+t):1+t;o["%M"]=c<10?"0"+c:c;o["%n"]="\n";o["%p"]=a?"PM":"AM";o["%P"]=a?"pm":"am";o["%s"]=Math.floor(this.getTime()/1e3);o["%S"]=h<10?"0"+h:h;o["%t"]="	";o["%U"]=o["%W"]=o["%V"]=i<10?"0"+i:i;o["%u"]=s+1;o["%w"]=s;o["%y"]=(""+r).substr(2,2);o["%Y"]=r;o["%%"]="%";var p=/%./g;if(!Calendar.is_ie5&&!Calendar.is_khtml)return e.replace(p,function(e){return o[e]||e});var d=e.match(p);for(var v=0;v<d.length;v++){var m=o[d[v]];if(m){p=new RegExp(d[v],"g");e=e.replace(p,m)}}return e};Date.prototype.__msh_oldSetFullYear=Date.prototype.setFullYear;Date.prototype.setFullYear=function(e){var t=new Date(this);t.__msh_oldSetFullYear(e);if(t.getMonth()!=this.getMonth())this.setDate(28);this.__msh_oldSetFullYear(e)};window._dynarch_popupCalendar=null