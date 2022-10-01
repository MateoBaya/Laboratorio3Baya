import { TableGenerator } from "./tableGenerator.js";
import FormHandler from "./formHandler.js";
import Persona from "../entities/persona.js";
import Villano from "../entities/villano.js";
import Heroe from "../entities/heroe.js";
import gente from "../data/datos.js";
let personas = new Array();

gente.forEach(element => {
    if(element.hasOwnProperty("enemigo"))
    {
        personas.push(new Villano(element["id"],element["nombre"],element["apellido"],
        element["edad"],element["enemigo"],element["robos"],element["asesinatos"]));
    }
    else if(element.hasOwnProperty("alterego"))
    {
        personas.push(new Heroe(element["id"],element["nombre"],element["apellido"],
        element["edad"],element["alterego"],element["ciudad"],element["publicado"]));
    }
  });

//FORM CREADO PARCIALMENTE AUTOMATICO
const formHoldingDiv = document.getElementById("form-holding");
const formHandler = new FormHandler("formAlta");
formHoldingDiv.appendChild(formHandler.Singleton);
formHandler.addInputToForm("number","id");
formHandler.addInputToForm("text","nombre");
formHandler.addInputToForm("text","apellido");
formHandler.addInputToForm("number","edad");
formHandler.Singleton.appendChild(FormHandler.labelGenerator("Tipo"));

// SELECT
formHandler.addGroups("select","selectTipo");
FormHandler.addSomethingToGroup("option","","","selectTipo");
FormHandler.addSomethingToGroup("option","Heroe","opcionHeroe","selectTipo");
FormHandler.addSomethingToGroup("option","Villano","opcionVillano","selectTipo");

// HEROE
const heroeDiv=formHandler.addGroups("div","heroeDiv");
FormHandler.addInputToGroup("text","alterego","heroeDiv");
FormHandler.addInputToGroup("text","ciudad","heroeDiv");
FormHandler.addInputToGroup("number","publicado","heroeDiv");
heroeDiv.style.display = "none";

// VILLANO
const villanoDiv=formHandler.addGroups("div","villanoDiv");
FormHandler.addInputToGroup("text","enemigo","villanoDiv");
FormHandler.addInputToGroup("number","robos","villanoDiv");
FormHandler.addInputToGroup("number","asesinatos","villanoDiv");
villanoDiv.style.display = "none";

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

actualizarTabla(personas);

// CAMBIA EL SELECT
const selectTipo = document.getElementById("selectTipo");
selectTipo.addEventListener("change",(e)=>{
    if(selectTipo.value == "")
    {
        heroeDiv.style.display = "none";
        villanoDiv.style.display = "none";
    }
    else if(selectTipo.value == "Villano")
    {
        villanoDiv.style.display = "flex";
        heroeDiv.style.display = "none";
    }
    else if(selectTipo.value == "Heroe")
    {
        villanoDiv.style.display = "none";
        heroeDiv.style.display = "flex";
    }
});

// SUBMIT CAMBIADO
formHandler.Singleton.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(btnEliminar.hidden && btnCancelar.hidden)
    {
        try
        {
            let persona = null;
            if(selectTipo.value=="")
            {
                alert("ERROR. Seleccione un tipo de persona");                
            }
            else if(selectTipo.value=="Heroe")
            {
                persona = new Heroe(formHandler.Singleton.id.value,formHandler.Singleton.nombre.value,
                formHandler.Singleton.apellido.value,formHandler.Singleton.edad.value,formHandler.Singleton.alterego.value,
                formHandler.Singleton.ciudad.value,formHandler.Singleton.publicado.value);
            }
            else if(selectTipo.value=="Villano")
            {
                persona = new Villano(formHandler.Singleton.id.value,formHandler.Singleton.nombre.value,
                formHandler.Singleton.apellido.value,formHandler.Singleton.edad.value,formHandler.Singleton.enemigo.value,
                formHandler.Singleton.robos.value,formHandler.Singleton.asesinatos.value);
            }
            if(personas!=null && persona!=null)
            {
                personas.push(persona);
                console.log(persona.toString());
                actualizarTabla(personas);
            }
            else
            {
                personas = new Array(persona);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }
});


// RECREA LA TABLA CON LOS CONTENIDOS EN LISTA
function actualizarTabla(lista)
{
    document.getElementById("btnEliminar").hidden=true;
    document.getElementById("btnCancelar").hidden=true;
    const container = document.querySelector('.table-container');
    while(container.children.length>0){
        container.removeChild(container.firstElementChild);
    }
    try
    {
        container.appendChild(TableGenerator(lista));   
    }
    catch(e)
    {
        console.log("No tiene datos");
    }   
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

function filtrarTabla(lista,filterElements)
{
    const tablaFiltrada = lista.map(function(element){
        let obj = {};
        filterElements.forEach((filter,i) => {
            obj[filterElements[i]]=element[filter];
        });
        return obj;
        console.log(array);
    });
    return tablaFiltrada;
}
