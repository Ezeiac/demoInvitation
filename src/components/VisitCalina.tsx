import Image from 'next/image';
import logoCalina from '../assets/images/salon/salonCalina.svg'
import '@/src/styles/invitation.css'
import { VideoSection } from './VideoSection';
import { Itinerary } from './Itinerary';
import { ArrayElements } from '@/app/page'

interface VideoProps {
    id: string;
    progressRef: React.MutableRefObject<{ t: number }>;
    duration: number;
    video: string;
    handleInfoSalon: () => void;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    isDesktop?: boolean | null;
    data: ArrayElements;
}

export const VisitCalina = ({
    id,
    progressRef,
    duration,
    video,
    handleInfoSalon,
    setOpenMenu,
    isDesktop,
    data
}: VideoProps) => {

    return (
        <div
            id={id}
            className="flex flex-col justify-center items-center relative -scroll-mt-[5lvh]"
        >
            <div className='z-11'>
                <div className='flex flex-col items-center justify-end h-[75lvh] lg:h-[100lvh]'>
                    <div className='px-[10vw] justify-self-center'>
                        <Image
                            src={logoCalina}
                            alt=""
                            className='logoCalina h-fit'
                        />
                    </div>
                    <div className='bg-white w-[clamp(300px,90vw,600px)] ratio-4/3 p-2 mt-5 relative]'>
                        <VideoSection
                            id="videoCalina"
                            progressRef={progressRef}
                            videoUrl={`/videos/${isDesktop ? "desktop" : "mobile"}/videoCalina.mp4`}
                            duration={duration}
                            mode="inline"
                        />

                    </div>
                </div>
                <div id='photoSalon' className="pointer-events-auto flex flex-col items-center justify-between h-[120lvh] lg:h-auto">
                    <button
                        className='flex mt-4 rounded-full bg-white px-8 py-4 text-black justify-center mt-5 font-bold text-(length:--h5size)'
                        onClick={() => {
                            handleInfoSalon();
                            setOpenMenu(false);
                        }}
                    >
                        Descubre la finca
                    </button>
                    <Itinerary
                        data={data}
                    />
                </div>
            </div>
        </div>
    )
};