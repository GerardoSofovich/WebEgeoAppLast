using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Datos;

namespace MiWebApi.Controllers
{
    public class ChoferesController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok(GestorChoferes.GetAll());
        }
    }
}