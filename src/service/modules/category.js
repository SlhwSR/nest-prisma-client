import { request } from '../index'
//新增
export const AddOneCategory = (data) => {
    return request({
        url: "/category",
        method: "POST",
        data
    })
}
//findall
export const getCategoryList = (params) => {
    return request({
        url: "/category",
        method: "GET",
        params
    }) 
}