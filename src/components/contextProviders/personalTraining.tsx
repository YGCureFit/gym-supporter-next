import React, {ReactNode, useCallback} from 'react'
import clsx from 'clsx'
import {ICreateProSpotOfferUser} from '../../apis/interfaces'
import {OtpContextProvider} from './otpContext'
import {useCenterContext} from './centerContext'
import {useCustomerContext} from './customerContext'
import {useMutation, useQuery} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {_} from '../../utils/lodash'
import * as Sentry from '@sentry/react'
import pluralize from 'pluralize'
import {MdLocalOffer} from 'react-icons/md'
import {GrayButton} from '../common/GrayButton'
import {toastError, toastSuccess} from '../../utils/toastify'
import moment from 'moment'
import {useLocation} from 'react-router-dom'

const PersonalTrainingContext = React.createContext({})
PersonalTrainingContext.displayName = 'PersonalTrainingContext'

type PersonalTrainingProviderProps = {
  children: React.ReactNode
}

type ptContextProps = {
  trainersLevelBreakdown: any
  isTrainerLevelsLoading: boolean
  ptPacks: any
  ptPacksLoading: boolean
  refetchPtPacks: any
  ppcPacks: any
  ppcPacksLoading: boolean
  refetchPpcPacks: any
  ptSpotOffersData: any
  isPtSpotOfferLoading: boolean
  refetchPtSpotOffers: any
  refetchTrainers: any
  ppcSpotOffersData: any
  isPpcSpotOfferLoading: boolean
  refetchPpcSpotOffers: any
  getAppliedSpotOffersForPacks: (packs: any[]) => any
  getValidSpotOffers: (offers: any[], packs: any[]) => any
  getCurrentPack: (selectedPack: any, packs: any[]) => any
  activateSpotOffer: (
    offer: any,
    productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT',
    userDetails: any,
    loginUserContext: any,
  ) => any
  isActivateSpotOfferLoading: boolean
  getSpotOfferWidgets: (
    validOffers: any[],
    appliedSpotOffers: any,
    showAppliedOffers: boolean,
    productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT',
    onTncClick: (offer: any) => void,
    applyOfferClick: (offer: any) => void,
  ) => ReactNode
}

