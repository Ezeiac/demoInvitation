import '@/src/styles/invitation.css'

export const Intro = () => {
    return (
        <div
            id='containerTextOrg'
            className="absolute h-lvh inset-0 z-10 opacity-0 flex flex-col items-center justify-center overflow-hidden"
        >
            <div id='textOrg' className='flex flex-col h-[110lvh] justify-center scale-115 mx-4'>
                <div id='textOrgInner'>
                    <h2 className='text-(length:--h1size)'>Madrid,<br />España</h2>
                    <p className='w-full mt-6 text-(length:--h3size)'>
                        Yami y Lucas siempre supieron que la vida podía sorprenderlos, pero mientras organizaban su gran día, los imprevistos no tardaron en aparecer. Entre risas, abrazos y momentos inesperados, se han apoyado el uno en el otro más que nunca… y ahora quieren que tú seas parte de esta aventura única, para celebrar juntos el amor que los une y que hace que cada instante valga la pena.
                    </p>
                </div>
            </div>
        </div>
    )
}