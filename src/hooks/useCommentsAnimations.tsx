import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useCommentsAnimations = () => {

    const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
    const newCommentAnimation = useRef<gsap.core.Timeline | null>(null);
    const pauseAnimation = useRef<gsap.core.Timeline | null>(null);

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

        const animationNewComment = gsap.timeline({ paused: true });

        animationNewComment
            .to("#visibleCommentsContainer", { autoAlpha: 0, duration: 0.3 })
            .to("#buttonComments, #run", { autoAlpha: 0, duration: 0.3 }, "<")
            .to("#buttonSendComments", { autoAlpha: 1, duration: 0.3 })
            .to("#newCommentContainer", { autoAlpha: 1, duration: 0.3, zIndex: 1 }, "<")
            .to("#buttonComments", { autoAlpha: 1, duration: 0.3 }, "<")

        newCommentAnimation.current = animationNewComment;

        const pausedComments = gsap.timeline({ paused: true });

        pausedComments
            .to("#run", { autoAlpha: 0, duration: 0.3 })
            .to("#run", { autoAlpha: 1, duration: 0.3 })


        pauseAnimation.current = pausedComments;

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
            animationNewComment.revert();
            pausedComments.revert();
        };

    }, []);

    return {
        newCommentAnimation,
        pauseAnimation
    };

}
