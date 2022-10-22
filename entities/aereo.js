import Vehiculo from "./vehiculo.js";

class Aereo extends Vehiculo
{
    constructor(id,modelo,añoFabricacion,velocidadMaxima,alturaMaxima,autonomia)
    {
        super(id,modelo,añoFabricacion,velocidadMaxima);
        this.AlturaMaxima=alturaMaxima;
        this.Autonomia=autonomia;
    }
    set AlturaMaxima(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
        {
            this.alturaMaxima=value;
        }
        else
        {
            throw("NaN o menor a 0");
        }
    }
    set Autonomia(value)
    {
        if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
        {
            this.autonomia=value;
        }
        else
        {
            throw("NaN o menor a 0");
        }
    }

    toString()
    {
        return super.toString() + `, AlturaMaxima: ${this.alturaMaxima}, Autonomia: ${this.autonomia}`;
    }
}

export default Aereo;