'use client'

interface FilterStatusProps {
  status: string;
  setState: (status: string) => void;
}

export const FilterStatus = ({ status, setState }: FilterStatusProps) => {
  const statusList = [
    { name: "Todos", state: '' },
    { name: "Finalizados", state: 'FINISHED' },
    { name: "En Vivo", state: 'IN_LIVE' },
    { name: "Próximos", state: 'TIMED' },
  ];

  return (
    <div className="flex gap-2 my-2">
      {statusList.map((s) => (
        <button
          key={s.name}
          onClick={() => setState(s.name)}
          className={`px-2 py-1 text-white rounded-md transition-colors ${
            s.name === status
              ? "bg-teal-400 font-semibold hover:bg-teal-500"
              : "bg-slate-500 font-regular hover:bg-slate-600"
          }`}
        >
          <span className="uppercase text-xs flex flex-col gap-1">
            <p>{s.name}</p>
          </span>
        </button>
      ))}
    </div>
  );
};
