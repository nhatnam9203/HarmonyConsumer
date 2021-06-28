import { convertPrice } from "utils";

export function total_of_service(service, extras) {
  let total = parseFloat(service.price.toString().replace(",", ""));
  let duration = parseInt(service.duration);

  let _extras_of_services = extras.filter(
    (obj) => obj.bookingbookingServiceId === service.bookingbookingServiceId,
  );

  _extras_of_services.forEach((element) => {
    total += parseFloat(element.price.toString().replace(",", ""));
    duration += parseInt(element.duration);
  });

  return {
    price: convertPrice(total),
    duration,
  };
}

export function convertExtraInservice(extras, bookingServiceId) {
  let str = "";
  if (extras && extras.length > 1) {
    extras
      .filter((obj) => obj.bookingServiceId === bookingServiceId)
      .forEach((ex) => {
        str += ex.extraName + ", ";
      });
    return str.substr(0, str.length - 2);
  } else {
    return extras[0].extraName;
  }
}
