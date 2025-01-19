import { reader } from "@/app/reader";
import BlogCard from "@/components/BlogCard";
import React from "react";

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return (
    <div>
      <BlogCard slug={slug} />
    </div>
  );
};

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default BlogPage;
