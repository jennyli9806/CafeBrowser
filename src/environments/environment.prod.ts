export const environment = {
  production: true,
  MatomoId: 1420,
  MatomoUrl: 'https://matomo.fsbiapps.int.bell.ca/',
  googleApiKey: 'AIzaSyDSqlapmrnMcGhaiCiPpuhjA260Z9KJhqU',
  googleGeoCodeApiUrl: `https://maps.google.com/maps/api/geocode/json?address=:term&sensor=false&key=:key`,
  BaseUrl: 'https://fops.int.bell.ca/NCMS/API',

  AuthorizationController: {
    ControllerUrl: '/api/authorization/',
    Actions: {
      Login: 'Login',
      Impersonate: 'Impersonate',
      RemoveImpersonate: 'RemoveImpersonate',
    },
  },
  EmployeeController: {
    ControllerUrl: '/api/Employee/',
    Actions: {
      SearchEmployees: 'SearchEmployees',
      Employeefavorites: 'Employeefavorites',
      GetEmployeefavoritesDetails: 'EmployeefavoritesDetails',
      Orders: 'Order',
      Location: 'EmployeeLocation',
    },
  },
  NCMSController: {
    ControllerUrl: '/api/NCMS/',
    Actions: {
      SearchPlantSkus: 'SearchPlantSkus',
      GetMaintSpareCategory: 'GetMaintSpareCategory',
      GetAvailableUnits: 'GetAvailableUnits',
      GetPlantSkuDetails: 'GetPlantSkuDetails',
    },
  },
};

export const AppRoutes = {
  AuthorizationController: {
    Login:
      environment.BaseUrl +
      environment.AuthorizationController.ControllerUrl +
      environment.AuthorizationController.Actions.Login,
    Impersonate:
      environment.BaseUrl +
      environment.AuthorizationController.ControllerUrl +
      environment.AuthorizationController.Actions.Impersonate,
    RemoveImpersonate:
      environment.BaseUrl +
      environment.AuthorizationController.ControllerUrl +
      environment.AuthorizationController.Actions.RemoveImpersonate,
  },
  EmployeeController: {
    SearchEmployees:
      environment.BaseUrl +
      environment.EmployeeController.ControllerUrl +
      environment.EmployeeController.Actions.SearchEmployees,
    Employeefavorites:
      environment.BaseUrl +
      environment.EmployeeController.ControllerUrl +
      environment.EmployeeController.Actions.Employeefavorites,
    GetEmployeefavoritesDetails:
      environment.BaseUrl +
      environment.EmployeeController.ControllerUrl +
      environment.EmployeeController.Actions.GetEmployeefavoritesDetails,
    EmployeeOrders:
      environment.BaseUrl +
      environment.EmployeeController.ControllerUrl +
      environment.EmployeeController.Actions.Orders,
    EmployeeLocation:
      environment.BaseUrl +
      environment.EmployeeController.ControllerUrl +
      environment.EmployeeController.Actions.Location,
  },
  NCMSController: {
    SearchPlantSkus:
      environment.BaseUrl +
      environment.NCMSController.ControllerUrl +
      environment.NCMSController.Actions.SearchPlantSkus,
    GetMaintSpareCategory:
      environment.BaseUrl +
      environment.NCMSController.ControllerUrl +
      environment.NCMSController.Actions.GetMaintSpareCategory,
    GetAvailableUnits:
      environment.BaseUrl +
      environment.NCMSController.ControllerUrl +
      environment.NCMSController.Actions.GetAvailableUnits,
    GetPlantSkuDetails:
      environment.BaseUrl +
      environment.NCMSController.ControllerUrl +
      environment.NCMSController.Actions.GetPlantSkuDetails,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
