import React from "react";
import { Dispatch, SetStateAction, useContext, useMemo } from "react"
import DialogDefault from "./Dialog";
import { isNumString } from "./Functions";
interface Props {
  ability: any
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}


export default function AbiModal({ability, setIsOpen, isOpen}: Props) {
  const desc = useMemo(() => {
    let string = ""
    ability.description.forEach((desc:any) => {
      string += desc.content
      string += "\n"
      if (desc.subcontent) {
        desc.subcontent.forEach((subc:any) => {
          string += subc.content
        })
      }
    });
    return string
  }, [ability])

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