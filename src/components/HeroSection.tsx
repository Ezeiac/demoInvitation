import Image from 'next/image'
import backHero from '../assets/images/hero/backHero.webp'
import frontHero from '../assets/images/hero/frontHero.webp'
import textHero from '../assets/images/hero/logoHero.svg'
import logoCasamiento from '../assets/images/hero/logoCasamiento.svg'
import '@/src/styles/invitation.css'

interface HeroProps {
    id: string;
}

export const HeroSection = ({ id }: HeroProps) => {

    return (
        <div id={id} className="fixed top-0 left-0 w-full h-lvh z-30 pointer-events-none">
            <div className="relative w-full h-lvh overflow-hidden">
                <div id="heroMask" className="absolute inset-0 z-30 pointer-events-none h-lvh">
                    <picture id='heroComplete' className='flex h-dvh w-vw object-cover justify-center relative'>
                        <Image id='backHero' src={backHero} alt="" className='h-dvh w-auto object-cover z-21 scale-140 ' />
                        <Image id='frontHero' src={frontHero} alt="" className='h-dvh w-auto absolute bottom-0 left-0 object-cover z-23 origin-bottom scale-120' />
                        <Image src={textHero} alt="" className='absolute z-22 top-1/3 -translate-y-1/2 -translate-1/10 w-[80vw] max-h-1/4' loading='eager' id='imgTextHero' />
                    </picture>
                </div>

                <div id='dateLogo' className="absolute inset-0 z-20 opacity-0 flex flex-col items-center justify-center text-white">
                    <div className='relative w-full flex flex-col items-center'>

                        <Image
                            id='logoDate'
                            src={logoCasamiento}
                            alt="Logo"
                            className="w-[60vw] max-w-[700px] block mx-auto"
                        />
                        <h3 className='uppercase absolute z-2 text-center font-bold w-full top-[110%]'>
                            Disponible<br />el 1 de enero<br />de 2001
                        </h3>
                    </div>
                </div>

            </div>
        </div>
    )
}