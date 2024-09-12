const {select, input, checkbox} = require("@inquirer/prompts")

let mensagem = "Bem vindo ao TargetOn";

let meta = {
    value: "Tomar 3L de água por dia",
    checked: false,
}
let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Qual a sua meta?"})

    if(meta.length == 0) {
        mensagem = "Digite algo! A meta não pode ser vazia."
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
}
const listarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não exitem metas cadastradas para serem listadas!"
        return
    }

    const respostas = await checkbox({
        message: "Utilize o espaço para marcar/desmarcar as metas e enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada!"
        return
    }

    respostas.forEach(resposta => {
        const meta = metas.find((m) => {
            return m.value == resposta 
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)!"
}
const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = "Não existe metas realizadas"
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = "Não exite metas em aberto."
        return
    }

    await select({
        message: "Metas Abertas " + "(" + abertas.length + ")",
        choices: [...abertas]
    })
}

const removerMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não exitem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensARemover = await checkbox({
        message: "Selecione o item que deseja remover da sua lista.",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensARemover.length == 0) {
        mensagem = "Nenhum item foi selecionado para ser removido"
        return
    }

    itensARemover.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) removida(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async() => {
    while(true){
        mostrarMensagem()
        
        const opção = await select({
            message: "Menu",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Remover Metas",
                    value: "remover"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        }
    )
        
        switch(opção){
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "remover":
                    await removerMetas()
                    break
            case "sair":
                console.log("Até a próxima e boa sorte!")
                return
         }
    }
}

start()