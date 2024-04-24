import React from "react";
import { BtnSave } from "../ui/buttons/BtnSave";
import { Card } from "../ui/card/Card";
import { InputScore } from "./InputScore";
import { Match } from "@/types";

export const FormMatch = ({ data }: { data: Match }) => {
  // const {
  //   data: { user },
  // } = await getUserSession();
  const { homeTeam, awayTeam, id } = data;
  // console.log(user?.user_metadata.email);

  return (
    <form className=" flex flex-col ">
      <div className=" gap-3 grid grid-cols-3 place-items-center">
        <Card url={homeTeam.crest!} shortName={homeTeam.shortName} />
        <div className=" flex gap-3">
          <InputScore />

          <InputScore />
        </div>
        <Card url={awayTeam.crest!} shortName={awayTeam.shortName} />
      </div>
      <BtnSave data={data} />
    </form>
  );
};
