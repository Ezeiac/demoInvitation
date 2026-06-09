import { guestsObj } from '@/app/page'

export const myAnswer = (newValue: boolean | null, prev: guestsObj[], id: number, key: string) => {

    let copy = [...prev]
    let index = copy.findIndex(i => i.id === id)

    if (index !== -1) {
        copy[index] = {
            ...copy[index],
            [key]: newValue
        }
    }

    return copy

}