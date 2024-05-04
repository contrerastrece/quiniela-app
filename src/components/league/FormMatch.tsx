"use client";
import React, { useState } from "react";
import { BtnSave } from "../ui/buttons/BtnSave";
import { Card } from "../ui/card/Card";
import { InputScore } from "./InputScore";
import { ItemResult, Match } from "@/types";
import moment from "moment";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type propsMatch = {
  data: Match;
};
export const FormMatch = ({ data }: propsMatch) => {
  const getDate = moment(data.utcDate).format(" hh:mm A");
  const { homeTeam, awayTeam, id } = data;
  const getQuiniela = useQuinielaStore((state) => state.getQuiniela);
  const { data: predictionsUser,isLoading } = useQuery({
    queryKey: ["predictionsUser"],
    queryFn: async () => {
      return await getQuiniela();
    },
  });
  const objFilter = predictionsUser?.find((obj) => obj.id_match === id);
  // console.log(objFilter)
  const existMatch = predictionsUser?.some((obj) => obj.id_match === id);
  

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState( 0);
  const handleHomeScoreChange = (value: number) => {
    setHomeScore(value);
  };

  const handleAwayScoreChange = (value: number) => {
    setAwayScore(value);
  };

  return (
    <form className=" flex flex-col">
      <p className="text-xs text-teal-400  text-center">{getDate}</p>
      <div className=" gap-3 grid grid-cols-3 place-items-center">
        <Card url={homeTeam.crest!} shortName={homeTeam.shortName} />
        <div className=" flex gap-3 items-center">
          <InputScore value={homeScore} onChange={handleHomeScoreChange} scoreUser={objFilter?.score_home}/>
          :
          <InputScore value={awayScore} onChange={handleAwayScoreChange} scoreUser={objFilter?.score_visit}/>
        </div>
        <Card url={awayTeam.crest!} shortName={awayTeam.shortName} />
      </div>
      <BtnSave
        data={data}
        homeScore={homeScore}
        awayScore={awayScore}
        existMatch={existMatch!}
      />
    </form>
  );
};
