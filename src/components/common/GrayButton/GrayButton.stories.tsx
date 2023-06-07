import type { Meta, StoryObj } from "@storybook/react";

import { GrayButton } from "./GrayButton";

const meta: Meta<typeof GrayButton> = {
  title: "Components/Common/GrayButton",
  component: GrayButton,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    title: "GrayButton",
  },
};

export default meta;
type Story = StoryObj<typeof GrayButton>;

export const Primary: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
