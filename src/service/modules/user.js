import { request } from '../index'
//userDetail
export const getUserDetail = (params) => {
    return request({
        url: `/user/detail/${params.id}`,
        method: "GET",
        // params
    })
} 