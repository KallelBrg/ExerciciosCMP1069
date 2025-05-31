import { Route, Routes } from "react-router";
import { CadastrarFilme } from "../features/filme";
import { CadastrarSala } from "../features/sala";
import { Home } from "../features/home";
import { CadastarSessao } from "../features/sessao";
import { Ingressos } from "../features/ingresso";
import { ListaSessoes } from "../features/listaSessao";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/cadastrarFilme" element={<CadastrarFilme />}> </Route>
            <Route path="/cadastrarSala" element={<CadastrarSala />}> </Route>
            <Route path="/cadastrarSessao" element={<CadastarSessao/>}> </Route>
            <Route path="/ingressos" element={<Ingressos/>}> </Route>
            <Route path="/sessoes" element={<ListaSessoes/>}> </Route>
        </Routes>
    );
}
