import CommentBox from "./CommentBox";

export default function Comments({comments,isLogged,targetType,targetId}){

    return(
        <>
            {comments.map(item=>(
                <div className="comment-item" key={item.id}>
                    <p>{item.users.username}</p>
                    <p>{item.content}</p>
                    <i>{item.published_at}</i>
                </div>
            ))}
            <div className="comment-box">
                {!isLogged && <p>Please sign in to reply.</p> }
                {isLogged && <CommentBox itemId={targetId} targetType={targetType}/>}
            </div>
        </>
        
    )
}