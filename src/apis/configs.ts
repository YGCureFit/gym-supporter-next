/* eslint-disable */
import {client} from './api-client'
import {
  GymfitCheckInSearchFilters,
  GymfitSource,
  IGetSettlementReportParam,
  IReceivablesEditRequest,
  ISearchTransactionParams,
  ISearchTransactionReqBody,
  RecordPitch,
} from '@curefit/gymfit-common'
import {SessionSearchRequest} from '@curefit/personal-training-v2-common'
import {
  CenterType,
  IActivatePlaySpotOffer,
  IActivatePtSpotOffer,
  IActiveOffersParams,
  IAddEmployeeVitalsPayload,
  IApproveInvoice,
  IAssignTrainerPayload,
  IStartSessionPayload,
  ICenterServiceId,
  ICheckinAsTrialReqBody,
  ICheckinId,
  ICheckinPasscodeDetails,
  ICheckinTrainerReqBody,
  ICheckListUpdate,
  ICheckoutReqBody,
  ICheckUserinSegment,
  IConfig,
  ICreateBCARecordReqBody,
  ICreateClassEventsParams,
  ICreateEmployeeParams,
  ICreatePlaySpotOfferUser,
  ICreatePremiumSpotOfferUser,
  ICreateProSpotOfferUser,
  ICreateRoster,
  ICreateUserCheckinReqBody,
  ICurrentCheckInPayload,
  ICurrentUserCheckInPayload,
  IDeleteClassEventParams,
  IDeleteEmployeeParams,
  IDeleteShift,
  IDeleteShiftPattern,
  IDownloadInvoice,
  IEnableSpotOffer,
  IFetchActiveSegmentsParams,
  IGetAgentDetails,
  IGetBaseEventsParams,
  IGetBookedSlots,
  IGetCenterByCityAndVerticalParams,
  IGetChecklists,
  IGetChecklistSubtasks,
  IGetClassScheduleParams,
  IGetCollatedMembershipStartDate,
  IGetEmployeeListParams,
  IGetEmployeeVitalsParams,
  IGetInvoicePaymentDetails,
  IGetMembershipStartDate,
  IGetOfferEligibilityForUser,
  IGetPackListingsForPT,
  IGetPacksQParams,
  IGetReceivablesParams,
  IGetSettlementCycleDetails,
  IGetSettlements,
  IGetShiftPatterns,
  IGetSpotOffers,
  IGetSpotOffersForPT,
  IMetabasePayload,
  IPremiumMemberships,
  IPremiumPackInfo,
  IPremiumPacks,
  IPremiumSpotOffers,
  IRaiseInjuryParams,
  IRaiseIssueParams,
  IRemoveOfferEligibilityParams,
  IRemoveUserFromSegmentParams,
  IRewardInformationParams,
  ISearchBCARecordsReqBody,
  ISearchEmployee,
  ISearchPitchReqBody,
  ISendOtpReqBody,
  ISendPaymentLinkParams,
  ISendPaymentLinkReqBody,
  ISpotOffers,
  ISubtaskUpdate,
  ITrainersCheckins,
  IUpdateAgentsAssetsEventParams,
  IUpdateAgentsEventParams,
  IUpdateAgentsPicEventParams,
  IUpdateShift,
  IUpdateShiftPattern,
  IUserDetailPayload,
  IUserId,
  IUserMembershipPayload,
  IUserSearchById,
  IVerifyOtpReqBody,
  RecordReferralReqBody,
  IPlayPacks,
  IPaymentCompleteReqBody,
  IPaymentCancelReqBody,
  IFulfillmentStatus,
  IFilterOrderReqParam,
  IPremiumSpotOffersV2,
  IGetSpotOffersV2,
  IChecklistReportIssue,
  ICreateCultEmployee,
  ICultEmployeeDetail,
  IGetUserPhoneNumberPayload,
} from './interfaces'
import {_} from '../utils/lodash'
import moment from 'moment'
import {method} from 'lodash'

const convertQueryParamsToString = (
  queryParams: any,
  shouldIgnoreParams = true,
): string => {
  let url = ''
  let count = 0
  // eslint-disable-next-line no-restricted-syntax
  for (const property in queryParams) {
    if (property.startsWith('_') && shouldIgnoreParams) {
      // eslint-disable-next-line no-continue
      continue
    }
    if (queryParams.hasOwnProperty(property)) {
      count += 1
      url += `${count <= 1 ? '?' : '&'}${property}=${queryParams[property]}`
    }
  }
  return url
}

const getCurrentCheckInConfig = (query: ICurrentCheckInPayload): IConfig => ({
  queryKey: ['currentCheckin', query],
  queryFn: () =>
    client(`v1/checkIns/search/current`, {
      data: query,
    }),
})

const getPastCheckInConfig = (query: GymfitCheckInSearchFilters): IConfig => ({
  queryKey: ['pastCheckin', query],
  queryFn: () =>
    client(`v1/checkIns/search/range`, {
      data: query,
    }),
})

const getUserDetailsConfig = (): IConfig => ({
  queryKey: ['userDetails'],
  queryFn: (query: IUserDetailPayload) =>
    client(`v1/pitch/search/users${convertQueryParamsToString(query)}`),
})

const getCaptureLeadConfig = (): IConfig => ({
  queryKey: ['captureLead'],
  queryFn: (query: any) =>
    client(`v1/leads/capture${convertQueryParamsToString(query)}`),
})

const getSearchLeadConfig = (query: any): IConfig => ({
  queryKey: ['searchLead'],
  queryFn: () =>
    client(`v1/leads/search`, {
      method: 'post',
      data: query,
    }),
})

const getIsCallEnabledCenter = (query: any): IConfig => ({
  queryKey: ['getCallEnabledCenter'],
  queryFn: () =>
    client(`v1/userCall/isCallEnabled${convertQueryParamsToString(query)}`, {
      method: 'get',
    }),
})

const searchByUserId = (): IConfig => ({
  queryKey: ['searchByUserId'],
  queryFn: (query: IUserSearchById) =>
    client(`v1/pitch/user/id/${query.userId}`),
})

