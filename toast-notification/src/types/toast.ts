import { notificationType } from "./notification";

export interface ToastType extends notificationType{
    clearNotification:(id:string,toastRef?:any)=>void
}