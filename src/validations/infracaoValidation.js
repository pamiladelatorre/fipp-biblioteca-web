// validations/infracaoValidation.js
import * as yup from 'yup';

export const infracaoSchema = yup.object().shape({
  usuarioId: yup.string().required('Usuário é obrigatório'),
  tipoInfracao: yup.string().required('Tipo é obrigatório'),
  grauInfracao: yup.string().required('Grau é obrigatório'),
  status: yup.string().required('Status é obrigatório'),
  motivo: yup.string().required('Motivo é obrigatório'),
  dataInicio: yup.date().required('Data de início é obrigatória'),
  dataFim: yup.date().required('Data de fim é obrigatória'),
});