const getUserMembershipConfig = (
  query: IUserMembershipPayload,
  partnerCenterType: CenterType,
): IConfig => ({
  queryKey: ['userMembershipConfig', query],
  queryFn: () =>
    client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/user/pageDetails${convertQueryParamsToString(query)}`
        : `v1/pitch/user/pageDetails${convertQueryParamsToString(query)}`,
    ),
})

const getUserPtPacks = (query: IUserSearchById): IConfig => ({
  queryKey: ['userActivePtPacks', query],
  queryFn: () =>
    client(`v1/pitch/user/activePtPacks${convertQueryParamsToString(query)}`),
})

const getTrainerListConfig = (query: ICheckinId): IConfig => ({
  queryKey: ['trainerList', {query}],
  queryFn: () => client(`v1/checkIns/${query}/trainerList`),
})

const getPtTrainerListConfig = (query: any): IConfig => ({
  queryKey: ['ptTrainerList', {query}],
  queryFn: () =>
    client(`v1/roster/ptAgents${convertQueryParamsToString(query)}`),
})

const getCenterDetailsConfig = (): IConfig => ({
  queryKey: ['centerDetails'],
  queryFn: () => client(`v1/centers`),
})

const getCultEmployeeDetails = (query: any): IConfig => ({
  queryKey: ['getCultEmployeeId'],
  queryFn: () =>
    client(`v1/centers/cultEmployeeId${convertQueryParamsToString(query)}`),
})

export const getCultCenterDetails = (): IConfig => ({
  queryKey: ['cultCenterDetails'],
  queryFn: () => client(`v1/cultCenters`),
})

const getOfferBannersConfig = (centerId: number | undefined): IConfig => ({
  queryKey: ['getOfferBanners'],
  queryFn: () => client(`v1/centers/banners?centerId=${centerId}`),
})

const getGuaranteedGuidanceMetabaseMapping = (): IConfig => ({
  queryKey: ['getGuaranteedGuidanceMetabaseMapping'],
  queryFn: () =>
    client(
      `v1/centers/fetchWatchmenConfig?key=Guaranteed-guidance-metabase-mapping`,
    ),
})

const getPTSalesPhonenumberRevealMetabaseMapping = (): IConfig => ({
  queryKey: ['getPTSalesPhonenumberRevealMetabaseMapping'],
  queryFn: () =>
    client(
      `v1/centers/fetchWatchmenConfig?key=PT_Sales_PhoneNumber_Reveal_Centers`,
    ),
})

const getCenterScoreEnabledCities = (): IConfig => ({
  queryKey: ['getCenterScoreEnabledCities'],
  queryFn: () =>
    client(`v1/centers/fetchWatchmenConfig?key=Center_Score_Display_Cities`),
})

const getCenterScoreIncentiveEnabledCenters = (): IConfig => ({
  queryKey: ['getCenterScoreIncentiveEnabledCenters'],
  queryFn: () =>
    client(
      `v1/centers/fetchWatchmenConfig?key=Center_Score_incentiveDisplayCenters`,
    ),
})

const getActiveProgramsForCenter = (centerId: number): IConfig => ({
  queryKey: ['getActiveProgramsForCenter'],
  queryFn: () => client(`v1/centers/activePrograms?centerId=${centerId}`),
})

const getDatalakeApiConfig = (): IConfig => ({
  queryKey: ['datalake'],
  queryFn: () => client(`v1/centers/datalake`),
})

const postAssignTrainerConfig = (): IConfig => ({
  queryKey: ['assignTrainer'],
  queryFn: ({trainerId, checkInId, centerId}: IAssignTrainerPayload) =>
    client(
      `v1/checkIns/${checkInId}/assignTrainer?trainerId=${trainerId}&centerId=${centerId}`,
      {
        method: 'put',
      },
    ),
})

const getUserPhoneNumberConfig = (): IConfig => ({
  queryKey: ['getUserPhoneNumber'],
  queryFn: ({userId, centerId}: IGetUserPhoneNumberPayload) => {
    console.log('userid is sss ', userId)
    return client(`v1/userCall/getPhone`, {
      method: 'post',
      data: {
        userId: String(userId),
        centerId: centerId,
      },
    })
  },
})

const callUserIVRConfig = (): IConfig => ({
  queryKey: ['callUserIVR'],
  queryFn: ({userId, centerId}: {userId: string; centerId: string}) => {
    return client(`v1/userCall/call/cm`, {
      method: 'post',
      data: {
        userId: String(userId),
        centerId: String(centerId),
      },
    })
  },
})

const poststartSessionConfig = (): IConfig => ({
  queryKey: ['startPtSession'],
  queryFn: ({qrCode, identityId, centerId}: IStartSessionPayload) =>
    client(
      `v1/pitch/user/ptSession/manualStart${convertQueryParamsToString({
        centerId: centerId,
      })}`,
      {
        method: 'post',
        data: {
          qrCode,
          identityId,
        },
      },
    ),
})

const getMetabaseIframeUrlConfig = (query: IMetabasePayload): IConfig => ({
  queryKey: ['metabaseUrl', query],
  queryFn: () =>
    client(`v1/metabase/iframeUrl`, {
      data: query,
    }),
})

const getEmployeeVitalsConfig = (query: IGetEmployeeVitalsParams): IConfig => ({
  queryKey: ['employeeVitals', query],
  queryFn: () =>
    client(`v1/employee-vitals${convertQueryParamsToString(query)}`),
})

const postAddEmployeeVitalsConfig = (): IConfig => ({
  queryKey: ['addEmployeeVitals'],
  queryFn: (query: IAddEmployeeVitalsPayload) =>
    client(
      `v1/employee-vitals${convertQueryParamsToString({
        centerId: query.centerId,
      })}`,
      {
        data: query,
      },
    ),
})

const getEmployeeListConfig = (
  query: IGetEmployeeListParams,
  partnerCenterType: CenterType,
): IConfig => ({
  queryKey: ['employeeList', query],
  queryFn: () =>
    client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/employeesList${convertQueryParamsToString(query)}`
        : `v1/pitch/employeesList${convertQueryParamsToString(query)}`,
    ),
})

