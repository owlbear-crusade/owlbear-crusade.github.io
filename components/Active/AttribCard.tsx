import React from "react";

interface Props {
  title: string;
  value: number
}
export default function AttribCard({title, value}: Props) {
  return (
    <div
      className={`parchment-input rounded-md m-1 px-1 text-sm col-span-1 py-2`}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      {value}
    </div>
  );
}
