import { log } from "console";
import { personaRegistry } from "./persona-registry";
import { Persona } from "./types";

const DEFAULT_PERSONA_ID="hitesh-chaudhary";

export function getPersona(
    personaId:string=DEFAULT_PERSONA_ID
):Persona{
    const persona=personaRegistry[personaId];

    if(!persona){
        throw new Error(`Persona not found:${personaId}`);
    }

    return persona
}

const persona=getPersona();
console.log(persona.displayName);
console.log(persona.description)

const persona1=getPersona("ABABABABA");
console.log(persona1.displayName);
console.log(persona1.description)