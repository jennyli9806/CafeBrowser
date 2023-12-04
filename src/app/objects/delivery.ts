export class Delivery {
    constructor(
        public materialNumber : string, 
        public quantityRequired: number, 
        public peinNumber: string,
        public Name: string,
        public Address1: string,
        public Address2: string,
        public City: string,
        public Province: string,
        public PostalCode: string,
        public Type:string

        ) { }
}
