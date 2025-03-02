import React, { useMemo } from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import DialogDefault from "../Shared/Dialog";
import { getDesc } from "../Shared/Functions";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  removeAttribute: (id: string) => void;
  attribute: {name: string, id: string};
  attrDataObject: any;
}

export default function AttributeModal({
  setIsOpen,
  isOpen,
  removeAttribute,
  attribute,
  attrDataObject,
}: Props) {
  const onClickRemoveAttribute = () => {
    removeAttribute(attribute.id)
    setIsOpen(false)
  }
  const attributeData = useMemo(() => attrDataObject[attribute.id], [attribute])

  const desc = useMemo(() => {
    if (attributeData?.description) {
      return getDesc(attributeData?.description);
    }
  }, [attributeData]);

  return (
    <>
      <DialogDefault
        isOpen={isOpen}
        setOpen={setIsOpen}
        headerTitle={attribute.name}
      >
        <div className="flex flex-col items-center w-96 parchment-bg p-2 mx-auto">
          <div className="my-2">
            {desc}
          </div>
          <button className="darkwood p-2 rounded-md" onClick={onClickRemoveAttribute}> Remove </button>
        </div>
      </DialogDefault>
    </>
  );
}
