
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
        [HttpPost]
        [Route("createGroup/{Language}/{Registered}")]
        public IHttpActionResult createGroup([FromBody]Group newGroup)
        {
            return Ok(Bl_Group.createGroup(newGroup));
        }
        [HttpGet]
        [Route("deleteGroup/{Language}/{Registered}")]
        public IHttpActionResult deleteGroup(int groupId)
        {
            return Ok(Bl_Group.deleteGroup(groupId));
        }
        [HttpPost]
        [Route("updateGroup/{Language}/{Registered}")]
        public IHttpActionResult updateGroup([FromBody]Group groupToUpdte)
        {
            return Ok(Bl_Group.updateGroup(groupToUpdte));
        }
        //[HttpPost]
        //[Route("addUserToGroup/{Language}/{Registered}")]
        //public IHttpActionResult addUserToGroup([FromBody]UserToGroup userToGroup)
        //{
        //    Bl_Group.addUserToGroup(userToGroup.groupId, userToGroup.newUsers);
        //    return Ok();
        //}

    }
}

