import type { Meta, StoryObj } from "@storybook/react";

import { CheckinMeta } from "./CheckinMeta";

const meta: Meta<typeof CheckinMeta> = {
  title: "Components/Common/CheckinMeta",
  component: CheckinMeta,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CheckinMeta>;

export const Default: Story = {
  args: {},
};