const PersonalTrainingProvider: React.FC<PersonalTrainingProviderProps> = ({
  children,
}) => {
  const {selectedCenter, isPtEnabled} = useCenterContext()
  const {userDetails} = useCustomerContext()
  const {pathname} = useLocation()

  const {
    data: trainersLevelBreakdown = {},
    isLoading: isTrainerLevelsLoading,
    refetch: refetchTrainers,
  } = useQuery({
    ...apiConfigs.getTrainersLevelsBreakdown({
      centerServiceId: selectedCenter?.centerServiceId || 0,
    }),
    enabled:
      Boolean(selectedCenter?.centerServiceId) &&
      (pathname === '/pt' || pathname === '/pt-packs') &&
      isPtEnabled,
  })

  const {
    data: ptPacks = {},
    isLoading: ptPacksLoading,
    refetch: refetchPtPacks,
  } = useQuery({
    ...apiConfigs.getPTPacksWithLevelsBreakdown({
      ...(_.isEmpty(userDetails)
        ? {}
        : {
            userId: userDetails?.id,
            phone: userDetails?.phone,
          }),
      centerId: selectedCenter?.id || '0',
      cityId: _.get(selectedCenter, 'address.city.cityId', ''),
      productType: 'GYM_PT_PRODUCT',
    }),
    enabled:
      Boolean(selectedCenter?.centerServiceId) &&
      (pathname === '/pt' || pathname === '/pt-packs') &&
      isPtEnabled,
    onSuccess: (data: any) => console.log(data),
  })

  const {
    data: ppcPacks = {},
    isLoading: ppcPacksLoading,
    refetch: refetchPpcPacks,
  } = useQuery({
    ...apiConfigs.getPTPacksWithLevelsBreakdown({
      ...(_.isEmpty(userDetails)
        ? {}
        : {
            userId: userDetails?.id,
            phone: userDetails?.phone,
          }),
      centerId: selectedCenter?.id || '0',
      cityId: _.get(selectedCenter, 'address.city.cityId', ''),
      productType: 'GYM_PT_PPC_PRODUCT',
    }),
    enabled:
      Boolean(selectedCenter?.centerServiceId) &&
      (pathname === '/pt' || pathname === '/pt-packs') &&
      isPtEnabled,
  })

  const {
    data: ptSpotOffersData = {},
    isLoading: isPtSpotOfferLoading = false,
    refetch: refetchPtSpotOffers,
  } = useQuery({
    ...apiConfigs.getPTSpotOffers({
      productType: 'GYM_PT_PRODUCT',
      productIds: Object.keys(ptPacks)
        .reduce((previous: any, key: any) => {
          return [...previous, ...ptPacks[key]]
        }, [])
        .map(pack => pack.productId),
      centerId: selectedCenter?.id || '0',
      cityId: _.get(selectedCenter, 'address.city.cityId', ''),
      ...(_.isEmpty(userDetails)
        ? {}
        : {
            userId: userDetails?.id,
            phone: userDetails?.phone,
          }),
    }),
    enabled:
      Boolean(selectedCenter?.centerServiceId) &&
      !_.isEmpty(ptPacks) &&
      (pathname === '/pt' || pathname === '/pt-packs') &&
      isPtEnabled,
  })

  const {
    data: ppcSpotOffersData = {},
    isLoading: isPpcSpotOfferLoading = false,
    refetch: refetchPpcSpotOffers,
  } = useQuery({
    ...apiConfigs.getPTSpotOffers({
      productType: 'GYM_PT_PPC_PRODUCT',
      productIds: Object.keys(ppcPacks)
        .reduce((previous: any, key: any) => {
          return [...previous, ...ppcPacks[key]]
        }, [])
        .map(pack => pack.productId),
      centerId: selectedCenter?.id || '0',
      cityId: _.get(selectedCenter, 'address.city.cityId', ''),
      ...(_.isEmpty(userDetails)
        ? {}
        : {
            userId: userDetails?.id,
            phone: userDetails?.phone,
          }),
    }),
    enabled:
      Boolean(selectedCenter?.centerServiceId) &&
      !_.isEmpty(ppcPacks) &&
      (pathname === '/pt' || pathname === '/pt-packs') &&
      isPtEnabled,
  })

  const getAppliedSpotOffersForPacks = useCallback((packs: any[] = []) => {
    const appliedOffers: any = {}

    packs.forEach((pack: any) => {
      const {offers = []} = pack
      offers.forEach((offer: any) => {
        const {offerId = ''} = offer
        appliedOffers[offerId] = {}
      })
    })

    return appliedOffers
  }, [])

  const getCurrentPack = useCallback(
    (selectedPack: any, allPacks: any[] = []) => {
      if (_.isEmpty(allPacks)) {
        return {}
      }
      const currentPack =
        allPacks.find(
          (ptPack: any) => ptPack.productId === selectedPack.productId,
        ) || {}
      if (_.isEmpty(currentPack)) {
        Sentry.captureException(
          new Error(
            `No PT Pack found for user: ${userDetails?.id} with Product Id ${selectedPack.productId}`,
          ),
        )
        return currentPack
      }
      const priceDifference =
        Number(selectedPack?.price?.sellingPrice || 0) -
        Number(currentPack?.price?.sellingPrice || 0)

      if (priceDifference < 0) {
        Sentry.captureException(
          new Error(
            `Price for PT pack higher than actual price for user ID ${userDetails?.id}`,
          ),
        )
      }

      return {
        ...currentPack,
        priceDifference,
      }
    },
    [],
  )

  const getValidSpotOffers = useCallback((offers: any[] = [], packs: any[]) => {
    if (_.isEmpty(offers)) {
      return []
    }
    const packMap = packs.reduce((allPacks: any, curPack: any) => {
      return {
        ...allPacks,
        [curPack?.productId || 'none']: curPack,
      }
    }, {})

    const validOffers = offers
      .filter((offer: any) => {
        const {productIds = []} = offer
        return (
          // eslint-disable-next-line no-prototype-builtins
          productIds.find((pdtId: string) => packMap.hasOwnProperty(pdtId)) ||
          productIds.length === 0
        )
      })
      .map((offer: any) => {
        const {productIds = []} = offer
        return {
          ...offer,
          packNames: productIds.length
            ? productIds.reduce((allNames: string[], pdtId: string) => {
                const pack = packMap?.[pdtId] || null
                if (pack) {
                  const totalSessions = _.get(
                    pack,
                    'listingCategory.restrictions[0].restrictionCount',
                    0,
                  )
                  return [
                    ...allNames,
                    `${pluralize(
                      'session',
                      totalSessions,
                      true,
                    )} Personal Training`,
                  ]
                }
                return allNames
              }, [])
            : ['Applicable on all packs'],
        }
      })

    return validOffers
  }, [])

  const {isLoading: addProSpotOfferLoading, mutateAsync: addProSpotOffer} =
    useMutation(apiConfigs.addProSpotOfferConfig().queryFn)

  const activateSpotOffer = useCallback(
    (
      offer: any,
      productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT',
      userDetails: any,
      loginUserContext: any,
    ): void => {
      if (_.isEmpty(userDetails)) {
        toastError('User Details not found')
        return
      }
      const startDate = moment().toDate()
      const endDate = moment().endOf('day').toDate()
      const eligibilityType = 'USERID'
      const offerIds = _.get(offer, 'offerId', '')
      const eligibilityValue = userDetails?.id
      const count = _.get(offer, 'maxConsumptionCount')
      const loginUserEmail = _.get(loginUserContext, 'email', '')
      addProSpotOffer({
        offerIds,
        startDate,
        endDate,
        eligibilityType,
        eligibilityValue,
        count,
        addedBy: loginUserEmail,
        productType,
      } as ICreateProSpotOfferUser)
        .then(() => {
          toastSuccess('Offer Applied Successfully')
          if (productType === 'GYM_PT_PRODUCT') {
            refetchPtPacks()
            refetchPtSpotOffers()
          } else {
            refetchPpcSpotOffers()
            refetchPpcPacks()
          }
        })
        .catch((error: any) => {
          toastError(
            error?.response?.data?.message ||
              error?.response?.message ||
              error?.message,
          )
        })
    },
    [],
  )

  const getSpotOfferWidgets = useCallback(
    (
      validOffers: any[],
      appliedSpotOffers: any,
      showAppliedOffers: boolean,
      productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT',
      onTncClick: (offer: any) => void,
      applyOfferClick: (offer: any) => void,
    ) => {
      return validOffers.reduce((allOfferViews: any[], currentOffer: any) => {
        const uiLabel = _.get(currentOffer, 'uiLabels.description', '')
        const offerApplied =
          appliedSpotOffers?.[_.get(currentOffer, 'offerId', '')] || false

        const offerView =
          uiLabel && (showAppliedOffers || !offerApplied) ? (
            <div
              className={clsx(
                'flex',
                'justify-between',
                'bg-gray-cf-700 rounded-lg p-2',
              )}
            >
              <div className="flex flex-start flex-row justify-start items-center text-gray-cf-200">
                <span className="flex flex-row items-center justify-center mr-2">
                  <MdLocalOffer />
                  <span className="px-2 text-sm">{uiLabel}</span>
                </span>
                <button
                  className="text-pink-cf underline text-bold text-xs"
                  onClick={() => onTncClick(currentOffer)}
                >
                  T&C
                </button>
              </div>
              {!offerApplied ? (
                <GrayButton
                  onClick={() => {
                    applyOfferClick(currentOffer)
                  }}
                  textSize="xs"
                >
                  Apply
                </GrayButton>
              ) : (
                <div className={clsx('text-green-cf', 'p-2')}>Applied</div>
              )}
            </div>
          ) : null

        return offerView ? [...allOfferViews, offerView] : allOfferViews
      }, [])
    },
    [],
  )

  const value: ptContextProps = {
    trainersLevelBreakdown,
    isTrainerLevelsLoading,
    ptPacks,
    ptPacksLoading,
    refetchPtPacks,
    ppcPacks,
    ppcPacksLoading,
    refetchPpcPacks,
    ptSpotOffersData,
    isPtSpotOfferLoading,
    refetchPtSpotOffers,
    ppcSpotOffersData,
    isPpcSpotOfferLoading,
    refetchPpcSpotOffers,
    getAppliedSpotOffersForPacks,
    getCurrentPack,
    getValidSpotOffers,
    isActivateSpotOfferLoading: addProSpotOfferLoading,
    activateSpotOffer,
    getSpotOfferWidgets,
    refetchTrainers,
  }

  return (
    <PersonalTrainingContext.Provider value={value}>
      {children}
    </PersonalTrainingContext.Provider>
  )
}

const usePTContext = (): ptContextProps => {
  const context = React.useContext(PersonalTrainingContext)
  if (context === undefined) {
    throw new Error(
      'usePTContext must be used within a <PersonalTrainingProvider />',
    )
  }
  return context as ptContextProps
}

OtpContextProvider.defaultProps = {}

PersonalTrainingProvider.defaultProps = {}

export {usePTContext, PersonalTrainingProvider}
