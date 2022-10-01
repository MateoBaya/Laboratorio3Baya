import Persona from "./persona.js";

class Villano extends Persona
{
        constructor(id,nombre,apellido,edad,enemigo,robos,asesinatos)
        {
            super(id,nombre,apellido,edad);
            this.Enemigo = enemigo;
            this.Robos = robos;
            this.Asesinatos = asesinatos;
        }

        set Enemigo(value)
        {
            if((value!=null && value!=undefined&& value!=="")&&typeof value === "string" && value.length<40)
            {
                this.enemigo=value;
            }
            else
            {
                throw("Vacio o mas de 40 caracteres");
            }
        }

        set Robos(value)
        {
            if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
            {
                this.robos=value
            }
            else
            {
                throw("NaN o menor a 0");
            }
        }

        set Asesinatos(value)
        {
            if(value!=null && typeof parseInt(value,10) === "number" && parseInt(value,10)>0)
            {
                this.asesinatos=value
            }
            else
            {
                throw("NaN o menor a 0");
            }
        }

        toString()
        {
            return super.toString() + `, Enemigo: ${this.enemigo}, Robos: ${this.robos}, Asesinatos: ${this.asesinatos}`;
        }
}
export default Villano;