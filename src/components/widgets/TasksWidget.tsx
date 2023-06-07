import React from 'react'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {WidgetContainer} from '../common/WidgetContainer'
import {WidgetHeader} from '../common/WidgetHeader'
import {WidgetCard} from '../common/WidgetCard'
import {Nullable} from '../common/Nullable'
import clsx from 'clsx'
import {useMutation} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {_} from '../../utils/lodash'
import {toastError, toastSuccess} from '../../utils/toastify'
import TasksRow from './TasksRow'
import {Animatable} from '../common/Animatable'

interface TasksWidgetProps {
  userDetails: any
  userContext: any

  refetchCallTrail: any
  refetchDetail: any
  detailData: any
  detailLoading: any
}

export const TasksWidget: React.FC<TasksWidgetProps> = (
  props: TasksWidgetProps,
) => {
  const {
    userDetails,
    userContext,
    refetchCallTrail,
    refetchDetail,
    detailData,
    detailLoading,
  } = props

  const uuid = _.get(detailData[0], 'refId', '')

  const {mutate: callUser} = useMutation(apiConfigs.callUser().queryFn, {
    onSuccess: () => {
      const toastBaseMessage = `Call Successfully initiated.`
      const toastCallReceiveMessage = `${
        userContext && userContext.phone
          ? `You'll receive a call on ${userContext.phone}`
          : ''
      }`
      toastSuccess(toastBaseMessage + toastCallReceiveMessage)
      refetchCallTrail()
    },
    onError: (error: any) => {
      toastError(
        `Something Went Wrong while making the call ${
          error?.response?.data?.message ||
          error?.response?.data ||
          error?.message
        }`,
      )
    },
  })

  const renderNoSubTasks = (): any => (
    <div className={clsx('text-center', 'p-7', 'text-gray-cf-300')}>
      Nothing here
    </div>
  )

  const calling = (): any => {
    const payload = {
      taskId: uuid,
      userId: userDetails.id,
    }
    console.log('calling payload', payload)
    callUser(payload)
  }

  const refetchDetailAndCallTrail = (): any => {
    refetchCallTrail()
    refetchDetail()
  }

  const getTaskRowUI = (detailData: []): any => {
    return detailData.map((data: any) => {
      return (
        <TasksRow
          key={data.id}
          detailData={data}
          refetchDetailAndCallTrail={refetchDetailAndCallTrail}
        />
      )
    })
  }

  const getUI = (): any => {
    const taskCount = detailData && detailData.length
    return (
      <Animatable
        className={clsx(
          'w-5/5',
          taskCount >= 4 ? 'h-72' : '',
          'bg-gray-cf-700',
          'rounded-lg',
          'overflow-y-scroll',
          'overscroll-none',
        )}
      >
        {taskCount && getTaskRowUI(detailData)}
      </Animatable>
    )
  }

  return (
    <WidgetContainer>
      <WidgetHeader title="Tasks">
        {detailData && detailData.length && (
          <button
            className="bg-gray-cf-600 p-2 flex shadow-gray-xl justify-center items-center flex-row text-gray-cf-50 rounded mb-2"
            onClick={calling}
          >
            Place a call
          </button>
        )}
      </WidgetHeader>
      <WidgetCard zeroPadding={false} alignCol>
        <Nullable
          dependencies={detailData}
          loader={<SkeletonLoader length={1} />}
          loading={detailLoading}
          emptyRender={renderNoSubTasks()}
        >
          {getUI()}
        </Nullable>
      </WidgetCard>
    </WidgetContainer>
  )
}
