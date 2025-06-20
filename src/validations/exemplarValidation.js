import * as yup from 'yup';

export const exemplarSchema = yup.object().shape({
  motivoBaixaId: yup
    .string()
    .required('Motivo Baixa é obrigatório')
});