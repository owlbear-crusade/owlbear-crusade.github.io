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
import AttribCard from "../Shared/AttribCard";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";
import EquipList from "../Equipment/EquipList";
import { GiCrossedSwords, GiCrosshair, GiShield, GiSprint  } from "react-icons/gi";
import AttributeList from "../UnitAttribute/AttributeList";


interface Props {
  index: number;
}
export default function UnitCard({ index }: Props) {
  const {
    armyData,
    setArmyData,
    modelsDataOptions,
    modelsDataObj,
    equipDataObj,
    addonDataObj,
    upgradeDataObj,
    upgradeDataOptions,
    skillDataObj,
    skillDataOptions,
    injuryDataObj,
    injuryDataOptions,
  } = useContext(ArmyContext);
  const unit: Unit = armyData.units[index];
  const [showTooltip, setShowTooltip] = useState(false);

  const unitAbilities = useMemo(() => {
    const abiCodes = modelsDataObj[unit.model].abilities.map(
      (abi: any) => abi.content
    );
    return abiCodes.map((code: string) => addonDataObj[code]);
  }, [unit.model, addonDataObj, modelsDataObj]);

  const setUnitName = (val: string) => {
    let updatedArmyData = { ...armyData };
    updatedArmyData.units[index].name = val;
    setArmyData({ ...updatedArmyData });
  };

  const onChangeModel = (val: SelectValue) => {
    const opt = val as Option;
    let updatedArmyData = { ...armyData };
    updatedArmyData.units[index].model = opt.value;
    if (modelsDataObj[opt.value].tags?.find((tag: any) => tag.tag_name == 'elite')) {
      updatedArmyData.units[index].isElite = true
    } else {updatedArmyData.units[index].isElite = false}

    setArmyData({ ...updatedArmyData });
  };

  const modelData = useMemo(
    () => modelsDataObj[unit.model],
    [unit.model, modelsDataObj]
  );

  const calcAdditionalStats = (tagName: string ) => {
    let num = 0
    unit.equips.forEach((eq) => {
      if (equipDataObj[eq].eventtags[tagName]) {
        num += equipDataObj[eq].eventtags[tagName];
      }
    });
    unit.upgrades.forEach((eq) => {
      if (upgradeDataObj[eq].eventtags[tagName]) {
        num += upgradeDataObj[eq].eventtags[tagName];
      }
    });
    unit.skills.forEach((eq) => {
      if (skillDataObj[eq].eventtags[tagName]) {
        num += skillDataObj[eq].eventtags[tagName];
      }
    });
    unit.injuries.forEach((eq) => {
      if (injuryDataObj[eq].eventtags[tagName]) {
        num += injuryDataObj[eq].eventtags[tagName];
      }
    });
    return num as number
  }

  const unitRanged = useMemo(() => {
    let baseNum = modelData.ranged[0] ?? 0
    return `${baseNum + calcAdditionalStats('ranged') as number}D`;
  }, [modelData, armyData, unit ]);
  
  const unitMelee = useMemo(() => {
    let baseNum = modelData.melee[0] ?? 0
    return `${baseNum + calcAdditionalStats('melee') as number}D`;
  }, [modelData, armyData, unit ]);
  
  const unitMovement = useMemo(() => {
    return `${modelData.movement[0] + calcAdditionalStats('movement') as number}"`;
  }, [modelData, armyData, unit ]);

  const unitArmour = useMemo(() => {
    return `${modelData.armour[0] + calcAdditionalStats('armour') as number}`;
  }, [modelData, armyData, unit ]);

  const unitUpgrades = useMemo(
    () =>
      unit.upgrades.map((up) => {
        return { id: up, name: upgradeDataObj[up].name };
      }),
    [unit, armyData]
  );

  const unitSkills = useMemo(
    () =>
      unit.skills.map((up) => {
        return { id: up, name: skillDataObj[up].name };
      }),
    [unit, armyData]
  );

  const unitInjuries = useMemo(
    () =>
      unit.injuries.map((up) => {
        return { id: up, name: injuryDataObj[up].name };
      }),
    [unit, armyData]
  );

  const unitEquips = useMemo(
    () =>
      unit.equips.map((eq) => {
        return { id: eq, name: equipDataObj[eq].name };
      }),
    [unit, armyData]
  );

  const removeUnit = () => {
    const updatedArmyUnits = [...armyData.units];
    updatedArmyUnits.splice(index, 1);
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };

  const addUpgrade = (upgrade: string) => {
    const updatedArmyUnits = [...armyData.units];
    updatedArmyUnits[index].upgrades = [
      ...updatedArmyUnits[index].upgrades,
      upgrade,
    ];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };

  const removeUpgrade = (upgrade: string) => {
    const updatedArmyUnits = [...armyData.units];
    let upgrades = updatedArmyUnits[index].upgrades;
    upgrades = [...upgrades.splice(upgrades.indexOf(upgrade), 1)];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };
  
  const addSkill = (skill: string) => {
    const updatedArmyUnits = [...armyData.units];
    updatedArmyUnits[index].skills = [
      ...updatedArmyUnits[index].skills,
      skill,
    ];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };

  const removeSkill = (skill: string) => {
    const updatedArmyUnits = [...armyData.units];
    let skills = updatedArmyUnits[index].skills;
    skills = [...skills.splice(skills.indexOf(skill), 1)];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };
  
  const addInjury = (injury: string) => {
    const updatedArmyUnits = [...armyData.units];
    updatedArmyUnits[index].injuries = [
      ...updatedArmyUnits[index].injuries,
      injury,
    ];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };

  const removeInjury = (injury: string) => {
    const updatedArmyUnits = [...armyData.units];
    let injuries = updatedArmyUnits[index].injuries;
    injuries = [...injuries.splice(injuries.indexOf(injury), 1)];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };

  const addEquip = (equip: string) => {
    const updatedArmyUnits = [...armyData.units];
    updatedArmyUnits[index].equips = [...updatedArmyUnits[index].equips, equip];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };

  const removeEquip = (equip: string) => {
    const updatedArmyUnits = [...armyData.units];
    let equips = updatedArmyUnits[index].equips;
    equips = [...equips.splice(equips.indexOf(equip), 1)];
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  };

  const onClickReserve = () => {
    const updatedArmyUnits = [...armyData.units];
    updatedArmyUnits[index].isActive =  !updatedArmyUnits[index].isActive
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  }

  const onClickPromote = () => {
    const updatedArmyUnits = [...armyData.units];
    updatedArmyUnits[index].isElite =  !updatedArmyUnits[index].isElite
    setArmyData({
      ...armyData,
      units: [...updatedArmyUnits],
    });
  }

  return (
    <div className={`group my-4 w-72 mx-auto`}>
      <div
        className={`my-auto w-72 relative flex flex-col text-center px-2 rounded-lg border py-2 transition-colors hover:border-neutral-700 parchment-bg`}
      >
        <div className="mx-1 text-left flex justify-center items-center">
          <input
            value={unit.name}
            className="parchment-bg text-center text-2xl border-none w-11/12 grid col-span-1 relative"
            placeholder="Unit Name"
            onChange={(e) => setUnitName(e.target.value)}
          />
          <button
            className="absolute right-0 parchment-bg mx-2 my-auto border-none"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            {showTooltip ? (
              <FaChevronDown className="fa-3xl" />
            ) : (
              <FaChevronRight className="fa-3xl" />
            )}
          </button>
        </div>
        <div className="mx-1 text-center flex my-1">
          <Select
            primaryColor="yellow"
            value={modelsDataOptions.find(
              (opt: any) => opt.value == unit.model
            )}
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
            <div className="grid grid-cols-4 py-2">
              <AttribCard icon={<GiCrosshair />} value={unitRanged} />
              <AttribCard icon={<GiCrossedSwords />} value={unitMelee} />
              <AttribCard icon={<GiShield />} value={unitArmour} />
              <AttribCard icon={<GiSprint />} value={unitMovement} />
            </div>
            <EquipList
              arr={unitEquips}
              addEquip={addEquip}
              removeEquip={removeEquip}
            />
            <AttributeList
              title="UPGRADES"
              arr={unitUpgrades}
              addAttribute={addUpgrade}
              removeAttribute={removeUpgrade}
              attrDataObject={upgradeDataObj}
              attrDataOptions={upgradeDataOptions}
            />
            <AttributeList
              title="SKILLS"
              arr={unitSkills}
              addAttribute={addSkill}
              removeAttribute={removeSkill}
              attrDataObject={skillDataObj}
              attrDataOptions={skillDataOptions}
            />
            <AttributeList
              title="INJURIES"
              arr={unitInjuries}
              addAttribute={addInjury}
              removeAttribute={removeInjury}
              attrDataObject={injuryDataObj}
              attrDataOptions={injuryDataOptions}
            />
            <AbiList title="ABILITIES" arr={unitAbilities} />
            <button
              className="mx-1 darkwood h-8 text-sm text-center rounded-md my-1 w-60"
              onClick={onClickPromote}
            >
              {unit.isElite ? 'Demote' : 'Promote'}
            </button>
            <button
              className="mx-1 darkwood h-8 text-sm text-center rounded-md my-1 w-60"
              onClick={onClickReserve}
            >
              {unit.isActive ? 'Reserve' : 'Field'}
            </button>
            <button
              className="mx-1 darkwood h-8 text-sm text-center rounded-md my-1 w-60"
              onClick={removeUnit}
            >
              Delete
            </button>
          </div>
        </Transition>
      </div>
    </div>
  );
}
