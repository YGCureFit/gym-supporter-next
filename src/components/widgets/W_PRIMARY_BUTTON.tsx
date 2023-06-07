import React from 'react'
import {GradientButton} from '../common/GradientButton'

interface widgetProps {
  payload: any
  onSubmit: (...args) => any
}

export const W_PRIMARY_BUTTON: React.FC<widgetProps> = ({
  payload,
  onSubmit,
}) => {
  return (
    <GradientButton
      title={payload?.TITLE}
      onClick={() => onSubmit(payload?.ACTION_KEY)}
    />
  )
}
