import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { getSession } from 'next-auth/react';
import styles from "@/styles/Layout.module.scss";

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const session = await getSession({ });
            const authorEmail = session?.user?.email;
            const body = { title, content, authorEmail };
            await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            await Router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <h1 className={styles.title}>✎ New Draft</h1>
            <div>
                <form onSubmit={submitData}>
                    <input
                        className={styles.draft_input}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                    />
                    <textarea
                        className={styles.draft_textarea}
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        rows={8}
                        value={content}
                    />
                    <input disabled={!content || !title} type="submit" value="Create" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
            </div>
        </Layout>
    );
};

export default Draft;
