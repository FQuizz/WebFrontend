interface Props {
  percentage: number;
  radius: number;
  indicator?: number;
  showIndicator?: boolean;
}

export default function PercentageBar({
  percentage,
  radius,
  indicator = 12,
  showIndicator = true,
}: Props) {
  const size = radius * 2 + 10; // padding around the circle
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="text-gray-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${
            percentage < 30
              ? "text-red-500"
              : percentage < 60
              ? "text-yellow-500"
              : percentage < 80
              ? "text-green-500"
              : "text-emerald-500"
          } transition-all duration-700`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percentage / 100)}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {showIndicator && (
        <div
          className="absolute font-bold text-gray-800"
          style={{ fontSize: indicator }}
        >
          {String(percentage)}%
        </div>
      )}
    </div>
  );
}
