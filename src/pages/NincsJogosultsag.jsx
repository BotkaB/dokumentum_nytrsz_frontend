import useAuthContext from "../contexts/AuthContext";

export default function NincsJogosultsag(){
    const {  logout } = useAuthContext(); 
    logout();
    return(
    <article>
    <h1>Nincs jogosultsága a rendszer használatához!</h1>
    </article>
    )
}