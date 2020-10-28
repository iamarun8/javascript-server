
export default function equilateral(n: number) {
    let pattern: string = '';
    let space: number = n - 1;

    for ( let i: number = 0; i < n; i++ ) {
        for ( let j: number = 0; j < space; j++ ) {
            pattern += ' ';
        }

        for ( let j: number = 0; j <= i; j++ ) {
            pattern += '* ';
        }

        pattern += '\n';
        space--;
    }

    console.log(pattern);
}
// equilateral(10);

// equilateral(arguments[2])