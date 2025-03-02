import React, { useState } from "react";
import { useCallback, useContext, useMemo } from "react";
import {  K_DEFAULT_UNIT_DATA } from "../Constants";
import UnitCard from "./UnitCard";
import CollapsibleSection from "../Shared/CollapsibleSection";
import { ArmyContext } from "@/app/context";
import { Unit } from "@/types/global";

interface Props {
  isActive: boolean
}
export default function UnitSection({isActive}: Props){
  const {armyData, setArmyData} = useContext(ArmyContext)

  const addUnit = () => {
    const updatedArmy = {...armyData}
    setArmyData({
      ...updatedArmy,
      units: [...updatedArmy.units, {...K_DEFAULT_UNIT_DATA, isActive: isActive}]
    })
  }

  const filtered_army = useMemo(() => armyData.units.map((unit, index) => {return {...unit, index: index}}).filter(unit => unit.isActive == isActive), [armyData, armyData.units])

  return (
    <CollapsibleSection headerTitle={isActive? 'Units' : 'Reserve'} openDefault={isActive}>
      <div className="flex flex-col justify-center px-10">
        <div className="text-lg font-bold">ELITES</div>
        {filtered_army.map((unit: Unit) => (
          unit.isElite ?
          <UnitCard index={unit.index as number} key={unit.index} /> : null
        ))}
        <div className="text-lg font-bold">INFANTRIES</div>
        {filtered_army.map((unit: Unit) => (
          unit.isElite ?
          null : <UnitCard index={unit.index as number} key={unit.index} />
        ))}
      </div>
      <button className="darkwood p-2 rounded-md" onClick={addUnit}> Add Unit </button>
    </CollapsibleSection>
  )
}