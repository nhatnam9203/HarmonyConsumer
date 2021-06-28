import API from "../configs/api";
import axios from "axios";
import Config from "../configs";
import ICONS from "assets";
import moment from "moment-timezone";
import _ from "lodash";
import Geocoder from "react-native-geocoder";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar, Platform, Linking } from "react-native";
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";
import * as RootNavigation from "navigations/RootNavigation";
import env from "react-native-config";

export const scaleWidth = (size) => wp(size);
export const scaleHeight = (size) => hp(size);

export const requestAPI = async (action, header = {}) => {
  let method = action.method || "GET";
  let headers = Object.assign(
    { Accept: "application/json", "Content-Type": "application/json" },
    header,
  );
  if (action.token) {
    headers["Authorization"] = `Bearer ${action.token}`;
  }
  headers["User-Agent"] = `HarmonyConsumer/${Config.VERSION}/${Config.IS_PLATFORM}`;
  let configs = {
    method: `${method}`.toLowerCase(),
    baseURL: env.API_URL,
    url: `${action.route}`,
    headers: headers,
    timeout: 20000,
    validateStatus: (status) => status >= 200 && status < 600,
  };

  if ((method == "POST" || method == "DELETE" || method == "PUT") && action.body) {
    configs["data"] = JSON.stringify(action.body);
  }

  try {
    let response = await axios(configs);

    const codeNumber = response.status ? response.status : 0;
    if (codeNumber === 200) {
      if (response.data.codeNumber == 401) {
        RootNavigation.navigate("Auth");
        alert(response.data.message);
        return;
      }
      return response.data;
    }

    if (codeNumber === 401) {
      RootNavigation.navigate("Auth");
      alert("Your session is expired , please login again");
      return;
    } else if (codeNumber === 404) {
      return {
        codeNumber: 404,
        message: "NOT_FOUND " + action.route,
      };
    } else
      return {
        codeNumber: 401,
        codeStatus: 0,
        data: "",
        message:
          response.data && response.data.message
            ? response.data.message
            : `error from : ${action.route}`,
      };
  } catch (error) {
    if (error.request) {
      if (error.message.includes("timeout")) {
        return {
          codeNumber: 402,
          message: "Time out 20s",
        };
      } else if (error.message.includes("Network Error")) {
        return {
          codeNumber: 502,
          message: "Network error",
        };
      } else {
        throw error;
      }
    }
    return {
      codeNumber: 401,
      message: "something went wrong.",
    };
  }
};

