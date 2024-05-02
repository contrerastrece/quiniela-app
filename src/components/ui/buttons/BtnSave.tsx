// "use client";
import { useQuinielaStore } from "@/store/quiniela/quiniela-store";
import { useUserStore } from "@/store/user/userStore";
import { Match } from "@/types";

interface BtnSaveProps {
  data: Match;
  homeScore: number;
  awayScore: number;
  existMatch: boolean;
}

export const BtnSave = ({
  data,
  homeScore,
  awayScore,
  existMatch,
}: BtnSaveProps) => {
  const user = useUserStore((state) => state.user);
  const { insertQuiniela } = useQuinielaStore();
  const { id, homeTeam, awayTeam } = data;
  // console.log(user);
  // console.log(existMatch);

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const quiniela = {
      id_user: user!.id,
      image_home: homeTeam.crest,
      image_visit: awayTeam.crest,
      name_home: homeTeam.shortName,
      name_visit: awayTeam.shortName,
      score_home: homeScore,
      score_visit: awayScore,
      id_match: id.toString(),
    };
    await insertQuiniela(quiniela);
  };
  return (
    <button
      className={`bg-teal-600 text-white transition-colors duration-75 rounded-md py-2 mt-3  ${
        existMatch ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-500"
      }`}
      onClick={(e) => handleSave(e)}
      disabled={existMatch}
    >
      {existMatch ? "Saved" : "Save"}
    </button>
  );
};
