"use client"

import { useState } from "react"
import { gsap } from 'gsap'
import Image, { StaticImageData } from "next/image"

import iconManiqui from "@/src/assets/images/dress/iconManiqui.svg"
import fondo from "@/src/assets/images/dress/fondoSalon.png"
import fondoComp from "@/src/assets/images/dress/fondoCompleto.png"

import '@/src/styles/invitation.css'
import { DressCodeHe } from "./DressCodeHe"
import { DressCodeShe } from "./DressCodeShe"

interface selectedOrNot {
    [key: string]: string | null;
}

export const DressCode = () => {

    const [maniquiSelect, setManiquiSelect] = useState<selectedOrNot>({ selected: null, noSelected: null })

    const widthOpposite = (idSelected: string, idNoSelected: string) => {

        const mask = `linear-gradient(to right, black 20%, transparent 75%), linear-gradient(to bottom, transparent, black 70%, black 0%, transparent 100%)`
        const tl = gsap.timeline({ ease: "power2.out" })

        tl
            .to(`#maniqui${idNoSelected}, #selector${idNoSelected}`, {
                autoAlpha: 0,
                duration: 0.2,
            })
            .to(`#maniquiHe`, {
                x: "-100%",
                duration: 0.3,
            })
            .to(`#maniqui${idNoSelected}`, {
                display: "none"
            }, "<")
            .to("#salonBack", {
                maskImage: mask,
                WebkitMaskImage: mask,
                WebkitMaskComposite: 'source-in',
                autoAlpha: 1,
                duration: 1,
            }, "<")
            .to(`#selector${idSelected}`, {
                autoAlpha: 1,
                duration: 3,
            }, "-=0.3")
            .to("#iconChange", {
                autoAlpha: 1
            })

        setManiquiSelect({
            selected: idSelected,
            noSelected: idNoSelected
        })

    }

    const changeManiqui = (hiManiqui: string | null, byeManiqui: string | null) => {

        const tl = gsap.timeline({ ease: "power2.out" })

        tl
            .to(`#maniqui${byeManiqui}, #selector${byeManiqui}`, {
                autoAlpha: 0,
                duration: 0.5,
            })
            .to(`#maniqui${byeManiqui}, #selector${byeManiqui}`, {
                display: "none",
            })
            .to(`#maniqui${hiManiqui}, #selector${hiManiqui}`, {
                display: "block"
            }, "<")
            .to(`#maniqui${hiManiqui}, #selector${hiManiqui}`, {
                autoAlpha: 1,
                duration: 0.5,
            }, "<")

        setManiquiSelect({
            selected: hiManiqui,
            noSelected: byeManiqui
        })
    }


    return (
        <div id="dresscode" className='overflow-hidden h-lvh lg:h-auto w-vw flex flex-col relative lg:mt-[10lvh]'>
            <h2 className='text-center text-white font-(family-name:--fontBold) text-(length:--h1size) tracking-[-.04em] px-8'>
                Código de vestimenta
            </h2>
            <h4 className='text-center text-white font-(family-name:--fontBold) text-(length:--h2size)'>
                Formal sport
            </h4>
            <div className="w-full relative h-full flex content-center overflow-hidden">
                < div id="iconChange" className="absolute bottom-10 right-[32px] lg:right-1/4 text-center z-39 opacity-0 invisible">
                    <div onClick={() => changeManiqui(maniquiSelect.noSelected, maniquiSelect.selected)}
                    >
                        <Image
                            src={iconManiqui}
                            alt=""
                            className="w-[clamp(40px,15vw,80px)]"
                        />

                    </div>
                </div>
                <div
                    id="salonBack"
                    className="w-[100vw] lg:hidden absolute bottom-1/2 translate-y-2/5 left-0 lg:h-full w-full -z-1 opacity-0 invisible"
                >
                    <Image
                        src={fondo}
                        alt=""
                        className="inset-0 h-auto w-full z-30 object-contain"
                        loading="eager"

                    />
                </div>
                <div
                    id="salonBack"
                    className="w-[80vw] hidden lg:block absolute bottom-0 left-0 lg:h-auto w-full -z-1 opacity-0 invisible"
                >
                    <Image
                        src={fondoComp}
                        alt=""
                        className="inset-0 z-30 h-auto w-full object-contain"
                        loading="eager"

                    />
                </div>
                <DressCodeShe
                    widthOpposite={widthOpposite}
                />
                <DressCodeHe
                    widthOpposite={widthOpposite}
                />
            </div>
        </div >
    )
}
