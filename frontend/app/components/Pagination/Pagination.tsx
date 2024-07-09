import { FC, useMemo } from "react";
import { PaginationComponentInterface } from "./interface";

export const Pagination: FC<PaginationComponentInterface> = (props) => {

    const ITEMS = useMemo(() => {
        const classNameItem = "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700";
        const classNameItemActive = "px-3 py-2 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700";
        
        let startPage = Math.max(1, props.currentPage - 2);
        let endPage = Math.min(props.totalPage, startPage + 4);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        const list = [...Array(5)].map((_, index) => {
            const pageNumber = startPage + index;
            const isActive = pageNumber === props.currentPage;
            return  <li key={`${props.path}?p=${pageNumber}`}>
                        <a href={`${props.path}?p=${pageNumber}`} className={isActive? classNameItemActive : classNameItem}>{pageNumber}</a>
                    </li>
        });
        return <>
            <li>
                {props.previousDisabled ? 
                    <span className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-not-allowed`}>Precedent</span>
                : 
                    <a href={`${props.path}?p=${startPage - 1}`} className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700`}>Precedent</a>
                }
            </li>
            {list}
            <li>
            {props.nextDisabled ? 
                <span className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-not-allowed`}>Suivant</span>
            : 
                <a href={`${props.path}?p=${endPage + 1}`} className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700`}>Suivant</a>
            }
        </li>
        </>
    }, [props.currentPage, props.totalPage, props.nextDisabled, props.previousDisabled, props.path, props.totalPage]);

    return  <div className="flex justify-center mt-4">
                <nav aria-label="Page navigation">
                <ul className="inline-flex items-center -space-x-px">
                    {ITEMS}
                </ul>
                </nav>
            </div>
}