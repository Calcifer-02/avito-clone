import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import FormPage from "../pages/FormPage";

jest.mock("axios");

describe("FormPage Component", () => {
   let mockAxios: MockAdapter;

   beforeEach(() => {
      mockAxios = new MockAdapter(axios); // Создаем мок для axios
   });

   afterEach(() => {
      mockAxios.reset(); // Очищаем мок после каждого теста
   });

   it("renders form with category selection", () => {
      render(<FormPage onSubmit={() => {}} />);
      expect(
         screen.getByText("Форма добавления объявления")
      ).toBeInTheDocument();
      expect(screen.getByText("Недвижимость")).toBeInTheDocument();
      expect(screen.getByText("Авто")).toBeInTheDocument();
      expect(screen.getByText("Услуги")).toBeInTheDocument();
   });

   it("displays fields for selected category", () => {
      render(<FormPage onSubmit={() => {}} />);
      const categorySelect = screen.getByLabelText("Выберите категорию");
      fireEvent.change(categorySelect, { target: { value: "Недвижимость" } });
      expect(screen.getByText("Квартира")).toBeInTheDocument();
      expect(screen.getByText("Дом")).toBeInTheDocument();
      expect(screen.getByText("Коттедж")).toBeInTheDocument();
   });

   it("submits form data successfully", async () => {
      const mockOnSubmit = jest.fn(); // Мокируем функцию onSubmit
      mockAxios.onPost("http://localhost:3000/items").reply(201, { id: 1 });

      render(<FormPage onSubmit={mockOnSubmit} />);

      // Заполняем форму
      fireEvent.change(screen.getByLabelText("Название"), {
         target: { value: "Тестовое объявление" },
      });
      fireEvent.change(screen.getByLabelText("Описание"), {
         target: { value: "Описание тестового объявления" },
      });
      fireEvent.change(screen.getByLabelText("Локация"), {
         target: { value: "Москва" },
      });
      fireEvent.change(screen.getByLabelText("Выберите категорию"), {
         target: { value: "Недвижимость" },
      });
      fireEvent.change(screen.getByLabelText("Тип недвижимости"), {
         target: { value: "Квартира" },
      });
      fireEvent.change(screen.getByLabelText("Площадь"), {
         target: { value: 100 },
      });
      fireEvent.change(screen.getByLabelText("Количество комнат"), {
         target: { value: 3 },
      });
      fireEvent.change(screen.getByLabelText("Цена"), {
         target: { value: 5000000 },
      });

      // Отправляем форму
      fireEvent.click(screen.getByText("Создать объявление"));

      // Проверяем, что данные отправлены
      await waitFor(() => {
         expect(mockOnSubmit).toHaveBeenCalled();
         expect(
            screen.getByText("Объявление успешно добавлено!")
         ).toBeInTheDocument();
      });
   });

   it("shows error message on submission failure", async () => {
      mockAxios.onPost("http://localhost:3000/items").networkError();

      render(<FormPage onSubmit={() => {}} />);

      // Заполняем форму
      fireEvent.change(screen.getByLabelText("Название"), {
         target: { value: "Тестовое объявление" },
      });
      fireEvent.change(screen.getByLabelText("Описание"), {
         target: { value: "Описание тестового объявления" },
      });
      fireEvent.change(screen.getByLabelText("Локация"), {
         target: { value: "Москва" },
      });
      fireEvent.change(screen.getByLabelText("Выберите категорию"), {
         target: { value: "Недвижимость" },
      });

      // Отправляем форму
      fireEvent.click(screen.getByText("Создать объявление"));

      // Проверяем, что ошибка отображается
      await waitFor(() => {
         expect(
            screen.getByText("Не удалось добавить объявление")
         ).toBeInTheDocument();
      });
   });
});
