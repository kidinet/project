
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
    public class UserlController : BaseController
    {
        BL_USER bl_user = new BL_USER();
        [HttpGet]
        [Route("createUser/{Language}/{Registered}")]
        public IHttpActionResult createUser(
            string Language,
            bool Registered,
            string mail,
            string firstName,
            string lastName,
            string childFirstName,
            string childLastName)
            //string nickName,
            //string profile,
            //string password,
            //string city,
            //string street,
            //int build,
            //string phone,
            //bool type,
            //int groupId)
        {
            //localhost:7022/api/createUser/he/true?&mail=ghjghj@kjkjk3333j.com&firstName=12334&lastName=dADSASD&childFirstName=undefined&childLastName=undefined&nickName=undefined&profile=undefined&password=1&city=sdfsda&build=3&street=dsfa&phone=0588822808
            return Ok(bl_user.createUser(
                        mail,
                        firstName,
                        lastName,
                        childFirstName,
                        childLastName));
                        // nickName,
                        //profile,
                        //password,
                        //city,
                        //street,
                        //build,
                        //phone,
                        //type,
                        //groupId
                       
        }

    }
}
