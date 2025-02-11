export default interface Ad {
   id: number;
   name: string; // Изменено с title на name
   description: string;
   type: string; // Изменено с category на type
   location: string;
   price?: number;
   propertyType?: string;
   area?: number;
   rooms?: number;
   brand?: string;
   model?: string;
   year?: number;
   mileage?: number;
   serviceType?: string;
   experience?: number;
   cost?: number;
   schedule?: string;
}
