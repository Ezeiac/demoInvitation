import { ArrayElements, ObjText } from "@/app/page";
import { useEffect, useState } from "react";

interface Props {
    id: string,
    data: ArrayElements

}

export const TextLayer = ({ id, data }: Props) => {

    const [subText, setSubText] = useState<ObjText>({ sub: "", text: "" })

    useEffect(() => {
        if (!data) return

        if (id === "Yani" && data.yani) {
            setSubText(data.yani)
        } else if (id === "Leo" && data.leo) {
            setSubText(data.leo)
        }

    }, [data])

    return (
        <div
            id={id}
            className="w-full h-lvh content-end nameNovios -scroll-mt-[50px]"
        >
            <div className="drop-shadow-2xl px-8">
                <h4 className="text-blue-400 tracking-[0.4em] text-(length:--h3size)">
                    {subText.sub ? subText.sub : id === "Yani" ? "La novia" : "El novio"}
                </h4>
                <h2 className="font-black italic uppercase leading-none text-[length:clamp(10lvh,7vw,80px)]">{id}</h2>
                <p className="text-gray-200 font-light leading-relaxed text-(length:--h4size)">{subText.text ? subText.text : id === "Yani" ? "El carisma en persona. Siempre disponible para lo que necesites." : "Un loco lindo que siempre se prende a todas."}</p>
            </div>
        </div>
    );
};