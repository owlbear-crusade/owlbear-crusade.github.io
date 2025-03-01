import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc, isNumString } from "../Shared/Functions";
import { ArmyContext } from "@/app/context";
import Select from "react-tailwindcss-select";
import AttribCard from "../Shared/AttribCard";
import { Equip } from "@/types/global";
interface Props {
  equipment: Equip;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export default function EquipModal({
  equipment,
  setIsOpen,
  isOpen,
}: Props) {
  const {
    armyData,
    setArmyData,
    equipDataObj,
  } = useContext(ArmyContext);
  const equipData = useMemo(() => equipDataObj[equipment.code], [equipment])
  const desc = useMemo(() => {
    if (equipData.description) {
      return getDesc(equipData.description);
    }
  }, [equipData]);

  const removeEquip = () => {
    setArmyData({
      ...armyData,
      equips: [...armyData.equips.filter(e => e !== equipment)]
    })
    setIsOpen(false)
  }
  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle={equipment.name}
      >
        <div className="flex flex-col items-center w-96 parchment-bg p-2 mx-auto">
          {
            equipData?.eventtags?.action ? 
            <div className="grid grid-cols-3 my-2">
              <AttribCard title="Type" value={equipData.equip_type} />
              <AttribCard title="Range" value={equipData.range} />
              <AttribCard title="Mod" value={equipData.modifiers.join(", ")} />
            </div> :
            null
          }
          <div className="my-2">
            {desc}
          </div>
          <button className="darkwood p-2 rounded-md" onClick={removeEquip}> Remove </button>
        </div>
      </DialogDefault>
    </>
  );
}
