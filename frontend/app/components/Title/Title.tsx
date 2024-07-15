import { FC, createElement } from "react";
import { TitleComponentInterface } from "./interface";

export const Title: FC<TitleComponentInterface> = (props) => {
    return <div className="w-screen text-center">
                {createElement(`h${props.heading ?? 1}`, {className: "text-4xl font-bold text-blue-600 mt-4 mb-6"}, props.title)}
                {props.subtitle && (<p className="text-lg text-gray-700">{props.subtitle}</p>)}
                {props.subtitleLink && (
                    <a href={props.subtitleLink.link} className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        {props.subtitleLink.title}
                    </a>
                )}
            </div>
}