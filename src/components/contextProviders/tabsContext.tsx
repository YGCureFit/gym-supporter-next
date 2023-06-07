import React, {useState} from 'react'
import clsx from 'clsx'
import {motion} from 'framer-motion'

type TabsProps = {
  children: React.ReactNode
  setOuterState?: (...args: any) => any
  defaultTab?: any
}

type tabContextProps = {
  activeTab: any
  setActiveTab: (...args: any) => any
}

const TabsContext = React.createContext({})
TabsContext.displayName = 'TabsContext'

export const Tabs: React.FC<TabsProps> = ({
  children,
  setOuterState,
  defaultTab,
}) => {
  const [activeTab, setActiveTab] = useState<any>(defaultTab)

  const value: tabContextProps = {
    activeTab,
    setActiveTab: args => {
      setActiveTab(args)
      setOuterState?.(args)
    },
  }

  return (
    <TabsContext.Provider value={value}>
      <div className={clsx('flex')}>{children}</div>
    </TabsContext.Provider>
  )
}

Tabs.defaultProps = {
  setOuterState: () => {
    // do nothing
  },
  defaultTab: null,
}

const useTabContext = (): tabContextProps => {
  const context = React.useContext(TabsContext)
  if (context === undefined) {
    throw new Error('useTabContext must be used within a <Tabs />')
  }
  return context as tabContextProps
}

type TabProps = {
  id: string
  children: React.ReactNode
}

export const Tab: React.FC<TabProps> = ({id, children}) => {
  const {activeTab, setActiveTab} = useTabContext()

  return (
    <div key={id} className={clsx('relative')}>
      <motion.button
        type="button"
        onClick={() => {
          setActiveTab(id)
        }}
        layoutId={id}
        className={clsx(
          {
            'font-semibold': activeTab === id,
            'text-gray-cf-50': activeTab === id,
            'text-gray-cf-300': activeTab !== id,
          },
          'px-3',
          'pb-2',
        )}
      >
        {children}
      </motion.button>
      {id === activeTab ? (
        <motion.div
          key="underline"
          className={clsx(
            'absolute',
            'h-1',
            'left-0',
            'right-0',
            '-bottom-px',
            'bg-gray-cf-400',
            'rounded-lg',
          )}
          layoutId="underline"
        />
      ) : null}
    </div>
  )
}
