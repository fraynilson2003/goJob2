export const createService = (input) => {
  return async (dispatch) => {
    try {
      const customConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const input_ = {
        name: input.name,
        tittle: input.tittle,
        description: input.description,
        provincia: input.provincia,
        ciudad: input.ciudad,
        direccion: input.direccion,
        presupuesto: input.presupuesto,
        jobs: input.jobs,
      };

      const formData = new FormData();
      formData.append("image", input.inputImage);
      // formData.append("id", input.id);

      const result = await axios.post("user/service", input_);

      await axios.put(`/user/service/img/${result.data.service.id}`,
        formData,
        customConfig
      );

      return dispatch({
        type: ActionTypes.CREATE_SERVICE,
        payload: result.data,
      });
    } catch (error) {
      alert("Relleno correctamente los formularios");
      // throw new Error("Error en createService");
    }
  };
};