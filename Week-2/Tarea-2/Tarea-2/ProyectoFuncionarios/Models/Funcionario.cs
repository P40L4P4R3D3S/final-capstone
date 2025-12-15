namespace ProyectoFuncionarios.Models
{
    public abstract class Funcionario : ITrabajador
    {
        public string Nombre { get; set; }
        public int Edad { get; set; }
        public string Cpf { get; set; }

        public Funcionario(string nombre, int edad, string cpf)
        {
            Nombre = nombre;
            Edad = edad;
            Cpf = cpf;
        }

        public abstract decimal CalcularSalario();

        public virtual void MostrarInformacion()
        {
            Console.WriteLine($"Nombre: {Nombre}, Edad: {Edad}, CPF: {Cpf}");
        }
    }
}
