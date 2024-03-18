function foo() {
    const bar = 5;
    alert(bar);
}
foo();

let a = [1,2,3] & [3,4,5];
let b = [1,2,3] | [3,4,5];

for(let i=0; i<10; i++) {
    console.log('hello world');
}

for(let j=0; j<10; j+=1){
    console.log('hello world2');
}

function foo_debug(){
    for(let i=0; i<Number.MAX_SAFE_INTEGER; i++){
        console.log('디버깅용 함수');
    }
}

foo_debug();

console.log(a);
console.log(b);