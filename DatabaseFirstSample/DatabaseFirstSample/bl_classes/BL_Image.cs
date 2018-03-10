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
        public string src { get; set; }
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
        public List<BL_IMAGE> getImagesList(List<ImageGallery> ImagesList)
        {
            List<BL_IMAGE> images = new List<BL_IMAGE>();
            foreach (var item in ImagesList)
            {
                images.Add(new BL_IMAGE(item));
            }
            return images;
        }

        public BL_IMAGE()
        {
        }

        public Result<BL_IMAGE> addImage(ImageGallery newImageGallery)
        {
            using (var db = new BloggingContext())
            {
                DateTime createdAt = DateTime.Now;
                try
                {
                    newImageGallery.date_added = DateTime.Now;
                    db.ImageGalleries.Add(newImageGallery);
                    db.SaveChanges();
                    return new Result<BL_IMAGE>(true, new BL_IMAGE(newImageGallery));

                }
                catch (Exception ex)
                {
                    return new Result<BL_IMAGE>(false, ex.Message);
                    throw ex;
                }
            }
        }

        //public List<ImageGallery> getImagesByGroupId(int groupId, string orderBy)
        //{
        //    using (var db = new BloggingContext())
        //    {
        //        if (orderBy.Equals("date"))
        //        {
        //            return db.ImageGalleries.Where(images => images.groupId == groupId).OrderBy(filter => filter.date_added).ToList();
        //        }
        //        if (orderBy.Equals("subject"))
        //        {
        //            return db.ImageGalleries.Where(images => images.groupId == groupId).ToList(); //need to return orderBy subject
        //        }
        //        return db.ImageGalleries.Where(images => images.groupId == groupId).ToList();
        //    }
        //}
        public Result<JObject>  initImagesForGallery(int groupId, int start)
        {
            using (var db = new BloggingContext())
            {
                var imagesForGallery = db.ImageGalleries.Where(id => id.groupId == groupId).ToList();
                if(start< imagesForGallery.Count)
                {
                    int end = imagesForGallery.Count > 18 ? 18 : imagesForGallery.Count;
                    JObject api = new JObject();
                    api.Add("imagesForGallery", JToken.FromObject(getImagesList(imagesForGallery.GetRange(start, end))));
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
                    ImageGallery aboutTitle = db.ImageGalleries.FirstOrDefault(about => about.id == id);
                    db.ImageGalleries.Remove(aboutTitle);
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



