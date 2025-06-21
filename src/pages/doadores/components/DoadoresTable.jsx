import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Form } from "react-bootstrap";
import { TipoPessoa } from '../../../enums/TipoPessoa';

function DoadoresTable({ doadores, onEdit, onToggleAtivo }) {
    //Exibe o tipo de pessoa
    const tipoPessoTemplate = (rowData) => TipoPessoa[rowData.tipoPessoa]

    // Exibe o status de ativo do doador
    const ativoTemplate = (rowData) => {
        return (
            <div className='d-inline-flex'>
                <Form.Check 
                    type="switch" 
                    reverse
                    className='switch-secondary ms-2' 
                    checked={rowData.ativo} 
                    title={rowData.ativo ? 'Desativar' : 'Ativar'}
                    label={rowData.ativo ? 'Sim' : 'Não'}
                    onChange={() => onToggleAtivo(rowData)} 
                />
            </div>
        );
    };

    // Exibe botões de editar
    const actionTemplate = (rowData) => {
        return (
            <div className='d-flex justify-content-center'>
                <Button variant="secondary" title="Editar" onClick={() => onEdit(rowData.id)} size="sm" className='rounded-pill'>
                    <i className='bi bi-pencil'></i>
                </Button>
            </div>
        );
    };
     return(
        <DataTable 
            value={doadores} 
            dataKey="id" 
            size='small'
            emptyMessage="Nenhum doador encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'} 
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="documento" header="Documento" sortable></Column>
            <Column field="nome" header="Nome" sortable></Column>
            <Column field="email" header="E-mail" sortable></Column>
            <Column field="telefone" header="Telefone" ></Column>
            <Column field='tipoPessoa' header="Tipo" body={tipoPessoTemplate}></Column>
            <Column field="ativo" header="Ativo" body={ativoTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
     );
}

export default DoadoresTable;