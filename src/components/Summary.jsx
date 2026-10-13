import React from 'react';

const Summary = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + parseFloat(t.amount || 0), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + parseFloat(t.amount || 0), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary-grid">
      <div className="summary-tile tile-balance">
        <span className="stat-label">Total Balance</span>
        <span className={`stat-value balance-amount ${balance < 0 ? 'expense-text' : ''}`}>
          ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      <div className="summary-tile tile-income">
        <span className="stat-label">Total Income</span>
        <span className="stat-value income-text">
          +${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      <div className="summary-tile tile-expense">
        <span className="stat-label">Total Expenses</span>
        <span className="stat-value expense-text">
          -${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default Summary;
