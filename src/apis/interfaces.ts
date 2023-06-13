import {
  GymfitProductType,
  WeeklyEventCreationRequest,
} from '@curefit/gymfit-common'
import {PitchSource} from '../constants'
import {City} from '@curefit/location-common'
import {
  GymfitCenterCategory,
  GymfitPitchSource,
  GymfitPitchStatus,
} from '@curefit/gymfit-common/dist/src/Models'

type IConfig = {
  queryKey: any[]
  queryFn: (...args: any) => Promise<any>
}

type ICurrentCheckInPayload = {
  centerId: number
  includeUserDetails: boolean
  pageNumber: number
  pageSize: number
}

type IUserDetailPayload = {
  phone: string
}

type IUserSearchById = {
  userId: string
}

type IUserMembershipPayload = {
  userId: string
  centerId: number
  key: string
  centerServiceId: number
}

type ICheckinId = string | 0

type IAssignTrainerPayload = {
  centerId: string | 0
  checkInId: string | 0
  trainerId: string | 0
}

type IStartSessionPayload = {
  qrCode: string | 0
  identityId: string | 0
  centerId: string | 0
}

type IGetUserPhoneNumberPayload = {
  userId: string | 0
  centerId: string | 0
}

type IMetabasePayload = {
  payload: any
  query: any
  fragmentIdentifier: any
}

type IGetEmployeeVitalsParams = {
  centerId: string
  fromDate: string
  toDate: string
}

enum RoleKeys {
  OWNER = 'owner',
  TRAINER = 'trainer',
  CENTER_MANAGER = 'centerManager',
  HOUSEKEEPING = 'housekeeping',
}

interface IEmployeeVitalsData {
  typeOfEmployee: RoleKeys
  employeeName: string
  temperature: number
  oxygenReading: number
  centerId: string
}

interface IAddEmployeeVitalsPayload extends IEmployeeVitalsData {
  employeeId?: string
  recordedByEmployeeId?: string
}

interface IGetEmployeeListParams {
  centerServiceId?: number
  centerId: string
  roleName: string
}

interface IGetClassScheduleParams {
  centerId: string
  fromTimeUTC: number
  toTimeUTC: number
}

interface IGetBaseEventsParams {
  centerServiceId?: number
  centerId: string
}

interface ICreateClassEventsParams {
  centerId: string
  classDetails: WeeklyEventCreationRequest
}

interface IDeleteClassEventParams {
  centerId: string
  baseEventId: number
  recurrence: boolean
}

interface ICreateEmployeeParams {
  centerId: any
  employeeDetail: {
    email: string
    phone: number
    firstName: string
    lastName: string
    password: string
  }
}

interface IDeleteEmployeeParams {
  centerId: string
  employeeId: string
}

interface ISearchEmployee {
  centerId: string
  email: string
}

interface IGetReceivablesParams {
  centerId: string
  start: number
  end: number
}

interface IRaiseIssueParams {
  centerId: string
  title: string
  description: string
  issueType: string
}

interface IRaiseInjuryParams {
  centerId: string
  checkinId: string
}

interface ISearchBCARecordsReqBody {
  userId?: string
  centerId?: string
  phoneNumber?: string
}

interface ITrainersCheckins {
  identityIds: number[]
  checkInTimeFrom: number
  checkInTimeTo: number
}

interface ICreateBCARecordReqBody {
  userId?: string | number | null
  phoneNumber?: string | null
  centerId: string
  weight: string
  muscleMass?: string
  fatMass?: string
  bodyFatPercentage?: string
  basalMetabolicRate?: string
  visceralFatLevels?: string
}

interface ICheckoutReqBody {
  checkinId: string
  userId: string
}

interface ICheckinTrainerReqBody {
  userId: string
  action: 'CHECKIN' | 'CHECKOUT'
  centerId: string
}

interface ICreateUserCheckinReqBody {
  userId: number
  centerId: string
  cityId: string
}

