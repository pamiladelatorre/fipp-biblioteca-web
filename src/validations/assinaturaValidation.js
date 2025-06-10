// src/validations/assinaturaValidation.js
import * as yup from 'yup';

export const assinaturaSchema = yup.object().shape({
  fornecedorId: yup
    .number()
    .typeError('Fornecedor é obrigatório')
    .required('Fornecedor é obrigatório'),

  descricao: yup
    .string()
    .required('Descrição é obrigatória'),

  periodicidade: yup
    .string()
    .required('Periodicidade é obrigatória'),

  numeroContrato: yup
    .string()
    .required('Número do contrato é obrigatório'),

  valor: yup
    .number()
    .typeError('Valor deve ser um número')
    .positive('Valor deve ser maior que zero')
    .required('Valor é obrigatório'),

  dataInicio: yup
    .date()
    .typeError('Data de início inválida')
    .required('Data de início é obrigatória'),

  dataFim: yup
    .date()
    .typeError('Data de fim inválida')
    .min(yup.ref('dataInicio'), 'Data de fim não pode ser anterior à data de início')
    .required('Data de fim é obrigatória'),

  ativo: yup
    .boolean()
    .required('Status ativo é obrigatório'),
});
