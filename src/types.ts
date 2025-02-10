interface Ad {
   id: number;
   title: string;
   description: string;
   location: string;
   category: string;
   propertyType?: string;
   area?: number;
   rooms?: number;
   price?: number;
   brand?: string;
   model?: string;
   year?: number;
   mileage?: number;
   serviceType?: string;
   experience?: number;
   cost?: number;
   schedule?: string;
}

export default Ad;
