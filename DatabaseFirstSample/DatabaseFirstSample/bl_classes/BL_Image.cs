using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using DatabaseFirstSample.bl_classes;
using System.IO;
using System.Net.Mail;
using System.Web;
using System.Runtime.Serialization;
using Newtonsoft.Json.Linq;

namespace DatabaseFirstSample
{
    [Serializable]
    [DataContract]
    public class BL_IMAGE
    {
        [DataMember]
        public int id { get; set; }
        [DataMember]
        public int groupId { get; set; }
        [DataMember]
        public Nullable<System.DateTime> date_added { get; set; }
        [DataMember]
        public byte[] src { get; set; }
        [DataMember]
        public string subject { get; set; }
        public BL_IMAGE(ImageGallery imageGallery)
        {
            this.id = imageGallery.id;
            this.groupId = imageGallery.groupId;
            this.date_added = imageGallery.date_added;
            this.src = imageGallery.src;
            this.subject = imageGallery.subject;
        }

        public BL_IMAGE()
        {
        }

        public Result<ImageGallery> addImage(ImageGallery newImageGallery)
        {
            using (var db = new BloggingContext())
            {
                DateTime createdAt = DateTime.Now;
                try
                {
                    //  ImageGallery image = new ImageGallery(groupId, src, subject, createdAt);//groupId, src, subject, createdAt
                    db.ImageGalleries.Add(newImageGallery);
                    db.SaveChanges();
                    return new Result<ImageGallery>(true, newImageGallery);

                }
                catch (Exception ex)
                {
                    return new Result<ImageGallery>(false, ex.Message);
                    throw ex;
                }
            }
        }

        public List<ImageGallery> getImagesByGroupId(int groupId, string orderBy)
        {
            using (var db = new BloggingContext())
            {
                if (orderBy.Equals("date"))
                {
                    return db.ImageGalleries.Where(images => images.groupId == groupId).OrderBy(filter => filter.date_added).ToList();
                }
                if (orderBy.Equals("subject"))
                {
                    return db.ImageGalleries.Where(images => images.groupId == groupId).ToList(); //need to return orderBy subject
                }
                return db.ImageGalleries.Where(images => images.groupId == groupId).ToList();
            }
        }
        public Result<JObject>  initImagesForGallery(int groupId, int start)
        {
            using (var db = new BloggingContext())
            {
                var imagesForGallery = db.ImageGalleries.Where(id => id.groupId == groupId).ToList();
                if(start< imagesForGallery.Count)
                {
                    JObject api = new JObject();
                    api.Add("imagesForGallery", JToken.FromObject(imagesForGallery.GetRange(start, 18)));
                    return new  Result<JObject>(true, api);
                }
            }
            return new Result<JObject>(false,"no more images");
        }
        public Result<ImageGallery> deleteImageFromGallery(int id)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var aboutTitle = db.ImageGalleries.Where(about => about.id == id);
                    db.ImageGalleries.Remove((ImageGallery)aboutTitle);
                    db.SaveChanges();
                    return new Result<ImageGallery>(true, (ImageGallery)aboutTitle);
                }
                catch (Exception ex)
                {
                    return new Result<ImageGallery>(false, ex.Message);
                    throw ex;
                }

            }
        }

    }
}



