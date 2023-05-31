import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { title, content} = req.body;
    alert('hi');
    alert(req);
    const session = await getSession({ });
    const authorEmail = session?.user?.email;

    const result = await prisma.post.create({
        data: {
            title: title,

            content: content,

            author: { connect: { email: authorEmail } },
        },
    });
    res.json(result);
}