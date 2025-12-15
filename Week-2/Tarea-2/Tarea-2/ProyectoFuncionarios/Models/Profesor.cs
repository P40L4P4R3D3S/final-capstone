namespace ProyectoFuncionarios.Models
{
    public class Profesor : Funcionario
    {
        public string Titulacion { get; set; }

        public Profesor(string nombre, int edad, string cpf, string titulacion)
            : base(nombre, edad, cpf)
        {
            Titulacion = titulacion;
        }

        public override decimal CalcularSalario()
        {
            return 5000m;
        }

        public override void MostrarInformacion()
        {
            base.MostrarInformacion();
            Console.WriteLine($"Titulación: {Titulacion}");
        }
    }
}
