import { useQuery } from "react-query";
import { apiConfigs } from "../apis/configs";
import { GymfitCheckInSearchFilters } from "@curefit/gymfit-common/dist/src/Request";
import { useMemo } from "react";
import { GymfitCheckInState, GymfitCheckInType } from "@curefit/gymfit-common";
import { _ } from "../utils/lodash";

type props = {
  filters: GymfitCheckInSearchFilters;
  checkinState: GymfitCheckInState.CREATED | GymfitCheckInState.VALIDATED;
};

type checkinInitProps = {
  checkIns: any[];
  isLoading: boolean;
  refetchCheckins: any;
  unassignedNewMembers: any[];
  unassignedTrials: any[];
  assignedTrials: any[];
  assignedNewMembers: any[];
  existingMembers: any[];
  unassignedComplementaryMembers: any[];
  assignedComplementaryMembers: any[];
  existingComplementaryMembers: any[];
};

const filterCheckinsType = [GymfitCheckInState.CANCELLED];

export async function useCheckins({
  filters,
  checkinState,
}: props): checkinInitProps {
  // const response = await fetch({
  //   ...apiConfigs.getPastCheckInConfig({
  //     ...filters,
  //   }),
  //   refetchOnReconnect: true,
  //   refetchOnWindowFocus: true,
  //   refetchIntervalInBackground: true,
  //   enabled: Boolean(filters?.startTimeTo && filters?.startTimeFrom),
  // })
  const {
    data: checkIns = [],
    isLoading = false,
    refetch: refetchCheckins,
  } = useQuery({
    ...apiConfigs.getPastCheckInConfig({
      ...filters,
    }),
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    enabled: Boolean(filters?.startTimeTo && filters?.startTimeFrom),
  });

  const {
    unassignedNewMembers,
    unassignedTrials,
    assignedTrials,
    assignedNewMembers,
    existingMembers,
    unassignedComplementaryMembers,
    assignedComplementaryMembers,
    existingComplementaryMembers,
  } = useMemo(() => {
    const unassignedTrials: any[] = [];
    const unassignedNewMembers: any[] = [];
    const assignedTrials: any[] = [];
    const assignedNewMembers: any[] = [];
    const existingMembers: any[] = [];

    const unassignedComplementaryMembers: any[] = [];
    const assignedComplementaryMembers: any[] = [];
    const existingComplementaryMembers: any[] = [];

    checkIns?.forEach((checkinItem: any) => {
      if (filterCheckinsType.includes(checkinItem.state)) {
        return null;
      }
      if (!checkinItem.state.includes(checkinState)) {
        return null;
      }
      // unassigned
      if (!checkinItem?.trainerId) {
        if (checkinItem.checkInType === GymfitCheckInType.TRIAL) {
          // trials
          unassignedTrials.push(checkinItem);
        } else if (
          checkinItem.checkInType === GymfitCheckInType.COMPLIMENTARY
        ) {
          // Complementary
          if (_.get(checkinItem, "userCheckinCount", 6) <= 5) {
            unassignedComplementaryMembers.push(checkinItem);
          } else {
            existingComplementaryMembers.push(checkinItem);
          }
        } else if (_.get(checkinItem, "userCheckinCount", 4) <= 3) {
          // new members
          unassignedNewMembers.push(checkinItem);
        } else {
          existingMembers.push(checkinItem);
        }
      } else if (checkinItem?.trainerId) {
        // assigned
        if (checkinItem.checkInType === GymfitCheckInType.TRIAL) {
          // trials
          assignedTrials.push(checkinItem);
        } else if (
          checkinItem.checkInType === GymfitCheckInType.COMPLIMENTARY
        ) {
          if (_.get(checkinItem, "userCheckinCount", 6) <= 5) {
            assignedComplementaryMembers.push(checkinItem);
          } else {
            existingComplementaryMembers.push(checkinItem);
          }
        } else if (_.get(checkinItem, "userCheckinCount", 4) <= 3) {
          // new members
          assignedNewMembers.push(checkinItem);
        } else {
          // existing members
          existingMembers.push(checkinItem);
        }
      }
      return null;
    });

    return {
      unassignedTrials,
      unassignedNewMembers,
      assignedTrials,
      assignedNewMembers,
      existingMembers,
      unassignedComplementaryMembers,
      assignedComplementaryMembers,
      existingComplementaryMembers,
    };
  }, [checkIns]);

  return {
    checkIns,
    isLoading,
    refetchCheckins,
    unassignedNewMembers,
    unassignedTrials,
    assignedTrials,
    assignedNewMembers,
    existingMembers,
    unassignedComplementaryMembers,
    assignedComplementaryMembers,
    existingComplementaryMembers,
  };
}
