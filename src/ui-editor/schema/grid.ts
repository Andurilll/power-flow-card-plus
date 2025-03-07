/* eslint-disable import/extensions */
import {
  getEntityCombinedSelectionSchema,
  getEntitySeparatedSelectionSchema,
  secondaryInfoSchema,
  getBaseMainConfigSchema,
  customColorsSchema,
} from "./_schema-base";

const powerOutageGridSchema = [
  {
    name: "entity",
    selector: { entity: {} },
  },
  {
    type: "grid",
    column_min_width: "200px",
    schema: [
      { name: "label_alert", label: "Outage Label", selector: { text: {} } },
      { name: "icon_alert", label: "Outage Icon",  selector: { icon: {} } },
      { name: "state_alert", label: "Outage State", selector: { text: {} } },
    ],
  },
] as const;

export const gridSchema = [
  getEntityCombinedSelectionSchema(),
  getEntitySeparatedSelectionSchema(),
  getBaseMainConfigSchema("grid"),
  customColorsSchema,
  {
    title: "Secondary Info",
    name: "secondary_info",
    type: "expandable",
    schema: secondaryInfoSchema,
  },
  {
    title: "Power Outage",
    name: "power_outage",
    type: "expandable",
    schema: powerOutageGridSchema,
  },
] as const;
