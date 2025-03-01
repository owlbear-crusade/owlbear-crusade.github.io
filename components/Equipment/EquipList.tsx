// import { CharContext } from "@/app/context";
import React, { LegacyRef, useState } from "react";
import StashModal from "./EquipModal";
import AddEquipModal from "./AddEquipModal";
import EquipModal from "./EquipModal";
import { Equip } from "@/types/global";
import { K_DEFAULT_EQUIP } from "../Constants";


const EquipList = React.forwardRef(({arr, title, onClick, unitIndex}: any, forwardedRef) => {
  const [eq, setEq] = useState<Equip>(K_DEFAULT_EQUIP)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGetModalOpen, setIsGetModalOpen] = useState(false)
  const onClickEq = (item: any) => {
    setEq(item)
    setIsModalOpen(true)
  }
  const onClickGet = () => {
    setIsGetModalOpen(true)
  }

  return (
    <div
      ref={forwardedRef as LegacyRef<HTMLDivElement>}
    >
      <div className="font-bold"> EQUIPMENTS </div>
      <div className="flex px-2 w-full flex-row flex-wrap my-1">
        {
          arr.map((item: any, index: number) => {return(
            <div 
              key={index} 
              className={`parchment-input rounded-md cursor-pointer m-1 px-1 text-sm`} 
              onClick={() => onClickEq(item)}
            >
              {item.name ? item.name : "unnamed"}
            </div>
          )})
        }
      </div>
      <button className="darkwood text-xs p-1 rounded-md my-1" onClick={onClickGet}> Add </button>
      <AddEquipModal equipment={eq} isOpen={isGetModalOpen} setIsOpen={setIsGetModalOpen} unitIndex={unitIndex} />
      <EquipModal equipment={eq} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
})

EquipList.displayName = "EquipList"

export default EquipList
