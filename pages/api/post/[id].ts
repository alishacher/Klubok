import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const postId = req.query.id;
    if (req.method === 'DELETE') {
        const post = await prisma.post.delete({
            where: { id: postId },
        });
        res.json(post);
    } else if (req.method === 'PATCH'){
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });
        const counter = post.counter;
        const newPost = await prisma.post.update({
            where: {id: postId},
            data: {
                counter: counter + 1
            }
        });
        res.json(newPost);
    } else{
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}