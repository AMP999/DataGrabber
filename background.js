

var grabber_run;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.greeting){
        case "hello":
            if(grabber_run == true)
                start();
            break;
    }
    return true;
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == "situation"){
        sendResponse({situation : grabber_run});
    }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

    switch (request.type) {
        case "start":
            start();
            break;
        case "stop":
            stop();
            break;
    }
    return true;
});

//chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//    switch (request.type) {
//        case "stop":
//            stop();
//            break;
//    }
//    return true;
//});

var start = function(){
    grabber_run = true;
    chrome.browserAction.setIcon({path: "onIcon.png"});
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {type:"start", run:grabber_run});
    });
}

var stop = function(){
    grabber_run = false;
    chrome.browserAction.setIcon({path: "offIcon.png", tabId:tab.id});
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {type:"stop", run:grabber_run});
    });
}