interface ICreateWalkinUserReqBody {
  firstName: string
  lastName: string
  phone: string
  countryCallingCode: string
  welcomeMessage: string
  centerId: string
}

interface ICheckinAsTrialReqBody {
  reqBody: ICreateWalkinUserReqBody
  cityId: string
}

type ICurrentUserCheckInPayload = {
  centerId: number
  includeUserDetails: boolean
  pageNumber: number
  pageSize: number
  phoneNumber: string
}

interface ISendOtpReqBody {
  namespace: string
  identifier: string
  context: string
  userData: {
    phone: {
      phoneNumber: string
      countryCallingCode: string
    }
  }
  mediums: string[]
}

interface IVerifyOtpReqBody {
  namespace: string
  identifier: string
  context: string
  otp: string
}

interface IGetPacksQParams {
  userId: string
  cityId: string
  centerId: string
  phone: string
  productType: string
}

interface IGetPackListingsForPT {
  userId?: string
  phone?: string
  cityId: string
  centerId: string
  productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT'
}

interface IGetSpotOffersForPT {
  centerId: string
  cityId: string
  productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT'
  userId?: string
  phone?: string
  productIds?: string[]
}

interface IGetSpotOffers {
  cityId: string
  centerId: string
  productType?: string
  userId?: string
  phone?: string
  productIds?: string[]
  centerServiceId?: string
}

interface IGetSpotOffersV2 {
  centerId: number | string
  userInfo: {
    userId: number
    phone: string
  }
  cityId: string
  productIds: string[]
  orderSource: string
}
interface IGetOfferEligibilityForUser {
  offerId: string
  eligibilityType: string
  eligibilityValue: string
}

interface ICheckUserinSegment {
  userId: string
  segmentId: number
}

interface IPremiumPacks {
  centerID: number
  userID: number
  phone: string
  cultCenterId: number
  cityId: string
}

interface IPlayPacks {
  userID: number
  cityId: string
}

interface IPremiumPackInfo {
  centerServiceCenterId: number
}

interface IPremiumSpotOffers {
  centerId: number
  userId: number
  cityId: string
  phone: string
  productIds: string[]
}

interface IPremiumSpotOffersV2 {
  centerId: number
  userInfo: {
    userId: number
    phone: string
  }
  cityId: string
  productIds: string[]
  orderSource: string
}

interface ISpotOffers {
  centerServiceId: number
  userId: number
  cityId: string
  phone: string
  productIds: string[]
}

interface IPremiumMemberships {
  packID: number
  userID: number
}

interface ISearchPitchReqBody {
  centerId?: string
  centerServiceCenterId: string
  customerPhone?: string
  startTime?: string
  endTime?: string
}

interface IRecordPitchFormData {
  customerName: string
  customerPhone: string
  customerEmail?: string
  center: {
    label: string
    value: string
  }
  employee: string | null
  source: PitchSource
  remarks: string
}

interface IBenifit {
  name: string
  allowOverlap: boolean
}

interface IGetMembershipStartDate {
  userId: string
  tenant: string
  durationSeconds: number
}

interface ICreateProSpotOfferUser {
  offerIds: string
  startDate: Date
  endDate: Date
  eligibilityType: string
  eligibilityValue: string
  count: number
  userId: string
  phone: string
  addedBy?: string
  productType?: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT'
  client: string
  idempotenceKey: string
}

interface ICreatePremiumSpotOfferUser {
  offerId: string
  startDate: number
  endDate: number
  eligibilityType: string
  eligibilityValue: string
  count: number
  userId: string
  phone: string
  addedBy: string
  client: string
  idempotenceKey: string
}

interface ICreatePlaySpotOfferUser {
  offerIds: string
  startDate: Date
  endDate: Date
  eligibilityType: string
  eligibilityValue: string
  count: number
  userId: string
  phone: string
  client: string
  idempotenceKey: string
  addedBy?: string
  productType?: GymfitProductType.PLAY
}

