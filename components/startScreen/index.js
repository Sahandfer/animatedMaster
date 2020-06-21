import Head from 'next/head';
import { motion, useAnimation } from "framer-motion"
import styles from './index.module.css';
import { useStateّ } from 'react';

const startScreen = () => {
    const variants = {
        first: { height: '50vh', paddingTop: 150, paddingBottom: 0},
        second: { height: 100, paddingTop: 0, marginTop: -45,  paddingBottom: 0},
    }

    const variants1 = {
        first: { opacity: 1 },
        second: { opacity: 0 },
    }

    const variants2 = {
        first: { opacity: 1 },
        second: { opacity: 0 },
    }

    const controls = useAnimation();
    const controls1 = useAnimation();
    const controls2 = useAnimation();

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
                transition={{ ease: "easeIn", duration: 1.2 }} onTap={startAnimation} className={styles.startScreen_title}>

                <motion.div className={styles.startScreen_helper} animate={controls1} variants={variants1} transition={{ ease: "easeOut", duration: 1 }}>
                    快点按下我
                </motion.div >
                <div className={styles.startScreen_title}>一周年快乐!</div>

            </motion.div>

            {/* <motion.div className={styles.startScreen_heart} animate={controls2} variants={variants2} transition={{ ease: "easeOut", duration: 1 }}>
                
            </motion.div > */}

            <div className={styles.Sahand}>
                <div className={styles.head}/>
                <div className={styles.middlebody}>
                    <div className={styles.leftHand}/>
                    <div className={styles.body}/>
                    <div className={styles.rightHand}/>
                </div>

                <div className={styles.lowerBody}>
                    <div className={styles.leftFoot}/>
                    <div className={styles.rightFoot}/>
                </div>
            </div>
        </div>
    );
};

export default startScreen;
