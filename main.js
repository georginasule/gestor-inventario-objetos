const noms = ['Portàtil', 'Ratolí', 'Monitor', 'Teclat'];
const stocks = [5, 20, 3, 12];
const preus = [800, 25, 180, 45];

//Importar prompt-sync
const prompt = require('prompt-sync')();

function mostrarMenu(){
    console.log('1. Afegir producte');
    console.log('2. Mostrar inventari');
    console.log('3. Buscar producte');
    console.log('4. Mostrar stock baix');
    console.log('5. Aplicar descompte');
    console.log('6. Eliminar producte');
    console.log('7. Sortir');

    return Number(prompt('Tria una opció (1-7): '));
}

function afegirProducte(){
    let nom = prompt('Nom del producte: ')?.trim() ?? '';
    let stock = Number(prompt('Stock del producte: ')?.trim() ?? '');
    let preu = Number(prompt('Preu del producte')?.trim() ?? '');

    if (nom === '') return 'El nom no pot estar buit';

    if (isNaN(stock) || isNaN(preu) || stock <= 0 | preu <= 0){
        return 'Stock o preu no vàlids';
    }

    noms.push(nom);
    stocks.push(stock);
    preus.push(preu);

    return 'Producte afegit correctament!';
}


function mostrarInventari(){
    if (noms.length === 0) return 'Inventari buit';

    const llistatProductes = noms
        .map((nom, i) => `${i + 1}. ${nom} - Stock: ${stocks[i]} - Preu: ${preus[i]}€`)
        .join('\n');

    return `==== LListat de productes ===\n${llistatProductes}`;
}

function buscarProducte(){
    if (noms.length === 0) return 'Inventari buit';

    let nomBuscat = prompt('Nom del producte a buscar: ')?.trim() ?? '';

    let producte = noms.find(
        nom => nom.toLowerCase() === nomBuscat.toLowerCase()
    );

    if (producte){
        return 'Producte trobat';
    }else{
        return 'Producte no trobat';
    }
}


function mostrarStockBaix(){
    if (noms.length === 0) return 'Inventari buit';

    const productesStockBaix = noms
        .filter((_, index) => stocks[index] < 5)
        .map(nom => `${nom}`)
        .join(`\n`);

    if (!productesStockBaix) return 'No hi ha productes amb stock baix';

    return `==== Productes amb stock baix ===\n${productesStockBaix}`;
}


function aplicarDescompte(){
    let percentatge = Number(prompt('Percentatge de descompte')?.trim() ?? '');

    if (isNaN(percentatge) || percentatge <= 0 || percentatge >= 100 || percentatge === ''){
        return 'Percentatge no vàlid!';
    }

    const preusDescompte = preus.map(preu => preu - (preu * percentatge / 100));

    const llistatDescompte = noms
        .map((nom, i) => `${i + 1}. ${nom} - Stock: ${stocks[i]} - Preu: ${preusDescompte[i]}€`)
        .join('\n');
    
    return `==== Llistat de productes amb descompte ====\n${llistatDescompte}`;
}

function eliminarProducte(){
    console.log(mostrarInventari());

    let posicio = Number(prompt('Posició del producte a eliminar')?.trim() ?? '');

    if (isNaN(posicio) || posicio === '') return 'Posició no vàlida!';

    let index = posicio - 1;

    if (index >= 0 && index < noms.length){
        noms.splice(index, 1);
        stocks.splice(index, 1);
        preus.splice(index, 1);

        return 'Producte eliminat!';
    }else{
        return 'Posició no vàlida!';
    }
}

function main(){
    let opcio, resultat;

    while (true){
        opcio = mostrarMenu();
        switch (opcio){
            case 1:
                console.log(afegirProducte());
                break;
            case 2:
                console.log(mostrarInventari());
                break;
            case 3:
                console.log(buscarProducte());
                break;
            case 4:
                console.log(mostrarStockBaix());
                break;
            case 5:
                console.log(aplicarDescompte());
                break;
            case 6:
                console.log(eliminarProducte());
                break;
            case 7:
                console.log('Sortint del programa...');
                return false;
            default:
                console.log('Opció no vàlida!');
        }
    }
}

main();