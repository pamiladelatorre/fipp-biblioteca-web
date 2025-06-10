import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";
import { ExemplarEstado } from '../../../enums/ExemplarEstado';
import { ExemplarStatus } from '../../../enums/ExemplarStatus';


function ExemplaresTable({ exemplares, onView }){
    // Exibe o estado
    const estadoTemplate = (rowData) => ExemplarEstado[rowData.estado];

    // Exibe o status
    const statusTemplate = (rowData) => ExemplarStatus[rowData.status];

    // Exibe botões de editar
    const actionTemplate = (rowData) => {
        return (
            <div className='d-flex justify-content-center'>
                <Button variant="secondary" title="Ver detalhes" onClick={() => onView(rowData.id)} size="sm" className='rounded-pill'>
                    <i className='bi bi-eye'></i>
                </Button>
            </div>
        );
    };

    return(
        <DataTable 
            value={exemplares} 
            dataKey="id" 
            size='small'
            emptyMessage="Nenhum exemplar encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="acervo.titulo" header="Acervo" sortable></Column>
            <Column field="tombo" header="Tombo"></Column>
            <Column field="estado" header="Estado" body={estadoTemplate}></Column>
            <Column field="status" header="Status" body={statusTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default ExemplaresTable;