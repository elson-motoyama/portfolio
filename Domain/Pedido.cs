namespace Domain
{
    public class Pedido
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public decimal Desconto { get; set; }
        public bool Aprovado { get; set; }
        public int ClienteId { get; set; }
    }
}
