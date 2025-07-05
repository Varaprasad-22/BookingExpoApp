import { createContext, ReactNode, useState } from "react";
//? marksays it is optional propwerty
type Item={
    id:number;
    count:number;
    name?:string;
    size?: string;
  price: string;
    [key:string]:any;
}

type StoreContextType={
    items:{[key:number]:Item};
    updateItems:(params:{id:number;data:Partial<Item>})=>void;
}

export const StoreContext=createContext<StoreContextType>({
    items:{},
    updateItems:()=>{},
})

function StoreContextProvider({children}:{children:ReactNode}){
    const [items,setItems]=useState<{[key:number]:Item}>({});

    const updateItems=({id,data}:{id:number ,data:Partial<Item>})=>{
        setItems((prev)=>{
            const current=prev[id]||{};
            const update={...current,...data,id};
            if(update.count!==undefined&&update.count<0){
                const newItems={...prev};
                delete newItems[id];
                return newItems; 
            }
            return {...prev,[id]:update};
        })
    }
    return(
        <StoreContext.Provider value={{items,updateItems}}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
