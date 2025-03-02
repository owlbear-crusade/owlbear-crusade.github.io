import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc } from "../Shared/Functions";
import { ArmyContext } from "@/app/context";
import Select from "react-tailwindcss-select";
import AttribCard from "../Shared/AttribCard";
import { GiChaingun, GiFist, GiHorizontalFlip } from "react-icons/gi";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  addEquip: (id: string) => void;
}

export default function AddEquipModal({ setIsOpen, isOpen, addEquip }: Props) {
  const { equipDataOptions, equipDataObj } = useContext(ArmyContext);
  const [equipData, setEquipData] = useState<any>({});
  const onChangeSelect = (opt: any) => {
    setEquipData({ ...equipDataObj[opt.value] });
  };
  const desc = useMemo(() => {
    if (equipData.description) {
      return getDesc(equipData.description);
    }
  }, [equipData]);

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle="Get Equip"
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
          <Select
            primaryColor="yellow"
            value={equipDataOptions.find(
              (opt: any) => opt.value == equipData.id
            )}
            onChange={onChangeSelect}
            options={equipDataOptions}
            isSearchable={true}
          />
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
          <div className="my-2">{desc}</div>
          <button
            className="darkwood p-2 rounded-md"
            onClick={() => {
              addEquip(equipData.id), setIsOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </DialogDefault>
    </>
  );
}
