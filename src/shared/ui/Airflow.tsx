import React from 'react';

interface AirflowProps {
  className?: string;
  color?: string;
  opacity?: number;
  width?: number;
  height?: number;
}

// Декоративные «потоки воздуха»: 5 волнистых линий с бегущим штрихом (.airflow в globals.css)
const Airflow: React.FC<AirflowProps> = ({
  className = '',
  color = '#2EB1B0',
  opacity = 0.35,
  width: w = 1440,
  height: h = 600,
}) => (
  <svg
    className={`airflow pointer-events-none ${className}`}
    viewBox={`0 0 ${w} ${h}`}
    preserveAspectRatio='none'
    stroke={color}
    style={{ opacity }}
    aria-hidden='true'>
    {[0.2, 0.34, 0.48, 0.62, 0.78].map((k, i) => {
      const y = h * k;
      const a = 40 + i * 14;
      return (
        <path
          key={k}
          strokeWidth={1.2 + (i % 2) * 0.8}
          d={`M-40 ${y} C ${w * 0.2} ${y - a}, ${w * 0.35} ${y + a}, ${w * 0.55} ${y} S ${w * 0.85} ${y - a}, ${w + 40} ${y + a / 2}`}
        />
      );
    })}
  </svg>
);

export default Airflow;
