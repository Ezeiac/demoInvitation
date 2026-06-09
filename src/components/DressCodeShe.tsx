"use client"

import { useEffect, useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"
import minus from "@/src/assets/images/dress/minus.png"

import maniqui from "@/src/assets/images/dress/ella.png"

import blLunPant from "@/src/assets/images/dress/she/blLunPant.png"
import blPant from "@/src/assets/images/dress/she/blPant.png"
import blTs from "@/src/assets/images/dress/she/blTs.png"
import blueDress from "@/src/assets/images/dress/she/blueDress.png"
import bluePant from "@/src/assets/images/dress/she/bluePant.png"
import blueTs from "@/src/assets/images/dress/she/blueTs.png"
import greenDress from "@/src/assets/images/dress/she/greenDress.png"
import ltBlTs from "@/src/assets/images/dress/she/ltBlTs.png"
import ltCrPant from "@/src/assets/images/dress/she/ltCrPant.png"
import ltBlPant from "@/src/assets/images/dress/she/ltBlPant.png"

import '@/src/styles/invitation.css'

interface Option {
    name: string,
    img: StaticImageData | string | null
}

interface Category {
    [key: string]: Option[];
}

interface VestimentaF {
    Vestido: StaticImageData | null | string;
    Blusa: StaticImageData | string;
    Pantalón: StaticImageData | string;
}

interface DressProps {
    widthOpposite: (idSelected: string, idNoSelected: string) => void
}

export const DressCodeShe = ({
    widthOpposite
}: DressProps) => {

    const modelArrayF: Category[] = [
        {
            Vestido: [
                { name: "Vestido verde", img: greenDress },
                { name: "Vestido azul", img: blueDress }
            ]
        },
        {
            Blusa:
                [
                    { name: "Blusa azul", img: blueTs },
                    { name: "Blusa verde", img: ltBlTs },
                    { name: "Blusa negra", img: blTs }
                ],
        },
        {
            Pantalón: [
                { name: "Pantalón azul", img: bluePant },
                { name: "Pantalón verde", img: ltBlPant },
                { name: "Pantalón crema", img: ltCrPant },
                { name: "Pantalón negro", img: blLunPant },
                { name: "Pantalón negro liso", img: blPant }
            ]
        },
    ];

    const [vestimentaF, setVestimentaF] = useState<VestimentaF>({
        Vestido: null,
        Blusa: ltBlTs,
        Pantalón: ltBlPant,
    })

    const [sectionF, setSectionF] = useState<string | null>()

    useEffect(() => {
        modelArrayF.forEach(e => {
            const id = Object.keys(e)[0]

            if (sectionF === id) {
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

    }, [sectionF])

    const changeClothesF = (key: string, value: StaticImageData | null | string) => {
        if (key === "Vestido") {
            setVestimentaF(prev => ({
                ...prev, [key]: value
            }))
        } else {
            setVestimentaF(prev => ({
                ...prev,
                [key]: value,
                Vestido: null
            }))
        }
    }

    return (
        <div id="dresscodeShe" className='content-center w-full align-self-center '>
            <div id="selectorShe" className="absolute w-1/2 lg:w-1/5 right-[32px] lg:right-1/4 top-1/4 border z-60 bg-[#00000090] opacity-0 invisible">
                <div className="text-center dressSelector px-1 py-2">
                    <h3 className="font-bold font-(family-name:--fontBold) text-(length:--h5size)">Formal sport</h3>
                </div>
                <div className="flex justify-between px-1 py-[2px]">
                    <h4 className="text-[#79b0cc] font-(family-name:--fontSemiBold) text-(length:--psize)">Sugerencias</h4>
                </div>
                <div>
                    {modelArrayF.map((category, i) => {
                        const categoryName = Object.keys(category)[0];

                        const options = category[categoryName];

                        return (
                            <div key={i}>
                                <button
                                    onClick={() => setSectionF(prev => prev === categoryName ? null : categoryName)}
                                    className="flex justify-between w-full px-1 text-white"
                                >
                                    <h3 className="font-bold font-(family-name:--fontSemiBold) text-(length:--psize)">{categoryName}</h3>
                                    <div className="relative w-[4vw] self-center">
                                        <span className="block w-[4vw] max-w-6">
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                        <span className={`absolute top-0 left-0 w-[4vw] max-w-6 lg:w-auto minus ${sectionF === categoryName && "active"}`}>
                                            <Image
                                                src={minus}
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                </button>
                                <div id={categoryName} className="h-0 overflow-hidden">
                                    {options.map((option) => (
                                        <button
                                            className="w-full text-left my-[2px] text-white font-(family-name:--fontNormal) text-(length:--psize) px-2"
                                            onClick={() => changeClothesF(categoryName, option.img)}
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

            <div id="showcase" className="w-full h-full lg:h-auto flex justify-end"

            >
                <div id="maniquiShe" className="h-full w-full lg:w-1/2 relative content-center max-w-500 lg:h-1/2"
                    onClick={() => widthOpposite("She", "He")}
                >
                    <Image
                        src={maniqui}
                        alt=""
                        className="w-full h-auto lg:w-auto lg:h-full z-30"
                        loading="eager"
                    />

                    {!vestimentaF.Vestido &&
                        <>
                            <Image
                                src={vestimentaF.Blusa}
                                alt=""
                                className="w-full h-auto lg:w-auto lg:h-full absolute top-1/2 -translate-y-1/2 left-0 z-41"
                                loading="eager"
                            />
                            <Image
                                src={vestimentaF.Pantalón}
                                alt=""
                                className="w-full h-auto lg:w-auto lg:h-full absolute  top-1/2 -translate-y-1/2 left-0 z-43"
                                loading="eager"
                            />
                        </>
                    }
                    {vestimentaF.Vestido &&
                        <Image
                            src={vestimentaF.Vestido}
                            alt=""
                            className="w-full h-auto lg:w-auto lg:h-full absolute  top-1/2 -translate-y-1/2 left-0 z-42"
                            loading="eager"
                        />
                    }

                </div>
            </div>
        </div>
    )
}
