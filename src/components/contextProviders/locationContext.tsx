import React from 'react'
import {useCenterContext} from './centerContext'
import {useQuery} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {CenterType} from '../../apis/interfaces'

const LocationContext = React.createContext({})
LocationContext.displayName = 'LocationContext'

type LocationProviderProps = {
  children: React.ReactNode
}

type locationContextProps = {
  locations: any
  isLocationLoading: boolean
  refetchLocations: () => void
  gxCenters: any
  isGXCenterLoading: boolean
  refetchGXCenters: () => void
  locationOptions: any[]
  centerOptions: any[]
}

const LocationProvider: React.FC<LocationProviderProps> = ({children}) => {
  const {selectedCenter, cultEmployeeData} = useCenterContext()

  const {
    isLoading: isLocationLoading,
    data: locations = [],
    refetch: refetchLocations,
  } = useQuery({
    ...apiConfigs.getLocationAreas({
      cultEmployeeId: cultEmployeeData.employeeId,
    }),
    enabled: Boolean(
      selectedCenter?.cultCenterId &&
        selectedCenter?.partnerCenterType === CenterType.HYBRID_CENTER,
    ),
  })

  const {
    isLoading: isGXCenterLoading,
    data: gxCenters = [],
    refetch: refetchGXCenters,
  } = useQuery({
    ...apiConfigs.getGXCenters({
      cultEmployeeId: cultEmployeeData.employeeId,
    }),
    enabled: Boolean(
      selectedCenter?.cultCenterId &&
        selectedCenter?.partnerCenterType === CenterType.HYBRID_CENTER,
    ),
  })

  const locationOptions = React.useMemo(() => {
    const updatedLocations = [] as any
    locations.forEach((location: any) => {
      updatedLocations.push({
        ...location,
        label: location.name,
        value: location.id,
      })
    })
    return updatedLocations
  }, [locations])

  const centerOptions = React.useMemo(() => {
    const updatedCenters = [] as any
    gxCenters.forEach((center: any) => {
      updatedCenters.push({
        ...center,
        label: center.name,
        value: center.id,
      })
    })
    return updatedCenters
  }, [gxCenters])

  const value: locationContextProps = {
    locations,
    isLocationLoading,
    refetchLocations,
    gxCenters,
    isGXCenterLoading,
    refetchGXCenters,
    locationOptions,
    centerOptions,
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}

const useLocationContext = (): locationContextProps => {
  const context = React.useContext(LocationContext)
  if (context === undefined) {
    throw new Error(
      'locationContext must be used within a <LocationProvider />',
    )
  }
  return context as locationContextProps
}

LocationProvider.defaultProps = {}

export {useLocationContext, LocationProvider}
