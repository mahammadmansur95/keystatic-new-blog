import { reader } from "@/app/reader";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { markdocConfig } from "../../keystatic.config";

const BlogCard = async ({ slug } : { slug: string }) => {
  const post = await reader.collections.posts.read(slug, {
    resolveLinkedFiles: true,
  });
  if (!post) return <div>Post not found!</div>;
  const { node } = post.content;
  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div key={post.title} className="!mb-5">
      <div className="!text-lg !text-red-600">{post?.title}</div>
      <div>{post?.describtion}</div>
      <div>{Markdoc.renderers.react(renderable, React)}</div>
    </div>
  );
};

export default BlogCard;
