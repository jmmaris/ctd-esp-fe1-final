import React from "react";
import ReactDOM  from "react-dom";
import Personaje from "../../../types/personaje.type";
import TarjetaPersonaje from "../tarjeta-personaje.componente";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {render, fireEvent} from "@testing-library/react";
import { store } from "../../../store/store";


describe('Tarjeta Personaje Tests', () => {
    const div:HTMLDivElement = document.createElement("div");
    
    const personajeMock:Personaje = {
        id: 1,
        name: "Rick Sanchez Mock Waba Daba Dub Dub",
        image: "https://rickandmortyapi.com/api/character/avatar/361.jpeg"
    }
    it("Renderiza el Componente", () => {
        ReactDOM.render(
            <Provider store={store}>
                <MemoryRouter >
                    <TarjetaPersonaje personaje={personajeMock}/>   
                </MemoryRouter>
            </Provider>
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("Favoritos Carga En Falso", () => {
        const {getByTestId }= render( 
            <Provider store={store}>
                <MemoryRouter >
                    <TarjetaPersonaje personaje={personajeMock}/>   
                </MemoryRouter>
            </Provider>
        );
        const originalSrc = getByTestId('FavStarImg').getAttribute('src');
        expect(originalSrc).toBe('/imagenes/star.png');
    });
    it("Click en Favoritos Cambia el Source de Imagen", () => {
        const {getByTestId }= render( 
            <Provider store={store}>
                <MemoryRouter >
                    <TarjetaPersonaje personaje={personajeMock}/>   
                </MemoryRouter>
            </Provider>
        );
        fireEvent.click(getByTestId('FavStarImg'));
        expect(getByTestId('FavStarImg').getAttribute('src')).toBe('/imagenes/star-filled.png');
    });
    it('Carga la imagen correctamente', () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <TarjetaPersonaje personaje={personajeMock}/>
                </MemoryRouter>
            </Provider>
        );
        expect(getByTestId('PersonajeImg').getAttribute('src')).toBe(personajeMock.image);
    });
}
)