// Array of eco-tips
const tips = [
    "Leaving the room? Turn off the lights—your wallet (and the planet) will thank you.",
    "Skip the single-use drama. Reusable water bottles are your vibe now.",
    "Your electronics don't need a constant lifeline. Unplug them when they're off and chill.",
    "Cloth bags > plastic bags. Save the planet and look good doing it.",
    "Leftovers don't belong in the trash—compost and make your garden the real MVP.",
    "Keep those shower jams short and sweet—nobody needs the deluxe album version.",
    "Take a walk or bike instead of driving for a cleaner planet."
];

// DOM elements
const tipElement = document.getElementById('tip');
const saveButton = document.createElement('button');
const completeButton = document.createElement('button');
const progressElement = document.createElement('div');
const progressText = document.createElement('div');
const badgeElement = document.createElement('div');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Append buttons dynamically to the container
const container = document.getElementById('container');
saveButton.id = 'save-tip';
saveButton.innerText = 'Save to Favorites';
completeButton.id = 'complete-tip';
completeButton.innerText = 'Mark as Completed';
container.appendChild(saveButton);
container.appendChild(completeButton);

// Add a progress text below the progress bar
progressText.id = 'progress-text';
container.appendChild(progressText);

// Weekly progress tracker
progressElement.id = 'progress-bar';
container.appendChild(progressElement);

// Badge display element
badgeElement.id = 'badge';
container.appendChild(badgeElement);

// Get the last completion date and reset progress if necessary
function checkWeekReset() {
    const lastCompletionDate = localStorage.getItem('lastCompletionDate');
    const currentDate = new Date();
    const currentWeek = currentDate.getWeek();

    if (lastCompletionDate) {
        const lastCompletionWeek = new Date(lastCompletionDate).getWeek();
        // If the week has changed, reset the progress
        if (currentWeek !== lastCompletionWeek) {
            localStorage.removeItem('completedTips');
            localStorage.setItem('lastCompletionDate', currentDate.toISOString());
        }
    } else {
        localStorage.setItem('lastCompletionDate', currentDate.toISOString());
    }
}

// Function to display today's tip
function getTipOfTheDay() {
    const date = new Date();
    const index = date.getDate() % tips.length; // Rotate tips daily
    tipElement.innerText = tips[index];
    updateProgress();
}

// Load weekly data from local storage
let completedTips = JSON.parse(localStorage.getItem('completedTips')) || [];
let completedWeeks = JSON.parse(localStorage.getItem('completedWeeks')) || 0;

// Save the current tip to favorites
saveButton.addEventListener("click", () => {
    const currentTip = tipElement.innerText;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(currentTip)) {
        favorites.push(currentTip);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Tip added to favorites!");
    } else {
        alert("Tip is already in favorites!");
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

// Update progress tracker as a fraction
function updateProgress() {
    const progressFraction = `${completedTips.length}/7`; // Show progress as fraction (e.g., 3/7)
    progressText.innerText = `Progress This Week: ${progressFraction}`; // Display progress text

    // Adjust width of the progress bar based on fraction (out of 7)
    const progressWidth = (completedTips.length / 7) * 100;
    progressElement.style.transition = "width 0.5s ease-in-out"; // Smooth transition
    progressElement.style.width = `${progressWidth}%`; // Update progress bar width

    // Check if user completed all tips for the week
    if (completedTips.length === 7) {
        markWeekAsCompleted();
    }
}

// Mark the current week as completed
function markWeekAsCompleted() {
    completedWeeks++;
    localStorage.setItem('completedWeeks', completedWeeks);
    displayBadge();
}

// Display a badge of achievement when the user has completed certain weeks
function displayBadge() {
    if (completedWeeks >= 3) {
        badgeElement.innerText = `🏅 You've completed ${completedWeeks} weeks of eco-tips! 🎉`;
        badgeElement.style.fontSize = "1.5rem";
        badgeElement.style.fontWeight = "bold";
        badgeElement.style.color = "#4caf50";
        badgeElement.style.marginTop = "20px";
    } else {
        badgeElement.innerText = "";
    }
}

// Function to get the current week number
Date.prototype.getWeek = function() {
    const startDate = new Date(this.getFullYear(), 0, 1);
    const days = Math.floor((this - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
};

// Toggle dark mode based on user selection
darkModeToggle.addEventListener("change", () => {
    const isDarkMode = darkModeToggle.checked;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        container.classList.add('dark-mode');
        progressElement.classList.add('dark-mode');
        progressText.classList.add('dark-mode');
        badgeElement.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        container.classList.remove('dark-mode');
        progressElement.classList.remove('dark-mode');
        progressText.classList.remove('dark-mode');
        badgeElement.classList.remove('dark-mode');
    }
});

// Run the function when the popup is opened
checkWeekReset();
getTipOfTheDay();