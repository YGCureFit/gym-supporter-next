import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Common/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const BigUnrounded: Story = {
  args: {
    size: 36,
    numberKey: 2,
    letter: "Y",
    roundedFull: false,
  },
};

export const SmallRounded: Story = {
  args: {
    size: 10,
    numberKey: 4,
    letter: "Y",
    roundedFull: true,
  },
};
