import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";
import { TipoInfracao } from '../../../enums/TipoInfracao';
import { GrauInfracao } from '../../../enums/GrauInfracao';
import { InfracaoStatus } from '../../../enums/InfracaoStatus';

import { formatDateToBR } from '../../../utils/formatDate';

function InfracoesTable({ infracoes, onEdit }) {
    // Exibe o tipo de infração
    const tipoInfracaoTemplate = (rowData) => TipoInfracao[rowData.tipoInfracao];

    // Exibe o grau de infração
    const grauInfracaoTemplate = (rowData) => GrauInfracao[rowData.grauInfracao];
    
    // Exibe data início
    const dataInicioTemplate = (rowData) => formatDateToBR(rowData.dataInicio);

    // Exibe data fim
    const dataFimTemplate = (rowData) => rowData.dataFim ? formatDateToBR(rowData.dataFim) : '-';

    // Exibe o status
    const statusTemplate = (rowData) => InfracaoStatus[rowData.status];

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
            value={infracoes} 
            dataKey="id" 
            size='small'
            emptyMessage="Nenhum infrações encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="usuario.nome" header="Usuario" sortable></Column>
            <Column field="tipoInfracao" header="Tipo" body={tipoInfracaoTemplate}></Column>
            <Column field="grauInfracao" header="Grau" body={grauInfracaoTemplate}></Column>
            <Column field="dataInicio" header="Data de Início" body={dataInicioTemplate}></Column>
            <Column field="dataFim" header="Data de Fim" body={dataFimTemplate}></Column>
            <Column field="status" header="Status" body={statusTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default InfracoesTable;