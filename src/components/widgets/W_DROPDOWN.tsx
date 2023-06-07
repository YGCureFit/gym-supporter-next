import React from 'react'
import {DropDownNative} from '../forms/DropDown'
import clsx from 'clsx'

interface widgetProps {
  payload: any
  onValChange: (...arg: any) => any
  paramKey: any
  value: any
}

export const W_DROPDOWN: React.FC<widgetProps> = ({
  payload,
  onValChange,
  paramKey,
  value,
}) => {
  if (
    payload?.OPTION === null ||
    payload?.OPTION === undefined ||
    payload?.OPTION.length === 0
  ) {
    return <div />
  }

  const onChange = (option: any): void => {
    onValChange(paramKey, option)
  }

  return (
    <div className={clsx('mx-5')}>
      <div className={clsx('text-gray-cf-50', 'font-semibold', 'text-lg')}>
        {payload?.TITLE}
      </div>
      <div
        className={clsx(
          'focus-within:bg-gray-cf-900',
          'group',
          'outline-none',
          'py-2',
          'px-4',
          'rounded',
          'bg-gray-cf-500',
          'backdrop-filter backdrop-blur-xl bg-opacity-30',
        )}
      >
        {payload?.ENABLE_MULTI_SELECT ?? false ? (
          <DropDownNative
            options={payload?.OPTION}
            value={value}
            onChange={onChange}
            placeholder={payload?.INITIAL_VALUE?.label ?? ''}
            fieldName="fieldName"
            multiSelect
          />
        ) : (
          <DropDownNative
            options={payload?.OPTION}
            value={value}
            onChange={onChange}
            placeholder={payload?.INITIAL_VALUE?.label ?? ''}
            fieldName="fieldName"
          />
        )}
      </div>
    </div>
  )
}
