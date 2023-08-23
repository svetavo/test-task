export const calc = (summa, period, rate) => {
  let ann = 0;
  let monthRate = rate / 12;

  let topPart = +(summa * monthRate).toFixed(2);
  let bottomPart = +(1 - 1 / Math.pow(monthRate + 1, period)).toFixed(2);
  ann = +(topPart / bottomPart).toFixed(0);
  return ann;
};

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
};

export const getPeriod = (summa, ann, rate) => {
  var mm, i, result;

  // ставка в месяц
  i = rate / 12 ;

  mm = ann / summa;
  result = getBaseLog(1 + i, -mm / (i - mm));

  // округлим до целых
  return Math.ceil(+result);
};
