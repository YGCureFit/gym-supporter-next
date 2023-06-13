import type { Meta, StoryObj } from "@storybook/react";

import { TrainerUserCallModal } from "./TrainerUserCallModal";

const meta: Meta<typeof TrainerUserCallModal> = {
  title: "Modals/TrainerUserCallModal",
  component: TrainerUserCallModal,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    modalVisibility: true,
  },
};

export default meta;
type Story = StoryObj<typeof TrainerUserCallModal>;

export const Default: Story = {
  args: {
    userName: "Yash",
  },
};
