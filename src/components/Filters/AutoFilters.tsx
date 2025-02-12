import React from "react";
import { Select, InputNumber, Input } from "antd";

const AutoFilters: React.FC<{
   filters: {
      brand: string;
      model: string;
      yearMin: number | null;
      mileageMax: number | null;
   };
   setFilters: (filters: any) => void;
}> = ({ filters, setFilters }) => {
   return (
      <>
         <Select
            value={filters.brand}
            onChange={(value) => setFilters({ ...filters, brand: value })}
            style={{
               marginRight: "10px",
               width: "150px",
               marginBottom: "20px",
            }}
         >
            <Select.Option value="">Все марки</Select.Option>
            <Select.Option value="Toyota">Toyota</Select.Option>
            <Select.Option value="BMW">BMW</Select.Option>
            <Select.Option value="Mercedes">Mercedes</Select.Option>
         </Select>
         <Input
            placeholder="Модель"
            value={filters.model}
            onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            style={{ marginRight: "10px", width: "150px" }}
         />
         <InputNumber
            placeholder="Мин. год"
            value={filters.yearMin}
            onChange={(value) => setFilters({ ...filters, yearMin: value })}
            style={{ marginRight: "10px", width: "150px" }}
         />
         <InputNumber
            placeholder="Макс. пробег"
            value={filters.mileageMax}
            onChange={(value) => setFilters({ ...filters, mileageMax: value })}
            style={{ width: "150px" }}
         />
      </>
   );
};

export default AutoFilters;
