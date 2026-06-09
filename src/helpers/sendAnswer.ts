import { createBrowserSupabaseClient } from "@/app/lib/supabase/client";
import { guestsObj } from "@/app/page";


export const sendChanges = async (guest: guestsObj[]) => {

    const supabase = createBrowserSupabaseClient();

    const { data, error } = await supabase
        .from('guests')
        .upsert(guest)
        .select()

    if (error) {
        console.log(error.message)
    } else {
        alert("¡Gracias por confirmar!");
    }


}