const getAllEmployeesConfig = (
  query: IGetBaseEventsParams,
  partnerCenterType: CenterType,
): IConfig => ({
  queryKey: ['getAllEmployeesConfig', query],
  queryFn: () =>
    client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/allEmployees${convertQueryParamsToString(query)}`
        : `v1/pitch/allEmployees${convertQueryParamsToString(query)}`,
    ),
})

const getClassScheduleConfig = (query: IGetClassScheduleParams): IConfig => ({
  queryKey: ['getClassSchedule', query],
  queryFn: () =>
    client(
      `v1/eventSchedule/search${convertQueryParamsToString({
        centerId: query.centerId,
      })}`,
      {
        data: {
          centerIds: [query.centerId],
          fromTimeUTC: query.fromTimeUTC,
          toTimeUTC: query.toTimeUTC,
        },
      },
    ),
})

const getBaseEventsConfig = (query: IGetBaseEventsParams): IConfig => ({
  queryKey: ['getBaseEvents', query],
  queryFn: () =>
    client(
      `v1/eventSchedule/baseEvents${convertQueryParamsToString({
        centerId: query.centerId,
      })}`,
      {
        data: {
          centerIds: [query.centerId],
        },
      },
    ),
})

const createClassEventConfig = (): IConfig => ({
  queryKey: ['createClassEvent'],
  queryFn: (query: ICreateClassEventsParams) =>
    client(
      `v1/eventSchedule/create${convertQueryParamsToString({
        centerId: query.centerId,
      })}`,
      {
        data: {
          ...query.classDetails,
          type: 'weekly',
        },
      },
    ),
})

const deleteClassEventConfig = (): IConfig => ({
  queryKey: ['deleteClassEvent'],
  queryFn: (query: IDeleteClassEventParams) =>
    client(
      `v1/eventSchedule/${query.baseEventId}${convertQueryParamsToString({
        centerId: query.centerId,
        recurrence: query.recurrence,
      })}`,
      {
        method: 'delete',
      },
    ),
})

const searchEmployeeByEmail = (): IConfig => ({
  queryKey: ['searchEmployeeInIdentityByEmail'],
  queryFn: (query: ISearchEmployee) =>
    client(
      `v1/roster/searchEmployeeInIdentityByEmail${convertQueryParamsToString(
        query,
      )}`,
    ),
})

const searchEmployeeByIdentityId = (): IConfig => ({
  queryKey: ['searchEmployeeByIdentityId'],
  queryFn: (query: ISearchEmployee) =>
    client(
      `v1/roster/searchEmployeeByIdentityId${convertQueryParamsToString(
        query,
      )}`,
    ),
})

const createEmployeeInOllivanderConfig = (): IConfig => ({
  queryKey: ['createEmployeeInOllivanderConfig'],
  queryFn: (query: ICreateEmployeeParams) =>
    client(
      `v1/roster/createEmployeeDetailInOllivander${convertQueryParamsToString({
        centerId: query.centerId,
      })}`,
      {
        data: {
          ...query.employeeDetail,
        },
      },
    ),
})

const createEmployeeConfig = (): IConfig => ({
  queryKey: ['createEmployeeInIdentity'],
  queryFn: (query: ICreateEmployeeParams) =>
    client(
      `v1/roster/createEmployeeInIdentity${convertQueryParamsToString({
        centerId: query.centerId,
      })}`,
      {
        data: {
          ...query.employeeDetail,
        },
      },
    ),
})

const deleteEmployeeConfig = (): IConfig => ({
  queryKey: ['deleteEmployeeDetail'],
  queryFn: (query: IDeleteEmployeeParams) =>
    client(
      `v1/employee/${query.employeeId}${convertQueryParamsToString({
        centerId: query.centerId,
      })}`,
      {
        method: 'delete',
      },
    ),
})

const getReceivablesConfig = (query: IGetReceivablesParams): IConfig => ({
  queryKey: ['getReceivables', query],
  queryFn: () =>
    client(
      `offlineReconciliation/receivables${convertQueryParamsToString(query)}`,
    ),
})

const getReceivableExceptionsConfig = (
  query: IGetBaseEventsParams,
): IConfig => ({
  queryKey: ['getReceivableExceptionsConfig', query],
  queryFn: () =>
    client(
      `offlineReconciliation/exceptions/receivables${convertQueryParamsToString(
        query,
      )}`,
    ),
})

const getPayableExceptionsConfig = (query: IGetBaseEventsParams): IConfig => ({
  queryKey: ['getPayableExceptions', query],
  queryFn: () =>
    client(
      `offlineReconciliation/exceptions/payables${convertQueryParamsToString(
        query,
      )}`,
    ),
})

const getPayableExceptionsLatestTimeConfig = (): IConfig => ({
  queryKey: ['getPayableExceptionsLatestTimeConfig'],
  queryFn: () =>
    client(`offlineReconciliation/exceptions/payables/latest-time`),
})

const updateReceivablesConfig = (): IConfig => ({
  queryKey: ['updateReceivablesConfig'],
  queryFn: (query: IReceivablesEditRequest) =>
    client(`offlineReconciliation/exceptions/receivables/edit`, {
      data: query,
    }),
})

const raiseIssueConfig = (): IConfig => ({
  queryKey: ['raiseIssueConfig'],
  queryFn: (query: IRaiseIssueParams) =>
    client(`v1/odin/paymentBasic`, {
      data: query,
    }),
})

const raiseInjuryConfig = (): IConfig => ({
  queryKey: ['raiseInjuryConfig'],
  queryFn: (query: IRaiseInjuryParams) =>
    client(
      `v1/odin/reportInjury/center/${query.centerId}?checkinId=${query.checkinId}`,
    ),
})

const getSettlementsConfig = (query: IGetSettlementReportParam): IConfig => ({
  queryKey: ['getSettlements', query],
  queryFn: () =>
    client(`v1/reports/settlements${convertQueryParamsToString(query)}`),
})

const downloadDetailedReportConfig = (
  query: ISearchTransactionParams,
): IConfig => ({
  queryKey: ['downloadDetailedReport'],
  queryFn: (body: ISearchTransactionReqBody) =>
    client(
      `v1/reports/transaction/search${convertQueryParamsToString(query)}`,
      {
        data: body,
      },
    ),
})

const getBCARecordsConfig = (query: ISearchBCARecordsReqBody): IConfig => ({
  queryKey: ['getBCARecords', query],
  queryFn: () =>
    client(`v1/pitch/bcaRecords/search`, {
      data: query,
    }),
})

const createBCARecordPitchConfig = (): IConfig => ({
  queryKey: ['createBCARecordPitch'],
  queryFn: (query: ICreateBCARecordReqBody) =>
    client(`v1/pitch/bcaRecords/create`, {
      data: query,
    }),
})

const checkoutUserConfig = (): IConfig => ({
  queryKey: ['checkoutUser'],
  queryFn: (query: ICheckoutReqBody) =>
    client(
      `v1/pitch/checkin/${query.checkinId}/checkout?userId=${query.userId}`,
      {
        data: {},
        method: 'put',
      },
    ),
})

const checkinTrainerConfig = (): IConfig => ({
  queryKey: ['checkinTrainerConfig'],
  queryFn: (query: ICheckinTrainerReqBody) => {
    const {userId, action, centerId} = query
    return client(
      `v1/checkIns/trainerAttendance/qr?identityId=${userId}&action=${action}`,
    ).then((qrData: any) => {
      const {qrString} = qrData
      const reqBody = {
        userId,
        centerId,
        qrString,
        source: GymfitSource.GYMFIT_PARTNER,
      }
      return client(`v1/pitch/createCheckin`, {
        data: reqBody,
      })
    })
  },
})

const getTrainersCheckinConfig = (query: ITrainersCheckins): IConfig => ({
  queryKey: ['getTrainersCheckinConfig', query],
  queryFn: () =>
    client(`v1/checkIns/trainerAttendance/search`, {
      data: query,
    }),
})

const getUserCheckInConfig = (query: ICurrentUserCheckInPayload): IConfig => ({
  queryKey: ['userCheckInConfig', query],
  queryFn: () =>
    client(`v1/checkIns/search/user`, {
      data: query,
    }),
})

const getUpcomingCheckinsConfig = (query: ICurrentCheckInPayload): IConfig => ({
  queryKey: ['upcomingCheckInConfig', query],
  queryFn: () =>
    client(`v1/checkIns/search/upcoming`, {
      data: query,
    }),
})

const sendOtpConfig = (): IConfig => ({
  queryKey: ['sendOtpConfig'],
  queryFn: (query: ISendOtpReqBody) =>
    client(`v1/pitch/trial/checkin/sendOTP`, {
      data: query,
    }),
})

const verifyOtpConfig = (): IConfig => ({
  queryKey: ['verifyOtpConfig'],
  queryFn: (query: IVerifyOtpReqBody) =>
    client(`v1/pitch/trial/checkin/verifyOTP`, {
      data: query,
    }),
})

const getClassifiedCheckinsConfig = (query: IGetBaseEventsParams): IConfig => ({
  queryKey: ['getClassifiedCheckins', query],
  queryFn: () =>
    client(`v1/checkIns/classified${convertQueryParamsToString(query)}`),
})

const getUpcomingTrialsConfig = (query: IGetBaseEventsParams): IConfig => ({
  queryKey: ['getUpcomingTrials', query],
  queryFn: () =>
    client(`v1/checkIns/upcomingTrials${convertQueryParamsToString(query)}`),
})

const getUpcomingPlayBookingsConfig = (query: {
  centerServiceId: number
}): IConfig => ({
  queryKey: ['getUpcomingPlayBookings', query],
  queryFn: () =>
    client(`v1/play/upcomingBookings${convertQueryParamsToString(query)}`),
})

const getGymFitPacksConfig = (query: IGetPacksQParams): IConfig => ({
  queryKey: ['getProPacks', query],
  queryFn: () => client(`v1/pitch/packs${convertQueryParamsToString(query)}`),
})

const getProSpotOffers = (query: IGetSpotOffers): IConfig => ({
  queryKey: ['getProSpotOffers', query],
  queryFn: () =>
    client(`offers/v3/gymfit/spot/offers`, {
      data: query,
    }),
})

const getProSpotOffersV2 = (query: IGetSpotOffersV2): IConfig => ({
  queryKey: ['getProSpotOffersV2', query],
  queryFn: () =>
    client(`offers/spot-offer/v2`, {
      data: query,
    }),
})

const getOfferEligibilityConfig = (): IConfig => ({
  queryKey: ['getOfferEligibility'],
  queryFn: (query: IGetOfferEligibilityForUser) =>
    client(`offers/v2/getOfferEligibility${convertQueryParamsToString(query)}`),
})

const checkUserInSegmentConfig = (query: ICheckUserinSegment): IConfig => ({
  queryKey: ['checkUserInSegment', query],
  queryFn: () =>
    client(
      `v1/pitch/memberships/checkUserInSegment${convertQueryParamsToString(
        query,
      )}`,
    ),
})

const getPremiumMembershipsConfig = (query: IPremiumMemberships): IConfig => ({
  queryKey: ['getPremiumMemberships', query],
  queryFn: () =>
    client(`v1/premium/memberships${convertQueryParamsToString(query)}`),
})

const getSelectionWindow = (): IConfig => ({
  queryKey: ['getSelectionWindow'],
  queryFn: () => client(`v1/premium/packSelectionWindow`),
})

const getPremiumPackInfoConfig = (query: IPremiumPackInfo): IConfig => ({
  queryKey: ['getPremiumPackInfo', query],
  queryFn: () =>
    client(`v1/premium/packInfo${convertQueryParamsToString(query)}`),
})

const getPremiumPacksConfig = (query: IPremiumPacks): IConfig => ({
  queryKey: ['getPremiumPacks', query],
  queryFn: () => client(`v1/premium/packs${convertQueryParamsToString(query)}`),
})

const getPremiumSpotOffersConfig = (query: IPremiumSpotOffers): IConfig => ({
  queryKey: ['getPremiumSpotOffers', query],
  queryFn: () =>
    client(`v1/premium/spot-offers${convertQueryParamsToString(query)}`),
})

const getPremiumSpotOffersConfigV2 = (
  query: IPremiumSpotOffersV2,
): IConfig => ({
  queryKey: ['getPremiumSpotOffersConfigV2', query],
  queryFn: () =>
    client(`v1/premium/spot-offer/v2`, {
      method: 'post',
      data: query,
    }),
})

const getPlaySpotOffersConfig = (query: ISpotOffers): IConfig => ({
  queryKey: ['getPlaySpotOffers', query],
  queryFn: () =>
    client(`v1/play/spot-offers${convertQueryParamsToString(query)}`),
})

const getPlayPacksConfig = (query: {
  cityId: string
  userId: any
  centerServiceId: number
}): IConfig => ({
  queryKey: ['getPlayPacks', query],
  queryFn: () => client(`v1/play/packs${convertQueryParamsToString(query)}`),
})

const getPitchesConfig = (
  query: ISearchPitchReqBody,
  partnerCenterType: CenterType,
): IConfig => ({
  queryKey: ['getPitches', query],
  queryFn: () =>
    client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/searchPitch`
        : `v1/pitch/search`,
      {
        data: query,
      },
    ),
})

