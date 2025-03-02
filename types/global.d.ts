import { K_ABILITIES, K_DEFENSES, K_POWER_FREQUENCY, K_SKILLS } from "@/components/Constants"


export interface Army {
  name: string
  faction: string
  glory: number
  ducats: number
  units: Unit[]
  stash: string[]
}

export interface Unit {
  model: string
  name: string
  isElite: boolean
  isActive: boolean
  equips: string[]
  upgrades: string[]
  skills: string[]
  injuries: string[]
  index?: number
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