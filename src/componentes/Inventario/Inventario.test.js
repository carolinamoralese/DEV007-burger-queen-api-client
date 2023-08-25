// //HISTORIA DE USUARIO 6.
// //Ver listado de productos.
// // Agregar productos nuevos.
// // Eliminar productos en menu.
// // Actualizar datos de productos.
import React from "react";
import Inventario from "./Invetario";
import { render, screen, /*fireEvent*/ } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(() => ({
      pathname: '',
    })),
  }));

describe("Inventario component", () => {
    it('renders product information correctly', () => {
    const productsMock = [
        {id: 1, name:'Producto 1', price: 10},
        {id: 2, name:'Producto 2', price: 20}
    ];

    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    render(
    <BrowserRouter>
    <Inventario />
    </BrowserRouter>
    );

    /* const productContainers = screen.getAllByTestId('product-container')
    expect(productContainers).toHaveLength(productsMock.length);

    productContainers.forEach((container, index) => {
        const product = productsMock[index];
        const containerWithinModal = within(container);
        
        expect(containerWithinModal.getByText(String(product.id))).toBeInTheDocument();
        expect(containerWithinModal.getByText(product.name)).toBeInTheDocument();
        expect(containerWithinModal.getByText(String(product.price))).toBeInTheDocument(); */

    const productContainers = screen.getAllByTestId('product-container');
    productContainers.forEach((container, index) => {
    const product = productsMock[index];

  // Usa within para acceder a los elementos dentro del contenedor
    const containerWithin = within(container);

    expect(containerWithin.getByText(String(product.id))).toBeInTheDocument();
    expect(containerWithin.getByText(product.name)).toBeInTheDocument();
    expect(containerWithin.getByText(String(product.price))).toBeInTheDocument();
    });
});
});


describe('Inventario component', () => {
    it('renders product information correctly', async () => {
      // Crear un mock de productos
      const productsMock = [
        { id: 1, name: 'Producto 1', price: 10 },
        { id: 2, name: 'Producto 2', price: 20 },
      ];
  

    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);
      // Mockear la función getProducts para devolver los productos mockeados
      jest.spyOn(API, 'getProducts').mockResolvedValue(productsMock);
  
      // Renderizar el componente
      render(
        <BrowserRouter>
        <Inventario />
        </BrowserRouter>
      );
  
      // Esperar a que los productos se carguen (esto dependerá de cómo se realiza la carga en la función useEffect)
      await screen.findAllByTestId('product-container');
  
      // Verificar que los productos se renderizan correctamente en el DOM
      productsMock.forEach((product) => {
        expect(screen.getByText(String(product.id))).toBeInTheDocument();
        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(String(product.price))).toBeInTheDocument();
      });
    });
  });



