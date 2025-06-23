import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "react-bootstrap";
import { MovimentacaoEtapa } from "../../../enums/MovimentacaoEtapa";
import { MovimentacaoStatus } from "../../../enums/MovimentacaoStatus";
import { formatDateToBR } from '../../../utils/formatDate';

function DevolucaoTable({ movimentacoes, onView }) {
  // Filtra apenas devoluções
  const movimentacoesDevolucao = movimentacoes.filter(m => m.etapa === 'devolucao');

  // Templates para exibição formatada
  const etapaTemplate = (rowData) => MovimentacaoEtapa[rowData.etapa];
  const statusTemplate = (rowData) => MovimentacaoStatus[rowData.status];
  const dataInicioTemplate = (rowData) => formatDateToBR(rowData.dataInicio);
  const dataFimTemplate = (rowData) => rowData.dataFim ? formatDateToBR(rowData.dataFim) : '-';

  // Botões de ação
  const actionTemplate = (rowData) => (
    <div className='d-flex justify-content-center'>
      <Button 
        variant="secondary" 
        title="Ver detalhes" 
        onClick={() => onView(rowData.id)} 
        size="sm" 
        className='rounded-pill'
      >
        <i className='bi bi-eye'></i>
      </Button>
    </div>
  );

  return (
    <DataTable 
      value={movimentacoesDevolucao} 
      dataKey="id" 
      size="small"
      emptyMessage="Nenhuma devolução de exemplar encontrada." 
      paginator 
      rows={5} 
      rowsPerPageOptions={[5, 10, 25, 50]} 
      paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
      currentPageReportTemplate="{first} - {last} de {totalRecords}"
      paginatorLeft="Registro por página"
      tableStyle={{ minWidth: '30rem' }}
    >
      <Column field="exemplar.acervo.titulo" header="Acervo" sortable />
      <Column field="exemplar.tombo" header="Tombo" sortable />
      <Column field="usuario.nome" header="Usuário" sortable />
      <Column field="etapa" header="Etapa" body={etapaTemplate} />
      <Column field="status" header="Status" body={statusTemplate} />
      <Column field="dataInicio" header="Data Início" body={dataInicioTemplate} />
      <Column field="dataFim" header="Data Fim" body={dataFimTemplate} />
      <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }} />
    </DataTable>
  );
}

export default DevolucaoTable;
