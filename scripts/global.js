function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof oldonload != 'function'){
        window.onload = func;
    }else {
        window.onload = function (){
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(elem,theclass){
    if (!elem.className){
        elem.className = theclass;
    } else {
        var classNames = elem.className;
        classNames += " ";
        classNames += theclass;
        elem.setAttribute("className",classNames);
    }
}

function highlightPage(){
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var nav = headers[0].getElementsByTagName("nav");
    if (nav.length == 0) return false;
    var links = nav[0].getElementsByTagName("a");
    var linkurl;
    for (var i=0; i<links.length; i++){
        linkurl = links[i].href;
        if (window.location.href.indexOf(linkurl) != -1){
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            links[i].setAttribute("id",linktext);
        }
    }
}

function stripeTables(){
    var tables = document.getElementsByTagName("table");
    for (var i=0; i<tables.length; i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j=0; j<rows.length; j++){
            if (odd == true){
                addClass(rows[j],"odd");
                odd = false;
            } else {
                odd = true;
                // addClass(rows[j],"even")
            }
        }
    }
}

function highlightRows(){
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function () {
            this.className = this.oldClassName;
        }
    }
}

function showPic(whichpic){
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (source.split(".")[1] == 'jpg'){
        placeholder1.style.display ="none";
        placeholder.style.display = "block"
        placeholder.setAttribute("src",source);
    } else {
        placeholder.style.display = "none";
        placeholder1.style.display ="block";
        placeholder1.setAttribute("src",source);
    }
    return false;
}

function preparePlaceholder(){
    var gallery = document.getElementById("imagegallery");
    var placeholder = document.createElement('img');
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/chuyou.jpg");
    placeholder.setAttribute("alt","my image gallery");
    var placeholder1 = document.createElement('video');
    placeholder1.setAttribute("id","placeholder1");
    placeholder1.setAttribute("controls","all");
    placeholder1.setAttribute("src","images/bodou.mp4");
    insertAfter(placeholder,gallery);
    insertAfter(placeholder1,placeholder);
    placeholder1.style.display = "none";
}

function prepareGallery(){
    if (!document.getElementsByTagName) return false; //检查浏览器是否有该DOM方法
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;//检查是否存在钙元素
    var gallery = document.getElementById("imagegallery")
    links = gallery.getElementsByTagName("a");
    for (var i = 0;i<links.length;i++){
        links[i].onclick = function (){
            // showPic(this); //用this关键字，减少DOM数搜素次数
            // return false;
            return showPic(this);
        }
    }
}

function showSection(id){
    var sections = document.getElementsByTagName("section");
    for (var i=0; i<sections.length; i++){
        if (sections[i].getAttribute("id") != id){
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav(){
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length==0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i=0; i<links.length; i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function (){
            // alert(this.destination);
            showSection(this.destination);
            return false;
        }
    }
}

function isFilled(field){
    if (field.value.replace(" ","").length == 0) return false;
    var placeholder = field.getAttribute("placeholder");
    return (field.value != placeholder);
}

function isEmail(field){
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
function validateForm(whichform){
    for (var i=0; i<whichform.elements.length; i++){
        var element = whichform.elements[i];
        if (element.required =="required"){
            if (!isFilled(element)){
                alert("请输入"+element.name+"!");
                return false;
            }
        }
        if (element.id == "email"){
            if (!isEmail(element)){
                alert("请输入正确的邮箱地址！");
                return false;
            }
        }
        return true;
    }
}

function prepareForms(){
    for (var i=0; i<document.forms.length; i++){
        var thisform = document.forms[i];
        thisform.onsubmit = function (){
            if(!validateForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(this,article)) return false;
            return true;
        }
    }
}

function submitFormWithAjax(whichform,thetarget){
    var request = new XMLHttpRequest();
    if (!request) return false;
    var dataParts =[];
    var element;
    for (var i=0; i<whichform.elements.length; i++){
        element.whichform.elements[i];
        dataParts[i] = element.name+'='+encodeURIComponent(element.value);
    }
    var data = dataParts.join('&');
    request.open('POST',whichform.getAttribute('action'),true);
    request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    request.onreadystatechange = function (){
        if (request.readyState ==4){
            if (request.status == 200||request.status ==0){
                var matchs = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matchs.length>0){
                    thetarget.innerHTML =matchs[1];
                } else {
                    thetarget.innerHTML = '<p> 出错，抱歉！</p>';
                }
            }else {
                    thetarget.innerHTML = '<p>'  + request.statusText + '</p>';
                }
            }
        };
        request.send(data);
        return true;
    }


addLoadEvent(prepareForms);
addLoadEvent(prepareInternalnav);
addLoadEvent(highlightPage);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

