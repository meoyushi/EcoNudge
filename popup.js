// Array of eco-tips
const tips = [
    "Leaving the room? Turn off the lights—your wallet (and the planet) will thank you.",

    "Skip the single-use drama. Reusable water bottles are your vibe now.",

    "Cloth bags > plastic bags. Save the planet and look good doing it.",

    "Leftovers don't belong in the trash—compost and make your garden the real MVP.",

    "Keep those shower jams short and sweet—nobody needs the deluxe album version.",

    "Your electronics don't need a constant lifeline. Unplug them when they're off and chill."


];

// Function to display today's tip
function getTipOfTheDay() {
    const date = new Date();
    const index = date.getDate() % tips.length; // Rotate tips daily
    document.getElementById('tip').innerText = tips[index];
}

// Run the function when the popup is opened
getTipOfTheDay();