interface IEnableSpotOffer {
  userId: string
  offerId: string
  addedBy: string
}

interface IUserId {
  userId: string
}

interface IGetChecklists {
  centerId: number
  timeFrom?: string
  timeTo: string
}

interface IGetChecklistSubtasks {
  centerChecklistId: number
}

interface ISubtaskUpdate {
  id: number
  checklistSubtaskId: number
  centerChecklistId: number
  status: 'COMPLETE' | 'INCOMPLETE'
}

interface ICheckListUpdate {
  checklistId: number
  body: any
}

interface ICheckinPasscodeDetails {
  centerId: string
  checkinId: string
  passcode: string
}

interface IGetCollatedMembershipStartDate {
  userId: string
  tenant: string
  durationSeconds: number
  isPtPack?: boolean
  centerServiceId: number
}

interface ICenterServiceId {
  centerServiceId: number
}

type ICreateRoster = {
  identityId: number
  centerId: string
  tenantId: number
  services: string[]
  validFrom: number
  recurrenceDetails: {
    recurrence: string
    startTimeInMillis: number
    endTimeInMillis: number
    dayOfWeek: string
  }
  publish: boolean
  publishLength: number
}

type IBulkCreateRoster = {
  identityId: number
  centerId: string
  tenantId: number
  services: string[]
  validFrom: number
  bulkRecurrenceDetails: {
    recurrence: string
    startTimeInMillis: number
    endTimeInMillis: number
    daysOfWeek: string[]
  }
  publish: boolean
  publishLength: number
  singleInstance: boolean
}

interface IGetBookedSlots {
  centerId: string
  fromTime: number
  toTime: number
}

interface IDeleteShift {
  deleteFutureShifts: boolean
  shiftId: number
}

interface IDeleteShiftPattern {
  deleteFrom: number
  shiftPatternId: number
}

interface IGetShiftPatterns {
  centerIds: string[]
}

interface IUpdateShiftPattern {
  shiftPatternId: number
  reqBody: ICreateRoster
}

type IUpdateShift = {
  shiftId: number
  reqBody: {
    endDateTime: number
    startDateTime: number
    services: string[]
    updateFutureShifts: boolean
  }
}

type IGetAgentDetails = {identityId: string}

interface IUpdateAgentsEventParams {
  agentId: number
  trainerDetail: any
}
interface IUpdateAgentsAssetsEventParams {
  agentId: number
  trainerAsset: any
}

interface IUpdateAgentsPicEventParams {
  agentId: number
  file: any
}

enum InteractionStatusEnum {
  RINGED = 'RINGED',
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  FAILED = 'FAILED',
  CONNECTED = 'CONNECTED',
  ATTEMPTED = 'ATTEMPTED',
  CANCELLED = 'CANCELLED',
}
interface ICallTrail {
  campaignId: string
  campaignName: string
  createdBy: string
  createdOn: number
  lastModifiedOn: number
  remarks: string
  status: string
  userId: string
  agentName: string
  callerInteractionStatus: string
  interactionStatus: InteractionStatusEnum
  receiverInteractionStatus: string
  recordingUrl: string
  subStatus: string
  packId?: string
  packProductType?: string
}

interface Task {
  uuid: string
  campaignId: string
  campaignName: string
  remark: string
  userId: string
  status: string
  user: IUserInfo
  interactionStatus: string
  expiryTime: number
  campaignConfig: CampaignConfig
  subStatus?: string
  userPreferences: UserPreferences
  score?: number
}

interface UserPreferences {
  city: City
  defaultCity: City
}

interface CampaignConfig {
  interactionType: string
  assigneeType: string
  expiryInDays: number
  dispositions: string[]
  endStatus: string
  cmCampaign: boolean
  restrictFollowUpScheduling: boolean
  dispositionsHierarchy?: {
    [key: string]: string[]
  }
  dispositionConfigs?: {
    [key: string]: {
      types: {
        [key: string]: string
      }
    }
  }
}

