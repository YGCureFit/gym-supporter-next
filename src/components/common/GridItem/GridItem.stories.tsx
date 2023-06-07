import type { Meta, StoryObj } from "@storybook/react";

import { GridItem } from "./GridItem";

const meta: Meta<typeof GridItem> = {
  title: "Components/Common/GridItem",
  component: GridItem,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GridItem>;

export const Primary: Story = {
  args: {
    rowSpan: 1,
    colSpan: 1,
  },
};
