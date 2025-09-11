import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const getGradient = (score: number) => {
  if (score > 69) return "from-green-100";
  if (score > 49) return "from-yellow-100";
  return "from-red-100";
};

const getIcon = (score: number) => {
  if (score > 69) return "/icons/ats-good.svg";
  if (score > 49) return "/icons/ats-warning.svg";
  return "/icons/ats-bad.svg";
};

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const gradient = getGradient(score);
  const icon = getIcon(score);

  return (
    <div
      className={`rounded-2xl p-6 bg-gradient-to-b ${gradient} to-white shadow-md flex flex-col gap-4`}
    >
      <div className="flex items-center gap-4">
        <img src={icon} alt="ATS icon" className="w-12 h-12" />
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            ATS Score: {score}/100
          </h3>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mt-2">
          ATS Analysis
        </h4>
        <p className="text-gray-500 text-sm mb-3">
          This score reflects how well your resume matches the job description
          and passes automated screening systems.
        </p>
        <ul className="flex flex-col gap-2 mb-2">
          {suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <img
                src={
                  s.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                }
                alt={s.type}
                className="w-5 h-5 mt-0.5"
              />
              <span
                className={
                  s.type === "good" ? "text-green-700" : "text-yellow-700"
                }
              >
                {s.tip}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-gray-600 text-sm mt-2">
          Keep improving your resume for a better match!
        </div>
      </div>
    </div>
  );
};

export default ATS;
