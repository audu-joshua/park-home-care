import React from "react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "No items to show.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
      <div className="text-slate-400 mb-4">{/* icon placeholder */}</div>
      <h3 className="font-bold text-lg text-[#081630] mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">{description}</p>
      {action}
    </div>
  );
}
