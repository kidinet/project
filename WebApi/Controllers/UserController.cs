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
    public class GeneralController : BaseController
    {
        BL_USER bl_user = new BL_USER();

        [HttpGet]
        [Route("getUser/{Language}/{Registered}")]
        public IHttpActionResult getUser(string Language, bool Registered, string mail)
        {
            Users[] b = bl_user.getUser(mail);
            return Ok(b);
        }
        [HttpGet]
        [Route("addUser/{Language}/{Registered}")]
        public IHttpActionResult addUser(string Language, bool Registered, string mail, int groupId)
        {
            return Ok(bl_user.addUser(mail, groupId));
        }
        [HttpGet]
        [Route("updateUser/{Language}/{Registered}")]
        public IHttpActionResult updateUser(
            string Language,
            bool Registered,
            string mail,
            string firstName,
            string lastName,
            string childFirstName,
            string childLastName,
            string nickName,
            string profile,
            string password,
            bool type,
            string city,
            string streat,
            int build)
        {
            Boolean b = bl_user.updateUser(
                        mail,
                        firstName,
                        lastName,
                        childFirstName,
                        childLastName,
                        nickName,
                        profile,
                        password,
                        type,
                        city,
                        streat,
                        build);
            return Ok(b);
        }
    [HttpGet]
        [Route("createUser/{Language}/{Registered}")]
        public IHttpActionResult createUser(
            string Language,
            bool Registered,
            string mail,
            string firstName,
            string lastName,
            string childFirstName,
            string childLastName,
            string nickName,
            string profile,
            string password,
            bool type,
            string city,
            string streat,
            int build)
        {
            Boolean b = bl_user.createUser(
                        mail,
                        firstName,
                        lastName,
                        childFirstName,
                        childLastName,
                        nickName,
                        profile,
                        password,
                        city,
                        streat,
                        build);
            return Ok(b);
        }
    }
}
