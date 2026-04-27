# Bank Statement Analyzer

## Preview

![Bank Statement Analyzer](public/Screenshot.png)

An application for analyzing bank statements in CSV format.

## Features

- Upload CSV via drag-and-drop or button
- Transaction table with filtering and search
- Summary cards (income, expenses, net result)
- Top-5 counterparties by expenses
- CSV row validation with error reporting

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tests

```bash
npm run test
```

## Notes

Найбільше часу пішло на реалізацію CSV-парсера — інтеграція papaparse з Zod-валідацією
`useReducer` патерн — складніший за `useState` але дає кращу структуру для пов'язаних станів
