import React from 'react'
import { guestsObj } from '@/app/page'
import { myAnswer } from '@/src/helpers/useAnsGuest'

type statusAnswer = {
    id: number
    setDataGuest: React.Dispatch<React.SetStateAction<guestsObj[]>>
    confirm: boolean
    status: string
}

export const AnswerComponent = ({
    id,
    setDataGuest,
    confirm,
    status
}: statusAnswer) => {

    const handleAnswer = (newValue: boolean | null) => {
        setDataGuest(prev => myAnswer(newValue, prev, id, status))
    }

    if (status === "confirm") {
        return (
            <div className='flex justify-around items-center'>
                <button onClick={() => handleAnswer(true)} className={`p-1 lg:px-4 lg:py-3 text-[#ffffff66] min-w-[80px] rounded-full transition-all duration-1000 ${confirm ? 'choose bg-[#960696] text-white font-bold' : ''} mx-2`}>Voy</button>
                <button onClick={() => handleAnswer(false)} className={`p-1 lg:px-4 lg:py-3 text-[#ffffff66] min-w-[80px] rounded-full transition-all duration-1000 ${!confirm && confirm != null ? 'choose bg-[#960696] text-white font-bold' : ''}`}>No voy</button>
            </div>
        )
    }
    if (status === "transfer") {
        return (
            <div className='flex justify-around items-center'>
                <button onClick={() => handleAnswer(!confirm)} className={`py-1 px-2 lg:px-4 lg:py-3 text-[#ffffff66] min-w-[80px] rounded-full transition-all duration-1000 ${confirm ? 'choose bg-[#960696] text-white font-bold' : ''}`}>{confirm ? "Solicitado" : "No solicitado"}</button>
            </div>
        )
    }
}