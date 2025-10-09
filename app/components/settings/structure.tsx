import { KeySquareIcon, SettingsIcon, UserCircleIcon } from "lucide-react";
import Theme from "./sections/theme";




const structure = [
  {
    "name": "Общие",
    "id": "general",
    "icon": SettingsIcon,
    "content": <><Theme /></>
  },
  {
    "name": "Безопасность",
    "id": "security",
    "icon": KeySquareIcon,
    "content": <div></div>
  },
  {
    "name": "Профиль",
    "id": "profile",
    "icon": UserCircleIcon,
    "content": <div></div>
  },
] as const;

export const defaultSection = "general" as const;

export const getTabs = () => structure.map(item => ({ "id": item.id, "name": item.name, "icon": item.icon }));
export const getName = (id: string) => structure.find(item => item.id === id)?.name;
export const getContent = (id: string) => structure.find(item => item.id === id)?.content;

export default structure;
