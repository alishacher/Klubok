import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { getSession } from 'next-auth/react';
import styles from "@/styles/Layout.module.scss";

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const titlePlaceholder = [
        'Sweet Dragon',
        'Lovely flower',
        'Amogus',
        'Lord Voldemort',
        'Dark Chinchilla',
        'x0qwe12 ZD4c'
    ];

    const contentPlaceholder = [
        'What a wonderful day!',
        'Look around...',
        'Lets start with the body part...',
        'Here is a material needed for the project: ...'
    ];

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

    const randomPhrase = (phrasesList: string[]) => (
        phrasesList[Math.floor(Math.random() * phrasesList.length)]
    );

    return (
        <Layout>
            <h1 className={styles.title}>✎ New Draft</h1>
            <main className={styles.draft_wrapper}>
                <form onSubmit={submitData}>
                    <input
                        className={styles.draft_input}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={randomPhrase(titlePlaceholder)}
                        type="text"
                        value={title}
                    />
                    <textarea
                        className={styles.draft_textarea}
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={randomPhrase(contentPlaceholder)}
                        rows={8}
                        value={content}
                    />
                    <div className={styles.controls}>
                        <button
                            disabled={!content || !title}
                            type="submit"
                        >
                            Create
                        </button>
                        {/*<span>or</span>*/}
                        <a className="back" href="#" onClick={() => Router.push('/')}>
                            Cancel
                        </a>
                    </div>
                </form>
            </main>
        </Layout>
    );
};

export default Draft;
