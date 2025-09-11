import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const getBadgeProps = (score: number) => {
  if (score > 70) {
    return {
      label: "Strong",
      className: "bd-badge-green text-green-600 bg-green-100",
    };
  } else if (score > 49) {
    return {
      label: "Good Start",
      className: "bd-badge-yellow text-yellow-700 bg-yellow-100",
    };
  } else {
    return {
      label: "Needs Work",
      className: "bd-badge-red text-red-600 bg-red-100",
    };
  }
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const { label, className } = getBadgeProps(score);

  return (
    <div className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${className}`}>
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;