import { TableGenerator } from "./tableGenerator.js";
import FormHandler from "./formHandler.js";
import Vehiculo from "../entities/vehiculo.js";
import Terrestre from "../entities/terrestre.js";
import Aereo from "../entities/aereo.js";
import vehiculosDatos from "../data/datos.js";
let vehiculos = new Array();

vehiculosDatos.forEach(element => {
    if(element.hasOwnProperty("cantPue"))
    {
        try
        {
            vehiculos.push(new Terrestre(element["id"],element["modelo"],element["anoFab"],
            element["velMax"],element["cantPue"],element["cantRue"]));
        }
        catch(e)
        {
            console.log(e+" el transporte es "+element.modelo);
        }
    }
    else if(element.hasOwnProperty("altMax"))
    {
        try
        {
            vehiculos.push(new Aereo(element["id"],element["modelo"],element["anoFab"],
            element["velMax"],element["altMax"],element["autonomia"]));
        }
        catch(e)
        {
            console.log(e+" el transporte es "+element.modelo);
        }
    }
  });

//FORM CREADO PARCIALMENTE AUTOMATICO
const formHoldingDiv = document.getElementById("form-holding");
const formHandler = new FormHandler("formAlta");
formHoldingDiv.appendChild(formHandler.Singleton);
formHandler.addInputToForm("number","id");
formHandler.addInputToForm("text","modelo");
formHandler.addInputToForm("number","añoFab");
formHandler.addInputToForm("number","velMax");
formHandler.Singleton.appendChild(FormHandler.labelGenerator("Tipo"));

const idInput = document.getElementById("id");
idInput.readOnly = "readOnly";

// SELECT
formHandler.addGroups("select","selectTipo");
FormHandler.addSomethingToGroup("option","","","selectTipo");
FormHandler.addSomethingToGroup("option","Aereo","opcionAereo","selectTipo");
FormHandler.addSomethingToGroup("option","Terrestre","opcionTerrestre","selectTipo");

// Aereo
const AereoDiv=formHandler.addGroups("div","AereoDiv");
FormHandler.addInputToGroup("number","altMax","AereoDiv");
FormHandler.addInputToGroup("number","autonomia","AereoDiv");
AereoDiv.style.display = "none";

// Terrestre
const TerrestreDiv=formHandler.addGroups("div","TerrestreDiv");
FormHandler.addInputToGroup("number","cantPue","TerrestreDiv");
FormHandler.addInputToGroup("number","cantRue","TerrestreDiv");
TerrestreDiv.style.display = "none";

// FORM BUTTONS
formHandler.addGroups("div","form-buttons");
const btnSubmit = FormHandler.inputButtonGenerator("submit","submit","Guardar");
const btnEliminar = FormHandler.inputButtonGenerator("button","btnEliminar","Eliminar");
const btnCancelar = FormHandler.inputButtonGenerator("button","btnCancelar","Cancelar");
btnEliminar.hidden=true;
btnCancelar.hidden=true;
FormHandler.addNodeToGroup(btnSubmit,"form-buttons");
FormHandler.addNodeToGroup(btnEliminar,"form-buttons");
FormHandler.addNodeToGroup(btnCancelar,"form-buttons");


// CAMBIA EL SELECT
const selectTipo = document.getElementById("selectTipo");
selectTipo.addEventListener("change",(e)=>{
    if(selectTipo.value == "")
    {
        AereoDiv.style.display = "none";
        TerrestreDiv.style.display = "none";
    }
    else if(selectTipo.value == "Terrestre")
    {
        TerrestreDiv.style.display = "flex";
        AereoDiv.style.display = "none";
    }
    else if(selectTipo.value == "Aereo")
    {
        TerrestreDiv.style.display = "none";
        AereoDiv.style.display = "flex";
    }
});

const selectFiltro = document.getElementById("filter");
selectFiltro.addEventListener("change",(e)=>{
    actualizarTabla(filtrado());
});
actualizarTabla(vehiculos);

