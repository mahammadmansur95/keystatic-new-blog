import { reader } from "@/app/reader";
import Service from "@/components/Service";
import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return <Service slug={slug} />;
};

export async function generateStaticParams() {
  const slugs = await reader.collections.services.list();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default Page;
