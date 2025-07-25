export default async function getMetadata(id){
    const likesPromise = fetch(process.env.BACKEND_URL+"/lists/like/"+Number(id),{
        next:{revalidate:120}
    });
    const commentsPromise = fetch(process.env.BACKEND_URL+"/comments/lists/"+Number(id),{
        cache:'no-store'
    });
    const [likesRes,commentsRes] = await Promise.all([likesPromise, commentsPromise]);
    const jsonComm = await commentsRes.json();
    const comments = jsonComm.comments;
    const jsonLikes = await likesRes.json();
    const likes = jsonLikes.likes;
    return {likes,comments};
}