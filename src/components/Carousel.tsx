"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from 'gsap'
import '@/src/styles/invitation.css'
import { ArrayElements, userCommentsType } from '@/app/page'
import { Observer } from 'gsap/all'
import pause from '@/public/pause.png'
import play from '@/public/play.png'
import Image, { StaticImageData } from "next/image"
import { useCommentsAnimations } from "../hooks/useCommentsAnimations"

gsap.registerPlugin(Observer)

interface MenuProps {
    data: ArrayElements;
    commentsData: userCommentsType[];
}

export const Carousel = ({
    data,
    commentsData
}: MenuProps) => {

    const { newCommentAnimation, pauseAnimation } = useCommentsAnimations()

    const [comments, setComments] = useState<userCommentsType[]>([])
    const [actualComment, setActualComment] = useState(0)
    const [paused, setPaused] = useState<boolean>(false)
    const [userComment, setUserComment] = useState<boolean>(false)
    const [userName, setUserName] = useState<boolean>(false)
    const [textButton, setTextButton] = useState<string>("Deja tu comentario")
    const [playButton, setPlayButton] = useState<StaticImageData>(play)
    const [myComments, setMyComments] = useState<userCommentsType[]>([])


    const containerRef = useRef<HTMLDivElement>(null)
    const isAnimating = useRef(false)

    const [newSetCommnet, setNewSetCommnet] = useState<boolean>(false)

    const handleComments = () => {
        if (newCommentAnimation.current) {
            if (newSetCommnet) {
                newCommentAnimation.current.reversed(true);
                setNewSetCommnet(false);
            } else {
                newCommentAnimation.current.restart();
                setNewSetCommnet(true);
            }
        }
    }

    useEffect(() => {
        const ordenComments = [...commentsData].sort((a, b) => {
            return a.id - b.id
        })

        const myComments = data.comments

        setComments(ordenComments)
        setMyComments(myComments.filter(f => f.public))

    }, [data])

    const total = comments.length;

    const getVisibleComments = () => {
        if (total === 0) return []
        const indices = [-2, -1, 0, 1, 2]
        return indices.map(offset => {
            const index = (actualComment + offset + total) % total
            return { ...comments[index], virtualId: `${comments[index].id}-${offset}` }
        })
    }

    const changeComment = (direction: number) => {

        if (isAnimating.current || total === 0) return;
        isAnimating.current = true;

        const cards = gsap.utils.toArray<HTMLElement>(containerRef.current!.children);
        const nextCenterIdx = direction > 0 ? 3 : 1;

        const tl = gsap.timeline({
            onComplete: () => {
                setActualComment(prev => (prev + direction + total) % total);

                requestAnimationFrame(() => {
                    gsap.set(containerRef.current, { x: 0 });
                    gsap.set(cards, { clearProps: "all" });
                    isAnimating.current = false;
                });
            }
        });

        tl.to(containerRef.current, {
            x: direction > 0 ? "-50vw" : "50vw",
            duration: 1.5,
            ease: "power2.inOut"
        }, 0);

        cards.forEach((card, idx) => {
            const isNextCenter = idx === nextCenterIdx;
            tl.to(card, {
                scale: isNextCenter ? 1 : 0.7,
                opacity: isNextCenter ? 1 : 0.5,
                zIndex: isNextCenter ? 10 : 1,
                duration: 1.5,
                ease: "power2.inOut"
            }, 0);
        });
    };

    useLayoutEffect(() => {
        if (total === 0) return

        const obs = Observer.create({
            target: containerRef.current,
            type: "touch,pointer",
            onLeft: () => changeComment(1),
            onRight: () => changeComment(-1),
            tolerance: 10,
            preventDefault: true
        })

        return () => obs.kill()
    }, [total, actualComment])

    useEffect(() => {

        const timer = setInterval(() => {
            if (!paused) {
                changeComment(1)
            }
        }, 3500);

        return () => clearInterval(timer)

    }, [paused, total, actualComment])

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [qChar, setQChar] = useState<number | null>(0)

    const handleHeight = () => {
        const textArea = textAreaRef.current
        if (textArea) {
            textArea.style.height = "60px";
            textArea.style.height = `${textArea.scrollHeight + 3}px`
        }

        const qCharacters = textAreaRef.current?.textLength
        if (qCharacters) setQChar(qCharacters)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (newSetCommnet) {
                setTextButton("Volver a comentarios");
            } else {
                setTextButton("Deja tu comentario")
            }
        }, 300);

        return () => clearTimeout(timer)
    }, [newSetCommnet])

    useEffect(() => {

        if (pauseAnimation.current) {
            pauseAnimation.current.restart();
        }

        const timer = setTimeout(() => {
            setPlayButton(paused ? play : pause);


        }, 300);

        return () => clearTimeout(timer);
    }, [paused]);

    return (
        <div id="carousel" className="fixed top-0 right-full min-h-[50lvh] flex flex-col justify-around scroll-mt-[25lvh]">
            <h2 className='text-center text-white font-(family-name:--fontBold) text-(length:--h2size) tracking-[-.04em] px-8'>
                Dejales tu mensaje a los novios...
            </h2>
            <div className="w-full overflow-hidden relative">
                <div id="commentsContainer" className="relative">
                    <div id="visibleCommentsContainer" className="flex items-center h-[30lvh] scroll-mt-[15lvh]">
                        <div
                            ref={containerRef}
                            className="flex items-center justify-center"
                            style={{
                                width: "250vw",
                                marginLeft: "-75vw"
                            }}
                        >
                            {getVisibleComments().map((c, i) => {

                                return (
                                    <div
                                        key={c.virtualId}
                                        className="w-[50vw] flex-shrink-0 flex flex-col justify-center items-center bg-[#111117]"
                                        style={{
                                            transform: i === 2 ? 'scale(1)' : 'scale(0.7)',
                                            opacity: i === 2 ? 1 : 0.5,
                                            zIndex: i === 2 ? 10 : 1,
                                            willChange: "transform, opacity"
                                        }}
                                        onClick={() => {
                                            if (i === 1) {
                                                changeComment(-1)
                                            } else if (i === 3) {
                                                changeComment(1)
                                            }
                                        }}
                                    >
                                        <p className="text-white text-center italic border-y w-full text-[16px] py-4 px-2">"{c.comment}"</p>
                                        <div className="self-end w-1/2">
                                            <p
                                                className="font-(family-name:--fontNormal) text-white/70 font-bold capitalize tracking-[0.2em] text-center py-1"
                                            >{c.user}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div id="newCommentContainer" className="h-[30lvh] overflow-hidden absolute w-[150vw] -left-[25vw] inset-0 -z-1 opacity-0 invisible flex">
                        <div
                            className="w-[50vw] flex-shrink-0 flex flex-col justify-center items-center bg-[#111117] scale-70 opacity-50"
                        >
                            <p className="text-white text-center italic border-y w-full text-[16px] py-4 boxExample">"{comments[comments.length - 1]?.comment}"</p>
                            <div className="self-end w-1/2 boxExample">
                                <p
                                    className="font-(family-name:--fontNormal) text-white/70 font-bold capitalize tracking-[0.2em] text-center py-1"
                                >
                                    Pepe
                                </p>
                            </div>
                        </div>
                        <div
                            className="w-[50vw] flex-shrink-0 flex flex-col justify-center items-center bg-[#111117]"
                        >
                            <div className="relative w-full">
                                <textarea
                                    id="userComment"
                                    maxLength={130}
                                    ref={textAreaRef}
                                    onInput={() => {
                                        handleHeight()

                                    }}
                                    placeholder="Escribe tu mensaje"
                                    className='resize-none overflow-hidden text-white text-center italic border-y w-full text-[16px] py-4 px-2 focus-visible:outline-0 h-15'
                                />
                                <p className="absolute right-0 bottom-[5px] z-9 text-white/70 text-[12px]">{qChar}/130</p>
                            </div>
                            <div className="self-end">
                                <input
                                    id="userName"
                                    maxLength={20}
                                    placeholder="Nombre"
                                    className="resize-none overflow-hidden font-(family-name:--fontNormal) text-center text-white/70 font-bold capitalize tracking-[0.2em] py-1 whitespace-nowrap text-white italic min-w-3/4 focus-visible:outline-0 px-1"
                                />
                            </div>
                        </div>
                        <div
                            className="w-[50vw] flex-shrink-0 flex flex-col justify-center items-center bg-[#111117] scale-70 opacity-50"
                        >
                            <p className="text-white text-center italic border-y w-full text-[16px] py-4 boxExample">"{comments[0]?.comment}"</p>
                            <div className="self-end w-1/2 boxExample">
                                <p
                                    className="font-(family-name:--fontNormal) text-white/70 font-bold capitalize tracking-[0.2em] text-center py-1"
                                >
                                    Pepe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-[90vw] self-center">
                <div id="buttonComments" className="w-[45vw] text-center">
                    <button
                        className='rounded-full bg-white px-8 py-4 text-black justify-center font-bold'
                        onClick={() => {
                            handleComments()
                        }
                        }
                    >
                        {textButton}

                    </button>
                </div>
                <div className="min-h-6 w-[45vw] text-center relative content-center">
                    <div id="buttonSendComments" className="absolute inset-0 text-center opacity-0 invisible z-1">
                        <button
                            className='rounded-full bg-white px-8 py-4 text-black justify-center font-bold'
                        >
                            Enviar comentario
                        </button>
                    </div>
                    <div id="run">
                        <button
                            className='rounded-full bg-white px-8 py-4 text-black justify-center font-bold'
                        >
                            Mis comentarios <span>{data.comments.length}</span>
                        </button>
                        <button
                            className="paused w-6"
                            onClick={() => {
                                setPaused(prev => !prev);
                            }}
                        >
                            <Image
                                src={playButton}
                                alt=""
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 