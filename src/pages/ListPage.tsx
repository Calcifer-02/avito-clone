import React, { useState, useEffect } from "react";
import { Button, List, Card, Select, Grid } from "antd"; // Импортируем Grid
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ad from "../types";
import CommonFilters from "../components/Filters/CommonFilters";
import RealEstateFilters from "../components/Filters/RealEstateFilters";
import AutoFilters from "../components/Filters/AutoFilters";
import ServicesFilters from "../components/Filters/ServicesFilters";

import "../styles/list.css";

const { useBreakpoint } = Grid; // Используем хук useBreakpoint

const ListPage: React.FC = () => {
   const navigate = useNavigate();
   const [ads, setAds] = useState<Ad[]>([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
   );
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
   });

   // Используем хук useBreakpoint для отслеживания размера экрана
   const screens = useBreakpoint();

   // Функция для определения количества колонок в зависимости от размера экрана
   const getColumnCount = () => {
      if (screens.xxl) return 5; // > 1600px
      if (screens.xl) return 4; // > 1280px
      if (screens.lg) return 3; // > 1024px
      if (screens.md) return 2; // > 768px
      return 1; // <= 768px
   };

   useEffect(() => {
      const fetchAds = async () => {
         try {
            const response = await axios.get("http://localhost:3000/items");
            setAds(response.data);
         } catch (error) {
            console.error("Ошибка при загрузке объявлений:", error);
         }
      };
      fetchAds();
   }, []);

   const handleDelete = async (id: number) => {
      try {
         await axios.delete(`http://localhost:3000/items/${id}`);
         setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
      } catch (error) {
         console.error("Ошибка при удалении объявления:", error);
      }
   };

   const filteredAds = ads.filter(
      (ad) =>
         (ad.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            ad.description
               ?.toLowerCase()
               ?.includes(searchQuery.toLowerCase()) ||
            ad.type?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            String(ad.price ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) ||
            String(ad.area ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) ||
            String(ad.rooms ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) ||
            String(ad.year ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) ||
            String(ad.mileage ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) ||
            String(ad.experience ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) ||
            String(ad.cost ?? "")
               .toLowerCase()
               .includes(searchQuery.toLowerCase())) &&
         (!selectedCategory || ad.type === selectedCategory) &&
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
            (ad.mileage !== undefined && ad.mileage <= filters.mileageMax)) &&
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

         {/* Дополнительные фильтры */}
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
            <p>Ничего не найдено.</p>
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
                              onClick={() => navigate(`/item/${ad.id}`)}
                           >
                              Открыть
                           </Button>,
                           <Button
                              key="delete"
                              danger
                              onClick={() => handleDelete(ad.id)}
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
