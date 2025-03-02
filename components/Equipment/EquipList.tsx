// import { CharContext } from "@/app/context";
import React, { LegacyRef, useState } from "react";
import AddEquipModal from "./AddEquipModal";
import EquipModal from "./EquipModal";
import { FaCirclePlus } from "react-icons/fa6";


const EquipList = React.forwardRef(({arr, addEquip, removeEquip}: any, forwardedRef) => {
  const [equip, setEquip] = useState<any>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGetModalOpen, setIsGetModalOpen] = useState(false)
  const onClickEquip = (item: any) => {
    setEquip(item)
    setIsModalOpen(true)
  }
  const onClickGet = () => {
    setIsGetModalOpen(true)
  }

  return (
    <div
      ref={forwardedRef as LegacyRef<HTMLDivElement>}
    >
      <div className="flex font-bold justify-center items-center"> <p className="my-auto inline mx-1">EQUIPS</p> <button className="border-none my-auto" onClick={onClickGet}> <FaCirclePlus /> </button> </div>
      <div className="flex px-2 w-full flex-row flex-wrap my-1">
        {
          arr.map((item: any, index: number) => {return(
            <div 
              key={index} 
              className={`parchment-input rounded-md cursor-pointer m-1 px-1 text-sm`} 
              onClick={() => onClickEquip(item)}
            >
              {item.name ? item.name : "unnamed"}
            </div>
          )})
        }
      </div>
      <AddEquipModal isOpen={isGetModalOpen} setIsOpen={setIsGetModalOpen} addEquip={addEquip} />
      <EquipModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} removeEquip={removeEquip} equip={equip} />
    </div>
  )
})

EquipList.displayName = "EquipList"

export default EquipList
