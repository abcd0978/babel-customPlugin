module.exports = function(babel){
    const {types: t} = babel;
    return {
        visitor: {
            CallExpression: function(path) {
                if (!path.node.callee.name === "alert") {
                    return;
                }
                const args = path.node.arguments;
                path.replaceWith(
                    t.callExpression(
                        t.memberExpression(t.identifier("console"), t.identifier("warn")),
                        args
                    )
                );
            },
        }
    }
}