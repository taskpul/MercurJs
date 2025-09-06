import type { Meta, StoryObj } from "@storybook/react"

import { Hero } from "./Hero"

const meta: Meta<typeof Hero> = {
  component: Hero,
  decorators: (Story) => <Story />,
}

export default meta
type Story = StoryObj<typeof Hero>

export const FirstStory: Story = {
  args: {
    heading: "Modern marketplace platform without limits",
    paragraph:
      "Open source marketplace platform built to avoid vendor lock. Modern tech, unlimited customization, no transaction fee.",
    buttons: [
      { label: "Schedule a demo", path: "#" },
      { label: "Visit GitHub", path: "#" },
    ],
  },
}
