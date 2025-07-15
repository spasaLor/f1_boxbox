import Link from "next/link";
import styles from "./navbar.module.css";
import { Github, Linkedin } from "lucide-react";

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <p>Made with passion by Lorenzo <br/>Loosely inspired by <Link href="http://letterboxd.com">Letterboxd</Link></p>
            <div className={styles.links}>
                <Link href="https://github.com/spasaLor/f1_boxbox" target="_blank">
                    <Github/>
                </Link>
                <Link href="https://www.linkedin.com/in/lorenzo-spadaro-0a5955337/" target="_blank">
                    <Linkedin/>
                </Link>
            </div>
        </footer>
    )
}