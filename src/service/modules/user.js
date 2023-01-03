import { request } from "../index";
//userDetail
export const getUserCategoryDetail = (params) => {
  return request({
    url: `/user/detail/${params.id}`,
    method: "GET",
    // params
  });
};

//userCategory
export const getUserArticle = (id) => {
  return request({
    url: `/user/article/${id}`,
    method: "GET",
  });
};
