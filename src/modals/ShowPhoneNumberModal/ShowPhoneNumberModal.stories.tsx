import type { Meta, StoryObj } from "@storybook/react";

import { ShowPhoneNumberModal } from "./ShowPhoneNumberModal";

const meta: Meta<typeof ShowPhoneNumberModal> = {
  title: "Modals/ShowPhoneNumberModal",
  component: ShowPhoneNumberModal,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    modalVisibility: true,
  },
};

export default meta;
type Story = StoryObj<typeof ShowPhoneNumberModal>;

export const Default: Story = {
  args: {},
};
