import Link from "next/link";
import styles from "@/app/page.module.css";

export default function About(){
    return(
            <main className={styles.main}>
                <div className={styles.p1}>
                    <h2>About this project</h2>
                    <p>This website was made with the intent of learning Next.JS, it was my first proper big website, and i honestly think it serves a purpose as i saw and read online many users on social media asking: <i>' Why has no one ever thought about a Letterboxd for F1 races? '</i> <br/> Well, I have and here it is!
                        <br/>Is it perfect? No. <br/>
                        Is it working? <i>Hopefully.</i> <br/>
                        For now it has some basic features, if I can think of anything more to add I will definitely do it, also if you have suggestions for features,<i> hit me up</i>, my contacts are in the footer below.
                    </p>
                </div>
                <div className={styles.p2}>
                    <h2>Inspiration</h2>
                    <p>Of course the inspiration had to be <Link href={"https://www.letterboxd.com"}>Letterboxd</Link> and the team behind it, hope you aren't mad at me for copying your UI! <br/> I think the work you're doing is amazing and I am of course one of the users of your beautiful platform.</p>        
                </div>
                <div className={styles.p3}>
                    <h2>Sources</h2>
                    <p>The hero images for each race and the homepage all belong to <Link href={"https://www.formula1.com/"}>Formula One</Link>, while for the single race cover I used the programme covers provided by <Link href={"https://www.progcovers.com/"}>The Programme Covers Project</Link> and the <Link href={"https://www.reddit.com/r/Formula1posters/"}>Formula1Posters subreddit</Link> </p>
                </div>
                <div className={styles.p4}>
                    <h2>That's It!</h2>
                    <p>Have fun, be respectful, log the races you've seen and chat with the other users!</p>
                </div>
            </main>
    )
    
}