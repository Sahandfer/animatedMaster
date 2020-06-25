import Head from 'next/head';
import { motion, useAnimation } from "framer-motion"
import styles from './index.module.css';
import { useEffect, useState } from 'react';

const startScreen = () => {
    const [numDay, changeDay] = useState(0);
    // const [rains, changeRain] = useState([]);
    const numDays = Math.floor((Date.parse(new Date()) - Date.parse(new Date("2019-06-30"))) / 86400000);
    const countUp = (numDay, numDays) => {
        if (numDay === numDays) return numDay;
        else return typeof numDay === 'undefined' ? 0 : numDay + 1;
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         changeDay(countUp(numDay, numDays));
    //     }, (numDay + 1) / 8);
    // }); 
    useEffect(() => {
        setTimeout(() => {
            changeDay(countUp(numDay, numDays));
        }, 1);
    });




    const variants = {
        second: { height: '50vh', paddingTop: 150, paddingBottom: 0 },
        first: { height: 100, paddingTop: 0, marginTop: -45, paddingBottom: 0 },
    }

    const variants1 = {
        second: { opacity: 1 },
        first: { opacity: 0 },
    }

    const controls = useAnimation();
    const controls1 = useAnimation();
    const sahandControls = useAnimation();
    const counterControls = useAnimation();
    const rainControls = useAnimation();

    const startAnimation = async () => {
        await controls.start("second")
        await controls1.start("second")
        await sahandControls.start("visible")
        await counterControls.start("visible")
        // await controls.start("first")
        // await controls1.start("first")
    }

    const Heart = (t, r) => {
        return (
            <div className={styles.heart} style={{ right: r, top: t }} onClick={(startRain)}>
                <div className={styles.heart_right}></div>
                <div className={styles.heart_center}></div>
                <div className={styles.heart_left}></div>
            </div>
        );
    }

    const rains = []
    for (let i = 0; i < 66; i++) {
        const t = -Math.floor(Math.random() * Math.floor(900));
        const r = Math.floor(Math.random() * Math.floor(300)) + 10
        const rainVariants = {
            initial: { opacity: 0,top:t, right:r, transition: {duration: 0} },
            start: { opacity: 1, transition: {duration: 0} },
            final: { top: 900, opacity: 0}
        }
        rains.push(
            <motion.div initial="initial" animate={rainControls} variants={rainVariants} transition={{ duration: 3.5 }} className={styles.heart} style={{ right: r, top: t }} >
                <div className={styles.heart_right1}></div>
                <div className={styles.heart_center1}></div>
                <div className={styles.heart_left1}></div>
            </motion.div>);
    }

    const startRain = async() => {
        if (rains.length == 0) return
        await rainControls.start("initial")
        await rainControls.start("start")
        console.log("hiii")
        rainControls.start("final")
    }

    const Dummy = () => {
        const sahandVariants = {
            hidden: { opacity: 1 },
            visible: { opacity: 1 },
        }
        return (
            <motion.div initial="hidden" animate={sahandControls} variants={sahandVariants}
                transition={{ ease: "easeIn", duration: 1 }} className={styles.Sahand}>
                <div className={styles.head} />
                <div className={styles.middlebody}>
                    <div className={styles.leftHand} />
                    <div className={styles.body}>
                        {Heart(110, 77)}
                    </div>
                    <div className={styles.rightHand} />
                </div>

                <div className={styles.lowerBody}>
                    <div className={styles.leftFoot} />
                    <div className={styles.rightFoot} />
                </div>
            </motion.div>
        )
    }

    const DateCounter = () => {
        const counterVariants = {
            hidden: { opacity: 1 },
            visible: { opacity: 1 },
        }
        return (
            <motion.div initial="hidden" animate={counterControls} variants={counterVariants}
                transition={{ ease: "easeIn", duration: 1 }} className={styles.texts}>
                <div className={styles.upperText}>跟我在一起已经</div>
                <div className={styles.daysTogether}><div className={styles.daysNum}>{numDay}</div>  天</div>
            </motion.div>
        )
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

            <div className={styles.upperSection}>
                {Dummy(sahandControls)}
                {DateCounter()}
            </div>
            <img src="../../sofi.png" alt="Sofi" className={styles.sofi} />
            <img src="../../latiao.jpg" alt="Latiao" className={styles.latiao} />
            <motion.img src="../../panda.png" alt="Panda" className={styles.panda} whileTap={{ x: -10, y: -10 }} />

            {
                rains.map(rain => {
                    return rain
                })
            }

            {/* <motion.div className={styles.startScreen_heart} animate={controls2} variants={variants2} transition={{ ease: "easeOut", duration: 1 }}>
                
            </motion.div > */}


        </div>
    );
};

export default startScreen;
