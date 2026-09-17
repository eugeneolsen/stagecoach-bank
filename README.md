# Stagecoach Bank | Live Balance Sheet Dashboard

A vanilla HTML/CSS/JavaScript dashboard that visualizes a bank's balance sheet in real time. Adjusting asset and liability sliders recalculates totals, equity, and the CET1 capital ratio live, with a running insight/risk log.

## Features

- **Asset breakdown**: Liquid Cash & Reserves (0% risk weight), Government Securities (20%), Illiquid Loan Portfolio (100%)
- **Liabilities & equity**: Core Retail Deposits, Short-Term Institutional Debt, and auto-balancing Shareholder Capital (Equity = Assets − Liabilities)
- **Live metrics**: Total Assets, Total Liabilities, Tier 1 Capital (Equity), and CET1 Capital Ratio
- **Basel III risk-weighted assets (RWA)** calculation and CET1 ratio: `Equity / RWA`
- **Real-time insight stream** logging state changes (critical / stable / strong) as CET1 crosses 8% and 13% thresholds

## Usage

Live demo: [https://stagecoach-bank.vercel.app](https://stagecoach-bank.vercel.app) *(update once deployed)*

No build step or dependencies required to run locally — open `index.html` in a browser, or serve the directory with any static file server:

```
npx serve .
```

## Project Structure

- `index.html` — page markup and layout
- `styles.css` — dark-themed styling
- `live.js` — slider bindings, ledger math, and insight logging
