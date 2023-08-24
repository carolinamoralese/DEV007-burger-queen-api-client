// //Anotar nombre de clientx.-ok
// // Agregar productos al pedido.-ok
// // Eliminar productos.
// // Ver resumen y el total de la compra.-ok
// // Enviar pedido a cocina (guardar en alguna base de datos).
import React from "react";
import Comanda from "./Comanda";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

const mockOnMount = jest.fn();

// Crea una orden ficticia para pasar al componente
const mockOrder = {
  productos: [
    { id: 1, name: "Producto 1", quantity: 2, price: 10 },
    { id: 2, name: "Producto 2", quantity: 3, price: 15 },
  ],
};

describe("Comanda Component", () => {
  test("renders without errors", () => {
    // Renderiza el componente y pasa las props order y onMount
    render(<Comanda order={mockOrder} onMount={mockOnMount} />);

    expect(mockOnMount).toHaveBeenCalled();
  });

  test("displays products and calculates total correctly", () => {
    render(<Comanda order={mockOrder} onMount={mockOnMount} />);

    expect(screen.queryByText("Producto 1")).toBeInTheDocument();
    expect(screen.queryByText("Producto 2")).toBeInTheDocument();

    // Realiza los cálculos para el total esperado y verifica si se muestra correctamente
    const expectedTotal = 2 * 10 + 3 * 15;
    const totalValue = `$${expectedTotal}`;
    if (expectedTotal === 0) {
      expect(screen.queryByText("$0")).toBeInTheDocument();
    } else {
      expect(screen.queryByText(totalValue)).toBeInTheDocument();
    }
  });
  // test('removes product when delete button is clicked', () => {

  //   let renderPostDelete;

  //   function onDelete(indexItem){
  //   let filteredProducts = mockOrder.productos.filter((_, index) => index !== indexItem)
  //    renderPostDelete = render(<Comanda order={filteredProducts} onMount={mockOnMount}/>);

  //   }

  //   render(<Comanda order={mockOrder} onMount={mockOnMount} onDeleteItem={onDelete}/>);

  //   const deleteButton = screen.getAllByRole('button', { class: 'eliminar' })[2]; // Ajusta esto según tu componente
  //   //console.log(deleteButton)
  //   fireEvent.click(deleteButton);

  //   expect(renderPostDelete.queryByText('Producto 1')).not.toBeInTheDocument();
  // });
  // test('sends order when "Enviar Pedido" button is clicked', () => {
  //   const mockOrder = {
  //     productos: [
  //       { id: 1, name: 'Producto 1', quantity: 2, price: 10 },
  //     ],
  //   };

  //   // Mock para la función de envío de pedido
  //   const sendOrderMock = jest.fn();

  //   render(<Comanda order={mockOrder} sendOrder={sendOrderMock} />); // Ajusta las props según tu componente

  //   const sendButton = screen.getByText('Orden guardada');
  //   fireEvent.click(sendButton);

  //   expect(sendOrderMock).toHaveBeenCalledTimes(1); // Verifica si la función fue llamada
  // });

  test("displays message when order is empty", () => {
    const emptyOrder = {
      productos: [],
    };

    render(<Comanda order={emptyOrder} onMount={mockOnMount} />);
    const inputClient = screen.getByPlaceholderText("NOMBRE CLIENTE");
    const orderButton = screen.getByRole("button", { name: "CREAR ORDEN" });

    fireEvent.change(inputClient, { target: { value: "caro" } });
    expect(inputClient.value).toBe("caro");

    fireEvent.click(orderButton);

    expect(
      screen.getByText("Por favor seleccione un producto")
    ).toBeInTheDocument();
  });

  test("displays message when client is empty", () => {
    const emptyOrder = {
      productos: [],
    };

    render(<Comanda order={emptyOrder} onMount={mockOnMount} />);
    const orderButton = screen.getByRole("button", { name: "CREAR ORDEN" }); // Ajusta esto según tu componente
    fireEvent.click(orderButton);

    expect(
      screen.getByText("Por favor ingrese el nombre del cliente")
    ).toBeInTheDocument();
  });
});
