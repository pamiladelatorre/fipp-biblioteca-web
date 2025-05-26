import * as yup from 'yup';

export const metodoPagamentoSchema = yup.object({
  tipoPagamento: yup
    .string()
    .required('Tipo de pagamento é obrigatório'),

  prazo: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .when('tipoPagamento', {
      is: 'boleto',
      then: schema =>
        schema
          .typeError('Prazo deve ser um número')
          .required('Prazo é obrigatório')
          .moreThan(0, 'Prazo deve ser maior que zero'),
      otherwise: schema => schema.notRequired(),
    }),

    parcelaMaxima: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .when('tipoPagamento', {
      is: 'cartao',
      then: schema =>
        schema
          .typeError('Parcelamento deve ser um número')
          .required('Parcelamento é obrigatório')
          .moreThan(0, 'Parcelamento deve ser maior que zero'),
      otherwise: schema => schema.notRequired(),
    }),

  chavePix: yup
    .string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .when('tipoPagamento', {
      is: 'pix',
      then: schema => schema.required('Chave Pix é obrigatória'),
      otherwise: schema => schema.notRequired(),
    }),
});

export const fornecedorSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required('CNPJ é obrigatório')
    .matches(/^\d{14}$/, 'CNPJ deve conter 14 números'),
  razaoSocial: yup.string().required('Razão Social é obrigatória'),
  telefone: yup.string().required('Telefone é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  metodosPagamento: yup
    .array()
    .of(metodoPagamentoSchema)
    .test(
      'metodos-validos',
      'Adicione pelo menos um método de pagamento válido',
      (value) => Array.isArray(value) && value.some((m) => !m.excluido)
    ),
});