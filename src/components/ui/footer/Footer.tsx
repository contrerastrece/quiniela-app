import React from "react";

export const Footer = () => {
  return (
    <div className="text-slate-400 text-xs max-w-2xl mx-auto my-4 flex items-center justify-center">
      <span className="border border-t-0 border-slate-500 flex-grow"></span>
      <span className="mx-2">Created by Vcontreras {}</span>
      <span className="text-slate-400 mx-2">© {new Date().getFullYear()}</span>
      <span className="border border-t-0 h-0 border-slate-500 flex-grow"></span>
    </div>
  );
};
