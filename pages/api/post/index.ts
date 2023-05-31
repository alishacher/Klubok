import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { title, content,
    authorEmail
    } = req.body;

    const session = await getSession({ });
    // const authorEmail = session?.user?.email;

    const result = await prisma.post.create({
        data: {
            title: title,

            content: content,

            author: { connect: { email: authorEmail } },
        },
    });
    res.json(result);
}