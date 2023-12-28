// DoughnutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  return (
    <Doughnut
      data={data}
      options={{
        cutout: 80,
      }}
    />
  );
};

export default DoughnutChart;
