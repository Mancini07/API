import { Database } from "../database/database.js";
import { routes } from "../routes/index.js";
import { extractQueryParams } from "../utils/extractQueryParams.js";

const database = new Database()

export function routeHandler (request, response) {
     const route = routes.find((route) => {
        
        return route.path.test(request.url) && route.method === request.method
    })
    if (route) {
        const routeParams = request.url.match(route.path)
        const {query, ...params} = routeParams.groups
        
        request.params = params

        request.query = query ? extractQueryParams(query) : {}
        
        console.log(request.method)
        return route.controller({request, response, database})
    }else {
        
        response.writeHead(404).end("Not found")
    }
     
}