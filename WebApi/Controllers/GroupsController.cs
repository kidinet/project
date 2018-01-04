
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
    public class GroupsController : BaseController
    {
        
        Bl_Group Bl_Group = new Bl_Group();
        [HttpGet]
        [Route("createGroup/{Language}/{Registered}")]
        public IHttpActionResult createGroup(string Language, bool Registered, string name, string city, string street, int build, string phone, string mail, string fax)
        {
            //  http://localhost:7022/api/createGroup/he/true?name=kidinet&city=BneiBraq&street=lklklklk&build=2&phone=5798888&mail=kidinet@gmail.com&fax=1234567
            return Ok(Bl_Group.createGroup(name, city, street, build, phone, mail, fax));
        }
    }
}
