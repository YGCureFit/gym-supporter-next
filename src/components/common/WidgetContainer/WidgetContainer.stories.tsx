import type { Meta, StoryObj } from "@storybook/react";

import { WidgetContainer } from "./WidgetContainer";

const meta: Meta<typeof WidgetContainer> = {
  title: "Components/Common/WidgetContainer",
  component: WidgetContainer,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WidgetContainer>;

export const Primary: Story = {
  args: {},
};
