import { ArticleLayout } from "@/components/ArticleLayout";
import {
  type ArticleWithSlug,
  getAllArticles,
  importArticle,
} from "@/lib/getArticles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article: ArticleWithSlug) => ({ slug: article.slug }));
}

export default async function ArticlePage(
  props: PageProps<"/articles/[slug]">
) {
  const article = await importArticle((await props.params).slug + "/page.md");
  return (
    <ArticleLayout key={article.slug} article={article}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {article.content}
      </ReactMarkdown>
    </ArticleLayout>
  );
}
