// ******************************************************
// DECLARACIÓN DE CONSTANTE NUMERICA Y ARRAY DE OBJETOS.
// ******************************************************

const tasaprima = 0.005;

const arrayMarcasModelos = [
    {
        id: "1",
        nombre: "Alfa Romeo",
        urlimagen: "AlfaRomeo.jpg",
        modelos: [
          { id: "1111", itemMenu: "1", nombre: "147 1.9 JTD 5 PTAS", valorVehiculo: 12550000 },
          { id: "2222", itemMenu: "2", nombre: "147 2.0 TS 5 PTAS", valorVehiculo: 19210000 },
          { id: "3333", itemMenu: "3", nombre: "MITO 1.4 TBI QUADRIFOGLIO", valorVehiculo: 32200000 }
        ]
      },
      {
        id: "2",
        nombre: "AUDI",
        urlimagen: "Audi.jpg",
        modelos: [
          { id: "4444", itemMenu: "1", nombre: "A1 1.4T AMBITION", valorVehiculo: 28550000 },
          { id: "5555", itemMenu: "2", nombre: "A4 2.0 T L/12 ATTRACTION", valorVehiculo: 37250000 },
          { id: "6666", itemMenu: "3", nombre: "A5 2.0 T QUATTRO S TRONIC", valorVehiculo: 41250000 }
        ]
      },
      {
        id: "3",
        nombre: "BMW",
        urlimagen: "bmw.jpg",
        modelos: [
          { id: "7777", itemMenu: "1", nombre: "220I COUPE SPORT LINE", valorVehiculo: 28550000 }
        ]
      },
      {
        id: "4",
        urlimagen: "ferrari.jpg",
        nombre: "Ferrari",
        modelos: []
      }
]

// COTIZA UN SEGURO SEGÚN EL VALOR DEL VEHICULO Y LA TASA DE LA PRIMA.
CotizarSeguro = function (valor) { return formatDecimales(valor * tasaprima)};

function formatDecimales(valor, cantDecimales)
{
    // FORMATEA DECIMALES PARA MOSTRAR POR PANTALLA. ...XXX.XXX.XXX,XX
    return valor.toFixed(cantDecimales).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


let marcas = document.getElementById("marcas");

arrayMarcasModelos.forEach(
    (item, index) => 
    {
        let nuevoItemMarca = document.createElement('button');
        nuevoItemMarca.id = item.id;
        nuevoItemMarca.innerText = item.nombre;
        nuevoItemMarca.addEventListener("click", mostrarModelos);

        marcas.appendChild(nuevoItemMarca);

    }
)

function mostrarModelos(e)
{
    resultado.innerText = "";

    let marcaSeleccionada = arrayMarcasModelos.find(marca => marca.id == e.target.id);

    document.getElementById("logo").src = "../media/" + marcaSeleccionada.urlimagen

    while (modelos.firstChild) {
        modelos.removeChild(modelos.firstChild);
    }

    if (marcaSeleccionada.modelos.length === 0)
      resultado.innerText = "No hay modelos cotizables para la marca seleccionada!"


    marcaSeleccionada.modelos.forEach(
        (item) => 
        {
            let nuevoItemModelo = document.createElement('button');
            nuevoItemModelo.id = item.id;
            nuevoItemModelo.innerText = item.nombre;
            nuevoItemModelo.valorVehiculo = item.valorVehiculo;
            nuevoItemModelo.addEventListener("click", (e) =>
            {            
                let resultado = document.getElementById("resultado");

                prima = CotizarSeguro(e.target.valorVehiculo)

                resultado.innerText = "TOTAL A PAGAR: " +
                    marcaSeleccionada.nombre +
                    " " +
                    e.target.innerText + 
                    " ES DE: $" + prima + " + IVA.";
                
            })    

            modelos.appendChild(nuevoItemModelo);
        }
    )
}