const {select} = require("@inquirer/prompts")

const start = async() => {
    while(true){
        
        const opção = await select({
            message: "Menu >",
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
        })
        
        switch(opção){
            case "cadastrar":
                console.log("Cadastre uma meta")
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