/* eslint unicorn/filename-case: "off", func-names: "off", camelcase: "off", no-unused-vars: "off" */

module.exports = function (iface) {
    const {mqttPub, mqttSub, mqttStatus, log, Service, Characteristic} = iface;

    return function createService_Doorbell(acc, settings, subtype) {
        acc.addService(Service.Doorbell, settings.name, subtype);

        mqttSub(settings.topic.statusEvent, () => {
            log.debug('> hap set', settings.name, 'ProgrammableSwitchEvent', 1);
            acc.getService(subtype)
                .setCharacteristic(Characteristic.ProgrammableSwitchEvent, 1);
        });
    };
};
