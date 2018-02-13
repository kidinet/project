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

namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api")]
    public class AboutController : BaseController
    {
        BL_ABOUT bl_about = new BL_ABOUT();
        [HttpGet]
        [Route("initAllAboutTitles/{Language}/{Registered}")]
        public IHttpActionResult initAllAboutTitles(string Language, bool Registered, int groupId)
        {
            return Ok(bl_about.getTitle(groupId));
        }
        [HttpPost]
        [Route("addAboutTitle/{Language}/{Registered}")]
        public IHttpActionResult addAboutTitle(string Language, bool Registered, string title, string content, string icon, int groupId)
        {
            return Ok(bl_about.addAboutTitle(title, content, icon, groupId));
        }
        [HttpPost]
        [Route("updateAboutTitle/{Language}/{Registered}")]
        public IHttpActionResult updateAboutTitle(string Language, bool Registered, int id, string title, string content, string icon, int groupId)
        {
            bl_about.updateAboutTitle(id, title, content, icon, groupId);
            return Ok();
        }
        [HttpPost]
        [Route("deleteAboutTitle/{Language}/{Registered}")]
        public IHttpActionResult deleteAboutTitle(int id)
        {
            return Ok(bl_about.deleteAboutTitle(id));
        }
        [HttpPost]
        [Route("initImagesForGallery/{Language}/{Registered}")]
        public IHttpActionResult initImagesForGallery(string Language, bool Registered, int groupId, int start)
        {
            return Ok(bl_about.initImagesForGallery(groupId, start));
        }

    }
}
