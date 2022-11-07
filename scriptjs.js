let urlInputEl = document.getElementById('urlInput');
let generateBtnEl = document.getElementById('generateShortUrl');
let resultsDispalyEL = document.getElementById('results');

let shortLinks = [];

let options = {
    method: 'GET'
};

function displayShortlinks(shortLinks) {
    let ind = parseInt(Math.random() * 3);
    let shortURl=shortLinks[ind]
    console.log(ind);
    let linksContainer = document.createElement('div');
    linksContainer.classList.add('shortlink_card','w-75', 'd-flex', 'flex-row','justify-content-between');
    resultsDispalyEL.appendChild(linksContainer);
    let originalLink = document.createElement('p');
    originalLink.textContent = shortLinks[shortLinks.length-1];
    linksContainer.appendChild(originalLink);
    let shortenLink = document.createElement('p');
    shortenLink.classList.add('shortenurl')
    shortenLink.textContent = shortURl;
    linksContainer.appendChild(shortenLink);
    let copyButton = document.createElement('button');
    copyButton.classList.add('copybtn')
    linksContainer.appendChild(copyButton);
    copyButton.textContent = 'copy';
    copyButton.addEventListener('click', function() {
        copyButton.textContent = 'copied';
        let copyShortUrl =shortURl;
        navigator.clipboard.writeText(copyShortUrl);
        alert("Copied the text: " + copyShortUrl);

    });
    


}


function displayResult(result) {
    shortLinks.push(result.full_short_link);
    shortLinks.push(result.full_short_link2);
    shortLinks.push(result.full_short_link3);
    shortLinks.push(result.original_link);
    displayShortlinks(shortLinks);
    shortLinks=[];
}

generateBtnEl.onclick = function() {
    let urlInputElvalue = urlInputEl.value;
    let url = 'https://api.shrtco.de/v2/shorten?url=' + urlInputElvalue;

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                result
            } = jsonData;
            console.log(result)
            displayResult(result);
        });
};