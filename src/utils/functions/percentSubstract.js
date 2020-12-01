export const percentSubstract = (value, percent) => {
    return Math.round(value * (1 - percent / 100))
}