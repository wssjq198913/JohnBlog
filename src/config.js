const environmentVariables = {
    port: process.env.PORT,
    host: process.env.HOST
}

module.exports = Object.assign({
    app: {
        title: 'JohnBlog',
        description: 'Johnny Blog',
        head: {
            titleTemplate: 'JohnBlog',
            meta: [
            ]
        }
    },
}, environmentVariables);