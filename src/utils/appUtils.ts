import {
  GymfitSource,
  ResourceNames,
  RoleBasedAccess,
} from "@curefit/gymfit-common";
import { _ } from "./lodash";
import moment from "moment";
import { Namespace } from "./routePermissions";
import {
  CDN_MEDIA_URL_PREFIX,
  DayMapInverse,
  EmployeeRole,
  EmpRoleMap,
  IPaymentDetail,
  OfferSource,
  PaymentMode,
  RoleKeyMap,
  RolePriority,
  ShiftTabs,
  TimeRangeInverse,
  TrainerCheckinStatus,
} from "../constants";
import { toastError } from "./toastify";
import * as Sentry from "@sentry/react";
import { v4 as uuidv4 } from "uuid";
import { AllCenterType, CenterType, IPartnerCenter } from "../apis/interfaces";

export enum SORT_TYPES {
  ASC = "asc",
  DESC = "desc",
  NONE = "none",
}

const isNonNullObject = (obj: any): boolean => {
  return typeof obj === "object" && obj !== null;
};

const onSortByDate = (column: any, data: any[], sortBy: string): any => {
  return data.sort((element1: any, element2: any) => {
    if (sortBy === SORT_TYPES.ASC) {
      return moment(element1[column.accessor]).diff(
        moment(element2[column.accessor])
      );
    }
    return moment(element2[column.accessor]).diff(
      moment(element1[column.accessor])
    );
  });
};

const onSortByString = (column: any, data: any[], sortBy: string): any => {
  return data.sort((element1: any, element2: any) => {
    if (sortBy === SORT_TYPES.ASC) {
      return element1[column.accessor].localeCompare(element2[column.accessor]);
    }
    return element2[column.accessor].localeCompare(element1[column.accessor]);
  });
};

const onSortByNumber = (column: any, data: any[], sortBy: string): any => {
  return data.sort((element1: any, element2: any) => {
    if (sortBy === SORT_TYPES.ASC) {
      return (
        Number(element1[column.accessor]) - Number(element2[column.accessor])
      );
    }
    return (
      Number(element2[column.accessor]) - Number(element1[column.accessor])
    );
  });
};

const padWithLeadingZeroes = (n: number, width: number): any => {
  const num = `${n}`;
  return num.length >= width
    ? n
    : new Array(width - num.length + 1).join("0") + num;
};

const isEmailValid = (email: string): boolean => {
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
};

