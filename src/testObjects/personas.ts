import { PersonaInitialsColor } from "office-ui-fabric-react";
import { IPersona } from "../components/users";

export const persona: IPersona = {
  imageInitials: "JS",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  initialsColor: PersonaInitialsColor.blue,
  personaName: "john.smith@outlook.com",
  userName: "John Smith"
};

export const persona1: IPersona = {
  imageInitials: "JD",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/9/9e/Microsoft_OneNote_2013_logo.svg",
  initialsColor: PersonaInitialsColor.green,
  personaName: "jane.doe@outlook.com",
  userName: "Jane Doe"
};
