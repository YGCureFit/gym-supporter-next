import React, { useState } from "react";
import { ResolveTaskModal } from "../../modals/ResolveTaskModal";
import { _ } from "../../utils/lodash";
import { Nullable } from "../common/Nullable/Nullable";
import { SkeletonLoader } from "../common/SkeletonLoader/SkeletonLoader";

interface TasksRowProps {
  detailData: any;
  refetchDetailAndCallTrail: () => void;
}

const TasksRow: React.FC<TasksRowProps> = (props: TasksRowProps) => {
  const { detailData, refetchDetailAndCallTrail } = props;
  const status = _.get(detailData, "status", "");
  const campaignName = _.get(detailData, "campaignName", "");
  const subStatus = _.get(detailData, "subStatus", "");
  const uuid = _.get(detailData, "refId", "");

  const [resolveTaskVisibility, setResolveTaskVisibility] =
    useState<boolean>(false);

  const toggleResolveTaskModel: any = () =>
    setResolveTaskVisibility((value) => !value);

  return (
    <Nullable dependencies={detailData} loader={<SkeletonLoader length={1} />}>
      <div className="bg-gray-cf-700 p-2 mt-1 rounded">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-base text-yellow-cf-600">{status}</div>
            <div className="text-xl text-gray-cf-50 font-bold text-gray-cf-300">
              {campaignName}
            </div>
            <div className="text-lg text-gray-cf-50 text-gray-cf-300">
              {subStatus}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <button
                className="bg-gray-cf-600 p-2 flex shadow-gray-xl justify-center items-center flex-row text-gray-cf-50 rounded text-gray-cf-300"
                onClick={toggleResolveTaskModel}
              >
                Resolve Task
              </button>
            </div>
          </div>
        </div>
        <hr className="border-white mt-5 h-2 border-gray-cf-600" />
      </div>

      {resolveTaskVisibility ? (
        <ResolveTaskModal
          uuid={uuid}
          modalVisibility={resolveTaskVisibility}
          onClose={toggleResolveTaskModel}
          taskExpiryTime={detailData.expiryTime}
          statusList={detailData.campaignConfig.dispositions}
          dispositionsHierarchy={
            detailData.campaignConfig.dispositionsHierarchy
          }
          dispositionConfigs={detailData.campaignConfig.dispositionConfigs}
          callback={refetchDetailAndCallTrail}
        />
      ) : null}
    </Nullable>
  );
};

export default TasksRow;
