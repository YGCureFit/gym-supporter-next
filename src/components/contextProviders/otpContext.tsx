import React, {useState} from 'react'
import {OtpVerificationModal} from '../../modals/OtpVerificationModal'

const OTPContext = React.createContext({})
OTPContext.displayName = 'OTPContext'

type OtpContextProviderProps = {
  children: React.ReactNode
}

type otpContextProps = {
  openOtpVerification: (args: {
    phone: string
    tip?: string | null
    sendOtpDirectly?: boolean
    onOTPVerificationSuccessCallback: () => void
  }) => void
}

const OtpContextProvider: React.FC<OtpContextProviderProps> = ({children}) => {
  const [otpVerificationModalVisibility, setOtpVerificationModalVisibility] =
    useState(false)
  const toggleOtpModal = (): any =>
    setOtpVerificationModalVisibility(value => !value)
  const [otpTip, setOtpTip] = useState<string | null>(null)
  const [sendOtpDirectly, setSendOtpDirectly] = useState<boolean | undefined>(
    false,
  )
  const [phone, setPhone] = useState<string | null>(null)
  const [otpSuccessCallback, setOtpSuccessCallback] = useState<() => void>(
    () => {
      // do nothing
    },
  )

  const value: otpContextProps = {
    openOtpVerification: ({
      phone,
      tip,
      sendOtpDirectly,
      onOTPVerificationSuccessCallback,
    }) => {
      setOtpVerificationModalVisibility(false)
      setPhone(phone)
      setOtpTip(tip || null)
      setSendOtpDirectly(sendOtpDirectly)
      setOtpSuccessCallback(() => () => {
        toggleOtpModal()
        onOTPVerificationSuccessCallback?.()
      })
      toggleOtpModal()
    },
  }

  return (
    <OTPContext.Provider value={value}>
      {children}
      {otpVerificationModalVisibility && phone ? (
        <OtpVerificationModal
          modalVisibility={otpVerificationModalVisibility && Boolean(phone)}
          phone={phone}
          onClose={toggleOtpModal}
          tip={otpTip}
          onOtpVerificationSuccess={otpSuccessCallback}
          sendOtpDirectly={sendOtpDirectly}
        />
      ) : null}
    </OTPContext.Provider>
  )
}

const useOtpContext = (): otpContextProps => {
  const context = React.useContext(OTPContext)
  if (context === undefined) {
    throw new Error(
      'useOtpContext must be used within a <OtpContextProvider />',
    )
  }
  return context as otpContextProps
}

OtpContextProvider.defaultProps = {}

export {useOtpContext, OtpContextProvider}
