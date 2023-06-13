import type { Meta, StoryObj } from "@storybook/react";

import { TrainerAssignCard } from "./TrainerAssignCard";

const meta: Meta<typeof TrainerAssignCard> = {
  title: "Components/Common/TrainerAssignCard",
  component: TrainerAssignCard,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TrainerAssignCard>;

export const Default: Story = {
  args: {
    recommended: true,
    membersAssigned: 2,
    trainerName: "ABC XYZ",
    children: null,
    onlyPtTrainers: true,
  },
};
