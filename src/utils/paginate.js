import _ from "lodash";


export function paginate(items , currentPage , pageSize){
    //This func takes 3 params and return movies list at one page with its size.
    
    const startIndex = (currentPage - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
}

