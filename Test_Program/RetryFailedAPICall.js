let maxRetries = 5;
let attempt = 0;
let success = false;

do {
    attempt++;
    // Simulate API call success/failure (40% success rate)
    let randomValue = Math.random(); // 0 to 1
    if (randomValue > 0.6) {
        success = true;
        console.log(`Attempt ${attempt}: SUCCESS `);
        break; // Exit loop on success
    } else {
        console.log(`Attempt ${attempt}: FAIL `);
    }
} while (attempt < maxRetries);

// Final result
if (success) {
    console.log(`API call succeeded after ${attempt} attempt(s).`);
} else {
    console.log(`API call failed after ${maxRetries} attempts.`);
}