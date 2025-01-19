// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                // content: fields.markdoc({ label: 'Content' }),
                describtion: fields.text({ label: 'Describtion' }),
                content: fields.markdoc({ label: 'Content' }),
            },
        }),
    },
    singletons: {
        socialLinks: singleton({
          label: 'Social Links',
          schema: {
            twitter: fields.text({ label: 'Twitter', description: 'Enter your Twitter handle' }),
            github: fields.text({ label: 'Github', description: 'Enter your Github username' }),
            linkedin: fields.text({ label: 'LinkedIn', description: 'Enter your LinkedIn username' }),
          }
        })
      }
});