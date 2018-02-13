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
    public class BL_ABOUT
    {
        public List<about> getTitle(int groupId)
        {
            using (var db = new BloggingContext())
            {
                return db.abouts.Where(title => title.groupId == groupId).ToList();
            }
        }
        public Result<about> addAboutTitle(string title, string content, string icon, int groupId)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    about aboutTitle = new about(title, content, icon, groupId);//crete constructor get all items 
                    db.abouts.Add(aboutTitle);
                    db.SaveChanges();
                    return new Result<about>(true, aboutTitle);
                }
                catch (Exception ex)
                {
                    return new Result<about>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public void updateAboutTitle(int id, string title, string content, string icon, int groupId)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var aboutTitle = db.abouts.Where(about => about.id == id);
                    aboutTitle.Select(about => about.groupId == groupId && about.title.Equals(title)
                                && about.content.Equals(content) && about.icon.Equals(icon));
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public Result<about> deleteAboutTitle(int id)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var aboutTitle = db.abouts.Where(about => about.id == id);
                    db.abouts.Remove((about)aboutTitle);
                    db.SaveChanges();
                    return new Result<about>(true, (about)aboutTitle);
                }
                catch (Exception ex)
                {
                    return new Result<about>(false, ex.Message);
                    throw ex;
                }

            }
        }
        public List<ImageGallery> initImagesForGallery(int groupId, int start)
        {
            using (var db = new BloggingContext())
            {
                return db.ImageGalleries.Where(id => id.groupId == groupId).ToList().GetRange(start, start + 18);
            }
        }


    }
}
