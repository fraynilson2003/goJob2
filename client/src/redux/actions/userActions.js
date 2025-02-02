//** Dependencies */
import axios from "axios";
//** Constants */
import { ActionTypes } from "../constants/actions-types";

//* ACTIONS USERS *************/

export const createUser = (input) => {
  return async (dispatch) => {
    // const formData = new FormData();
    try {
      const json = JSON.stringify({
        user: input.user,
        jobs: input.jobs,
      });

      const formData2 = new FormData();

      formData2.append("user", input.user.user);
      formData2.append("image", input.image);
      const customConfig = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const customConfig2 = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("user/register", { user: input.user, jobs: input.jobs });
      setTimeout(() => {}, 30000);
      await axios.post("/user/register/img", formData2, customConfig2);
      return dispatch({
        type: ActionTypes.CREATE_USER,
        // payload: result.data,
      });
    } catch (error) {
      console.log("Hubo errorrrrrrrrrrrrrr");
      console.log(error);
    }
  };
};

export const createAndLogin = (newUser) => async (dispatch) => {
  try {
    let result = await axios.post("/user/register", newUser);

    console.log(result.data);
    //return null
    return dispatch({
      type: ActionTypes.REGISTER_USER_AND_LOGIN,
      payload: result.data,
    });
  } catch (error) {
    throw Error(error);
    console.log("No se pudo iniciar");
  }
};

export const putUser = (newUser) => async (dispatch) => {
  try {
    let result = await axios.put("/user/update", newUser);
    
    console.log("FINALLYYYY",result.data);
    return dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: result.data,
    });
  } catch (error) {
    throw Error(error);
    console.log("No se pudo iniciar");
  }
};

export const uploadImage = (input) => async (dispatch) => {
  try {
    console.log(input.user);
    // console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

export const getUsers = () => {
  return async (dispatch) => {
    const result = await axios.get("/user");

    console.log("Se hizo una peticion de todos los Users");
    return dispatch({
      type: ActionTypes.GET_USERS,
      payload: result.data.result,
    });
  };
};

export const updateUser = (payload) => {
  return async () => {
    try {
      await axios.put(`/user/update`, payload);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserDetail = (id,state) => {
  return async (dispatch) => {
    const result = await axios.get(`/user/get/${id}`,{
      state:state
    });
    return dispatch({
      type: ActionTypes.USER_DETAIL,
      payload: result.data.result,
    });
  };
};
export const getUserDetailOpinion1 = (id) => {
  return async (dispatch) => {
    const result = await axios.get(`/user/get/${id}`);
    return dispatch({
      type: "USER_DETAIL_OPINION_1",
      payload: result.data.result,
    });
  };
};
export const getUserDetailOpinion2 = (id) => {
  return async (dispatch) => {
    const result = await axios.get(`/user/get/${id}`);
    return dispatch({
      type: "USER_DETAIL_OPINION_2",
      payload: result.data.result,
    });
  };
};
export const getUserDetailOpinion3 = (id) => {
  return async (dispatch) => {
    const result = await axios.get(`/user/get/${id}`);
    return dispatch({
      type: "USER_DETAIL_OPINION_3",
      payload: result.data.result,
    }); 
  };
};

export const getUserReviewDetails = (ids) => {
  return async (dispatch) => {
    try {
      const promises = ids.map((id) => axios.get(`/user/get/${id}`));
      const responses = await Promise.all(promises);
      const userReviewDetails = responses.map(
        (response) => response.data.result
      );
      // console.log(userReviewDetails);
      dispatch({ type: "GET_USER_REVIEW_DETAIL", payload: userReviewDetails });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cleanUserDetail = () => {
  return (dispatch) => {
    return dispatch({
      type: ActionTypes.CLEAN_USER_DETAIL,
    });
  };
};
