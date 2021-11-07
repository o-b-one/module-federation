import {ExportedComponents} from "./components";

export {IUser} from "@mfe/auth";

export {IUserFacade} from "./src/modules/bootstrap/interfaces/user-facade.interface";

export type UserComponents = keyof ExportedComponents;
