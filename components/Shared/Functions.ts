export const isDiceString = (str: string) => {
  const regex = /^[0-9dkh+\-[\]]*$/;
  return regex.test(str);
}

export const isNumString = (str: string | number) => {
  const regex = /^[0-9]*$/;
  return regex.test(String(str));
} 