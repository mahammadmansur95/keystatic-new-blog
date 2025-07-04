// keystatic.config.ts
import {
  config,
  fields,
  collection,
  singleton,
  component,
} from "@keystatic/core";

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "keystatic-testing/keystatic-new-blog",
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
    }),
    services: collection({
      label: "Services",
      slugField: "title",
      path: "src/content/services/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        image: fields.text({ label: "Image" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    jobs: collection({
      label: "Jobs",
      slugField: "title",
      path: "src/content/jobs/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        department: fields.text({ label: "Department" }),
        postedDate: fields.date({ label: "Posted Date" }),
        location: fields.text({ label: "Location" }),
        experience: fields.text({ label: "Experience" }),
        jobType: fields.select({
          label: "Job Type",
          defaultValue: "Full-Time",
          options: [
            { label: "Full-Time", value: "Full-Time" },
            { label: "Part-Time", value: "Part-Time" },
            { label: "Contract", value: "Contract" },
            { label: "Internship", value: "Internship" },
          ],
        }),
        description: fields.markdoc({ label: "Job Description" }),
        skills: fields.text({ label: "Skills" }),
      },
    }),
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
            ),
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
        hero: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            subheading: fields.text({ label: "Subheading", multiline: true }),
            imageurl: fields.text({ label: "Image url" }),
            cta: fields.object({
              text: fields.text({ label: "CTA Text" }),
              url: fields.text({ label: "CTA Link" }),
            }),
          },
          { label: "Hero section" }
        ),
        who_we_are: fields.object(
          {
            bg_image: fields.text({ label: "Background url" }),
            heading: fields.text({ label: "Heading" }),
            subHeading: fields.text({ label: "Sub heading", multiline: true }),
            cta: fields.object({
              text: fields.text({ label: "CTA Text" }),
              url: fields.text({ label: "CTA Link" }),
            }),
          },
          { label: "Who are we" }
        ),
        services: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            subheading: fields.text({ label: "Subheading", multiline: true }),
            bg_img: fields.text({ label: "Background image" }),
            services: fields.array(
              fields.object({
                title: fields.text({ label: "Title" }),
                image_url: fields.text({ label: "Image" }),
              }),
              { label: "Services list" }
            ),
          },
          { label: "Services" }
        ),
      },
    }),
    aboutus: singleton({
      label: "About us",
      path: "src/content/aboutus",
      format: { data: "json" },
      schema: {
        heading: fields.text({ label: "Heading" }),
        content: fields.blocks(
          {
            p: {
              label: "p",
              schema: fields.object(
                {
                  content: fields.text({ label: "content" }),
                  className: fields.text({ label: "className" }),
                },
                { label: "p" }
              ),
            },
          },
          { label: "blocks" }
        ),
      },
    }),
  },
});
