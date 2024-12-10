// Array of eco-tips
const tips = [
    "Turn off lights when not in use to save energy.",
    "Carry a reusable water bottle instead of buying plastic ones.",
    "Use cloth bags instead of single-use plastic bags.",
    "Compost your food waste to reduce landfill impact.",
    "Take shorter showers to conserve water.",
    "Unplug electronics when not in use to save electricity."
];

// Function to display today's tip
function getTipOfTheDay() {
    const date = new Date();
    const index = date.getDate() % tips.length; // Rotate tips daily
    document.getElementById('tip').innerText = tips[index];
}

// Run the function when the popup is opened
getTipOfTheDay();