import Head from 'next/head';
import { motion, useAnimation } from "framer-motion"
import styles from './index.module.css';
import { useStateّ } from 'react';

const startScreen = () => {
    const variants = {
        first: { height: '50vh', paddingTop: 150},
        second: { height: 100, paddingTop: 0, marginTop: -40 },
    }

    const variants1 = {
        first: { opacity: 1 },
        second: { opacity: 0 },
    }

    const controls = useAnimation();
    const controls1 = useAnimation();

    const startAnimation = async() => {
        await controls.start("second")
        await controls1.start("second")
        // await controls.start("first")
        // await controls1.start("first")
    }

    return (
        <div className={styles.container}>
            <Head>
                <title> 爱你 </title>
            </Head>

            <motion.div initial="first" animate={controls} variants={variants}
                transition={{ ease: "easeIn", duration: 1.5 }} onTap={startAnimation} className={styles.startScreen_title}>

                <motion.div className={styles.startScreen_helper} animate={controls1} variants={variants1} transition={{ ease: "easeOut", duration: 1 }}>
                    快点按下我
                </motion.div >
                <div className={styles.startScreen_title}>一周年快乐!</div>

            </motion.div>
        </div>
    );
};

export default startScreen;
