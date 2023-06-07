import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/common/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: { size: 12 },
};

export const Secondary: Story = {
  args: { size: 3 },
};
