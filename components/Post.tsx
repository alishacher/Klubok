import React from "react";
import Router from "next/router";
import styles from '@/styles/Layout.module.scss';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  counter: number;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div
      id={post.id}
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
      className={styles.post_container}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
    </div>
  );
};

export default Post;
