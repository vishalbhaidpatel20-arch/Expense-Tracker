import React from 'react';

const TransactionList = ({ transactions, categories, onDeleteRequest }) => {
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [categoryFilter, setCategoryFilter] = React.useState('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesType && matchesCategory;
  });

  return (
    <div className="transaction-section">
      <h2>Recent Transactions</h2>
      <div className="list-filters">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>
      <ul className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <li className="transaction-item" style={{ justifyContent: 'center', color: '#888', fontStyle: 'italic' }}>
            No transactions found
          </li>
        ) : (
          filteredTransactions.map(t => (
            <li key={t.id} className="transaction-item">
              <div className="tx-details">
                <span className="tx-desc">{t.description}</span>
                <span className="tx-meta">{t.category} • {t.date}</span>
              </div>
              <div className="tx-amount-group">
                <span className={`tx-amount ${t.type === 'income' ? 'income-text' : 'expense-text'}`}>
                  {t.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteRequest(t.id)}
                  title="Delete transaction"
                >
                  ✕
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
