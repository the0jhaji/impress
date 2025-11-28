function getMeme() {
    const memeDiv = document.querySelector('.meme');
    const subreddits = ['mirzapur', 'cricketmemes', 'indianmemes', 'funnymemes', 'dankindianmemes','relatablememes'];
    
    // Pick a random subreddit each time
    const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];
    
    fetch(`https://meme-api.com/gimme/${randomSub}`)
        .then(response => response.json())
        .then(data => {
            memeDiv.innerHTML = `<img src="${data.url}" alt="Meme" style="max-width: 100%; max-height: 85%;">`;
        })
        .catch(error => {
            memeDiv.textContent = 'Failed to load meme.';
            console.error('Error fetching meme:', error);
        });
}
