import React, { useContext } from 'react';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import { UserContext } from '../../context/UserContext'; // adjust path if different

// Example currency symbols map
const currencySymbols = {
  USD: '$',
  THB: '฿',
  EUR: '€',
  MMK: 'Ks',
  GBP: '£',
};

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalExpense, totalIncome }) => {
  const { prefs } = useContext(UserContext); // get selected currency
  const currencySymbol = currencySymbols[prefs?.currency] || '';

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData.map(item => ({
          ...item,
          name: `${item.name} (${currencySymbol}${item.amount})`
        }))}
        colors={COLORS}
        label="Total Balance"
        totalAmount={`${currencySymbol}${totalBalance}`}
        showTextAnchor={true}
        centerTextClass="text-slate-900 dark:text-white"
        labelClassName="text-gray-500 dark:text-gray-400"
      />
    </div>
  );
};

export default FinanceOverview;
