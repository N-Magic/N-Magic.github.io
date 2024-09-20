let tapTimes = [];
let lastTapTime = 0;
const maxTaps = 5; // Set max taps to 5
let nailedIt = false; // Flag for "You nailed it!"

// Invisible button click handler
document.getElementById('nailedItBtn').addEventListener('click', () => {
  nailedIt = true;
});

// Tap button click handler
document.getElementById('tapBtn').addEventListener('click', () => {
  const currentTime = new Date().getTime();

  // Check if this is not the first tap
  if (lastTapTime !== 0) {
    const timeBetweenTaps = currentTime - lastTapTime;
    tapTimes.push(timeBetweenTaps);
  }

  lastTapTime = currentTime;

  // Check if maxTaps (5 taps) have been made
  if (tapTimes.length === maxTaps) {
    calculateBPM();
  }
});

// Reset button click handler
document.getElementById('resetBtn').addEventListener('click', () => {
  resetAttempt();
});

function calculateBPM() {
  const goalTempo = parseInt(document.getElementById('goalTempo').value);
  
  if (nailedIt) {
    // If the user pressed the invisible button, simulate a perfect match to the goal tempo
    document.getElementById('result').innerHTML = `
      Your tempo is: ${goalTempo} BPM.<br>
      You hit the goal exactly!
    `;
  } else {
    // Calculate the average time between taps
    const averageTimeBetweenTaps = tapTimes.reduce((a, b) => a + b, 0) / tapTimes.length;

    // Calculate the BPM
    const bpm = Math.round(60000 / averageTimeBetweenTaps);

    // Calculate the percentage difference if the goal tempo is entered
    let percentageOff = '';
    if (goalTempo && goalTempo > 0) {
      const difference = bpm - goalTempo;
      percentageOff = ((difference / goalTempo) * 100).toFixed(2); // Percentage difference

      // Display percentage difference message
      if (difference === 0) {
        percentageOff = `You hit the goal exactly!`;
      } else if (difference > 0) {
        percentageOff = `You are ${percentageOff}% faster than your goal.`;
      } else {
        percentageOff = `You are ${Math.abs(percentageOff)}% slower than your goal.`;
      }
    }

    // Display the BPM and percentage off
    document.getElementById('result').innerHTML = `
      Your tempo is: ${bpm} BPM.<br>
      ${percentageOff}
    `;
  }

  // Reset for another round of tapping
  resetAttempt();
}

// Function to reset the attempt but leave the goal tempo
function resetAttempt() {
  tapTimes = [];
  lastTapTime = 0;
  nailedIt = false; // Reset the "You nailed it!" flag
  document.getElementById('result').innerHTML = ''; // Clear result display
} // test