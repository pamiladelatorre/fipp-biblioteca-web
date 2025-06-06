import * as yup from 'yup';

export const doadorSchema = yup.object().shape({

  tipoPessoa: yup.string().required('Tipo de Pessoa é obrigatório'),
  nome: yup.string().required('Nome é obrigatório'),
  documento: yup.string().required('Documento é obrigatório'),
  telefone: yup
  .string()
  .required('Telefone é obrigatório')
  .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, 'Telefone deve estar no formato (99) 99999-9999')
,
  email: yup
  .string()
  .email('E-mail inválido')
  .required('E-mail é obrigatório'),
  ativo: yup
    .boolean().required()
});
