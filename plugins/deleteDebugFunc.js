module.exports = function(babel){
    const {types: t} = babel;
    return {
        visitor: {
            Function: (path) => {
                if(t.isFunctionDeclaration(path.node)){
                    let functionID = path.node.id;
                    if(functionID.name.endsWith("_debug")){
                        path.replaceWith(t.emptyStatement());
                    }
                }
            },
            CallExpression: (path) => {
                const callee = String(path.node.callee.name);
                if (callee.endsWith("_debug")) {
                    path.replaceWith(t.emptyStatement());
                }
            }
        }
    }
}