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

/**
 * MetricChart component that displays a line chart for a specific metric.
 *
 * @param {Object} props - Component props
 * @param {string} props.metricName - The name of the metric to display
 * @param {Array} props.metrics - Array of metric data objects
 */
const MetricChart = ({ metricName, metrics = [] }) => {
  // State to store the processed chart data
  const [chartData, setChartData] = useState([]);

  // Process metrics data when metricName or metrics change
  useEffect(() => {
    // Make sure we have data to work with
    if (!Array.isArray(metrics) || metrics.length === 0 || !metricName) {
      setChartData([]);
      return;
    }

    console.log(`Processing chart data for metric: ${metricName}`);

    // Filter metrics by the selected metric name
    const filteredMetrics = metrics.filter(metric =>
      metric && metric.name === metricName
    );

    // Sort the metrics by date
    const sortedMetrics = [...filteredMetrics].sort((a, b) => {
      // Handle potential null dates
      if (!a.date) return -1;
      if (!b.date) return 1;

      return new Date(a.date) - new Date(b.date);
    });

    // Transform metrics into the format needed for the chart
    const formattedData = sortedMetrics.map(metric => ({
      date: new Date(metric.date).toLocaleDateString(),
      value: parseFloat(metric.value) || 0, // Ensure numeric value
      notes: metric.description || ''
    }));

    // Update chart data state
    setChartData(formattedData);
  }, [metricName, metrics]);

  // If no data is available for this metric
  if (chartData.length === 0) {
    return (
      <div className="text-center p-4 bg-light rounded">
        <i className="bi bi-bar-chart-line text-muted fs-1"></i>
        <p className="mt-3 text-muted">No data available for this metric</p>
      </div>
    );
  }

  return (
    <div className="metric-chart">
      <h4 className="text-center mb-3">{metricName} Over Time</h4>

      {/* The ResponsiveContainer makes the chart resize with its parent container */}
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
          {/* Grid lines behind the chart */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* X axis showing dates */}
          <XAxis
            dataKey="date"
            label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }}
          />

          {/* Y axis for metric values */}
          <YAxis
            label={{ value: 'Value', angle: -90, position: 'insideLeft', offset: -5 }}
          />

          {/* Tooltip shown on hover */}
          <Tooltip
            formatter={(value) => [`${value}`, metricName]}
            labelFormatter={(label) => `Date: ${label}`}
          />

          {/* Chart legend */}
          <Legend verticalAlign="top" height={36} />

          {/* The actual data line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name={metricName}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricChart;
