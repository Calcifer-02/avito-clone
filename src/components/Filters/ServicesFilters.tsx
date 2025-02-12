import React from "react";
import { Select, InputNumber, Input } from "antd";

const ServicesFilters: React.FC<{
   filters: {
      serviceType: string;
      experienceMin: number | null;
      costMin: number | null;
      schedule: string;
   };
   setFilters: (filters: any) => void;
}> = ({ filters, setFilters }) => {
   return (
      <>
         <Select
            value={filters.serviceType}
            onChange={(value) => setFilters({ ...filters, serviceType: value })}
            style={{
               marginRight: "10px",
               width: "150px",
               marginBottom: "20px",
            }}
         >
            <Select.Option value="">Все типы</Select.Option>
            <Select.Option value="Ремонт">Ремонт</Select.Option>
            <Select.Option value="Уборка">Уборка</Select.Option>
            <Select.Option value="Доставка">Доставка</Select.Option>
         </Select>
         <InputNumber
            placeholder="Мин. опыт"
            value={filters.experienceMin}
            onChange={(value) =>
               setFilters({ ...filters, experienceMin: value })
            }
            style={{ marginRight: "10px", width: "150px" }}
         />
         <InputNumber
            placeholder="Мин. стоимость"
            value={filters.costMin}
            onChange={(value) => setFilters({ ...filters, costMin: value })}
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
      </>
   );
};

export default ServicesFilters;
