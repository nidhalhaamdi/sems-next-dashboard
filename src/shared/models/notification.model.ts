export class Notification {
    constructor(
      public id?: number,
      public notification?: string,
      public timestamp?: string,
      public parameters: string | null = null // Allow null as a valid value
    ) {}
  
    toObject() {
      const obj = Object.assign({}, this);
      if (this.parameters != null && this.parameters.length > 0) {
        obj.parameters = JSON.parse(this.parameters);
      } else {
        obj.parameters = null; // Now this is valid since parameters can be null
      }
      return obj;
    }
}