interface IUserInfo {
  code: string
  name: string
  targetTypeId?: number
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  countryCallingCode: string // "+91"
  gender?: string
}

interface WidgetProps {
  handleEvent?: (name: string, data: any) => void
  task?: Task
  widgetName?: string
  refresh?: () => void
}

interface RecordReferralReqBody {
  centerDetails: {
    centerType: any
    centerId: string | number
    centerServiceCenterId: string
    centerCategory: string
  }
  customerDetails: {
    email: string
    phone: string
    name: string
    remarks: string
  }
  referralSubmittedByEmailId: string
  referredByUserId: string | number
}

interface IGetSettlementCycleDetails {
  sellerId: string
  date: string
}

interface IGetSettlements {
  centerId: number
  startDate: number
  endDate: number
}

interface IGetInvoicePaymentDetails {
  startDate: string // date"2022-02-21"
  endDate: string
  mercatusSellerId: string
}

interface IApproveInvoice {
  invoiceNo: string
  userEmailId: string
}

interface IDownloadInvoice {
  invoiceNo: string
}

interface IRewardInformationParams {
  userId: string
}

interface ISendPaymentLinkParams {
  userId: string
}

interface ISendPaymentLinkReqBody {
  agentEmail: string
  status: string
  paymentLinkData: {
    packProductType: string
    packId: string
  }
}

interface IActivatePtSpotOffer {
  addedBy: string
  offerId: string
  productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT'
  userId: string
}

interface IActivatePlaySpotOffer {
  addedBy: string
  offerId: string
  productType: GymfitProductType.PLAY
  userId: string
}

interface IActivatePtSpotOfferSub {
  offerId: string
  productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT'
  userId: string
}

export type {
  IConfig,
  ICurrentCheckInPayload,
  IUserDetailPayload,
  IUserMembershipPayload,
  ICheckinId,
  IAssignTrainerPayload,
  IStartSessionPayload,
  IGetUserPhoneNumberPayload,
  IMetabasePayload,
  IGetEmployeeVitalsParams,
  RoleKeys,
  IEmployeeVitalsData,
  IAddEmployeeVitalsPayload,
  IGetClassScheduleParams,
  IGetBaseEventsParams,
  ICreateClassEventsParams,
  IDeleteClassEventParams,
  ICreateEmployeeParams,
  IDeleteEmployeeParams,
  ISearchEmployee,
  IGetReceivablesParams,
  IRaiseIssueParams,
  ISearchBCARecordsReqBody,
  ICreateBCARecordReqBody,
  ICheckoutReqBody,
  ICurrentUserCheckInPayload,
  ISendOtpReqBody,
  IVerifyOtpReqBody,
  IGetPacksQParams,
  IGetSpotOffers,
  IGetOfferEligibilityForUser,
  ICheckUserinSegment,
  IPremiumPacks,
  IPremiumPackInfo,
  IPremiumSpotOffers,
  ISpotOffers,
  IPremiumMemberships,
  ISearchPitchReqBody,
  IGetEmployeeListParams,
  ICreateUserCheckinReqBody,
  ICreateWalkinUserReqBody,
  ICheckinAsTrialReqBody,
  IRecordPitchFormData,
  IGetMembershipStartDate,
  ICreateProSpotOfferUser,
  IEnableSpotOffer,
  ICreatePremiumSpotOfferUser,
  ICreatePlaySpotOfferUser,
  IUserId,
  IGetChecklists,
  IGetChecklistSubtasks,
  ISubtaskUpdate,
  IUserSearchById,
  ICheckinPasscodeDetails,
  IGetCollatedMembershipStartDate,
  ICheckinTrainerReqBody,
  ITrainersCheckins,
  ICheckListUpdate,
  ICenterServiceId,
  ICreateRoster,
  IGetBookedSlots,
  IDeleteShift,
  IGetShiftPatterns,
  IUpdateShiftPattern,
  IUpdateShift,
  IBulkCreateRoster,
  IDeleteShiftPattern,
  IGetAgentDetails,
  ICallTrail,
  Task,
  UserPreferences,
  CampaignConfig,
  IUserInfo,
  WidgetProps,
  RecordReferralReqBody,
  IGetSettlementCycleDetails,
  IGetSettlements,
  IGetInvoicePaymentDetails,
  IApproveInvoice,
  IDownloadInvoice,
  IRewardInformationParams,
  ISendPaymentLinkReqBody,
  ISendPaymentLinkParams,
  IGetPackListingsForPT,
  IGetSpotOffersForPT,
  IActivatePtSpotOffer,
  IActivatePtSpotOfferSub,
  IActivatePlaySpotOffer,
  IUpdateAgentsEventParams,
  IUpdateAgentsAssetsEventParams,
  IUpdateAgentsPicEventParams,
  IRaiseInjuryParams,
  IBenifit,
  IPlayPacks,
  IPremiumSpotOffersV2,
  IGetSpotOffersV2,
}

