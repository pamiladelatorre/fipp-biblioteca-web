import * as yup from 'yup';

export const usuarioSchema = yup.object().shape({
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
  
  nome: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  
  dataNascimento: yup
    .date()
    .typeError('Data de nascimento inválida')
    .required('Data de nascimento é obrigatória'),

  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'Telefone inválido'),

  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('E-mail inválido'),

  cep: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{8}$/, 'CEP deve conter 8 dígitos numéricos'),

  tipoUsuario: yup
    .string()
    .required('Tipo de usuário é obrigatório'),

  bloqueado: yup
    .boolean()
    .required(),

  ativo: yup
    .boolean()
    .required()
});