export class GeocoderResponse {
    status: string;
    errorMessage: string ='error';
    results: google.maps.GeocoderResult[];
  
    constructor(status: string, results: google.maps.GeocoderResult[]) {
      this.status = status;
      this.results = results;
    }
  }