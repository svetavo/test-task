export const getFormatValue = (value) => {
  console.log(value);
  return new Intl.NumberFormat("en-GB", {
    maximumSignificantDigits: 3,
  }).format(value);
};
