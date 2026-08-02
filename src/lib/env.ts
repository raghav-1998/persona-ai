//all environment validation is centralized.

function getEnv(name:string):string{
    const value=process.env[name]

    if(!value){
        throw new Error(`Missing environment variable:${name}`)
    }

    return value
}

export const env={
    OPENAI_API_KEY:getEnv("OPENAI_API_KEY")
}