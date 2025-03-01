import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc } from "../Shared/Functions";
import { ArmyContext } from "@/app/context";
import Select from "react-tailwindcss-select";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  removeUpgrade: (id: string) => void;
  upgrade: {name: string, id: string};
}

export default function UpgradeModal({
  setIsOpen,
  isOpen,
  removeUpgrade,
  upgrade,
}: Props) {
  const {
    upgradeDataObj,
  } = useContext(ArmyContext);
  const onClickRemoveUpgrade = () => {
    removeUpgrade(upgrade.id)
    setIsOpen(false)
  }
  const upgradeData = useMemo(() => upgradeDataObj[upgrade.id], [upgrade])

  const desc = useMemo(() => {
    if (upgradeData?.description) {
      return getDesc(upgradeData?.description);
    }
  }, [upgradeData]);

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle={upgrade.name}
      >
        <div className="flex flex-col items-center w-96 parchment-bg p-2 mx-auto">
          <div className="my-2">
            {desc}
          </div>
          <button className="darkwood p-2 rounded-md" onClick={onClickRemoveUpgrade}> Remove </button>
        </div>
      </DialogDefault>
    </>
  );
}
