import {GymfitEvent, RoleKeys} from '@curefit/gymfit-common'
import moment from 'moment'

const getElapsedMs = (date: Date): number => {
  return moment(date).valueOf() - moment().startOf('day').valueOf()
}

export enum UnicodeSymbol {
  DEGREE_SYMBOL = '\u{2109}',
}

export enum EmployeeRole {
  PARTNER = 'PARTNER',
  PARTNER_USER = 'PARTNER_USER',
  INTERNAL_CM = 'INTERNAL CM',
  PARTNER_ADMIN = 'PARTNER_ADMIN',
}

export const RolePriority = [
  EmployeeRole.PARTNER,
  EmployeeRole.PARTNER_ADMIN,
  EmployeeRole.PARTNER_USER,
]

export const RoleName = {
  [RoleKeys.OWNER]: EmployeeRole.PARTNER,
  [RoleKeys.CENTER_MANAGER]: EmployeeRole.PARTNER_ADMIN,
  [RoleKeys.TRAINER]: EmployeeRole.PARTNER_USER,
}

export const EmployeeVitalsRoleName = {
  [RoleKeys.OWNER]: EmployeeRole.PARTNER,
  [RoleKeys.CENTER_MANAGER]: EmployeeRole.PARTNER_ADMIN,
  [RoleKeys.TRAINER]: EmployeeRole.PARTNER_USER,
  [RoleKeys.HOUSEKEEPING]: 'PARTNER_STAFF',
}

export const EmpRoleMap = {
  [EmployeeRole.PARTNER]: RoleKeys.OWNER,
  [EmployeeRole.PARTNER_ADMIN]: RoleKeys.CENTER_MANAGER,
  [EmployeeRole.PARTNER_USER]: RoleKeys.TRAINER,
}

export const EmpRoleMapv2 = {
  [EmployeeRole.PARTNER_ADMIN]: RoleKeys.CENTER_MANAGER,
  [EmployeeRole.INTERNAL_CM]: RoleKeys.CENTER_MANAGER,
  [EmployeeRole.PARTNER_USER]: RoleKeys.TRAINER,
}

export const RoleKeyMap = {
  [RoleKeys.OWNER]: 'Owner',
  [RoleKeys.TRAINER]: 'Trainer',
  [RoleKeys.CENTER_MANAGER]: 'Center Manager',
  [RoleKeys.HOUSEKEEPING]: 'Others',
}

export const RoleSelectionOptions = [
  ...Object.keys(EmpRoleMapv2).map((key: string) => {
    return {
      label: (RoleKeyMap as any)[(EmpRoleMapv2 as any)[key]],
      value: key,
    }
  }),
]

export enum FieldType {
  INPUT = 'input',
  DROPDOWN = 'dropdown',
  TEXT = 'text',
  COMPONENT = 'component',
  TEXTAREA = 'textarea',
  BUTTON = 'button',
  CALENDAR = 'calendar',
  DATE_PICKER_WITH_LABEL = 'date-picker-with-label',
  CHECKBOX = 'checkbox',
  OPTION_FIELD = 'option-field',
  MULTI_SELECT = 'multi-select',
  PRESENTATIONAL_COMPONENT = 'Presentational Component',
}

export enum BtnTypes {
  PRIMARY = 'primary',
  DASHED = 'dashed',
  DANGER = 'danger',
  LINK = 'link',
  SUCCESS = 'success',
  ACTIVE_BORDERED = 'active-bordered',
  BORDERED = 'bordered',
  SECONDARY = 'secondary',
}

export enum OrientationType {
  RIGHT = 'right',
  LEFT = 'left',
}

export enum SelectedWeek {
  prev = 'currentWeekSchedule',
  current = 'currentWeekSchedule',
  next = 'nextWeekSchedule',
}

export enum SelectedModal {
  DELETE,
  ADD_CLASS,
  ADD_FORMAT,
}

export const timeSlotsDivision: {[index: string]: any} = {
  '1': {
    startTime: 4,
    endTime: 9,
  },
  '2': {
    startTime: 9,
    endTime: 14,
  },
  '3': {
    startTime: 14,
    endTime: 18,
  },
  '4': {
    startTime: 18,
    endTime: 23,
  },
}

export interface ClassScheduleSortedByDates {
  [key: string]: GymfitEvent[]
}

