"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NProgressBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProgressBar height="3px"
        color="#2DD4BF"
        options={{ showSpinner: true }}
        shallowRouting
      />
      {children}
    </>
  );
}
