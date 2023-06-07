import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/Common/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {},
};
