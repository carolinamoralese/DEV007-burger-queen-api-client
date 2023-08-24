import React from "react";
import {render} from "@testing-library/react";
import Home from "./Home";
jest.mock("react-router-dom", () => ({
  useLocation: ()=>({pathname:"hola"}),
  useNavigate: ()=>jest.fn()
}))
describe("Home Component", () => {
  it("renders without errors", () => {
    // Simula el comportamiento de localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;
    // Simula el comportamiento de useEffect
    const useEffectMock = (effect, deps) => {
      if (deps === undefined || deps.length === 0) {
        effect();
      }
    };
    global.useEffect = useEffectMock;
    // Renderiza el componente
    const div = document.createElement("div");
    render(<Home />, div);
  });
});