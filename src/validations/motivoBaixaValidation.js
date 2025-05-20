import * as yup from 'yup';

export const motivoBaixaSchema = yup.object().shape({
  descricao: yup
    .string().required('Descrição é obrigatória'),
  ativo: yup
    .boolean().required()
});