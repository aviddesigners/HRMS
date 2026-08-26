import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AttendanceChart: React.FC = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Present',
        data: [42, 45, 44, 46, 43, 38],
        backgroundColor: '#10B981',
        borderRadius: 4
      },
      {
        label: 'Late',
        data: [3, 2, 4, 1, 2, 3],
        backgroundColor: '#F59E0B',
        borderRadius: 4
      },
      {
        label: 'On Leave',
        data: [2, 1, 1, 2, 3, 4],
        backgroundColor: '#FF5B37',
        borderRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          font: { family: 'Inter', size: 12 }
        }
      },
      tooltip: {
        padding: 10,
        backgroundColor: '#1E293B',
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 12 }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 } }
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: { font: { family: 'Inter', size: 11 } }
      }
    }
  };

  return (
    <div style={{ height: '260px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export const RevenueExpenseChart: React.FC = () => {
  const data = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [5800000, 6900000, 7400000, 8900000, 9400000, 10200000],
        borderColor: '#FF5B37',
        backgroundColor: 'rgba(255, 91, 55, 0.1)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#FF5B37',
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Expenses (₹)',
        data: [3200000, 3600000, 3800000, 4200000, 4800000, 5140000],
        borderColor: '#64748B',
        backgroundColor: 'rgba(100, 116, 139, 0.05)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#64748B',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          font: { family: 'Inter', size: 12 }
        }
      },
      tooltip: {
        padding: 10,
        backgroundColor: '#1E293B',
        callbacks: {
          label: (context: any) => ` ${context.dataset.label}: ₹${(context.parsed.y / 100000).toFixed(1)} Lakh`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 } }
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: {
          font: { family: 'Inter', size: 11 },
          callback: (value: any) => `₹${value / 100000}L`
        }
      }
    }
  };

  return (
    <div style={{ height: '260px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export const DepartmentDoughnutChart: React.FC = () => {
  const data = {
    labels: ['UI/UX Design', 'Engineering', 'Human Resources', 'Sales & Marketing', 'Finance & Ops'],
    datasets: [
      {
        data: [14, 18, 5, 8, 4],
        backgroundColor: ['#FF5B37', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          font: { family: 'Inter', size: 11 },
          padding: 12
        }
      }
    }
  };

  return (
    <div style={{ height: '240px', width: '100%', position: 'relative' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export const RecruitmentFunnelChart: React.FC = () => {
  const data = {
    labels: ['Applied', 'Screening', 'Interview', 'Assessment', 'Offered', 'Hired'],
    datasets: [
      {
        label: 'Candidates',
        data: [158, 64, 28, 14, 6, 4],
        backgroundColor: [
          '#64748B',
          '#3B82F6',
          '#F59E0B',
          '#8B5CF6',
          '#FF5B37',
          '#10B981'
        ],
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        padding: 10,
        backgroundColor: '#1E293B'
      }
    },
    scales: {
      x: {
        grid: { color: '#F1F5F9' },
        ticks: { font: { family: 'Inter', size: 11 } }
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 12, weight: 500 } }
      }
    }
  };

  return (
    <div style={{ height: '240px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
