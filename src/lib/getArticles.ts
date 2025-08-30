import glob from "fast-glob";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
// import { JSX } from "react";
// import ReactMarkdown from "react-markdown"
// import remarkGfm from "remark-gfm"

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  keywords: string[];
  content?: string;
  updated?: string;
  tags: string[];
  category: string;
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

export async function importArticle(
  articleFilename: string
): Promise<ArticleWithSlug> {
  const filePath = path.resolve("./src/app/articles/" + articleFilename);

  const file = await fs.readFile(filePath);
  const { data, content } = matter(file.toString());

  return {
    slug: articleFilename.replace(/(\/page)?\.md$/, ""),

    ...{
      author: data.author,
      title: data.title,
      date: data.date,
      description: data.description,
      keywords: data.keywords,
      // component: () => (
      //   <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      // ),
      content,
      updated: data.updated || data.date,
      tags: data.tags,
      category: data.category,
    },
  };
}

export async function getAllArticles() {
  const articleFilenames = await glob("*/page.md", {
    cwd: "./src/app/articles",
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}
