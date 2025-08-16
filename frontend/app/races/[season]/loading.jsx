import styles from "@/app/races/races.module.css";
import SkeletonRaceList from "@/ui/skeletons/skeletonRaceList";

export default function Loading(){
    return(
        <main>
            <div className={styles.top}>
                <p>RACES</p>
                <p>BROWSE BY</p>
                <div className={styles.options}>
                    <label htmlFor="year">Year</label>
                    <select name="year" id="year">
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                    <p>- OR -</p>
                    <label htmlFor="track">Track</label>
                    <input type="input" name="track" id="track"/>
                </div>
            </div>
            <SkeletonRaceList/>
        </main>
    )
    
}