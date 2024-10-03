import { Cuenta } from './js0603-Cuenta.mjs';

let c1 = new Cuenta('Hugo', 0.0);                               //PRUEBAS UNITARIAS

c1.setTitular('Mery');
c1.setCantidad(10000);
c1.setDeuda(20);
c1.pagarDeuda();
c1.toString();

let c2 = new Cuenta('Hugo', 10);

c2.setDeuda(20);
c2.pagarDeuda();
c2.toString();

let c3 = new Cuenta('Javi', 5000);

c3.toString();
c3.ingresar(547);
c3.toString();
c3.retirar(1060);
c3.toString();
c3.retirar(5000);
c3.toString();

let c4 = new Cuenta();

c4.setTitular('Marta');
c4.setCantidad('10.20');
c4.toString();
c4.setDeuda(5.10);
c4.pagarDeuda();
c4.toString();