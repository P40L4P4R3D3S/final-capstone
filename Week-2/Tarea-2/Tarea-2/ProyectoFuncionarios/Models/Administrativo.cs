namespace ProyectoFuncionarios.Models
{
    public class Administrativo : Funcionario
    {
        public string Sector { get; set; }

        public Administrativo(string nombre, int edad, string cpf, string sector)
            : base(nombre, edad, cpf)
        {
            Sector = sector;
        }

        public override decimal CalcularSalario()
        {
            return 3500m; // Ejemplo fijo
        }

        public override void MostrarInformacion()
        {
            base.MostrarInformacion();
            Console.WriteLine($"Sector: {Sector}");
        }
    }
}
