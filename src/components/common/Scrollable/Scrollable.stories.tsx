import type { Meta, StoryObj } from "@storybook/react";

import { Scrollable } from "./Scrollable";

const meta: Meta<typeof Scrollable> = {
  title: "Components/Common/Scrollable",
  component: Scrollable,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Scrollable>;

export const Default: Story = {
  args: {},
};
