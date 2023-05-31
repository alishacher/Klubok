import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { title, content, authorEmail } = req.body;

    const session = await getSession({ });
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author:  authorEmail,
            // author: { connect: { email: session?.user?.email }},
        },
    });
    res.json(result);
}