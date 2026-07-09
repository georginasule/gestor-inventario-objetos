const productes = [];

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

    let productesNom = prompt('Nom del producte: ')?.trim() ?? '';
    let productesStock = Number(prompt('Stock del producte: ')?.trim() ?? '');
    let productesPreu = Number(prompt('Preu del producte')?.trim() ?? '');

    if (productesNom === '') return 'El nom no pot estar buit';

    if (isNaN(productesStock) || isNaN(productesPreu) || productesStock <= 0 | productesPreu <= 0){
        return 'Stock o preu no vàlids';
    }

    const nouProducte = {
        nom: productesNom,
        stock: productesStock,
        preu: productesPreu
    }

    productes.push(nouProducte);

    return 'Producte afegit correctament!';
}


function mostrarInventari(){
    if (productes.length === 0) return 'Inventari buit';

    const llistatProductes = productes
        .map((producte, i) => `${i + 1}. ${producte.nom} - Stock: ${producte.stock} - Preu: ${producte.preu}€`)
        .join('\n');

    return `==== LListat de productes ===\n${llistatProductes}`;
}

function buscarProducte(){
    if (productes.length === 0) return 'Inventari buit';

    let nomBuscat = prompt('Nom del producte a buscar: ')?.trim() ?? '';

    let accio = productes
        .find(producte => producte.nom.toLowerCase() === nomBuscat.toLowerCase());

    if (accio){
        return 'Producte trobat';
    }else{
        return 'Producte no trobat';
    }
}


function mostrarStockBaix(){
    if (productes.length === 0) return 'Inventari buit';

    const productesStockBaix = productes
        .filter(producte => producte.stock < 5)
        .map(producte => `${producte.nom}`)
        .join(`\n`);

    if (!productesStockBaix) return 'No hi ha productes amb stock baix';

    return `==== Productes amb stock baix ===\n${productesStockBaix}`;
}


function aplicarDescompte(){
    let percentatge = Number(prompt('Percentatge de descompte')?.trim() ?? '');

    if (isNaN(percentatge) || percentatge <= 0 || percentatge >= 100 || percentatge === ''){
        return 'Percentatge no vàlid!';
    }

    const preusDescompte = productes
        .map(producte => producte.preu - (producte.preu * percentatge / 100));

    const llistatDescompte = productes
        .map((producte, i) => `${i + 1}. ${producte.nom} - Stock: ${producte.stock} - Preu: ${preusDescompte[i]}€`)
        .join('\n');
    
    return `==== Llistat de productes amb descompte ====\n${llistatDescompte}`;
}

function eliminarProducte(){
    console.log(mostrarInventari());

    let posicio = Number(prompt('Posició del producte a eliminar')?.trim() ?? '');

    if (isNaN(posicio) || posicio === '') return 'Posició no vàlida!';

    let index = posicio - 1;

    if (index >= 0 && index < productes.length){
        productes.splice(index, 1);

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