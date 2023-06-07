import React, {useCallback, useReducer, useState} from 'react'
import {useMutation} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {RecordPitchModal} from '../../modals/RecordPitchModal'
import {toastError} from '../../utils/toastify'
import {IUserDetailPayload, IUserSearchById} from '../../apis/interfaces'
import {UserSearchModal} from '../../modals/UserSearchModal'
import * as Sentry from '@sentry/react'

const CustomerContext = React.createContext({})
CustomerContext.displayName = 'CustomerContext'

type CustomerContextProviderProps = {
  children: React.ReactNode
}

type recordPitchArgs = {
  onRecordPitchSuccess: (data: any) => any
  customerName?: string
  customerId?: string
  phone?: string
}

type customerContextProps = {
  recordPitch: (args: recordPitchArgs) => void
  userDetails: any
  userDetailsLoading: boolean
  userDetailsError: any
  searchUserByPhone: (
    phone: string,
    onSuccessCallback?: (...args: any) => any,
    onErrorCallback?: (...args: any) => any,
    disableRecordPitch?: boolean,
  ) => any
  searchUserById: (
    userId: string | number,
    onSuccessCallback?: (...args: any) => any,
  ) => any
  sellPackSuccess: boolean
  toggleSellPackSuccessStatus: (args: boolean) => void
  openUserSearchModal: (otherProps?: {
    placeHolder?: string
    title?: string
    onSuccess?: (...args: any) => any
  }) => void
  resetUserDetails: () => void
}

const INIT_EXTRA_PROPS = {
  onRecordPitchSuccess: () => {
    // do nothing,
  },
  customerName: '',
  customerId: '',
  phone: '',
}

const INIT_CUSTOMER_STATE = {
  loading: false,
  userDetails: {},
  error: null,
}

const actionTypes = {
  LOADING: 'LOADING',
  SET_USER_DETAIL: 'SET_USER_DETAIL',
  RESET_USER_DETAIL: 'RESET_USER_DETAIL',
  SET_ERROR: 'SET_ERROR',
}

const actionDispatchers = {
  LOADING: () => ({type: actionTypes.LOADING}),
  SET_USER_DETAIL: (userDetails: any) => ({
    type: actionTypes.SET_USER_DETAIL,
    userDetails,
  }),
  RESET_USER_DETAIL: () => ({
    type: actionTypes.RESET_USER_DETAIL,
  }),
  SET_ERROR: (error: any) => ({
    type: actionTypes.SET_ERROR,
    error,
  }),
}

const customerReducer = (state: any, action: any): any => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {...INIT_CUSTOMER_STATE, loading: true}
    case actionTypes.SET_USER_DETAIL:
      return {...INIT_CUSTOMER_STATE, userDetails: action.userDetails}
    case actionTypes.SET_ERROR:
      return {...INIT_CUSTOMER_STATE, error: action.error}
    case actionTypes.RESET_USER_DETAIL:
      return {...INIT_CUSTOMER_STATE}
    default:
      return state
  }
}

