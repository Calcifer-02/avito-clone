import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ListPage from "../pages/ListPage";
import { MemoryRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

// Мокаем window.matchMedia для Ant Design
beforeAll(() => {
   Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
         matches: false,
         media: query,
         onchange: null,
         addListener: jest.fn(),
         removeListener: jest.fn(),
         addEventListener: jest.fn(),
         removeEventListener: jest.fn(),
         dispatchEvent: jest.fn(),
      })),
   });
});

describe("ListPage Component", () => {
   let mockAxios: MockAdapter;

   beforeEach(() => {
      mockAxios = new MockAdapter(axios);
   });

   afterEach(() => {
      mockAxios.reset();
   });

   it("renders list of ads", async () => {
      mockAxios.onGet("http://localhost:3000/items").reply(200, [
         {
            id: 1,
            name: "Объявление 1",
            description: "Описание 1",
            type: "Недвижимость",
         },
         {
            id: 2,
            name: "Объявление 2",
            description: "Описание 2",
            type: "Авто",
         },
      ]);

      render(
         <ConfigProvider>
            <MemoryRouter>
               <ListPage />
            </MemoryRouter>
         </ConfigProvider>
      );

      await waitFor(() => {
         expect(screen.getByText("Объявление 1")).toBeInTheDocument();
         expect(screen.getByText("Объявление 2")).toBeInTheDocument();
      });
   });

   it("filters ads by category", async () => {
      mockAxios.onGet("http://localhost:3000/items").reply(200, [
         {
            id: 1,
            name: "Объявление 1",
            description: "Описание 1",
            type: "Недвижимость",
         },
         {
            id: 2,
            name: "Объявление 2",
            description: "Описание 2",
            type: "Авто",
         },
      ]);

      render(
         <ConfigProvider>
            <MemoryRouter>
               <ListPage />
            </MemoryRouter>
         </ConfigProvider>
      );

      // Ждем, что оба объявления отобразятся
      await waitFor(() => screen.getByText("Объявление 1"));
      await waitFor(() => screen.getByText("Объявление 2"));

      // Применяем фильтр
      fireEvent.change(screen.getByRole("combobox"), {
         target: { value: "Недвижимость" },
      });

      // Явное ожидание, что обновление DOM завершилось
      await waitFor(() => {
         expect(screen.getByText("Объявление 1")).toBeInTheDocument();
      });

      // Добавляем явное ожидание для скрытия объявления 2
      await waitFor(() => {
         expect(screen.queryByText("Объявление 2")).not.toBeInTheDocument();
      });
   });

   it("deletes an ad successfully", async () => {
      mockAxios.onGet("http://localhost:3000/items").reply(200, [
         {
            id: 1,
            name: "Объявление 1",
            description: "Описание 1",
            type: "Недвижимость",
         },
      ]);
      mockAxios.onDelete("http://localhost:3000/items/1").reply(204);

      render(
         <ConfigProvider>
            <MemoryRouter>
               <ListPage />
            </MemoryRouter>
         </ConfigProvider>
      );

      await waitFor(() => screen.getByText("Объявление 1"));

      // Добавляем явное ожидание для кнопки "Удалить"
      const deleteButton = screen.getAllByRole("button", {
         name: /удалить/i,
      })[0];
      fireEvent.click(deleteButton);

      await waitFor(() => {
         // Проверяем, что Объявление 1 удалено
         expect(screen.queryByText("Объявление 1")).not.toBeInTheDocument();
      });
   });
});
