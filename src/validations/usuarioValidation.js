import * as yup from 'yup';

export const usuarioSchema = yup.object().shape({
  nome: yup
    .string().required('Nome é obrigatória'),
  ativo: yup
    .boolean().required()
});