import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY, K_SKILLS } from "@/components/Constants"


export interface Army {
  name: string
  faction: string
  glory: number
  units: Unit[]
  equips: Equip[]
}

export interface Unit {
  model: string
  name: string
  isElite: boolean
  isActive: boolean
  upgrades: string[]
  skills: string[]
  scars: string[]
}

export interface Equip {
  code: string
  name: string
  price: number
  priceType: "ducat" | "glory"
  belongsTo?: number 
}

export interface RawTag {
  tag_name: string
  val: any
}

export interface RawEquip {
  id          : string
  type        : string
  source      : string
  tags        : RawTag[]
  name        : string
  category    : string
  equip_type  : string | null
  range       : string | null;
  blurb       : string
  modifiers   : string[]
  description : any[]
}