export interface PlantSkuEntity {
  SkuNumber: string;
  SkuShortDescEn: string;
  SkuShortDescFr: string;
  ManufacturerPartNo: string;
  Manufacturer: string;
  MaintSpareCat: string;
  Unrestricted: number;
  StorageBins: string[];
  PlantId: string;
  PlantAddress: string;
}