const checkinAsMemberConfig = (): IConfig => ({
  queryKey: ['createCheckinAsMember'],
  queryFn: (query: ICreateUserCheckinReqBody) =>
    client(
      `v1/pitch/checkin/qrString?userId=${query.userId}&cityId=${query.cityId}`,
    ).then(qrData => {
      const qrString = _.get(qrData, 'qrString', '')
      const reqBodyForCheckin = {
        userId: query.userId,
        centerId: query.centerId,
        qrString,
        source: GymfitSource.GYMFIT_PARTNER,
      }
      return client(`v1/pitch/createCheckin`, {
        data: reqBodyForCheckin,
      })
    }),
})

const checkinAsTrialConfig = (): IConfig => ({
  queryKey: ['checkinAsTrialConfig'],
  queryFn: (query: ICheckinAsTrialReqBody) =>
    client(`v1/pitch/createUser`, {
      data: query.reqBody,
    }).then(userData => {
      const userId = _.get(userData, 'id', '')
      return client(
        `v1/pitch/checkin/qrString?userId=${userId}&cityId=${query.cityId}`,
      ).then(qrData => {
        const qrString = _.get(qrData, 'qrString', '')
        const reqBodyForCheckin = {
          userId,
          centerId: query.reqBody.centerId,
          qrString,
          source: GymfitSource.GYMFIT_PARTNER,
        }
        return client(`v1/pitch/createCheckin`, {
          data: reqBodyForCheckin,
        })
      })
    }),
})

const recordPitchConfig = (partnerCenterType: CenterType): IConfig => ({
  queryKey: ['recordPitchConfig'],
  queryFn: (query: RecordPitch) =>
    client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/createPitch`
        : `v1/pitch/create`,
      {
        data: query,
      },
    ),
})

const updateMembershipConfig = (): IConfig => ({
  queryKey: ['updateMembershipConfig'],
  queryFn: (query: any) =>
    client(`v1/pitch/updateMembership`, {
      data: query,
    }),
})

const getProMembershipStartDate = (
  query: IGetMembershipStartDate,
): IConfig => ({
  queryKey: ['getProMembershipStartDate', query],
  queryFn: () =>
    client(`v1/pitch/memberships/getEarliestStart`, {
      data: query,
    }),
})

const getValidStartDate = (
  query: IGetCollatedMembershipStartDate,
  partnerCenterType: CenterType,
): IConfig => ({
  queryKey: ['getValidStartDate', query],
  queryFn: () =>
    client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/memberships/packStartDate`
        : `v1/pitch/memberships/packStartDate`,
      {
        data: query,
      },
    ),
})

const getCardMachinesConfig = (query: IGetBaseEventsParams): IConfig => ({
  queryKey: ['getCardMachinesConfig', query],
  queryFn: () =>
    client(`v1/pitch/cardmachine/search`, {
      data: query,
    }),
})

