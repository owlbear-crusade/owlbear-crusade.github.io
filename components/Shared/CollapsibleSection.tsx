import React from "react";
import { ReactNode, useState } from "react";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FaChevronRight, FaChevronDown, FaPlus } from "react-icons/fa6";
import { Transition } from "@headlessui/react";

interface Props{
  headerTitle: string
  appendFunction?: () => void,
  children: ReactNode
  openDefault?: boolean
}

export default function CollapsibleSection({headerTitle, appendFunction, children, openDefault = false}: Props){
  const [isVisible, setVisible] = useState(openDefault)

  return (
    <div className="mx-4 flex-row justify-center rounded-md my-2 w-11/12">
      <div className={`flex w-full my-auto text-center darkwood ${isVisible ? "rounded-t-md" : "rounded-md"} p-2 justify-center items-center relative`} onClick={() => setVisible(!isVisible)}>
        <h2 className="text-2xl">{headerTitle}</h2>
        {
          appendFunction ?
          <FaPlus onClick={appendFunction} className="my-auto mx-1 cursor-pointer" /> : null
        }
        <button className="absolute right-0 darkwood mx-2 border-none">{isVisible ?<FaChevronDown className="fa-3xl"/> : <FaChevronRight className="fa-3xl"/>}</button>
      </div>
      <div className="overflow-hidden">
        <Transition
          show={isVisible}
          enter="transition ease-in-out duration-500 transform"
          enterFrom="opacity-0 -translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease duration-300 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-12"
        >
          <div className="parchment-input rounded-b-md p-2">
            {children}
          </div>
        </Transition>
      </div>
    </div>
  )
}