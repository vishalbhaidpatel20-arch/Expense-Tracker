import React from 'react';

const TransactionForm = ({ onAddTransaction, categories }) => {
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('food');
  const [type, setType] = React.useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAddTransaction({ description, amount, category, type });
    setDescription('');
    setAmount('');
  };

  return (
    <div className="quick-entry">
      <h2>Quick Entry</h2>
      <form className="entry-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TransactionForm;