export const upload = async (url = "", body = []) => {
  const config = {
    url: `${env.API_URL}${url}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: createFormData(body),
  };
  return axios(config, { timeout: 15000 })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      alert("server not response");
      return;
    });
};

export const createFormData = (media) => {
  const data = new FormData();
  for (let i = 0; i < media.length; i++) {
    data.append("files[]", {
      uri: Platform.OS === "android" ? media[i].uri : media[i].uri.replace("file://", ""),
      name: media[i].fileName ? media[i].fileName : "phi.jpg",
      type: media[i].type ? media[i].type : "image/jpeg",
    });
  }
  return data;
};

export const scaleSize = (size) => {
  return (Config.FULL_WIDTH * size) / Config.DEFAULT_WIDTH;
};

export const statusBarHeight = () => {
  return Platform.OS === "ios"
    ? isIphoneX()
      ? getStatusBarHeight()
      : 20
    : StatusBar.currentHeight;
};

export const formatDate = (date, key) => {
  return moment(date).format(key);
};
export const validatePhone = (phone) => {
  var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(String(phone));
};
export const validatePassword = (password) => {
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;
  return re.test(String(password));
};

export const google_key = "AIzaSyCEcBBUpQXwO9spOcJ3pmfxaLNI1Can2_4";

export const getImageCard = (type) => {
  switch (type) {
    case "Visa":
      return ICONS["visa_active"];
    case "Mastercard":
      return ICONS["mastercard_active"];
    case "American Express":
      return ICONS["am_active"];
    case "Diners Club":
      return ICONS["diners_active"];
    case "Discover":
      return ICONS["discover_active"];
    case "JCB":
      return ICONS["jcb_active"];
    case "bank":
      return ICONS["bank_form"];
    default:
      return ICONS["credit_form"];
  }
};

export const getBackgroundCard = (type) => {
  switch (type) {
    case "Visa":
      return {
        backgroundColor: ["#054A9C", "#054A9C"],
        color: "#FFFFFF",
        titleColor: "#F6F6F6",
      };

    case "Mastercard":
      return {
        backgroundColor: ["#FFB700", "#ED1C24"],
        color: "#FFFFFF",
        titleColor: "#F6F6F6",
      };
    default:
      return {
        backgroundColor: ["#EEEEEE", "#EEEEEE"],
        color: "#404040",
        titleColor: "#666666",
      };
  }
};

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function getTimeWorkingNow_Merchant(merchant) {
  let time = "";

  const now_day =
    merchant.timezone && merchant.timezone !== "0"
      ? moment().tz(merchant.timezone.substring(12))
      : moment();

  const { businessHour } = merchant;
  if (businessHour) {
    const time_working = Object.entries(businessHour);
    const find_now_time = time_working.find((obj) => obj[0] === now_day.format("dddd"));

    time = `${find_now_time[1].timeStart} - ${find_now_time[1].timeEnd}`;

    return {
      time: `Open ${time}`,
      day: find_now_time && find_now_time[0] ? find_now_time[0] : "",
    };
  } else {
    return {
      time,
      day: "",
    };
  }
}

export function convertExtraInservice(extras, serviceId) {
  let str = "";
  if (extras && extras.length > 1) {
    extras
      .filter((obj) => obj.serviceId === serviceId)
      .forEach((ex) => {
        str += ex.name + ", ";
      });
    return str.substr(0, str.length - 2);
  } else {
    return extras[0].name;
  }
}

export function convertExtraInservice2(extras, service) {
  let str = "";
  if (extras && extras.length > 1) {
    extras
      .filter(
        (obj) =>
          obj.bookingServiceId === service.bookingServiceId || obj.serviceId === service.serviceId,
      )
      .forEach((ex) => {
        if (ex.extraName) {
          str += ex.extraName + ", ";
        } else {
          str += ex.name + ", ";
        }
      });
    return str.substr(0, str.length - 2);
  } else {
    return extras[0].extraName ? extras[0].extraName : extras[0].name;
  }
}

export const totalPrice = (services = [], extras = [], products = []) => {
  let total = 0;
  for (let i = 0; i < services.length; i++) {
    total += parseFloat(services[i].price.toString().replace(",", ""));
  }
  for (let i = 0; i < extras.length; i++) {
    total += parseFloat(extras[i].price.toString().replace(",", ""));
  }
  for (let i = 0; i < products.length; i++) {
    total +=
      parseFloat(products[i].price.toString().replace(",", "")) * parseInt(products[i].quantity);
  }
  return convertPrice(total);
};

export const totalDuration = (services = [], extras = []) => {
  let total = 0;
  for (let i = 0; i < services.length; i++) {
    total += services[i].duration;
  }
  for (let i = 0; i < extras.length; i++) {
    total += extras[i].duration;
  }
  return total;
};

export const findStaffOfService = (staffId = "", staff_by_merchant = []) => {
  let title = "";
  const staff = staff_by_merchant.find((s) => s.staffId === staffId);
  if (staffId === 0) {
    return "Any staff";
  }
  if (staffId === -1) {
    return "";
  }
  if (staff) title = staff.displayName;
  return title;
};

export function total_of_service(service, extras) {
  let total = parseFloat(service.price.toString().replace(",", ""));
  let duration = parseInt(service.duration);

  let _extras_of_services = extras.filter(
    (obj) =>
      obj.serviceId === service.serviceId || obj.bookingServiceId === service.bookingServiceId,
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

export const textBottom = (services, products, extras) => {
  let txt = "";
  if (services.length > 0) {
    txt += `${services.length} services`;
  }
  if (products.length > 0) {
    txt = txt ? txt + ", " + `${products.length} products` : `${products.length} products`;
  }
  if (extras.length > 0) {
    txt = txt ? txt + ", " + `${extras.length} extras` : `${extras.length} extras`;
  }
  return txt;
};

export const ripleColorStatus = (status) => {
  switch (status) {
    case "unconfirm":
      return "#FFFF80";
    case "confirm":
      return "#D4F8FC";
    case "checkin":
      return "#1c98ff";
    case "waiting":
      return "#dddddd";
    default:
      return "white";
  }
};

export const convertLatLongToAddress = async (myLat, myLng) => {
  Geocoder.fallbackToGoogle("AIzaSyCEcBBUpQXwO9spOcJ3pmfxaLNI1Can2_4");
  const position = {
    lat: myLat,
    lng: myLng,
  };

  try {
    let response = await Geocoder.geocodePosition(position);
    const { formattedAddress } = response[0];
    return formattedAddress;
  } catch (error) {
    return error.message;
  }
};

export const isEmpty = (list = []) => {
  return _.isEmpty(list);
};

export const FormatPrice = (price) => {
  const checkPrice = price ? price + "" : "0";
  const formatPrice = checkPrice.replace(",", "");
  return parseFloat(formatPrice);
};

export const formatNumberFromCurrency = (currency) => {
  return Number(`${currency}`.replace(/[^0-9.-]+/g, ""));
};

export const formatMoney = (number, decimalCount = 2, decimal = ".", thousands = ",") => {
  let amount = formatNumberFromCurrency(number);
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {}
};

export function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  // h = h < 10 ? '0' + h : h;
  // m = m < 10 ? '0' + m : m;
  if (h !== 0) return `${h} hour ${m} min`;
  return `${m} min`;
}

export const formatPhoneNumberContact = (str) => {
  let cleaned = ("" + str).replace(/\D/g, "");
  let match;
  if ((cleaned.includes("0", 0) || cleaned.includes("1", 1)) && cleaned.length == 10) {
    match = cleaned.match(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/);
  }
  if ((cleaned.includes("0", 0) || cleaned.includes("1", 1)) && cleaned.length == 11) {
    match = cleaned.match(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
  }

  if (match) {
    const formatFirstNumber =
      match[1].indexOf("0", 0) == 0
        ? match[1].replace("0", "+84")
        : match[1].indexOf("1", 0) == 0
        ? match[1].replace("1", "+1")
        : null;
    return formatFirstNumber ? formatFirstNumber + "-" + match[2] + "-" + match[3] : "";
  } else return null;
};

export let formatPhoneStandard = (str) => {
  let cleaned = ("" + str).replace(/\D/g, "");
  let match;
  if (cleaned.length == 9) match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  if (cleaned.length == 10) match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }

  return null;
};

export const sendWhatsApp = (mobile) => {
  let msg = "type something";
  if (mobile) {
    if (msg) {
      let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
      Linking.openURL(url)
        .then((data) => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          alert("Make sure WhatsApp installed on your device");
        });
    } else {
      alert("Please insert message to send");
    }
  } else {
    alert("Please insert mobile no");
  }
};

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export function convertPrice(num) {
  return parseFloat(num)
    .toFixed(2)
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export function splitMothAndYear(date = "") {
  if (date) {
    let arrDate = date.split("");
    let month = `${arrDate[0]}${arrDate[1]}`;
    let year = `${arrDate[2]}${arrDate[3]}`;
    return {
      month,
      year,
      fullDate: month + "/" + year,
    };
  } else {
    return {
      month: "",
      year: "",
    };
  }
}

export const slop = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20,
};

export const convertStatus = (status) => {
  switch (status) {
    case "waiting":
      return "Waiting";
    case "confirm":
      return "Confirm";
    case "unconfirm":
      return "Unconfirm";
    case "checkin":
      return "Check in";
    case "paid":
      return "Paid";
    case "cancel":
      return "Cancel";

    default:
      return "wrong";
  }
};

export function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

export const checkPhone = (number, phoneHeader) => {
  let _phone = number;
  if (phoneHeader == "+84") {
    if (number.toString().charAt(0) == "0") {
      _phone = number.toString().substring(1);
      _phone = replaceAll(_phone, "-", "");
      _phone = formatPhoneStandard(_phone);
    }
  }
  return _phone;
};

export const GOOGLE_API_KEY = "AIzaSyCEcBBUpQXwO9spOcJ3pmfxaLNI1Can2_4";

export function isValidDate(dateString) {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
}

export function randomInteger(min = 1, max = 10000000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
