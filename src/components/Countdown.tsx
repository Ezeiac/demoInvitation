"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { gsap } from 'gsap'
import rings from "@/src/assets/images/countdown/ringsIcon1.svg"
import loadRing from "@/src/assets/images/countdown/loadRing.svg"
import auto from "@/src/assets/images/countdown/auto.webp"
import bolso from "@/src/assets/images/countdown/bolso.webp"
import bote from "@/src/assets/images/countdown/bote.webp"
import viejo from "@/src/assets/images/countdown/viejo.webp"
import bgAuto from "@/src/assets/images/countdown/bgAuto.webp"
import bgBolso from "@/src/assets/images/countdown/bgBolso.webp"
import bgBote from "@/src/assets/images/countdown/bgBote.webp"
import bgViejo from "@/src/assets/images/countdown/bgViejo.webp"
import appleLogo from "@/src/assets/images/countdown/appleLogo.png"
import googleLogo from "@/src/assets/images/countdown/googleLogo.png"
import Image from "next/image"

export const Countdown = () => {

    let itsToday: Date = new Date("2027-01-09T19:00:00")

    const [isMounted, setIsMounted] = useState(false)
    const [timeLeft, setTimeLeft] = useState<number>(0)

    useEffect(() => {

        setIsMounted(true)

        const time = setInterval(() => {
            setTimeLeft(+itsToday - Date.now())
        }, 1000);

        return () => clearInterval(time)

    }, [timeLeft])

    const dias = Math.floor(timeLeft / (24 * 60 * 60 * 1000)).toString();
    const horas = Math.floor((timeLeft / (60 * 60 * 1000)) % 24).toString().padStart(2, "0");;
    const minutos = Math.floor((timeLeft / (60 * 1000)) % 60).toString().padStart(2, "0");;
    const segundos = Math.floor((timeLeft / 1000) % 60).toString().padStart(2, "0");


    useLayoutEffect(() => {
        if (!isMounted) return;

        const images = [
            { bg: bgAuto.src, char: auto.src },
            { bg: bgBolso.src, char: bolso.src },
            { bg: bgBote.src, char: bote.src },
            { bg: bgViejo.src, char: viejo.src }]

        const ctx = gsap.context(() => {
            const tlTimer = gsap.timeline({
                repeat: -1,
                ease: "linear",
            });

            images.forEach(i => {

                tlTimer
                    .set("#backgroundLoading", {
                        backgroundImage: `url(${i.bg})`,
                        autoAlpha: 0
                    })
                tlTimer
                    .set("#backgroundChar", {
                        backgroundImage: `url(${i.char})`,
                        x: 10
                    })

                    .to("#backgroundChar", { autoAlpha: 0, duration: 0.75 }, "-=0.6")
                    .to("#backgroundLoading", { autoAlpha: 1, scale: 1, duration: 1.5 })
                    .to("#backgroundChar", { autoAlpha: 1, duration: 1.5 }, "-=1.2")
                    .to("#backgroundChar", { x: 0, duration: 3 }, "<")
                    .to("#backgroundLoading", { autoAlpha: 0, duration: 0.75 })
                    .to("#backgroundChar", { autoAlpha: 0, duration: 0.75 }, "-=0.6")
            });

        })

        gsap.to("#loadingRing", {
            rotation: 360,
            repeat: -1,
            duration: 3,
            ease: "none",
            transformOrigin: "50% 58.33%",
            force3D: true
        });

        return () => ctx.revert();
    }, [isMounted]);

    return (
        <div id="countdown" className="relative h-lvh w-full overflow-hidden">
            <div id="backgroundLoading" className="absolute bottom-0 h-lvh w-full bg-cover bg-center bg-no-repeat scale-110"></div>
            <div id="backgroundChar" className="absolute bottom-0 h-[80lvh] w-full lg:w-auto lg:aspect-1/1 lg:right-0 bg-cover bg-bottom bg-no-repeat"></div>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 50% at center, rgba(17,17,23,0) 10%, rgba(17,17,23,1) 100%)"
                }}
            ></div>
            {isMounted
                ? <div className="absolute top-[5lvh] h-[85lvh] flex flex-col w-full items-center justify-between">
                    <div className="flex">
                        <div className="text-center text-white font-(family-name:--fontBold) text-[40px] lg:text-(length:--h1size)">
                            {dias === "0" ?
                                ""
                                : dias === "1" ?
                                    <p>{dias} <span className="text-[24px]">día,</span></p>
                                    : <p>{dias} <span className="text-[24px]">días,</span></p>

                            }
                            <div className="flex align-bottom">
                                <p>{horas}<span className="text-[24px]">hs</span>&nbsp;</p>
                                <p>{minutos}<span className="text-[24px]">min</span>&nbsp;</p>
                                <p>{segundos}<span className="text-[24px]">s</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative lg:absolute lg:bottom-0">
                        <div className="flex items-center text-white h-auto">
                            <div id="loadingRingContainer" className="flex items-center">
                                <Image
                                    src={loadRing}
                                    alt=""
                                    id="loadingRing"
                                    className="h-[20px] w-auto lg:h-(--h3size)"
                                />
                            </div>
                            <p className="font-(family-name:--fontBold) text-[24px] lg:text-(length:--h1size) ms-1 lg:ms-3">
                                Loading wedding
                            </p>
                        </div>
                        <div className="flex justify-between absolute top-[130%] left-0 w-full">
                            <a href="https://calendar.app.google/YWCwpzWNMJrucNB1A" target="_blank" className="flex items-center">
                                <span className="me-1 text-white lg:text-(length:--h5size)">Agendar</span>
                                <Image
                                    src={googleLogo}
                                    alt=""
                                    className="h-6 w-auto"
                                />
                            </a>
                            <a href="/appointment/iosAppointment.ics" download="iosAppointment" className="flex items-center">
                                <span className="me-1 text-white lg:text-(length:--h5size)">Agendar</span>
                                <Image
                                    src={appleLogo}
                                    alt=""
                                    className="h-6 w-auto"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                : <div>Calculando los dias</div>
            }
        </div >
    )
}
