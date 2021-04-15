let quotesContainer = document.getElementById('quote-container');
let quoteTxt = document.getElementById('quote');
let authorTxt = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = []

function pickAQuote() {
    const results = apiQuotes;
    const index = Math.floor(Math.random() * results.length);
    const quote = results[index];

    //applie long-quote css when text is longer than 50 letters
    if (quote.text.length > 50) {
        quoteTxt.classList.add('long-quote');
    } else {
        quoteTxt.classList.remove('long-quote');
    }
    quoteTxt.textContent = quote.text;

    // check if author is empty
    if (!quote.author) {
        authorTxt.textContent = 'Anonymous';
    } else {
        authorTxt.textContent = quote.author;
    }

}

async function getQuotes() {
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        pickAQuote();
    } catch (error) {
        // catch an error here
        console.log(error)
    }
}

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listener
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();