import { ModalHeader } from "../../components/common/ModalHeader/ModalHeader";
import { WidgetContainer } from "../../components/common/WidgetContainer/WidgetContainer";
import { Modal } from "../../components/common/Modal/Modal";
import React, { useEffect, useState } from "react";
import { GradientButton } from "../../components/common/GradientButton/GradientButton";
import clsx from "clsx";

type TrainerUserCallModalProps = {
  cmPhone: string;
  modalVisibility: boolean;
  onClose: (...args: any) => any;
  userName: string;
  callUserFunction: (...args: any) => any;
};

export const TrainerUserCallModal: React.FC<TrainerUserCallModalProps> = ({
  cmPhone,
  modalVisibility,
  onClose,
  userName,
  callUserFunction,
}) => {
  console.log(cmPhone);
  const [cmPhoneNumber, setCmPhoneNumber] = useState("12121");

  useEffect(() => {
    setCmPhoneNumber(cmPhone);
  }, [cmPhone]);

  return (
    <Modal
      visible={modalVisibility}
      bodyHeight="h-max"
      bodyWidth={clsx("w-1/4")}
    >
      <ModalHeader title={`Call ${userName}`} onClose={onClose} />
      <div style={{ height: "1px", backgroundColor: "white" }} />
      <WidgetContainer>
        <div
          style={{ color: "white", marginBottom: 20 }}
        >{`Confirm your number to connect with ${userName}`}</div>
        <div style={{ marginBottom: 20 }}>
          <input
            style={{
              color: "black",
              width: "100%",
            }}
            value={cmPhoneNumber}
            onChange={(e) => setCmPhoneNumber(e.target.value)}
            width="100%"
            height={100}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GradientButton title="Call me" onClick={callUserFunction} />
        </div>
      </WidgetContainer>
    </Modal>
  );
};
