// import { CharContext } from "@/app/context";
import React, { LegacyRef, useState } from "react";
import AddUpgradeModal from "./AddUpgradeModal";
import UpgradeModal from "./UpgradeModal";


const UpgradeList = React.forwardRef(({arr, addUpgrade, removeUpgrade}: any, forwardedRef) => {
  const [upgrade, setUpgrade] = useState<any>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGetModalOpen, setIsGetModalOpen] = useState(false)
  const onClickUpgrade = (item: any) => {
    setUpgrade(item)
    setIsModalOpen(true)
  }
  const onClickGet = () => {
    setIsGetModalOpen(true)
  }

  return (
    <div
      ref={forwardedRef as LegacyRef<HTMLDivElement>}
    >
      <div className="font-bold"> UPGRADES </div>
      <div className="flex px-2 w-full flex-row flex-wrap my-1">
        {
          arr.map((item: any, index: number) => {return(
            <div 
              key={index} 
              className={`parchment-input rounded-md cursor-pointer m-1 px-1 text-sm`} 
              onClick={() => onClickUpgrade(item)}
            >
              {item.name ? item.name : "unnamed"}
            </div>
          )})
        }
      </div>
      <button className="darkwood text-xs p-1 rounded-md my-1" onClick={onClickGet}> Add </button>
      <AddUpgradeModal isOpen={isGetModalOpen} setIsOpen={setIsGetModalOpen} addUpgrade={addUpgrade} />
      <UpgradeModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} removeUpgrade={removeUpgrade} upgrade={upgrade} />
    </div>
  )
})

UpgradeList.displayName = "EquipList"

export default UpgradeList
