import type { Meta, StoryObj } from "@storybook/react";

import { Animatable } from "./Animatable";

const meta: Meta<typeof Animatable> = {
  title: "Components/Common/Animatable",
  component: Animatable,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Animatable>;

export const Primary: Story = {
  args: {
    children: <h1>Hi</h1>,
  },
};
