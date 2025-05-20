import * as yup from 'yup';

export const fornecedorSchema = yup.object().shape({
  cnpj: yup
    .string().required('CNPJ é obrigatória'),
  ativo: yup
    .boolean().required()
});