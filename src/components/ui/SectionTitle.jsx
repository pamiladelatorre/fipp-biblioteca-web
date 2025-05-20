import { Row, Col } from 'react-bootstrap';
import styles from './SectionTitle.module.css';

function SectionTitle({ icon = '', title }) {
  return (
    <Row className={`${styles.section_ct} icon-title`}>
      <Col>
        <div className={styles.section_content}>
          { icon && <i className={`bi ${icon} me-2 fs-5`}></i> }
          <h6 className={styles.section_title}>{title}</h6>
        </div>
      </Col>
    </Row>
  );
}

export default SectionTitle;
