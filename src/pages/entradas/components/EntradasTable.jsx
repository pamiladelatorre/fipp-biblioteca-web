import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";
import { TipoOrigem } from '../../../enums/TipoOrigem';

import { formatDateToBR } from '../../../utils/formatDate';

function EntradasTable({ entradas, onView }){
    // Exibe data publicação
    const dataEntradaTemplate = (rowData) => formatDateToBR(rowData.dataEntrada);

    // Exibe o tipo de origem
    const tipoOrigemTemplate = (rowData) => TipoOrigem[rowData.tipoOrigem];

    // Exibe o contrato
    const contratoTemplate = (rowData) => TipoOrigem[rowData.tipoOrigem] == TipoOrigem.assinatura ? rowData.origem.numeroContrato : '-';

    // Exibe o empenho
    const empenhoTemplate = (rowData) => TipoOrigem[rowData.tipoOrigem] == TipoOrigem.compra ? rowData.origem.numeroEmpenho : '-';

    // Exibe o doador
    const doadorTemplate = (rowData) => TipoOrigem[rowData.tipoOrigem] == TipoOrigem.doacao ? rowData.origem.nome : '-';

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
            value={entradas} 
            dataKey="id" 
            size='small'
            emptyMessage="Nenhum entrada de arcevo encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="acervo.titulo" header="Acervo" sortable></Column>
            <Column field="quantidade" header="Quantidade"></Column>
            <Column field="dataEntrada" header="Data de Entrada" body={dataEntradaTemplate}></Column>
            <Column field="tipoOrigem" header="Origem" body={tipoOrigemTemplate}></Column>
            <Column header="Contrato" body={contratoTemplate}></Column>
            <Column header="Empenho" body={empenhoTemplate}></Column>
            <Column header="Doador" body={doadorTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default EntradasTable;