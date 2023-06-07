import React from 'react'
import {W_DROPDOWN} from './W_DROPDOWN'
import {W_DATE_SELECTOR} from './W_DATE_SELECTOR'
import {GridContainer} from '../common/GridContainer'
import clsx from 'clsx'
import {W_TEXT_FIELD} from './W_TEXT_FIELD'
import {W_PRIMARY_BUTTON} from './W_PRIMARY_BUTTON'
import {W_TABLE} from './W_TABLE'
import {W_SINGLE_VALUE_SELECTOR} from './W_SINGLE_VALUE_SELECTOR'

interface widgetProps {
  onChangeParam: (...args: any) => any
  pageLayoutData: any
  param: any
  onClickButton: any | null
}

export const WIDGET_BUILDER: React.FC<widgetProps> = ({
  onChangeParam,
  pageLayoutData,
  param,
  onClickButton,
}) => {
  const builderData = pageLayoutData?.BUILDER_DATA ?? []

  const getWidget = (widgetKey: string): any => {
    const widget = pageLayoutData[widgetKey] ?? null
    if (
      widget === null ||
      widget?.WIDGET_TYPE === null ||
      widget?.WIDGET_TYPE === undefined
    ) {
      return <div />
    }
    switch (widget?.WIDGET_TYPE) {
      case 'W_DROPDOWN':
        return (
          <W_DROPDOWN
            onValChange={onChangeParam}
            payload={widget?.PAYLOAD}
            paramKey={widget?.PARAM_KEY}
            value={param[widget?.PARAM_KEY] ?? null}
          />
        )
      case 'W_DATE_SELECTOR':
        return (
          <W_DATE_SELECTOR
            paramKey={widget?.PARAM_KEY}
            onValChange={onChangeParam}
            payload={widget?.PAYLOAD}
            value={param[widget?.PARAM_KEY] ?? null}
          />
        )
      case 'W_TEXT_FIELD':
        return (
          <W_TEXT_FIELD
            paramKey={widget?.PARAM_KEY}
            onValChange={onChangeParam}
            payload={widget?.PAYLOAD}
            value={param[widget?.PARAM_KEY] ?? null}
          />
        )
      case 'W_PRIMARY_BUTTON':
        return (
          <W_PRIMARY_BUTTON
            payload={widget?.PAYLOAD}
            onSubmit={onClickButton}
          />
        )
      case 'W_SINGLE_VALUE_SELECTOR':
        return (
          <W_SINGLE_VALUE_SELECTOR
            onValChange={onChangeParam}
            payload={widget?.PAYLOAD}
            paramKey={widget?.PARAM_KEY}
            value={param[widget?.PARAM_KEY] ?? 1}
          />
        )
      default:
        return <div />
    }
  }

  if (builderData === null || builderData === undefined) {
    return <div />
  }

  const builderMapping = (row: any): any => {
    switch (row?.BUILDER_TYPE ?? '') {
      case 'GRID_CONTAINER':
        return (
          <GridContainer cols={row?.COLS ?? 1} gap={row?.GAPS ?? 0}>
            {row?.WIDGET_LIST.map(widgetKey => getWidget(widgetKey))}
          </GridContainer>
        )
      case 'W_TABLE':
        return (
          <W_TABLE
            payload={pageLayoutData[row?.WIDGET_KEY]?.PAYLOAD}
            onClickButton={onClickButton}
            onValChange={onChangeParam}
            layoutData={pageLayoutData}
            param={param}
          />
        )
      default:
        return <div />
    }
  }

  return builderData.map(row => {
    if (row === null || row === undefined) return <div />
    return <div className={clsx('px-6', 'py-4')}>{builderMapping(row)}</div>
  })
}
