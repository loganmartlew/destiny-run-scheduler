export default interface DbUser {
    ref,
    ts: number,
    data: {
        name: string,
        email: string,
    }
}