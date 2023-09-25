import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 3766, 2113, 3213, 1232];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780];
const xLabels = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K'
];

export default function SimpleBarChart() {
  return (
    <BarChart
      width={800}
      height={300}
      series={[
        { data: pData, label: 'pv', color:"#4f39bf" },
        { data: uData, label: 'uv', color:"#cf6624"},
      ]}
      xAxis={[{ scaleType: 'band', data: xLabels }]}
    />
  );
}
