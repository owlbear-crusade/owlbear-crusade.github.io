import React, { ReactElement } from "react";
import { IconType } from "react-icons";

interface Props {
  icon: ReactElement;
  value: number | string
}
export default function AttribCard({icon, value}: Props) {
  return (
    <div
      className={`parchment-input rounded-md m-1 px-1 text-sm col-span-1 py-2`}
    >
      {icon}
      {value}
    </div>
  );
}
