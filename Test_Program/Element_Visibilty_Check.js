// Element visibility/enablement checker with optional wait-for-enabled behavior.
// Usage:
//   node Element_Visibilty_Check.js             (uses defaults)
//   node Element_Visibilty_Check.js --auto-enable=1500  (simulate that element becomes enabled after 1500ms)

const DEFAULT_TIMEOUT = 5000;

async function simulateCheck(options = {}) {
    let { isPresent = true, isDisplayed = true, isEnabled = false, autoEnableAfterMs = 0, timeout = DEFAULT_TIMEOUT, pollInterval = 200 } = options;

    // If user asked to auto-enable, flip the flag after the given delay (simulation only).
    if (autoEnableAfterMs > 0 && !isEnabled) {
        setTimeout(() => {
            isEnabled = true;
            console.log('--- [Simulated] Element became enabled');
        }, autoEnableAfterMs);
    }

    const start = Date.now();
    while (true) {
        let status = "";
        if (isPresent === false) status = "NOT FOUND";
        else if (isDisplayed === false) status = "HIDDEN";
        else if (isEnabled === false) status = "DISABLED";
        else status = "READY";

        let severity = (isPresent === false) ? "CRITICAL" :
                       (isDisplayed === false || isEnabled === false) ? "WARNING" :
                       "OK";

        let action = "";
        if (status === "NOT FOUND") action = "Element is not present. Check locator or page load.";
        else if (status === "HIDDEN") action = "Element is present but hidden. Wait for it to appear or check CSS/display conditions.";
        else if (status === "DISABLED") action = "Element is visible but disabled. Waiting for enable state...";
        else if (status === "READY") action = "Element is ready for interaction.";

        console.log(`Status: ${status} Severity: ${severity} Action: ${action}`);

        if (status === "READY") return { status, severity, action };

        if (status === "DISABLED") {
            if (Date.now() - start >= timeout) {
                action = "Timeout waiting for element to become enabled. Check preconditions.";
                console.log(`Status: ${status} Severity: ${severity} Action: ${action}`);
                return { status: "DISABLED-TIMEOUT", severity, action };
            }
            await new Promise(r => setTimeout(r, pollInterval));
            continue;
        }

        // For NOT FOUND or HIDDEN, stop and return immediately.
        return { status, severity, action };
    }
}

// CLI handling: allow --auto-enable=<ms>
function parseCli() {
    const args = process.argv.slice(2);
    const opts = {};
    for (const a of args) {
        if (a.startsWith('--auto-enable=')) {
            const v = Number(a.split('=')[1] || 0);
            if (!Number.isNaN(v) && v > 0) opts.autoEnableAfterMs = v;
        } else if (a.startsWith('--timeout=')) {
            const v = Number(a.split('=')[1] || 0);
            if (!Number.isNaN(v) && v > 0) opts.timeout = v;
        }
    }
    return opts;
}

(async () => {
    const cli = parseCli();

    // Default sample properties — change these to match real checks or integrate with Playwright.
    const sample = {
        isPresent: true,
        isDisplayed: true,
        isEnabled: false,
        autoEnableAfterMs: cli.autoEnableAfterMs || 0,
        timeout: cli.timeout || DEFAULT_TIMEOUT,
    };

    await simulateCheck(sample);
})();