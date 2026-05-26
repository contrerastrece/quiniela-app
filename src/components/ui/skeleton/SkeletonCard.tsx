export const SkeletonCard = () => (
  <div className="py-3 px-2 md:px-3 rounded-md flex flex-col bg-[rgb(40,46,58)] mb-2 animate-pulse">
    <div className="mb-4 flex justify-between items-center px-4 py-1 bg-slate-600/50 rounded-md h-8" />
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 place-items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <div className="w-[50px] h-[50px] bg-slate-600/50 rounded-md" />
          <div className="w-16 h-3 bg-slate-600/50 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-slate-600/50 rounded" />
          <div className="w-8 h-8 bg-slate-600/50 rounded" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-[50px] h-[50px] bg-slate-600/50 rounded-md" />
          <div className="w-16 h-3 bg-slate-600/50 rounded" />
        </div>
      </div>
      <div className="w-full h-8 bg-slate-600/50 rounded-md mt-3" />
    </div>
  </div>
);

export const SkeletonTicket = () => (
  <div className="flex flex-col gap-1 bg-slate-500/10 p-2 rounded-md animate-pulse">
    <div className="w-32 h-3 bg-slate-600/50 rounded mb-2" />
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
        <div className="w-20 h-3 bg-slate-600/50 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-4 h-4 bg-slate-600/50 rounded" />
        <div className="w-4 h-4 bg-slate-600/50 rounded" />
      </div>
    </div>
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5 bg-slate-600/50 rounded-full" />
        <div className="w-20 h-3 bg-slate-600/50 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-4 h-4 bg-slate-600/50 rounded" />
        <div className="w-4 h-4 bg-slate-600/50 rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonRank = () => (
  <div className="flex justify-between px-2 items-center py-2 animate-pulse">
    <div className="flex gap-2 items-center">
      <div className="w-5 h-5 bg-slate-600/50 rounded" />
      <div className="w-6 h-6 bg-slate-600/50 rounded-full" />
      <div className="w-24 h-3 bg-slate-600/50 rounded" />
    </div>
    <div className="w-8 h-3 bg-slate-600/50 rounded" />
  </div>
);
