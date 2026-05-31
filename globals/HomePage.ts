import type { GlobalConfig } from "payload"

import { authenticated, publishedOrAuthenticated } from "../collections/access"
import { revalidateHomePage } from "../hooks/revalidate"
import { generatePreviewPath } from "../lib/preview"

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  admin: {
    description: "Landing page controls for project slide order and homepage publishing copy.",
    preview: () => generatePreviewPath("/"),
    livePreview: {
      url: () => generatePreviewPath("/"),
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 390,
          height: 844,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 1100,
        },
      ],
    },
  },
  hooks: {
    afterChange: [revalidateHomePage],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
      schedulePublish: true,
    },
    max: 50,
  },
  fields: [
    {
      name: "landingProjects",
      label: "Landing page projects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
      admin: {
        components: {
          Field: "@/components/payload/landing-projects-field#LandingProjectsField",
        },
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
