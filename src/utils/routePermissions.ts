import {CenterType, IPartnerCenter} from '../apis/interfaces'

export enum Namespace {
  All = 'ALL',
  PLAY = 'PLAY',
}

export const getUserPermissions = (
  selectedCenter: IPartnerCenter,
  resource: string,
  access: string,
): string[] | null => {
  if (!resource && !access) {
    return null
  }

  const neededId: string | null | undefined =
    selectedCenter?.partnerCenterType === CenterType.PLAY
      ? selectedCenter?.playCenterId
      : selectedCenter?.id

  const permissionsList = [`${neededId}:${resource}:${access}`]

  if (selectedCenter?.partnerCenterType === CenterType.PLAY) {
    permissionsList.push(`${Namespace.PLAY}:${resource}:${access}`)
  } else {
    permissionsList.push(`${Namespace.All}:${resource}:${access}`)
  }

  return permissionsList
}
