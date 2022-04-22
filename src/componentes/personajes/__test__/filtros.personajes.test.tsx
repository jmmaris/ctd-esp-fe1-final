import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { render} from "@testing-library/react";
import GrillaPersonajes from "../grilla-personajes.componente";
import Filtros from "../filtros.componente";


describe('Filtro Personaje Tests', () => {

    it ('Filtro "Rick" devuelve 9 resultados', () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <Filtros inputRef={React.createRef()}/>
                    <GrillaPersonajes tipo="personajes"/>
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            getByTestId("filtroNombreInput").setAttribute('value', 'Rick');
            expect(getByTestId("paginaGrilla")).toHaveLength(9);
        },3000);
        }
    )
    
    it ('Filtro "Maestro Yoda" devuelve 0 resultados', () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <Filtros inputRef={React.createRef()}/>
                    <GrillaPersonajes tipo="personajes"/>
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            getByTestId("filtroNombreInput").setAttribute('value', 'Maestro Yoda');
            // expet that errorDiv is displayed
            expect(getByTestId("malala")).toBeInTheDocument();
            // expect(getByTestId("loadingDiv")).toBeTruthy();
        },3000);
        }
    )
    it ('Filtro "Maestro Yoda" devuelve 0 resultados, Pero borrar todo devuelve los 9', () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <Filtros inputRef={React.createRef()}/>
                    <GrillaPersonajes tipo="personajes"/>
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            getByTestId("filtroNombreInput").setAttribute('value', 'Maestro Yoda');
            const lenDeResultados = getByTestId("paginaGrilla").children.length;
            getByTestId("filtroNombreInput").setAttribute('value', '');
            expect(lenDeResultados).toBe(0);
            expect(getByTestId("paginaGrilla")).toHaveLength(9);
        },3000);
        }
    )
});
