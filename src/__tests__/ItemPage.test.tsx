import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ItemPage from "../pages/ItemPage";
import { MemoryRouter } from "react-router-dom";

// Моковые данные для объявления
const mockAd = {
   id: 1,
   name: "Тестовое объявление",
   description: "Описание тестового объявления",
   location: "Москва",
   type: "Недвижимость",
   propertyType: "Квартира",
   area: 100,
   rooms: 3,
   price: 5000000,
};

describe("ItemPage Component", () => {
   let mockAxios: MockAdapter;

   beforeEach(() => {
      mockAxios = new MockAdapter(axios); // Создаем мок для axios
   });

   afterEach(() => {
      mockAxios.reset(); // Очищаем мок после каждого теста
   });

   it("renders ad details correctly", async () => {
      mockAxios.onGet("http://localhost:3000/items/1").reply(200, mockAd);

      render(
         <MemoryRouter initialEntries={["/item/1"]}>
            <ItemPage />
         </MemoryRouter>
      );

      // Проверяем заголовок страницы
      expect(screen.getByText("Просмотр объявления")).toBeInTheDocument();

      // Ждем загрузки данных
      await waitFor(() => {
         expect(screen.getByText("Тестовое объявление")).toBeInTheDocument();
         expect(
            screen.getByText("Описание тестового объявления")
         ).toBeInTheDocument();
         expect(screen.getByText("Локация: Москва")).toBeInTheDocument();
         expect(
            screen.getByText("Тип недвижимости: Квартира")
         ).toBeInTheDocument();
         expect(screen.getByText("Площадь: 100 кв.м")).toBeInTheDocument();
         expect(screen.getByText("Количество комнат: 3")).toBeInTheDocument();
         expect(screen.getByText("Цена: 5000000 руб.")).toBeInTheDocument();
      });
   });

   it("enables and disables edit mode", async () => {
      mockAxios.onGet("http://localhost:3000/items/1").reply(200, mockAd);

      render(
         <MemoryRouter initialEntries={["/item/1"]}>
            <ItemPage />
         </MemoryRouter>
      );

      // Ждем загрузки данных
      await waitFor(() => {
         expect(screen.getByText("Редактировать")).toBeInTheDocument();
      });

      // Активируем режим редактирования
      fireEvent.click(screen.getByText("Редактировать"));
      expect(await screen.findByText("Сохранить")).toBeEnabled();

      // Деактивируем режим редактирования
      fireEvent.click(screen.getByText("Редактировать"));
      expect(screen.getByText("Сохранить")).toBeDisabled();
   });

   it("updates ad data successfully", async () => {
      mockAxios.onGet("http://localhost:3000/items/1").reply(200, mockAd);
      mockAxios.onPut("http://localhost:3000/items/1").reply(200, {
         ...mockAd,
         name: "Обновленное название",
      });

      render(
         <MemoryRouter initialEntries={["/item/1"]}>
            <ItemPage />
         </MemoryRouter>
      );

      // Ждем загрузки данных
      await waitFor(() => {
         expect(screen.getByText("Тестовое объявление")).toBeInTheDocument();
      });

      // Активируем режим редактирования
      fireEvent.click(screen.getByText("Редактировать"));

      // Обновляем название
      const nameInput = screen.getByLabelText("Название");
      fireEvent.change(nameInput, {
         target: { value: "Обновленное название" },
      });

      // Отправляем форму
      fireEvent.click(screen.getByText("Сохранить"));

      // Проверяем, что данные обновились
      await waitFor(() => {
         expect(screen.getByText("Обновленное название")).toBeInTheDocument();
      });
   });

   it("deletes ad successfully", async () => {
      mockAxios.onGet("http://localhost:3000/items/1").reply(200, mockAd);
      mockAxios.onDelete("http://localhost:3000/items/1").reply(204);

      render(
         <MemoryRouter initialEntries={["/item/1"]}>
            <ItemPage />
         </MemoryRouter>
      );

      // Ждем загрузки данных
      await waitFor(() => {
         expect(screen.getByText("Тестовое объявление")).toBeInTheDocument();
      });

      // Удаляем объявление
      fireEvent.click(screen.getByText("Удалить"));

      // Проверяем, что произошел переход на страницу списка объявлений
      await waitFor(() => {
         expect(window.location.pathname).toBe("/list");
      });
   });
});
