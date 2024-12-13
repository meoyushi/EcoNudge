// Array of eco-tips
const tips = [
    "Leftovers don't belong in the trash—compost and make your garden the real MVP.",
    "Skip the single-use drama. Reusable water bottles are your vibe now.",
    "Keep those shower jams short and sweet—nobody needs the deluxe album version.",
    "Cloth bags > plastic bags. Save the planet and look good doing it.",
    "Take a walk or bike instead of driving for a cleaner planet.",
    "Leaving the room? Turn off the lights—your wallet (and the planet) will thank you.",
    "Your electronics don't need a constant lifeline. Unplug them when they're off and chill."

];

// DOM elements
const tipElement = document.getElementById('tip');
const saveButton = document.getElementById('save-tip');
const completeButton = document.getElementById('complete-tip');
const progressElement = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const badgeElement = document.getElementById('badge');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Weekly progress tracker
let completedTips = JSON.parse(localStorage.getItem('completedTips')) || [];
let completedWeeks = JSON.parse(localStorage.getItem('completedWeeks')) || 0;

// Reset progress if a new week starts
function checkWeekReset() {
    const lastCompletionDate = localStorage.getItem('lastCompletionDate');
    const currentDate = new Date();
    const currentWeek = currentDate.getWeek(); // Get the current week number

    if (lastCompletionDate) {
        const lastCompletionWeek = new Date(lastCompletionDate).getWeek();
        // Check if the week has changed
        if (currentWeek !== lastCompletionWeek) {
            // If all tips were completed last week, optionally increment completedWeeks
            if (completedTips.length === 7) {
                completedWeeks++;
                localStorage.setItem('completedWeeks', completedWeeks);
            }

            // Reset all tips as not completed for the new week
            completedTips = [];
            localStorage.setItem('completedTips', JSON.stringify(completedTips));

            // Update the last completion date to the current date
            localStorage.setItem('lastCompletionDate', currentDate.toISOString());
        }
    } else {
        // If no last completion date exists, set it to the current date
        localStorage.setItem('lastCompletionDate', currentDate.toISOString());
    }
}



// Get the current tip of the day
function getTipOfTheDay() {
    const date = new Date();
    const index = date.getDate() % tips.length;
    tipElement.innerText = tips[index];
    updateProgress();
}

// Save the current tip to favorites
saveButton.addEventListener('click', () => {
    const currentTip = tipElement.innerText;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(currentTip)) {
        favorites.push(currentTip);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Tip added to favorites!');
    } else {
        alert('Tip is already in favorites!');
    }
});

// Mark the current tip as completed
completeButton.addEventListener("click", () => {
    const currentTip = tipElement.innerText;
    if (!completedTips.includes(currentTip)) {
        completedTips.push(currentTip);
        localStorage.setItem('completedTips', JSON.stringify(completedTips));
        localStorage.setItem('lastCompletionDate', new Date().toISOString()); // Update last completion date
        alert("Tip marked as completed!");
        updateProgress();
    } else {
        alert("You’ve already completed this tip this week!");
    }
});


// Update the progress bar and text
function updateProgress() {
    const progressFraction = `${completedTips.length}/7`;
    progressText.innerText = `Progress This Week: ${progressFraction}`;
    const progressWidth = (completedTips.length / 7) * 100;
    progressElement.style.width = `${progressWidth}%`;

    if (completedTips.length === 7) {
        markWeekAsCompleted();
    }
}

// Mark the current week as completed and display a badge
function markWeekAsCompleted() {
    if (completedTips.length === 7) { // Ensure all tips are completed
        completedWeeks++;
        localStorage.setItem('completedWeeks', completedWeeks);
        displayBadge(); // Show badge after updating the counter
    }
}




function displayBadge() {
    if (completedWeeks >= 0) {
        badgeElement.innerText = `🏅 You've completed ${completedWeeks} weeks of eco-tips! 🎉`;
        badgeElement.style.fontSize = "1.5rem";
        badgeElement.style.fontWeight = "bold";
        badgeElement.style.color = "#4caf50";
        badgeElement.style.marginTop = "20px";


    }
}



// Get the current week number
Date.prototype.getWeek = function() {
    const startDate = new Date(this.getFullYear(), 0, 1); // Jan 1st of the year
    const days = Math.floor((this - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startDate.getDay() + 1) / 7); // Adjust to ensure proper week start
};


const viewFavoritesButton = document.getElementById('view-favorites');

viewFavoritesButton.addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length === 0) {
        alert('You have no favorites yet!');
    } else {
        const favoritesList = favorites.map((tip, index) => `${index + 1}. ${tip}`).join('\n');
        alert(`Your Favorites:\n\n${favoritesList}`);
    }
});



// Toggle dark mode
darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    progressElement.classList.toggle('dark-mode', isDarkMode);
    progressText.classList.toggle('dark-mode', isDarkMode);
    badgeElement.classList.toggle('dark-mode', isDarkMode);
});

// Initialize the popup
checkWeekReset();
getTipOfTheDay();