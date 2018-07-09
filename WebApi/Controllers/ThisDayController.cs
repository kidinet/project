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
    public class ThisDayController : BaseController
    {
        BL_THIS_DAY bl_this_day = new BL_THIS_DAY();
        [HttpGet]
        [Route("getCurrentGroupThisDayTitles/{Language}/{Registered}")]
        public IHttpActionResult getCurrentGroupThisDayTitles(string Language, bool Registered, int groupId)
        {
            return Ok(bl_this_day.getCurrentGroupThisDayTitles(groupId));
        }
        [HttpGet]
        [Route("getDisplayDayParam/{Language}/{Registered}")]
        public IHttpActionResult getDisplayDayParam(string Language, bool Registered, int groupId, DateTime date)
        {
            return Ok(bl_this_day.getDisplayDayParam(groupId, date));
        }
        [HttpPost]
        [Route("updateThisDayTitle/{Language}/{Registered}")]
        public IHttpActionResult updateThisDayTitle(ThisDayContent thisDayContent)
        {
            return Ok(bl_this_day.updateThisDayTitle(thisDayContent));
        }
        [HttpPost]
        [Route("updateThisDayOfGroupTitle/{Language}/{Registered}")]
        public IHttpActionResult updateThisDayOfGroupTitle(ThisDayOfGroup thisDayOfGroup)
        {
            return Ok(bl_this_day.updateThisDayOfGroupTitle(thisDayOfGroup));
        }
        [HttpPost]
        [Route("addThisDayOfGroupTitle/{Language}/{Registered}")]
        public IHttpActionResult addThisDayOfGroupTitle(ThisDayOfGroup thisDayOfGroup)
        {
            return Ok(bl_this_day.addThisDayOfGroupTitle(thisDayOfGroup));
        }

    }
}
