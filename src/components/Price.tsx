'use client'
import '@/src/styles/invitation.css'
import Image from 'next/image';
import logoCasamiento from '../assets/images/hero/logoCasamiento.svg'
import { useEffect, useState } from 'react';
import { VideoProps } from './Invitation'

export const Price = ({
    id,
    data,
}: VideoProps) => {

    const [discount, setDiscount] = useState<number>(0)

    useEffect(() => {
        const guest = data.payment_coverage
        if (guest) {
            setDiscount(guest)
        }
    }, [data])

    return (
        <div
            id={id}
            className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center text-white px-6 pointer-events-auto py-2 invisible"
        >
            <div id='finalAnimation' className="flex flex-col items-center justify-center bg-[#111117]">
                <Image src={logoCasamiento} alt="Logo" className="max-w-[50vw] mb-4" />

                <div id='textFinalContainer' className='flex flex-col h-full justify-center bg-[#111117]'>
                    <div id='textFinal'>
                        <div id='textFinalInner'>
                            {discount < 1 ? (
                                <h3 className='uppercase text-center font-bold text-base/7'>
                                    Pre compra hasta el 1 de enero de 2002
                                </h3>
                            ) : (
                                <h3 className='uppercase text-center font-bold text-base/7'>
                                    Confirmar antes del 1 de enero de 2002
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};