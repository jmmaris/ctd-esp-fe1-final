import Personaje from "./personaje.type";

// Pagina hace referencia a la Pagina de 9 personajes que se muestra en la pantalla.
// Los 9 personajes que se filtran, es producto usar la funcion paginarRespuesta sobre la respuesta de la API.
// TODO: Implementar Map<number, Personaje[]> Y corregir en los componentes y funciones que apliquen.
interface Pagina {
    id: number;
    personajesEnPagina: Personaje[];
}

export default Pagina;