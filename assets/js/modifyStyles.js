function modifyWH() {
    setTimeout(()=>{
        let iframe = document.getElementById("bubbles");
        let doc = iframe.contentDocument || iframe.contentWindow.document;
        let style = document.createElement("style");
        style.innerHTML = "canvas { width: 100% !important; height:100% !important }";
        doc.head.appendChild(style);
    },20)
}
