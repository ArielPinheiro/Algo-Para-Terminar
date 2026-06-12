import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useEffect, useState } from "react";
import api from "../../services/Services";
import Swal from "sweetalert2";
import { Alerta } from "../../components/alerta/Alerta";

const CadastroGenero = () => {
  
  // variáveis e states
  const [valor, setValor] = useState("");
  const [listaGeneros, setListaGeneros] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState(0);
  

  // funções e ciclo de vida"
    
// Funções
  // Get
  const getGeneros = async () => {
    try {
      const retornoAPI = await api.get("/Genero"); // chama a api
      setListaGeneros(retornoAPI.data); // preencher o array listaGeneros
    } catch (error) {
      alert("Problemas ao carregar os dados da API");
      Alerta({
        title: "Cadastro de Gênero",
        text: "Problemas ao carregar os dados da API",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error);
    }
  };


  
  // Post
  const cadastrarGenero = async (e) => {
    e.preventDefault();

    // Validar o formulário
    if (valor.trim().length == 0) {
      // alert("Preencher o gênero");

      Alerta({
        title: "Testeee",
        text: "Preencher o gênero",
        icon: "warning",
        confirmButtonText: "Cool",
      })
      
      return false;
    }
    const objCadastros = {
      nome: valor,
    };
    // cadastrar na api com post
    try {
      const retornoAPI = await api.post("/Genero", objCadastros); //cadastra na api
      // alert("Cadastrado com sucesso"); //avisa o usuário que deu certo
      Alerta({
        title: "Cadastro de Gênero",
        text: `${valor} cadastrado com sucesso`,
        icon: "success",
        confirmButtonText: "Top!",
      });

      getGeneros(); // atualiza a listagem na tela
      limparFormulario(); //limpar formulário
    } catch (error) {
      alert("Erro ao cadastrar na API");
      Alerta({
        title: "Cadastro de Gênero",
        text: "Cadastrado com sucesso",
        icon: "error",
        confirmButtonText: "Ok!",
      });
      console.log(error);
    }
  }; //fim da função cadastrarGenero
  
// Put
  // mostra os dados no formulário para o usuário editar
  const preEditar = (item) => {
    setEditar(true);
    setValor(item.nome);
    setId(item.id);
  };

  // Editar Gênero
  const editarGenero = async (e) => {
    e.preventDefault(); //para o postar do formulário submit
    // Validar o formulário
    if (valor.trim().length == 0) {
      alert("Preencher o gênero");
      return false;
    }
    const objEditar = {
      nome: valor,
    };
    // cadastrar na api com o put
    try {
      const retornoAPI = await api.put(`/Genero/${id}`, objEditar);
      limparFormulario();
      getGeneros();
      // alert("Gênero atualizado");
      Alerta({
        title: "Cadastro de Gênero",
        text: "Gênero atualizado",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      // alert("Erro ao atualiar os dados na API");
      Alerta({
        title: "Cadastro de Gênero",
        text: "Erro ao atualiar os dados na API",
        icon: "error",
        confirmButtonText: "Ok",
      });

      console.log(error);
    }
  };

  // Delete
  const excluirGenero = async (item) => {
   const result =  await Alerta({
      title: "Cadastro de Gênero",
      text: `Quer apagar o gênero ${item.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Apagar",
      cancelButtonText: "Jamais",
    })

    if(!result.isConfirmed)
    {//se não quer apagar para por aqui
      return false;
    }

    try {//se quer apagar, chama a API
      const retornoAPI = await api.delete(`/Genero/${item.id}`); // chama a api

      if (retornoAPI.status == 200 || retornoAPI.status == 204) {
        // alert("Apagado com sucesso");
        Alerta({
          title: "Cadastro de Gênero",
          text: "Apagado com sucesso",
          icon: "success",
          confirmButtonText: "Ok",
        });
        getGeneros();
      } else {
        // alert("Problemas ao apagar o gênero");
        Alerta({
          title: "Cadastro de Gênero",
          text: "Problemas ao apagar o gênero",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      // alert("Problemas ao carregar os dados da API");
      Alerta({
        title: "Cadastro de Gênero",
        text: "Problemas ao carregar os dados da API",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  }; //fim da função excluirGenero

  // Outras funções
  const limparFormulario = () => {
    setValor("");
    setEditar(false);
    setId(0); // resetar o id
  };

  // Ciclo de Vida do componente
  useEffect(() => {
    getGeneros();
  }, []);

  // o JSX em si (XML E HTML)
  return (
    <>
      <Header />
      <main>
        {/* Form de cadastro de Gêneros */}
        <Cadastro
          //Define o título que será exibido no formulário
          tituloCadastro="Cadastro de Cursos"
          // esconde o select de genero
          visibilidade="none"
          // Define o texto que aparece dentro do campo de input
          placeholder="gênero"
          // ----------------------------------------------------
          // Propriedades voltada ao cadastro:

          //Função que será chamada ao enviar o formulário (onSubmit)
          funcCadastro={editar ? editarGenero : cadastrarGenero}
          //Valor atual do campo de texto
          valor={valor}
          //Função que atualiza o estado do valor no componente pai sempre que o usuário digita no campo
          setValor={setValor}
          btnEditar={editar}
          cancelarEdicao={limparFormulario}
        />

        {/* Lista de Gêneros */}
        <Lista
          tituloLista="Lista de Cursos"
          visibilidade="none"
          //Chama o método para validar:
          lista={listaGeneros}
          //Identifica o tipo de lista:
          tipoLista="genero"
          funcExcluir={excluirGenero}
          funcEditar={preEditar}
        />
      </main>
      <Footer />
    </>
  );
};

export default CadastroGenero;
