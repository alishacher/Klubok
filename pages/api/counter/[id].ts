import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const postId = req.query.postID;
    if (req.method === "PATCH") {
        const counter = +req.body.counter;
        const post = await prisma.post.update({
            where: {id: postId},
            data: {counter: counter},
        });
        res.json(post);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}