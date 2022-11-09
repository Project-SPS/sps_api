import * as yup from "yup";
import bcryptjs from "bcryptjs";

export const createPolicialSerializer = yup.object().shape({
  cod_registro: yup.string().required(),
  patente: yup.string().required(),
  senha: yup.string().required(),
  administrador: yup.boolean().default(() => false),
  ativo: yup
    .boolean()
    .default(() => true)
    .transform(() => true),
  cidadaoId: yup.string().uuid().required(),
});

export const updatePolicialSerializer = yup
  .object()
  .shape({
    patente: yup.string(),
    senha: yup.string().transform((value) => bcryptjs.hashSync(value, 10)),
    administrador: yup.boolean(),
  })
  .test("at-least-one-field", "Você deve informar um valor para patente, senha ou administrador.", (value) => {
    if (value.patente || value.senha || value.administrador != null) {
      return true;
    }
    return false;
  });
