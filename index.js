
    const subreddits = ['mirzapur', 'indianmemes', 'funny', 'memes', 'dankmemes', 'wholesomememes', 'ProgrammerHumor', 'PrequelMemes', 'comedyheaven', 'Animemes', 'MemeEconomy', 'me_irl', '2meirl4meirl', 'teenagers', 'historymemes', 'gamingmemes', 'catmemes', 'dogmemes', 'politicalmemes', 'science_memes', 'techmemes', 'sportsmemes', 'movie_memes', 'tvshowmemes', 'musicmemes', 'foodmemes', 'workmemes', 'schoolmemes', 'relationshipmemes', 'travelmemes', 'naturememes', 'artmemes', 'literaturememes', 'philosophymemes', 'fitnessmemes', 'healthmemes', 'parentingmemes', 'career_memes', 'financialmemes', 'businessmemes', 'marketingmemes', 'startupmemes', 'entrepreneurmemes', 'motivationmemes', 'inspirationmemes', 'selfimprovementmemes', 'productivitymemes', 'time_management_memes', 'lifehacks_memes', 'DIYmemes', 'craftingmemes', 'gardeningmemes', 'cookingmemes', 'bakingmemes', 'travelhumor_memes', 'adventurememes', 'outdoormemes', 'campingmemes', 'hikingmemes', 'fishingmemes', 'photographymemes', 'videomemes', 'filmmakingmemes', 'animationmemes', 'designmemes', 'fashionmemes', 'stylememes', 'beautymemes', 'makeupmemes', 'skincarememe', 'haircarememes', 'nailartmemes', 'fitnesshumor_memes', 'yogamemes', 'meditationmemes', 'spiritualmemes', 'mindfulnessmemes', 'mentalhealthmemes', 'selfcarememes', 'wellnessmemes', 'relationshiphumor_memes', 'datingmemes', 'marriage_memes', 'familymemes', 'friendshipmemes', 'petmemes', 'animalhumor_memes', 'wildlifememes', 'zoomemes', 'aquaticmemes', 'reptilememes', 'birdmemes', 'insectmemes', 'space_memes', 'astronomymemes', 'cosmosmemes', 'sciencehumor_memes', 'physicsmemes', 'chemistrymemes', 'biology_memes', 'geologymemes', 'environmentmemes', 'climatememes', 'oceanmemes', 'weather_memes', 'disastermemes', 'historyhumor_memes', 'ancientmemes', 'medievalmemes', 'modernmemes', 'war_memes', 'politicalhumor_memes', 'governmentmemes', 'lawmemes', 'economicsmemes', 'socialsciencememes', 'philosophyhumor_memes', 'ethicsmemes', 'logicmemes', 'aestheticmemes', 'surrealmemes'];
    const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];

let currentMemeURL = '';

function getMeme() {
    const memeDiv = document.querySelector('.meme');
    const infoDiv = document.querySelector('.info');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    const subreddits = ['mirzapur', 'cricketmemes', 'indianmemes', 'funnymemes', 'dankindianmemes', 'relatablememes'];

    // Show loading
    memeDiv.innerHTML = "<p>Loading meme...</p>";
    infoDiv.innerHTML = "";
    copyBtn.disabled = true;
    downloadBtn.disabled = true;

    // Pick a random subreddit
    const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];

    fetch(`https://meme-api.com/gimme/${randomSub}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            currentMemeURL = data.url;

            // Display meme
            memeDiv.innerHTML = `<img src="${currentMemeURL}" alt="Meme">`;

            // Display info
            infoDiv.innerHTML = `
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Upvotes:</strong> ${data.ups}</p>
                <p><strong>Subreddit:</strong> r/${data.subreddit}</p>
            `;

            // Enable buttons
            copyBtn.disabled = false;
            downloadBtn.disabled = false;
        })
        .catch(error => {
            memeDiv.innerHTML = "<p>Failed to load meme. Try again!</p>";
            infoDiv.innerHTML = "";
            console.error('Error fetching meme:', error);
        });
}

// Copy meme URL to clipboard
function copyMemeURL() {
    if (currentMemeURL) {
        navigator.clipboard.writeText(currentMemeURL)
            .then(() => alert('Meme URL copied to clipboard!'))
            .catch(err => alert('Failed to copy URL:', err));
    }
}

// Download meme image
function downloadMeme() {
    if (currentMemeURL) {
        const a = document.createElement('a');
        a.href = currentMemeURL;
        a.download = 'meme.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {  // Spacebar for next meme
        e.preventDefault();
        getMeme();
    } else if (e.key.toLowerCase() === 'c') {  // 'C' for copy
        copyMemeURL();
    } else if (e.key.toLowerCase() === 'd') {  // 'D' for download
        downloadMeme();
    }
});

// Infinite scroll: load next meme when reaching bottom
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 10) {
        getMeme();
    }
});
