import { plainToClass } from 'class-transformer';

export class Device {
  constructor(
    public id?: string,
    public name?: string,
    public data: string | null = null, // Allow null as a valid value
    public networkId?: number,
    public deviceTypeId?: number,
    public isBlocked: boolean = false
  ) {}

  static fromObject(plainObject: object): Device {
    const device = plainToClass<Device, object>(Device, plainObject);
    if (device.data) {
      device.data = JSON.stringify(device.data, null, 2);
    } else {
      device.data = ''; // Set to empty string if data is null or undefined
    }
    return device;
  }

  static fromDevice(device: Device) {
    return new this(
      device.id,
      device.name,
      device.data,
      device.networkId,
      device.deviceTypeId,
      device.isBlocked
    );
  }

  toObject() {
    const obj = Object.assign({}, this);
    if (this.data != null && this.data.length > 0) {
      obj.data = JSON.parse(this.data);
    } else {
      obj.data = null; // Now this is valid since data can be null
    }
    return obj;
  }
}