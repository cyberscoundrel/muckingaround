const colors = require('colors');

colors.setTheme({
    error: ['black', 'bgRed'],
    success: ['black', 'bgGreen'],
    request: ['black', 'bgWhite'],
})

const printers = {
    errorPrint: (message) => {
        console.log()
    },

    successPrint: (messaeg) => {
        console.log(colors.success(message));
    },

    requestPrint: (message) => {
        console.log(colors.request(message))
    }
}

modules.export = printers;