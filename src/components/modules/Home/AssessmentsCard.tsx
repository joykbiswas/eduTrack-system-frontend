/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";

export default function AssessmentItem({ q }: { q: any }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <div className="text-sm p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-4">
          <span className="text-slate-700 font-medium">{q.question}</span>
          <button 
            onClick={() => setShow(!show)}
            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
            title={show ? "Hide Answer" : "Show Answer"}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        
        {show && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Answer:</span>
            <Badge 
              variant="outline" 
              className={`text-[10px] ${q.answer ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}
            >
              {q.answer ? "True" : "False"}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}