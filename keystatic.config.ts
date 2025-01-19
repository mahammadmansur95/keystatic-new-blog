// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

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
            },
        }),
    },
});