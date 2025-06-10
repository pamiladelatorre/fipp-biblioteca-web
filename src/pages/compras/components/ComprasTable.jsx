import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";
import { TipoPagamento } from '../../../enums/TipoPagamento';
import { TipoProduto } from '../../../enums/TipoProduto';
import { CompraStatus } from '../../../enums/CompraStatus';

import { formatDateToBR } from '../../../utils/formatDate';

function ComprasTable({ compras, onView }){
    // Exibe o tipo de produto
    const tipoProdutoTemplate = (rowData) => TipoProduto[rowData.tipoProduto];

    // Exibe o tipo de pagamento
    const tipoPagamentoTemplate = (rowData) => TipoPagamento[rowData.metodoPagamento.tipoPagamento];

    // Exibe o status
    const statusTemplate = (rowData) => CompraStatus[rowData.status];
    
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
            value={compras} 
            dataKey="id" 
            size='small'
            emptyMessage="Nenhum compra encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="fornecedor.cnpj" header="CNPJ" sortable></Column>
            <Column field="fornecedor.razaoSocial" header="Razão Social" sortable></Column>
            <Column field="tipoProduto" header="Tipo de Produto" body={tipoProdutoTemplate}></Column>
            <Column field="metodoPagamento.tipoPagamento" header="Tipo de Pagamento" body={tipoPagamentoTemplate}></Column>
            <Column field="numeroEmpenho" header="Empenho"></Column>
            <Column field="status" header="Status" body={statusTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default ComprasTable;