import React, { useEffect, useState, useContext } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { UserContext } from '../../context/UserContext'; // adjust path if needed

// Currency symbol mapping
const currencySymbols = {
  USD: '$',
  THB: '฿',
  EUR: '€',
  MMK: 'Ks',
  GBP: '£',
};

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const { prefs } = useContext(UserContext); // Get selected currency
  const currencySymbol = currencySymbols[prefs?.currency] || '';

  const [chartData, setChartData] = useState([]);

  const prepareChartData = (data) => {
    const dataArr = data?.map((item) => ({
      name: `${item?.source} (${currencySymbol}${item?.amount})`,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData(data);
    return () => {};
  }, [data, prefs?.currency]); // re-run if currency changes

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`${currencySymbol}${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
