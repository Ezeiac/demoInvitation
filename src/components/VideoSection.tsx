'use client'
import { useEffect, useRef, useState } from 'react'

interface VideoProps {
    id: string;
    progressRef: React.MutableRefObject<{ t: number }>;
    videoUrl: string;
    duration: number;
    mode: 'full' | 'inline';
    align?: 'left' | 'center' | 'right';
}

export const VideoSection = ({
    id,
    progressRef,
    videoUrl,
    duration,
    mode,
    align
}: VideoProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isReady, setIsReady] = useState(false);
    const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const setCanvasDimensions = () => {
            const width = mode === 'full' ? window.innerWidth : (canvas.parentElement?.offsetWidth || window.innerWidth);
            const height = mode === 'full' ? window.innerHeight : width * 0.75;
            canvas.width = width;
            canvas.height = height;
        };

        setCanvasDimensions();

        const drawFrame = () => {
            if (video.readyState < 2) return;
            const imgRatio = video.videoWidth / video.videoHeight;
            const canvasRatio = canvas.width / canvas.height;
            let dw, dh, ox, oy;

            if (imgRatio > canvasRatio) {
                dh = canvas.height;
                dw = dh * imgRatio;

                if (align === 'right') {
                    ox = (canvas.width * 0.5) - (dw * 0.5);
                } else if (align === 'left') {
                    ox = 0;
                } else {
                    ox = (canvas.width - dw) / 2;
                }
                oy = 0;
            } else {
                dw = canvas.width;
                dh = dw / imgRatio;
                ox = 0;
                oy = (canvas.height - dh) / 2;
            }

            ctx.drawImage(video, ox, oy, dw, dh);
        };

        const handleSeeked = () => drawFrame();
        video.addEventListener('seeked', handleSeeked);

        video.load();
        video.onloadeddata = () => {
            setIsReady(true);
            video.currentTime = 0.001;
            drawFrame();
        };

        let rafId: number;
        let lastVideoTime = -1;

        const renderLoop = () => {
            const targetTime = Math.max(0, Math.min(progressRef.current.t, duration - 0.01));

            if (Math.abs(targetTime - lastVideoTime) > 0.016) {
                if (video.readyState >= 2) {
                    video.currentTime = targetTime;
                    lastVideoTime = targetTime;
                }
            }
            rafId = requestAnimationFrame(renderLoop);
        };

        rafId = requestAnimationFrame(renderLoop);

        const handleResize = () => {
            if (window.innerWidth !== lastWidth.current || mode === 'full') {
                setCanvasDimensions();
                lastWidth.current = window.innerWidth;
                drawFrame();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(rafId);
            video.removeEventListener('seeked', handleSeeked);
            window.removeEventListener('resize', handleResize);
        };
    }, [videoUrl, duration, mode, align]);

    return (
        <div
            id={id}
            className={`transition-opacity lg:w-auto overflow-hidden lg:justify-self-end ${mode === 'full' ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={{
                position: mode === 'full' ? 'fixed' : 'static',
                opacity: isReady && mode === 'full' ? 0 : 1,
                visibility: isReady && mode === 'full' ? 'hidden' : 'visible'
            }}
        >
            <video
                ref={videoRef}
                src={videoUrl}
                preload="auto"
                muted
                playsInline
                disableRemotePlayback
                style={{ display: 'none' }}
            />

            <canvas
                ref={canvasRef}
                className={`${mode === 'full' ? 'w-full h-lvh object-cover' : 'w-full h-auto'}`}
                style={{
                    display: isReady ? 'block' : 'none',
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    ...(mode !== 'full' && { aspectRatio: "4/3" })
                }}
            />
        </div>
    );
};