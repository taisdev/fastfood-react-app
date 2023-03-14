import React, { useState } from "react";
import styles from "./Auth.module.scss";
import authImg from "../../assets/login.svg";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
    FacebookAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { ErrorMensage } from "../../firebase/errorMensage";
import Loading from "../../components/loader/Loading";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setIsLoading(false);
                toast.success("Logado com sucesso!");
                navigate("/");
            })
            .catch((error) => {
                setIsLoading(false);
                const errorCode = error.code;
                const errorMessage = ErrorMensage(errorCode);
                toast.error(errorMessage);
            });
    };
    const addUser = async (user) => {
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
        });
    };

    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        await signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const user = result.user;
                addUser(user);
                setIsLoading(false);
                toast.success("Logado com sucesso!");
                navigate("/");
            })
            .catch((error) => {
                setIsLoading(false);
                const errorCode = error.code;
                const errorMessage = ErrorMensage(errorCode);
                toast.error(errorMessage);
            });
    };
    const facebookProvider = new FacebookAuthProvider();
    const facebookLogin = () => {
        signInWithPopup(auth, facebookProvider)
            .then(async (result) => {
                const user = result.user;
                addUser(user);
                setIsLoading(false);
                toast.success("Logado com sucesso!");
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
                <div className={styles.img}>
                    <img src={authImg} alt="login" />
                </div>
                <div className={styles.form}>
                    <div className={styles.icone}>
                        <h4>Entre na sua conta</h4>
                    </div>
                    <hr />
                    <form onSubmit={loginUser}>
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
                        <button
                            className="--btn --btn-primary --btn-block"
                            type="submit"
                        >
                            Entrar
                        </button>
                        <div className={styles.links}>
                            <Link to="/reset">Esqueceu a senha?</Link>
                        </div>
                    </form>
                    <div className={styles.divider}>
                        <span></span>
                        <span>
                            <p>ou</p>
                        </span>
                        <span></span>
                    </div>
                    <div className={styles.media}>
                        <button>
                            <img
                                src={facebook}
                                alt="facebook"
                                onClick={facebookLogin}
                            />
                        </button>
                        <button>
                            <img
                                src={google}
                                alt="google"
                                onClick={googleLogin}
                            />
                        </button>
                    </div>
                    <span className={styles.register}>
                        <p>Não possui uma conta? &nbsp;</p>
                        <Link to="/register">Cadastre-se</Link>
                    </span>
                </div>
            </section>
        </>
    );
};

export default Login;
