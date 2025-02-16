import React, { useState, useEffect } from "react";
import { Button, List, Card, Select, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ad from "../types";
import CommonFilters from "../components/Filters/CommonFilters";
import RealEstateFilters from "../components/Filters/RealEstateFilters";
import AutoFilters from "../components/Filters/AutoFilters";
import ServicesFilters from "../components/Filters/ServicesFilters";

import "../styles/list.css";

const { useBreakpoint } = Grid; // Хук для отслеживания размеров экрана

const ListPage: React.FC = () => {
   const navigate = useNavigate();
   const [ads, setAds] = useState<Ad[]>([]); // Состояние для списка объявлений
   const [searchQuery, setSearchQuery] = useState(""); // Поисковый запрос
   const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
   ); // Выбранная категория
   const [filters, setFilters] = useState({
      propertyType: "",
      areaMin: null as number | null,
      roomsMin: null as number | null,
      priceMin: null as number | null,
      brand: "",
      model: "",
      yearMin: null as number | null,
      mileageMax: null as number | null,
      serviceType: "",
      experienceMin: null as number | null,
      costMin: null as number | null,
      schedule: "",
   }); // Фильтры для отображения объявлений

   const screens = useBreakpoint(); // Получаем информацию о размере экрана

   // Функция для определения количества колонок на разных устройствах
   const getColumnCount = () => {
      if (screens.xxl) return 5; // Для больших экранов
      if (screens.xl) return 4; // Для экранов среднего размера
      if (screens.lg) return 3; // Для экранов чуть меньшего размера
      if (screens.md) return 2; // Для средних экранов
      return 1; // Для мобильных устройств
   };

   useEffect(() => {
      // Функция для загрузки объявлений
      const fetchAds = async () => {
         try {
            const response = await axios.get("http://localhost:3000/items");
            setAds(response.data); // Сохраняем полученные объявления в состоянии
         } catch (error) {
            console.error("Ошибка при загрузке объявлений:", error); // Логируем ошибку
         }
      };
      fetchAds();
   }, []);

   const handleDelete = async (id: number) => {
      // Функция для удаления объявления
      try {
         await axios.delete(`http://localhost:3000/items/${id}`);
         setAds((prevAds) => prevAds.filter((ad) => ad.id !== id)); // Обновляем список объявлений
      } catch (error) {
         console.error("Ошибка при удалении объявления:", error); // Логируем ошибку
      }
   };

   // Фильтруем объявления по введенному запросу и выбранным фильтрам
   const filteredAds = ads.filter(
      (ad) =>
         (ad.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) || // Поиск по имени
            ad.description
               ?.toLowerCase()
               ?.includes(searchQuery.toLowerCase()) || // Поиск по описанию
            ad.type?.toLowerCase()?.includes(searchQuery.toLowerCase()) || // Поиск по типу
            String(ad.price ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) || // Поиск по цене
            String(ad.area ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) || // Поиск по площади
            String(ad.rooms ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) || // Поиск по количеству комнат
            String(ad.year ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) || // Поиск по году
            String(ad.mileage ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) || // Поиск по пробегу
            String(ad.experience ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) || // Поиск по опыту
            String(ad.cost ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase())) && // Поиск по стоимости
         (!selectedCategory || ad.type === selectedCategory) && // Фильтрация по категории
         (filters.propertyType === "" ||
            ad.propertyType?.toLowerCase() ===
               filters.propertyType.toLowerCase()) &&
         (filters.areaMin === null ||
            (ad.area !== undefined && ad.area >= filters.areaMin)) &&
         (filters.roomsMin === null ||
            (ad.rooms !== undefined && ad.rooms >= filters.roomsMin)) &&
         (filters.priceMin === null ||
            (ad.price !== undefined && ad.price >= filters.priceMin)) &&
         (filters.brand === "" ||
            ad.brand?.toLowerCase() === filters.brand.toLowerCase()) &&
         (filters.model === "" ||
            ad.model?.toLowerCase() === filters.model.toLowerCase()) &&
         (filters.yearMin === null ||
            (ad.year !== undefined && ad.year >= filters.yearMin)) &&
         (filters.mileageMax === null ||
            (ad.mileage !== undefined &&
               ad.mileage !== null &&
               Number(ad.mileage) <= Number(filters.mileageMax))) &&
         (filters.serviceType === "" ||
            ad.serviceType?.toLowerCase() ===
               filters.serviceType.toLowerCase()) &&
         (filters.experienceMin === null ||
            (ad.experience !== undefined &&
               ad.experience >= filters.experienceMin)) &&
         (filters.costMin === null ||
            (ad.cost !== undefined && ad.cost >= filters.costMin)) &&
         (filters.schedule === "" ||
            ad.schedule?.toLowerCase() === filters.schedule.toLowerCase())
   );

   return (
      <div>
         <h1>Список объявлений</h1>

         {/* Общие фильтры */}
         <CommonFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
         />

         {/* Выбор категории */}
         <Select
            value={selectedCategory}
            onChange={(value) => {
               setSelectedCategory(value);
               setFilters({
                  // Сброс фильтров при смене категории
                  propertyType: "",
                  areaMin: null,
                  roomsMin: null,
                  priceMin: null,
                  brand: "",
                  model: "",
                  yearMin: null,
                  mileageMax: null,
                  serviceType: "",
                  experienceMin: null,
                  costMin: null,
                  schedule: "",
               });
            }}
            allowClear
            style={{
               marginBottom: "20px",
               marginLeft: "20px",
               width: "150px",
            }}
         >
            <Select.Option value="Недвижимость">Недвижимость</Select.Option>
            <Select.Option value="Авто">Авто</Select.Option>
            <Select.Option value="Услуги">Услуги</Select.Option>
         </Select>
         <br></br>

         {/* Дополнительные фильтры в зависимости от категории */}
         {selectedCategory === "Недвижимость" && (
            <RealEstateFilters filters={filters} setFilters={setFilters} />
         )}
         {selectedCategory === "Авто" && (
            <AutoFilters filters={filters} setFilters={setFilters} />
         )}
         {selectedCategory === "Услуги" && (
            <ServicesFilters filters={filters} setFilters={setFilters} />
         )}

         {/* Список объявлений */}
         {filteredAds.length === 0 ? (
            <p>Ничего не найдено.</p> // Сообщение, если нет подходящих объявлений
         ) : (
            <List
               style={{ marginBottom: "20px" }}
               grid={{ gutter: 16, column: getColumnCount() }} // Динамическое количество колонок
               dataSource={filteredAds}
               pagination={{
                  pageSize: getColumnCount(),
                  position: "bottom",
                  align: "center",
               }}
               renderItem={(ad) => (
                  <List.Item>
                     <Card
                        title={ad.name}
                        actions={[
                           <Button
                              key="open"
                              onClick={() => navigate(`/item/${ad.id}`)} // Открытие объявления
                           >
                              Открыть
                           </Button>,
                           <Button
                              key="delete"
                              danger
                              onClick={() => handleDelete(ad.id)} // Удаление объявления
                           >
                              Удалить
                           </Button>,
                        ]}
                     >
                        <p>Описание: {ad.description}</p>
                        <p>Категория: {ad.type}</p>
                        <p>Локация: {ad.location}</p>
                        {ad.price !== undefined && <p>Цена: {ad.price} руб.</p>}
                        {ad.propertyType && (
                           <p>Тип недвижимости: {ad.propertyType}</p>
                        )}
                        {ad.area && <p>Площадь: {ad.area} кв.м</p>}
                        {ad.rooms && <p>Комнат: {ad.rooms}</p>}
                        {ad.brand && <p>Марка: {ad.brand}</p>}
                        {ad.model && <p>Модель: {ad.model}</p>}
                        {ad.year && <p>Год выпуска: {ad.year}</p>}
                        {ad.mileage && <p>Пробег: {ad.mileage} км</p>}
                        {ad.serviceType && <p>Тип услуги: {ad.serviceType}</p>}
                        {ad.experience && (
                           <p>Опыт работы: {ad.experience} лет</p>
                        )}
                        {ad.cost !== undefined && (
                           <p>Стоимость услуги: {ad.cost} руб.</p>
                        )}
                        {ad.schedule && <p>График работы: {ad.schedule}</p>}
                     </Card>
                  </List.Item>
               )}
            />
         )}
      </div>
   );
};

export default ListPage;
