'use client'
import Image from 'next/image';
import '@/src/styles/invitation.css'
import ingresoCalina from '../assets/images/salon/calina.webp'
import arrowLeft from '../assets/images/salon/arrowLeft.webp'
import { useEffect, useState } from 'react';
import { ArrayElements, guestsObj } from '@/app/page'
import { AnswerComponent } from './AnswerComponent';
import { sendChanges } from '../helpers/sendAnswer';

interface InfoProps {
    data: ArrayElements
    scrollRef: React.RefObject<HTMLDivElement | null>
    handleBackInfo: () => void
}

export const InfoSalon = ({
    data,
    scrollRef,
    handleBackInfo
}: InfoProps) => {

    const urlMaps = "https://www.google.com/maps"
    const urlIframe = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.4782735558!2d-3.8443363212976576!3d40.438098609113865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid!5e0!3m2!1ses!2ses!4v1781020940596!5m2!1ses!2ses"

    const [advance, setAdvance] = useState<number>(0)
    const [guests, setGuests] = useState<guestsObj[]>([])
    const [confirmated, setConfirmated] = useState<boolean>(false)

    useEffect(() => {
        const guests = data
        setGuests(guests.guests)
    }, [data])

    useEffect(() => {
        const scrollSection = scrollRef.current
        if (!scrollSection) return

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollSection
            const scrollMax = scrollWidth - clientWidth
            const percentage = (scrollLeft / scrollMax) * 100

            setAdvance(percentage)
        }

        scrollSection.addEventListener('scroll', handleScroll)

        return () => scrollSection.removeEventListener('scroll', handleScroll)

    }, [])

    return (
        <div
            id="lateralMaps"
            ref={scrollRef}
            className="fixed top-0 left-0 flex flex-row w-full items-center h-lvh bg-[#111117] overflow-x-scroll overflow-y-hidden shrink-0 py-[5lvh] opacity-0 invisible pointer-events-auto z-80"
        >
            <div id="header" className='fixed w-full top-0 left-0 flex justify-between px-[5lvh] pt-[3lvh] z-81 text-(length:--h5size)'>
                <button className='flex rounded-full bg-white p-4 text-black items-center size-fit h-9 lg:h-12'
                    onClick={() => { handleBackInfo(); }}
                >
                    <Image
                        src={arrowLeft}
                        alt=''
                        className='h-[18px] lg:h-[36px] w-auto self-center me-1'
                    />
                    Atrás
                </button>
                <div className='rounded-full bg-[#ffffff15] px-6 text-black justify-center content-center size-fit w-[45vw] h-9 lg:hidden'>
                    <span className='bg-[#00000090] rounded-full h-[4px] block w-full'>
                        <span className='bg-white rounded-full h-[4px] block will-change-[width]'
                            style={{ width: `${advance}%` }}
                        >
                        </span>
                    </span>
                </div>
            </div>
            <div id='infoSalon' className='flex flex-col shrink-0 h-full'>
                <div className="pointer-events-auto flex flex-col lg:flex-row justify-center h-lvh lg:items-center ps-[5vw] mt-[3lvh]">
                    <div className='flex items-center'>
                        <div className='w-[87vw] font-[family-name:var(--fontNormal)] px-[3vw] h-full flex flex-col justify-center'>
                            <div id='mapsSalon' className='w-[90vw] bg-white w-[clamp(50vw,80vw,500px)] h-fit aspect-4/3 p-2 mt-5 rotate-4'>
                                <iframe src={urlIframe} style={{ border: 0, aspectRatio: "4/3" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            <div className='mt-[5vh]'>
                                <h2 className='text-[#ffc2d0] text-[length:var(--h2size)] uppercase font-bold'>
                                    Como llegar
                                </h2>
                                <p className='text-[#fff9cb] text-[length:var(--h3size)] leading-[1.2] uppercase font-bold'>
                                    Dirección: Calle de la Finca, Madrid
                                </p>
                                <a
                                    href={urlMaps} target='_blank'
                                    className='flex rounded-full bg-white px-4 py-2 text-black justify-center mt-5 size-fit text-(length:--h5size)'
                                >
                                    Ir a google maps
                                </a>
                            </div>
                        </div>
                        <div className='w-[90vw] mx-[4vw] font-[family-name:var(--fontNormal)] self-end max-h-[80lvh] h-full flex flex-col lg:self-center'>
                            <h4 className='text-[#ffc2d0] text-[length:var(--h1size)] leading-[1.2] uppercase font-bold mb-2'>
                                Servicio de traslado
                            </h4>
                            <div className='flex flex-col mb-4'>
                                <p className='text-[#fff9cb] text-[length:var(--h2size)] leading-[1.2] font-bold'>
                                    Esta noche solo pensá en divertirte.
                                </p>
                            </div>
                            <p className='text-white text-[length:var(--h5size)] leading-[1.2] mb-4'>
                                {guests.length > 1
                                    ? "Confirma si quieres contatar este servicio." : "Confirma a quienes quieran contatar este servicio."}
                                <br />
                                Un mes antes del evento podras ver el estado de tu traslado aquí. No te olvides de verificarlo!
                                <br />
                                Cualquier consulta, no dudes en escribirnos.
                            </p>
                            <div className='text-white text-[length:var(--h5size)] leading-[1.2] overflow-auto h-full pe-1 border-y border-[#3a3a3a] mb-4'>
                                {
                                    guests?.map(g => {
                                        return (
                                            <div key={g.id} className='flex justify-between mx-1 my-3'>
                                                <p className='self-center'>{g.name} {g.lastname}</p>
                                                <AnswerComponent
                                                    id={g.id}
                                                    setDataGuest={setGuests}
                                                    confirm={g.transfer}
                                                    status={"transfer"}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button
                                className="w-full py-3 bg-[#960696] text-white font-bold rounded-lg uppercase hover:bg-gray-200 transition-colors"
                                onClick={() => {
                                    setConfirmated(prev => !prev)
                                    setTimeout(() => {
                                        setGuests(status =>
                                            status.map(p => {
                                                return { ...p, transfer: false }
                                            }))
                                        setConfirmated(prev => !prev)

                                    }, 3000)
                                }
                                }
                            >
                                {confirmated ? "Respuesta enviada" : "Enviar respuesta"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};