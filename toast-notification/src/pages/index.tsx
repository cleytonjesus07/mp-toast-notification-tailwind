import { Inter } from "next/font/google";
import Toast from "@/components/Toast";
import { useState } from "react";
import notificationsData from "@/data/notification-model";
import { v4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [listNotifications,setListNotifications] = useState<JSX.Element[]>([]) 
  const [notificationPosition,setNotificationPosition] = useState<"topLeft" | "bottomRight">("bottomRight");
  const sendNotification:(()=>void) = ()=>{
    const randomIndex:number = Math.floor(Math.random() * notificationsData.length);
    
    const toastNotificationsElement:any = notificationsData.map((nm,i)=>{
      const toastKey:string = `toast-${i}-${v4()}`;
      const toastId = `toast-${i}-${v4()}`;
      return <Toast key={toastKey} id={toastId} image={nm.image} name={nm.name} role={nm.role} clearNotification={clearNotifications}/>
    });
    setListNotifications((old)=>([...old,toastNotificationsElement[randomIndex]]));
  }

  const position = {
    topLeft:`top-0 left-0`,
    bottomRight:`bottom-0 right-0 flex-col-reverse`
  }

  type toastReftype = {
    current:HTMLDivElement
  }

  const clearNotifications = (id:string,toastRef:toastReftype):void=>{
    if(toastRef){ 
    toastRef.current.classList.add("animate-disappear")
    toastRef.current.onanimationend =  () =>  setListNotifications(old=>old.filter((notification) => (notification.props.id !== id)));
   }else{
    setListNotifications(old=>old.filter((notification) => (notification.props.id !== id)))
   }
  }

  return (
    <main
      className={`${inter.className} flex flex-col space-y-5`}
    >
    <div className="flex gap-10 text-white">
      <div className="flex gap-2">
        <input checked={notificationPosition === "topLeft" ? true : false} onChange={()=>setNotificationPosition("topLeft")} type="radio" name="group"/>
        <span>Canto superior esquerdo</span>
      </div>
      <div className="flex gap-2">
        <input checked={notificationPosition === "bottomRight" ? true : false} onChange={()=>setNotificationPosition("bottomRight")} type="radio" name="group"/>
        <span>Canto inferior direito</span>
      </div>
    
    </div>
    <button onClick={sendNotification} className="relative bg-green-200 p-2 rounded-md font-bold text-slate-900">
      {listNotifications.length ? <span className="absolute -top-3 -right-1 p-3 w-5 h-5 bg-red-600 text-white rounded-full flex justify-center items-center">{listNotifications.length}</span> : ""}
      Mostrar Notificação
    </button>
    <div className={`fixed ${position[notificationPosition]} flex  flex-col items-center p-2 gap-2 w-80 overflow-x-hidden max-h-svh`}>
      {listNotifications?.map((notification)=>notification)}
    </div>
    </main>
  );
}
