using ProyectoFuncionarios.Models;

class Program
{
    static void Main()
    {
        List<ITrabajador> funcionarios = new List<ITrabajador>
        {
            new Profesor("María López", 40, "123456789", "Doctorado"),
            new Administrativo("Carlos Pérez", 35, "987654321", "Recursos Humanos")
        };

        foreach (var f in funcionarios)
        {
            f.MostrarInformacion();
            Console.WriteLine($"Salario: {f.CalcularSalario():C}\n");
        }
    }
}
