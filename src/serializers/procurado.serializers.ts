import * as yup from "yup";

export const createFugitiveSerializer = yup.object().shape({
  descricao: yup.string().required(),
  ativo: yup
    .boolean()
    .default(() => true)
    .transform(() => true),
  cidadaoId: yup.string().required(),
});

export const updateFugitiveSerializer = yup.object().shape({
  ativo: yup.boolean().required(),
});
