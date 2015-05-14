module.exports = function () {
    return function notFound(req, res, next) {
        res.sendFile('index.html', {
            root: 'client'
        });
    }
};