export enum TimeSlots {
  '4 AM - 9 AM' = '1',
  '9 AM - 2 PM' = '2',
  '2 PM - 6 PM' = '3',
  '6 PM - 11 PM' = '4',
}

export interface ScheduledClassesByDates {
  currentWeekSchedule: ClassScheduleSortedByTime
  twoWeekClassSchedule: ClassScheduleSortedByTime
  nextWeekSchedule: ClassScheduleSortedByTime
}

export interface ClassScheduleSortedByTime {
  [key: string]: ClassScheduleSortedByDates
}

export enum ClassDayString {
  'MON' = 'MONDAY',
  'TUE' = 'TUESDAY',
  'WED' = 'WEDNESDAY',
  'THUR' = 'THURSDAY',
  'FRI' = 'FRIDAY',
  'SAT' = 'SATURDAY',
  'SUN' = 'SUNDAY',
}

export enum CurrencyUnicode {
  INR = '\u20B9',
}

export enum PaymentColorCode {
  CREATED = 'grey',
  INVOICE_GENERATED = '#ff9600',
  PAYMENT_COMPLETED = '#44d47d',
  PAYMENT_FAILED = '#e54833',
}

export enum PitchSource {
  PHONE = 'PHONE',
  WALKIN = 'WALKIN',
}

export const PitchSourceLabel = {
  [PitchSource.PHONE]: 'On‌ ‌call‌',
  [PitchSource.WALKIN]: '‌At‌ ‌the‌ ‌gym',
}

export const CDN_MEDIA_URL_PREFIX = 'https://cdn-media.cure.fit'

export const reportsConfigv2 = {
  MEMBERSHIP_SALE: {
    columns: [
      'transactionDate',
      'userName',
      'userId',
      'source',
      'packName',
      'amount',
      'orderId',
      'membershipStartDate',
      'membershipEndDate',
    ],
    headers: [
      'Transaction Date',
      'Member Name',
      'UserID',
      'Source',
      'Pack Name',
      'Amount',
      'OrderID',
      'Membership Start Date',
      'Membership End Date',
    ],
  },
  CHECKINS: {
    columns: [
      'checkInDateTime',
      'userName',
      'userId',
      'memberLevel',
      'homeCenterType',
      'amount',
    ],
    headers: [
      'Check-in Date Time',
      'Member Name',
      'UserID',
      'Member Level',
      'Home Center Type',
      'Amount',
    ],
  },
  RECOVERIES: {
    columns: [
      'transactionDate',
      'userName',
      'userId',
      'source',
      'packName',
      'refundAmount',
      'orderAmount',
      'membershipStartDate',
      'originalStartDate',
      'orderId',
      'orderAttributionDate',
      'refundReason',
    ],
    headers: [
      'Transaction Date',
      'Member Name',
      'UserID',
      'Source',
      'Pack Name',
      'Refund Amount',
      'Order Amount',
      'Membership Start Date',
      'Original Membership End Date',
      'OrderID',
      'Order attribution date',
      'Refund reason',
    ],
  },
  CHECKIN_RECOVERY: {
    columns: [
      'checkInDateTime',
      'userName',
      'userId',
      'checkInCenterLevel',
      'checkInCenterType',
      'amount',
    ],
    headers: [
      'Check-in Date Time',
      'Member Name',
      'UserID',
      'Checkin Center Level',
      'Checkin Center Type',
      'Amount',
    ],
  },
}

export const downloadMap = {
  revenuefromsaleofnewpack: 'MEMBERSHIP_SALE',
  atcentersaleofnewpack: 'MEMBERSHIP_SALE',
  onlinesaleofnewpack: 'MEMBERSHIP_SALE',
  revenuefromcultpasspluscheckin: 'CHECKINS',
  cultpasselitememberstaggedtogyms: 'CHECKINS',
  cultpasselitememberstaggedtogxcenters: 'CHECKINS',
  revenuefromcheckinfromothergym: 'CHECKINS',
  cultpasspromemberstaggedtogyms: 'CHECKINS',
  cultpasspromemberstaggedtogxcenters: 'CHECKINS',
  recoverytowardscheckinatothergym: 'CHECKIN_RECOVERY',
  checkinsbytaggedmembersatelitegxcenter: 'CHECKIN_RECOVERY',
  checkinsbytaggedmembersatelitegyms: 'CHECKIN_RECOVERY',
  checkinsbytaggedmembersatprogyms: 'CHECKIN_RECOVERY',
}

