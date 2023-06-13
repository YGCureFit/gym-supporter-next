import type { Meta, StoryObj } from "@storybook/react";

import { PageContainer } from "./PageContainer";

const meta: Meta<typeof PageContainer> = {
  title: "Components/Common/PageContainer",
  component: PageContainer,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

export const Default: Story = {
  args: {},
};
