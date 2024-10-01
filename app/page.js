import Image from "next/image";
import Link from "next/link"; // Importando Link para navegação
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Bem-vindo à Página Inicial</h1>
            <Image src="/path/to/image.jpg" alt="Descrição da imagem" width={500} height={300} />
            <Link href="/weatherapp"> {/* Link para a página do clima */}
                <button>Acessar Previsão do Tempo</button>
            </Link>
        </div>
    );
}
