import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Form } from "react-bootstrap";

import { formatDateToBR } from '../../../utils/formatDate';

function AcervosTable({ acervos, loading, onEdit, onToggleAtivo }){
    // Exibe o status de ativo da categoria
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

    // Exibe botões de editar
    const dataPublicacaoTemplate = (rowData) => {
        return formatDateToBR(rowData.dataPublicacao);
    }

    return(
        <DataTable 
            value={acervos} 
            dataKey="id" 
            size='small'
            stripedRows
            loading={loading}
            emptyMessage="Nenhuma acervo encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="titulo" header="Título" sortable></Column>
            <Column field="numeroEdicao" header="Edição"></Column>
            <Column field="editora" header="Editora" sortable></Column>
            <Column field="isbn" header="ISBN"></Column>
            <Column field="dataPublicacao" header="Publicação" body={dataPublicacaoTemplate}></Column>
            <Column field="ativo" header="Ativo" body={ativoTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default AcervosTable;