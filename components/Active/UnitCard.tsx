import React from "react";
import { Unit } from "@/types/global";
import { useContext, useMemo, useState } from "react";
import { Transition } from "@headlessui/react";
import { ArmyContext } from "@/app/context";
import Select from "react-tailwindcss-select";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import AbiList from "../Ability/AbiList";
import EquipList from "../Equipment/EquipList";
import AttribCard from "../Shared/AttribCard";
import UpgradeList from "../Upgrade/UpgradeList";

interface Props {
  index: number;
}
export default function UnitCard({ index }: Props) {
  const { armyData, setArmyData, modelsDataOptions, modelsDataObj, equipDataObj, addonDataObj } =
    useContext(ArmyContext);
  const unit: Unit = armyData.units[index];
  const [showTooltip, setShowTooltip] = useState(false);

  const unitEquips = useMemo(() => {
    return armyData.equips.filter((eq) => eq.belongsTo == index);
  }, [armyData.equips, index]);

  const unitAbilities = useMemo(() => {
    const abiCodes = modelsDataObj[unit.model].abilities.map((abi: any) => abi.content)
    return abiCodes.map((code: string) => addonDataObj[code])
  }, [unit.model, addonDataObj, modelsDataObj])

  const setUnitName = (val: string) => {
    let updatedArmyData = { ...armyData };
    updatedArmyData.units[index].name = val;
    setArmyData({ ...updatedArmyData });
  };

  const onChangeModel = (val: SelectValue) => {
    const opt = val as Option
    let updatedArmyData = { ...armyData };
    updatedArmyData.units[index].model = opt.value;
    setArmyData({ ...updatedArmyData });
  };

  const modelData = useMemo(() => modelsDataObj[unit.model], [unit.model, modelsDataObj])

  const getUnitRanged = () => {
    let rangeMod = modelData.ranged[0] as number;
    return rangeMod
  };

  const getUnitMelee = () => {
    return modelData.melee[0] as number;
  };

  const getUnitArmour = () => {
    let armour = modelData.armour[0] as number;
    unitEquips.forEach((eq) => {
      if (equipDataObj[eq.code].eventtags.armour) {
        armour += equipDataObj[eq.code].eventtags.armour;
      }
    });
    return armour
  };

  const unitUpgrades = useMemo(() => unit.upgrades.map(up => {return {id: up, name: addonDataObj[up].name}}), [unit, armyData])

  const removeUnit = () => {
    const updatedArmyUnits = [...armyData.units]
    updatedArmyUnits.splice(index, 1)
    const updatedArmyEquipments = [...armyData.equips].filter(eq => eq.belongsTo !== index).map(eq=> {
      if (eq.belongsTo === undefined) return eq
      if(eq.belongsTo < index) return eq
      else return {...eq, belongsTo: eq.belongsTo + 1}
    })
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
      equips: [...updatedArmyEquipments]
    })
  }

  const addUpgrade = (upgrade: string) => {
    const updatedArmyUnits = [...armyData.units]
    updatedArmyUnits[index].upgrades = [...updatedArmyUnits[index].upgrades, upgrade]
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits]
    })
  }

  const removeUpgrade = (upgrade: string) => {
    const updatedArmyUnits = [...armyData.units]
    let upgrades = updatedArmyUnits[index].upgrades
    upgrades = [...upgrades.splice(upgrades.indexOf(upgrade), 1)]
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits]
    })
  }

  return (
    <div
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}
      className={`group m-4 w-96`}
    >
      <div
        className={`my-auto w-96 relative flex flex-col text-center px-2 rounded-lg border py-2 transition-colors hover:border-neutral-700 parchment-bg`}
      >
        <div className="mx-1 text-left flex">
          <input
            value={unit.name}
            className="parchment-bg text-center text-2xl border-none w-11/12 grid col-span-1"
            placeholder="Unit Name"
            onChange={(e) => setUnitName(e.target.value)}
          />
        </div>
        <div className="mx-1 text-center flex my-1">
          <Select
            primaryColor="yellow"
            value={modelsDataOptions.find((opt: any) => opt.value == unit.model)}
            onChange={onChangeModel}
            options={modelsDataOptions}
            isSearchable={true}
          />
        </div>

        <Transition
          show={showTooltip}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="opacity-0 -translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease duration-100 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-12"
        >
          <div>
            <div className="grid grid-cols-3 py-2">
              <AttribCard title="Ranged" value={getUnitRanged()} />
              <AttribCard title="Melee" value={getUnitMelee()} />
              <AttribCard title="Armor" value={getUnitArmour()} />
            </div>
            <EquipList arr={unitEquips} unitIndex={index}/>
            <UpgradeList arr={unitUpgrades} addUpgrade={addUpgrade} removeUpgrade={removeUpgrade}/>
            <AbiList title="ABILITIES" arr={unitAbilities}/>
            <button className="mx-1 darkwood h-8 text-sm text-center rounded-md my-1 w-60" onClick={removeUnit}>Delete</button>
          </div>
        </Transition>
      </div>
    </div>
  );
}
