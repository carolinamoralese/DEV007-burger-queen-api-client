// //HISTORIA DE USUARIO 6.
// //Ver listado de productos.
// // Agregar productos nuevos.
// // Eliminar productos en menu.
// // Actualizar datos de productos.
import React from "react";
import Inventario from "./Invetario";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("Inventario component", () => {
    it('renders product information correctly', () => {
    const productsMock = [
        {id: 1, name:'Producto 1', price: 10},
        {id: 2, name:'Producto 2', price: 20}
    ];
    render(<Inventario />);
    const productContainers = screen.getAllByTestId('product-container')
    expect(productContainers).toHaveLength(productsMock.length);
    productContainers.forEach((container, index) => {
        const product = productsMock[index];
        expect(container.querySelector('.productId')).toHaveTextContent(String(product.id));
        expect(container.querySelector('.productName')).toHaveTextContent(product.name);
        expect(container.querySelector('.productPrice')).toHaveTextContent(String(product.price));
    });
});
});





