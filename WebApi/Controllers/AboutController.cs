using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Net;
using System.IO;
using System.Net.Http;
using System.Web.Script.Serialization;
using DatabaseFirstSample;
using System.Data.Entity;
using DatabaseFirstSample.bl_classes;

namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api")]
    public class AboutController : BaseController
    {
        Bl_About Bl_About_ = new Bl_About();
        

        [HttpGet]
        [Route("initAllAboutTitles/{Language}/{Registered}")]
        public IHttpActionResult initAllAboutTitles(string Language, bool Registered, int groupId)
        {
            return Json(Bl_About_.initAllAboutTitels(groupId));
        }
        [HttpPost]
        [Route("addAboutTitle/{Language}/{Registered}")]
        public IHttpActionResult addAboutTitle(string Language, bool Registered,[FromBody]about aboutTitle)
        {

            return Ok(Bl_About_.addAboutTitle(aboutTitle));
        }
        [HttpPost]
        [Route("updateAboutTitle/{Language}/{Registered}")]
        public IHttpActionResult updateAboutTitle(string Language, bool Registered, [FromBody]about aboutTitle)
        {
            Bl_About_.updateAboutTitle(aboutTitle);
            return Ok(true);
        }
        [HttpGet]
        [Route("deleteAboutTitle/{Language}/{Registered}")]
        public IHttpActionResult deleteAboutTitle(int id)
        {
            return Ok(Bl_About_.deleteAboutTitle(id));
        }
    }
}
