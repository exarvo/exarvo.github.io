import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { formatDate } from "@/lib/formatDate";
import { type ArticleWithSlug, getAllArticles } from "@/lib/getArticles";
import { Metadata } from "next";

export const metadata = async (article: ArticleWithSlug): Promise<Metadata> => {
  return {
    title: {
      default: article.title,
      template: `%s | Lost in Translation`,
    },
    description: article.description,

    keywords: article.keywords,
  };
};

async function Article({ article }: { article: ArticleWithSlug }) {
  await metadata(article);
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export default async function Articles() {
  const articles = await getAllArticles();
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </Container>
  );
}
