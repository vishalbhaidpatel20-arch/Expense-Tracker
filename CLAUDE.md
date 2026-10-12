# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands
- Develop: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Preview Production Build: `npm run preview`

## Architecture & Structure
The project is a React application using Vite.

### Component Hierarchy
- **App (`src/App.jsx`)**: Orchestrator component that manages the global `transactions` state and `categories` list.
- **Summary (`src/components/Summary.jsx`)**: Calculates and displays total income, total expenses, and the resulting balance.
- **TransactionForm (`src/components/TransactionForm.jsx`)**: Handles user input for adding new transactions.
- **TransactionList (`src/components/TransactionList.jsx`)**: Displays the list of transactions with local filtering logic (type and category).

### Key Patterns
- **State Management**: Lifting state up to `App.jsx` to allow data sharing between the form, list, and summary.
- **Data Flow**: Unidirectional flow where `App` passes state down as props and receives updates via callback functions (e.g., `onAddTransaction`).
- **Calculation Logic**: Total calculations are encapsulated within the `Summary` component.

### Project Layout
- **Entry Point**: `src/main.jsx` mounts the `App` component.
- **Styles**: Global styles in `src/index.css` and component-specific styles in `src/App.css`.
- **Assets**: Static assets in `src/assets/` and `public/`.
