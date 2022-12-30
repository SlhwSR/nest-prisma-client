import { request } from '../index'
//userDetail
export const getUserCategoryDetail = (params) => {
    return request({
        url: `/user/detail/${params.id}`,
        method: "GET",
        // params
    })
} 