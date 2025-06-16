import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Form } from "react-bootstrap";


function AssinaturasTable({ assinaturas, onEdit, onToggleAtivo }) {
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

    const actionTemplate = (rowData) => {
        return (
            <div className='d-flex justify-content-center'>
                <Button
                    variant="secondary"
                    title="Editar"
                    onClick={() => onEdit(rowData.id)}
                    size="sm"
                    className='rounded-pill'
                >
                    <i className='bi bi-pencil'></i>
                </Button>
            </div>
        );
    };

    const formatDate = (date) => {
        return date ? dayjs(date).format('DD/MM/YYYY') : '---';
    };

    const formatCurrency = (value) => {
        return `R$ ${parseFloat(value).toFixed(2)}`;
    };

    return (
        <DataTable
            value={assinaturas}
            dataKey="id"
            size='small'
            emptyMessage="Nenhuma assinatura encontrada."
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '70rem' }}
        >
            <Column field="descricao" header="Descrição" sortable />
            <Column field="fornecedorId" header="Fornecedor" sortable />
            <Column field="periodicidade" header="Periodicidade" sortable />
            <Column field="numeroContrato" header="Contrato" sortable />
            <Column field="valor" header="Valor" sortable body={(row) => formatCurrency(row.valor)} />
            <Column field="dataInicio" header="Início" body={(row) => formatDate(row.dataInicio)} sortable />
            <Column field="dataFim" header="Fim" body={(row) => formatDate(row.dataFim)} sortable />
            <Column field="ativo" header="Ativo" body={ativoTemplate} />
            <Column header="Ações" body={actionTemplate} style={{ width: '6rem' }} />
        </DataTable>
    );
}

export default AssinaturasTable;
