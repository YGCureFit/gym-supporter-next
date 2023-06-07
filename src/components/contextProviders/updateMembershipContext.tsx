import React, {useState} from 'react'
import {UpdateMembershipModal} from '../../modals/UpdateMembershipModal'

const UpdateMembershipContext = React.createContext({})
UpdateMembershipContext.displayName = 'UpdateMembershipContext'

type UpdateMembershipContextProviderProps = {
  children: React.ReactNode
}

type updateMembershipArgs = {
  onUpdateMembershipSuccess: (data: any) => any
  membershipName?: string
  membershipId?: string
  trainer?: string
  startDate?: Date | null
  endDate?: Date | null
  agentId: string
  action: string
  fieldsToUdpate: string[]
}

type updateMembershipContextProps = {
  updateMembership: (args: updateMembershipArgs) => void
}

const INIT_EXTRA_PROPS = {
  onUpdateMembershipSuccess: () => {
    // do nothing,
  },
  membershipName: '',
  membershipId: '',
  trainer: '',
  startDate: null,
  endDate: null,
  agentId: '',
  action: '',
  fieldsToUdpate: [],
}

const UpdateMembershipContextProvider: React.FC<UpdateMembershipContextProviderProps> =
  ({children}) => {
    const [updateMembershipModalVisible, setUpdateMembershipModalVisible] =
      useState(false)
    const [updateMembershipModalProps, setUpdateMembershipModalProps] =
      useState<any>(INIT_EXTRA_PROPS)
    const toggleUpdateMembershipModal = (): any => {
      setUpdateMembershipModalVisible(value => !value)
    }

    const onCloseUpdateMembershipModal = (): any => {
      setUpdateMembershipModalProps({
        onUpdateMembershipSuccess: () => {
          // do nothing
        },
        membershipName: '',
        membershipId: '',
        trainer: '',
        startDate: null,
        endDate: null,
        agentId: '',
        action: '',
        fieldsToUdpate: [],
      })
      toggleUpdateMembershipModal()
    }

    const updateMembership = ({
      onUpdateMembershipSuccess = () => {
        // do nothing
      },
      membershipName = '',
      membershipId = '',
      trainer = '',
      startDate = null,
      endDate = null,
      agentId = '',
      action = '',
      fieldsToUdpate = [],
    }: updateMembershipArgs): void => {
      setUpdateMembershipModalVisible(false)
      setUpdateMembershipModalProps({
        onUpdateMembershipSuccess,
        membershipName,
        membershipId,
        trainer,
        startDate,
        endDate,
        agentId,
        action,
        fieldsToUdpate,
      })
      toggleUpdateMembershipModal()
    }

    const value: updateMembershipContextProps = {
      updateMembership,
    }

    return (
      <UpdateMembershipContext.Provider value={value}>
        {children}
        {updateMembershipModalVisible ? (
          <UpdateMembershipModal
            modalVisibility={updateMembershipModalVisible}
            onClose={onCloseUpdateMembershipModal}
            otherProps={updateMembershipModalProps}
          />
        ) : null}
      </UpdateMembershipContext.Provider>
    )
  }

UpdateMembershipContextProvider.defaultProps = {}

const useUpdateMembershipContext = (): updateMembershipContextProps => {
  const context = React.useContext(UpdateMembershipContext)
  if (context === undefined) {
    throw new Error(
      'useUpdateMembershipContext must be used within a <UpdateMembershipContextProvider />',
    )
  }
  return context as updateMembershipContextProps
}

export {useUpdateMembershipContext, UpdateMembershipContextProvider}
