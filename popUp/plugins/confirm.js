$.confirm = function (options) { 
    return new Promise( (resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            closable: false,
            width: `400px`,
            content: options.content,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {
                    text: `Cancel`, type: `primary`, handler() {
                        modal.close()
                        reject()
                    },
                },
                {
                    text: `Delate`, type: `danger`, handler() {
                        modal.close()
                        resolve()
                    }
                }
            ]
        })
        setTimeout(() => {
            modal.open()
        }, 100);
    })
}