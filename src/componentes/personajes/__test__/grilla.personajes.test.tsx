import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import {render} from "@testing-library/react";
import GrillaPersonajes from "../grilla-personajes.componente";
import ReactDOM from "react-dom";
import { TIMEOUT } from "dns";

describe('Grilla Personaje Tests', () => {
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

    it("Carga Original muestra 9 Personajes", () => {
        const {getByTestId }= render(
            <Provider store={store}>
                <MemoryRouter >
                    <GrillaPersonajes tipo="personajes"/>   
                </MemoryRouter>
            </Provider>
        );  
        // console.log(getByTestId("paginaGrilla"));
        setTimeout(
            () => {
                expect(getByTestId("paginaGrilla").children.length).toBe(9);
            },3000)
        }
    )
});