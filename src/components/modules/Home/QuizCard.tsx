/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function QuizCard({ quiz, index }: { quiz: any; index: number }) {
  const [show, setShow] = useState(false);

  return (
    <div className="p-5 bg-white rounded-xl border border-slate-200 border-l-4 border-l-indigo-500 shadow-sm">
      <p className="text-sm font-bold text-slate-800 mb-4">Q{index + 1}: {quiz.question}</p>
      
      <div className="space-y-2">
        {quiz.options && Object.entries(quiz.options).map(([key, val]) => (
          <div key={key} className={`flex items-center p-3 rounded-lg text-xs font-medium border ${
            show && key === quiz.correctAnswer 
            ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
            : "bg-slate-50 border-slate-100 text-slate-700"
          }`}>
            <span className={`w-5 h-5 flex items-center justify-center border rounded mr-3 font-bold ${
              show && key === quiz.correctAnswer ? "bg-emerald-500 text-white border-none" : "bg-white"
            }`}>{key}</span>
            {val as string}
          </div>
        ))}
      </div>

      <button 
        onClick={() => setShow(!show)}
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        {show ? "Hide Answer" : "Show Answer"}
      </button>

      {show && (
        <div className="mt-2 text-[11px] font-bold text-emerald-600 px-1">
          Correct Option: {quiz.correctAnswer}
        </div>
      )}
    </div>
  );
}