import { convertPrice } from "utils";

export const totalPriceProduct = (product, qty) => {
  return parseFloat(parseFloat(product.price.toString().replace(",", "")) * qty).toFixed(2);
};

export const totalPriceService = (service, extras) => {
  let total = parseFloat(service.price.toString().replace(",", ""));
  extras.forEach((element) => {
    if (element && element.isCheck) total += parseFloat(element.price.toString().replace(",", ""));
  });
  return convertPrice(total);
};

export const totalDuration = (services = [], extras = []) => {
  let total = 0;
  for (let i = 0; i < services.length; i++) {
    total += services[i].duration;
  }
  for (let i = 0; i < extras.length; i++) {
    if (extras[i] && extras[i].isCheck) {
      total += extras[i].duration;
    }
  }
  return total;
};

export const checkExtraInCart = (extraCheck, sv) => {
  let isCheck = false;
  const find = extraCheck.find((obj) => obj.extraId === sv.extraId);
  if (find) isCheck = true;
  return isCheck;
};

export const checkServiceInCart = (servicetest, sv) => {
  let isCheck = false;
  const find = servicetest.find((obj) => obj.serviceId === sv.serviceId);
  if (find) isCheck = true;
  return isCheck;
};

export const checKProductInCart = (producttest, pro) => {
  let isCheck = false;
  const find = producttest.find((obj) => obj.productId === pro.productId);
  if (find) isCheck = true;
  return isCheck;
};

/* assign isCheck for extras && add extras in bookingReducer */
export const extrasAdapter = (extras = [], extrasAdd = []) => {
  let tempArr = extras;
  for (let i = 0; i < extrasAdd.length; i++) {
    const index = extras.findIndex((obj) => obj.extraId === extrasAdd[i].extraId);
    if (index !== -1) {
      tempArr[index].isCheck = extrasAdd[i].isCheck;
    }
  }
  return tempArr;
};
