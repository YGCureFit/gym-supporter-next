import type { Meta, StoryObj } from "@storybook/react";

import { GradientButton } from "./GradientButton";

const meta: Meta<typeof GradientButton> = {
  title: "Components/Common/GradientButton",
  component: GradientButton,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    title: "Button",
    onClick: () => {
      // do nothing
    },
    disabled: false,
    largeHorizontalPadding: false,
  },
};

export default meta;
type Story = StoryObj<typeof GradientButton>;

export const Primary: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
