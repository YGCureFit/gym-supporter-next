import React from 'react'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {WidgetContainer} from '../common/WidgetContainer'
import {Nullable} from '../common/Nullable'
import {_} from '../../utils/lodash'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'
import failedCall from '../../img/callStatus/failedCall.svg'
import info from '../../img/callStatus/info.svg'
import normalCall from '../../img/callStatus/normalCall.svg'
import attempted from '../../img/callStatus/attempted.svg'
import connected from '../../img/callStatus/Connected.svg'
import {FaPlay} from 'react-icons/fa'
import {ICallTrail, WidgetProps} from '../../apis/interfaces'
import '../../styles/callTrailWidget.css'

enum InteractionStatusEnum {
  RINGED = 'RINGED',
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  FAILED = 'FAILED',
  CONNECTED = 'CONNECTED',
  ATTEMPTED = 'ATTEMPTED',
  CANCELLED = 'CANCELLED',
}
interface CallTrailWidgetV2Props extends WidgetProps {
  data: ICallTrail[]
}

const getIconSource = (
  interactionStatus: InteractionStatusEnum,
  status: string,
): any => {
  if (status?.toUpperCase() === 'PACK_PURCHASED') {
    return info
  }
  switch (interactionStatus?.toUpperCase()) {
    case InteractionStatusEnum.PENDING:
      return normalCall
    case InteractionStatusEnum.CANCELLED:
      return failedCall
    case InteractionStatusEnum.FAILED:
      return failedCall
    case InteractionStatusEnum.STARTED:
      return attempted
    case InteractionStatusEnum.ATTEMPTED:
      return attempted
    case InteractionStatusEnum.RINGED:
      return attempted
    case InteractionStatusEnum.CONNECTED:
      return connected
    default:
      return normalCall
  }
}

const getIconClassName = (
  interactionStatus: InteractionStatusEnum,
  status: string,
): string => {
  const baseClassName = 'timeline-icon-wrapper'
  let className = ''
  const interactionStatusCaps = (
    interactionStatus || ''
  ).toUpperCase() as InteractionStatusEnum
  const statusCaps = (status || '').toUpperCase()

  // eslint-disable-next-line default-case
  switch (statusCaps) {
    case 'CANCELLED':
      return `${baseClassName} cancelled-icon-wrapper`
    case 'PACK_PURCHASED':
      return `${baseClassName} success-icon-wrapper`
    case 'CONTACT UNSUCCESSFUL':
      return `${baseClassName} failed-icon-wrapper`
  }

  if (
    [InteractionStatusEnum.CANCELLED, InteractionStatusEnum.FAILED].includes(
      interactionStatusCaps,
    )
  ) {
    className = 'failed-icon-wrapper'
  } else if (
    [
      InteractionStatusEnum.STARTED,
      InteractionStatusEnum.ATTEMPTED,
      InteractionStatusEnum.RINGED,
    ].includes(interactionStatusCaps)
  ) {
    className = 'attempted-icon-wrapper'
  } else if (
    [InteractionStatusEnum.CONNECTED, InteractionStatusEnum.PENDING].includes(
      interactionStatusCaps,
    )
  ) {
    className = 'connected-icon-wrapper'
  }
  return `${baseClassName} ${className}`
}

export const CallTrailWidget: React.FC<CallTrailWidgetV2Props> = (
  props: CallTrailWidgetV2Props,
) => {
  const {data} = props

  const verticalTimelineElement = data.map((log: ICallTrail) => {
    return (
      <VerticalTimelineElement
        key={log.lastModifiedOn + log.createdOn}
        contentArrowStyle={{display: 'none'}}
        contentStyle={{
          boxShadow: 'none',
          background: 'rgba(58, 58, 58,1)',
          color: 'white',
        }}
        date={moment(log.createdOn).calendar({
          sameDay: '[Today] [at] HH:mm',
          nextDay: '[Tomorrow] [at] HH:mm',
          lastDay: '[Yesterday] [at] HH:mm',
          lastWeek: '[Last] dddd [at] HH:mm',
          sameElse: 'DD MMM YYYY [at] HH:mm',
        })}
        icon={
          <>
            <img
              data-tip
              data-for={`${log.lastModifiedOn + log.createdOn}`}
              src={getIconSource(log.interactionStatus, log.status)}
              className="timeline-icon"
              alt="timeline-icon"
            />
            <ReactTooltip
              id={`${log.lastModifiedOn + log.createdOn}`}
              place="left"
              type="dark"
              effect="solid"
              key={log.lastModifiedOn + log.createdOn}
            >
              {log.interactionStatus?.length ? (
                <div>
                  <div>{log.interactionStatus}</div>
                  <div>Caller: {log.callerInteractionStatus}</div>
                  <div>Receiver: {log.receiverInteractionStatus}</div>
                </div>
              ) : (
                'No Info'
              )}
            </ReactTooltip>
          </>
        }
        iconClassName={getIconClassName(log.interactionStatus, log.status)}
        className={`${
          ['CANCELLED', 'PACK_PURCHASED'].includes(log.status?.toUpperCase())
            ? 'timeline-transparent-card'
            : ''
        }`}
      >
        <div className="timeline-card-content">
          <div>
            <span className="font-bold">{log.status}</span>
            <span> by </span>
            <span>{log.agentName}</span>
          </div>
          <div>{log.campaignName}</div>
          {!_.isEmpty(log.packProductType) && (
            <div className="text-gray-cf-300">{log.packProductType}</div>
          )}
          <div>
            {!_.isEmpty(log.subStatus) && (
              <span className="font-bold">
                {log.subStatus}
                <i className="timeline-card-separator fas fa-circle" />
              </span>
            )}
            <span className="text-gray-cf-300">{log.remarks}</span>
          </div>
          <div className="absolute bottom-2 right-2">
            {log.recordingUrl && (
              <button
                type="button"
                title="Play Call Recording"
                onClick={() => window.open(log.recordingUrl)}
              >
                <FaPlay color="black" />
              </button>
            )}
          </div>
        </div>
      </VerticalTimelineElement>
    )
  })

  const renderNoSubTasks = (): any => {
    return (
      <div className="text-center w-full text-gray-cf-400 py-4 h-full flex justify-center items-center">
        No Call Trails
      </div>
    )
  }

  return (
    <Nullable
      dependencies={[[]]}
      loader={<SkeletonLoader length={1} />}
      emptyRender={renderNoSubTasks()}
    >
      <WidgetContainer>
        <VerticalTimeline layout="1-column" animate>
          {verticalTimelineElement}
        </VerticalTimeline>
      </WidgetContainer>
    </Nullable>
  )
}
