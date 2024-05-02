"use client";
import { useUserStore } from "@/store/user/userStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Fade } from "react-awesome-reveal";

export const Rank = () => {
  const getUsers = useUserStore((state) => state.getUsers);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsers();
    },
  });
  return (
    <div className="">
      <Fade cascade direction="down">
        <ul className="flex flex-col justify-center gap-2">
          {data?.map((user, index) => (
            <li
              key={user.id}
              className="text-white text-xs flex  justify-between "
            >
              <div className="flex gap-2 items-center">
                {index + 1}.
                <Image
                  src={user.url_image}
                  width={25}
                  height={25}
                  alt={user.name}
                  className="rounded-full "
                />
                {user.name}
              </div>
              <span>42 pts</span>
            </li>
          ))}
        </ul>
      </Fade>
    </div>
  );
};
