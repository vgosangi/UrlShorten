let urlInputEl = document.getElementById('urlInput');
let generateBtnEl = document.getElementById('generateShortUrl');
let resultsDispalyEL = document.getElementById('results');
let errorMsgEl = document.getElementById('errorMsg');
let spinnerEl = document.getElementById('spinner');
let hightlightEL = document.getElementById('head');
let timeoutId = setInterval(function() {

    hightlightEL.style.color = '#e32970';

    timeoutId = setTimeout(function() {
        hightlightEL.style.color = 'white';
    }, 1000);
}, 2000);
//clearTimeout(timeoutId)


let shortLinksList = [];

let options = {
    method: 'GET'
};
localStorage.clear();



function displayShortlinks(shortLinksList) {
    spinnerEl.classList.add("d-none");

    let shortURl = shortLinksList[0];
    let originalUrl = shortLinksList[1];
    let copyid = originalUrl;
    if (localStorage.getItem(copyid) === null) {
        let linksContainer = document.createElement('div');
        linksContainer.classList.add('shortlink_card');
        resultsDispalyEL.appendChild(linksContainer);
        let originalLink = document.createElement('p');
        originalLink.textContent = 'Your URL: ' + shortLinksList[1];
        linksContainer.appendChild(originalLink);
        let shortenLink = document.createElement('p');
        shortenLink.classList.add('shortenurl');
        shortenLink.textContent = 'shortURl: ' + shortURl;
        linksContainer.appendChild(shortenLink);
        let copyButton = document.createElement('button');
        copyButton.classList.add('copybtn');
        linksContainer.appendChild(copyButton);
        copyButton.id = originalUrl;
        copyButton.textContent = 'copy';

        localStorage.setItem(copyid, copyButton.id);
        copyButton.addEventListener('click', function() {
            // localStorage.setItem(copyid,true);
            let keys = Object.keys(localStorage);
            // Object.keys(localStorage).forEach(function(key) {
            for (let key of keys) {
                console.log(localStorage.getItem(key));
                let keyvalue = localStorage.getItem(key);

                if (key === copyid) {
                    copyButton.textContent = 'copied';
                    copyButton.classList.add('copied');
                    let copyShortUrl = shortURl;
                    navigator.clipboard.writeText(copyShortUrl);
                } else {

                    document.getElementById(keyvalue).textContent = 'copy';
                    document.getElementById(keyvalue).classList.remove('copied');

                }
            }
            // copyButton.textContent = 'copied';
            // copyButton.classList.add('copied');
            // let copyShortUrl = shortURl;
            // navigator.clipboard.writeText(copyShortUrl);
            //             Object.keys(localStorage).forEach(function(key){
            //   console.log(localStorage.getItem(key));
            // });

        });
    }




}


function displayResult(result) {

    shortLinksList.push(result.full_short_link);
    shortLinksList.push(result.original_link);
    displayShortlinks(shortLinksList);
    console.log(shortLinksList);

    shortLinksList = [];
}

generateBtnEl.addEventListener('click', function() {
    spinnerEl.classList.remove('d-none');
    let urlInputElvalue = urlInputEl.value;

    if (urlInputElvalue === '') {
        errorMsgEl.textContent = 'Please enter Url';
        spinnerEl.classList.add("d-none");
        errorMsgEl.classList.add('errormsg');

        return;
    } else {
        errorMsgEl.textContent = '';
    }
    let url = 'https://api.shrtco.de/v2/shorten?url=' + urlInputElvalue;

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                result
            } = jsonData;
            console.log(result);
            if (result !== undefined) {

                displayResult(result);

                urlInputEl.value = '';
            } else {
                errorMsgEl.textContent = 'Please enter valid Url';
                spinnerEl.classList.add("d-none");
                errorMsgEl.classList.add('errormsg');
                return;
            }


        });
});