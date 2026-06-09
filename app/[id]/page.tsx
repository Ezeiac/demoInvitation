import Home from "../page"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const data = {
        church: true,
        guests: [
            {
                confirm: false,
                id: 999,
                lastname: "Invitado",
                name: "Pimero",
                room: 3,
                slug: "demo",
                state: "test",
                transfer: false
            },
            {
                confirm: false,
                id: 998,
                lastname: "Invitado",
                name: "Segundo",
                room: 3,
                slug: "demo",
                state: "test",
                transfer: false
            },
        ],
        id: 999,
        name: "demo",
        payment_coverage: 1,
        sleep: true,
    }

    if (!data) {
        return <div>Grupo no encontrado</div>
    }

    return <Home data={data} />
}
