import { useState  } from 'react';
import { Row, Col, Button, FloatingLabel, Form } from 'react-bootstrap';
import { metodoPagamentoSchema } from '../../../validations/fornecedorValidation';
import { TipoPagamento } from '../../../enums/TipoPagamento';
import { TipoDesconto } from '../../../enums/TipoDesconto';

export default function MetodoPagamentoForm({ onChange }) {
    const [formData, setFormData] = useState({
        id: null,
        tipoPagamento: '',
        prazo: '',
        parcelaMaxima: '',
        chavePix: '',
        tipoDesconto: '',
        excluido: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const adicionar = async () => {
        try {
            const validated = await metodoPagamentoSchema.validate(formData, { abortEarly: false });
            onChange(validated);
            setFormData({ id: null, tipoPagamento: '', prazo: '', parcelaMaxima: '', chavePix: '', tipoDesconto: null, excluido: false });
            setErrors({});
        } catch (err) {
            if (err.inner) {
                const formattedErrors = {};
                err.inner.forEach(e => {
                    formattedErrors[e.path] = e.message;
                });
                setErrors(formattedErrors);
            }
        }
    };
    
    const tipPagamentoSelecionado = formData.tipoPagamento;

    return (
        <Row>
            <Col md={3}>
                <FloatingLabel label="Tipo de Pagamento*">
                    <Form.Select
                        name="tipoPagamento"
                        value={formData.tipoPagamento}
                        onChange={handleChange}
                        isInvalid={!!errors.tipoPagamento}
                    >
                        <option value="">Selecione</option>
                        {Object.entries(TipoPagamento).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.tipoPagamento}</Form.Control.Feedback>
                </FloatingLabel>
            </Col>

            {tipPagamentoSelecionado === 'boleto' && (
                <Col md={3}>
                    <FloatingLabel label="Prazo (dias)*">
                        <Form.Control
                            type="number"
                            name="prazo"
                            value={formData.prazo}
                            onChange={handleChange}
                            isInvalid={!!errors.prazo}
                        />
                        <Form.Control.Feedback type="invalid">{errors.prazo}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            )}

            {tipPagamentoSelecionado === 'cartao' && (
                <Col md={3}>
                    <FloatingLabel label="Parcelamento Máximo*">
                        <Form.Control
                            type="number"
                            name="parcelaMaxima"
                            value={formData.parcelaMaxima}
                            onChange={handleChange}
                            isInvalid={!!errors.parcelaMaxima}
                        />
                        <Form.Control.Feedback type="invalid">{errors.parcelaMaxima}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            )}

            {tipPagamentoSelecionado === 'pix' && (
                <Col md={3}>
                    <FloatingLabel label="Chave Pix*">
                        <Form.Control
                            type="text"
                            name="chavePix"
                            value={formData.chavePix}
                            onChange={handleChange}
                            isInvalid={!!errors.chavePix}
                        />
                        <Form.Control.Feedback type="invalid">{errors.chavePix}</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            )}

            <Col md={3}>
                <FloatingLabel label="Tipo de Desconto">
                    <Form.Select
                        name="tipoDesconto"
                        value={formData.tipoDesconto}
                        onChange={handleChange}
                        isInvalid={!!errors.tipoDesconto}
                    >
                        <option value="">Selecione</option>
                        {Object.entries(TipoDesconto).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.tipoDesconto}</Form.Control.Feedback>
                </FloatingLabel>
            </Col>

            <Col md={1} className="mt-3">
                <Button type="button" variant="secondary" size="sm" className='rounded-pill' onClick={adicionar}>
                    <i className="bi bi-plus-lg"></i>
                </Button>
            </Col>
        </Row>
    );
}
