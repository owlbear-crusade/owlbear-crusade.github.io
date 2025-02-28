import React from "react";
import { useCallback, useContext, useMemo } from "react";
import {  K_DEFAULT_UNIT_DATA } from "../Constants";
import UnitCard from "./UnitCard";
import CollapsibleSection from "../Shared/CollapsibleSection";
import { ArmyContext } from "@/app/context";

export default function ActiveSection(){
  const {armyData, setArmyData} = useContext(ArmyContext)

  const addPower = () => {
    console.log(armyData.units)
    setArmyData({
      ...armyData,
      units: [...armyData.units, {...K_DEFAULT_UNIT_DATA}]
    })
  }

  return (
    <CollapsibleSection headerTitle="Active Units" openDefault>
      <div className="flex flex-wrap justify-center">
        {armyData.units.map((_, index: number) => (
          <UnitCard index={index} key={index} />
        ))}
      </div>
      <button className="darkwood p-2 rounded-md" onClick={addPower}> Add Power </button>
    </CollapsibleSection>
  )
}