import * as yup from "yup";

export const createFugitiveSerializer = yup.object().shape({
  descricao: yup.string().required(),
  esta_ativo: yup
    .boolean()
    .default(() => true)
    .transform(() => true),
  cpf: yup.string().required(),
  image: yup.string(),
});

export const updateFugitiveSerializer = yup.object().shape({
  esta_ativo: yup.boolean().required(),
});
