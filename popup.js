//
//window.onload = function(){
//    click();
//}
//

loadCSS();


//fake css for run my function after loading of css START____________________________
function loadCSS(url, callback){
    url = "fakeCss.css";
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
        (callback) ? alert("stylesheet loaded") : click() ;
    }
    img.src = url;
}
//fake css ENDS___________________________________________________________

function click(){
    chrome.extension.sendMessage({type: "situation"}, function (response) {
        if(response.situation == true){
            document.getElementById("grabBut").style.backgroundColor="rgba(9, 170, 55, 1)";
            document.getElementById("grabBut").addEventListener("click", stop_click,false);
            document.getElementById("grabBut").removeEventListener("click",start_click,false);
        }
        else{
            document.getElementById("grabBut").style.backgroundColor="rgba(108, 108, 108, 0.75)";
            document.getElementById("grabBut").addEventListener("click", start_click,false);
            document.getElementById("grabBut").removeEventListener("click",stop_click,false);
        }
    }) ;
}

function start_click() {
    document.getElementById("grabBut").style.backgroundColor="rgba(9, 170, 55, 1)";
    chrome.extension.sendMessage({
        type:"start"
    });

    document.getElementById("grabBut").addEventListener("click", stop_click,false);
    document.getElementById("grabBut").removeEventListener("click",start_click,false);
};

function stop_click(){
    document.getElementById("grabBut").style.backgroundColor="rgba(108, 108, 108, 0.75)";
    chrome.extension.sendMessage({
        type:"stop"
    });

    document.getElementById("grabBut").addEventListener("click", start_click,false);
    document.getElementById("grabBut").removeEventListener("click",stop_click,false);
}