export enum CenterType {
  'GYM' = 'GYM',
  'HYBRID_CENTER' = 'HYBRID_CENTER',
  'PLAY' = 'PLAY',
}

export interface IPartnerCenter {
  address: {
    city: {
      cityId?: string
    }
  }
  centerServiceId: number
  id: string | ''
  cultCenterId?: string | null
  locality: string
  name: string
  seller: {
    mercatusSellerId: string
  }
  type: AllCenterType | null
  tenantID: null
  partnerCenterType: CenterType
  playCenterId?: string | null
}

export interface IWorkoutTrainer {
  id: string
  name: string
  email: string
  phone: string
  countryCallingCode: string
  workouts: any[]
  level: number
}

export interface ICounts {
  classAttendedBookingsCount: number
  classBeginnersCount: number
  classBookingsCount: number
  classPPCCount: number
  classTrialsCount: number
  id: number
}

export interface ICenters {
  id: number
  name: string
  ptCenterID: number
  cityID: number
}

export interface IClasses {
  counts: ICounts[]
  formattedStartTime: string
  id: number
  isPulseClass: boolean
  isPulseDisabled?: boolean
  trainerNames: string[]
  trainers: []
  workout: number
  workoutName: string
  rainMode: any
  needsAttention: boolean
  reason: string
  startTimeForTableDisplay: string
  isActive: boolean
  trainerDetails: IWorkoutTrainer
  startDateTimeUTC: string
}
export interface IClassWeeklyViewDetails {
  date: string
  startDateTimeUTC: string
  endDateTimeUTC: string
  formattedStartTime: string
  isPeakSlot: boolean
  formattedEndTime: string
  id: number
  center: number
  workout: number
  isActive: boolean
  startTime: string
  endTime: string
  cultAppSeatsQuota: number
  cultAppAvailableSeats: number
  targetCultClassSeats?: any
  actualStartTime?: any
  actualEndTime?: any
  allowPPC: boolean
  allowTrial: boolean
  attendanceTaken: boolean
  rainMode?: any
  isPulseEnabled: boolean
  Center: ICenters
  Bookings: any[]
  needsAttention: boolean
  reason: string
  trainers: any[]
  centerName?: string
  trainerDetails: IWorkoutTrainer
}

export interface IWodReps {
  unit: string
  reps: string
}
export interface IWodMovement {
  id: string
  title: string
  beginnerReps: IWodReps
  advancedReps: IWodReps
}

export interface IFetchActiveSegmentsParams {
  userId: string
}

export interface IActiveOffersParams {
  userId: string
  sku: string
  source: string
  phone?: string
  centerId?: string
}

export interface IRemoveUserFromSegmentParams {
  userId: string
  segmentId: string
}

