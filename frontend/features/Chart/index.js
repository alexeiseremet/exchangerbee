import React from 'react';
import { BarChart, Bar, YAxis, XAxis } from 'recharts';
import { moment } from '../../lib/moment';

const CustomizedAxisTick = ({ x, y, payload }) => {
  const date = moment(+payload.value).format('DD MMM');

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="middle" fill="#111"
            opacity="0.65" style={{ textTransform: 'uppercase', fontSize: '9px' }}
      >
        {date}
      </text>
    </g>
  )
};

const Chart = ({ id, data }) => (
  <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
    <BarChart width={728} height={96} data={data} id={`chart-${id}`} margin={{ top: 14 }} barCategoryGap={'5%'}>
      <XAxis dataKey="date" tick={<CustomizedAxisTick/>}
             tickLine={{ size: 10, stroke: '#aaa' }} axisLine={{ stroke: '#aaa' }}
      />
      <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
      <Bar dataKey='bid' fill="#ffdd05" fillOpacity="0.4" isAnimationActive={false} minPointSize={3}
           label={{ position: 'top', marginTop: 20, fontSize: 10 }} />
    </BarChart>
  </div>
);

export default Chart;
