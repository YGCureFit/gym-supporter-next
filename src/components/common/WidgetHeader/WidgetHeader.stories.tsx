import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { WidgetHeader } from "./WidgetHeader";

const meta: Meta<typeof WidgetHeader> = {
  title: "Components/Common/WidgetHeader",
  component: WidgetHeader,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WidgetHeader>;

export const Primary: Story = {
  args: {
    title: "WidgetHeader",
    className: clsx(),
    justifyContent: "between",
  },
};
