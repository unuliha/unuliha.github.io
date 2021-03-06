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
        placeholder.style.display = "block";
        placeholder.setAttribute("src",source);
    } else {
        placeholder.style.display = "none";
        placeholder1.style.display ="block";
        placeholder1.setAttribute("src",source);
    }
    return false;
}

function preparePlaceholder(){
    var gallery = document.getElementById("picSwichArrow");
    var bigImage = document.createElement('div');
    bigImage.setAttribute("id","bigImage");
    var placeholder = document.createElement('img');
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/chuyou.jpg");
    placeholder.setAttribute("alt","my image gallery");
    var placeholder1 = document.createElement('video');
    placeholder1.setAttribute("id","placeholder1");
    placeholder1.setAttribute("controls","all");
    placeholder1.setAttribute("src","images/bodou.mp4");
    bigImage.append(placeholder);
    bigImage.append(placeholder1);
    insertAfter(bigImage,gallery);
    // insertAfter(placeholder,gallery);
    // insertAfter(placeholder1,placeholder);
    placeholder1.style.display = "none";
}

function prepareGallery(){
    if (!document.getElementsByTagName) return false; //???????????????????????????DOM??????
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;//???????????????????????????
    var gallery = document.getElementById("imagegallery")
    links = gallery.getElementsByTagName("a");
    for (var i = 0;i<links.length;i++){
        links[i].onclick = function (){
            // showPic(this); //???this??????????????????DOM???????????????
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
                alert("?????????"+element.name+"!");
                return false;
            }
        }
        if (element.id == "email"){
            if (!isEmail(element)){
                alert("?????????????????????????????????");
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
                    thetarget.innerHTML = '<p> ??????????????????</p>';
                }
            }else {
                    thetarget.innerHTML = '<p>'  + request.statusText + '</p>';
                }
            }
        };
        request.send(data);
        return true;
    }


function swichPic() {
    var winWidth = document.body.clientWidth;
    if (winWidth <= 1230) {
        document.body.className = "grid-1010";
    } else if (winWidth <= 1410) {
        document.body.className = "grid-1230";
    } else if (winWidth > 1410) {
        document.body.className = "grid-1410";
    } else {
        alert("do not know!");
    }

    //task growth
    var switchPic = (function () {
        /*
    now:???????????????li
    linum:????????????li
    shownum:???????????????li
    w_li:li?????????
    marginR_li:li????????????
    */
        var now = 1;
        var linum, shownum, offset, w_li, marginR_li, pre, next, wrap;

        function init(o) {
            pre = o.preBtn;
            next = o.nextBtn;
            wrap = o.wrap;
            bindBtn();
        }

        function btnShow() {
            getInfo();
            if (linum <= shownum) { //??????li????????????????????????????????????pre???next????????????
                pre.hide();
                next.hide();
            } else if (now == 1) { //?????????????????????next
                pre.hide();
                next.show();
            } else if (now > linum - shownum + 1) { //???????????????????????????pre
                pre.show();
                next.hide();
            } else { //??????pre,next????????????
                pre.show();
                next.show();
            }
        }

        function getInfo() {
            linum = $("#imagegallery").find("li").size();
            shownum = 6;
            // let body = $("#body");
            // if (body.hasClass("grid-1010")) {
            //     shownum = 3;
            //     w_li = wrap.find("li").outerWidth(); //?????????border?????????
            //     marginR_li = parseInt(wrap.find("li").css("marginRight"));
            //     offset = w_li + marginR_li;
            // } else if (body.hasClass("grid-1230")) {
            //     shownum = 4;
            //     w_li = wrap.find("li").outerWidth(); //?????????border?????????
            //     marginR_li = parseInt(wrap.find("li").css("marginRight"));
            //     offset = w_li + marginR_li;
            // } else if (body.hasClass("grid-1410")) {
            //     shownum = 4;
            //     w_li = wrap.find("li").outerWidth(); //?????????border?????????
            //     marginR_li = parseInt(wrap.find("li").css("marginRight"));
            //     offset = w_li + marginR_li;
            // }
        }

        function bindBtn() {
            btnShow();
            next.on("click", function () {
                now += 5;
                btnShow();
                // wrap.stop(true).animate({"margin-left": -(now - 1) * offset});
                wrap.stop(true).animate({"margin-left": -(now - 1) * 100});
            });
            pre.on("click", function () {
                now -= 5;
                btnShow();
                wrap.stop(true).animate({"margin-left": -(now - 1) * 100});
            });

            $(window).resize(function () {
                now = 1;
                btnShow();
                wrap.animate({"margin-left": 0});
            });
        }

        return {init: init}
    })();

    switchPic.init({
        preBtn: $(".arrowbtn_left"),
        nextBtn: $(".arrowbtn_right"),
        wrap: $("#imagegallery")
    })
}

function bigSwich() {
    //????????????
    let $left_arrow = $("<div id='big_left'>" +
        "<img src='images/left_arrow.png' style='width: 100%'/>" +
        "</div>");
    let $right_arrow = $("<div id='big_right'>" +
        "<img src='images/right_arrow.png' style = 'width:100%'/>" +
        "</div>")
    $("#bigImage").append($left_arrow);
    $("#bigImage").append($right_arrow);

    //???????????????????????????
    let arr = new Array();
    let linum = $("#imagegallery").find("li").size();
    for (let i = 0; i < linum; i++) {
        arr.push($(`#imagegallery li:eq(${i}) a`).attr("href"));
    }

    //????????????????????????
    let bigSwichVa = (function () {
        let current_img_index, place,pre,next;

        function init(o) {
            pre = o.preBtn;
            next = o.nextBtn;
            bindBtn();
        }

        function bigBtnShow() {
             if (current_img_index < 1) {
                pre.hide();
                next.show();
            } else if (current_img_index > arr.length - 2) {
                pre.show();
                next.hide();
            } else {
                pre.show();
                next.show();
            }
        }

        function getplace(index) {
            if (arr[index].split(".")[1] == 'jpg') {
                $("#placeholder").css("display" , "block");
                $("#placeholder1").css("display" , "none");
                place = $("#placeholder");
            } else {
                $("#placeholder").css("display" , "none");
                $("#placeholder1").css("display" , "block");
                place = $("#placeholder1");
            }
            return place;
        }

        function getIndex(){
            let nowplace = ($("#placeholder").is(":hidden"))?
                ($("#placeholder1")):($("#placeholder"));
            let nowPic = nowplace.attr("src");
            current_img_index = arr.indexOf(nowPic);
        }
        function bindBtn() {
            window.onclick = function (){
                getIndex();
                bigBtnShow();
            }
            next.on("click", function () {
                getIndex();
                current_img_index++;
                getplace(current_img_index);
                place.attr("src",arr[current_img_index]);
                bigBtnShow();
            })
            pre.on("click", function () {
                getIndex();
                current_img_index--;
                bigBtnShow();
                place = getplace(current_img_index);
                place.attr("src",arr[current_img_index]);
                bigBtnShow();
            });
        }

        return {init: init}
    })();
    bigSwichVa.init({
            preBtn: $("#big_left img"),
            nextBtn: $("#big_right img"),
        })
    }


addLoadEvent(prepareForms);
addLoadEvent(prepareInternalnav);
addLoadEvent(highlightPage);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(swichPic);
addLoadEvent(bigSwich);