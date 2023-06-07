import React from 'react'
import clsx from 'clsx'

interface widgetProps {
  payload: any
  onValChange: (...arg: any) => any
  value: any
  paramKey: string
}

export const W_TEXT_FIELD: React.FC<widgetProps> = ({
  payload,
  onValChange,
  value,
  paramKey,
}) => {
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
          'focus-within:bg-gray-cf-900',
          'group',
          'outline-none',
          'flex',
          'items-center',
          'justify-center',
          'sm:p-4',
          'p-1',
          'sm:mt-0',
          'mt-2',
          'self-center',
          'mx-2',
          'rounded',
          'bg-gray-cf-500',
          'backdrop-filter backdrop-blur-xl bg-opacity-30',
        )}
      >
        <input
          className={clsx(
            'sticky',
            'w-full',
            'text-xs',
            'sm:text-sm',
            'text-gray-cf-50',
            'caret-gray-cf-300',
            'placeholder-gray-cf-200',
            'px-2',
            'h-6',
            'outline-none',
            'bg-transparent',
          )}
          type={payload.TYPE ?? 'text'}
          step={1}
          aria-label=""
          placeholder={payload?.HINT_TEXT ?? ''}
          value={value}
          onChange={({target: {value}}) => onChange(value)}
          maxLength={payload.NUMBER_TYPE ?? 10}
        />
      </div>
    </div>
  )
}