export const reportsCSVConfig = {
  CREDIT: {
    MEMBERSHIP_SALE: {
      columns: [
        'transactionId',
        'transactionDate',
        'taggingTime',
        'userName',
        'userId',
        'membershipSource',
        'packName',
        'amount',
        'orderId',
        'membershipStartDate',
        'membershipEndDate',
      ],
      headers: [
        'Transaction ID',
        'Transaction Date',
        'Tagging Time',
        'Member Name',
        'UserID',
        'Source',
        'Pack Name',
        'Price Charged to customer',
        'OrderID',
        'Membership Start Date',
        'Membership End Date',
      ],
      fileName: 'SaleOfNewPacks',
    },
    CULT_MEMBER_CHECKIN: {
      columns: ['transactionDate', 'userName', 'userId', 'amount'],
      headers: ['Check-in Date Time', 'Member Name', 'UserID', 'Amount'],
      fileName: 'CultPassPlusCheckins',
    },
    MEMBER_CHECKIN: {
      columns: [
        'transactionDate',
        'userName',
        'userId',
        'amount',
        'taggedCenterName',
        'taggedCenterLocality',
        'taggedCenterId',
      ],
      headers: [
        'Check-in Date Time',
        'Member Name',
        'UserID',
        'Amount',
        'Tagged Center Name',
        'Tagged Center Locality',
        'Tagged Center CenterID',
      ],
      fileName: 'CheckinsFromOtherGyms',
    },
  },
  DEBIT: {
    MEMBERSHIP_SALE: {
      columns: [
        'transactionId',
        'membershipCancelledAt',
        'membershipCancellationReason',
        'amount',
        'membershipPurchasedAt',
        'taggingTime',
        'userName',
        'userId',
        'membershipSource',
        'packName',
        'membershipPurchaseAmount',
        'orderId',
        'membershipStartDate',
        'membershipEndDate',
      ],
      headers: [
        'Transaction ID',
        'Refund Date',
        'Refund Reason',
        'Refund Amount',
        'Membership Purchase Date',
        'Tagging Time',
        'Member Name',
        'UserID',
        'Source',
        'Pack Name',
        'Price Charged to customer',
        'OrderID',
        'Membership Start Date',
        'Membership End Date',
      ],
      fileName: 'RecoveryTowardsRefunds',
    },
    MEMBER_CHECKIN: {
      columns: [
        'transactionDate',
        'userName',
        'userId',
        'amount',
        'centerName',
        'centerLocality',
        'centerId',
      ],
      headers: [
        'Check-in Date Time',
        'Member Name',
        'UserID',
        'Amount',
        'Checked in at Center Name',
        'Checked in at Center Locality',
        'Checked in at CenterID',
      ],
      fileName: 'CheckinsAtOtherGyms',
    },
  },
}

export enum PaymentMode {
  CASH = 'cash',
  CARD = 'card',
  QR = 'qr',
}

export interface IPaymentDetail {
  mode: PaymentMode
  amount: string | number
  receiptRefNo?: string
  lastFourDigitsOfCard?: string
}

export enum TrainerCheckinStatus {
  NEVER_CHECKED_IN = 'NEVER_CHECKED_IN', // show check in option
  CHECKED_IN = 'CHECKED_IN', // show checkout option with current checkin time
  CHECKED_OUT = 'CHECKED_OUT', // show checkin option with last checkout time
}

export const DaysOfWeek = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN']

export enum Services {
  GYMFIT_PERSONAL_TRAINING = 'GYMFIT_PERSONAL_TRAINING',
  GYMFIT_FLOOR_TRAINING = 'GYMFIT_FLOOR_TRAINING',
  GYMFIT_CENTER_MANAGER = 'GYMFIT_CENTER_MANAGER',
}

export enum MetabaseDashboards {
  CENTER_HEALTH = 'CENTER_HEALTH',
  PARTNER_DASHBOARD = 'PARTNER_DASHBOARD',
  REVENUE = 'REVENUE',
  TRAINER_ATTENDANCE = 'TRAINER_ATTENDANCE',
  PT_SALES = 'PT_SALES',
  GUARANTEED_GUIDANCE = 'GUARANTEED_GUIDANCE',
  MY_MEMBERS = 'MY_MEMBERS',
  LEAD_DETAILS = 'LEAD_DETAILS',
  LUX_LEAD_DETAILS = 'LUX_LEAD_DETAILS',
}

