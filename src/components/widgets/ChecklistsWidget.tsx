import React, {useRef, useState} from 'react'
import {Nullable} from '../common/Nullable'
import {WidgetContainer} from '../common/WidgetContainer'
import {WidgetHeader} from '../common/WidgetHeader'
import {useQuery} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {useCenterContext} from '../contextProviders/centerContext'
import moment from 'moment'
import clsx from 'clsx'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {FaAngleRight} from 'react-icons/fa'
import {CheckListSubtasksModal} from '../../modals/CheckListSubtasksModal'
import {WidgetCard} from '../common/WidgetCard'
import {motion} from 'framer-motion'
import {Scrollable} from '../common/Scrollable'

type ChecklistsProps = any

export const ChecklistsWidget: React.FC<ChecklistsProps> = () => {
  const {selectedCenter} = useCenterContext()

  const timeToRef = useRef(moment().endOf('day').valueOf().toString())
  const [currentCheckList, setCurrentChecklist] = useState<any>({})
  const [subTasksModalVisible, setSubTasksModalVisible] = useState(false)

  const {
    isLoading: isChecklistsLoading,
    data: checklists = [],
    refetch: refetchChecklists,
  } = useQuery({
    ...apiConfigs.getAllChecklists({
      centerId: Number(selectedCenter?.centerServiceId || 0),
      timeTo: timeToRef.current,
    }),
    refetchOnWindowFocus: true,
  })

  const toggleModal = (): void => {
    setSubTasksModalVisible(value => !value)
  }

  const renderEmpty = (): any => (
    <WidgetCard>
      <div
        className={clsx(
          'text-gray-cf-200',
          'self-center',
          'w-full',
          'flex',
          'justify-center',
          'items-center',
        )}
      >
        Nothing here
      </div>
    </WidgetCard>
  )

  const renderCheckListCard = (checklist: any): any => {
    const {title = '', dueTime = moment().valueOf(), id = 0} = checklist
    const passedDueTime = moment().diff(moment(dueTime), 'minutes') > 0

    return (
      <motion.button
        layoutId={`${id}`}
        onClick={() => {
          setCurrentChecklist(checklist)
          toggleModal()
        }}
      >
        <div
          className={clsx(
            {
              'border-4 border-orange-cf': passedDueTime,
            },
            'mr-4',
            'rounded-lg',
            'bg-gray-cf-700',
            'sm:w-80',
            'w-60',
            'h-full',
            'rounded-lg',
            'inline-flex',
            'justify-between',
            'p-4',
            'items-center',
          )}
        >
          <div
            className={clsx(
              'flex',
              'flex-col',
              'w-64',
              'justify-start',
              'place-items-start',
            )}
          >
            <div
              className={clsx(
                'text-gray-cf-100',
                'text-base',
                'w-64',
                'font-semibold',
                'overflow-ellipsis overflow-hidden truncate',
                'flex',
              )}
            >
              {title}
            </div>
            <div
              className={clsx(
                'text-gray-cf-300',
                'text-xs',
                'self-start',
                'mt-2',
              )}
            >
              {`Due by: ${moment(dueTime).calendar()}`}
            </div>
          </div>
          <div className={clsx('sm:block hidden text-gray-cf-200')}>
            <FaAngleRight size={23} />
          </div>
        </div>
      </motion.button>
    )
  }

  return (
    <Nullable
      dependencies={checklists}
      loading={isChecklistsLoading}
      loader={<SkeletonLoader length={1} />}
    >
      <WidgetContainer>
        <WidgetHeader title="Checklist" />
        <Nullable dependencies={checklists} emptyRender={renderEmpty()}>
          <Scrollable>{checklists.map(renderCheckListCard)}</Scrollable>
        </Nullable>
      </WidgetContainer>
      {subTasksModalVisible ? (
        <CheckListSubtasksModal
          onClose={toggleModal}
          modalVisibility={subTasksModalVisible}
          title={currentCheckList?.title}
          checklistId={currentCheckList?.id}
          onSaveSuccess={refetchChecklists}
          checkListObject={currentCheckList}
        />
      ) : null}
    </Nullable>
  )
}

ChecklistsWidget.defaultProps = {}
