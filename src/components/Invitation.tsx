'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import { HeroSection } from './HeroSection';
import { VideoSection } from './VideoSection';
import { TextLayer } from './TextLayer';
import { VisitCalina } from './VisitCalina';
import { Price } from './Price';
import { Intro } from './Intro'
import { useInvitationAnimations } from '../hooks/useInvitationAnimations'
import { Countdown } from './Countdown'
import { FooterConfirm } from './FooterConfirm'
import { InfoSalon } from './InfoSalon'
import { MenuComponent } from './MenuComponent'

import { ArrayElements, dataInv, ObjText } from '@/app/page'

import { DressCode } from './DressCode';
import { Gifts } from './Gifts';

export interface VideoProps {
    id: string;
    data: ArrayElements;
}

export const Invitation = ({
    data,
    isDesktop
}: dataInv) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const presentation = useRef<HTMLDivElement>(null);
    const LucasSection = useRef<HTMLDivElement>(null);
    const yaniSection = useRef<HTMLDivElement>(null);
    const finalSection = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null)

    const v1Progress = useRef({ t: 0 });
    const v2Progress = useRef({ t: 0 });
    const vFinalProgress = useRef({ t: 0 });
    const vCalinaProgress = useRef({ t: 0 });

    const [openMenu, setOpenMenu] = useState<boolean>(false)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
        };
    }, []);

    const {
        infoSalonAnimation,
        menuCrossAnimation
    } = useInvitationAnimations({
        mainRef,
        presentation,
        LucasSection,
        yaniSection,
        finalSection,
        v1Progress,
        v2Progress,
        vFinalProgress,
        vCalinaProgress
    });

    const handleInfoSalon = () => {
        if (infoSalonAnimation.current) {
            infoSalonAnimation.current.restart();
            document.body.style.overflow = 'hidden';
            window.dispatchEvent(new CustomEvent('lock-scroll'));
        }
    }

    const handleBackInfo = () => {
        if (infoSalonAnimation.current) {
            infoSalonAnimation.current.reversed(true);

            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('unlock-scroll'));
        }
    }

    useEffect(() => {
        if (!menuCrossAnimation.current) return

        if (openMenu) {
            menuCrossAnimation.current.restart();
            window.dispatchEvent(new CustomEvent('lock-scroll'));
        } else {
            menuCrossAnimation.current.reversed(true);
            window.dispatchEvent(new CustomEvent('unlock-scroll'));
        }
    }, [openMenu])


    return (
        <div ref={mainRef} className='bg-[#111117]'>
            <button className='fixed top-5 right-5 w-12 h-12 z-70 rounded-full' onClick={(e) => {
                e.stopPropagation()
                setOpenMenu(prev => !prev)
            }}>
                <div className='w-6 h-3 justify-self-center relative'>
                    <span id='panSup1' className='absolute bg-white w-3 h-1 block top-[6px] -translate-y-2 origin-center left-0'></span>
                    <span id='panSub1' className='absolute bg-white w-3 h-1 block bottom-[6px] translate-y-2 origin-center left-0'></span>
                    <span id='panSup2' className='absolute bg-white w-3 h-1 block top-[6px] -translate-y-2 origin-center right-0'></span>
                    <span id='panSub2' className='absolute bg-white w-3 h-1 block bottom-[6px] translate-y-2 origin-center right-0'></span>
                </div>
            </button>
            <div ref={presentation} className="w-full h-[300lvh]">
                <HeroSection id="heroSection" />
            </div>

            <div className="w-full h-[200lvh] relative" id="LucasContainer">

                <div ref={LucasSection} className="w-full lg:w-auto h-lvh">
                    <Intro />
                    <VideoSection
                        id="videoLucas"
                        progressRef={v1Progress}
                        videoUrl={`/videos/${isDesktop ? "desktop" : "mobile"}/videoLucas.mp4`}
                        duration={2}
                        mode="full"
                        align="right"
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-lvh z-20 flex items-center justify-center lg:justify-start lg:max-w-1/2 pointer-events-none">
                    <TextLayer id="Lucas" data={data} />
                </div>
            </div>

            <div className="w-full h-[220lvh] relative" id="yaniContainer">

                <div ref={yaniSection} className="w-full h-lvh">
                    <VideoSection
                        id="videoYami"
                        progressRef={v2Progress}
                        videoUrl={`/videos/${isDesktop ? "desktop" : "mobile"}/videoYami.mp4`}
                        duration={2}
                        mode="full"
                        align="left"
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-lvh lg:top-1/5 lg:h-full lg:left-1/2 z-20 flex items-center justify-center lg:justify-start lg:max-w-1/2 pointer-events-none">
                    <TextLayer id="Yami" data={data} />
                </div>
            </div>

            <div className="w-full h-[200lvh] lg:h-[100lvh] content-center relative bg-[#111117]">
                <div id="triggerCalina">
                    <div className='lg:flex lg:justify-center'>
                        <VisitCalina
                            id="containerCalina"
                            progressRef={vCalinaProgress}
                            duration={2}
                            video={'salon'}
                            handleInfoSalon={handleInfoSalon}
                            setOpenMenu={setOpenMenu}
                            isDesktop={isDesktop}
                            data={data}
                        />
                    </div>
                </div>

                <DressCode />

                <div className='h-[80hv] bg-[#111117]'>
                    <Gifts
                        data={data}
                    />
                </div>

                <Countdown />

                <div className="w-full h-[200lvh] relative bg-[#111117]" id="finalContainer">

                    <div ref={finalSection} className="w-full h-lvh bg-[#111117]">
                        <VideoSection
                            id="videoFinal"
                            progressRef={vFinalProgress}
                            videoUrl={`/videos/${isDesktop ? "desktop" : "mobile"}/videoFinal.mp4`}
                            duration={2}
                            mode="full"
                        />
                        <Price
                            id="priceData"
                            data={data}
                        />
                    </div>
                </div>

                <div id="footerConfirm" className="w-full h-[118dvh] relative">
                    <FooterConfirm
                        id="confirmData"
                        data={data}
                    />
                </div>
            </div>

            <InfoSalon
                data={data}
                scrollRef={scrollRef}
                handleBackInfo={handleBackInfo}
            />

            <MenuComponent
                data={data}
                setOpenMenu={setOpenMenu}
            />

        </div >
    );
};