export const ServiceNameMap = {
  [Services.GYMFIT_FLOOR_TRAINING]: 'Floor Training',
  [Services.GYMFIT_PERSONAL_TRAINING]: 'PT',
  [Services.GYMFIT_CENTER_MANAGER]: 'Center Manager',
}

export const ServiceOptions = [
  {
    label: 'PT',
    value: Services.GYMFIT_PERSONAL_TRAINING,
  },
  {
    label: 'Floor Training',
    value: Services.GYMFIT_FLOOR_TRAINING,
  },
]

export const ShiftActions = {
  EDIT_SHIFT: 'EDIT',
  ADD_SHIFT: 'ADD_SHIFT',
  DELETE_SHIFT: 'DELETE_SHIFT',
  DELETE_SHIFT_ALL: 'DELETE_SHIFT_ALL',
  DELETE_SHIFT_PATTERN: 'DELETE_SHIFT_PATTERN',
}

export const DayMap: {
  [key: string]: string
} = {
  MON: 'MONDAY',
  TUE: 'TUESDAY',
  WED: 'WEDNESDAY',
  THUR: 'THURSDAY',
  FRI: 'FRIDAY',
  SAT: 'SATURDAY',
  SUN: 'SUNDAY',
}

export const DayMapInverse = Object.keys(DayMap).reduce((prev: any, key) => {
  return {
    ...prev,
    [String((DayMap as any)[key])]: key,
  }
}, {})

export const RosterTabs = {
  current: 'Current Schedule',
  template: 'Template Roster',
}

export const PQSTabs = {
  current: 'Current Month',
  previous: 'Previous Month',
}

export const ClassesTabs = {
  day: 'Day',
  week: 'Week',
}

const startOfDay = moment().startOf('day')

export const TimeRangesArray = [
  // '1 AM',
  // '2 AM',
  // '3 AM',
  // '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
]

export const TimeRanges = {
  '1 AM': getElapsedMs(moment(startOfDay).add(1, 'hours').toDate()),
  '2 AM': getElapsedMs(moment(startOfDay).add(2, 'hours').toDate()),
  '3 AM': getElapsedMs(moment(startOfDay).add(3, 'hours').toDate()),
  '4 AM': getElapsedMs(moment(startOfDay).add(4, 'hours').toDate()),
  '5 AM': getElapsedMs(moment(startOfDay).add(5, 'hours').toDate()),
  '6 AM': getElapsedMs(moment(startOfDay).add(6, 'hours').toDate()),
  '7 AM': getElapsedMs(moment(startOfDay).add(7, 'hours').toDate()),
  '8 AM': getElapsedMs(moment(startOfDay).add(8, 'hours').toDate()),
  '9 AM': getElapsedMs(moment(startOfDay).add(9, 'hours').toDate()),
  '10 AM': getElapsedMs(moment(startOfDay).add(10, 'hours').toDate()),
  '11 AM': getElapsedMs(moment(startOfDay).add(11, 'hours').toDate()),
  '12 PM': getElapsedMs(moment(startOfDay).add(12, 'hours').toDate()),
  '1 PM': getElapsedMs(moment(startOfDay).add(13, 'hours').toDate()),
  '2 PM': getElapsedMs(moment(startOfDay).add(14, 'hours').toDate()),
  '3 PM': getElapsedMs(moment(startOfDay).add(15, 'hours').toDate()),
  '4 PM': getElapsedMs(moment(startOfDay).add(16, 'hours').toDate()),
  '5 PM': getElapsedMs(moment(startOfDay).add(17, 'hours').toDate()),
  '6 PM': getElapsedMs(moment(startOfDay).add(18, 'hours').toDate()),
  '7 PM': getElapsedMs(moment(startOfDay).add(19, 'hours').toDate()),
  '8 PM': getElapsedMs(moment(startOfDay).add(20, 'hours').toDate()),
  '9 PM': getElapsedMs(moment(startOfDay).add(21, 'hours').toDate()),
  '10 PM': getElapsedMs(moment(startOfDay).add(22, 'hours').toDate()),
  '11 PM': getElapsedMs(moment(startOfDay).add(23, 'hours').toDate()),
}

