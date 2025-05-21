// keystatic.config.ts
import { config, fields, collection, singleton } from "@keystatic/core";

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: 'keystatic-testing/keystatic-new-blog',
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        // content: fields.markdoc({ label: 'Content' }),
        describtion: fields.text({ label: "Describtion" }),
        content: fields.markdoc({ label: "Content" }),
      },
    })
  },
  singletons: {
    socialLinks: singleton({
      label: "Social Links",
      schema: {
        twitter: fields.text({
          label: "Twitter",
          description: "Enter your Twitter handle",
        }),
        github: fields.text({
          label: "Github",
          description: "Enter your Github username",
        }),
        linkedin: fields.text({
          label: "LinkedIn",
          description: "Enter your LinkedIn username",
        }),
      },
    }),
    navbar: singleton({
      label: "Navbar",
      path: "src/content/navbar",
      format: { data: "json" },
      schema: {
        menuItems: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            link: fields.text({ label: "Link" }),
            subMenu: fields.array(
              fields.object({
                label: fields.text({ label: "Label" }),
                link: fields.text({ label: "Link" }),
              }),
              { label: "Sub menu items", slugField: "label" }
            )
          }),
          { label: "Menu Items", slugField: "label" }
        ),
      },
    }),
    homepage: singleton({
      label: "Home page",
      path: "src/content/homepage",
      format: { data: "json" },
      schema: {
        hero: fields.object({
          heading: fields.text({ label: 'Heading' }),
          subheading: fields.text({ label: 'Subheading', multiline: true }),
          imageurl: fields.text({ label: "Image url" }),
          cta : fields.object({
            text: fields.text({ label: "CTA Text" }),
            url: fields.text({ label: 'CTA Link' })
          })
        }, { label: "Hero section" }),
        who_we_are : fields.object({
          bg_image: fields.text({ label: "Background url" }),
          heading : fields.text({ label: "Heading" }),
          subHeading: fields.text({ label: "Sub heading", multiline: true }),
          cta : fields.object({
            text: fields.text({ label: "CTA Text" }),
            url: fields.text({ label: 'CTA Link' })
          })
        }, { label: "Who are we" })
      },
    })
  },
});
