import clsx from 'clsx'
import React, {useState} from 'react'
import {CallTrailModal} from '../../modals/CallTrailModal'
import {Nullable} from '../common/Nullable'
import {WidgetCard} from '../common/WidgetCard'
import {WidgetContainer} from '../common/WidgetContainer'
import {WidgetHeader} from '../common/WidgetHeader'
import {CallTrailWidget} from './CallTrailWidget'

const DEFAULT_CALL_TRAIL = 3

interface TasksRowProps {
  callTrailData: any
  callTrailLoading: any
}

const CallTrailCard: React.FC<TasksRowProps> = (props: TasksRowProps) => {
  const {callTrailData, callTrailLoading} = props
  const [callTrailVisibility, setCallTrailVisibility] = useState<boolean>(false)

  const toggleCallTrailModel: any = () =>
    setCallTrailVisibility(value => !value)

  const callTrailError = callTrailData.error

  const renderNoSubTasks = (): any => (
    <div className={clsx('text-center', 'p-7', 'text-gray-cf-300')}>
      Nothing here
    </div>
  )
  return (
    <>
      {callTrailVisibility && (
        <CallTrailModal
          modalVisibility={callTrailVisibility}
          onClose={toggleCallTrailModel}
          data={callTrailData}
        />
      )}

      {!callTrailError && (
        <WidgetContainer>
          <WidgetHeader title="Call Trail" />
          <WidgetCard alignCol>
            <Nullable
              dependencies={callTrailData}
              loading={callTrailLoading}
              emptyRender={renderNoSubTasks()}
            >
              <CallTrailWidget
                data={[...callTrailData].slice(0, DEFAULT_CALL_TRAIL)}
              />
              {callTrailData && callTrailData.length > DEFAULT_CALL_TRAIL && (
                <span className="mx-80">
                  <button
                    className="bg-gray-cf-600 p-2 flex shadow-gray-xl justify-center items-center flex-row text-gray-cf-50 bg-gray-cf-600 rounded"
                    onClick={toggleCallTrailModel}
                  >
                    SEE MORE CALL TRAILS
                  </button>
                </span>
              )}
            </Nullable>
          </WidgetCard>
        </WidgetContainer>
      )}
    </>
  )
}

export default CallTrailCard
