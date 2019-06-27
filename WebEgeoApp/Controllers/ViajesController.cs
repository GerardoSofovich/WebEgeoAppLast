using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Datos;

namespace MiWebApi.Controllers
{
    public class ViajesController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok(GestorViajes.GetAll());
        }

        public IHttpActionResult Get(int id)
        {
            return Ok(GestorViajes.GetById(id));
        }

        public IHttpActionResult Delete(int id)
        {
            if (GestorViajes.DeleteByID(id))
                return Ok("Viaje borrado exitosamente");
            else
                return BadRequest("No se pudo borrar");
        }

        public IHttpActionResult Put(Trips vi)
        {
            if (GestorViajes.Modificar(vi))
                return Ok("Viaje actualizado correctamente");
            else
                return BadRequest("No se pudo actualizar animal");
        }

        public IHttpActionResult Post(Trips vi)
        {
            if (GestorViajes.Nuevo(vi))
                return Ok("Viaje insertado correctamente");
            else
                return BadRequest("No se pudo insertar viaje");
        }
    }
}