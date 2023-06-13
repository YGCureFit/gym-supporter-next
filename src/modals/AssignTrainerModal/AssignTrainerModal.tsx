import React, { ReactNode } from "react";
import clsx from "clsx";
import { SkeletonLoader } from "../../components/common/SkeletonLoader/SkeletonLoader";
import { useMutation, useQuery } from "react-query";
import { apiConfigs } from "../../apis/configs";
import { GymfitCheckIn, GymfitTrainer } from "@curefit/gymfit-common";
import { _ } from "../../utils/lodash";
import { toastError, toastSuccess } from "../../utils/toastify";
import { Nullable } from "../../components/common/Nullable/Nullable";
import { ModalHeader } from "../../components/common/ModalHeader/ModalHeader";
import { Modal } from "../../components/common/Modal/Modal";
import { TrainerAssignCard } from "../../components/common/TrainerAssignCard/TrainerAssignCard";
import { GrayButton } from "../../components/common/GrayButton/GrayButton";
import { IPartnerCenter } from "../../apis/interfaces";
// import { mockCenterContext } from "@/mockContexts/centerContext";
type AssignTrainerProps = {
  modalVisibility: boolean;
  selectedCheckIn: GymfitCheckIn | null;
  selectedCenter: IPartnerCenter;
  // selectedCenter: mockCenterContext;
  onTrainerAssignmentSuccess?: (...args: any) => any;
  onTrainerAssignmentFailure?: (...args: any) => any;
  onClose: (...args: any) => any;
  blockSendAssignTrainerRequest?: boolean;
  getAssignedTrainer?: (...args: any) => any;
  onlyPtTrainers?: boolean;
  modalTitle?: string;
};

export const AssignTrainerModal: React.FC<AssignTrainerProps> = ({
  modalVisibility,
  selectedCenter,
  selectedCheckIn,
  onTrainerAssignmentSuccess,
  onTrainerAssignmentFailure,
  onClose,
  blockSendAssignTrainerRequest,
  getAssignedTrainer,
  onlyPtTrainers,
  modalTitle,
}) => {
  const {
    data: trainerList = [],
    isLoading: isTrainerListLoading = false,
    isFetching: isTrainersListFecthing,
  } = useQuery({
    ...apiConfigs.getTrainerListConfig(selectedCheckIn?.id || 0),
    enabled: modalVisibility && !_.isEmpty(selectedCheckIn) && !onlyPtTrainers,
  });

  const {
    data: ptTrainerList = [],
    isLoading: isptTrainerListLoading = false,
    isFetching: isptTrainersListFecthing,
  } = useQuery({
    ...apiConfigs.getPtTrainerListConfig({
      centerServiceId: selectedCenter?.centerServiceId,
    }),
    enabled: modalVisibility && onlyPtTrainers,
  });

  const { isLoading: assignTrainerLoading, mutate: assignTrainer } =
    useMutation(apiConfigs.postAssignTrainerConfig().queryFn, {
      onSuccess: (...args: any) => {
        onTrainerAssignmentSuccess?.(...args);
        toastSuccess("Trainer successfully assigned");
      },
      onError: (...args: any) => {
        onTrainerAssignmentFailure?.(...args);
        toastError(
          args?.response?.data?.message ||
            args?.response?.message ||
            args?.message
        );
      },
    });

  const renderTrainerDetailCard = (trainer: GymfitTrainer) => {
    const {
      recommended = false,
      checkInsAssigned = 0,
      identityResponse: { firstName = "", lastName = "", id = 0 },
    } = trainer;

    console.log("PT trainer list fetched traineeeeerrrr ", trainer);
    return (
      <TrainerAssignCard
        key={`${firstName}_${lastName}`}
        recommended={recommended}
        membersAssigned={checkInsAssigned}
        trainerName={`${firstName} ${lastName}`}
        onlyPtTrainers
      >
        <GrayButton
          title="Assign"
          textSize="xs"
          onClick={() => {
            if (blockSendAssignTrainerRequest) {
              getAssignedTrainer?.(id, `${firstName} ${lastName}`);
            } else {
              assignTrainer({
                trainerId: id,
                checkInId: selectedCheckIn?.id || 0,
                centerId: selectedCenter?.id || 0,
              });
            }
          }}
        />
      </TrainerAssignCard>
    );
  };

  return (
    <Modal visible={modalVisibility} bodyWidth="w-4/12">
      <ModalHeader title={modalTitle} onClose={onClose} />
      <Nullable
        loading={
          isTrainerListLoading ||
          assignTrainerLoading ||
          isTrainersListFecthing ||
          isptTrainerListLoading ||
          isptTrainersListFecthing
        }
        dependencies={[...trainerList, ...ptTrainerList]}
        loader={<SkeletonLoader length={2} />}
      >
        <div className={clsx("flex", "flex-col")}>
          {(onlyPtTrainers ? ptTrainerList : trainerList).map(
            renderTrainerDetailCard as any
          )}
        </div>
      </Nullable>
    </Modal>
  );
};

AssignTrainerModal.defaultProps = {
  onTrainerAssignmentSuccess: () => {
    // do nothing
  },
  onTrainerAssignmentFailure: () => {
    // do nothing
  },
  blockSendAssignTrainerRequest: false,
  getAssignedTrainer: () => {
    // do nothing
  },
  onlyPtTrainers: false,
  modalTitle: "Trainer Assignment",
};
