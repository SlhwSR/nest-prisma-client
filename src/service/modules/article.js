import { request } from "../index";
//新增
export const AddOneArticle = (data) => {
  return request({
    url: "/article",
    method: "POST",
    data,
  });
};
export const getArticleList = (params) => {
  return request({
    url: "/article",
    method: "GET",
    params,
  });
};
//update
export const updateArticle = (data) => {
  return request({
    url: `/article/${data.id}`,
    method: "PATCH",
    data: {
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
    },
  });
};
export const deleteArticle = (id) => {
  return request({
    url: `/article/${id}`,
    method: "DELETE",
  });
};

export const querySearch = (params) => {
  return request({
    url: "/article/findSome",
    method:"GET",
    params,
  });
};
