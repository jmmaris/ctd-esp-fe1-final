import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import {render, waitFor} from "@testing-library/react";
import GrillaPersonajes from "../grilla-personajes.componente";
import ReactDOM from "react-dom";
import PaginaInicio from "../../../paginas/Inicio.pagina";

describe('Grilla Personaje Tests', () => {

    it('Se renderiza correctamente', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <MemoryRouter >
                    <GrillaPersonajes tipo="personajes"/>
                </MemoryRouter>
            </Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it ('Se renderiza sin Elementos', () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <GrillaPersonajes tipo="personajes"/>
                </MemoryRouter>
            </Provider>
        );
        expect(getByTestId('initialDiv')).toBeEmptyDOMElement();
    });

    it ('Use Effect de Incio Coloca el "Cargando..."', async () =>  {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    {/* Uso Pagina Inicio porque renderizarlo me dispara el useEffect */}
                    <PaginaInicio />  
                </MemoryRouter>
            </Provider>
        );
        await waitFor(() => expect(getByTestId('loadingDiv')).toBeInTheDocument(),{timeout:2000});
        }
    );

    it("Carga Original muestra 9 Personajes", async () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    {/* Uso Pagina Inicio porque renderizarlo me dispara el useEffect */}
                    <PaginaInicio />  
                </MemoryRouter>
            </Provider>
        );
        await waitFor(() => expect(getByTestId('paginaGrilla').children.length).toBe(9),{timeout:2000});
        }
    )
});