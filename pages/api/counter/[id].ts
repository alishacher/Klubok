import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const postId = req.query.id;
    const counter = req.data.counter;
    const post = await prisma.post.update({
        where: { id: postId },
        data: { counter: counter },
    });
    res.json(post);
}