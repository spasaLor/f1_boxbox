import Image from "next/image";
import styles from "@/app/page.module.css";
import LatestRaces from "@/ui/homepage/latestRaces";
import LetsYouSection from "@/ui/homepage/letsYou";
import { Suspense } from "react";
import LatestReviews from "@/ui/homepage/latestReviews";

export default function NotLoggedHomepage(){
    return(
        <>
            <div className={styles.hero}>
                <div className={styles.image}>
                <Image
                    src="https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/fom-website/2024/Miscellaneous/F1%20season%20launch%20event%20-%2018%20February%202024%20(press%20image).webp"
                    alt="f1-grid"
                    width={1300}
                    height={500}
                ></Image>
                <p>2025 F1 Season Launch</p>
                </div>
                <div className={styles.text}>
                <h2>
                    Track races you’ve watched. <br/>
                    Save those you want to see. <br/>
                    Tell your friends what’s good. <br/>
                </h2>
                <button type="button">Get started - it's free!</button>
                <i>The social network for F1 lovers.</i>
                </div>        
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                <LatestRaces/>
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <LetsYouSection/>
            </Suspense>
            <Suspense>
                <LatestReviews/>
            </Suspense>
        </>
    )
}