export const TimeRangeInverse = Object.keys(TimeRanges).reduce(
  (prev: any, key) => {
    return {
      ...prev,
      [String((TimeRanges as any)[key])]: key,
    }
  },
  {},
)

export const views = [
  {
    label: 'Week',
    value: 'Week',
  },
  {
    label: 'Day',
    value: 'Day',
  },
]

export const ShiftTabs = {
  Past: 'Past Shifts',
  Current: 'Current Shifts',
  Upcoming: 'Upcoming Shifts',
}

export enum FOLLOW_UP_STATUS_ENUM {
  FOLLOW_UP = 'FOLLOW_UP',
  FOLLOWUP_WITH_SPACE = 'FOLLOW UP',
  PENDING_FOLLOW_UP = 'PENDING_FOLLOW_UP',
  PENDING_CONNECTED_FOLLOW_UP = 'PENDING_CONNECTED_FOLLOW_UP',
}

export const FOLLOW_UP_STATUSES: string[] = [
  FOLLOW_UP_STATUS_ENUM.FOLLOWUP_WITH_SPACE,
  FOLLOW_UP_STATUS_ENUM.PENDING_FOLLOW_UP,
  FOLLOW_UP_STATUS_ENUM.FOLLOW_UP,
  FOLLOW_UP_STATUS_ENUM.PENDING_CONNECTED_FOLLOW_UP,
]

export enum NotificationStatus {
  SUCCESS,
  FAILURE,
}

export const PaymentStatuses = {
  ACTIVE: 'Pending',
  CONFIRMED: 'Done',
  DELETED: 'Deleted',
}

export const payoutStatusColorMap = {
  ACTIVE: 'text-yellow-cf-300',
  'N/A': 'text-gray-cf-50',
  CONFIRMED: 'text-green-cf',
  DELETED: 'text-red-cf',
}

export const MembershipAction = {
  EXTEND_MEMBERSHIP: 'Extend Membership',
  UPDATE_START_DATE: 'Update Start Date',
  CHANGE_TRAINER: 'Change Trainer',
}

export const CityListForNoTaxBreakup: string[] = [
  'Bangalore',
  'Dehradun',
  'Bhubaneswar',
  'Mysore',
  'Jammu',
  'Rajahmundry',
  'Imphal',
  'Tumkur',
  'Navi_Mum_And_Thane',
  'Hyderabad',
  'Coimbatore',
  'Ahmedabad',
  'Belgaum',
]

export enum OfferSource {
  GYMFIT_PARTNER = 'GYMFIT_PARTNER',
  TELESALES_DASHBOARD = 'TELESALES_DASHBOARD',
  IN_CENTER_SALE = 'IN_CENTER_SALE',
}

export enum DateFormats {
  API_CALL_DATE_FORMAT = 'YYYY-MM-DD',
  TIME_IN_AM_PM = 'hh:mm A',
  TIME_IN_24HR_FORMAT = 'HH:mm:ss',
  TIME_IN_24HR_MIN_FORMAT = 'HH:mm',
  DATE_TIME_FORMAT = 'DD-MMM-YY HH:mm',
  API_CALL_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss',
}

export const FilterByTableAccessors = {
  CLASSES_WEEKLY_TABLE: ['formattedStartTime', 'trainerNames'],
  CLASSES_TABLE: ['workoutName', 'formattedStartTime', 'trainerNames'],
  CLASS_BOOKING_TABLE: ['customerName', 'bookingNumber'],
  TRAINER_CLASSES_TABLE: ['formattedStartTime'],
}

export const TrainerLevelOptions = [
  {
    label: 'Junior',
    value: 0,
  },
  {
    label: 'Senior',
    value: 1,
  },
]

export const weekDayOptions = [
  {
    label: 'Sunday',
    value: 0,
  },
  {
    label: 'Monday',
    value: 1,
  },
  {
    label: 'Tuesday',
    value: 2,
  },
  {
    label: 'Wednesday',
    value: 3,
  },
  {
    label: 'Thursday',
    value: 4,
  },
  {
    label: 'Friday',
    value: 5,
  },
  {
    label: 'Saturday',
    value: 6,
  },
]
