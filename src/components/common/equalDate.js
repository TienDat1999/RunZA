export const fn_DateCompare = (DateA, DateB) => {
  var a = new Date(DateA);
  var b = new Date(DateB);
  var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
  var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

  if (parseFloat(msDateA) < parseFloat(msDateB)) return -1;
  // less than
  else if (parseFloat(msDateA) == parseFloat(msDateB)) return 0;
  // equal
  else if (parseFloat(msDateA) > parseFloat(msDateB)) return 1;
  // greater than
  else return null; // error
};
console.log();
