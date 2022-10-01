class Persona
{
    constructor(id,nombre,apellido,edad)
    {
        this.Id=id;
        this.Nombre=nombre;
        this.Apellido=apellido;
        this.Edad=edad;
    }

    set Id(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
        {
            this.id=value
        }
        else
        {
            throw("NaN");
        }
    }

    set Nombre(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof value === "string" && value.length<40)
        {
            this.nombre=value;
        }
        else
        {
            throw("Vacio o mas de 40 caracteres");
        }
    }

    set Apellido(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof value === "string" && value.length<40)
        {
            this.apellido=value;
        }
        else
        {
            throw("Vacio o mas de 40 caracteres");
        }
    }

    set Edad(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number")
        {
            this.edad=parseInt(value,10);
        }
        else
        {
            throw("NaN");
        }
    }

    toString()
    {
        return `Id: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}`;
    }
}

export default Persona;