import { LovelaceCardConfig } from "custom-card-helpers";
import { ComboEntity, IndividualDeviceType, SecondaryInfoType } from "./type.js";

export interface PowerFlowCardPlusConfig extends LovelaceCardConfig {
  entities: {
    battery?: {
      entity: string | ComboEntity;
      state_of_charge?: string;
      name?: string;
      icon?: string;
      color?: ComboEntity;
      color_icon?: boolean | "production" | "consumption";
      display_state?: "two_way" | "one_way" | "one_way_no_zero";
      state_of_charge_unit_white_space?: boolean;
      color_state_of_charge_value?: boolean | "production" | "consumption";
      color_circle: boolean | "production" | "consumption";
      display_zero_tolerance?: number;
    };
    grid?: {
      entity: string | ComboEntity;
      name?: string;
      icon?: string;
      color?: ComboEntity;
      color_icon?: boolean | "production" | "consumption";
      display_state?: "two_way" | "one_way" | "one_way_no_zero";
      color_circle: boolean | "production" | "consumption";
      secondary_info?: SecondaryInfoType;
      display_zero_tolerance?: number;
      power_outage: {
        entity: string;
        state_alert?: string;
        label_alert?: string;
        icon_alert?: string;
      };
    };
    solar?: {
      entity: string;
      name?: string;
      icon?: string;
      color?: any;
      color_icon?: boolean;
      color_value?: boolean;
      color_label?: boolean;
      secondary_info?: SecondaryInfoType;
      display_zero_state?: boolean;
      display_zero_tolerance?: number;
    };
    home?: {
      entity?: string;
      name?: string;
      icon?: string;
      override_state?: boolean;
      color_icon?: boolean | "solar" | "grid" | "battery";
      color_value?: boolean | "solar" | "grid" | "battery";
      secondary_info?: SecondaryInfoType;
      subtract_individual?: boolean;
    };
    fossil_fuel_percentage?: {
      entity: string;
      name?: string;
      icon?: string;
      color?: string;
      state_type?: "percentage" | "power";
      color_icon?: boolean;
      display_zero?: boolean;
      display_zero_state?: boolean;
      display_zero_tolerance?: number;
      color_value?: boolean;
      color_label?: boolean;
      unit_white_space?: boolean;
      secondary_info?: SecondaryInfoType;
      calculate_flow_rate?: boolean | number;
      seconday_info: SecondaryInfoType;
    };
    individual1?: IndividualDeviceType;
    individual2?: IndividualDeviceType;
  };
  dashboard_link?: string;
  dashboard_link_label?: string;
  inverted_entities: string | string[];
  kw_decimals: number;
  min_flow_rate: number;
  max_flow_rate: number;
  w_decimals: number;
  watt_threshold: number;
  clickable_entities: boolean;
  max_expected_power: number;
  min_expected_power: number;
  display_zero_lines?: boolean;
  use_new_flow_rate_model?: boolean;
}
