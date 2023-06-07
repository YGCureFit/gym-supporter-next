import type { Meta, StoryObj } from "@storybook/react";

import { Nullable } from "./Nullable";

const meta: Meta<typeof Nullable> = {
  title: "Components/Common/Nullable",
  component: Nullable,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Nullable>;

export const Primary: Story = {
  args: {},
};
