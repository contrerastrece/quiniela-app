"use client";
import { useUserStore } from "@/store/user/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaMedal, FaTrophy } from "react-icons/fa";
import { IoMdMedal } from "react-icons/io";

export const Rank = () => {
  const getUsers = useUserStore((state) => state.getUsers);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsers();
    },
  });
  // console.log(data);
  return (
    <div className="">
      <Fade cascade direction="down">
        <ul className="flex flex-col justify-center gap-2">
          {data?.map((user, index) => (
            <li
              key={user.id}
              className="text-white text-xs flex justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                {index + 1 === 1 && (
                  <FaTrophy size={20} className="text-yellow-300" />
                )}
                {index + 1 === 2 && (
                  <IoMdMedal size={20} className="text-gray-300 " />
                )}
                {index + 1 === 3 && (
                  <FaMedal size={20} className="text-orange-500" />
                )}
                {index + 1 > 3 && <span className="w-[20px] text-center font-bold">{index + 1}.</span>}
                <Image
                  src={user.url_image}
                  width={25}
                  height={25}
                  alt={user.name}
                  className="rounded-full "
                />
                {user.name}
              </div>
              <span>{user.total_points}</span>
            </li>
          ))}
        </ul>
      </Fade>
    </div>
  );
};
