import * as yup from "yup";

const createBulletinSerializer = yup.object().shape({
  descricao: yup.string().required(),
  policial_id: yup.string().uuid().required(),
  cidadao_id: yup.string().uuid().required(),
  veiculo_id: yup.string().uuid().notRequired(),
});

const updateBulletinSerializer = yup.object().shape({
  finalizado: yup.boolean().required(),
});

export { createBulletinSerializer, updateBulletinSerializer };
