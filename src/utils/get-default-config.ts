/* eslint-disable import/extensions */
import { HomeAssistant } from "custom-card-helpers";

export const defaultValues = {
  maxFlowRate: 6,
  minFlowRate: 0.75,
  wattDecimals: 0,
  kilowattDecimals: 1,
  minExpectedPower: 0.01,
  maxExpectedPower: 2000,
  wattThreshold: 1000,
};

export function getDefaultConfig(hass: HomeAssistant): object {
  function checkStrings(entiyId: string, testStrings: string[]): boolean {
    const friendlyName = hass.states[entiyId].attributes.friendly_name;
    return testStrings.some((str) => entiyId.includes(str) || friendlyName?.includes(str));
  }
  const powerEntities = Object.keys(hass.states).filter((entityId) => {
    const stateObj = hass.states[entityId];
    const isAvailable =
      (stateObj.state && stateObj.attributes && stateObj.attributes.device_class === "power") || stateObj.entity_id.includes("power");
    return isAvailable;
  });

  const gridPowerTestString = ["grid", "utility", "net", "meter"];
  const solarTests = ["solar", "pv", "photovoltaic", "inverter"];
  const batteryTests = ["battery"];
  const batteryPercentTests = ["battery_percent", "battery_level", "state_of_charge", "soc", "percentage"];
  const firstGridPowerEntity = powerEntities.filter((entityId) => checkStrings(entityId, gridPowerTestString))[0];
  const firstSolarPowerEntity = powerEntities.filter((entityId) => checkStrings(entityId, solarTests))[0];
  const firstBatteryPowerEntity = powerEntities.filter((entityId) => checkStrings(entityId, batteryTests))[0];

  const percentageEntities = Object.keys(hass.states).filter((entityId) => {
    const stateObj = hass.states[entityId];
    const isAvailable = stateObj && stateObj.state && stateObj.attributes && stateObj.attributes.unit_of_measurement === "%";
    return isAvailable;
  });

  const firstBatteryPercentageEntity = percentageEntities.filter((entityId) => checkStrings(entityId, batteryPercentTests))[0];
  return {
    entities: {
      battery: {
        entity: firstBatteryPowerEntity ?? "",
        state_of_charge: firstBatteryPercentageEntity ?? "",
      },
      grid: firstGridPowerEntity ? { entity: firstGridPowerEntity } : undefined,
      solar: firstSolarPowerEntity ? { entity: firstSolarPowerEntity, display_zero_state: true } : undefined,
    },
    clickable_entities: true,
    display_zero_lines: true,
    use_new_flow_rate_model: true,
    w_decimals: defaultValues.wattDecimals,
    kw_decimals: defaultValues.kilowattDecimals,
    min_flow_rate: defaultValues.minFlowRate,
    max_flow_rate: defaultValues.maxFlowRate,
    max_expected_power: defaultValues.maxExpectedPower,
    min_expected_power: defaultValues.minExpectedPower,
    watt_threshold: defaultValues.wattThreshold,
  };
}
