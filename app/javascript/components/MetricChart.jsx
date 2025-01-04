import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MetricChart = ({ metricName, metrics }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Filter metrics by the selected metric name
    const filteredMetrics = metrics.filter(metric => metric.name === metricName);

    // Sort the metrics by date
    const sortedMetrics = [...filteredMetrics].sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );

    // Transform metrics into the format needed for the chart
    const formattedData = sortedMetrics.map(metric => ({
      date: new Date(metric.date).toLocaleDateString(),
      value: metric.value,
      notes: metric.notes
    }));

    setChartData(formattedData);
  }, [metricName, metrics]);

  // If no data is available
  if (chartData.length === 0) {
    return <div className="no-chart-data">No data available for this metric</div>;
  }

  return (
    <div className="metric-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [value, metricName]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name={metricName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricChart;
