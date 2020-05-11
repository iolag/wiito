chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.set({
        country: "us",
        countryname: "United States"
    });
    if (details.reason == "install") {
        chrome.tabs.create({
            url: chrome.extension.getURL("optionsinstall.html")
        })
    }
    chrome.storage.sync.set({
        title: ""
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostContains: '.'
                },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        highlighted = request.greeting;
        chrome.storage.sync.set({
            title: highlighted
        });
    });