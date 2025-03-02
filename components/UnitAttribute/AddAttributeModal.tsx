import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc } from "../Shared/Functions";
import { ArmyContext } from "@/app/context";
import Select from "react-tailwindcss-select";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  addAttribute: (id: string) => void;
  attrDataObject: any
  attrDataOptions: any
  title: string
}

export default function AddAttributeModal({
  setIsOpen,
  isOpen,
  addAttribute,
  attrDataObject,
  attrDataOptions,
  title,
}: Props) {
  const [AttributeData, setAttributeData] = useState<any>({});
  const onChangeSelect = (opt: any) => {
    setAttributeData({ ...attrDataObject[opt.value] });
  };
  const desc = useMemo(() => {
    if (AttributeData.description) {
      return getDesc(AttributeData.description);
    }
  }, [AttributeData]);

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle={`GET ${title}`}
      >
        <div className="flex flex-col items-center w-96 parchment-bg p-2 mx-auto">
          <Select
            primaryColor="yellow"
            value={attrDataOptions.find((opt: any) => opt.value == AttributeData.id)}
            onChange={onChangeSelect}
            options={attrDataOptions}
            isSearchable={true}
          />
          <div className="my-2">
            {desc}
          </div>
          <button className="darkwood p-2 rounded-md" onClick={() => {addAttribute(AttributeData.id), setIsOpen(false), setAttributeData({})}}> Add </button>
        </div>
      </DialogDefault>
    </>
  );
}
