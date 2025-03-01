export const isDiceString = (str: string) => {
  const regex = /^[0-9dkh+\-[\]]*$/;
  return regex.test(str);
}

export const isNumString = (str: string | number) => {
  const regex = /^[0-9]*$/;
  return regex.test(String(str));
} 

export const getDesc = (description: any) => {
  let string = ""
  description.forEach((desc:any) => {
    string += desc.content
    string += "\n"
    if (desc.subcontent) {
      desc.subcontent.forEach((subc:any) => {
        string += subc.content
      })
    }
  });
  return string
}