// import { reader } from "@/app/reader";
import { fields } from "@keystatic/core";
import Markdoc from "@markdoc/markdoc";
import { NextResponse } from "next/server";

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from "../../../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const markdocConfig = fields.markdoc.createMarkdocConfig({});

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";

  const slugs = await reader.collections.jobs.list();
  console.log("slugs", slugs);

  const jobs = await Promise.all(
    slugs.map(async (slug) => {
      const entry : any = await reader.collections.jobs.read(slug, {
        resolveLinkedFiles: true,
      });

      console.log(`entry ${slug}`, JSON.stringify(entry));

      const { node } = entry.description;
      const renderable = Markdoc.transform(node, markdocConfig);
      return {
        ...entry,
        mansur: renderable
      };
    })
  );

  // Search filter
  const filteredJobs = jobs.filter((job) => {
    return (
      job?.title.toLowerCase().includes(search) ||
      job?.skills.toLocaleLowerCase().includes(search) ||
      job?.department?.toLowerCase().includes(search)
    );
  });

  const total = filteredJobs.length;
  const totalPages = Math.ceil(total / pageSize);

  const start = (page - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(start, start + pageSize);

  return NextResponse.json({
    jobs: paginatedJobs,
    total,
    totalPages,
    page,
    pageSize,
  });
}
