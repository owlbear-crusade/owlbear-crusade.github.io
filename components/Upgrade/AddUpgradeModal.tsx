import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc } from "../Shared/Functions";
import { ArmyContext } from "@/app/context";
import Select from "react-tailwindcss-select";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  addUpgrade: (id: string) => void;
}

export default function AddUpgradeModal({
  setIsOpen,
  isOpen,
  addUpgrade,
}: Props) {
  const {
    upgradeDataOptions,
    upgradeDataObj,
  } = useContext(ArmyContext);
  const [upgradeData, setUpgradeData] = useState<any>({});
  const onChangeSelect = (opt: any) => {
    setUpgradeData({ ...upgradeDataObj[opt.value] });
  };
  const desc = useMemo(() => {
    if (upgradeData.description) {
      return getDesc(upgradeData.description);
    }
  }, [upgradeData]);

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle="Get Upgrade"
      >
        <div className="flex flex-col items-center w-96 parchment-bg p-2 mx-auto">
          <Select
            primaryColor="yellow"
            value={upgradeDataOptions.find((opt: any) => opt.value == upgradeData.id)}
            onChange={onChangeSelect}
            options={upgradeDataOptions}
            isSearchable={true}
          />
          <div className="my-2">
            {desc}
          </div>
          <button className="darkwood p-2 rounded-md" onClick={() => {addUpgrade(upgradeData.id), setIsOpen(false)}}> Add </button>
        </div>
      </DialogDefault>
    </>
  );
}
