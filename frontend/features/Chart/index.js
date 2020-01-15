import './styles.scss';
import React from 'react';
import {
  AreaChart, Area, CartesianGrid, ResponsiveContainer, YAxis, XAxis,
} from 'recharts';
import { dayjs } from '../../lib/moment';

// import Svg from '../Svg';
// eslint-disable-next-line
// import triangle from '../../assets/images/icon-triangle.svg?sprite';

let lastXAxisMonth = '';

const CustomizedXAxisTick = ({ x, y, payload }) => {
  const month = dayjs(+payload.value).format('MM/YY');

  if (month === lastXAxisMonth) {
    return null;
  }

  lastXAxisMonth = month;

  const DD = dayjs(+payload.value).format('DD');
  const MM = dayjs(+payload.value).format('MMM');

  return (
    <g transform={`translate(${x},${y})`} style={{ textTransform: 'uppercase', fontSize: '9px' }}>
      <line x={0} y={0} stroke="#aaa" opacity={0.65} fill="none" x1={0} y1={-8} />
      <text x={4} y={0} dy={4} textAnchor="start" fill="#111" opacity={0.65}>
        {DD}
      </text>
      <text x={4} y={10} dy={4} textAnchor="start" fill="#111">
        {MM}
      </text>
    </g>
  );
};

const CustomizedYAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`} style={{ textTransform: 'uppercase', fontSize: '9px' }}>
    <text x={0} y={0} dy={-4} textAnchor="start" fill="#111">
      {payload.value}
    </text>
  </g>
);

const getStyleOpts = (diff) => {
  let styleOpts = { color: '#757575' };

  if (+diff > 0) {
    styleOpts = { color: '#30825d' };
  }

  if (+diff < 0) {
    styleOpts = { color: '#da372d' };
  }

  return styleOpts;
};

const getDiff = (current, prev) => (
  Number(current - prev).toFixed(4)
);

const Chart = ({ data, id, count = 24 }) => {
  const woFirstDayChart = data.slice(1);
  const severalDays = woFirstDayChart.slice(woFirstDayChart.length - (count + 1));
  const woFirstDaySeveralDays = severalDays.slice(1);
  const formatDate = (value) => dayjs(value).format('DD MMM');

  return (
    <div className="chart">
      <div className="chart__img">
        <ResponsiveContainer>
          <AreaChart data={woFirstDayChart} id={`chart-${id}`} margin={{ top: 14 }}>
            <defs>
              <linearGradient id={`colorBid-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffdd05" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#ffdd05" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <XAxis dataKey="date" tick={<CustomizedXAxisTick />}
                   tickLine={false} axisLine={{ stroke: '#aaa', opacity: 0.6 }}
                   interval={0}
            />

            <YAxis tick={<CustomizedYAxisTick />}
                   tickLine={false}
                   domain={[
                     (dataMin) => Number(dataMin - (dataMin / 400)).toFixed(4),
                     (dataMax) => Number(dataMax + (dataMax / 1000)).toFixed(4),
                   ]}
                   mirror={true}
                   axisLine={false}
            />

            <Area dataKey='bid' fillOpacity={1} strokeWidth={2} stroke="#aaa" strokeOpacity={0.4} fill={`url(#colorBid-${id})`}
                  isAnimationActive={false} minPointSize={3}
            />

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart__data">
        {woFirstDaySeveralDays.map((un, i) => {
          const diff = getDiff(un.bid, severalDays[i].bid);
          const styleOpts = getStyleOpts(diff);

          return (
            <div className="chart__rate" key={un.date}>
              <div className="chart__date">{formatDate(un.date)}</div>
              <div className="chart__rate-value">{un.bid}</div>
              <i className="chart__rate-diff" style={ styleOpts }>{diff}</i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
