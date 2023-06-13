import type { Meta, StoryObj } from "@storybook/react";
import { AiOutlineClose } from "react-icons/ai";

import { ModalHeader } from "./ModalHeader";

const meta: Meta<typeof ModalHeader> = {
  title: "Components/Common/ModalHeader",
  component: ModalHeader,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ModalHeader>;

export const Default: Story = {
  args: {
    titleClassNames: "Modal Header",
    onClose: null,
    children: null,
    closeIcon: <AiOutlineClose />,
    customcloseIcon: false,
  },
};
