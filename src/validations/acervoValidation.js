import * as yup from 'yup';

export const acervoSchema = yup.object().shape({
  titulo: yup
    .string()
    .required('Título é obrigatório'),
  editora: yup
    .string()
    .required('Editora é obrigatória'),
  numeroEdicao: yup
    .number()
    .typeError('Número da edição deve ser um número')
    .positive('Deve ser um número positivo')
    .integer('Deve ser um número inteiro')
    .nullable()
    .required('Número da edição é obrigatório'),
  numeroPagina: yup
    .number()
    .typeError('Número de páginas deve ser um número')
    .positive('Deve ser um número positivo')
    .integer('Deve ser um número inteiro')
    .nullable()
    .required('Número de páginas é obrigatório'),
  isbn: yup
    .string()
    .required('ISBN é obrigatório'),
  dataPublicacao: yup
    .date()
    .typeError('Data de publicação inválida')
    .nullable()
    .required('Data de publicação é obrigatória'),
  autorId: yup
    .string()
    .required('Autor é obrigatório'),
  generoId: yup
    .string()
    .required('Gênero é obrigatório'),
  categoriaId: yup
    .string()
    .required('Categoria é obrigatória'),
  ativo: yup
    .boolean()
    .required()
});