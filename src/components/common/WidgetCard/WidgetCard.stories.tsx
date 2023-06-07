import type { Meta, StoryObj } from "@storybook/react";

import { WidgetCard } from "./WidgetCard";

const meta: Meta<typeof WidgetCard> = {
  title: "Components/Common/WidgetCard",
  component: WidgetCard,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WidgetCard>;

export const Primary: Story = {
  args: {
    title: "Widget Card",
    alignCol: false,
    zeroPadding: false,
    smallHeader: false,
    zeroPaddingVertical: false,
    classNames: "",
    innerFlexClassNames: "",
  },
};
