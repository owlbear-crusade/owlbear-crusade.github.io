import React from "react";
import { useCallback, useContext, useMemo } from "react";
import { K_DEFAULT_UNIT_DATA } from "../Constants";
import CollapsibleSection from "../Shared/CollapsibleSection";
import { ArmyContext } from "@/app/context";
import EquipList from "../Equipment/EquipList";

export default function StashSection() {
  const { armyData, setArmyData, equipDataObj } = useContext(ArmyContext);

  const equips = useMemo(
    () =>
      armyData.stash.map((eq) => {
        return { id: eq, name: equipDataObj[eq].name };
      }),
    [armyData]
  );

  const addEquip = (equip: string) => {
    const updatedArmyData = { ...armyData };
    setArmyData({
      ...armyData,
      stash: [...updatedArmyData.stash, equip],
    });
  };

  const removeEquip = (equip: string) => {
    const updatedArmyData = { ...armyData };
    let equips = updatedArmyData.stash;
    equips = [...equips.splice(equips.indexOf(equip), 1)];
    setArmyData({
      ...armyData,
      stash: [...updatedArmyData.stash],
    });
  };

  return (
    <CollapsibleSection headerTitle="Stash">
      <div className="flex flex-wrap justify-center px-10">
        <div
          className={`my-auto w-72 relative flex flex-col text-center px-2 rounded-lg border py-2 transition-colors hover:border-neutral-700 parchment-bg`}
        >
          <EquipList
            arr={equips}
            addEquip={addEquip}
            removeEquip={removeEquip}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
