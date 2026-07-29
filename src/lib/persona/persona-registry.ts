import { hiteshPersona } from "./hitesh/hitesh";
import { Persona } from "./types";

export const personaRegistry:Record<string,Persona>={
    [hiteshPersona.id]:hiteshPersona
}