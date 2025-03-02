import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc } from "../Shared/Functions";
import { ArmyContext } from "@/app/context";
import AttribCard from "../Shared/AttribCard";
import { GiChaingun, GiFist, GiHorizontalFlip } from "react-icons/gi";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  removeEquip: (id: string) => void;
  equip: { name: string; id: string };
}

export default function EquipModal({
  setIsOpen,
  isOpen,
  removeEquip,
  equip,
}: Props) {
  const { equipDataObj } = useContext(ArmyContext);
  const onClickRemoveEquip = () => {
    removeEquip(equip.id);
    setIsOpen(false);
  };
  const equipData = useMemo(() => equipDataObj[equip.id], [equip]);

  const desc = useMemo(() => {
    if (equipData?.description) {
      return getDesc(equipData?.description);
    }
  }, [equipData]);

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle={equip.name}
      >
        <div className="flex w-96 parchment-bg px-1 mx-auto">
          {equipData?.tags
            ? equipData.tags.map((tag: any) => (
                <div
                  key={tag.tag_name}
                  className={`darkwood rounded-md cursor-pointer m-1 p-1 text-sm`}
                >
                  {tag.tag_name ? tag.tag_name : "unnamed"}
                </div>
              ))
            : null}
        </div>
        <div className="flex flex-col items-center w-96 parchment-bg px-1 mx-auto">
          {equipData?.eventtags?.action ? (
            <div className="grid grid-cols-3 my-2">
              <AttribCard icon={<GiFist />} value={equipData.equip_type} />
              <AttribCard icon={<GiHorizontalFlip />} value={equipData.range} />
              <AttribCard
                icon={<GiChaingun />}
                value={equipData.modifiers.join(", ")}
              />
            </div>
          ) : null}
          {desc}
          <button
            className="darkwood p-2 rounded-md"
            onClick={onClickRemoveEquip}
          >
            Remove
          </button>
        </div>
      </DialogDefault>
    </>
  );
}
