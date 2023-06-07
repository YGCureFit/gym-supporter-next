import type { Meta, StoryObj } from "@storybook/react";

import { GridContainer } from "./GridContainer";

const meta: Meta<typeof GridContainer> = {
  title: "Components/Common/GridContainer",
  component: GridContainer,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

export const Primary: Story = {
  args: { rows: 1, cols: 1, gap: 0 },
};
