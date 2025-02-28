"use client";
import React from "react";
import { K_DEFAULT_ARMY_DATA } from "@/components/Constants";
import PowerSection from "@/components/Active/ActiveSection";
import { isNumString } from "@/components/Shared/Functions";

import { Army } from "@/types/global";
import ActiveSection from "@/components/Active/ActiveSection";
// import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { ArmyContext } from "./context";



export default function Home() {
  const [armyData, setArmyData] = useState<Army>(K_DEFAULT_ARMY_DATA);
  const [diceRoom, setDiceRoom] = useState("");
  const [discordUname, setDiscordUname] = useState("");
  const [isAutoSave, setIsAutosave] = useState(false);
  const equipDataArr: any[] = require('../trenchcrusadedata/data/data/player/equipment.json')
  const equipDataObj = equipDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }), {});
  const equipDataOptions = equipDataArr.map(eq => {return {value: eq.id, label: eq.name}})
  const modelsDataArr: any[] = require('../trenchcrusadedata/data/data/player/models.json')
  const modelsDataObj = modelsDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }), {});
  const modelsDataOptions = modelsDataArr.map(eq => {return {value: eq.id, label: eq.name}})
  const addonDataArr: any[] = require('../trenchcrusadedata/data/data/player/addons.json')
  const addonDataObj = addonDataArr.reduce(
    (obj: any, item: any) => Object.assign(obj, { [item.id]: item }), {});
  const addonDataOptions = addonDataArr.map(eq => {return {value: eq.id, label: eq.name}})

  const setArmyName = (val: string) => {
    console.log(val)
    setArmyData({
      ...armyData,
      name: val,
    });
  };
  const setArmyFaction = (val: string) => {
    setArmyData({
      ...armyData,
      faction: val,
    });
  };

  useEffect(() => {return () => {
    if(localStorage.getItem("armyData")){
      setArmyData(JSON.parse(localStorage.getItem("armyData") as string))
    } else {
      setArmyData(K_DEFAULT_ARMY_DATA)
    }
    setIsAutosave(true)
  }}, [])

  useEffect(() => {
    if (isAutoSave) localStorage?.setItem("armyData", JSON.stringify(armyData));
  }, [armyData, isAutoSave]);

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

  // if(!isReady) return <></>
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
        addonDataObj, 
        addonDataArr, 
        addonDataOptions,
      }}
    >
      <main className="parchment-bg flex flex-col items-center py-2 [&>*]:rounded-lg [&>1]:rounded">
        <input
          onChange={handleUpload}
          className="my-2 block w-42 text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none darkwood border-gray-600 placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        ></input>
        <input
          value={armyData.name}
          className="parchment-bg text-center text-2xl border-none w-11/12"
          placeholder="Warband Name"
          onChange={(e) => setArmyName(e.target.value)}
        />
        <input
          value={armyData.faction}
          placeholder="Class"
          className="w-40 parchment-bg text-center text-md mx-2 border-none"
          onChange={(e) => setArmyFaction(e.target.value)}
        />
        <ActiveSection />
        {/* <ReserveSection />
        <StashSection /> */}
        <button onClick={downloadFile} className="parchment-input p-2">
          Download Data
        </button>
        {/* <button onClick={onClickSaveArmy}>Save</button> */}
      </main>
    </ArmyContext.Provider>
  );
}
