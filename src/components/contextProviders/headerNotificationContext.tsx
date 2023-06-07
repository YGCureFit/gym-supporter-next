import React, {useState} from 'react'
import {NotificationStatus} from '../../constants'

import clsx from 'clsx'
import {AnimatePresence, motion} from 'framer-motion'
import {AiOutlineClose} from 'react-icons/ai'

type HeaderNotificationProviderProps = {
  children: React.ReactNode
}

type headerNotificationContextProps = {
  notiVisibility: boolean
  setNotiVisibility: (...args: any) => any
  closeNotification: () => void
  openNotification: (status: NotificationStatus, message: string) => void
  params: {
    status: NotificationStatus
    message: string
  }
}

const HeaderNotificationProviderContext = React.createContext({})
HeaderNotificationProviderContext.displayName =
  'HeaderNotificationProviderContext'

export const HeaderNotificationProvider: React.FC<HeaderNotificationProviderProps> =
  ({children}) => {
    const [notiVisibility, setNotiVisibility] = useState<boolean>(false)
    const [params, setParams] = useState<{
      status: NotificationStatus
      message: string
    }>({
      status: NotificationStatus.SUCCESS,
      message: '',
    })

    const value: headerNotificationContextProps = {
      params,
      notiVisibility,
      setNotiVisibility: args => {
        setNotiVisibility(args)
      },
      closeNotification: () => {
        setNotiVisibility(false)
      },
      openNotification: (status, message) => {
        setNotiVisibility(true)
        setParams({
          status,
          message,
        })
      },
    }

    return (
      <HeaderNotificationProviderContext.Provider value={value}>
        {children}
      </HeaderNotificationProviderContext.Provider>
    )
  }

HeaderNotificationProvider.defaultProps = {}

export const useHeaderNotificationContext =
  (): headerNotificationContextProps => {
    const context = React.useContext(HeaderNotificationProviderContext)
    if (context === undefined) {
      throw new Error(
        'useHeaderNotificationContext must be used within a <HeaderNotificationProvider />',
      )
    }
    return context as headerNotificationContextProps
  }

type HeaderNotificationProps = any

export const HeaderNotification: React.FC<HeaderNotificationProps> = () => {
  const {closeNotification, params, notiVisibility} =
    useHeaderNotificationContext()
  return (
    <AnimatePresence>
      {notiVisibility ? (
        <motion.div
          transition={{
            duration: 0.2,
          }}
          initial={{y: -5, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: -5, opacity: 0}}
          style={{
            top: '5rem',
          }}
          className={clsx(
            {
              'bg-green-cf': params.status === NotificationStatus.SUCCESS,
              'bg-red-cf': params.status === NotificationStatus.FAILURE,
            },
            'flex',
            'items-center',
            'justify-between',
            'w-full',
            'sticky',
            'z-10',
            'py-2',
            'px-6',
            'bg-opacity-50 backdrop-filter backdrop-blur',
            'text-gray-cf-50',
            'text-sm',
          )}
        >
          {params.message}
          <button
            onClick={closeNotification}
            className={clsx(
              'w-5',
              'h-5',
              'rounded-full',
              'text-gray-cf-50',
              'flex',
              'justify-center',
              'items-center',
            )}
          >
            <AiOutlineClose />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

HeaderNotification.defaultProps = {}
