import React from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { PieChart } from '@mui/x-charts/PieChart';

const desktopOS = [
  {
    label: 'Windows',
    value: 72.72,
  },
  {
    label: 'OS X',
    value: 16.38,
  },
  {
    label: 'Linux',
    value: 3.83,
  },
  {
    label: 'Chrome OS',
    value: 2.42,
  },
  {
    label: 'Other',
    value: 4.65,
  },
];

export default function InterfaceAnalysis() {
  return (
    <PageContainer>
      <PieChart
        series={[
          {
            data: desktopOS,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter: (item: { value: number }) => `${item.value}%`,
          },
        ]}
        height={200}
      />
    </PageContainer>
  )
}
