import Vehiculo from "./vehiculo.js";

class Terrestre extends Vehiculo
{
        constructor(id,modelo,añoFabricacion,velocidadMaxima,cantidadPuertas,cantidadRuedas)
        {
            super(id,modelo,añoFabricacion,velocidadMaxima);
            this.CantidadPuertas = cantidadPuertas;
            this.CantidadRuedas = cantidadRuedas;        
        }

        set CantidadPuertas(value)
        {
            if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
            {
                this.cantidadPuertas=value;
            }
            else
            {
                throw("NaN o menor a 0");
            }
        }

        set CantidadRuedas(value)
        {
            if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
            {
                this.cantidadRuedas=value
            }
            else
            {
                throw("NaN o menor a 0");
            }
        }


        toString()
        {
            return super.toString() + `, CantidadPuertas: ${this.cantidadPuertas}, CantidadRuedas: ${this.cantidadRuedas}`;
        }
}
export default Terrestre;