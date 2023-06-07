import React from 'react'
import clsx from 'clsx'
import {IconButton} from '../common/IconButton'
import {BiChevronLeft, BiChevronRight} from 'react-icons/all'

interface widgetProps {
  payload: any
  onValChange: (...arg: any) => any
  value: number
  paramKey: string
}

export const W_SINGLE_VALUE_SELECTOR: React.FC<widgetProps> = ({
  payload,
  onValChange,
  value,
  paramKey,
}) => {
  if (payload === null || payload === undefined) {
    return <div />
  }

  const onChange = (option: any): void => {
    onValChange(paramKey, option)
  }

  return (
    <div>
      <div className={clsx('text-gray-cf-50', 'font-semibold', 'text-lg')}>
        {payload?.TITLE}
      </div>
      <div
        className={clsx(
          'flex',
          'text-gray-cf-900',
          'min-w-max',
          'items-center',
          'pt-2',
        )}
      >
        <IconButton
          onClick={() => {
            if (value > payload?.MIN_VAL) {
              onChange(value - 1)
            }
          }}
        >
          <BiChevronLeft size="lg" />
        </IconButton>
        <div
          className={clsx(
            'min-w-max',
            'flex-nowrap',
            'self-center',
            'my-auto',
            'font-bold',
            'text-gray-cf-50',
          )}
        >
          {value}
        </div>
        <IconButton
          onClick={() => {
            if (value < payload?.MAX_VAL) {
              onChange(value + 1)
            }
          }}
        >
          <BiChevronRight size="lg" />
        </IconButton>
      </div>
    </div>
  )
}
