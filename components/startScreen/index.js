import Head from 'next/head';
import { motion, useAnimation } from "framer-motion"
import styles from './index.module.css';
import { useEffect, useState } from 'react';

const startScreen = () => {
    const [numDay, changeDay] = useState(0);
    const numDays = Math.floor((Date.parse(new Date()) - Date.parse(new Date("2019-06-30"))) / 86400000);
    const countUp = (numDay, numDays) => {
        if (numDay === numDays) return numDay;
        else return typeof numDay === 'undefined' ? 0 : numDay + 1;
    }

    useEffect(() => {
        setTimeout(() => {
            changeDay(countUp(numDay, numDays));
        }, (numDay + 1) / 20);
    }); 

    const variants = {
        first: { height: '50vh', paddingTop: 150, paddingBottom: 0 },
        second: { height: 100, paddingTop: 0, marginTop: -45, paddingBottom: 0 },
    }

    const variants1 = {
        first: { opacity: 1 },
        second: { opacity: 0 },
    }

    const variants2 = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: {delay: 2, duration: 1.5} },
        jump: {x: Math.floor(Math.random(), 20), y: -15 }
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
            final: { top: 600, opacity: 0}
        }
        rains.push(
            <motion.div initial="initial" animate={rainControls} variants={rainVariants} transition={{ duration: 2.5}} className={styles.heart} style={{ right: r, top: t }} >
                <div className={styles.heart_right1}></div>
                <div className={styles.heart_center1}></div>
                <div className={styles.heart_left1}></div>
            </motion.div>);
    }

    const startRain = async() => {
        if (rains.length == 0) return
        await rainControls.start("initial")
        await rainControls.start("start")
        rainControls.start("final")
    }

    const Dummy = () => {
        const sahandVariants = {
            hidden: { opacity: 0 },
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
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        }
        return (
            <motion.div initial="hidden" animate={counterControls} variants={counterVariants}
                transition={{ ease: "easeIn", duration: 1 }} className={styles.texts}>
                <div className={styles.upperText}>我们在一起已经</div>
                <div className={styles.daysTogether}><div className={styles.daysNum}>{numDay}</div>  天</div>
            </motion.div>
        )
    }

    const variants3 = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: {delay: 4, duration: 1.5} },
        jump: {x: Math.floor(Math.random(), 20), y: -15 }
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



            <motion.img src="../../panda.png" initial="hidden" animate={counterControls} variants={variants2} alt="Panda" className={styles.panda} whileTap={{ x: Math.floor(Math.random(), 20), y: -15 }} />
            <motion.img src="../../spiderman.jpg" initial="hidden" animate={counterControls} variants={variants3} alt="Panda" className={styles.spiderman} whileTap="jump" />
            <motion.img src="../../sofi.png" initial="hidden" animate={counterControls} variants={variants3} alt="Panda" className={styles.sofi} whileTap="jump" />
            <motion.img src="../../latiao.jpg" initial="hidden" animate={counterControls} variants={variants3}  alt="Panda" className={styles.latiao} whileTap="jump" />

            {
                rains.map(rain => {
                    return rain
                })
            }


        </div>
    );
};

export default startScreen;
