// import "./CadastroGenero.css"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro"
import { useEffect, useState } from "react";
import Lista from "../../components/lista/Lista";
import api from "../../services/services";
import Swal from "sweetalert2";
import { Alerta } from "../../components/alerta/Alerta";


const CadastroGenero = () => {

    //variaveis e states
    const [valor, setValor] = useState("");
    const [listaGeneros, setListaGeneros] = useState([]);
    const [editar, setEditar] = useState(false);
    const [idGenero, setIdGenero] = useState(0)

    //funcao de ciclo de vidGeneroa

    const getGeneros = async () => {
        //chamar a api
        try {
            const retorno = await api.get("/Genero");
            const dados = retorno.data;
            console.log(dados);

            setListaGeneros(retorno.data);
        }
        catch (error) {
            alert("Erro ao buscar gêneros: ");
            console.log(error);

        }
        //preencher o array listaGeneros
    }

    useEffect(() => {
        getGeneros();
    }, [])


    const cadastrarGenero = async (e) => {
        e.preventDefault();

        if (valor.trim().length == 0) {

            Alerta({
                title: 'Error!',
                text: `${valor}O campo gênero é obrigatório.`,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            // Swal.fire({
            //     title: 'Error!',
            //     text: `${valor}O campo gênero é obrigatório.`,
            //     icon: 'error',
            //     confirmButtonText: 'Cool'
            // });
            return false;
        }

        const objCadastro = {
            idGenero: crypto.randomUUID(), // GUidGenero vazio, o banco gera o real
            nome: valor,
            filmes: []
        }

        try {
            const retornoApi = await api.post("/Genero", objCadastro);
            getGeneros();
            Alerta({
                title: 'Cadastrado!',
                text: `${objCadastro.nome} cadastrado com sucesso.`,
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            setValor("");
        } catch (error) {
            alert("Erro ao cadastrar gênero: ");
            console.log(error);
        }


    }


    const limparFormulario = () => {
        setValor("")
        setEditar(false)
    }

    const excluirGenero = async (item) => {
        // if (!confirm(`Quer apagar o gênero ${item.nome}?`)) {
        //     return false;
        // }


        const result = await Alerta({
            title: "Confirmar exclusão",
            text: `tem certeza que deseja excluir o gênero ${item.nome}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não, cancelar!",
        })

        if (!result.isConfirmed) {
            return false;
        }

        try {
            const retornoApi = await api.delete(`/Genero/${item.idGenero}`);
            if (retornoApi.status == 200 || retornoApi.status == 204) {
                Alerta({
                    title: 'Excluído!',
                    text: `${item.nome} excluído com sucesso.`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                getGeneros();
            }


            else {
                alert("Erro ao excluir gênero: ");
            }
        } catch (error) {
            alert("Erro ao excluir gênero: ");
            console.log(error);
        }
    }

    // mostra os dados no formulario para o usuario editar
    const preEditar = (item) => {
        setEditar(true)
        setValor(item.nome)
        setIdGenero(item.idGenero)
    }

    const editarGenero = async (e) => {
        e.preventDefault()//para de atualizar o formulario
        //validGeneroGeneroar o formulario
        if (valor.trim().length == 0) {
            Alerta({
                title: 'Error!',
                text: `${item.nome}O campo gênero é obrigatório.`,
                icon: 'error',
                confirmButtonText: 'Cool'
            });
            return false;
        }
        const objEditar = {
            idGenero: crypto.randomUUID(), // GUidGenero vazio, o banco gera o real
            nome: valor,
            filmes: []
        }
        //cadastrar na api com o put
        try {
            const retornoApi = await api.put(`/Genero/${idGenero}`, objEditar);
            limparFormulario()
            getGeneros();
            Swal.fire({
                title: 'Atualizado!',
                text: `${objEditar.nome} atualizado com sucesso.`,
                icon: 'success',
                confirmButtonText: 'Cool'
            });
        } catch (error) {
            alert("Erro ao atualizar dados na API");
            console.log(error);
        }
        //listar os dados novamnete com getGeneros



        alert("funcao editar genero em desenvolvimento ");
    }
    //o JSX em si (XML E HTML)

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    //Define o título que será exibidGeneroo no formulário
                    tituloCadastro="Cadastro de Gênero"
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
                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidGeneroade="none"

                    //Chama o método para validGeneroar:
                    lista={listaGeneros}
                    //idGeneroentifica o tipo de lista:
                    tipoLista="genero"


                    funcExcluir={excluirGenero}
                    funcEditar={preEditar}
                />
            </main>
            <Footer />
        </>

    )
}

export default CadastroGenero;