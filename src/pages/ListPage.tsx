import React, { useState, useEffect } from "react";
import { Button, List, Card, Input, Select, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import Ad from "../types";
import axios from "axios"; // Импортируем axios

const ListPage: React.FC = () => {
   const navigate = useNavigate();
   const [ads, setAds] = useState<Ad[]>([]);
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
   ); // Состояние для выбранной категории
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

   useEffect(() => {
      const fetchAds = async () => {
         try {
            const response = await axios.get("http://localhost:3000/items"); // Загружаем данные с сервера
            setAds(response.data);
         } catch (error) {
            console.error("Ошибка при загрузке объявлений:", error);
         }
      };
      fetchAds();
   }, []);

   const handleDelete = async (id: number) => {
      try {
         await axios.delete(`http://localhost:3000/items/${id}`); // Удаляем объявление на сервере
         setAds((prevAds) => prevAds.filter((ad) => ad.id !== id)); // Обновляем состояние
      } catch (error) {
         console.error("Ошибка при удалении объявления:", error);
      }
   };

   // Фильтрация объявлений по названию, категории и дополнительным фильтрам
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
      <div className="container">
         <h1>Список объявлений</h1>

         {/* Поле для поиска */}
         <Input
            placeholder="Поиск по названию"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: "20px", maxWidth: "300px" }}
         />

         {/* Выпадающий список для выбора категории */}
         <Select
            placeholder="Выберите категорию"
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
               }); // Сбрасываем фильтры при изменении категории
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

         {/* Дополнительные фильтры в зависимости от выбранной категории */}
         {selectedCategory === "Недвижимость" && (
            <div style={{ marginBottom: "20px" }}>
               <Select
                  placeholder="Тип недвижимости"
                  value={filters.propertyType}
                  onChange={(value) =>
                     setFilters({ ...filters, propertyType: value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               >
                  <Select.Option value="">Все типы</Select.Option>
                  <Select.Option value="Квартира">Квартира</Select.Option>
                  <Select.Option value="Дом">Дом</Select.Option>
                  <Select.Option value="Коттедж">Коттедж</Select.Option>
               </Select>
               <InputNumber
                  placeholder="Мин. площадь"
                  value={filters.areaMin}
                  onChange={(value) =>
                     setFilters({ ...filters, areaMin: value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               />
               <InputNumber
                  placeholder="Мин. комнат"
                  value={filters.roomsMin}
                  onChange={(value) =>
                     setFilters({ ...filters, roomsMin: value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               />
               <InputNumber
                  placeholder="Мин. цена"
                  value={filters.priceMin}
                  onChange={(value) =>
                     setFilters({ ...filters, priceMin: value })
                  }
                  style={{ width: "150px" }}
               />
            </div>
         )}

         {selectedCategory === "Авто" && (
            <div style={{ marginBottom: "20px" }}>
               <Select
                  placeholder="Марка"
                  value={filters.brand}
                  onChange={(value) => setFilters({ ...filters, brand: value })}
                  style={{ marginRight: "10px", width: "150px" }}
               >
                  <Select.Option value="">Все марки</Select.Option>
                  <Select.Option value="Toyota">Toyota</Select.Option>
                  <Select.Option value="BMW">BMW</Select.Option>
                  <Select.Option value="Mercedes">Mercedes</Select.Option>
               </Select>
               <Input
                  placeholder="Модель"
                  value={filters.model}
                  onChange={(e) =>
                     setFilters({ ...filters, model: e.target.value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               />
               <InputNumber
                  placeholder="Мин. год выпуска"
                  value={filters.yearMin}
                  onChange={(value) =>
                     setFilters({ ...filters, yearMin: value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               />
               <InputNumber
                  placeholder="Макс. пробег"
                  value={filters.mileageMax}
                  onChange={(value) =>
                     setFilters({ ...filters, mileageMax: value })
                  }
                  style={{ width: "150px" }}
               />
            </div>
         )}

         {selectedCategory === "Услуги" && (
            <div style={{ marginBottom: "20px" }}>
               <Select
                  placeholder="Тип услуги"
                  value={filters.serviceType}
                  onChange={(value) =>
                     setFilters({ ...filters, serviceType: value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               >
                  <Select.Option value="">Все типы</Select.Option>
                  <Select.Option value="Ремонт">Ремонт</Select.Option>
                  <Select.Option value="Уборка">Уборка</Select.Option>
                  <Select.Option value="Доставка">Доставка</Select.Option>
               </Select>
               <InputNumber
                  placeholder="Мин. опыт работы"
                  value={filters.experienceMin}
                  onChange={(value) =>
                     setFilters({ ...filters, experienceMin: value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               />
               <InputNumber
                  placeholder="Мин. стоимость"
                  value={filters.costMin}
                  onChange={(value) =>
                     setFilters({ ...filters, costMin: value })
                  }
                  style={{ marginRight: "10px", width: "150px" }}
               />
               <Input
                  placeholder="График работы"
                  value={filters.schedule}
                  onChange={(e) =>
                     setFilters({ ...filters, schedule: e.target.value })
                  }
                  style={{ width: "150px" }}
               />
            </div>
         )}

         {filteredAds.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
               Ничего не найдено.
            </p>
         )}

         <List
            style={{ marginBottom: "20px" }}
            grid={{ gutter: 16, column: 5 }}
            dataSource={filteredAds}
            pagination={{
               pageSize: 5,
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
                     {ad.experience && <p>Опыт работы: {ad.experience} лет</p>}
                     {ad.cost !== undefined && (
                        <p>Стоимость услуги: {ad.cost} руб.</p>
                     )}
                     {ad.schedule && <p>График работы: {ad.schedule}</p>}
                  </Card>
               </List.Item>
            )}
         />
      </div>
   );
};

export default ListPage;
