import * as yup from 'yup';

export const entradaSchema = yup.object().shape({
  acervoId: yup.string().required('Acervo é obrigatório'),
  tipoOrigem: yup.string().required('Tipo de origem é obrigatório'),
  quantidade: yup.number().typeError('Quantidade deve ser um número').required('Quantidade é obrigatória'),
  dataEntrada: yup.date()
    .typeError('Data de entrada inválida')
    .nullable()
    .required('Data de entrada é obrigatória')
    .max(new Date(), 'Data de entrada não pode ser no futuro'),

  contrato: yup.string().when('tipoOrigem', {
    is: 'assinatura',
    then: (schema) => schema.required('Contrato é obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  empenho: yup.string().when('tipoOrigem', {
    is: 'compra',
    then: (schema) => schema.required('Empenho é obrigatório'),
    otherwise: (schema) => schema.notRequired()
  }),

  doadorId: yup.mixed().when('tipoOrigem', {
    is: 'doacao',
    then: (schema) => schema.required('Doador é obrigatório'),
    otherwise: (schema) => schema.notRequired()
  })
});