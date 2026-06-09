'use client'
import '@/src/styles/invitation.css'
import menu from "@/src/assets/images/menu/maps.png"
import { ArrayElements } from '@/app/page'
import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';

interface MenuProps {
    data: ArrayElements;
    handleCloseComment: () => void;
}

export const NewComment = ({
    data
}: MenuProps) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [qChar, setQChar] = useState<number | null>(0)

    const handleHeight = () => {
        const textArea = textAreaRef.current
        if (textArea) {
            textArea.style.height = "56px";
            textArea.style.height = `${textArea.scrollHeight}px`
        }

        const qCharacters = textAreaRef.current?.textLength
        if (qCharacters) setQChar(qCharacters)
    }

    return (
        <div
            className="fixed top-0 left-0 flex flex-row w-full items-center h-lvh bg-green-800 overflow-x-scroll overflow-y-hidden shrink-0 p-[5lvh] opacity-0 invisible pointer-events-auto z-80"
            id="newComment"
        >
            <div
                className="flex flex-col w-full items-center shrink-0 px-[3lvh] mt-[5lvh] pointer-events-auto z-60 justify-between"
            >
                <div className="w-full relative">
                    <textarea
                        id="userComment"
                        maxLength={130}
                        ref={textAreaRef}
                        onInput={() => {
                            handleHeight()

                        }}
                        placeholder="Comentario"
                        className='w-full h-[56px] resize-none overflow-hidden flex mt-4 rounded-full py-4 px-8 border justify-center text-[16px]'
                    />
                    <p className="absolute right-[calc(3vw+10px)] top-full z-9">{qChar}/130</p>
                </div>
                <div className='flex w-full'>
                    <div className="w-1/2 relative">
                        <textarea
                            id="userComment"
                            maxLength={130}
                            ref={textAreaRef}
                            onInput={() => {
                                handleHeight()

                            }}
                            placeholder="Comentario"
                            className='w-full h-[56px] resize-none overflow-hidden flex mt-4 rounded-full py-4 px-8 border justify-center text-[16px]'
                        />
                        <p className="absolute right-[calc(3vw+10px)] top-full z-9">{qChar}/130</p>
                    </div>
                    <a
                        onClick={() => {
                        }
                        }
                        href="#carousel"
                    >
                        <button
                            className=" mt-4 rounded-full bg-white px-8 py-4 text-black justify-center mt-5 font-bold"
                        >
                            Enviar
                        </button>
                    </a>
                </div>
            </div >
        </div >
    )
};