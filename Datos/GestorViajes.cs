using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Threading.Tasks;

namespace Datos
{
    public class GestorViajes
    {
        static void main() { }
        public static List<Trips> GetAll()
        {
            using (EgeoEntities db = new EgeoEntities())
            {
                return db.Trips.ToList();
            }

        }
        public static Trips GetById(int id)
        {
            try
            {
                using (EgeoEntities db = new EgeoEntities())
                {
                    return db.Trips.Find(id);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static bool DeleteByID(int Vid)
        {
            try
            {
                using (EgeoEntities db = new EgeoEntities())
                {
                    Trips borrar = db.Trips.Where(v => v.id == Vid).Single();
                    db.Trips.Remove(borrar);
                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static bool Modificar(Trips vi)
        {
            try
            {
                using (EgeoEntities db = new EgeoEntities())
                {
                    db.Entry(vi).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static bool Nuevo(Trips vi)
        {
            try
            {
                using (EgeoEntities db = new EgeoEntities())
                {
                    db.Trips.Add(vi);
                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

    }

}
