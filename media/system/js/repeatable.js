(function(a){a.JRepeatable=function(d,j,k,f){var k=null,i=null,c=null,l,j,b,g=a(d+"_button"),h=false,e=null,m=a("<div>");m.css({"background-color":"#000",opacity:0.4,"z-index":9998,position:"fixed",left:0,top:0,height:"100%",width:"100%"}).hide();m.appendTo("body");openWindow=function(){if(!i){makeWin();c.prependTo(i)}c.show();i.show();resizeWin();m.show();b=getTrs().clone()};makeWin=function(){if(i){return}i=a("<div/>");i.css({padding:"5px","background-color":"#fff",display:"none","z-index":9999,position:"fixed",left:"50%",top:"50%"});i.appendTo("body");var o=a('<button class="btn button btn-primary"/>').text(Joomla.JText._("JAPPLY"));o.on("click",function(q){q.stopPropagation();store();e.find("table").replaceWith(c);close()});var p=a('<button class="btn button btn-link"/>').text(Joomla.JText._("JCANCEL"));p.on("click",function(q){h=true;q.stopPropagation();a(c).find("tbody tr").replaceWith(b);e.find("table").replaceWith(c);close();i=null});var n=a('<div class="controls form-actions"/>').css({"text-align":"right","margin-bottom":0}).append([p,o]);i.append(c);i.append(n);if(!h){build()}watchButtons()};resizeWin=function(){var n=-1*(i.width()/2);var o=-1*(i.height()/2);i.css({"margin-left":n,"margin-top":o})};close=function(){c.hide();i.hide();m.hide()};getRadioValues=function(){var n=[];a.each(getTrs(),function(p,r){var q=a(r).find('input[type="radio"]:checked');var o=(q.length>0)?q.val():o="";n.push(o)});return n};setRadioValues=function(n){a.each(getTrs(),function(o,q){var p=a(q).find('input[type="radio"][value="'+n[o]+'"]');if(p.length>0){p.attr("checked","checked")}})};watchButtons=function(){i.on("click","a.add",function(q){if(tr=findTr(q)){var p=document.getElementById(d+"_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;if(p==f){return false}var o=getRadioValues();var n=a(tr).closest("table").find("tbody");var r=l.clone(true,true);r.appendTo(n);if(p==(f-1)){a(".add").removeClass("btn-success").addClass("disabled")}renameInputs();setRadioValues(o);resizeWin();resetChosen(r)}return false}.bind(this));i.on("click","a.remove",function(o){if(tr=findTr(o)){tr.remove();var n=document.getElementById(d+"_table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;if(a(".add").hasClass("disabled")){a(".add").removeClass("disabled").addClass("btn-success")}}resizeWin();return false}.bind(this))};resetChosen=function(n){n.find("select").removeClass("chzn-done").show();a.each(n.find("select"),function(o,p){p.id=p.id+"_"+(Math.random()*10000000).toInt()});n.find(".chzn-container").remove();a("select").chosen({disable_search_threshold:10,allow_single_deselect:true})};getTrs=function(){return i.find("tbody tr")};renameInputs=function(){var s,p,o,q,r,n=getTrs();regex=/\[\]/;for(q=0;q<n.length;q++){r=a(n[q]).find('input[type="radio"], input[type="checkbox"]');a.each(r,function(t,u){if(u.name.match(regex)===null){u.name+="["+q+"]"}else{u.name=u.name.replace(regex,"["+q+"]");u.name+="[]"}o=u.name.split("][");o=o[o.length-3];s=u.id.split("_");s[s.length-1]=o+t;s.push(q);u.id=s.join("_");p=a(this).next("label");p.attr("for",u.id)})}};build=function(){var p,s,q,v,t,u,o,r;s=JSON.decode(a(k).val());if(typeOf(s)==="null"){s={}}q=i.find("tbody tr");v=Object.keys(s);t=v.length===0||s[v[0]].length===0?true:false;u=t?1:s[v[0]].length;for(var n=1;n<u;n++){p=q.clone();p.insertAfter(q);resetChosen(p)}renameInputs();o=getTrs();for(n=0;n<u;n++){a.each(v,function(x,w){console.log(a(o[n]).find('*[name*="'+this+'"]'));a(o[n]).find('*[name*="'+this+'"]').each(function(y,z){r=a(z).attr("type");if(r==="radio"||r==="checkbox"){if(z.value===s[w][n]){a(z).attr("checked","checked")}}else{a(z).val(s[w][n]);if(a(z).prop("tagName")==="SELECT"){a(z).trigger("liszt:updated")}}})})}l=q;if(t){q.remove()}};findTr=function(o){var n=o.target.getParents().filter(function(q){return q.get("tag")==="tr"});return(n.length===0)?false:n[0]};store=function(){var q,s,o,r,p={};for(q=0;q<j.length;q++){s=j[q];o=c.find('*[name*="'+s+'"]');p[s]=[];a.each(o,function(){r=a(this).attr("type");if(r==="radio"||r==="checkbox"){if(a(this).attr("checked")==="checked"){p[s].push(a(this).val())}}else{p[s].push(a(this).val())}})}k.val(JSON.encode(p));return true};a(document).on("click",'*[data-modal="'+d+'"]',function(o,n){k=a(this).next("input");e=a(this).closest("div.control-group");if(!c){c=e.find("table")}openWindow();return false})}})(jQuery);