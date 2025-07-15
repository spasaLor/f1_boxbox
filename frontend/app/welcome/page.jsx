import Image from "next/image";
import heroStyles from "../page.module.css";
import GridSection from "@/ui/welcome/GridSection";
import More from "@/ui/welcome/More";

export const metadata={
    title:"Welcome to F1BoxBox",
    description:"Welcome page of the website"
}
export default function Page(){
    return(
        <>
            <div className={heroStyles.hero}>
                <div className={heroStyles.image}>
                    <Image
                    src={"https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_Of_China___Previews/2205973441.webp"}
                    alt="Alonso and Bortoleto"
                    width={1300}
                    height={500}
                    />
                    <p>2025 Chinese GP Press Conference</p>
                </div>
                <div className={heroStyles.text} style={{maxWidth:'700px'}}>
                    <h2> Take your first step into a larger world… </h2>
                    <p style={{lineHeight:'1.5'}}>F1BoxBox lets you keep track of every race you’ve seen, so you can instantly recommend one the moment someone asks, or check reactions to a race you’ve just heard about. We’re a global community of F1 fans who live to discuss, rate and rank what we watch.</p>
                    <i>Read on for a quick primer. Return here any time via the Help link in the footer of each page.</i>
                </div>
            </div>
            <section>
                <GridSection/>                    
            </section>
            <section>
                <More/>
            </section>
        </>        
    )    
}