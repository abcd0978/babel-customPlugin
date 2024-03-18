module.exports = function(babel){
    const {types: t} = babel;
    return {
        visitor: {
            ForStatement(path) {
                if(t.isForStatement(path.node)){
                    const {init, test, update, body} = path.node;
                    const updateStatement = t.expressionStatement(update)
                    const newBody = t.blockStatement([
                        ...body.body, updateStatement
                    ]);
                    path.replaceWith(t.blockStatement([init, t.whileStatement(test, newBody)]))
                }
            }
        }
    }
}