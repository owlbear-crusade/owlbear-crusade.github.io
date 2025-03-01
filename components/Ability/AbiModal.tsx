import React from "react";
import { Dispatch, SetStateAction, useContext, useMemo } from "react"
import DialogDefault from "../Shared/Dialog";
import { getDesc } from "../Shared/Functions";
interface Props {
  ability: any
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}


export default function AbiModal({ability, setIsOpen, isOpen}: Props) {
  const desc = getDesc(ability.description)

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle={ability.name}
      >
        <div className="flex flex-col items-center max-w-96 parchment-bg p-2 mx-auto">
          {desc}
        </div>
      </DialogDefault>
    </>
  );
}