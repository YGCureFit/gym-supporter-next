import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {useQuery} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {useQueryParamSync} from '../../hooks/common'
import {_} from '../../utils/lodash'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {IPartnerCenter} from '../../apis/interfaces'

type CenterContextProviderProps = {
  children: ReactNode
}

function detectMob(): any {
  return window.innerWidth <= 640
}

const CenterContext = React.createContext({})
CenterContext.displayName = 'CenterContext'

const CenterContextProvider: React.FC<CenterContextProviderProps> = ({
  children,
}) => {
  const {
    data = {},
    error,
    isLoading,
  } = useQuery({...apiConfigs.getCenterDetailsConfig(), cacheTime: 0})

  const {data: ggMetabaseConfigData = {}} = useQuery({
    ...apiConfigs.getGuaranteedGuidanceMetabaseMapping(),
    cacheTime: 0,
  })

  const {data: ptSalesPhoneRevealCenters = []} = useQuery({
    ...apiConfigs.getPTSalesPhonenumberRevealMetabaseMapping(),
    cacheTime: 0,
  })

  const {data: centerScoreEnabledCenters} = useQuery({
    ...apiConfigs.getCenterScoreEnabledCities(),
    cacheTime: 0,
  })

  const {data: centerScoreIncentiveEnabledCenters} = useQuery({
    ...apiConfigs.getCenterScoreIncentiveEnabledCenters(),
    cacheTime: 0,
  })

  const [selectedCenter, setSelectedCenter] = useState<any>(null)
  const {centers: gyms = [], userContext = {}} = data

  const [showHamburgerToggle, setShowHamburgerToggle] = useState(true)
  const toggleMenu = (): any => {
    setShowHamburgerToggle(prevstate => !prevstate)
  }

  const {data: cultEmployeeData = {}, isLoading: isCultEmployeeDataLoading} =
    useQuery({
      ...apiConfigs.getCultEmployeeDetails({email: userContext?.email}),
      enabled: !_.isEmpty(userContext),
      cacheTime: 0,
    })

  const findCenterByCenterServiceId = useCallback(
    (centerServiceId: number | string): IPartnerCenter => {
      return Array.isArray(gyms)
        ? gyms.find(
            (center: IPartnerCenter) =>
              Number(center.centerServiceId) === Number(centerServiceId),
          )
        : null
    },
    [gyms],
  )

  const updateSelectedCenter = useCallback(
    (centerServiceId: number | string) => {
      const newSelectedCenter = findCenterByCenterServiceId(centerServiceId)
      if (
        newSelectedCenter &&
        newSelectedCenter?.centerServiceId !== selectedCenter?.centerServiceId
      ) {
        setSelectedCenter(newSelectedCenter)
      }
    },
    [selectedCenter, findCenterByCenterServiceId],
  )

  const updateParam = useQueryParamSync(
    'centerServiceId',
    selectedCenter,
    updateSelectedCenter,
    findCenterByCenterServiceId,
  )

  const isPtEnabled = useMemo(() => {
    if (_.isEmpty(data) || _.isEmpty(selectedCenter)) {
      return false
    }
    const {gymPtEnabledCenter = []} = data
    const {centerServiceId = 0} = selectedCenter
    return gymPtEnabledCenter?.includes?.(centerServiceId)
  }, [data, selectedCenter])

  const isCenterScoreEnabled = useMemo(() => {
    if (_.isEmpty(centerScoreEnabledCenters) || _.isEmpty(selectedCenter)) {
      return false
    }
    const selectedCenterCityId = _.get(
      selectedCenter,
      'address.city.cityId',
      '',
    )
    return centerScoreEnabledCenters?.includes(selectedCenterCityId)
  }, [selectedCenter, centerScoreEnabledCenters])

  const isCenterScoreIncentiveEnabled = useMemo(() => {
    if (
      _.isEmpty(centerScoreIncentiveEnabledCenters) ||
      _.isEmpty(selectedCenter)
    ) {
      return false
    }
    return centerScoreIncentiveEnabledCenters.includes(
      String(selectedCenter.id),
    )
  }, [[selectedCenter, centerScoreIncentiveEnabledCenters]])

  useEffect(() => {
    if (_.isEmpty(selectedCenter) && !_.isEmpty(gyms)) {
      setSelectedCenter(gyms[0])
    }
  }, [gyms])

  const {data: activeProgramsInCenter = null, refetch: refetchActivePrograms} =
    useQuery({
      ...apiConfigs.getActiveProgramsForCenter(selectedCenter?.id),
      enabled: !_.isEmpty(selectedCenter) && selectedCenter.id !== '',
      cacheTime: 0,
    })

  useEffect(() => {
    if (!_.isEmpty(selectedCenter) && selectedCenter.id !== '') {
      refetchActivePrograms()
    }
  }, [selectedCenter])

  const value: centerContextProps = {
    centers: gyms,
    userContext,
    cultEmployeeData,
    ggMetabaseConfigData,
    ptSalesPhoneRevealCenters,
    activeProgramsInCenter,
    error,
    isLoading,
    onCenterChange: updateParam,
    selectedCenter,
    isPtEnabled,
    isCenterScoreEnabled,
    isCenterScoreIncentiveEnabled,
    showHamburgerToggle,
    toggleMenu,
    detectMob,
  }

  if (isLoading || isCultEmployeeDataLoading || _.isEmpty(gyms)) {
    return <SkeletonLoader length={5} />
  }

  return (
    <CenterContext.Provider value={value}>{children}</CenterContext.Provider>
  )
}

CenterContextProvider.defaultProps = {}

type centerContextProps = {
  centers: Array<IPartnerCenter>
  userContext: any
  cultEmployeeData: any
  ggMetabaseConfigData: any
  ptSalesPhoneRevealCenters: number[]
  activeProgramsInCenter: any
  error: any
  isLoading: boolean
  onCenterChange: (...args: any) => any
  selectedCenter: IPartnerCenter
  isPtEnabled: boolean
  isCenterScoreEnabled: boolean
  isCenterScoreIncentiveEnabled: boolean
  showHamburgerToggle: boolean
  toggleMenu: () => any
  detectMob: () => any
}

const useCenterContext = (): centerContextProps => {
  const context = React.useContext(CenterContext)
  if (context === undefined) {
    throw new Error(
      'useCenterContext must be used within a <CenterContextProvider />',
    )
  }
  return context as centerContextProps
}

export {useCenterContext, CenterContextProvider}
