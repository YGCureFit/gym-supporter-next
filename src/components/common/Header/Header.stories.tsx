import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Common/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: {
    title: "Header",
  },
};
