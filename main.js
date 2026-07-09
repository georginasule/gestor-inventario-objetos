const productes = [];
const prompt = require('prompt-sync')();

/**
 * Mostra el menú d'opcions i demana a l'usuari que triï una opció.
 * @returns {number} Número de l'opció seleccionada.
 */
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

/**
 * Demana les dades d'un producte i l'afegeix a l'inventari si són vàlides.
 * @returns {string} Missatge amb el resultat de l'operació.
 */
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
    };

    productes.push(nouProducte);

    return 'Producte afegit correctament!';
}

/**
 * Mostra el llistat complet dels productes de l'inventari.
 * @returns {string} Text amb el llistat o un missatge si l'inventari està buit.
 */
function mostrarInventari(){
    if (productes.length === 0) return 'Inventari buit';

    const llistatProductes = productes
        .map((producte, i) => `${i + 1}. ${producte.nom} - Stock: ${producte.stock} - Preu: ${producte.preu}€`)
        .join('\n');

    return `==== LListat de productes ===\n${llistatProductes}`;
}

/**
 * Busca un producte pel seu nom dins de l'inventari.
 * @returns {string} Missatge indicant si el producte s'ha trobat o no.
 */
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

/**
 * Mostra els productes que tenen un stock inferior a 5 unitats.
 * @returns {string} Llistat dels productes amb stock baix o un missatge si no n'hi ha.
 */
function mostrarStockBaix(){
    if (productes.length === 0) return 'Inventari buit';

    const productesStockBaix = productes
        .filter(producte => producte.stock < 5)
        .map(producte => `${producte.nom}`)
        .join(`\n`);

    if (!productesStockBaix) return 'No hi ha productes amb stock baix';

    return `==== Productes amb stock baix ===\n${productesStockBaix}`;
}

/**
 * Aplica un descompte a tots els preus i mostra el resultat.
 * @returns {string} Llistat de productes amb el descompte aplicat o un missatge d'error.
 */
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

/**
 * Elimina un producte de l'inventari segons la seva posició.
 * @returns {string} Missatge amb el resultat de l'eliminació.
 */
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

/**
 * Inicia el bucle principal del programa i gestiona les opcions del menú.
 * @returns {boolean} Retorna false quan l'usuari tria sortir.
 */
function main(){
    let opcio;

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