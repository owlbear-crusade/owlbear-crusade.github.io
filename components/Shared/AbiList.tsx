// import { CharContext } from "@/app/context";
import React, { LegacyRef, useState } from "react";
import AbiModal from "./AbiModal";


const abiList = React.forwardRef(({arr, title, onClick}: any, forwardedRef) => {
  const [abi, setAbi] = useState({description: []})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onClickAbi = (item: any) => {
    setAbi(item)
    console.log(item)
    setIsModalOpen(true)
  }

  return (
    <div
      ref={forwardedRef as LegacyRef<HTMLDivElement>}
    >
      <div className="font-bold"> {title} </div>
      <div className="flex px-2 w-full flex-row flex-wrap">
        {
          arr.map((item: any, index: number) => {return(
            <div 
              key={index} 
              className={`parchment-input rounded-md cursor-pointer m-1 px-1 text-sm`} 
              onClick={() => onClickAbi(item)}
            >
              {item.name ? item.name : "unnamed"}
            </div>
          )})
        }
      </div>
      <AbiModal ability={abi} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
})

abiList.displayName = "abiList"

export default abiList
