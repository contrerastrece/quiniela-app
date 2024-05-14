import { CardCompetition, CardDefault } from "@/components";
import React from "react";

const HomePage = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/api`);
  const data = await response.json();
  return (
    <div className="grid grid-cols-2 gap-4 p-2  max-w-2xl mx-auto">
      <CardDefault />
      {data.competitions.map((c: any) => (
        <CardCompetition data={c} key={c.id} />
      ))}
    </div>
  );
};

export default HomePage;
