export { Cuenta };

class Cuenta
{

    titular = "";                                               //Declaración de atributos
    cantidad = 0.0;
    deuda = 0.0;

    constructor(titular, cantidad)                              //Constructor parametrizado
    {

        this.titular = titular;
        if (cantidad != '')
        {
            this.cantidad = parseFloat(cantidad);
        }

    }
                                                                //GETTERS
    getTitular()
    {
        return this.titular;
    }

    getCantidad()
    {
        return this.cantidad;
    }

    getDeuda()
    {
        return this.deuda;
    }
                                                                //SETTERS
    setTitular(titular)
    {
        this.titular = titular;
    }

    setCantidad(cantidad)
    {
        if(parseFloat(cantidad) >= 0)
        {
            this.cantidad = parseFloat(cantidad);
        }
        else
        {
            console.log("Cantidad no válida.")
        }
    }

    setDeuda(deuda)
    {
        if(parseFloat(deuda > 0))
        {
            this.deuda = parseFloat(deuda) * -1;
        }
        else
        {
            this.deuda = parseFloat(deuda);
        }
    }
                                                                //MÉTODOS ESPECIALES
    ingresar(ingreso)
    {
        if(parseFloat(ingreso) > 0)
        {
            if(this.deuda < 0)
            {
                this.retirar(this.deuda);
            }
            this.cantidad = this.cantidad + parseFloat(ingreso);
        }
    }

    retirar(cantidad)
    {
        if(parseFloat(cantidad) > 0)
        {
            this.cantidad = this.cantidad - parseFloat(cantidad);
            if(this.cantidad < 0)
            {
                this.deuda = this.cantidad;
                this.cantidad = 0;
            }
        }
    }

    pagarDeuda()
    {
        if(this.cantidad >= (this.deuda * -1))
        {
            this.cantidad = this.cantidad + this.deuda;
            this.deuda = 0;
        }
        else
        {
            this.cantidad = this.cantidad + this.deuda;
            this.deuda = this.cantidad;
            this.cantidad = 0;
        }
    }
                                                                //TOSTRING
    toString()
    {
        console.log("Titular: ",this.titular, " Cantidad: ",this.cantidad, " Deuda: ",this.deuda);
    }

}

