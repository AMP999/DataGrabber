
var firstSyle = [];
var tables = document.getElementsByTagName("table");
for(var i=0; i<tables.length; i++) {
    firstSyle.push(tables[i].style);
}

loadCSS();


//fake css for run my function after loading of css START____________________________

function loadCSS(url, callback){
    url = "fakeCss.css"
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;

    document.getElementsByTagName('head')[0].appendChild(link);

    var img = document.createElement('img');
    img.onerror = function(){
        //if(callback){
        //    chrome.extension.sendMessage({greeting: "hello"}, function (response) {});
        //}
        //else{
        //    callback(link);
        //}
        (callback) ? alert("stylesheet loaded") : chrome.extension.sendMessage({greeting: "hello"}, function (response) {}) ;
    }
    img.src = url;
}


//var head = document.getElementsByTagName("head")[0];
//var body = document.body;
//var css = document.createElement("link");
//var img = document.createElement("img");
//var cssUrl = "fakeCss.css";
//
//css.href = cssUrl;
//css.rel = "stylesheet";
//head.appendChild(css);

//img.onerror = function(){
//    chrome.extension.sendMessage({greeting: "hello"}, function (response) {});
//    //    if (response.run == true) {
//    //        for(var i=0; i<tables.length; i++) {
//    //            tables[i].style.border="6px solid red";
//    //            tables[i].style.cursor = "pointer";
//    //            tables[i].addEventListener("click",ExcelExtractor,false);
//    //        }
//    //
//    //        var iframe1 = document.createElement("iframe");
//    //        iframe1.id = "txtArea1";
//    //        iframe1.style.display = "none";
//    //
//    //    }
//    //    else {
//    //        for(var i=0; i<tables.length; i++) {
//    //            tables[i].removeEventListener("click",ExcelExtractor,false);
//    //            tables[i].style = firstSyle[i];
//    //        }
//    //    }
//    //});
//    body.removeChild(img);
//}

//fake css ENDS___________________________________________________________



//window.onload = function changeStyle() {
//
//
//}

chrome.extension.onMessage.addListener(function(message, sender, sendRespnse){
    switch (message.type){
        case "start":
            for(var i=0; i<tables.length; i++) {
                tables[i].style.border="6px solid red";
                tables[i].style.cursor = "pointer";
                tables[i].addEventListener("click",ExcelExtractor,false);
            }

            var iframe1 = document.createElement("iframe");
            iframe1.id = "txtArea1";
            iframe1.style.display = "none";
            break;

        case "stop":
            for(var i=0; i<tables.length; i++) {
                tables[i].removeEventListener("click",ExcelExtractor,false);
                tables[i].style = firstSyle[i];
            }
            break;
    }
});

    //chrome.extension.onMessage.addListener(function(message, sender, sendRespnse){
    //    switch(message.type){
    //        case "start":
    //            console.log(3);
    //            grabber_run = true;
    //            changeStyle();
    //            iTable.style.border="6px solid red";
    //            iTable.style.cursor = "pointer";
    //
    //            var iframe1 = document.createElement("iframe");
    //            iframe1.id = "txtArea1";
    //            iframe1.style.display = "none";
    //
    //            iTable.addEventListener("click",fnExcelReport,false);
                //break;
        //};
    //});
    //if(grabber_run == true){
    //    iTable.style.border="6px solid red";
    //    iTable.style.cursor = "pointer";
    //
    //    var iframe1 = document.createElement("iframe");
    //    iframe1.id = "txtArea1";
    //    iframe1.style.display = "none";
    //    iTable.addEventListener("click",fnExcelReport,false);
    //}
    //
    //else{
    //    iTable.removeEventListener("click",fnExcelReport,false);
    //    iTable.style = firstSyle;
    //}
//}

/*chrome.extension.onMessage.addListener(function(message, sender, sendRespnse){
   switch(message.type){
       case "start":
           console.log(3);
           grabber_run = true;
           changeStyle();
           iTable.style.border="6px solid red";
           iTable.style.cursor = "pointer";

           var iframe1 = document.createElement("iframe");
           iframe1.id = "txtArea1";
           iframe1.style.display = "none";

           iTable.addEventListener("click",fnExcelReport,false);
           break;
   };
});*/

/*
chrome.extension.onMessage.addListener(function(message, sender, sendRespnse){
    switch (message.type){
        case "stop":
            grabber_run = false;
            changeStyle();
            iTable.removeEventListener("click",fnExcelReport,false);
            iTable.style = firstSyle;
            break;
    }
})*/

function ExcelExtractor()
{
    var tab_text = '<table border="1px" style="font-size:20px" ">';
    var textRange;
    var j = 0;
    //var x = document.getElementsByClassName("table table")[0];
    var thead = this.getElementsByTagName("thead")[0];
    var tab = this.getElementsByTagName("tbody")[0];
    //tab = "<table>" + tab + "</table>";
    var lines = tab.rows.length;
    var columnsh = thead.rows[0].cells.length;
    var columns = tab.rows[0].cells.length;
    //
    //// the first headline of the table
    //if (lines > 0) {
    //    tab_text = tab_text + '<tr bgcolor="#DFDFDF">' + tab.rows[0].innerHTML + '</tr>';
    //}
    //
    //// table data lines, loop starting from 1
        tab_text += "<tr>";
        for(var i=0; i<columnsh ; i++) {
            tab_text += "<td>" + thead.rows[0].cells[i].innerHTML + "</td>";
        }
        tab_text += "</tr>";

    for (j = 0 ; j < lines; j++) {
        tab_text += "<tr>";
            for(var i=0; i<columns ; i++) {
                tab_text += "<td>" + tab.rows[j].cells[i].innerHTML + "</td>";
            }
        tab_text += "</tr>";
    }

    //tab_text = tab_text + tab;
    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<a[^>]*>|<\/a>/g, "");             //remove if u want links in your table
    //tab_text = tab_text.replace(/<img[^>]*>/gi,"");                 // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");    // reomves input params
    // console.log(tab_text); // aktivate so see the result (press F12 in browser)

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    // if Internet Explorer
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "DataTableExport.xls");
    }
    else // other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}