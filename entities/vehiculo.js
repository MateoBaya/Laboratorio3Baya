class Vehiculo
{
    constructor(id,modelo,añoFabricacion,velocidadMaxima)
    {
        this.Id=id;
        this.Modelo=modelo;
        this.AñoFabricacion=añoFabricacion;
        this.VelocidadMaxima=velocidadMaxima;
    }

    set Id(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
        {
            this.id=value
        }
        else
        {
            throw("NaN o menor a 0");
        }
    }

    set Modelo(value)
    {
        if((value!=null && value!=undefined&&value!=="")&&typeof value === "string")
        {
            this.modelo=value;
        }
        else
        {
            throw("Vacio o mas de 40 caracteres");
        }
    }

    set AñoFabricacion(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
        {
            this.añoFabricacion=value;
        }
        else
        {
            throw("NaN o menor a 0");
        }
    }

    set VelocidadMaxima(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
        {
            this.velocidadMaxima=parseInt(value,10);
        }
        else
        {
            throw("NaN o menor a 0");
        }
    }

    toString()
    {
        return `Id: ${this.id}, Modelo: ${this.modelo}, AñoFabricacion: ${this.añoFabricacion},VelocidadMaxima: ${this.velocidadMaxima}`;
    }
}

export default Vehiculo;