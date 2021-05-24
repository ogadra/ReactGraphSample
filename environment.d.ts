declare global {
    namespace NodeJS {
        interface ProcessEnv {
            RESAS_API: string
        }
    }
}

export {}
