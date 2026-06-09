"use client"

import { useEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import minus from "@/src/assets/images/dress/minus.png"

import maniquiEl from "@/src/assets/images/dress/he/maniquiEl.png"
import maniqui from "@/src/assets/images/dress/el.png"

import camCl from "@/src/assets/images/dress/he/camCl.png"
import camGr from "@/src/assets/images/dress/he/camGr.png"
import camWh from "@/src/assets/images/dress/he/camWh.png"
import corbOt from "@/src/assets/images/dress/he/corbOt.png"
import corbRe from "@/src/assets/images/dress/he/corbRe.png"
import monoBl from "@/src/assets/images/dress/he/monoBl.png"
import monoGr from "@/src/assets/images/dress/he/monoGr.png"
import pantBl from "@/src/assets/images/dress/he/pantBl.png"
import pantCl from "@/src/assets/images/dress/he/pantCl.png"
import pantGr from "@/src/assets/images/dress/he/pantGr.png"
import sacoBl from "@/src/assets/images/dress/he/sacoBl.png"
import sacoBlF from "@/src/assets/images/dress/he/sacoBlF.png"
import sacoCl from "@/src/assets/images/dress/he/sacoCl.png"

import '@/src/styles/invitation.css'

interface timeline {
    [key: string]: gsap.core.Timeline | null,
    church: gsap.core.Timeline | null,
    martini: gsap.core.Timeline | null,
    ring: gsap.core.Timeline | null,
    music: gsap.core.Timeline | null
}

interface Option {
    name: string,
    img: StaticImageData | string | null
}

interface Category {
    [key: string]: Option[];
}

interface VestimentaM {
    Camisa: StaticImageData | string;
    Saco: StaticImageData | string;
    Pantalón: StaticImageData | string;
    Accesorios: StaticImageData | string | null;
}


interface DressProps {
    widthOpposite: (idSelected: string, idNoSelected: string) => void
}

export const DressCodeHe = ({
    widthOpposite
}: DressProps) => {

    const modelArrayM: Category[] = [
        {
            Camisa: [
                { name: "Camisa cuadros", img: camCl },
                { name: "Camisa verde", img: camGr },
                { name: "Camisa blanca", img: camWh }
            ]
        },
        {
            Saco:
                [
                    { name: "Saco negro", img: sacoBl },
                    { name: "Saco negro elegante", img: sacoBlF },
                    { name: "Saco claro", img: sacoCl }
                ],
        },
        {
            Pantalón: [
                { name: "Pantalón negro", img: pantBl },
                { name: "Pantalón claro", img: pantCl },
                { name: "Pantalón gris", img: pantGr }
            ]
        },
        {
            Accesorios: [
                { name: "Corbata", img: corbOt },
                { name: "Corbata roja", img: corbRe },
                { name: "Moño negro", img: monoBl },
                { name: "Moño gris", img: monoGr },
                { name: "Nada", img: null },
            ]
        }
    ];


    const [vestimentaM, setVestimentaM] = useState<VestimentaM>({
        Camisa: camCl,
        Pantalón: pantCl,
        Accesorios: null,
        Saco: sacoCl
    })

    const [sectionM, setSectionM] = useState<string | null>()

    useEffect(() => {
        modelArrayM.forEach(e => {
            const id = Object.keys(e)[0]

            if (sectionM === id) {
                gsap.to(`#${id}`, {
                    height: "auto",
                    duration: 0.5,
                    ease: "power2.out",
                    opacity: 1
                })
            } else {
                gsap.to(`#${id}`, {
                    height: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    opacity: 1
                })
            }
        })

    }, [sectionM])

    const changeClothesM = (key: string, value: StaticImageData | null | string) => {
        setVestimentaM(prev => ({
            ...prev, [key]: value
        }))

    }

    return (
        <div id="dresscodeHe" className='content-center w-full'>
            <div id="selectorHe" className="absolute w-[50vw] right-[32px] top-1/4 border z-50 bg-[#00000090] opacity-0 invisible">
                <div className="text-center dressSelector px-1 py-2">
                    <h3 className="font-bold font-(family-name:--fontBold) text-(length:--h4size)">Formal sport</h3>
                </div>
                <div className="flex justify-between px-1 py-[2px] bg-[#111117]">
                    <h4 className="text-[#79b0cc] font-(family-name:--fontSemiBold) text-(length:--h5size)">Sugerencias</h4>
                </div>
                <div>
                    {modelArrayM.map((category, i) => {
                        const categoryName = Object.keys(category)[0];

                        const options = category[categoryName];

                        return (
                            <div key={i}>
                                <button
                                    onClick={() => setSectionM(prev => prev === categoryName ? null : categoryName)}
                                    className="flex justify-between w-full px-1 text-white"
                                >
                                    <h3 className="font-bold font-(family-name:--fontSemiBold) text-(length:--h4size) text-white">{categoryName}</h3>
                                    <div className="relative w-[4vw] self-center">
                                        <span className="block">
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                        <span className={`absolute top-0 left-0 w-[4vw] lg:w-auto minus ${sectionM === categoryName && "active"}`}>
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                </button>
                                <div id={categoryName} className="h-0 overflow-hidden text-white">
                                    {options.map((option) => (
                                        <button
                                            className="w-full text-left my-[2px] font-(family-name:--fontNormal) text-(length:--h5size) px-2 text-white"
                                            onClick={() => changeClothesM(categoryName, option.img)}
                                            key={option.name}
                                        >
                                            {option.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            <div id="showcase" className="w-[50vw] h-full"
            >
                <div id="maniquiHe" className="h-full w-full relative content-center"
                    onClick={() => widthOpposite("He", "She")}
                >
                    <Image
                        src={maniqui}
                        alt=""
                        className="w-full h-auto lg:w-auto lg:h-full z-30"
                        loading="eager"
                    />

                    <Image
                        src={vestimentaM.Saco}
                        alt=""
                        className="w-full h-auto lg:w-auto lg:h-full absolute top-1/2 -translate-y-1/2 left-0 z-47"
                        loading="eager"
                    />
                    <Image
                        src={vestimentaM.Camisa}
                        alt=""
                        className="w-full h-auto lg:w-auto lg:h-full absolute top-1/2 -translate-y-1/2 left-0 z-44"
                        loading="eager"
                    />
                    <Image
                        src={vestimentaM.Pantalón}
                        alt=""
                        className="w-full h-auto lg:w-auto lg:h-full absolute top-1/2 -translate-y-1/2 left-0 z-45"
                        loading="eager"
                    />
                    {vestimentaM.Accesorios &&
                        <Image
                            src={vestimentaM.Accesorios}
                            alt=""
                            className="w-full h-auto lg:w-auto lg:h-full absolute top-1/2 -translate-y-1/2 left-0 z-46"
                            loading="eager"
                        />
                    }
                </div>
            </div>
        </div>
    )
}
