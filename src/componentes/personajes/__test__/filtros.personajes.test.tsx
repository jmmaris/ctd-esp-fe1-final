import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { fireEvent, render, waitFor, screen} from "@testing-library/react";
import GrillaPersonajes from "../grilla-personajes.componente";
import Filtros from "../filtros.componente";
import PaginaInicio from "../../../paginas/Inicio.pagina";


describe('Filtro Personaje Tests', () => {

    it ('Filtro "Rick" devuelve 9 resultados', async  () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <PaginaInicio />
                </MemoryRouter>
            </Provider>
        );
        await waitFor(() => getByTestId("filtroNombreInput").setAttribute('value', 'Rick'),{timeout:2000});
        await waitFor(() => expect(getByTestId('paginaGrilla').children.length).toBe(9),{timeout:2000});
        }
    )
    
    it ('Filtro "Rick" devuelve 9 resultados', async  () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <PaginaInicio />
                </MemoryRouter>
            </Provider>
        );
        getByTestId('filtroNombreInput').setAttribute('value', 'Maestro Yoda');
        fireEvent.change(getByTestId('filtroNombreInput'));
        await waitFor(() => expect(getByTestId("errorDiv")).toBeInTheDocument(),{timeout:2000});
        }
    )

    it ('Filtro "Maestro Yoda" devuelve 0 resultados, Pero borrar todo devuelve los 9', async () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <PaginaInicio />
                </MemoryRouter>
            </Provider>
        );
        const input = getByTestId('filtroNombreInput');
        fireEvent.change(input, {target: {value: 'Maestro Yoda'}});
        await waitFor(() => expect(getByTestId("errorDiv")).toBeInTheDocument(),{timeout:2000});
        fireEvent.change(input, {target: {value: ''}});
        await waitFor(()=>expect(getByTestId("paginaGrilla").children.length).toBe(9),{timeout:2000});
    })

    it ('Filtro "Maestro Yoda" devuelve 0 resultados, Pero Click en Limpiar Filtros reincia y devuelve los 9', async () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <PaginaInicio />
                </MemoryRouter>
            </Provider>
        );
        const input = getByTestId('filtroNombreInput');
        fireEvent.change(input, {target: {value: 'Maestro Yoda'}});
        await waitFor(() => expect(getByTestId("errorDiv")).toBeInTheDocument(),{timeout:2000});
        fireEvent.click(getByTestId('botonEliminarFiltro'));
        await waitFor(()=> expect(input.getAttribute('value')).toBe(null),{timeout:2000});
        await waitFor(()=>expect(getByTestId("paginaGrilla").children.length).toBe(9),{timeout:2000});
    })
});
