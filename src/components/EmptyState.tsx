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
    <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-10 text-center min-w-0 overflow-hidden">
      <h3 className="font-bold text-base sm:text-lg text-[#081630] mb-2 break-words">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 break-words">{description}</p>
      {action}
    </div>
  );
}
