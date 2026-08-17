import Image from "next/image";
import React from "react";

export default function LoadingLogo() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-36 h-36 mb-6 animate-pulse">
        <Image src="/images/Icon 2.webp" alt="Logo" fill className="object-contain" />
      </div>

      <div className="flex items-center gap-2">
        <span className="dot" style={{ animationDelay: "0s" }} />
        <span className="dot" style={{ animationDelay: "0.15s" }} />
        <span className="dot" style={{ animationDelay: "0.3s" }} />
      </div>

      <style>{`
        .dot {
          width: 10px;
          height: 10px;
          display: inline-block;
          border-radius: 9999px;
          background: #EE7862;
          opacity: 0.35;
          transform: translateY(0);
          animation: dot-bounce 900ms infinite ease-in-out;
        }
        @keyframes dot-bounce {
          0% { opacity: 0.35; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-8px); }
          80% { opacity: 0.5; transform: translateY(0); }
          100% { opacity: 0.35; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
