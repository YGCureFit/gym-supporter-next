import { Modal } from "../../components/common/Modal/Modal";
import { ModalHeader } from "../../components/common/ModalHeader/ModalHeader";
import React from "react";
import { WidgetContainer } from "../../components/common/WidgetContainer/WidgetContainer";

type ShowPhoneNumberModalProps = {
  phoneNumber: string | null;
  modalVisibility: boolean;
  onClose: (...args: any) => any;
};

export const ShowPhoneNumberModal: React.FC<ShowPhoneNumberModalProps> = ({
  phoneNumber,
  modalVisibility,
  onClose,
}) => {
  return (
    <Modal visible={modalVisibility} bodyHeight="h-max" bodyWidth="w-2/5">
      <ModalHeader title="User Phone Number" onClose={onClose} />
      <div style={{ height: "1px", backgroundColor: "white" }} />
      <WidgetContainer>
        <div style={{ color: "white" }}>{phoneNumber}</div>
      </WidgetContainer>
    </Modal>
  );
};
