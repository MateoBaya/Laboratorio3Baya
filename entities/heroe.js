import Persona from "./persona.js";

class Heroe extends Persona
{
    constructor(id,nombre,apellido,edad,alterEgo,ciudad,publicado)
    {
        super(id,nombre,apellido,edad);
        this.AlterEgo=alterEgo;
        this.Ciudad=ciudad;
        this.Publicado=publicado;
    }
    set AlterEgo(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof value === "string" && value.length<40)
        {
            this.alterEgo=value;
        }
        else
        {
            throw("Vacio o mas de 40 caracteres");
        }
    }
    set Ciudad(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof value === "string" && value.length<40)
        {
            this.ciudad=value;
        }
        else
        {
            throw("Vacio o mas de 40 caracteres");
        }
    }
    set Publicado(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>1940)
        {
            this.publicado=parseInt(value,10);
        }
        else
        {
            throw("NaN o no se recibe despues de 1940");
        }
    }

    toString()
    {
        return super.toString() + `, AlterEgo: ${this.alterEgo}, Ciudad: ${this.ciudad}, Publicado: ${this.publicado}`;
    }
}

export default Heroe;