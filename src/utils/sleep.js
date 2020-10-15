export const sleep = ms => {
    return new Promise((resolve, rej) => {
        setTimeout(() => resolve(1), ms);
    })
}