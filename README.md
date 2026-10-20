# EventHub Automation

End-to-end test automation for an event hosting application, built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern, with a **GitHub Actions** workflow for continuous integration.


## Overview

This project automates the main user flows of an event hosting application (EventHub). Tests are written with the Playwright Test runner, and page-level logic is separated from test logic using page objects, which keeps the suite readable and easy to maintain.

## Tech Stack

| Area | Tool |
|------|------|
| Test framework | Playwright Test (`@playwright/test`) |
| Language | TypeScript |
| Runtime | Node.js |
| Design pattern | Page Object Model |
| CI/CD | GitHub Actions |

## Project Structure

```
EventhubAutomation/
├── .github/workflows/     # GitHub Actions CI workflow
├── pageobjects/           # Page Object classes (locators and page actions)
├── tests/                 # Test specs
├── utils/                 # Shared helpers and utilities
├── playwright.config.ts   # Playwright configuration
├── package.json
└── package-lock.json
├── .env                 # Actual credentials — DO NOT upload
├── .env.example 
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- Playwright
- Allure
- npm
- Git

## Setup

```bash
# Clone the repository
git clone https://github.com/wizutpal/EventhubAutomation.git
cd EventhubAutomation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a single test file
npx playwright test tests/<file-name>.spec.ts

# Run in a specific browser
npx playwright test --project=chromium

# Run with the browser visible
npx playwright test --headed

# Run in interactive UI mode
npx playwright test --ui

# Debug a test
npx playwright test --debug
```

## Viewing Reports

```bash
npx playwright show-report
npx allure generate allure-results --clean
npx allure open allure-report
```

## Continuous Integration

The workflow in `.github/workflows` runs the Playwright tests automatically on GitHub Actions, so changes are checked without any manual runs.

## Author

**Utpal Phukan**

- GitHub: [@wizutpal](https://github.com/wizutpal)
- LinkedIn: [utpal-phukan](https://www.linkedin.com/in/utpal-phukan-188b37208/)
