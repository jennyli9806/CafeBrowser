import { UsersPhone } from './depots-result';
import { SkuEquivalent } from './depots-result';

export class UserDepotsResult {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
  SkuNumber: string;
  Rank: string;
    // Rank: number;
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
  value: number;
  Bin: string;
  IsDeliverable: boolean;
  TimeStamp: string;
  PlantUsersPhone: UsersPhone[];
  storageBins?: string[];
  allParts: SkuEquivalent[];

}
