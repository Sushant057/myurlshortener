async function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const accessToken = '275424d99b8fb5884ce656b0a5bd0e327ad8256c';

    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ long_url: longUrl })
    });

    const data = await response.json();

    if (response.ok) {
        
        sessionStorage.setItem('longUrl', longUrl);
        sessionStorage.setItem('shortUrl', data.link);
       
        window.location.href = 'result.html';
    } else {
        alert(`Error: ${data.message}`);
    }
}


function displayUrls() {
    const longUrl = sessionStorage.getItem('longUrl');
    const shortUrl = sessionStorage.getItem('shortUrl');

    if (longUrl && shortUrl) {
        document.getElementById('longUrlDisplay').textContent = longUrl;
        const shortUrlDisplay = document.getElementById('shortUrlDisplay');
        shortUrlDisplay.href = shortUrl;
        shortUrlDisplay.textContent = shortUrl;
    }
}


if (window.location.pathname.includes('result.html')) {
    displayUrls();
}
