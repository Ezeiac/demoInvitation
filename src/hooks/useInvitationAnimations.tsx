import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HookProps {
    mainRef: React.RefObject<HTMLDivElement | null>
    presentation: React.RefObject<HTMLDivElement | null>
    leoSection: React.RefObject<HTMLDivElement | null>
    yaniSection: React.RefObject<HTMLDivElement | null>
    finalSection: React.RefObject<HTMLDivElement | null>
    v1Progress: React.MutableRefObject<{ t: number }>
    v2Progress: React.MutableRefObject<{ t: number }>
    vFinalProgress: React.MutableRefObject<{ t: number }>
    vCalinaProgress: React.MutableRefObject<{ t: number }>
}

export const useInvitationAnimations = ({
    mainRef,
    presentation,
    leoSection,
    yaniSection,
    finalSection,
    v1Progress,
    v2Progress,
    vFinalProgress,
    vCalinaProgress,
}: HookProps) => {

    const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
    const infoSalonAnimation = useRef<gsap.core.Timeline | null>(null);
    const menuCrossAnimation = useRef<gsap.core.Timeline | null>(null);
    const commentsAnimation = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.config({
            ignoreMobileResize: true
        });

        const handleResize = () => {
            const currentWidth = window.innerWidth;
            if (currentWidth !== lastWidth.current) {
                lastWidth.current = currentWidth;
                ScrollTrigger.refresh();
            }
        };

        window.addEventListener("resize", handleResize);

        let ctx = gsap.context(() => {

            const presentationTl = gsap.timeline({
                scrollTrigger: {
                    trigger: presentation.current,
                    start: 'top top',
                    end: '+=300%',
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                }
            });

            presentationTl
                .addLabel("heroAnimation")
                .to('#backHero', { scale: 1, ease: "none", duration: 0.7 }, "heroAnimation")
                .to('#frontHero', { scale: 1.15, ease: "none", duration: 0.7 }, "heroAnimation")
                .to('#imgTextHero', { opacity: 0, duration: 0.4 }, "heroAnimation")
                .to('#heroComplete', { opacity: 0, duration: 0.4 }, "heroAnimation+=0.3")
                .to('#heroMask', {
                    maskSize: "min(60vw, 700px)",
                    webkitMaskSize: "min(60vw, 700px)",
                    duration: 0.7
                }, "heroAnimation")

                .addLabel("coordinationItems")
                .fromTo('#dateLogo',
                    { autoAlpha: 0, scale: 1 },
                    {
                        autoAlpha: 1,
                        y: "-5%",
                        scale: 0.8,
                        duration: 2,
                        webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                        maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    },
                    "coordinationItems"
                )
                .to('#heroMask', {
                    y: "-5%",
                    autoAlpha: 0,
                    scale: 0.8,
                    duration: 2,
                }, "coordinationItems")

                .to('#dateLogo h3', {
                    backgroundImage: 'radial-gradient(circle at 50% -30vh, rgb(255, 214, 135) 0px, rgb(252, 82, 67) 50vh, rgb(157, 47, 106) 90vh, rgba(32, 31, 66, 0) 150vh)',
                    duration: 2,
                    ease: "power1.inOut",
                }, "coordinationItems-=1")

                .to('#dateLogo', {
                    webkitMaskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    maskImage: 'radial-gradient(circle at top center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
                    autoAlpha: 0,
                    duration: 0.8,
                }, "+=0.2");


            const leoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#leoContainer",
                    start: 'top top',
                    end: '+=180%',
                    scrub: 0.5,
                    pin: leoSection.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                }
            });

            leoTl.set('#containerTextOrg', { backdropFilter: "blur(15px)" });
            leoTl.set("#videoLeo canvas", {
                WebkitMaskImage: "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
                maskImage: "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
            })

            leoTl
                .fromTo('#containerTextOrg',
                    {
                        webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)',
                        maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)',
                        autoAlpha: 0,
                    },
                    {
                        webkitMaskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                        maskImage: 'radial-gradient(circle at bottom center, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
                        autoAlpha: 1,
                    })
                .addLabel("transicionVideo")
                .to('#textOrg', { scale: 0.8, duration: 3.5 }, 'transicionVideo')
                .to('#textOrg', {
                    maskImage: "radial-gradient(at 50% 0vh, rgb(0,0,0) 120vh, rgba(0,0,0,0) 200vh)",
                    webkitMaskImage: "radial-gradient(at 50% 0vh, rgb(0,0,0) 120vh, rgba(0,0,0,0) 200vh)",
                    duration: 2.5
                }, 'transicionVideo')
                .to('#textOrgInner', {
                    backgroundImage: 'radial-gradient(circle at 40.0899% 1.7982vh, rgb(255,179,135) 0%, rgb(252,82,68) 69.5%, rgb(156,47,106) 99.4%, rgba(32,31,66,0) 149.1%)',
                    duration: 2.5
                }, 'transicionVideo')
                .to('#textOrg', {
                    autoAlpha: 0,
                    duration: 0.6
                }, "transicionVideo+=3")
                .to('#containerTextOrg', {
                    backdropFilter: "blur(0px)",
                    duration: 3,
                    ease: "power1.inOut",
                }, "transicionVideo+=1.5")

                .to('#videoLeo', { autoAlpha: 1, duration: 0.5 }, 'transicionVideo+=2.5')
                .addLabel("LeoAppear")
                .to(v1Progress.current, {
                    t: 2, duration: 8, ease: "none",
                }, 'transicionVideo')
                .to("#videoLeo canvas", {
                    WebkitMaskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    maskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    duration: 4
                }, "LeoAppear")
                .to('#videoLeo', { autoAlpha: 0, duration: 3.5 }, "LeoAppear")

            const yaniTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#yaniContainer",
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                    pin: yaniSection.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                }
            });

            yaniTl.set("#videoYani canvas", {
                WebkitMaskImage: "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
                maskImage: "radial-gradient(circle at 105vw 50vh, rgb(0, 0, 0) 100vw, rgb(0, 0, 0) 150vw)",
            })

            yaniTl
                .to('#videoYani', { autoAlpha: 1, duration: 0.5 })
                .addLabel("yaniAppear")
                .to(v2Progress.current, {
                    t: 3, duration: 8, ease: "none",
                }, '-=0.75')
            if (window.innerWidth < 992) {
                yaniTl.to("#videoYani canvas", {
                    WebkitMaskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    maskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    duration: 4
                }, "yaniAppear+=2.5")
            } else {

                yaniTl.to("#videoYani canvas", {
                    WebkitMaskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    maskImage: "radial-gradient(circle at 95vw 0vh, rgb(0, 0, 0) 30vw, rgba(0, 0, 0, 0.15) 60vw)",
                    duration: 4
                }, "yaniAppear+=2.5")
            }
            yaniTl.to('#videoYani', { autoAlpha: 0, duration: 3 }, "yaniAppear+=2.5")
                .to('#Yani', { autoAlpha: 0, duration: 1 }, "yaniAppear+=5.5")


            const catalinaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#triggerCalina",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                }
            });

            catalinaTl
                .to(vCalinaProgress.current, { t: 2, duration: 2 }, 0)

            const finalTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#finalContainer",
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                    pin: finalSection.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                }
            });

            finalTl
                .to('#videoFinal', { autoAlpha: 1, duration: 1 })
                .to(vFinalProgress.current, {
                    t: 2, duration: 4, ease: "none",
                }, "<")
                .to('#videoFinal', { autoAlpha: 0, duration: 0.05 }, "-=0.5")
                .to("#finalAnimation", { visibility: "visible", duration: 0.1 }, "-=0.3")
                .to("#finalAnimation", { scale: 0.8, duration: 2 }, "<")
                .to('#textFinal', {
                    backgroundImage: 'radial-gradient(circle at 50% 47.9747vh, rgb(255, 212, 128) 0vh, rgb(236, 69, 111) 50vh, rgb(122, 33, 102) 90vh, rgba(32, 31, 66, 0) 122.785vh)',
                    duration: 4
                }, '<')

            const logoFooterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#footerConfirm",
                    start: "top top",
                    end: "+=5",
                    scrub: 0.5,
                    toggleActions: "play none none none"
                }
            });

            logoFooterTl
                .to("#confirmData", { autoAlpha: 1, duration: 0.1, scale: 0.95 })

        }, mainRef);

        const animationSalon = gsap.timeline({ paused: true });

        animationSalon.set("#infoSalon", { x: "90%", autoAlpha: 0 })

        animationSalon
            .to("#lateralMaps", { zIndex: 80 })
            .to("#lateralMaps", { autoAlpha: 1, duration: 0.3 })
            .to("#infoSalon, #containerCalina", { autoAlpha: 1, duration: 0.3 }, "<")
            .to("#infoSalon", { x: 0, duration: 0.3 }, "<")
            .to("#containerCalina", { x: "-90%", duration: 0.3 }, "<")
            .to("#mapsSalon, #containerCalina", { rotateZ: -4, duration: 0.3 }, "<")
            .to("#header", { opacity: 1, duration: 0.3 })

        infoSalonAnimation.current = animationSalon;

        // const animationComments = gsap.timeline({ paused: true });

        // animationComments.set("#infoSalon", { x: "90%", autoAlpha: 0 })

        // animationComments
        //     .to("#lateralMaps", { zIndex: 80 })
        //     .to("#lateralMaps", { autoAlpha: 1, duration: 0.3 })
        //     .to("#infoSalon, #photoSalon", { autoAlpha: 1, duration: 0.3 }, "<")
        //     .to("#infoSalon", { x: 0, duration: 0.3 }, "<")
        //     .to("#photoSalon", { x: "-90%", duration: 0.3 }, "<")
        //     .to("#mapsSalon, #photoSalon", { rotateZ: -4, duration: 0.3 }, "<")
        //     .to("#header", { opacity: 1, duration: 0.3 })

        // commentsAnimation.current = animationComments;

        const animationCross = gsap.timeline({ paused: true });

        animationCross

            .to("#panSup1", { rotateZ: 45, scaleX: 1.4 })
            .to("#panSub1", { rotateZ: -45, scaleX: 1.4 }, "<")
            .to("#panSup2", { rotateZ: -45, scaleX: 1.4 }, "<")
            .to("#panSub2", { rotateZ: 45, scaleX: 1.4 }, "<")
            .to("#lateralMenu", { x: "-100%" }, "<")

        menuCrossAnimation.current = animationCross;

        return () => {
            window.removeEventListener("resize", handleResize);
            ctx.revert();
            animationSalon.revert();
            animationCross.revert();
        };

    }, []);

    return {
        infoSalonAnimation,
        menuCrossAnimation,
        commentsAnimation
    };

}
