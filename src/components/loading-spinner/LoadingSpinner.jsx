import { Spinner } from 'react-bootstrap';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ message = 'Carregando...', size = '3rem' }) => { 
    return(
        <div className={styles.overlay}>
            <div className={styles.content}>
                <Spinner
                    animation="grow"
                    role="status"
                    variant="secondary"
                    style={{ width: size, height: size }}
                />
                <div className="mt-3 fs-5 text-secondary">{message}</div>
            </div>
        </div>
    );
};

export default LoadingSpinner;