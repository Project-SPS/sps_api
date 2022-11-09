import * as yup from "yup";

export const createSessionSerializer = yup.object().shape({
  cod_registro: yup.string().required(),
  senha: yup.string().required(),
});
