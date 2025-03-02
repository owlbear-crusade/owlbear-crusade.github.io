"use client";
import React from "react";
import { K_DEFAULT_ARMY_DATA } from "@/components/Constants";

import { Army } from "@/types/global";
import UnitSection from "@/components/Unit/UnitSection";
// import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { ArmyContext } from "./context";
import { useStorage } from "../components/Shared/hooks";
import StashSection from "@/components/Stash/StashSection";
import { isNumString } from "@/components/Shared/Functions";

export default function Home() {
  const [saveData, setSaveData] = useStorage("warband");
  const [armyData, setArmyData] = useState<Army>(K_DEFAULT_ARMY_DATA);
  const [diceRoom, setDiceRoom] = useState("");
  const [discordUname, setDiscordUname] = useState("");
  const [isReady, setIsReady] = useState(false);

  const equipDataArr: any[] = require("../trenchcrusadedata/data/data/player/equipment.json");
  const equipDataObj = equipDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }),
    {}
  );
  const equipDataOptions = equipDataArr.map((eq) => {
    return { value: eq.id, label: eq.name };
  });

  const modelsDataArr: any[] = require("../trenchcrusadedata/data/data/player/models.json");
  const modelsDataObj = modelsDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }),
    {}
  );
  const modelsDataOptions = modelsDataArr.map((eq) => {
    return { value: eq.id, label: eq.name };
  });

  const upgradeDataArr: any[] = require("../trenchcrusadedata/data/data/player/upgrades.json");
  const upgradeDataObj = upgradeDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }),
    {}
  );
  const upgradeDataOptions = upgradeDataArr.map((eq) => {
    return { value: eq.id, label: eq.name };
  });

  const addonDataArr: any[] = require("../trenchcrusadedata/data/data/player/addons.json");
  const addonDataObj = addonDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }),
    {}
  );
  const addonDataOptions = addonDataArr.map((eq) => {
    return { value: eq.id, label: eq.name };
  });

  const skillDataArr: any[] = require("../trenchcrusadedata/data/data/general/skills.json");
  const skillDataObj = skillDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }),
    {}
  );
  const skillDataOptions = skillDataArr.map((eq) => {
    return { value: eq.id, label: eq.name };
  });

  const injuryDataArr: any[] = require("../trenchcrusadedata/data/data/general/injuries.json");
  const injuryDataObj = injuryDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }),
    {}
  );
  const injuryDataOptions = injuryDataArr.map((eq) => {
    return { value: eq.id, label: eq.name };
  });

  const loadData = () => {
    const parsed_save = JSON.parse(saveData);
    setArmyData(parsed_save);
    setIsReady(true);
  };

  const setArmyName = (val: string) => {
    setArmyData({
      ...armyData,
      name: val,
    });
  };

  const setArmyGlory = (val: string) => {
    if (!isNumString(val)) return;
    setArmyData({
      ...armyData,
      glory: Number(val),
    });
  };
  const setArmyDucats = (val: string) => {
    if (!isNumString(val)) return;
    setArmyData({
      ...armyData,
      ducats: Number(val),
    });
  };
  const setArmyFaction = (val: string) => {
    setArmyData({
      ...armyData,
      faction: val,
    });
  };

  useEffect(() => {
    if (isReady) {
      setSaveData(JSON.stringify(armyData));
    }
  }, [armyData]);

  const downloadFile = () => {
    const fileName = armyData.name;
    const json = JSON.stringify(armyData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const createNew = () => {
    setIsReady(true);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const { files } = e.target;
    if (!files) return;
    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = (ev) => {
      if (!ev) return;
      if (!ev.target) return;
      if (!ev.target.result) return;
      setArmyData({ ...JSON.parse(ev.target.result as string) });
    };
    setIsReady(true);
  };

  return (
    <ArmyContext.Provider
      value={{
        armyData,
        setArmyData,
        diceRoom,
        setDiceRoom,
        discordUname,
        setDiscordUname,
        equipDataObj,
        equipDataArr,
        equipDataOptions,
        modelsDataObj,
        modelsDataArr,
        modelsDataOptions,
        upgradeDataObj,
        upgradeDataArr,
        upgradeDataOptions,
        addonDataObj,
        addonDataArr,
        addonDataOptions,
        skillDataObj,
        skillDataArr,
        skillDataOptions,
        injuryDataObj,
        injuryDataArr,
        injuryDataOptions,
      }}
    >
      <main className="parchment-bg flex flex-col items-center py-2 [&>*]:rounded-lg [&>1]:rounded">
        {isReady ? (
          <>
            <input
              value={armyData.name}
              className="parchment-bg text-center text-2xl border-none w-11/12"
              placeholder="Warband Name"
              onChange={(e) => setArmyName(e.target.value)}
            />
            <input
              value={armyData.faction}
              placeholder="Faction"
              className="w-40 parchment-bg text-center text-md mx-2 my-2 border-none"
              onChange={(e) => setArmyFaction(e.target.value)}
            />
            <div className="grid grid-flow-col grid-cols-2">
              <div>
                <p className="font-bold text-medium">Ducats</p>
                <input
                  value={armyData.ducats}
                  placeholder="Glory"
                  className="w-40 parchment-bg text-center text-md mx-2 border-none"
                  onChange={(e) => setArmyDucats(e.target.value)}
                />
              </div>
              <div>
                <p className="font-bold text-medium">GLORY</p>
                <input
                  value={armyData.glory}
                  placeholder="Glory"
                  className="w-40 parchment-bg text-center text-md mx-2 border-none"
                  onChange={(e) => setArmyGlory(e.target.value)}
                />
              </div>
            </div>
            <UnitSection isActive={true} />
            <UnitSection isActive={false} />
            <StashSection />
            <button onClick={downloadFile} className="parchment-input p-2">
              Download Data
            </button>
          </>
        ) : (
          <>
            <input
              onChange={handleUpload}
              className="my-2 block w-42 text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none darkwood border-gray-600 placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            ></input>
            <button
              value={armyData.name}
              className="darkwood text-center my-2 text-md border-none p-2"
              onClick={loadData}
            >
              Load last
            </button>
            <button
              value={armyData.name}
              className="darkwood my-2 text-center text-md border-none p-2"
              onClick={createNew}
            >
              Create New
            </button>
          </>
        )}
      </main>
    </ArmyContext.Provider>
  );
}
