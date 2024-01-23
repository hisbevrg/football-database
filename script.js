// Get references to HTML elements
const clubList = document.getElementById('club-list');
const searchInput = document.getElementById('search');
const clubDetailsContainer = document.getElementById('main');

// Attach an input event listener for the search input
searchInput.addEventListener('input', handleSearchInput);

// Initialize football club data and display all clubs
let clubData = footballClubs; 
displayClubs(footballClubs);

// Display football clubs in the club list
function displayClubs(clubs) {
    // Generate HTML for club cards and set it in the clubList element
    const clubCardsHTML = clubs.map(createClubCardHTML).join('');
    clubList.innerHTML = clubCardsHTML;
}

// Create HTML for a football club card
function createClubCardHTML(club) {
    return `
        <div class="club-card" onclick="handleClubClick(this);">
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
        </div>
    `;
}

// Handle clicking on a football club card
function handleClubClick(element) {
    const clubName = element.querySelector('h2').textContent;
    const selectedClub = footballClubs.find(club => club.name === clubName);
    displayClubDetails(selectedClub);
}

// Display football club details
function displayClubDetails(club) {
    const clubDetailsHTML = `
        <h2>${club.name}</h2>
        <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">
        <p><b>League: </b>${club.league}</p>
        <p><b>City: </b>${club.city}</p>
        <p><b>Stadium: </b>${club.stadium}</p>
        <p><b>Description: </b>${club.description}</p>
        <button onclick="displayClubs(footballClubs);" style="width:48%;">Back</button>
        <button onclick="viewClubPlayers('${club.name}');" style="width:48%;">View Players</button>
    `;
    clubDetailsContainer.innerHTML = clubDetailsHTML;

}

// Function to view club players
function viewClubPlayers(clubName) {
    const selectedClub = clubData.find(club => club.name === clubName);
    const selectedClubname = `<h1>${selectedClub.name} Players</h1>`
    const playersHTML = selectedClub.players.map(player => `
        <div>
            <h3>${player.name}</h3>
            <p><b>Position: </b>${player.position}</p>
            <p><b>Number: </b>${player.number}</p>
            <p><b>Goals: </b>${player.goals}</p>
            <p><b>Assists: </b>${player.assists}</p>

        </div>
    `).join('');
    const backButton = `<button onclick="displayClubs(footballClubs);">Back</button>`;
    clubDetailsContainer.innerHTML = selectedClubname + playersHTML + backButton;
     
}

// Handle search input and filter clubs
function handleSearchInput() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredClubs = footballClubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm) ||
        club.city.toLowerCase().includes(searchTerm) ||
        club.league.toLowerCase().includes(searchTerm)
    );
    displayClubs(filteredClubs);
}