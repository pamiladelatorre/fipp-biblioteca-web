import { Container, Image } from "react-bootstrap";
import livrosImgUrl from "../../assets/img/livros.jpg";
import styles from './Home.module.css';

const HomePage = () => {
    return(<>
        <h2 className="text-center">Bem-vindo ao Sistema!</h2>
        <Container className="d-flex justify-content-center align-items-center my-4">
            <Image src={livrosImgUrl} alt="Livros" fluid rounded className={styles.imgLivros} />
        </Container>
    </>);
};

export default HomePage;