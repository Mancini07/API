export function remove ({request, response, database}) {
    const {id} = request.params
    database.delete("tickets", id)
    response.end()

}