// SUBMIT CAMBIADO
formHandler.Singleton.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(btnEliminar.hidden && btnCancelar.hidden)
    {
        try
        {
            let array = readAllRows();
            let maxVal=0;
            const id = array.reduce((previous,current)=>{
                if(previous[0]>maxVal)
                {
                    maxVal=previous[0];
                }
                if(current[0]>maxVal)
                {
                    maxVal=current[0];
                }
                return maxVal++;
            });
             let vehiculo = null;
            if(selectTipo.value=="")
            {
                alert("ERROR. Seleccione un tipo de vehiculo");                
            }
            else if(selectTipo.value=="Aereo")
            {
                vehiculo = new Aereo(id,formHandler.Singleton.modelo.value,
                formHandler.Singleton.añoFab.value,formHandler.Singleton.velMax.value,formHandler.Singleton.altMax.value,
                formHandler.Singleton.autonomia.value);
            }
            else if(selectTipo.value=="Terrestre")
            {
                vehiculo = new Terrestre(id,formHandler.Singleton.modelo.value,
                formHandler.Singleton.añoFab.value,formHandler.Singleton.velMax.value,formHandler.Singleton.cantPue.value,
                formHandler.Singleton.cantRue.value);
            }
            if(vehiculos!=null && vehiculo!=null)
            {
                vehiculos.push(vehiculo);
                console.log(vehiculo.toString());
                actualizarTabla(filtrado());
            }
            else
            {
                vehiculos = new Array(vehiculo);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    else
    {
        const selectedRow = searchRow(formHandler.Singleton.id.value);
        modifyRow(selectedRow,[formHandler.Singleton.id.value,
        formHandler.Singleton.modelo.value,formHandler.Singleton.añoFab.value,formHandler.Singleton.velMax.value,
        formHandler.Singleton.cantPue.value, formHandler.Singleton.cantRue.value,
        formHandler.Singleton.altMax.value,formHandler.Singleton.autonomia.value
        ]);
        const array=readRow(selectedRow);
        const index = getItemFromArray(vehiculos,array);
        if(!(array[4]=="-"))
        {
            let Terrestre = arrayToTerrestre(array);
            vehiculos[index] = Terrestre;
        }
        else
        {
            let Aereo  = arrayToAereo(array);
            vehiculos[index]=Aereo;
        }
        
    }
    formHandler.Singleton.id.value="";
    formHandler.Singleton.modelo.value="";
    formHandler.Singleton.añoFab.value="";
    formHandler.Singleton.velMax.value="";
    formHandler.Singleton.cantPue.value="";
    formHandler.Singleton.cantRue.value="";
    formHandler.Singleton.altMax.value="";
    formHandler.Singleton.autonomia.value="";

    selectTipo.value="";

    AereoDiv.style.display = "none";
    TerrestreDiv.style.display = "none";

    btnSubmit.value = "Guardar";
    const tableContainer = document.querySelector(".tableAndButton");
    tableContainer.style.display = "flex";
    const optionscontainer = document.querySelector(".table-options");
    optionscontainer.style.display = "flex";

    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "none";

    btnEliminar.hidden=true;
    btnCancelar.hidden=true;
});

//BOTON AGREGAR
const buttonAgregar = document.getElementById("btnAgregar");
buttonAgregar.addEventListener("click",(e)=>{
    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "initial";
    const tableContainer = document.querySelector(".tableAndButton");
    tableContainer.style.display = "none";
    const optionscontainer = document.querySelector(".table-options");
    optionscontainer.style.display = "none";
});

// RECREA LA TABLA CON LOS CONTENIDOS EN LISTA
function actualizarTabla(list)
{
    document.getElementById("btnEliminar").hidden=true;
    document.getElementById("btnCancelar").hidden=true;
    const container = document.querySelector('.table-container');
    while(container.children.length>0){
        container.removeChild(container.firstElementChild);
    }
    try
    {
        container.appendChild(TableGenerator(list));   
    }
    catch(e)
    {
        console.log("No tiene datos");
    }   
}

// BOTON ELIMINAR CLICK
btnEliminar.addEventListener("click",(e)=>{
    let row = searchRow(formHandler.singleton.id.value);
    row.parentElement.removeChild(row);
    vehiculos.splice((getItemFromArray(vehiculos,readRow(row))),1);    

    actualizarTabla(vehiculos);

    formHandler.Singleton.id.value="";
    formHandler.Singleton.modelo.value="";
    formHandler.Singleton.añoFab.value="";
    formHandler.Singleton.velMax.value="";
    formHandler.Singleton.cantPue.value="";
    formHandler.Singleton.cantRue.value="";
    formHandler.Singleton.altMax.value="";
    formHandler.Singleton.autonomia.value="";

    selectTipo.value="";

    AereoDiv.style.display = "none";
    TerrestreDiv.style.display = "none";

    const tableContainer = document.querySelector(".tableAndButton");
    tableContainer.style.display = "flex";
    const optionscontainer = document.querySelector(".table-options");
    optionscontainer.style.display = "flex";

    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "none";

    btnSubmit.value = "Guardar";
    btnEliminar.hidden=true;
    btnCancelar.hidden=true;
});

// BOTON CANCELAR CLICK
btnCancelar.addEventListener("click",(e)=>{
    formHandler.Singleton.id.value="";
    formHandler.Singleton.modelo.value="";
    formHandler.Singleton.añoFab.value="";
    formHandler.Singleton.velMax.value="";
    formHandler.Singleton.cantPue.value="";
    formHandler.Singleton.cantRue.value="";
    formHandler.Singleton.altMax.value="";
    formHandler.Singleton.autonomia.value="";

    selectTipo.value="";

    AereoDiv.style.display = "none";
    TerrestreDiv.style.display = "none";

    const tableContainer = document.querySelector(".tableAndButton");
    tableContainer.style.display = "flex";
    const optionscontainer = document.querySelector(".table-options");
    optionscontainer.style.display = "flex";

    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "none";

    btnSubmit.value = "Guardar";
    btnEliminar.hidden=true;
    btnCancelar.hidden=true;

});

function arrayToAereo(array)
{
    return new Aereo(array[0],array[1],array[2],array[3],array[6],array[7]);
}

function arrayToTerrestre(array)
{
    return new Terrestre(array[0],array[1],array[2],array[3],array[4],array[5]);
}

//CLICK EN TBODY
window.addEventListener("dblclick",(e)=>{
    if(e.target.matches("tr td")){
        const row = e.target.parentElement;
        const array = readRow(row);
        if(!(array[4]=="-"))
        {
            const vehiculo = arrayToTerrestre(array);
            formHandler.Singleton.id.value=vehiculo.id;
            formHandler.Singleton.modelo.value=vehiculo.modelo;
            formHandler.Singleton.añoFab.value=vehiculo.añoFabricacion;
            formHandler.Singleton.velMax.value=vehiculo.velocidadMaxima;
            formHandler.Singleton.cantPue.value=vehiculo.cantidadPuertas;
            formHandler.Singleton.cantRue.value=vehiculo.cantidadRuedas;
            formHandler.Singleton.altMax.value="";
            formHandler.Singleton.autonomia.value="";
            selectTipo.value="Terrestre";
            TerrestreDiv.style.display = "flex";
            AereoDiv.style.display = "none";
}
        else
        {
            const vehiculo = arrayToAereo(array);
            formHandler.Singleton.id.value=vehiculo.id;
            formHandler.Singleton.modelo.value=vehiculo.modelo;
            formHandler.Singleton.añoFab.value=vehiculo.añoFabricacion;
            formHandler.Singleton.velMax.value=vehiculo.velocidadMaxima;
            formHandler.Singleton.altMax.value=vehiculo.alturaMaxima;
            formHandler.Singleton.autonomia.value=vehiculo.autonomia;
            formHandler.Singleton.cantPue.value="";
            formHandler.Singleton.cantRue.value="";
            selectTipo.value="Aereo";
            TerrestreDiv.style.display = "none";
            AereoDiv.style.display = "flex";
        }

        const tableContainer = document.querySelector(".tableAndButton");
        tableContainer.style.display = "none";
        const optionscontainer = document.querySelector(".table-options");
        optionscontainer.style.display = "none";

        const formContainer = document.querySelector(".form-container");
        formContainer.style.display = "initial";
        btnSubmit.value = "Modificar";
        btnEliminar.hidden=false;
        btnCancelar.hidden=false;
    }

});

function getItemFromArray(array,item)
{
    let i =0;
    for(const element in array)
    {
        if(array[element].id==item[0])
        {
            return i;
        }
        i++;
    }
    array.forEach((element,index)=>{
        if(element.id==item[0])
        {
            return index;
        }
    });
}

// DEVUELVE ARRAY DE LOS CONTENIDOS DE ROW
function readRow(row)
{
    const firstValue = row.firstElementChild;
    let value = firstValue;
    let array = new Array();
    if(row.dataset!=null && row.dataset.id!=null)
    {
        array.push(row.dataset.id);        
    }
    while(value!=null)
    {
        array.push(value.textContent);
        value = value.nextElementSibling;
    }
    return array;
}

// BUSCA UN ROW SEGUN SU ID
function searchRow(id)
{
    const tbody = document.querySelector('tbody');
    const firstRow = tbody.firstElementChild;
    let row = firstRow;
    let idSearch=-1;
    while(row != null)
    {
        idSearch = row.dataset.id;
        if(id==idSearch)
        {
            return row;
        }
        row = row.nextElementSibling;
    }
}

function modifyRow(row,values)
{
    if(row!=null)
    {

        const firstValue = row.firstElementChild;
        let value = firstValue;
        for(let i=1 ;i<values.length;i++)
        {
            if(value!=null)
            {
                if(values[i]=="")
                {
                    value.textContent="-";
                }
                else
                {
                    value.textContent=values[i];
                }
                value = value.nextElementSibling;
            }
        }
    }
}

// CREA UN ARRAY DE TODAS LAS FILAS DE TBODY
function readAllRows()
{
    const tbody = document.querySelector('tbody');
    const firstRow = tbody.firstElementChild;
    let row = firstRow;
    let array = new Array();
    while(row != null)
    {
        array.push(readRow(row));
        row = row.nextElementSibling;
    }
    return array;
}

function filtrarVehiculo(list,filtrado)
{
    if(filtrado!="todos")
    {
        if(filtrado=="terrestre")
        {
            const listaFiltrada = lis.filter(function(element){
                return element instanceof Terrestre;
            });
            return listaFiltrada;
        }
        else if(filtrado=="aereo")
        {
            const listaFiltrada = list.filter(function(element){
                return element instanceof Aereo;
            });
            return listFiltrada;
        }
    }
    else
    {
        return list;
    }
}

function filtrarTabla(list,filterElements)
{
    const tablaFiltrada = list.map(function(element){
        let obj = {};
        filterElements.forEach((filter,i) => {
            obj[filterElements[i]]=element[filter];
        });
        return obj;
    });
    return tablaFiltrada;
}

function promediarVelocidad(list)
{
    const lista = list.map(function(element){
        return parseInt(element["velocidadMaxima"]);
    });
    const average = lista.reduce(function(sum,value){
        return sum+value;
    })/lista.length;
    return average;
}

function filtrado()
{
    const promedio = document.getElementById("promedio");
    const modelo=document.getElementById("modeloC");
    const añoFabricacion=document.getElementById("añoFabricacionC");
    const velocidadMaxima=document.getElementById("velocidadMaximaC");
    const cantidadPuertas=document.getElementById("cantidadPuertasC");
    const cantidadRuedas=document.getElementById("cantidadRuedasC");
    const alturaMaxima=document.getElementById("alturaMaximaC");
    const autonomia=document.getElementById("autonomiaC");
    const array = [modelo,añoFabricacion,velocidadMaxima,cantidadPuertas,cantidadRuedas,alturaMaxima,autonomia];
    let tablaFiltrada;
    let arrayfilters = new Array();
    array.forEach(element => {
        if(element.checked)
        {
            arrayfilters.push(element.value);
        }
    });
    
    tablaFiltrada=filtrarTabla(filtrarVehiculo(vehiculos,selectFiltro.value),arrayfilters);
    //console.log(tablaFiltrada);
    if(tablaFiltrada.length>0)
    {
        promedio.value=promediarVelocidad(tablaFiltrada);
    }
  

    return tablaFiltrada;
}