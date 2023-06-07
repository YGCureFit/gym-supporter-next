import React, {forwardRef} from 'react'
import clsx from 'clsx'
import {IconButton} from '../common/IconButton'
import moment from 'moment/moment'
import {BiChevronLeft, BiChevronRight, FaCalendar} from 'react-icons/all'
import DatePicker from 'react-datepicker'

interface widgetProps {
  payload: any
  onValChange: (...arg: any) => any
  value: any
  paramKey: string
}

export const W_DATE_SELECTOR: React.FC<widgetProps> = ({
  payload,
  onValChange,
  value,
  paramKey,
}) => {
  if (!payload) {
    return <div />
  }

  let timeVal = value

  if (!timeVal) {
    timeVal = payload?.INITIAL_VALUE
  }

  const onChange = (option: any): void => {
    onValChange(paramKey, option)
  }

  const CustomInputDate = forwardRef(({onClick}: any, ref) => (
    <IconButton onClick={onClick} ref={ref as any}>
      <FaCalendar />
    </IconButton>
  ))

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
            onChange(moment(timeVal).subtract(1, 'days').toDate())
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
          {moment(timeVal).format('ddd DD MMM')}
        </div>
        <IconButton
          onClick={() => {
            onChange(moment(timeVal).add(1, 'days').toDate())
          }}
        >
          <BiChevronRight size="lg" />
        </IconButton>
        <DatePicker
          showPopperArrow={false}
          selected={timeVal}
          onChange={date => onChange(date as Date)}
          customInput={<CustomInputDate />}
          todayButton="Today"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    </div>
  )
}
