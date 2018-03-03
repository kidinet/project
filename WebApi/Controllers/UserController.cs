
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
        BL_User bl_user = new BL_User();
        [HttpPost]
        [Route("createUser/{Language}/{Registered}")]
        public IHttpActionResult createUser([FromBody]User newUser, [FromBody]UserInGroup newUserInGroup)
        {
            // http://localhost:7022/api/createUser/he/true?&mail=vbnmvb&firstName=fgjfg&lastName=gfjfghj&childFirstName=undefinednickName=undefinedprofile=null&password=mm&city=gfjfg&build=7&street=fgjfgh&phone=mbvnm&isAdministrator=true&groupId=120
            //localhost:7022/api/createUser/he/true?&mail=ghjghj@kjkjk3333j.com&firstName=12334&lastName=dADSASD&childFirstName=undefined&childLastName=undefined&nickName=undefined&profile=undefined&password=1&city=sdfsda&build=3&streat=dsfa&phone=0588822808&isAdministrator=true&groupId=100
            return Ok(bl_user.createUser(newUser, newUserInGroup));

        }
        [HttpPost]
        [Route("updateUser/{Language}/{Registered}")]
        public IHttpActionResult updateUser([FromBody]User userToUpdate)
        {
            return Ok(bl_user.updateUser(userToUpdate));
        }
        [HttpPost]
        [Route("updateUserIngroup/{Language}/{Registered}")]
        public IHttpActionResult updateUserIngroup([FromBody]UserInGroup userInGroupToUpdate)
        {
            return Ok(bl_user.updateUserIngroup(userInGroupToUpdate));
        }
        [HttpGet]
        [Route("updataProfileImage/{Language}/{Registered}")]
        public IHttpActionResult updataProfileImage(string mail, byte[] profile)
        {
            return Ok(bl_user.updateProfileImage(mail, profile));
        }
        [HttpGet]
        [Route("updataProfile/{Language}/{Registered}")]
        public IHttpActionResult deleteUser(string userMail)
        {
            return Ok(bl_user.deleteUser(userMail));
        }
        [HttpPost]
        [Route("logIn/{Language}/{Registered}")]
        public IHttpActionResult logIn([FromBody]string userMail, [FromBody]string password)
        {
            return Ok(true);
        }
    }
}

