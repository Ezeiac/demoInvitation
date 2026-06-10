'use client'
import '@/src/styles/invitation.css'
import { useEffect, useState } from 'react';
import { VideoProps } from '@/src/components/Invitation';
import { guestsObj } from '@/app/page'
import { AnswerComponent } from './AnswerComponent';

export const FooterConfirm = ({
    id,
    data,
}: VideoProps) => {

    const [dataGuest, setDataGuest] = useState<guestsObj[]>([])
    const [discount, setDiscount] = useState<number>(0)
    const [price, setPrice] = useState<string | null>(null)
    const [confirmated, setConfirmated] = useState<boolean>(false)

    const priceTarj = 160000

    useEffect(() => {
        const guest = data.payment_coverage
        setDataGuest(data.guests)
        if (guest) {
            setDiscount(guest)
        }
    }, [data])

    useEffect(() => {
        const priceSet = new Intl.NumberFormat('es-ES').format(priceTarj - priceTarj * (discount || 0))
        setPrice(priceSet)
    }, [priceTarj])

    return (
        <div
            className="px-6 pointer-events-auto py-2 justify-items-center absolute bottom-0 w-full bg-[#111117] h-[45dvh] content-center"
        >
            <div id={id} className="flex flex-col w-full max-w-120 max-h-[45dvh] bg-white/5 px-4 pt-4 rounded-xl backdrop-blur-sm opacity-0 invisible">
                <p className="flex-none text-white pb-4 font-bold text-center uppercase tracking-wider text-(length:--h5size)">
                    Confirmar asistencia
                </p>

                <div
                    className="flex-1 overflow-y-auto min-h-0 py-2 border-y border-white/10 custom-scrollbar lg:px-4"
                    data-lenis-prevent
                >
                    {dataGuest?.map(g => (
                        <div key={g.id} className="mb-5 last:mb-0 flex justify-between">
                            <h4 className="py-2 text-white text-(length:--h5size)">{g.name} {g.lastname}</h4>
                            <AnswerComponent
                                id={g.id}
                                setDataGuest={setDataGuest}
                                confirm={g.confirm}
                                status={"confirm"}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex-none py-4 text-white">

                    <button
                        className="w-full py-3 bg-[#960696] text-white font-bold rounded-lg uppercase hover:bg-[#570457] transition-colors"
                        onClick={() => {
                            setConfirmated(prev => !prev)
                            setTimeout(() => {
                                setDataGuest(status =>
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
    );
};