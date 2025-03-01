import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc, isNumString } from "../Shared/Functions";
import { ArmyContext } from "@/app/context";
import Select from "react-tailwindcss-select";
import AttribCard from "../Shared/AttribCard";
interface Props {
  equipment: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  unitIndex?: number;
}

export default function AddEquipModal({
  setIsOpen,
  isOpen,
  unitIndex,
}: Props) {
  const {
    armyData,
    setArmyData,
    equipDataOptions,
    equipDataObj,
  } = useContext(ArmyContext);
  const [equipData, setEquipData] = useState<any>({});
  const onChangeSelect = (opt: any) => {
    setEquipData({ ...equipDataObj[opt.value] });
  };
  const desc = useMemo(() => {
    if (equipData.description) {
      return getDesc(equipData.description);
    }
  }, [equipData]);

  const addEquip = () => {
    setArmyData({
      ...armyData,
      equips: [...armyData.equips, {
        code: equipData.id,
        name: equipData.name,
        price: 0,
        priceType: "ducat",
        belongsTo: unitIndex }
      ]
    })
    setIsOpen(false)
  }
  
  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle="Get Equipment"
      >
        <div className="flex flex-col items-center w-96 parchment-bg p-2 mx-auto">
          <Select
            primaryColor="yellow"
            value={equipDataOptions.find((opt: any) => opt.value == equipData.id)}
            onChange={onChangeSelect}
            options={equipDataOptions}
            isSearchable={true}
          />
          {
            equipData?.eventtags?.action ? 
            <div className="grid grid-cols-3 my-2">
              <AttribCard title="Type" value={equipData.equip_type} />
              <AttribCard title="Range" value={equipData.range} />
              <AttribCard title="Modifiers" value={equipData.modifiers.join(", ")} />
            </div> :
            null
          }
          <div className="my-2">
            {desc}
          </div>
          <button className="darkwood p-2 rounded-md" onClick={addEquip}> Add </button>
        </div>
      </DialogDefault>
    </>
  );
}
