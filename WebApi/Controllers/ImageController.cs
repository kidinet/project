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
        [Route("addNewImage/{Language}/{Registered}")]
        public IHttpActionResult addNewImage([FromBody]ImageGallery newImage)
        {
            return Ok(bl_image.addImage(newImage));
        }
        [HttpPost]
        [Route("getImages/{Language}/{Registered}")]
        public IHttpActionResult getImages(int groupId, string orderBy)
        {
            return Ok(bl_image.getImagesByGroupId(groupId, orderBy));
        }
        [HttpGet]
        [Route("initImagesForGallery/{Language}/{Registered}")]
        public IHttpActionResult initImagesForGallery(string Language, bool Registered, int groupId, int start)
        {
            
            return Ok(bl_image.initImagesForGallery(groupId, start));
        }
        [HttpGet]
        [Route("deleteImageFromGallery/{Language}/{Registered}")]
        public IHttpActionResult deleteImageFromGallery(string Language, bool Registered, int id)
        {
            return Ok(bl_image.deleteImageFromGallery(id));
        }
    }
}
