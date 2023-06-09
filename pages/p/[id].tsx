import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import Counter from "../../components/Counter";
import styles from "@/styles/Layout.module.scss";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  await Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
      <Layout>
        <h1 className={styles.title}>{title}</h1>
        <small className={styles.credentials}>By {props?.author?.name || 'Unknown author'}</small>
        <div className={styles.main_text}>
          <ReactMarkdown children={props.content} />
        </div>
        <div className={styles.controls}>
          {
            !props.published && userHasValidSession && postBelongsToUser && (
              <button onClick={() => publishPost(props.id)}>Publish</button>
            )
          }
          {userHasValidSession && postBelongsToUser && (
            <button onClick={() => deletePost(props.id)}>Delete</button>
          )
          }
        </div>
        {userHasValidSession && postBelongsToUser && (
            <Counter counterInit={props.counter} postID={props.id} />
        )
        }
      </Layout>
  );
};

export default Post;
