import type { Meta, StoryObj } from "@storybook/react";

import { SkeletonLoader } from "./SkeletonLoader";

const meta: Meta<typeof SkeletonLoader> = {
  title: "Components/Common/SkeletonLoader",
  component: SkeletonLoader,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SkeletonLoader>;

export const Primary: Story = {
  args: {},
};
