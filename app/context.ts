import { K_DEFAULT_ARMY_DATA } from "@/components/Constants";
import { Army } from "@/types/global";
import { createContext, Dispatch, SetStateAction } from "react";

export interface ArmyContextType {
  armyData: Army;
  setArmyData: Dispatch<SetStateAction<Army>>;
  diceRoom: string;
  setDiceRoom: Dispatch<SetStateAction<string>>;
  discordUname: string;
  setDiscordUname: Dispatch<SetStateAction<string>>;
  equipDataObj: any;
  equipDataArr: any;
  equipDataOptions: any;
  modelsDataObj: any;
  modelsDataArr: any;
  modelsDataOptions: any;
  addonDataObj: any;
  addonDataArr: any;
  addonDataOptions: any;
}

export const ArmyContext = createContext<ArmyContextType>({
  armyData: K_DEFAULT_ARMY_DATA,
  setArmyData: () => null,
  diceRoom: "",
  setDiceRoom: () => null,
  discordUname: "",
  equipDataObj: {},
  equipDataArr: [],
  equipDataOptions: [],
  modelsDataObj: {},
  modelsDataArr: [],
  modelsDataOptions: [],
  addonDataObj: {},
  addonDataArr: [],
  addonDataOptions: [],
  setDiscordUname: () => null,
});
