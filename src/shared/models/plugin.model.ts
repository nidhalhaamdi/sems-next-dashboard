import { Device } from './device.model';
import { plainToClass } from 'class-transformer';

export class Plugin {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public topicName?: string,
        public filter?: string,
        public status?: string,
        public subscriptionId?: string,
        public userId?: number,
        public parameters: string | null = null, // Allow null as a valid value
        public returnCommands: boolean = false,
        public returnUpdatedCommands: boolean = false,
        public returnNotifications: boolean = false,
        public names: string | null = null, // Allow null as a valid value
        public device: Device = new Device(),
        public deviceId: string | null = null, // Allow null as a valid value
        public networkIds: Array<number> = [],
        public deviceTypeIds: Array<number> = []
    ) {}

    static STATUSES = {
        INACTIVE: 'INACTIVE',
        ACTIVE: 'ACTIVE',
        CREATED: 'CREATED'
    };

    static fromObject(plainObject: object): Plugin {
        const plugin = plainToClass<Plugin, object>(Plugin, plainObject);
        if (plugin.parameters) {
            plugin.parameters = JSON.stringify(plugin.parameters, null, 2);
        } else {
            plugin.parameters = ''; // Set to empty string if data is null or undefined
        }
        return plugin;
    }

    static fromPluginApiResponse(plugin: Plugin) {
        const pluginCopy = new this(
            plugin.id,
            plugin.name,
            plugin.description,
            plugin.topicName,
            plugin.filter,
            plugin.status,
            plugin.subscriptionId,
            plugin.userId,
            plugin.parameters,
            plugin.returnCommands,
            plugin.returnUpdatedCommands,
            plugin.returnNotifications,
            plugin.names,
            plugin.device,
            plugin.deviceId,
            plugin.networkIds,
            plugin.deviceTypeIds
        );

        // Ensure plugin.filter is defined before splitting
        if (!plugin.filter) {
            throw new Error("Filter is required for Plugin API response");
        }

        const filters = plugin.filter.split('/');

        const typesString = filters[0];
        if (typesString === '*') {
            pluginCopy.returnCommands = true;
            pluginCopy.returnUpdatedCommands = true;
            pluginCopy.returnNotifications = true;
        } else {
            const messageTypes = typesString.split(',');
            if (messageTypes.length !== 0) {
                if (messageTypes.indexOf('command') !== -1) {
                    pluginCopy.returnCommands = true;
                }
                if (messageTypes.indexOf('command.update') !== -1) {
                    pluginCopy.returnUpdatedCommands = true;
                }
                if (messageTypes.indexOf('notification') !== -1) {
                    pluginCopy.returnNotifications = true;
                }
            }
        }

        const networkIds = filters[1];
        if (networkIds === '*') {
            pluginCopy.networkIds = [];
        } else {
            pluginCopy.networkIds = networkIds.split(',').map(x => parseInt(x, 10));
        }

        const deviceTypeIds = filters[2];
        if (deviceTypeIds === '*') {
            pluginCopy.deviceTypeIds = [];
        } else {
            pluginCopy.deviceTypeIds = deviceTypeIds.split(',').map(x => parseInt(x, 10));
        }

        const deviceId = filters[3];
        if (deviceId === '*') {
            pluginCopy.deviceId = null; // Now this is valid since deviceId can be null
        } else {
            pluginCopy.deviceId = deviceId;
        }

        const names = filters[4];
        if (names === '*') {
            pluginCopy.names = null; // Now this is valid since names can be null
        } else {
            pluginCopy.names = names;
        }

        return pluginCopy;
    }

    toObject() {
        const obj = Object.assign({}, this);
        if (this.parameters != null && this.parameters.length > 0) {
            obj.parameters = JSON.parse(this.parameters);
        } else {
            obj.parameters = null;
        }
        return obj;
    }
}