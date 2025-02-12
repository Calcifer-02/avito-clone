import React from "react";
import { Select, InputNumber } from "antd";

const RealEstateFilters: React.FC<{
   filters: {
      propertyType: string;
      areaMin: number | null;
      roomsMin: number | null;
      priceMin: number | null;
   };
   setFilters: (filters: any) => void;
}> = ({ filters, setFilters }) => {
   return (
      <>
         <Select
            value={filters.propertyType}
            onChange={(value) =>
               setFilters({ ...filters, propertyType: value })
            }
            style={{
               marginRight: "10px",
               width: "150px",
               marginBottom: "20px",
            }}
         >
            <Select.Option value="">Все типы</Select.Option>
            <Select.Option value="Квартира">Квартира</Select.Option>
            <Select.Option value="Дом">Дом</Select.Option>
            <Select.Option value="Коттедж">Коттедж</Select.Option>
         </Select>
         <InputNumber
            placeholder="Мин. площадь"
            value={filters.areaMin}
            onChange={(value) => setFilters({ ...filters, areaMin: value })}
            style={{ marginRight: "10px", width: "150px" }}
         />
         <InputNumber
            placeholder="Мин. комнат"
            value={filters.roomsMin}
            onChange={(value) => setFilters({ ...filters, roomsMin: value })}
            style={{ marginRight: "10px", width: "150px" }}
         />
         <InputNumber
            placeholder="Мин. цена"
            value={filters.priceMin}
            onChange={(value) => setFilters({ ...filters, priceMin: value })}
            style={{ width: "150px" }}
         />
      </>
   );
};

export default RealEstateFilters;
