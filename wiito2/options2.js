document.getElementById("save").onclick = function () {
    chrome.storage.sync.set({
        country: document.getElementById("countrydropdown").options[document.getElementById("countrydropdown").selectedIndex].value,
        countryname: document.getElementById("countrydropdown").options[document.getElementById("countrydropdown").selectedIndex].innerHTML
    });


}

window.onload = function () {
    chrome.storage.sync.get('countryname', function (data) {
        document.getElementById("selected").innerHTML = data.countryname
    })
}