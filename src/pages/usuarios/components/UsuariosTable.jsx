import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Form } from "react-bootstrap";
import { TipoUsuario } from '../../../enums/TipoUsuario';

function UsuariosTable({ usuarios, onEdit, onToggleBloqueado, onToggleAtivo }){
    // Exibe o tipo de usuário
    const TipoUsuarioTemplate = (rowData) => {
        return TipoUsuario[rowData.tipoUsuario]
    };
    // Exibe o status de bloqueado do usuário
    const bloqueadoTemplate = (rowData) => {
        return (
            <div className='d-inline-flex'>
                <Form.Check 
                    type="switch" 
                    reverse
                    className='switch-secondary ms-2' 
                    checked={rowData.bloqueado} 
                    title={rowData.bloqueado ? 'Desbloquear' : 'Bloquear'}
                    label={rowData.bloqueado ? 'Sim' : 'Não'}
                    onChange={() => onToggleBloqueado(rowData)} 
                />                    
            </div>
        );
    };
    // Exibe o status de ativo do usuário
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
            value={usuarios} 
            dataKey="id" 
            size='small'
            emptyMessage="Nenhum usuário encontrado." 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            paginatorLeft={'Registro por página'}
            tableStyle={{ minWidth: '30rem' }}
        >
            <Column field="cpf" header="CPF" sortable></Column>
            <Column field="nome" header="Nome" sortable></Column>
            <Column field="telefone" header="Telefone"></Column>
            <Column field="email" header="E-mail"></Column>
            <Column field="tipoUsuario" header="Tipo" body={TipoUsuarioTemplate}></Column>
            <Column field="bloqueado" header="Bloqueado" body={bloqueadoTemplate}></Column>
            <Column field="ativo" header="Ativo" body={ativoTemplate}></Column>
            <Column header="Ações" body={actionTemplate} style={{ width: '5rem' }}></Column>
        </DataTable>
    );
};

export default UsuariosTable;