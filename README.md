
### Important files and folders

| File(s)                                     | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `sanity.config.ts`                          | Config file for Sanity Studio                           |
| `sanity.cli.ts`                             | Config file for Sanity CLI                              |
| `/pages/studio/[[...index]]/page.tsx`       | Where Sanity Studio is mounted                          |
| `/pages/api/draft.ts`                       | Serverless route for triggering Draft mode              |
| `/schemas`                                  | Where Sanity Studio gets its content types from         |
| `/plugins`                                  | Where the advanced Sanity Studio customization is setup |
| `/lib/sanity.api.ts`,`/lib/sanity.image.ts` | Configuration for the Sanity Content Lake client        |

## Configuration

run 
```
 npm -y create sanity@latest
 ? Select dataset to use production
? Would you like to add configuration files for a Sanity project in this Next.js folder? Yes
? Do you want to use TypeScript? Yes
? Would you like an embedded Sanity Studio? Yes
? Would you like to use the Next.js app directory for routes? No
? What route do you want to use for the Studio? /studio
? File /pages/studio/[[...index]].tsx already exists. Do you want to overwrite it? No
? File /sanity.config.ts already exists. Do you want to overwrite it? No
? File /sanity.cli.ts already exists. Do you want to overwrite it? No
? Select project template to use Clean project with no predefined schemas
? Would you like to add the project ID and dataset to your .env file? Yes
```

Add `http://localhost:3000` and `https://vercel-project-name.vercel.app` with credentials to Sanity CORS origins

###  Run Next.js locally in development mode

```bash
npm install && npm run dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your personal website should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

## Deploy via vercel

Add a new project in Vercel, then add the project details to a new 'Project' under the 'Deploy' tab in Sanity studio

[integration]: https://www.sanity.io/docs/vercel-integration?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[`.env.local.example`]: .env.local.example
[nextjs]: https://github.com/vercel/next.js
[sanity-create]: https://www.sanity.io/get-started/create-project?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-deployment]: https://www.sanity.io/docs/deployment?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-community]: https://slack.sanity.io/
[sanity-schema-types]: https://www.sanity.io/docs/schema-types?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-github]: https://github.com/sanity-io/sanity/discussions
[sanity-groq]: https://www.sanity.io/docs/groq?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-content-modelling]: https://www.sanity.io/docs/content-modelling?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-webhooks]: https://www.sanity.io/docs/webhooks?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/studio
[vercel]: https://vercel.com
[vercel-github]: https://github.com/vercel/next.js/discussions
[app-dir]: https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory
