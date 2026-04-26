import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { cloudinaryStorage } from "payload-cloudinary";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages/index";
import { Stories } from "./collections/Stories";
import { Reports } from "./collections/Reports";
import { Programs } from "./collections/Programs";
import { DonationPresets } from "./collections/DonationPresets";
import { SiteSettings } from "./globals/SiteSettings";
import { Transactions } from "./collections/Transactions";
import { SpendingCategories } from "./collections/SpendingCategories";
import { Initiatives } from "./collections/Initiatives";
import { Milestones } from "./collections/Milestones";
import { Projects } from "./collections/Projects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [SiteSettings],
  collections: [Users, Media, Pages, SpendingCategories, Stories, Reports, Programs, DonationPresets, Transactions, Initiatives, Milestones, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'info@chariotsofdestiny.com',
    defaultFromName: "Chariots of Destiny Children's Home",
    // Nodemailer transportOptions
    transportOptions: {
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",
      },
      collections: {
        "media": true
      }
    }),
    formBuilderPlugin({
      fields: {
        payment: false, // Turn off if you don't need Stripe inside the forms
      },
    }),
  ],
});
