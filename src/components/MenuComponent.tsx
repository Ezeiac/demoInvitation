'use client'
import '@/src/styles/invitation.css'
import menu from "@/src/assets/images/menu/maps.png"
import { ArrayElements } from '@/app/page'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface MenuProps {
    data: ArrayElements;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuComponent = ({
    data,
    setOpenMenu
}: MenuProps) => {

    const [windowWidth, setWindowWidth] = useState<boolean>(false)
    const [discount, setDiscount] = useState<Number>()

    const urlMaps = "https://maps.app.goo.gl/UudM3Bi5m6jQk3nW8"
    const urlChurch = "https://maps.app.goo.gl/UudM3Bi5m6jQk3nW8"

    useEffect(() => {
        setWindowWidth(window.innerWidth < 992)
    }, [])

    useEffect(() => {
        if (data.payment_coverage) {
            setDiscount(data.payment_coverage)
        } else {
            setDiscount(0)
        }
    }, [data])

    const menuContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const clickOut = (e: MouseEvent) => {
            if (menuContainer.current && !menuContainer.current.contains(e.target as Node)) {
                setOpenMenu(false)
            }
        }

        document.addEventListener("mousedown", clickOut)
        return () => {
            document.removeEventListener("mousedown", clickOut)
        }
    }, [])

    return (
        <div
            id="lateralMenu"
            ref={menuContainer}
            className="fixed top-0 left-full overflow-x-scroll overflow-y-hidden shrink-0 pointer-events-auto z-60 w-[80vw]"
        >
            <div className='bg-[#111117FC] flex flex-col items-center h-lvh p-[3lvh] w-fit justify-self-end justify-between relative'>
                <div className='absolute left-0 top-0 borderAnimated h-[100vh] w-[2px]'></div>
                <div className='flex flex-col uppercase mt-12 self-start w-full text-white'>
                    <p className='text-[length:var(--h3size)] font-[family-name:var(--fontBold)] mb-4'>Acceso rápido</p>
                    <a onClick={() => setOpenMenu(false)} href='#' className='text-[length:var(--menusize)] mb-3'>Inicio</a>
                    <a onClick={() => setOpenMenu(false)} href='#Leo' className='text-[length:var(--menusize)] mb-3'>Leo</a>
                    <a onClick={() => setOpenMenu(false)} href='#Yani' className='text-[length:var(--menusize)] mb-3'>Yani</a>
                    <a onClick={() => setOpenMenu(false)} href='#containerCalina' className='text-[length:var(--menusize)] mb-3'>Salón</a>
                    <a onClick={() => setOpenMenu(false)} href={windowWidth ? '#itinerary' : '#containerCalina'} className='text-[length:var(--menusize)] mb-3'>Itinerario</a>
                    <a onClick={() => setOpenMenu(false)} href='#dresscode' className='text-[length:var(--menusize)] mb-3'>Código de vestimenta</a>
                    <a onClick={() => setOpenMenu(false)} href='#gifts' className='text-[length:var(--menusize)] mb-3'>{discount == 1 ? "Regalo" : "Tarjeta"}</a>
                    <a onClick={() => setOpenMenu(false)} href='#countdown' className='text-[length:var(--menusize)] mb-3'>Cuanto falta?</a>
                    <a onClick={() => setOpenMenu(false)} href='#confirmData' className='text-[length:var(--menusize)] mb-3'>Confirmar asistencia</a>
                </div>
                <div className='flex uppercase justify-between w-full'>
                    <div>
                        <a onClick={() => setOpenMenu(false)} href={urlMaps} target='_blank' className='flex items-center text-[length:var(--menusize)] mb-3'>
                            <Image
                                src={menu}
                                alt=""
                                className='h-8 w-auto'
                            />
                            Salón
                        </a>
                    </div>
                    {data.church &&
                        <div>
                            <a onClick={() => setOpenMenu(false)} href={urlChurch} target='_blank' className='flex items-center text-[length:var(--menusize)] mb-3'>
                                <Image
                                    src={menu}
                                    alt=""
                                    className='h-8 w-auto'
                                />
                                Iglesia
                            </a>
                        </div>
                    }

                </div>
            </div>
        </div >
    )
};