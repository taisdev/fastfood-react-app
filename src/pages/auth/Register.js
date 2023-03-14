import React, { useState } from "react";
import styles from "./Auth.module.scss";
import { toast } from "react-toastify";
import authImg from "../../assets/register.svg";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { ErrorMensage } from "../../firebase/errorMensage";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../../components/loader/Loading";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("As senhas são diferentes");
        }
        setIsLoading(true);
        
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    id: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                });
                setIsLoading(false);
                toast.success("Cadastro realizado com sucesso!");
                navigate("/");
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
                        <h4>Crie uma conta</h4>
                    </div>
                    <hr />
                    <form onSubmit={registerUser}>
                        <input
                            type="text"
                            placeholder="Nome"
                            required
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirme a senha"
                            required
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                        <button
                            className="--btn --btn-primary --btn-block"
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </form>
                    <span className={styles.register}>
                        <p>Já possui uma conta? &nbsp;</p>
                        <Link to="/login">Fazer login</Link>
                    </span>
                </div>
                <div className={styles.img}>
                    <img src={authImg} alt="cadastro" />
                </div>
            </section>
        </>
    );
};

export default Register;
