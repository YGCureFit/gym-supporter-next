import React, {useMemo} from 'react'
import clsx from 'clsx'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {WidgetCard} from '../common/WidgetCard'
import _ from 'lodash'
import {Table} from '../common/Table'
import {Nullable} from '../common/Nullable'
import {W_DROPDOWN} from './W_DROPDOWN'
import {W_SINGLE_VALUE_SELECTOR} from './W_SINGLE_VALUE_SELECTOR'
import tick from '../../img/spotOffer/tick.svg'
import cross from '../../img/spotOffer/cross.svg'

interface widgetProps {
  payload: any
  onClickButton: (...arg: any) => any
  onValChange: (...arg: any) => any
  layoutData: any
  param: any
}

export const W_TABLE: React.FC<widgetProps> = ({
  payload,
  onClickButton,
  layoutData,
  onValChange,
  param,
}) => {
  const ratingCellComponent = (object: any): any => {
    const value = object?.value
    return value ? (
      <p>
        {`${value} `}
        <sub>({value})</sub>
      </p>
    ) : (
      <p>N/A</p>
    )
  }

  function handleDivClick(value: any, event): void {
    event.stopPropagation()
    onClickButton(value?.ACTION, value)
  }

  const imageComponent = (object: any): any => {
    const value = object?.value
    let imgUrl

    switch (value) {
      case 'cross':
        imgUrl = cross
        break
      case 'tick':
        imgUrl = tick
        break
      default:
        imgUrl = cross
    }

    return <img src={imgUrl} alt="tick" />
  }

  const textComponent = (object: any): any => {
    const value = object?.value
    return value ? <p>{`${value}`}</p> : <p>-</p>
  }
  const userObject = (object: any): any => {
    const value = object?.value
    return (
      <div onClick={event => handleDivClick(object, event)}>
        {value ? <p>{`${value?.name} (${value?.userId})`}</p> : <p>-</p>}
      </div>
    )
  }

  const getCell = (cellType: string, value: any): any => {
    switch (cellType) {
      case 'text':
        return textComponent(value)
      case 'rating':
        return ratingCellComponent(value)
      case 'image':
        return imageComponent(value)
      case 'userObject':
        return userObject(value)
      default:
        return textComponent(value)
    }
  }

  const getColumns = useMemo(() => {
    const columns: {
      Header: string
      accessor: string
      Cell: any
    }[] = []
    payload?.TABLE_COLUMN.forEach(entry => {
      const column = {
        Header: entry.HEADER,
        accessor: entry.ACCESSOR,
        Cell: ({value}: any) => getCell(entry.CELL, value),
      }
      columns.push(column)
    })
    return columns
  }, [payload])

  if (_.isNil(payload)) {
    return <div />
  }

  return (
    <div>
      <div
        className={clsx(
          'flex flex-row w-full justify-between items-center my-2 mb-3',
        )}
      >
        <div
          className={clsx(
            'text-gray-cf-50',
            'font-semibold',
            'text-lg',
            'w-40',
          )}
        >
          {!_.isEmpty(payload?.TABLE_LIST) && (payload?.TITLE ?? '')}
        </div>
        {(payload?.PAGE_NUMBER_AND_LIMIT_SUPPORT ?? false) && (
          <div className={clsx('flex')}>
            <W_DROPDOWN
              onValChange={onValChange}
              payload={layoutData?.KEY_PAGE_LIMIT?.PAYLOAD}
              paramKey={layoutData?.KEY_PAGE_LIMIT?.PARAM_KEY}
              value={param[layoutData?.KEY_PAGE_LIMIT?.PARAM_KEY] ?? null}
            />
          </div>
        )}
      </div>
      <Nullable
        dependencies={payload?.TABLE_LIST || []}
        loader={<SkeletonLoader length={2} />}
        emptyRender={
          <div
            className={clsx('text-center', 'w-full', 'm-5', 'text-gray-cf-300')}
          >
            {payload.EMPTY_LIST_TITLE ?? 'Nothing Found'}
          </div>
        }
      >
        <div className="w-full h-max py-5 flex flex-col justify-start">
          <WidgetCard alignCol zeroPaddingVertical>
            {!_.isEmpty(payload?.TABLE_LIST) && (
              <Table
                useTransparentHeader
                columns={getColumns}
                data={payload?.TABLE_LIST ?? []}
                differentiateRows
              />
            )}
          </WidgetCard>
        </div>
      </Nullable>
      {(payload?.PAGE_NUMBER_AND_LIMIT_SUPPORT ?? false) && (
        <div className={clsx('flex justify-end top-0 right-0')}>
          <W_SINGLE_VALUE_SELECTOR
            onValChange={onValChange}
            payload={layoutData?.KEY_CHANGE_PAGE?.PAYLOAD}
            paramKey={layoutData?.KEY_CHANGE_PAGE?.PARAM_KEY}
            value={param[layoutData?.KEY_CHANGE_PAGE?.PARAM_KEY] ?? null}
          />
        </div>
      )}
    </div>
  )
}
