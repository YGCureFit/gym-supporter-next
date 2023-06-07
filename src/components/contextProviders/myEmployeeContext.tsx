import React, {useState} from 'react'
import {OtpContextProvider} from './otpContext'
import {useCenterContext} from './centerContext'
import {useMutation, useQuery} from 'react-query'
import {apiConfigs} from '../../apis/configs'

const MyEmployeeContext = React.createContext({})
MyEmployeeContext.displayName = 'MyEmployeeContext'

type MyEmployeeProviderProps = {
  children: React.ReactNode
}

type myEmpContextProps = {
  trainersBreakdown: any
  isTrainerLoading: boolean
  refetchTrainersList: any
  gxTrainersList: any
  isGXTrainerLoading: boolean
  refetchGXTrainersList: (query: {
    center: number
    cultEmployeeId: number
  }) => void
  gxTrainerDetail: any
  isGXTrainerDetailLoading: boolean
  refetchGXTrainerDetail: (query: {
    id: string
    cultEmployeeId: number
    startDate: string
  }) => void
  isAgentLoading: boolean
  agents: any
  refetchAgent: any
  setSelectedTrainer: (trainer: ISelectedTrainer) => void
  selectedTrainer: ISelectedTrainer | undefined
  selectedCenter: any
  isLevelLoading: boolean
  PTLevelList: any
  refreshPtLevel: any
  isSpecialisationLoading: boolean
  specialisationList: any
  refreshSpecialisationList: any
}

type ISelectedTrainer = {
  id: string
  isGxTrainer: boolean
}

const MyEmployeeProvider: React.FC<MyEmployeeProviderProps> = ({children}) => {
  const {selectedCenter} = useCenterContext()
  const [selectedTrainer, setSelectedTrainer] = useState<ISelectedTrainer>()

  const {
    data: trainersBreakdown = [],
    isLoading: isTrainerLoading,
    refetch: refetchTrainersList,
  } = useQuery({
    ...apiConfigs.getTrainersWithAssets({
      centerServiceId: selectedCenter?.centerServiceId || 0,
    }),
    enabled: Boolean(selectedCenter?.centerServiceId),
  })

  const {
    data: gxTrainersList = [],
    isLoading: isGXTrainerLoading,
    mutateAsync: refetchGXTrainersList,
  } = useMutation(apiConfigs.getGXTrainers().queryFn)

  const {
    isLoading: isAgentLoading,
    data: agents = {},
    refetch: refetchAgent,
  } = useQuery({
    ...apiConfigs.getAgent({
      identityId: selectedTrainer?.id || '',
    }),
    enabled: !!selectedTrainer?.id && !selectedTrainer?.isGxTrainer,
  })

  const {
    isLoading: isGXTrainerDetailLoading,
    data: gxTrainerDetail = {},
    mutateAsync: refetchGXTrainerDetail,
  } = useMutation(apiConfigs.getGxTrainersDetails().queryFn)

  const {
    isLoading: isLevelLoading,
    data: PTLevelList = [],
    refetch: refreshPtLevel,
  } = useQuery({
    ...apiConfigs.getAllPTLevel(),
    enabled: !!selectedTrainer?.id && !selectedTrainer?.isGxTrainer,
  })

  const {
    isLoading: isSpecialisationLoading,
    data: specialisationList = [],
    refetch: refreshSpecialisationList,
  } = useQuery({
    ...apiConfigs.getAllSpecialisation(),
    enabled: !!selectedTrainer?.id && !selectedTrainer?.isGxTrainer,
  })

  const value: myEmpContextProps = {
    trainersBreakdown,
    isTrainerLoading,
    refetchTrainersList,
    gxTrainersList,
    isGXTrainerLoading,
    refetchGXTrainersList,
    gxTrainerDetail,
    isGXTrainerDetailLoading,
    refetchGXTrainerDetail,
    isAgentLoading,
    agents,
    refetchAgent,
    setSelectedTrainer,
    selectedTrainer,
    selectedCenter,
    isLevelLoading,
    PTLevelList,
    refreshPtLevel,
    isSpecialisationLoading,
    specialisationList,
    refreshSpecialisationList,
  }

  return (
    <MyEmployeeContext.Provider value={value}>
      {children}
    </MyEmployeeContext.Provider>
  )
}

const useMyEmpContext = (): myEmpContextProps => {
  const context = React.useContext(MyEmployeeContext)
  if (context === undefined) {
    throw new Error(
      'useMyEmpContext must be used within a <MyEmployeeProvider />',
    )
  }
  return context as myEmpContextProps
}

OtpContextProvider.defaultProps = {}

MyEmployeeProvider.defaultProps = {}

export {useMyEmpContext, MyEmployeeProvider}
