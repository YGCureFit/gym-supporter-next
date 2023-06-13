import React from "react";
import clsx from "clsx";
import { GymfitCheckInState, GymfitCheckInType } from "@curefit/gymfit-common";
import moment from "moment";
import { _ } from "../../../utils/lodash";
import { AppUtils } from "../../../utils/appUtils";
import { Animatable } from "../Animatable/Animatable";

enum CHECKIN_STATUSES {
  MISSED,
  BOOKED,
  CHECKEDIN,
  CHECKEDOUT,
}

const getCheckinState = (
  checkinState: GymfitCheckInState,
  endTime: number
): CHECKIN_STATUSES => {
  switch (checkinState) {
    case GymfitCheckInState.CREATED:
      if (moment(endTime).isBefore(moment(), "minute")) {
        return CHECKIN_STATUSES.MISSED;
      }
      return CHECKIN_STATUSES.BOOKED;

    case GymfitCheckInState.VALIDATED:
      if (moment(endTime).isBefore(moment(), "minute")) {
        return CHECKIN_STATUSES.CHECKEDOUT;
      }
      return CHECKIN_STATUSES.CHECKEDIN;

    default:
      return CHECKIN_STATUSES.CHECKEDOUT;
  }
};

// const getDisplayMessage = (checkinState: CHECKIN_STATUSES): string => {
//   switch (checkinState) {
//     case CHECKIN_STATUSES.BOOKED:
//       return 'Upcoming'
//     case CHECKIN_STATUSES.CHECKEDIN:
//       return 'In Gym'
//     case CHECKIN_STATUSES.CHECKEDOUT:
//       return 'Checked Out'
//     case CHECKIN_STATUSES.MISSED:
//       return 'Missed'
//     default:
//       return ''
//   }
// }

type CheckinMetaProps = {
  checkinDetails: any;
};

export const CheckinMeta: React.FC<CheckinMetaProps> = ({ checkinDetails }) => {
  const checkinState = getCheckinState(
    checkinDetails.state,
    checkinDetails?.endTime
  );
  const isTrial = checkinDetails.checkInType === GymfitCheckInType.TRIAL;
  const isComp =
    checkinDetails.checkInType === GymfitCheckInType.COMPLIMENTARY &&
    _.get(checkinDetails, "userCheckinCount", 6) <= 5;
  const isNewMember =
    _.get(checkinDetails, "userCheckinCount", -1) > 0 &&
    _.get(checkinDetails, "userCheckinCount", 4) <= 3;

  return (
    <Animatable
      className={clsx(
        "w-full",
        "my-1",
        "self-center",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
      )}
    >
      {checkinDetails.state === GymfitCheckInState.VALIDATED &&
      (isTrial || isComp || isNewMember) ? (
        <div
          className={clsx(
            "text-gray-cf-400",
            "text-xs",
            "font-semibold",
            "rounded-lg",
            "m-1",
            "uppercase"
          )}
        >
          {`${AppUtils.ordinalSuffixOf(
            _.get(checkinDetails, "userCheckinCount", 4)
          )} ${isComp ? "Complementary" : isTrial ? "Trial" : "Session"}`}
        </div>
      ) : null}
      <div className={clsx("w-full", "flex", "items-center", "justify-center")}>
        {checkinState === CHECKIN_STATUSES.MISSED ? (
          <div
            className={clsx("w-2", "h-2", "mr-1", "rounded-full", "bg-pink-cf")}
          />
        ) : null}

        {checkinDetails?.startTime &&
        checkinDetails?.state === GymfitCheckInState.CREATED ? (
          <div
            className={clsx("text-gray-cf-400", "text-xs")}
          >{`Slot : ${moment(checkinDetails?.startTime).format(
            "hh:mm a"
          )}`}</div>
        ) : null}
      </div>
    </Animatable>
  );
};

CheckinMeta.defaultProps = {};
