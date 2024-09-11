const {select, input} = require("@inquirer/prompts")

let meta = {
    value: "Tomar 3L de água por dia",
    checked: false,
}
let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Qual a sua meta?"})

    if(meta.length == 0) {
        console.log("Digite algo! A meta não pode ser vazia.")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
}

const start = async() => {
    while(true){
        
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        }
    )
        
        switch(opção){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                console.log("Liste uma meta")
                break
            case "sair":
                console.log("Até a próxima")
                return
         }
    }
}

start()