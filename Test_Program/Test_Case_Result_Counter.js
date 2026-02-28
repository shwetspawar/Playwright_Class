// Sample test results array
let testResults = ["PASS", "FAIL", "PASS", "SKIP", "PASS", "FAIL", "PASS"];

// Counters
let total = testResults.length;
let passed = 0;
let failed = 0;
let skipped = 0;

// Count results using for loop
for (let i = 0; i < testResults.length; i++) {
    if (testResults[i] === "PASS") {
        passed++;
    } else if (testResults[i] === "FAIL") {
        failed++;
    } else if (testResults[i] === "SKIP") {
        skipped++;
    }
}

// Calculate pass rate
let passRate = ((passed / total) * 100).toFixed(2);

// Determine verdict
let verdict = "";
if (failed === 0) {
    verdict = "Ready for Release ";
} else if (failed <= 2) {
    verdict = "Review Required ";
} else {
    verdict = "Block Release ";
}


console.log("===== Test Report =====");
console.log("Total Tests  :", total);
console.log("Passed       :", passed);
console.log("Failed       :", failed);
console.log("Skipped      :", skipped);
console.log("Pass Rate    :", passRate + "%");
console.log("Verdict      :", verdict);