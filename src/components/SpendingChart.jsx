import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// Muted, sophisticated palette that complements the semi-dark theme
const COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#fb923c', '#818cf8'];

// Define theme constants to match CSS variables for the Tooltip
const CHART_THEME = {
  surface: '#1e293b',
  text: '#f1f5f9',
  border: 'rgba(255, 255, 255, 0.1)'
};

const SpendingChart = ({ transactions }) => {
  // Data transformation: Group expenses by category and sum their amounts
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
      <h3>Spending by Category</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{
                backgroundColor: CHART_THEME.surface,
                border: `1px solid ${CHART_THEME.border}`,
                borderRadius: '12px',
                color: CHART_THEME.text
              }}
              itemStyle={{ color: CHART_THEME.text }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar
              dataKey="value"
              name="Amount"
              radius={[4, 4, 0, 0]}
              barSize={40}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
