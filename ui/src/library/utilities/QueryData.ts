export class QueryData {
   name: string;
   endpoint: string;
   key: string[];

   constructor(name: string, endpoint: string, key: string[]) {
      this.name = name;
      this.endpoint = endpoint;
      this.key = key;
   }
}
