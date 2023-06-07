import React, {useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {Nullable} from '../common/Nullable'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {WidgetContainer} from '../common/WidgetContainer'
import {WidgetHeader} from '../common/WidgetHeader'
import {WidgetCard} from '../common/WidgetCard'
import {Table} from '../common/Table'
import {apiConfigs} from '../../apis/configs'
import {SubHeader} from '../common/SubHeader'
import {
  FieldType,
  FOLLOW_UP_STATUS_ENUM,
  FOLLOW_UP_STATUSES,
  OrientationType,
} from '../../constants'
import {useHistory} from 'react-router-dom'
import {DropDownNative} from '../forms/DropDown'
import moment from 'moment'
import {_} from '../../utils/lodash'
import {ICallTrail, IUserInfo} from '../../apis/interfaces'
import clsx from 'clsx'
import {useCustomerContext} from '../contextProviders/customerContext'

type TaskListWidgetProps = {
  pageSize?: number
}

interface IBooking {
  centerCity: string
  centerName: string
  className: string
  date: string
  endTime: string
  startTime: string
  userId: string
  isAttended?: boolean
}

interface IAgentTask {
  campaignName: string
  instanceId: number
  interactionStatus: string
  interactionType: string
  refId: string
  scheduledEndTime: number
  scheduledStartTime: number
  taskStatus: string
  user: IUserInfo
  booking?: IBooking
  callTrail?: ICallTrail
}

export const TaskListWidget: React.FC<TaskListWidgetProps> = ({
  pageSize = 5,
}) => {
  const [selectedStatuses, setSelectedStatuses] = useState<
    {label: string; value: string}[]
  >([])

  const {searchUserById} = useCustomerContext()

  const history = useHistory()

  const {data: statusList = [], isLoading: isStatusListLoading = false} =
    useQuery({
      ...apiConfigs.getStatusList(),
    })

  const status = useMemo(() => {
    return selectedStatuses.map(status => status.value)
  }, [selectedStatuses])

  const {data: taskList = {}, isLoading: isTaskListLoading = false} = useQuery({
    ...apiConfigs.getTaskList({
      pageNumber: 1,
      status,
    }),
  })

  useEffect(() => {
    if (statusList.length) {
      setSelectedStatuses([
        {
          value: 'PENDING',
          label: 'PENDING',
        },
        {
          value: 'PENDING_FOLLOW_UP',
          label: 'PENDING_FOLLOW_UP',
        },
        {
          value: 'PENDING_CONNECTED_FOLLOW_UP',
          label: 'PENDING_CONNECTED_FOLLOW_UP',
        },
      ])
    }
  }, [statusList])

  const getTaskListTableConfig = useMemo(() => {
    return [
      {
        Header: 'Lead Name',
        accessor: 'user',
        Cell: (props: any) => {
          const {value} = props
          return (
            <div
              onClick={() => {
                searchUserById(String(value.code))
                history.push(`/user`)
              }}
              className="cursor-pointer"
            >
              {value ? (
                <span className="text-yellow-cf-600">{value.name} </span>
              ) : (
                '-'
              )}
            </div>
          )
        },
      },
      {
        Header: 'Campaign Name',
        accessor: 'campaignName',
        Cell: ({value}: any) => {
          return value || '-'
        },
      },
      {
        Header: 'Status',
        accessor: 'taskStatus',
        Cell: ({value}: any) => {
          return value || '-'
        },
      },
      {
        Header: 'Expiry',
        accessor: 'scheduledEndTime',
        Cell: (props: any) => {
          return `Expiring ${moment(props.value).fromNow()}`
        },
      },
      {
        Header: 'Task Info',
        accessor: 'interactionType',
        Cell: (props: any) => {
          const row = _.get(props, 'row.original', {}) as IAgentTask
          const status = _.get(row, 'taskStatus', '').toUpperCase()
          if (status === 'PENDING') {
            const bookings = _.get(row, 'booking', []) as IBooking[]
            if (!_.isEmpty(bookings)) {
              return (
                <div className="px-px py-2 text-left flex flex-col justify-center items-start">
                  {bookings.map((booking, index) => {
                    const startTimeMoment = moment(
                      `${booking.date} ${booking.startTime}`,
                    )
                    const key = index + booking.userId
                    return (
                      <div key={key}>
                        {startTimeMoment.isBefore(moment())
                          ? booking.isAttended
                            ? 'Attended'
                            : 'Booked'
                          : 'Upcoming Booking'}
                        <span>{` ${_.get(
                          booking,
                          'className',
                          '',
                        )} ${startTimeMoment.fromNow()}`}</span>
                      </div>
                    )
                  })}
                </div>
              )
            }
          }

          const callTrail = _.get(row, 'callTrail') as ICallTrail

          if (!_.isEmpty(callTrail)) {
            const lastInteractionMoment = moment(callTrail.lastModifiedOn)
            return (
              <div className="px-px py-2 text-left flex-row flex flex-col justify-between items-center">
                <div>{_.get(callTrail, 'remarks', '')}</div>
                <div style={{minWidth: '180px'}}>
                  <div className="flex flex-col justify-center items-start">
                    {FOLLOW_UP_STATUSES.includes(status) && (
                      <div>
                        {status === FOLLOW_UP_STATUS_ENUM.PENDING_FOLLOW_UP
                          ? `${moment(
                              row.scheduledStartTime,
                            ).fromNow()} at ${moment(
                              row.scheduledStartTime,
                            ).format('hh:mm A')}`
                          : moment(row.scheduledStartTime).format(
                              'DD MMM YYYY [at] hh:mm A',
                            )}
                      </div>
                    )}
                    <div className="text-gray-cf-500">
                      {!FOLLOW_UP_STATUSES.includes(status) && (
                        <div>Last Interaction</div>
                      )}
                      {lastInteractionMoment.fromNow()} at{' '}
                      {lastInteractionMoment.format('hh:mm A')}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          return '-'
        },
      },
    ]
  }, [selectedStatuses])

  const getStatusOptions = useMemo((): {label: string; value: string}[] => {
    const statusOptions = statusList.map((status: string) => {
      return {
        value: status,
        label: status,
      }
    })
    return statusOptions
  }, [statusList])

  const getSubHeader = (): React.ReactNode => {
    const getSelect = (): any => {
      return (
        <div
          className={clsx('bg-gray-cf-700', 'rounded-lg', 'relative')}
          style={{minWidth: '300px'}}
        >
          <DropDownNative
            value={selectedStatuses}
            fieldName="fieldSelect"
            onChange={(value: any) => {
              setSelectedStatuses(value)
            }}
            multiSelect
            options={getStatusOptions}
          />
        </div>
      )
    }

    const subHeaderConfig = [
      {
        type: FieldType.COMPONENT,
        orientation: OrientationType.RIGHT,
        component: getSelect(),
      },
    ]
    return <SubHeader key="allTasks" subHeaderConfig={subHeaderConfig} />
  }

  return (
    <Nullable
      dependencies={[[]]}
      loader={<SkeletonLoader length={1} />}
      loading={isTaskListLoading || isStatusListLoading}
    >
      <WidgetContainer>
        <WidgetHeader title="Today's Tasks">{getSubHeader()}</WidgetHeader>
        <WidgetCard zeroPadding alignCol>
          <Table
            loading={isTaskListLoading || isStatusListLoading}
            data={taskList?.elements || []}
            columns={getTaskListTableConfig}
            pageSize={pageSize}
          />
        </WidgetCard>
      </WidgetContainer>
    </Nullable>
  )
}

TaskListWidget.defaultProps = {
  pageSize: 5,
}
