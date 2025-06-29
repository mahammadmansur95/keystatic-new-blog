import { reader } from "@/app/reader";
import Markdoc from "@markdoc/markdoc";
import { NextResponse } from "next/server";
import { markdocConfig } from "../../../../keystatic.config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";

  const slugs = await reader.collections.jobs.list();

  const jobs = await Promise.all(
    slugs.map(async (slug) => {
      const entry : any = await reader.collections.jobs.read(slug, {
        resolveLinkedFiles: true,
      });

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
