import { createServerSupabaseClient } from "@/app/lib/supabase/server"
import Home from "../page"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
        .from("slug")
        .select(`*,
            guests(*),
            comments(*)
            `)
        .eq("name", id)

    const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("public", true)
        .eq("approbed", true)

    if (error || !data?.length || !commentsData?.length) {
        return <div>Grupo no encontrado</div>
    }

    return <Home data={data[0]} commentsData={commentsData} />
}
