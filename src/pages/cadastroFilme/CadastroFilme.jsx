import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./CadastroFilme.css";
import { Alerta } from "../../components/alerta/Alerta";
import { useEffect, useState } from "react";
import api from "../../services/Services";

const CadastroFilme = () => {
  const [listaFilmes, setListaFilmes] = useState([]);

  const getFilmes = async () => {
    try {
      const retornoAPI = await api.get("/Filme");
      setListaFilmes(retornoAPI.data);
    } catch {
      Alerta({ title: "Filmes", text: "Erro ao listar os filmes", icon: "error", confirmButtonText: "Ok" });
    }
  };

  const excluirFilme = async (item) => {
    const result = await Alerta({
      title: "Excluir",
      text: `Quer apagar o filme "${item.titulo}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c4dff",
      cancelButtonColor: "#555",
      confirmButtonText: "Apagar",
      cancelButtonText: "Cancelar",
    });
    
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/Filme/${item.idFilme}`);
      getFilmes();
      Alerta({ title: "Excluir", text: `"${item.titulo}" foi removido`, icon: "success", confirmButtonText: "Ok" });
    } catch {
      Alerta({ title: "Excluir", text: "Erro ao excluir", icon: "error", confirmButtonText: "Ok" });
    }
  };

  useEffect(() => {
    getFilmes();
  }, []);

  return (
    <>
      <Header />

      <div className="cf-page">
        <div className="cf-table-card">
          <h2 className="cf-table-title">Cursos</h2>

          <table className="cf-table">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Categoria</th>
                <th>Professor</th>
                <th>Ativo</th>
              </tr>
            </thead>
            <tbody>
              {listaFilmes.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <p className="cf-empty">Nenhum Curso cadastrado ainda.</p>
                  </td>
                </tr>
              ) : (
                listaFilmes.map((filme) => (
                  <tr key={filme.idFilme}>
                    <td>{filme.titulo}</td>
                    <td>{filme.genero?.nome ?? "—"}</td>
                    <td>
                      {filme.imagem ? (
                        <img
                          className="cf-table-img"
                          src={filme.imagem}
                          alt={filme.titulo}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <button
                        className="cf-table-action excluir"
                        onClick={() => excluirFilme(filme)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button className="botaoo">Editar Curso</button>
      </div>
      <Footer />
    </>
  );
};
export default CadastroFilme;