// Interface Component Links
const inCash = document.getElementById('input-cash');
const inSecurities = document.getElementById('input-securities');
const inLoans = document.getElementById('input-loans');
const inDeposits = document.getElementById('input-deposits');
const inBorrowing = document.getElementById('input-borrowing');

const lblCash = document.getElementById('lbl-cash');
const lblSecurities = document.getElementById('lbl-securities');
const lblLoans = document.getElementById('lbl-loans');
const lblDeposits = document.getElementById('lbl-deposits');
const lblBorrowing = document.getElementById('lbl-borrowing');
const lblEquity = document.getElementById('lbl-equity');

const barCash = document.getElementById('bar-cash');
const barSecurities = document.getElementById('bar-securities');
const barLoans = document.getElementById('bar-loans');
const barDeposits = document.getElementById('bar-deposits');
const barBorrowing = document.getElementById('bar-borrowing');
const barEquity = document.getElementById('bar-equity');

const cardAssets = document.getElementById('tot-assets-card');
const cardLiabilities = document.getElementById('tot-liabilities-card');
const cardEquity = document.getElementById('tot-equity-card');
const cardRatio = document.getElementById('cet1-ratio-card');

const assetTitleTotal = document.getElementById('asset-title-total');
const liabTitleTotal = document.getElementById('liab-title-total');
const streamBox = document.getElementById('stream-box');

let prevAlertState = "";

function formatFullCurrency(val) {
    return '\$' + (val * 1000000).toLocaleString();
}

function addLogMessage(msg, type = "normal") {
    if (!streamBox) return;
    const time = new Date().toLocaleTimeString();
    const logItem = document.createElement('div');
    logItem.className = 'insight-log';
    
    let colorClass = "";
    if (type === "warn") colorClass = "warn";
    if (type === "success") colorClass = "success";

    logItem.innerHTML = `<span class="insight-timestamp">[${time}]</span><span class="insight-text ${colorClass}">&gt; ${msg}</span>`;
    streamBox.insertBefore(logItem, streamBox.firstChild);
}

function processLedgerEngine() {
    const cash = parseFloat(inCash.value || 0);
    const securities = parseFloat(inSecurities.value || 0);
    const loans = parseFloat(inLoans.value || 0);
    const deposits = parseFloat(inDeposits.value || 0);
    const borrowing = parseFloat(inBorrowing.value || 0);

    // Ledger Equivalence Equation Rules
    const totalAssets = cash + securities + loans;
    const totalLiabilities = deposits + borrowing;
    const totalEquity = totalAssets - totalLiabilities;

    // Graphic Allocations Vector Percentage Fills
    if(barCash) barCash.style.width = ((cash / totalAssets) * 100) + '%';
    if(barSecurities) barSecurities.style.width = ((securities / totalAssets) * 100) + '%';
    if(barLoans) barLoans.style.width = ((loans / totalAssets) * 100) + '%';
    if(barDeposits) barDeposits.style.width = ((deposits / totalLiabilities) * 100) + '%';
    if(barBorrowing) barBorrowing.style.width = ((borrowing / totalLiabilities) * 100) + '%';
    if(barEquity) barEquity.style.width = Math.max(0, Math.min(100, (totalEquity / totalAssets) * 100)) + '%';

    // Label Value Updates
    if(lblCash) lblCash.innerText = formatFullCurrency(cash);
    if(lblSecurities) lblSecurities.innerText = formatFullCurrency(securities);
    if(lblLoans) lblLoans.innerText = formatFullCurrency(loans);
    if(lblDeposits) lblDeposits.innerText = formatFullCurrency(deposits);
    if(lblBorrowing) lblBorrowing.innerText = formatFullCurrency(borrowing);
    if(lblEquity) lblEquity.innerText = formatFullCurrency(totalEquity);

    // Master Header Interface Injections
    if(cardAssets) cardAssets.innerText = formatFullCurrency(totalAssets);
    if(cardLiabilities) cardLiabilities.innerText = formatFullCurrency(totalLiabilities);
    if(cardEquity) cardEquity.innerText = formatFullCurrency(totalEquity);
    if(assetTitleTotal) assetTitleTotal.innerText = '\$' + totalAssets.toFixed(1) + 'M';
    if(liabTitleTotal) liabTitleTotal.innerText = '\$' + totalAssets.toFixed(1) + 'M';

    // Risk Weighting Math (Basel III: Cash 0%, Treasuries 20%, Commercial Loans 100%)
    const rwa = (cash * 0.0) + (securities * 0.2) + (loans * 1.0);
    const cet1Ratio = rwa > 0 ? (totalEquity / rwa) * 100 : 0;
    if(cardRatio) cardRatio.innerText = cet1Ratio.toFixed(1) + '%';

    // System Monitor Logic
    let currentState = "normal";
    if (cet1Ratio < 8.0 || totalEquity < 5) {
        if(cardRatio) cardRatio.style.color = 'var(--accent-rust)';
        if(cardEquity) cardEquity.style.color = 'var(--accent-rust)';
        currentState = "critical";
    } else if (cet1Ratio >= 13.0) {
        if(cardRatio) cardRatio.style.color = 'var(--accent-green)';
        if(cardEquity) cardEquity.style.color = 'var(--accent-green)';
        currentState = "strong";
    } else {
        if(cardRatio) cardRatio.style.color = '#3b82f6';
        if(cardEquity) cardEquity.style.color = 'var(--text-main)';
        currentState = "stable";
    }

    if (currentState !== prevAlertState) {
        if (currentState === "critical") {
            addLogMessage(`RISK ALERT: CET1 Capital Ratio dropped to ${cet1Ratio.toFixed(1)}%. Structural reserves breached.`, "warn");
        } else if (currentState === "strong") {
            addLogMessage(`CAPITAL ADEQUACY OPTIMAL: Tier 1 Buffer highly resilient at ${cet1Ratio.toFixed(1)}%.`, "success");
        } else if (currentState === "stable") {
            addLogMessage(`LEDGER SYSTEM UPDATE: Asset base balanced at $${totalAssets}M. Liquidity ratios stable.`, "normal");
        }
        prevAlertState = currentState;
    }
}

// Bind Element Nodes
[inCash, inSecurities, inLoans, inDeposits, inBorrowing].forEach(inputEl => {
    if(inputEl) inputEl.addEventListener('input', processLedgerEngine);
});

// Wake Up Logs
addLogMessage("Stagecoach Core Ledger Infrastructure Online. Connecting secure gateway...", "normal");
addLogMessage("Federal Risk Monitoring active. Basel III compliance framework verified.", "success");
processLedgerEngine();
