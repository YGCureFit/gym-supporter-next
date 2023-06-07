import type { Meta, StoryObj } from "@storybook/react";

import { UserProfileCard } from "./UserProfileCard";

const meta: Meta<typeof UserProfileCard> = {
  title: "Components/Common/UserProfileCard",
  component: UserProfileCard,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

export const Primary: Story = {
  args: {
    children: null,
    imageUrl: "",
    onClick: () => {
      // do nothing
    },
  },
};
