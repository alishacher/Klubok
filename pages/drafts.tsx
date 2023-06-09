import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';
import styles from "@/styles/Layout.module.scss";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { drafts: [] } };
    }

    const drafts = await prisma.post.findMany({
        where: {
            author: { email: session.user.email },
            published: false,
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    return {
        props: { drafts },
    };
};

type Props = {
    drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
    const { data: session } = useSession();

    return (
        <Layout>
            <h1 className={styles.title}>📰 My Drafts</h1>
            {session
              ? <main className={styles.post_wrapper}>
                  {props.drafts.map((post) => (
                    <Post post={post} />
                  ))}
              </main>
              : <div>You need to be authenticated to view this page.</div>
            }
        </Layout>
    );
};

export default Drafts;