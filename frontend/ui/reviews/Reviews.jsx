import Image from "next/image";
import Status from "./Status";

export default function Reviews({likes,reviews,isLogged,isOwner}){

    return(
        <>
        {reviews.map(item=>(
            <div className="review-item" key={item.id}>
                <div className="left">
                    <Image
                    src={item.races.cover}
                    alt="race_cover"
                    width={100}
                    height={150}
                    />
                </div>
                <div className="right">
                    <p>{item.races.denomination}</p>
                    <i>{item.races.season}</i>
                    <p>Reviewed {item.updated_at}</p>
                    <div className="content">
                        {item.content}
                    </div>
                    <div className="likes">
                        <Status initialLiked = {likes.includes(item.id)} id={item.id} isLogged={isLogged} isOwner={isOwner}/>
                        {item.likes === 0 ? <p>No likes yet</p> : <p>{item.likes} likes</p>}                        
                    </div>
                </div>                
            </div>
        ))}
        </>
    )
}