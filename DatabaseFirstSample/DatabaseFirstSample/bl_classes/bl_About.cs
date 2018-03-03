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
        public List<about> initAllAboutTitels(int groupId)
        {
            using (var db = new BloggingContext())
            {
                return db.abouts.Where(title => title.groupId == groupId).ToList();
            }
        }
        public Result<about> addAboutTitle(about newAboutTitle)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    //about aboutTitle = new about(title, content, icon, groupId);//crete constructor get all items 
                    db.abouts.Add(newAboutTitle);
                    db.SaveChanges();
                    return new Result<about>(true, newAboutTitle);
                }
                catch (Exception ex)
                {
                    return new Result<about>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public void updateAboutTitle(about aboutTitle)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    //var tiltle = db.abouts.Where(x=>x.id==aboutTitle.id).Select
                    //(about => about.groupId == aboutTitle.groupId && about.title.Equals(aboutTitle.title)
                    // && about.content.Equals(aboutTitle.content) && about.icon.Equals(aboutTitle.icon));
                    //db.SaveChanges();
                    var title = db.abouts.Find(aboutTitle.id);
                    title.title = aboutTitle.title;
                    title.groupId = aboutTitle.groupId;
                    title.content = aboutTitle.content;
                    title.icon = aboutTitle.icon;
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



    }
}

