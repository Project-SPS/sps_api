import * as yup from "yup";

export const createFineSerializer = yup.object().shape({
  multaId: yup.string().uuid().required(),
});
