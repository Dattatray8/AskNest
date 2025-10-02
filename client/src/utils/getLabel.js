import { roleTabs } from "../config/roleTabs";

export const getLabel = (tabKey) => {
  for (let tab in roleTabs) {
    const foundTab = roleTabs[tab].find((t) => t.key === tabKey);
    if (foundTab) {
      return foundTab.label;
    }
  }
  return "Unknown Tab";
};
