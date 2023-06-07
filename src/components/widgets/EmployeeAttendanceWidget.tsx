import React, {useMemo} from 'react'
import {useQuery} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {useCenterContext} from '../contextProviders/centerContext'
import {
  EmployeeRole,
  EmpRoleMap,
  RoleKeyMap,
  RolePriority,
  TrainerCheckinStatus,
} from '../../constants'
import {WidgetContainer} from '../common/WidgetContainer'
import clsx from 'clsx'
import {Avatar} from '../common/Avatar'
import {_} from '../../utils/lodash'
import {Animatable} from '../common/Animatable'
import {Nullable} from '../common/Nullable'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {WidgetHeader} from '../common/WidgetHeader'
import {Scrollable} from '../common/Scrollable'
import {AppUtils} from '../../utils/appUtils'
import {TransparentButton} from '../common/TransparentButton'
import {useHistory} from 'react-router-dom'
import moment from 'moment'

type EmployeeAttendanceWidgetProps = any

export const EmployeeAttendanceWidget: React.FC<EmployeeAttendanceWidgetProps> =
  () => {
    const history = useHistory()
    const {selectedCenter} = useCenterContext()
    const {data: allEmployees = [], isLoading: isAllEmployeeLoading} = useQuery(
      {
        ...apiConfigs.getAllEmployeesConfig(
          {
            centerServiceId: selectedCenter.centerServiceId,
            centerId: selectedCenter?.id || '0',
          },
          selectedCenter.partnerCenterType,
        ),
        refetchOnWindowFocus: true,
      },
    )

    const {data: trainerCheckins = [], isLoading: trainerCheckinsLoading} =
      useQuery({
        ...apiConfigs.getTrainersCheckinConfig({
          identityIds: allEmployees?.map?.((user: any) => Number(user?.id)),
          checkInTimeFrom: moment().startOf('day').valueOf(),
          checkInTimeTo: moment().endOf('day').valueOf(),
        }),
        enabled: !_.isEmpty(allEmployees),
        refetchOnWindowFocus: true,
      })

    const userCheckins = useMemo(() => {
      const userCheckins: any = {}
      if (!_.isEmpty(allEmployees)) {
        allEmployees
          ?.map?.((user: any) => String(user?.id))
          .forEach((userId: string) => {
            userCheckins[userId] = []
          })
        trainerCheckins?.forEach?.((checkin: any = {}) => {
          const {centerId, identityId} = checkin
          if (
            Number(centerId) === Number(selectedCenter?.id) &&
            String(identityId) in userCheckins
          ) {
            userCheckins[String(identityId)].push(checkin)
          }
        })
      }

      return userCheckins
    }, [trainerCheckins, allEmployees])

    const allCheckinEmployees = useMemo(() => {
      const allCheckinEmployees: any[] = []
      allEmployees?.forEach?.((employee: any) => {
        const {id} = employee
        const {status, ...otherCheckinInfo} = AppUtils.getCheckinStatus(
          userCheckins?.[String(id)] || [],
        )
        if (status === TrainerCheckinStatus.CHECKED_IN) {
          allCheckinEmployees.push({
            ...employee,
            checkinDetails: {
              status,
              ...otherCheckinInfo,
            },
          })
        }
      })
      return allCheckinEmployees
    }, [userCheckins, allEmployees])

    const getFirstValidRole = (roles: any[]): string => {
      const sortedRoles = AppUtils.sortRolesByPriority(roles, RolePriority)
      const role = sortedRoles.find(role => {
        const {roleName = ''} = role
        if (roleName in EmpRoleMap) {
          return true
        }
        return false
      })

      if (!_.isEmpty(role)) {
        return (
          RoleKeyMap?.[
            EmpRoleMap?.[_.get(role, 'roleName', 'none') as EmployeeRole]
          ] || ''
        )
      }
      return 'Staff'
    }

    const renderEmployeeCard = (employee: any): any => {
      const {name = '', id, checkinDetails = {}, roleDetails = []} = employee

      const {lastCheckIn = ''} = checkinDetails

      return (
        <Animatable
          key={id}
          className={clsx(
            'flex',
            'flex-col',
            'p-4',
            'mr-4',
            'justify-start',
            'items-center',
            'rounded-lg',
            'bg-gray-cf-700',
            'min-h-max',
          )}
        >
          <div className={clsx('h-28')}>
            <Avatar
              letter={name.charAt(0)}
              size={24}
              numberKey={Number(id)}
              roundedFull
            />
          </div>
          <div
            className={clsx(
              'min-h-max',
              'inline-flex',
              'justify-around',
              'items-center',
              'flex-col',
              'text-center',
            )}
          >
            <div
              className={clsx(
                'text-gray-cf-50',
                'font-semibold',
                'truncate',
                'overflow-ellipsis',
                'w-32',
                'mb-2',
              )}
            >
              {_.startCase(name)}
            </div>
            <div
              className={clsx(
                'text-gray-cf-200',
                'text-sm',
                'truncate',
                'overflow-ellipsis',
                'w-32',
                'mb-2',
                'rounded-lg',
              )}
            >
              {`${getFirstValidRole(roleDetails)}`}
            </div>
            <div
              className={clsx(
                'text-gray-cf-400',
                'text-xs',
                'truncate',
                'overflow-ellipsis',
                'w-32',
              )}
            >
              {`Check-in: ${lastCheckIn}`}
            </div>
          </div>
        </Animatable>
      )
    }

    return (
      <Nullable
        dependencies={allCheckinEmployees}
        loading={isAllEmployeeLoading || trainerCheckinsLoading}
        loader={<SkeletonLoader length={1} />}
      >
        <WidgetContainer>
          <WidgetHeader title="Employees at the Gym">
            <TransparentButton
              onClick={() => {
                history.push('/employee/attendance')
              }}
            >
              View all employees
            </TransparentButton>
          </WidgetHeader>
          <Scrollable>
            {allCheckinEmployees?.map?.(renderEmployeeCard)}
          </Scrollable>
        </WidgetContainer>
      </Nullable>
    )
  }

EmployeeAttendanceWidget.defaultProps = {}