const CustomerContextProvider: React.FC<CustomerContextProviderProps> = ({
  children,
}) => {
  const [customerState, dispatch] = useReducer(
    customerReducer,
    INIT_CUSTOMER_STATE,
  )
  const [recordPitchModalVisible, setRecordPitchModalVisible] = useState(false)
  const [userSearchModalVisible, setUserSearchModalVisible] = useState(false)
  const [userSearchModalProps, setUserSearchModalProps] = useState({})
  const [recordPitchModalProps, setRecordPitchModalProps] =
    useState<any>(INIT_EXTRA_PROPS)
  const toggleRecordPitchModal = (): any => {
    setRecordPitchModalVisible(value => !value)
  }
  const toggleUserSearchModal = (): any => {
    setUserSearchModalVisible(value => !value)
  }
  const [sellPackSuccess, setSellPackSuccess] = useState(false)

  const toggleSellPackSuccessStatus = useCallback((value: boolean): void => {
    setSellPackSuccess(value)
  }, [])

  const {
    loading: isCustomerStateLoading = false,
    userDetails = {},
    error = null,
  } = customerState

  const {isLoading: isSearchByPhoneLoading, mutateAsync: searchUserByPhone} =
    useMutation(apiConfigs.getUserDetailsConfig().queryFn)

  const {isLoading: isSearchByUserIdLoading, mutateAsync: searchByUserId} =
    useMutation(apiConfigs.searchByUserId().queryFn)

  const recordPitch = ({
    onRecordPitchSuccess = () => {
      // do nothing
    },
    customerId = '',
    customerName = '',
    phone = '',
  }: recordPitchArgs): void => {
    setRecordPitchModalVisible(false)
    setRecordPitchModalProps({
      onRecordPitchSuccess,
      customerId,
      customerName,
      phone,
    })
    toggleRecordPitchModal()
  }

  const searchUserByIdCb = useCallback(
    (userId: string | number, onSuccessCallback?: (...args: any) => any) => {
      dispatch(actionDispatchers.LOADING())
      searchByUserId({
        userId,
      } as IUserSearchById)
        .then(data => {
          dispatch(actionDispatchers.SET_USER_DETAIL(data))
          onSuccessCallback?.(data)
        })
        .catch(error => {
          toastError(
            `User not found for ID: ${userId} ${
              error?.response?.data?.message ||
              error?.response?.data ||
              error?.message
            }`,
          )
          Sentry.captureMessage(`User not found for ID: ${userId}`)
          dispatch(actionDispatchers.SET_ERROR(error))
        })
    },
    [],
  )

  const searchUserByPhoneCb = useCallback(
    (
      phone: string,
      onSuccessCallback?: (...args: any) => any,
      onErrorCallback?: (...args: any) => any,
      disableRecordPitch = false,
    ) => {
      dispatch(actionDispatchers.LOADING())
      searchUserByPhone({
        phone,
      } as IUserDetailPayload)
        .then((data: any) => {
          const {id = 0} = data
          if (!id) {
            throw new Error('User not found')
          }
          onSuccessCallback?.(data)
          dispatch(actionDispatchers.SET_USER_DETAIL(data))
        })
        .catch(error => {
          onErrorCallback?.(error)
          dispatch(actionDispatchers.SET_USER_DETAIL({}))
          if (disableRecordPitch) {
            return
          }
          recordPitch({
            onRecordPitchSuccess: data => {
              const {customerId = 0} = data
              if (customerId) {
                searchUserByIdCb(customerId, onSuccessCallback)
              } else {
                toastError('Record Pitch unsuccessful')
                dispatch(
                  actionDispatchers.SET_ERROR(
                    new Error('Record Pitch unsuccessful'),
                  ),
                )
              }
            },
            phone,
          })
        })
        .finally(() => {
          setUserSearchModalVisible(false)
        })
    },
    [],
  )

  const resetUserDetails = (): void => {
    dispatch(actionDispatchers.RESET_USER_DETAIL())
  }

  const openUserSearchModal = useCallback((otherProps = {}) => {
    setUserSearchModalProps(otherProps)
    toggleUserSearchModal()
  }, [])

  const value: customerContextProps = {
    recordPitch,
    userDetails,
    userDetailsLoading:
      isCustomerStateLoading ||
      isSearchByPhoneLoading ||
      isSearchByUserIdLoading,
    userDetailsError: error,
    sellPackSuccess,
    toggleSellPackSuccessStatus,
    openUserSearchModal,
    searchUserById: searchUserByIdCb,
    searchUserByPhone: searchUserByPhoneCb,
    resetUserDetails,
  }

  return (
    <CustomerContext.Provider value={value}>
      {children}
      {recordPitchModalVisible ? (
        <RecordPitchModal
          modalVisibility={recordPitchModalVisible}
          onClose={toggleRecordPitchModal}
          otherProps={recordPitchModalProps}
        />
      ) : null}
      {userSearchModalVisible ? (
        <UserSearchModal
          onClose={toggleUserSearchModal}
          modalVisibility={userSearchModalVisible}
          otherProps={userSearchModalProps}
        />
      ) : null}
    </CustomerContext.Provider>
  )
}

CustomerContextProvider.defaultProps = {}

const useCustomerContext = (): customerContextProps => {
  const context = React.useContext(CustomerContext)
  if (context === undefined) {
    throw new Error(
      'useCustomerContext must be used within a <CustomerContextProvider />',
    )
  }
  return context as customerContextProps
}

export {useCustomerContext, CustomerContextProvider}
