import type { Meta, StoryObj } from "@storybook/react";

import { AssignTrainerModal } from "./AssignTrainerModal";

const meta: Meta<typeof AssignTrainerModal> = {
  title: "Modals/AssignTrainerModal",
  component: AssignTrainerModal,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    modalVisibility: true,
  },
};

export default meta;
type Story = StoryObj<typeof AssignTrainerModal>;

export const Default: Story = {
  args: {
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
  },
};
