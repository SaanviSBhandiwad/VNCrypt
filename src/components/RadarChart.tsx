interface RadarChartProps {
  detectionTime: number;
  maxDetectionTime: number;
  toolsUsed: number;
}

const RadarChart = ({ detectionTime, maxDetectionTime, toolsUsed }: RadarChartProps) => {
  // Calculate scores (0-100)
  const detectionSpeed = Math.max(0, Math.min(100, ((maxDetectionTime - detectionTime) / maxDetectionTime) * 100));
  const defenseAccuracy = Math.max(60, 100 - (toolsUsed * 8)); // Fewer tools = better accuracy
  const resourceUsage = Math.max(50, 100 - (toolsUsed * 10)); // Fewer tools = less resources
  const bestPractice = Math.min(100, 70 + (detectionSpeed / 5)); // Based on speed
  const threatResponse = Math.min(100, detectionSpeed + 10);

  const metrics = [
    { label: "Detection Speed", value: detectionSpeed, angle: 0 },
    { label: "Defense Accuracy", value: defenseAccuracy, angle: 72 },
    { label: "Resource Usage", value: resourceUsage, angle: 144 },
    { label: "Best Practices", value: bestPractice, angle: 216 },
    { label: "Threat Response", value: threatResponse, angle: 288 },
  ];

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100;

  const polarToCartesian = (angle: number, radius: number) => {
    const angleRad = ((angle - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  };

  // Create data points
  const dataPoints = metrics.map((metric) => {
    const radius = (metric.value / 100) * maxRadius;
    return polarToCartesian(metric.angle, radius);
  });

  const pathData = dataPoints.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className="w-full h-full flex flex-col items-center">
      <svg width="300" height="300" viewBox="0 0 300 300" className="mb-4">
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((percent) => (
          <circle
            key={percent}
            cx={centerX}
            cy={centerY}
            r={(percent / 100) * maxRadius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Grid lines */}
        {metrics.map((metric) => {
          const point = polarToCartesian(metric.angle, maxRadius);
          return (
            <line
              key={metric.angle}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Data area */}
        <path
          d={pathData}
          fill="hsl(var(--primary) / 0.3)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
          />
        ))}

        {/* Labels */}
        {metrics.map((metric) => {
          const labelPoint = polarToCartesian(metric.angle, maxRadius + 25);
          return (
            <text
              key={metric.label}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              className="text-xs fill-foreground"
              dominantBaseline="middle"
            >
              {metric.label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">{metric.label}: {Math.floor(metric.value)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadarChart;
