import React from "react";
import ReactDOM  from "react-dom";
import Personaje from "../../../types/personaje.type";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {render, fireEvent,screen, waitFor} from "@testing-library/react";
import { store } from "../../../store/store";
import Paginacion from "../paginacion.componente";
import PaginaInicio from "../../../paginas/Inicio.pagina";
import Pagina from "../../../types/pagina.type";

describe('Paginacion Tests', () => {
    beforeEach(() => {
        store.getState().pagina.personajes = 0;
    });
    it('Renderiza el Componente', () => {
        const div:HTMLDivElement = document.createElement("div");
        ReactDOM.render(
            <Provider store={store}>
                <MemoryRouter >
                    <Paginacion tipo="personajes"/>  
                </MemoryRouter>
            </Provider>
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('Click en Siguiente avanza de Pagina', async () => {
        const div:HTMLDivElement = document.createElement("div");
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <PaginaInicio />
                </MemoryRouter>
            </Provider>
        );
        const pagina = store.getState().pagina.personajes;
        expect(pagina).toBe(0); // Valido que la pagina inicial sea 0
        await waitFor(async () => {
            // Espero que Renderice los 9 primeros personajes
            expect(store.getState().personajes.personajesPaginas).not.toBe([]);
            // Guardo los Personajes en una Variable
            const charsInPage = store.getState().personajes.personajesPaginas.find(pag => pag.id === 0)?.personajesEnPagina;
            // Clickeo en Siguiente
            fireEvent.click(screen.getAllByText("Siguiente")[0])
            // Verifico que la pagina cambie
            expect(store.getState().pagina.personajes).toBe(pagina + 1);
            const pagNumActualizada = store.getState().pagina.personajes; 
            await waitFor(() => {  
                // Verifico que los personajes de la pagina siguiente no sean los mismos que los guardados en la variable
                expect(charsInPage).not.toBe(store.getState().personajes.personajesPaginas.find(pag => pag.id === pagNumActualizada)?.personajesEnPagina);
            });

        },{timeout:5000});
    });
    it('Click en Anterior disminuye de Pagina', async () => {
        const div:HTMLDivElement = document.createElement("div");
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <PaginaInicio />
                </MemoryRouter>
            </Provider>
        );
        const pagina = store.getState().pagina.personajes;
        expect(pagina).toBe(0); // Valido que la pagina inicial sea 0
        await waitFor(async () => {
            // Espero que Renderice los 9 primeros personajes
            expect(store.getState().personajes.personajesPaginas).not.toBe([]);
            // Guardo los Personajes en una Variable
            const charsInPage = store.getState().personajes.personajesPaginas.find(pag => pag.id === pagina)?.personajesEnPagina;
            // Clickeo en Siguiente
            fireEvent.click(screen.getAllByText("Siguiente")[0])
            // Verifico que la pagina cambie
            expect(store.getState().pagina.personajes).toBe(pagina + 1);
            const pagNumActualizada = store.getState().pagina.personajes; 
            await waitFor(() => {  
                // Verifico que los personajes de la pagina siguiente no sean los mismos que los guardados en la variable
                expect(charsInPage).not.toBe(store.getState().personajes.personajesPaginas.find(pag => pag.id === pagNumActualizada)?.personajesEnPagina);
                // Clickeo en Anterior
                fireEvent.click(screen.getAllByText("Anterior")[0])
                // Verifico que la pagina cambie
                expect(store.getState().pagina.personajes).toBe(pagNumActualizada - 1);
                const pagNumReseteada = store.getState().pagina.personajes; 
                // Valido Que sean los mismos que la original
                expect(charsInPage).toBe(store.getState().personajes.personajesPaginas.find(pag => pag.id === pagNumReseteada)?.personajesEnPagina);
                
            });

        },{timeout:5000});
    });

});