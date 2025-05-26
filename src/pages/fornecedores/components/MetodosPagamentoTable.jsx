import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Form } from "react-bootstrap";
import { TipoPagamento } from '../../../enums/TipoPagamento';
import { TipoDesconto } from '../../../enums/TipoDesconto';

function MetodosPagamentoTable({ metodosPagamento, onRemove }){
    // Exibe o tipo de pagamento
    const tipoPagamentoTemplate = (rowData) => {
        return TipoPagamento[rowData.tipoPagamento];
    };

    // Exibe o prazo
    const prazoTemplate = (rowData) => {
        return rowData.prazo ?? '-';
    };

    // Exibe o parcelamento
    const parcelamentoTemplate = (rowData) => {
        return rowData.parcelaMaxima ?? '-';
    };

    // Exibe o chave pix
    const pixTemplate = (rowData) => {
        return rowData.chavePix ?? '-';
    };

    // Exibe o tipo de desconto
    const tipoDescontoTemplate = (rowData) => {
        return TipoDesconto[rowData.tipoDesconto];
    };

    // Exibe botões de editar
    const actionTemplate = (rowData) => {
        return (
            <div className='d-flex justify-content-center'>
                <Button variant="secondary" title="Remover" onClick={() => onRemove(rowData)} size="sm" className='rounded-pill'>
                    <i className='bi bi-x'></i>
                </Button>
            </div>
        );
    };

    return(
        <DataTable 
            value={metodosPagamento} 
            dataKey="tipoPagamento" 
            size='small'
            emptyMessage={<span className="text-muted">Nenhum meio de pagamento adicionado</span>} 
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="tipoPagamento" header="Tipo de Pagamento" body={tipoPagamentoTemplate}></Column>
            <Column field="prazo" header="Prazo (dias)" body={prazoTemplate}></Column>
            <Column field="parcelaMaxima" header="Parcelamento Máximo" body={parcelamentoTemplate}></Column>
            <Column field="chavePix" header="Chave Pix" body={pixTemplate}></Column>
            <Column field="tipoDesconto" header="Tipo de Desconto" body={tipoDescontoTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default MetodosPagamentoTable;