export interface IRemoveOfferEligibilityParams {
  userId: string
  offerId: string
  count: number
  removedBy: string
  source?: string
}

export interface IGetCenterByCityAndVerticalParams {
  vertical: string
  city: string
}

export interface IPaymentCompleteReqBody {
  orderId: string
  cfPaymentId: string
  initiationSource: string
}

export interface IPaymentCancelReqBody {
  orderId: string
  cfPaymentId: string
  initiationSource: string
}

export interface IFulfillmentStatus {
  orderId: string
}

export interface IFilterOrderReqParam {
  userId: string
}
export interface UserVectorEligibilityInfo {
  value: string
  allowed: boolean
}

export interface SourceEligibilityInfo {
  allowed: boolean
  deviceId?: string
  deviceDetails?: string
  lastConsumedOn?: Date
  disallowedReason?: string
}

export interface IEligibilityInfo {
  maxCount: number
  validTill: Date
  userVectors: {
    userId?: UserVectorEligibilityInfo
    emailId?: UserVectorEligibilityInfo
    phone?: UserVectorEligibilityInfo
  }
  sources: {
    website?: SourceEligibilityInfo
    mobile?: SourceEligibilityInfo
    partnerPortal: SourceEligibilityInfo
    inCenterSale: SourceEligibilityInfo
  }
}
export interface SpotOfferV3 {
  offerId: string
  offer: any
  isActivatedForUser: boolean
  eligibilityInfo?: IEligibilityInfo
}

export interface SpotOffersV3Response {
  offers: SpotOfferV3[]
}

export interface SpotOffersV3ResponseObj {
  offers: SpotOffersV3Response
  message: string
}
export interface IChecklistReportIssue {
  checklistId: number
  comment: string
  raiseTicket: boolean
}

// To be added in Gymfit Common
export enum AllCenterType {
  BLACK = 'BLACK',
  GOLD = 'GOLD',
  LUX = 'LUX',
  PLAY = 'PLAY',
}

export interface RecordPitch {
  centerId: string
  centerServiceCenterId?: string
  customerId?: string
  pitchedByUserId: string
  type: RecordPitchType
  status: GymfitPitchStatus
  centerType?: AllCenterType
  centerCategory?: GymfitCenterCategory
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  remarks?: string
  pitchSource: GymfitPitchSource
  createdAt?: number
}

export enum RecordPitchType {
  GYM_JOINING = 'GYM_JOINING',
  PERSONAL_TRAINING = 'PERSONAL_TRAINING',
  PLAY_JOINING = 'PLAY_JOINING',
}

export interface ICreateCultEmployee {
  trainer: {
    email: string
    locationHierarchies: string[]
    homeCenterID: number
    employmentType: string
  }
  employeeType?: string
}

interface IData {
  reviewClassIDs: number[]
}

interface IPipEntry {
  date: string
  data: IData
  id: number
  pipLevel: string
  workoutFamilyID: number
  trainerRatingID: number
  state: string
  averageRating?: any
  btRating?: any
  emailSentAt?: any
  qualityCheckComplete: boolean
  reTrainingComplete: boolean
  resolvedBy?: any
  deletedAt?: any
  formatHeadID: number
  createdAt: Date
  updatedAt: Date
  workouts: number[]
  cultEmployee: number
}

export interface ICultEmployeeDetail {
  id: string
  name: string
  docsUrl: string
  newDocsUrl: string
  email: string
  phone: string
  countryCallingCode: string
  gender?: any
  homeCenter?: number
  isFreeLancer: boolean
  imageUploadUrl?: any
  imageDownloadUrl: string
  newImageDownloadUrl: string
  weeklyOffs: number[]
  locationHierarchies: number[]
  workouts: number[]
  level: number
  pipEntries: IPipEntry[]
  workoutFamilies?: number[]
  addedWorkouts?: number[]
  removedWorkouts?: number[]
}
