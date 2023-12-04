export enum OwnershipStatus
{
    InWarehouse=1,
    InVendor=2,
    WithEmployee=3,
    Scrapped=4,
    Lost=5,
    Activated=6,
    Other=7,
    WithEmployeeShared=8,
    WithEmployeeSigned=9,
    InStoreLocation=10
}

export enum SortDirectionEnum {
    Asc = 0,
    Desc
  };
  export enum GridSearchingStatusEnum {
    Nothing = 0,
    Searching=1,
    NoResult=2,
    ResultFound=3
  };

  export enum LoggingStatusEnum
  {
    Nothing=0,
    Logging=1,
    Failed=2,
    Logined=3
  }
  // export enum ItemTypeEnum
  // { 
  //   SpotGen=1,
  //   ODU=2
  // }