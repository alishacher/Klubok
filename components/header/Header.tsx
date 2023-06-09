import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import styles from "@/styles/Header.module.scss";

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    const { data: session, status } = useSession();

    let left = (
        <div className="left">
            <Link href="/">
                <a className="bold" data-active={isActive('/')}>
                    Community
                </a>
            </Link>
        </div>
    );

    let right = null;

    if (status === 'loading') {
        left = (
            <div className="left">
                <Link href="/">
                    <a className="bold" data-active={isActive('/')}>
                        Community
                    </a>
                </Link>
            </div>
        );
    }

    if (!session) {
        right = (
            <div className="right">
                <Link href="/api/auth/signin">
                    <a data-active={isActive('/signup')}>Log in</a>
                </Link>
            </div>
        );
    }

    if (session) {
        left = (
            <div className="left">
                <Link href="/">
                    <a className="bold" data-active={isActive('/')}>
                        Community
                    </a>
                </Link>
                <Link href="/drafts">
                    <a data-active={isActive('/drafts')}>My drafts</a>
                </Link>
            </div>
        );
        right = (
            <div className="right">
                <p>
                    {session.user.name} ({session.user.email})
                </p>
                <Link href="/create">
                    <button>
                        <a>New draft</a>
                    </button>
                </Link>
                <button onClick={() => signOut()}>
                    <a>Log out</a>
                </button>
            </div>
        );
    }

    return (
      <header className={styles.header_container}>
        <div className={styles.header_navigation}>
          <Link href="/">
            <a data-active={isActive('/')}>Community</a>
          </Link>
          {session &&
            <Link href="/drafts">
              <a data-active={isActive('/drafts')}>My drafts</a>
            </Link>
          }
        </div>
        <div className={styles.header_controls}>
          {session
            ? <>
              <p>
                {session.user.name} ({session.user.email})
              </p>
              <Link href="/create">
                <button>
                  <a>New draft</a>
                </button>
              </Link>
              <button onClick={() => signOut()}>
                <a>Log out</a>
              </button>
            </>
            : <>
              <Link href="/api/auth/signin">
                <a data-active={isActive('/signup')}>Log in</a>
              </Link>
            </>
          }
        </div>
      </header>
    );
};

export default Header;