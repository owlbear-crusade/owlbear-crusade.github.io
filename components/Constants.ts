import { Army, Unit, Equip } from "@/types/global"

export const K_INPUT_CLASSNAME = "text-center parchment-bg p-2"

export const K_DEFAULT_EQUIP: Equip = {
  code: "eq_jezzail",
  name: "jezzail",
  price: 0,
  priceType: "ducat",
  belongsTo: 0
}
export const K_DEFAULT_UNIT_DATA: Unit = {
  model: "md_dragonspeasant",
  name: "",
  isElite: false,
  isActive: true,
  upgrades: [],
  skills: [],
  scars: [],
}

export const K_DEFAULT_ARMY_DATA: Army = {
  name: "",
  faction: "",
  glory: 0,
  units: [],
  equips: [],
}