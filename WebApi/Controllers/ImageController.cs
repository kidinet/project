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
    public class ImageController : BaseController
    {
        BL_IMAGE bl_image = new BL_IMAGE();

        [HttpPost]
        [Route("addImageToGallery/{Language}/{Registered}")]
        public IHttpActionResult addImageToGallery([FromBody]ImageGallery newImage)
        {
            return Json(bl_image.addImage(newImage));
        }
        [HttpGet]
        [Route("initImagesForGallery/{Language}/{Registered}")]
        public IHttpActionResult initImagesForGallery(string Language, bool Registered, int groupId, int start)
        {
            
            return Json(bl_image.initImagesForGallery(groupId, start));
        }
        [HttpGet]
        [Route("deleteImageFromGallery/{Language}/{Registered}")]
        public IHttpActionResult deleteImageFromGallery(string Language, bool Registered, int id)
        {
            return Json(bl_image.deleteImageFromGallery(id));
        }
    }
}
