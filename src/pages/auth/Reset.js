import React, { useState } from "react";
import styles from "./Auth.module.scss";
import authImg from "../../assets/reset.svg";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ErrorMensage } from "../../firebase/errorMensage";
import { toast } from "react-toastify";
import Loading from "../../components/loader/Loading";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        auth.languageCode = "pt_br";
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                toast.success("E-mail enviado com sucesso!");
                navigate("/login");
            })
            .catch((error) => {
                setIsLoading(false);
                const errorCode = error.code;
                const errorMessage = ErrorMensage(errorCode);
                toast.error(errorMessage);
            });
    };

    return (
        <>
            {isLoading && <Loading />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.form}>
                    <div className={styles.icone}>
                        <h4>Crie uma nova senha</h4>
                    </div>
                    <hr />
                    <form onSubmit={resetPassword}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="--btn --btn-primary --btn-block"
                            type="submit"
                        >
                            Enviar
                        </button>
                        <span className="--text-sm --block --text-center --m2">
                            Por favor, informe seu endereço de e-mail que
                            enviaremos um link para criar uma nova senha.
                        </span>
                        <span className={styles.link}>
                            <Link to="/login">
                                <BsArrowLeft color="#dc0404" />{" "}
                                <p>Voltar para login</p>
                            </Link>
                        </span>
                    </form>
                </div>
                <div className={styles.img}>
                    <img src={authImg} alt="resetar senha" />
                </div>
            </section>
        </>
    );
};

export default Reset;
