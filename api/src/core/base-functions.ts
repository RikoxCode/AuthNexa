const BaseFunctions = {

    _log: (message: string, state: string, method:string, path: string) => {

        const date = new Date()
        const time = date.toLocaleTimeString(["de-CH"])
        const day = date.toLocaleDateString()
        const fullDate = `${day}, ${time}`

        const color = state === '200' ? `\x1b[32m` : `\x1b[31m`


        console.log(`${color}[API]` + `\x1b[90m - ${fullDate}` + `\x1b[0m - ${message}` + `${color} - ${state}` + `\x1b[33m - ${method}` + `\x1b[37m - ${path}`)
    }

}

export default BaseFunctions