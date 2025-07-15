import styles from "@/app/welcome/welcome.module.css";

export default function More(){
    return(
        <>
             <div className={styles["more-section"]}>
                <h2>Here’s what you’ll find in our main sections…</h2>
                <div className={styles.text}>
                    <div className={styles["text-item"]}>
                        <h3>Homepage</h3>
                        <p>If you’re signed in, you’ll see a selection of popular films, reviews and lists from Letterboxd members. As you follow more people, we personalize this page to show what’s popular in your network.</p>
                    </div>
                    <div className={styles["text-item"]}>
                        <h3>Races</h3>
                        <p>This section shows which films our members are watching and reviewing the most. It’s also your starting point for browsing the whole database, by decade/year, genre, popularity, rating, streaming service and more.</p>
                    </div>
                    <div className={styles["text-item"]}>
                        <h3>Lists</h3>
                        <p>This section shows our most popular lists, and a selection of recently added content. From here you can create a list of your own, browse more popular lists, or browse by the tags applied to each by its creator.</p>
                    </div>
                    <div className={styles["text-item"]}>
                        <h3>Members</h3>
                        <p>Here you’ll find others whose content is being enjoyed most by our community. Click through to see if you like their style.</p>
                    </div>
                </div>
            </div>
            <div className={styles["next-up"]}>
                <h2>Next up: complete your profile and add some popular films you’ve seen…</h2>
                <p>Then grab our apps and see our questions page for more answers.</p>
            </div>
        </>
       
    )
}