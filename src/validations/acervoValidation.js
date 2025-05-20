import * as yup from 'yup';

export const acervoSchema = yup.object().shape({
  titulo: yup
    .string().required('Título é obrigatória'),
  ativo: yup
    .boolean().required()
});