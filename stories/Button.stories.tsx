import type { Meta, StoryObj } from "@storybook/react";

import Button from "../components/elements/Button";

const meta: Meta<typeof Button> = {
  title: "Elements/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button label="Primary" type="primary" size="md" />,
};
export const Secondary: Story = {
  render: () => <Button label="Secondary" type="secondary" size="md" />,
};
export const Success: Story = {
  render: () => <Button label="Success" type="success" size="md" />,
};
export const Danger: Story = {
  render: () => <Button label="Danger" type="danger" size="md" />,
};
