export const addCommaToNumber = (price: number | string): number | string => {
  const priceToString = typeof price === 'number' ? price.toString() : price;
  let res = '';

  if (priceToString[0] === '-') res += '-';

  return (res =
    priceToString.length < 4
      ? priceToString
      : `${addCommaToNumber(
          priceToString.slice(0, priceToString.length - 3)
        )},${priceToString.slice(-3)}`);
};
