using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class GestorChoferes
    {
        public static List<Choferes> GetAll()
        {
            using (EgeoEntities db = new EgeoEntities())
            {
                return db.Choferes.ToList();
            }
        }
    }
}
