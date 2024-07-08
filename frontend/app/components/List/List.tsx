import { FC } from "react";
import { ListComponentInterface } from "./interface";

export const List: FC<ListComponentInterface> = (props) => {
    return <ul role="list" className="grid gap-4 grid-cols-3 max-[600px]:grid-cols-2 grid-rows-3 max-[600px]:grid-rows-2">
        {(props.items || []).map((item) => {
            return  <li key={item.name} className="flex justify-center gap-x-6 py-5 cursor-pointer hover:bg-blue-600">
                        <div className="flex items-center min-w-0 gap-x-4">
                            {item.image && (<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.image} alt={item.image} />)}
                            <div className="min-w-0 flex-auto align-items">
                                <div>
                                    {item.link && (
                                        <a href={item.link} className="text-sm font-semibold leading-6 text-gray-900 ">{item.name}</a>
                                    )}
                                    {!item.link && (
                                        <p className="text-sm font-semibold leading-6 text-gray-900 ">{item.name}</p>
                                    )}
                                </div>
                                {item.subtitle && (
                                    <div>
                                        
                                        <p  className="text-sm text-gray-600 ">{item.subtitle}</p>
                                        
                                    </div>
                                )}
                            </div>
                        </div>
                    </li> 
        })}
  </ul>
}