const createCashPaymentConfig = (partnerCenterType: CenterType): IConfig => ({
  queryKey: ['createCashPayment'],
  queryFn: ({orderReqBody, paymentSuccessReqBody}) => {
    return client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/create/order`
        : `v1/pitch/create/order`,
      {
        data: orderReqBody,
      },
    ).then(data => {
      const orderId = _.get(data, 'orderId', '')
      if (!orderId) {
        throw new Error('Order not created')
      }
      paymentSuccessReqBody.paymentData.amount = data.totalAmountPayable * 100
      return client(`v1/pitch/order/success/${orderId}`, {
        data: paymentSuccessReqBody,
      })
    })
  },
})

const createPaytmGatewayOrder = (partnerCenterType: CenterType): IConfig => ({
  queryKey: ['createPaytmGatewayOrder'],
  queryFn: ({orderReqBody, paytmGatewayOrderReqBody}) => {
    return client(
      partnerCenterType === CenterType.PLAY
        ? `v1/play/create/order`
        : `v1/pitch/create/order`,
      {
        data: orderReqBody,
      },
    ).then(orderData => {
      const orderId = _.get(orderData, 'orderId', '')
      if (!orderId) {
        throw new Error('Order not created')
      }
      paytmGatewayOrderReqBody.orderId = orderId
      return client(`v1/pitch/order/createGatewayOrder`, {
        data: paytmGatewayOrderReqBody,
      }).then(gatewayData => {
        return {
          order: orderData,
          gatewayOrder: gatewayData,
        }
      })
    })
  },
})

const checkPaytmPaymentSuccess = (): IConfig => ({
  queryKey: ['checkPaytmPaymentSuccess'],
  queryFn: ({
    orderSuccessReqBody,
    gatewayId,
    trials,
    refetchTimeoutMs,
    currentTrial = 1,
  }) => {
    return client(`v1/pitch/order/success/${gatewayId}`, {
      data: orderSuccessReqBody,
    }).catch((error: any) => {
      const {code = ''} = _.get(error, 'response.data', {})
      if (
        [
          'ERR_ALFRED_FULFILMENT_FAILURE_FOR_ORDER_INITIATING_REFUND',
          'ERR_ALFRED_PAYMENT_VALIDATION_FULFILMENT_WINDOW_PASSED',
          'ERR_ALFRED_PAYMENT_VALIDATION_FAILED',
        ].includes(code)
      ) {
        return Promise.reject({
          code,
        })
      } else {
        if (currentTrial === trials) {
          return Promise.reject({
            code: 'retry',
          })
        } else if (currentTrial < trials) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(
                checkPaytmPaymentSuccess().queryFn({
                  orderSuccessReqBody,
                  gatewayId,
                  trials,
                  refetchTimeoutMs,
                  currentTrial: currentTrial + 1,
                }),
              )
            }, refetchTimeoutMs)
          })
        }
      }
    })
  },
})

const enableProRashiEvent = (): IConfig => ({
  queryKey: ['enableProRashiEvent'],
  queryFn: (offerId: string, userId: string, addedBy: string) =>
    client(`v1/pitch/memberships/rashispotofferenabled`, {
      data: {
        offerId,
        userId,
        addedBy,
      } as IEnableSpotOffer,
      method: 'put',
    }),
})

const enablePlayRashiEvent = (): IConfig => ({
  queryKey: ['enablePlayRashiEvent'],
  queryFn: (offerId: string, userId: string, addedBy: string) =>
    client(`v1/play/memberships/rashispotofferenabled`, {
      data: {
        offerId,
        userId,
        addedBy,
      } as IEnableSpotOffer,
      method: 'post',
    }),
})

const enablePtRashiEvent = (): IConfig => ({
  queryKey: ['activateSpotOffer'],
  queryFn: (query: IActivatePtSpotOffer) =>
    client(`v1/pt/spot-offers/rashi`, {
      data: query,
    }),
})

const addProSpotOfferConfig = (): IConfig => ({
  queryKey: ['addProSpotOfferConfig'],
  queryFn: (query: ICreateProSpotOfferUser) => {
    const addedBy = query.addedBy
    delete query.addedBy
    const pdtType = query.productType
    delete query.productType
    return client(`offers/v2/addOffersForUser`, {
      data: query,
    }).then(offerEligibilityDataObj => {
      if (!offerEligibilityDataObj.success) {
        return offerEligibilityDataObj
      }
      const offerEligibilityData = offerEligibilityDataObj.data
      const offerId = _.get(offerEligibilityData, 'data.offerId')
      let rashiPromise
      if (pdtType === 'GYM_PT_PPC_PRODUCT' || pdtType === 'GYM_PT_PRODUCT') {
        rashiPromise = () =>
          enablePtRashiEvent().queryFn({
            offerId,
            userId: query.eligibilityValue,
            addedBy,
            productType: pdtType,
          } as IActivatePtSpotOffer)
      } else {
        rashiPromise = () =>
          enableProRashiEvent().queryFn(
            offerId,
            query.eligibilityValue,
            addedBy,
          )
      }

      return rashiPromise().then(() => {
        return getOfferEligibilityConfig()
          .queryFn({
            offerId,
            eligibilityValue: query.eligibilityValue,
            eligibilityType: query.eligibilityType,
          })
          .then((offerSuccessData: any) => {
            const {status = null} = offerSuccessData
            if (status === 'OK') {
              return {
                status: 'OK',
              }
            }
            throw new Error('Spot Offer not enabled')
          })
      })
    })
  },
})

const addPremiumSpotOfferConfig = (): IConfig => ({
  queryKey: ['addPremiumSpotOfferConfig'],
  queryFn: (query: ICreatePremiumSpotOfferUser) =>
    client(`v1/premium/spot-offers/activate`, {
      data: query,
    }),
})

const addPlaySpotOfferConfig = (): IConfig => ({
  queryKey: ['addPlaySpotOfferConfig'],
  queryFn: (query: ICreatePlaySpotOfferUser) => {
    const addedBy = query.addedBy
    delete query.addedBy
    delete query.productType
    return client(`v1/play/spot-offers/activate`, {
      data: query,
    }).then(offerEligibilityDataObj => {
      if (!offerEligibilityDataObj.success) {
        return offerEligibilityDataObj
      }
      const offerEligibilityData = offerEligibilityDataObj.data
      const offerId = _.get(offerEligibilityData, 'data.offerId')
      let rashiPromise
      rashiPromise = () =>
        enablePlayRashiEvent().queryFn(offerId, query.eligibilityValue, addedBy)

      return rashiPromise().then(() => {
        return getOfferEligibilityConfig()
          .queryFn({
            offerId,
            eligibilityValue: query.eligibilityValue,
            eligibilityType: query.eligibilityType,
          })
          .then((offerSuccessData: any) => {
            const {status = null} = offerSuccessData
            if (status === 'OK') {
              return {
                status: 'OK',
                success: true,
              }
            }
            throw new Error('Spot Offer not enabled')
          })
      })
    })
  },
})

const editReceivableConfig = (): IConfig => ({
  queryKey: ['editReceivable'],
  queryFn: (query: IReceivablesEditRequest) =>
    client(`offlineReconciliation/exceptions/receivables/edit`, {
      data: query,
    }),
})

const getActiveUserMemberships = (): IConfig => ({
  queryKey: ['getAllUserMemberships'],
  queryFn: (query: IUserId) =>
    client(`v1/pitch/memberships/active${convertQueryParamsToString(query)}`),
})

const getAllChecklists = (query: IGetChecklists): IConfig => ({
  queryKey: ['getAllChecklists', query],
  queryFn: () => {
    let newQuery: IGetChecklists = {
      ...query,
      timeFrom: moment().valueOf().toString(),
    }
    return client(`v1/checklists/search${convertQueryParamsToString(newQuery)}`)
  },
})

const getAllChecklistSubtasks = (query: IGetChecklistSubtasks): IConfig => ({
  queryKey: ['getAllChecklistSubtasks', query],
  queryFn: () =>
    client(`v1/checklists/subtasks/search${convertQueryParamsToString(query)}`),
})

const raiseIssueChecklistSubtask = (): IConfig => ({
  queryKey: ['raiseIssueChecklistSubtask'],
  queryFn: (query: IChecklistReportIssue) =>
    client(
      `v1/checklists/raiseTicket${convertQueryParamsToString({
        checklistId: query.checklistId,
        raiseTicket: query.raiseTicket,
      })}`,
      {data: {comment: query.comment}},
    ),
})

const getAllAgents = (query: ICenterServiceId): IConfig => ({
  queryKey: ['getAllAgents', query],
  queryFn: () => client(`v1/roster/agents${convertQueryParamsToString(query)}`),
})

const getAllPTLevel = (): IConfig => ({
  queryKey: ['getAllPTLevelData'],
  queryFn: () => client(`v1/roster/sub-service-type`),
})

const getAllSpecialisation = (): IConfig => ({
  queryKey: ['getAllSpecialisation'],
  queryFn: () => client(`v1/roster/specialisation`),
})

const getAgent = (query: IGetAgentDetails): IConfig => ({
  queryKey: ['getAgent', query],
  queryFn: () => {
    return client(`v1/roster/agent${convertQueryParamsToString(query)}`)
  },
})

const updateAgents = (): IConfig => ({
  queryKey: ['updateAgent'],
  queryFn: (query: IUpdateAgentsEventParams) =>
    client(`v1/roster/agents?agentId=${query.agentId}`, {
      method: 'put',
      data: {
        ...query.trainerDetail,
      },
    }),
})

const updateAgentsPhoto = (): IConfig => ({
  queryKey: ['agentPicUpdate'],
  queryFn: (query: IUpdateAgentsPicEventParams) =>
    client(`v1/roster/agentPicUpdate?agentId=${query.agentId}`, {
      method: 'post',
      data: {},
    }),
})

const updateAgentAssets = (): IConfig => ({
  queryKey: ['updateAgentAssets'],
  queryFn: (query: IUpdateAgentsAssetsEventParams) =>
    client(`v1/roster/agentAssets?agentId=${query.agentId}`, {
      method: 'post',
      data: {
        ...query.trainerAsset,
      },
    }),
})

const updateSubtasks = (): IConfig => ({
  queryKey: ['updateSubtasks'],
  queryFn: (query: ISubtaskUpdate[]) =>
    client(`v1/checklists/subtask/update`, {
      data: query,
    }),
})

const updateCheckList = (): IConfig => ({
  queryKey: ['updateCheckList'],
  queryFn: (query: ICheckListUpdate) =>
    client(`v1/checklists/update/${query.checklistId}`, {
      data: query.body,
    }),
})

const checkinByPasscode = (): IConfig => ({
  queryKey: ['checkinByPasscode'],
  queryFn: (query: ICheckinPasscodeDetails) =>
    client(
      `v1/checkIns/${query.checkinId}/validate?passCode=${query.passcode}&centerId=${query.centerId}`,
    ),
})

const getPTSessionsForUser = (query: SessionSearchRequest): IConfig => ({
  queryKey: ['getPTSessionsForUser'],
  queryFn: () =>
    client(`v1/pitch/user/ptSessions`, {
      data: query,
    }),
})

const getTrainerAvailabilitySlots = (query: any): IConfig => ({
  queryKey: ['getTrainerAvailabilitySlots'],
  queryFn: () =>
    client(`v1/pitch/user/trainerAvailableSlots`, {
      data: query,
    }),
})

const bookPTSession = (): IConfig => ({
  queryKey: ['bookPTSession'],
  queryFn: (query: any) =>
    client(`v1/pitch/user/ptSessions/bookSession`, {
      data: query,
    }),
})

const reschedulePTSession = (): IConfig => ({
  queryKey: ['reschedulePTSession'],
  queryFn: (query: any) =>
    client(`v1/pitch/user/ptSessions/rescheduleSession`, {
      data: query,
    }),
})

const cancelPTSession = (): IConfig => ({
  queryKey: ['cancelPTSession'],
  queryFn: (query: any) =>
    client(
      `v1/pitch/user/ptSessions/cancelSession${convertQueryParamsToString(
        query,
      )}`,
      {
        data: {},
        method: 'put',
      },
    ),
})

const createRoster = (): IConfig => ({
  queryKey: ['createRoster'],
  queryFn: (query: ICreateRoster) =>
    client(`v1/roster/create`, {
      data: query,
    }),
})

const getShiftPatterns = (query: IGetShiftPatterns): IConfig => ({
  queryKey: ['getShiftPatterns', query],
  queryFn: () =>
    client(`v1/roster/shiftPatterns`, {
      data: query,
    }),
})

const getAllBookedSlots = (query: IGetBookedSlots): IConfig => ({
  queryKey: ['getAllBookedSlots', query],
  queryFn: () =>
    client(`v1/roster/bookedSlots${convertQueryParamsToString(query)}`),
})

const deleteShift = (): IConfig => ({
  queryKey: ['deleteShift'],
  queryFn: (query: IDeleteShift) =>
    client(`v1/roster/shift/delete${convertQueryParamsToString(query)}`, {
      method: 'delete',
    }),
})

const deleteShiftPattern = (): IConfig => ({
  queryKey: ['deleteShiftPattern'],
  queryFn: (query: IDeleteShiftPattern) =>
    client(
      `v1/roster/shiftPattern/delete${convertQueryParamsToString(query)}`,
      {
        method: 'delete',
      },
    ),
})

const updateShiftPattern = (): IConfig => ({
  queryKey: ['updateShiftPattern'],
  queryFn: (query: IUpdateShiftPattern) =>
    client(
      `v1/roster/shiftPattern/update${convertQueryParamsToString({
        shiftPatternId: query.shiftPatternId,
      })}`,
      {
        method: 'put',
        data: query.reqBody,
      },
    ),
})

const updateShift = (): IConfig => ({
  queryKey: ['updateShift'],
  queryFn: (query: IUpdateShift) =>
    client(
      `v1/roster/shift/update${convertQueryParamsToString({
        shiftId: query.shiftId,
      })}`,
      {
        method: 'put',
        data: query.reqBody,
      },
    ),
})

// telesales Tasks

const getTaskList = (query: any): IConfig => ({
  queryKey: ['getTaskList', query],
  queryFn: () =>
    client(`/v1/cmTasks`, {
      method: 'post',
      data: query,
    }),
})

const getStatusList = (): IConfig => ({
  queryKey: ['getStatusList'],
  queryFn: () =>
    client(`/v1/status/task`, {
      method: 'get',
    }),
})

const getDetail = (query: string): IConfig => ({
  queryKey: ['getDetail'],
  queryFn: () =>
    client(`/v1/task/findUserById/${query}`, {
      method: 'get',
    }),
})

const resolveTask = (uuid: string): IConfig => ({
  queryKey: ['resolveTask'],
  queryFn: query =>
    client(`/v1/task/${uuid}/resolve`, {
      method: 'post',
      data: query,
    }),
})

const getCallTrail = (query: any): IConfig => ({
  queryKey: ['getCallTrail'],
  queryFn: () =>
    client(`/v1/widget`, {
      method: 'post',
      data: query,
    }),
})

const callUser = (): IConfig => ({
  queryKey: ['call'],
  queryFn: (query: any) =>
    client(`/v1/userCall/call`, {
      method: 'post',
      data: query,
    }),
})

const recordReferralConfig = (): IConfig => ({
  queryKey: ['recordReferralConfig'],
  queryFn: (query: RecordReferralReqBody) =>
    client('/v1/telesalesReferral/center', {
      method: 'post',
      data: query,
    }),
})

const fetchRewardInformation = (query: IRewardInformationParams): IConfig => ({
  queryKey: ['fetchRewardInformation', query],
  queryFn: () =>
    client(`/v1/telesalesReferral/rewardInfo?userId=${query.userId}`, {
      method: 'get',
    }),
})

const getSettlementCycleDetails = (
  query: IGetSettlementCycleDetails,
): IConfig => ({
  queryKey: ['getSettlementCycleDetails', query],
  queryFn: () => client('/v1/reports/invoices/settlementCycle', {data: query}),
})

const getSettlementsAndPaymentSummary = (query: IGetSettlements): IConfig => ({
  queryKey: ['getSettlementsAndPaymentSummary', query],
  queryFn: () =>
    client(`/v1/reports/settlementReports${convertQueryParamsToString(query)}`),
})

const getPayoutDetails = (query: IGetInvoicePaymentDetails): IConfig => ({
  queryKey: ['getPayoutDetails', query],
  queryFn: () =>
    client(`/v1/reports/payments${convertQueryParamsToString(query)}`),
})

const getInvoiceDetails = (query: IGetInvoicePaymentDetails): IConfig => ({
  queryKey: ['getInvoiceDetails', query],
  queryFn: () =>
    client(`/v1/reports/invoices${convertQueryParamsToString(query)}`),
})

const approveInvoice = (): IConfig => ({
  queryKey: ['approveInvoice'],
  queryFn: (query: IApproveInvoice) =>
    client(`v1/reports/invoices/approve${convertQueryParamsToString(query)}`),
})

const downloadInvoice = (): IConfig => ({
  queryKey: ['downloadInvoice'],
  queryFn: (query: IDownloadInvoice) =>
    client(`v1/reports/invoices/download${convertQueryParamsToString(query)}`),
})

const getTrainersLevelsBreakdown = (query: ICenterServiceId): IConfig => ({
  queryKey: ['getTrainersLevelsBreakdown', query],
  queryFn: () =>
    client(
      `v1/roster/agentsLevelBreakdown${convertQueryParamsToString(query)}`,
    ),
})

const getTrainersWithAssets = (query: ICenterServiceId): IConfig => ({
  queryKey: ['allAgentsWithAssets', query],
  queryFn: () =>
    client(`v1/roster/allAgentsWithAssets${convertQueryParamsToString(query)}`),
})

const getPTPacksWithLevelsBreakdown = (
  query: IGetPackListingsForPT,
): IConfig => ({
  queryKey: ['getPTPacksWithLevelsBreakdown', query],
  queryFn: () => client(`v1/pt/packs${convertQueryParamsToString(query)}`),
})

const getPTSpotOffers = (query: IGetSpotOffersForPT): IConfig => ({
  queryKey: ['getPTSpotOffers', query],
  queryFn: () =>
    client(`v1/pt/spot-offers${convertQueryParamsToString(query)}`),
})

const checkIfPPCSpotOfferEnabled = (): IConfig => ({
  queryKey: ['checkIfPPCSpotOfferEnabled'],
  queryFn: (query: IUserSearchById) =>
    client(`v1/pt/ppc/isSpotOfferEnabled${convertQueryParamsToString(query)}`),
})

const sendPaymentLink = (query: ISendPaymentLinkParams): IConfig => ({
  queryKey: ['sendPaymentLink'],
  queryFn: (data: ISendPaymentLinkReqBody) => {
    return client(
      `v1/telesalesReferral/sendLink/${query.userId}/center?tenant=partner_portal`,
      {
        method: 'put',
        data: data,
      },
    )
  },
})

const fetchAllOrdersForUser = (query: any): IConfig => ({
  queryKey: ['fetchAllOrdersForUser'],
  queryFn: () =>
    client(
      `v1/pitch/user/fetchRecentOrders${convertQueryParamsToString(query)}`,
    ),
})

const fetchPQSSummary = (query: any): IConfig => ({
  queryKey: ['fetchPQSSummary'],
  queryFn: () =>
    client(`v1/pqs/getSummary${convertQueryParamsToString(query)}`),
})

const fetchPQSIncentiveData = (): IConfig => ({
  queryKey: ['getIncentiveData'],
  queryFn: () => client(`v1/pqs/getIncentiveData`),
})

const fetchPQSIncentiveForCenter = (query: any): IConfig => ({
  queryKey: ['fetchPQSIncentiveForCenter'],
  queryFn: () =>
    client(`v1/pqs/getIncentiveForCenter${convertQueryParamsToString(query)}`),
})

const fetchMetricTrend = (query: any): IConfig => ({
  queryKey: ['getMetricTrend'],
  queryFn: (data: any) => client(`v1/pqs/getMetricTrend`, {data: data}),
})

const fetchCRMTasks = (query: any): IConfig => ({
  queryKey: ['getMetricTrend'],
  queryFn: () => client(`v1/crmTasks${convertQueryParamsToString(query)}`),
})

const markCRMTaskComplete = (): IConfig => ({
  queryKey: ['markCRMTaskComplete'],
  queryFn: (data: any) => client(`v1/crmTasks/complete`, {data}),
})

const fetchClasses = (query: any): IConfig => ({
  queryKey: ['fetchClasses'],
  queryFn: () => client(`/v1/classes${convertQueryParamsToString(query)}`),
})

const fetchClassDetails = (query: any): IConfig => ({
  queryKey: ['fetchClassDetails'],
  queryFn: () =>
    client(`/v1/classes/details${convertQueryParamsToString(query)}`),
})

const fetchPlaySessionPageData = (query: any): IConfig => ({
  queryKey: ['fetchPlaySessionDetails'],
  queryFn: () =>
    client(`/v1/play/sessions`, {
      method: 'post',
      data: query,
    }),
})

const fetchEmployeesTemperatures = (query: any): IConfig => ({
  queryKey: ['fetchEmployeesTemperatures'],
  queryFn: () =>
    client(`/v1/classes/temperatures${convertQueryParamsToString(query)}`),
})

const fetchWodData = (query: any): IConfig => ({
  queryKey: ['fetchWodData'],
  queryFn: () => client(`/v1/classes/wods${convertQueryParamsToString(query)}`),
})

const fetchNestedPulseBookings = (query: any): IConfig => ({
  queryKey: ['fetchNestedPulseBookings'],
  queryFn: () =>
    client(
      `/v1/classes/nestedPulseBookings${convertQueryParamsToString(query)}`,
    ),
})

const fetchNestedBookings = (query: any): IConfig => ({
  queryKey: ['fetchNestedBookings'],
  queryFn: () =>
    client(`/v1/classes/nestedBookings${convertQueryParamsToString(query)}`),
})

const recordTemperatureVitals = (): IConfig => ({
  queryKey: ['recordTemperatureVitals'],
  queryFn: (data: any) => {
    const cultEmployeeId = data.cultEmployeeId
    delete data.cultEmployeeId
    return client(
      `/v1/classes/temperature${convertQueryParamsToString({cultEmployeeId})}`,
      {data},
    )
  },
})

const markClassAttendance = (): IConfig => ({
  queryKey: ['markClassAttndance'],
  queryFn: (data: any) => {
    const cultEmployeeId = data.cultEmployeeId
    delete data.cultEmployeeId
    return client(
      `v1/classes/attendances${convertQueryParamsToString({cultEmployeeId})}`,
      {data},
    )
  },
})

const fetchReportIssueOptions = (
  issueType: string,
  cultEmployeeId: string,
): IConfig => ({
  queryKey: ['fetchReportIssueOptions'],
  queryFn: () =>
    client(
      `v1/classes/reportingOptions/${issueType}${convertQueryParamsToString({
        cultEmployeeId,
      })}`,
    ),
})

const reportIssue = (): IConfig => ({
  queryKey: ['reportIssue'],
  queryFn: (data: any) => {
    const cultEmployeeId = data.cultEmployeeId
    delete data.cultEmployeeId
    return client(
      `v1/classes/toa/request${convertQueryParamsToString({cultEmployeeId})}`,
      {data},
    )
  },
})

const reportRain = (): IConfig => ({
  queryKey: ['reportRain'],
  queryFn: (data: any) => {
    const cultEmployeeId = data.cultEmployeeId
    delete data.cultEmployeeId
    return client(
      `v1/classes/rainmode${convertQueryParamsToString({cultEmployeeId})}`,
      {data},
    )
  },
})

const updateClassDetailCapacity = (): IConfig => ({
  queryKey: ['updateClassDetailCapacity'],
  queryFn: (data: any) => {
    const cultEmployeeId = data.cultEmployeeId
    delete data.cultEmployeeId
    return client(
      `v1/classes/capacity${convertQueryParamsToString({cultEmployeeId})}`,
      {data, method: 'put'},
    )
  },
})

const updateClassDetails = (): IConfig => ({
  queryKey: ['updateClassDetails'],
  queryFn: (data: any) => {
    const cultEmployeeId = data.cultEmployeeId
    delete data.cultEmployeeId
    return client(
      `v1/classes/detail${convertQueryParamsToString({cultEmployeeId})}`,
      {data, method: 'put'},
    )
  },
})

const updateClassPassCapacity = (): IConfig => ({
  queryKey: ['updateClassPassCapacity'],
  queryFn: (data: any) => {
    const cultEmployeeId = data.cultEmployeeId
    delete data.cultEmployeeId
    return client(
      `v1/classes/classpassDetails${convertQueryParamsToString({
        cultEmployeeId,
      })}`,
      {
        data,
        method: 'put',
      },
    )
  },
})

const fetchCultTrainersList = (): IConfig => ({
  queryKey: ['fetchCultTrainersList'],
  queryFn: (query: {center: number; workout: number; cultEmployeeId: string}) =>
    client(`v1/classes/trainers${convertQueryParamsToString(query)}`),
})

const getTrainerOverrideReasons = (): IConfig => ({
  queryKey: ['getTrainerOverrideReasons'],
  queryFn: () => client(`v1/classes/trainerOverrideReasonOptions`),
})

const getSegments = (): IConfig => ({
  queryKey: ['getSegments'],
  queryFn: (query: IFetchActiveSegmentsParams) =>
    client(
      `v1/offersAdmin/fetchActiveSegments${convertQueryParamsToString(query)}`,
      {
        method: 'get',
      },
    ),
})

const getActiveOffers = (): IConfig => ({
  queryKey: ['getActiveOffers'],
  queryFn: (query: IActiveOffersParams) =>
    client(
      `v1/offersAdmin/fetchAppliedSpotOffers${convertQueryParamsToString(
        query,
      )}`,
      {
        method: 'post',
        data: query,
      },
    ),
})

const removeUserFromSegment = (): IConfig => ({
  queryKey: ['removeUserFromSegment'],
  queryFn: (query: IRemoveUserFromSegmentParams) =>
    client(
      `v1/offersAdmin/removeUserFromSegment${convertQueryParamsToString(
        query,
      )}`,
      {
        method: 'get',
      },
    ),
})

const removeOfferEligibility = (): IConfig => ({
  queryKey: ['removeOfferEligibility'],
  queryFn: (query: IRemoveOfferEligibilityParams) =>
    client(
      `v1/offersAdmin/removeOfferEligibility${convertQueryParamsToString(
        query,
      )}`,
      {
        method: 'post',
        data: query,
      },
    ),
})

const getCities = (): IConfig => ({
  queryKey: ['getCities'],
  queryFn: () =>
    client(`v1/city/getAll`, {
      method: 'get',
    }),
})

const getCenterByCityAndVertical = (): IConfig => ({
  queryKey: ['getCenterByCityAndVertical'],
  queryFn: (query: IGetCenterByCityAndVerticalParams) =>
    client(
      `v1/center/getCenterByCityAndVertical${convertQueryParamsToString(
        query,
      )}`,
      {
        method: 'get',
      },
    ),
})

const paymentComplete = (): IConfig => ({
  queryKey: ['paymentComplete'],
  queryFn: (query: IPaymentCompleteReqBody) =>
    client(`v1/pitch/order/paymentComplete`, {
      method: 'post',
      data: query,
    }),
})

const paymentCancel = (): IConfig => ({
  queryKey: ['paymentCancel'],
  queryFn: (query: IPaymentCancelReqBody) =>
    client(`v1/pitch/order/paymentCancel`, {
      method: 'post',
      data: query,
    }),
})

const fulfillmentStatus = (): IConfig => ({
  queryKey: ['fulfillmentStatus'],
  queryFn: (query: IFulfillmentStatus) =>
    client(`v1/pitch/${query.orderId}/fulfillmentStatus`, {
      method: 'get',
    }),
})

const filterOrdersForUser = (query: IFilterOrderReqParam): IConfig => ({
  queryKey: ['filterOrdersForUser'],
  queryFn: () =>
    client(`v1/pitch/${query.userId}/filterOrdersForUser`, {
      method: 'post',
      data: query,
    }),
})

const getSportsList = (query: {centerServiceId: number}): any => ({
  queryKey: ['getSportsList', query],
  queryFn: () =>
    client(`v1/play/center/sports${convertQueryParamsToString(query)}`),
})

const getGXTrainers = (): IConfig => ({
  queryKey: ['gxTrainers'],
  queryFn: (query: {center: number; cultEmployeeId: number}) =>
    client(`/v1/gxTrainer/all${convertQueryParamsToString(query)}`),
})

const getGxTrainersDetails = (): IConfig => ({
  queryKey: ['eachGxTrainer'],
  queryFn: (query: {id: string; cultEmployeeId: number; startDate: string}) =>
    client(`v1/gxTrainer/${convertQueryParamsToString(query)}`),
})

const createGXTrainer = (): IConfig => ({
  queryKey: ['createGXTrainer'],
  queryFn: (query: {cultEmployeeId: number; body: ICreateCultEmployee}) =>
    client(
      `v1/gxTrainer/${convertQueryParamsToString({
        cultEmployeeId: query.cultEmployeeId,
      })}`,
      {
        data: {
          ...query.body,
        },
      },
    ),
})

const updateGXTrainer = (): IConfig => ({
  queryKey: ['updateGXTrainer'],
  queryFn: (query: {
    cultEmployeeId: number
    id: number
    body: {trainer: ICultEmployeeDetail}
  }) =>
    client(
      `v1/gxTrainer/${convertQueryParamsToString({
        cultEmployeeId: query.cultEmployeeId,
        id: query.id,
      })}`,
      {
        method: 'put',
        data: {
          ...query.body,
        },
      },
    ),
})

const deleteGxTrainers = (): IConfig => ({
  queryKey: ['eachGxTrainer'],
  queryFn: (query: {id: string; cultEmployeeId: number}) =>
    client(`v1/gxTrainer/${convertQueryParamsToString(query)}`, {
      method: 'delete',
    }),
})

const deleteCultTrainerBiometrics = (): IConfig => ({
  queryKey: ['cultTrainerBiometrics'],
  queryFn: (query: {id: string; cultEmployeeId: number}) =>
    client(`v1/gxTrainer/biometrics/${convertQueryParamsToString(query)}`, {
      method: 'delete',
    }),
})

const getLocationAreas = (query: {cultEmployeeId: number}): IConfig => ({
  queryKey: ['getLocationAreas'],
  queryFn: () =>
    client(`v1/gxTrainer/locations/${convertQueryParamsToString(query)}`),
})

const getGXCenters = (query: {cultEmployeeId: number}): IConfig => ({
  queryKey: ['getGXCenters'],
  queryFn: () =>
    client(`v1/gxTrainer/centers/${convertQueryParamsToString(query)}`),
})

export const apiConfigs = {
  getUpcomingPlayBookingsConfig,
  getCurrentCheckInConfig,
  getPastCheckInConfig,
  getUserDetailsConfig,
  getUserMembershipConfig,
  getUserPtPacks,
  getTrainerListConfig,
  getCenterDetailsConfig,
  postAssignTrainerConfig,
  getMetabaseIframeUrlConfig,
  getEmployeeVitalsConfig,
  postAddEmployeeVitalsConfig,
  getEmployeeListConfig,
  getClassScheduleConfig,
  getBaseEventsConfig,
  createClassEventConfig,
  deleteClassEventConfig,
  createEmployeeConfig,
  deleteEmployeeConfig,
  createEmployeeInOllivanderConfig,
  searchEmployeeByEmail,
  searchEmployeeByIdentityId,
  getReceivablesConfig,
  getReceivableExceptionsConfig,
  getPayableExceptionsConfig,
  getPayableExceptionsLatestTimeConfig,
  updateReceivablesConfig,
  raiseIssueConfig,
  raiseInjuryConfig,
  getSettlementsConfig,
  downloadDetailedReportConfig,
  getBCARecordsConfig,
  createBCARecordPitchConfig,
  checkoutUserConfig,
  getUserCheckInConfig,
  getUpcomingCheckinsConfig,
  sendOtpConfig,
  verifyOtpConfig,
  getClassifiedCheckinsConfig,
  getUpcomingTrialsConfig,
  getGymFitPacksConfig,
  getProSpotOffers,
  getOfferEligibilityConfig,
  checkUserInSegmentConfig,
  getPremiumMembershipsConfig,
  getPremiumPackInfoConfig,
  getPremiumPacksConfig,
  getPremiumSpotOffersConfig,
  getPitchesConfig,
  checkinAsMemberConfig,
  checkinAsTrialConfig,
  recordPitchConfig,
  updateMembershipConfig,
  getProMembershipStartDate,
  getCardMachinesConfig,
  createCashPaymentConfig,
  addProSpotOfferConfig,
  addPremiumSpotOfferConfig,
  addPlaySpotOfferConfig,
  editReceivableConfig,
  getActiveUserMemberships,
  createPaytmGatewayOrder,
  checkPaytmPaymentSuccess,
  getAllChecklists,
  getAllChecklistSubtasks,
  updateSubtasks,
  searchByUserId,
  checkinByPasscode,
  getValidStartDate,
  getAllEmployeesConfig,
  checkinTrainerConfig,
  getTrainersCheckinConfig,
  updateCheckList,
  getPTSessionsForUser,
  getTrainerAvailabilitySlots,
  bookPTSession,
  reschedulePTSession,
  cancelPTSession,
  getDatalakeApiConfig,
  getAllAgents,
  createRoster,
  getAllBookedSlots,
  deleteShift,
  getShiftPatterns,
  updateShiftPattern,
  updateShift,
  deleteShiftPattern,
  getAgent,
  getTaskList,
  getStatusList,
  getDetail,
  resolveTask,
  getCallTrail,
  callUser,
  recordReferralConfig,
  fetchRewardInformation,
  getSettlementCycleDetails,
  getSettlementsAndPaymentSummary,
  getPayoutDetails,
  getInvoiceDetails,
  approveInvoice,
  downloadInvoice,
  sendPaymentLink,
  getTrainersLevelsBreakdown,
  getTrainersWithAssets,
  getPTPacksWithLevelsBreakdown,
  getPTSpotOffers,
  checkIfPPCSpotOfferEnabled,
  getAllPTLevel,
  updateAgents,
  updateAgentAssets,
  updateAgentsPhoto,
  getAllSpecialisation,
  fetchAllOrdersForUser,
  getGuaranteedGuidanceMetabaseMapping,
  getActiveProgramsForCenter,
  fetchPQSSummary,
  fetchPQSIncentiveData,
  fetchPQSIncentiveForCenter,
  fetchMetricTrend,
  getSelectionWindow,
  fetchClasses,
  getOfferBannersConfig,
  getCenterScoreEnabledCities,
  getCenterScoreIncentiveEnabledCenters,
  fetchCRMTasks,
  fetchClassDetails,
  fetchEmployeesTemperatures,
  fetchWodData,
  fetchNestedPulseBookings,
  fetchNestedBookings,
  recordTemperatureVitals,
  markCRMTaskComplete,
  getCultEmployeeDetails,
  markClassAttendance,
  reportRain,
  fetchReportIssueOptions,
  reportIssue,
  updateClassDetailCapacity,
  updateClassDetails,
  updateClassPassCapacity,
  fetchCultTrainersList,
  getTrainerOverrideReasons,
  getSegments,
  getActiveOffers,
  removeUserFromSegment,
  removeOfferEligibility,
  getPlayPacksConfig,
  getCities,
  getCenterByCityAndVertical,
  fetchPlaySessionPageData,
  paymentComplete,
  paymentCancel,
  fulfillmentStatus,
  filterOrdersForUser,
  getProSpotOffersV2,
  getPremiumSpotOffersConfigV2,
  getSearchLeadConfig,
  raiseIssueChecklistSubtask,
  getPTSalesPhonenumberRevealMetabaseMapping,
  getSportsList,
  getUserPhoneNumberConfig,
  callUserIVRConfig,
  getPlaySpotOffersConfig,
  getGXTrainers,
  createGXTrainer,
  updateGXTrainer,
  getGxTrainersDetails,
  deleteGxTrainers,
  deleteCultTrainerBiometrics,
  getLocationAreas,
  getGXCenters,
  poststartSessionConfig,
  getPtTrainerListConfig,
  getIsCallEnabledCenter,
}
