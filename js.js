function searchSite() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    const pages = [
      
        {title:'Chess Player Suspended After Allegedly Poisoning Her Rival',url:'https://www.chess.com/news/view/russian-chess-player-suspended-after-allegedly-poisoning-her-rival'},
        {title:'Game of the Week #632: G. Kazarjan - M. Van Delft, Vlissingen 2024',url:'https://en.chessbase.com/post/game-of-the-week-632-g-kazarjan-m-van-delft-vlissingen-2024'},
        {title:'Russian chess player accused of poison plot during championship',url:'https://abcnews.go.com/International/russian-chess-player-accused-poison-plot-championship/story?id=112702831'},
        {title:'Team lineups announced for record-breaking 45th Chess Olympiad in Budapest',url:'https://www.fide.com/news/3124'},
        {title:'Dutch Player Kicked Out Of Tournament After Phone Found Hidden In Sock',url:'https://www.chess.com/news/view/dutch-chess-player-kicked-out-of-tournament-hid-phone-in-sock'},
        {title:'Sigrun Øen, Mother Of Magnus Carlsen, Passes Away At 61',url:'https://www.chess.com/news/view/sigrun-oen-mother-of-magnus-carlsen-passes-away-at-61'},
        {title:'',url:''},
        {title:'',url:''},
        {title:'',url:''}
        // Add more pages as needed
    ];

    const filteredPages = pages.filter(page => page.title.toLowerCase().includes(query));

    if (filteredPages.length > 0) {
        filteredPages.forEach(page => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<a href="${page.url}">${page.title}</a>`;
            resultsContainer.appendChild(resultItem,'<button class="" onclick="clearResults()">clear</button>');
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found</p>','<button class="" onclick="clearResults()">clear</button>';
    }
}
function clearResults() {
    document.getElementById('search-input').value = ''; // Clear the search input field
    document.getElementById('search-results').innerHTML = ''; // Clear the search results
}