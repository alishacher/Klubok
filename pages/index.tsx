import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma";
import styles from "@/styles/Layout.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <h1 className={styles.title}>✨ Community ideas</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
    </Layout>
  )
}

export default Blog
