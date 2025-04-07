export class Command {
    constructor(
      public id?: number,
      public command?: string,
      public timestamp?: string,
      public lastUpdated?: string,
      public userId?: number,
      public deviceId?: number,
      public networkId?: string, // Fixed typo: networkdId -> networkId
      public deviceTypeId?: string,
      public parameters: string | null = null, // Allow null as a valid value
      public lifetime?: number,
      public status?: string,
      public result?: string
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