import * as yup from 'yup';

export const autorSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Nome é obrigatório'),
  nacionalidade: yup
    .string()
    .required('Nacionalidade é obrigatória'),
  dataNascimento: yup
    .date()
    .typeError('Data de nascimento inválida')
    .nullable()
    .required('Data de nascimento é obrigatória'),
  biografia: yup
    .string()
    .max(1000, 'Biografia deve ter no máximo 1000 caracteres')
    .nullable(), // Opcional, mas aceita string vazia
  ativo: yup
    .boolean()
    .required()
});