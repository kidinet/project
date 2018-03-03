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

namespace DatabaseFirstSample
{
    public class BL_IMAGE
    {
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
        //public Result<ResponseImage> addText(string text, int imageId, DateTime date, string userMail)
        //{
        //    using (var db = new BloggingContext())
        //    {
        //        try
        //        {
        //            ResponseImage response = new ResponseImage();//imageId, date, text, userMail
        //            db.ResponseImages.Add(response);
        //            db.SaveChanges();
        //            return new Result<ResponseImage>(true, response);
        //        }
        //        catch (Exception ex)
        //        {
        //            return new Result<ResponseImage>(false, ex.Message);
        //            throw ex;
        //        }
        //    }
        //}
        //public List<ResponseImage> getResponsesbyImageId(int imageId)
        //{
        //    using (var db = new BloggingContext())
        //    {
        //        return db.ResponseImages.Where(response => response.imageId == imageId).ToList();
        //    }

        //}
        //public List<LikeImage> getLikeImagesbyMail(string userMail)
        //{
        //    using (var db = new BloggingContext())
        //    {
        //        return db.LikeImages.Where(mail => mail.userMail == userMail).ToList();
        //    }
        //}
        public List<ImageGallery> initImagesForGallery(int groupId, int start)
        {
            using (var db = new BloggingContext())
            {
                return db.ImageGalleries.Where(id => id.groupId == groupId).ToList().GetRange(start, 18);
            }
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



