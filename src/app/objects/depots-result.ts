export interface depotsResult {
  SkuNumber: string;
  Rank: number;
  ManufacturerPartNo: string;
  SkuShortDescEn: string;
  StorageLocId: string;
  StorageBins: string;
  StorageLocName: string;
  PlantId: number;
  PlantCity: string;
  Unrestricted: string;
  PlantAddress: string;
  PlantPostalCode: string;
  PlantRegion?: string;
  distance: string;
  duration: string;
  Bin: string;
  IsDeliverable: boolean;
  TimeStamp?: string;
  PlantUsersPhone?: UsersPhone[];
  storageBins?: string[];
  allParts: SkuEquivalent[];
}

export interface UsersPhone {
  UserName: string;
  IsManager: boolean;
  Phone: PhoneObject;
}
export interface PhoneObject {
  Key: Phone[];
}
export interface Phone {
  PhoneType: string;
  PHoneNumber: string;
}
export interface SkuEquivalent {
  SkuNumber: string;
  Rank: string;
  // Rank: number;
  ManufacturerPartNo: string;
  SkuShortDescEn: string;
  Unrestricted: string;
  StorageLocId: string;
  StorageLocName: string;
  storageBins?: string[];
}