const downloadPdfFile = (data: any, fileName = "form_template"): void => {
  const linkSource = `data:application/pdf;base64,${data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

const downloadCSVFile = (
  data: any,
  fileName = "form_template",
  newPage = true
): void => {
  const href = `data:text/csv;charset=utf-8,${encodeURI(data)}`;
  downloadFile(href, `${fileName}.csv`, newPage);
};

const downloadFile = (
  href: string,
  fileName = "form_template.csv",
  newPage = true
): void => {
  const hiddenElement = document.createElement("a");
  hiddenElement.href = href;
  hiddenElement.target = newPage ? "_blank" : "";
  hiddenElement.download = fileName;
  hiddenElement.click();
};

const toTitleCase = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const maskPhoneNumber = (phoneNo: string): string => {
  if (!phoneNo) {
    return phoneNo;
  }
  const lastFourDigits = phoneNo.slice(-4);

  const MASK_TEXT = "XXXXXX";

  return `${MASK_TEXT}${lastFourDigits}`;
};

const maskText = (text: string): string => {
  if (!text) {
    return text;
  }
  return `XXXXXXXXX`;
};

const getCenterNameWithLocality = (selectedCenter: IPartnerCenter): string => {
  return `${_.get(selectedCenter, "name", "")}, ${_.get(
    selectedCenter,
    "locality",
    ""
  )}`;
};

const getNonNullArray = (state: any, search: string): Array<any> => {
  const item = _.get(state, search, []);
  return Array.isArray(item) ? item : [];
};

const hasPermissionForAccessType = (
  userPermissions: any,
  context: Namespace,
  resource: ResourceNames,
  accessType: RoleBasedAccess = RoleBasedAccess.VIEW
): boolean => {
  const permissions =
    userPermissions &&
    _.get(userPermissions, [context, resource], []).filter(
      (access: string) => access === accessType
    );
  return !_.isEmpty(permissions);
};

const getTextFromCamelCase = (input: string): string => {
  return [...input.split("")]
    .map((val, index) => {
      if (index === 0) {
        return val.toUpperCase();
      }
      if (
        /^[A-Z]*$/.test(val) &&
        /^[a-z]*$/.test([...input.split("")][index - 1])
      ) {
        return ` ${val}`;
      }
      return val;
    })
    .join("");
};

const getDateRangeFromStartOfMonthTillDate = (): any => {
  let startDate = moment().startOf("month").format("YYYY-MM-DD");
  const endDate = moment().subtract(1, "d").format("YYYY-MM-DD");

  if (startDate === moment().format("YYYY-MM-DD")) {
    startDate = moment().subtract(1, "month").format("YYYY-MM-DD");
  }

  return {
    startDate,
    endDate,
  };
};

const getDateRangeForLast7days = (): any => {
  const endDate = moment().subtract(1, "d").format("YYYY-MM-DD");
  const startDate = moment().subtract(7, "d").format("YYYY-MM-DD");

  return {
    startDate,
    endDate,
  };
};

const getDateRangeForLast10days = (): any => {
  const endDate = moment().subtract(1, "d").format("YYYY-MM-DD");
  const startDate = moment().subtract(10, "d").format("YYYY-MM-DD");

  return {
    startDate,
    endDate,
  };
};

const getMergedTimestamp = (date: Date, time: Date): any => {
  const onlyDate = moment(date).format("YYYY/MM/DD");
  const onlyTime = moment(time).format("h:mm a");

  const mergedDateTime = moment(`${onlyDate} ${onlyTime}`);
  return mergedDateTime.valueOf();
};

const ordinalSuffixOf = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return `${num}st`;
  }
  if (j === 2 && k !== 12) {
    return `${num}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${num}rd`;
  }
  return `${num}th`;
};

const getCheckinStatus = (userCheckins: any[] = []): any => {
  let checkedIn: any = false;
  let lastCheckIn: any = null;
  let lastCheckOut: any = null;
  let checkInTime: any = null;
  const sortedCheckins = userCheckins.sort(
    (a: any, b: any) => Number(a?.checkInTime) - Number(b?.checkInTime)
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const attendance of sortedCheckins) {
    if (attendance?.checkInTime && !attendance?.checkOutTime) {
      checkedIn = true;
      lastCheckIn = moment(attendance.checkInTime).format("LT");
      checkInTime = lastCheckIn;
      break;
    } else if (attendance?.checkInTime && attendance?.checkOutTime) {
      checkedIn = false;
      lastCheckOut = moment(attendance.checkOutTime).format("LT");
      checkInTime = moment(attendance.checkInTime).format("LT");
    }
  }

  return {
    status: !checkedIn
      ? !lastCheckOut
        ? TrainerCheckinStatus.NEVER_CHECKED_IN
        : TrainerCheckinStatus.CHECKED_OUT
      : TrainerCheckinStatus.CHECKED_IN,
    lastCheckIn,
    lastCheckOut,
    checkInTime,
  };
};

const sortRolesByPriority = (roles: any[], sortingOrder: string[]): any[] => {
  const roleMap: any = {};
  let sortedArray: any[] = [];
  roles.forEach((role) => {
    const { roleName = "" } = role;
    if (sortingOrder.includes(roleName)) {
      // eslint-disable-next-line no-prototype-builtins
      if (roleMap.hasOwnProperty(roleName)) {
        roleMap[roleName].push(role);
      } else {
        roleMap[roleName] = [role];
      }
      // eslint-disable-next-line no-prototype-builtins
    } else if (roleMap.hasOwnProperty("others")) {
      roleMap.others.push(role);
    } else {
      roleMap.others = [role];
    }
  });
  sortingOrder.forEach((roleName) => {
    // eslint-disable-next-line no-prototype-builtins
    if (roleMap.hasOwnProperty(roleName)) {
      sortedArray = [...sortedArray, ...roleMap[roleName]];
    }
  });
  // eslint-disable-next-line no-prototype-builtins
  if (roleMap.hasOwnProperty("others")) {
    sortedArray = [...sortedArray, ...roleMap.others];
  }
  return sortedArray;
};

const getCompleteMs = (timeMs: number): Date => {
  return moment(moment().startOf("day").valueOf() + timeMs).toDate();
};

const getElapsedMs = (date: Date): number => {
  return moment(date).valueOf() - moment(date).startOf("day").valueOf();
};

const getSlotsForWeekSchedule = (slots: any[]): any => {
  const slotUsers: any = {};
  slots.forEach((slot: any) => {
    const { shiftPatternEntry = {} } = slot;
    const { identityId = "", recurrenceDetails = {} } = shiftPatternEntry;
    const { dayOfWeek = "" } = recurrenceDetails;
    const shortDay = DayMapInverse?.[dayOfWeek] || "";
    if (!(shortDay in slotUsers)) {
      slotUsers[shortDay] = {};
    }
    if (!(String(identityId) in slotUsers[shortDay])) {
      slotUsers[shortDay][String(identityId)] = [];
    }
    if (identityId && shortDay) {
      slotUsers[shortDay][String(identityId)].push(slot);
    }
  });
  return slotUsers;
};

const getShiftPatternsForWeekSchedule = (patterns: any[]): any => {
  const slotUsers: any = {};
  patterns.forEach((pattern: any) => {
    const { identityId = "", recurrenceDetails = {} } = pattern;
    const { dayOfWeek = "" } = recurrenceDetails;
    const shortDay = DayMapInverse?.[dayOfWeek] || "";
    if (!(shortDay in slotUsers)) {
      slotUsers[shortDay] = {};
    }
    if (!(String(identityId) in slotUsers[shortDay])) {
      slotUsers[shortDay][String(identityId)] = [];
    }
    if (identityId && shortDay) {
      slotUsers[shortDay][String(identityId)].push(pattern);
    }
  });
  return slotUsers;
};

const getShiftsForDay = (shifts: any[]): any => {
  const slotUsers: any = {};
  shifts.forEach((shift: any) => {
    const { shiftPatternEntry = {} } = shift;
    const { identityId = "", recurrenceDetails = {} } = shiftPatternEntry;
    const { startTimeInMillis = 0 } = recurrenceDetails;
    const nearestStartHour = moment(getCompleteMs(startTimeInMillis))
      .startOf("hour")
      .toDate();
    const nearestHourElapsedMs = getElapsedMs(nearestStartHour);
    const strTime = String(nearestHourElapsedMs);
    const shortTime = TimeRangeInverse?.[strTime] || "";
    if (!(shortTime in slotUsers)) {
      slotUsers[shortTime] = {};
    }
    if (!(String(identityId) in slotUsers[shortTime])) {
      slotUsers[shortTime][String(identityId)] = [];
    }
    if (identityId && shortTime) {
      slotUsers[shortTime][String(identityId)].push(shift);
    }
  });
  return slotUsers;
};

const getShiftsSortedByTime = (shifts: any[], currentTimeMs: number): any => {
  const result: any = {
    [ShiftTabs.Past]: [],
    [ShiftTabs.Current]: [],
    [ShiftTabs.Upcoming]: [],
  };
  shifts.forEach((shift: any) => {
    const { shiftPatternEntry = {} } = shift;
    const { recurrenceDetails = {} } = shiftPatternEntry;
    const { startTimeInMillis = 0, endTimeInMillis = 0 } = recurrenceDetails;
    if (
      currentTimeMs >= startTimeInMillis &&
      currentTimeMs <= endTimeInMillis
    ) {
      result[ShiftTabs.Current].push(shift);
    } else if (endTimeInMillis < currentTimeMs) {
      result[ShiftTabs.Past].push(shift);
    } else if (startTimeInMillis > currentTimeMs) {
      result[ShiftTabs.Upcoming].push(shift);
    }
  });
  return result;
};

const getFirstValidRole = (roles: any[]): string => {
  const sortedRoles = AppUtils.sortRolesByPriority(roles, RolePriority);
  const role = sortedRoles.find((role) => {
    const { roleName = "" } = role;
    if (roleName in EmpRoleMap) {
      return true;
    }
    return false;
  });

  if (!_.isEmpty(role)) {
    return (
      RoleKeyMap?.[
        EmpRoleMap?.[
          _.get(
            role,
            "roleName",
            "none"
          ) as EmployeeRole as keyof typeof EmpRoleMap
        ]
      ] || ""
    );
  }
  return "Staff";
};

const convertQueryParamsToString = (queryParams: any): string => {
  if (_.isEmpty(queryParams)) {
    return "";
  }
  const urlParams = new URLSearchParams(Object.entries(queryParams));
  return `?${urlParams.toString()}`;
};

const getLowestPerSessionPrice = (level: string, ptPacks: any): number => {
  if (!(level in ptPacks)) {
    return 0;
  }
  let lowestPrice = Infinity;
  ptPacks[level]?.forEach?.((pack: any) => {
    const { price, listingCategory } = pack;
    const { sellingPrice } = price;
    const totalSessions = _.get(
      listingCategory,
      "restrictions[0].restrictionCount",
      Infinity
    );
    const perSessionPrice = sellingPrice / totalSessions;
    lowestPrice = perSessionPrice < lowestPrice ? perSessionPrice : lowestPrice;
  });

  return lowestPrice === Infinity ? 0 : lowestPrice;
};

const getLevelName = (level: string): string => {
  const levelNo = level.split("")?.[1] || "-";
  return `Level ${levelNo}`;
};

const getSuccessBodyForNonPaytmPayments = (
  manualPayments: any[],
  sellingPrice: string
): any => {
  const totalPrice = Number(sellingPrice) * 100;
  let currentPrice = 0;

  const paymentModes: IPaymentDetail[] = manualPayments?.map((payment) => {
    const { mode, amount, rrn, lastCardDigits } = payment;
    const paymentAmount = Number(amount) * 100;
    currentPrice += paymentAmount;
    if (mode?.value === PaymentMode.CASH) {
      return {
        mode: PaymentMode.CASH,
        amount: paymentAmount,
      };
    }
    if (mode?.value === PaymentMode.QR) {
      return {
        mode: PaymentMode.QR,
        rrn,
        amount: paymentAmount,
      };
    }
    if (mode?.value === PaymentMode.CARD) {
      return {
        mode: PaymentMode.CARD,
        rrn,
        amount,
        lastFourDigitsOfCard: lastCardDigits,
      };
    }
    return {} as IPaymentDetail;
  }, []);

  if (currentPrice !== totalPrice) {
    toastError("Payment amount does not match the pack price");
    return {};
  }

  return {
    gatewayOrderId: "",
    signature: "",
    paymentData: {
      paymentId: "",
      amount: totalPrice,
      channel: "MANUAL",
      currency: "INR",
      data: {
        paymentModes,
      },
    },
  };
};

const getReqBodyForCreatingOrder = (
  startDate: Date,
  sportsSelection: any | null,
  type: AllCenterType,
  packDetails: any,
  userDetails: any,
  selectedCenter: any,
  ptDetails: any,
  isPtPack: boolean,
  cultCenterId: string | number,
  sellingPrice: string | number,
  ptSlotDetails: any,
  userContext: any
): any => {
  const { id: userId } = userDetails;
  const cityId = _.get(selectedCenter, "address.city.cityId", "");

  let reqBodyForCreatingOrder: any = {};

  if (selectedCenter.partnerCenterType === CenterType.PLAY) {
    reqBodyForCreatingOrder = {
      userId: Number(userId),
      deviceId: uuidv4(),
      source: OfferSource.GYMFIT_PARTNER,
      products: [
        {
          productId: _.get(packDetails, "productId", ""),
          quantity: 1,
          option: {
            startDate: moment(startDate).format("YYYY-MM-DD"),
          },
        },
      ],
      clientMetadata: {
        centerId: selectedCenter?.centerServiceId,
        centerServiceCenterId: selectedCenter?.centerServiceId,
        preferredSport: sportsSelection?.label,
        workoutId: sportsSelection?.value,
      },
    };
  } else if (isPtPack) {
    const { trainer = {} } = ptDetails;
    if (!(trainer?.identityId || null)) {
      toastError("Trainer details not available");
      Sentry.captureException(new Error("Trainer details not available"));
      return {};
    }
    reqBodyForCreatingOrder = {
      userId: Number(userId),
      deviceId: uuidv4(),
      source: GymfitSource.GYMFIT_PARTNER,
      products: [
        {
          productId: _.get(packDetails, "productId", ""),
          quantity: 1,
          option: {
            centerId: selectedCenter?.id || 0,
            startDate: moment(startDate).format("YYYY-MM-DD"),
            gymPtOrderOptions: {
              preferredTrainerId: trainer?.identityId,
              ...(packDetails?.productType === "GYM_PT_PPC_PRODUCT"
                ? {
                    ppcSlotStartTime: moment(
                      ptSlotDetails?.startTime
                    ).valueOf(),
                    ppcSlotEndTime: moment(ptSlotDetails?.endTime).valueOf(),
                  }
                : {}),
            },
          },
        },
      ],
      dontCreateRazorpayOrder: true,
      offersVersion: 3,
      cityId,
      clientMetadata: {
        centerId: selectedCenter?.id || 0,
        createdBy: userContext.email,
      },
    };
  } else if (type === AllCenterType.GOLD || type === AllCenterType.LUX) {
    reqBodyForCreatingOrder = {
      userId: Number(userId),
      deviceId: uuidv4(),
      source: GymfitSource.GYMFIT_PARTNER,
      products: [
        {
          productId: _.get(packDetails, "productId", ""),
          quantity: 1,
          option: {
            centerId: selectedCenter?.id || 0,
            startDate: moment(startDate).format("YYYY-MM-DD"),
          },
        },
      ],
      useOffersV2: true,
      dontCreateRazorpayOrder: true,
      cityId,
      clientMetadata: {
        centerId: selectedCenter?.id || 0,
        createdBy: userContext.email,
      },
    };
  } else {
    reqBodyForCreatingOrder = {
      userId: Number(userId),
      deviceId: uuidv4(),
      source: GymfitSource.GYMFIT_PARTNER,
      products: [
        {
          productId: `CULTPACK${_.get(packDetails, "id", 0)}`,
          quantity: 1,
          option: {
            startDate: moment(startDate).format("YYYY-MM-DD"),
          },
        },
      ],
      useOffersV2: true,
      dontCreateRazorpayOrder: true,
      cityId,
      clientMetadata: {
        centerId: cultCenterId,
        centerServiceCenterId: selectedCenter?.centerServiceId || 0,
        createdBy: userContext.email,
      },
    };
  }

  const price = Number(sellingPrice) * 100;

  const reqBodyForPaymentSuccess = {
    gatewayOrderId: "",
    signature: "",
    paymentData: {
      paymentId: "",
      amount: price,
      channel: "MANUAL",
      currency: "INR",
      data: {
        paymentModes: [
          {
            mode: "cash",
            amount: price,
          },
        ],
      },
    },
  };

  const createPaytmGatewayOrderReqBody = (tid: string): any => ({
    gatewayType: "PAYTM_POS",
    paymentMode: "POS",
    userId: String(userId),
    meta: {
      tid,
      requestId: uuidv4(),
    },
  });
  return {
    reqBodyForCreatingOrder,
    reqBodyForPaymentSuccess,
    createPaytmGatewayOrderReqBody,
  };
};

const getCDNImageUrl = (displayImage: string): string =>
  `${CDN_MEDIA_URL_PREFIX}${displayImage}`;

const getCDNImageUrlExtended = (displayImage: string): string =>
  `https://cdn-images.cure.fit/www-curefit-com/image/upload${displayImage}`;

export const AppUtils = {
  SORT_TYPES,
  isNonNullObject,
  onSortByDate,
  onSortByString,
  onSortByNumber,
  padWithLeadingZeroes,
  isEmailValid,
  downloadCSVFile,
  downloadFile,
  toTitleCase,
  maskPhoneNumber,
  maskText,
  getCenterNameWithLocality,
  getNonNullArray,
  hasPermissionForAccessType,
  getTextFromCamelCase,
  getDateRangeFromStartOfMonthTillDate,
  getDateRangeForLast7days,
  getDateRangeForLast10days,
  getMergedTimestamp,
  ordinalSuffixOf,
  getCheckinStatus,
  sortRolesByPriority,
  getCompleteMs,
  getElapsedMs,
  getSlotsForWeekSchedule,
  getShiftPatternsForWeekSchedule,
  getShiftsForDay,
  getShiftsSortedByTime,
  getFirstValidRole,
  convertQueryParamsToString,
  downloadPdfFile,
  getLowestPerSessionPrice,
  getLevelName,
  getSuccessBodyForNonPaytmPayments,
  getReqBodyForCreatingOrder,
  getCDNImageUrl,
  getCDNImageUrlExtended,
};
