import React, { ReactNode } from "react";
import clsx from "clsx";
import pluralize from "pluralize";

type TrainerAssignCardProps = {
  recommended: boolean;
  membersAssigned: number;
  trainerName: string;
  children?: ReactNode;
  onlyPtTrainers?: boolean;
};

export const TrainerAssignCard: React.FC<TrainerAssignCardProps> = ({
  trainerName,
  membersAssigned,
  recommended,
  children,
  onlyPtTrainers,
}) => {
  return (
    <div
      className={clsx(
        "flex",
        "justify-between",
        "items-center",
        "bg-gray-cf-900",
        "px-6",
        "py-1",
        "my-1"
      )}
    >
      <div className={clsx("flex", "flex-col", "text-gray-cf-50")}>
        {recommended && !onlyPtTrainers ? (
          <div className={clsx("text-xs", "text-green-cf", "font-semibold")}>
            | Recommended
          </div>
        ) : null}
        <div className={clsx("font-semibold", "my-1")}>{trainerName}</div>
        {!onlyPtTrainers ? (
          <div
            className={clsx("text-sm", "text-gray-cf-400")}
          >{`Assisting ${pluralize("member", membersAssigned, true)}`}</div>
        ) : null}
      </div>
      {children}
    </div>
  );
};

TrainerAssignCard.defaultProps = {
  children: null,
  onlyPtTrainers: false,
};
