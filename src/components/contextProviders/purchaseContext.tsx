import React, {useCallback, useEffect, useState} from 'react'
import {PackPurchaseModal} from '../../modals/PackPurchaseModal'
import {TncModal} from '../../modals/TncModal'
import {PaytmPaymentModal} from '../../modals/PaytmPaymentModal'
import moment from 'moment'
import {useCenterContext} from './centerContext'
import {PTPackDetailModal} from '../../modals/PTPackDetailModal'

const PurchaseContext = React.createContext({})
PurchaseContext.displayName = 'PurchaseContext'

type PurchaseContextProviderProps = {
  children: React.ReactNode
}

type ptDetails = {
  trainer: any
  level: string
  productType: 'GYM_PT_PRODUCT' | 'GYM_PT_PPC_PRODUCT'
  selectedPack?: any
  ptSlotDetails?: any
  onUserSearchSuccessCallback?: any
}

type purchaseContextProps = {
  purchasePack: (args: {
    modalTitle: string
    packDetails: any
    PTSlotDetails?: any
    onPurchaseSuccess?: (...args: any) => any
    refetchPackDetails?: (...args: any) => any
  }) => void
  viewTnc: (args: {tncData: any}) => void
  makePaytmPayment: (args: {
    paymentDetails: any
    onPaymentSuccess?: (...args: any) => any
  }) => void
  currentOrders: any[]
  setCurrentOrder: (paymentDetails: any) => void
  ptDetails: ptDetails
  setPtDetails: (ptDetails: ptDetails) => void
  openPackDetailModal: () => void
}

const useLocalStorageState = (key: string): any => {
  const [state, setState] = useState<any>(() => {
    return JSON.parse(localStorage.getItem(key) || '[]') || []
  })

  const setLocalStorage = (value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }

  return [state, setLocalStorage]
}

const useCurrentOrders = (key: string): any => {
  const [currentOrders, setCurrentOrders] = useLocalStorageState(key)

  const getTimeFilteredOrders = useCallback((allOrders: any[]): any[] => {
    return allOrders.filter((pendingOrder: any) => {
      const {createdAt = moment().valueOf()} = pendingOrder
      return moment().diff(createdAt, 'minutes') < 10
    })
  }, [])

  useEffect(() => {
    setCurrentOrders(getTimeFilteredOrders([...currentOrders]))
  }, [])

  const validateAndSetCurrentOrders = (newOrder: any): void => {
    const {order, status} = newOrder
    const {orderId: newOrderId = ''} = order
    let tempCurrentOrders: any[] = [...currentOrders]
    tempCurrentOrders = tempCurrentOrders.filter((pendingOrder: any) => {
      const {order = {}} = pendingOrder
      const {orderId = ''} = order
      return newOrderId !== orderId
    })
    if (status === 'CREATED') {
      tempCurrentOrders = [newOrder, ...tempCurrentOrders]
    }
    tempCurrentOrders = getTimeFilteredOrders(tempCurrentOrders)
    setCurrentOrders(tempCurrentOrders)
  }

  return [currentOrders, validateAndSetCurrentOrders]
}

const PurchaseContextProvider: React.FC<PurchaseContextProviderProps> = ({
  children,
}) => {
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false)
  const [paytmPaymentModalVisible, setPaytmPaymentModalVisible] =
    useState(false)
  const [packParams, setPackParams] = useState<any>({})
  const [paytmPaymentParams, setPaytmPaymentParams] = useState<any>({})
  const [tncVisible, setTncVisible] = useState(false)
  const [tncData, setTncData] = useState({})
  const [ptDetails, setPtDetails] = useState<any>({})
  const {selectedCenter} = useCenterContext()
  const [currentOrders, setCurrentOrder] = useCurrentOrders(
    `${selectedCenter?.id || '0'}currentOrders`,
  )

  const [packDetailModalVisible, setPackDetailModalVisible] = useState(false)

  const togglePackDetailModal = (): any => {
    setPackDetailModalVisible(value => !value)
  }

  const togglePurchaseModal = (): any =>
    setPurchaseModalVisible(value => !value)

  const togglePaytmPaymentModal = (): any =>
    setPaytmPaymentModalVisible(value => !value)

  const toggleTncModal = (): any => setTncVisible(value => !value)

  const openPackDetailModal = (): void => {
    togglePackDetailModal()
  }

  const value: purchaseContextProps = {
    purchasePack: ({
      modalTitle,
      packDetails,
      PTSlotDetails = null,
      onPurchaseSuccess = null,
      refetchPackDetails = null,
    }) => {
      setPackParams({
        modalTitle,
        packDetails,
        PTSlotDetails,
        onPurchaseSuccess,
        refetchPackDetails,
      })
      setPurchaseModalVisible(false)
      togglePurchaseModal()
    },
    viewTnc: ({tncData}) => {
      setTncData(tncData)
      setTncVisible(false)
      toggleTncModal()
    },
    makePaytmPayment: ({paymentDetails, onPaymentSuccess = null}) => {
      setPaytmPaymentParams({paymentDetails, onPaymentSuccess})
      setPaytmPaymentModalVisible(false)
      togglePaytmPaymentModal()
    },
    currentOrders,
    setCurrentOrder,
    ptDetails,
    setPtDetails,
    openPackDetailModal,
  }

  const startDate =
    currentOrders && currentOrders[0]?.order?.products[0]?.option?.startDate
  return (
    <PurchaseContext.Provider value={value}>
      {children}
      {purchaseModalVisible ? (
        <PackPurchaseModal
          onClose={togglePurchaseModal}
          modalVisibility={purchaseModalVisible}
          modalTitle={packParams?.modalTitle}
          packDetails={packParams?.packDetails}
          onPurchaseSuccess={packParams?.onPurchaseSuccess}
          selectCenterType={selectedCenter?.partnerCenterType}
        />
      ) : null}
      {tncVisible ? (
        <TncModal
          onClose={toggleTncModal}
          modalVisibility={tncVisible}
          tncDetails={tncData}
        />
      ) : null}
      {paytmPaymentModalVisible ? (
        <PaytmPaymentModal
          modalVisibility={paytmPaymentModalVisible}
          onClose={togglePaytmPaymentModal}
          onPaymentSuccess={paytmPaymentParams?.onPaymentSuccess}
          paymentDetails={paytmPaymentParams?.paymentDetails}
          closePurchaseModal={() => setPurchaseModalVisible(false)}
          packDetails={packParams?.packDetails}
          startDate={startDate}
        />
      ) : null}
      {packDetailModalVisible ? (
        <PTPackDetailModal
          modalVisibility={packDetailModalVisible}
          onClose={togglePackDetailModal}
        />
      ) : null}
    </PurchaseContext.Provider>
  )
}

PurchaseContextProvider.defaultProps = {}

const usePurchaseContext = (): purchaseContextProps => {
  const context = React.useContext(PurchaseContext)
  if (context === undefined) {
    throw new Error(
      'usePurchaseContext must be used within a <PurchaseContextProvider />',
    )
  }
  return context as purchaseContextProps
}

export {usePurchaseContext, PurchaseContextProvider}
