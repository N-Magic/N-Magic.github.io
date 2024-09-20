let tapTimes = [];
let lastTapTime = 0;
const maxTaps = 10;
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

  // Check if 10 taps have been made
  if (tapTimes.length === maxTaps) {
    calculateBPM();
  }
});

function calculateBPM() {
  if (nailedIt) {
    // If the user pressed the invisible button, show "You nailed it!"
    document.getElementById('result').innerText = 'You nailed it!';
  } else {
    // Calculate the average time between taps
    const averageTimeBetweenTaps = tapTimes.reduce((a, b) => a + b, 0) / tapTimes.length;

    // Calculate the BPM
    const bpm = Math.round(60000 / averageTimeBetweenTaps);

    // Get the goal BPM from the input
    const goalTempo = parseInt(document.getElementById('goalTempo').value);

    // Calculate the percentage difference if the goal tempo is entered
    let percentageOff = '';
    if (goalTempo && goalTempo > 0) {
      const difference = bpm - goalTempo;
      percentageOff = ((difference / goalTempo) * 100).toFixed(2); // Percentage difference

      // Display percentage difference message
      if (percentageOff > 0) {
        percentageOff = `You are ${percentageOff}% faster than your goal.`;
      } else if (percentageOff < 0) {
        percentageOff = `You are ${Math.abs(percentageOff)}% slower than your goal.`;
      } else {
        percentageOff = `You hit the goal exactly!`;
      }
    }

    // Display the BPM and percentage off
    document.getElementById('result').innerHTML = `
      Your tempo is: ${bpm} BPM.<br>
      ${percentageOff}
    `;
  }

  // Reset for another round of tapping
  tapTimes = [];
  lastTapTime = 0;
  nailedIt = false; // Reset the "You nailed it!" flag
}
