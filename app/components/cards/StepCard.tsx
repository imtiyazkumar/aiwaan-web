import React from "react";
import { CheckCircle, Clock } from "lucide-react";

interface Step {
    number: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    details?: string[];
    duration?: string;
}

interface StepCardProps {
    step: Step;
}

const StepCard: React.FC<StepCardProps> = ({ step }) => {
    return (
        <li className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-emerald-300 hover:shadow-md sm:p-6 motion-reduce:transition-none">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100">
                        {step.icon || <span className="font-semibold">{step.number}</span>}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Step {String(step.number).padStart(2, '0')}</span>
                </div>

                <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{step.title}</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600">{step.description}</p>
                {step.duration && (
                    <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                        <Clock size={12} className="mr-1" />
                        {step.duration}
                    </div>
                )}

                {step.details?.length ? (
                    <ul className="mt-auto space-y-2.5 border-t border-slate-100 pt-4">
                        {step.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm leading-5 text-slate-600">
                                <CheckCircle aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                                <span>{d}</span>
                            </li>
                        ))}
                    </ul>
                ) : null}
        </li>
    );
};

export default StepCard;
