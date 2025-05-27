import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Form } from "react-bootstrap";

function GenerosTable({ generos, onEdit, onToggleAtivo }){
    // Exibe o status de ativo do genero
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
            value={generos} 
            dataKey="id" 
            size='small'
            emptyMessage="Nenhum genero encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="descricao" header="Descrição" sortable></Column>
            <Column field="ativo" header="Ativo" body={ativoTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default GenerosTable;