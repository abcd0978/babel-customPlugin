module.exports = function(babel){
    const {types: t} = babel;
    return {
        visitor: {
            BinaryExpression(path){
                function getArray(ArrExp) {
                    let result = [];
                    let elements = ArrExp.elements;
                    for(let i=0; i<ArrExp.elements.length; i++){
                        result.push(elements[i].value);
                    }
                    return result;
                }

                function Union(leftArr, rightArr) {
                    let result = new Set();
                    for(let i=0; i<leftArr.length; i++){
                        result.add(leftArr[i]);
                    }
                    for(let i=0; i<rightArr.length; i++){
                        result.add(rightArr[i]);
                    }
                    return Array.from(result);
                }

                function Intersect(leftArr, rightArr) {
                    let leftSet = new Set(leftArr);
                    let rightSet = new Set(rightArr);
                    let intersection = new Set([...leftSet].filter(i => rightSet.has(i)));
                    return Array.from(intersection);
                }

                if(t.isBinaryExpression(path.node, {operator: "|"})){
                   if(path.node.left.type === "ArrayExpression" && path.node.right.type === "ArrayExpression") {
                    const left = getArray(path.node.left);
                    const right = getArray(path.node.right);
                    const resultArr = Union(left,right);
                    path.replaceWith(t.valueToNode(resultArr));
                   }
                }
                if(t.isBinaryExpression(path.node, {operator: "&"})){
                    if(path.node.left.type === "ArrayExpression" && path.node.right.type === "ArrayExpression") {
                        const left = getArray(path.node.left);
                        const right = getArray(path.node.right);
                        const resultArr = Intersect(left, right);
                        path.replaceWith(t.valueToNode(resultArr));
                    }
                }
            }
        }
    }
}