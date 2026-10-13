import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// Midnight Gold Palette: High contrast, luxury tones
const COLORS = ['#D4AF37', '#4ADE80', '#FB7185', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

const SpendingChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, t) => {
      const amount = parseFloat(t.amount) || 0;
      acc[t.category] = (acc[t.category] || 0) + amount;
      return acc;
    }, {});

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="chart-empty">
        No expense data available for the chart.
      </div>
    );
  }

  return (
    <div className="spending-chart-container">
      <h3 style={{ color: '#F8FAFC' }}>Spending by Category</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#161E31', borderColor: '#1E293B', color: '#F8FAFC' }}
              cursor={{ fill: '#1E293B' }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Legend />
            <Bar
              dataKey="value"
              name="Amount"
              radius={[4, 4, 0, 0]}
              barSize={40}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
