import fs from "node:fs/promises"
// caminho do banco de dados JSON
const DATABASE_PATH = new URL("db.json", import.meta.url)

// criação de class
export class Database {
    //cria objeto database
    #database = {}
    constructor(){
        
        
        // Lê o arquivo  json
        fs.readFile(DATABASE_PATH, "utf8").then( (data) => {
            
            // se houver dados no db.json ele insiri no objeto database
            this.#database = JSON.parse(data)
        }).catch(()=>{
            
            // se não houver dado no db.json ele chama a função persist
            this.#persist()
        })
    }
    // função responsável por escrever o objeto database dentro do arquivo db.json
    #persist(){
        fs.writeFile(DATABASE_PATH,JSON.stringify(this.#database))
    }

    insert(table, data) {
        if (this.#database[table]){
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()
    }

    select(table, filters) {

        let data = this.#database[table] ?? []

        if(filters){
            console.log("Entrei")
            data = data.filter((row) => {
                return Object.entries(filters).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
 
        }
        return data
    }

    update(table, id, data) {

        
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)
        
        console.log(rowIndex)
        if(rowIndex > -1){
            this.#database[table][rowIndex] = {
                ...this.#database[table][rowIndex],
                ...data
            }
            this.#persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)
        
        if (rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}