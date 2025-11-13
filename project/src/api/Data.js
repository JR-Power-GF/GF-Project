import request from "./request";
import base from "./base";

export const getOneDataApi = () => {
  return request({
    url: base.oneData, // url: '/api/oneData',
    method: "get",
  });
};

export const getTwoDataApi = () => {
  return request({
    url: base.twoData, // url: '/api/twoData',
    method: "get",
  });
};

export const getThreeDataApi = () => {
  return request({
    url: base.threeData, // url: '/api/threeData',
    method: "get",
  });
};

export const getFourDataApi = () => {
  return request({
    url: base.fourData, // url: '/api/fourData',
    method: "get",
  });
};
