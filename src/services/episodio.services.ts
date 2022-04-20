import { RespuestaEpisodio } from "../types/respuesta.type";

export const getEpisode = async (episodios:string) : Promise<RespuestaEpisodio[]> => {    
    return await fetch(`https://rickandmortyapi.com/api/episode/${episodios}`
    ).then((data) => data.json());
  };