import type { GlobalConfig } from "payload"

import { authenticated, publicRead } from "../collections/access"
import { revalidateHomePage } from "../hooks/revalidate"

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: publicRead,
    update: authenticated,
  },
  admin: {
    description: "Landing page controls for project slide order and homepage publishing copy.",
  },
  hooks: {
    afterChange: [revalidateHomePage],
  },
  fields: [
    {
      name: "landingProjects",
      label: "Landing page projects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
      admin: {
        description:
          "Choose and order projects for the homepage slides. Leave empty to use projects marked as landing page slides.",
      },
    },
    {
      name: "fallbackToFeatured",
      label: "Use featured projects when empty",
      type: "checkbox",
      defaultValue: true,
    },
  ],
}
