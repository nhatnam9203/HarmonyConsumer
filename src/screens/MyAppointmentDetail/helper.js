export const extrasAdapter = (extras = []) => {
  let extras_arr = extras;
  for (let i = 0; i < extras.length; i++) extras_arr[i].isCheck = true;
  return extras_arr;
};
