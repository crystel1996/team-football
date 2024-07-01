import { FC } from "react";
import { CardComponentInterface } from "./interface";

export const Card: FC<CardComponentInterface> = (props) => {
    return  <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                <img className="w-full md:w-1/3 h-48 md:h-auto object-cover" src={props.image} alt={props.title} />
                <div className="w-full md:w-2/3 p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
                    <p className="text-gray-600 mt-2">{props.description}</p>
                    {props.link && (
                        <div className="mt-4">
                            <a href={props.link} className="text-blue-500 hover:text-blue-700">En savoir plus</a>
                        </div>
                    )}
                </div>
            </div>
}