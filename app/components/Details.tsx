import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordian"; // adjust import path
import { cn } from "~/lib/utils";

// --- Types ---
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface FeedbackCategory {
  score: number;
  tips: Tip[];
}

interface Feedback {
  toneAndStyle: FeedbackCategory;
  content: FeedbackCategory;
  structure: FeedbackCategory;
  skills: FeedbackCategory;
}

interface DetailsProps {
  feedback: Feedback;
}

// --- ScoreBadge ---
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const status = score > 69 ? "good" : score > 39 ? "warn" : "bad";

  const map = {
    good: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: "/icons/check.svg",
    },
    warn: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: "/icons/warning.svg",
    },
    bad: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: "/icons/close.svg",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full font-semibold text-sm",
        map.bg,
        map.text
      )}
    >
      <img src={map.icon} alt={status} className="w-4 h-4" />
      {score}/100
    </span>
  );
};

// --- CategoryHeader ---
const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({
  title,
  categoryScore,
}) => (
  <div className="flex items-center justify-between w-full">
    <span className="font-semibold text-lg">{title}</span>
    <ScoreBadge score={categoryScore} />
  </div>
);

// --- CategoryContent ---
const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => (
  <div className="mt-3 space-y-4">
    {/* Grid of tips */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tips.map((tip, idx) => {
        const icon =
          tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg";
        const textColor =
          tip.type === "good" ? "text-green-700" : "text-yellow-700";
        return (
          <div key={idx} className="flex items-start gap-2">
            <img src={icon} alt={tip.type} className="w-5 h-5 mt-0.5" />
            <span className={cn("font-medium", textColor)}>{tip.tip}</span>
          </div>
        );
      })}
    </div>

    {/* Explanations */}
    <div className="flex flex-col gap-2">
      {tips.map((tip, idx) => (
        <div
          key={idx}
          className={cn(
            "rounded-lg p-3 border-l-4",
            tip.type === "good"
              ? "bg-green-50 border-green-400 text-green-800"
              : "bg-yellow-50 border-yellow-400 text-yellow-800"
          )}
        >
          {tip.explanation}
        </div>
      ))}
    </div>
  </div>
);

// --- Main Component ---
const Details: React.FC<DetailsProps> = ({ feedback }) => {
  const categories: { key: keyof Feedback; title: string }[] = [
    { key: "toneAndStyle", title: "Tone & Style" },
    { key: "content", title: "Content" },
    { key: "structure", title: "Structure" },
    { key: "skills", title: "Skills" },
  ];

  return (
    <Accordion allowMultiple={false} className="w-full">
      {categories.map(({ key, title }) => {
        const catData = feedback[key];
        if (!catData) return null;

        return (
          <AccordionItem key={key} id={key}>
            <AccordionHeader itemId={key}>
              <CategoryHeader title={title} categoryScore={catData.score} />
            </AccordionHeader>
            <AccordionContent itemId={key}>
              <CategoryContent tips={catData.tips} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Details;
