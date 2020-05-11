window.addEventListener("mouseup", e => {
    var sel = window.getSelection();
    chrome.runtime.sendMessage({
        greeting: sel.toString()
    });
});