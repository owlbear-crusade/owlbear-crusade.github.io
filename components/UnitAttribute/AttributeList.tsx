// import { CharContext } from "@/app/context";
import React, { LegacyRef, useState } from "react";
import AddAttributeModal from "./AddAttributeModal";
import AttributeModal from "./AttributeModal";
import { FaCirclePlus } from "react-icons/fa6";

interface props {
  arr: {name: string, id: string}[], 
  title: string, 
  addAttribute: (id: string) => void, 
  removeAttribute: (id: string) => void, 
  attrDataObject: any, 
  attrDataOptions: any[],
}

const AttributeList = React.forwardRef(({arr, title, addAttribute, removeAttribute, attrDataObject, attrDataOptions}: props, forwardedRef) => {
  const [attribute, setAttribute] = useState<any>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGetModalOpen, setIsGetModalOpen] = useState(false)
  const onClickAttribute = (item: any) => {
    setAttribute(item)
    setIsModalOpen(true)
  }
  const onClickGet = () => {
    setIsGetModalOpen(true)
  }

  return (
    <div
      ref={forwardedRef as LegacyRef<HTMLDivElement>}
    >
      <div className="flex font-bold justify-center items-center"> <p className="my-auto inline mx-1">{title}</p> <button className="border-none my-auto" onClick={onClickGet}> <FaCirclePlus /> </button> </div>
      <div className="flex px-2 w-full flex-row flex-wrap my-1">
        {
          arr.map((item: any, index: number) => {return(
            <div 
              key={index} 
              className={`parchment-input rounded-md cursor-pointer m-1 px-1 text-sm`} 
              onClick={() => onClickAttribute(item)}
            >
              {item.name ? item.name : "unnamed"}
            </div>
          )})
        }
      </div>
      <AddAttributeModal title={title} isOpen={isGetModalOpen} setIsOpen={setIsGetModalOpen} addAttribute={addAttribute} attrDataObject={attrDataObject} attrDataOptions={attrDataOptions}/>
      <AttributeModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} removeAttribute={removeAttribute} attribute={attribute} attrDataObject={attrDataObject}/>
    </div>
  )
})

AttributeList.displayName = "EquipList"

export default AttributeList
